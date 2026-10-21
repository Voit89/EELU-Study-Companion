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
  visualOnlyPage(
    2,
    'Midterm exam — scope notice',
    'This slide announces a midterm exam covering Lecture 1 through Lecture 10. It contains no exam date, questions, or additional differentiation rule.',
  ),
  visualOnlyPage(3, 'Revision — section divider', 'This slide only introduces a revision section.'),
  visualOnlyPage(4, 'Differentiation rules — section divider', 'This slide is a topic divider; the exponential and logarithmic rules begin on page 5.'),
  explainedPage(
    5,
    'Derivative rules for exponential and logarithmic functions',
    'For the natural exponential, the derivative is itself. For a logarithm, divide by its input; for a general exponential, include the factor ln of its base.',
    {
      type: 'formula',
      label: 'Rules shown in the lecture',
      latex: '\\frac{d}{dx}e^x=e^x,\\qquad \\frac{d}{dx}a^x=a^x\\ln a,\\qquad \\frac{d}{dx}\\ln x=\\frac1x,\\qquad \\frac{d}{dx}\\log_a x=\\frac{1}{x\\ln a}',
      explanation: 'The base e is the special exponential whose derivative stays unchanged. The rule for a fixed base a includes ln a. The natural logarithm ln x is log base e. For log base a, both the input and the base must be valid: x>0, a>0, and a\\ne1.',
    },
    {
      type: 'recognition',
      title: 'Check what is in the exponent or logarithm',
      markdown: 'These displayed rules apply directly when the input is just x. If the input is a longer expression such as x^3, use the chain rule as well. For example, differentiating e^(x^3) also requires multiplying by the derivative of x^3.',
    },
    {
      type: 'source-note',
      text: 'The slide states a > 0 for log base a but omits that a cannot equal 1. A logarithm base of 1 is not defined, so that restriction is required. The usual real exponential rule assumes a > 0; it also works for a = 1, giving derivative 0.',
    },
  ),
  explainedPage(
    6,
    'Example 1: product plus quotient',
    'For y=x^2e^x+(x−1)/(x+1), differentiate the product and quotient separately, then add the results.',
    {
      type: 'formula',
      label: 'Function in Example 1',
      latex: 'y=x^2e^x+\\frac{x-1}{x+1}',
      explanation: 'The first part is a product of x^2 and e^x. The second part is a fraction whose denominator x+1 cannot be zero, so x\\ne−1.',
    },
    {
      type: 'recognition',
      title: 'Choose one rule for each piece',
      markdown: 'Use the product rule on x^2e^x. Use the quotient rule on (x−1)/(x+1). The plus sign between the two pieces means their derivatives are added.',
    },
  ),
  explainedPage(
    7,
    'Example 2: product, logarithm, and exponential',
    'For y=x ln(x^2+1)+e^(x^3), use the product rule on the first term and the chain rule on both inner expressions.',
    {
      type: 'formula',
      label: 'Function in Example 2',
      latex: 'y=x\\ln(x^2+1)+e^{x^3}',
      explanation: 'The logarithm’s input is x^2+1, whose derivative is 2x. The exponent in the second term is x^3, whose derivative is 3x^2.',
    },
    {
      type: 'recognition',
      title: 'Look inside ln and e before differentiating',
      markdown: 'For ln(v), the derivative is v′/v. For e^v, the derivative is e^v v′. Here v=x^2+1 in the logarithm and v=x^3 in the exponential.',
    },
  ),
  explainedPage(
    8,
    'Examples 1 and 2: solutions',
    'The results are y′=(x^2+2x)e^x+2/(x+1)^2 for Example 1 and y′=2x^2/(x^2+1)+ln(x^2+1)+3x^2e^(x^3) for Example 2.',
    {
      type: 'worked-example',
      title: 'Example 1: apply product and quotient rules',
      steps: [
        'For x^2e^x, the product rule gives x^2(e^x)+(e^x)(2x)=(x^2+2x)e^x.',
        'For (x−1)/(x+1), quotient-rule numerator is (x+1)(1)−(x−1)(1).',
        'Simplify that numerator: (x+1)−(x−1)=2. The denominator is (x+1)^2, so this derivative is 2/(x+1)^2.',
        'Add the two derivatives because the original function adds the two expressions.',
      ],
      conclusion: '$y′=(x^2+2x)e^x+2/(x+1)^2$, for $x\\ne-1$.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: use the inner derivatives',
      steps: [
        'For x ln(x^2+1), product rule gives x times the derivative of ln(x^2+1), plus ln(x^2+1) times the derivative of x.',
        'The logarithm derivative is (2x)/(x^2+1), so the product becomes x·2x/(x^2+1)+ln(x^2+1)=2x^2/(x^2+1)+ln(x^2+1).',
        'For e^(x^3), keep e^(x^3) and multiply by the derivative of x^3, which is 3x^2.',
        'Combine the two parts: 2x^2/(x^2+1)+ln(x^2+1)+3x^2e^(x^3).',
      ],
      conclusion: 'This function and its derivative are defined for all real x because x^2+1 is always positive.',
    },
  ),
  explainedPage(
    9,
    'Derivatives of the six trigonometric functions',
    'Memorize the six basic patterns: sine becomes cosine; cosine becomes negative sine; tangent becomes secant squared; cotangent, secant, and cosecant have the listed signed products.',
    {
      type: 'formula',
      label: 'Trigonometric derivative rules',
      latex: '\\begin{aligned}\\frac{d}{dx}\\sin x&=\\cos x,&\\frac{d}{dx}\\cos x&=-\\sin x,\\\\\\frac{d}{dx}\\tan x&=\\sec^2x,&\\frac{d}{dx}\\cot x&=-\\csc^2x,\\\\\\frac{d}{dx}\\sec x&=\\sec x\\tan x,&\\frac{d}{dx}\\csc x&=-\\csc x\\cot x.\\end{aligned}',
      explanation: 'The negative signs belong to the cosine, cotangent, and cosecant derivatives. These basic formulas assume angles are measured in radians, as is standard in calculus.',
    },
    {
      type: 'trap',
      title: 'Do not lose the negative signs',
      markdown: 'The derivative of cos x is −sin x, not sin x. The derivatives of cot x and csc x are negative too; sec x and tan x have positive derivatives.',
    },
  ),
  explainedPage(
    10,
    'Example 3: quotient of sine and cosine expressions',
    'For y=sin x/(1+cos x), the denominator changes with x, so use the quotient rule and remember that (cos x)′=−sin x.',
    {
      type: 'formula',
      label: 'Function in Example 3',
      latex: 'y=\\frac{\\sin x}{1+\\cos x}',
      explanation: 'Take the numerator as f=sin x and the denominator as g=1+cos x. Then f′=cos x and g′=−sin x.',
    },
    {
      type: 'recognition',
      title: 'Set up the quotient rule before simplifying',
      markdown: 'The numerator of the derivative is g f′−f g′. Substituting g′=−sin x creates a minus times a negative term, which becomes a plus.',
    },
  ),
  explainedPage(
    11,
    'Example 3 solution: simplify with a trig identity',
    'The quotient-rule numerator simplifies to 1+cos x, leaving y′=1/(1+cos x) wherever the original denominator is nonzero.',
    {
      type: 'worked-example',
      title: 'Differentiate, then use sin²x+cos²x=1',
      steps: [
        'Apply the quotient rule: y′=[(1+cos x)(cos x)−(sin x)(−sin x)]/(1+cos x)^2.',
        'The two negative signs in the second product make it positive: numerator = cos x+cos²x+sin²x.',
        'Use cos²x+sin²x=1 to get numerator cos x+1.',
        'Cancel one common factor of 1+cos x: y′=1/(1+cos x).',
      ],
      conclusion: 'The original denominator is zero when $\\cos x=-1$, so $x=(2k+1)\\pi$ for any integer $k$ remains excluded.',
    },
    {
      type: 'trap',
      title: 'Simplifying does not restore excluded inputs',
      markdown: 'The original fraction is undefined when 1+cos x=0. Keep those inputs excluded even after reducing the derivative expression.',
    },
  ),
  visualOnlyPage(12, 'The chain rule — section divider', 'This slide only names the next topic. The chain-rule statement and formulas begin on source page 13.'),
  explainedPage(
    13,
    'The chain rule: differentiate outside, then multiply inside',
    'For a composite function f(g(x)), differentiate the outer function while keeping its input g(x), then multiply by the derivative of the inner function.',
    {
      type: 'formula',
      label: 'Chain rule in function and Leibniz notation',
      latex: '\\frac{d}{dx}f(g(x))=f\\prime(g(x))g\\prime(x),\\qquad \\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx},\\quad u=g(x)',
      explanation: 'The value g(x) is first fed into f, so it is the inner function. The derivative f′ is evaluated at that inner value; then multiply by g′(x). The source’s color-coded note emphasizes this order: outside derivative first, inside derivative second.',
    },
    {
      type: 'recognition',
      title: 'Spot a function inside another function',
      markdown: 'Expressions such as cos(x^3), (2x^3+5)^4, or e^(x^3) have an outer operation applied to an inner expression. The inner derivative is the extra multiplier that a plain power, cosine, or exponential rule would miss.',
    },
  ),
  explainedPage(
    14,
    'Chain rules for powers and natural exponentials',
    'For u=g(x), differentiate u^n by multiplying by n u^(n−1) and then u′. For e^u, keep e^u and multiply by u′.',
    {
      type: 'formula',
      label: 'Power and natural-exponential chain rules',
      latex: '\\frac{d}{dx}u^n=nu^{n-1}\\frac{du}{dx},\\qquad \\frac{d}{dx}e^u=e^u\\frac{du}{dx},\\quad u=g(x)',
      explanation: 'First do the familiar outer derivative as if u were a simple variable. Then multiply by how quickly u changes with x. This is the chain rule multiplier.',
    },
    {
      type: 'worked-example',
      title: 'A small pattern illustration',
      steps: [
        'For (3x+1)^5, the outer power rule gives 5(3x+1)^4.',
        'The inner expression 3x+1 has derivative 3, so multiply by 3.',
      ],
      conclusion: 'The derivative is $15(3x+1)^4$. This is a supplemental illustration of the slide’s rule, not a source example.',
    },
  ),
  explainedPage(
    15,
    'Chain rules for sine and a general exponential',
    'For sin u, the derivative is cos u times u′. For b^u, keep b^u, multiply by ln b, and then multiply by u′.',
    {
      type: 'formula',
      label: 'Sine and general-exponential chain rules',
      latex: '\\frac{d}{dx}\\sin u=\\cos u\\frac{du}{dx},\\qquad \\frac{d}{dx}b^u=b^u\\ln b\\frac{du}{dx},\\quad u=g(x),\\ b>0',
      explanation: 'The first rule is the chain rule paired with (sin u)′=cos u. For b^u, the factor ln b comes from the basic derivative of a^x; the additional factor u′ comes from the changing exponent.',
    },
    {
      type: 'trap',
      title: 'Both multipliers matter for b^u',
      markdown: 'For a changing exponent, include ln b and the derivative of the exponent. For example, d(2^(x^2))/dx is 2^(x^2) ln 2 · 2x.',
    },
  ),
  explainedPage(
    16,
    'Example 4: differentiate cos(x³)',
    'Treat cos as the outer function and x³ as the inner function; the answer will include both −sin(x³) and the derivative 3x².',
    {
      type: 'formula',
      label: 'Function in Example 4',
      latex: 'y=\\cos(x^3)',
      explanation: 'The outer derivative of cos(u) is −sin(u). The inside is u=x^3, whose derivative is 3x^2.',
    },
  ),
  explainedPage(
    17,
    'Example 4 solution: apply the chain rule twice as a check',
    'Both approaches give y′=−3x² sin(x³): differentiate the outer cosine and multiply by the inner derivative.',
    {
      type: 'worked-example',
      title: 'Outer-function and inner-function method',
      steps: [
        'Set g(x)=x^3 (inside) and f(u)=cos u (outside).',
        'Differentiate the outside and evaluate it at the inside: f′(g(x))=−sin(x^3).',
        'Differentiate the inside: g′(x)=3x^2.',
        'Multiply: y′=−sin(x^3)·3x^2=−3x^2 sin(x^3).',
      ],
      conclusion: 'Using $u=x^3$ gives the same result: $dy/du=-\\sin u$ and $du/dx=3x^2$, so $dy/dx=(dy/du)(du/dx)$.',
    },
    {
      type: 'trap',
      title: 'Keep the original inside expression in the sine',
      markdown: 'After differentiating cos(x³), write −sin(x³), not −sin x. The outer derivative is evaluated at the full inside value.',
    },
  ),
  explainedPage(
    18,
    'Example 5: cube root of a quotient',
    'The cube-root bar covers the entire fraction (x²+1)/x. Rewrite the cube root as a one-third power, then use the chain rule.',
    {
      type: 'formula',
      label: 'Function in Example 5',
      latex: 'y=\\sqrt[3]{\\frac{x^2+1}{x}}=\\left(\\frac{x^2+1}{x}\\right)^{1/3}',
      explanation: 'The outer operation raises the quotient to the power 1/3. The inner quotient must be differentiated with the quotient rule. The original function requires x\\ne0.',
    },
  ),
  explainedPage(
    19,
    'Example 5 solution: combine power, quotient, and chain rules',
    'The derivative is (1/3)((x²+1)/x)^(−2/3)·(x²−1)/x², for x≠0.',
    {
      type: 'worked-example',
      title: 'Differentiate the outer power, then the inner quotient',
      steps: [
        'Write y=((x²+1)/x)^(1/3). The outer power rule contributes (1/3)((x²+1)/x)^(−2/3).',
        'For the inside quotient, use bottom times derivative of top minus top times derivative of bottom: [x(2x)−(x²+1)(1)]/x².',
        'Simplify the numerator: 2x²−x²−1=x²−1, so the inside derivative is (x²−1)/x².',
        'Multiply the outer and inner derivatives together.',
      ],
      conclusion: '$y′=\\frac13\\left(\\frac{x^2+1}{x}\\right)^{-2/3}\\frac{x^2-1}{x^2}$. The original function is defined and differentiable for $x\\ne0$.',
    },
    {
      type: 'recognition',
      title: 'The cube root accepts negative inputs too',
      markdown: 'A real cube root can take a negative value. The restriction here comes from the inner denominator x, so exclude x=0; do not incorrectly require the fraction to be positive.',
    },
  ),
  explainedPage(
    20,
    'Example 6: a power of a polynomial',
    'For y=(2x³+5)^4, take 2x³+5 as the inside function and raise it to the fourth power on the outside.',
    {
      type: 'formula',
      label: 'Function in Example 6',
      latex: 'y=(2x^3+5)^4',
      explanation: 'The outer power rule gives 4(2x³+5)³. The inner derivative is 6x², which must be multiplied in.',
    },
  ),
  explainedPage(
    21,
    'Example 6 solution: multiply by the inner derivative',
    'The derivative is 24x²(2x³+5)³.',
    {
      type: 'worked-example',
      title: 'Name the inside and apply the chain rule',
      steps: [
        'Let u=2x³+5, so y=u⁴.',
        'Differentiate the outer function with respect to u: dy/du=4u³.',
        'Differentiate the inside with respect to x: du/dx=6x².',
        'Multiply: dy/dx=(dy/du)(du/dx)=4u³·6x²=24x²u³.',
        'Replace u with 2x³+5.',
      ],
      conclusion: '$y′=24x^2(2x^3+5)^3$.',
    },
  ),
  explainedPage(
    22,
    'Example 7: a polynomial in a rational inner function',
    'For y=z³−2z with z=x/(x+1), differentiate y with respect to z and z with respect to x, then multiply.',
    {
      type: 'formula',
      label: 'Nested function in Example 7',
      latex: 'y=z^3-2z,\\qquad z=\\frac{x}{x+1}',
      explanation: 'The outer rule is simple: dy/dz=3z²−2. The inner function is a quotient, and x+1 must not be zero, so x\\ne−1.',
    },
  ),
  explainedPage(
    23,
    'Example 7 solution: use Leibniz notation',
    'After substitution and simplification, dy/dx=(x²−4x−2)/(x+1)^4, where x≠−1.',
    {
      type: 'worked-example',
      title: 'Find both derivatives and multiply',
      steps: [
        'Differentiate the outside rule y=z³−2z: dy/dz=3z²−2.',
        'Differentiate z=x/(x+1): dz/dx=[(x+1)(1)−x(1)]/(x+1)²=1/(x+1)².',
        'Chain them: dy/dx=(3z²−2)/(x+1)².',
        'Substitute z=x/(x+1): [3x²/(x+1)²−2]/(x+1)².',
        'Combine over a common denominator: [3x²−2(x+1)²]/(x+1)^4=(x²−4x−2)/(x+1)^4.',
      ],
      conclusion: '$dy/dx=(x^2-4x-2)/(x+1)^4$, for $x\\ne-1$.',
    },
  ),
  explainedPage(
    24,
    'Example 8: a cube of a rational inner function',
    'For y=u³+1 and u=(x²+1)/(x²−1), use the chain rule and quotient rule. The inner denominator excludes x=1 and x=−1.',
    {
      type: 'formula',
      label: 'Nested function in Example 8',
      latex: 'y=u^3+1,\\qquad u=\\frac{x^2+1}{x^2-1}',
      explanation: 'The outside derivative is dy/du=3u². The inside is a quotient of two quadratic expressions; its derivative requires the quotient rule.',
    },
  ),
  explainedPage(
    25,
    'Example 8 solution: correct the final simplification',
    'The chain and quotient rules give dy/dx=−12x(x²+1)²/(x²−1)^4, for x≠±1. The last equality printed on the slide does not follow from its previous line.',
    {
      type: 'worked-example',
      title: 'Differentiate the outside and inside',
      steps: [
        'For y=u³+1, dy/du=3u².',
        'For u=(x²+1)/(x²−1), quotient rule gives du/dx=[(x²−1)(2x)−(x²+1)(2x)]/(x²−1)².',
        'Factor 2x in the numerator: 2x[(x²−1)−(x²+1)]=−4x. Thus du/dx=−4x/(x²−1)².',
        'Multiply: dy/dx=3u²·du/dx=−12x((x²+1)/(x²−1))²/(x²−1)².',
        'Combine the denominator powers: dy/dx=−12x(x²+1)²/(x²−1)^4. Since x²−1=(x−1)(x+1), the original function excludes x=1 and x=−1.',
      ],
      conclusion: 'The correct derivative is $-12x(x^2+1)^2/(x^2-1)^4$ for $x\\ne\\pm1$.',
    },
    {
      type: 'source-note',
      text: 'Source correction: the slide’s penultimate expression, −12x(x⁴+2x²+1)/(x²−1)^4, agrees with the chain-rule calculation because x⁴+2x²+1=(x²+1)². Its final printed line, (x²−4x−2)/(x+1)^4, is incorrect and appears copied from Example 7. The corrected derivative above preserves the Example 8 function and its domain.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: identify the layers',
      markdown: '- **Exponential and logarithmic rules:** remember the ln(base) factor for a^x and 1/x for ln x; for log_a x, divide by x ln a.  \n- **Trigonometric rules:** learn the six base derivatives and their signs; these formulas assume radians.  \n- **Chain rule:** outer derivative evaluated at the inside, multiplied by the inside derivative.  \n- **Products and quotients inside a composite:** apply product or quotient rule to the inside as needed, then multiply by the outer derivative.  \n- **Restrictions:** keep denominator zeros excluded in the original function. This guide follows archived Fall 2025–2026 slides; compare with current Moodle material when released.',
    },
  ),
  visualOnlyPage(26, 'Thank you — closing slide', 'This final slide is a thank-you and questions graphic. It contains no further mathematical content.'),
];

export const mathematics1Lecture10Lesson: Lesson = {
  id: 'mathematics-1-lecture-10-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 10 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 10 (1).pdf',
  title: 'Archived Lecture 10: Differentiation Rules and the Chain Rule',
  sourcePageCount: 26,
  pages,
  lastReviewed: '2026-10-14',
};
