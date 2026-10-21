import lecture from './discrete-math-lecture-2.json';
import type { Lesson, LessonBlock, LessonPage } from '../types';

interface AuthoredPage {
  page_num: number;
  title: string;
  title_ar?: string;
  zatoona?: string;
  symbols?: Array<{ symbol: string; meaning: string }>;
  deep_dive?: string;
  eli5?: string;
  exam_trap?: string;
  supplemental_explanation?: string;
}

const sourcePages = lecture.pages as AuthoredPage[];

const pages: LessonPage[] = sourcePages.map((sourcePage) => {
  const blocks: LessonBlock[] = [];

  if (sourcePage.zatoona) {
    blocks.push({ type: 'zobda', text: sourcePage.zatoona });
  }

  if (sourcePage.symbols?.length) {
    blocks.push({
      type: 'recognition',
      title: 'الرموز ومعناها بكلمات بسيطة',
      markdown: sourcePage.symbols
        .map(({ symbol, meaning }) => `- **${symbol}** — ${meaning}`)
        .join('\n'),
    });
  }

  if (sourcePage.deep_dive) {
    blocks.push({
      type: 'foundation',
      title: 'تفصيل الفكرة والخطوات',
      markdown: sourcePage.deep_dive,
    });
  }

  if (sourcePage.supplemental_explanation) {
    blocks.push({
      type: 'why',
      title: 'إضافة توضيحية خارج نص الصفحة',
      markdown: sourcePage.supplemental_explanation,
    });
  }

  if (sourcePage.eli5) {
    blocks.push({
      type: 'why',
      title: 'تشبيه للتوضيح فقط، وليس تعريفًا رياضيًا',
      markdown: sourcePage.eli5,
    });
  }

  if (sourcePage.exam_trap) {
    blocks.push({
      type: 'trap',
      title: 'تنبيه للمذاكرة',
      markdown: sourcePage.exam_trap,
    });
  }

  return {
    sourcePage: sourcePage.page_num,
    title: sourcePage.title_ar
      ? `${sourcePage.title} — ${sourcePage.title_ar}`
      : sourcePage.title,
    coverage: 'explained',
    blocks,
  };
});

export const discreteMathLessons: Lesson[] = [
  {
    id: 'discrete-math-functions-lecture-2',
    courseId: 'discrete-math',
    sourceKey: 'archive:discrete-math:lecture/2 Functions.pdf',
    sourcePath: 'Discrete Math/lecture/2 Functions.pdf',
    title: 'Lecture 2: The Language of Relations and Functions',
    sourcePageCount: lecture.total_pages,
    pages,
    lastReviewed: '2026-10-14',
  },
];
