import type { Lesson, LessonPage } from '../types';

// ---------------------------------------------------------------------------
// Lecture 4 (Kirchhoff's Laws & Network Theorems) — RETIRED page-by-page
// explanation, kept as a navigation stub. The teaching content for this
// lecture now lives in the concept-first Topics view
// (src/content/topics/electronics/lecture-4-network-theorems.ts — 9 verified
// concept units). Each of the 58 source pages below still exists so the
// original PDF and the concept units stay linked page-by-page, but carries no
// page-bound notes: pages were demoted to citations by design
// (see pipeline/README.md).
//
// Grounding: every worked example was re-transcribed from the slides via the
// vision pipeline (workspace/extracted/elec-lec4-slides/Lec4_slide_transcript.md)
// and cross-checked 10/10 against the previously known value sets.
// ---------------------------------------------------------------------------

type Cu = 'CU 4.1' | 'CU 4.2' | 'CU 4.3' | 'CU 4.4' | 'CU 4.5' | 'CU 4.6' | 'CU 4.7' | 'CU 4.8' | 'CU 4.9';

interface PageCitation {
  title: string;
  cu: Cu | 'Overview' | 'Closing';
}

const PAGE_CITATIONS: Record<number, PageCitation> = {
  1: { title: 'Lecture cover — Electronics, Lecture 4 (Fall 2024–2025)', cu: 'Overview' },
  2: { title: 'Course outline — the lecture roadmap', cu: 'Overview' },
  3: { title: 'Chapter 9 — Kirchhoff\'s Current Law (section opener)', cu: 'CU 4.1' },
  4: { title: 'Nodes and branches — the five-branch example circuit', cu: 'CU 4.1' },
  5: { title: 'KCL — the statement and Fig. 9-1 (5 A + 3 A = 8 A)', cu: 'CU 4.2' },
  6: { title: 'KCL — the algebraic form Σi = 0 at a node', cu: 'CU 4.2' },
  7: { title: 'KVL — the statement and the five-element loop', cu: 'CU 4.3' },
  8: { title: 'Node-voltage analysis — ground, node voltages, branch currents', cu: 'CU 4.4' },
  9: { title: 'Node-voltage analysis — KCL at node 1 and node 2', cu: 'CU 4.4' },
  10: { title: 'Node-voltage analysis — Ohm\'s law replaces every current', cu: 'CU 4.4' },
  11: { title: 'Worked example — the circuit (5 A, 10 A, 2 Ω, 4 Ω, 6 Ω)', cu: 'CU 4.4' },
  12: { title: 'Worked example — the two node equations (the golden page)', cu: 'CU 4.4' },
  13: { title: 'Worked example — elimination: v₂ = 20 V, v₁ = 40/3 V', cu: 'CU 4.4' },
  14: { title: 'Worked example — Cramer\'s rule: Δ = 12', cu: 'CU 4.4' },
  15: { title: 'Worked example — branch currents from node voltages', cu: 'CU 4.4' },
  16: { title: 'Dependent-source example — the circuit (3 A, 2/8/4/4 Ω, 2iₓ)', cu: 'CU 4.5' },
  17: { title: 'Dependent-source example — three node equations', cu: 'CU 4.5' },
  18: { title: 'Dependent-source example — elimination: 4.8 V, 2.4 V, −2.4 V', cu: 'CU 4.5' },
  19: { title: 'Mesh analysis — definition and the generic circuit', cu: 'CU 4.6' },
  20: { title: 'Mesh analysis — the two generic mesh equations', cu: 'CU 4.6' },
  21: { title: 'Mesh example — the circuit (15 V, 10 V, 5/10/6/4 Ω)', cu: 'CU 4.6' },
  22: { title: 'Mesh example — solution: i₁ = i₂ = 1 A, I₃ = 0', cu: 'CU 4.6' },
  23: { title: 'Section close (blank slide)', cu: 'CU 4.6' },
  24: { title: 'Course outline — Chapter 10 roadmap', cu: 'Overview' },
  25: { title: 'Chapter 10 — Network Theorems (section opener)', cu: 'Overview' },
  26: { title: 'Superposition theorem — statement, killing sources, linearity', cu: 'CU 4.7' },
  27: { title: 'Superposition — one source at a time (rule 1)', cu: 'CU 4.7' },
  28: { title: 'Worked example (find v) — the circuit (6 V, 3 A, 4 Ω, 8 Ω)', cu: 'CU 4.7' },
  29: { title: 'Worked example — pass 1: the 6-V source alone (v₁ = 2 V)', cu: 'CU 4.7' },
  30: { title: 'Worked example — v₁ also by voltage division; pass 2 setup', cu: 'CU 4.7' },
  31: { title: 'Worked example — pass 2: the 3-A source alone; v = 10 V', cu: 'CU 4.7' },
  32: { title: 'Superposition — the 3-step procedure', cu: 'CU 4.7' },
  33: { title: 'Dependent-source example (find iₒ) — the circuit (4 A, 20 V, 5iₒ)', cu: 'CU 4.7' },
  34: { title: 'Dependent-source example — iₒ = iₒ′ + iₒ″; pass 1 setup', cu: 'CU 4.7' },
  35: { title: 'Dependent-source example — the loop equations, pass 1', cu: 'CU 4.7' },
  36: { title: 'Dependent-source example — pass 1 result: iₒ′ = 52/17 A', cu: 'CU 4.7' },
  37: { title: 'Dependent-source example — pass 2 result; iₒ = −8/17 A', cu: 'CU 4.7' },
  38: { title: 'Source transformation — the vₛ·R ⇄ iₛ·R rule', cu: 'CU 4.8' },
  39: { title: 'Worked example (find vₒ) — the circuit (3 A, 12 V, 4/2/8/3 Ω)', cu: 'CU 4.8' },
  40: { title: 'Worked example — the first transformations', cu: 'CU 4.8' },
  41: { title: 'Worked example — merging the parallel sources', cu: 'CU 4.8' },
  42: { title: 'Worked example — current division: vₒ = 3.2 V', cu: 'CU 4.8' },
  43: { title: 'Worked example (find vₓ) — the circuit with 0.25vₓ source', cu: 'CU 4.8' },
  44: { title: 'Worked example — transform the left and right pairs', cu: 'CU 4.8' },
  45: { title: 'Worked example — one loop remains: 3 V + 1 Ω + 4 Ω + vₓ + 18 V', cu: 'CU 4.8' },
  46: { title: 'Worked example — KVL on the final loop: i = −4.5 A', cu: 'CU 4.8' },
  47: { title: 'Thévenin\'s theorem — the statement and the equivalent picture', cu: 'CU 4.9' },
  48: { title: 'Thévenin — example-1 circuit (32 V, 12 Ω, 2 A, 4 Ω, 1 Ω)', cu: 'CU 4.9' },
  49: { title: 'Thévenin — V_Th = v_oc and R_Th = R_in definitions', cu: 'CU 4.9' },
  50: { title: 'Thévenin example 1 — the task (R_L = 6, 16, 36 Ω)', cu: 'CU 4.9' },
  51: { title: 'Thévenin example 1 — R_Th = 4 Ω', cu: 'CU 4.9' },
  52: { title: 'Thévenin example 1 — mesh for V_Th: 30 V', cu: 'CU 4.9' },
  53: { title: 'Thévenin example 1 — the equivalent circuit (30 V + 4 Ω)', cu: 'CU 4.9' },
  54: { title: 'Thévenin example 1 — I_L = 3 A, 1.5 A, 0.75 A', cu: 'CU 4.9' },
  55: { title: 'Thévenin example 2 — the circuit (36 V, 3 Ω, 6 Ω, R_L = 2 Ω)', cu: 'CU 4.9' },
  56: { title: 'Thévenin example 2 — V_AB = 24 V, R_AB = 2 Ω', cu: 'CU 4.9' },
  57: { title: 'Thévenin example 2 — the equivalent: V_L = 12 V', cu: 'CU 4.9' },
  58: { title: 'Closing slide — thank you / questions', cu: 'Closing' },
};

function buildPages(): LessonPage[] {
  return Array.from({ length: 58 }, (_, index) => {
    const pageNumber = index + 1;
    const citation = PAGE_CITATIONS[pageNumber];
    return {
      sourcePage: pageNumber,
      title: citation.title,
      coverage: 'visual-only' as const,
      blocks: [],
      note:
        citation.cu === 'Overview' || citation.cu === 'Closing'
          ? 'Cover, outline, or closing slide — the teaching content starts at CU 4.1 in the Concepts view.'
          : `Teaching content retired — this page is cited by ${citation.cu} in the Concepts view. Tap “Concepts” above: 9 verified concept units cover all 58 source pages, in the masterpiece style (الزتونة first).`,
    };
  });
}

const pages: LessonPage[] = buildPages();

export const electronicsLecture4Lesson: Lesson = {
  id: 'electronics-lecture-4',
  courseId: 'electronics',
  sourceKey: 'archive:electronics:lecture/Lec_4 elec.pdf',
  sourcePath: 'Electronics/lecture/Lec_4 elec.pdf',
  title: 'Lecture 4: Kirchhoff’s Laws and Network Theorems',
  sourcePageCount: 58,
  pages,
  lastReviewed: '2026-10-21',
};
