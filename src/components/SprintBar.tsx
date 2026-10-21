import { ArrowLeft, ArrowRight, Clock3, X } from 'lucide-react';
import type { Lesson, LessonMasterKey, PageGuide } from '../content/types';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function SprintBar({
  lesson,
  masterKey,
  pageGuides,
  stageIndex,
  elapsed,
  sourcePage,
  onNextStage,
  onExit,
  onNextSlide,
  onPreviousSlide,
}: {
  lesson: Lesson;
  masterKey: LessonMasterKey;
  pageGuides: Record<number, PageGuide>;
  stageIndex: number;
  elapsed: number;
  sourcePage: number;
  onNextStage: () => void;
  onExit: () => void;
  onNextSlide: () => void;
  onPreviousSlide: () => void;
}) {
  const stage = masterKey.sprint[Math.min(stageIndex, masterKey.sprint.length - 1)];
  const slidePages = lesson.pages.filter((page) => pageGuides[page.sourcePage]?.importance !== 'skip');
  const slidePosition = slidePages.findIndex((page) => page.sourcePage === sourcePage);
  const isSlideStage = stage.view === 'slides';
  const atStart = slidePosition <= 0;
  const atEnd = slidePosition === -1 || slidePosition >= slidePages.length - 1;

  return (
    <div className="sprint-bar">
      <div className="sprint-bar-main">
        <span className="sprint-stage-number">STAGE {stageIndex + 1}/{masterKey.sprint.length}</span>
        <div className="sprint-stage-copy">
          <b>{stage.title}</b>
          <span>{stage.detail}</span>
        </div>
        <span className="sprint-time"><Clock3 size={14} /> {formatTime(elapsed)}</span>
        {isSlideStage && <span className="sprint-slide-count">Slide {slidePages.length ? Math.max(1, slidePosition + 1) : 0} / {slidePages.length}</span>}
      </div>
      <div className="sprint-actions">
        {isSlideStage && (
          <>
            <button type="button" onClick={onPreviousSlide} disabled={atStart}><ArrowLeft size={14} /> Previous</button>
            {atEnd ? (
              <button type="button" className="is-primary" onClick={onNextStage}>Next stage <ArrowRight size={14} /></button>
            ) : (
              <button type="button" className="is-primary" onClick={onNextSlide}>Next slide <ArrowRight size={14} /></button>
            )}
          </>
        )}
        {!isSlideStage && (
          <button type="button" className="is-primary" onClick={onNextStage}>
            {stageIndex >= masterKey.sprint.length - 1 ? 'Finish sprint' : 'Next stage'} <ArrowRight size={14} />
          </button>
        )}
        <button type="button" className="sprint-exit" onClick={onExit} aria-label="Exit sprint"><X size={14} /> Exit</button>
      </div>
    </div>
  );
}
