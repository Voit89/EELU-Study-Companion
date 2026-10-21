import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, ListChecks, Play, Target } from 'lucide-react';
import type { Lesson, LessonMasterKey, PageGuide } from '../content/types';
import { LessonMarkdown } from './LessonMarkdown';

const zobdaOf = (page: Lesson['pages'][number]) =>
  page.blocks.find((block) => block.type === 'zobda')?.text || '';

export function MasterKeyView({
  lesson,
  masterKey,
  pageGuides,
  onGoToPage,
  onStartSprint,
}: {
  lesson: Lesson;
  masterKey: LessonMasterKey;
  pageGuides: Record<number, PageGuide>;
  onGoToPage: (page: number) => void;
  onStartSprint: () => void;
}) {
  const mustKnow = lesson.pages.filter((page) => pageGuides[page.sourcePage]?.importance === 'must').length;
  const skippable = lesson.pages.filter((page) => pageGuides[page.sourcePage]?.importance === 'skip').length;
  const displayTitle = lesson.title.replace(/\s*—\s*older course archive$/i, '');
  const reel = lesson.pages
    .filter((page) => pageGuides[page.sourcePage]?.importance !== 'skip' && zobdaOf(page))
    .map((page) => ({ page: page.sourcePage, title: page.title, text: zobdaOf(page) }));

  return (
    <article className="master-key">
      <header className="mk-hero">
        <span className="lesson-kicker">MASTER KEY · 55-MINUTE UNDERSTANDING PATH</span>
        <h1>{displayTitle}</h1>
        <div className="mk-bigidea">
          <Target size={18} />
          <LessonMarkdown>{masterKey.bigIdea}</LessonMarkdown>
        </div>
        <div className="mk-hero-stats">
          <span><b>{masterKey.rules.length}</b> rules</span>
          <span><b>{masterKey.recipes.length}</b> recipes</span>
          <span><b>{masterKey.recall.length}</b> recall cards</span>
          <span><b>{mustKnow}</b> must-know slides</span>
          <span><b>{skippable}</b> skipped</span>
        </div>
        <button className="mk-start" type="button" onClick={onStartSprint}>
          <Play size={16} /> Start the 55-minute sprint
          <ArrowRight size={16} />
        </button>
      </header>

      <section className="mk-section">
        <div className="mk-section-heading">
          <Clock3 size={18} />
          <div><span className="lesson-section-label">THE PLAN</span><h2>Five stages, 55 minutes</h2></div>
        </div>
        <div className="mk-plan">
          {masterKey.sprint.map((stage, index) => (
            <div className="mk-plan-stage" key={stage.title}>
              <span className="mk-plan-number">{index + 1}</span>
              <div>
                <b>{stage.title}</b>
                <p>{stage.detail}</p>
              </div>
              <span className="mk-plan-minutes">{stage.minutes} min</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mk-section" id="mk-rules">
        <div className="mk-section-heading">
          <ListChecks size={18} />
          <div><span className="lesson-section-label">MUST KNOW</span><h2>The {masterKey.rules.length} rules behind every question</h2></div>
        </div>
        <div className="mk-rules">
          {masterKey.rules.map((rule, index) => (
            <article className="mk-rule" key={rule.name}>
              <span className="mk-rule-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="mk-rule-body">
                <h3>{rule.name}</h3>
                <LessonMarkdown>{rule.plain}</LessonMarkdown>
                {rule.latex && (
                  <div className="mk-rule-formula">
                    <LessonMarkdown>{`$$${rule.latex}$$`}</LessonMarkdown>
                  </div>
                )}
                <p className="mk-when"><b>Use it when:</b> {rule.when}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-section" id="mk-recipes">
        <div className="mk-section-heading">
          <Target size={18} />
          <div><span className="lesson-section-label">FAST EXAM RECIPES</span><h2>If you see this, use this route</h2></div>
        </div>
        <p className="mk-section-note">Each recipe is the shortest valid route. The lecture&rsquo;s slower derivation stays in the page Deep Dive.</p>
        <div className="mk-recipes">
          {masterKey.recipes.map((recipe, index) => (
            <article className="mk-recipe" key={recipe.id}>
              <div className="mk-recipe-top">
                <span className="mk-recipe-number">{index + 1}</span>
                <div>
                  <h3>{recipe.name}</h3>
                  <p className="mk-trigger">{recipe.trigger}</p>
                </div>
              </div>
              <ol className="mk-steps">
                {recipe.steps.map((step) => <li key={step}><LessonMarkdown>{step}</LessonMarkdown></li>)}
              </ol>
              <div className="mk-example">
                <span className="mk-example-label">SOLVED EXAMPLE</span>
                <div className="mk-example-question"><LessonMarkdown>{recipe.example.question}</LessonMarkdown></div>
                <ol className="mk-steps mk-steps--example">
                  {recipe.example.steps.map((step) => <li key={step}><LessonMarkdown>{step}</LessonMarkdown></li>)}
                </ol>
                <div className="mk-example-answer"><b>Answer:</b> <LessonMarkdown>{recipe.example.answer}</LessonMarkdown></div>
              </div>
              <div className="mk-check"><CheckCircle2 size={15} /><span><b>Full-marks check:</b> {recipe.check}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-section" id="mk-formula-sheet">
        <div className="mk-section-heading">
          <ListChecks size={18} />
          <div><span className="lesson-section-label">FORMULA SHEET</span><h2>Everything you may need to look up</h2></div>
        </div>
        <div className="mk-formula-sheet">
          {masterKey.formulaSheet.map((formula) => (
            <div className="mk-formula-row" key={formula.label}>
              <div className="mk-formula-label">{formula.label}</div>
              <div className="mk-formula-math"><LessonMarkdown>{`$$${formula.latex}$$`}</LessonMarkdown></div>
              <div className="mk-formula-plain">{formula.plain}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-section-heading mk-section-heading--warning">
          <AlertTriangle size={18} />
          <div><span className="lesson-section-label">MARKS LOST HERE</span><h2>{masterKey.traps.length} traps to avoid</h2></div>
        </div>
        <ol className="mk-traps">
          {masterKey.traps.map((trap) => <li key={trap}><LessonMarkdown>{trap}</LessonMarkdown></li>)}
        </ol>
      </section>

      <section className="mk-section">
        <details className="mk-reel">
          <summary>
            <span className="lesson-section-label">ONE-LINE LECTURE</span>
            <b>Every slide in one sentence</b>
            <span>{reel.length} cards · use for a last-minute review</span>
          </summary>
          <div className="mk-reel-list">
            {reel.map((item) => (
              <button className="mk-reel-item" key={item.page} type="button" onClick={() => onGoToPage(item.page)}>
                <span className="mk-reel-page">{item.page}</span>
                <span className="mk-reel-copy"><b>{item.title}</b><span>{item.text}</span></span>
              </button>
            ))}
          </div>
        </details>
      </section>

      <section className="mk-section">
        <div className="mk-section-heading">
          <CheckCircle2 size={18} />
          <div><span className="lesson-section-label">READY CHECK</span><h2>You are ready when you can…</h2></div>
        </div>
        <ul className="mk-checklist">
          {masterKey.checklist.map((item) => <li key={item}><CheckCircle2 size={15} /><span>{item}</span></li>)}
        </ul>
      </section>
    </article>
  );
}
