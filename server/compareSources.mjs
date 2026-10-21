import { readFile } from 'node:fs/promises';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { strFromU8, unzipSync } from 'fflate';
import { createHash } from 'node:crypto';

const MAX_COMPARE_BYTES = 60 * 1024 * 1024;

function digest(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function normalizeText(value) {
  return value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
}

function decodeXml(value) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&amp;', '&');
}

async function extractPdfPages(buffer) {
  const loadingTask = getDocument({ data: new Uint8Array(buffer), verbosity: 0, useSystemFonts: false });
  try {
    const pdf = await loadingTask.promise;
    const pages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => 'str' in item ? item.str : '').join(' '));
    }
    return pages;
  } finally {
    await loadingTask.destroy();
  }
}

function extractPptxSlides(buffer) {
  const entries = unzipSync(new Uint8Array(buffer));
  const slidePaths = Object.keys(entries)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
    .sort((a, b) => Number(a.match(/slide(\d+)\.xml/i)?.[1]) - Number(b.match(/slide(\d+)\.xml/i)?.[1]));

  return slidePaths.map((name) => {
    const xml = strFromU8(entries[name]);
    return [...xml.matchAll(/<(?:a|m):t\b[^>]*>([\s\S]*?)<\/(?:a|m):t>/g)]
      .map((match) => decodeXml(match[1]))
      .join(' ');
  });
}

async function extractPages(extension, buffer) {
  if (extension === '.pdf') return extractPdfPages(buffer);
  if (extension === '.pptx') return extractPptxSlides(buffer);
  return null;
}

function comparePages(currentPages, archivePages, itemKind) {
  const currentText = currentPages.map(normalizeText);
  const archiveText = archivePages.map(normalizeText);
  const sharedPageCount = Math.min(currentText.length, archiveText.length);
  const changedPages = [];
  const unreadablePages = [];

  for (let index = 0; index < sharedPageCount; index += 1) {
    if (currentText[index].length < 6 || archiveText[index].length < 6) unreadablePages.push(index + 1);
    else if (currentText[index] !== archiveText[index]) changedPages.push(index + 1);
  }

  const currentOnlyPages = currentText.length > sharedPageCount
    ? Array.from({ length: currentText.length - sharedPageCount }, (_, index) => sharedPageCount + index + 1)
    : [];
  const archiveOnlyPages = archiveText.length > sharedPageCount
    ? Array.from({ length: archiveText.length - sharedPageCount }, (_, index) => sharedPageCount + index + 1)
    : [];
  const readableCount = sharedPageCount - unreadablePages.length;
  const status = readableCount === 0 || unreadablePages.length > 0
    ? 'not-enough-readable-text'
    : changedPages.length === 0 && currentOnlyPages.length === 0 && archiveOnlyPages.length === 0
      ? 'text-matches'
      : 'some-differences';

  return {
    status,
    currentPageCount: currentPages.length,
    archivePageCount: archivePages.length,
    changedPages,
    currentOnlyPages,
    archiveOnlyPages,
    unreadablePages,
    comparedAs: itemKind === 'slides' ? 'slide-text' : 'page-text',
  };
}

export async function compareSources(currentAsset, archiveAsset) {
  const unsupported = (reason) => ({
    status: 'not-enough-readable-text',
    currentPageCount: null,
    archivePageCount: null,
    changedPages: [],
    currentOnlyPages: [],
    archiveOnlyPages: [],
    unreadablePages: [],
    comparedAs: 'unsupported',
    reason,
  });

  if (currentAsset.sourceType !== 'current' || archiveAsset.sourceType !== 'archive') {
    throw new Error('Choose one current Moodle item and one older course item.');
  }
  if (currentAsset.size > MAX_COMPARE_BYTES || archiveAsset.size > MAX_COMPARE_BYTES) {
    return unsupported('This file is too large for a text comparison in the study companion.');
  }

  const [currentBuffer, archiveBuffer] = await Promise.all([
    readFile(currentAsset.absolutePath),
    readFile(archiveAsset.absolutePath),
  ]);
  if (digest(currentBuffer) === digest(archiveBuffer)) {
    return {
      status: 'same-file',
      currentPageCount: null,
      archivePageCount: null,
      changedPages: [],
      currentOnlyPages: [],
      archiveOnlyPages: [],
      unreadablePages: [],
      comparedAs: 'sha256',
    };
  }

  if (currentAsset.extension !== archiveAsset.extension) {
    return unsupported('The two files use different formats, so their text cannot be compared reliably.');
  }
  const pages = await extractPages(currentAsset.extension, currentBuffer).then(async (currentPages) => {
    const archivePages = await extractPages(archiveAsset.extension, archiveBuffer);
    return currentPages && archivePages ? comparePages(currentPages, archivePages, currentAsset.extension === '.pptx' ? 'slides' : 'pages') : null;
  });
  return pages || unsupported('Text comparison is available for PDF and PowerPoint (.pptx) files.');
}
