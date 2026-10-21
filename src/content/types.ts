export type CourseId =
  | 'discrete-math'
  | 'electronics'
  | 'human-rights'
  | 'introduction-to-computers'
  | 'mathematics-0'
  | 'mathematics-1'
  | 'technical-report-writing';

export type CoverageStatus = 'explained' | 'visual-only' | 'unreadable' | 'not-applicable';

export type LessonBlock =
  | { type: 'zobda'; text: string }
  | { type: 'foundation'; title: string; markdown: string }
  | { type: 'recognition'; title: string; markdown: string }
  | { type: 'formula'; label: string; latex: string; explanation: string }
  | { type: 'worked-example'; title: string; givens?: string; steps: string[]; conclusion?: string }
  | { type: 'why'; title: string; markdown: string }
  | { type: 'trap'; title: string; markdown: string }
  | { type: 'shortcut'; title: string; markdown: string }
  | { type: 'alternate'; title: string; markdown: string }
  | { type: 'practice'; practiceId: string }
  | { type: 'source-note'; text: string };

export interface LessonPage {
  sourcePage: number;
  title: string;
  coverage: CoverageStatus;
  blocks: LessonBlock[];
  note?: string;
}

export interface Lesson {
  id: string;
  courseId: CourseId;
  sourceKey: string;
  sourcePath: string;
  title: string;
  sourcePageCount: number;
  pages: LessonPage[];
  lastReviewed?: string;
}

export type PageImportance = 'must' | 'skim' | 'skip';

export interface PageGuide {
  importance: PageImportance;
  examMove?: string[];
  check?: string;
}

export interface MasterRule {
  name: string;
  plain: string;
  latex?: string;
  when: string;
}

export interface RecipeExample {
  question: string;
  steps: string[];
  answer: string;
}

export interface ExamRecipe {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  example: RecipeExample;
  check: string;
}

export interface FormulaRow {
  label: string;
  latex: string;
  plain: string;
}

export interface RecallCard {
  prompt: string;
  answer: string;
}

export type LessonView = 'topics' | 'master' | 'slides' | 'practice' | 'recall';

export interface SprintStage {
  minutes: number;
  title: string;
  detail: string;
  view: LessonView;
  anchor?: string;
}

export interface LessonMasterKey {
  bigIdea: string;
  rules: MasterRule[];
  recipes: ExamRecipe[];
  formulaSheet: FormulaRow[];
  traps: string[];
  recall: RecallCard[];
  checklist: string[];
  sprint: SprintStage[];
}

export interface PracticeItem {
  id: string;
  courseId: CourseId;
  sectionSourceKey: string;
  sectionSourcePage?: number;
  lessonId?: string;
  topic: string;
  question: string;
  questionSource: 'section' | 'added';
  recognition: string;
  hint: string;
  steps: string[];
  answer: string;
  alternativeExplanation?: string;
}

export interface SectionCoverage {
  courseId: CourseId;
  sourceKey: string;
  sourcePath: string;
  disposition: 'mapped' | 'unclassified' | 'unreadable';
  practiceIds: string[];
  note?: string;
}

export interface CourseSectionSet {
  practiceItems: PracticeItem[];
  sectionCoverage: SectionCoverage[];
}

// ---------------------------------------------------------------------------
// Concept-first content model (v2)
//
// A Topic is the new atomic teaching unit. Unlike LessonPage (which mirrors a
// single source page), a Topic is anchored to a CONCEPT: it may cite several
// source pages, it may skip filler pages, and it always provides multiple
// explanation styles ("doors"), dual solving methods, and an exam recipe.
// Topics are produced by the pipeline/ generation process and every claim is
// verified by pipeline/verify-claims.mjs before being committed.
// ---------------------------------------------------------------------------

export type DoorKind = 'analogy' | 'mechanical' | 'formal';

export interface TopicDoor {
  kind: DoorKind;
  title: string;
  markdown: string;
}

export interface DualMethod {
  question: string;
  collegeMethod: string;
  fastMethod: string;
}

export interface TopicRecipe {
  trigger: string;
  steps: string[];
  check: string;
}

export interface RecallItem {
  q: string;
  a: string;
}

export interface SummaryTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface Topic {
  id: string;
  lessonId: string;
  cuCode: string;
  title: string;
  quick: string;
  sourcePages: number[];
  prerequisites: string[];
  doors: TopicDoor[];
  methods: DualMethod[];
  recipe?: TopicRecipe;
  traps: string[];
  summaryTable?: SummaryTable;
  recall: RecallItem[];
  verifiedOn?: string;
}

export interface TopicSet {
  lessonId: string;
  lectureLabel: string;
  topics: Topic[];
}
