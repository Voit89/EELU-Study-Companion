import type { Lesson, LessonBlock, LessonPage } from '../types';

interface WorkedExample {
  title: string;
  givens?: string;
  steps: string[];
  conclusion?: string;
}

interface TeachingNotes {
  recognition?: string;
  trap?: string;
  sourceNote?: string;
  example?: WorkedExample;
  recap?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  notes: TeachingNotes = {},
): LessonPage {
  const blocks: LessonBlock[] = [
    { type: 'zobda', text: takeaway },
    { type: 'foundation', title: 'Step-by-step explanation', markdown: explanation },
  ];
  if (notes.recognition) blocks.push({ type: 'recognition', title: 'How to recognize it · إزاي تميّزها', markdown: notes.recognition });
  if (notes.example) {
    blocks.push({
      type: 'worked-example',
      title: notes.example.title,
      ...(notes.example.givens ? { givens: notes.example.givens } : {}),
      steps: notes.example.steps,
      ...(notes.example.conclusion ? { conclusion: notes.example.conclusion } : {}),
    });
  }
  if (notes.trap) blocks.push({ type: 'trap', title: 'Common mix-up', markdown: notes.trap });
  if (notes.sourceNote) blocks.push({ type: 'source-note', text: notes.sourceNote });
  if (notes.recap) blocks.push({ type: 'foundation', title: 'Quick lecture recap', markdown: notes.recap });
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualOnlyPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [{ type: 'source-note', text: note }] };
}

const pages: LessonPage[] = [
  visualOnlyPage(1, 'Mathematics (0) · Fall 2025–2026 cover', 'The cover identifies Mathematics (0), Fall Semester 2025–2026, and the listed instructors. It has no worked mathematics.'),
  visualOnlyPage(2, 'Midterm exam solutions · divider', 'This is a divider slide introducing a midterm-solutions review. It contains no problem or method by itself.'),
  explainedPage(3, 'Examples 1–2 · Simplify radicals and negative exponents', 'Example 1 is choice C under the usual positive-variable assumption; Example 2 simplifies to $x^2y^4/4$.', 'Example 1 is $\\sqrt{24x^6y^5}$. Pull out perfect squares: $24=4\\cdot6$, $x^6=(x^3)^2$, and $y^5=(y^2)^2y$. This gives $2|x^3|y^2\\sqrt{6y}$ for real variables with $y\\ge0$. If the class assumes variables are nonnegative, this is the highlighted choice C, $2x^3y^2\\sqrt{6y}$. Example 2 asks to simplify $y^4/(4x^{-2})$. Since $x^{-2}=1/x^2$, dividing by $4/x^2$ is multiplying by $x^2/4$, so the result is $x^2y^4/4$; the original expression requires $x\\ne0$.', { recognition: '**Perfect-square factors:** pair even powers under a square root and leave any unpaired factor inside. **Negative exponent:** $x^{-2}=1/x^2$, so dividing by a negative power moves that factor to the numerator.', trap: 'For general real variables, $\\sqrt{x^6}=|x^3|$, not always $x^3$. The highlighted answer assumes $x\\ge0$; the radical also requires $y\\ge0$.', example: { title: 'Example 2 in one line', givens: '$y^4/(4x^{-2})$, with $x\\ne0$', steps: ['$4x^{-2}=4/x^2$.', '$y^4\\div(4/x^2)=y^4\\times(x^2/4)=x^2y^4/4$.'], conclusion: 'The equivalent expression is $x^2y^4/4$ (choice C).' }, sourceNote: 'The answer key is clear, but the radical choices suppress absolute values. They are equivalent as written if the course assumes variables are nonnegative.' }),
  explainedPage(4, 'Examples 3–4 · Factor by grouping; expand by place value', 'The polynomial factors as $(2y-7)(y^4-7)$ (choice B), and $5025=5000+0+20+5$ (choice D).', 'For Example 3, group the first two and last two terms: $2y^5-7y^4-14y+49=y^4(2y-7)-7(2y-7)$. Both groups contain $(2y-7)$, so factor it out to get $(2y-7)(y^4-7)$. For Example 4, read 5025 by place: 5 thousands, 0 hundreds, 2 tens, and 5 ones. That is $5000+0+20+5$.', { recognition: '**Factor by grouping:** arrange terms so each group has the same factor. **Expanded form:** write each digit’s place-value contribution, including a zero term when a place is empty.', example: { title: 'Check the grouping factorization', givens: '$2y^5-7y^4-14y+49$', steps: ['Group: $(2y^5-7y^4)+(-14y+49)$.', 'Factor each group: $y^4(2y-7)-7(2y-7)$.', 'Factor out the common binomial: $(2y-7)(y^4-7)$.'], conclusion: 'The common factor is $(2y-7)$, matching choice B.' } }),
  explainedPage(5, 'Examples 5–6 · Order of operations and unit fractions', 'The next step is to evaluate the parentheses, changing $(10-6)^2$ to $4^2$ (choice A); $1/12$ is a unit fraction (choice D).', 'In $5+2^3\\times(10-6)^2$, do the parentheses first: $10-6=4$. The correct next written step is $5+2^3\\times(4)^2$. Then finish powers before multiplication and addition: $5+8\\times16=133$. A unit fraction has numerator 1, so $1/12$ is a unit fraction; its denominator can be any positive integer.', { recognition: '**Order of operations:** parentheses, exponents, multiplication/division from left to right, then addition/subtraction. **Unit fraction:** numerator 1.', trap: 'Do not multiply $2^3$ by 10 before evaluating $(10-6)$. The slide asks for the next step, not only the final value.' }),
  explainedPage(6, 'Examples 7–8 · Add fractions and convert an improper fraction', 'The LCD of 8 and 12 is 24; $17/5=3\\,2/5$.', 'For Example 7, the least common denominator must be divisible by both 8 and 12. Their least common multiple is 24. Rewrite $5/8=15/24$ and $7/12=14/24$, then add to get $29/24=1\\,5/24$. For Example 8, divide 17 by 5: $17=3\\times5+2$. The quotient is the whole-number part and the remainder stays over the original denominator, so $17/5=3\\,2/5$.', { recognition: '**LCD (المقام المشترك الأصغر):** the least common multiple of the denominators. **Improper fraction:** numerator is at least as large as denominator.', example: { title: 'Finish the fraction examples', steps: ['LCD: $\\operatorname{lcm}(8,12)=24$.', '$5/8+7/12=15/24+14/24=29/24=1\\,5/24$.', '$17\\div5=3$ remainder 2, so $17/5=3\\,2/5$.'], conclusion: 'The slide’s choices are C for the LCD and A for the mixed number.' }, trap: 'When converting to a mixed number, keep the original denominator and use the remainder as the new numerator.' }),
  explainedPage(7, 'Example 9 · Apply exponent rules to a quotient', 'Combining the powers gives $8a^{-6}b^9c^{15}$, or $8b^9c^{15}/a^6$ with no negative exponent.', 'The expression is $\\left(\\frac{16a^{-2}b^8c^{20}}{a^6b^{-4}}\\right)^{3/4}$. When dividing like bases, subtract exponents: $a^{-2}/a^6=a^{-8}$, and $b^8/b^{-4}=b^{12}$. Inside the parentheses this is $(16a^{-8}b^{12}c^{20})^{3/4}$. Apply $3/4$ to each factor: $16^{3/4}=8$, $a^{-8(3/4)}=a^{-6}$, $b^{12(3/4)}=b^9$, and $c^{20(3/4)}=c^{15}$. Finally move $a^{-6}$ to the denominator.', { recognition: '**Quotient rule:** $u^m/u^n=u^{m-n}$. **Power of a power:** $(u^m)^n=u^{mn}$. **Negative exponent:** $u^{-m}=1/u^m$.', example: { title: 'Track the exponents before applying $3/4$', steps: ['Combine the quotient: $a^{-2-6}=a^{-8}$ and $b^{8-(-4)}=b^{12}$.', 'Apply $3/4$: $(16a^{-8}b^{12}c^{20})^{3/4}=8a^{-6}b^9c^{15}$.', 'Move $a^{-6}$ below the fraction bar: $8b^9c^{15}/a^6$.'], conclusion: 'This is the answer shown in the solution, under its implied positive-variable convention.' }, trap: 'A negative exponent in the denominator changes to a positive exponent in the numerator: $b^8/b^{-4}=b^{12}$, not $b^4$.', sourceNote: 'The displayed result assumes variables are positive. For real values, the fractional power of even powers can produce absolute values (for example, $|b|^9$ and $|c|^{15}$); also $a$ and $b$ must be nonzero because they occur with negative exponents.' }),
  explainedPage(8, 'Example 10 · Solve a rational equation and check the domain', 'The only valid solution is $x=4$; $x=1$ makes a denominator zero.', 'Start with $\\frac{8x^2}{x^2-1}=\\frac4{x-1}+\\frac{9x}{x+1}$. Since $x^2-1=(x-1)(x+1)$, the original equation excludes both $x=1$ and $x=-1$. Multiply through by $(x-1)(x+1)$: $8x^2=4(x+1)+9x(x-1)$. Expand and collect: $8x^2=9x^2-5x+4$, so $x^2-5x+4=0=(x-1)(x-4)$. The candidates are 1 and 4, but 1 is excluded; 4 is allowed and satisfies the equation.', { recognition: '**Rational equation:** an equation containing variable expressions in denominators. Before multiplying, list values that make any original denominator zero.', example: { title: 'Solve and filter the candidates', givens: '$8x^2/(x^2-1)=4/(x-1)+9x/(x+1)$', steps: ['Domain: $x\\ne1$ and $x\\ne-1$.', 'Multiply by $(x-1)(x+1)$: $8x^2=4(x+1)+9x(x-1)$.', 'Simplify: $x^2-5x+4=0=(x-1)(x-4)$.', 'Candidate $x=1$ is excluded; $x=4$ is valid.'], conclusion: 'The solution set is $\\{4\\}$.' }, trap: 'Clearing denominators can produce candidates that are not allowed in the original equation. Check every candidate against the original domain.', sourceNote: 'The slide rejects $x=1$ but does not state the other excluded value $x=-1$. It is also outside the candidate roots, so it does not change the final answer.' }),
  explainedPage(9, 'Example 11 · Divide rational expressions by multiplying by the reciprocal', 'The simplified expression is $4x/(x+2)^2$, with original restrictions $x\\ne0,-2,3$.', 'The expression is $\\frac{4x-12}{x^2+2x}\\div\\frac{x^2-x-6}{x^2}$. Factor each polynomial: $4x-12=4(x-3)$, $x^2+2x=x(x+2)$, and $x^2-x-6=(x-3)(x+2)$. Replace division by multiplication by the reciprocal: $\\frac{4(x-3)}{x(x+2)}\\times\\frac{x^2}{(x-3)(x+2)}$. Cancel common factors to get $4x/(x+2)^2$.', { recognition: '**Divide fractions:** keep the first expression, flip the second, and multiply. Factor before canceling; only common factors can cancel.', example: { title: 'Factor, flip, and cancel', givens: '$\\frac{4x-12}{x^2+2x}\\div\\frac{x^2-x-6}{x^2}$', steps: ['Factor: $\\frac{4(x-3)}{x(x+2)}\\div\\frac{(x-3)(x+2)}{x^2}$.', 'Multiply by the reciprocal: $\\frac{4(x-3)}{x(x+2)}\\times\\frac{x^2}{(x-3)(x+2)}$.', 'Cancel $x$, one $(x-3)$, and one $(x+2)$ to get $4x/(x+2)^2$.'], conclusion: 'The reduced form is $4x/(x+2)^2$.' }, trap: 'Cancel factors, never separate terms: $x-3$ is one factor after factoring, but you cannot cancel an $x$ from a sum such as $x+2$.', sourceNote: 'The slide simplifies correctly but does not list the original domain restrictions: $x\\ne0,-2$ from denominators, and $x\\ne3,-2$ because the divisor cannot be zero. Keep $x\\ne0,-2,3$.' }),
  explainedPage(10, 'Example 12 · Multiply square roots and extract perfect squares', 'The product simplifies to $5\\sqrt3\\,x^2y^5$ under the slide’s positive-variable assumption.', 'The expression is $\\sqrt{5xy^7}\\,\\sqrt{15x^3y^3}$. Combine the radicands: $\\sqrt{(5xy^7)(15x^3y^3)}=\\sqrt{75x^4y^{10}}$. Factor perfect squares: $75=25\\cdot3$, $x^4=(x^2)^2$, and $y^{10}=(y^5)^2$. Taking their square roots leaves $5\\sqrt3\\,x^2y^5$ when $x,y\\ge0$.', { recognition: '**Product rule for square roots:** $\\sqrt{A}\\sqrt{B}=\\sqrt{AB}$ when both roots are defined as real numbers. Pull out square factors such as $25$, $x^4$, and $y^{10}$.', example: { title: 'Separate square factors from what remains', steps: ['Multiply under one radical: $\\sqrt{75x^4y^{10}}$.', 'Rewrite: $\\sqrt{25\\cdot3\\cdot(x^2)^2\\cdot(y^5)^2}$.', 'Take square roots of the perfect squares: $5\\sqrt3\\,x^2|y|^5$ for real inputs in the original domain.'], conclusion: 'If the variables are nonnegative, this matches the slide’s $5\\sqrt3\\,x^2y^5$.' }, trap: 'The principal square root is nonnegative: $\\sqrt{(y^5)^2}=|y^5|$, not always $y^5$.', sourceNote: 'The source omits absolute values and does not state variable restrictions. Its final answer is correct when $x,y\\ge0$; for real inputs where both radicands are defined, the extracted factor is $|y|^5$.' , recap: 'This review covers radical and exponent simplification, factoring by grouping, place value, order of operations, fraction types and operations, rational expressions, and rational equations. For algebraic fractions, factor before canceling and preserve restrictions from the original denominators. For real square roots and fractional exponents, keep domain and sign assumptions visible.' }),
  visualOnlyPage(11, 'Thank-you slide', 'The final page is an EELU closing graphic (“Thank you for watching / Questions?”) and has no additional mathematics.'),
];

export const mathematics0Lecture12Lesson: Lesson = {
  id: 'mathematics-0-lecture-12-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/Lecture 12.pdf',
  sourcePath: 'Mathematics 0/lecture/Lecture 12.pdf',
  title: 'Lecture 12: Midterm Exam Solutions (Fall 2025–2026)',
  sourcePageCount: 11,
  pages,
  lastReviewed: '2026-10-14',
};
