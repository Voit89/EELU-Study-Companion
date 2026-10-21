import { useMemo, useState } from 'react';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import type { RecallCard } from '../content/types';
import { LessonMarkdown } from './LessonMarkdown';

export function RecallView({ cards }: { cards: RecallCard[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());
  const [known, setKnown] = useState<Set<number>>(() => new Set());
  const progress = useMemo(() => Math.round((known.size / Math.max(1, cards.length)) * 100), [known, cards.length]);

  function reveal(index: number) {
    setRevealed((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function mark(index: number, value: boolean) {
    setKnown((current) => {
      const next = new Set(current);
      if (value) next.add(index);
      else next.delete(index);
      return next;
    });
  }

  function reset() {
    setRevealed(new Set());
    setKnown(new Set());
  }

  return (
    <section className="recall-view">
      <header className="recall-hero">
        <span className="lesson-kicker">ACTIVE RECALL · 10 MINUTES</span>
        <h1>Say the answer before you flip the card</h1>
        <p>If you can answer these without looking, you understand the lecture. If not, the card tells you exactly which rule to revisit.</p>
        <div className="recall-progress">
          <div className="recall-progress-bar"><span style={{ width: `${progress}%` }} /></div>
          <b>{known.size} / {cards.length} known</b>
          <button type="button" onClick={reset}><RotateCcw size={14} /> Reset</button>
        </div>
      </header>

      <div className="recall-grid">
        {cards.map((card, index) => {
          const isOpen = revealed.has(index);
          const isKnown = known.has(index);
          return (
            <article className={`recall-card ${isOpen ? 'is-open' : ''} ${isKnown ? 'is-known' : ''}`} key={card.prompt}>
              <div className="recall-card-top">
                <span className="recall-card-number">{String(index + 1).padStart(2, '0')}</span>
                {isKnown && <span className="recall-known-tag"><Check size={12} /> Known</span>}
              </div>
              <div className="recall-prompt"><LessonMarkdown>{card.prompt}</LessonMarkdown></div>
              {isOpen ? (
                <div className="recall-answer"><LessonMarkdown>{card.answer}</LessonMarkdown></div>
              ) : (
                <button className="recall-reveal" type="button" onClick={() => reveal(index)}>
                  <Sparkles size={14} /> Show answer
                </button>
              )}
              <div className="recall-actions">
                <button type="button" className={isKnown ? 'is-on' : ''} onClick={() => mark(index, !isKnown)}>
                  <Check size={13} /> {isKnown ? 'Known' : 'I knew it'}
                </button>
                {isOpen && <button type="button" onClick={() => reveal(index)}>Hide answer</button>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
