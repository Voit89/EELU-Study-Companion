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
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. This guide follows that archived copy; compare it with the current Moodle lecture when it is released.',
  ),
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section; it contains no worked question.'),
  visualOnlyPage(3, 'Differentiation — section divider', 'This slide introduces the differentiation topic but contains no definition or calculation.'),
  explainedPage(
    4,
    'What does differentiation measure? The tangent slope',
    'A derivative measures the slope of a curve at one point. It is found by letting a nearby second point move closer until the secant slope approaches the tangent slope.',
    {
      type: 'formula',
      label: 'Slope between two nearby points, then its limit',
      latex: '\\frac{f(x_0+h)-f(x_0)}{h},\\qquad f\'(x_0)=\\lim_{h\\to0}\\frac{f(x_0+h)-f(x_0)}{h}',
      explanation: 'The graph labels the first point $P=(x_0,f(x_0))$ and a nearby point $Q=(x_0+h,f(x_0+h))$. Their horizontal separation is $h$ and their vertical separation is $f(x_0+h)-f(x_0)$, so rise divided by run gives the secant slope. As $h$ approaches 0, Q approaches P; if the limit exists, this slope becomes the tangent slope and is the derivative at $x_0$.',
    },
    {
      type: 'foundation',
      title: 'Read the graph’s differences carefully',
      markdown: 'The numerator is the change in the function’s output, while the denominator is the change in input. The limit asks what the ratio approaches for nonzero $h$ values getting arbitrarily close to zero; we do not substitute $h=0$ into the fraction.',
    },
  ),
  explainedPage(
    5,
    'The derivative as a function',
    'Apply the same nearby-point limit at each allowed input $x$ to define a new function $f\\prime(x)$. Its value may exist at some inputs and fail to exist at others.',
    {
      type: 'formula',
      label: 'Definition of the derivative function',
      latex: 'f\'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}',
      explanation: 'Here $x$ is not one fixed point $x_0$; it can vary across the domain. For each chosen $x$, compare $f(x+h)$ with $f(x)$ and take the limit as $h$ approaches zero. This definition only gives a derivative where that limit exists.',
    },
    {
      type: 'recognition',
      title: 'The derivative’s domain can be smaller',
      markdown: 'Start with the original function’s domain, then keep only inputs where the derivative limit exists. A function can be defined at an endpoint or corner even when it has no finite two-sided derivative there.',
    },
  ),
  explainedPage(
    6,
    'Example 1: differentiate $\\sqrt{x}$ from the definition',
    'Use the difference quotient for $f(x)=\\sqrt{x}$ and find which inputs have a derivative.',
    {
      type: 'formula',
      label: 'Definition to apply',
      latex: 'f\'(x)=\\lim_{h\\to0}\\frac{\\sqrt{x+h}-\\sqrt{x}}{h}',
      explanation: 'Direct substitution would create $0/0$. The next slide resolves this by multiplying by the conjugate, which removes the difference of square roots from the numerator.',
    },
    {
      type: 'recognition',
      title: 'Spot a difference of square roots',
      markdown: 'When an expression contains $\\sqrt{x+h}-\\sqrt{x}$, multiplying top and bottom by $\\sqrt{x+h}+\\sqrt{x}$ uses $(a-b)(a+b)=a^2-b^2$ to simplify it.',
    },
  ),
  explainedPage(
    7,
    'Example 1 solution: derivative and domain',
    'Rationalizing the difference quotient gives $f\\prime(x)=1/(2\\sqrt{x})$. Its derivative domain is $(0,\\infty)$; the original square-root function is defined on $[0,\\infty)$.',
    {
      type: 'worked-example',
      title: 'Rationalize, cancel, then take the limit',
      steps: [
        'Set $f(x)=\\sqrt{x}$, so $f(x+h)=\\sqrt{x+h}$. Substitute in the definition: $f\\prime(x)=\\lim_{h\\to0}(\\sqrt{x+h}-\\sqrt{x})/h$.',
        'Multiply the fraction by $[\\sqrt{x+h}+\\sqrt{x}]/[\\sqrt{x+h}+\\sqrt{x}]$. The numerator becomes $(x+h)-x=h$.',
        'For $h\\ne0$, cancel the common $h$: $f\\prime(x)=\\lim_{h\\to0}1/(\\sqrt{x+h}+\\sqrt{x})$.',
        'Now let $h$ approach 0: the denominator approaches $2\\sqrt{x}$, giving $f\\prime(x)=1/(2\\sqrt{x})$.',
        'This formula is finite only when $x>0$. At $x=0$, the right difference quotient is $\\sqrt{h}/h=1/\\sqrt{h}$, which has no finite limit as $h\\to0^+$.',
      ],
      conclusion: 'The derivative exists for $x>0$, so $D(f\\prime)=(0,\\infty)$. The function itself, $\\sqrt{x}$, is defined also at $x=0$, so $D(f)=[0,\\infty)$.',
    },
    {
      type: 'source-note',
      text: 'Source wording correction: the slide says “Since f is defined for x > 0.” The square-root function is actually defined for x ≥ 0. The stated derivative domain (0, ∞) is correct because the derivative does not exist as a finite two-sided derivative at 0.',
    },
  ),
  explainedPage(
    8,
    'Example 2: differentiate $x^2$ from the definition',
    'For $f(x)=x^2$, expand $(x+h)^2$ and simplify the difference quotient before taking the limit.',
    {
      type: 'formula',
      label: 'Definition and square expansion',
      latex: 'f\'(x)=\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h},\\qquad (x+h)^2=x^2+2xh+h^2',
      explanation: 'The identity $(a+b)^2=a^2+2ab+b^2$ is why the middle term is $2xh$. After subtracting $x^2$, every remaining term in the numerator contains $h$, so a factor can be canceled.',
    },
  ),
  explainedPage(
    9,
    'Example 2 solution: derivative and domain',
    'The difference quotient simplifies to $2x+h$, so its limit is $f\\prime(x)=2x$. This works for every real input.',
    {
      type: 'worked-example',
      title: 'Expand and cancel the common factor',
      steps: [
        'Start with $f(x)=x^2$ and $f(x+h)=(x+h)^2=x^2+2xh+h^2$.',
        'Subtract $f(x)$: $f(x+h)-f(x)=x^2+2xh+h^2-x^2=2xh+h^2$.',
        'Factor out $h$ and divide by $h$ (with $h\\ne0$ in the difference quotient): $(2xh+h^2)/h=2x+h$.',
        'Let $h$ approach 0: $2x+h$ approaches $2x$.',
      ],
      conclusion: 'Thus $f\\prime(x)=2x$. A polynomial is defined and differentiable for every real $x$, so $D(f\\prime)=\\mathbb{R}$.',
    },
  ),
  explainedPage(
    10,
    'Derivative notation: several names for the same rate of change',
    'The slide’s notations $f\\prime(x)$, $y\\prime$, $dy/dx$, $df/dx$, and $D(f)(x)$ all denote a derivative with respect to $x$.',
    {
      type: 'formula',
      label: 'Equivalent derivative notations',
      latex: 'f\'(x)=y\\prime=\\frac{dy}{dx}=\\frac{df}{dx}=\\frac{d}{dx}f(x)=D(f)(x)=D_xf(x)',
      explanation: 'The ordinary prime notation is common when a function is written as $y=f(x)$. The $dy/dx$ form is read “the derivative of y with respect to x.” The operator $d/dx$ means “differentiate the expression that follows with respect to x.”',
    },
    {
      type: 'trap',
      title: 'Read dy/dx as derivative notation here',
      markdown: 'In this course’s notation, $dy/dx$ names the derivative. It is not a direction to divide a standalone number called $dy$ by another called $dx$.',
    },
  ),
  explainedPage(
    11,
    'Differentiability guarantees continuity, but not the reverse',
    'If a function has a derivative at $a$, it is continuous there. A continuous function may still fail to have a derivative at that point.',
    {
      type: 'foundation',
      title: 'What the theorem lets you conclude',
      markdown: 'Differentiable at $a$ $\\Rightarrow$ continuous at $a$. If you already know a function is not continuous at $a$, then it cannot be differentiable there. But continuity alone does not prove differentiability.',
    },
    {
      type: 'source-note',
      text: 'Supplemental illustration (not an example printed on the slide): $f(x)=|x|$ is continuous at 0, but its left slope is −1 and right slope is +1, so it has no single derivative at 0. This demonstrates why the converse fails.',
    },
  ),
  explainedPage(
    12,
    'Basic differentiation rules',
    'Differentiate each term separately: constants become zero, constants stay as multipliers, sums and differences keep their signs, and $x^n$ becomes $nx^{n-1}$.',
    {
      type: 'formula',
      label: 'Rules on the slide',
      latex: '\\frac{d}{dx}c=0,\\quad \\frac{d}{dx}[cf(x)]=c f\'(x),\\quad \\frac{d}{dx}[f(x)\\pm g(x)]=f\'(x)\\pm g\'(x),\\quad \\frac{d}{dx}x^n=nx^{n-1}',
      explanation: 'A constant does not change as $x$ changes, so its rate of change is zero. In the power rule, bring the exponent down as a multiplier, then reduce the exponent by one. For example, $x^3$ differentiates to $3x^2$.',
    },
    {
      type: 'recognition',
      title: 'Use these rules term by term on a polynomial',
      markdown: 'For a sum such as $4x^3-2x+7$, keep each term and its sign visible: differentiate $4x^3$, then $-2x$, then $7$. Do not treat the whole expression as one power.',
    },
  ),
  explainedPage(
    13,
    'Example 3: two derivatives to find',
    'The first expression is a polynomial; the second combines a reciprocal power, a square root, and a constant. Rewrite roots and denominators as powers when applying the power rule.',
    {
      type: 'formula',
      label: 'Functions from the slide',
      latex: '1)\\;y=12x^3-6x^2+5x+9\\qquad 2)\\;y=\\frac{3}{x^2}-2\\sqrt{x}+7',
      explanation: 'For the second function, use $3/x^2=3x^{-2}$ and $\\sqrt{x}=x^{1/2}$. Negative and fractional exponents follow the same power rule, on inputs where the original expression is defined.',
    },
    {
      type: 'recognition',
      title: 'Keep coefficients, signs, and exponents separate',
      markdown: 'A number multiplying a power stays in front while you apply the power rule. A negative coefficient such as $-2$ remains negative throughout the calculation.',
    },
  ),
  explainedPage(
    14,
    'Example 3 solutions: differentiate term by term',
    'The polynomial derivative is $36x^2-12x+5$. The second derivative is $-6/x^3-1/\\sqrt{x}$, with domain $x>0$.',
    {
      type: 'worked-example',
      title: 'Problem 1: polynomial',
      givens: '$y=12x^3-6x^2+5x+9$',
      steps: [
        'Differentiate each term: $12(3x^2)-6(2x)+5(1)+0$.',
        'Multiply the coefficients and simplify: $36x^2-12x+5$.',
      ],
      conclusion: '$dy/dx=36x^2-12x+5$.',
    },
    {
      type: 'worked-example',
      title: 'Problem 2: reciprocal power and square root',
      givens: '$y=3/x^2-2\\sqrt{x}+7=3x^{-2}-2x^{1/2}+7$',
      steps: [
        'For the first term, $3x^{-2}$ differentiates to $3(-2)x^{-3}=-6/x^3$.',
        'For the second, $-2x^{1/2}$ differentiates to $-2(1/2)x^{-1/2}=-x^{-1/2}=-1/\\sqrt{x}$.',
        'The derivative of 7 is zero, so combine the remaining terms.',
      ],
      conclusion: '$dy/dx=-6/x^3-1/\\sqrt{x}$. The original function and this derivative require $x>0$.',
    },
    {
      type: 'trap',
      title: 'A denominator power becomes a negative exponent',
      markdown: '$1/x^3$ means $x^{-3}$, not $x^3$. When differentiating it, $-3$ comes down and the exponent becomes $-4$.',
    },
  ),
  explainedPage(
    15,
    'The product rule',
    'For two functions multiplied together, differentiate one factor at a time and add the two results: first times derivative of second, plus second times derivative of first.',
    {
      type: 'formula',
      label: 'Product rule',
      latex: '\\frac{d}{dx}[f(x)g(x)]=f(x)g\\prime(x)+g(x)f\\prime(x)',
      explanation: 'Both factors may change with $x$, so both contributions matter. The pattern is $f g\\prime+g f\\prime$; it is generally not equal to $f\\prime g\\prime$.',
    },
    {
      type: 'recognition',
      title: 'When to use it',
      markdown: 'Use the rule when the expression is presented as a product of two changing expressions. Identify the first factor and second factor before differentiating either one.',
    },
  ),
  explainedPage(
    16,
    'Example 4: differentiate a product',
    'For $y=(x^2+2x)(3x+1)$, let the two parenthesized expressions be the factors. Apply the product rule without dropping either contribution.',
    {
      type: 'formula',
      label: 'Name the two factors',
      latex: 'f(x)=x^2+2x,\\quad g(x)=3x+1,\\quad y=f(x)g(x)',
      explanation: 'Their derivatives are $f\\prime(x)=2x+2$ and $g\\prime(x)=3$. The next slide substitutes all four expressions into $f g\\prime+g f\\prime$.',
    },
  ),
  explainedPage(
    17,
    'Example 4 solution: product rule and simplify',
    'The derivative is $(x^2+2x)3+(3x+1)(2x+2)$, which expands to $9x^2+14x+2$.',
    {
      type: 'worked-example',
      title: 'Substitute into the product rule',
      steps: [
        'Use $f=x^2+2x$, $f\\prime=2x+2$, $g=3x+1$, and $g\\prime=3$.',
        'Compute $f g\\prime+g f\\prime$: $(x^2+2x)(3)+(3x+1)(2x+2)$.',
        'Expand the first product: $3x^2+6x$. Expand the second: $6x^2+8x+2$.',
        'Combine like terms: $(3x^2+6x^2)+(6x+8x)+2=9x^2+14x+2$.',
      ],
      conclusion: '$dy/dx=9x^2+14x+2$.',
    },
    {
      type: 'shortcut',
      title: 'A quick independent check',
      markdown: 'You can expand the original product first: $y=3x^3+7x^2+2x$, then differentiate term by term to get $9x^2+14x+2$. The product-rule method is still important because products do not always simplify conveniently.',
    },
  ),
  explainedPage(
    18,
    'The quotient rule',
    'For a fraction $f(x)/g(x)$, differentiate bottom times derivative of top minus top times derivative of bottom, then divide by bottom squared.',
    {
      type: 'formula',
      label: 'Quotient rule',
      latex: '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right]=\\frac{g(x)f\\prime(x)-f(x)g\\prime(x)}{[g(x)]^2}',
      explanation: 'The denominator factor is written first in the numerator: $g f\\prime-f g\\prime$. The denominator is squared. The rule applies only where $g(x)\\ne0$, because the original quotient must be defined.',
    },
    {
      type: 'trap',
      title: 'Keep the subtraction order',
      markdown: 'The numerator is bottom times derivative of top, minus top times derivative of bottom. Reversing these two terms changes the sign of the result.',
    },
  ),
  explainedPage(
    19,
    'Example 5: differentiate a quotient',
    'For $y=((x+1)(x+2))/(x+3)$, identify the entire top as the numerator and $x+3$ as the denominator. The input $x=-3$ is excluded.',
    {
      type: 'formula',
      label: 'Set numerator and denominator',
      latex: 'u(x)=(x+1)(x+2),\\quad v(x)=x+3,\\quad y=\\frac{u(x)}{v(x)}',
      explanation: 'Use the quotient rule with $u\\prime(x)=2x+3$ and $v\\prime(x)=1$. The original denominator $x+3$ cannot equal zero, so $x\\ne-3$.',
    },
    {
      type: 'recognition',
      title: 'Differentiate the full numerator',
      markdown: 'The top is itself a product. Its derivative is $(x+1)+(x+2)=2x+3$ by the product rule (or by first expanding it to $x^2+3x+2$).',
    },
  ),
  explainedPage(
    20,
    'Example 5 solution: apply and simplify the quotient rule',
    'The derivative simplifies to $(x^2+6x+7)/(x+3)^2$, with $x\\ne-3$.',
    {
      type: 'worked-example',
      title: 'Substitute, expand, and preserve the restriction',
      steps: [
        'Let $u=(x+1)(x+2)$ and $v=x+3$. Then $u\\prime=2x+3$ and $v\\prime=1$.',
        'Apply the rule: $y\\prime=[v u\\prime-u v\\prime]/v^2=[(x+3)(2x+3)-(x+1)(x+2)(1)]/(x+3)^2$.',
        'Expand the first product: $(x+3)(2x+3)=2x^2+9x+9$. Expand the second: $(x+1)(x+2)=x^2+3x+2$.',
        'Subtract carefully: $(2x^2+9x+9)-(x^2+3x+2)=x^2+6x+7$.',
      ],
      conclusion: '$y\\prime=(x^2+6x+7)/(x+3)^2$, for $x\\ne-3$.',
    },
    {
      type: 'trap',
      title: 'Do not lose the original domain restriction',
      markdown: 'Even if a simplified derivative expression can be evaluated at an excluded point, it does not make the original function defined there. Here $x=-3$ must remain excluded.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: a quick rule selector',
      markdown: '- **Definition:** $f\\prime(x)=\\lim_{h\\to0}[f(x+h)-f(x)]/h$; rationalize a square-root difference when it creates $0/0$.  \n- **Term-by-term rules:** constants go to 0; keep coefficients and signs; use $d(x^n)/dx=nx^{n-1}$.  \n- **Product:** $f g\\prime+g f\\prime$.  \n- **Quotient:** $(g f\\prime-f g\\prime)/g^2$, and exclude inputs where $g=0$.  \n- **Domains:** check where the original function and its derivative are defined. Differentiability implies continuity, but continuity does not guarantee differentiability.  \nThis lesson follows the archived Fall 2025–2026 slides; compare it with the current Moodle version when available.',
    },
  ),
  visualOnlyPage(21, 'Thank you — closing slide', 'This final slide is a thank-you and questions graphic. It contains no further mathematical content.'),
];

export const mathematics1Lecture9Lesson: Lesson = {
  id: 'mathematics-1-lecture-9-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 9 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 9 (1).pdf',
  title: 'Archived Lecture 9: Differentiation',
  sourcePageCount: 21,
  pages,
  lastReviewed: '2026-10-14',
};
