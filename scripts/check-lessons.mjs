import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lessonDir = path.join(root, 'src', 'content', 'lessons');
const masterDir = path.join(root, 'src', 'content', 'masterKeys');

const targets = [
  {
    lessonPath: path.join(lessonDir, 'discrete-math-lecture-3.ts'),
    masterPath: path.join(masterDir, 'discrete-math-lecture-3.ts'),
    lessonExport: 'discreteMathLecture3Lesson',
    masterExport: 'discreteMathLecture3MasterKey',
    guideExport: 'discreteMathLecture3PageGuides',
  },
  {
    lessonPath: path.join(lessonDir, 'mathematics-1-lecture-7.ts'),
    masterPath: path.join(masterDir, 'mathematics-1-lecture-7.ts'),
    lessonExport: 'mathematics1Lecture7Lesson',
    masterExport: 'mathematics1Lecture7MasterKey',
    guideExport: 'mathematics1Lecture7PageGuides',
  },
];

const errors = [];
const warnings = [];
const countWords = (value) => String(value).split(/\s+/).filter(Boolean).length;

for (const target of targets) {
  const lessonModule = await import(pathToFileURL(target.lessonPath).href);
  const masterModule = await import(pathToFileURL(target.masterPath).href);
  const lesson = lessonModule[target.lessonExport];
  const masterKey = masterModule[target.masterExport];
  const pageGuides = masterModule[target.guideExport];
  const label = `${lesson.title} (${path.basename(target.masterPath)})`;

  const check = (condition, message) => {
    if (!condition) errors.push(`${label}: ${message}`);
  };
  const warn = (condition, message) => {
    if (!condition) warnings.push(`${label}: ${message}`);
  };

  const pageNumbers = lesson.pages.map((page) => page.sourcePage).sort((a, b) => a - b);
  const expectedPages = Array.from({ length: lesson.sourcePageCount }, (_, index) => index + 1);
  const duplicatePages = pageNumbers.filter((number, index) => pageNumbers.indexOf(number) !== index);
  const missingPages = expectedPages.filter((number) => !pageNumbers.includes(number));
  const extraPages = pageNumbers.filter((number) => number < 1 || number > lesson.sourcePageCount);
  const guideNumbers = Object.keys(pageGuides).map(Number).sort((a, b) => a - b);
  const missingGuides = expectedPages.filter((number) => !guideNumbers.includes(number));
  const invalidGuides = guideNumbers.filter((number) => number < 1 || number > lesson.sourcePageCount);
  const mustPages = lesson.pages.filter((page) => pageGuides[page.sourcePage]?.importance === 'must');
  const skimPages = lesson.pages.filter((page) => pageGuides[page.sourcePage]?.importance === 'skim');
  const skipPages = lesson.pages.filter((page) => pageGuides[page.sourcePage]?.importance === 'skip');

  check(lesson.pages.length === lesson.sourcePageCount, `Lesson has ${lesson.pages.length} page entries for ${lesson.sourcePageCount} source pages.`);
  check(duplicatePages.length === 0, `Duplicate source pages: ${duplicatePages.join(', ')}`);
  check(missingPages.length === 0, `Missing source pages: ${missingPages.join(', ')}`);
  check(extraPages.length === 0, `Out-of-range source pages: ${extraPages.join(', ')}`);
  check(missingGuides.length === 0, `Missing page guides: ${missingGuides.join(', ')}`);
  check(invalidGuides.length === 0, `Page guides outside the source range: ${invalidGuides.join(', ')}`);
  check(mustPages.length >= Math.ceil(lesson.sourcePageCount * 0.4), `Only ${mustPages.length} must-know pages; expected at least 40% of the source.`);
  check(skipPages.length >= 2, `Only ${skipPages.length} skipped pages; expected at least 2.`);

  for (const page of lesson.pages) {
    const guide = pageGuides[page.sourcePage];
    check(Boolean(guide), `Page ${page.sourcePage} has no importance guide.`);
    if (!guide) continue;
    const zobda = page.blocks.find((block) => block.type === 'zobda');
    if (page.coverage === 'explained') {
      check(Boolean(zobda), `Page ${page.sourcePage} is explained but has no Zatoona block.`);
    }
    if (guide.importance === 'must') {
      check(Array.isArray(guide.examMove) && guide.examMove.length >= 2 && guide.examMove.length <= 4, `Page ${page.sourcePage} must have 2-4 exam-move steps.`);
      check(Boolean(guide.check), `Page ${page.sourcePage} must have a full-marks check.`);
    }
    if (zobda) {
      const words = countWords(zobda.text);
      warn(words <= 32, `Page ${page.sourcePage} Zatoona is ${words} words (target 32 max).`);
      if (guide.importance === 'must') {
        const quickWords = words + countWords((guide.examMove || []).join(' ')) + countWords(guide.check || '');
        warn(quickWords <= 90, `Page ${page.sourcePage} quick card is ${quickWords} words (target 90 max).`);
      }
    }
  }

  check(masterKey.rules.length >= 5 && masterKey.rules.length <= 8, `Master key has ${masterKey.rules.length} rules; expected 5-8.`);
  check(masterKey.recipes.length >= 5 && masterKey.recipes.length <= 8, `Master key has ${masterKey.recipes.length} recipes; expected 5-8.`);
  check(masterKey.recall.length >= 10, `Master key has ${masterKey.recall.length} recall cards; expected at least 10.`);
  check(masterKey.traps.length >= 8, `Master key has ${masterKey.traps.length} traps; expected at least 8.`);
  check(masterKey.checklist.length >= 8, `Master key has ${masterKey.checklist.length} checklist items; expected at least 8.`);
  check(masterKey.formulaSheet.length >= 10, `Master key has ${masterKey.formulaSheet.length} formula rows; expected at least 10.`);
  check(masterKey.sprint.length === 5, `Sprint has ${masterKey.sprint.length} stages; expected 5.`);
  check(masterKey.sprint.reduce((total, stage) => total + stage.minutes, 0) === 55, 'Sprint stages must add up to exactly 55 minutes.');

  for (const recipe of masterKey.recipes) {
    check(Boolean(recipe.name && recipe.trigger), `Recipe ${recipe.id} is missing a name or trigger.`);
    check(recipe.steps.length >= 3 && recipe.steps.length <= 5, `Recipe ${recipe.id} has ${recipe.steps.length} steps; expected 3-5.`);
    check(Boolean(recipe.example?.question && recipe.example?.answer), `Recipe ${recipe.id} needs a solved example and answer.`);
    check(Array.isArray(recipe.example?.steps) && recipe.example.steps.length >= 2, `Recipe ${recipe.id} example needs at least two steps.`);
    check(Boolean(recipe.check), `Recipe ${recipe.id} needs a full-marks check.`);
  }

  const masterWords = countWords(JSON.stringify(masterKey));
  warn(masterWords <= 1800, `Master key is ${masterWords} words; target 1800 max.`);
  const quickSeconds = mustPages.length * 30 + skimPages.length * 10;
  const recipeSeconds = masterKey.recipes.length * 135;
  const estimatedSeconds = 8 * 60 + quickSeconds + recipeSeconds + 10 * 60 + 5 * 60;
  check(estimatedSeconds <= 55 * 60, `Estimated study path is ${Math.round(estimatedSeconds / 60)} minutes; must be 55 or less.`);

  const raw = await readFile(target.masterPath, 'utf8');
  for (const marker of ['TODO', 'lorem ipsum', 'placeholder']) {
    check(!raw.toLowerCase().includes(marker.toLowerCase()), `Master key contains a placeholder marker: ${marker}`);
  }

  console.log('Lesson validation');
  console.log('-----------------');
  console.log(`Lesson: ${lesson.title}`);
  console.log(`Source pages: ${lesson.sourcePageCount}`);
  console.log(`Pages with notes: ${lesson.pages.length}`);
  console.log(`Page guides: ${guideNumbers.length}`);
  console.log(`Must know: ${mustPages.length} | skim: ${skimPages.length} | skip: ${skipPages.length}`);
  console.log(`Rules: ${masterKey.rules.length} | recipes: ${masterKey.recipes.length} | recall: ${masterKey.recall.length}`);
  console.log(`Formula rows: ${masterKey.formulaSheet.length} | traps: ${masterKey.traps.length}`);
  console.log(`Master key words: ${masterWords}`);
  console.log(`Estimated under-one-hour path: ${Math.round(estimatedSeconds / 60)} minutes`);
  console.log(`Quick pass estimate: ${Math.round(quickSeconds / 60)} minutes for ${mustPages.length + skimPages.length} slides`);
  console.log('');
}

const masterFiles = (await readdir(masterDir)).filter((file) => file.endsWith('.ts') && file !== 'index.ts');
const registeredFiles = new Set(targets.map((target) => path.basename(target.masterPath)));
for (const file of masterFiles) {
  if (!registeredFiles.has(file)) {
    errors.push(`${file}: master key file is not listed in scripts/check-lessons.mjs.`);
  }
}

if (warnings.length) {
  console.log(`Warnings (${warnings.length})`);
  for (const warning of warnings) console.log(`- ${warning}`);
  console.log('');
}

if (errors.length) {
  console.error(`Errors (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('All checks passed.');
