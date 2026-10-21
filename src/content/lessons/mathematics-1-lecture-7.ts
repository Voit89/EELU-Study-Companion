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
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. This is an archived lecture; compare it with the current Moodle version when available.',
  ),
  explainedPage(
    2,
    'Archived Quiz 1 notice — not a current schedule',
    'This page records an old Quiz 1 announcement covering Lectures 1–7, dated Tuesday 28 October 2025. It is historical information, not a current assessment schedule.',
    {
      type: 'source-note',
      text: 'The slide lists all centers and Pearson MyLab, and shows a 9:00–9:30 PM time window while also saying “only 10 minutes.” Those duration statements conflict, so the intended quiz length is unclear. Check current Moodle announcements for any live schedule.',
    },
  ),
  visualOnlyPage(3, 'Revision — section divider', 'This slide only announces a revision section. The lecture topic starts on source page 4.'),
  visualOnlyPage(4, 'Limits at Infinity — section divider', 'This title slide introduces limits at infinity. The explanation begins on source page 5.'),
  explainedPage(
    5,
    'What a limit at infinity describes',
    'A limit at infinity describes what happens to a function as its input grows without bound or decreases without bound.',
    {
      type: 'formula',
      label: 'Notation for a finite end behavior',
      latex: '\\lim_{x\\to\\infty}f(x)=L,\\qquad \\lim_{x\\to-\\infty}f(x)=L',
      explanation: '$x\\to\\infty$ means the input gets larger and larger. $x\\to-\\infty$ means it gets more and more negative. If the function values get close to a finite number $L$, these notations record that end behavior.',
    },
    {
      type: 'foundation',
      title: 'The input is not a number called infinity',
      markdown: 'We do not substitute “infinity” as an ordinary input. Instead, we ask what happens to $f(x)$ for very large positive or negative values of $x$. The two directions can give different results.',
    },
  ),
  explainedPage(
    6,
    'Example 1: questions about end behavior',
    'These four expressions test constants, powers, and terms that shrink toward zero as $x$ becomes very large in magnitude.',
    {
      type: 'formula',
      label: 'Example 1',
      latex: '\\begin{aligned}1.&\\quad\\lim_{x\\to\\infty}\\frac{3}{x^2+2}\\qquad&2.&\\quad\\lim_{x\\to-\\infty}3x^2\\\\3.&\\quad\\lim_{x\\to\\infty}\\left(1-\\frac5{x^3}\\right)&4.&\\quad\\lim_{x\\to-\\infty}\\left(\\frac2{x^2}-3\\right)\\end{aligned}',
      explanation: 'The first and fourth contain reciprocal powers, such as $1/x^2$. The second is a growing square. In the third, the fraction shrinks while the constant 1 stays fixed.',
    },
    {
      type: 'recognition',
      title: 'Predict before calculating',
      markdown: 'As $|x|$ grows, $1/x^2$ and $1/x^3$ approach 0. By contrast, $x^2$ grows without bound and remains nonnegative. Use these behaviors to anticipate the answers, then check them on source page 7.',
    },
    {
      type: 'source-note',
      text: 'The archived slide gives the results on source page 7.',
    },
  ),
  explainedPage(
    7,
    'Example 1: solutions',
    'The answers are $0$, $+\\infty$, $1$, and $-3$. Reciprocal powers vanish, while $3x^2$ grows positively in either direction.',
    {
      type: 'worked-example',
      title: 'Evaluate each expression',
      steps: [
        '1. As $x\\to\\infty$, $x^2+2$ grows without bound, so $3/(x^2+2)$ gets closer to 0.',
        '2. As $x\\to-\\infty$, $x^2$ grows positively without bound because a negative number squared is positive. Thus $3x^2\\to+\\infty$.',
        '3. Since $5/x^3\\to0$, the whole expression approaches $1-0=1$.',
        '4. Since $2/x^2\\to0$ from above, the expression approaches $0-3=-3$.',
      ],
      conclusion: 'The four limits are $0$, $+\\infty$, $1$, and $-3$.',
    },
    {
      type: 'trap',
      title: 'A squared negative input is positive',
      markdown: 'Even when $x\\to-\\infty$, $x^2$ grows toward $+\\infty$. The minus sign describes the direction of the input, not the sign of its square.',
    },
  ),
  explainedPage(
    8,
    'A method for rational functions at infinity',
    'Compare degrees first: lower top gives 0, equal gives the leading-coefficient ratio, higher top gives $\\pm\\infty$. Divide only when showing the formal method.',
    {
      type: 'foundation',
      title: 'What the form $\\infty/\\infty$ tells you',
      markdown: 'If both the top and bottom grow without bound, calling it an $\\infty/\\infty$ **indeterminate form** means their growth rates still need comparing. It is not an arithmetic value and does not determine the answer by itself.',
    },
    {
      type: 'worked-example',
      title: 'Why divide by a power of $x$?',
      steps: [
        'For a rational function $P(x)/Q(x)$, identify the largest exponent appearing in the denominator polynomial $Q(x)$.',
        'Divide every numerator and denominator term by that same power. This is dividing the entire fraction by 1, so the fraction’s value is unchanged where it is defined.',
        'Terms with a lower power then contain a factor such as $1/x$ or $1/x^2$, which approaches 0 as $|x|$ grows.',
      ],
      conclusion: 'After simplifying, compare the remaining numerator and denominator limits.',
    },
    {
      type: 'recognition',
      title: 'A quick degree pattern',
      markdown: 'For polynomial-over-polynomial limits as $x\\to\\pm\\infty$: a lower numerator degree usually gives 0; equal degrees give the ratio of leading coefficients; a higher numerator degree grows in magnitude and needs a sign check for the direction of infinity.',
    },
  ),
  explainedPage(
    9,
    'Example 2: compare two quadratic polynomials',
    'The numerator and denominator both have degree 2, so their quotient approaches the ratio of their leading coefficients.',
    {
      type: 'formula',
      label: 'Example 2',
      latex: '\\lim_{x\\to\\infty}\\frac{2x^2+3x+1}{x^2-x-3}',
      explanation: 'The degree is the largest exponent of $x$. Both polynomials have degree 2, and the coefficients on their $x^2$ terms are 2 and 1.',
    },
    {
      type: 'recognition',
      title: 'Choose the denominator’s highest power',
      markdown: 'The denominator’s highest power is $x^2$. Dividing the top and bottom by $x^2$ will make the lower-degree terms shrink toward zero.',
    },
    {
      type: 'source-note',
      text: 'The slide’s calculation is on source page 10.',
    },
  ),
  explainedPage(
    10,
    'Example 2: divide each term by $x^2$',
    'After division by $x^2$, the expression approaches $2/1=2$ because every $1/x$ and $1/x^2$ term approaches zero.',
    {
      type: 'worked-example',
      title: 'Show the division term by term',
      steps: [
        'Divide the numerator and denominator by $x^2$: $\\frac{2x^2+3x+1}{x^2-x-3}=\\frac{2+3/x+1/x^2}{1-1/x-3/x^2}$.',
        'As $x\\to\\infty$, $3/x$, $1/x^2$, $1/x$, and $3/x^2$ all approach 0.',
        'The top approaches $2+0+0=2$. The bottom approaches $1-0-0=1$, which is nonzero.',
        'Divide the resulting limits: $2/1=2$.',
      ],
      conclusion: '$\\lim_{x\\to\\infty}\\frac{2x^2+3x+1}{x^2-x-3}=2$.',
    },
    {
      type: 'shortcut',
      title: 'Same degree shortcut',
      markdown: 'Because the numerator and denominator have the same highest degree, the limit is the ratio of the leading coefficients, $2/1=2$. The division above explains why the shortcut works.',
    },
  ),
  explainedPage(
    11,
    'Example 3: a linear numerator over a quadratic',
    'The numerator grows more slowly than the denominator, so $\\lim_{x\\to\\infty}\\frac{1-3x}{x^2+7}=0$.',
    {
      type: 'formula',
      label: 'Example 3',
      latex: '\\lim_{x\\to\\infty}\\frac{1-3x}{x^2+7}',
      explanation: 'The numerator has degree 1 and the denominator has degree 2. The problem slide asks for the limit and leaves the solution for the next page.',
    },
    {
      type: 'recognition',
      title: 'Predict from the degrees',
      markdown: 'The denominator has one extra power of $x$ compared with the numerator. This suggests the fraction will shrink toward zero; dividing by $x^2$ confirms it.',
    },
    {
      type: 'source-note',
      text: 'The worked calculation follows on source page 12.',
    },
  ),
  explainedPage(
    12,
    'Example 3: divide by $x^2$',
    'Divide the numerator and denominator by $x^2$. Every term in the numerator then approaches zero, while the denominator approaches 1, giving a limit of 0.',
    {
      type: 'worked-example',
      title: 'Simplify the quotient',
      steps: [
        'Divide each term by $x^2$: $\\frac{1-3x}{x^2+7}=\\frac{1/x^2-3/x}{1+7/x^2}$.',
        'As $x\\to\\infty$, $1/x^2\\to0$, $3/x\\to0$, and $7/x^2\\to0$.',
        'The numerator approaches 0 and the denominator approaches 1, so the quotient approaches $0/1=0$.',
      ],
      conclusion: '$\\lim_{x\\to\\infty}\\frac{1-3x}{x^2+7}=0$.',
    },
    {
      type: 'why',
      title: 'The numerator is negative for large $x$',
      markdown: 'For very large positive $x$, $1-3x$ is negative and becomes large in magnitude, while $x^2+7$ is positive and grows faster. The ratio still tends to 0, approaching from below.',
    },
  ),
  explainedPage(
    13,
    'Example 4: a higher-degree numerator',
    'In $\\frac{2x^4+3x}{x^3+5x^2}$, the numerator has degree 4 and the denominator degree 3, so the quotient grows toward positive infinity as $x\\to\\infty$.',
    {
      type: 'formula',
      label: 'Example 4',
      latex: '\\lim_{x\\to\\infty}\\frac{2x^4+3x}{x^3+5x^2}',
      explanation: 'The highest power on top is $x^4$, one degree higher than the highest power $x^3$ on the bottom.',
    },
    {
      type: 'recognition',
      title: 'Check the sign as well as the degree',
      markdown: 'The higher degree predicts unbounded magnitude. Since $x$ is heading to positive infinity and the leading terms are positive, the quotient grows toward $+\\infty$.',
    },
    {
      type: 'source-note',
      text: 'The source divides by $x^3$ and completes the example on page 14.',
    },
  ),
  explainedPage(
    14,
    'Example 4: divide by $x^3$',
    'Dividing by $x^3$ gives $(2x+3/x^2)/(1+5/x)$. The denominator approaches 1 while the numerator grows to $+\\infty$, so the limit is $+\\infty$.',
    {
      type: 'worked-example',
      title: 'Make the growth visible',
      steps: [
        'Divide every term by $x^3$: $\\frac{2x^4+3x}{x^3+5x^2}=\\frac{2x+3/x^2}{1+5/x}$.',
        'As $x\\to\\infty$, $3/x^2\\to0$ and $5/x\\to0$.',
        'The numerator $2x+3/x^2$ grows to $+\\infty$, while the denominator approaches 1.',
        'A quantity growing positively divided by a quantity approaching positive 1 still grows to $+\\infty$.',
      ],
      conclusion: '$\\lim_{x\\to\\infty}\\frac{2x^4+3x}{x^3+5x^2}=+\\infty$.',
    },
    {
      type: 'trap',
      title: 'Do not stop at an $\\infty/\\infty$ form',
      markdown: 'The original numerator and denominator both grow without bound, but their quotient does not have to approach a finite number. Compare their rates of growth after dividing by the denominator’s highest power.',
    },
  ),
  visualOnlyPage(15, 'Continuity — section divider', 'This title slide introduces continuity. The first explanation begins on source page 16.'),
  explainedPage(
    16,
    'An intuitive picture of continuity',
    'A continuous graph has no break at the point being considered. A function may have breaks at some inputs and still be continuous on other intervals of its domain.',
    {
      type: 'foundation',
      title: 'The pencil idea',
      markdown: 'The slide’s “trace it without lifting your pencil” description is an intuition for a continuous graph. More precisely, continuity is checked at each point; a hole, jump, or vertical asymptote is a break at that input.',
    },
    {
      type: 'recognition',
      title: 'Continuity can be local',
      markdown: 'A function need not be continuous everywhere to be continuous on a particular interval. The interval must lie within the function’s domain, and each included point must meet the continuity condition.',
    },
  ),
  explainedPage(
    17,
    'First requirement: the function value exists',
    'For $f$ to be continuous at $a$, $f(a)$ must be defined. The graph’s open circle at $a$ shows a missing function value, so continuity fails.',
    {
      type: 'foundation',
      title: 'Read the open circle',
      markdown: 'The line approaches a height near $a$, but the point itself is drawn open. That means the graph does not include a function value at input $a$; in notation, $f(a)$ is undefined.',
    },
    {
      type: 'recognition',
      title: 'Start the continuity test here',
      markdown: 'Before finding a limit, check whether the function has a value at the target. If $f(a)$ is undefined, the function is not continuous there, even if the limit exists.',
    },
  ),
  explainedPage(
    18,
    'Second requirement: the limit exists',
    'Having a defined value $f(a)$ is not enough. The graph in this slide approaches different heights from the two sides, so its two-sided limit does not exist.',
    {
      type: 'foundation',
      title: 'The filled point does not control nearby behavior',
      markdown: 'The filled dot gives the function’s value at $a$. The approaching branches show nearby outputs: the left and right sides head to different heights. Since those do not meet at one value, $\\lim_{x\\to a}f(x)$ does not exist.',
    },
    {
      type: 'trap',
      title: 'A defined point can still be discontinuous',
      markdown: 'Knowing $f(a)$ tells you what happens exactly at $a$, not what happens near it. A jump can occur even when the function has a filled dot at the target.',
    },
  ),
  explainedPage(
    19,
    'Third requirement: the limit equals the function value',
    'Even if $f(a)$ is defined and the limit exists, continuity also requires $\\lim_{x\\to a}f(x)=f(a)$. The graph shows a filled point at a different height from the hole.',
    {
      type: 'foundation',
      title: 'Compare the open and filled dots',
      markdown: 'The line approaches the open-circle height, which is the limit. The filled dot at the same input is higher, giving the actual value $f(a)$. Since those heights differ, the function is not continuous at $a$.',
    },
    {
      type: 'formula',
      label: 'The final condition',
      latex: '\\lim_{x\\to a}f(x)=f(a)',
      explanation: 'Both sides of this equality must be defined, and they must be the same number. This equality completes the three-part continuity test.',
    },
  ),
  explainedPage(
    20,
    'The three-part continuity test',
    'A function is continuous at $c$ exactly when $f(c)$ exists, $\\lim_{x\\to c}f(x)$ exists, and those two values are equal.',
    {
      type: 'formula',
      label: 'Continuity test from the slide',
      latex: '\\begin{aligned}1.&\\quad f(c)\\text{ exists}\\\\2.&\\quad\\lim_{x\\to c}f(x)\\text{ exists}\\\\3.&\\quad\\lim_{x\\to c}f(x)=f(c)\\end{aligned}',
      explanation: 'All three conditions are required. The first means $c$ is in the domain; the second means both sides approach one finite value at an interior point; the third matches that limit to the defined point value.',
    },
    {
      type: 'worked-example',
      title: 'Use it as a checklist',
      steps: [
        'Check whether the rule assigns a value at $c$.',
        'Find the limit from both sides (or use a one-sided limit if $c$ is an endpoint).',
        'If the limit exists, compare it with $f(c)$.',
      ],
      conclusion: 'If any one step fails, the function is not continuous at that point.',
    },
  ),
  explainedPage(
    21,
    'Interior points and endpoints',
    'At an interior point, check continuity from both sides. At the left endpoint, check from the right; at the right endpoint, check from the left.',
    {
      type: 'foundation',
      title: 'Follow the arrows on the graph',
      markdown: 'The graph shows an interval from $a$ to $b$. At an interior point $c$, inputs can approach from both directions. At $a$, the domain starts there, so only inputs to its right are available. At $b$, only inputs from the left are in the interval.',
    },
    {
      type: 'recognition',
      title: 'Use the side allowed by the domain',
      markdown: 'Do not demand a two-sided limit at an endpoint if the function is only defined on one side of it. Continuity at endpoints is defined using the one-sided limit from inside the interval.',
    },
    {
      type: 'source-note',
      text: 'The formal equalities for interior and endpoint continuity are on source page 22.',
    },
  ),
  explainedPage(
    22,
    'Formal continuity definitions at endpoints',
    'At an interior point $c$, require $\\lim_{x\\to c}f(x)=f(c)$. At left endpoint $a$, use $x\\to a^+$; at right endpoint $b$, use $x\\to b^-$.',
    {
      type: 'formula',
      label: 'Interior point and interval endpoints',
      latex: '\\lim_{x\\to c}f(x)=f(c),\\qquad \\lim_{x\\to a^+}f(x)=f(a),\\qquad \\lim_{x\\to b^-}f(x)=f(b)',
      explanation: 'The first equality is for an interior point. The second is for a left endpoint of the domain interval, where values approach from the right. The third is for a right endpoint, where values approach from the left.',
    },
    {
      type: 'trap',
      title: 'Endpoint plus/minus can feel backward',
      markdown: 'At the left endpoint $a$, approach from numbers greater than $a$, so use $a^+$. At the right endpoint $b$, approach from numbers smaller than $b$, so use $b^-$.',
    },
  ),
  explainedPage(
    23,
    'Example 5: a piecewise function at $x=2$',
    'For $x\\ne2$, the rule is $(x^2-4)/(x-2)$; at $x=2$, the rule assigns 4. We will check whether the limit matches that assigned value.',
    {
      type: 'formula',
      label: 'Example 5 function',
      latex: 'f(x)=\\begin{cases}\\dfrac{x^2-4}{x-2},&x\\ne2,\\\\4,&x=2.\\end{cases}',
      explanation: 'The fraction applies everywhere except at 2. The separate case explicitly defines $f(2)=4$.',
    },
    {
      type: 'recognition',
      title: 'Three checks for continuity',
      markdown: 'First read the value at the target from the piecewise rule. Then simplify the nearby formula to find the limit. Finally compare them.',
    },
    {
      type: 'source-note',
      text: 'The solution checks these conditions on source page 24.',
    },
  ),
  explainedPage(
    24,
    'Example 5: the assigned value fills the hole',
    'At 2, $f(2)=4$. For nearby $x$, the fraction simplifies to $x+2$, whose limit is also 4, so the function is continuous at 2.',
    {
      type: 'worked-example',
      title: 'Check the three conditions',
      steps: [
        'The second branch defines $f(2)=4$, so condition 1 is satisfied.',
        'For $x\\ne2$, factor $x^2-4=(x-2)(x+2)$ and cancel: $\\frac{x^2-4}{x-2}=x+2$.',
        'The limit is $\\lim_{x\\to2}(x+2)=4$, so it exists.',
        'Compare: $\\lim_{x\\to2}f(x)=4=f(2)$. All three conditions hold.',
      ],
      conclusion: 'The function is continuous at $x=2$. The assigned point value fills the hole in the nearby graph.',
    },
    {
      type: 'why',
      title: 'Why the original fraction did not settle this',
      markdown: 'At $x=2$, the fraction’s denominator is zero. But the piecewise rule separately defines $f(2)$, and factoring shows the nearby values approach that same number.',
    },
  ),
  explainedPage(
    25,
    'Example 6: continuity at a piecewise boundary',
    'At $x=3$, use $2x+5$ for inputs just above 3 and $x^2+2$ for inputs just below 3. The example asks for the limit and continuity.',
    {
      type: 'formula',
      label: 'Example 6 function',
      latex: 'f(x)=\\begin{cases}2x+5,&x>3,\\\\x^2+2,&x\\le3.\\end{cases}',
      explanation: 'The $x>3$ branch controls the right-hand limit. The $x\\le3$ branch controls the left-hand limit and gives the actual value $f(3)$.',
    },
    {
      type: 'recognition',
      title: 'Boundary method',
      markdown: 'Calculate the right-hand and left-hand limits using their own pieces. If they match, the two-sided limit exists. Then compare it with the value from the branch that includes 3.',
    },
    {
      type: 'source-note',
      text: 'The slide’s limit and continuity conclusion are on source page 26.',
    },
  ),
  explainedPage(
    26,
    'Example 6: both sides match the function value',
    'The right and left limits are both 11, and the branch at $x=3$ gives $f(3)=11$. Therefore the function is continuous at 3.',
    {
      type: 'worked-example',
      title: 'Compute each side',
      steps: [
        'Right side: use $2x+5$. As $x\\to3^+$, $2(3)+5=11$.',
        'Left side: use $x^2+2$. As $x\\to3^-$, $3^2+2=11$.',
        'The two one-sided limits match, so $\\lim_{x\\to3}f(x)=11$.',
      ],
      conclusion: 'The included branch is $x\\le3$, so $f(3)=3^2+2=11$. Since this equals the limit, $f$ is continuous at 3.',
    },
  ),
  explainedPage(
    27,
    'Example 7: compare three cases at $x=1$',
    'The function uses $7x-2$ for $x<1$, assigns 5 at $x=1$, and uses $5x^2$ for $x>1$.',
    {
      type: 'formula',
      label: 'Example 7 function',
      latex: 'f(x)=\\begin{cases}7x-2,&x<1,\\\\5,&x=1,\\\\5x^2,&x>1.\\end{cases}',
      explanation: 'The exact value is $f(1)=5$. Use the first branch for the left-hand limit and the third branch for the right-hand limit.',
    },
    {
      type: 'recognition',
      title: 'Three branches, three jobs',
      markdown: 'At the boundary, do not use the middle value to calculate either limit. The two neighboring branches determine the limits; the middle branch gives the value used in the final continuity comparison.',
    },
    {
      type: 'source-note',
      text: 'The worked continuity check is on source page 28.',
    },
  ),
  explainedPage(
    28,
    'Example 7: the function is continuous at 1',
    'The left-hand limit is $7(1)-2=5$, the right-hand limit is $5(1)^2=5$, and $f(1)=5$; all three continuity checks pass.',
    {
      type: 'worked-example',
      title: 'Evaluate both branches near 1',
      steps: [
        'From the left, use $7x-2$: $7(1)-2=5$.',
        'From the right, use $5x^2$: $5(1)^2=5$.',
        'The one-sided limits agree, so the two-sided limit exists and equals 5.',
        'The middle branch gives $f(1)=5$. The limit equals the function value.',
      ],
      conclusion: 'The function is continuous at $x=1$.',
    },
    {
      type: 'trap',
      title: 'Keep the branch conditions attached',
      markdown: 'For the left limit use the $x<1$ rule; for the right limit use the $x>1$ rule. The line assigning $f(1)=5$ is for the point itself.',
    },
  ),
  explainedPage(
    29,
    'Continuity on an interval and on a domain',
    'A function is continuous on an interval when it is continuous at every point there. The function $1/x$ is not continuous on an interval containing 0 because it is undefined at 0.',
    {
      type: 'foundation',
      title: 'Read the two graphs',
      markdown: 'The upper semicircle $y=\\sqrt{4-x^2}$ is continuous across its domain $[-2,2]$, including the endpoints using one-sided continuity. The graph $y=1/x$ has a vertical asymptote at 0, so it is not continuous on $[-1,1]$.',
    },
    {
      type: 'formula',
      label: 'The domain of $1/x$',
      latex: '(-\\infty,0)\\cup(0,\\infty)',
      explanation: 'The symbol $\\cup$ means union, or “combine these intervals.” The domain has all negative and all positive real numbers, but leaves out 0. The function is continuous throughout each part of its domain.',
    },
    {
      type: 'trap',
      title: 'Continuous on its domain does not mean continuous everywhere',
      markdown: 'The function $1/x$ is continuous at every input where it is defined. It still cannot be continuous on $[-1,1]$, because that interval includes 0, where the function has no value.',
    },
  ),
  explainedPage(
    30,
    'Algebraic combinations preserve continuity',
    'If $f$ and $g$ are continuous at $c$, their sums, differences, products, constant multiples, quotients, and defined powers are continuous there.',
    {
      type: 'formula',
      label: 'Continuous-function combination rules',
      latex: '\\begin{aligned}f+g,\\quad f-g,\\quad fg,\\quad kf&\\text{ are continuous at }c,\\\\\\frac{f}{g}&\\text{ is continuous if }g(c)\\ne0,\\\\f^{r/s}&\\text{ is continuous where that power is defined}\\end{aligned}',
      explanation: 'The rule for a quotient has an extra condition because division by zero is undefined. For a rational power, the expression must be real and defined near the point as well as at it.',
    },
    {
      type: 'worked-example',
      title: 'Apply the rule to a rational expression',
      steps: [
        'Polynomials are continuous at every real input, so both $x+1$ and $x^2+4$ are continuous at 2.',
        'The quotient $(x+1)/(x^2+4)$ is therefore continuous at 2 because its denominator value is $2^2+4=8$, not zero.',
      ],
      conclusion: 'Often you can identify where a formula is continuous by checking where its operations are defined.',
    },
  ),
  explainedPage(
    31,
    'Polynomials and rational functions',
    'Every polynomial is continuous everywhere. A rational function is continuous wherever its denominator is nonzero; Example 8 has possible breaks at $x=0,1,-2$.',
    {
      type: 'formula',
      label: 'Example 8 rational function',
      latex: 'f(x)=\\frac{x^2-1}{x^3+x^2-2x}',
      explanation: 'The denominator factors as $x(x+2)(x-1)$, so the original quotient is undefined at $x=0,-2,1$.',
    },
    {
      type: 'worked-example',
      title: 'Factor to identify the excluded inputs',
      steps: [
        'Factor the denominator: $x^3+x^2-2x=x(x^2+x-2)=x(x+2)(x-1)$.',
        'Set each factor equal to zero: $x=0$, $x=-2$, or $x=1$. These are the only denominator zeros.',
        'The numerator factors as $x^2-1=(x-1)(x+1)$. At $x=1$, the common factor can cancel for nearby inputs, so that break is removable. At $x=0$ and $x=-2$, the numerator is nonzero while the denominator is zero, giving vertical-asymptote behavior.',
      ],
      conclusion: 'The rational function is continuous at every real input except $0$, $1$, and $-2$. The slide lists these excluded inputs; the classification at each is an added factor-based explanation.',
    },
    {
      type: 'trap',
      title: 'A canceled factor does not restore the original point',
      markdown: 'The original formula is still undefined where its denominator was zero, even if a matching factor cancels. Cancellation can show that a discontinuity is removable; it does not change the original domain.',
    },
  ),
  explainedPage(
    32,
    'Compositions of continuous functions',
    'If $f$ is continuous at $c$ and $g$ is continuous at $f(c)$, then the composite $g\\circ f$ is continuous at $c$, with value $g(f(c))$.',
    {
      type: 'foundation',
      title: 'Follow the input through the diagram',
      markdown: 'Start at $c$. The inner function $f$ sends it to $f(c)$. The outer function $g$ then sends that result to $g(f(c))$. If each stage changes smoothly at the relevant point, the combined path is continuous.',
    },
    {
      type: 'formula',
      label: 'Composition continuity theorem',
      latex: 'g\\circ f\\text{ is continuous at }c\\quad\\text{and}\quad (g\\circ f)(c)=g(f(c))',
      explanation: 'The notation $g\\circ f$ means “apply $f$ first, then apply $g$.” The order is read from right to left.',
    },
    {
      type: 'trap',
      title: 'Check continuity of the outer function at the inner output',
      markdown: 'The condition is that $g$ is continuous at $f(c)$, not necessarily at the original input $c$. The inner function changes which input is fed into $g$.',
    },
  ),
  explainedPage(
    33,
    'Limits through continuous functions: trigonometric example',
    'Because cosine is continuous, evaluate the inside at $x=\\pi/2$: it becomes $\\pi+\\sin(2\\pi)=\\pi$, so the limit is $\\cos\\pi=-1$.',
    {
      type: 'formula',
      label: 'Example 9',
      latex: '\\lim_{x\\to\\pi/2}\\cos\\left(2x+\\sin\\left(\\frac{3\\pi}{2}+x\\right)\\right)',
      explanation: 'Angles are in radians, as shown by the use of $\\pi$. Sine and cosine are continuous, so substitution through the nested expression is valid.',
    },
    {
      type: 'worked-example',
      title: 'Evaluate from the inside out',
      steps: [
        'The term $2x$ approaches $2(\\pi/2)=\\pi$.',
        'Inside the sine, $3\\pi/2+x$ approaches $3\\pi/2+\\pi/2=2\\pi$. Thus the sine term approaches $\\sin(2\\pi)=0$.',
        'The full cosine input approaches $\\pi+0=\\pi$.',
        'Finally, $\\cos\\pi=-1$.',
      ],
      conclusion: 'The limit is $-1$.',
    },
  ),
  visualOnlyPage(34, 'Types of Discontinuities — section divider', 'This slide only introduces the classification of discontinuities. The definitions begin on source page 35.'),
  explainedPage(
    35,
    'Three visual types of discontinuity',
    'A removable discontinuity looks like a hole, a jump discontinuity has different finite side-heights, and an infinite discontinuity occurs at a vertical asymptote.',
    {
      type: 'foundation',
      title: 'Read the three sketches',
      markdown: '- **Removable:** the nearby graph approaches one finite height, but the value at that input is missing or placed elsewhere.  \n- **Jump:** the left and right pieces approach different finite heights.  \n- **Infinite:** at least one side grows without bound near a vertical asymptote.',
    },
    {
      type: 'recognition',
      title: 'Classify by the limit behavior',
      markdown: 'A hole points to a finite existing limit; a jump points to two unequal finite one-sided limits; an infinite break points to a one-sided limit of $+\\infty$ or $-\\infty$.',
    },
  ),
  explainedPage(
    36,
    'Formal definitions of the discontinuity types',
    'A removable break has a finite two-sided limit; a jump has two finite unequal one-sided limits; an infinite break has a one-sided limit of $+\\infty$ or $-\\infty$.',
    {
      type: 'formula',
      label: 'Limit tests from the definition slide',
      latex: '\\begin{aligned}\\text{Removable: }&\\lim_{x\\to a}f(x)=L\\text{ for some real }L\\\\\\text{Jump: }&\\lim_{x\\to a^-}f(x)\\ne\\lim_{x\\to a^+}f(x),\\text{ both finite}\\\\\\text{Infinite: }&\\text{at least one one-sided limit is }+\\infty\\text{ or }-\\infty\\end{aligned}',
      explanation: 'These definitions assume the function is discontinuous at $a$. “Finite” means an ordinary real number, not $+\\infty$ or $-\\infty$.',
    },
    {
      type: 'recognition',
      title: 'What the type tells you',
      markdown: 'For a removable break, there is a single finite height that could repair the graph. A jump cannot be repaired by changing one point because the sides disagree. An infinite discontinuity cannot be repaired by assigning one finite point value.',
    },
  ),
  explainedPage(
    37,
    'Example 10: classify a removable discontinuity',
    'The function $f(x)=\\frac{x^2-4}{x-2}$ is undefined at 2, but its nearby values simplify to $x+2$ and approach 4. The discontinuity is removable.',
    {
      type: 'worked-example',
      title: 'Factor and find the limit',
      steps: [
        'The numerator factors: $x^2-4=(x-2)(x+2)$.',
        'For $x\\ne2$, cancel $x-2$ to get $f(x)=x+2$.',
        'Therefore $\\lim_{x\\to2}f(x)=2+2=4$. The original function is still undefined at 2.',
      ],
      conclusion: 'Since the function has a finite limit at a point where it is discontinuous, the break at 2 is removable. Assigning $f(2)=4$ would fill the hole.',
    },
    {
      type: 'trap',
      title: 'A finite limit does not mean the original is continuous',
      markdown: 'Continuity also requires a defined value that equals the limit. Here the limit exists, but the original quotient has no value at 2.',
    },
  ),
  explainedPage(
    38,
    'Example 11: classify a jump at $x=3$',
    'The left-hand limit is $-5$ and the right-hand limit is 4. Both are finite but unequal, so the discontinuity is a jump.',
    {
      type: 'formula',
      label: 'Example 11 function',
      latex: 'f(x)=\\begin{cases}-x^2+4,&x\\le3,\\\\4x-8,&x>3.\\end{cases}',
      explanation: 'Use the first branch for values just below 3 and the second branch for values just above 3.',
    },
    {
      type: 'worked-example',
      title: 'Calculate the one-sided limits',
      steps: [
        'From the left: $-(3)^2+4=-9+4=-5$.',
        'From the right: $4(3)-8=12-8=4$.',
        'Both side-limits are finite, but $-5\\ne4$, so the two-sided limit does not exist.',
      ],
      conclusion: 'The break at 3 is a jump discontinuity.',
    },
  ),
  explainedPage(
    39,
    'Check your knowledge: supplemental continuity solution',
    'The nearby values approach $1/2$, but the function assigns $f(0)=3$. It is not continuous at 0 and has a removable discontinuity.',
    {
      type: 'source-note',
      text: 'The archived slide gives this question without a solution. The worked answer below is supplemental explanation, not a solution printed on source page 39.',
    },
    {
      type: 'formula',
      label: 'Piecewise function from the practice slide',
      latex: 'f(x)=\\begin{cases}\\dfrac{\\sqrt{x+1}-1}{x},&x\\ne0,\\\\3,&x=0.\\end{cases}',
      explanation: 'The square root covers $x+1$. The first rule applies away from 0; the second defines the point value.',
    },
    {
      type: 'worked-example',
      title: 'Find the limit by rationalizing',
      steps: [
        'The point value is $f(0)=3$. Direct substitution into the fraction gives $0/0$, so simplify first.',
        'Multiply top and bottom by the conjugate $\\sqrt{x+1}+1$: $\\frac{\\sqrt{x+1}-1}{x}\\cdot\\frac{\\sqrt{x+1}+1}{\\sqrt{x+1}+1}$.',
        'The numerator becomes $(x+1)-1=x$, so for $x\\ne0$ the fraction simplifies to $\\frac1{\\sqrt{x+1}+1}$.',
        'Now let $x\\to0$: $\\frac1{\\sqrt{1}+1}=\\frac12$.',
      ],
      conclusion: 'The limit exists and is $1/2$, but this does not equal $f(0)=3$. The function is not continuous at 0; because the finite limit exists, the discontinuity is removable.',
    },
  ),
  visualOnlyPage(40, 'Thank you — closing slide', 'This final slide shows the EELU thank-you and questions graphic. It contains no further lecture content.'),
];

export const mathematics1Lecture7Lesson: Lesson = {
  id: 'mathematics-1-lecture-7-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 7 (1).pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 7 (1).pdf',
  title: 'Lecture 7: Limits at Infinity, Continuity, and Discontinuities',
  sourcePageCount: 40,
  pages,
  lastReviewed: '2026-10-20',
};
