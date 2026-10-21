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
    title: 'Mathematics (0) — course cover',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'The cover identifies Mathematics (0), Fall Semester 2026–2027, and Dr. Amany Magdy and Dr. Adel Mourad. It has no mathematics lesson content. The older 2025–2026 archive cover names an additional instructor; this lesson follows the current Moodle file.',
      },
    ],
  },
  dividerPage(2, 'Revision', 'A section divider. The revision material starts on page 4.'),
  dividerPage(3, 'Properties of Real Numbers', 'A section divider. The first property is explained on page 4.'),
  explainedPage(
    4,
    'Commutative Property',
    'Addition and multiplication keep the same result when you switch the order of the numbers. Subtraction and division do not have that rule.',
    {
      type: 'recognition',
      title: 'Decode the symbols',
      markdown: '**$a$ and $b$** are placeholders for numbers. **$+$** means addition, **$\times$** means multiplication, and **$\ne$** means “is not equal to.”',
    },
    {
      type: 'formula',
      label: 'Commutative rule from the slide',
      latex: 'a+b=b+a \\qquad a\\times b=b\\times a',
      explanation: 'The two numbers change places, but the operation stays the same.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If the expression uses only addition or only multiplication and asks whether the numbers can switch places, try the commutative property. Do not apply it to subtraction or division.',
    },
    {
      type: 'worked-example',
      title: 'Check the examples and the limits',
      steps: [
        '$3+5=8$ and $5+3=8$, so $3+5=5+3$.',
        '$2\\times7=14$ and $7\\times2=14$, so $2\\times7=7\\times2$.',
        'Subtraction changes: $5-3=2$, but $3-5=-2$. Therefore $5-3\\ne3-5$.',
        'Division changes: $10\\div2=5$, but $2\\div10=0.2$. Therefore $10\\div2\\ne2\\div10$.',
      ],
      conclusion: 'Switching order is safe for the two operations named in the rule: addition and multiplication.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not switch the numbers in subtraction or division. The first number has a different role from the second: $10\\div2$ is not the same calculation as $2\\div10$.',
    },
  ),
  explainedPage(
    5,
    'Associative Property',
    'For addition alone or multiplication alone, you can change the grouping without changing the result. This does not work for subtraction or division.',
    {
      type: 'recognition',
      title: 'Decode the symbols',
      markdown: '**Parentheses** show which pair is grouped first. **$a$, $b$, and $c$** stand for numbers. The key question is whether every operation between them is addition, or every operation is multiplication.',
    },
    {
      type: 'formula',
      label: 'Associative rules from the slide',
      latex: '(a+b)+c=a+(b+c) \\qquad (a\\times b)\\times c=a\\times(b\\times c)',
      explanation: 'The values stay in the same order; only the parentheses move.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If all the signs are $+$, or all are $\\times$, regrouping is allowed. If you see $-$ or $\\div$, keep the original grouping unless you evaluate it carefully.',
    },
    {
      type: 'worked-example',
      title: 'Same grouping result for addition and multiplication',
      steps: [
        'Addition: $(2+3)+4=5+4=9$. Regroup: $2+(3+4)=2+7=9$.',
        'Multiplication: $(2\\times3)\\times4=6\\times4=24$. Regroup: $2\\times(3\\times4)=2\\times12=24$.',
      ],
      conclusion: 'Both regroupings agree when the operation is consistently addition or consistently multiplication.',
    },
    {
      type: 'worked-example',
      title: 'Why subtraction and division are different',
      steps: [
        '$(10-5)-2=5-2=3$, while $10-(5-2)=10-3=7$.',
        '$(100\\div10)\\div2=10\\div2=5$, while $100\\div(10\\div2)=100\\div5=20$.',
      ],
      conclusion: 'Moving the parentheses changes these answers, so subtraction and division are not associative.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not assume parentheses can move just because the same three numbers remain. For subtraction and division, changing the grouping changes what is calculated first and can change the answer.',
    },
  ),
  explainedPage(
    6,
    'Distributive Property',
    'A factor outside parentheses multiplies every term inside. Multiplication can distribute over addition or subtraction.',
    {
      type: 'recognition',
      title: 'Decode the notation',
      markdown: 'In $a(b+c)$, writing $a$ beside parentheses means $a$ is multiplied by the whole grouped sum. The letters $a$, $b$, and $c$ stand for numbers.',
    },
    {
      type: 'formula',
      label: 'Distributive rule from the slide',
      latex: 'a(b+c)=ab+ac',
      explanation: 'The outside factor $a$ is used once with $b$ and again with $c$.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If a multiplication factor sits beside a group such as $(b+c)$, send that factor to each term inside the parentheses. For subtraction, $a(b-c)=ab-ac$.',
    },
    {
      type: 'worked-example',
      title: 'The slide’s example: 2(3+4)',
      steps: [
        'Distribute $2$ to both terms: $2(3+4)=2\\times3+2\\times4$.',
        'Multiply each pair: $2\\times3=6$ and $2\\times4=8$.',
        'Add the results: $6+8=14$.',
        'Check the original: $3+4=7$, then $2\\times7=14$.',
      ],
      conclusion: 'Both routes give $14$, which checks the distribution.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not multiply the outside factor by only the first term. In $2(3+4)$, writing $2\\times3+4$ misses the multiplication of $4$; the correct expansion is $2\\times3+2\\times4$.',
    },
  ),
  dividerPage(7, 'Basic Operations', 'A section divider. The four operations are listed on page 8.'),
  explainedPage(
    8,
    'Basic Operations',
    'Recognize the four operation signs: plus, minus, times, and divided by.',
    {
      type: 'recognition',
      title: 'Read each symbol',
      markdown: '- **$+$** means addition: combine amounts.  \n- **$-$** means subtraction: find a difference.  \n- **$\\times$** means multiplication.  \n- **$\\div$** means division.',
    },
    {
      type: 'foundation',
      title: 'What to notice first',
      markdown: 'Before calculating an expression, name the operation signs you see. Page 10 explains which operation to do first when an expression contains more than one kind.',
    },
    {
      type: 'worked-example',
      title: 'Read the signs in simple expressions',
      steps: [
        '$6+2$ reads “six plus two.”',
        '$6-2$ reads “six minus two.”',
        '$6\\times2$ reads “six times two.”',
        '$6\\div2$ reads “six divided by two.”',
      ],
      conclusion: 'The sign tells you what operation to perform; the order-of-operations rule tells you when to perform it.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Keep the order of the numbers when reading subtraction and division. $12\\div3$ means $12$ divided by $3$, not $3$ divided by $12$.',
    },
  ),
  dividerPage(9, 'Order of Operations', 'A section divider. The order rules are written on page 10.'),
  explainedPage(
    10,
    'Order of Operations',
    'Work inside grouping symbols first; then exponents, roots, and absolute values; then multiplication and division left to right; finally addition and subtraction left to right.',
    {
      type: 'recognition',
      title: 'Decode the page',
      markdown: '**Grouping symbols** include parentheses $( )$, braces $\\{ \\}$, and brackets $[ ]$. An **exponent** tells how many times a base is used as a factor, such as $3^2=3\\times3$. A **square root** such as $\\sqrt{9}$ is the nonnegative number whose square is $9$, so $\\sqrt{9}=3$; **absolute value** $|x|$ is the distance from $x$ to zero. These brief definitions help decode the operations named on the slide.',
    },
    {
      type: 'foundation',
      title: 'Use the sequence shown in the lecture',
      markdown: '1. Finish calculations inside parentheses, braces, or brackets first; when groups are nested, begin with the innermost group.  \n2. Evaluate exponents, roots, and absolute values from left to right.  \n3. Do multiplication and division in the order they appear from left to right. They share one priority level.  \n4. Do addition and subtraction in the order they appear from left to right. They share one priority level.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Mark the grouping symbols first. Then scan for the highest remaining step in the sequence. For operations on the same step, move left to right; do not automatically do every multiplication before every division.',
    },
    {
      type: 'worked-example',
      title: 'Quick checks for the left-to-right rule',
      steps: [
        'Multiplication before addition: $8-2\\times3=8-6=2$.',
        'Multiplication and division share a level: $20\\div5\\times2=4\\times2=8$ from left to right.',
        'Addition and subtraction share a level: $10-3+1=7+1=8$ from left to right.',
      ],
      conclusion: 'These short examples are added practice to make the page 10 rule easier to use.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not treat multiplication as always coming before division, or addition as always coming before subtraction. Each pair shares a level, so use left-to-right order.',
    },
  ),
  explainedPage(
    11,
    'Examples 1 and 2 — questions',
    'Example 1 tests distribution; Example 2 tests parentheses, a square, and division.',
    {
      type: 'recognition',
      title: 'Decode the two questions',
      markdown: '**Example 1:** choose the equivalent simplification of $3(5+2)-(4+1)\\times2$.  \n**Example 2:** evaluate $(4+6)^2\\div5$. The superscript $2$ means “squared”: multiply the grouped value by itself.',
    },
    {
      type: 'foundation',
      title: 'What to try before turning the page',
      markdown: 'For Example 1, distribute $3$ across $(5+2)$ and $2$ across $(4+1)$, while keeping the subtraction between the groups. The choices are A) $(3+5+2)-(4+1)\\times2$, B) $3\\times(5+2-4+1)\\times2$, C) $3\\times5+2-(4+1)\\times2$, and D) $(3\\times5)+(3\\times2)-(4\\times2+1\\times2)$.  \nFor Example 2, simplify the parentheses first, then square the result, then divide by $5$. The choices are A) $16$, B) $20$, C) $100$, and D) $40$.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'The outside factors beside parentheses signal distribution in Example 1. In Example 2, the square applies to the entire parenthesized sum.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'In Example 1, do not drop a factor or move the minus sign into a different group. In Example 2, do not read $(4+6)^2$ as $4+6\\times2$.',
    },
  ),
  explainedPage(
    12,
    'Examples 1 and 2 — worked answers',
    'The correct choices are D for Example 1 and B ($20$) for Example 2.',
    {
      type: 'worked-example',
      title: 'Example 1 — distribute both factors',
      givens: '$3(5+2)-(4+1)\\times2$',
      steps: [
        'Apply distribution to the first group: $3(5+2)=3\\times5+3\\times2$.',
        'Apply distribution to the second group: $(4+1)\\times2=4\\times2+1\\times2$. Keep the minus sign between the groups.',
        'So the equivalent expression is $(3\\times5)+(3\\times2)-(4\\times2+1\\times2)$, which is choice D.',
        'Check the value: $15+6-(8+2)=21-10=11$.',
      ],
      conclusion: 'Choice D has the right distribution. The final value $11$ is a check beyond the slide’s request to choose the correct simplification.',
    },
    {
      type: 'worked-example',
      title: 'Example 2 — group, square, divide',
      givens: '$(4+6)^2\\div5$',
      steps: [
        'Parentheses first: $4+6=10$, so the expression becomes $10^2\\div5$.',
        'Square $10$: $10^2=10\\times10=100$.',
        'Divide: $100\\div5=20$.',
      ],
      conclusion: 'The answer is $20$, choice B.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'The exponent applies to the whole parenthesized result: $(4+6)^2=10^2=100$. Squaring means $10\\times10$, not $10\\times2$.',
    },
  ),
  explainedPage(
    13,
    'Example 3',
    'Evaluate the grouped sum first, then multiply and divide from left to right, and subtract last.',
    {
      type: 'recognition',
      title: 'Read the expression',
      markdown: 'The source asks for the value of $12\\times(4+2)\\div3-7$. Its choices are A) $16$, B) $75$, C) $24$, and D) $17$.',
    },
    {
      type: 'foundation',
      title: 'Choose the first move',
      markdown: 'The parentheses tell you to calculate $4+2$ first. After that, multiplication and division share a priority level, so process them left to right. The worked answer appears on the next source page.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'For an expression shaped like $a\\times(b+c)\\div d-e$, finish $(b+c)$, then work through $\\times$ and $\\div$ left to right, and only then do the final subtraction.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not skip the parentheses or rearrange the multiplication and division. They are evaluated in their written left-to-right order.',
    },
  ),
  explainedPage(
    14,
    'Example 3',
    'The expression equals $17$, which is choice D.',
    {
      type: 'worked-example',
      title: 'Follow the order of operations',
      givens: '$12\\times(4+2)\\div3-7$',
      steps: [
        'Parentheses: $4+2=6$, giving $12\\times6\\div3-7$.',
        'Multiply from left to right: $12\\times6=72$, giving $72\\div3-7$.',
        'Divide: $72\\div3=24$, giving $24-7$.',
        'Subtract: $24-7=17$.',
      ],
      conclusion: 'The source highlights D) $17$.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not do $3-7$ before the multiplication and division. Subtraction is the last operation here because it is at the final, lower-priority step.',
    },
  ),
  explainedPage(
    15,
    'Example 4',
    'The first calculation is inside the innermost parentheses: $10\\div2=5$, so choice C is the correct first step.',
    {
      type: 'recognition',
      title: 'Decode the expression',
      markdown: 'The source expression is $4^3+[3^2-(10\\div2)]-7\\cdot3$. The question asks which single step comes first, not for the final value.',
    },
    {
      type: 'foundation',
      title: 'Compare the answer choices',
      markdown: 'A changes $4^3$ to $64$; B changes $3^2$ to $9$; C changes the grouped calculation $(10\\div2)$ to $5$; D changes both $3^2$ to $9$ and $(10\\div2)$ to $5$. The lecture’s first rule is to finish calculations inside grouping symbols before moving to exponents, so C shows exactly one first step.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'When asked for the **first step**, locate the innermost grouping symbols before evaluating powers elsewhere in the expression.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not jump straight to an exponent just because exponents have priority over multiplication in an ungrouped expression. Here, $10\\div2$ is inside parentheses, and the page 10 rule puts grouped calculations first.',
    },
    {
      type: 'source-note',
      text: 'The current 19-page Moodle copy includes Examples 4 and 5; the older archive copy has 15 pages and ends after the earlier order-of-operations examples.',
    },
  ),
  explainedPage(
    16,
    'Example 4',
    'The highlighted answer is C: replace $(10\\div2)$ with $5$ and keep the rest unchanged.',
    {
      type: 'worked-example',
      title: 'Make only the first change',
      givens: '$4^3+[3^2-(10\\div2)]-7\\cdot3$',
      steps: [
        'Work inside the innermost parentheses: $10\\div2=5$.',
        'Substitute $5$ into the same location: $4^3+[3^2-5]-7\\cdot3$.',
        'Leave $4^3$, $3^2$, and $7\\cdot3$ untouched for this first-step question.',
      ],
      conclusion: 'This is choice C and matches the highlighted answer on the source page.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Choice D also evaluates $3^2$, so it makes more than the first change. When a question asks for the first step, change only the highest-priority unfinished part.',
    },
  ),
  explainedPage(
    17,
    'Example 5',
    'Use the same order of operations from Example 4, then finish the full calculation. The answer choices are 21, 47, 68, and 64.',
    {
      type: 'recognition',
      title: 'Read the expression and choices',
      markdown: 'Evaluate $4^3+[3^2-(10\\div2)]-7\\cdot3$. The source choices are A) $21$, B) $47$, C) $68$, and D) $64$.',
    },
    {
      type: 'foundation',
      title: 'Plan the steps before calculating',
      markdown: 'Start inside $(10\\div2)$, then evaluate the powers, simplify the square-bracket group, multiply $7\\cdot3$, and finish the addition and subtraction from left to right.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'When parentheses are nested inside brackets, do the innermost parentheses first. Keep each later result in its original place; do not rearrange the expression.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Keep the minus signs in their positions. The bracket is $3^2-(10\\div2)$, and the final term is subtracted as $-7\\cdot3$.',
    },
  ),
  explainedPage(
    18,
    'Example 5',
    'The full expression equals $47$, which is choice B.',
    {
      type: 'worked-example',
      title: 'Calculate each layer in order',
      givens: '$4^3+[3^2-(10\\div2)]-7\\cdot3$',
      steps: [
        'Innermost parentheses: $10\\div2=5$, so the expression becomes $4^3+[3^2-5]-7\\cdot3$.',
        'Powers: $4^3=4\\times4\\times4=64$ and $3^2=3\\times3=9$. Now it is $64+[9-5]-7\\cdot3$.',
        'Brackets: $9-5=4$. Now it is $64+4-7\\cdot3$.',
        'Multiplication: $7\\cdot3=21$. Now it is $64+4-21$.',
        'Addition and subtraction from left to right: $64+4=68$, then $68-21=47$.',
      ],
      conclusion: 'The answer is $47$, choice B.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not subtract $7$ before multiplying by $3$. The multiplication is done before the final addition and subtraction, so the last part is $-21$.',
    },
  ),
  {
    sourcePage: 19,
    title: 'Thank You for Watching — Questions?',
    coverage: 'visual-only',
    blocks: [],
    note: 'Closing slide with the EELU branding and “Thank you for watching / Questions?” message. It introduces no additional mathematics.',
  },
];

export const mathematics0Lecture2Lessons: Lesson[] = [
  {
    id: 'mathematics-0-lecture-2-current',
    courseId: 'mathematics-0',
    sourceKey: 'current:mathematics-0:lecture 2 math 0.pdf',
    sourcePath: 'lecture 2 math 0.pdf',
    title: 'Lecture 2: Properties of Real Numbers and Order of Operations',
    sourcePageCount: 19,
    pages,
    lastReviewed: '2026-10-14',
  },
];
