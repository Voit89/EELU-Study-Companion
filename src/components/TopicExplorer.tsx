import { useMemo, useState } from 'react';
import { BadgeCheck, BookMarked, CircleAlert, GraduationCap, Layers, ListChecks, Sparkles, Table2, Zap } from 'lucide-react';
import type { Topic, TopicSet } from '../content/types';
import { LessonMarkdown } from './LessonMarkdown';

const DOOR_ICONS: Record<Topic['doors'][number]['kind'], typeof Zap> = {
  analogy: GraduationCap,
  mechanical: Zap,
  formal: Layers,
};

const DOOR_LABELS: Record<Topic['doors'][number]['kind'], string> = {
  analogy: 'Door 1 · Analogy',
  mechanical: 'Door 2 · Mechanical (exam tool)',
  formal: 'Door 3 · Formal proof',
};

export function TopicExplorer({
  topicSet,
  onGoToSourcePage,
}: {
  topicSet: TopicSet;
  onGoToSourcePage: (page: number) => void;
}) {
  const [activeTopicId, setActiveTopicId] = useState(topicSet.topics[0]?.id || '');
  const [activeDoor, setActiveDoor] = useState<Topic['doors'][number]['kind']>('analogy');
  const topic = useMemo(
    () => topicSet.topics.find((entry) => entry.id === activeTopicId) || topicSet.topics[0],
    [topicSet, activeTopicId],
  );

  if (!topic) return null;

  const door = topic.doors.find((entry) => entry.kind === activeDoor) || topic.doors[0];

  return (
    <div className="topic-explorer">
      <header className="topic-explorer-head">
        <span className="lesson-kicker">CONCEPT MODE · {topicSet.lectureLabel.toUpperCase()}</span>
        <h1>Learn by concept, not by page</h1>
        <p className="topic-explorer-intro">
          Each concept below carries three explanation doors, a fast method for exams, and a verified badge.
          If one door doesn&rsquo;t click, walk through another. {topicSet.topics.length} concept
          {topicSet.topics.length === 1 ? '' : 's'} ready for this lecture.
        </p>
      </header>

      <div className="topic-layout">
        <aside className="topic-list" aria-label="Concepts in this lecture">
          {topicSet.topics.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={entry.id === topic.id ? 'topic-list-item is-active' : 'topic-list-item'}
              onClick={() => {
                setActiveTopicId(entry.id);
                const firstDoor = entry.doors[0]?.kind;
                if (firstDoor) setActiveDoor(firstDoor);
              }}
            >
              <span className="topic-list-code">{entry.cuCode}</span>
              <span className="topic-list-title">{entry.title}</span>
              {entry.verifiedOn && (
                <span className="topic-verified" title={`Claims verified ${entry.verifiedOn}`}>
                  <BadgeCheck size={13} /> verified
                </span>
              )}
            </button>
          ))}
        </aside>

        <div className="topic-detail">
          <div className="topic-title-row">
            <div>
              <span className="topic-cu">{topic.cuCode}</span>
              <h2>{topic.title}</h2>
            </div>
            <div className="topic-source-pages">
              <BookMarked size={13} />
              {topic.sourcePages.length > 0 ? (
                topic.sourcePages.map((page) => (
                  <button key={page} type="button" onClick={() => onGoToSourcePage(page)}>
                    p.{page}
                  </button>
                ))
              ) : (
                <span>—</span>
              )}
            </div>
          </div>

          <section className="topic-quick">
            <Sparkles size={16} />
            <LessonMarkdown>{topic.quick}</LessonMarkdown>
          </section>

          <nav className="door-switch" role="tablist" aria-label="Explanation styles">
            {topic.doors.map((entry) => {
              const Icon = DOOR_ICONS[entry.kind];
              return (
                <button
                  key={entry.kind}
                  type="button"
                  role="tab"
                  aria-selected={entry.kind === activeDoor}
                  className={entry.kind === activeDoor ? 'is-active' : ''}
                  onClick={() => setActiveDoor(entry.kind)}
                >
                  <Icon size={14} /> {DOOR_LABELS[entry.kind]}
                </button>
              );
            })}
          </nav>

          {door && (
            <section className="topic-door">
              <h3>{door.title}</h3>
              <LessonMarkdown>{door.markdown}</LessonMarkdown>
            </section>
          )}

          {topic.methods.length > 0 && (
            <section className="topic-methods">
              <h3><Zap size={15} /> College method vs fast method</h3>
              {topic.methods.map((method) => (
                <div key={method.question} className="method-compare">
                  <div className="method-question">{method.question}</div>
                  <div className="method-grid">
                    <div className="method-card method-card--college">
                      <span className="method-label">COLLEGE METHOD</span>
                      <LessonMarkdown>{method.collegeMethod}</LessonMarkdown>
                    </div>
                    <div className="method-card method-card--fast">
                      <span className="method-label">FAST METHOD</span>
                      <LessonMarkdown>{method.fastMethod}</LessonMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {topic.recipe && (
            <section className="topic-recipe">
              <h3><ListChecks size={15} /> Exam recipe card</h3>
              <p className="recipe-trigger"><b>Trigger:</b> {topic.recipe.trigger}</p>
              <ol>
                {topic.recipe.steps.map((step) => (
                  <li key={step}><LessonMarkdown>{step}</LessonMarkdown></li>
                ))}
              </ol>
              <p className="recipe-check"><b>Full-marks check:</b> {topic.recipe.check}</p>
            </section>
          )}

          {topic.traps.length > 0 && (
            <section className="topic-traps">
              <h3><CircleAlert size={15} /> Traps</h3>
              <ul>
                {topic.traps.map((trap) => (
                  <li key={trap}><LessonMarkdown>{trap}</LessonMarkdown></li>
                ))}
              </ul>
            </section>
          )}

          {topic.summaryTable && (
            <section className="topic-summary-table">
              <h3><Table2 size={15} /> {topic.summaryTable.title}</h3>
              <table>
                <thead>
                  <tr>{topic.summaryTable.headers.map((header) => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>
                  {topic.summaryTable.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}><LessonMarkdown>{cell}</LessonMarkdown></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {topic.recall.length > 0 && (
            <section className="topic-recall">
              <h3>Recall cards</h3>
              <div className="topic-recall-grid">
                {topic.recall.map((item) => (
                  <div key={item.q} className="topic-recall-card">
                    <div className="topic-recall-q">{item.q}</div>
                    <div className="topic-recall-a">{item.a}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
