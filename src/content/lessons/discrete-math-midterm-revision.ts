import type { Lesson, LessonPage } from '../types';

interface TeachingNotes {
  recognition?: string;
  trap?: string;
  sourceNote?: string;
  recap?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  terms: string,
  notes: TeachingNotes = {},
): LessonPage {
  const blocks: LessonPage['blocks'] = [
    { type: 'zobda', text: takeaway },
    { type: 'recognition', title: 'Key words and symbols — مصطلحات مهمة', markdown: terms },
    { type: 'foundation', title: 'Walk through the idea', markdown: explanation },
  ];
  if (notes.recognition) {
    blocks.push({ type: 'recognition', title: 'How to recognize and reuse it', markdown: notes.recognition });
  }
  if (notes.trap) blocks.push({ type: 'trap', title: 'A mix-up to avoid', markdown: notes.trap });
  if (notes.sourceNote) blocks.push({ type: 'source-note', text: notes.sourceNote });
  if (notes.recap) blocks.push({ type: 'foundation', title: 'Quick review recap', markdown: notes.recap });
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [], note };
}

const pages: LessonPage[] = [
  visualPage(
    1,
    'Discrete Mathematics — cover',
    'The cover identifies the course as Discrete Mathematics, names Dr. Moataz and Dr. Adel, and says Fall 2025–2026. The PDF metadata records a creation/modification date of 4 November 2025. This is a revision deck, not a new topic lecture.',
  ),
  explainedPage(
    2,
    'Midterm review — stated scope and sequence',
    'The slides frame this as a midterm review for Weeks 1–4, covering sets and propositional logic through the card-selection problem.',
    'The title slide names sets, functions, and propositional logic, and says the material runs through card problems before arguments. The following slides review logical equivalences, conditionals, and cards, then provide a question bank on modular arithmetic, set operations, nested sets, power sets, and propositional logic. There are no function questions in the visible bank, so the deck does not by itself cover every item named on this title slide. The filename includes “lec 11,” but the slide deck calls itself a midterm revision and gives no lecture number on its content pages.',
    '**Revision deck (مراجعة)** — a recap and practice set, not necessarily a full course syllabus.  \n**Scope (نطاق)** — the topics the review claims to cover.  \n**Question bank** — a set of practice questions; this one is numbered 1–52.',
    {
      trap: 'Do not assume that every topic named in the heading has a worked explanation or even a question in the bank. Functions are named, but no function question appears on these pages.',
      sourceNote: 'The printed title says “Midterm Exam From Week 1 To Week 4”; the filename’s “lec 11” is not confirmed by the slide content. The deck’s question bank also includes modular arithmetic.',
    },
  ),
  visualPage(
    3,
    'Revision — section divider',
    'This page only says “Revision” and separates the title slide from the review material; it introduces no new definition or exercise.',
  ),
  explainedPage(
    4,
    'Logical equivalences — a compact law sheet',
    'Use named equivalence laws to replace a statement with another that has the same truth value in every case.',
    'The table is a reference for simplifying logic. Commutative and associative laws let you reorder or regroup AND and OR. Distributive laws expand or factor expressions. Identity laws say p ∧ T ≡ p and p ∨ F ≡ p; the universal-bound laws say p ∨ T ≡ T and p ∧ F ≡ F. Negation laws give p ∨ ¬p ≡ T and p ∧ ¬p ≡ F. Double negation removes two NOTs; idempotent laws reduce p ∨ p and p ∧ p to p. De Morgan’s laws move a negation across parentheses and swap AND with OR. Absorption removes a redundant part, for example p ∨ (p ∧ q) ≡ p. The table also defines T as a tautology and F (the slide uses c for contradiction in the theorem box) as a contradiction.',
    '**Logical equivalence (تكافؤ منطقي)** — same truth value for every assignment.  \n**Tautology (قضية صادقة دائمًا)** — always true.  \n**Contradiction (تناقض)** — always false.  \n**De Morgan’s laws** — ¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q.',
    {
      recognition: 'When proving equivalence, change one small part at a time and write the law that justifies each change.',
      trap: 'The symbol c in the table means a contradiction, so it behaves like F. Do not confuse it with a proposition variable.',
    },
  ),
  explainedPage(
    5,
    'Worked equivalence — simplify by replacing parts',
    'The target is ¬(¬p ∧ q) ∧ (p ∨ q) ≡ p; apply equivalence laws until only p remains.',
    'This page poses the example and explains the method: replace a subexpression with an equivalent one, keeping the whole statement equivalent at each step. The next page shows the full chain. A useful way to read it is to focus on the part being changed rather than trying to transform the whole formula at once.',
    '**Replace by an equivalent** — substitute a formula with the same truth behavior.  \n**Target form** — the simpler expression we are trying to reach.',
    { recognition: 'Look for a negation around parentheses (De Morgan), two negations (double negation), or opposite literals such as q ∧ ¬q (contradiction).' },
  ),
  explainedPage(
    6,
    'Worked equivalence — line-by-line derivation',
    '¬(¬p ∧ q) ∧ (p ∨ q) reduces to p because De Morgan produces p ∨ ¬q, and distribution exposes q ∧ ¬q = F.',
    'Follow the slide’s sequence:\n\n1. ¬(¬p ∧ q) ∧ (p ∨ q) ≡ (¬(¬p) ∨ ¬q) ∧ (p ∨ q), by De Morgan’s law.\n2. ≡ (p ∨ ¬q) ∧ (p ∨ q), by double negation.\n3. ≡ p ∨ (¬q ∧ q), by distributivity: (p ∨ a) ∧ (p ∨ b) ≡ p ∨ (a ∧ b).\n4. ≡ p ∨ (q ∧ ¬q), by commutativity of AND.\n5. ≡ p ∨ F, because q and ¬q cannot both be true.\n6. ≡ p, by the identity law for OR.',
    '**De Morgan** — negating an AND makes an OR of the negations.  \n**Contradiction** — q ∧ ¬q is always false.  \n**Identity** — p ∨ F is equivalent to p.',
    { trap: 'The slide’s step 3 uses the distributive law in the reverse direction (factoring). This is still a valid equivalence.' },
  ),
  explainedPage(
    7,
    'Logical-equivalence exercises — reasons and simplified results',
    'The first two exercises fill in standard law names; the remaining five simplify to the expressions printed at the right.',
    '**1.** (p ∧ ¬q) ∨ (p ∧ q) ≡ p ∧ (¬q ∨ q) by distributivity; ≡ p ∧ (q ∨ ¬q) by commutativity of OR; ≡ p ∧ T by the negation law; ≡ p by identity.\n\n**2.** (p ∨ ¬q) ∧ (¬p ∨ ¬q) ≡ (¬q ∨ p) ∧ (¬q ∨ ¬p) by commutativity of OR; ≡ ¬q ∨ (p ∧ ¬p) by distributivity; ≡ ¬q ∨ F by the negation law; ≡ ¬q by identity.\n\n**3.** (p ∧ ¬q) ∨ p ≡ p by absorption.\n\n**4.** ¬(p ∨ ¬q) ∨ (¬p ∧ ¬q) ≡ (¬p ∧ q) ∨ (¬p ∧ ¬q) by De Morgan and double negation; ≡ ¬p ∧ (q ∨ ¬q) by factoring; ≡ ¬p ∧ T ≡ ¬p.\n\n**5.** The inner expression (¬p ∧ q) ∨ (¬p ∧ ¬q) factors to ¬p ∧ (q ∨ ¬q) ≡ ¬p. Its negation is p, so p ∨ (p ∧ q) ≡ p by absorption.\n\n**6.** ¬(¬p ∨ q) ≡ p ∧ ¬q. Then (p ∧ (p ∧ ¬q)) ∨ (p ∧ q) reduces to (p ∧ ¬q) ∨ (p ∧ q) by idempotence; factor p to get p ∧ (¬q ∨ q) ≡ p.\n\n**7.** p ∧ (¬q ∨ p) ≡ (p ∧ ¬q) ∨ p ≡ p by distributivity followed by absorption.',
    '**Absorption** — p ∨ (p ∧ q) ≡ p and p ∧ (p ∨ q) ≡ p.  \n**Factoring** — reverse distributivity, such as (p ∧ a) ∨ (p ∧ b) ≡ p ∧ (a ∨ b).  \n**Idempotence** — p ∧ p ≡ p.',
    {
      recognition: 'Common patterns: a shared factor suggests distributivity; p together with p ∧ something suggests absorption; q ∨ ¬q is T; q ∧ ¬q is F.',
      sourceNote: 'The slide is an exercise page, not an answer key. These are supplied derivations, with each equivalence justified by a named law.',
    },
  ),
  explainedPage(
    8,
    'Conditional as OR — p → q means ¬p ∨ q',
    'A conditional p → q is false only when p is true and q is false, so p → q ≡ ¬(p ∧ ¬q) ≡ ¬p ∨ q.',
    'Read p → q as “if p, then q.” The truth table has one false row: p = T and q = F. The same condition is the only case where p ∧ ¬q is true; negating it gives the conditional. Applying De Morgan gives ¬p ∨ q. The OR is inclusive: it is true if ¬p is true, if q is true, or if both are true. For the money example, let p mean “you give me the money” and q mean “I kill you”; “if you do not give it, then I will” becomes ¬p → q, equivalent to p ∨ q. The second pair on the slide follows the same pattern.',
    '**Conditional (شرطية)** — p → q, “if p then q.”  \n**Antecedent (المقدّمة)** — p, the condition after “if.”  \n**Consequent (النتيجة)** — q, what is promised after “then.”  \n**Inclusive OR** — p ∨ q allows both parts to be true.',
    {
      recognition: 'To rewrite p → q, negate the first part and join with OR: ¬p ∨ q. To find when it fails, use p ∧ ¬q.',
      trap: '“Or” in logic is inclusive unless the question explicitly defines exclusive OR. A conditional does not assert that p and q are both true.',
    },
  ),
  explainedPage(
    9,
    'Negation of an if-then — require the bad case',
    'The negation of p → q is p ∧ ¬q: the condition happens, but the promised result does not.',
    'Use the equivalence from the previous page: ¬(p → q) ≡ ¬(¬p ∨ q). De Morgan gives ¬¬p ∧ ¬q, and double negation gives p ∧ ¬q. In the GPA example, p is “GPA is 4.0” and q is “you do not need to pay tuition”; the negation is “GPA is 4.0 and you still need to pay.” In the computer example, p is “computer is not working” and q is “I cannot finish”; its negation is “computer is not working and I can finish.”',
    '**Negation of a conditional** — ¬(p → q) ≡ p ∧ ¬q.  \n**Counterexample to “if p then q”** — a case where p holds but q fails.',
    {
      recognition: 'Translate the negation as “p happens, and q does not.” This gives a concrete counterexample to the promise.',
      trap: 'Do not negate p and q separately as ¬p ∧ ¬q. That describes a different situation and does not make the conditional false.',
    },
  ),
  explainedPage(
    10,
    'Converse, inverse, and contrapositive',
    'From p → q, the converse is q → p and the inverse is ¬p → ¬q; the contrapositive ¬q → ¬p is equivalent to the original.',
    'The slide defines two variants. The converse swaps the condition and result. The inverse negates both parts without swapping them. Neither is generally equivalent to p → q. The contrapositive swaps and negates: ¬q → ¬p, and it always has the same truth value as p → q. The converse and inverse are equivalent to each other, but they may both differ from the original conditional.',
    '**Converse (العكس)** — q → p.  \n**Inverse (المعكوس)** — ¬p → ¬q.  \n**Contrapositive (المقابل المعاكس)** — ¬q → ¬p.',
    {
      recognition: 'For the contrapositive, reverse the two statements and negate each. For the converse, only reverse; for the inverse, only negate.',
      trap: 'Only the contrapositive is guaranteed equivalent to the original. A statement and its converse are not interchangeable without extra proof.',
    },
  ),
  explainedPage(
    11,
    'Card test — vowel implies even',
    'For “if a card has a vowel, then it has an even number,” turn over A and 3; those are the only visible cards that can expose a violation.',
    'The cards show A, 2, 3, and K. Let P = “the letter side is a vowel” and Q = “the number side is even.” The rule P → Q is violated only by P ∧ ¬Q: a vowel paired with an odd number. Turn over A to check its number, and 3 to check whether its hidden letter is a vowel. The 2 card already satisfies the consequent, so its letter cannot disprove the rule; K makes the antecedent false, so its number is irrelevant.',
    '**P → Q test** — check P and ¬Q.  \n**A (vowel)** — an antecedent card; its reverse must be even.  \n**3 (odd)** — a not-even card; its reverse must not be a vowel.',
    {
      recognition: 'For “if P then Q,” flip the P card and the card showing not-Q. Do not flip the Q card or not-P card just because they are visible.',
      trap: 'The rule does not say “a card is a vowel if and only if it has an even number.” You are checking only the stated one-way implication.',
    },
  ),
  explainedPage(
    12,
    'Question bank — modular arithmetic and set union',
    'Reduce a number modulo n by finding its remainder; for union cardinality, combine distinct elements and count each only once.',
    '**Q1.** 43 mod 9 = 7, since 43 = 4×9 + 7.  \n**Q2.** 75 mod 11 = 9, since 75 = 6×11 + 9.  \n**Q3.** 128 mod 13 = 11, since 128 = 9×13 + 11.  \n**Q4.** 256 mod 17 = 1, since 256 = 15×17 + 1.  \n**Q5.** 91 mod 7 = 0, since 7 divides 91 exactly.  \n**Q6.** A = {2, 4, 6, 8, 10} and B = {4, 8, 12, 16}. Their union is {2, 4, 6, 8, 10, 12, 16}, so |A ∪ B| = 7.',
    '**a mod n** — the remainder after dividing a by n, chosen from 0 through n−1 when n is positive.  \n**Union A ∪ B** — elements that are in A or in B or in both.  \n**Cardinality |A|** — number of distinct elements in a set.',
    { recognition: 'For modular arithmetic, write a = kn + r and keep the remainder r. For a union, list shared elements once.' },
  ),
  explainedPage(
    13,
    'Question bank — intersections, differences, and nested-set cardinality',
    'For set operations, compare the actual elements; for nested sets, count only the top-level members of the outer set.',
    '**Q7.** A = {1, 3, 5, 7, 9} and B = {2, 4, 6, 8} have no common elements, so |A ∩ B| = 0.  \n**Q8.** C ∪ D = {a, b, c, d, e, f, g}; thus |C ∪ D| = 7.  \n**Q9.** X ∩ Y = {20, 40}, so |X ∩ Y| = 2.  \n**Q10.** P − Q removes 4, 5, and 6 from P; P − Q = {1, 2, 3}, so the cardinality is 3.  \n**Q11.** A = {1, {1, {4, 6}}} has two outer elements: 1 and the nested set. Thus |A| = 2.  \n**Q12.** B = {{2, 3}, 4, {5, {6, 7}}} has three outer elements, so |B| = 3.  \n**Q13.** C = {∅, {∅}, {1, 2}} has three distinct outer elements, so |C| = 3.  \n**Q14.** D = {a, {b, c}, {d, {e, f}}, g} has four outer elements, so |D| = 4.  \n**Q15.** E = {{1}, {2, 3}, {4, 5, 6}} has three outer elements, so |E| = 3.',
    '**Intersection A ∩ B** — elements shared by both sets.  \n**Difference P − Q** — elements in P that are not in Q.  \n**Nested set (مجموعة داخل مجموعة)** — a set used as one element inside another set.',
    {
      recognition: 'When finding |A|, count the entries separated at the outermost braces. Do not count the elements inside a nested set as extra members of A.',
      trap: 'The object ∅ and the object {∅} are different: the first has no elements; the second has one element, namely ∅.',
    },
  ),
  explainedPage(
    14,
    'Question bank — power sets and basic logic',
    'A power set contains every subset, including ∅; an n-element set has 2ⁿ subsets. Then use identity laws for the first AND/OR simplifications.',
    '**Q16.** P({a, b}) = {∅, {a}, {b}, {a, b}}.  \n**Q17.** P({1, 2, 3}) = {∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.  \n**Q18.** P({x}) = {∅, {x}}.  \n**Q19.** P({∅}) = {∅, {∅}}: the two subsets are the empty subset and the whole one-element set.  \n**Q20.** A four-element set has 2⁴ = 16 subsets.  \n**Q21.** F ∨ p ≡ p, by identity for OR.  \n**Q22.** T ∧ p ≡ p, by identity for AND.',
    '**Power set P(A)** — the set of all subsets of A.  \n**Subset** — a set whose elements all belong to A.  \n**Count rule** — |P(A)| = 2^|A|.',
    {
      recognition: 'For each element, a subset either includes it or leaves it out, giving two choices per element. Multiply those choices: 2ⁿ.',
      trap: 'The empty set is always a subset. P({∅}) has two elements; it is not the same set as {∅}.',
    },
  ),
  explainedPage(
    15,
    'Question bank — logic identities and negating compounds',
    'Use annihilator and idempotent laws for the first three items; for compound negations, apply De Morgan and ¬(p → q) ≡ p ∧ ¬q.',
    '**Q23.** F ∧ p = F, because AND with false is false.  \n**Q24.** T ∨ p = T, because OR with true is true.  \n**Q25.** p ∨ p = p, by idempotence.  \n**Q26.** ¬[(p → q) ∧ (r → s)] = ¬(p → q) ∨ ¬(r → s) = (p ∧ ¬q) ∨ (r ∧ ¬s).  \n**Q27.** ¬[(p ∨ q) ∧ (r ∨ s)] = (¬p ∧ ¬q) ∨ (¬r ∧ ¬s).  \n**Q28.** ¬[(p ∧ q) → r] = (p ∧ q) ∧ ¬r.  \n**Q29.** ¬[(p → q) ∨ (r → s)] = (p ∧ ¬q) ∧ (r ∧ ¬s).  \n**Q30.** ¬[¬p ∨ (q ∧ r)] = p ∧ (¬q ∨ ¬r).',
    '**Annihilator** — F ∧ p = F; T ∨ p = T.  \n**De Morgan** — ¬(A ∧ B) = ¬A ∨ ¬B, and ¬(A ∨ B) = ¬A ∧ ¬B.  \n**Negated implication** — ¬(p → q) = p ∧ ¬q.',
    {
      recognition: 'Keep the outer parentheses visible. First negate the top-level AND/OR using De Morgan; then replace each negated conditional with antecedent AND not-consequent.',
      trap: 'For Q29, negating the OR between the two implications gives AND between their negations. Each implication’s negation is itself an AND.',
    },
  ),
  explainedPage(
    16,
    'Question bank — conditional variants and tautologies',
    'Contrapositives reverse and negate; converses only reverse; inverses only negate. A tautology is true for every assignment.',
    '**Q31.** Contrapositive of “rain → ground wet”: if the ground is not wet, then it did not rain.  \n**Q32.** Contrapositive of “4 divides n → n is even”: if n is odd, then 4 does not divide n.  \n**Q33.** Converse of “x > 5 → x > 3” is “x > 3 → x > 5.” It is not equivalent; x = 4 is a counterexample.  \n**Q34.** Inverse of “equilateral triangle → all sides equal” is “not equilateral → not all sides equal.” For ordinary Euclidean triangles, the converse is also true, so this inverse happens to be true as well; that fact is extra geometry, not a general conditional rule.  \n**Q35.** Contrapositive of “study hard → pass” is “if I do not pass, then I did not study hard.”  \n**Q36.** Of the choices, p ∨ ¬p is the tautology. p ∧ ¬p is always false; p → ¬p is equivalent to ¬p; and p ∧ p is just p.  \n**Q37.** (p → q) ∨ (q → p) is a tautology: rewrite as (¬p ∨ q) ∨ (¬q ∨ p); it contains p and ¬p, so at least one disjunct is true (and likewise q/¬q).',
    '**Contrapositive** — ¬q → ¬p; equivalent to p → q.  \n**Converse** — q → p.  \n**Inverse** — ¬p → ¬q.  \n**Tautology** — a compound proposition true under all truth assignments.',
    {
      recognition: 'To test a claimed tautology, try to find a truth assignment making it false. If none exists, it is a tautology; equivalence laws can shorten the check.',
      trap: 'A conditional and its converse are not generally equivalent. In Q33, x = 4 makes the converse’s antecedent true and its consequent false.',
    },
  ),
  explainedPage(
    17,
    'Question bank — conditional reasoning and equivalence',
    'Use the truth conditions of implication and biconditional: modus ponens yields q, and p ↔ q means both directions hold.',
    '**Q38.** [p ∧ (p → q)] → q is a tautology: whenever the antecedent is true, p is true and p → q forces q to be true.  \n**Q39.** (p ∨ q) ∧ (¬p ∧ ¬q) is a contradiction. The first part requires at least one of p, q true; the second says both are false.  \n**Q40.** (p → q) ↔ (¬p ∨ q) is a tautology because the two sides are equivalent forms of the conditional.  \n**Q41.** Inverse of p → q: ¬p → ¬q.  \n**Q42.** Converse of p → q: q → p.  \n**Q43.** The two directions together are (p → q) ∧ (q → p), which is the biconditional p ↔ q.  \n**Q44.** From p → q and p, conclude q (modus ponens).  \n**Q45.** A conditional is logically equivalent to its contrapositive: p → q ≡ ¬q → ¬p.',
    '**Modus ponens** — from p → q and p, infer q.  \n**Biconditional p ↔ q** — p and q have the same truth value; equivalently, both implications p → q and q → p hold.  \n**Biconditional expansion** — p ↔ q ≡ (p → q) ∧ (q → p).',
    {
      recognition: 'In a proof of a tautology shaped (A → B), assume A is true and see whether the rules force B to be true.',
      trap: 'Q43 means the conjunction of the two directions is the biconditional. Do not read it as a new claim that the propositions “p → q” and “q → p” are themselves equivalent in every context.',
    },
  ),
  explainedPage(
    18,
    'Question bank — card-selection problems and equivalence proof',
    'For each “if P then Q” card rule, flip P and not-Q. Then use De Morgan and contradiction laws for the proof in Q51.',
    '**Q46.** Rule: even → vowel; cards A, I, F, 2. Flip 2 (even, so check for a vowel) and F (consonant, so check it is not paired with an even number).  \n**Q47.** Vowel → even; cards B, E, 3, 8. Flip E and 3.  \n**Q48.** Multiple of 4 → vowel; cards K, O, 5, 12. Flip 12 and K.  \n**Q49.** Odd → consonant; cards P, U, 7, 10. Flip 7 and U.  \n**Q50.** Consonant → odd; cards C, A, 6, 9. Flip C and 6. In each problem the second selected card is not-Q: even is not odd, a vowel is not a consonant, and so on.  \n**Q51.** p ∧ ¬(p ∨ (¬p ∧ q)) ≡ p ∧ (¬p ∧ ¬(¬p ∧ q)) by De Morgan; ≡ (p ∧ ¬p) ∧ ¬(¬p ∧ q) by associativity; ≡ F ∧ ¬(¬p ∧ q) by contradiction; ≡ F by the annihilator law. So the claimed equivalence is true.',
    '**Card rule P → Q** — flip a card showing P and a card showing ¬Q.  \n**Violation** — P is true while Q is false.  \n**Annihilator law** — F ∧ R ≡ F for any R.',
    {
      recognition: 'Translate the rule into P → Q before choosing cards. Ignore cards that show only ¬P or Q; they cannot produce the bad case P ∧ ¬Q.',
      trap: 'A card with an even number does not need to show a vowel for an “odd implies…” rule, and a vowel does not violate a rule whose consequent is a consonant unless that vowel is the required P/¬Q side.',
    },
  ),
  explainedPage(
    19,
    'Question bank — final logical-equivalence proof',
    'The two conditionals require p to imply both q and ¬q; that is impossible when p is true, so their conjunction is equivalent to ¬p.',
    'Q52. (p → q) ∧ (p → ¬q)\n\n≡ (¬p ∨ q) ∧ (¬p ∨ ¬q), by rewriting each conditional.\n\n≡ ¬p ∨ (q ∧ ¬q), by distributivity in reverse.\n\n≡ ¬p ∨ F, because q ∧ ¬q is a contradiction.\n\n≡ ¬p, by the identity law for OR.\n\nThis completes the review. Remember: convert the English condition into P → Q, simplify with named laws, and check set cardinality at the correct outer level.',
    '**Implication form** — p → q ≡ ¬p ∨ q.  \n**Contradiction** — q ∧ ¬q ≡ F.  \n**Identity** — r ∨ F ≡ r.',
    {
      recognition: 'When two conditionals share the same antecedent and require opposite consequents, distribute: (¬p ∨ q) ∧ (¬p ∨ ¬q) = ¬p ∨ (q ∧ ¬q) = ¬p.',
      sourceNote: 'The question bank pages are unsolved in the PDF; the answer explanations here are added study guidance. The deck’s last page contains only Question 52 and no closing slide.',
      recap: 'For sets: union combines distinct elements, intersection keeps shared elements, difference removes the second set, nested-set cardinality counts only outer members, and |P(A)| = 2^|A|. For logic: p → q ≡ ¬p ∨ q; ¬(p → q) ≡ p ∧ ¬q; the contrapositive is equivalent, but converse and inverse are not generally equivalent to the original; card tests check P and ¬Q.',
    },
  ),
];

export const discreteMathMidtermRevisionLesson: Lesson = {
  id: 'discrete-math-midterm-revision-archive',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/Discrete Mathematics - lec 11-Revision_Midterm.pdf',
  sourcePath: 'Discrete Math/lecture/Discrete Mathematics - lec 11-Revision_Midterm.pdf',
  title: 'Midterm Revision: Sets and Propositional Logic (Fall 2025–2026)',
  sourcePageCount: 19,
  pages,
  lastReviewed: '2026-10-14',
};

