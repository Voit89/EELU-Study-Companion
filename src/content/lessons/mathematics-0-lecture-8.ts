import type { Lesson, LessonBlock, LessonPage } from '../types';

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  recognition?: string,
  trap?: string,
  sourceNote?: string,
  recap?: string,
): LessonPage {
  const blocks: LessonBlock[] = [{ type: 'zobda', text: takeaway }];
  blocks.push({ type: 'foundation', title: 'Step-by-step explanation', markdown: explanation });
  if (recognition) {
    blocks.push({ type: 'recognition', title: 'How to recognize it', markdown: recognition });
  }
  if (trap) blocks.push({ type: 'trap', title: 'Common mix-up', markdown: trap });
  if (sourceNote) blocks.push({ type: 'source-note', text: sourceNote });
  if (recap) blocks.push({ type: 'foundation', title: 'Quick review recap', markdown: recap });
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualOnlyPage(sourcePage: number, title: string, note: string): LessonPage {
  return {
    sourcePage,
    title,
    coverage: 'visual-only',
    blocks: [{ type: 'source-note', text: note }],
  };
}

const pages: LessonPage[] = [
  visualOnlyPage(
    1,
    'Mathematics (0) — Fall 2025–2026 cover',
    'The cover identifies Mathematics (0), the listed instructors, and Fall Semester 2025–2026. The folder filename calls this Lecture 8, while the cover itself only identifies the course and term. The deck is a revision set of multiple-choice questions.',
  ),
  visualOnlyPage(
    2,
    'Revision — divider slide',
    'This slide only announces a revision section. The review questions begin on source page 3.',
  ),
  explainedPage(
    3,
    'Revision questions — place value and order of operations',
    'For Question 1, match each digit to its place; for Question 2, evaluate the grouped addition before multiplying by 2.',
    'This revision deck has eight multiple-choice examples: place value, order of operations, proportions, exponent rules, radicals, and rational expressions. Each prompt is repeated on a later answer slide. This page gives two questions without highlighting answers. **Question 1:** write the place values of 4, 5, 0, 1, and 9 in 45,019. The zero is in the hundreds place, the 1 is in the tens place, and the 9 is in the ones place. **Question 2:** the expression is 3(7) − (4 + 1) × 2. The parentheses around 4 + 1 contain an operation, so simplify that sum first; multiplication comes before the final subtraction. Try both questions before moving to the answer slide on page 4.',
    'For expanded form, read digits from left to right and attach each digit to its place value. For order of operations, handle grouping first, then multiplication, then subtraction.',
    'Do not read the 1 in 45,019 as one unit: it is in the tens place, so its contribution is 10.',
  ),
  explainedPage(
    4,
    'Answers — expanded form and order of operations',
    'The slide highlights B for Question 1 and A for Question 2. B is the intended expanded form, though choice C has the same value if zero terms may be omitted.',
    '**Question 1: 45,019.** Its digits contribute 4 × 10,000 = 40,000; 5 × 1,000 = 5,000; 0 × 100 = 0; 1 × 10 = 10; and 9 × 1 = 9. So the full place-by-place form is **40,000 + 5,000 + 0 + 10 + 9**, choice B. However, choice C, **40,000 + 5,000 + 10 + 9**, is numerically identical because adding zero changes nothing. Many standard expanded forms omit zero-value terms, so the question is not strictly single-answer unless the instructor expects every place, including the zero hundreds, to be written. The source highlights B.\n\n**Question 2: 3(7) − (4 + 1) × 2.** First simplify the grouped sum: 4 + 1 = 5. The next expression is **3(7) − 5 × 2**, choice A. Then multiply: 3 × 7 = 21 and 5 × 2 = 10; finally subtract, giving 21 − 10 = 11.',
    'Place-value questions are safest when you write every digit contribution before simplifying. For operation order, look for an addition or subtraction inside parentheses first.',
    'The answer key highlights B and A. If asked why C is not accepted for Question 1, explain that B includes the zero hundreds term and matches the full place-by-place format; also recognize that C is an equivalent expanded sum under the common convention that zero terms can be left out.',
    'Question 1 has two equivalent numerical choices (B and C) unless the quiz requires the zero place-value term to be shown. The source highlights B.',
  ),
  explainedPage(
    5,
    'Revision questions — a proportion and exponent rules',
    'Question 3 is a proportion: scale both sides by the same factor. Question 4 is a quotient of powers: subtract exponents when dividing like bases.',
    'The slide presents two more questions and leaves the answer choices unmarked. **Question 3** gives 2/3 = x/18; compare the denominators to see how the numerator must scale. **Question 4** is (49x⁸y⁻⁵)/(x⁻⁶y³); keep the coefficient 49, then apply the quotient rule separately to the x powers and the y powers. The worked answer slide follows on page 6.',
    '**Proportion (تناسب)** — an equality between two ratios.  \n**Quotient rule for powers** — for the same nonzero base, aᵐ/aⁿ = aᵐ⁻ⁿ.  \n**Negative exponent** — a⁻ⁿ = 1/aⁿ for a ≠ 0.',
    'When the same variable appears in a numerator and denominator, subtract the denominator exponent from the numerator exponent. Keep track of the minus sign in an exponent such as −5.',
  ),
  explainedPage(
    6,
    'Answers — solve the proportion and simplify the powers',
    'Question 3 gives x = 12 (choice C). Question 4 gives 49x¹⁴/y⁸ (choice D), with x and y nonzero.',
    '**Question 3.** In 2/3 = x/18, the denominator 3 is multiplied by 6 to become 18, so multiply the numerator 2 by 6 as well: x = 12. Cross-check by cross-multiplying: 2 × 18 = 3x, so 36 = 3x and x = 12.\n\n**Question 4.** Apply the quotient rule to each matching base: x⁸/x⁻⁶ = x⁸⁻⁽⁻⁶⁾ = x¹⁴, and y⁻⁵/y³ = y⁻⁵⁻³ = y⁻⁸. Thus the expression is 49x¹⁴y⁻⁸. A negative exponent moves that factor to the denominator: 49x¹⁴/y⁸, choice D. Since the original expression has powers in a denominator, x and y must not be zero.',
    'For a proportion, use the same multiplier on numerator and denominator. For a quotient of powers with the same base, subtract exponents in the order top minus bottom.',
    'Subtracting a negative exponent becomes addition: 8 − (−6) = 14. For y, −5 − 3 = −8, and that negative exponent places y⁸ below the fraction bar.',
  ),
  explainedPage(
    7,
    'Question 5 — rationalize a radical denominator',
    'To remove the radical from 2√(3xy), multiply the numerator and denominator by √(3xy).',
    'The question is (√(4x) + √y)/(2√(3xy)). Before choosing a formula, notice the denominator is one radical. Multiplying by the same radical over itself will make the denominator an ordinary product. Simplify √(4x) as 2√x, then distribute the radical multiplier across both terms in the numerator. Keep this question open and compare your result with the highlighted answer on page 8.',
    '**Rationalize the denominator (إزالة الجذر من المقام)** — rewrite a fraction so its denominator has no radical.  \n**Conjugate** — a different tool used when a denominator is a sum or difference of radicals; it is not needed for this single-radical denominator.',
    'If the denominator is a single square root, multiply top and bottom by that same square root. If it is a sum or difference of roots, check whether a conjugate is needed instead.',
    'The source’s radicals require x ≥ 0 and y ≥ 0, and the denominator must be nonzero. Together these imply x > 0 and y > 0 for this expression, which also lets √(x²) simplify to x.',
  ),
  explainedPage(
    8,
    'Answer — rationalize the denominator',
    'The highlighted answer is B: (2x√(3y) + y√(3x))/(6xy).',
    'Start with (√(4x) + √y)/(2√(3xy)). Multiply by √(3xy)/√(3xy), which equals 1, so the value does not change.\n\nFor the denominator: 2√(3xy) × √(3xy) = 2(3xy) = 6xy.\n\nFor the numerator, distribute: √(4x)√(3xy) + √y√(3xy). The first term is 2√x√(3xy) = 2√(3x²y) = 2x√(3y), since x > 0. The second is √(3xy²) = y√(3x), since y > 0. Put the terms over the new denominator to get **(2x√(3y) + y√(3x))/(6xy)**, choice B.',
    'Check the denominator first: after multiplying a radical by itself, the radical disappears. Then simplify each numerator term separately.',
    'Do not multiply only one term in the numerator. The factor √(3xy) must multiply both terms, and the denominator must also be multiplied by it.',
  ),
  explainedPage(
    9,
    'Question 6 — add rational expressions',
    'Factor the denominators before finding a common denominator: 3x + 3 = 3(x + 1), and x² − 1 = (x + 1)(x − 1).',
    'The expression is 4/(3x + 3) + 7/(x² − 1). These fractions have different denominators, so do not add 4 and 7 directly. First factor each denominator, then use the least common denominator. Rewrite each numerator with the factor(s) missing from its own denominator. The answer choices are on this slide; the source highlights one on page 10.',
    '**Factor (تحليل)** — rewrite an expression as a product.  \n**Difference of squares** — x² − 1 = (x − 1)(x + 1).  \n**Least common denominator (المقام المشترك الأصغر)** — the smallest denominator expression that both denominators divide into.',
    'For a sum of rational expressions, factor first, build the LCD from every distinct factor at its highest power, then combine numerators.',
    'The expression is undefined at x = −1 and x = 1 because those values make an original denominator zero.',
  ),
  explainedPage(
    10,
    'Answer — combine the rational expressions',
    'The highlighted answer is C: (4x + 17)/(3(x + 1)(x − 1)), for x ≠ −1, 1.',
    'Factor the denominators: 3x + 3 = 3(x + 1), and x² − 1 = (x + 1)(x − 1). The least common denominator is 3(x + 1)(x − 1).\n\nRewrite each fraction over that denominator:\n\n4/[3(x + 1)] = 4(x − 1)/[3(x + 1)(x − 1)]\n\n7/[(x + 1)(x − 1)] = 21/[3(x + 1)(x − 1)]\n\nNow add the numerators: 4(x − 1) + 21 = 4x − 4 + 21 = 4x + 17. Therefore the sum is **(4x + 17)/[3(x + 1)(x − 1)]**, choice C. The original denominators exclude x = −1 and x = 1.',
    'When only one denominator is missing a factor, multiply that fraction’s numerator by the same factor before adding.',
    'Do not add denominators. Also keep the factor 3 in the common denominator; dropping it changes the value.',
  ),
  explainedPage(
    11,
    'Question 7 — divide two rational expressions',
    'Rewrite division as multiplication by the reciprocal, then factor before canceling.',
    'The expression is (x + 2)/x² ÷ (x² − x − 6)/(x² − 3x). The first move is to keep the first fraction and flip the second. Then factor x² − x − 6 and x² − 3x so shared factors are visible. Do not cancel terms across addition or subtraction; only common factors may cancel. Try the simplification before checking page 12.',
    '**Reciprocal (المقلوب)** — swap numerator and denominator of a nonzero fraction.  \n**Factor** — express a polynomial as a product, for example x² − 3x = x(x − 3).  \n**Cancel** — divide a common factor from numerator and denominator.',
    'When you see fraction ÷ fraction, rewrite it as fraction × reciprocal, then factor each polynomial.',
    'Cancellation applies to factors, not individual terms joined by + or −. Also, a canceled factor can still restrict the original expression’s domain.',
  ),
  explainedPage(
    12,
    'Answer — divide by the reciprocal and preserve restrictions',
    'The highlighted answer is A, 1/x, but the original expression is defined only when x ≠ −2, 0, or 3.',
    'Begin with (x + 2)/x² ÷ (x² − x − 6)/(x² − 3x). Factor the second fraction: x² − x − 6 = (x − 3)(x + 2), and x² − 3x = x(x − 3).\n\nKeep the first fraction and multiply by the reciprocal:\n\n(x + 2)/x² × [x(x − 3)]/[(x − 3)(x + 2)].\n\nCancel the common factors x + 2 and x − 3, and reduce x/x² to 1/x. The result is **1/x**, choice A.\n\nNow check the original expression’s restrictions. Its denominator x² requires x ≠ 0. The second fraction’s denominator x(x − 3) requires x ≠ 0, 3. Because we divide by that fraction, it also cannot equal zero; its numerator (x − 3)(x + 2) therefore requires x ≠ 3, −2. Combined: **x ≠ −2, 0, 3**.',
    'Factor first; then flip the second fraction. After simplifying, separately revisit every original denominator and make sure the divisor was not zero.',
    'Even though x + 2 cancels, x = −2 remains excluded: at that value the original fraction being divided by is zero, and division by zero is undefined.',
  ),
  explainedPage(
    13,
    'Question 8 — combine negative and positive powers',
    'Evaluate each parenthesized power first: exponent −1 takes a reciprocal, and exponent 2 squares every factor.',
    'The expression is (3x⁵y⁵/z³)⁻¹ × (3x³y²/z)². Treat the two parentheses separately before multiplying them. For the first, flip the fraction because the exponent is −1. For the second, square 3, x³, y², and z in the denominator. Then combine like bases by adding exponents in a product. The highlighted answer is shown on page 14.',
    '**Power −1** — reciprocal: (a/b)⁻¹ = b/a, when a and b are nonzero.  \n**Power of a product** — (ab)ⁿ = aⁿbⁿ.  \n**Product rule** — aᵐaⁿ = aᵐ⁺ⁿ.',
    'Read the exponent outside parentheses first. A negative exponent flips the entire parenthesized fraction; a positive exponent applies to every factor inside.',
    'Do not square only the coefficient. The outside exponent applies to x, y, and z as well.',
  ),
  explainedPage(
    14,
    'Answer — simplify the powers',
    'The highlighted answer is D: 3xz/y.',
    'Separate the two factors:\n\n(3x⁵y⁵/z³)⁻¹ = z³/(3x⁵y⁵). The exponent −1 swaps numerator and denominator.\n\n(3x³y²/z)² = 9x⁶y⁴/z². Squaring multiplies each exponent by 2 and gives 3² = 9.\n\nMultiply the results and combine like bases:\n\n[z³/(3x⁵y⁵)] × [9x⁶y⁴/z²] = 3x⁽⁶⁻⁵⁾y⁽⁴⁻⁵⁾z⁽³⁻²⁾ = 3xy⁻¹z = **3xz/y**, choice D. The original expression requires x, y, and z to be nonzero.',
    'After the reciprocal and the square are handled, combine coefficients separately and add/subtract exponents for each variable.',
    'The y exponent is 4 − 5 = −1, so y moves to the denominator. The x exponent is 6 − 5 = 1, and the z exponent is 3 − 2 = 1.',
    undefined,
    'For this review set: build expanded form from place values; follow grouping and operation order; solve proportions by scaling or cross-multiplication; apply exponent laws carefully; rationalize radicals only when they are in the denominator; factor before adding or dividing rational expressions; and preserve every original domain restriction when factors cancel.',
  ),
  visualOnlyPage(
    15,
    'Thank-you slide',
    'The final page is an EELU “Thank you for watching / Questions?” graphic. It contains no additional mathematics.',
  ),
];

export const mathematics0Lecture8Lesson: Lesson = {
  id: 'mathematics-0-lecture-8-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 8 (1).pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 8 (1).pdf',
  title: 'Lecture 8: Revision Questions (Fall 2025–2026)',
  sourcePageCount: 15,
  pages,
  lastReviewed: '2026-10-14',
};

