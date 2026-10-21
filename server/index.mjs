import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { buildCatalog } from './catalog.mjs';
import { compareSources } from './compareSources.mjs';
import { APP_ROOT_PATH, COURSE_ROOTS } from './sourceRoots.mjs';

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT || 4177);
const DIST_ROOT = path.join(APP_ROOT_PATH, 'dist');
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const catalog = await buildCatalog(COURSE_ROOTS);
const browserCatalog = {
  generatedAt: catalog.generatedAt,
  missingRoots: catalog.missingRoots,
  courses: catalog.courses,
  assets: catalog.assets,
};

function sendJson(response, status, value) {
  const body = Buffer.from(JSON.stringify(value));
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(body);
}

function isInside(rootPath, candidatePath) {
  const relative = path.relative(rootPath, candidatePath);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

async function serveSource(request, response, url) {
  const assetId = url.pathname.split('/').at(-1);
  const asset = catalog.assetLookup.get(assetId);
  if (!asset || !isInside(asset.rootPath, asset.absolutePath)) {
    sendJson(response, 404, { error: 'Source file not found in the course catalog.' });
    return;
  }

  const info = await stat(asset.absolutePath);
  const downloadName = encodeURIComponent(asset.fileName).replaceAll("'", '%27');
  response.writeHead(200, {
    'Content-Type': MIME_TYPES[asset.extension] || 'application/octet-stream',
    'Content-Length': info.size,
    'Content-Disposition': `${url.searchParams.has('download') ? 'attachment' : 'inline'}; filename*=UTF-8''${downloadName}`,
    'Cache-Control': 'private, max-age=0, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') response.end();
  else createReadStream(asset.absolutePath).pipe(response);
}

async function serveStatic(request, response, pathname) {
  let relative = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.replace(/^\/+/, ''));
  let candidate = path.resolve(DIST_ROOT, relative);
  if (!isInside(DIST_ROOT, candidate)) {
    sendJson(response, 400, { error: 'Invalid local app path.' });
    return;
  }

  try {
    await access(candidate);
    const info = await stat(candidate);
    if (info.isDirectory()) candidate = path.join(candidate, 'index.html');
  } catch {
    candidate = path.join(DIST_ROOT, 'index.html');
  }

  try {
    const info = await stat(candidate);
    response.writeHead(200, {
      'Content-Type': MIME_TYPES[path.extname(candidate).toLowerCase()] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': path.basename(candidate) === 'index.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self'",
      'Referrer-Policy': 'no-referrer',
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(candidate).pipe(response);
  } catch {
    sendJson(response, 404, { error: 'App asset not found. Rebuild the app files and try again.' });
  }
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendJson(response, 405, { error: 'Only local read requests are supported.' });
    return;
  }

  const origin = request.headers.origin;
  const fetchSite = request.headers['sec-fetch-site'];
  const acceptedOrigins = new Set([`http://${HOST}:${PORT}`, 'http://127.0.0.1:5173']);
  if ((origin && !acceptedOrigins.has(origin)) || (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none')) {
    sendJson(response, 403, { error: 'This local app only accepts requests from its own window.' });
    return;
  }

  try {
    const url = new URL(request.url || '/', `http://${HOST}:${PORT}`);
    if (url.pathname === '/api/catalog') {
      sendJson(response, 200, browserCatalog);
      return;
    }
    if (url.pathname === '/api/compare') {
      const current = catalog.assetLookup.get(url.searchParams.get('current'));
      const archive = catalog.assetLookup.get(url.searchParams.get('archive'));
      if (!current || !archive) {
        sendJson(response, 404, { error: 'One of the selected course files is no longer in the catalog.' });
        return;
      }
      if (current.courseId !== archive.courseId) {
        sendJson(response, 400, { error: 'Choose files from the same subject to compare them.' });
        return;
      }
      sendJson(response, 200, await compareSources(current, archive));
      return;
    }
    if (url.pathname.startsWith('/api/source/')) {
      await serveSource(request, response, url);
      return;
    }
    await serveStatic(request, response, url.pathname);
  } catch (error) {
    console.error('Local app request failed:', error?.message || error);
    if (!response.headersSent) sendJson(response, 500, { error: 'The local app could not open this item.' });
    else response.destroy();
  }
});

server.listen(PORT, HOST, () => {
  const sourceCount = browserCatalog.assets.length;
  console.log(`EELU Study Companion listening at http://${HOST}:${PORT} (${sourceCount} source files indexed).`);
  if (browserCatalog.missingRoots.length) console.warn(`Some course folders are not available: ${browserCatalog.missingRoots.join(', ')}`);
  if (sourceCount === 0) console.warn('Course files were not found beside the EELU Study Companion folder.');
});
