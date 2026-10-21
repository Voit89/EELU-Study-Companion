import type { LessonBlock as LessonBlockData, PracticeItem } from '../content/types';
import { LessonMarkdown } from './LessonMarkdown';
import { PracticeCard } from './PracticeCard';

export function LessonBlock({ block, practices }: { block: LessonBlockData; practices: Map<string, PracticeItem> }) {
  if (block.type === 'zobda') return <div className="zobda-block"><span className="zobda-label"><b dir="rtl">الزتونة</b><small>CORE TAKEAWAY</small></span><LessonMarkdown>{block.text}</LessonMarkdown></div>;
  if (block.type === 'formula') return <section className="lesson-block lesson-block--formula"><h3>{block.label}</h3><LessonMarkdown>{`$$${block.latex}$$\n\n${block.explanation}`}</LessonMarkdown></section>;
  if (block.type === 'worked-example') return <section className="lesson-block worked-example"><h3>{block.title}</h3>{block.givens && <p className="example-givens"><b>Given:</b> {block.givens}</p>}<ol>{block.steps.map((step, index) => <li key={index}><LessonMarkdown>{step}</LessonMarkdown></li>)}</ol>{block.conclusion && <p className="example-conclusion">{block.conclusion}</p>}</section>;
  if (block.type === 'practice') {
    const item = practices.get(block.practiceId);
    return item ? <PracticeCard item={item} /> : null;
  }
  if (block.type === 'source-note') return <aside className="source-note"><b>Source note</b><p>{block.text}</p></aside>;

  const label: Record<Exclude<LessonBlockData['type'], 'zobda' | 'formula' | 'worked-example' | 'practice' | 'source-note'>, string> = {
    foundation: 'Step-by-step walkthrough',
    recognition: 'If you see this, think…',
    why: 'Why this works',
    trap: 'Common trap to avoid',
    shortcut: 'Quick method',
    alternate: 'Another way to picture it',
  };
  const isAlternate = block.type === 'alternate';
  return <section className={`lesson-block ${isAlternate ? 'lesson-block--alternate' : `lesson-block--${block.type}`}`}><h3>{block.title || label[block.type]}</h3><LessonMarkdown>{block.markdown}</LessonMarkdown></section>;
}
