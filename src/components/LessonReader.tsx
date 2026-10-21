import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookMarked, CircleHelp, FileQuestion, PanelTopOpen } from 'lucide-react';
import { COURSE_SHORT_NAMES } from '../content/courseLabels';
import type { Lesson, LessonMasterKey, LessonView, PageGuide, PracticeItem, SectionCoverage } from '../content/types';
import type { SourceAsset } from '../types/catalog';
import { LessonBlock } from './LessonBlock';
import { LessonMarkdown } from './LessonMarkdown';
import { MasterKeyView } from './MasterKeyView';
import { ProgressControl } from './ProgressControl';
import { PracticeCard } from './PracticeCard';
import { RecallView } from './RecallView';
import { SprintBar } from './SprintBar';
import { TopicExplorer } from './TopicExplorer';
import { topicsByLessonId } from '../content/topics';

const quickBlockTypes = new Set(['zobda', 'trap', 'formula', 'shortcut']);

function isQuickBlock(block: Lesson['pages'][number]['blocks'][number]) {
  if (quickBlockTypes.has(block.type)) return true;
  if (block.type === 'recognition') return /if you see|if a question|when/i.test(block.title);
  return false;
}

export function LessonReader({
  asset,
  lesson,
  sourcePage,
  onGoToSourcePage,
  practices,
  sectionPractices,
  sectionCoverage,
  masterKey,
  pageGuides,
  lessonPractices,
}: {
  asset: SourceAsset;
  lesson: Lesson | null;
  sourcePage: number;
  onGoToSourcePage: (page: number) => void;
  practices: Map<string, PracticeItem>;
  sectionPractices: PracticeItem[];
  sectionCoverage: SectionCoverage | null;
  masterKey: LessonMasterKey | null;
  pageGuides: Record<number, PageGuide> | null;
  lessonPractices: PracticeItem[];
}) {
  const topicSet = lesson ? topicsByLessonId.get(lesson.id) || null : null;
  const [view, setView] = useState<LessonView>(topicSet ? 'topics' : masterKey ? 'master' : 'slides');
  const [quick, setQuick] = useState(true);
  const [deepPages, setDeepPages] = useState<Set<number>>(() => new Set());
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintStage, setSprintStage] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const nextTopicSet = lesson ? topicsByLessonId.get(lesson.id) || null : null;
    setView(nextTopicSet ? 'topics' : masterKey ? 'master' : 'slides');
    setQuick(true);
    setDeepPages(new Set());
    setSprintActive(false);
    setSprintStage(0);
    setElapsed(0);
  }, [lesson?.id, masterKey]);

  useEffect(() => {
    if (!sprintActive) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [sprintActive]);

  const lessonPage = useMemo(() => lesson?.pages.find((page) => page.sourcePage === sourcePage) || null, [lesson, sourcePage]);
  const pagePosition = lesson && lessonPage ? lesson.pages.findIndex((page) => page.sourcePage === lessonPage.sourcePage) : -1;
  const previousPage = lesson && pagePosition > 0 ? lesson.pages[pagePosition - 1].sourcePage : null;
  const nextPage = lesson && pagePosition >= 0 && pagePosition < lesson.pages.length - 1 ? lesson.pages[pagePosition + 1].sourcePage : null;
  const guide = pageGuides?.[sourcePage] || null;
  const slidePages = useMemo(
    () => lesson?.pages.filter((page) => pageGuides?.[page.sourcePage]?.importance !== 'skip') || [],
    [lesson, pageGuides],
  );

  function goToPage(page: number) {
    onGoToSourcePage(page);
    setView('slides');
  }

  function startSprint() {
    if (!masterKey) return;
    setSprintActive(true);
    setSprintStage(0);
    setElapsed(0);
    setView('master');
    window.setTimeout(() => document.getElementById('mk-rules')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function scrollToAnchor(anchor?: string) {
    if (!anchor) return;
    window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function advanceStage() {
    if (!masterKey) return;
    const nextIndex = sprintStage + 1;
    if (nextIndex >= masterKey.sprint.length) {
      setSprintActive(false);
      setView('master');
      scrollToAnchor('mk-formula-sheet');
      return;
    }
    const nextStage = masterKey.sprint[nextIndex];
    setSprintStage(nextIndex);
    setView(nextStage.view);
    if (nextStage.view === 'slides') {
      const first = slidePages[0];
      if (first) onGoToSourcePage(first.sourcePage);
      setQuick(true);
    }
    scrollToAnchor(nextStage.anchor);
  }

  function nextSlide() {
    const next = slidePages.find((page) => page.sourcePage > sourcePage);
    if (next) onGoToSourcePage(next.sourcePage);
    else advanceStage();
  }

  function previousSlide() {
    const previous = [...slidePages].reverse().find((page) => page.sourcePage < sourcePage);
    if (previous) onGoToSourcePage(previous.sourcePage);
  }

  function toggleDeepPage() {
    setDeepPages((current) => {
      const next = new Set(current);
      if (next.has(sourcePage)) next.delete(sourcePage);
      else next.add(sourcePage);
      return next;
    });
  }

  if (asset.kind === 'section') {
    const coverageLabel = sectionCoverage?.disposition === 'mapped'
      ? 'Practice reviewed'
      : sectionCoverage?.disposition === 'unreadable'
        ? 'Needs a visual review'
        : sectionCoverage?.disposition === 'unclassified'
          ? 'Not mapped yet'
          : 'Not reviewed yet';

    return (
      <section className="lesson-empty-state">
        <div className="lesson-empty-icon"><FileQuestion size={22} /></div>
        <span className="lesson-kicker">SECTION PRACTICE · {coverageLabel.toUpperCase()}</span>
        <h1>{asset.displayName}</h1>
        <p>The original section file is open beside this pane. Use its page or slide number to follow along with each question.</p>
        {sectionCoverage?.note && <div className="lesson-page-note"><BookMarked size={15} /><span>{sectionCoverage.note}</span></div>}
        {sectionPractices.length > 0 ? (
          <div className="section-practice-list">
            {sectionPractices.map((item) => <PracticeCard key={item.id} item={item} onSourceReference={onGoToSourcePage} />)}
          </div>
        ) : (
          <div className="lesson-coverage-note">There is no mapped practice question for this section yet. You can still work from the original file while its questions are reviewed.</div>
        )}
        <div className="empty-state-tip"><CircleHelp size={15} /><span>Try the question first. Reveal a hint, then the worked steps, and check the answer last.</span></div>
      </section>
    );
  }

  if (!lesson) {
    return (
      <div className="lesson-empty-state">
        <div className="lesson-empty-icon"><FileQuestion size={22} /></div>
        <span className="lesson-kicker">YOUR EXPLANATION</span>
        <h1>This lesson is still being prepared.</h1>
        <p>The original course material is open beside this pane. Use its page and slide controls while you study; new Moodle material remains clearly marked as current.</p>
        <div className="empty-state-tip"><CircleHelp size={15} /><span>When a source page has an explanation, its number appears here and clicking it returns to that page.</span></div>
      </div>
    );
  }

  const tabs = (
    <nav className="lesson-tabs" aria-label="Lesson views">
      {topicSet && (
        <button type="button" className={view === 'topics' ? 'is-active' : ''} onClick={() => setView('topics')} aria-selected={view === 'topics'}>
          Concepts <span className="lesson-tab-count">{topicSet.topics.length}</span>
        </button>
      )}
      {masterKey && (
        <button type="button" className={view === 'master' ? 'is-active' : ''} onClick={() => setView('master')} aria-selected={view === 'master'}>
          Master Key
        </button>
      )}
      <button type="button" className={view === 'slides' ? 'is-active' : ''} onClick={() => setView('slides')} aria-selected={view === 'slides'}>
        Slides
      </button>
      {lessonPractices.length > 0 && (
        <button type="button" className={view === 'practice' ? 'is-active' : ''} onClick={() => setView('practice')} aria-selected={view === 'practice'}>
          Practice <span className="lesson-tab-count">{lessonPractices.length}</span>
        </button>
      )}
      {masterKey && (
        <button type="button" className={view === 'recall' ? 'is-active' : ''} onClick={() => setView('recall')} aria-selected={view === 'recall'}>
          Recall <span className="lesson-tab-count">{masterKey.recall.length}</span>
        </button>
      )}
    </nav>
  );

  if (topicSet && view === 'topics') {
    return (
      <div className="lesson-reader-content lesson-reader-content--master">
        {tabs}
        <TopicExplorer topicSet={topicSet} onGoToSourcePage={onGoToSourcePage} />
      </div>
    );
  }

  if (masterKey && view === 'master') {
    return (
      <div className="lesson-reader-content lesson-reader-content--master">
        {sprintActive && (
          <SprintBar
            lesson={lesson}
            masterKey={masterKey}
            pageGuides={pageGuides || {}}
            stageIndex={sprintStage}
            elapsed={elapsed}
            sourcePage={sourcePage}
            onNextStage={advanceStage}
            onExit={() => setSprintActive(false)}
            onNextSlide={nextSlide}
            onPreviousSlide={previousSlide}
          />
        )}
        {tabs}
        <MasterKeyView
          lesson={lesson}
          masterKey={masterKey}
          pageGuides={pageGuides || {}}
          onGoToPage={goToPage}
          onStartSprint={startSprint}
        />
      </div>
    );
  }

  if (masterKey && view === 'recall') {
    return (
      <div className="lesson-reader-content lesson-reader-content--master">
        {sprintActive && (
          <SprintBar
            lesson={lesson}
            masterKey={masterKey}
            pageGuides={pageGuides || {}}
            stageIndex={sprintStage}
            elapsed={elapsed}
            sourcePage={sourcePage}
            onNextStage={advanceStage}
            onExit={() => setSprintActive(false)}
            onNextSlide={nextSlide}
            onPreviousSlide={previousSlide}
          />
        )}
        {tabs}
        <RecallView cards={masterKey.recall} />
      </div>
    );
  }

  if (view === 'practice') {
    return (
      <div className="lesson-reader-content lesson-reader-content--master">
        {tabs}
        <section className="lesson-practice-view">
          <span className="lesson-kicker">PRACTICE · OUTSIDE THE 55-MINUTE PATH</span>
          <h1>Solve the questions, not just read them</h1>
          <p>These are the mapped questions for this lecture. Try first, reveal a hint, then the worked steps, then the answer. This is the pass that turns understanding into full marks.</p>
          <div className="section-practice-list">
            {lessonPractices.map((item) => <PracticeCard key={item.id} item={item} onSourceReference={goToPage} />)}
          </div>
        </section>
      </div>
    );
  }

  if (!lessonPage) {
    return (
      <div className="lesson-reader-content lesson-reader-content--master">
        {tabs}
        <div className="lesson-empty-state">
          <div className="lesson-empty-icon"><FileQuestion size={22} /></div>
          <span className="lesson-kicker">YOUR EXPLANATION</span>
          <h1>Page {sourcePage} has no written notes yet.</h1>
          <p>The original course material is open beside this pane. Use its page and slide controls while you study; new Moodle material remains clearly marked as current.</p>
          <p className="lesson-coverage-note">This file has notes for {lesson.pages.length} of its {lesson.sourcePageCount} source pages. Pages without notes are intentionally left unfilled rather than guessed.</p>
          <div className="empty-state-tip"><CircleHelp size={15} /><span>When a source page has an explanation, its number appears here and clicking it returns to that page.</span></div>
          <div className="lesson-page-links"><b>Pages with notes</b><div>{lesson.pages.map((page) => <button key={page.sourcePage} type="button" onClick={() => onGoToSourcePage(page.sourcePage)}>{page.sourcePage}</button>)}</div></div>
        </div>
      </div>
    );
  }

  const isDeepPage = deepPages.has(sourcePage);
  const shownBlocks = quick && !isDeepPage ? lessonPage.blocks.filter(isQuickBlock) : lessonPage.blocks;
  const zobdaBlock = shownBlocks.find((block) => block.type === 'zobda');
  const otherBlocks = shownBlocks.filter((block) => block !== zobdaBlock);
  const hasHiddenBlocks = quick && !isDeepPage && lessonPage.blocks.some((block) => !isQuickBlock(block));
  const importanceLabel = guide?.importance === 'must' ? 'MUST KNOW' : guide?.importance === 'skim' ? 'SKIM' : guide?.importance === 'skip' ? 'SKIP IN SPRINT' : '';

  return (
    <div className="lesson-reader-content">
      {sprintActive && masterKey && (
        <SprintBar
          lesson={lesson}
          masterKey={masterKey}
          pageGuides={pageGuides || {}}
          stageIndex={sprintStage}
          elapsed={elapsed}
          sourcePage={sourcePage}
          onNextStage={advanceStage}
          onExit={() => setSprintActive(false)}
          onNextSlide={nextSlide}
          onPreviousSlide={previousSlide}
        />
      )}
      {tabs}
      <div className="lesson-reading-topline">
        <span className="lesson-kicker">{COURSE_SHORT_NAMES[lesson.courseId] || asset.courseTitle.toUpperCase()} · PAGE {lessonPage.sourcePage}</span>
        <ProgressControl lessonId={`${lesson.id}:${lessonPage.sourcePage}`} />
      </div>
      <div className="lesson-reading-heading">
        <div>
          <span className="lesson-section-label">{lessonPage.coverage === 'visual-only' ? 'VISUAL PAGE' : 'LESSON PAGE'}{importanceLabel ? ` · ${importanceLabel}` : ''}</span>
          <h1>{lessonPage.title}</h1>
        </div>
        <button type="button" className="source-page-link" onClick={() => onGoToSourcePage(lessonPage.sourcePage)}><PanelTopOpen size={15} /> Open source page {lessonPage.sourcePage}</button>
      </div>

      <div className="lesson-view-tools">
        <div className="quick-toggle" role="group" aria-label="Explanation depth">
          <button type="button" className={quick ? 'is-active' : ''} onClick={() => setQuick(true)}>Quick</button>
          <button type="button" className={!quick ? 'is-active' : ''} onClick={() => setQuick(false)}>Deep</button>
        </div>
        {quick && hasHiddenBlocks && (
          <button type="button" className="deep-page-link" onClick={toggleDeepPage}>
            {isDeepPage ? 'Hide full explanation' : 'Show full explanation'}
          </button>
        )}
      </div>

      {guide?.importance === 'skip' && (
        <div className="skip-note"><b>Skip in the 55-minute sprint.</b> This slide is a cover, divider, or motivation page. It is kept here so every source page stays accounted for.</div>
      )}
      {lessonPage.note && <div className="lesson-page-note"><BookMarked size={15} /><span>{lessonPage.note}</span></div>}

      <div className="lesson-blocks">
        {zobdaBlock && <LessonBlock block={zobdaBlock} practices={practices} />}
        {guide?.examMove && (
          <section className="lesson-block exam-move">
            <h3>Fast method</h3>
            <ol>
              {guide.examMove.map((step) => <li key={step}><LessonMarkdown>{step}</LessonMarkdown></li>)}
            </ol>
            {guide.check && <p className="exam-check"><b>Full-marks check:</b> {guide.check}</p>}
          </section>
        )}
        {otherBlocks.map((block, index) => <LessonBlock key={`${lesson.id}:${lessonPage.sourcePage}:${index}`} block={block} practices={practices} />)}
      </div>

      <nav className="lesson-page-nav" aria-label="Explanation pages">
        <button type="button" disabled={previousPage === null} onClick={() => previousPage !== null && onGoToSourcePage(previousPage)}><ArrowLeft size={14} /> Previous explanation</button>
        <span>Explanation {pagePosition + 1} / {lesson.pages.length} · source page {lessonPage.sourcePage} / {lesson.sourcePageCount}</span>
        <button type="button" disabled={nextPage === null} onClick={() => nextPage !== null && onGoToSourcePage(nextPage)}>Next explanation <ArrowRight size={14} /></button>
      </nav>
    </div>
  );
}
