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
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section.'),
  visualOnlyPage(3, 'L’Hôpital’s rule — section divider', 'This slide names the topic. The indeterminate forms and rule begin on source page 4.'),
  explainedPage(
    4,
    'Indeterminate forms and L’Hôpital’s rule',
    'L’Hôpital’s rule directly applies when a quotient has the form 0/0 or ∞/∞. First verify the form; then differentiate the numerator and denominator separately.',
    {
      type: 'formula',
      label: 'Indeterminate forms listed on the slide',
      latex: '\\frac{0}{0},\\quad \\frac{\\infty}{\\infty},\\quad 0\\cdot\\infty,\\quad \\infty-\\infty,\\quad 0^0,\\quad \\infty^0,\\quad 1^\\infty',
      explanation: 'These are called indeterminate because the form alone does not determine a limit. The quotient rule for limits applies directly only to 0/0 and ∞/∞. Products, differences, and powers must first be rewritten into a suitable quotient if L’Hôpital’s rule is to be used.',
    },
    {
      type: 'formula',
      label: 'L’Hôpital’s rule as presented',
      latex: '\\text{If }\\lim_{x\\to a}\\frac{f(x)}{g(x)}\\text{ is }\\frac{0}{0}\\text{ or }\\frac{\\infty}{\\infty},\\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f\\prime(x)}{g\\prime(x)}',
      explanation: 'Differentiate the top and bottom separately; do not use the product rule or quotient rule on f/g for this step. In a full theorem, f and g must be differentiable near the point, g′ must not vanish there, and the derivative quotient must have a limit for the conclusion to follow.',
    },
    {
      type: 'trap',
      title: 'Recognize the form before differentiating',
      markdown: 'Seeing a fraction does not automatically permit L’Hôpital’s rule. Substitute or evaluate the limit form first; only 0/0 and ∞/∞ are the direct triggers.',
    },
  ),
  explainedPage(
    5,
    'A safe three-step procedure',
    'Check for 0/0 or ∞/∞, differentiate numerator and denominator separately, then evaluate the new limit.',
    {
      type: 'foundation',
      title: 'Apply the rule in this order',
      markdown: '1. Find the original limit’s form and confirm it is 0/0 or ∞/∞.  \n2. Differentiate f and g separately to get f′/g′.  \n3. Evaluate the limit of that new quotient, if it exists.',
    },
    {
      type: 'recognition',
      title: 'Keep the limit variable and target unchanged',
      markdown: 'After differentiating, keep the same approach value as the original problem. Recheck the new quotient before using L’Hôpital’s rule again.',
    },
  ),
  explainedPage(
    6,
    'Warning: do not use L’Hôpital’s rule on an ordinary quotient',
    'For (x+6)/(x+2) as x approaches 0, direct substitution gives 6/2=3. Differentiating top and bottom to get 1 would be invalid because the original form is not indeterminate.',
    {
      type: 'formula',
      label: 'Limit and the misleading derivative quotient',
      latex: '\\lim_{x\\to0}\\frac{x+6}{x+2},\\qquad \\frac{d}{dx}(x+6)\\Big/\\frac{d}{dx}(x+2)=\\frac11',
      explanation: 'At x=0, the original numerator approaches 6 and the denominator approaches 2. This is the ordinary form 6/2, not 0/0 or ∞/∞.',
    },
    {
      type: 'worked-example',
      title: 'Evaluate the original limit directly',
      steps: [
        'Substitute x=0 into the numerator: 0+6=6.',
        'Substitute x=0 into the denominator: 0+2=2.',
        'The denominator is nonzero, so the function is continuous at 0 and the limit is 6/2.',
      ],
      conclusion: 'The correct limit is 3. The derivative quotient 1/1 is not the limit of the original expression.',
    },
    {
      type: 'trap',
      title: 'Differentiating can change the answer when the form is not indeterminate',
      markdown: 'L’Hôpital’s rule is a theorem for specific limit forms. Applying the derivative ratio to 6/2 would turn a valid limit of 3 into the unrelated number 1.',
    },
  ),
  explainedPage(
    7,
    'Three standard limits near zero',
    'As x approaches 0 in radians, sin x/x approaches 1, (1−cos x)/x approaches 0, and (e^x−1)/x approaches 1.',
    {
      type: 'formula',
      label: 'Limits stated on the slide',
      latex: '\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\qquad \\lim_{x\\to0}\\frac{1-\\cos x}{x}=0,\\qquad \\lim_{x\\to0}\\frac{e^x-1}{x}=1',
      explanation: 'Each quotient is 0/0 at x=0. The next three slides verify these limits using L’Hôpital’s rule.',
    },
    {
      type: 'source-note',
      text: 'The trigonometric limits use radians. The value of lim sin x/x would change if angles were measured in degrees.',
    },
  ),
  explainedPage(
    8,
    'Proof of lim sin x/x = 1',
    'Both numerator and denominator approach 0. L’Hôpital’s rule gives the limit of cos x, which approaches 1.',
    {
      type: 'worked-example',
      title: 'Differentiate numerator and denominator',
      steps: [
        'As x→0, sin x→0 and x→0, so the quotient is 0/0.',
        'Differentiate the numerator: (sin x)′=cos x. Differentiate the denominator: x′=1.',
        'Apply L’Hôpital’s rule: lim cos x/1.',
        'Substitute the limit value: cos 0=1.',
      ],
      conclusion: '$\\displaystyle\\lim_{x\\to0}\\frac{\\sin x}{x}=1$.',
    },
  ),
  explainedPage(
    9,
    'Proof of lim (1−cos x)/x = 0',
    'The quotient is 0/0 at zero. Differentiating gives sin x/1, whose limit is 0.',
    {
      type: 'worked-example',
      title: 'Use L’Hôpital’s rule once',
      steps: [
        'At x=0, 1−cos 0=0 and the denominator is 0.',
        'The derivative of 1−cos x is sin x; the derivative of x is 1.',
        'Therefore the limit equals lim sin x/1.',
        'As x approaches 0, sin x approaches 0.',
      ],
      conclusion: '$\\displaystyle\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0$.',
    },
  ),
  explainedPage(
    10,
    'Proof of lim (e^x−1)/x = 1',
    'At zero the quotient is 0/0. Differentiating the numerator gives e^x, so the limit is e^0=1.',
    {
      type: 'worked-example',
      title: 'Differentiate the numerator and denominator',
      steps: [
        'At x=0, e^0−1=0 and x=0, giving 0/0.',
        'The derivative of e^x−1 is e^x; the derivative of x is 1.',
        'The new limit is lim e^x.',
        'Substitute x=0: e^0=1.',
      ],
      conclusion: '$\\displaystyle\\lim_{x\\to0}\\frac{e^x-1}{x}=1$.',
    },
  ),
  explainedPage(
    11,
    'Examples 1–2: apply L’Hôpital’s rule at 1 and infinity',
    'The first limit is 1. The second, lim as x→∞ of (e^(1/x)−1)/(1/x), is also 1 after the chain-rule factors cancel.',
    {
      type: 'worked-example',
      title: 'Example 1: lim ln x/(x−1) as x→1',
      steps: [
        'As x→1, ln x→0 and x−1→0, so the form is 0/0.',
        'Differentiate separately: (ln x)′=1/x and (x−1)′=1.',
        'The limit becomes lim (1/x)/1 as x→1.',
        'Substitute x=1: the result is 1.',
      ],
      conclusion: '$\\displaystyle\\lim_{x\\to1}\\frac{\\ln x}{x-1}=1$.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: lim (e^(1/x)−1)/(1/x) as x→∞',
      steps: [
        'As x→∞, 1/x→0, so e^(1/x)−1→0 and the denominator 1/x→0. This is 0/0.',
        'Differentiate the numerator using the chain rule: e^(1/x)(−1/x²). Differentiate the denominator: −1/x².',
        'The two −1/x² factors cancel, leaving e^(1/x).',
        'As x→∞, 1/x→0, so e^(1/x)→e^0=1.',
      ],
      conclusion: '$\\displaystyle\\lim_{x\\to\\infty}\\frac{e^{1/x}-1}{1/x}=1$.',
    },
  ),
  explainedPage(
    12,
    'Derivatives of inverse trigonometric functions',
    'The derivative of inverse sine is positive, inverse cosine is negative, inverse tangent is 1/(1+x²), and inverse secant/cosecant use |x| in the denominator.',
    {
      type: 'formula',
      label: 'Six inverse-trigonometric derivative rules',
      latex: '\\begin{aligned}\\frac{d}{dx}\\sin^{-1}x&=\\frac1{\\sqrt{1-x^2}},&|x|&<1,\\\\\\frac{d}{dx}\\cos^{-1}x&=-\\frac1{\\sqrt{1-x^2}},&|x|&<1,\\\\\\frac{d}{dx}\\tan^{-1}x&=\\frac1{1+x^2},&&x\\in\\mathbb R,\\\\\\frac{d}{dx}\\cot^{-1}x&=-\\frac1{1+x^2},&&x\\in\\mathbb R,\\\\\\frac{d}{dx}\\sec^{-1}x&=\\frac1{|x|\\sqrt{x^2-1}},&|x|&>1,\\\\\\frac{d}{dx}\\csc^{-1}x&=-\\frac1{|x|\\sqrt{x^2-1}},&|x|&>1.\\end{aligned}',
      explanation: 'Here sin⁻¹x means inverse sine (arcsin x), not 1/sin x. Likewise cos⁻¹x and tan⁻¹x mean inverse cosine and inverse tangent. The absolute value |x| is essential in the secant and cosecant formulas when x can be negative.',
    },
    {
      type: 'trap',
      title: 'Inverse function is different from reciprocal',
      markdown: 'In this table sin⁻¹x means arcsin x. The reciprocal of sin x is csc x, not sin⁻¹x.',
    },
  ),
  explainedPage(
    13,
    'Derive the inverse-sine rule using implicit differentiation',
    'Set y=sin⁻¹x, so sin y=x. Differentiating gives dy/dx=1/cos y=1/√(1−x²), for |x|<1.',
    {
      type: 'worked-example',
      title: 'Let the inverse output be y, then differentiate',
      steps: [
        'Start with y=sin⁻¹x. This is equivalent to sin y=x.',
        'Differentiate both sides with respect to x: cos y·dy/dx=1.',
        'Solve: dy/dx=1/cos y.',
        'Since sin y=x, the identity sin²y+cos²y=1 gives cos²y=1−x².',
        'For the principal arcsine range, cos y≥0, so cos y=√(1−x²).',
      ],
      conclusion: '$\\displaystyle\\frac{d}{dx}\\sin^{-1}x=\\frac1{\\sqrt{1-x^2}}$, for $|x|<1$.',
    },
    {
      type: 'foundation',
      title: 'The triangle in the slide visualizes the identity',
      markdown: 'If sin y=x, imagine a right triangle with opposite side x and hypotenuse 1. Then the adjacent side is √(1−x²), so cos y=√(1−x²).',
    },
  ),
  explainedPage(
    14,
    'Derive the inverse-tangent rule',
    'If y=tan⁻¹x, then tan y=x. Differentiating gives y′=1/sec²y=1/(1+x²).',
    {
      type: 'worked-example',
      title: 'Differentiate tan y=x',
      steps: [
        'Let y=tan⁻¹x, equivalently tan y=x.',
        'Differentiate both sides: sec²y·dy/dx=1.',
        'Solve for the derivative: dy/dx=1/sec²y.',
        'Use sec²y=1+tan²y and tan y=x, so sec²y=1+x².',
      ],
      conclusion: '$\\displaystyle\\frac{d}{dx}\\tan^{-1}x=\\frac1{1+x^2}$, for every real x.',
    },
    {
      type: 'trap',
      title: 'Use the identity to remove y from the answer',
      markdown: 'The expression 1/sec²y is an intermediate result. Replace tan y by x using the original relation so the derivative is written in terms of x.',
    },
  ),
  explainedPage(
    15,
    'Inverse-sine chain rule and a mixed example',
    'For sin⁻¹(u), multiply 1/√(1−u²) by u′. In the slide’s mixed example, y=cos⁻¹x+cos(1/x)−sec x.',
    {
      type: 'formula',
      label: 'Chain rule for inverse sine',
      latex: '\\frac{d}{dx}\\sin^{-1}(u)=\\frac{u\\prime}{\\sqrt{1-u^2}},\\qquad \\frac{d}{dx}\\sin^{-1}(g(x))=\\frac{g\\prime(x)}{\\sqrt{1-(g(x))^2}}',
      explanation: 'This is the chain rule: differentiate the outer inverse-sine function, then multiply by the derivative of its inside input.',
    },
    {
      type: 'worked-example',
      title: 'Differentiate each term of the illustration',
      givens: 'y=cos^{-1}x+\\cos(1/x)-(\\cos x)^{-1}',
      steps: [
        'For cos⁻¹x, use the inverse-cosine rule: derivative = −1/√(1−x²).',
        'For cos(1/x), use the chain rule: [−sin(1/x)]·(−1/x²)=sin(1/x)/x².',
        'The last term is −(cos x)⁻¹=−sec x, whose derivative is −sec x tan x.',
        'Add the three derivatives.',
      ],
      conclusion: 'y′=−1/√(1−x²)+sin(1/x)/x²−sec x tan x, for 0<|x|<1.',
    },
    {
      type: 'source-note',
      text: 'Notation clarification: the slide prints the middle term as cos x⁻¹. Its displayed derivative applies the chain rule to cos(1/x), so this guide reads the term as cos(1/x). The notation cos⁻¹x in the first term means inverse cosine, not reciprocal cosine.',
    },
  ),
  explainedPage(
    16,
    'Example: prove an identity for y=x tan⁻¹x',
    'Starting from y=x tan⁻¹x, product differentiation and one more derivative give (1+x²)y′′+2xy′=2(y+1).',
    {
      type: 'worked-example',
      title: 'Differentiate once and rearrange',
      steps: [
        'Use the product rule: y′=tan⁻¹x+x/(1+x²).',
        'Multiply by 1+x²: (1+x²)y′=(1+x²)tan⁻¹x+x.',
      ],
    },
    {
      type: 'worked-example',
      title: 'Differentiate the rearranged equation',
      steps: [
        'Differentiate the left side with the product rule: (1+x²)y′′+2xy′.',
        'Differentiate the right side: the derivative of x is 1; for (1+x²)tan⁻¹x use the product rule.',
        'That gives 1+2x tan⁻¹x+(1+x²)/(1+x²)=2+2x tan⁻¹x.',
        'Since y=x tan⁻¹x, replace x tan⁻¹x by y.',
      ],
      conclusion: '(1+x²)y′′+2xy′=2+2y=2(y+1), as required.',
    },
  ),
  visualOnlyPage(17, 'Thank you — closing slide', 'This final slide is a thank-you and questions graphic. It contains no further mathematics.'),
];

export const mathematics1Lecture14Lesson: Lesson = {
  id: 'mathematics-1-lecture-14-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 14 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 14 (1).pdf',
  title: 'Archived Lecture 14: L’Hôpital’s Rule and Inverse Trigonometric Derivatives',
  sourcePageCount: 17,
  pages,
  lastReviewed: '2026-10-14',
};
