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
    'The cover identifies Mathematics (1), the Fall Semester, year 2025–2026, and the listed instructors. It contains no lesson explanation. This is an archived copy; compare it with the current Moodle lecture when that version is available.',
  ),
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section. The revision question begins on source page 3.'),
  explainedPage(
    3,
    'Revision: substitute values into a function',
    'To find $f(a)$, replace every $x$ in the rule with the entire input $a$, then simplify. For this page, $f(x)=x^2-2x+1$.',
    {
      type: 'foundation',
      title: 'What the notation asks you to do',
      markdown: 'The expression $f(1)$ means “put 1 wherever the rule has $x$.” The same substitution works when the input is an expression, such as $-x$, $x+h$, or $g(x)$. Use parentheses around a multi-part input before squaring or multiplying it.',
    },
    {
      type: 'worked-example',
      title: 'Evaluate the numerical inputs',
      steps: [
        '$f(1)=1^2-2(1)+1=1-2+1=0$.',
        '$f(0)=0^2-2(0)+1=1$.',
        '$f(-2)=(-2)^2-2(-2)+1=4+4+1=9$. The square of $-2$ is positive 4, and subtracting $2(-2)$ adds 4.',
      ],
      conclusion: '$f(1)=0$, $f(0)=1$, and $f(-2)=9$.',
    },
    {
      type: 'worked-example',
      title: 'Substitute expressions instead of numbers',
      steps: [
        'For $f(-x)$, replace each $x$ by $-x$: $(-x)^2-2(-x)+1=x^2+2x+1$. The parentheses show that the whole input is negative.',
        'For $f(t)$, replace each $x$ by $t$: $t^2-2t+1$. The letter $t$ is simply another possible input.',
        'For $f(x+h)$, replace each $x$ by $(x+h)$: $(x+h)^2-2(x+h)+1$. Expand carefully: $x^2+2xh+h^2-2x-2h+1$.',
        'For $f(g(x))$, the input is the output of another function: $[g(x)]^2-2g(x)+1$. The slide does not define $g$, so this is as far as it can be evaluated.',
      ],
      conclusion: 'Substitution changes the input of the rule; it does not change the rule itself.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'When the input is $-x$ or $x+h$, put parentheses around it first. For example, $(-x)^2=x^2$, while forgetting the parentheses can lead you to mishandle the sign.',
    },
  ),
  visualOnlyPage(4, 'Operations of Functions — section divider', 'This title slide introduces the next section. The function-operation rules begin on source page 5.'),
  explainedPage(
    5,
    'Adding, subtracting, and multiplying functions',
    'Combine two functions by doing the same operation to their outputs: $(f+g)(x)=f(x)+g(x)$, $(f-g)(x)=f(x)-g(x)$, and $(fg)(x)=f(x)g(x)$.',
    {
      type: 'foundation',
      title: 'Read the notation in two layers',
      markdown: 'The left-side $f+g$ names a **new function**. On the right, $f(x)+g(x)$ adds the two numerical outputs at input $x$. The same idea applies to subtraction and multiplication. The notation $fg$ or $f\\cdot g$ means multiply the outputs; it does not mean compose the functions.',
    },
    {
      type: 'worked-example',
      title: 'A small example of the rule',
      givens: '$f(x)=x+2$ and $g(x)=3x$',
      steps: [
        'Add: $(f+g)(x)=f(x)+g(x)=(x+2)+3x=4x+2$.',
        'Subtract in the stated order: $(f-g)(x)=f(x)-g(x)=(x+2)-3x=2-2x$.',
        'Multiply the outputs: $(fg)(x)=f(x)g(x)=(x+2)(3x)=3x^2+6x$.',
      ],
      conclusion: 'Use each function’s formula, then perform the named operation on the results.',
    },
    {
      type: 'recognition',
      title: 'How to choose the rule',
      markdown: 'If the question says **sum**, add $f(x)$ and $g(x)$. If it says **difference**, subtract in the order shown. If it says **product**, multiply. For all three operations, an input must be allowed in both original functions.',
    },
  ),
  explainedPage(
    6,
    'Quotients, constant multiples, and domains',
    'For a quotient, divide the outputs and exclude every input that makes the bottom function zero. For sums, differences, and products, use only inputs allowed by both functions.',
    {
      type: 'formula',
      label: 'Quotient and constant multiple',
      latex: '\\left(\\frac{f}{g}\\right)(x)=\\frac{f(x)}{g(x)},\\quad g(x)\\ne0;\\qquad (cf)(x)=c\\,f(x)',
      explanation: 'The quotient requires both functions to be defined and its denominator $g(x)$ to be nonzero. Multiplying a function by a constant $c$ scales each output by that constant.',
    },
    {
      type: 'foundation',
      title: 'Domain means the allowed inputs',
      markdown: 'The **domain** $D_f$ is the set of inputs where $f$ is defined. The overlap $D_f\\cap D_g$ (read “$D_f$ intersect $D_g$”) contains inputs allowed by both. The slide gives $D_{f+g}=D_{f-g}=D_{fg}=D_f\\cap D_g$ and $D_{f/g}=\\{x\\in D_f\\cap D_g:g(x)\\ne0\\}$.',
    },
    {
      type: 'worked-example',
      title: 'Why division needs an extra check',
      givens: '$f(x)=x+1$ and $g(x)=x-2$, both defined for every real $x$',
      steps: [
        'For $f+g$, $f-g$, or $fg$, every real input works because both functions are defined for every real number.',
        'For $f/g$, start with $f(x)/g(x)=(x+1)/(x-2)$.',
        'The denominator is zero at $x=2$, since $g(2)=2-2=0$. Exclude that input.',
      ],
      conclusion: 'The quotient has domain $\\mathbb R\\setminus\\{2\\}$. A denominator may never equal zero.',
    },
    {
      type: 'trap',
      title: 'Keep the original restrictions',
      markdown: 'Even if algebra later cancels a factor, do not add back an input that made an original function or denominator undefined. Simplifying a formula does not change its original domain.',
    },
  ),
  explainedPage(
    7,
    'Example 1: find the domains of two square-root functions',
    'For a real square root, the expression under the radical must be at least zero. Apply that condition separately to each function.',
    {
      type: 'formula',
      label: 'Functions on the slide',
      latex: 'f(x)=\\sqrt{x},\\qquad g(x)=\\sqrt{1-x}',
      explanation: 'A square-root symbol here means the nonnegative real square root. The expression beneath the radical is called the radicand.',
    },
    {
      type: 'worked-example',
      title: 'Set up the two domain conditions',
      steps: [
        'For $f(x)=\\sqrt{x}$, require $x\\ge0$. So $D_f=[0,\\infty)$.',
        'For $g(x)=\\sqrt{1-x}$, require $1-x\\ge0$. Subtract 1 and reverse the sign by multiplying by $-1$: $x\\le1$. So $D_g=(-\\infty,1]$.',
      ],
      conclusion: 'The left square root allows nonnegative inputs; the right one allows inputs no larger than 1.',
    },
  ),
  explainedPage(
    8,
    'Example 1: overlap the domains',
    'An input for a combined function must be allowed in both $f$ and $g$. The overlap of $[0,\\infty)$ and $(-\\infty,1]$ is $[0,1]$.',
    {
      type: 'foundation',
      title: 'How to read the interval notation',
      markdown: 'A square bracket includes its endpoint; a round parenthesis excludes it. Thus $[0,\\infty)$ includes 0, and $(-\\infty,1]$ includes 1. The symbol $\\cap$ means “in both sets at once.”',
    },
    {
      type: 'worked-example',
      title: 'Find the shared inputs',
      steps: [
        'The condition from $f$ is $x\\ge0$.',
        'The condition from $g$ is $x\\le1$.',
        'Both are true when $0\\le x\\le1$.',
      ],
      conclusion: '$D_f\\cap D_g=[0,1]$. Every sum, difference, or product of these functions therefore has domain $[0,1]$.',
    },
    {
      type: 'recognition',
      title: 'Quick way to picture it',
      markdown: 'Imagine one number line for each condition: keep the numbers that appear on both. The shared segment runs from 0 to 1, including both ends.',
    },
  ),
  explainedPage(
    9,
    'Example 1: table of combined functions and domains',
    'The table applies the same two square-root functions to each operation. The quotient loses the endpoint where its denominator is zero.',
    {
      type: 'worked-example',
      title: 'Read the table row by row',
      steps: [
        '$(f+g)(x)=\\sqrt{x}+\\sqrt{1-x}$, and $(f-g)(x)=\\sqrt{x}-\\sqrt{1-x}$. Each has domain $[0,1]$.',
        'The reversed difference is $(g-f)(x)=\\sqrt{1-x}-\\sqrt{x}$, also with domain $[0,1]$. Reversing subtraction changes the output, not the shared domain.',
        'The product is $(fg)(x)=\\sqrt{x}\\,\\sqrt{1-x}=\\sqrt{x(1-x)}$, with domain $[0,1]$.',
        'For $f/g$, the denominator is $g(x)=\\sqrt{1-x}$. It is zero at $x=1$, so remove 1 from the shared interval: the domain is $[0,1)$.',
        'For $g/f$, the denominator is $f(x)=\\sqrt{x}$. It is zero at $x=0$, so remove 0: the domain is $(0,1]$.',
      ],
      conclusion: 'Always check which function is in the denominator. The two quotient domains differ because their denominators differ.',
    },
    {
      type: 'trap',
      title: 'Do not exclude both endpoints automatically',
      markdown: 'For $f/g$, only $g(x)=0$ is forbidden, so $x=0$ remains allowed. For $g/f$, only $f(x)=0$ is forbidden, so $x=1$ remains allowed.',
    },
  ),
  explainedPage(
    10,
    'Example 2: combine a line and a square root',
    'The exercise uses $f(x)=\\frac{x-3}{2}$ and $g(x)=\\sqrt{x}$. Find each new rule, then check its domain.',
    {
      type: 'foundation',
      title: 'Start with the original domains',
      markdown: '$f$ is a linear expression, so it is defined for every real $x$: $D_f=\\mathbb R$. For $g(x)=\\sqrt{x}$, require $x\\ge0$: $D_g=[0,\\infty)$. Their shared domain is $[0,\\infty)$.',
    },
    {
      type: 'recognition',
      title: 'What the question wants',
      markdown: 'There are four separate operations: add, subtract, multiply, and divide. Write the operation using $f(x)$ and $g(x)$ first; then substitute the formulas. For division, also require $g(x)\\ne0$.',
    },
  ),
  explainedPage(
    11,
    'Example 2: work out all four operations',
    'Use the shared domain $[0,\\infty)$ for addition, subtraction, and multiplication. For division, exclude $x=0$ because $\\sqrt0=0$.',
    {
      type: 'worked-example',
      title: 'Add and subtract',
      steps: [
        '$(f+g)(x)=f(x)+g(x)=\\frac{x-3}{2}+\\sqrt{x}$. The terms do not combine into a simpler like-term expression. Its domain is $[0,\\infty)$.',
        '$(f-g)(x)=f(x)-g(x)=\\frac{x-3}{2}-\\sqrt{x}$. Keep the minus sign before the whole square-root term. Its domain is $[0,\\infty)$.',
      ],
      conclusion: 'Both expressions need $x$ allowed by the square root, so $x$ may be zero.',
    },
    {
      type: 'worked-example',
      title: 'Multiply and divide',
      steps: [
        '$(fg)(x)=f(x)g(x)=\\frac{x-3}{2}\\sqrt{x}=\\frac{(x-3)\\sqrt{x}}{2}$. Its domain is $[0,\\infty)$.',
        '$(f/g)(x)=\\frac{f(x)}{g(x)}=\\frac{(x-3)/2}{\\sqrt{x}}=\\frac{x-3}{2\\sqrt{x}}$.',
        'For this quotient, $x$ must first be at least 0, and the denominator $\\sqrt{x}$ cannot be zero. Therefore $x>0$.',
      ],
      conclusion: 'The quotient domain is $(0,\\infty)$; the other three domains are $[0,\\infty)$.',
    },
    {
      type: 'trap',
      title: 'Check zero after taking the square root',
      markdown: '$x=0$ is fine in $\\sqrt{x}$ by itself, but not when $\\sqrt{x}$ is the denominator. A denominator must be nonzero.',
    },
  ),
  explainedPage(
    12,
    'Example 3: combine two polynomials',
    'Here $f(x)=x^2-3x+9$ and $g(x)=4-7x$. Both are polynomials, so each is defined for every real input.',
    {
      type: 'foundation',
      title: 'Set the domain before calculating',
      markdown: 'Addition, subtraction, and multiplication can use all real numbers because both formulas work for all real $x$. Division has one additional restriction: $4-7x$ must not be zero.',
    },
    {
      type: 'recognition',
      title: 'A sign cue for subtraction',
      markdown: 'When subtracting $g(x)=4-7x$, place the whole expression in parentheses: $f(x)-(4-7x)$. The outside minus changes both signs inside.',
    },
  ),
  explainedPage(
    13,
    'Example 3: simplify and find each domain',
    'Add or subtract like terms, multiply the two outputs, and exclude the zero of $g$ only from the quotient domain.',
    {
      type: 'worked-example',
      title: 'Add and subtract',
      steps: [
        '$(f+g)(x)=(x^2-3x+9)+(4-7x)$. Collect the $x$ terms and constants: $x^2-10x+13$. Its domain is $\\mathbb R$.',
        '$(f-g)(x)=(x^2-3x+9)-(4-7x)$. Distribute the minus: $x^2-3x+9-4+7x=x^2+4x+5$. Its domain is $\\mathbb R$.',
      ],
      conclusion: 'The minus before $g(x)$ changes $-7x$ into $+7x$.',
    },
    {
      type: 'worked-example',
      title: 'Multiply and divide',
      steps: [
        '$(fg)(x)=(x^2-3x+9)(4-7x)$. The source leaves the product factored. Expanding gives $-7x^3+25x^2-75x+36$. Its domain is $\\mathbb R$.',
        '$(f/g)(x)=\\frac{x^2-3x+9}{4-7x}$. Solve $4-7x=0$: then $x=\\frac47$.',
        'Exclude $\\frac47$ from the quotient domain because it makes the denominator zero. The numerator does not cancel that restriction.',
      ],
      conclusion: 'The quotient domain is $\\mathbb R\\setminus\\{\\frac47\\}$; the sum, difference, and product domains are all $\\mathbb R$.',
    },
  ),
  explainedPage(
    14,
    'Check your knowledge: operations of functions',
    'For $f(x)=6x^2-2x$ and $g(x)=3-\\frac1x$, all four expressions must exclude $x=0$; the quotient must also exclude where $g(x)=0$.',
    {
      type: 'source-note',
      text: 'The slide gives the exercise but no worked answer. The walkthrough below is supplied to help you learn the method; it is not a quoted solution from the lecture.',
    },
    {
      type: 'worked-example',
      title: 'First find the original domains',
      steps: [
        '$f$ is a polynomial, so $D_f=\\mathbb R$. In $g(x)=3-\\frac1x$, division by $x$ means $x\\ne0$, so $D_g=\\mathbb R\\setminus\\{0\\}$.',
        'For addition, subtraction, and multiplication, the shared domain is therefore $\\mathbb R\\setminus\\{0\\}$.',
        'For the quotient, also solve $g(x)=0$: $3-\\frac1x=0$ gives $3x-1=0$ and $x=\\frac13$. So the quotient must exclude both 0 and $\\frac13$.',
      ],
      conclusion: 'The quotient domain is $\\mathbb R\\setminus\\{0,\\frac13\\}$.',
    },
    {
      type: 'worked-example',
      title: 'Write and simplify the four expressions',
      steps: [
        '$(f+g)(x)=6x^2-2x+3-\\frac1x$.',
        '$(f-g)(x)=6x^2-2x-(3-\\frac1x)=6x^2-2x-3+\\frac1x$.',
        '$(fg)(x)=(6x^2-2x)(3-\\frac1x)$. Factoring gives $2x(3x-1)\\cdot\\frac{3x-1}{x}=2(3x-1)^2$, with the original restriction $x\\ne0$ retained.',
        '$(f/g)(x)=\\frac{6x^2-2x}{3-1/x}=\\frac{2x(3x-1)}{(3x-1)/x}=2x^2$. This cancellation is valid only while $x\\ne0$ and $x\\ne\\frac13$.',
      ],
      conclusion: 'A simplified formula can hide excluded inputs. Keep the domain restrictions from the original expressions.',
    },
    {
      type: 'trap',
      title: 'Cancellation does not restore a forbidden input',
      markdown: 'The quotient simplifies to $2x^2$, but the original quotient was undefined at $x=\\frac13$ because $g(\\frac13)=0$. Its domain still excludes $\\frac13$.',
    },
  ),
  visualOnlyPage(15, 'Composite Functions — section divider', 'This title slide introduces composition. The definition begins on source page 16.'),
  explainedPage(
    16,
    'Composition: put one function inside another',
    'The composite $(f\\circ g)(x)=f(g(x))$ means apply $g$ first, then feed its output into $f$. The output of $g$ must be an allowed input for $f$.',
    {
      type: 'foundation',
      title: 'Read the circle carefully',
      markdown: 'The symbol $\\circ$ means **composition** here, not multiplication. In $f\\circ g$, the function closest to $x$ is applied first: find $g(x)$, then evaluate $f$ at that result.',
    },
    {
      type: 'worked-example',
      title: 'Follow the input through two steps',
      givens: '$f(u)=u^2$ and $g(x)=x+1$',
      steps: [
        'First apply $g$: the input $x$ becomes $g(x)=x+1$.',
        'Now use that entire output as the input to $f$: $f(g(x))=f(x+1)=(x+1)^2$.',
        'For the reverse order, $g(f(x))=g(x^2)=x^2+1$, which is generally different.',
      ],
      conclusion: 'Composition order matters: $f\\circ g$ usually is not the same function as $g\\circ f$.',
    },
    {
      type: 'recognition',
      title: 'Check the domain in the same order',
      markdown: 'Start with inputs allowed by the inside function $g$. Then keep only inputs whose output $g(x)$ lies in the domain of the outside function $f$.',
    },
  ),
  explainedPage(
    17,
    'Composition diagrams: a function machine and arrows',
    'Both diagrams show the same order: $x$ goes through $g$ first, producing $g(x)$; that result goes through $f$, producing $f(g(x))$.',
    {
      type: 'foundation',
      title: 'Read Figure 1.52 as two machines',
      markdown: 'The left diagram shows $x\\to g\\to g(x)\\to f\\to f(g(x))$. The output from the first box is not the final answer; it becomes the second box’s input.',
    },
    {
      type: 'foundation',
      title: 'Read Figure 1.53 as arrows between values',
      markdown: 'The lower arrow sends $x$ to $g(x)$. A second arrow sends $g(x)$ to $f(g(x))$. The curved arrow from $x$ directly to $f(g(x))$ represents the combined function $f\\circ g$.',
    },
    {
      type: 'trap',
      title: 'Do not read the order left to right from the symbols',
      markdown: 'The expression $f\\circ g$ is read “$f$ composed with $g$,” but you calculate the right-hand function first: $g$, then $f$.',
    },
  ),
  explainedPage(
    18,
    'Example 4: set up four compositions',
    'With $f(x)=\\sqrt{x}$ and $g(x)=x+1$, keep track of which formula is inside. Each composition also needs its own domain check.',
    {
      type: 'foundation',
      title: 'Know where each original function is defined',
      markdown: '$g(x)=x+1$ accepts every real input. $f(x)=\\sqrt{x}$ accepts only nonnegative inputs. These facts determine the domains after substitution.',
    },
    {
      type: 'recognition',
      title: 'A reliable setup',
      markdown: 'For $f\\circ g$, replace the $x$ in $f$ with the whole formula for $g(x)$. For $g\\circ f$, replace the $x$ in $g$ with the whole formula for $f(x)$. Parentheses help keep the replacement together.',
    },
  ),
  explainedPage(
    19,
    'Example 4: calculate the compositions and domains',
    'Substitute the inside function first. A square-root output must be nonnegative, so any composition whose final square root has a radicand needs that condition.',
    {
      type: 'worked-example',
      title: 'Compute all four, one at a time',
      steps: [
        '$(f\\circ g)(x)=f(g(x))=\\sqrt{x+1}$. Require $x+1\\ge0$, so $x\\ge-1$. Domain: $[-1,\\infty)$.',
        '$(g\\circ f)(x)=g(f(x))=\\sqrt{x}+1$. The input to $f$ requires $x\\ge0$. Domain: $[0,\\infty)$.',
        '$(f\\circ f)(x)=\\sqrt{\\sqrt{x}}=x^{1/4}$. The inner square root requires $x\\ge0$; its output is nonnegative, so it is allowed into the outer square root. Domain: $[0,\\infty)$.',
        '$(g\\circ g)(x)=g(x+1)=(x+1)+1=x+2$. A linear expression accepts every real $x$. Domain: $\\mathbb R$.',
      ],
      conclusion: 'The order changes both the formula and sometimes the domain.',
    },
    {
      type: 'trap',
      title: 'Do not stop after substituting',
      markdown: 'After finding the composite formula, check every square root or denominator that remains. The domain of the composite can be smaller than the domain of the inside function.',
    },
  ),
  explainedPage(
    20,
    'Example 5: compose a quadratic and a linear function',
    'The page gives $f(x)=x^2-1$ and $g(x)=3x+5$ and asks for both orders. Both functions accept every real input.',
    {
      type: 'recognition',
      title: 'The key is to substitute the entire inside rule',
      markdown: 'For $f\\circ g$, replace the $x$ in $f$ by $(3x+5)$. For $g\\circ f$, replace the $x$ in $g$ by $(x^2-1)$. The parentheses protect all terms of the replacement.',
    },
  ),
  explainedPage(
    21,
    'Example 5: expand each composition',
    'Substitution gives $f(g(x))=(3x+5)^2-1$ and $g(f(x))=3(x^2-1)+5$. Expand the square or distribute the 3 carefully.',
    {
      type: 'worked-example',
      title: 'First order: $f$ after $g$',
      steps: [
        '$(f\\circ g)(x)=f(g(x))=f(3x+5)=(3x+5)^2-1$.',
        'Use $(a+b)^2=a^2+2ab+b^2$: $(3x+5)^2=9x^2+30x+25$.',
        'Subtract 1: $(f\\circ g)(x)=9x^2+30x+24$.',
      ],
      conclusion: 'Its domain is $\\mathbb R$ because this is a polynomial.',
    },
    {
      type: 'worked-example',
      title: 'Reverse order: $g$ after $f$',
      steps: [
        '$(g\\circ f)(x)=g(f(x))=g(x^2-1)=3(x^2-1)+5$.',
        'Distribute 3 across both terms: $3x^2-3+5$.',
        'Combine constants: $(g\\circ f)(x)=3x^2+2$.',
      ],
      conclusion: 'Its domain is also $\\mathbb R$. These two compositions are not equal.',
    },
    {
      type: 'trap',
      title: 'A square applies to the whole input',
      markdown: 'In $(3x+5)^2$, square the whole binomial. It is not $9x^2+25$; the middle term $30x$ comes from $2(3x)(5)$.',
    },
  ),
  explainedPage(
    22,
    'Check your knowledge: composition and domain',
    'Work in two passes: substitute to get the formula, then enforce the input restrictions of the inside and outside functions.',
    {
      type: 'source-note',
      text: 'The slide gives two composition exercises without answers. The walkthrough is supplemental practice support, written from the functions shown on this page.',
    },
    {
      type: 'worked-example',
      title: '1. $f(x)=25-x^2$ and $g(x)=\\sqrt{x-3}$',
      steps: [
        'For $(f\\circ g)(x)$, substitute $\\sqrt{x-3}$ for the input of $f$: $25-(\\sqrt{x-3})^2=25-(x-3)=28-x$.',
        'The inside function requires $x-3\\ge0$, so $x\\ge3$. The polynomial $f$ accepts any output from $g$. Domain: $[3,\\infty)$.',
        'For $(g\\circ f)(x)$, substitute $25-x^2$ into $g$: $\\sqrt{(25-x^2)-3}=\\sqrt{22-x^2}$.',
        'Require the radicand $22-x^2\\ge0$. This means $x^2\\le22$, so $-\\sqrt{22}\\le x\\le\\sqrt{22}$.',
      ],
      conclusion: 'The domains are $[3,\\infty)$ for $f\\circ g$ and $[-\\sqrt{22},\\sqrt{22}]$ for $g\\circ f$.',
    },
    {
      type: 'worked-example',
      title: '2. $f(x)=\\frac{x}{3x+2}$ and $g(x)=\\frac2x$',
      steps: [
        'For $(f\\circ g)(x)$, substitute $2/x$ into $f$: $\\frac{2/x}{3(2/x)+2}=\\frac{2/x}{(6+2x)/x}=\\frac1{x+3}$.',
        'The original inside function requires $x\\ne0$. Also, its output $2/x$ cannot equal $-2/3$, the excluded input of $f$; solving $2/x=-2/3$ gives $x=-3$. Domain: $\\mathbb R\\setminus\\{0,-3\\}$.',
        'For $(g\\circ f)(x)$, substitute $x/(3x+2)$ into $g$: $\\frac{2}{x/(3x+2)}=\\frac{2(3x+2)}x=6+\\frac4x$.',
        'The input to $f$ requires $3x+2\\ne0$, so $x\\ne-2/3$. Since the output of $f$ is the denominator in $g$, also require $f(x)\\ne0$, which excludes $x=0$.',
      ],
      conclusion: 'The domain of $g\\circ f$ is $\\mathbb R\\setminus\\{-2/3,0\\}$. Keep restrictions from the original nested functions.',
    },
    {
      type: 'trap',
      title: 'A simplified composite can hide restrictions',
      markdown: 'Even when the final expression simplifies, list the input restrictions before canceling. For example, $2/x$ is undefined at 0, and $f$ is undefined at input $-2/3$.',
    },
  ),
  visualOnlyPage(23, 'Properties of Functions — section divider', 'This title slide introduces even and odd functions. Their definitions begin on source page 24.'),
  explainedPage(
    24,
    'Even and odd functions: the test',
    'Replace $x$ by $-x$. If the result equals $f(x)$, the function is even; if it equals $-f(x)$, it is odd.',
    {
      type: 'formula',
      label: 'Definitions from the slide',
      latex: '\\text{even: }f(-x)=f(x),\\qquad \\text{odd: }f(-x)=-f(x)',
      explanation: 'The equality must hold for every input in the function’s domain, and both $x$ and $-x$ must be allowed inputs.',
    },
    {
      type: 'foundation',
      title: 'A first pattern from powers',
      markdown: 'For an even power, the negative signs pair up: $(-x)^2=x^2$ and $(-x)^4=x^4$. For an odd power, one negative sign remains: $(-x)^3=-x^3$. Thus $x^2$ is even and $x^3$ is odd. A sum of terms can still be neither; test the whole function.',
    },
    {
      type: 'recognition',
      title: 'Use this three-line check',
      markdown: '1. Write $f(-x)$ by replacing every $x$. 2. Simplify signs and powers. 3. Compare with both $f(x)$ and $-f(x)$.',
    },
  ),
  explainedPage(
    25,
    'Even/odd symmetry in graphs',
    'An even graph mirrors across the $y$-axis. An odd graph matches itself after a half-turn (180° rotation) around the origin.',
    {
      type: 'foundation',
      title: 'Why the even graph mirrors',
      markdown: 'For an even function, $f(-x)=f(x)$. So if $(x,y)$ is on the graph, then $(-x,y)$ is too: the horizontal coordinate changes sign, but the height stays the same. The slide illustrates this with $y=x^2$.',
    },
    {
      type: 'foundation',
      title: 'Why the odd graph turns around the origin',
      markdown: 'For an odd function, $f(-x)=-f(x)$. If $(x,y)$ is on the graph, then $(-x,-y)$ is too: both coordinates change sign. A half-turn around $(0,0)$ pairs those points. The slide illustrates this with $y=x^3$.',
    },
    {
      type: 'trap',
      title: 'The domain must have matching opposite inputs',
      markdown: 'The test compares $x$ and $-x$, so the domain must contain both for every input being checked. A graph that does not have this matching domain cannot satisfy the usual even/odd definition.',
    },
  ),
  explainedPage(
    26,
    'Example 6: classify two functions',
    'The slide asks whether $x^2+1$ and $x^3+x$ are even, odd, or neither. Test each one by replacing $x$ with $-x$.',
    {
      type: 'recognition',
      title: 'Keep the examples separate',
      markdown: 'The left example is $f(x)=x^2+1$; the right example is $f(x)=x^3+x$. The same letter is reused for each separate test. Substitute $-x$ into every occurrence of $x$.',
    },
    {
      type: 'worked-example',
      title: 'Set up the first comparison',
      steps: [
        'For $x^2+1$, substitution gives $(-x)^2+1$.',
        'For $x^3+x$, substitution gives $(-x)^3+(-x)$.',
        'Simplify these expressions and compare them with the original and its negative; the following slide shows the results.',
      ],
      conclusion: 'Carefully keep the parentheses around $-x$ before applying each power.',
    },
  ),
  explainedPage(
    27,
    'Example 6: finish the even/odd tests',
    'The function $x^2+1$ is even because replacing $x$ by $-x$ leaves it unchanged. The function $x^3+x$ is odd because the result is its negative.',
    {
      type: 'worked-example',
      title: '1. $f(x)=x^2+1$',
      steps: [
        'Substitute $-x$: $f(-x)=(-x)^2+1$.',
        'Because a negative times a negative is positive, $(-x)^2=x^2$. Thus $f(-x)=x^2+1$.',
        'This is exactly $f(x)$, so the function is even.',
      ],
      conclusion: 'Its graph is symmetric across the $y$-axis.',
    },
    {
      type: 'worked-example',
      title: '2. $f(x)=x^3+x$',
      steps: [
        'Substitute $-x$: $f(-x)=(-x)^3+(-x)=-x^3-x$.',
        'Factor out $-1$: $-x^3-x=-(x^3+x)=-f(x)$.',
        'Therefore the function is odd.',
      ],
      conclusion: 'Its graph is symmetric around the origin.',
    },
    {
      type: 'trap',
      title: 'Do not drop the negative on odd powers',
      markdown: 'For odd powers, $(-x)^3=-x^3$, not $x^3$. The sign is the reason the second function is odd.',
    },
  ),
  visualOnlyPage(28, 'Blank transition slide', 'The page shows only the standard background and page label; there is no readable lesson content on this slide.'),
  explainedPage(
    29,
    'Check your knowledge: even, odd, or neither',
    'For $x^2-x$, replacing $x$ by $-x$ gives neither the original nor its negative. The rational function on the slide is odd.',
    {
      type: 'source-note',
      text: 'The slide asks both questions but provides no worked answers. The steps below are supplemental walkthroughs based on the expressions shown.',
    },
    {
      type: 'worked-example',
      title: '1. $f(x)=x^2-x$',
      steps: [
        'Substitute $-x$: $f(-x)=(-x)^2-(-x)=x^2+x$.',
        'This is not $f(x)=x^2-x$, so it is not even.',
        'Its negative is $-f(x)=-(x^2-x)=-x^2+x$, which is also not $f(-x)$.',
      ],
      conclusion: '$f(x)=x^2-x$ is neither even nor odd.',
    },
    {
      type: 'worked-example',
      title: '2. $h(x)=\\frac{x^3+3x}{x^4-3x^2+4}$',
      steps: [
        'The denominator never equals zero: set $u=x^2$ and complete the square, $x^4-3x^2+4=(u-\\frac32)^2+\\frac74>0$. Thus the domain is all real numbers and includes opposite inputs.',
        'Substitute $-x$. The numerator becomes $(-x)^3+3(-x)=-x^3-3x=-(x^3+3x)$.',
        'The denominator stays the same: $(-x)^4-3(-x)^2+4=x^4-3x^2+4$.',
        'So $h(-x)=-(x^3+3x)/(x^4-3x^2+4)=-h(x)$.',
      ],
      conclusion: '$h$ is odd.',
    },
    {
      type: 'recognition',
      title: 'A shortcut for an odd-over-even fraction',
      markdown: 'If the numerator changes sign under $x\\to -x$, the denominator stays the same, and the domain is symmetric, their quotient is odd. Still check that the denominator has no forbidden inputs that break the domain symmetry.',
    },
  ),
  visualOnlyPage(30, 'Types of Functions — section divider', 'This title slide introduces a short reference survey of common function families. The first family begins on source page 31.'),
  explainedPage(
    31,
    'Linear and constant functions',
    'A linear function has the form $f(x)=mx+b$: $m$ controls the line’s slope and $b$ is where it crosses the $y$-axis. If $m=0$, the function is constant.',
    {
      type: 'foundation',
      title: 'Decode slope and intercept',
      markdown: 'The **slope** $m$ describes how much $y$ changes when $x$ increases by 1: positive rises, negative falls, and a larger magnitude is steeper. The **intercept** $b$ is the output when $x=0$, so the graph crosses the vertical axis at $(0,b)$.',
    },
    {
      type: 'foundation',
      title: 'Read the two graphs',
      markdown: 'The pictured lines $y=mx$ have $b=0$, so they pass through the origin. Their different slopes change their direction and steepness. When $m=0$, $y=b$ is horizontal; the slide draws the example $y=\\frac32$. A constant function has the same output for every input.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'A first-degree expression such as $2x+3$ graphs as a straight line. If there is no $x$ term, such as $y=3/2$, the graph is a horizontal line.',
    },
  ),
  explainedPage(
    32,
    'Power functions with positive integer exponents',
    'The slide compares $f(x)=x^n$ for $n=1,2,3,4,5$. All are defined for every real $x$; odd and even powers have different symmetry and shapes.',
    {
      type: 'foundation',
      title: 'Read the exponent as a repeated power',
      markdown: 'In $x^n$, $n$ is the exponent and $x$ is the base. The graphs shown are $y=x$, $y=x^2$, $y=x^3$, $y=x^4$, and $y=x^5$.',
    },
    {
      type: 'foundation',
      title: 'Compare the curves',
      markdown: 'Each curve passes through $(0,0)$ and $(1,1)$. For $|x|<1$, raising $x$ to a larger positive integer power makes its magnitude smaller, so the curve lies closer to the $x$-axis. For $|x|>1$, a larger power grows faster in magnitude. Even powers are symmetric about the $y$-axis; odd powers are symmetric about the origin.',
    },
    {
      type: 'recognition',
      title: 'A parity cue from the exponent',
      markdown: 'For positive integer powers, even $n$ gives $(-x)^n=x^n$, while odd $n$ gives $(-x)^n=-x^n$. That connects the graph family to the even/odd test from the previous pages.',
    },
  ),
  explainedPage(
    33,
    'Negative power functions: reciprocals',
    'A negative exponent means “take the reciprocal”: $x^{-1}=1/x$ and $x^{-2}=1/x^2$. Both are undefined at $x=0$.',
    {
      type: 'worked-example',
      title: 'Compare the two graphs',
      steps: [
        '$y=1/x$ can be positive or negative. Its domain excludes 0, and its output can never be 0. Its two branches lie in quadrants I and III.',
        '$y=1/x^2$ is positive for every allowed $x$, because a nonzero number squared is positive. Its domain excludes 0 and its range is $y>0$.',
        'Both curves approach the coordinate axes far away or near $x=0$ without reaching them; the axes act as asymptotes.',
      ],
      conclusion: 'When a power is negative, rewrite it as a fraction and check that its denominator is not zero.',
    },
    {
      type: 'trap',
      title: 'Do not treat a negative exponent as a negative value',
      markdown: '$x^{-2}$ means $1/x^2$, not $-x^2$. For example, if $x=2$, then $2^{-2}=1/4$.',
    },
  ),
  explainedPage(
    34,
    'Polynomial functions',
    'A polynomial is a sum of constant multiples of nonnegative integer powers of $x$. Its domain is all real numbers; its degree is its highest power with a nonzero coefficient.',
    {
      type: 'formula',
      label: 'General polynomial form',
      latex: 'p(x)=a_nx^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0',
      explanation: 'The $a_i$ values are fixed numbers called coefficients. The exponent $n$ is a nonnegative integer. The coefficient on the highest power must not be zero when naming the degree.',
    },
    {
      type: 'foundation',
      title: 'Names by degree',
      markdown: 'Degree 1 gives a linear function, usually $ax+b$. Degree 2 gives a quadratic, $ax^2+bx+c$. Degree 3 gives a cubic, $ax^3+bx^2+cx+d$. Every polynomial has domain $(-\\infty,\\infty)$ because it uses no division by a variable or even root.',
    },
    {
      type: 'foundation',
      title: 'Read the three example graphs',
      markdown: 'The slide shows a cubic, a quartic polynomial, and the factored polynomial $(x-2)^4(x+1)^3(x-1)$. In the factored graph, zeros occur at $x=-1$, $x=1$, and $x=2$. The graph crosses at the odd powers $-1$ and $1$; it touches and turns at the even power $2$. These are visual clues about the factors.',
    },
    {
      type: 'trap',
      title: 'Degree means the largest power, not the number of terms',
      markdown: 'For $4x^3+2x+1$, the degree is 3 even though there are three terms. Look for the greatest exponent that has a nonzero coefficient.',
    },
  ),
  explainedPage(
    35,
    'Rational functions',
    'A rational function is a quotient of polynomials. Its denominator must not be zero, so check the denominator to find excluded inputs.',
    {
      type: 'formula',
      label: 'Definition and example on the slide',
      latex: 'f(x)=\\frac{p(x)}{q(x)},\\qquad q(x)\\ne0;\\qquad \\frac{2x^2-3}{7x+4}',
      explanation: 'Here $p$ and $q$ are polynomials. In the displayed example, $7x+4=0$ when $x=-4/7$, so that one input is excluded.',
    },
    {
      type: 'worked-example',
      title: 'Find the example’s domain',
      steps: [
        'Set the denominator equal to zero to find the forbidden input: $7x+4=0$.',
        'Subtract 4: $7x=-4$. Divide by 7: $x=-4/7$.',
        'Every other real number is allowed, so the domain is $\\mathbb R\\setminus\\{-4/7\\}$.',
      ],
      conclusion: 'The denominator, not the numerator, creates this restriction.',
    },
    {
      type: 'foundation',
      title: 'What the three graphs illustrate',
      markdown: 'The first graph has a vertical break at the forbidden denominator value. The middle example marks a horizontal line $y=5/3$ that the graph approaches. The other plotted rational function also has a vertical break where its denominator is zero. Lines a graph approaches are called asymptotes; a curve can approach one without touching it.',
    },
    {
      type: 'trap',
      title: 'A canceled factor still matters to the original domain',
      markdown: 'If a rational expression simplifies by canceling a factor, keep any input that made the original denominator zero excluded. The simplified formula alone may hide a hole in the original graph.',
    },
  ),
  explainedPage(
    36,
    'Algebraic functions',
    'An algebraic function is built from polynomials using addition, subtraction, multiplication, division, and roots. Rational functions are one kind of algebraic function.',
    {
      type: 'foundation',
      title: 'Read the examples and their fractional powers',
      markdown: 'The three plotted examples include $x^{1/3}(x-4)$, $\\frac34(x^2-1)^{2/3}$, and $x(1-x)^{2/5}$. A fractional exponent such as $1/3$ denotes a cube root; $2/5$ means take a fifth root and then square.',
    },
    {
      type: 'worked-example',
      title: 'Why these pictured examples allow real inputs',
      steps: [
        'The first uses a cube root, $x^{1/3}$. Cube roots of negative as well as positive real numbers are real.',
        'The second uses a cube root of $x^2-1$ and then squares it. The cube root is defined even when $x^2-1$ is negative.',
        'The third uses a fifth root of $1-x$. Fifth roots also accept negative values.',
      ],
      conclusion: 'These examples have real outputs for all real $x$. An even root, such as a square root, can impose a nonnegative-radicand condition; an odd root does not.',
    },
    {
      type: 'recognition',
      title: 'Check the type of root before finding a domain',
      markdown: 'An even root such as $\\sqrt{u}$ requires $u\\ge0$. An odd root such as $\\sqrt[3]{u}$ accepts any real $u$. If a denominator is also present, it must separately be nonzero.',
    },
  ),
  explainedPage(
    37,
    'Exponential functions',
    'An exponential function has the input in the exponent: $f(x)=a^x$ with $a>0$ and $a\\ne1$. Its domain is all real numbers and its output is always positive.',
    {
      type: 'foundation',
      title: 'Distinguish an exponential from a power function',
      markdown: 'In a power function such as $x^3$, the variable is the base. In an exponential function such as $2^x$, the variable is the exponent and the base is a fixed positive number. If $a=e$, the function $e^x$ is called the natural exponential function.',
    },
    {
      type: 'foundation',
      title: 'Read the graph behavior',
      markdown: 'Every exponential curve passes through $(0,1)$ because $a^0=1$. If $a>1$, it increases as $x$ increases. If $0<a<1$, it decreases. It approaches but never reaches $y=0$, so the range is $(0,\\infty)$.',
    },
    {
      type: 'formula',
      label: 'Exponent laws shown at the foot of the slide',
      latex: 'a^x a^y=a^{x+y},\\qquad a^{-x}=\\frac1{a^x},\\qquad (a^x)^y=a^{xy},\\qquad (ab)^x=a^xb^x',
      explanation: 'For positive bases, multiplying powers with the same base adds exponents, a negative exponent forms a reciprocal, a power of a power multiplies exponents, and a product raised to a power applies that power to both factors.',
    },
    {
      type: 'trap',
      title: 'The base has conditions',
      markdown: 'The lecture’s exponential definition requires $a>0$ and $a\\ne1$. A negative base is not defined for every real exponent, and $1^x$ is just the constant function 1.',
    },
  ),
  explainedPage(
    38,
    'Compare exponential graphs for different bases',
    'Every curve $y=a^x$ passes through $(0,1)$. Bases above 1 give increasing curves; bases between 0 and 1 give decreasing curves; base 1 gives the horizontal line $y=1$.',
    {
      type: 'foundation',
      title: 'Use the base to predict direction',
      markdown: 'For $a>1$, each step to the right multiplies the output by a number greater than 1, so outputs grow. For $0<a<1$, each step to the right multiplies by a fraction, so outputs shrink toward 0. The graph labels several bases to compare these rates.',
    },
    {
      type: 'worked-example',
      title: 'Why all the curves meet at $(0,1)$',
      steps: [
        'At the vertical axis, $x=0$.',
        'Any allowed base raised to 0 is 1: $a^0=1$.',
        'So the point on each graph is $(0,1)$.',
      ],
      conclusion: 'The common point is a quick way to recognize an exponential graph.',
    },
    {
      type: 'source-note',
      text: 'The orange horizontal line is $y=1$, corresponding to base $a=1$. The lecture excludes $a=1$ from the exponential-function definition because it gives a constant function.',
    },
  ),
  explainedPage(
    39,
    'Logarithmic functions',
    'A logarithm asks which exponent produces a number: $y=\\log_a x$ means $a^y=x$. It is the inverse of the exponential function with the same base.',
    {
      type: 'foundation',
      title: 'Read a logarithm in ordinary language',
      markdown: 'For example, $\\log_2 8=3$ because $2^3=8$. The base must be positive and different from 1. The input $x$ must be positive, so the logarithm’s domain is $(0,\\infty)$; its outputs can be any real number.',
    },
    {
      type: 'foundation',
      title: 'Connect the graphs',
      markdown: 'The graphs $y=a^x$ and $y=\\log_a x$ are reflections of each other across the line $y=x$: the input and output swap. When $a=e$, the natural logarithm is written $\\ln x$.',
    },
    {
      type: 'formula',
      label: 'Logarithm laws on the slide',
      latex: '\\log_a(xy)=\\log_a x+\\log_a y,\\quad \\log_a\\!\\left(\\frac{x}{y}\\right)=\\log_a x-\\log_a y,\\quad \\log_a(x^y)=y\\log_a x',
      explanation: 'These rules require positive logarithm inputs (in particular, $x>0$ and $y>0$ for the product and quotient rules). They turn products into sums, quotients into differences, and powers into a coefficient.',
    },
    {
      type: 'trap',
      title: 'The logarithm input cannot be zero or negative',
      markdown: '$\\log_a 0$ and $\\log_a(-2)$ are not real numbers for the logarithmic functions in this lecture. Before applying a log rule, check that each input is positive.',
    },
  ),
  explainedPage(
    40,
    'Sine and cosine graphs',
    'Sine and cosine repeat in smooth waves. Both accept every real angle, stay between $-1$ and 1, and repeat every $2\\pi$ radians.',
    {
      type: 'foundation',
      title: 'Read one cycle from the graphs',
      markdown: 'The horizontal axis is marked in radians using $\\pi$. For $y=\\cos x$, the key values from $0$ to $2\\pi$ are $1,0,-1,0,1$ at $0,\\pi/2,\\pi,3\\pi/2,2\\pi$. For $y=\\sin x$, they are $0,1,0,-1,0$ at those same angles.',
    },
    {
      type: 'recognition',
      title: 'Domain, range, and period',
      markdown: '**Domain:** all real angles. **Range:** $[-1,1]$, because neither graph rises above 1 nor falls below -1. **Period:** $2\\pi$, the length after which the wave repeats.',
    },
    {
      type: 'trap',
      title: 'Do not mix up the starting points',
      markdown: 'At $x=0$, cosine starts at 1, while sine starts at 0. That first point helps distinguish their two graphs.',
    },
  ),
  explainedPage(
    41,
    'Tangent and reciprocal trigonometric functions',
    'Tangent, secant, cosecant, and cotangent are built from sine and cosine. Their denominators create excluded inputs and vertical breaks in their graphs.',
    {
      type: 'formula',
      label: 'Definitions that explain the graph gaps',
      latex: '\\tan x=\\frac{\\sin x}{\\cos x},\\quad \\sec x=\\frac1{\\cos x},\\quad \\csc x=\\frac1{\\sin x},\\quad \\cot x=\\frac{\\cos x}{\\sin x}',
      explanation: 'The denominator may not be zero. Tangent and secant are undefined where $\\cos x=0$; cosecant and cotangent are undefined where $\\sin x=0$.',
    },
    {
      type: 'foundation',
      title: 'Read the domain, range, and period labels',
      markdown: '- $\\tan x$: domain excludes $x=\\pi/2+k\\pi$; range is all real numbers; period $\\pi$.  \n- $\\sec x$: same excluded inputs as tangent; range $y\\le-1$ or $y\\ge1$; period $2\\pi$.  \n- $\\csc x$: domain excludes $x=k\\pi$; range $y\\le-1$ or $y\\ge1$; period $2\\pi$.  \n- $\\cot x$: domain excludes $x=k\\pi$; range is all real numbers; period $\\pi$.  \nHere $k$ can be any integer, meaning the excluded values continue in both directions.',
    },
    {
      type: 'foundation',
      title: 'Why their graphs break',
      markdown: 'At a forbidden input, the sine or cosine in the denominator is zero. The plotted branches approach vertical lines at those inputs but do not cross them. The shaded intervals highlight repeating pieces of the graphs.',
    },
    {
      type: 'trap',
      title: 'A reciprocal does not mean reciprocal of the angle',
      markdown: '$\\sec x=1/\\cos x$, not $1/x$; $\\csc x=1/\\sin x$. Read the trig function in the denominator first.',
    },
  ),
  explainedPage(
    42,
    'Trigonometric symmetry and identities',
    'The slide lists which trig functions are even or odd, then gives Pythagorean and angle-addition identities. Match the signs carefully when choosing $+$ or $-$.',
    {
      type: 'foundation',
      title: 'Even and odd trigonometric functions',
      markdown: '**Odd:** $\\sin(-x)=-\\sin x$, $\\tan(-x)=-\\tan x$, $\\csc(-x)=-\\csc x$, $\\cot(-x)=-\\cot x$. **Even:** $\\cos(-x)=\\cos x$ and $\\sec(-x)=\\sec x$. These are the same symmetry tests from pages 24–27.',
    },
    {
      type: 'formula',
      label: 'Pythagorean identities',
      latex: '\\cos^2\\theta+\\sin^2\\theta=1,\\qquad 1+\\tan^2\\theta=\\sec^2\\theta,\\qquad \\cot^2\\theta+1=\\csc^2\\theta',
      explanation: 'The superscript 2 means square the function’s value, for example $\\sin^2\\theta=(\\sin\\theta)^2$. These formulas let you replace one squared trig expression with others.',
    },
    {
      type: 'formula',
      label: 'Angle-addition and angle-subtraction identities',
      latex: '\\begin{aligned}\\sin(A\\pm B)&=\\sin A\\cos B\\pm\\cos A\\sin B,\\\\\\cos(A\\pm B)&=\\cos A\\cos B\\mp\\sin A\\sin B,\\\\\\tan(A\\pm B)&=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}\\end{aligned}',
      explanation: 'The paired signs are read together: for $A+B$, use the top sign on the right in sine and tangent, but the opposite sign in cosine and in tangent’s denominator. For $A-B$, use the lower signs. The denominator in the tangent rule must not be zero.',
    },
    {
      type: 'trap',
      title: 'Keep the paired signs together',
      markdown: 'In $\\cos(A+B)$ the middle sign is minus; in $\\cos(A-B)$ it is plus. The cosine addition rule uses the opposite middle sign from the sign between $A$ and $B$.',
    },
  ),
  explainedPage(
    43,
    'Double-angle and half-angle identities',
    'Set both angles equal to $\\theta$ in an addition formula to get a double angle. The slide’s “half-angle” formulas rewrite $\\sin^2\\theta$ and $\\cos^2\\theta$ using $2\\theta$.',
    {
      type: 'formula',
      label: 'Double-angle identities',
      latex: '\\sin 2\\theta=2\\sin\\theta\\cos\\theta,\\quad \\cos 2\\theta=\\cos^2\\theta-\\sin^2\\theta=2\\cos^2\\theta-1=1-2\\sin^2\\theta,\\quad \\tan 2\\theta=\\frac{2\\tan\\theta}{1-\\tan^2\\theta}',
      explanation: 'For example, substituting $A=B=\\theta$ into $\\sin(A+B)$ gives $\\sin(2\\theta)=\\sin\\theta\\cos\\theta+\\cos\\theta\\sin\\theta=2\\sin\\theta\\cos\\theta$. The cosine identity can be rearranged into either of its two displayed forms.',
    },
    {
      type: 'formula',
      label: 'Square or power-reduction identities shown as half-angle formulas',
      latex: '\\cos^2\\theta=\\frac12(1+\\cos2\\theta),\\qquad \\sin^2\\theta=\\frac12(1-\\cos2\\theta)',
      explanation: 'These come from rearranging $\\cos2\\theta=2\\cos^2\\theta-1$ and $\\cos2\\theta=1-2\\sin^2\\theta$. They replace a squared sine or cosine with an expression involving the double angle.',
    },
    {
      type: 'trap',
      title: 'These formulas give squares directly',
      markdown: 'The displayed half-angle identities give $\\sin^2\\theta$ and $\\cos^2\\theta$. They do not by themselves choose the sign of $\\sin\\theta$ or $\\cos\\theta$ if you take a square root; that sign depends on the angle’s quadrant.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: how to choose the method',
      markdown: '- **Combining functions:** substitute $f(x)$ and $g(x)$ into the requested operation; domains overlap, and quotients exclude zero denominators.  \n- **Composition:** work inside first, then outside; check that each intermediate output is allowed.  \n- **Even/odd:** calculate $f(-x)$ and compare with $f(x)$ or $-f(x)$; this predicts graph symmetry.  \n- **Function families:** identify a line, power, polynomial, rational, algebraic, exponential, logarithmic, or trigonometric rule from its form, then check its domain restrictions.  \n- **Trigonometry:** use the identity that matches the expression; keep the signs and denominator conditions visible.  \nThis explanation follows the archived Fall 2025–2026 lecture. Compare the current Moodle version when released, especially before using it as the sole source for a quiz or exam.',
    },
  ),
  visualOnlyPage(44, 'Thank you — closing slide', 'This slide shows the EELU logo, “Thank you for watching,” and “Questions?” It contains no further lecture content.'),
];

export const mathematics1Lecture5Lesson: Lesson = {
  id: 'mathematics-1-lecture-5-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/lecture 5 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/lecture 5 (1).pdf',
  title: 'Archived Lecture 5: Operations, Composition, and Types of Functions',
  sourcePageCount: 44,
  pages,
  lastReviewed: '2026-10-14',
};
