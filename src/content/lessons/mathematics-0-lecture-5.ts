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
    title: 'Mathematics (0) — archived lecture cover',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'The cover identifies Mathematics (0), Fall Semester 2025–2026, and Dr. Amany Magdy, Dr. Adel Mourad, and Dr. Mohamed Ghaleb. This is an older archive file, so use it as a provisional study reference and follow the current Moodle lecture if its content differs.',
      },
    ],
  },
  dividerPage(2, 'Revision', 'A section divider only. The lecture’s algebra basics begin on page 3.'),
  dividerPage(3, 'Algebra Basics', 'A title slide for the algebra section. The explanation begins on page 4.'),
  explainedPage(
    4,
    'From arithmetic numbers to algebraic variables',
    'Arithmetic uses specific numbers; algebra also uses letters such as $x$ to stand for a value. Substitute the value of the letter to evaluate an expression.',
    {
      type: 'foundation',
      title: 'What changes when we move to algebra?',
      markdown: 'In arithmetic, an expression such as $23+5$ already tells us the numbers, so we can calculate $28$. In algebra, a **variable** is a letter that represents a value that may be unknown or may change. The expression $x+5$ cannot have one numerical answer until we know what $x$ is.',
    },
    {
      type: 'worked-example',
      title: 'Substitute a value for $x$',
      givens: String.raw`x+5`,
      steps: [
        'If $x=1$, replace the letter $x$ with 1: $x+5=1+5=6$.',
        'If $x=-7$, replace $x$ with $-7$: $x+5=-7+5$.',
        'Starting at $-7$ and adding 5 moves 5 units toward zero, so $-7+5=-2$.',
      ],
      conclusion: 'The same expression can produce different values because the value assigned to its variable changes.',
    },
    {
      type: 'recognition',
      title: 'If you see a letter in an expression…',
      markdown: 'Treat the letter as a number whose value is not yet specified. If the question gives you a value, substitute it everywhere that variable appears, then calculate using the usual arithmetic rules.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not assume a variable always has the same value in every problem. Its value comes from the context or from information given in that question.',
    },
    {
      type: 'foundation',
      title: 'Lecture map',
      markdown: 'Pages 4–8 introduce variables and how algebraic expressions are written and simplified. Pages 10–17 explain exponents and their laws; pages 18–25 apply those laws in four worked multiple-choice examples.',
    },
  ),
  explainedPage(
    5,
    'The language of algebra: variables and constants',
    'A variable is a letter whose value can vary or is unknown; a constant is a fixed number. In $x+5$, $x$ is the variable and 5 is the constant.',
    {
      type: 'recognition',
      title: 'Read the two terms on this page',
      markdown: 'The slide uses letters such as $x$, $y$, $a$, and $b$ as **variables**. They stand for quantities that are unknown or can change. Numbers such as $3$, $-5$, and $10$ are **constants**: their numerical values stay fixed in the expression.',
    },
    {
      type: 'worked-example',
      title: 'Label the parts of $x+5$',
      givens: String.raw`x+5`,
      steps: [
        '$x$ is a variable because it can represent different values in different contexts.',
        '$5$ is a constant because it is the fixed number five.',
        'The plus sign tells us to add the value of $x$ and 5 once the value of $x$ is known.',
      ],
      conclusion: 'A variable can be unknown even though the expression containing it is already meaningful.',
    },
    {
      type: 'trap',
      title: 'Keep “unknown” and “fixed” separate',
      markdown: 'A variable is not automatically changing while you calculate one problem; it has one value within that problem, but that value may not have been given. A constant is a fixed number written directly in the expression.',
    },
  ),
  explainedPage(
    6,
    'Coefficients and expressions',
    'A coefficient is the number multiplying a variable. An expression is the whole combination of numbers, variables, and operation signs, such as $2x+3$.',
    {
      type: 'recognition',
      title: 'Decode the definition',
      markdown: 'In $3x$, the number 3 is the **coefficient** and $x$ is the variable. The notation means $3\\times x$. The slide’s example $2x+3$ is an **expression**: it combines the coefficient 2, the variable $x$, the constant 3, multiplication, and addition.',
    },
    {
      type: 'worked-example',
      title: 'Evaluate $2x+3$ when $x=4$',
      givens: String.raw`2x+3,\quad x=4`,
      steps: [
        'Replace $x$ with 4: $2x+3=2\\times4+3$.',
        'Multiply first: $2\\times4=8$.',
        'Then add 3: $8+3=11$.',
      ],
      conclusion: 'The coefficient 2 tells how many copies of $x$ are added: $2x=x+x$.',
    },
    {
      type: 'trap',
      title: 'Do not mistake the coefficient for an exponent',
      markdown: 'In $2x$, the 2 means “multiply $x$ by 2.” It does not mean $x^2$. A small raised number, as in $x^2$, is an exponent and means multiply $x$ by itself.',
    },
  ),
  explainedPage(
    7,
    'Multiplication in algebra: the sign can be left out',
    'When factors are written side by side, multiplication is implied: $4x$ means $4\\times x$, and $2(x+3)$ means 2 times the entire parenthesized quantity.',
    {
      type: 'foundation',
      title: 'Read each row of the source table',
      markdown: 'Algebra often omits the multiplication sign $\\times$ because it looks like the letter $x$. Instead, touching symbols indicate multiplication. The slide’s pairs mean:',
    },
    {
      type: 'worked-example',
      title: 'Translate the table into ordinary multiplication',
      steps: [
        '$4x=4\\times x$: four times the value of $x$.',
        '$xy=x\\times y$: multiply the values of $x$ and $y$.',
        '$7a=7\\times a$: seven times the value of $a$.',
        '$2(x+3)=2\\times(x+3)$: first the group $x+3$ is one factor; the 2 multiplies that whole group.',
        '$(x+2)(x+3)=(x+2)\\times(x+3)$: multiply the two parenthesized expressions. The slide is only rewriting the notation here; it is not yet expanding the brackets.',
      ],
      conclusion: 'Writing factors together saves space, but the implied operation is still multiplication.',
    },
    {
      type: 'recognition',
      title: 'If symbols touch, check whether they are factors',
      markdown: 'A number next to a variable, two variables next to each other, or a number next to parentheses usually means multiplication. Parentheses keep a group together as one factor.',
    },
    {
      type: 'trap',
      title: 'Do not read $xy$ as a two-digit number',
      markdown: 'In algebra, $xy$ is the product $x\\times y$. Also, $2(x+3)$ does not mean $2x+3$; the 2 multiplies the whole quantity inside the parentheses.',
    },
  ),
  explainedPage(
    8,
    'Simplifying algebraic expressions: like terms',
    'Combine only like terms: the variable part, including its exponent, must match. Thus $3x+4x=7x$, while $2a+3b$ cannot be combined.',
    {
      type: 'recognition',
      title: 'What makes terms “like”?',
      markdown: 'A **term** is one part of an expression separated by a plus or minus sign. Like terms have the same variable part with the same exponent. For example, $3x$ and $4x$ both contain one $x$, so their coefficients can be combined. The letters $a$ and $b$ are different, so $2a$ and $3b$ are unlike terms.',
    },
    {
      type: 'worked-example',
      title: 'Combine $3x+4x$',
      givens: String.raw`3x+4x`,
      steps: [
        '$3x$ means three copies of $x$: $x+x+x$.',
        '$4x$ means four more copies: $x+x+x+x$.',
        'There are seven copies of $x$ in total, so $3x+4x=7x$. Equivalently, add the coefficients: $3+4=7$, and keep $x$.',
      ],
      conclusion: 'Adding like terms combines their coefficients; it does not remove their shared variable part.',
    },
    {
      type: 'worked-example',
      title: 'Why $2a+3b$ stays as it is',
      steps: [
        '$2a$ counts two copies of $a$.',
        '$3b$ counts three copies of a different quantity, $b$.',
        'Because the variable parts differ, these terms cannot be merged into one like term.',
      ],
      conclusion: 'The source leaves $2a+3b$ unchanged.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not add terms just because they both contain letters. For example, $x+x=2x$, but $x+x^2$ cannot be combined because the exponents differ.',
    },
  ),
  dividerPage(9, 'Exponents', 'A title slide introducing the exponent section. The first definition appears on page 10.'),
  explainedPage(
    10,
    'What an exponent means',
    'An exponent counts repeated multiplication of the same base: $2^3=2\\times2\\times2=8$. A zero exponent gives 1 only when its base is nonzero.',
    {
      type: 'recognition',
      title: 'Name the base and exponent',
      markdown: 'In $2^3$, the **base** is 2, the number being repeated, and the **exponent** (or power) is 3, which tells how many copies of the base are multiplied. Read $2^3$ as “two to the power of three” or “two cubed.”',
    },
    {
      type: 'worked-example',
      title: 'Calculate $2^3$',
      givens: String.raw`2^3`,
      steps: [
        'Write three copies of the base 2 multiplied: $2^3=2\\times2\\times2$.',
        'Multiply the first two: $2\\times2=4$.',
        'Multiply by the remaining 2: $4\\times2=8$.',
      ],
      conclusion: 'The exponent is the number of factors, not the number you multiply the base by.',
    },
    {
      type: 'formula',
      label: 'Special exponent cases on the slide',
      latex: String.raw`x^2=x\times x,\qquad x^3=x\times x\times x,\qquad a^1=a,\qquad a^0=1\;(a\ne0)`,
      explanation: 'Power 2 is called “squared”; power 3 is called “cubed.” A power of 1 leaves one copy of the base. The zero-power rule gives 1 for every nonzero base.',
    },
    {
      type: 'trap',
      title: 'Do not confuse a power with multiplication',
      markdown: '$2^3$ is $2\\times2\\times2=8$, not $2\\times3=6$. Also, the slide’s zero-power rule excludes a base of zero.',
    },
  ),
  explainedPage(
    11,
    'Square roots undo squaring',
    'A square root asks which nonnegative number squares to the value underneath it: $\\sqrt{25}=5$ because $5^2=25$. Squaring and taking a square root undo each other for the positive examples shown.',
    {
      type: 'recognition',
      title: 'Read the square-root symbol',
      markdown: 'The symbol $\\sqrt{\\;}$ is the square-root sign. It asks for the nonnegative number whose square is the number inside. For example, since $5\\times5=25$, the principal square root is $\\sqrt{25}=5$ (not $-5$).',
    },
    {
      type: 'worked-example',
      title: 'Follow both inverse-operation examples',
      steps: [
        'First direction: $(\\sqrt{9})^2=9$. The square root of 9 is 3, and $3^2=9$.',
        'Second direction: $\\sqrt{4^2}=4$. First $4^2=16$, then $\\sqrt{16}=4$.',
      ],
      conclusion: 'Taking a square and then its square root returns the original positive number in these examples.',
    },
    {
      type: 'why',
      title: 'A small accuracy note about variables',
      markdown: 'The slide writes $\\sqrt{a^2}=a$. This matches its positive examples. For a general real variable that may be negative, the precise rule is $\\sqrt{a^2}=|a|$, because a square root is never negative. For instance, $\\sqrt{(-4)^2}=\\sqrt{16}=4$, not $-4$.',
    },
    {
      type: 'trap',
      title: 'Do not treat the square root as “both answers” here',
      markdown: 'The equation $u^2=25$ has two solutions, $u=5$ and $u=-5$. But the symbol $\\sqrt{25}$ means the principal, nonnegative root, so $\\sqrt{25}=5$.',
    },
  ),
  explainedPage(
    12,
    'Exponents attached to variables',
    'A variable can be raised to a power just like a number: $x^2=x\\times x$ and $y^3=y\\times y\\times y$. In $7y^3$, 7 is the coefficient and 3 is the exponent.',
    {
      type: 'worked-example',
      title: 'Expand the variable powers',
      steps: [
        '$x^2$ has two copies of $x$: $x^2=x\\times x$.',
        '$y^3$ has three copies of $y$: $y^3=y\\times y\\times y$.',
        'In $5x^2$, the coefficient is 5 and the variable-power part is $x^2$.',
        'In $7y^3$, the coefficient is 7, the variable is $y$, and its exponent is 3.',
      ],
      conclusion: 'The coefficient multiplies the variable power; it is not counted as part of the exponent.',
    },
    {
      type: 'recognition',
      title: 'If you see a number in front…',
      markdown: 'Read $7y^3$ as $7\\times(y\\times y\\times y)$. The exponent applies to the $y$; the coefficient 7 remains an outside multiplier unless parentheses put it inside the powered group.',
    },
    {
      type: 'trap',
      title: 'Coefficient versus exponent',
      markdown: 'In $7y^3$, the 7 is not an exponent, and the 3 is not a coefficient. Position matters: the coefficient is in front on the baseline; the exponent is raised next to the variable.',
    },
  ),
  explainedPage(
    13,
    'Reading and expanding algebraic powers',
    'Only the symbol with the raised exponent is repeated. So $2ab^2$ means $2\\times a\\times b\\times b$; the exponent 2 applies to $b$, not to $a$ or the whole term.',
    {
      type: 'recognition',
      title: 'Say each power aloud',
      markdown: '$x^2$ is “x squared”; $x^3$ is “x cubed”; and $x^n$ is “x to the power $n$.” In the last expression, $n$ is a placeholder for an exponent.',
    },
    {
      type: 'worked-example',
      title: 'Expand each source example',
      steps: [
        '$3x^2=3\\times x\\times x$: there are two copies of $x$, multiplied by the coefficient 3.',
        '$-5y^4=(-5)\\times y\\times y\\times y\\times y$: there are four copies of $y$, and the coefficient is negative 5.',
        '$2ab^2=2\\times a\\times b\\times b$: only $b$ is repeated because only $b$ has the raised 2.',
      ],
      conclusion: 'An exponent belongs to the symbol immediately before it, unless parentheses group more factors under the exponent.',
    },
    {
      type: 'trap',
      title: 'Read $2ab^2$ carefully',
      markdown: 'Do not turn $2ab^2$ into $2a^2b^2$. The source shows no exponent on $a$, so there is only one $a$ factor.',
    },
  ),
  explainedPage(
    14,
    'Exponent law 1: multiply powers with the same base',
    'When two powers have the same base and are multiplied, add their exponents: $a^m\\cdot a^n=a^{m+n}$. The base stays the same.',
    {
      type: 'foundation',
      title: 'Why the product rule works',
      markdown: 'An exponent is a count of repeated factors. Multiplying powers with the same base puts all those copies in one longer product. That is why the counts add. The rule works for numbers and variables when the base is the same.',
    },
    {
      type: 'worked-example',
      title: 'Follow the source examples',
      steps: [
        '$2^3\\cdot2^4=(2\\cdot2\\cdot2)(2\\cdot2\\cdot2\\cdot2)$.',
        'There are 3 copies of 2 in the first group and 4 more in the second: $3+4=7$ copies total.',
        'Therefore $2^3\\cdot2^4=2^{3+4}=2^7$.',
        'For variables, $x^2\\cdot x^5=x^{2+5}=x^7$.',
      ],
      conclusion: 'Add exponents only because the base is repeated and the operation between the powers is multiplication.',
    },
    {
      type: 'recognition',
      title: 'Recognition cue',
      markdown: 'If you see the same base on both factors with a multiplication dot or sign between them, keep that base and add the exponents.',
    },
    {
      type: 'trap',
      title: 'Do not add the bases',
      markdown: '$2^3\\cdot2^4$ becomes $2^7$, not $4^7$ and not $2^{12}$. The base remains 2; only the exponent counts are added.',
    },
  ),
  explainedPage(
    15,
    'Exponent laws 2 and 3: quotient and power of a power',
    'For the same nonzero base, division subtracts exponents (top minus bottom). When one power is raised to another power, multiply the exponents.',
    {
      type: 'formula',
      label: 'The two rules on this page',
      latex: String.raw`\frac{a^m}{a^n}=a^{m-n}\;(a\ne0),\qquad (a^m)^n=a^{mn}`,
      explanation: 'For division, cancel matching factors in the numerator and denominator, leaving the difference in counts. For a power raised to a power, the inner group is repeated the outer number of times, so the counts multiply.',
    },
    {
      type: 'worked-example',
      title: 'Quotient rule: simplify $\\frac{2^5}{2^2}$',
      steps: [
        '$2^5$ has five factors of 2 on top; $2^2$ has two factors of 2 on the bottom.',
        'Cancel two matching top-and-bottom factors, leaving three factors of 2.',
        'So $\\frac{2^5}{2^2}=2^{5-2}=2^3=8$.',
        'The variable example follows the same rule: $\\frac{x^5}{x^2}=x^{5-2}=x^3$, provided $x\\ne0$.',
      ],
      conclusion: 'Keep the order numerator exponent minus denominator exponent.',
    },
    {
      type: 'worked-example',
      title: 'Power rule: simplify $(x^4)^3$',
      steps: [
        'The outer exponent 3 means there are three copies of $x^4$: $x^4\\cdot x^4\\cdot x^4$.',
        'Each copy contains four factors of $x$, so there are $4+4+4=12$ factors of $x$.',
        'Thus $(x^4)^3=x^{4\\cdot3}=x^{12}$.',
      ],
      conclusion: 'The source’s numeric pattern is $(2^3)^2=2^6$: multiply 3 by 2.',
    },
    {
      type: 'trap',
      title: 'Choose the rule from the operation',
      markdown: 'Use subtraction for a quotient with the same base; use multiplication for a power raised to a power. The quotient rule requires a nonzero base because division by zero is not defined.',
    },
  ),
  explainedPage(
    16,
    'Exponent laws 4 and 5: powers of products and quotients',
    'If parentheses group a product or quotient, the outside exponent applies to every factor in that group. Square every numerator and denominator factor in the quotient example.',
    {
      type: 'worked-example',
      title: 'Power of a product: simplify $(2x)^3$',
      steps: [
        'The parentheses make $2x$ one product being raised to power 3.',
        'Apply the exponent to each factor: $(2x)^3=2^3x^3$.',
        'Calculate $2^3=8$, so $(2x)^3=8x^3$.',
      ],
      conclusion: 'The exponent 3 applies to both the 2 and the $x$ because both are inside the parentheses.',
    },
    {
      type: 'formula',
      label: 'Power of a product and power of a quotient',
      latex: String.raw`(ab)^n=a^n b^n,\qquad \left(\frac{a}{b}\right)^n=\frac{a^n}{b^n}\;(b\ne0)`,
      explanation: 'A product raised to a power gives every factor that power. A quotient raised to a power gives both the numerator and denominator that power; the denominator must not be zero.',
    },
    {
      type: 'worked-example',
      title: 'Power of a quotient: follow every factor',
      givens: String.raw`\left(\frac{2x}{3y}\right)^2`,
      steps: [
        'The whole fraction is squared, so square its numerator and its denominator: $\\frac{(2x)^2}{(3y)^2}$.',
        'Apply the product rule in the numerator: $(2x)^2=2^2x^2$. In the denominator, $(3y)^2=3^2y^2$.',
        'Calculate the numerical powers: $2^2=4$ and $3^2=9$.',
        'The result is $\\frac{4x^2}{9y^2}$, as on the slide; here $y\\ne0$.',
      ],
      conclusion: 'The exponent applies to the 2 and $x$ above the fraction bar, and also to the 3 and $y$ below it.',
    },
    {
      type: 'trap',
      title: 'Do not leave one factor unsquared',
      markdown: 'In $(2x)^2$, both 2 and $x$ are inside the powered parentheses, so the result is $2^2x^2$, not $2x^2$. In a quotient, the denominator is squared too.',
    },
  ),
  explainedPage(
    17,
    'Exponent laws 6 and 7: zero and negative powers',
    'A nonzero base to power 0 equals 1. A negative exponent means take the reciprocal and make the exponent positive: $a^{-n}=\\frac{1}{a^n}$ for $a\\ne0$.',
    {
      type: 'worked-example',
      title: 'Zero exponent examples',
      steps: [
        'The rule says $a^0=1$ when $a\\ne0$.',
        'Since 5 is nonzero, $5^0=1$.',
        'For a nonzero variable, $x^0=1$ as well.',
      ],
      conclusion: 'Power zero gives the multiplicative identity 1; it does not mean the base disappears into 0.',
    },
    {
      type: 'worked-example',
      title: 'Turn a negative exponent into a reciprocal',
      steps: [
        '$2^{-3}=\\frac{1}{2^3}$: move the power to the denominator and change its exponent to positive 3.',
        'Calculate the denominator: $2^3=2\\cdot2\\cdot2=8$, so $2^{-3}=\\frac18$.',
        'Likewise, $x^{-2}=\\frac{1}{x^2}$ when $x\\ne0$.',
      ],
      conclusion: 'A negative exponent changes the location of the factor across a fraction bar; it does not make the value negative.',
    },
    {
      type: 'recognition',
      title: 'Recognition cue',
      markdown: 'If a negative exponent is in a numerator, rewrite that factor in the denominator with a positive exponent. If it is in the denominator, it can move to the numerator. A zero or negative exponent on a variable requires that variable to be nonzero.',
    },
    {
      type: 'trap',
      title: 'Do not confuse a negative exponent with a negative number',
      markdown: '$2^{-3}=\\frac18$ is positive. The minus sign in the exponent means reciprocal; a minus sign in front, as in $-2^3$, is a different operation.',
    },
  ),
  explainedPage(
    18,
    'Example 1 — simplify $\\frac{3x^{-2}}{x^4}$',
    'The coefficient 3 stays in front. For the matching $x$ bases in a quotient, subtract bottom exponent from top: $-2-4=-6$, so the expression is $3x^{-6}$.',
    {
      type: 'recognition',
      title: 'Choose the quotient rule',
      markdown: 'The expression has $x^{-2}$ divided by $x^4$. Both powers have the same base $x$, so use $\\frac{x^m}{x^n}=x^{m-n}$. The coefficient 3 is not a power of $x$, so it is carried along unchanged.',
    },
    {
      type: 'worked-example',
      title: 'Simplify it one step at a time',
      givens: String.raw`\frac{3x^{-2}}{x^4}`,
      steps: [
        'Keep the coefficient 3: $\\frac{3x^{-2}}{x^4}=3\\cdot\\frac{x^{-2}}{x^4}$.',
        'Subtract the denominator exponent from the numerator exponent: $-2-4=-6$.',
        'So the simplified power form is $3x^{-6}$.',
        'Using the negative-exponent rule, this is also $\\frac{3}{x^6}$, for $x\\ne0$.',
      ],
      conclusion: 'The source’s answer is B, $3x^{-6}$.',
    },
    {
      type: 'trap',
      title: 'Why the exponent is negative 6',
      markdown: 'Keep the quotient order: top minus bottom gives $-2-4=-6$. Do not subtract the smaller-looking number from the larger one, and do not change the coefficient 3.',
    },
  ),
  explainedPage(
    19,
    'Example 1 — answer check',
    'The green highlight confirms choice B, $3x^{-6}$. This is equivalent to $\\frac{3}{x^6}$, assuming $x\\ne0$.',
    {
      type: 'foundation',
      title: 'Match the calculation to the marked choice',
      markdown: 'This page repeats the question from page 18 and highlights answer B. The calculation is $\\frac{3x^{-2}}{x^4}=3x^{-2-4}=3x^{-6}$. The negative exponent may also be written as a reciprocal: $3x^{-6}=\\frac{3}{x^6}$.',
    },
    {
      type: 'recognition',
      title: 'What to verify on an answer slide',
      markdown: 'Check the highlight against the algebra rather than relying on color alone: same base in a quotient means subtract bottom exponent from top, while the separate coefficient 3 remains unchanged.',
    },
  ),
  explainedPage(
    20,
    'Example 2 — simplify $\\frac{4y^3}{y^{-5}}$',
    'Subtracting a negative exponent adds: $3-(-5)=3+5=8$. So $\\frac{4y^3}{y^{-5}}=4y^8$, which is choice C.',
    {
      type: 'recognition',
      title: 'Notice the negative exponent in the denominator',
      markdown: 'The coefficient 4 stays in front. The same base $y$ appears in a quotient, so subtract the bottom exponent from the top: $3-(-5)$. This is the easy place to lose a sign.',
    },
    {
      type: 'worked-example',
      title: 'Simplify without skipping the sign step',
      givens: String.raw`\frac{4y^3}{y^{-5}}`,
      steps: [
        'Carry the coefficient 4: $4\\cdot\\frac{y^3}{y^{-5}}$.',
        'Apply quotient rule in order: $y^{3-(-5)}$.',
        'Subtracting a negative is addition: $3-(-5)=3+5=8$.',
        'Therefore the result is $4y^8$, for $y\\ne0$.',
      ],
      conclusion: 'The source marks choice C: $4y^8$.',
    },
    {
      type: 'why',
      title: 'A second way to see the sign',
      markdown: 'Dividing by $y^{-5}$ is multiplying by its reciprocal, $y^5$. Thus $y^3\\div y^{-5}=y^3\\cdot y^5=y^8$. This agrees with the quotient rule.',
    },
    {
      type: 'trap',
      title: 'Common sign trap',
      markdown: 'Do not calculate $3-(-5)$ as $3-5$. Removing the parentheses changes subtraction of a negative into addition: $3+5=8$.',
    },
  ),
  explainedPage(
    21,
    'Example 2 — answer check',
    'The green highlight confirms choice C, $4y^8$. The positive 8 comes from $3-(-5)$, and the coefficient 4 stays unchanged.',
    {
      type: 'foundation',
      title: 'Match the calculation to the marked choice',
      markdown: 'This page repeats Example 2 and highlights C. The complete exponent step is $\\frac{4y^3}{y^{-5}}=4y^{3-(-5)}=4y^8$. The base must be nonzero because it appears with a negative exponent.',
    },
    {
      type: 'trap',
      title: 'Keep the double negative visible',
      markdown: 'Writing the intermediate step $3-(-5)$ before simplifying helps prevent the common mistake of choosing a negative exponent.',
    },
  ),
  explainedPage(
    22,
    'Example 3 — simplify $\\frac{y^3z^5}{7z^{-2}y^7}$',
    'Simplify each matching base separately: $y^{3-7}=y^{-4}$ and $z^{5-(-2)}=z^7$. Keep 7 below, then rewrite $y^{-4}$ as $1/y^4$ to get $\\frac{z^7}{7y^4}$.',
    {
      type: 'recognition',
      title: 'Separate the coefficient and the two bases',
      markdown: 'The denominator contains the coefficient 7 and powers of both $z$ and $y$. For each variable, compare its own numerator exponent with its own denominator exponent. Do not pair a $y$ with a $z$.',
    },
    {
      type: 'worked-example',
      title: 'Simplify one factor at a time',
      givens: String.raw`\frac{y^3z^5}{7z^{-2}y^7}`,
      steps: [
        'Put the numerical coefficient 7 in the denominator: $\\frac{1}{7}$ times the variable powers.',
        'For $y$: numerator exponent minus denominator exponent is $3-7=-4$, giving $y^{-4}$.',
        'For $z$: numerator exponent minus denominator exponent is $5-(-2)=7$, giving $z^7$.',
        'So the intermediate form is $\\frac{y^{-4}z^7}{7}$.',
        'Move $y^{-4}$ to the denominator as $y^4$: $\\frac{z^7}{7y^4}$.',
      ],
      conclusion: 'The source’s simplified choice is D: $\\frac{z^7}{7y^4}$, with $y\\ne0$ and $z\\ne0$.',
    },
    {
      type: 'trap',
      title: 'Keep the two exponent calculations separate',
      markdown: 'For $y$, calculate $3-7=-4$. For $z$, calculate $5-(-2)=7$. The denominator’s negative exponent belongs to $z$, so it does not affect the $y$ calculation.',
    },
  ),
  explainedPage(
    23,
    'Example 3 — answer check',
    'The green highlight confirms choice D, $\\frac{z^7}{7y^4}$. The negative $y$ exponent moves downstairs; the positive $z$ exponent remains upstairs.',
    {
      type: 'foundation',
      title: 'Check both variables against the marked answer',
      markdown: 'The question is repeated here with choice D highlighted. From page 22, $y^{3-7}z^{5-(-2)}/7=y^{-4}z^7/7$. Since $y^{-4}=1/y^4$, the final form is $z^7/(7y^4)$.',
    },
    {
      type: 'recognition',
      title: 'A quick placement check',
      markdown: 'A negative exponent means reciprocal: $y^{-4}$ belongs in the denominator. A positive exponent such as $z^7$ stays in the numerator.',
    },
  ),
  explainedPage(
    24,
    'Example 4 — simplify a quotient raised to $\\frac32$',
    'First simplify inside the parentheses: $x^{4-(-6)}y^{-5-3}=x^{10}y^{-8}$. Then multiply each exponent by $\\frac32$: the result is $x^{15}y^{-12}$, choice A.',
    {
      type: 'recognition',
      title: 'Use the rules in the right order',
      markdown: 'The outer power $\\frac32$ applies to the entire parenthesized quotient. First simplify each same-base quotient inside; then use the power-of-a-power rule to multiply each resulting exponent by $\\frac32$. Keep the coefficient 1 implicit.',
    },
    {
      type: 'worked-example',
      title: 'Work through the inside, then the outside',
      givens: String.raw`\left(\frac{x^4y^{-5}}{x^{-6}y^3}\right)^{3/2}`,
      steps: [
        'For $x$ inside the fraction, subtract bottom from top: $4-(-6)=10$, so the $x$ part becomes $x^{10}$.',
        'For $y$, subtract bottom from top: $-5-3=-8$, so the $y$ part becomes $y^{-8}$.',
        'The expression inside the parentheses is now $(x^{10}y^{-8})^{3/2}$.',
        'Multiply exponents for $x$: $10\\times\\frac32=\\frac{30}{2}=15$, giving $x^{15}$.',
        'Multiply exponents for $y$: $-8\\times\\frac32=\\frac{-24}{2}=-12$, giving $y^{-12}$.',
        'Therefore the simplified result is $x^{15}y^{-12}$, equivalently $\\frac{x^{15}}{y^{12}}$.',
      ],
      conclusion: 'The source marks A. The original negative powers require $x\\ne0$ and $y\\ne0$.',
    },
    {
      type: 'trap',
      title: 'Do not apply only half of the outer power',
      markdown: 'The exponent $\\frac32$ applies to both variable powers inside the parentheses. Also keep the inside quotient order straight: for $y$, $-5-3=-8$, not $-5-(-3)$.',
    },
  ),
  explainedPage(
    25,
    'Example 4 — answer check',
    'The green highlight confirms choice A, $x^{15}y^{-12}$. Rewriting the negative exponent gives the equivalent form $\\frac{x^{15}}{y^{12}}$.',
    {
      type: 'foundation',
      title: 'Match the marked answer to the two exponent calculations',
      markdown: 'This page repeats Example 4 and highlights A. Simplifying the quotient inside gives $x^{10}y^{-8}$; applying the outside power gives $x^{10(3/2)}y^{-8(3/2)}=x^{15}y^{-12}$.',
    },
    {
      type: 'recognition',
      title: 'One final equivalent-form check',
      markdown: 'Because $y^{-12}=1/y^{12}$ for $y\\ne0$, the highlighted expression can also be written as $x^{15}/y^{12}$. Both forms have the same value.',
    },
    {
      type: 'foundation',
      title: 'Quick reusable summary for this lecture',
      markdown: '- **Read algebra:** a letter is a variable; a fixed number is a constant; a number multiplying a variable is its coefficient. Side-by-side factors mean multiplication.  \n- **Combine terms:** add or subtract coefficients only when the variable parts, including exponents, match.  \n- **Same base, multiply:** add exponents. **Same base, divide:** subtract bottom exponent from top.  \n- **Power of a power:** multiply exponents. A power on parentheses applies to every factor inside.  \n- **Zero power:** $a^0=1$ for $a\\ne0$. **Negative power:** move the factor across the fraction bar and change the exponent to positive.  \nFor a simplification question, identify the grouping first, track each base separately, and check that no denominator or negative power uses zero.',
    },
  ),
  {
    sourcePage: 26,
    title: 'Thank you for watching — closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'An EELU closing graphic reading “Thank you for watching / Questions?” It contains no additional lecture material.',
  },
];

export const mathematics0Lecture5Lesson: Lesson = {
  id: 'mathematics-0-lecture-5-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 5.pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 5.pdf',
  title: 'Lecture 5: Algebra Basics and Exponents (2025–2026 archive)',
  sourcePageCount: 26,
  pages,
  lastReviewed: '2026-10-14',
};
