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

function dividerPage(sourcePage: number, title: string, description: string): LessonPage {
  return {
    sourcePage,
    title,
    coverage: 'visual-only',
    blocks: [{ type: 'source-note', text: description }],
  };
}

const pages: LessonPage[] = [
  {
    sourcePage: 1,
    title: 'Mathematics (1) — archived course cover',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'The cover identifies Mathematics (1), Dr. Amany Magdy, Dr. Talat Eldanaf, Dr. Mohamed Ghaleb, Fall Semester, and year 2025–2026. This is an older archive reference; check the current Moodle lecture when it is released. Across the deck, the topics move from exponents to polynomials and then quadratic equations. The cover itself has no mathematics content.',
      },
    ],
  },
  dividerPage(2, 'Revision — section divider', 'This slide is titled “Revision.” The lecture topic begins on source page 3.'),
  dividerPage(3, 'Exponents, Polynomials, and Quadratic Equations — section divider', 'This slide introduces the three topics. The first content slide is the Exponents divider on page 4.'),
  dividerPage(4, 'Exponents — section divider', 'This slide names the first topic. The definition of an exponent begins on source page 5.'),
  explainedPage(
    5,
    'What an exponent means',
    'An exponent counts how many times the base is used as a factor: $2^3=2\\times2\\times2=8$.',
    {
      type: 'recognition',
      title: 'Decode the notation',
      markdown: 'In $a^n$, **$a$ is the base** (the repeated factor) and **$n$ is the exponent or power** (the number of copies of the base). A superscript is written small and above the base.',
    },
    {
      type: 'worked-example',
      title: 'Read the slide’s example',
      givens: '$2^3$',
      steps: [
        'The base is $2$ and the exponent is $3$.',
        'Write three copies of the base multiplied: $2^3=2\\times2\\times2$.',
        'Multiply: $2\\times2=4$, then $4\\times2=8$.',
      ],
      conclusion: 'So $2^3=8$. The exponent is not an instruction to multiply $2$ by $3$.',
    },
    {
      type: 'foundation',
      title: 'Special cases shown on the slide',
      markdown: '- **Square:** $x^2=x\\times x$; there are two factors of $x$.  \n- **Cube:** $x^3=x\\times x\\times x$; there are three factors.  \n- **Power of 1:** $a^1=a$; there is one factor, so the value is unchanged.  \n- **Power of 0:** $a^0=1$ when $a\\ne0$. The nonzero condition matters; $0^0$ is not covered by this rule.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If a number or variable has a small superscript, expand it into that many repeated factors before calculating. For $x^4$, write $x\\times x\\times x\\times x$.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not confuse a power with multiplication: $2^3=8$, while $2\\times3=6$. The exponent tells you how many base factors to multiply.',
    },
  ),
  explainedPage(
    6,
    'Square roots and inverse operations',
    'Squaring and taking a square root undo one another for a nonnegative number: $\\sqrt{25}=5$ because $5^2=25$. The equation $x^2=25$, however, has two solutions: $x=\\pm5$.',
    {
      type: 'recognition',
      title: 'Decode the notation',
      markdown: '**$\\sqrt{a}$** is the principal square root: the nonnegative number whose square is $a$. **$x^2=25$** asks which numbers square to 25. The sign **$\\pm$** means “both plus and minus.”',
    },
    {
      type: 'worked-example',
      title: 'Distinguish a root symbol from an equation',
      steps: [
        'Since $5\\times5=25$, the principal square root is $\\sqrt{25}=5$.',
        'Both $5^2=25$ and $(-5)^2=25$, so the equation $x^2=25$ has solutions $x=5$ and $x=-5$.',
        'Write the pair of equation solutions as $x=\\pm5$; do not write $\\sqrt{25}=\\pm5$ when using the principal-root symbol.',
      ],
      conclusion: 'The slide’s “two square roots” refers to the two numbers whose square is 25. The radical symbol alone names the nonnegative one.',
    },
    {
      type: 'foundation',
      title: 'Connect roots and powers',
      markdown: 'The slide shows $(\\sqrt{a})^2=a$ for nonnegative $a$: for example, $(\\sqrt{9})^2=3^2=9$. It also shows $\\sqrt{a^2}=a$ for the nonnegative example $a=4$, giving $\\sqrt{4^2}=\\sqrt{16}=4$. For a general real $a$, the precise rule is $\\sqrt{a^2}=|a|$, because a principal square root cannot be negative.',
    },
    {
      type: 'source-note',
      text: 'Notation clarification: the slide writes “√25 = ±5” and “√(a²) = a.” The first is more precisely “the equation x² = 25 has solutions x = ±5”; the radical √25 equals 5. The second identity is correct for the slide’s nonnegative example a = 4; for any real a, √(a²) = |a|.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'When solving $x^2=25$, keep both signs because either number squares to 25. When evaluating the symbol $\\sqrt{25}$, use the principal root $5$ only.',
    },
  ),
  explainedPage(
    7,
    'Exponents in algebraic terms',
    'A variable can be repeated just like a number: $x^2=x\\times x$ and $y^3=y\\times y\\times y$.',
    {
      type: 'recognition',
      title: 'Decode each part of a term',
      markdown: 'A **variable** is a letter standing for a number. In $5x^2$, the **coefficient** is $5$ and the variable part is $x^2$. In $7y^3$, the coefficient is $7$, the variable is $y$, and its exponent is $3$.',
    },
    {
      type: 'worked-example',
      title: 'Expand the variable powers',
      steps: [
        'For $x^2$, the exponent 2 means two copies of $x$: $x\\times x$.',
        'For $y^3$, the exponent 3 means three copies of $y$: $y\\times y\\times y$.',
        'In $7y^3$, the 7 multiplies that variable product: $7\\times y\\times y\\times y$.',
      ],
      conclusion: 'The exponent belongs to the variable, and the coefficient is the numerical factor in front.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'In $7y^3$, the exponent applies to $y$, not to the coefficient 7. It means $7\\times y\\times y\\times y$, not $(7y)^3$.',
    },
  ),
  explainedPage(
    8,
    'Reading algebraic exponents',
    'Read $x^2$ as “x squared,” $x^3$ as “x cubed,” and $x^n$ as “x to the power $n$”; expand the exponent only on the variable it follows.',
    {
      type: 'worked-example',
      title: 'Translate each expression into factors',
      steps: [
        '$3x^2=3\\times x\\times x$: coefficient 3, then two factors of $x$.',
        '$-5y^4=-5\\times y\\times y\\times y\\times y$: the negative coefficient is $-5$ and there are four factors of $y$.',
        '$2ab^2=2\\times a\\times b\\times b$: only $b$ has the exponent 2; $a$ appears once.',
      ],
      conclusion: 'Attach each exponent to the base immediately beside it. A coefficient does not inherit the variable’s exponent.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Point to the base directly under each superscript before expanding. In $2ab^2$, the superscript follows $b$, so it repeats $b$ and leaves $2$ and $a$ as they are.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'The minus sign in $-5y^4$ is part of the coefficient. The exponent 4 repeats $y$; it does not repeat the entire term $-5y$.',
    },
  ),
  explainedPage(
    9,
    'Product rule for exponents',
    'When multiplying powers with the same base, keep the base and add the exponents: $a^m\\cdot a^n=a^{m+n}$.',
    {
      type: 'recognition',
      title: 'Decode the rule',
      markdown: '**$a$** is the common base; **$m$ and $n$** count repeated factors. This rule combines multiplication of powers that have the same base.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If two powers are multiplied and their bases match exactly, add the exponents. If the bases differ, this rule does not combine them.',
    },
    {
      type: 'worked-example',
      title: 'Follow the slide’s examples',
      steps: [
        '$2^3\\cdot2^4$ has seven factors of 2 altogether: $2^{3+4}=2^7$.',
        'For variables, $x^2\\cdot x^5=x^{2+5}=x^7$. The base $x$ stays the same.',
      ],
      conclusion: 'Adding exponents is a compact way to count all the repeated copies of the same factor.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not multiply the exponents in a product. For $x^2x^5$, add 2 and 5 to get $x^7$; multiplying 2 by 5 would apply a different rule.',
    },
  ),
  explainedPage(
    10,
    'Power rule and zero exponent rule',
    'A power raised to another power multiplies the exponents: $(a^m)^n=a^{mn}$. A nonzero base to the zero power equals 1.',
    {
      type: 'recognition',
      title: 'Decode the rules',
      markdown: 'In $(a^m)^n$, the inner power $a^m$ is repeated $n$ times, so the total number of $a$ factors is $m\\times n$. The zero exponent rule is $a^0=1$ only when $a\\ne0$.',
    },
    {
      type: 'worked-example',
      title: 'Use the power rule',
      steps: [
        'For $(2^3)^2$, there are two groups, each with three factors of 2: $2^3\\times2^3$.',
        'Use the product rule to count six factors: $2^{3+3}=2^6$. This matches the power rule $2^{3\\cdot2}=2^6$.',
        'For $(x^4)^3$, multiply the exponents: $x^{4\\cdot3}=x^{12}$.',
      ],
      conclusion: 'For a power raised to a power, multiply the exponents; do not change the base.',
    },
    {
      type: 'worked-example',
      title: 'Use the zero exponent rule',
      steps: [
        'The slide gives $5^0=1$; 5 is a nonzero base.',
        'It also gives $x^0=1$, with the condition $x\\ne0$.',
      ],
      conclusion: 'The zero exponent removes the power and leaves 1, provided the base is not zero.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not add exponents in $(x^4)^3$; the inner power is itself being raised to a power, so multiply $4\\times3$. Also keep the condition $x\\ne0$ for $x^0=1$.',
    },
  ),
  explainedPage(
    11,
    'Negative exponent rule',
    'A negative exponent means take the reciprocal: $a^{-n}=\\frac{1}{a^n}$ for $a\\ne0$.',
    {
      type: 'recognition',
      title: 'Decode the symbols',
      markdown: 'The exponent $-n$ is negative. The **reciprocal** of a nonzero number is 1 divided by that number; for example, the reciprocal of 8 is $\\frac18$. The base cannot be zero because division by zero is undefined.',
    },
    {
      type: 'worked-example',
      title: 'Follow the slide’s examples',
      steps: [
        '$2^{-3}=\\frac{1}{2^3}$: move the power to the denominator and make the exponent positive.',
        'Calculate the denominator: $2^3=2\\times2\\times2=8$. Therefore $2^{-3}=\\frac18$.',
        '$x^{-2}=\\frac{1}{x^2}$, provided $x\\ne0$.',
      ],
      conclusion: 'The negative exponent changes which side of the fraction the power belongs on; it does not make the value negative.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If a power has a negative exponent, rewrite it as a reciprocal with a positive exponent before simplifying.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not read $2^{-3}$ as $-2^3=-8$. The negative sign is in the exponent, so $2^{-3}=\\frac18$.',
    },
  ),
  dividerPage(12, 'Polynomials — section divider', 'This slide introduces the polynomial topic. The definition begins on source page 13.'),
  explainedPage(
    13,
    'What is a polynomial?',
    'A polynomial is a sum or difference of terms whose variable powers are whole-number powers; the slide’s examples are $3x^2+2x+7$ and $-5y^3+y-4$.',
    {
      type: 'recognition',
      title: 'Decode the parts',
      markdown: 'A **term** is a piece separated by plus or minus signs. A **coefficient** is its numerical factor. A **variable** is a letter such as $x$ or $y$. The slide says the variable exponent is a whole number; in these polynomial examples, that means powers such as 0, 1, 2, 3, and so on.',
    },
    {
      type: 'worked-example',
      title: 'Identify terms in the examples',
      steps: [
        'In $3x^2+2x+7$, the terms are $3x^2$, $2x$, and $7$. Their variable powers are 2, 1, and 0 (the constant 7 has no variable).',
        'In $-5y^3+y-4$, the terms are $-5y^3$, $y$, and $-4$. Their variable powers are 3, 1, and 0.',
        'Each displayed variable exponent is a nonnegative whole number, so the expressions fit the slide’s description of polynomials.',
      ],
      conclusion: 'Check the powers on the variables when deciding whether an expression has the form described on this page.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Look term by term. A variable in a denominator or a negative or fractional exponent does not have the whole-number power form listed on this slide.',
    },
  ),
  explainedPage(
    14,
    'Polynomial names and degree',
    'Count the terms to name a monomial, binomial, or trinomial; find the degree by taking the highest variable exponent.',
    {
      type: 'recognition',
      title: 'Key words',
      markdown: '**Monomial** means one term, **binomial** means two terms, and **trinomial** means three terms. The slide uses “polynomial” for any expression with one or more terms. The **degree** in the displayed one-variable examples is the greatest exponent of the variable.',
    },
    {
      type: 'worked-example',
      title: 'Count terms and find the degree',
      steps: [
        '$4x^5+3x^2-7$ has three terms, so it is a trinomial. Its exponents are 5, 2, and 0; the greatest is 5, so its degree is 5.',
        '$2y^3-y^2+9$ has three terms and the greatest exponent is 3, so its degree is 3.',
        '$6x-1$ has two terms and the greatest exponent is 1, so its degree is 1.',
      ],
      conclusion: 'Term count gives the name; the largest exponent gives the degree for the examples on this page.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'First split at the plus and minus signs to count terms. Then scan the variable exponents and choose the largest one.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not use the number of terms as the degree. A trinomial can have degree 5, as $4x^5+3x^2-7$ shows.',
    },
  ),
  explainedPage(
    15,
    'Like terms and simplifying polynomials',
    'Combine terms only when their variable parts match exactly; add or subtract their coefficients and keep the matching variable part.',
    {
      type: 'recognition',
      title: 'Decode like and unlike terms',
      markdown: '**Like terms** have the same variable raised to the same power, such as $3x^2$ and $5x^2$. **Unlike terms** differ in variable or exponent, such as $2x^2$ and $4x^3$. The coefficient may differ; that is what you combine.',
    },
    {
      type: 'worked-example',
      title: 'Example 1 — combine matching terms',
      givens: '$3x^2+5x^2$',
      steps: [
        'Both terms contain $x^2$, so they are like terms.',
        'Add the coefficients: $3+5=8$.',
        'Keep the common variable part: $8x^2$.',
      ],
      conclusion: '$3x^2+5x^2=8x^2$.',
    },
    {
      type: 'worked-example',
      title: 'Example 2 — leave unlike terms separate',
      givens: '$2y^3-7y^3+y$',
      steps: [
        'The first two terms both contain $y^3$, so combine their coefficients: $2-7=-5$.',
        'The last term is $y=y^1$, not $y^3$, so it is unlike and stays separate.',
        'Write the simplified expression as $-5y^3+y$.',
      ],
      conclusion: 'Only the matching $y^3$ terms combine.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not add exponents or combine different powers when collecting like terms. $x^2$ and $x^3$ are different variable parts, so their terms stay separate.',
    },
  ),
  explainedPage(
    16,
    'Adding and multiplying polynomials',
    'For addition, collect matching powers and combine coefficients. For multiplication, distribute each term across every term in the other factor.',
    {
      type: 'worked-example',
      title: 'Add the two polynomials',
      givens: '$(2x^2+3x+1)+(x^2-4x+5)$',
      steps: [
        'Group matching powers: $(2x^2+x^2)+(3x-4x)+(1+5)$.',
        'Add the coefficients of each group: $2+1=3$, $3-4=-1$, and $1+5=6$.',
        'Write the result: $3x^2-x+6$.',
      ],
      conclusion: 'The sum is $3x^2-x+6$.',
    },
    {
      type: 'worked-example',
      title: 'Multiply using the distributive property',
      givens: '$(x+2)(x+3)$',
      steps: [
        'Distribute the first term $x$ across the second parentheses: $x(x+3)=x^2+3x$.',
        'Distribute the second term $2$ across both terms: $2(x+3)=2x+6$.',
        'Put the four products together: $x^2+3x+2x+6$.',
        'Combine like terms $3x+2x=5x$: the result is $x^2+5x+6$.',
      ],
      conclusion: 'Each term in the first factor must multiply each term in the second factor.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Between two parentheses, multiplication is implied: $(x+2)(x+3)$. Use distribution to create every pairwise product, then collect like terms.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'In $(x+2)(x+3)$, do not multiply only $x\\cdot x$ and $2\\cdot3$. The cross-products $x\\cdot3$ and $2\\cdot x$ are also required.',
    },
  ),
  dividerPage(17, 'Quadratic Equations — section divider', 'This slide names the final topic. The definition and standard form begin on source page 18.'),
  explainedPage(
    18,
    'Quadratic equations and standard form',
    'A quadratic equation has degree 2 and can be written $ax^2+bx+c=0$ with $a\\ne0$; the nonzero $a$ keeps the squared term present.',
    {
      type: 'recognition',
      title: 'Decode the standard form',
      markdown: 'In $ax^2+bx+c=0$, $x$ is the variable, $a$, $b$, and $c$ are number coefficients/constants, and $a\\ne0$ means $a$ cannot be zero. The highest power is then $x^2$, so the equation is degree 2.',
    },
    {
      type: 'worked-example',
      title: 'Match the examples to the form',
      steps: [
        '$x^2-5x+6=0$ has $a=1$, $b=-5$, and $c=6$.',
        '$2y^2+3y-4=0$ uses $y$ as its variable; its coefficients are $a=2$, $b=3$, and $c=-4$.',
        'Both have a nonzero coefficient on the squared variable and equal zero, so each is quadratic in the displayed variable.',
      ],
      conclusion: 'The lecture says it will focus first on the Square Root Method for special cases and the Factoring Method.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Check the highest variable exponent. If it is 2 and the squared term has a nonzero coefficient, rewrite the equation with all terms on one side and zero on the other before solving.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'If $a=0$, the $x^2$ term disappears and the equation is not quadratic. That is why the standard form includes $a\\ne0$.',
    },
  ),
  explainedPage(
    19,
    'Square-root and factoring methods',
    'For the special equation $x^2=k$, take both square-root signs; for a factored equation, set each factor equal to zero.',
    {
      type: 'worked-example',
      title: 'Square Root Method — slide example',
      givens: '$x^2=25$',
      steps: [
        'Ask which numbers square to 25.',
        '$5^2=25$ and $(-5)^2=25$.',
        'Therefore $x=\\pm5$, meaning $x=5$ or $x=-5$.',
      ],
      conclusion: 'The slide’s special-case pattern is an isolated square equal to a number.',
    },
    {
      type: 'recognition',
      title: 'Factoring Method shown on the slide',
      markdown: 'The slide lists three moves: (1) write the equation in standard form, (2) factor the quadratic into two binomials, and (3) use the **Zero Product Property**: if a product is zero, at least one factor is zero.',
    },
    {
      type: 'worked-example',
      title: 'Follow the factoring example',
      givens: '$x^2+5x+6=0$',
      steps: [
        'Factor the quadratic: $x^2+5x+6=(x+2)(x+3)$.',
        'Set the product equal to zero: $(x+2)(x+3)=0$.',
        'Set each factor to zero: $x+2=0$ or $x+3=0$.',
        'Solve the small equations: $x=-2$ or $x=-3$.',
      ],
      conclusion: 'Both values solve the original quadratic.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'When taking square roots to solve $x^2=25$, include both $5$ and $-5$. In factoring, do not stop after writing the two factors; solve each zero-factor equation.',
    },
  ),
  explainedPage(
    20,
    'Exponent practice — questions 1 to 4',
    'These four questions ask you to choose the product rule, negative-exponent rule, power rule, or a combination of rules.',
    {
      type: 'recognition',
      title: 'Read each question and its choices',
      markdown: '**1.** Which expression equals $2^3\\times2^4$? A) $2^7$; B) $2^{12}$; C) $2^1$; D) $2^{81}$.  \n**2.** What is $5^{-2}$? A) $-25$; B) $\\frac1{25}$; C) $25$; D) $-\\frac1{25}$.  \n**3.** Simplify $(x^3)^4$. A) $x^7$; B) $x^{12}$; C) $x^1$; D) $x^{81}$.  \n**4.** Simplify $\\frac{x^5\\cdot x^{-2}}{x^3}$. A) $x^0$; B) $x^2$; C) $x^4$; D) $1$.',
    },
    {
      type: 'recognition',
      title: 'Choose the rule before calculating',
      markdown: 'For question 1, same base multiplied means add exponents. For question 2, a negative exponent means reciprocal. For question 3, a power raised to a power means multiply exponents. For question 4, simplify the numerator first, then divide powers with the same base. The answers are highlighted on the next source page.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Keep the question’s structure intact: multiplication of same-base powers adds exponents, while a power raised to a power multiplies them.',
    },
  ),
  explainedPage(
    21,
    'Exponent practice — worked answers 1 to 4',
    'The highlighted choices are A, B, B, and D: $2^7$, $\\frac1{25}$, $x^{12}$, and $1$.',
    {
      type: 'worked-example',
      title: '1. Multiply powers with the same base',
      givens: '$2^3\\times2^4$',
      steps: [
        'Both powers have base 2, so add their exponents: $2^{3+4}$.',
        'Add: $3+4=7$, giving $2^7$.',
      ],
      conclusion: 'Choice A is highlighted.',
    },
    {
      type: 'worked-example',
      title: '2. Rewrite a negative exponent',
      givens: '$5^{-2}$',
      steps: [
        'Take the reciprocal and make the exponent positive: $5^{-2}=\\frac1{5^2}$.',
        'Calculate $5^2=25$, so $5^{-2}=\\frac1{25}$.',
      ],
      conclusion: 'Choice B is highlighted; the value is positive.',
    },
    {
      type: 'worked-example',
      title: '3. Raise a power to a power',
      givens: '$(x^3)^4$',
      steps: [
        'Multiply the exponents: $3\\times4=12$.',
        'Keep the base $x$: $(x^3)^4=x^{12}$.',
      ],
      conclusion: 'Choice B is highlighted.',
    },
    {
      type: 'worked-example',
      title: '4. Combine numerator and denominator powers',
      givens: '$\\frac{x^5\\cdot x^{-2}}{x^3}$',
      steps: [
        'Combine the numerator using the product rule: $x^5\\cdot x^{-2}=x^{5+(-2)}=x^3$.',
        'Now divide powers with the same nonzero base: $\\frac{x^3}{x^3}=x^{3-3}=x^0=1$.',
        'The original expression is defined only for $x\\ne0$, because it contains division by $x^3$ and a negative power of $x$.',
      ],
      conclusion: 'Choice D, $1$, is highlighted. However, choice A, $x^0$, also equals 1 for $x\\ne0$, which is required by the original expression. As printed, both A and D are equivalent; the slide highlights D.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'In question 4, apply the negative exponent inside the numerator carefully: $5+(-2)=3$. Keep the condition $x\\ne0$ while simplifying the fraction.',
    },
  ),
  explainedPage(
    22,
    'Polynomial practice — questions 5 to 8',
    'These questions test polynomial form, degree, and combining like terms.',
    {
      type: 'recognition',
      title: 'Read each question and its choices',
      markdown: '**5.** Which is **not** a polynomial? A) $3^2+2x-7$; B) $x^3-\\frac4x$; C) $5y^4+y^2+1$; D) $-2x+9$.  \n**6.** Which is quadratic? A) $4x+7$; B) $x^2-5x+6$; C) $3x^3-2$; D) $7$.  \n**7.** What is the degree of $7x^5-3x^2+4x-6$? A) 2; B) 4; C) 5; D) 6.  \n**8.** Simplify $(3x^2+5x-2)+(2x^2-7x+4)$. Choices: A) $5x^2-2x+2$; B) $5x^2+12x-6$; C) $x^2-2x-6$; D) $5x^2-12x+2$.',
    },
    {
      type: 'recognition',
      title: 'What to notice first',
      markdown: 'For question 5, check every variable exponent and look for a variable in a denominator. For question 6, look for degree 2. For question 7, find the greatest exponent. For question 8, group the $x^2$ terms, the $x$ terms, and the constants separately. The next source page highlights the choices.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'For question 8, the minus sign before $7x$ belongs to that term, and the minus sign before 2 belongs to the constant term. Carry both signs into the matching groups.',
    },
  ),
  explainedPage(
    23,
    'Polynomial practice — worked answers 5 to 8',
    'The highlighted choices are B, B, C, and A: the denominator expression is not a polynomial, the quadratic has degree 2, the degree is 5, and the sum is $5x^2-2x+2$.',
    {
      type: 'worked-example',
      title: '5. Find the expression that is not a polynomial',
      steps: [
        'A) $3^2+2x-7$ simplifies to $9+2x-7=2x+2$, a polynomial.',
        'B) $x^3-\\frac4x$ has a variable in the denominator. Since $\\frac4x=4x^{-1}$, it includes a negative power of $x$.',
        'C) $5y^4+y^2+1$ and D) $-2x+9$ use nonnegative whole-number powers.',
      ],
      conclusion: 'Choice B is highlighted as not a polynomial.',
    },
    {
      type: 'worked-example',
      title: '6. Identify the quadratic polynomial',
      steps: [
        'A) $4x+7$ has highest exponent 1.',
        'B) $x^2-5x+6$ has highest exponent 2.',
        'C) $3x^3-2$ has degree 3, and D) $7$ is a constant.',
      ],
      conclusion: 'Choice B is quadratic and is highlighted.',
    },
    {
      type: 'worked-example',
      title: '7. Find the degree',
      givens: '$7x^5-3x^2+4x-6$',
      steps: [
        'The variable exponents are 5, 2, 1, and 0 for the constant term.',
        'The greatest exponent is 5.',
      ],
      conclusion: 'Choice C, degree 5, is highlighted.',
    },
    {
      type: 'worked-example',
      title: '8. Add the like terms',
      givens: '$(3x^2+5x-2)+(2x^2-7x+4)$',
      steps: [
        'Group the matching powers: $(3x^2+2x^2)+(5x-7x)+(-2+4)$.',
        'Combine coefficients: $3+2=5$, $5-7=-2$, and $-2+4=2$.',
        'Write the result: $5x^2-2x+2$.',
      ],
      conclusion: 'Choice A is highlighted.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'A polynomial can have a constant term, but a variable in the denominator creates a negative exponent. When adding polynomials, combine only matching powers and carry each term’s sign.',
    },
  ),
  explainedPage(
    24,
    'Quadratic practice — Example 9',
    'To solve $x^2-5x+6=0$ by factoring, find two numbers whose product is 6 and whose sum is $-5$.',
    {
      type: 'recognition',
      title: 'Read the question and choices',
      markdown: 'The source asks you to solve $x^2-5x+6=0$. Its choices are A) $x=2,3$; B) $x=-2,-3$; C) $x=5,6$; D) $x=-5,6$. The worked solution appears on source page 25.',
    },
    {
      type: 'foundation',
      title: 'Set up the factor search',
      markdown: 'The constant term is $+6$, so the two numbers must multiply to $+6$. The middle coefficient is $-5$, so those numbers must add to $-5$. The pair $-2$ and $-3$ fits: $(-2)(-3)=6$ and $-2+(-3)=-5$. This points to $(x-2)(x-3)=0$.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'For a monic quadratic $x^2+bx+c$, look for a pair with product $c$ and sum $b$. Then set each factor to zero. Here the factors use $x-2$ and $x-3$, so their zero values will be positive.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'The pair in the factorization is $-2$ and $-3$, but the solutions to $x-2=0$ and $x-3=0$ are $x=2$ and $x=3$. Do not copy the factor constants as the roots without solving.',
    },
  ),
  explainedPage(
    25,
    'Example 9 — factor and solve',
    'The source factors $x^2-5x+6$ as $(x-2)(x-3)$, so the solutions are $x=2$ or $x=3$ (choice A).',
    {
      type: 'worked-example',
      title: 'Follow the Zero Product Property',
      givens: '$x^2-5x+6=0$',
      steps: [
        'Find two numbers whose product is $6$ and whose sum is $-5$: $-2$ and $-3$.',
        'Factor: $x^2-5x+6=(x-2)(x-3)$ because expanding gives $x^2-3x-2x+6=x^2-5x+6$.',
        'Set each factor equal to zero: $x-2=0$ or $x-3=0$.',
        'Solve: $x=2$ or $x=3$.',
        'Check: $2^2-5(2)+6=4-10+6=0$; $3^2-5(3)+6=9-15+6=0$.',
      ],
      conclusion: 'Both values work, and the source highlights choice A.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'The factors contain minus signs: $(x-2)(x-3)$. Solving each factor equal to zero gives positive roots 2 and 3.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap',
      markdown: '- **Exponents:** same-base product → add powers; power of a power → multiply powers; negative power → reciprocal.  \n- **Polynomials:** count terms for the name, use the largest exponent for degree, and combine only like terms.  \n- **Quadratics:** for a product equal to zero, set each factor to zero; for an isolated square, remember both equation solutions.  \n- **Recognition check:** match the structure of the expression to the rule before doing arithmetic.',
    },
  ),
  {
    sourcePage: 26,
    title: 'Thank you for watching — closing slide',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'The closing slide shows EELU branding, a “Thank you for watching” message, and “Questions?” It adds no mathematics content.',
      },
    ],
  },
];

export const mathematics1Lecture3Lesson: Lesson = {
  id: 'mathematics-1-lecture-3-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/lecture 3.pdf',
  sourcePath: 'Mathematics 1/lecture/lecture 3.pdf',
  title: 'Archived Lecture 3: Exponents, Polynomials, and Quadratic Equations',
  sourcePageCount: 26,
  pages,
  lastReviewed: '2026-10-14',
};



