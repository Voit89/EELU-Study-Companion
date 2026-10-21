import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpenCheck, CircleAlert, FileCheck2, ListFilter } from 'lucide-react';
import { COURSE_SHORT_NAMES } from '../content/courseLabels';
import { allLessons, allPracticeItems, allSectionCoverage } from '../content/lessonIndex';
import { COMPLETED_LESSONS_KEY, COMPLETED_PRACTICE_KEY, hasProgress, resetStudyProgress } from '../content/progress';
import { sourceKeyForAsset } from '../content/sourceKey';
import type { SourceAsset } from '../types/catalog';
import { SourceBadge } from './SourceBadge';

type CoverageFilter = 'all' | 'needs-work' | 'covered';
type YearFilter = 'all' | 'current' | 'archive';
type StudyFilter = 'all' | 'not-understood' | 'understood';

function isLessonAsset(asset: SourceAsset) {
  return asset.kind === 'lecture' || asset.kind === 'unit';
}

function pageStatus(asset: SourceAsset) {
  const lesson = allLessons.find((entry) => entry.sourceKey === sourceKeyForAsset(asset));
  if (!lesson) return { tone: 'pending', title: 'Explanation needed', detail: 'No page-by-page explanation yet.' };

  const validPages = lesson.pages.filter((page) => page.sourcePage > 0 && page.sourcePage <= lesson.sourcePageCount);
  const pagesByNumber = new Map(validPages.map((page) => [page.sourcePage, page]));
  const coveredPageNumbers = new Set(pagesByNumber.keys());
  const reviewedPages = [...pagesByNumber.values()];
  const explained = reviewedPages.filter((page) => page.coverage === 'explained').length;
  const visualOnly = reviewedPages.filter((page) => page.coverage === 'visual-only').length;
  const unreadable = reviewedPages.filter((page) => page.coverage === 'unreadable').length;
  const noExplanation = reviewedPages.filter((page) => page.coverage === 'not-applicable').length;
  const missing = Math.max(0, lesson.sourcePageCount - coveredPageNumbers.size);
  const unfinished = missing + unreadable + noExplanation;

  if (!unfinished) return {
    tone: 'complete',
    title: 'All pages accounted for',
    detail: `${explained} explained${visualOnly ? ` · ${visualOnly} title/visual-only` : ''} · ${lesson.sourcePageCount} source pages total.`,
  };
  const reviewed = coveredPageNumbers.size;
  const detail = [
    `${explained} explained`,
    visualOnly ? `${visualOnly} visual-only` : '',
    unreadable ? `${unreadable} unreadable` : '',
    noExplanation ? `${noExplanation} without explanation` : '',
    missing ? `${missing} not reviewed` : '',
  ].filter(Boolean).join(' · ');
  return { tone: 'partial', title: `${reviewed} of ${lesson.sourcePageCount} pages reviewed`, detail };
}

function sectionStatus(asset: SourceAsset) {
  const sourceKey = sourceKeyForAsset(asset);
  const coverage = allSectionCoverage.find((entry) => entry.sourceKey === sourceKey);
  const practiceCount = allPracticeItems.filter((item) => item.sectionSourceKey === sourceKey).length;
  if (!coverage) return { tone: 'pending', title: 'Section review needed', detail: 'Exercises have not been classified yet.' };
  if (coverage.disposition === 'unreadable') return { tone: 'partial', title: 'Needs a clearer source', detail: coverage.note || 'Part of this file could not be read.' };
  if (coverage.disposition === 'unclassified') return { tone: 'partial', title: 'Exercises need sorting', detail: coverage.note || 'The exercises have not been grouped by topic yet.' };
  return {
    tone: practiceCount ? 'complete' : 'partial',
    title: practiceCount ? `${practiceCount} practice ${practiceCount === 1 ? 'question' : 'questions'} mapped` : 'Section reviewed',
    detail: coverage.note || 'Mapped questions link back to this section file.',
  };
}

function getCoverage(asset: SourceAsset) {
  return isLessonAsset(asset) ? pageStatus(asset) : asset.kind === 'section' ? sectionStatus(asset) : pageStatus(asset);
}

function getStudyStatus(asset: SourceAsset): 'understood' | 'not-understood' | 'not-applicable' {
  if (isLessonAsset(asset)) {
    const lesson = allLessons.find((entry) => entry.sourceKey === sourceKeyForAsset(asset));
    if (!lesson) return 'not-understood';
    const pagesToStudy = lesson.pages.filter((page) => page.coverage === 'explained');
    return pagesToStudy.length > 0 && pagesToStudy.every((page) => hasProgress(COMPLETED_LESSONS_KEY, `${lesson.id}:${page.sourcePage}`))
      ? 'understood'
      : 'not-understood';
  }
  if (asset.kind === 'section') {
    const practices = allPracticeItems.filter((item) => item.sectionSourceKey === sourceKeyForAsset(asset));
    return practices.length > 0 && practices.every((item) => hasProgress(COMPLETED_PRACTICE_KEY, item.id))
      ? 'understood'
      : 'not-understood';
  }
  return 'not-applicable';
}

function getPageTotals() {
  return allLessons.reduce((totals, lesson) => {
    const byNumber = new Map(lesson.pages
      .filter((page) => page.sourcePage > 0 && page.sourcePage <= lesson.sourcePageCount)
      .map((page) => [page.sourcePage, page]));
    const pages = [...byNumber.values()];
    totals.sourcePages += lesson.sourcePageCount;
    totals.explained += pages.filter((page) => page.coverage === 'explained').length;
    totals.visualOnly += pages.filter((page) => page.coverage === 'visual-only').length;
    totals.unreadable += pages.filter((page) => page.coverage === 'unreadable').length;
    totals.noExplanation += pages.filter((page) => page.coverage === 'not-applicable').length;
    totals.unreviewed += Math.max(0, lesson.sourcePageCount - byNumber.size);
    return totals;
  }, { sourcePages: 0, explained: 0, visualOnly: 0, unreadable: 0, noExplanation: 0, unreviewed: 0 });
}

export function CoveragePanel({ assets, onOpen }: { assets: SourceAsset[]; onOpen: (asset: SourceAsset) => void }) {
  const [filter, setFilter] = useState<CoverageFilter>('all');
  const [course, setCourse] = useState('all');
  const [year, setYear] = useState<YearFilter>('all');
  const [study, setStudy] = useState<StudyFilter>('all');
  const [query, setQuery] = useState('');

  const records = useMemo(() => assets.map((asset) => ({
    asset,
    coverage: getCoverage(asset),
    studyStatus: getStudyStatus(asset),
    practiceTopics: allPracticeItems.filter((item) => item.sectionSourceKey === sourceKeyForAsset(asset)).map((item) => item.topic).join(' '),
  })), [assets]);
  const completedLessons = records.filter(({ asset, coverage }) => isLessonAsset(asset) && coverage.tone === 'complete').length;
  const coveredSections = records.filter(({ asset, coverage }) => asset.kind === 'section' && coverage.tone === 'complete').length;
  const openCount = records.filter(({ coverage }) => coverage.tone !== 'complete').length;
  const pageTotals = getPageTotals();
  const shownRecords = records.filter(({ asset, coverage, studyStatus, practiceTopics }) => {
    const matchesCourse = course === 'all' || asset.courseId === course;
    const matchesYear = year === 'all' || asset.sourceType === year;
    const matchesFilter = filter === 'all' || (filter === 'needs-work' ? coverage.tone !== 'complete' : coverage.tone === 'complete');
    const matchesQuery = !query.trim() || `${asset.displayName} ${asset.courseTitle} ${practiceTopics}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
    const matchesStudy = study === 'all' || studyStatus === study;
    return matchesCourse && matchesYear && matchesFilter && matchesStudy && matchesQuery;
  });

  function resetProgress() {
    const confirmed = window.confirm('Reset saved lesson and practice progress on this computer? This removes all “understood” and “mark done” checks.');
    if (!confirmed) return;
    resetStudyProgress();
    window.location.reload();
  }

  return (
    <details className="coverage-panel">
      <summary className="coverage-summary">
        <span className="coverage-summary-icon"><BookOpenCheck size={17} /></span>
        <span className="coverage-summary-copy">
          <b>Explanation coverage</b>
          <small>{completedLessons} lecture/unit files with all pages accounted for · {coveredSections} sections mapped · {openCount} need work</small>
        </span>
        <span className="coverage-summary-action">See file status <ListFilter size={14} /></span>
      </summary>
      <div className="coverage-content">
        <p className="coverage-intro">A lecture/unit file is complete when each source page is explained or marked as a title/visual-only page. Section status shows how many questions are mapped; it does not claim that every exercise is included. “Understood” means its explained pages or mapped practice items are marked. Your checks stay on this computer.</p>
        <p className="coverage-totals">Written lessons: <b>{pageTotals.explained} of {pageTotals.sourcePages} source pages explained</b> · {pageTotals.visualOnly} title/visual-only · {pageTotals.unreadable} unreadable · {pageTotals.unreviewed} not reviewed{pageTotals.noExplanation ? ` · ${pageTotals.noExplanation} without explanation` : ''}</p>
        <label className="coverage-search">Find a file or practice topic
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. functions, graphs, or a file name" aria-label="Find a file or practice topic" />
        </label>
        <div className="coverage-controls">
          <div className="coverage-selects">
            <label>Subject
              <select value={course} onChange={(event) => setCourse(event.target.value)} aria-label="Filter coverage by subject">
                <option value="all">All subjects</option>
                {Array.from(new Set(assets.map((asset) => asset.courseId))).map((id) => <option value={id} key={id}>{COURSE_SHORT_NAMES[id] || id}</option>)}
              </select>
            </label>
            <label>Folder
              <select value={year} onChange={(event) => setYear(event.target.value as YearFilter)} aria-label="Filter coverage by folder">
                <option value="all">Both folders</option>
                <option value="current">This year</option>
                <option value="archive">Older folder</option>
              </select>
            </label>
            <label>My progress
              <select value={study} onChange={(event) => setStudy(event.target.value as StudyFilter)} aria-label="Filter by what I understand">
                <option value="all">All progress</option>
                <option value="not-understood">Not yet understood</option>
                <option value="understood">Understood</option>
              </select>
            </label>
          </div>
          <div className="coverage-filter" role="group" aria-label="Filter coverage status">
            {([['all', 'All'], ['needs-work', 'Need work'], ['covered', 'Reviewed / mapped']] as const).map(([value, label]) => (
              <button className={filter === value ? 'is-active' : ''} key={value} onClick={() => setFilter(value)} type="button">{label}</button>
            ))}
          </div>
        </div>
        <div className="coverage-list" aria-live="polite">
          {shownRecords.map(({ asset, coverage, studyStatus }) => (
            <div className="coverage-row" key={asset.id}>
              <span className={`coverage-row-icon coverage-row-icon--${coverage.tone}`}>
                {coverage.tone === 'complete' ? <FileCheck2 size={15} /> : <CircleAlert size={15} />}
              </span>
              <span className="coverage-row-file">
                <b>{asset.displayName}</b>
                <span className="coverage-row-meta">
                  <small>{asset.courseTitle} · {asset.kind === 'section' ? 'Section practice' : asset.kind === 'unit' ? 'Unit' : asset.kind === 'lecture' ? 'Lecture' : 'Course material'}</small>
                  <SourceBadge type={asset.sourceType} compact />
                </span>
              </span>
              <span className={`coverage-row-status coverage-row-status--${coverage.tone}`}>
                <b>{coverage.title}</b><small>{coverage.detail}</small>
                {studyStatus !== 'not-applicable' && <small className={`coverage-progress-status ${studyStatus === 'understood' ? 'is-understood' : ''}`}>{studyStatus === 'understood' ? 'Marked understood' : 'Not marked understood yet'}</small>}
              </span>
              <button className="coverage-open" type="button" onClick={() => onOpen(asset)} aria-label={`Open ${asset.displayName}`}>
                Open <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
          {shownRecords.length === 0 && <p className="coverage-empty">No files match these filters.</p>}
        </div>
        <div className="coverage-footer">
          <span>Progress checks are saved in this browser on your computer.</span>
          <button type="button" onClick={resetProgress}>Reset saved progress</button>
        </div>
      </div>
    </details>
  );
}
