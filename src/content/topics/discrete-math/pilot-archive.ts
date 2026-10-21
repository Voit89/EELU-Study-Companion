import type { Topic, TopicSet } from '../../types';

// ---------------------------------------------------------------------------
// Discrete Math — pilot Topic sets (concept-first format, sparse pilot style).
// Lecture 1 has been rebuilt in masterpiece style (see lecture-1-sets.ts).
// These Lecture 2/3 units keep the pilot format until their own sections
// upgrade them. All claims below passed pipeline/verify-claims.mjs (family
// CU1.x–CU3.x) on 2026-10-21.
// ---------------------------------------------------------------------------

const VERIFIED = '2026-10-21';

function md(lines: string[]): string {
  return lines.join('\n');
}

const functionsFunctionTest: Topic = {
  id: 'dm-topic-function-test',
  lessonId: 'discrete-math-functions-lecture-2',
  cuCode: 'CU 2.3',
  title: 'The Function Test',
  quick:
    'A relation from A to B is a **function** when **every** element of A fires **exactly one** arrow into B. Two failure modes: some input has **no** arrow, or some input has **two** arrows.',
  sourcePages: [11, 12, 13, 14, 15],
  prerequisites: ['Relations as subsets of A×B'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Vending Machine',
      markdown: md([
        'A function is a **vending machine**: press a button (input) → you get ONE item (output).',
        '',
        '- Two buttons give the same drink? **Fine** — allowed (not injective, but still a function).',
        '- One button gives two drinks at once? **BROKEN** — not a function. *(verified: CU3.1)*',
        '- A button that dispenses nothing? **BROKEN** — not a function (must be defined on ALL of the domain). *(verified: CU3.2)*',
        '',
        'The rule is about the **left side only**: every input must have exactly one output. What happens on the right side is irrelevant for the function test.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Arrow Diagram Audit',
      markdown: md([
        'Draw A on the left, B on the right, arrows per the relation. Then run the **2-question audit**:',
        '',
        '**Q1 — TOTAL?** Does EVERY element of A have $\\geq 1$ arrow coming out? (No orphans on the left!)',
        '**Q2 — SINGLE?** Does NO element of A have $\\geq 2$ arrows coming out? (No left element with two exits!)',
        '',
        '| Q1 Total? | Q2 Single? | Verdict |',
        '|-----------|-----------|---------|',
        '| ✔ | ✔ | **Function** |',
        '| ✘ | ✔ | Not a function — "missing arrow" |',
        '| ✔ or ✘ | ✘ | Not a function — "double arrow" |',
        '',
        '**Lecture Example 3 in 10 seconds** — $A = \\{2,4,6\\}$, $B = \\{1,3,5\\}$:',
        '- $R = \\{(2,5),(4,1),(4,3),(6,5)\\}$ → look at **4**: two arrows. **NOT a function** — Q2 fails. *(verified: CU3.1)*',
        '- $S: y = x+1$ → check **6**: $6+1 = 7 \\notin B$ → no arrow. **NOT a function** — Q1 fails. *(verified: CU3.2)*',
        '- $T = \\{(2,5),(4,1),(6,1)\\}$ → every left element exits exactly once (4 and 6 may share target 1 — allowed!). **Function.** *(verified: CU3.3)*',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Definition',
      markdown: md([
        'A relation $f \\subseteq A \\times B$ is a function from $A$ to $B$ iff:',
        '',
        '1. **(Totality)** $\\forall x \\in A, \\exists y \\in B: (x,y) \\in f$ — every domain element appears as a first coordinate;',
        '2. **(Single-valuedness)** $\\forall x \\in A, \\forall y_1, y_2 \\in B: (x,y_1) \\in f \\land (x,y_2) \\in f \\Rightarrow y_1 = y_2$.',
        '',
        'Formally $f = \\{(x,y) \\in A \\times B : y = f(x)\\}$, with $A$ the **domain**, $B$ the **co-domain**. The conditions bind **only the first coordinates**.',
      ]),
    },
  ],
  methods: [
    {
      question: '"Is R = {(2,5),(4,1),(4,3),(6,5)} a function from A={2,4,6} to B={1,3,5}?"',
      collegeMethod:
        'Read the definition, scan all pairs, reason about "property (1)" and "property (2)" — ~60 seconds, easy to talk yourself into a mistake.',
      fastMethod:
        '**Left-column duplicate scan:** list first coordinates 2, 4, 4, 6 → duplicate 4 → **NOT a function.** ~5 seconds.',
    },
    {
      question: '"Is y = x+1 from {2,4,6} to {1,3,5} a function?"',
      collegeMethod:
        'Evaluate every input and check membership in B one at a time, then re-read the definition to be sure.',
      fastMethod:
        'Check the WORST case only: max(A)+1 = 7 ∈ B? No → top element fires outside B → **not a function.** For rule relations, check BOTH ends of A.',
    },
  ],
  recipe: {
    trigger: '"Is this relation a function?", arrow diagram verdicts, formula relations between finite sets',
    steps: [
      'Write first coordinates only.',
      'Any duplicate with a different second value? → **not a function** (double-arrow).',
      'Any A-element missing from first coordinates (or firing outside B)? → **not a function** (missing arrow).',
      'Both clean → function; state $f(a) = b$ for each input.',
    ],
    check: 'Count your arrows — must equal $|A|$ exactly (every input once).',
  },
  traps: [
    'Two inputs → same output is **LEGAL** ($T$ sends both 4 and 6 to 1).',
    'Duplicated pairs like $(1,1,1)$ don’t break anything — sets ignore repetition.',
    'Codomain ≠ range — the function need not "hit" all of B.',
    'For $y = x+1$-style rules: don’t just look at the middle of A — check the ENDS.',
  ],
  recall: [
    { q: 'The two questions of the Function Test?', a: 'Is every left element covered? Does every left element fire exactly once?' },
    { q: 'Can two inputs share one output?', a: 'Yes — a function is allowed to be non-injective. The ban is on ONE input having TWO outputs.' },
  ],
  verifiedOn: VERIFIED,
};

const logicContrapositive: Topic = {
  id: 'dm-topic-contrapositive-family',
  lessonId: 'discrete-math-lecture-3',
  cuCode: 'CU 3.7',
  title: 'Contrapositive vs Converse vs Inverse',
  quick:
    'From "If $p$ then $q$": **contrapositive** = flip AND negate (≡ original — always!). **Converse** = just flip (≠ original). **Inverse** = just negate (≠ original). Exam rule: **only the contrapositive can be trusted.**',
  sourcePages: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  prerequisites: ['Basic operators', "De Morgan's laws"],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Attendance Promise',
      markdown: md([
        '"If you **pay**, you **enter**." ($p$ = pay, $q$ = enter)',
        '',
        '- **Contrapositive:** "If you **can’t enter**, you **didn’t pay**." — perfectly consistent with the promise. Same deal, said backwards + negated. ✔ *(verified: CU2.1)*',
        '- **Converse:** "If you **enter**, you **paid**." — WAIT, maybe you had a free ticket! A *different claim*. ✘ *(verified: CU2.2)*',
        '- **Inverse:** "If you **don’t pay**, you **can’t enter**." — Hmm, maybe you snuck in! Also different. ✘ *(verified: CU2.3)*',
        '',
        'The promise breaks in ONE case only: paid but kept outside ($p$ true, $q$ false). The contrapositive breaks in exactly that same case — that’s why they’re equivalent.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Mechanical Table (memorize this shape)',
      markdown: md([
        '| Name | Form | Equivalent to $p \\to q$? |',
        '|------|------|---------------------------|',
        '| Statement | $p \\to q$ | — |',
        '| **Contrapositive** | $\\neg q \\to \\neg p$ | **YES ✅** |',
        '| Converse | $q \\to p$ | NO ❌ |',
        '| Inverse | $\\neg p \\to \\neg q$ | NO ❌ |',
        '| Converse ↔ Inverse | $q\\to p$ vs $\\neg p \\to \\neg q$ | equivalent to *each other* ✅ *(verified: CU2.5)* |',
        '',
        '**Truth-table fingerprint ($p \\to q$):** T, F, T, T — false **only** when $p = T, q = F$.',
        '',
        '**Speed trick — "the lying row":** the ONLY way $p \\to q$ is false: hypothesis TRUE, conclusion FALSE. Every "when is this sentence false?" question is this row. *(verified: CU2.6)*',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Verification',
      markdown: md([
        'Build the 4-row table. Column $p \\to q$: $(T,T)\\to T, (T,F)\\to F, (F,T)\\to T, (F,F)\\to T$. Column $\\neg q \\to \\neg p$ produces identical outputs on all four rows ⇒ **logically equivalent**.',
        '',
        'The converse column differs from $p \\to q$ exactly on rows $(T,F)$ and $(F,T)$ ⇒ **NOT** equivalent. *(verified: CU2.1–CU2.5 — 5 checks)*',
      ]),
    },
  ],
  methods: [
    {
      question: '"Write the contrapositive of: If x² is even, then x is even."',
      collegeMethod:
        'Recall the definition, restate both halves carefully, translate "not even" into "odd" by hand.',
      fastMethod:
        '**SWAP-NEGATE (3 seconds):** swap halves → "If x is even, x² is even" → negate each: "If x is **not** even (odd), x² is **not** even (odd)." Done. "Odd" is just ¬"even" in disguise.',
    },
    {
      question:
        '"Is ’If n is divisible by 6, then n is divisible by 2’ equivalent to ’If n is not divisible by 6, then n is not divisible by 2’?"',
      collegeMethod:
        'Translate both to symbols, build the 4-row truth table for each, compare columns — accurate but slow.',
      fastMethod:
        'Second statement has the **inverse form** → answer instantly: **NO.** Counterexample: $n = 4$ (not div by 6, but IS div by 2 → inverse false, original true). The form alone answers the question.',
    },
  ],
  recipe: {
    trigger:
      'the words contrapositive, converse, inverse, "equivalent to the original?", "when is this false?", necessary/sufficient',
    steps: [
      'Label $p$ (hypothesis) and $q$ (conclusion).',
      'Form asked: flip only = **converse**; negate only = **inverse**; flip + negate = **contrapositive**.',
      '"Equivalent?" → YES only for the contrapositive (and converse ≡ inverse *with each other*).',
      '"When false?" → the single lying row: $p = T, q = F$.',
    ],
    check: 'Write your answer’s lying row — for a TRUE equivalence claim it must be the SAME lying row as the original.',
  },
  traps: [
    '"only if" is NOT the converse — "$p$ only if $q$" = $p \\to q$.',
    'Converse and inverse *sound* reasonable in English — soundness is NOT equivalence.',
    'One differing row is enough to kill an equivalence claim (counterexample row).',
  ],
  summaryTable: {
    title: 'The One-Table Summary',
    headers: ['You see', 'You write', 'Trustworthy?'],
    rows: [
      ['"contrapositive of p→q"', '$\\neg q \\to \\neg p$', '✅ ≡ original'],
      ['"converse of p→q"', '$q \\to p$', '❌ different claim'],
      ['"inverse of p→q"', '$\\neg p \\to \\neg q$', '❌ different claim'],
      ['"negation of p→q"', '$p \\land \\neg q$', '✅ (and NOT an if-statement!)'],
      ['"p if q"', '$q \\to p$', 'watch the direction flip'],
      ['"p only if q"', '$p \\to q$', 'no flip!'],
    ],
  },
  recall: [
    { q: 'Which of {converse, inverse, contrapositive} is equivalent to p→q?', a: 'Only the contrapositive ($\\neg q \\to \\neg p$). Converse ≡ inverse, but neither ≡ original.' },
    { q: 'Negation of "if p then q"?', a: '$p \\land \\neg q$ (never an if-statement).' },
  ],
  verifiedOn: VERIFIED,
};

export const functionsFunctionTestTopicSet: TopicSet = {
  lessonId: 'discrete-math-functions-lecture-2',
  lectureLabel: 'Lecture 2 · Functions',
  topics: [functionsFunctionTest],
};

export const logicContrapositiveTopicSet: TopicSet = {
  lessonId: 'discrete-math-lecture-3',
  lectureLabel: 'Lecture 3 · Propositional Logic',
  topics: [logicContrapositive],
};
