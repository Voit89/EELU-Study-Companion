import type { Lesson, LessonBlock, LessonPage } from '../types';

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  ...blocks: LessonBlock[]
): LessonPage {
  return {
    sourcePage,
    title,
    coverage: 'explained',
    blocks: [{ type: 'zobda', text: takeaway }, ...blocks],
  };
}

function visualOnlyPage(sourcePage: number, title: string, description: string): LessonPage {
  return {
    sourcePage,
    title,
    coverage: 'visual-only',
    blocks: [{ type: 'source-note', text: description }],
  };
}

const pages: LessonPage[] = [
  visualOnlyPage(
    1,
    'Mathematics (1) — archived course cover',
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. This guide follows that archived copy; compare it with the current Moodle material when available.',
  ),
  visualOnlyPage(2, 'Midterm exam solutions — section divider', 'This slide only introduces a set of midterm review solutions.'),
  explainedPage(
    3,
    'Review Examples 1–2: evaluate a function and a limit',
    'Example 1 gives f(−2)=−1/2 (choice A). Example 2 has limit −10 (choice D).',
    {
      type: 'formula',
      label: 'The two questions',
      latex: 'f(x)=\\frac{x^3+7}{x^2-2},\\quad f(-2)=?\\qquad\\qquad \\lim_{z\\to0}\\frac{(5-z)^2-25}{z}=?',
      explanation: 'In the first question, substitute −2 into the function. In the second, direct substitution creates 0/0, so simplify the numerator before taking the limit.',
    },
    {
      type: 'worked-example',
      title: 'Example 1: substitute into the numerator and denominator',
      steps: [
        'Numerator at x=−2: (−2)^3+7=−8+7=−1.',
        'Denominator at x=−2: (−2)^2−2=4−2=2.',
        'Divide: f(−2)=−1/2.',
      ],
      conclusion: 'Choice A, −1/2.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: expand and cancel the common z',
      steps: [
        'Expand (5−z)^2=25−10z+z².',
        'Subtract 25: the numerator becomes −10z+z²=z(−10+z).',
        'For z≠0, cancel z with the denominator: the expression equals −10+z.',
        'Now let z approach 0: −10+z approaches −10.',
      ],
      conclusion: 'The limit is −10, choice D. The original fraction is undefined at z=0, but a limit depends on nearby values.',
    },
    {
      type: 'source-note',
      text: 'The source highlights choices A and D. The calculations above independently verify both answers.',
    },
  ),
  explainedPage(
    4,
    'Review Examples 3–4: a direct limit and a square-root domain',
    'Example 3 evaluates to −3/20 (choice C). The domain of f(x)=√x is [0,∞) (choice B).',
    {
      type: 'formula',
      label: 'The two questions',
      latex: '\\lim_{x\\to5}\\frac{2x-x^2}{(x+5)^2}=?\\qquad\\qquad f(x)=\\sqrt{x},\\quad \\text{find its domain}',
      explanation: 'For the limit, check whether direct substitution leaves a nonzero denominator. For the square root, require the expression under the root to be nonnegative.',
    },
    {
      type: 'worked-example',
      title: 'Example 3: substitute because the denominator stays nonzero',
      steps: [
        'Numerator at x=5: 2(5)−5²=10−25=−15.',
        'Denominator at x=5: (5+5)²=100, so it is not zero.',
        'The quotient is therefore −15/100, which reduces to −3/20.',
      ],
      conclusion: 'Choice C, −3/20.',
    },
    {
      type: 'worked-example',
      title: 'Example 4: use the square-root condition',
      steps: [
        'A real square root requires its input to be at least zero.',
        'Here the input is x, so require x≥0.',
        'Zero is included because √0 is defined and equals 0.',
      ],
      conclusion: 'The domain is [0,∞), choice B.',
    },
    {
      type: 'trap',
      title: 'Include zero in the square-root domain',
      markdown: 'The condition is x≥0, not x>0. The bracket at zero shows that the endpoint is included.',
    },
  ),
  explainedPage(
    5,
    'Review Examples 5–6: add functions and evaluate a limit',
    'The sum is (f+g)(x)=7x²−8x−5 (choice A). The limit in Example 6 is 0 (choice A).',
    {
      type: 'formula',
      label: 'The two questions',
      latex: 'f(x)=x^2+2x-8,\\quad g(x)=6x^2-10x+3,\\quad (f+g)(x)=?\\qquad\\qquad \\lim_{x\\to4}\\frac{x^2-4-3x}{x-3}=?',
      explanation: 'Adding functions means adding their outputs at the same x, then combining like terms. For the limit, direct substitution is allowed if the denominator is not zero.',
    },
    {
      type: 'worked-example',
      title: 'Example 5: add corresponding terms',
      steps: [
        'Write the sum: (x²+2x−8)+(6x²−10x+3).',
        'Combine the x² terms: x²+6x²=7x².',
        'Combine the x terms: 2x−10x=−8x.',
        'Combine constants: −8+3=−5.',
      ],
      conclusion: '(f+g)(x)=7x²−8x−5, choice A.',
    },
    {
      type: 'worked-example',
      title: 'Example 6: substitute into the quotient',
      steps: [
        'At x=4, numerator is 4²−4−3(4)=16−4−12=0.',
        'Denominator is 4−3=1, which is not zero.',
        'So the quotient approaches 0/1=0 as x approaches 4.',
      ],
      conclusion: 'The limit is 0, choice A. Since the denominator is nonzero at 4, no factoring is needed.',
    },
  ),
  explainedPage(
    6,
    'Review Example 7: a right-hand limit of a piecewise function',
    'Approaching 3 from the right uses the branch x²−16, so the limit is 3²−16=−7 (choice C).',
    {
      type: 'formula',
      label: 'Piecewise function',
      latex: 'f(x)=\\begin{cases}-5x+7,&x<3,\\\\x^2-16,&x\\ge3.\\end{cases}\\qquad \\lim_{x\\to3^+}f(x)',
      explanation: 'The superscript + means approach from values greater than 3. Use the branch whose interval contains those nearby values, namely x²−16.',
    },
    {
      type: 'worked-example',
      title: 'Use the right-side branch',
      steps: [
        'Because x approaches 3 from the right, use f(x)=x²−16, the rule for x≥3.',
        'Substitute the boundary value into that polynomial: 3²−16=9−16.',
        'Evaluate: 9−16=−7.',
      ],
      conclusion: 'The right-hand limit is −7, choice C.',
    },
    {
      type: 'trap',
      title: 'The side of approach chooses the piece',
      markdown: 'Do not use −5x+7 here: that branch applies only to x<3, which describes the left side. The question asks for the right-hand limit.',
    },
  ),
  explainedPage(
    7,
    'Review Example 8: check continuity at a piecewise boundary',
    'At x=4, the left-hand limit is 37 while the function value and right-hand limit are 47. The function is discontinuous there (choice B).',
    {
      type: 'formula',
      label: 'Piecewise function',
      latex: 'f(x)=\\begin{cases}5x+3,&x<2,\\\\2x^2+5,&2\\le x<4,\\\\x^3-5x+3,&x\\ge4.\\end{cases}',
      explanation: 'Continuity at x=4 requires the left-hand limit, right-hand limit, and f(4) to agree. At 4, the point value comes from the last branch because that branch includes x=4.',
    },
    {
      type: 'worked-example',
      title: 'Compare the left-hand limit with the point value',
      steps: [
        'For x→4 from the left, use the middle branch 2x²+5: 2(4²)+5=32+5=37.',
        'At x=4, use the last branch: f(4)=4³−5(4)+3=64−20+3=47.',
        'From the right, the last branch also approaches 47.',
        'Since the left and right limits differ (37≠47), the two-sided limit does not exist. Therefore continuity fails.',
      ],
      conclusion: 'The function is discontinuous at x=4, choice B. It is defined there, so choice C is not correct.',
    },
    {
      type: 'recognition',
      title: 'At a piece boundary, compare both sides',
      markdown: 'Use the branch immediately left of 4 for the left-hand limit and the branch immediately right of 4 for the right-hand limit. Then separately check the branch that includes 4 to find f(4).',
    },
  ),
  explainedPage(
    8,
    'Review Example 9: compose functions and find the domain',
    'The composition is (f∘g)(x)=1/(x²−1), with domain ℝ\\{−1,1}.',
    {
      type: 'formula',
      label: 'Functions and composition',
      latex: 'f(x)=\\frac1{x-1},\\qquad g(x)=x^2,\\qquad (f\\circ g)(x)=f(g(x))',
      explanation: 'Composition means substitute the entire output of g into f. Since g(x)=x², replace each x in f’s rule by x².',
    },
    {
      type: 'worked-example',
      title: 'Substitute first, then exclude zero denominators',
      steps: [
        'Substitute g(x)=x² into f: f(g(x))=1/(g(x)−1)=1/(x²−1).',
        'The denominator cannot be zero: x²−1≠0.',
        'Factor: x²−1=(x−1)(x+1), so the excluded inputs are x=1 and x=−1.',
      ],
      conclusion: '(f∘g)(x)=1/(x²−1), domain ℝ\\{−1,1}.',
    },
    {
      type: 'trap',
      title: 'Carry the restrictions through composition',
      markdown: 'The inner function x² accepts every real x, but its output cannot equal 1 because that would make f’s denominator zero. Exclude both square roots of 1.',
    },
  ),
  explainedPage(
    9,
    'Review Example 10: a polynomial limit at infinity',
    'The highest-degree terms dominate, so the limit is the ratio −7/14=−1/2.',
    {
      type: 'formula',
      label: 'Limit to evaluate',
      latex: '\\lim_{x\\to\\infty}\\frac{5x-7x^3}{2x^2+14x^3-9}',
      explanation: 'Both numerator and denominator have degree 3. Divide every term by x³ to compare their leading coefficients while making the lower-degree contributions vanish at infinity.',
    },
    {
      type: 'worked-example',
      title: 'Divide each term by x³',
      steps: [
        'Rewrite the quotient as (5/x²−7)/(2/x+14−9/x³).',
        'As x→∞, the fractions 5/x², 2/x, and 9/x³ each approach 0.',
        'The remaining values are (0−7)/(0+14−0)=−7/14.',
        'Reduce the fraction: −7/14=−1/2.',
      ],
      conclusion: 'The limit is −1/2.',
    },
    {
      type: 'recognition',
      title: 'For equal polynomial degrees, compare leading coefficients',
      markdown: 'When numerator and denominator have the same highest power, the limit at positive infinity is the ratio of the coefficients of that power. Here it is −7/14.',
    },
  ),
  explainedPage(
    10,
    'Review Examples 11–13: product, chain, and power rules',
    'The derivatives are 5x³cos x+15x²sin x; e^(x³+8x)(3x²+8); and 21x²−10x+4.',
    {
      type: 'worked-example',
      title: 'Example 11: product of a polynomial and sine',
      givens: 'y=5x^3\\sin x',
      steps: [
        'Use the product rule: differentiate 5x³ to get 15x², and differentiate sin x to get cos x.',
        'Keep the other factor in each term: y′=15x² sin x+5x³ cos x.',
      ],
      conclusion: 'y′=5x³ cos x+15x² sin x.',
    },
    {
      type: 'worked-example',
      title: 'Example 12: exponential with an inner exponent',
      givens: 'y=e^{x^3+8x}',
      steps: [
        'The outer derivative of e^u is e^u.',
        'Differentiate the exponent u=x³+8x: u′=3x²+8.',
        'Multiply by the inner derivative.',
      ],
      conclusion: 'y′=e^(x³+8x)(3x²+8).',
    },
    {
      type: 'worked-example',
      title: 'Example 13: polynomial term by term',
      givens: 'y=7x^3-5x^2+4x-2',
      steps: [
        'Differentiate 7x³ to get 21x².',
        'Differentiate −5x² to get −10x.',
        'Differentiate 4x to get 4; the constant −2 becomes 0.',
      ],
      conclusion: 'y′=21x²−10x+4.',
    },
  ),
  explainedPage(
    11,
    'Review Example 14: a power of a quotient',
    'For y=((3x−2)/(2x+1))⁴, combine the outer power rule and the quotient rule to get y′=28(3x−2)³/(2x+1)⁵.',
    {
      type: 'worked-example',
      title: 'Differentiate the outside power',
      steps: [
        'Let u=(3x−2)/(2x+1), so y=u⁴. The outer derivative is 4u³.',
        'Now find u′ using the quotient rule: [(2x+1)(3)−(3x−2)(2)]/(2x+1)².',
        'Expand the numerator: 6x+3−6x+4=7. Thus u′=7/(2x+1)².',
        'Apply the chain rule: y′=4((3x−2)/(2x+1))³·7/(2x+1)².',
        'Combine the denominator powers: y′=28(3x−2)³/(2x+1)^5.',
      ],
      conclusion: 'y′=28(3x−2)³/(2x+1)⁵, for x\\ne−1/2.',
    },
    {
      type: 'trap',
      title: 'Keep the denominator restriction',
      markdown: 'The original quotient is undefined when 2x+1=0, so x=−1/2 remains excluded after differentiating and simplifying.',
    },
    {
      type: 'foundation',
      title: 'Recap: how to choose the review method',
      markdown: '- **Function values and sums:** substitute carefully and combine like terms.  \n- **Limits:** simplify a 0/0 form; substitute directly when the denominator stays nonzero; for equal polynomial degrees at infinity, compare leading coefficients.  \n- **Piecewise functions:** the side of approach chooses the branch; continuity requires both side-limits and the point value to agree.  \n- **Composition:** substitute the inner function into the outer one and preserve denominator restrictions.  \n- **Derivatives:** use product, quotient, and chain rules where the expression’s structure calls for them. This review follows the archived Fall 2025–2026 lecture; compare with current Moodle materials when available.',
    },
  ),
  visualOnlyPage(12, 'Thank you — closing slide', 'This final slide is a thank-you and questions graphic. It contains no further review questions.'),
];

export const mathematics1Lecture12Lesson: Lesson = {
  id: 'mathematics-1-lecture-12-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 12 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 12 (1).pdf',
  title: 'Archived Lecture 12: Midterm Exam Solutions',
  sourcePageCount: 12,
  pages,
  lastReviewed: '2026-10-14',
};
