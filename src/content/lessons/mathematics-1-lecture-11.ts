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
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. This guide follows that archived copy; compare it with current Moodle material when available.',
  ),
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section.'),
  visualOnlyPage(3, 'Implicit differentiation — section divider', 'This slide introduces implicit differentiation but contains no definition or worked calculation.'),
  explainedPage(
    4,
    'Implicit relations: when x and y are linked together',
    'An equation relating x and y may not be written as one simple formula y=f(x). We can still find the slope dy/dx by differentiating the relation while treating y as a function of x.',
    {
      type: 'formula',
      label: 'Examples of implicit equations',
      latex: 'x^2+y^2-25=0,\\qquad y^2-x=0,\\qquad x^3+y^3-9xy=0',
      explanation: 'These equations connect the variables without always spelling out y as a single expression. For example, x²+y²=25 can be written as y=√(25−x²) on the upper half of the circle or y=−√(25−x²) on the lower half. Both branches obey the same original relation.',
    },
    {
      type: 'foundation',
      title: 'What implicit differentiation does',
      markdown: 'Differentiate both sides with respect to x, treating y as a changing quantity y(x). Whenever you differentiate a term containing y, include y′ by the chain rule. Then rearrange to solve for y′=dy/dx.',
    },
    {
      type: 'recognition',
      title: 'Look for y mixed into an equation',
      markdown: 'If x and y appear together and solving for y first would be difficult or would create multiple branches, implicit differentiation is often the direct route to the tangent slope.',
    },
  ),
  explainedPage(
    5,
    'A three-step method for implicit differentiation',
    'Differentiate the whole relation, collect all terms containing y′ together, then isolate y′.',
    {
      type: 'foundation',
      title: 'Follow the slide’s procedure',
      markdown: '1. Differentiate each side with respect to x, remembering that y depends on x.  \n2. Move the terms containing y′ to one side and the remaining terms to the other.  \n3. Divide by the coefficient of y′ to solve for dy/dx, provided that coefficient is not zero.',
    },
    {
      type: 'trap',
      title: 'Every differentiated y needs a chain-rule factor',
      markdown: 'For example, d(y²)/dx=2y y′, not just 2y. The variable y changes as x changes, so its own rate y′ must be included.',
    },
  ),
  explainedPage(
    6,
    'Example 1: find the slope from an implicit equation',
    'For the relation y²−2xy+x³−10=0, differentiate each term with respect to x and use the product rule on xy.',
    {
      type: 'formula',
      label: 'Implicit relation used in the solution',
      latex: 'y^2-2xy+x^3-10=0',
      explanation: 'Treat y as y(x). In the product xy, both x and y vary with x; its derivative is y+x y′. The constant −10 differentiates to zero.',
    },
    {
      type: 'worked-example',
      title: 'Differentiate, collect y′ terms, then divide',
      steps: [
        'Differentiate y² to get 2y y′. For −2xy, use the product rule: −2(xy′+y). Differentiate x³ to get 3x²; the constant has derivative 0.',
        'Set the derivative equal to zero: 2y y′−2x y′−2y+3x²=0.',
        'Move the terms without y′ to the other side: 2y y′−2x y′=2y−3x².',
        'Factor out y′: (2y−2x)y′=2y−3x².',
        'Divide by 2y−2x to isolate the derivative.',
      ],
      conclusion: 'dy/dx=y′=(2y−3x²)/(2y−2x), at points where 2y−2x is nonzero.',
    },
    {
      type: 'source-note',
      text: 'Source correction: the question line appears to print an extra “y =” before the relation. The solution differentiates y²−2xy+x³−10=0, which is the coherent implicit equation used here.',
    },
  ),
  visualOnlyPage(7, 'Second- and higher-order derivatives — section divider', 'This slide names the next topic. Definitions and examples of higher derivatives begin on source page 8.'),
  explainedPage(
    8,
    'The second derivative: differentiate the first derivative again',
    'The second derivative y′′ is the derivative of y′. For y=x⁶, first y′=6x⁵, then y′′=30x⁴.',
    {
      type: 'formula',
      label: 'Common notations for the second derivative',
      latex: 'f\\prime\\prime(x)=y\\prime\\prime=\\frac{d^2y}{dx^2}=\\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)=\\frac{dy\\prime}{dx}=D^2f(x)',
      explanation: 'The superscript 2 in d²y/dx² means “differentiate twice”; it does not mean square the first derivative. In operator notation, D² means apply the derivative operation two times.',
    },
    {
      type: 'worked-example',
      title: 'Differentiate x⁶ two times',
      steps: [
        'Start with y=x^6.',
        'First derivative: y′=6x^5.',
        'Differentiate the new function 6x^5: y′′=30x^4.',
      ],
      conclusion: 'The second derivative is y′′=30x^4.',
    },
    {
      type: 'trap',
      title: 'The notation d²y/dx² is not a fraction squared',
      markdown: 'Read d²y/dx² as the second derivative with respect to x. It represents differentiating y once to get y′ and then differentiating again.',
    },
  ),
  explainedPage(
    9,
    'Third derivative and nth-derivative notation',
    'Each higher derivative is found by differentiating the previous one. The nth derivative notation applies this process n times, where n is a positive integer.',
    {
      type: 'formula',
      label: 'Repeated derivative notation',
      latex: 'y\\prime\\prime\\prime=\\frac{d^3y}{dx^3},\\qquad y^{(n)}=\\frac{d}{dx}y^{(n-1)}=\\frac{d^ny}{dx^n}=D^ny',
      explanation: 'The third derivative is the derivative of y′′. In y^(n), parentheses distinguish the derivative order from an ordinary power such as y^n. The notation D^n means repeat differentiation n times.',
    },
    {
      type: 'recognition',
      title: 'Follow the derivative chain one step at a time',
      markdown: 'To find y^(4), write y′, then y′′, then y′′′, and finally differentiate y′′′. This keeps the order clear and reduces the chance of skipping a step.',
    },
  ),
  explainedPage(
    10,
    'Example 2: find the fourth derivative',
    'For y=x³−3x²+2, differentiate four times in sequence. The derivatives eventually become zero.',
    {
      type: 'formula',
      label: 'Function in Example 2',
      latex: 'y=x^3-3x^2+2',
      explanation: 'This is a polynomial of degree 3. Each differentiation lowers the degree of each nonconstant term by one, and differentiating a constant gives zero.',
    },
  ),
  explainedPage(
    11,
    'Example 2 solution: fourth and later derivatives',
    'The derivatives are y′=3x²−6x, y′′=6x−6, y′′′=6, and y^(4)=0. Every later derivative is also zero.',
    {
      type: 'worked-example',
      title: 'Differentiate successively',
      steps: [
        'First: y′=3x²−6x. The constant 2 becomes zero.',
        'Second: y′′=6x−6.',
        'Third: y′′′=6.',
        'Fourth: the derivative of the constant 6 is 0.',
      ],
      conclusion: 'y^(4)=0. Once a derivative becomes zero, every later derivative stays zero.',
    },
    {
      type: 'recognition',
      title: 'A degree-three polynomial loses all variable terms by the fourth derivative',
      markdown: 'A nonzero cubic becomes quadratic, then linear, then constant, then zero. This predicts the answer before finishing the arithmetic.',
    },
  ),
  explainedPage(
    12,
    'Example 3: find the fourth derivative of a quartic',
    'For y=2x⁴−5x³+x²−3x+1, differentiate term by term four times; the fourth derivative will be a constant.',
    {
      type: 'formula',
      label: 'Function in Example 3',
      latex: 'y=2x^4-5x^3+x^2-3x+1',
      explanation: 'The x⁴ term is the only term that remains nonzero after four differentiations. Keep all terms through the earlier derivative steps so you can see that happen.',
    },
  ),
  explainedPage(
    13,
    'Example 3 solution: the fourth derivative is 48',
    'Successive derivatives are 8x³−15x²+2x−3, 24x²−30x+2, 48x−30, then 48.',
    {
      type: 'worked-example',
      title: 'Keep differentiating the whole polynomial',
      steps: [
        'First derivative: (2x⁴)′=8x³, (−5x³)′=−15x², (x²)′=2x, (−3x)′=−3, and 1 becomes 0. Thus y′=8x³−15x²+2x−3.',
        'Second derivative: y′′=24x²−30x+2.',
        'Third derivative: y′′′=48x−30.',
        'Fourth derivative: y^(4)=48.',
      ],
      conclusion: 'The fourth derivative is the constant 48.',
    },
  ),
  explainedPage(
    14,
    'Example 4: find a second derivative from an implicit relation',
    'For 2x³−3y²=8, first find y′ implicitly. Then differentiate the expression for y′ to obtain y′′.',
    {
      type: 'formula',
      label: 'Relation in Example 4',
      latex: '2x^3-3y^2=8',
      explanation: 'Because y depends on x, differentiating −3y² introduces y′. The final expression for y′′ is written in terms of both x and y.',
    },
    {
      type: 'recognition',
      title: 'A second implicit derivative has two stages',
      markdown: 'First obtain y′ from the original equation. Then differentiate that formula with respect to x, still treating y as a function of x; the quotient rule will include another y′.',
    },
  ),
  explainedPage(
    15,
    'Example 4 solution: differentiate y′ once more',
    'Implicit differentiation gives y′=x²/y. A second differentiation gives y′′=2x/y−x⁴/y³, where y≠0.',
    {
      type: 'worked-example',
      title: 'Stage 1: find the first derivative',
      steps: [
        'Differentiate 2x³−3y²=8: 6x²−6y y′=0.',
        'Divide by 6: x²−y y′=0.',
        'Solve for y′: y′=x²/y, provided y≠0.',
      ],
      conclusion: 'The first derivative is y′=x²/y.',
    },
    {
      type: 'worked-example',
      title: 'Stage 2: differentiate the quotient',
      steps: [
        'Differentiate y′=x²/y with the quotient rule: y′′=[2xy−x²y′]/y².',
        'Split the terms: y′′=2x/y−(x²/y²)y′.',
        'Substitute y′=x²/y into the remaining y′ term: y′′=2x/y−(x²/y²)(x²/y).',
        'Multiply the powers: (x²/y²)(x²/y)=x⁴/y³.',
      ],
      conclusion: 'y′′=2x/y−x⁴/y³, for points on the relation where y≠0.',
    },
    {
      type: 'trap',
      title: 'Do not treat y as a constant in the quotient',
      markdown: 'When differentiating x²/y, the denominator changes too. The quotient rule’s numerator includes −x²y′; omitting that term gives the wrong second derivative.',
    },
  ),
  explainedPage(
    16,
    'Example 5: prove an identity involving y′ and y′′',
    'Starting from y²−2x³−3x=1, differentiate the relation twice. The second differentiation produces the exact combination required in the statement.',
    {
      type: 'formula',
      label: 'Given relation and target',
      latex: 'y^2-2x^3-3x=1,\\qquad \\text{prove } yy\\prime\\prime+(y\\prime)^2-6x=0',
      explanation: 'The goal is to show the left-hand expression equals zero for any differentiable y(x) satisfying the original relation. The first derivative is needed as an intermediate step.',
    },
    {
      type: 'recognition',
      title: 'When the target contains y′′, differentiate twice',
      markdown: 'A single differentiation of the given equation creates y′. Differentiating that result once more creates y′′ and (y′)², the two derivative terms that appear in the target.',
    },
  ),
  explainedPage(
    17,
    'Example 5 solution: differentiate twice and divide by 2',
    'The second differentiation gives 2y y′′+2(y′)²−12x=0. Dividing every term by 2 proves the required identity.',
    {
      type: 'worked-example',
      title: 'Differentiate the relation two times',
      steps: [
        'Start from y²−2x³−3x=1 and differentiate: 2y y′−6x²−3=0.',
        'Differentiate again. For 2y y′, use the product rule: its derivative is 2(y′)²+2y y′′. The derivative of −6x²−3 is −12x.',
        'Thus 2(y′)²+2y y′′−12x=0.',
        'Divide each term by 2 and reorder: y y′′+(y′)²−6x=0.',
      ],
      conclusion: 'This is exactly the expression to be proved.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: implicit and higher derivatives',
      markdown: '- **Implicit differentiation:** differentiate the whole equation, treating y as y(x), then gather and solve for y′.  \n- **Second derivative:** y′′ is the derivative of y′; d²y/dx² means differentiate twice.  \n- **Higher derivatives:** keep differentiating the previous result; y^(n)=dⁿy/dxⁿ.  \n- **Implicit second derivatives:** first solve for y′, then differentiate that formula and substitute y′ where needed. Keep conditions such as y≠0 when dividing by y.  \nThis guide follows the archived Fall 2025–2026 lecture; compare it with the current Moodle version when available.',
    },
  ),
  visualOnlyPage(18, 'Thank you — closing slide', 'This final slide is a thank-you and questions graphic. It contains no further mathematics.'),
];

export const mathematics1Lecture11Lesson: Lesson = {
  id: 'mathematics-1-lecture-11-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 11 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 11 (1).pdf',
  title: 'Archived Lecture 11: Implicit and Higher-Order Derivatives',
  sourcePageCount: 18,
  pages,
  lastReviewed: '2026-10-14',
};
