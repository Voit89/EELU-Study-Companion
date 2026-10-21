import { useState } from 'react';
import { Check, ChevronDown, Lightbulb, RotateCcw } from 'lucide-react';
import type { PracticeItem } from '../content/types';
import { COMPLETED_PRACTICE_KEY, hasProgress, toggleProgress } from '../content/progress';
import { LessonMarkdown } from './LessonMarkdown';

export function PracticeCard({ item, onSourceReference }: { item: PracticeItem; onSourceReference?: (page: number) => void }) {
  const [hintOpen, setHintOpen] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [completed, setCompleted] = useState(() => hasProgress(COMPLETED_PRACTICE_KEY, item.id));
  const sourceLocation = item.sectionSourcePage
    ? `${item.sectionSourceKey.toLowerCase().endsWith('.pptx') || item.sectionSourceKey.toLowerCase().endsWith('.ppt') ? 'SLIDE' : 'PAGE'} ${item.sectionSourcePage}`
    : '';

  return (
    <article className="practice-card">
      <div className="practice-card-kicker"><span>TRY IT YOURSELF</span>{item.questionSource === 'section' ? <button className="practice-source-link" type="button" disabled={!item.sectionSourcePage || !onSourceReference} onClick={() => item.sectionSourcePage && onSourceReference?.(item.sectionSourcePage)}>FROM YOUR SECTION{sourceLocation ? ` · ${sourceLocation}` : ''}</button> : <span>ADDED PRACTICE</span>}</div>
      <h3>{item.topic}</h3>
      <div className="practice-question"><LessonMarkdown>{item.question}</LessonMarkdown></div>
      <div className="practice-actions">
        <button type="button" onClick={() => setHintOpen((open) => !open)} aria-expanded={hintOpen}><Lightbulb size={14} /> Hint <ChevronDown size={13} /></button>
        <button type="button" onClick={() => setStepsOpen((open) => !open)} aria-expanded={stepsOpen}><RotateCcw size={14} /> Worked steps <ChevronDown size={13} /></button>
        <button type="button" onClick={() => setAnswerOpen((open) => !open)} aria-expanded={answerOpen}><Check size={14} /> Answer <ChevronDown size={13} /></button>
        <button className={completed ? 'is-complete' : ''} type="button" onClick={() => setCompleted(toggleProgress(COMPLETED_PRACTICE_KEY, item.id))} aria-pressed={completed}><Check size={14} /> {completed ? 'Completed' : 'Mark done'}</button>
      </div>
      {hintOpen && <div className="practice-reveal"><b>Start here</b><LessonMarkdown>{item.hint}</LessonMarkdown></div>}
      {stepsOpen && <div className="practice-reveal"><b>Work through it</b><ol>{item.steps.map((step, index) => <li key={index}><LessonMarkdown>{step}</LessonMarkdown></li>)}</ol>{item.alternativeExplanation && <LessonMarkdown>{item.alternativeExplanation}</LessonMarkdown>}</div>}
      {answerOpen && <div className="practice-answer"><b>Answer</b><LessonMarkdown>{item.answer}</LessonMarkdown></div>}
    </article>
  );
}
