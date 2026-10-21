import type { Topic, TopicSet } from '../../types';

// ---------------------------------------------------------------------------
// Discrete Math — LECTURE 1: SETS (concept-first, masterpiece style).
// Grounded in "Discrete Math/lecture/1 Sets.pdf" pages 2-27 (Epp, Ch. 1).
//
// Masterpiece DNA (from the Electronics page-12 exemplar, kept for every CU):
//   1. الزتونة first — the essence + reusable algorithm before everything.
//   2. Rebuild from zero — numbered steps, complete arithmetic, no jumps.
//   3. "Understand the figure" — plain-language description + ASCII diagram.
//   4. Recognition tricks — how to SEE the question type in 3 seconds.
//   5. Teacher advice + exam shortcuts (box the formulas, skip the listing).
//   6. Sanity check — does the answer make sense? Re-count, re-test.
//   7. Reusable recipe + "what usually confuses students" + compact summary
//      table + recall chain (افتكر دي).
//
// Anti-hallucination: every mathematical claim below is recomputed by
// pipeline/verify-claims.mjs — verification family L1.* (IDs in comments).
// ---------------------------------------------------------------------------

const VERIFIED = '2026-10-21';
const L1 = 'discrete-math-sets-lecture-1-archive';

function md(lines: string[]): string {
  return lines.join('\n');
}

// ===========================================================================
// CU 1.1 — Set-roster notation & the axiom of extension (pages 2-8)
// ===========================================================================

const rosterExtension: Topic = {
  id: 'dm-l1-roster-extension',
  lessonId: L1,
  cuCode: 'CU 1.1',
  title: 'Roster Notation & the Axiom of Extension',
  quick:
    'الزتونة: a set is defined ONLY by what its elements are — order and repetition are invisible. To compare two roster sets run the Three Moves: (1) delete duplicates, (2) ignore order, (3) compare what is left. Same survivors → same set.',
  sourcePages: [2, 3, 4, 5, 6, 7, 8],
  prerequisites: [],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Class Register',
      markdown: md([
        'A class register is a SET of students. Write the names alphabetically or in random order — same class. Write one student twice — still the same class. The register is just **paper**; the class is the **people**.',
        '',
        'افتكر دي: the set is the club, not the paper it is written on. Order on paper is an accident of writing, not a property of the club.',
        '',
        'Two more anchors that pay off in exams:',
        '- **Box vs content:** $\\{0\\}$ is a box with the number 0 inside; $0$ is the number itself. A box is never the same thing as what it holds.',
        '- **The filter machine:** set-builder notation $\\{x \\in S \\mid \\text{property}\\}$ is a machine: the POOL is $S$, the property is the FILTER — only pool members satisfying it survive.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Three-Move Method (USE THIS IN EVERY EXAM)',
      markdown: md([
        '**Step 0 — from zero.** A set is an unordered collection of distinct objects. Roster notation writes it in braces: $\\{1, 2, 3\\}$. The axiom of extension (page 2) says a set is completely determined by its elements — not their order, not their repetition.',
        '',
        '**The Three Moves for any "are these equal?" question:**',
        '1. **Clean** — delete repeated elements.',
        '2. **Flatten** — ignore the order completely.',
        '3. **Compare** — match the survivors one by one.',
        '',
        '**Lecture Example 1 rebuilt move by move (pages 3-4):**',
        '',
        '**(a)** $A=\\{1,2,3\\}$, $B=\\{3,1,2\\}$, $C=\\{1,1,2,3,3,3\\}$. ',
        'Move 1 on $C$: the three 1s collapse to one 1, the three 3s collapse to one 3 → $\\{1,2,3\\}$. Move 2 on $B$: reordering changes nothing. Move 3: all three survivor lists are $1, 2, 3$ → $A = B = C$. One set, three spellings. *(verified: L1.1)*',
        '',
        '**(b)** Is $\\{0\\} = 0$? Compare types: the left side is a **set containing one element**; the right side is **the number zero**. Box ≠ content → **NO**. *(verified: L1.2)*',
        '',
        '**(c)** How many elements in $\\{1, \\{1\\}\\}$? Count **top-level items only** — never look inside a nested set:',
        '```',
        '{   1  ,  {1}  }',
        '    ↑      ↑',
        ' number   set — a box inside the box',
        '```',
        'Two items → **2 elements**. *(verified: L1.3)*',
        '',
        '**(d)** $U_n = \\{n, -n\\}$ — the set of a number and its negative:',
        '- $U_1 = \\{1, -1\\}$, $U_2 = \\{2, -2\\}$ — two elements each.',
        '- $U_0 = \\{0, -0\\} = \\{0, 0\\} = \\{0\\}$ — because $-0 = 0$, and repetition collapses (Move 1!). Sanity check: $U_0$ has ONE element, not two. *(verified: L1.4)*',
        '',
        '**The number pools (page 5):** $\\mathbb{Z}$ = integers $\\{\\ldots,-2,-1,0,1,2,\\ldots\\}$; $\\mathbb{Z}^+$ = **positive** integers (no 0, no negatives); $\\mathbb{R}$ = all real numbers. The lecture uses $\\mathbb{N}$ (naturals) and $\\mathbb{Q}$ (rationals) too — but whenever a question hangs on $\\mathbb{N}$, check your lecturer’s convention for whether 0 belongs.',
        '',
        '**Set-builder in action (Example 2, pages 7-8):** list $\\{x \\in S \\mid -2 < x < 5\\}$',
        '- Pool $\\mathbb{R}$: every real strictly between $-2$ and $5$ — infinitely many. Answer in **interval words**: "the open interval from $-2$ to $5$".',
        '- Pool $\\mathbb{Z}$: sweep the integers that survive the filter: $-1, 0, 1, 2, 3, 4$ → $\\{-1, 0, 1, 2, 3, 4\\}$. *(verified: L1.5)*',
        '- Pool $\\mathbb{Z}^+$: drop 0 and negatives → $\\{1, 2, 3, 4\\}$. *(verified: L1.6)*',
        '',
        '**Recognition trick:** the letter BEFORE the bar decides the answer type — $\\mathbb{R}$ → speak in intervals; $\\mathbb{Z}$ → LIST integers; $\\mathbb{Z}^+$ → list positives.',
        '',
        '**Teacher advice:** read the inequality arms with your finger. The closed arm ($\\le$) catches the boundary number; the strict arm ($<$) lets it fall. Here $-2 < x < 5$: both arms strict → $-2$ and $5$ both fall out.',
        '',
        '**Sanity check for $\\{-1,0,1,2,3,4\\}$:** is every element an integer strictly between $-2$ and $5$? $-1$ ✓ $0$ ✓ $1$ ✓ $2$ ✓ $3$ ✓ $4$ ✓. Is 5 missing correctly? $5 < 5$ is false → correctly excluded ✓.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Definition',
      markdown: md([
        '**Axiom of extension:** $A = B \\iff \\forall x\\ (x \\in A \\iff x \\in B)$. Order and multiplicity are not part of a set’s identity at all — only membership is.',
        '',
        '**Set-builder semantics:** for $A = \\{x \\in S \\mid P(x)\\}$,',
        '$x \\in A \\iff x \\in S \\land P(x)$. The pool condition and the property are BOTH required — an element outside $S$ never enters, whatever $P$ says.',
        '',
        'Where the course name comes from (page 6): the integers sit on the number line **separated from each other** — that is what *discrete* means. Discrete mathematics studies such separated, countable objects, in contrast with the continuous real line.',
      ]),
    },
  ],
  methods: [
    {
      question: '"Is {1, 1, 2, 3, 3, 3} = {1, 2, 3}?"',
      collegeMethod:
        'Re-derive set equality from the definition, hesitate on the repeated elements, wonder whether "3 three times" changes anything.',
      fastMethod:
        '**Three-Move Method:** strip duplicates (Move 1) → the lists are identical → **YES**, in five seconds. Repetition is invisible by the axiom of extension.',
    },
    {
      question: '"List the elements of {x ∈ Z | −3 < x ≤ 2}."',
      collegeMethod:
        'Mentally scan integers around the range, easy to include −3 by accident or drop 2.',
      fastMethod:
        '**Pool first, then arms:** pool $\\mathbb{Z}$ → list; left arm strict ($-3$ OUT), right arm closed ($2$ IN) → $\\{-2, -1, 0, 1, 2\\}$. ~10 seconds.',
    },
  ],
  recipe: {
    trigger: '"list the elements", "is A = B", roster vs set-builder, "how many elements"',
    steps: [
      'Identify the POOL (the letter before the bar) — it fixes the answer style.',
      'Read the filter arms with your finger ($<$ vs $\\le$ — the closed arm catches the boundary).',
      'Roster comparison: strip duplicates, ignore order, compare survivors.',
      'Counting elements: count TOP-LEVEL items only; a nested set is ONE element.',
    ],
    check: 'Re-test every listed element against the property, and re-test the two boundary numbers specifically.',
  },
  traps: [
    '$\\{0\\} \\neq 0$ and $\\emptyset \\neq \\{\\emptyset\\}$ — box vs content (returns in CU 1.3).',
    '$\\{1, \\{1\\}\\}$ has TWO elements — count top level only, never open nested boxes.',
    'The bar $\\mid$ in set-builder reads "**such that**" — never "divides".',
    '$\\mathbb{Z}$ vs $\\mathbb{Z}^+$: the zero decides — $\\mathbb{Z}^+$ has no 0 and no negatives.',
  ],
  summaryTable: {
    title: 'The Pool Decides the Answer',
    headers: ['Pool before the bar', 'Answer style', 'Example for −2 < x < 5'],
    rows: [
      ['$\\mathbb{R}$', 'Interval words (infinite)', '"the open interval from $-2$ to $5$"'],
      ['$\\mathbb{Z}$', 'List the surviving integers', '$\\{-1, 0, 1, 2, 3, 4\\}$'],
      ['$\\mathbb{Z}^+$', 'List positives only', '$\\{1, 2, 3, 4\\}$'],
    ],
  },
  recall: [
    { q: 'What is the ONLY thing that defines a set?', a: 'Its elements — order and repetition are invisible (axiom of extension).' },
    { q: 'How many elements in {1, {1}}?', a: 'Two: the number 1 and the set {1} — top level only.' },
    { q: '{x ∈ Z+ | −2 < x < 5}?', a: '{1, 2, 3, 4} — positives, both boundaries strict.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 1.2 — Subsets & the ∈ vs ⊆ distinction (pages 9-12)
// ===========================================================================

const subsetsMembership: Topic = {
  id: 'dm-l1-subsets-membership',
  lessonId: L1,
  cuCode: 'CU 1.2',
  title: 'Subsets — the ∈ vs ⊆ Distinction',
  quick:
    'الزتونة: ∈ says "this ONE object is ON the list". ⊆ says "EVERY element of my set is on your list". To test $A \\subseteq B$: walk through the elements of A one by one and ask "∈ B?". The first NO is your WITNESS — not a subset, proof finished.',
  sourcePages: [9, 10, 11, 12],
  prerequisites: ['Roster notation & extension (CU 1.1)'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Building and the Family',
      markdown: md([
        'Think of a building (a set) and the people in it.',
        '',
        '- $x \\in A$: **one person** lives in the building — a membership fact about a single object.',
        '- $B \\subseteq A$: a **whole family** lives in the building — every member of the family is inside. If ONE member lives elsewhere, the family is not inside.',
        '',
        'افتكر دي: the symbol points from the SMALL thing toward the BIG thing — an element into its set ($\\in$), a set into a bigger set ($\\subseteq$). If what sits on the left of the symbol is not a set, the symbol must be $\\in$; if it is a set being contained, you are in $\\subseteq$ territory.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Top-Level List Method (Example 4, page 11)',
      markdown: md([
        '**Step 0 — the definition.** $A \\subseteq B$ means: every element of $A$ is also an element of $B$. And the negative (page 10): $A \\not\\subseteq B$ means **at least one** element of $A$ is not in $B$ — one witness is a full proof.',
        '',
        '**The method:** before judging ANY ∈ or ⊆ statement, write the RIGHT set’s **top-level element list**. Then:',
        '',
        '```',
        'symbol:     ∈                     ⊆',
        'question:   is the LEFT OBJECT     does EVERY element of the LEFT SET',
        '            equal to ONE item      appear on the RIGHT list?',
        '            on the RIGHT list?',
        '```',
        '',
        '**Lecture Example 4 — all six statements rebuilt:**',
        '',
        '(a) $2 \\in \\{1, 2, 3\\}$ — right list: $1, 2, 3$. Is the **number 2** on it? Yes → **TRUE**. *(verified: L1.7a)*',
        '',
        '(b) $\\{2\\} \\in \\{1, 2, 3\\}$ — right list: $1, 2, 3$. For this to be true, the **set $\\{2\\}$** must itself be a listed item. The list holds numbers; $\\{2\\} \\neq 2$ → **FALSE**. *(verified: L1.7b)*',
        '',
        '(c) $2 \\subseteq \\{1, 2, 3\\}$ — $\\subseteq$ needs a **set** on the left. $2$ is a number → **FALSE**. *(verified: L1.7c)*',
        '',
        '(d) $\\{2\\} \\subseteq \\{1, 2, 3\\}$ — elements of the left set: just $2$. Is $2 \\in \\{1,2,3\\}$? Yes → **TRUE**. *(verified: L1.7d)*',
        '',
        '(e) $\\{2\\} \\subseteq \\{\\{1\\}, \\{2\\}\\}$ — elements of left: the **number 2**. Right list: $\\{1\\}, \\{2\\}$ — two sets, no bare numbers. Is the number 2 on that list? No ($2 \\neq \\{1\\}$ and $2 \\neq \\{2\\}$) → **FALSE**. *(verified: L1.7e)*',
        '',
        '(f) $\\{2\\} \\in \\{\\{1\\}, \\{2\\}\\}$ — right list: $\\{1\\}, \\{2\\}$. Is the **set $\\{2\\}$** equal to one listed item? Yes, the second one → **TRUE**. *(verified: L1.7f)*',
        '',
        '**Only (a), (d), (f) are true — exactly the lecture’s answer.**',
        '',
        '**The witness game:** $\\{1, 5\\} \\not\\subseteq \\{1, 2, 3\\}$ — witness $5$: it belongs to the left set and not to the right. One witness, proof done. *(verified: L1.9)*',
        '',
        '**Recognition trick:** curly braces on the LEFT of $\\in$ → the right side must be a **set of sets** for the statement to be true. Curly braces on the LEFT of $\\subseteq$ → run the element walk.',
        '',
        '**Teacher advice:** read $\\subseteq$ as "**lives inside**", and remember equality counts as inside: $A \\subseteq A$ always. Subset is one-directional — but if BOTH directions hold, $A = B$. *(verified: L1.8)*',
        '',
        '**Sanity check:** flip the direction to catch oversights. $\\{2\\} \\subseteq \\{1,2,3\\}$ is TRUE, yet $\\{1,2,3\\} \\subseteq \\{2\\}$ is FALSE — the $1$ and $3$ witness. A subset claim is a promise about ONE direction only.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Definitions',
      markdown: md([
        '$A \\subseteq B \\iff \\forall x\\ (x \\in A \\to x \\in B)$ — every left element lands on the right.',
        '',
        '$A \\not\\subseteq B \\iff \\exists x\\ (x \\in A \\land x \\notin B)$ — the existential witness.',
        '',
        'Antisymmetry: $A \\subseteq B \\land B \\subseteq A \\Rightarrow A = B$ — this is just the axiom of extension wearing subset clothing. A **proper subset** $A \\subset B$ additionally demands at least one element of $B$ outside $A$.',
        '',
        'Sneak preview (feeds CU 1.3): $\\emptyset \\subseteq A$ for EVERY set $A$ — vacuously true, because there is no element of $\\emptyset$ that could violate the promise.',
      ]),
    },
  ],
  methods: [
    {
      question: '"True or false: {2} ⊆ {{1}, {2}}?"',
      collegeMethod:
        'Re-read the subset definition, test the sides against each other informally — very easy to flip TRUE/FALSE here because both sides have braces.',
      fastMethod:
        '**One test:** elements of $\\{2\\}$ = the number 2; right list = $\\{1\\}, \\{2\\}$ — sets only. The number 2 is not listed → **FALSE**, three seconds.',
    },
    {
      question: '"Give a witness that {1, 5} ⊄ {1, 2, 3}."',
      collegeMethod:
        'Explain the full meaning of not-subset, then argue no element of {1,5} fails membership… slow and error-prone.',
      fastMethod:
        '**Witness = 5**: it is $\\in \\{1,5\\}$ and $\\notin \\{1,2,3\\}$. Name it, done — a single element is a complete proof.',
    },
  ],
  recipe: {
    trigger: '"∈ or ⊆ true/false", "is A a subset of B", "show that A ⊄ B"',
    steps: [
      'Write the RIGHT set’s top-level element list.',
      'For $\\in$: ask "is the LEFT OBJECT equal to one listed item?"',
      'For $\\subseteq$: check EVERY element of the left set against that list.',
      'Any NO → verdict FALSE, and the failing element is your named witness.',
    ],
    check: 'For a ⊆ claim, re-run the element walk once more; for an ∈ claim, confirm you compared OBJECTS, not sizes.',
  },
  traps: [
    '(b) and (c) of Example 4 fail for OPPOSITE reasons — $\\in$ wants a listed ITEM, $\\subseteq$ wants a left SET.',
    '$\\{2\\} \\in \\{\\{1\\},\\{2\\}\\}$ is TRUE — a set CAN be an element when the right side is a set of sets.',
    '$\\subseteq$ includes equality: every set is a subset of itself, and $\\emptyset$ is a subset of everything.',
    'Proving $A \\not\\subseteq B$ needs only ONE witness — checking more elements wastes exam time.',
  ],
  summaryTable: {
    title: 'The ∈/⊆ Verdict Table (memorize this shape)',
    headers: ['You see', 'Read it as', 'Verdict'],
    rows: [
      ['$2 \\in \\{1,2,3\\}$', '"the number 2 is on the list"', '✅ TRUE'],
      ['$\\{2\\} \\in \\{1,2,3\\}$', '"the SET {2} is on the list?"', '❌ FALSE — only 1, 2, 3 listed'],
      ['$2 \\subseteq \\{1,2,3\\}$', '"2 is a set living inside?"', '❌ FALSE — 2 is a number'],
      ['$\\{2\\} \\subseteq \\{1,2,3\\}$', '"every element of {2} is inside"', '✅ TRUE'],
      ['$\\{2\\} \\subseteq \\{\\{1\\},\\{2\\}\\}$', '"the number 2 is one of {1},{2}?"', '❌ FALSE'],
      ['$\\{2\\} \\in \\{\\{1\\},\\{2\\}\\}$', '"the SET {2} is one of the listed sets?"', '✅ TRUE'],
    ],
  },
  recall: [
    { q: '∈ vs ⊆ in one line?', a: '∈ = "one object IS ON the list"; ⊆ = "ALL my elements are on the list".' },
    { q: 'How do you prove A ⊄ B?', a: 'Exhibit ONE element of A missing from B — the witness.' },
    { q: 'Is ∅ ⊆ {1, 2, 3}?', a: 'Yes — ∅ is a subset of EVERY set: no element can violate.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 1.3 — The empty set & mutual disjointness (pages 13-15)
// ===========================================================================

const emptyDisjoint: Topic = {
  id: 'dm-l1-empty-disjoint',
  lessonId: L1,
  cuCode: 'CU 1.3',
  title: 'The Empty Set ∅ & Mutual Disjointness',
  quick:
    'الزتونة: $\\emptyset$ is THE set with zero elements — unique, and a subset of every set. Two sets are **disjoint** when they share nothing ($A \\cap B = \\emptyset$). A family is **mutually disjoint** only when EVERY pair shares nothing: with $k$ sets you must clear $k(k-1)/2$ pairs — one shared element anywhere kills the claim.',
  sourcePages: [13, 14, 15],
  prerequisites: ['Subsets & ∈ vs ⊆ (CU 1.2)'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Empty Bus',
      markdown: md([
        'An empty bus is still a bus — a set with no passengers is still a set. And because a set is defined only by its elements (CU 1.1), there can be only **one** empty set: two "different" empty sets would have exactly the same (zero) elements, so by the axiom of extension they are the same set.',
        '',
        'Now the trap of traps: $\\{\\emptyset\\}$ is a bus carrying **one empty box** — it has ONE element. $\\emptyset$ has NONE.',
        '',
        'افتكر دي: $\\emptyset$ = nothing; $\\{\\emptyset\\}$ = one thing.',
        '',
        'Disjoint friend groups: two groups with no common friend. THREE groups are mutually disjoint only if **every two of them** share nobody — checking only neighboring groups is where exams catch you.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Pair Grid (Example 5, page 15)',
      markdown: md([
        '**From zero.** If sets are defined by their elements, a set with NO elements is perfectly legal — convenient, and unique. The lecture’s two examples (page 13):',
        '',
        '$\\{1, 3\\} \\cap \\{2, 4\\} = \\emptyset$ — common elements? $1,3$ vs $2,4$: no overlap → empty. *(verified: L1.10)*',
        '',
        '$\\{x \\in \\mathbb{R} \\mid x^2 = -1\\} = \\emptyset$ — for every real $x$, $x^2 \\geq 0$, so $x^2 = -1$ is impossible: the filter machine catches nothing. *(verified: L1.11)*',
        '',
        '**Lecture Example 5 rebuilt — the pair grid.** For $k$ sets there are $k(k-1)/2$ pairs; for 3 sets: 3 pairs.',
        '',
        '**(a)** $A_1=\\{3,5\\}$, $A_2=\\{1,4,6\\}$, $A_3=\\{2\\}$:',
        '```',
        '            A1 = {3,5}   A2 = {1,4,6}   A3 = {2}',
        'A1 = {3,5}      —        3,5 vs 1,4,6   3,5 vs 2',
        '                          → ∅  ✓         → ∅  ✓',
        'A2 = {1,4,6}               —            1,4,6 vs 2',
        '                                        → ∅  ✓',
        'A3 = {2}                                 —',
        '```',
        'All 3 pairs empty → **mutually disjoint**. *(verified: L1.12)*',
        'Size sanity: $|A_1 \\cup A_2 \\cup A_3| = 2+3+1 = 6$ — sizes add when pieces are disjoint ✓.',
        '',
        '**(b)** $B_1=\\{2,4,6\\}$, $B_2=\\{3,7\\}$, $B_3=\\{4,5\\}$:',
        '$B_1 \\cap B_2 = \\emptyset$ ✓ … but $B_1 \\cap B_3 = \\{4\\}$ — **witness found: the element 4 is shared**. Answer: **NOT mutually disjoint**, stop. That $B_2 \\cap B_3 = \\emptyset$ no longer matters — one failed pair is fatal. *(verified: L1.13)*',
        '',
        '**Exam shortcut:** the moment you spot ONE shared element, answer NO and name it. Never sweep all pairs after the kill.',
        '',
        '**Teacher advice:** "mutually disjoint" is a claim about EVERY pair — $B_1 \\cap B_2 = \\emptyset$ and $B_2 \\cap B_3 = \\emptyset$ together say NOTHING about $B_1 \\cap B_3$. The pair at maximum distance is the examiner’s favorite hiding spot.',
        '',
        '**Sanity check:** $\\emptyset$ is disjoint from every set — including itself ($\\emptyset \\cap \\emptyset = \\emptyset$). And disjoint does NOT mean empty: $\\{1,3\\}$ and $\\{2,4\\}$ are full of elements; they just never overlap.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Statement',
      markdown: md([
        'Uniqueness of $\\emptyset$: if $X$ has no elements, then $\\forall x\\ (x \\in X \\iff x \\in \\emptyset)$ holds vacuously on both sides, so $X = \\emptyset$ by the axiom of extension.',
        '',
        'Vacuous subset: $\\emptyset \\subseteq A$ because the condition $\\forall x (x \\in \\emptyset \\to x \\in A)$ has no antecedent case that could fail — an empty promise cannot be broken.',
        '',
        'Mutual disjointness of a family $\\{A_1, \\ldots, A_k\\}$:',
        '$\\forall i \\neq j: A_i \\cap A_j = \\emptyset$ — a statement over ALL $k(k-1)/2$ pairs, which is exactly why one counterexample pair suffices to negate it.',
      ]),
    },
  ],
  methods: [
    {
      question: '"Are B1 = {2,4,6}, B2 = {3,7}, B3 = {4,5} mutually disjoint?"',
      collegeMethod:
        'Try to eyeball all three sets at once — the shared 4 hides in plain sight between B1 and B3.',
      fastMethod:
        '**Pair grid:** $B_1B_2$ ✓, then $B_1B_3$ shares 4 → **NO + witness 4**. Two intersections, ten seconds.',
    },
    {
      question: '"How many pairs must be checked for 5 sets?"',
      collegeMethod: 'Count them on fingers: (1,2),(1,3),(1,4),(1,5),(2,3),… — slow and easy to miss one.',
      fastMethod: '$k(k-1)/2 = 5\\cdot4/2 = 10$ pairs. Same formula as edges in a complete graph — it returns in Lecture 5.',
    },
  ],
  recipe: {
    trigger: '"disjoint", "mutually disjoint", "= ∅", "how many pairs to check"',
    steps: [
      'For "= ∅" claims: try hard to exhibit ONE element satisfying the property — if none can exist, the set is empty.',
      'For disjoint pairs: intersect the two lists and hunt for shared elements.',
      'For mutual disjointness: $k(k-1)/2$ pairs — EVERY pair must come out empty.',
      'The first shared element found → answer NO and name that element as the witness.',
    ],
    check: 'A YES answer means you cleared every pair; a NO answer must name the shared element.',
  },
  traps: [
    '$\\emptyset \\neq \\{\\emptyset\\}$ — zero elements vs one element; the classic exam slip.',
    '"Mutually disjoint" demands EVERY pair — never just the neighboring pairs.',
    '$\\emptyset$ is a subset of every set — including $\\emptyset$ itself.',
    '$A \\cap B = \\emptyset$ does NOT mean $A$ or $B$ is empty — they simply do not overlap.',
  ],
  summaryTable: {
    title: 'The Same-Looking Four — never confuse them',
    headers: ['Symbol', 'What it is', 'Element count'],
    rows: [
      ['$0$', 'a number — not a set', '—'],
      ['$\\{0\\}$', 'a set containing the number 0', '1'],
      ['$\\emptyset$', 'the empty set', '0'],
      ['$\\{\\emptyset\\}$', 'a set containing the empty set', '1 (the element is $\\emptyset$)'],
    ],
  },
  recall: [
    { q: 'Elements in ∅ and in {∅}?', a: '∅ has 0 elements; {∅} has exactly 1 — the empty set itself.' },
    { q: 'What kills mutual disjointness?', a: 'ONE pair sharing ONE element — exhibit it and you are done.' },
    { q: 'How many pairs for k sets?', a: 'k(k−1)/2 — every pair must be checked for a YES.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 1.4 — Partitions of sets (pages 16-18)
// ===========================================================================

const partitions: Topic = {
  id: 'dm-l1-partitions',
  lessonId: L1,
  cuCode: 'CU 1.4',
  title: 'Partitions of a Set',
  quick:
    'الزتونة: a partition of $A$ = cut $A$ into non-overlapping pieces that together rebuild $A$ **exactly**. The 2-Check Audit: **(1) UNION** — the pieces cover ALL of $A$ (no missing element, no outside junk); **(2) DISJOINT** — no two pieces share an element. Both pass → partition. First failure → NOT, with the witness element named.',
  sourcePages: [16, 17, 18],
  prerequisites: ['Empty set & disjointness (CU 1.3)'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — Cutting the Cake',
      markdown: md([
        'A partition is cutting a cake so that every slice is eaten **exactly once**:',
        '',
        '- No bite left over → the slices **cover the whole cake** (that is the UNION check).',
        '- No bite stolen by two slices → the pieces **do not overlap** (that is the DISJOINT check).',
        '',
        'Same story with a class split into working groups: every student in **exactly one** group — nobody unplaced, nobody doubled.',
        '',
        'افتكر دي: partition = "everyone placed, nobody doubled".',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The 2-Check Audit (Example 6, page 17)',
      markdown: md([
        '**(a)** $A=\\{1,2,3,4,5,6\\}$ with pieces $A_1=\\{1,2\\}$, $A_2=\\{3,4\\}$, $A_3=\\{5,6\\}$.',
        '',
        '**CHECK 1 — UNION, line by line:**',
        '$\\{1,2\\} \\cup \\{3,4\\} = \\{1,2,3,4\\}$',
        '$\\{1,2,3,4\\} \\cup \\{5,6\\} = \\{1,2,3,4,5,6\\} = A$ ✓ — nothing missing, nothing extra.',
        '',
        '**CHECK 2 — DISJOINT (pair grid from CU 1.3):**',
        '$A_1 \\cap A_2 = \\emptyset$ ✓, $A_1 \\cap A_3 = \\emptyset$ ✓, $A_2 \\cap A_3 = \\emptyset$ ✓',
        '',
        'Both checks pass → **partition** ✓ *(verified: L1.14)*. Size sanity: $2+2+2 = 6 = |A|$ ✓ — disjoint pieces’ sizes must add up.',
        '',
        '**(b)** $\\mathbb{Z}$ split by the remainder on division by 3:',
        '$T_0 = \\{n \\mid n = 3k\\}$, $T_1 = \\{n \\mid n = 3k+1\\}$, $T_2 = \\{n \\mid n = 3k+2\\}$ for some integer $k$.',
        '',
        'CHECK 2 first (the fast one): remainders $0, 1, 2$ are **exclusive** — no integer carries two remainders at once → no integer sits in two classes ✓.',
        'CHECK 1: every integer has SOME remainder $0,1,2$ → everybody is placed ✓.',
        '→ **partition of $\\mathbb{Z}$** *(verified: L1.15)*',
        '',
        '```',
        'Z = T0 ∪ T1 ∪ T2',
        '    ┌───────────────┬───────────────┬───────────────┐',
        '    │ … −6, −3, 0,  │ … −5, −2, 1, │ … −4, −1, 2, │',
        '    │     3, 6, 9 … │     4, 7,10 … │     5, 8,11 … │',
        '    └───────────────┴───────────────┴───────────────┘',
        '       remainder 0     remainder 1     remainder 2',
        '```',
        '',
        '**Witnesses — compute, never guess (negatives are the trap):**',
        '$7 = 3\\cdot2+1 \\to T_1$; $6 = 3\\cdot2 \\to T_0$; $8 = 3\\cdot2+2 \\to T_2$;',
        '$-2 = 3(-1)+1 \\to T_1$; $-4 = 3(-2)+2 \\to T_2$ — note $-4$ does NOT land in $T_0$!',
        '',
        '**Recognition trick:** the word "partition" should AUTO-start the 2-check audit.',
        '',
        '**Exam shortcut:** the union is ONE calculation — do it first. If it fails, you are finished; no need to check pairs at all.',
        '',
        '**Teacher advice:** a partition is exactly the promise "each element lives in exactly ONE piece". That phrase is what makes splitting a problem into cases legal — you will reuse it in proofs for the rest of the course.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Definition',
      markdown: md([
        '$\\{A_1, \\ldots, A_n\\}$ is a partition of $A$ iff:',
        '',
        '1. $A_i \\subseteq A$ and $A = A_1 \\cup A_2 \\cup \\ldots \\cup A_n$ (full coverage);',
        '2. $A_i \\cap A_j = \\emptyset$ for all $i \\neq j$ (no overlap);',
        '3. $A_i \\neq \\emptyset$ (pieces are non-empty — the standard convention).',
        '',
        'Consequence: each $a \\in A$ lies in **exactly one** piece — "at least one" by coverage, "at most one" by disjointness. The mod-3 classes $T_0, T_1, T_2$ are the canonical example; they return later as equivalence classes.',
      ]),
    },
  ],
  methods: [
    {
      question: '"Is {{1,2}, {3,4}, {5,6}} a partition of {1,…,6}?"',
      collegeMethod:
        'Intuition says "looks spread out" — risky, because intuition does not distinguish a partition from a near-partition.',
      fastMethod:
        '**2-Check Audit:** union rebuilds $\\{1,\\ldots,6\\}$ ✓, all three pairs empty ✓ → **YES**, under a minute.',
    },
    {
      question: '"Which piece contains −7 in the mod-3 partition?"',
      collegeMethod:
        'Count backwards from 0 hesitantly — with negatives, counting backwards is exactly where mistakes live.',
      fastMethod:
        'Compute: $-7 = 3(-3)+2$ → remainder 2 → **$T_2$**. Formula: $r = n - 3\\lfloor n/3 \\rfloor$ with floor rounding toward $-\\infty$.',
    },
  ],
  recipe: {
    trigger: '"partition", "do these sets divide/split A into pieces"',
    steps: [
      'Build the union of all pieces, left to right, in one line of arithmetic.',
      'Compare with $A$: a missing element or an outside element → NOT a partition (name it).',
      'Pairwise intersections: the first shared element → NOT a partition (name it).',
      'Finite sets: the piece sizes must add up to $|A|$ — a 10-second sanity check.',
    ],
    check: 'Answer YES only after BOTH checks passed; answer NO together with the named witness element.',
  },
  traps: [
    'Overlap is only HALF the failure — missing coverage fails too; both checks are mandatory.',
    'The standard definition requires NON-EMPTY pieces — a family containing $\\emptyset$ is not a partition.',
    'Negative integers in mod partitions: COMPUTE with $n = 3k + r$, never guess the pattern ($-1$ lands in $T_2$, not $T_0$).',
    'The union must be EXACTLY $A$ — pieces may not import outside elements.',
  ],
  recall: [
    { q: 'The two checks of a partition?', a: 'UNION rebuilds A exactly + no two pieces overlap.' },
    { q: 'Where does −4 land in the mod-3 partition?', a: '−4 = 3(−2) + 2 → T₂ (remainder 2).' },
    { q: 'Which word auto-starts the audit?', a: '"Partition" → 2-check: union first, then pairs.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 1.5 — Power sets (page 19) — pilot CU rebuilt in masterpiece style
// ===========================================================================

const powerSets: Topic = {
  id: 'dm-topic-power-sets',
  lessonId: L1,
  cuCode: 'CU 1.5',
  title: 'Power Sets P(A)',
  quick:
    'الزتونة: $P(A)$ = the set of **ALL subsets** of $A$ — always including $\\emptyset$ and $A$ itself. Every element of $A$ answers one binary question: "**in or out?**" — so $n$ elements → $2^n$ subsets. To COUNT: $2^n$, no listing. To LIST: binary counting, $\\emptyset$ first, $A$ last.',
  sourcePages: [19, 20],
  prerequisites: ['Subsets & ∈ vs ⊆ (CU 1.2)', 'Empty set (CU 1.3)'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Delegation',
      markdown: md([
        'Three friends — Ahmed, Sara, Omar — can be sent to a volunteer day. Which delegations are possible? For **each friend** flip a coin: *comes* or *doesn’t come*.',
        '',
        '```',
        '                    Ahmed?',
        '                 in ┌─┴─┐ out',
        '              Sara?      Sara?',
        '            in ┌─┴─┐ out  in ┌─┴─┐ out',
        '              …    …      …    …   → 8 leaves',
        '```',
        '',
        'Three coins → $2 \\times 2 \\times 2 = 8$ possible delegations, from "nobody" ($\\emptyset$) to "everybody" ($A$ itself).',
        '',
        'افتكر دي: a subset is an **attendance list**; the power set is the list of **all possible attendance lists**.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The In/Out Binary Trick (USE THIS IN EXAMS)',
      markdown: md([
        '**Rebuild from zero (Example 7, page 19).** Find $P(\\{x, y\\})$.',
        'A subset $S$ must satisfy: every element of $S$ is $x$ or $y$ (the CU 1.2 element walk). So each of $x$, $y$ faces ONE binary choice:',
        '',
        '| $x$? | $y$? | Subset |',
        '|------|------|--------|',
        '| out | out | $\\emptyset$ |',
        '| in | out | $\\{x\\}$ |',
        '| out | in | $\\{y\\}$ |',
        '| in | in | $\\{x, y\\}$ |',
        '',
        '$2 \\times 2 = 4$ subsets: $P(\\{x,y\\}) = \\{\\emptyset, \\{x\\}, \\{y\\}, \\{x,y\\}\\}$ *(verified: L1.16)*.',
        '',
        '**Read the result carefully:** $P(A)$ is a **set whose elements are sets** — count TOP-LEVEL items: exactly 4. (The nested-box discipline from CU 1.1(c) again.)',
        '',
        '**Scale up to $A = \\{1, 2, 3\\}$ — binary counting, 0 = out, 1 = in:**',
        '',
        '| Code | Subset | | Code | Subset |',
        '|------|--------|-|------|--------|',
        '| 000 | $\\emptyset$ | | 100 | $\\{1\\}$ |',
        '| 001 | $\\{3\\}$ | | 101 | $\\{1,3\\}$ |',
        '| 010 | $\\{2\\}$ | | 110 | $\\{1,2\\}$ |',
        '| 011 | $\\{2,3\\}$ | | 111 | $\\{1,2,3\\}$ |',
        '',
        'Codes $0 \\to 7$ exhaust everything: $2^3 = 8$ subsets, zero omissions by construction. *(verified: CU1.2)*',
        '',
        '**Nested power sets — the exam’s favorite twist:**',
        '$|A| = 4 \\Rightarrow |P(A)| = 2^4 = 16 \\Rightarrow |P(P(A))| = 2^{16} = 65{,}536$. *(verified: L1.17)*',
        'The $2^n$ law applies to whatever set you just built — apply it again.',
        '',
        '**Sanity-check protocol (always run it):**',
        '1. Count your list — it must equal $2^n$ EXACTLY.',
        '2. $\\emptyset$ first, $A$ last — both must be present.',
        '3. Every middle subset contains at least one element, never all $n$.',
        '',
        '**Exam shortcut:** asked "how many subsets?" → answer $2^n$ and move on. NEVER list when a count is asked.',
        '',
        '**Teacher advice:** asked "which of these are subsets of $A$?" — do not test sizes; run the CU 1.2 element walk on each candidate.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Definition',
      markdown: md([
        '$P(A) = \\{S : S \\subseteq A\\}$ — every element of $P(A)$ is itself a set contained in $A$.',
        '',
        '$\\emptyset \\subseteq A$ vacuously (CU 1.3) and $A \\subseteq A$ trivially (CU 1.2) — so both extremes always belong.',
        '',
        'The count: each of the $n$ elements is included or not — 2 independent choices per element — hence $2^n$ by the **multiplication principle** (the same principle that counts the delegation tree in Door 1). Iterating: $|P(P(A))| = 2^{2^n}$.',
      ]),
    },
  ],
  methods: [
    {
      question: '"Find P({x, y, z})."',
      collegeMethod:
        'Recall "∅ is a subset of every set… any set is a subset of itself… the only other subsets are…" — relies on remembering what you might forget, and drops one of the middle subsets under time pressure.',
      fastMethod:
        '$2^3 = 8$ subsets. Write binary codes 000 → 111, translate each. **~15 seconds, zero omissions by construction.**',
    },
    {
      question: '"How many elements are in P(P(A)) if |A| = 4?"',
      collegeMethod:
        'The lecture PDF never shows a nested power set — you would have to build the reasoning yourself mid-exam.',
      fastMethod:
        '$|P(A)| = 2^4 = 16 \\Rightarrow |P(P(A))| = 2^{16} = 65{,}536$. Apply $2^n$ repeatedly. **The exam loves this shortcut.**',
    },
  ],
  recipe: {
    trigger: '"power set", "all subsets", "how many subsets", |P(A)|',
    steps: [
      'Count $n = |A|$.',
      'Asked *how many*: answer $2^n$ (nested? apply $2^n$ again to the set you just built).',
      'Asked to *list*: binary codes $0 \\to 2^n - 1$; element $i$ is "in" if bit $i$ = 1.',
      'Always include $\\emptyset$ and $A$ itself — first and last.',
    ],
    check: 'Count your list — it must equal $2^n$ exactly. If it doesn’t, you dropped a binary code.',
  },
  traps: [
    '$|P(A)| = 2^n$ — **not** $n^2$, not $2n$.',
    '$\\{\\emptyset\\} \\neq \\emptyset$ — one element vs zero elements (the CU 1.3 table).',
    '$P(\\{x,y\\})$ has 4 elements, and the elements are SETS — never merge them into one set.',
    'The full set $\\{x, y\\}$ itself IS a member of $P(\\{x,y\\})$ — forgetting it breaks the count.',
  ],
  recall: [
    { q: '|P(A)| when |A| = n?', a: '$2^n$ — every element answers "in or out?"' },
    { q: 'List P({x, y}).', a: '{∅, {x}, {y}, {x, y}} — binary codes 00, 10, 01, 11.' },
    { q: 'The two subsets EVERY power set contains?', a: '$\\emptyset$ and $A$ itself.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 1.6 — Ordered pairs & Cartesian products (pages 21-27)
// ===========================================================================

const cartesianProducts: Topic = {
  id: 'dm-l1-cartesian-products',
  lessonId: L1,
  cuCode: 'CU 1.6',
  title: 'Ordered Pairs & Cartesian Products A×B',
  quick:
    'الزتونة: an ordered pair $(a, b)$ remembers ORDER — $(1,2) \\neq (2,1)$. $A \\times B$ = ALL pairs with **slot 1 from $A$, slot 2 from $B$**. Count: $|A \\times B| = |A| \\cdot |B|$ — a grid. And $A \\times B \\neq B \\times A$ unless $A = B$.',
  sourcePages: [21, 22, 23, 24, 25, 26, 27],
  prerequisites: ['Roster notation (CU 1.1)', '∈ vs ⊆ (CU 1.2)'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — Cinema Seats',
      markdown: md([
        'A seat is described by an ordered pair: (row 3, chair 5). Swap the numbers — (row 5, chair 3) — and you are sitting somewhere completely different. **The pair IS the order.**',
        '',
        '$A \\times B$ is the full **seating chart**: every row (from $A$) paired with every chair column (from $B$).',
        '',
        'افتكر دي: the $\\times$ sign keeps the promise — **FIRST slot from the FIRST set, SECOND slot from the SECOND set**. $A \\times B$: first slot $A$, second slot $B$. Swap the sets and you swap the slots.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Row Method (Example 9, pages 24-27)',
      markdown: md([
        '**From zero (Example 8, page 21).** An ordered pair records a first coordinate and a second coordinate. Equality is strict:',
        '$$(a, b) = (c, d) \\iff a = c \\ \\textbf{and}\\ b = d$$',
        '- Is $(1,2) = (2,1)$? Would need $1 = 2$ — false → **NO**. *(verified: L1.18)*',
        '- First element of $(1,1)$? The number $1$ — first slot; repetition across slots is fine.',
        '',
        '**Now $A = \\{1,2,3\\}$, $B = \\{u,v\\}$ (Example 9).**',
        '',
        '**(a) $A \\times B$ — the ROW METHOD:** fix the $A$-element, walk $B$:',
        '```',
        '          u      v      ← slot 2 from B',
        '   1    (1,u)  (1,v)',
        '   2    (2,u)  (2,v)    ← slot 1 from A (rows)',
        '   3    (3,u)  (3,v)',
        '```',
        '$A \\times B = \\{(1,u),(2,u),(3,u),(1,v),(2,v),(3,v)\\}$ — **6 pairs**. *(verified: L1.19)*',
        '',
        '**(b) $B \\times A$:** now the rows are $u, v$ and the columns are $1, 2, 3$:',
        '$B \\times A = \\{(u,1),(u,2),(u,3),(v,1),(v,2),(v,3)\\}$ — 6 pairs again, but **different pairs**: $(1,u) \\neq (u,1)$.',
        '',
        '**(c) $B \\times B = \\{(u,u),(u,v),(v,u),(v,v)\\}$ — 4 pairs** (a square: $2 \\times 2$).',
        '',
        '**(d) The counts, line by line:**',
        '$|A \\times B| = 3 \\cdot 2 = 6$; $|B \\times A| = 2 \\cdot 3 = 6$; $|B \\times B| = 2 \\cdot 2 = 4$. *(verified: L1.21)*',
        '',
        '**(e) $\\mathbb{R} \\times \\mathbb{R}$** = every $(x, y)$ with both coordinates real — the **Cartesian plane**: slot 1 = horizontal, slot 2 = vertical.',
        '```',
        'y',
        '3 |   ·     ·     ·',
        '2 |   ·     ·     ·',
        '1 |   ·    (2,1)  ·',
        '0 +—————————1—————2—————3——→ x',
        '```',
        'Reading $(2,1)$: slot 1 (the 2) → walk 2 right; slot 2 (the 1) → walk 1 up.',
        '',
        '**Recognition trick:** every "list $A \\times B$" question is a GRID: rows from set 1, columns from set 2, every cell is one pair.',
        '',
        '**Sanity check — the slots are TYPED:** is $(3, u) \\in A \\times B$? slot 1: $3 \\in A$ ✓, slot 2: $u \\in B$ ✓ → yes. Is $(u, 3) \\in A \\times B$? Slot 1 must come from $A$, but $u \\notin A$ → **NO**. Swapping slots changes membership.',
        '',
        '**Equality question — one witness decides:** is $A \\times B = B \\times A$?',
        'Witness: $(1, u) \\in A \\times B$ but $(1, u) \\notin B \\times A$ → **NOT equal**. *(verified: L1.20)*',
        'Special case $A = B = \\{u, v\\}$: then $A \\times B = B \\times A$ — the products coincide precisely when the sets coincide.',
        '',
        '**Exam shortcut:** asked "how many pairs?" → $|A| \\cdot |B|$, never list.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Formal Definition',
      markdown: md([
        '$A \\times B = \\{(a, b) \\mid a \\in A \\land b \\in B\\}$ — the set of ALL ordered pairs.',
        '',
        'Equality: $(a,b) = (c,d) \\iff (a = c \\land b = d)$ — BOTH coordinates must match; order is the identity of a pair.',
        '',
        'Cardinality: $|A \\times B| = |A| \\cdot |B|$ by the multiplication principle — $m$ rows times $n$ columns. Iterating: $|A \\times B \\times C| = |A||B||C|$.',
        '',
        '$A \\times B = B \\times A$ holds essentially only when $A = B$; otherwise a witness pair like $(a, b)$ with $a \\notin B$ separates them. $\\mathbb{R} \\times \\mathbb{R}$ corresponds bijectively to the points of the plane — the Cartesian plane of analytic geometry.',
      ]),
    },
  ],
  methods: [
    {
      question: '"List A×B for A = {1,2,3}, B = {u,v}."',
      collegeMethod:
        'Recall the definition, then generate pairs unsystematically — duplicates and omissions creep in under time pressure.',
      fastMethod:
        '**Row method:** 3 rows (from A) × 2 columns (from B) = 6 pairs, read off the grid in order. ~20 seconds, zero omissions.',
    },
    {
      question: '"Is B×A = A×B? Justify."',
      collegeMethod:
        'Rebuild both products element by element and compare — two full lists and a careful scan.',
      fastMethod:
        '**Witness pair:** $(u, 1) \\in B \\times A$ but $(u, 1) \\notin A \\times B$ → NOT equal. One pair is a complete justification.',
    },
  ],
  recipe: {
    trigger: '"Cartesian product", "A×B", "list the pairs", "how many pairs"',
    steps: [
      'Slot 1 ← first set; slot 2 ← second set. Write the slots before anything else.',
      'List with the ROW method: fix slot 1, walk slot 2 through the whole second set.',
      'Count = $|A| \\cdot |B|$ — rows times columns.',
      'Equality doubt → exhibit one differing witness pair.',
    ],
    check: 'Every listed pair has slot 1 ∈ first set and slot 2 ∈ second set; the count equals the product.',
  },
  traps: [
    '$(1,2) \\neq (2,1)$ — the OPPOSITE of the roster law from CU 1.1 ($\\{1,2\\} = \\{2,1\\}$)! Sets forget order; pairs are DEFINED by order.',
    '$A \\times B \\neq B \\times A$ in general — one witness pair proves it.',
    '$|A \\times B| = |A| \\cdot |B|$ — a product, never a sum.',
    'Pair equality demands BOTH slots equal — $(2,3) = (2,3)$ trivially, but $(2,3) \\neq (3,2)$.',
  ],
  summaryTable: {
    title: 'The Order Battle — Set vs Pair (the CU 1.1 vs CU 1.6 law)',
    headers: ['You see', 'Law', 'Because'],
    rows: [
      ['$\\{1,2\\} = \\{2,1\\}$', 'TRUE — sets forget order', 'Axiom of extension (CU 1.1)'],
      ['$(1,2) = (2,1)$', 'FALSE — pairs live on order', 'Pair equality needs slot-by-slot match'],
      ['$A \\times B = B \\times A$?', 'NO (unless $A = B$)', 'Witness pair: $(1,u) \\in A\\times B$ only'],
      ['$|A \\times B|$', '$|A| \\cdot |B|$', 'Grid: rows × columns'],
    ],
  },
  recall: [
    { q: '|A×B| when |A| = m, |B| = n?', a: 'm·n — an m×n grid of pairs.' },
    { q: 'When is A×B = B×A?', a: 'Essentially only when A = B; otherwise find a witness pair.' },
    { q: '{1,2} vs (1,2) — who remembers order?', a: 'The set forgets it; the pair is defined by it.' },
  ],
  verifiedOn: VERIFIED,
};

export const lecture1SetsTopicSet: TopicSet = {
  lessonId: L1,
  lectureLabel: 'Lecture 1 · Sets',
  topics: [rosterExtension, subsetsMembership, emptyDisjoint, partitions, powerSets, cartesianProducts],
};
