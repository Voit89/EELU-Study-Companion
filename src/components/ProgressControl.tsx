import { useState } from 'react';
import { Check, Circle } from 'lucide-react';
import { COMPLETED_LESSONS_KEY, hasProgress, toggleProgress } from '../content/progress';

export function ProgressControl({ lessonId }: { lessonId: string }) {
  const [completed, setCompleted] = useState(() => hasProgress(COMPLETED_LESSONS_KEY, lessonId));

  function toggle() {
    setCompleted(toggleProgress(COMPLETED_LESSONS_KEY, lessonId));
  }

  return (
    <button className={`progress-control ${completed ? 'is-complete' : ''}`} type="button" onClick={toggle} aria-pressed={completed}>
      {completed ? <Check size={14} /> : <Circle size={14} />}
      {completed ? 'Marked understood' : 'Mark as understood'}
    </button>
  );
}
