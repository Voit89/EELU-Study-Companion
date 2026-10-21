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
    { type: 'foundation', title: 'Step-by-step solution', markdown: explanation },
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
  explainedPage(
    1,
    'Modular arithmetic — questions 1–4',
    'The remainder answers a mod n; divide by n and keep the remainder between 0 and n−1.',
    '**Q1.** 43 ÷ 9 = 4 remainder 7, so 43 mod 9 = 7. Check: 4×9 + 7 = 43.  \n**Q2.** 75 ÷ 11 = 6 remainder 9, so 75 mod 11 = 9.  \n**Q3.** 128 ÷ 13 = 9 remainder 11, so 128 mod 13 = 11.  \n**Q4.** 256 ÷ 17 = 15 remainder 1, so 256 mod 17 = 1. The source continues the final line and marks the answer at the start of page 2.',
    '**a mod n** — the remainder when a is divided by the positive integer n.  \n**Quotient** — the whole-number part of the division.  \n**Division check** — a = quotient × n + remainder.',
    { recognition: 'Write each result as a = kn + r. If r is at least n, divide once more; the standard remainder is 0 through n−1.' },
  ),
  explainedPage(
    2,
    'Modular arithmetic and union — questions 5–6',
    'An exact division has remainder 0; a set union lists every distinct element from either set.',
    '**Q4 continued.** The remainder for 256 ÷ 17 is 1, so 256 mod 17 = 1.  \n**Q5.** 91 ÷ 7 = 13 with remainder 0; therefore 91 mod 7 = 0.  \n**Q6.** A = {2, 4, 6, 8, 10}, B = {4, 8, 12, 16}. Combine the entries and keep 4 and 8 only once: A ∪ B = {2, 4, 6, 8, 10, 12, 16}. There are seven elements, so |A ∪ B| = 7. Page 2 also introduces the two sets used in Q7; page 3 finishes that calculation.',
    '**Remainder 0** — the divisor divides the number exactly.  \n**Union A ∪ B** — elements in A, in B, or in both.  \n**Cardinality |S|** — number of distinct elements in S.',
    { trap: 'A union is not a concatenation of two lists: remove duplicate elements before counting.' },
  ),
  explainedPage(
    3,
    'Set operations — questions 7–8',
    'Intersection keeps shared elements; union combines all distinct elements.',
    '**Q7.** A = {1, 3, 5, 7, 9} contains odd numbers and B = {2, 4, 6, 8} contains even numbers. No element is in both, so A ∩ B = ∅ and |A ∩ B| = 0.  \n**Q8.** C = {a, b, c, d} and D = {c, d, e, f, g}. Combining without repeating c and d gives C ∪ D = {a, b, c, d, e, f, g}; its cardinality is 7.',
    '**Intersection A ∩ B** — elements belonging to both sets.  \n**Empty set ∅** — a set with no elements.  \n**Union A ∪ B** — elements belonging to at least one set.',
    { recognition: 'For intersection, compare membership; for union, collect each distinct value once.' },
  ),
  explainedPage(
    4,
    'Set intersection — question 9 and setup for 10',
    'The common values of X and Y are 20 and 40, so their intersection has two members.',
    '**Q9.** X = {10, 20, 30, 40}; Y = {20, 40, 60, 80}. Only 20 and 40 occur in both sets: X ∩ Y = {20, 40}, so |X ∩ Y| = 2.  \n**Q10 setup.** P = {1, 2, 3, 4, 5, 6} and Q = {4, 5, 6, 7, 8}. The next page completes P − Q.',
    '**Shared element** — a value present in both sets.  \n**Set difference P − Q** — elements of P that are not in Q.',
    { trap: 'Do not include 10, 30, 60, or 80 in the intersection: each appears in only one set.' },
  ),
  explainedPage(
    5,
    'Set difference and nested sets — questions 10–12',
    'For P − Q, keep what is in P and remove anything also in Q; when counting a nested set, treat it as one outer element.',
    '**Q10.** P − Q removes 4, 5, and 6 from P, leaving {1, 2, 3}; thus |P − Q| = 3.  \n**Q11.** A = {1, {1, {4, 6}}}. The outer set has exactly two entries: the number 1 and the entire nested set {1, {4, 6}}. Hence |A| = 2.  \n**Q12.** B = {{2, 3}, 4, {5, {6, 7}}}. The outer entries are {2, 3}, 4, and {5, {6, 7}}, so |B| = 3.',
    '**Nested set** — a set that appears as one member of another set.  \n**Outer element** — an entry at the top level of the displayed braces.',
    {
      recognition: 'Find the outermost braces first. Count the elements at that level, not the values buried inside a set-valued element.',
      trap: 'In Q11, the nested set is one member of A even though it contains more values inside it.',
    },
  ),
  explainedPage(
    6,
    'Nested-set cardinality — questions 13–14',
    'The empty set is still a member when it appears inside braces, and each nested set counts as one outer element.',
    '**Q13.** C = {∅, {∅}, {1, 2}} has three distinct outer elements: ∅, the one-element set {∅}, and {1, 2}. Therefore |C| = 3.  \n**Q14.** D = {a, {b, c}, {d, {e, f}}, g} has four outer elements: a, {b, c}, {d, {e, f}}, and g. Therefore |D| = 4.',
    '**∅** — the empty set, with no members.  \n**{∅}** — a set with one member, namely the empty set.  \n**Distinct sets** — sets that do not have exactly the same members.',
    {
      recognition: 'Distinguish the object ∅ from the object {∅}; the braces add one level of nesting.',
      trap: 'Do not count the elements inside {b, c} as separate members of D; that pair is a single member of D.',
    },
  ),
  explainedPage(
    7,
    'Nested sets and power sets — questions 15–17',
    'Count the outer elements for Q15; for a power set, list every possible subset, including the empty set.',
    '**Q15.** E = {{1}, {2, 3}, {4, 5, 6}} has three set-valued outer elements, so |E| = 3.  \n**Q16.** For {a, b}, choose neither, only a, only b, or both: P({a, b}) = {∅, {a}, {b}, {a, b}}. There are 2² = 4 subsets.  \n**Q17.** For {1, 2, 3}, there are 2³ = 8 subsets: ∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, and {1, 2, 3}. The order in which a power set is listed does not matter.',
    '**Power set P(A)** — the set whose members are all subsets of A.  \n**Subset** — a selection of zero or more elements from the original set.  \n**Power-set count** — a set with n elements has 2ⁿ subsets.',
    { recognition: 'Make one include/exclude choice per original element; this produces all 2ⁿ subsets.' },
  ),
  explainedPage(
    8,
    'Power sets — questions 18–20',
    'A one-element set has two subsets; a four-element set has 16 subsets.',
    '**Q18.** The subsets of {x} are ∅ and {x}, so P({x}) = {∅, {x}}.  \n**Q19.** The sole member of {∅} is the empty set itself. Its subsets are ∅ and the whole set {∅}; hence P({∅}) = {∅, {∅}} and has two members.  \n**Q20.** The set {a, b, c, d} has four elements, so its power set has 2⁴ = 16 elements. Page 9 repeats the final answer.',
    '**P(A)** — power set of A, not A itself.  \n**2ⁿ** — number of subsets for an n-element set.',
    {
      trap: 'P({∅}) has two members. The empty set is one subset, and {∅} is another; do not collapse them into one object.',
    },
  ),
  explainedPage(
    9,
    'Power-set count and basic logic — questions 20–23',
    'Use 2ⁿ for the size of a power set; then simplify F ∨ p and T ∧ p to p.',
    '**Q20 continued.** |P({a, b, c, d})| = 2⁴ = 16.  \n**Q21.** F ∨ p means false OR p; the result is p whether p is true or false. So F ∨ p ≡ p.  \n**Q22.** T ∧ p means true AND p; the result follows the value of p. So T ∧ p ≡ p.  \n**Q23 begins.** The next question asks for F ∧ p; the answer appears on page 10.',
    '**Identity for OR** — F ∨ p ≡ p.  \n**Identity for AND** — T ∧ p ≡ p.  \n**Truth value** — either T (true) or F (false).',
    { recognition: 'For F ∨ p or T ∧ p, the fixed value acts as the identity and leaves p unchanged.' },
  ),
  explainedPage(
    10,
    'Basic logical operations — questions 23–25',
    'False AND anything is false; true OR anything is true; repeating the same proposition with OR changes nothing.',
    '**Q23.** F ∧ p is always F, because an AND statement requires both parts true.  \n**Q24.** T ∨ p is always T, because an OR statement needs only one true part.  \n**Q25.** p ∨ p ≡ p by the idempotent law: a repeated identical choice adds no new case.',
    '**Annihilator laws** — F ∧ p ≡ F; T ∨ p ≡ T.  \n**Idempotent law** — p ∨ p ≡ p.',
    { trap: 'Keep AND and OR straight: F is an annihilator for AND, while T is an annihilator for OR.' },
  ),
  explainedPage(
    11,
    'Negating compound statements — questions 26–27',
    'Use De Morgan’s laws on the outer connective, then replace each negated conditional by antecedent AND not-consequent.',
    '**Q26.** Negate the whole conjunction: ¬[(p → q) ∧ (r → s)] ≡ ¬(p → q) ∨ ¬(r → s). A conditional is false only when its antecedent is true and consequent false, so this becomes (p ∧ ¬q) ∨ (r ∧ ¬s).  \n**Q27.** ¬[(p ∨ q) ∧ (r ∨ s)] ≡ ¬(p ∨ q) ∨ ¬(r ∨ s) by De Morgan. Apply it again inside each part: (¬p ∧ ¬q) ∨ (¬r ∧ ¬s).  \n**Q28 begins.** The next question asks for the negation of (p ∧ q) → r.',
    '**De Morgan for AND** — ¬(A ∧ B) ≡ ¬A ∨ ¬B.  \n**Negated conditional** — ¬(p → q) ≡ p ∧ ¬q.',
    {
      recognition: 'Preserve the outer connective after negating: negated AND becomes OR, and negated OR becomes AND.',
      trap: 'Do not stop after negating the outer connective in Q27; each inner disjunction still needs its own negation.',
    },
  ),
  explainedPage(
    12,
    'Negated implications — questions 28–30',
    'A conditional fails when its antecedent is true and its consequent false; apply De Morgan carefully to Q30.',
    '**Q28.** ¬[(p ∧ q) → r] ≡ (p ∧ q) ∧ ¬r.  \n**Q29.** ¬[(p → q) ∨ (r → s)] ≡ ¬(p → q) ∧ ¬(r → s) ≡ (p ∧ ¬q) ∧ (r ∧ ¬s).  \n**Q30.** ¬[¬p ∨ (q ∧ r)] ≡ p ∧ ¬(q ∧ r) ≡ p ∧ (¬q ∨ ¬r).',
    '**Negated implication** — ¬(A → B) ≡ A ∧ ¬B.  \n**De Morgan for OR** — ¬(A ∨ B) ≡ ¬A ∧ ¬B.',
    {
      recognition: 'For a compound formula, identify the outermost operator first. Negate it, then continue inward until every negation is explicit.',
      trap: 'In Q30, after negating the outer OR, the remaining negation of q ∧ r becomes ¬q ∨ ¬r, not ¬q ∧ ¬r.',
    },
  ),
  explainedPage(
    13,
    'Contrapositives — questions 31–32',
    'To form the contrapositive, swap the two parts and negate both: p → q becomes ¬q → ¬p.',
    '**Q31.** Let p = “it rains” and q = “the ground is wet.” The contrapositive is ¬q → ¬p: “If the ground is not wet, then it did not rain.”  \n**Q32.** Let p = “a number is divisible by 4” and q = “it is even.” The contrapositive is “If a number is not even, then it is not divisible by 4.” For integer numbers, “not even” means odd.',
    '**Contrapositive (المقابل المعاكس)** — ¬q → ¬p for p → q.  \n**Equivalent statement** — the conditional and its contrapositive always share a truth value.',
    { recognition: 'Write p and q first, then reverse their order and negate each. This avoids accidentally writing the converse.' },
  ),
  explainedPage(
    14,
    'Converse and inverse — questions 33–34',
    'The converse swaps p and q; the inverse negates both without swapping.',
    '**Q33.** Original: x > 5 → x > 3. Let p be x > 5 and q be x > 3. The converse q → p is “If x > 3, then x > 5.” It is not always true: x = 4 makes x > 3 true but x > 5 false.  \n**Q34 begins.** For “equilateral triangle → all sides equal,” set p = equilateral and q = all sides equal; page 15 gives the inverse.',
    '**Converse** — q → p.  \n**Counterexample** — one case showing a proposed statement can be false.  \n**Inverse** — ¬p → ¬q.',
    {
      recognition: 'A converse is made by switching the antecedent and consequent, not by changing their truth values.',
      trap: 'A true conditional does not guarantee that its converse is true. The source correctly uses x = 4 to disprove the converse in Q33.',
    },
  ),
  explainedPage(
    15,
    'Inverse, contrapositive, and tautology — questions 34–36',
    'Negate both parts to form the inverse; the contrapositive swaps and negates; check every candidate before naming a tautology.',
    '**Q34.** The inverse is ¬p → ¬q: “If a triangle is not equilateral, then not all its sides are equal.” In Euclidean geometry this happens to be true because a triangle with all sides equal is equilateral; this extra fact is not a general rule about inverses.  \n**Q35.** For “study hard → pass,” the contrapositive is “if I do not pass the exam, then I did not study hard.”  \n**Q36 begins.** The candidates are p ∧ ¬p, p ∨ ¬p, p → ¬p, and p ∧ p; page 16 finishes the comparison.',
    '**Inverse** — ¬p → ¬q.  \n**Contrapositive** — ¬q → ¬p.  \n**Tautology** — true under every possible assignment.',
    { trap: 'The inverse and converse are not generally equivalent to the original conditional, even when a particular geometry example makes them true.' },
  ),
  explainedPage(
    16,
    'Tautologies and contradictions — questions 36–38',
    'p ∨ ¬p is the tautology; p ∧ (p → q) → q is also always true by modus ponens.',
    '**Q36.** p ∧ ¬p is always false; p ∨ ¬p is always true; p → ¬p is equivalent to ¬p and is false when p is true; p ∧ p is just p. The answer is p ∨ ¬p.  \n**Q37.** (p → q) ∨ (q → p) is a tautology. Rewriting gives (¬p ∨ q) ∨ (¬q ∨ p); p and ¬p ensure a true disjunct for every assignment.  \n**Q38 begins.** The next formula is p ∧ (p → q) → q; the source explains it as modus ponens on page 17.',
    '**Contradiction** — always false, such as p ∧ ¬p.  \n**Excluded middle** — p ∨ ¬p, always true.  \n**Modus ponens** — from p → q and p, conclude q.',
    {
      recognition: 'To test a short candidate, evaluate it once for p = T and once for p = F. A tautology must be true in both cases.',
      sourceNote: 'On page 16 the answer and the note about p → ¬p are crowded together. The correct tautology among the four choices is p ∨ ¬p; p → ¬p is not a tautology.',
    },
  ),
  explainedPage(
    17,
    'Conditional reasoning — questions 38–40',
    'The modus-ponens pattern is a tautology, contradictory requirements cannot both hold, and a conditional equals ¬p ∨ q.',
    '**Q38.** Read the formula as [p ∧ (p → q)] → q. If its antecedent is true, p is true and the conditional forces q; therefore the whole implication is always true. This is modus ponens.  \n**Q39.** (p ∨ q) ∧ (¬p ∧ ¬q) is a contradiction: the first part says at least one of p and q is true, while the second says both are false.  \n**Q40 begins.** The source asks whether (p → q) ↔ (¬p ∨ q) is a tautology; page 18 completes the reason.',
    '**Modus ponens** — p → q, p ⟹ q.  \n**At least one** — meaning inclusive OR, p ∨ q.  \n**Contradiction** — a formula that cannot be true.',
    {
      recognition: 'For [A → B], a false case requires A true and B false. Check whether the premises in A can coexist with ¬B.',
      trap: 'The formula on Q38 is understood as [p ∧ (p → q)] → q. The printed slide omits outer grouping, but the written explanation confirms this intended reading.',
    },
  ),
  explainedPage(
    18,
    'Equivalent conditionals and inference — questions 40–44',
    'A biconditional joins both directions; from p → q and p, modus ponens gives q.',
    '**Q40.** p → q is logically equivalent to ¬p ∨ q, so (p → q) ↔ (¬p ∨ q) is true for every assignment.  \n**Q41.** Inverse of p → q: ¬p → ¬q.  \n**Q42.** Converse: q → p.  \n**Q43.** The two directions together give p ↔ q, formally (p → q) ∧ (q → p).  \n**Q44.** Given p → q and p, infer q by modus ponens.',
    '**Biconditional p ↔ q** — p → q and q → p both hold.  \n**Modus ponens** — valid inference from a conditional and its antecedent.',
    {
      recognition: 'Keep the variants straight: converse swaps; inverse negates; contrapositive does both.',
      trap: '“Both directions” means the conjunction of the two implications, not that either one alone is a biconditional.',
    },
  ),
  explainedPage(
    19,
    'Conditional equivalence and card tests — questions 45–47',
    'The contrapositive is equivalent to the original, and a card test checks the antecedent P and the falsifying case not-Q.',
    '**Q45.** p → q and its contrapositive ¬q → ¬p are logically equivalent, so one is true exactly when the other is true.  \n**Q46.** Rule: even number → vowel. With cards A, I, F, 2, flip **2** to check its other side is a vowel and **F** to check its other side is not even.  \n**Q47 begins.** The rule is vowel → even for cards B, E, 3, 8; page 20 finishes the selection.',
    '**Card test for P → Q** — turn over a P card and a not-Q card.  \n**Falsifying case** — P ∧ ¬Q.',
    { recognition: 'Ignore a card showing only not-P or Q: it cannot reveal the one case that makes an implication false.' },
  ),
  explainedPage(
    20,
    'Card tests — questions 47–49',
    'For each conditional, flip the antecedent card and the card showing a value that contradicts the consequent.',
    '**Q47.** Vowel → even. Flip **E** (vowel, check for even) and **3** (odd, check for a non-vowel).  \n**Q48.** Multiple of 4 → vowel. Flip **12** (multiple of 4) and **K** (consonant, not a vowel).  \n**Q49 begins.** Odd → consonant, with cards P, U, 7, 10; page 21 completes the answer.',
    '**Antecedent P** — the “if” condition.  \n**Consequent Q** — the “then” condition.  \n**not-Q** — a visible case that would violate the rule if P were on its reverse.',
    {
      recognition: 'Translate each sentence into P → Q first. Then select the P card and the not-Q card, regardless of whether either side is a letter or number.',
      trap: 'A 2 or 8 card is not automatically worth flipping: if the rule says even implies vowel, the rule does not require every vowel to be even unless the vowel is the antecedent.',
    },
  ),
  explainedPage(
    21,
    'Card tests and proof setup — questions 49–51',
    'The final card answers follow P/not-Q; Q51 reduces to a contradiction because it contains both p and ¬p.',
    '**Q49.** Odd → consonant. Flip **7** (odd) and **U** (vowel, so check it is not paired with an odd number).  \n**Q50.** Consonant → odd. Flip **C** (consonant) and **6** (even, not odd).  \n**Q51 begins.** The expression is p ∧ ¬(p ∨ (¬p ∧ q)) ≡ F. Page 22 works through the De Morgan steps.',
    '**P → Q selection** — flip P and ¬Q.  \n**Odd / even** — an odd number is not even; an even number is not odd.',
    {
      recognition: 'For Q49, Q = consonant, so not-Q is a vowel. For Q50, Q = odd, so not-Q is an even number.',
      sourceNote: 'The two proof questions are split across pages 21–23; read the next page before treating the displayed setup as a complete solution.',
    },
  ),
  explainedPage(
    22,
    'Equivalence proof — question 51',
    'p ∧ ¬(p ∨ (¬p ∧ q)) is false because the outer p conflicts with the ¬p forced by De Morgan.',
    'Start with p ∧ ¬(p ∨ (¬p ∧ q)). Apply De Morgan to the expression inside the outer p: ¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q). Apply De Morgan again to the second negation: ¬(¬p ∧ q) ≡ p ∨ ¬q. Substituting gives p ∧ [¬p ∧ (p ∨ ¬q)]. Since p ∧ ¬p ≡ F, the entire expression is F ∧ (p ∨ ¬q) ≡ F.',
    '**De Morgan** — negation passes inward and swaps ∨ with ∧.  \n**Contradiction** — p ∧ ¬p ≡ F.  \n**Annihilator** — F ∧ R ≡ F.',
    {
      recognition: 'The outer p and the ¬p produced by De Morgan already make the expression impossible; the remaining q expression cannot change that.',
      sourceNote: 'The source calls the first step “distribution inside the negation.” The operation is De Morgan’s law, not the distributive law; the algebraic result shown is correct.',
    },
  ),
  explainedPage(
    23,
    'Equivalence proof — question 52',
    '(p → q) ∧ (p → ¬q) simplifies to ¬p because if p were true it would force q and ¬q together.',
    'Rewrite each conditional: p → q ≡ ¬p ∨ q and p → ¬q ≡ ¬p ∨ ¬q. Then (¬p ∨ q) ∧ (¬p ∨ ¬q) ≡ ¬p ∨ (q ∧ ¬q), by distributivity in reverse. The inner q ∧ ¬q is F, so the expression becomes ¬p ∨ F ≡ ¬p. This verifies the stated equivalence.',
    '**Conditional form** — p → q ≡ ¬p ∨ q.  \n**Opposite consequents** — q and ¬q cannot both be true.  \n**Identity for OR** — r ∨ F ≡ r.',
    {
      recognition: 'When two implications share antecedent p but have opposite conclusions, factor out ¬p after rewriting them as ORs.',
      sourceNote: 'The formula line on page 22 appears to omit the opening parenthesis before the first p → q. The worked derivation and the companion question bank make the intended formula unambiguous: (p → q) ∧ (p → ¬q) ≡ ¬p.',
    },
  ),
  visualPage(
    24,
    'Credits',
    'The final page only credits “AI and Rofida”; it contains no additional question or mathematical explanation.',
  ),
];

export const discreteMathMidtermSolutionsLesson: Lesson = {
  id: 'discrete-math-midterm-solutions-archive',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/Midterm Revision(Lec11) Solution.PDF',
  sourcePath: 'Discrete Math/lecture/Midterm Revision(Lec11) Solution.PDF',
  title: 'Midterm Revision: Worked Solutions (11 Topics)',
  sourcePageCount: 24,
  pages,
  lastReviewed: '2026-10-14',
};

