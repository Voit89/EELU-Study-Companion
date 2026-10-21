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
    'The cover identifies Mathematics (0), Fall Semester 2025–2026, and the listed instructors. This is an older course-folder copy; use it provisionally and compare with the current Moodle lecture when it is released.',
  ),
  visualOnlyPage(
    2,
    'Historical Quiz 1 notice',
    'This slide advertises a Quiz 1 from Lectures 1–7 on Tuesday 28 October 2025, 7:30–8:00 PM, through Pearson MyLab. It is a past schedule, not a current exam announcement. The slide says “only 10 minutes” despite showing a 30-minute time window; treat that as an inconsistency in the old notice.',
  ),
  visualOnlyPage(3, 'Revision divider', 'A section divider only. The factoring material begins on page 4.'),
  visualOnlyPage(4, 'Factoring and Rational Expressions — topic divider', 'This slide introduces the two connected topics. Factoring begins on page 5.'),
  visualOnlyPage(5, 'Factoring — topic title', 'A title slide. The explanation of what factoring means starts on page 6.'),
  explainedPage(
    6,
    'Factoring: rewrite a sum as a product',
    'Factoring reverses distribution: identify an expression’s common factors and write them outside parentheses. It helps simplify expressions, solve equations, and reduce rational expressions.',
    {
      type: 'foundation',
      title: 'What is a factorization?',
      markdown: 'A **factor** is something multiplied by another expression. Expanding $3x(2x+3)$ gives $6x^2+9x$; factoring goes the other way and rewrites $6x^2+9x$ as $3x(2x+3)$.',
    },
    {
      type: 'worked-example',
      title: 'Check the slide’s example by expanding',
      givens: String.raw`6x^2+9x`,
      steps: [
        'Both terms contain $3x$, so take that common factor outside.',
        'Divide each term by $3x$: $6x^2/(3x)=2x$ and $9x/(3x)=3$.',
        'Write the quotients inside parentheses: $3x(2x+3)$.',
      ],
      conclusion: 'Multiplying back gives $6x^2+9x$, so the factors are correct.',
    },
    {
      type: 'recognition',
      title: 'Why learn factoring?',
      markdown: 'Factoring exposes pieces that can cancel in a rational expression and reveals solutions when a product is set equal to zero. It is also the first check to make before using a more specialized factoring pattern.',
    },
    {
      type: 'trap',
      title: 'Always check whether every term shares a factor',
      markdown: 'A common factor must divide every term in the expression. After factoring, expand the result once to check that no term or sign was lost.',
    },
  ),
  explainedPage(
    7,
    'First check: factor out the greatest common factor',
    'Find the largest numerical and variable factor shared by every term. Divide each term by it, then put the quotients in parentheses.',
    {
      type: 'worked-example',
      title: 'Factor $8x^3+12x^2$',
      givens: String.raw`8x^3+12x^2`,
      steps: [
        'The greatest common numerical factor of 8 and 12 is 4.',
        'Both terms contain $x^2$; the smallest exponent shared by $x^3$ and $x^2$ is 2. So the GCF is $4x^2$.',
        'Divide: $8x^3/(4x^2)=2x$ and $12x^2/(4x^2)=3$.',
        'Write the product: $4x^2(2x+3)$.',
      ],
      conclusion: '$8x^3+12x^2=4x^2(2x+3)$.',
    },
    {
      type: 'shortcut',
      title: 'Read the common variable power',
      markdown: 'When the same variable appears in each term, take the lowest exponent that occurs in all of them. For $x^3$ and $x^2$, the common factor is $x^2$, not $x^3$.',
    },
    {
      type: 'trap',
      title: 'Do not skip the common-factor check',
      markdown: 'A polynomial can have a GCF and also match another pattern afterward. Take out the GCF first, then see whether the expression in parentheses can be factored further.',
    },
  ),
  explainedPage(
    8,
    'Difference of squares',
    'A subtraction of two perfect squares factors as the difference of the roots times their sum: $a^2-b^2=(a-b)(a+b)$.',
    {
      type: 'formula',
      label: 'Difference of squares',
      latex: String.raw`a^2-b^2=(a-b)(a+b)`,
      explanation: 'Multiplying the two conjugates gives $a^2+ab-ab-b^2$; the middle terms cancel, leaving $a^2-b^2$.',
    },
    {
      type: 'worked-example',
      title: 'Factor both examples',
      givens: String.raw`x^2-25,\qquad 9y^2-16`,
      steps: [
        '$x^2-25=x^2-5^2=(x-5)(x+5)$.',
        '$9y^2-16=(3y)^2-4^2=(3y-4)(3y+4)$.',
      ],
      conclusion: 'The numbers and variable terms inside each factor are the square roots of the original square terms.',
    },
    {
      type: 'trap',
      title: 'The middle sign must be subtraction',
      markdown: 'The identity applies to a difference of squares. A sum such as $a^2+b^2$ does not become $(a-b)(a+b)$; that product expands to $a^2-b^2$.',
    },
  ),
  explainedPage(
    9,
    'Factoring by grouping',
    'For four terms, group them in pairs, factor the GCF from each pair, and look for the same binomial in both groups.',
    {
      type: 'foundation',
      title: 'The grouping pattern',
      markdown: 'For $ax+ay+bx+by$, group as $(ax+ay)+(bx+by)$. After factoring each pair, $a(x+y)+b(x+y)$ has a common binomial, so it becomes $(x+y)(a+b)$.',
    },
    {
      type: 'worked-example',
      title: 'Factor the four-term polynomial',
      givens: String.raw`x^3+3x^2+2x+6`,
      steps: [
        'Group the terms: $(x^3+3x^2)+(2x+6)$.',
        'Factor each group: $x^2(x+3)+2(x+3)$.',
        'The common binomial is $(x+3)$, so take it out: $(x+3)(x^2+2)$.',
      ],
      conclusion: '$x^3+3x^2+2x+6=(x+3)(x^2+2)$.',
    },
    {
      type: 'why',
      title: 'A source typo to correct',
      markdown: 'The first displayed line on the slide places the two groups next to each other as $(x^3+3x^2)(2x+6)$. That is not equal to the original polynomial. A plus sign is needed between the groups: $(x^3+3x^2)+(2x+6)$. The next line on the slide uses the correct factoring-by-grouping setup.',
    },
    {
      type: 'trap',
      title: 'The binomials must match after factoring',
      markdown: 'If the two groups produce opposite binomials, take out a negative sign from one group. For example, $x(x+2)-3(x+2)$ has the common binomial $(x+2)$.',
    },
  ),
  explainedPage(
    10,
    'Factor a monic trinomial',
    'For $x^2+bx+c$, find two numbers whose sum is $b$ and whose product is $c$. Those numbers become the constants in the two binomial factors.',
    {
      type: 'formula',
      label: 'Monic trinomial pattern',
      latex: String.raw`x^2+bx+c=(x+m)(x+n),\qquad m+n=b,\quad mn=c`,
      explanation: 'The first term is $x^2$, so each factor starts with $x$. When the factors are multiplied, the cross terms add to $(m+n)x$ and the constants multiply to $mn$.',
    },
    {
      type: 'worked-example',
      title: 'Factor $x^2+5x+6$',
      givens: String.raw`x^2+5x+6`,
      steps: [
        'Find a pair that multiplies to 6 and adds to 5: 2 and 3.',
        'Put them into the factors: $(x+2)(x+3)$.',
        'Check: $(x+2)(x+3)=x^2+5x+6$.',
      ],
      conclusion: 'The pair must satisfy both conditions: product 6 and sum 5.',
    },
    {
      type: 'recognition',
      title: 'Use the signs to narrow the pair',
      markdown: 'If $c$ is positive, the two numbers have the same sign. If $c$ is negative, they have opposite signs. Their sum must still match the middle coefficient $b$.',
    },
  ),
  explainedPage(
    11,
    'Factor a trinomial when the leading coefficient is not 1',
    'For $ax^2+bx+c$, multiply $a$ and $c$, find a pair whose product is $ac$ and sum is $b$, split the middle term, then group.',
    {
      type: 'worked-example',
      title: 'Factor $6x^2+11x+3$',
      givens: String.raw`6x^2+11x+3`,
      steps: [
        'Multiply the leading and constant coefficients: $a\\cdot c=6\\cdot3=18$.',
        'Find two numbers with product 18 and sum 11: 9 and 2.',
        'Split $11x$ as $9x+2x$: $6x^2+9x+2x+3$.',
        'Group: $(6x^2+9x)+(2x+3)=3x(2x+3)+1(2x+3)$.',
        'Take out the shared binomial: $(2x+3)(3x+1)$.',
      ],
      conclusion: '$6x^2+11x+3=(2x+3)(3x+1)$.',
    },
    {
      type: 'why',
      title: 'Why splitting the middle term works',
      markdown: 'The pair 9 and 2 has product $ac$ and sum $b$. That lets the four-term expression be grouped so each pair contains the same binomial.',
    },
    {
      type: 'trap',
      title: 'Check the pair before splitting',
      markdown: 'The numbers need both properties: their product must be $ac$, and their sum must be $b$. A pair that satisfies only one condition will not factor the trinomial correctly.',
    },
  ),
  explainedPage(
    12,
    'Recognize four special products',
    'Perfect-square trinomials and sums or differences of cubes have fixed patterns. Learn the signs carefully, especially the middle sign in the cube formulas.',
    {
      type: 'formula',
      label: 'Special product identities',
      latex: String.raw`\begin{aligned}a^2+2ab+b^2&=(a+b)^2\\a^2-2ab+b^2&=(a-b)^2\\a^3-b^3&=(a-b)(a^2+ab+b^2)\\a^3+b^3&=(a+b)(a^2-ab+b^2)\end{aligned}`,
      explanation: 'The first two are perfect-square trinomials. The cube formulas pair a sum or difference of cubes with a quadratic whose middle sign is opposite to the sign between the cubes.',
    },
    {
      type: 'recognition',
      title: 'Read the cube signs as a pattern',
      markdown: 'For $a^3-b^3$, the first factor is $a-b$ and every term in the second factor is positive. For $a^3+b^3$, the first factor is $a+b$, the second factor’s middle term is negative, and its last term stays positive.',
    },
    {
      type: 'trap',
      title: 'Do not invent a sum-of-squares formula',
      markdown: 'The table gives identities for square trinomials and cube sums/differences. It does not say that $a^2+b^2$ factors over the real numbers.',
    },
  ),
  explainedPage(
    13,
    'Prime polynomials and factoring completely',
    'A polynomial is prime here when it cannot be factored further over the real numbers. Keep factoring until every factor is prime over the stated number system.',
    {
      type: 'recognition',
      title: 'An example that stays prime over the reals',
      markdown: '$x^2+4$ is a sum of squares and has no real linear factors. It cannot be factored into real-coefficient linear factors, so it is prime over the reals.',
    },
    {
      type: 'worked-example',
      title: 'Factor $x^3-9x$ completely',
      givens: String.raw`x^3-9x`,
      steps: [
        'Take out the common factor $x$: $x(x^2-9)$.',
        'The parentheses are a difference of squares: $x^2-9=x^2-3^2=(x-3)(x+3)$.',
        'Write all factors together: $x(x-3)(x+3)$.',
      ],
      conclusion: 'The expression is now factored completely over the real numbers.',
    },
    {
      type: 'foundation',
      title: 'A reliable factoring order',
      markdown: 'First take out any GCF. Then check for a special pattern such as difference of squares or a cube identity. If neither applies, try grouping or trinomial methods. Finally, check every factor for another factorization.',
    },
  ),
  visualOnlyPage(14, 'Rational Expressions — section divider', 'A title slide introducing the next part of the lecture. The definition begins on page 15.'),
  explainedPage(
    15,
    'Rational expressions are fractions of polynomials',
    'A rational expression is a fraction whose numerator and denominator are algebraic expressions. Factoring the top and bottom can reveal common factors that simplify.',
    {
      type: 'foundation',
      title: 'Read the example as one fraction',
      markdown: 'The slide shows $\\frac{x^2+5x+6}{x^2+3x+2}$. Both the numerator and the denominator are polynomials, so their quotient is a rational expression.',
    },
    {
      type: 'recognition',
      title: 'The plan for simplifying',
      markdown: 'Factor the numerator and denominator completely. Cancel factors that appear in both, while keeping every value that made the original denominator zero excluded from the domain.',
    },
    {
      type: 'trap',
      title: 'Cancel factors, never terms',
      markdown: 'A common factor such as $(x+2)$ can cancel. Individual pieces of a sum cannot: $\\frac{x+2}{x+3}$ does not simplify by canceling the $x$ terms.',
    },
  ),
  explainedPage(
    16,
    'Simplify by factoring, then preserve the restrictions',
    'Factor the numerator and denominator, cancel common factors, and keep the original denominator’s zero values excluded even if a factor cancels.',
    {
      type: 'worked-example',
      title: 'Simplify the slide’s rational expression',
      givens: String.raw`\frac{x^2+5x+6}{x^2+3x+2}`,
      steps: [
        'Factor the numerator: $x^2+5x+6=(x+2)(x+3)$.',
        'Factor the denominator: $x^2+3x+2=(x+1)(x+2)$.',
        'The original denominator is zero at $x=-1$ or $x=-2$, so exclude both values.',
        'Cancel the common factor $(x+2)$ to get $(x+3)/(x+1)$.',
      ],
      conclusion: '$\\frac{x^2+5x+6}{x^2+3x+2}=\\frac{x+3}{x+1}$ for $x\\ne-1,-2$.',
    },
    {
      type: 'why',
      title: 'Why the canceled value stays excluded',
      markdown: 'At $x=-2$, the original denominator is zero, so the original fraction is undefined. Canceling $(x+2)$ gives a shorter expression, but it does not change the original domain.',
    },
    {
      type: 'trap',
      title: 'Write restrictions before canceling',
      markdown: 'Find the zeros of the original denominator first. If you wait until after cancellation, an excluded value may disappear from the simplified denominator and be mistakenly allowed back in.',
    },
  ),
  explainedPage(
    17,
    'Practice — common factors, grouping, and trinomials',
    'For each problem, identify the method first: GCF, grouping, or a trinomial pair. “Factor” usually means continue until the expression is fully factored over the reals.',
    {
      type: 'worked-example',
      title: 'Example 1: factor $15+25x$',
      givens: String.raw`15+25x`,
      steps: [
        'The greatest common factor of 15 and 25 is 5.',
        'Divide both terms by 5: $15+25x=5(3+5x)$.',
        'This is the expected fully factored integer-coefficient form, choice B on page 18.',
      ],
      conclusion: 'Note: choice D, $25(0.6+x)$, also expands to $15+25x$. The multiple-choice item is ambiguous unless “factor out the GCF using integer coefficients” is intended.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: factor $x^2y+y^2x^3$',
      givens: String.raw`x^2y+y^2x^3`,
      steps: [
        'The shared factor is $x^2y$.',
        'Divide each term by it: $x^2y/(x^2y)=1$ and $x^3y^2/(x^2y)=xy$.',
        'So the complete factorization is $x^2y(1+xy)$, choice C.',
      ],
      conclusion: 'Choice A is an equivalent partial factorization, $xy(x+x^2y)$; factoring out its remaining $x$ gives choice C.',
    },
    {
      type: 'worked-example',
      title: 'Example 3: factor by grouping',
      givens: String.raw`x^3+3x^2+4x+12`,
      steps: [
        'Group: $(x^3+3x^2)+(4x+12)$.',
        'Take out the GCF from each group: $x^2(x+3)+4(x+3)$.',
        'Factor out the shared binomial: $(x+3)(x^2+4)$.',
      ],
      conclusion: 'Choice A is fully factored over the reals because $x^2+4$ has no real factors.',
    },
    {
      type: 'worked-example',
      title: 'Example 4: factor $x^2-6x+8$',
      givens: String.raw`x^2-6x+8`,
      steps: [
        'Find numbers with product 8 and sum $-6$: $-2$ and $-4$.',
        'Use them in the factors: $(x-2)(x-4)$.',
        'Check: the cross terms are $-2x-4x=-6x$ and the constant is 8.',
      ],
      conclusion: 'Choice A is correct; page 18 marks it.',
    },
  ),
  explainedPage(
    18,
    'Practice answers — factor completely',
    'The answer slide marks B, C, A, and A for Examples 1–4. Two questions have equivalent alternative forms, so focus on the fully factored GCF form.',
    {
      type: 'foundation',
      title: 'Confirm the four marked answers',
      markdown: '1. $5(3+5x)$ expands to $15+25x$ and extracts the integer GCF.  \n2. $x^2y(1+xy)$ extracts the full common factor.  \n3. $(x+3)(x^2+4)$ expands to $x^3+3x^2+4x+12$.  \n4. $(x-2)(x-4)$ expands to $x^2-6x+8$.',
    },
    {
      type: 'why',
      title: 'Read the first two answer choices carefully',
      markdown: 'For Example 1, D is algebraically equal to the original expression, even though B is the conventional form using the GCF. For Example 2, A is a correct but incomplete factorization; C takes out the entire GCF. The answer slide marks the expected forms B and C.',
    },
  ),
  explainedPage(
    19,
    'Practice — quadratics, difference of squares, and cubes',
    'Use the $ac$ method for a non-monic quadratic, difference of squares for two square terms separated by subtraction, and the sum-of-cubes pattern for $y^3+27$.',
    {
      type: 'worked-example',
      title: 'Example 5: factor $10x^2+11x-6$',
      givens: String.raw`10x^2+11x-6`,
      steps: [
        'Compute $ac=10(-6)=-60$.',
        'The pair 15 and $-4$ multiplies to $-60$ and adds to 11.',
        'Split the middle term and group: $10x^2+15x-4x-6=5x(2x+3)-2(2x+3)$.',
        'Factor the common binomial: $(5x-2)(2x+3)$.',
      ],
      conclusion: 'Choice D is correct.',
    },
    {
      type: 'worked-example',
      title: 'Examples 6 and 7: difference of squares',
      givens: String.raw`x^2-16,\qquad 9p^2-1`,
      steps: [
        '$x^2-16=x^2-4^2=(x-4)(x+4)$, choice B.',
        '$9p^2-1=(3p)^2-1^2=(3p-1)(3p+1)$, choice A.',
      ],
      conclusion: 'Identify the square roots first, then use one plus factor and one minus factor.',
    },
    {
      type: 'worked-example',
      title: 'Example 8: sum of cubes',
      givens: String.raw`y^3+27`,
      steps: [
        'Rewrite 27 as $3^3$: $y^3+3^3$.',
        'Use $a^3+b^3=(a+b)(a^2-ab+b^2)$.',
        'Substitute $a=y$, $b=3$: $(y+3)(y^2-3y+9)$.',
      ],
      conclusion: 'Choice B is correct; the middle sign in the second factor is minus.',
    },
  ),
  explainedPage(
    20,
    'Practice answers — patterns checked',
    'The answer slide marks D, B, A, and B for Examples 5–8. Each factorization can be verified by multiplying its factors back together.',
    {
      type: 'foundation',
      title: 'Match the answers to the methods',
      markdown: '5. $(5x-2)(2x+3)$ gives $10x^2+11x-6$.  \n6. $(x-4)(x+4)$ is $x^2-16$.  \n7. $(3p-1)(3p+1)$ is $9p^2-1$.  \n8. $(y+3)(y^2-3y+9)$ is $y^3+27$.',
    },
    {
      type: 'trap',
      title: 'The signs reveal the pattern',
      markdown: 'A difference of squares uses conjugates. A sum of cubes uses a plus in the first factor and a minus in the middle of the second factor.',
    },
  ),
  explainedPage(
    21,
    'Practice — fractions and rational expressions',
    'Reduce numerical fractions by their GCF; factor polynomials before canceling; and when dividing fractions, multiply by the reciprocal of the second fraction.',
    {
      type: 'worked-example',
      title: 'Example 9: simplify $21/45$',
      givens: String.raw`\frac{21}{45}`,
      steps: [
        'The GCF of 21 and 45 is 3.',
        'Divide top and bottom by 3: $21/45=7/15$.',
      ],
      conclusion: 'Choice B is correct; 7 and 15 share no common factor greater than 1.',
    },
    {
      type: 'worked-example',
      title: 'Example 10: simplify a rational expression',
      givens: String.raw`\frac{3x+6}{x^2+4x+4}`,
      steps: [
        'Factor: $3x+6=3(x+2)$ and $x^2+4x+4=(x+2)^2$.',
        'Cancel one common factor $(x+2)$: $3/(x+2)$.',
        'The original denominator is zero at $x=-2$, so keep $x\\ne-2$.',
      ],
      conclusion: 'Choice A is correct, with restriction $x\\ne-2$.',
    },
    {
      type: 'worked-example',
      title: 'Example 11: divide two fractions',
      givens: String.raw`\frac{4/5}{2/3}`,
      steps: [
        'Keep the first fraction and flip the second: $\\frac45\\cdot\\frac32$.',
        'Multiply: $12/10$.',
        'Reduce by 2: $6/5$.',
      ],
      conclusion: 'Choice B is correct.',
    },
    {
      type: 'worked-example',
      title: 'Example 12: divide two rational expressions',
      givens: String.raw`\frac{\dfrac{x^2+x}{x+4}}{\dfrac{x+1}{x^2-16}}`,
      steps: [
        'Rewrite division as multiplication by the reciprocal: $\\frac{x^2+x}{x+4}\\cdot\\frac{x^2-16}{x+1}$.',
        'Factor: $x^2+x=x(x+1)$ and $x^2-16=(x-4)(x+4)$.',
        'Cancel $(x+1)$ and $(x+4)$ to get $x(x-4)$.',
        'Keep the original restrictions: $x\\ne-4,4$ from $x^2-16$, and $x\\ne-1$ because the fraction being divided by cannot be zero.',
      ],
      conclusion: 'Choice D is correct for $x\\ne-4,-1,4$.',
    },
  ),
  explainedPage(
    22,
    'Practice answers — preserve the original domain',
    'The answer slide marks B, A, B, and D for Examples 9–12. Canceled factors still tell you which original values were excluded.',
    {
      type: 'foundation',
      title: 'Check each result',
      markdown: '9. $21/45=7/15$.  \n10. $3(x+2)/(x+2)^2=3/(x+2)$, with $x\\ne-2$.  \n11. $(4/5)\\div(2/3)=(4/5)(3/2)=6/5$.  \n12. $[x(x+1)/(x+4)]\\div[(x+1)/((x-4)(x+4))]=x(x-4)$, with $x\\ne-4,-1,4$.',
    },
    {
      type: 'trap',
      title: 'The simplified expression may have a wider domain',
      markdown: 'For Example 12, the expression $x(x-4)$ exists at $x=-4,-1,4$, but the original compound fraction does not. Keep the original restrictions beside the simplified answer.',
    },
  ),
  explainedPage(
    23,
    'Practice — add fractions with unlike denominators',
    'Use a common denominator, rewrite each numerator, combine like terms in the numerator, and factor the final denominator to state restrictions.',
    {
      type: 'worked-example',
      title: 'Example 13: compute $7/6-4/15$',
      givens: String.raw`\frac{7}{6}-\frac{4}{15}`,
      steps: [
        'The least common denominator of 6 and 15 is 30.',
        'Rewrite: $7/6=35/30$ and $4/15=8/30$.',
        'Subtract the numerators: $35/30-8/30=27/30$.',
        'Reduce by 3: $27/30=9/10$.',
      ],
      conclusion: 'Choice D is correct.',
    },
    {
      type: 'worked-example',
      title: 'Example 14: add rational expressions',
      givens: String.raw`\frac{3}{2x+2}+\frac{5}{x^2-1}`,
      steps: [
        'Factor denominators: $2x+2=2(x+1)$ and $x^2-1=(x+1)(x-1)$.',
        'Use the common denominator $2(x+1)(x-1)$. The first numerator becomes $3(x-1)$; the second becomes $10$.',
        'Add the numerators: $3(x-1)+10=3x+7$.',
        'The original denominators require $x\\ne-1$ and $x\\ne1$.',
      ],
      conclusion: '$\\frac{3}{2x+2}+\\frac{5}{x^2-1}=\\frac{3x+7}{2(x+1)(x-1)}$, choice C, for $x\\ne-1,1$.',
    },
    {
      type: 'trap',
      title: 'Do not add denominators',
      markdown: 'Fractions are added only after both have the same denominator. Add the adjusted numerators and keep that common denominator.',
    },
  ),
  explainedPage(
    24,
    'Practice answers — final check and lecture recap',
    'The answer slide marks D for both Examples 13 and 14? Check carefully: Example 13 is D, while Example 14 is C. The green highlights confirm those choices.',
    {
      type: 'foundation',
      title: 'Read the two highlighted choices',
      markdown: 'Example 13: $7/6-4/15=9/10$, choice D. Example 14: the common-denominator numerator is $3(x-1)+10=3x+7$, giving choice C.',
    },
    {
      type: 'foundation',
      title: 'The lecture in five moves',
      markdown: '- **Start with a GCF** before trying another factoring pattern.  \n- **Recognize patterns:** difference of squares, special trinomials, and sums/differences of cubes.  \n- **Use grouping** when four terms produce the same binomial after each pair is factored.  \n- **Simplify rational expressions** by factoring before canceling, never canceling separate terms.  \n- **Preserve restrictions** from the original denominators, even if the factor that caused them cancels.',
    },
    {
      type: 'trap',
      title: 'One final source-quality note',
      markdown: 'Page 9 contains a missing plus sign in its first grouping example. The correct grouping is $(x^3+3x^2)+(2x+6)$, which factors to $(x+3)(x^2+2)$.',
    },
  ),
  visualOnlyPage(25, 'Thank-you slide', 'A closing EELU “Thank you for watching / Questions?” graphic with no further mathematics content.'),
];

export const mathematics0Lecture7Lesson: Lesson = {
  id: 'mathematics-0-lecture-7-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 7.pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 7.pdf',
  title: 'Lecture 7: Factoring and Rational Expressions (2025–2026 archive)',
  sourcePageCount: 25,
  pages,
  lastReviewed: '2026-10-14',
};
