import { createHash } from 'node:crypto';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SUPPORTED_EXTENSIONS = new Set(['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp']);

async function listFiles(directory) {
  const found = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return found;
    throw error;
  }

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...await listFiles(fullPath));
    } else if (entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      found.push(fullPath);
    }
  }
  return found;
}

function inferCurrentCourse(fileName) {
  const value = fileName.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
  if (value.includes('electronics')) return { id: 'electronics', title: 'Electronics' };
  if (value.includes('math 0') || value.includes('math0')) return { id: 'mathematics-0', title: 'Mathematics 0' };
  if (value.includes('math 1') || value.includes('math1')) return { id: 'mathematics-1', title: 'Mathematics 1' };
  if (value.includes('computer') || value.includes('information system')) return { id: 'introduction-to-computers', title: 'Introduction to Computers' };
  return { id: 'unassigned', title: 'Unassigned course' };
}

function classifyAsset(relativePath, courseId, sourceKind) {
  const lower = relativePath.toLowerCase().replaceAll('\\', '/');
  const name = path.basename(relativePath).toLowerCase();
  const group = sourceKind === 'current' ? 'current-download' : 'course-archive';
  let kind = 'unit';
  // Folder names are more reliable than filenames: lecture folders can contain
  // revision or midterm PDFs, while section folders may contain lecture-labeled files.
  if (/(^|\/)section(\/|$)/i.test(lower)) kind = 'section';
  else if (/(^|\/)lecture(\/|$)/i.test(lower)) kind = 'lecture';
  else if (/section|lab|tutorial|practice|review|quiz|midterm/.test(name)) kind = 'section';
  else if (/(^|\b)(lec|lecture)\s*\d*/i.test(name)) kind = 'lecture';
  if (courseId === 'technical-report-writing' && sourceKind === 'archive') kind = 'unit';
  return { group, kind };
}

function displayName(fileName) {
  return fileName.replace(/\.[^.]+$/, '').replace(/[\t ]+/g, ' ').trim();
}

export async function buildCatalog(roots) {
  const assets = [];
  const missingRoots = [];

  for (const root of roots) {
    const rootInfo = await stat(root.absolutePath).catch((error) => error?.code === 'ENOENT' ? null : Promise.reject(error));
    if (!rootInfo?.isDirectory()) {
      missingRoots.push(root.directory);
      continue;
    }

    for (const fullPath of await listFiles(root.absolutePath)) {
      const relativePath = path.relative(root.absolutePath, fullPath);
      const currentCourse = root.kind === 'current' ? inferCurrentCourse(path.basename(fullPath)) : { id: root.id, title: root.title };
      const id = createHash('sha256').update(`${root.id}\0${relativePath}`).digest('hex').slice(0, 20);
      const fileStat = await stat(fullPath);
      const classification = classifyAsset(relativePath, currentCourse.id, root.kind);
      const extension = path.extname(fullPath).toLowerCase();

      assets.push({
        id,
        courseId: currentCourse.id,
        courseTitle: currentCourse.title,
        sourceType: root.kind,
        sourceLabel: root.kind === 'current' ? 'Current Moodle download' : 'Older course folder',
        kind: classification.kind,
        group: classification.group,
        fileName: path.basename(fullPath),
        displayName: displayName(path.basename(fullPath)),
        relativePath: relativePath.split(path.sep).join('/'),
        extension,
        size: fileStat.size,
        modifiedAt: fileStat.mtime.toISOString(),
        absolutePath: fullPath,
        rootPath: root.absolutePath,
        sourceUrl: `/api/source/${id}`,
      });
    }
  }

  assets.sort((a, b) => a.courseTitle.localeCompare(b.courseTitle) || a.sourceType.localeCompare(b.sourceType) || a.displayName.localeCompare(b.displayName));
  return {
    generatedAt: new Date().toISOString(),
    missingRoots,
    courses: roots.filter((root) => root.kind === 'archive').map(({ id, title }) => ({ id, title })),
    assets: assets.map(({ absolutePath: _absolutePath, rootPath: _rootPath, ...asset }) => asset),
    assetLookup: new Map(assets.map((asset) => [asset.id, asset])),
  };
}
