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
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. This lesson follows that archived copy; compare it with the current Moodle material when available.',
  ),
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section. The review questions start on source page 3.'),
  explainedPage(
    3,
    'Review: solve a linear equation and an absolute-value inequality',
    'The first problem is a linear equation with answer $x=10$. The second asks where $\\left|\\frac{2x-4}{3}\\right|>2$, which happens when $x<-1$ or $x>5$.',
    {
      type: 'formula',
      label: 'Two review questions',
      latex: '\\text{1. }4(x-2)=2(x+6)\\qquad\\text{2. }\\left|\\frac{2x-4}{3}\\right|>2',
      explanation: 'In question 1, solve for the number $x$. In question 2, the absolute value measures distance from zero, and the inequality asks when that distance is greater than 2.',
    },
    {
      type: 'worked-example',
      title: 'Solve the equation',
      steps: [
        'Distribute: $4x-8=2x+12$.',
        'Subtract $2x$ from both sides: $2x-8=12$.',
        'Add 8 to both sides: $2x=20$.',
        'Divide by 2: $x=10$.',
      ],
      conclusion: 'The equation’s solution is 10, choice A.',
    },
    {
      type: 'recognition',
      title: 'Set up the absolute-value inequality',
      markdown: 'For $|A|>2$, either $A>2$ or $A<-2$. Here $A=(2x-4)/3$. Because 3 is positive, multiplying by 3 keeps the inequality signs in the same direction.',
    },
    {
      type: 'source-note',
      text: 'The source highlights the multiple-choice answers on page 4; the explanation here shows how to obtain them.',
    },
  ),
  explainedPage(
    4,
    'Review answers: equation and inequality',
    'The highlighted choices are A, $10$, and B, $(-\\infty,-1)\\cup(5,\\infty)$. The interval endpoints are excluded because the inequality is strict.',
    {
      type: 'worked-example',
      title: 'Finish both absolute-value cases',
      steps: [
        'Positive case: $(2x-4)/3>2$. Multiply by 3: $2x-4>6$, so $2x>10$ and $x>5$.',
        'Negative case: $(2x-4)/3<-2$. Multiply by 3: $2x-4<-6$, so $2x<-2$ and $x<-1$.',
        'Combine the two separate regions: $x<-1$ or $x>5$.',
      ],
      conclusion: 'The solution set is $(-\\infty,-1)\\cup(5,\\infty)$, choice B. Parentheses show that $-1$ and 5 are not included.',
    },
    {
      type: 'trap',
      title: 'A “greater than” absolute value creates two outer intervals',
      markdown: 'The values farther than 2 from zero lie to the left of $-2$ or the right of 2. They do not lie between the two boundary values.',
    },
  ),
  explainedPage(
    5,
    'Review: form a quotient of two functions',
    'For $f(x)=x^2-15x+50$ and $g(x)=x^2-7x+10$, factor both polynomials before simplifying $(g/f)(x)$.',
    {
      type: 'formula',
      label: 'Functions and requested quotient',
      latex: 'f(x)=x^2-15x+50,\\qquad g(x)=x^2-7x+10,\\qquad \\left(\\frac gf\\right)(x)=?',
      explanation: 'The notation $g/f$ means $g(x)$ divided by $f(x)$: the order matters. The denominator function $f(x)$ must not be zero.',
    },
    {
      type: 'worked-example',
      title: 'Factor and cancel the common factor',
      steps: [
        'Factor $f(x)=x^2-15x+50=(x-5)(x-10)$. The two numbers multiply to 50 and add to $-15$.',
        'Factor $g(x)=x^2-7x+10=(x-5)(x-2)$. The factors multiply to 10 and add to $-7$.',
        'Divide and cancel the shared factor: $\\frac{g(x)}{f(x)}=\\frac{(x-5)(x-2)}{(x-5)(x-10)}=\\frac{x-2}{x-10}$.',
      ],
      conclusion: 'The simplified rule matches choice C on the next slide.',
    },
    {
      type: 'trap',
      title: 'Keep the original denominator restrictions',
      markdown: 'Since the original denominator is $f(x)=(x-5)(x-10)$, the quotient is undefined at both $x=5$ and $x=10$. Canceling $(x-5)$ does not restore $x=5$ to the original domain.',
    },
  ),
  explainedPage(
    6,
    'Review answer: simplify $(g/f)(x)$',
    'The source highlights choice C, $(x-2)/(x-10)$. The original quotient’s domain still excludes $x=5$ and $x=10$.',
    {
      type: 'worked-example',
      title: 'Check the answer by expansion and domain',
      steps: [
        'The numerator $g(x)$ factors to $(x-5)(x-2)$; the denominator $f(x)$ factors to $(x-5)(x-10)$.',
        'Cancel the shared $(x-5)$ factor only when $x\\ne5$, leaving $(x-2)/(x-10)$.',
        'Also exclude $x=10$, since it makes the remaining denominator zero and made the original denominator zero.',
      ],
      conclusion: 'Choose C for the simplified expression, with original domain $\\mathbb R\\setminus\\{5,10\\}$.',
    },
    {
      type: 'recognition',
      title: 'Quotient of functions',
      markdown: 'Write $(g/f)(x)=g(x)/f(x)$ first, factor each function, and then check where the **original denominator function** is zero.',
    },
  ),
  explainedPage(
    7,
    'Review: evaluate a composition',
    'For $f(x)=(2x-1)/2$ and $g(x)=x+2$, the problem asks for $(g\\circ f)(3/2)$. Apply $f$ first, then $g$.',
    {
      type: 'formula',
      label: 'Composition question',
      latex: 'f(x)=\\frac{2x-1}{2},\\qquad g(x)=x+2,\\qquad (g\\circ f)\\left(\\frac32\\right)=?',
      explanation: 'The symbol $g\\circ f$ means $g(f(x))$: put the output of $f$ into $g$. Composition is evaluated from the inside function to the outside function.',
    },
    {
      type: 'recognition',
      title: 'Read the order carefully',
      markdown: 'Even though $g$ is written first in $g\\circ f$, calculate $f$ first. The input $3/2$ goes into $f$; its output then becomes the input to $g$.',
    },
    {
      type: 'source-note',
      text: 'The highlighted choice and calculation appear on source page 8.',
    },
  ),
  explainedPage(
    8,
    'Review answer: composition gives 3',
    'First $f(3/2)=1$. Then $g(1)=1+2=3$, so $(g\\circ f)(3/2)=3$, choice C.',
    {
      type: 'worked-example',
      title: 'Work from inside to outside',
      steps: [
        'Evaluate the inner function: $f(3/2)=\\frac{2(3/2)-1}{2}=\\frac{3-1}{2}=1$.',
        'Use that result as the input to $g$: $g(f(3/2))=g(1)=1+2=3$.',
      ],
      conclusion: 'The composition equals 3, the highlighted choice C.',
    },
    {
      type: 'trap',
      title: 'Do not reverse the composition',
      markdown: '$(g\\circ f)(x)$ is $g(f(x))$, not $f(g(x))$. Use the rightmost function first.',
    },
  ),
  explainedPage(
    9,
    'Review: domains of a rational and reciprocal function',
    'The first question asks for the domain of $3/(2x-4)$; the second asks for the domain of $x^{-1}=1/x$.',
    {
      type: 'formula',
      label: 'Two domain questions',
      latex: '\\text{5. }\\frac3{2x-4}\\qquad\\text{6. }x^{-1}',
      explanation: 'A domain is the set of inputs for which a formula is defined as a real number. A fraction cannot have denominator zero, and $x^{-1}$ means the reciprocal $1/x$.',
    },
    {
      type: 'recognition',
      title: 'Look for forbidden inputs',
      markdown: 'For the rational function, set the denominator equal to zero and exclude that input. For the reciprocal, remember that zero has no reciprocal.',
    },
    {
      type: 'source-note',
      text: 'The highlighted choices are shown on source page 10.',
    },
  ),
  explainedPage(
    10,
    'Review answers: exclude the denominator zeros',
    'For $3/(2x-4)$, exclude $x=2$. For $x^{-1}=1/x$, exclude $x=0$.',
    {
      type: 'worked-example',
      title: 'Find each domain',
      steps: [
        'Example 5: solve $2x-4=0$, giving $x=2$. This is the only input that makes the denominator zero.',
        'So the domain is all real numbers except 2: $(-\\infty,2)\\cup(2,\\infty)$, choice D.',
        'Example 6: $x^{-1}=1/x$, which is undefined at $x=0$. Every other real input is allowed.',
      ],
      conclusion: 'The second domain is $\\mathbb R\\setminus\\{0\\}$, choice A.',
    },
    {
      type: 'trap',
      title: 'Negative exponent does not mean negative input only',
      markdown: '$x^{-1}$ means $1/x$. It is defined for both positive and negative nonzero real numbers; only zero must be excluded.',
    },
  ),
  explainedPage(
    11,
    'Review: one limit by factoring, one at infinity',
    'Example 7 gives a $0/0$ form that can be factored; Example 8 has a lower-degree numerator than denominator and tends to 0.',
    {
      type: 'formula',
      label: 'Example 7',
      latex: '\\lim_{x\\to4}\\frac{x^2+x-20}{x-4}',
      explanation: 'Direct substitution gives zero on top and bottom. Factor the numerator to cancel the shared $x-4$ factor.',
    },
    {
      type: 'formula',
      label: 'Example 8',
      latex: '\\lim_{x\\to\\infty}\\frac{3x^2+27}{x^3-27}',
      explanation: 'The denominator has degree 3 and the numerator degree 2. As $x$ grows, the denominator grows faster.',
    },
    {
      type: 'source-note',
      text: 'The source highlights the answers on page 12: 9 for Example 7 and 0 for Example 8.',
    },
  ),
  explainedPage(
    12,
    'Review answers: limit is 9 and limit is 0',
    'Factoring Example 7 leaves $x+5$, which approaches 9. In Example 8, the denominator grows one degree faster, so the fraction approaches 0.',
    {
      type: 'worked-example',
      title: 'Example 7: factor and cancel',
      steps: [
        'Factor the numerator: $x^2+x-20=(x+5)(x-4)$.',
        'For $x\\ne4$, cancel $x-4$ with the denominator, leaving $x+5$.',
        'Now substitute 4 into the simpler expression: $4+5=9$.',
      ],
      conclusion: 'The limit is 9, choice C. The original fraction is undefined at 4, but its limit exists.',
    },
    {
      type: 'worked-example',
      title: 'Example 8: compare degrees',
      steps: [
        'Divide numerator and denominator by $x^3$: $\\frac{3/x+27/x^3}{1-27/x^3}$.',
        'As $x\\to\\infty$, the numerator approaches 0 and the denominator approaches 1.',
        'The quotient approaches $0/1=0$.',
      ],
      conclusion: 'The limit is 0, choice A.',
    },
  ),
  explainedPage(
    13,
    'Review: radical limit question',
    'The limit is $1/2$. The slide highlights choice A, but choice C appears to print the same answer, so the answer value is clear while the letter is duplicated.',
    {
      type: 'formula',
      label: 'Example 9',
      latex: '\\lim_{x\\to-1}\\frac{\\sqrt{x+2}-1}{x+1}',
      explanation: 'Substitution gives $0/0$: the root becomes $\\sqrt1=1$ and the denominator becomes zero. Use the conjugate to simplify.',
    },
    {
      type: 'source-note',
      text: 'Source ambiguity: options A and C both appear as $1/2$ on the rendered slide; A is highlighted. The numerical answer is supported by the worked solution on page 14, but the multiple-choice letter is not unique as printed.',
    },
    {
      type: 'recognition',
      title: 'Choose the conjugate',
      markdown: 'The conjugate of $\\sqrt{x+2}-1$ is $\\sqrt{x+2}+1$. Their product removes the root using $(A-B)(A+B)=A^2-B^2$.',
    },
  ),
  explainedPage(
    14,
    'Review answer: rationalize the radical limit',
    'Multiply by the conjugate, cancel $x+1$, and substitute $x=-1$ into $1/(\\sqrt{x+2}+1)$ to get $1/2$.',
    {
      type: 'worked-example',
      title: 'Rationalize step by step',
      steps: [
        'Multiply top and bottom by $\\sqrt{x+2}+1$: $\\frac{\\sqrt{x+2}-1}{x+1}\\cdot\\frac{\\sqrt{x+2}+1}{\\sqrt{x+2}+1}$.',
        'The numerator becomes $(x+2)-1=x+1$.',
        'Cancel $x+1$ for $x\\ne-1$, leaving $\\frac1{\\sqrt{x+2}+1}$.',
        'Substitute $x=-1$: $\\frac1{\\sqrt1+1}=\\frac12$.',
      ],
      conclusion: 'The limit is $1/2$. The repeated answer choice on the previous slide is a source typo; the solution value itself is unambiguous.',
    },
    {
      type: 'trap',
      title: 'Multiply the numerator and denominator',
      markdown: 'Rationalizing means multiplying the whole fraction by the conjugate divided by itself, which equals 1. Multiplying only the numerator would change the expression.',
    },
  ),
  explainedPage(
    15,
    'Example 10: continuity at $x=2$',
    'The piecewise function uses $\\sqrt{x+2}$ below 2, $x^2-2$ from 2 to below 3, and $2x+5$ from 3 onward. At 2, the middle rule defines the value.',
    {
      type: 'formula',
      label: 'Piecewise function in Example 10',
      latex: 'f(x)=\\begin{cases}\\sqrt{x+2},&x<2,\\\\x^2-2,&2\\le x<3,\\\\2x+5,&x\\ge3.\\end{cases}',
      explanation: 'At $x=2$, use the middle branch because it includes 2. For the left-hand limit use the square-root branch; for the right-hand limit use the middle branch.',
    },
    {
      type: 'recognition',
      title: 'Boundary check',
      markdown: 'Find $f(2)$ from the branch containing 2. Then find both one-sided limits from the neighboring branches and check whether their common value equals $f(2)$.',
    },
    {
      type: 'source-note',
      text: 'The source’s three checks and continuity conclusion are on page 16.',
    },
  ),
  explainedPage(
    16,
    'Example 10: the function is continuous at 2',
    'The left and right limits are both 2, and $f(2)=2$. The function is continuous at $x=2$.',
    {
      type: 'worked-example',
      title: 'Check the value and both sides',
      steps: [
        'Since $2\\le x<3$ includes 2, $f(2)=2^2-2=2$.',
        'From the right, use $x^2-2$: as $x\\to2^+$, the value approaches $2^2-2=2$.',
        'From the left, use $\\sqrt{x+2}$: as $x\\to2^-$, the value approaches $\\sqrt{2+2}=\\sqrt4=2$.',
        'Both one-sided limits equal 2, so the two-sided limit exists and equals $f(2)$.',
      ],
      conclusion: 'All continuity conditions hold, so $f$ is continuous at 2.',
    },
  ),
  explainedPage(
    17,
    'Example 11: continuity at $x=3$',
    'At $x=3$, the rule $2x+5$ gives the point value. The left-hand limit comes from $x^2-2$, so the two sides may not agree.',
    {
      type: 'formula',
      label: 'Same piecewise function, new target',
      latex: 'f(x)=\\begin{cases}\\sqrt{x+2},&x<2,\\\\x^2-2,&2\\le x<3,\\\\2x+5,&x\\ge3.\\end{cases}',
      explanation: 'The target is now 3. The middle branch applies immediately to the left; the last branch includes 3 and applies on its right.',
    },
    {
      type: 'recognition',
      title: 'Use each branch on its own side',
      markdown: 'The point value and right-hand limit use $2x+5$. The left-hand limit uses $x^2-2$.',
    },
    {
      type: 'source-note',
      text: 'The calculations and conclusion are on source page 18.',
    },
  ),
  explainedPage(
    18,
    'Example 11: a jump at 3',
    'The right-hand limit is 11 and the left-hand limit is 7. Since they differ, the two-sided limit does not exist and the function is not continuous at 3.',
    {
      type: 'worked-example',
      title: 'Evaluate the point and both limits',
      steps: [
        'At $x=3$, the last branch applies: $f(3)=2(3)+5=11$.',
        'From the right, $2x+5\\to2(3)+5=11$.',
        'From the left, $x^2-2\\to3^2-2=7$.',
        'Because $11\\ne7$, the one-sided limits disagree, so no two-sided limit exists.',
      ],
      conclusion: 'The function is not continuous at $x=3$. Since both side-limits are finite but unequal, this is a jump discontinuity.',
    },
  ),
  explainedPage(
    19,
    'Example 12: continuity at $x=-1$',
    'The function assigns $f(-1)=5$. The left branch is $2x+5$ and the right branch is $x^2+2$; both approach 3.',
    {
      type: 'formula',
      label: 'Piecewise function in Example 12',
      latex: 'f(x)=\\begin{cases}2x+5,&x<-1,\\\\x^2+2,&x>-1,\\\\5,&x=-1.\\end{cases}',
      explanation: 'The point value is given by the third branch. Use the first branch for the left-hand limit and the second for the right-hand limit.',
    },
    {
      type: 'recognition',
      title: 'The point value is a separate check',
      markdown: 'The two limits determine whether the two-sided limit exists. Only after finding it should you compare with the assigned point value 5.',
    },
    {
      type: 'source-note',
      text: 'The source calculation is on page 20; one comparison sign on that slide is inconsistent with its own arithmetic.',
    },
  ),
  explainedPage(
    20,
    'Example 12: the limit exists, but the function is not continuous',
    'Both one-sided limits equal 3, so the limit exists and is 3. Since $f(-1)=5$, the function is not continuous at $-1$; the discontinuity is removable.',
    {
      type: 'worked-example',
      title: 'Check each condition',
      steps: [
        'The point value is $f(-1)=5$, so the function is defined there.',
        'From the right, $x^2+2\\to(-1)^2+2=3$.',
        'From the left, $2x+5\\to2(-1)+5=3$. The two one-sided limits are equal, so $\\lim_{x\\to-1}f(x)=3$.',
        'Compare the limit with the point value: $3\\ne5$. Therefore the function is not continuous at $-1$.',
      ],
      conclusion: 'The finite limit exists, so this is a removable discontinuity; assigning $f(-1)=3$ would make the function continuous.',
    },
    {
      type: 'source-note',
      text: 'Source correction: the slide prints “right limit ≠ left limit” after calculating both as 3. That comparison sign should be “=”. Its final conclusion that the function is not continuous is still correct, because the limit 3 differs from $f(-1)=5$.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: choose a method',
      markdown: '- **Linear equations:** distribute, collect like terms, and isolate the variable.  \n- **Absolute-value inequalities:** split $|A|>k$ into $A>k$ or $A<-k$; use open endpoints for strict inequalities.  \n- **Function quotients:** factor first, cancel common factors, and keep restrictions from the original denominator.  \n- **Composition:** apply the inner function first, then the outer one.  \n- **Domains:** exclude inputs that cause division by zero or another undefined operation.  \n- **Limits:** factor a $0/0$ expression or rationalize a radical; at infinity compare polynomial degrees.  \n- **Continuity:** check that the function value exists, the limit exists, and both values agree. At piecewise boundaries, compare the two one-sided limits.',
    },
  ),
  visualOnlyPage(21, 'Thank you — closing slide', 'This final slide shows the EELU thank-you and questions graphic. It contains no further lesson content.'),
];

export const mathematics1Lecture8Lesson: Lesson = {
  id: 'mathematics-1-lecture-8-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 8.pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 8.pdf',
  title: 'Archived Lecture 8: Review and Continuity',
  sourcePageCount: 21,
  pages,
  lastReviewed: '2026-10-14',
};
