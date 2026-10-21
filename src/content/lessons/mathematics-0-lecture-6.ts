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
    'Mathematics (0) — archived lecture cover',
    'The cover identifies this as Mathematics (0), Fall Semester 2025–2026. This is an older course-folder copy; use it as a provisional reference and follow the current Moodle version if a later upload differs.',
  ),
  visualOnlyPage(2, 'Revision divider', 'A divider slide. The topic taught in this file begins on page 3.'),
  visualOnlyPage(3, 'Radicals — topic title', 'This slide names the topic. The first explanation of radicals is on page 4.'),
  explainedPage(
    4,
    'Radicals: roots and the principal root',
    'The index tells which root to take, and the radicand is the expression under the root. The square-root symbol means the non-negative root; solving an equation such as $x^2=16$ is a different question and has two solutions.',
    {
      type: 'foundation',
      title: 'Read the parts of a radical',
      markdown: 'In $\\sqrt[n]{a}$, $n$ is the **index** and $a$ is the **radicand**. When the small index is missing, it is 2: $\\sqrt{a}=\\sqrt[2]{a}$. A radical is another way to describe a root, such as a square root, cube root, or fourth root.',
    },
    {
      type: 'worked-example',
      title: 'Check the three examples',
      givens: String.raw`\sqrt{16},\quad \sqrt[3]{27},\quad \sqrt[4]{81}`,
      steps: [
        '$\\sqrt{16}=4$ because $4^2=16$ and the square-root symbol selects the non-negative answer.',
        '$\\sqrt[3]{27}=3$ because $3^3=27$.',
        '$\\sqrt[4]{81}=3$ because $3^4=81$.',
      ],
      conclusion: 'For an even index, the real radical is defined for a non-negative radicand and gives the non-negative root. For an odd index, negative radicands can also have real roots; for example, $\\sqrt[3]{-8}=-2$.',
    },
    {
      type: 'trap',
      title: 'Do not confuse a radical with an equation',
      markdown: 'The symbol $\\sqrt{16}$ equals 4, not $\\pm4$. But the equation $x^2=16$ has two solutions, $x=4$ and $x=-4$.',
    },
  ),
  explainedPage(
    5,
    'Connect fractional exponents to roots',
    'A denominator in a fractional exponent becomes the root index; the numerator becomes the power. For positive $a$, $a^{m/n}=\\sqrt[n]{a^m}$.',
    {
      type: 'formula',
      label: 'Exponent–radical rules',
      latex: String.raw`a^{1/n}=\sqrt[n]{a},\qquad a^{m/n}=\sqrt[n]{a^m}=(\sqrt[n]{a})^m`,
      explanation: 'The denominator $n$ tells you to take an $n$th root. The numerator $m$ tells you to raise to the $m$th power. For even roots in the real numbers, the base must be non-negative; the examples here use positive bases.',
    },
    {
      type: 'worked-example',
      title: 'Translate each exponent, then evaluate',
      givens: String.raw`9^{1/2},\qquad 27^{1/3},\qquad 8^{2/3}`,
      steps: [
        '$9^{1/2}=\\sqrt{9}=3$.',
        '$27^{1/3}=\\sqrt[3]{27}=3$.',
        '$8^{2/3}=\\sqrt[3]{8^2}=\\sqrt[3]{64}=4$. You can also take the cube root first: $(\\sqrt[3]{8})^2=2^2=4$.',
      ],
      conclusion: 'Read the fraction in the exponent in the right order: root from the denominator, power from the numerator.',
    },
    {
      type: 'recognition',
      title: 'A quick way to read the notation',
      markdown: 'In $a^{2/3}$, say “the cube root of $a$ squared,” or “the cube root of $a^2$.” For positive $a$, both routes give the same result.',
    },
  ),
  explainedPage(
    6,
    'Simplify a radical by taking out perfect powers',
    'Factor the radicand into a perfect power times the leftover part. Take the perfect power out of the radical and leave the rest inside.',
    {
      type: 'worked-example',
      title: 'Simplify $\\sqrt{50}$',
      givens: String.raw`\sqrt{50}`,
      steps: [
        'Find a perfect square factor: $50=25\\cdot2$.',
        'Split the root: $\\sqrt{50}=\\sqrt{25}\\sqrt{2}$.',
        'Evaluate the perfect square: $\\sqrt{25}=5$.',
      ],
      conclusion: '$\\sqrt{50}=5\\sqrt{2}$. The remaining 2 stays under the root because it is not a perfect square.',
    },
    {
      type: 'worked-example',
      title: 'Simplify the cube root with a variable',
      givens: String.raw`\sqrt[3]{54x^5}`,
      steps: [
        'Separate perfect cubes: $54x^5=27x^3\\cdot2x^2$.',
        'Take the cube root of the perfect-cube factor: $\\sqrt[3]{27x^3}=3x$.',
        'Keep the leftover factor under the cube root: $\\sqrt[3]{2x^2}$.',
      ],
      conclusion: '$\\sqrt[3]{54x^5}=3x\\sqrt[3]{2x^2}$.',
    },
    {
      type: 'shortcut',
      title: 'Spot what can come out',
      markdown: 'For a square root, look for pairs of identical factors: $\\sqrt{x^2}=|x|$ in general. For a cube root, look for groups of three: $\\sqrt[3]{x^3}=x$. Here the index is 3, so a factor of $x^3$ comes out as $x$ without an absolute-value sign.',
    },
  ),
  explainedPage(
    7,
    'Add or subtract only like radicals',
    'Like radicals have the same index and the same radicand. Keep that radical and add or subtract only the outside coefficients.',
    {
      type: 'worked-example',
      title: 'Combine the like radicals',
      givens: String.raw`3\sqrt{2}+5\sqrt{2},\qquad 4\sqrt{3}-2\sqrt{3}`,
      steps: [
        'For $3\\sqrt{2}+5\\sqrt{2}$, both terms contain $\\sqrt{2}$, so add the coefficients: $(3+5)\\sqrt{2}=8\\sqrt{2}$.',
        'For $4\\sqrt{3}-2\\sqrt{3}$, both terms contain $\\sqrt{3}$, so subtract the coefficients: $(4-2)\\sqrt{3}=2\\sqrt{3}$.',
      ],
      conclusion: 'The radical part stays unchanged when the radicals are like terms.',
    },
    {
      type: 'why',
      title: 'Simplify first if the radicals look different',
      markdown: '$\\sqrt{8}+\\sqrt{18}$ does not look like a pair at first. Simplify each term: $\\sqrt{8}=2\\sqrt{2}$ and $\\sqrt{18}=3\\sqrt{2}$. Now they are like radicals, so the sum is $5\\sqrt{2}$.',
    },
    {
      type: 'trap',
      title: 'Do not add the numbers under the roots',
      markdown: 'The expression $3\\sqrt{2}+5\\sqrt{2}$ is not $8\\sqrt{4}$ or $8\\sqrt{2+2}$. The coefficients combine; the radicand stays 2.',
    },
  ),
  explainedPage(
    8,
    'Multiply radicals with the same index',
    'For radicals with the same index, multiply the coefficients and multiply the radicands. Then simplify any perfect powers that appear.',
    {
      type: 'formula',
      label: 'Product rule',
      latex: String.raw`\sqrt[n]{a}\,\sqrt[n]{b}=\sqrt[n]{ab}`,
      explanation: 'Both radicals must have the same index. The rule combines multiplication under one root; it does not turn addition into one radical.',
    },
    {
      type: 'worked-example',
      title: 'Three products from the slide',
      givens: String.raw`\sqrt{3}\sqrt{12},\qquad 2\sqrt{3}\cdot4\sqrt{6},\qquad \sqrt[3]{2x}\sqrt[3]{4x^2}`,
      steps: [
        '$\\sqrt{3}\\sqrt{12}=\\sqrt{36}=6$.',
        '$2\\sqrt{3}\\cdot4\\sqrt{6}=8\\sqrt{18}=8\\cdot3\\sqrt{2}=24\\sqrt{2}$.',
        '$\\sqrt[3]{2x}\\sqrt[3]{4x^2}=\\sqrt[3]{8x^3}=2x$.',
      ],
      conclusion: 'Multiply the outside numbers first, combine the radicands, and simplify the resulting radical.',
    },
    {
      type: 'trap',
      title: 'Keep the root indices the same',
      markdown: 'The product rule shown here combines two square roots or two cube roots because their indices match. If the indices differ, rewrite the radicals with a common index before combining them.',
    },
  ),
  explainedPage(
    9,
    'Divide radicals with the same index',
    'For matching indices, divide the radicands under one root, provided the denominator is not zero. Simplify the result afterward.',
    {
      type: 'formula',
      label: 'Quotient rule',
      latex: String.raw`\frac{\sqrt[n]{a}}{\sqrt[n]{b}}=\sqrt[n]{\frac{a}{b}},\qquad b\ne0`,
      explanation: 'The index must be the same in the numerator and denominator. The denominator condition prevents division by zero.',
    },
    {
      type: 'worked-example',
      title: 'Divide the numerical radicals',
      givens: String.raw`\frac{\sqrt{18}}{\sqrt{2}}`,
      steps: [
        'Combine the quotient under one square root: $\\sqrt{18/2}$.',
        'Divide inside: $\\sqrt{9}$.',
        'Take the principal square root: $3$.',
      ],
      conclusion: '$\\sqrt{18}/\\sqrt{2}=3$.',
    },
    {
      type: 'worked-example',
      title: 'Divide cube roots containing $x$',
      givens: String.raw`\frac{\sqrt[3]{16x^4}}{\sqrt[3]{2x}}`,
      steps: [
        'Combine the matching cube roots: $\\sqrt[3]{16x^4/(2x)}$.',
        'For $x\\ne0$, simplify the fraction inside: $\\sqrt[3]{8x^3}$.',
        'Take the cube root: $2x$.',
      ],
      conclusion: 'The quotient simplifies to $2x$; the original denominator requires $x\\ne0$.',
    },
  ),
  explainedPage(
    10,
    'Multiplication can combine under a root; addition cannot',
    'The product and quotient rules apply to radicals with matching indices. There is no matching sum or difference rule: $\\sqrt a+\\sqrt b$ is generally not $\\sqrt{a+b}$.',
    {
      type: 'formula',
      label: 'Rules the slide is contrasting',
      latex: String.raw`\sqrt{a}\,\sqrt{b}=\sqrt{ab}\qquad\text{but generally}\qquad \sqrt{a}+\sqrt{b}\ne\sqrt{a+b}`,
      explanation: 'Multiplication of two non-negative quantities can be regrouped under one square root because $\\sqrt a\\sqrt b$ squares to $ab$. Addition does not work that way.',
    },
    {
      type: 'worked-example',
      title: 'Check the false addition rule with numbers',
      givens: String.raw`\sqrt{4}+\sqrt{9}\quad\text{versus}\quad\sqrt{4+9}`,
      steps: [
        'The left side is $2+3=5$.',
        'The right side is $\\sqrt{13}$, which is not 5.',
      ],
      conclusion: 'So $\\sqrt4+\\sqrt9\\ne\\sqrt{4+9}$. Simplify each radical separately, then combine only if they become like radicals.',
    },
    {
      type: 'trap',
      title: 'A quick test for a remembered rule',
      markdown: 'If you are unsure whether an operation can move inside a root, test it with easy numbers such as 4 and 9. A single counterexample is enough to show a claimed rule is false.',
    },
  ),
  explainedPage(
    11,
    'Rationalize a denominator',
    'Rationalizing means rewriting a fraction so its denominator has no radical. Multiply the numerator and denominator by the same non-zero expression so the fraction’s value stays the same.',
    {
      type: 'worked-example',
      title: 'Remove a single square root from the denominator',
      givens: String.raw`\frac{\sqrt{5}}{\sqrt{2}}`,
      steps: [
        'Multiply by $\\sqrt{2}/\\sqrt{2}$, which equals 1 and makes the denominator a square.',
        '$\\frac{\\sqrt5}{\\sqrt2}\\cdot\\frac{\\sqrt2}{\\sqrt2}=\\frac{\\sqrt{10}}{2}$.',
      ],
      conclusion: 'The value is unchanged, and the denominator is now the rational number 2.',
    },
    {
      type: 'worked-example',
      title: 'Use a conjugate for a binomial denominator',
      givens: String.raw`\frac{2}{1+\sqrt{3}}`,
      steps: [
        'The conjugate of $1+\\sqrt3$ is $1-\\sqrt3$: keep the same two terms and change the sign between them.',
        'Multiply top and bottom by that conjugate: $\\frac{2(1-\\sqrt3)}{(1+\\sqrt3)(1-\\sqrt3)}$.',
        'Use $(u+v)(u-v)=u^2-v^2$: the denominator is $1-3=-2$.',
        'Divide by $-2$: $-(1-\\sqrt3)=\\sqrt3-1$.',
      ],
      conclusion: '$\\frac{2}{1+\\sqrt3}=\\sqrt3-1$.',
    },
    {
      type: 'recognition',
      title: 'Choose the multiplier by looking at the denominator',
      markdown: 'For a single root such as $\\sqrt2$, multiply by that same root. For a two-term denominator such as $1+\\sqrt3$, multiply by its **conjugate** $1-\\sqrt3$ so the middle terms cancel.',
    },
  ),
  explainedPage(
    12,
    'Example 1 — evaluate a negative fractional power',
    'A negative exponent means take the reciprocal. The denominator 2 in $-3/2$ means use a square root; the numerator 3 means cube the result.',
    {
      type: 'formula',
      label: 'Negative exponent rule',
      latex: String.raw`a^{-r}=\frac{1}{a^r}\qquad(a\ne0)`,
      explanation: 'A negative exponent does not make the value negative. It moves the power to the other side of the fraction bar.',
    },
    {
      type: 'worked-example',
      title: 'Compute $25^{-3/2}$',
      givens: String.raw`25^{-3/2}`,
      steps: [
        'Use the negative exponent rule: $25^{-3/2}=1/25^{3/2}$.',
        'Rewrite the fractional power as a square root and a cube: $25^{3/2}=(\\sqrt{25})^3$.',
        'Evaluate: $(\\sqrt{25})^3=5^3=125$.',
      ],
      conclusion: '$25^{-3/2}=1/125$, so choose **C**. The answer slide on page 13 confirms C.',
    },
    {
      type: 'trap',
      title: 'Do not read the minus sign as a negative answer',
      markdown: 'The exponent $-3/2$ makes the result a reciprocal; it does not mean the answer is $-125$ or $-1/125$. Since 25 is positive, the answer is positive.',
    },
  ),
  explainedPage(
    13,
    'Example 1 — answer check',
    'The green mark confirms C, $1/125$. The reciprocal from the negative exponent and the square-root step are both necessary.',
    {
      type: 'foundation',
      title: 'Match the answer to the calculation',
      markdown: '$25^{-3/2}=1/(25^{3/2})=1/(\\sqrt{25})^3=1/125$. Choice C is the only option with that value.',
    },
    {
      type: 'trap',
      title: 'A useful answer-size check',
      markdown: 'Because the exponent is negative and the base is greater than 1, the result must be between 0 and 1. That rules out 1/15, 1/25, and 1/625 before you finish calculating.',
    },
  ),
  explainedPage(
    14,
    'Example 2 — rationalize $3x/\\sqrt{x}$',
    'To remove $\\sqrt{x}$ from the denominator, multiply top and bottom by $\\sqrt{x}$. The slide assumes $x>0$, so cancellation by $x$ is valid.',
    {
      type: 'worked-example',
      title: 'Set up the rationalizing factor',
      givens: String.raw`\frac{3x}{\sqrt{x}},\qquad x>0`,
      steps: [
        'Multiply by $\\sqrt{x}/\\sqrt{x}$ so the denominator becomes $x$.',
        '$\\frac{3x}{\\sqrt{x}}\\cdot\\frac{\\sqrt{x}}{\\sqrt{x}}=\\frac{3x\\sqrt{x}}{x}$.',
        'Cancel the common factor $x$; this is allowed because $x>0$.',
      ],
      conclusion: 'The simplified rationalized form is $3\\sqrt{x}$. Page 15 marks that choice.',
    },
    {
      type: 'recognition',
      title: 'Why the assumption matters',
      markdown: '$\\sqrt{x}$ is real only for $x\\ge0$, and it is in the denominator, so it cannot be zero. Together these facts require $x>0$.',
    },
  ),
  explainedPage(
    15,
    'Example 2 — answer check',
    'The green mark confirms D, $3\\sqrt{x}$. Rationalizing and then canceling $x$ gives this result.',
    {
      type: 'foundation',
      title: 'Follow the equality chain',
      markdown: '$\\frac{3x}{\\sqrt{x}}\\cdot\\frac{\\sqrt{x}}{\\sqrt{x}}=\\frac{3x\\sqrt{x}}{x}=3\\sqrt{x}$ for $x>0$.',
    },
    {
      type: 'trap',
      title: 'Do not cancel across unlike terms',
      markdown: 'The cancellation works because $x$ is a factor in both numerator and denominator. Cancellation is not valid across a plus or minus sign.',
    },
  ),
  explainedPage(
    16,
    'Example 3 — simplify a radical with a negative exponent',
    'Break the radicand into perfect squares and leftover factors. The slide states that all variables are positive, so square roots such as $\\sqrt{x^2}$ simplify to $x$.',
    {
      type: 'worked-example',
      title: 'Prepare each factor to come out of the square root',
      givens: String.raw`\sqrt{60x^2y^6z^{-11}},\qquad x,y,z>0`,
      steps: [
        'Factor the number: $60=4\\cdot15$, so $\\sqrt{60}=2\\sqrt{15}$.',
        'Use positivity: $\\sqrt{x^2}=x$ and $\\sqrt{y^6}=y^3$.',
        'Rewrite the negative power as a denominator: $z^{-11}=1/z^{11}$.',
        'Take the square root of $z^{11}=z^{10}\\cdot z$: the denominator becomes $z^5\\sqrt z$.',
      ],
      conclusion: 'The simplified form is $\\frac{2x y^3\\sqrt{15}}{z^5\\sqrt z}$, which is choice B on the answer slide.',
    },
    {
      type: 'trap',
      title: 'Keep the $z$ factor in the denominator',
      markdown: 'Because $z^{-11}=1/z^{11}$, its square root stays in the denominator. Do not turn a negative exponent into a negative sign in front of the radical.',
    },
  ),
  explainedPage(
    17,
    'Example 3 — answer check',
    'The green mark confirms B: $\\frac{2xy^3\\sqrt{15}}{z^5\\sqrt z}$. The exponent $-11$ is why a factor involving $z$ remains in the denominator.',
    {
      type: 'foundation',
      title: 'Check the simplification one factor at a time',
      markdown: 'Squaring the coefficient gives $4\\cdot15=60$; squaring $x$ gives $x^2$; squaring $y^3$ gives $y^6$; and squaring $z^5\\sqrt z$ gives $z^{10}z=z^{11}$ in the denominator. The result therefore matches $\\sqrt{60x^2y^6/z^{11}}$.',
    },
    {
      type: 'why',
      title: 'What the positivity assumption fixes',
      markdown: 'For unrestricted real $x$, $\\sqrt{x^2}=|x|$, not always $x$. The slide’s positive-variable assumption makes $|x|=x$, $|y^3|=y^3$, and keeps $\\sqrt z$ real and nonzero.',
    },
  ),
  explainedPage(
    18,
    'Example 4 — rationalize a binomial denominator',
    'The denominator is $\\sqrt a+1$. Multiply by its conjugate, $\\sqrt a-1$, so the product becomes $a-1$ with no radical.',
    {
      type: 'worked-example',
      title: 'Multiply by the conjugate',
      givens: String.raw`\frac{\sqrt{a}+7}{\sqrt{a}+1},\qquad a>0`,
      steps: [
        'Use the conjugate of the denominator: $\\sqrt a-1$.',
        'Multiply numerator and denominator by the same factor: $\\frac{(\\sqrt a+7)(\\sqrt a-1)}{(\\sqrt a+1)(\\sqrt a-1)}$.',
        'The denominator is a difference of squares: $(\\sqrt a)^2-1^2=a-1$.',
        'Expand the numerator: $a-\\sqrt a+7\\sqrt a-7=a+6\\sqrt a-7$.',
      ],
      conclusion: 'For $a>0$ and $a\\ne1$, the rationalized form is $\\frac{a+6\\sqrt a-7}{a-1}$, choice A.',
    },
    {
      type: 'why',
      title: 'A domain detail the slide leaves unstated',
      markdown: 'The original expression is defined at $a=1$ and equals 4. But the conjugate $\\sqrt a-1$ is zero there, so multiplying by it is not allowed; choice A becomes $0/0$. Handle $a=1$ separately, and use choice A only for $a>0$, $a\\ne1$.',
    },
  ),
  explainedPage(
    19,
    'Example 4 — answer check and lecture recap',
    'The green mark confirms A, $\\frac{a+6\\sqrt a-7}{a-1}$, for $a>0$ with $a\\ne1$. At $a=1$, the original fraction equals 4 and should be evaluated before rationalizing.',
    {
      type: 'foundation',
      title: 'Check the marked numerator and denominator',
      markdown: 'The denominator uses $(u+v)(u-v)=u^2-v^2$: $(\\sqrt a+1)(\\sqrt a-1)=a-1$. The numerator expands to $(\\sqrt a+7)(\\sqrt a-1)=a+6\\sqrt a-7$.',
    },
    {
      type: 'foundation',
      title: 'The lecture in five moves',
      markdown: '- **Fractional exponent:** denominator means root; numerator means power. A negative exponent means reciprocal.  \n- **Simplify a radical:** take out perfect powers and leave the non-perfect part inside.  \n- **Add or subtract:** first make radicals alike; then combine coefficients only.  \n- **Multiply or divide:** combine radicands only when the indices match, then simplify.  \n- **Rationalize:** multiply by a root or a conjugate, and check that the multiplier is non-zero. For variables, use the stated domain assumptions.',
    },
    {
      type: 'trap',
      title: 'Final exam habit',
      markdown: 'After simplifying, check three things: whether the chosen root is the principal one, whether every denominator is non-zero, and whether a variable assumption lets you remove an absolute value.',
    },
  ),
  visualOnlyPage(20, 'Thank-you slide', 'A closing “Thank you for watching / Questions?” graphic with no additional Mathematics 0 material.'),
];

export const mathematics0Lecture6Lesson: Lesson = {
  id: 'mathematics-0-lecture-6-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 6.pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 6.pdf',
  title: 'Lecture 6: Radicals and Rationalizing Denominators (2025–2026 archive)',
  sourcePageCount: 20,
  pages,
  lastReviewed: '2026-10-14',
};
