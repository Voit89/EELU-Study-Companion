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
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. It has no lesson explanation. This is an archived copy; compare it with the current Moodle lecture when that version is available.',
  ),
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section. The Limits section begins on source page 3.'),
  visualOnlyPage(3, 'Limits — section divider', 'This slide only introduces the Limits section. The first content slide is source page 4.'),
  explainedPage(
    4,
    'What a limit tells us',
    'A limit describes the value that $f(x)$ gets close to as $x$ gets close to a chosen input. It does not have to equal the function’s value at that input.',
    {
      type: 'foundation',
      title: 'Why limits matter',
      markdown: 'Limits are a basic tool in calculus. They help define continuity, the derivative (a rate of change), and the definite integral (accumulated quantity or area). You do not need those later ideas yet: for now, focus on how a function behaves **near** an input.',
    },
    {
      type: 'recognition',
      title: 'Near the input versus at the input',
      markdown: 'If a question asks what happens as $x$ approaches $a$, look at inputs close to $a$ from either side. The value $f(a)$ is a separate question. The function might be undefined at $a$ and still have a limit there.',
    },
  ),
  explainedPage(
    5,
    'Definition and notation for a limit',
    'The statement $\\lim_{x\\to a} f(x)=L$ means that the outputs $f(x)$ approach $L$ as the inputs $x$ approach $a$.',
    {
      type: 'formula',
      label: 'Limit notation',
      latex: '\\lim_{x\\to a} f(x)=L',
      explanation: 'Read this as “the limit of $f(x)$ as $x$ approaches $a$ is $L$.” Here $a$ is the input we move toward, and $L$ is the output value the function gets close to.',
    },
    {
      type: 'foundation',
      title: 'What “approaches” means',
      markdown: 'We can choose $x$ values closer and closer to $a$ without requiring $x=a$. If their function values get as close as we want to one number $L$, that number is the limit.',
    },
  ),
  explainedPage(
    6,
    'A function with a missing value at $x=1$',
    'For $x\\ne1$, factor $x^2-1$ and cancel the common factor to get $f(x)=x+1$. The original formula is still undefined at $x=1$.',
    {
      type: 'formula',
      label: 'Function from the slide',
      latex: 'f(x)=\\frac{x^2-1}{x-1}',
      explanation: 'At $x=1$, the denominator $x-1$ is zero, so the original fraction is undefined. To understand nearby values, factor the numerator using the difference-of-squares pattern $u^2-v^2=(u-v)(u+v)$.',
    },
    {
      type: 'worked-example',
      title: 'Simplify for inputs near 1',
      steps: [
        'Factor the top: $x^2-1=(x-1)(x+1)$.',
        'For $x\\ne1$, cancel the common factor $x-1$: $f(x)=\\frac{(x-1)(x+1)}{x-1}=x+1$.',
        'The condition $x\\ne1$ matters: cancellation is valid only when the factor being canceled is not zero. The original function still has no value at $x=1$.',
      ],
      conclusion: 'Every nearby input except 1 follows the simple rule $x+1$.',
    },
    {
      type: 'trap',
      title: 'Cancellation does not define the missing value',
      markdown: 'The simplified rule $x+1$ can be evaluated at 1, but it is equal to the original fraction only for $x\\ne1$. Do not silently redefine the original function when finding its limit.',
    },
  ),
  explainedPage(
    7,
    'Read the graph’s hole',
    'The graph is the line $y=x+1$ with a hole at $(1,2)$. The hole means $f(1)$ is missing; nearby graph values still approach 2.',
    {
      type: 'foundation',
      title: 'What the two sketches show',
      markdown: 'The first sketch graphs the original fraction and marks the missing point with an open circle. The second shows the complete line $y=x+1$ as a comparison. They match everywhere except at $x=1$, where the fraction has no point.',
    },
    {
      type: 'recognition',
      title: 'A hole is different from a jump',
      markdown: 'The line approaches the same height from the left and the right of $x=1$. A single missing point does not stop the limit from existing. The open circle is the graph’s visual cue that the function value is absent there.',
    },
    {
      type: 'worked-example',
      title: 'Predict the nearby height',
      steps: [
        'Use the simplified nearby rule $x+1$.',
        'As $x$ gets close to 1, $x+1$ gets close to $1+1=2$.',
        'The graph therefore approaches the height 2 even though it leaves out the point $(1,2)$.',
      ],
      conclusion: 'The graph suggests a limit of 2 at $x=1$.',
    },
  ),
  explainedPage(
    8,
    'Write the limit for the hole example',
    'The limit is 2 because values from both sides get close to 2: $\\lim_{x\\to1}\\frac{x^2-1}{x-1}=2$.',
    {
      type: 'worked-example',
      title: 'Use the simplified expression',
      steps: [
        'For $x\\ne1$, the fraction equals $x+1$.',
        'As $x\\to1$, the expression $x+1$ approaches 2.',
        'Write the result as $\\lim_{x\\to1}f(x)=2$, or directly as $\\lim_{x\\to1}\\frac{x^2-1}{x-1}=2$.',
      ],
      conclusion: 'The limit exists even though the original fraction is undefined at the target input.',
    },
    {
      type: 'trap',
      title: 'Do not substitute into the unsimplified fraction here',
      markdown: 'Putting $x=1$ into the original fraction gives $0/0$, which is undefined. First use the factorization for nearby inputs; then determine what value those inputs approach.',
    },
  ),
  explainedPage(
    9,
    'When direct substitution works',
    'If substituting the target input gives a defined expression, it often gives the limit directly. Check that you are not dividing by zero.',
    {
      type: 'worked-example',
      title: 'Follow the slide’s five substitutions',
      steps: [
        '$\\lim_{x\\to2}4=4$ and $\\lim_{x\\to13}4=4$: a constant stays the same no matter which input it approaches.',
        '$\\lim_{x\\to3}x=3$: the identity rule simply approaches the target input.',
        '$\\lim_{x\\to2}(5x-3)=5(2)-3=10-3=7$. Substitute first, then multiply and subtract.',
        '$\\lim_{x\\to-2}\\frac{3x+4}{x+5}=\\frac{3(-2)+4}{-2+5}=\\frac{-6+4}{3}=-\\frac23$. The denominator becomes 3, so the substitution is valid.',
      ],
      conclusion: 'Substitution is a method to try first when it produces an ordinary, defined value.',
    },
    {
      type: 'recognition',
      title: 'Fast check before calculating',
      markdown: 'Replace $x$ with the target input in the denominator. If it is not zero and the other operations are defined, direct substitution is usually enough for these polynomial and rational examples.',
    },
  ),
  explainedPage(
    10,
    'Limits of identity and constant functions',
    'The identity rule $f(x)=x$ has limit $x_0$ as $x\\to x_0$. A constant function $f(x)=k$ always has limit $k$.',
    {
      type: 'formula',
      label: 'Two basic limit rules',
      latex: '\\lim_{x\\to x_0}x=x_0,\\qquad \\lim_{x\\to x_0}k=k',
      explanation: 'The identity function returns its input unchanged. A constant function returns the same fixed number $k$ for every input.',
    },
    {
      type: 'foundation',
      title: 'Connect the rules to the sketches',
      markdown: 'The identity graph is the diagonal line $y=x$; near input $x_0$, its height approaches $x_0$. The constant graph is a horizontal line $y=k$; its height is always $k$, so approaching any input leaves the height unchanged.',
    },
    {
      type: 'worked-example',
      title: 'Read the rules with numbers',
      steps: [
        'If $f(x)=x$, then $\\lim_{x\\to5}f(x)=5$.',
        'If $g(x)=4$, then $\\lim_{x\\to5}g(x)=4$. The target input 5 does not change the constant output.',
      ],
      conclusion: 'For identity, the limit follows the input. For a constant, the limit stays at the constant output.',
    },
  ),
  explainedPage(
    11,
    'A jump can prevent a limit from existing',
    'At the jump, the left-side values approach 0 while right-side values approach 1. Since they disagree, there is no single two-sided limit.',
    {
      type: 'foundation',
      title: 'Read the unit-step graph',
      markdown: 'The graph stays at height 0 for inputs just below 0 and at height 1 for inputs just above 0. The function’s exact value at $x=0$ does not change either nearby behavior.',
    },
    {
      type: 'formula',
      label: 'One-sided behavior in the sketch',
      latex: '\\lim_{x\\to0^-}y=0,\\qquad \\lim_{x\\to0^+}y=1',
      explanation: 'The superscript $-$ means approach from inputs smaller than 0; the superscript $+$ means approach from inputs larger than 0. The two heights are different.',
    },
    {
      type: 'recognition',
      title: 'Graph cue for a failed limit',
      markdown: 'If the graph approaches different heights on the two sides of the target input, the ordinary two-sided limit does not exist. This slide illustrates a jump discontinuity.',
    },
  ),
  explainedPage(
    12,
    'Unbounded behavior can prevent a finite limit',
    'The graph grows without bound in magnitude as $x$ approaches 0: the right branch rises and the left branch falls. It does not approach one finite real number.',
    {
      type: 'foundation',
      title: 'What the graph is showing',
      markdown: 'Near the vertical axis, the plotted curve leaves every fixed height. On the right of 0 its values rise; on the left they fall. The slide does not state a formula, so read the picture as an example of unbounded behavior rather than relying on a particular equation.',
    },
    {
      type: 'recognition',
      title: 'Check whether the question expects a real-number limit',
      markdown: 'A finite limit must be a real number that the outputs get close to. If the graph shoots upward or downward instead, there is no finite real limit, even if its size is becoming predictable.',
    },
  ),
  visualOnlyPage(13, 'The Limit Laws — section divider', 'This slide only announces the Limit Laws section. The first law is presented on source page 14.'),
  explainedPage(
    14,
    'Limit laws for sums, differences, and products',
    'When $f(x)$ approaches $L$ and $g(x)$ approaches $M$, the limit of their sum, difference, or product is the same operation applied to $L$ and $M$.',
    {
      type: 'formula',
      label: 'Three arithmetic limit laws',
      latex: '\\begin{aligned}\\lim_{x\\to c}(f(x)+g(x))&=L+M,\\\\\\lim_{x\\to c}(f(x)-g(x))&=L-M,\\\\\\lim_{x\\to c}(f(x)g(x))&=LM\\end{aligned}',
      explanation: 'The assumptions are $\\lim_{x\\to c}f(x)=L$ and $\\lim_{x\\to c}g(x)=M$. Find each simpler limit, then add, subtract, or multiply the results in the same order.',
    },
    {
      type: 'worked-example',
      title: 'Apply a sum rule to familiar expressions',
      steps: [
        'As $x\\to2$, $x$ approaches 2 and $x^2$ approaches $2^2=4$.',
        'Therefore $\\lim_{x\\to2}(x^2+x)=4+2=6$.',
        'For subtraction, order matters: $\\lim_{x\\to2}(x^2-x)=4-2=2$.',
      ],
      conclusion: 'Break a combined expression into pieces whose limits you already know.',
    },
  ),
  explainedPage(
    15,
    'Constant multiples, quotients, and rational powers',
    'A constant can be taken outside a limit; limits can be divided only when the denominator limit is nonzero; rational powers must produce real values.',
    {
      type: 'formula',
      label: 'Remaining limit laws on the slide',
      latex: '\\lim_{x\\to c}k f(x)=kL,\\qquad \\lim_{x\\to c}\\frac{f(x)}{g(x)}=\\frac{L}{M}\\ (M\\ne0),\\qquad \\lim_{x\\to c}(f(x))^{r/s}=L^{r/s}',
      explanation: 'Here $k$ is a constant, $L$ is the limit of $f(x)$, and $M$ is the limit of $g(x)$. For the power rule, the slide takes integers $r,s$ with no common factor and $s\\ne0$, and requires $L^{r/s}$ to be real; if $s$ is even, it assumes $L>0$.',
    },
    {
      type: 'foundation',
      title: 'Translate the conditions into plain language',
      markdown: 'A constant multiple changes the output by that fixed factor. A quotient is safe only if the bottom approaches a number other than zero. A rational exponent such as $2/3$ means a root and a power; an even root of a negative real number is not real, so the value condition matters.',
    },
    {
      type: 'worked-example',
      title: 'Use the rules with small values',
      steps: [
        'If $\\lim f(x)=3$, then $\\lim 5f(x)=5\\cdot3=15$.',
        'If $\\lim f(x)=3$ and $\\lim g(x)=2$, then $\\lim f(x)/g(x)=3/2$ because the denominator limit 2 is not zero.',
        'If $f(x)$ approaches 8, then $f(x)^{2/3}$ approaches $8^{2/3}=(\\sqrt[3]{8})^2=4$.',
      ],
      conclusion: 'Always check the rule’s condition before using it, especially for division and roots.',
    },
    {
      type: 'trap',
      title: 'A denominator limit of zero blocks the quotient law',
      markdown: 'If $M=0$, you cannot conclude that the quotient limit is $L/M$. The expression $L/0$ is not defined, and a $0/0$ result needs a different method.',
    },
  ),
  explainedPage(
    16,
    'Limit-law examples: questions',
    'Both examples can be evaluated using limit laws: the first is a polynomial, and the second is a quotient with denominator $x^2+5$.',
    {
      type: 'formula',
      label: 'Example 1',
      latex: '\\lim_{x\\to c}(x^3+4x^2-3)',
      explanation: 'The target input is a general value $c$. The expression is made from powers, sums, and a constant.',
    },
    {
      type: 'formula',
      label: 'Example 2',
      latex: '\\lim_{x\\to c}\\frac{x^4+x^2-1}{x^2+5}',
      explanation: 'This is a rational expression: a polynomial divided by another polynomial. Its denominator approaches $c^2+5$, which is positive for every real $c$.',
    },
    {
      type: 'recognition',
      title: 'Choose the relevant laws',
      markdown: 'For the polynomial, split the terms using sum and difference rules and use the power rule on $x^3$ and $x^2$. For the fraction, use the quotient rule after confirming that the denominator limit is nonzero.',
    },
    {
      type: 'source-note',
      text: 'The worked calculations continue on source page 17.',
    },
  ),
  explainedPage(
    17,
    'Limit-law examples: solutions',
    'The polynomial limit is $c^3+4c^2-3$. The rational limit is $(c^4+c^2-1)/(c^2+5)$.',
    {
      type: 'worked-example',
      title: 'Example 1: split the polynomial into terms',
      steps: [
        'Apply the sum and difference laws: $\\lim_{x\\to c}(x^3+4x^2-3)=\\lim x^3+\\lim 4x^2-\\lim3$. Each limit here is as $x\\to c$.',
        'Use the power rule and constant-multiple rule: $\\lim x^3=c^3$, $\\lim4x^2=4c^2$, and $\\lim3=3$.',
        'Combine the results: $c^3+4c^2-3$.',
      ],
      conclusion: '$\\lim_{x\\to c}(x^3+4x^2-3)=c^3+4c^2-3$.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: apply the quotient rule',
      steps: [
        'The numerator approaches $c^4+c^2-1$ by the power, sum, and difference laws.',
        'The denominator approaches $c^2+5$. Since $c^2\\ge0$, this denominator is at least 5 and cannot be zero.',
        'Divide the two limits: $\\frac{c^4+c^2-1}{c^2+5}$.',
      ],
      conclusion: '$\\lim_{x\\to c}\\frac{x^4+x^2-1}{x^2+5}=\\frac{c^4+c^2-1}{c^2+5}$.',
    },
  ),
  explainedPage(
    18,
    'Square-root limit: question',
    'The example asks for $\\lim_{x\\to-2}\\sqrt{4x^2-3}$. Find the inside expression’s limit, then take its square root.',
    {
      type: 'formula',
      label: 'Example 3',
      latex: '\\lim_{x\\to-2}\\sqrt{4x^2-3}',
      explanation: 'The radical symbol means the nonnegative square root. The inside expression is $4x^2-3$.',
    },
    {
      type: 'recognition',
      title: 'Break it into familiar operations',
      markdown: 'The expression inside the root is a polynomial, so its limit comes from substitution or the polynomial laws. The limit law for powers then transfers that result through the square root, provided it is a real number.',
    },
    {
      type: 'source-note',
      text: 'The slide gives the worked solution on source page 19.',
    },
  ),
  explainedPage(
    19,
    'Square-root limit: solution',
    'Substitute $x=-2$ inside first: $4(-2)^2-3=13$. The square-root limit is therefore $\\sqrt{13}$.',
    {
      type: 'worked-example',
      title: 'Evaluate the inside carefully',
      steps: [
        'Use the power rule: $x^2$ approaches $(-2)^2=4$.',
        'Multiply by 4 and subtract 3: $4\\cdot4-3=16-3=13$.',
        'Take the nonnegative square root: $\\sqrt{13}$. It is not necessary for 13 to be a perfect square; the exact answer remains a radical.',
      ],
      conclusion: '$\\lim_{x\\to-2}\\sqrt{4x^2-3}=\\sqrt{13}$.',
    },
    {
      type: 'trap',
      title: 'Square the negative input with parentheses',
      markdown: '$(-2)^2=4$, not $-4$. Squaring means multiply $-2$ by $-2$, which gives positive 4.',
    },
  ),
  explainedPage(
    20,
    'Approach from one side at a time',
    'A right-hand limit uses inputs greater than $a$; a left-hand limit uses inputs less than $a$. They can differ, even when the target input is the same.',
    {
      type: 'formula',
      label: 'One-sided limit notation',
      latex: '\\lim_{x\\to a^+}f(x)=L_1,\\qquad \\lim_{x\\to a^-}f(x)=L_2',
      explanation: '$a^+$ means approach $a$ from the right side of the number line, using $x>a$. $a^-$ means approach from the left, using $x<a$. The values $L_1$ and $L_2$ are the right-hand and left-hand limits.',
    },
    {
      type: 'foundation',
      title: 'Picture the number line',
      markdown: 'Keep $a$ fixed and move $x$ toward it. From the right, start with larger numbers; from the left, start with smaller numbers. Neither direction requires using $x=a$ itself.',
    },
    {
      type: 'recognition',
      title: 'When one-sided limits help',
      markdown: 'Use them at a jump, a piecewise rule, or an endpoint where the function is defined on only one side. Compare the two one-sided answers before claiming a two-sided limit.',
    },
  ),
  explainedPage(
    21,
    'The two-sided limit test and a piecewise example',
    'A two-sided limit exists with value $L$ exactly when both one-sided limits exist and both equal $L$. Here the example target is $x=3$.',
    {
      type: 'formula',
      label: 'Two-sided limit theorem',
      latex: '\\lim_{x\\to a}f(x)=L\\quad\\text{if and only if}\\quad\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L',
      explanation: '“If and only if” means the two conditions are equivalent: matching one-sided limits give the two-sided limit, and an existing two-sided limit forces both sides to match it.',
    },
    {
      type: 'formula',
      label: 'Piecewise function in Example 4',
      latex: 'f(x)=\\begin{cases}2x+5,&x>3,\\\\x^2+2,&x\\le3.\\end{cases}',
      explanation: 'A piecewise function has different rules on different parts of the number line. For values just above 3, use $2x+5$; for values just below 3, use $x^2+2$.',
    },
    {
      type: 'recognition',
      title: 'Why the boundary needs two checks',
      markdown: 'At $x=3$, the nearby inputs come from two pieces. Calculate the right-hand limit with the $x>3$ rule and the left-hand limit with the $x\\le3$ rule, then compare them.',
    },
    {
      type: 'source-note',
      text: 'The side-by-side calculations and conclusion are on source page 22.',
    },
  ),
  explainedPage(
    22,
    'Piecewise example: both sides approach 11',
    'From the right, $2(3)+5=11$; from the left, $3^2+2=11$. Since the two sides agree, $\\lim_{x\\to3}f(x)=11$.',
    {
      type: 'worked-example',
      title: 'Find the right-hand limit',
      steps: [
        'For $x>3$, use $f(x)=2x+5$.',
        'As $x\\to3^+$, this expression approaches $2(3)+5=6+5=11$.',
      ],
      conclusion: '$\\lim_{x\\to3^+}f(x)=11$.',
    },
    {
      type: 'worked-example',
      title: 'Find the left-hand limit and compare',
      steps: [
        'For $x<3$, use the other piece, $f(x)=x^2+2$.',
        'As $x\\to3^-$, it approaches $3^2+2=9+2=11$.',
        'The right and left limits are both 11, so the two-sided limit exists and equals 11.',
      ],
      conclusion: '$\\lim_{x\\to3}f(x)=11$. The same piecewise rule also defines $f(3)=3^2+2=11$, because the $x\\le3$ branch includes 3.',
    },
  ),
  explainedPage(
    23,
    'Substitute into polynomials and safe rational functions',
    'Polynomial limits are found by substituting the target input. For a rational function, do the same only when the denominator is nonzero there.',
    {
      type: 'foundation',
      title: 'Why substitution works for polynomials',
      markdown: 'Polynomials are built from constants, addition, subtraction, multiplication, and nonnegative whole-number powers of $x$. The limit laws let each operation pass through the limit, giving exactly the polynomial evaluated at the target.',
    },
    {
      type: 'worked-example',
      title: 'A polynomial and a rational expression',
      steps: [
        'For $P(x)=x^2+3x$, $\\lim_{x\\to2}P(x)=2^2+3(2)=4+6=10$.',
        'For $R(x)=\\frac{x+1}{x+3}$ as $x\\to2$, the bottom becomes $2+3=5$, which is nonzero; the limit is $\\frac{2+1}{2+3}=\\frac35$.',
      ],
      conclusion: 'For a rational function, checking the denominator is part of the method, not an optional extra.',
    },
    {
      type: 'trap',
      title: 'If the denominator becomes zero, stop and inspect',
      markdown: 'The substitution rule for rational functions requires a nonzero denominator. If substitution gives $0/0$, that only tells you direct substitution cannot finish the problem; it does not tell you the limit.',
    },
  ),
  explainedPage(
    24,
    'Polynomial limit examples: questions',
    'Example 5 asks for a fourth-degree polynomial limit at 2; Example 6 asks for a cube of an expression at 0. Both are set up for substitution.',
    {
      type: 'formula',
      label: 'Example 5',
      latex: '\\lim_{x\\to2}(x^4+2x^2+1)',
      explanation: 'Substitute 2 for every $x$, then evaluate the powers before adding.',
    },
    {
      type: 'formula',
      label: 'Example 6',
      latex: '\\lim_{x\\to0}(3x^2-5)^3',
      explanation: 'First evaluate the expression in parentheses at 0; then cube that result.',
    },
    {
      type: 'recognition',
      title: 'Order of operations cue',
      markdown: 'For a power outside parentheses, simplify inside the parentheses first. In $(3x^2-5)^3$, the exponent 3 applies to the entire parenthesized result.',
    },
    {
      type: 'source-note',
      text: 'The solutions appear on source page 25.',
    },
  ),
  explainedPage(
    25,
    'Polynomial limit examples: solutions',
    'The first limit is 25. The second is $(-5)^3=-125$ because the inside expression approaches $-5$.',
    {
      type: 'worked-example',
      title: 'Example 5: substitute 2',
      steps: [
        'Replace each $x$ with 2: $2^4+2(2^2)+1$.',
        'Evaluate the powers: $16+2(4)+1=16+8+1$.',
        'Add: $16+8+1=25$.',
      ],
      conclusion: '$\\lim_{x\\to2}(x^4+2x^2+1)=25$.',
    },
    {
      type: 'worked-example',
      title: 'Example 6: evaluate inside first',
      steps: [
        'Substitute 0 inside the parentheses: $3(0)^2-5=0-5=-5$.',
        'Now cube the whole result: $(-5)^3=(-5)(-5)(-5)=-125$.',
      ],
      conclusion: '$\\lim_{x\\to0}(3x^2-5)^3=-125$.',
    },
    {
      type: 'trap',
      title: 'Keep the negative sign inside the cube',
      markdown: 'A cube keeps the sign of a negative number: $(-5)^3=-125$. The parentheses show that the entire negative value is cubed.',
    },
  ),
  explainedPage(
    26,
    'Practice: rational and radical limits',
    'All four practice limits allow direct substitution: the rational denominator is nonzero, and the square root, cube root, and rational power give real values.',
    {
      type: 'formula',
      label: 'Four questions shown on the slide',
      latex: '\\begin{aligned}1.&\\quad\\lim_{x\\to-1}\\frac{x^3+4x^2-3}{x^2+5}\\qquad&2.&\\quad\\lim_{x\\to3}\\sqrt{2x+5}\\\\3.&\\quad\\lim_{x\\to-1}\\sqrt[3]{x^2+7x-2}&4.&\\quad\\lim_{x\\to2}(x^2+4)^{2/3}\\end{aligned}',
      explanation: 'A radical is an expression with a root sign. The cube root can accept a negative real number; an even root such as a square root cannot.',
    },
    {
      type: 'recognition',
      title: 'Try before reading the next slide',
      markdown: 'For question 1, check the denominator at $-1$. For questions 2 and 3, evaluate the radicand (the expression under the root). For question 4, read $2/3$ as cube-root first, then square.',
    },
    {
      type: 'source-note',
      text: 'The archived slide lists these questions without solutions. Page 27 below gives supplemental worked answers for study; they are not printed on source page 26.',
    },
  ),
  explainedPage(
    27,
    'Practice: supplemental worked answers',
    'Direct substitution gives, in order, $0$, $\\sqrt{11}$, $-2$, and $4$. These step-by-step answers are added to explain the unsolved practice slide.',
    {
      type: 'worked-example',
      title: 'Question 1: rational function',
      steps: [
        'Substitute $x=-1$ in the numerator: $(-1)^3+4(-1)^2-3=-1+4-3=0$.',
        'The denominator becomes $(-1)^2+5=1+5=6$, so it is not zero.',
        'Divide: $0/6=0$.',
      ],
      conclusion: 'The limit is $0$.',
    },
    {
      type: 'worked-example',
      title: 'Questions 2 and 3: square root and cube root',
      steps: [
        'For question 2, $2(3)+5=11$, so the limit is $\\sqrt{11}$.',
        'For question 3, $(-1)^2+7(-1)-2=1-7-2=-8$. The cube root of $-8$ is $-2$, since $(-2)^3=-8$.',
      ],
      conclusion: 'The answers are $\\sqrt{11}$ and $-2$.',
    },
    {
      type: 'worked-example',
      title: 'Question 4: interpret the exponent $2/3$',
      steps: [
        'Substitute 2 inside: $2^2+4=8$.',
        'The exponent $2/3$ means take the cube root and square: $8^{2/3}=(\\sqrt[3]{8})^2=2^2=4$.',
      ],
      conclusion: 'The limit is $4$.',
    },
  ),
  explainedPage(
    28,
    'What to do when substitution gives $0/0$',
    'A $0/0$ result is indeterminate: it does not tell you the limit. Try factoring and canceling a common factor, then substitute into the simpler expression.',
    {
      type: 'foundation',
      title: 'Why $0/0$ is not an answer',
      markdown: 'The quotient $0/0$ is undefined. More importantly, many different nearby behaviors can produce the same $0/0$ substitution, so it cannot determine one limit value on its own.',
    },
    {
      type: 'worked-example',
      title: 'A first strategy for this lecture',
      steps: [
        'Substitute the target input into the numerator and denominator separately.',
        'If both are zero, factor each expression and look for a common factor.',
        'Cancel a common factor only for inputs where it is nonzero, which is enough when considering inputs near—but not equal to—the target.',
        'Substitute into the simplified expression if its denominator is now nonzero.',
      ],
      conclusion: 'Factoring may reveal a finite limit hidden by the original fraction’s missing value.',
    },
    {
      type: 'trap',
      title: 'Cancel factors, not separate terms',
      markdown: 'A common factor multiplies the whole numerator and denominator. You cannot cancel a piece of a sum, such as canceling an $x$ from $x+2$ with an $x$ in the bottom. Factor first.',
    },
  ),
  explainedPage(
    29,
    'Cancel a common factor: set up',
    'For $\\lim_{x\\to1}\\frac{x^2+x-2}{x^2-x}$, factoring reveals a shared factor $x-1$ in the numerator and denominator.',
    {
      type: 'formula',
      label: 'Limit from the slide',
      latex: '\\lim_{x\\to1}\\frac{x^2+x-2}{x^2-x}',
      explanation: 'Substitution at 1 makes both top and bottom zero. The slide factors the numerator and denominator to expose a common factor.',
    },
    {
      type: 'worked-example',
      title: 'Factor the top and bottom',
      steps: [
        'Numerator: $x^2+x-2=(x-1)(x+2)$, since $-1\\cdot2=-2$ and $-1+2=1$.',
        'Denominator: $x^2-x=x(x-1)$, by taking out the common $x$.',
        'For $x\\ne1$, cancel the shared factor: $\\frac{(x-1)(x+2)}{x(x-1)}=\\frac{x+2}{x}$.',
      ],
      conclusion: 'The simplified expression has the same values as the original for nearby $x\\ne1$.',
    },
    {
      type: 'trap',
      title: 'Keep the condition attached to the cancellation',
      markdown: 'At $x=1$, the factor $x-1$ is zero, so it cannot be canceled by plugging in 1. The cancellation describes the function for nearby inputs $x\\ne1$, which is exactly what the limit studies.',
    },
  ),
  explainedPage(
    30,
    'Cancel a common factor: finish',
    'After simplifying to $(x+2)/x$, substitute $x=1$: the limit is $3$.',
    {
      type: 'worked-example',
      title: 'Take the limit of the simpler fraction',
      steps: [
        'From the previous slide, the original and simplified fractions agree for $x\\ne1$.',
        'Now substitute into the simpler fraction: $\\frac{1+2}{1}=\\frac31=3$.',
      ],
      conclusion: '$\\lim_{x\\to1}\\frac{x^2+x-2}{x^2-x}=3$.',
    },
    {
      type: 'why',
      title: 'Why this does not contradict the missing value',
      markdown: 'The original function is undefined at $x=1$, but its nearby outputs approach 3. A limit is about those nearby outputs, not about whether the function is defined at the target.',
    },
  ),
  explainedPage(
    31,
    'Example 7: factor before finding the limit',
    'Substitution into $\\frac{x^2+x-2}{x^2+2x-3}$ at 1 gives $0/0$. Factor both polynomials to look for a shared $(x-1)$.',
    {
      type: 'formula',
      label: 'Example 7',
      latex: '\\lim_{x\\to1}\\frac{x^2+x-2}{x^2+2x-3}',
      explanation: 'The direct-substitution result is indeterminate, so factor the numerator and denominator rather than trying to divide zero by zero.',
    },
    {
      type: 'worked-example',
      title: 'Predict the needed factorization',
      steps: [
        'The numerator factors as $(x-1)(x+2)$ because the two numbers multiply to $-2$ and add to 1.',
        'The denominator factors as $(x-1)(x+3)$: the numbers $-1$ and 3 multiply to $-3$ and add to 2.',
        'Both parts contain $(x-1)$, so after cancellation the denominator will be nonzero at 1.',
      ],
      conclusion: 'The next slide completes the cancellation and evaluates the remaining fraction.',
    },
  ),
  explainedPage(
    32,
    'Example 7: cancel and evaluate',
    'Cancel $(x-1)$ to get $(x+2)/(x+3)$, then substitute 1 to obtain $3/4$.',
    {
      type: 'worked-example',
      title: 'Show every algebra step',
      steps: [
        'Factor both polynomials: $\\frac{x^2+x-2}{x^2+2x-3}=\\frac{(x-1)(x+2)}{(x-1)(x+3)}$ for $x\\ne1$.',
        'Cancel the common factor: $\\frac{x+2}{x+3}$.',
        'Substitute 1 into this simpler expression: $\\frac{1+2}{1+3}=\\frac34$.',
      ],
      conclusion: '$\\lim_{x\\to1}\\frac{x^2+x-2}{x^2+2x-3}=\\frac34$.',
    },
    {
      type: 'trap',
      title: 'The original fraction still has a hole',
      markdown: 'The original numerator and denominator are both zero at 1, so the original function is undefined there. The simplified fraction is used to find the limit through nearby inputs.',
    },
  ),
  explainedPage(
    33,
    'Example 8: a difference of squares',
    'For $\\lim_{x\\to0}\\frac{(x+4)^2-16}{x}$, direct substitution gives $0/0$. Rewrite 16 as $4^2$ to factor the numerator.',
    {
      type: 'formula',
      label: 'Example 8',
      latex: '\\lim_{x\\to0}\\frac{(x+4)^2-16}{x}',
      explanation: 'The numerator is one square minus another: $(x+4)^2-4^2$. Use the pattern $A^2-B^2=(A-B)(A+B)$.',
    },
    {
      type: 'recognition',
      title: 'Look for squares being subtracted',
      markdown: 'If the top looks like $A^2-B^2$, difference of squares can create a factor that matches the denominator. Here $A=x+4$, $B=4$, and the denominator is $x$.',
    },
    {
      type: 'source-note',
      text: 'The slide’s algebra and final value are shown on source page 34.',
    },
  ),
  explainedPage(
    34,
    'Example 8: use difference of squares',
    'Factor $(x+4)^2-4^2$ as $x(x+8)$, cancel $x$ for $x\\ne0$, and the limit is 8.',
    {
      type: 'worked-example',
      title: 'Factor, cancel, and substitute',
      steps: [
        'Rewrite $16$ as $4^2$: $(x+4)^2-4^2$.',
        'Use $A^2-B^2=(A-B)(A+B)$: $((x+4)-4)((x+4)+4)=x(x+8)$.',
        'Divide by the denominator $x$ and cancel for $x\\ne0$: $\\frac{x(x+8)}x=x+8$.',
        'Now let $x\\to0$: $x+8\\to0+8=8$.',
      ],
      conclusion: '$\\lim_{x\\to0}\\frac{(x+4)^2-16}{x}=8$.',
    },
    {
      type: 'trap',
      title: 'The cancellation is for nearby inputs',
      markdown: 'At the target $x=0$, the factor $x$ is zero. Cancel it only after factoring, for $x\\ne0$, then evaluate the simplified expression’s limit.',
    },
  ),
  explainedPage(
    35,
    'Rationalize using a conjugate: question',
    'The limit $\\lim_{x\\to9}\\frac{\\sqrt{x}-3}{x-9}$ gives $0/0$. Multiply by the conjugate $\\sqrt{x}+3$ to create a difference of squares.',
    {
      type: 'formula',
      label: 'Example 9',
      latex: '\\lim_{x\\to9}\\frac{\\sqrt{x}-3}{x-9}',
      explanation: 'The conjugate of $\\sqrt{x}-3$ is $\\sqrt{x}+3$: it has the same terms but the opposite sign between them.',
    },
    {
      type: 'foundation',
      title: 'What rationalizing does',
      markdown: 'Multiply the numerator and denominator by the same nonzero expression, so the fraction’s value is unchanged for nearby inputs. With a conjugate, the numerator becomes $(\\sqrt{x})^2-3^2=x-9$, which can cancel the denominator.',
    },
    {
      type: 'recognition',
      title: 'Conjugate cue',
      markdown: 'When a square root is being added to or subtracted from another term and substitution gives $0/0$, try the matching conjugate with the sign flipped.',
    },
    {
      type: 'source-note',
      text: 'The slide shows the rationalization steps on source page 36.',
    },
  ),
  explainedPage(
    36,
    'Rationalize using a conjugate: solution',
    'Multiplying by $\\sqrt{x}+3$ changes the numerator to $x-9$, which cancels; the remaining limit is $1/(\\sqrt9+3)=1/6$.',
    {
      type: 'worked-example',
      title: 'Multiply by the conjugate',
      steps: [
        'Multiply top and bottom by $\\sqrt{x}+3$: $\\frac{\\sqrt{x}-3}{x-9}\\cdot\\frac{\\sqrt{x}+3}{\\sqrt{x}+3}$.',
        'The top is a difference of squares: $(\\sqrt{x}-3)(\\sqrt{x}+3)=x-9$.',
        'Cancel the common factor $x-9$ for $x\\ne9$, leaving $\\frac1{\\sqrt{x}+3}$.',
        'Substitute 9 into the simplified denominator: $\\frac1{\\sqrt9+3}=\\frac1{3+3}=\\frac16$.',
      ],
      conclusion: '$\\lim_{x\\to9}\\frac{\\sqrt{x}-3}{x-9}=\\frac16$.',
    },
    {
      type: 'trap',
      title: 'Multiply the whole fraction by 1',
      markdown: 'The conjugate must multiply both numerator and denominator. Multiplying only the top would change the value of the fraction.',
    },
  ),
  explainedPage(
    37,
    'Simplify a complex fraction: question',
    'In $\\lim_{x\\to3}\\frac{1/x-1/3}{x-3}$, combine the small fractions in the numerator over a common denominator first.',
    {
      type: 'formula',
      label: 'Example 10',
      latex: '\\lim_{x\\to3}\\frac{\\frac1x-\\frac13}{x-3}',
      explanation: 'A complex fraction is a fraction whose numerator or denominator contains another fraction. The top here is $1/x-1/3$.',
    },
    {
      type: 'foundation',
      title: 'Find a common denominator in the top',
      markdown: 'The denominators in $1/x$ and $1/3$ are $x$ and 3, so a shared denominator is $3x$. Rewrite both pieces over $3x$ before subtracting.',
    },
    {
      type: 'source-note',
      text: 'The slide’s full simplification is on source page 38.',
    },
  ),
  explainedPage(
    38,
    'Simplify a complex fraction: solution',
    'The numerator becomes $(3-x)/(3x)=-(x-3)/(3x)$. Cancel $(x-3)$ to get $-1/(3x)$, so the limit is $-1/9$.',
    {
      type: 'worked-example',
      title: 'Combine the small fractions and cancel',
      steps: [
        'Use common denominator $3x$: $\\frac1x-\\frac13=\\frac3{3x}-\\frac{x}{3x}=\\frac{3-x}{3x}$.',
        'Replace $3-x$ with $-(x-3)$: $\\frac{3-x}{3x}=-\\frac{x-3}{3x}$.',
        'Now divide by $x-3$: $\\frac{- (x-3)/(3x)}{x-3}=-\\frac1{3x}$ for $x\\ne3$.',
        'Substitute 3 into the remaining expression: $-\\frac1{3(3)}=-\\frac19$.',
      ],
      conclusion: '$\\lim_{x\\to3}\\frac{1/x-1/3}{x-3}=-\\frac19$.',
    },
    {
      type: 'trap',
      title: 'Track the negative sign',
      markdown: '$3-x=-(x-3)$. Reversing the order changes the sign, which is why the final limit is negative.',
    },
  ),
  explainedPage(
    39,
    'Check your knowledge: supplemental worked answers',
    'Factoring removes the $0/0$ form in four questions; direct substitution works in the remaining rational expression. The answers are $4$, $12$, $16/9$, $1/7$, and $-2/7$.',
    {
      type: 'source-note',
      text: 'The archived slide lists five questions but no solutions. The worked answers below are supplemental study explanations, not text printed on the source slide.',
    },
    {
      type: 'worked-example',
      title: 'Questions 1 and 2: factor sums of powers',
      steps: [
        '1. $\\frac{x^2-4}{x-2}=\\frac{(x-2)(x+2)}{x-2}=x+2$ for $x\\ne2$. The limit at 2 is $2+2=4$.',
        '2. $x^3+8=x^3+2^3=(x+2)(x^2-2x+4)$. Cancel $x+2$ with the denominator, then substitute $-2$: $(-2)^2-2(-2)+4=4+4+4=12$.',
      ],
      conclusion: 'The first two limits are 4 and 12.',
    },
    {
      type: 'worked-example',
      title: 'Question 3: substitute, then square',
      steps: [
        'At $x=-1$, the numerator is $1-3-2=-4$ and the denominator is $3(1)-1+1=3$, which is nonzero.',
        'The fraction approaches $-4/3$. The entire fraction is squared, so the limit is $(-4/3)^2=16/9$.',
      ],
      conclusion: 'The third limit is $16/9$.',
    },
    {
      type: 'worked-example',
      title: 'Questions 4 and 5: factor the denominator',
      steps: [
        '4. Factor $x^2+x-12=(x-3)(x+4)$. Cancel $x-3$ with the numerator; at 3 the remaining expression is $1/(3+4)=1/7$.',
        '5. Factor $8-2x=-2(x-4)$ and $x^2-x-12=(x-4)(x+3)$. Cancel $x-4$; at 4 the result is $-2/(4+3)=-2/7$.',
      ],
      conclusion: 'The fourth and fifth limits are $1/7$ and $-2/7$.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: choose a limit method',
      markdown: '- **Try substitution first** for polynomials and rational expressions; for a quotient, check that the denominator is nonzero.  \n- **Use limit laws** to split sums, differences, products, constant multiples, and safe quotients into simpler limits.  \n- **Compare one-sided limits** at a jump or a piecewise boundary; a two-sided limit exists only when both sides agree.  \n- **If substitution gives $0/0$**, factor and cancel a shared factor, use difference of squares, rationalize with a conjugate, or simplify a complex fraction.  \n- **Keep the meaning of a limit in view:** it describes nearby outputs and can exist even if the function has no value at the target.  \nThis lesson follows the archived Fall 2025–2026 lecture. Compare it with the current Moodle version when released, especially before relying on it as the only source for an assessment.',
    },
  ),
  visualOnlyPage(40, 'Thank you — closing slide', 'This final slide shows the EELU closing design and a thank-you message. It contains no further lesson content.'),
];

export const mathematics1Lecture6Lesson: Lesson = {
  id: 'mathematics-1-lecture-6-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/lecture 6.pdf',
  sourcePath: 'Mathematics 1/lecture/lecture 6.pdf',
  title: 'Archived Lecture 6: Limits',
  sourcePageCount: 40,
  pages,
  lastReviewed: '2026-10-14',
};
