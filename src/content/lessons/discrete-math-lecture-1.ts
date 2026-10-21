import type { Lesson, LessonPage } from '../types';

// ---------------------------------------------------------------------------
// Lecture 1 (Sets) — RETIRED page-by-page explanation, kept as a navigation
// stub. The teaching content for this lecture now lives in the concept-first
// Topics view (src/content/topics/discrete-math/lecture-1-sets.ts, 6 verified
// concept units). Each source page below still exists so the source PDF and
// the concept units stay linked page-by-page, but carries no page-bound notes:
// pages were demoted to citations by design (see pipeline/README.md).
// ---------------------------------------------------------------------------

interface PageCitation {
  title: string;
  cu: 'CU 1.1' | 'CU 1.2' | 'CU 1.3' | 'CU 1.4' | 'CU 1.5' | 'CU 1.6';
}

const PAGE_CITATIONS: Record<number, PageCitation> = {
  1: { title: 'Chapter 1 — Speaking Mathematically (cover)', cu: 'CU 1.1' },
  2: { title: 'The language of sets — the axiom of extension', cu: 'CU 1.1' },
  3: { title: 'Example 1 — using the set-roster notation', cu: 'CU 1.1' },
  4: { title: 'Example 1 — solution, continued', cu: 'CU 1.1' },
  5: { title: 'The standard number sets (reference table)', cu: 'CU 1.1' },
  6: { title: 'Set-builder notation; why "discrete"', cu: 'CU 1.1' },
  7: { title: 'Example 2 — using the set-builder notation', cu: 'CU 1.1' },
  8: { title: 'Example 2 — solution', cu: 'CU 1.1' },
  9: { title: 'Subsets — definition', cu: 'CU 1.2' },
  10: { title: 'Subsets — what "not a subset" means', cu: 'CU 1.2' },
  11: { title: 'Example 4 — the ∈ vs ⊆ distinction', cu: 'CU 1.2' },
  12: { title: 'Example 4 — solution, continued', cu: 'CU 1.2' },
  13: { title: 'The empty set', cu: 'CU 1.3' },
  14: { title: 'The empty set — examples', cu: 'CU 1.3' },
  15: { title: 'Example 5 — mutually disjoint sets', cu: 'CU 1.3' },
  16: { title: 'Partitions of sets — the picture', cu: 'CU 1.4' },
  17: { title: 'Example 6 — partitions of sets', cu: 'CU 1.4' },
  18: { title: 'Example 6 — solution', cu: 'CU 1.4' },
  19: { title: 'Example 7 — power set of a set', cu: 'CU 1.5' },
  20: { title: 'Exercise slide', cu: 'CU 1.5' },
  21: { title: 'Example 8 — ordered pairs', cu: 'CU 1.6' },
  22: { title: 'Example 8 — solution, continued', cu: 'CU 1.6' },
  23: { title: 'Cartesian products — definition', cu: 'CU 1.6' },
  24: { title: 'Example 9 — Cartesian products', cu: 'CU 1.6' },
  25: { title: 'Example 9 — solution', cu: 'CU 1.6' },
  26: { title: 'Example 9 — solution, continued', cu: 'CU 1.6' },
  27: { title: 'Example 9 — the Cartesian plane', cu: 'CU 1.6' },
};

function buildPages(): LessonPage[] {
  return Array.from({ length: 27 }, (_, index) => {
    const pageNumber = index + 1;
    const citation = PAGE_CITATIONS[pageNumber];
    return {
      sourcePage: pageNumber,
      title: citation.title,
      coverage: 'visual-only' as const,
      blocks: [],
      note: `Teaching content retired — this page is cited by ${citation.cu} in the Concepts view. Tap “Concepts” above: 6 verified concept units cover all 27 source pages, in the masterpiece style (الزتونة first).`,
    };
  });
}

export const discreteMathLecture1Lesson: Lesson = {
  id: 'discrete-math-sets-lecture-1-archive',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/1 Sets.pdf',
  sourcePath: 'Discrete Math/lecture/1 Sets.pdf',
  title: 'Lecture 1: Sets — older course archive',
  sourcePageCount: 27,
  pages: buildPages(),
  lastReviewed: '2026-10-21',
};
