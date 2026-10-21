import type { Lesson, LessonPage } from '../types';

interface PageTeachingNotes {
  recognition?: string;
  trap?: string;
  analogy?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  terms?: string,
  note?: string,
  teaching?: PageTeachingNotes,
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (terms) blocks.push({ type: 'recognition', title: 'Key words and symbols', markdown: terms });
  if (teaching?.recognition) {
    blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: teaching.recognition });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: explanation });
  if (teaching?.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: teaching.trap });
  }
  if (teaching?.analogy) {
    blocks.push({ type: 'alternate', title: 'A quick mental picture', markdown: teaching.analogy });
  }
  return { sourcePage, title, coverage: 'explained', blocks, ...(note ? { note } : {}) };
}

const pages: LessonPage[] = [
  {
    sourcePage: 1,
    title: 'Mathematics (1) — course cover',
    coverage: 'visual-only',
    blocks: [],
    note: 'The cover identifies Mathematics (1), Fall Semester 2026–2027, and the three instructors named on this current Moodle file.',
  },
  explainedPage(
    2,
    'Instructors Information — course administration',
    'This page lists three instructors and their associated centers.',
    'The current Moodle slide lists Dr. Amany Magdy with Ain Shams, Dr. Talat Eldanaf with Menoufia, and Dr. Asmaa Gamal with Fayoum. Their email addresses are in the original table; open the source if you need to copy an address exactly. This page is administrative information, not a mathematics rule.',
    '**Center** — the university center associated with an instructor in this course table.',
  ),
  explainedPage(
    3,
    'Sectors — center locations',
    'The slide groups the listed learning centers under the three instructors.',
    'The table associates Dr. Amany Magdy with Ain Shams, Assuit, Qena, Suhag, Hurghada, and Aswan. Dr. Talat Eldanaf is associated with Menoufia, Alexandria, ElSadat, and Tanta. Dr. Asmaa Gamal is associated with Fayoum, Beni Suief, and Esmaielia. These spellings follow the source slide.',
  ),
  explainedPage(
    4,
    'Grade Distribution — current course weights',
    'The slide assigns 10% to section attendance and assignments, 20% to two quizzes, 20% to the midterm, and 50% to the final.',
    'A percentage weight says how much that item contributes to the total course grade. The listed weights add to 100%: $10+20+20+50=100$. This is the distribution printed in the current Moodle file; use a later official course announcement if the university updates it.',
    '**Weight** — a share of the total grade. For example, 20% means one fifth of the total.',
  ),
  explainedPage(
    5,
    'Text book — reference',
    'The slide names Thomas’ Calculus: Early Transcendentals, 15th edition.',
    'This is a reference page rather than a worked mathematics lesson. It identifies the stated textbook and edition, but does not assign a chapter or page range on this slide.',
  ),
  explainedPage(
    6,
    'Course Outline — topics ahead',
    'The outline moves from number and algebra basics to functions, limits, differentiation, and integration.',
    'Read the list as a map of the course: first review numbers and algebra, then study functions and their graphs, limits and continuity, differentiation, and integration. The outline names topics but does not define them here.',
    '**Continuity** — a property of a function studied after limits. The detailed definition belongs to the later course material.',
  ),
  {
    sourcePage: 7,
    title: 'The Number System — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This is a topic-title slide. The number categories begin on source page 8.',
  },
  explainedPage(
    8,
    'Natural Numbers and Whole Numbers',
    'Natural numbers on this slide start at 1; whole numbers include 0 and do not include negative or fractional values.',
    '**Natural numbers** ($\\mathbb{N}$ in the slide) are $1,2,3,\\ldots$. The dots mean the counting continues without a last number. **Whole numbers** are $0,1,2,3,\\ldots$; they have no fractional or decimal part and are not negative. Therefore every natural number shown here is also a whole number, while 0 is whole but is not natural under this slide’s convention.',
    '**$\\mathbb{N}$** — the natural-number symbol used by the lecture.  \n**$\\ldots$** — the sequence continues.  \nThe slide notes that some people use a different convention for whether 0 is natural; follow this lecture’s definition here.',
    undefined,
    {
      recognition: 'When classifying a nonnegative whole number, check whether it is 0: under this lecture’s convention, positive counting numbers are natural, and 0 is whole but not natural.',
      trap: 'Some books include 0 in the natural numbers. This lecture explicitly starts $\\mathbb{N}$ at 1, so use the slide’s convention for this course.',
    },
  ),
  explainedPage(
    9,
    'Integers and Rational Numbers',
    'Integers include negatives, zero, and positives; rational numbers are ratios of integers with a nonzero denominator.',
    '**Integers** ($\\mathbb{Z}$) are the whole numbers and their negatives: $\\ldots,-2,-1,0,1,2,\\ldots$. **Rational numbers** ($\\mathbb{Q}$) can be written as $\\frac{m}{n}$, where $m$ and $n$ are integers and $n\\ne0$. The examples show that $\\frac12=0.5$, $0.25=\\frac14$, $-7=\\frac{-7}{1}$, and $4.12=\\frac{412}{100}$. A repeating decimal such as $0.\\overline{3}=\\frac13$ is rational too; the bar means the digit repeats forever.',
    '**$\\mathbb{Z}$** — integers.  \n**$\\mathbb{Q}$** — rational numbers.  \n**Nonzero denominator** — division by 0 is undefined, so $n$ cannot be 0.',
    undefined,
    {
      recognition: 'If a value can be written as a fraction of integers with a nonzero denominator, it is rational. A terminating or repeating decimal can be converted to such a fraction.',
      trap: 'A decimal is not irrational just because it has a decimal point. Terminating and repeating decimals are rational; for an unmarked ellipsis, you need to know how the digits continue.',
    },
  ),
  explainedPage(
    10,
    'Irrational Numbers and Real Numbers',
    'Irrational numbers cannot be written as a ratio of integers; real numbers include both rational and irrational numbers.',
    'The slide gives $\\pi$ and $\\sqrt{2}$ as irrational examples. Their decimal expansions continue without repeating. By contrast, $2=2.000\\ldots$ is rational because its decimal repeats zeros and it can be written as $\\frac21$. Thus an ellipsis alone does not mean a number is irrational: the decimal must continue without a repeating pattern. The real numbers ($\\mathbb{R}$) are the numbers represented on the number line, including integers, fractions, terminating decimals, repeating decimals, and irrational numbers.',
    '**$\\mathbb{Q}^{\\prime}$** — the slide’s symbol for irrational numbers.  \n**$\\mathbb{R}$** — real numbers.  \n**Repeating decimal** — a decimal with a digit or block of digits that repeats forever.',
  ),
  explainedPage(
    11,
    'How the Number Sets Fit Together',
    'The diagram nests natural numbers inside whole numbers, integers, rational numbers, and real numbers; irrationals are also real but lie outside the rational set.',
    'Read the diagram from the smallest nested region outward: $\\mathbb{N}\\subseteq\\text{Whole}\\subseteq\\mathbb{Z}\\subseteq\\mathbb{Q}\\subseteq\\mathbb{R}$. The irrational region is a separate part inside $\\mathbb{R}$, outside $\\mathbb{Q}$. For the slide’s example, $-2$ is an integer; therefore it is also rational ($-2=-2/1$) and real. It is not whole or natural.',
    '**Subset** ($\\subseteq$) — every member of the smaller set belongs to the larger set.  \nThe diagram’s overlapping boundaries represent containment, not that the different number categories are all identical.',
  ),
  explainedPage(
    12,
    'Number Line — order and negative numbers',
    'Numbers farther right are larger; moving left from 0 gives the negative integers.',
    'The first line counts by 1 from 0 toward 10 and continues to 11, 12, and beyond. The second line extends left of 0: the ticks are $-1,-2,-3,\\ldots$. To compare two numbers, locate them on the line: the one farther right is greater. For example, $-1>-3$ because $-1$ lies to the right of $-3$.',
    '**Number line** — a line that places numbers in order.  \n**Negative** — less than 0.  \n**$<$ / $>$** — less than / greater than.',
  ),
  explainedPage(
    13,
    'Check Your Knowledge — classify the numbers',
    'Classify a number by asking whether it is natural, whole, integer, rational, irrational, and real; a finite or repeating decimal is rational.',
    'Work through the displayed values:\n\n- $-3$ is an integer, rational ($-3/1$), and real.\n- $4.\\overline{5}=4+5/9=41/9$ is rational and real.\n- $-4.89375872537653487287439843098\\ldots$ is not fully classifiable from the printed digits alone: the slide shows an ellipsis but no bar or statement that the decimal never repeats. If the continuation is non-repeating, it is irrational; if it eventually repeats, it is rational.\n- $-9.7654321$ is a terminating decimal, so it is rational and real.\n- $-9/3=-3$, so it is an integer, rational, and real.\n- $5.\\overline{678}=5+678/999=1891/333$, so it is rational and real.\n\nNone of the negative values is natural or whole. The finite/repeating decimals are not integers unless their value simplifies to a whole number.',
    '**Terminating decimal** — a decimal with finitely many digits after the point. It can be written over a power of 10.  \n**Repeating decimal** — a decimal with a repeating block; it can be written as a fraction.',
    undefined,
    {
      recognition: 'Classify in layers: check whether the value is natural or whole, then integer, then rational or irrational, and finally real. A number can belong to several nested sets.',
      trap: 'Do not infer “irrational” from an ellipsis alone. The third decimal on this slide has no repeating bar or statement about its continuation, so its rational/irrational status is undetermined from the printed page.',
    },
  ),
  {
    sourcePage: 14,
    title: 'Basic Operations — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This slide introduces the basic-operations topic. The operation names appear on source page 15.',
  },
  explainedPage(
    15,
    'Basic Operations',
    'The four operations listed are addition, subtraction, multiplication, and division.',
    'The symbols shown are $+$ for addition, $-$ for subtraction, $\\times$ for multiplication, and $\\div$ for division. The next pages use multiplication, division, addition, and subtraction together, so the order-of-operations rules determine which calculation comes first.',
    '**Operation** — a calculation performed on one or more numbers.',
  ),
  {
    sourcePage: 16,
    title: 'Order of Operations — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This title slide introduces the order-of-operations rules shown on source page 17.',
  },
  explainedPage(
    17,
    'Order of Operations — the four levels',
    'Use this order: grouping symbols; exponents, roots, and absolute values; multiplication/division left to right; addition/subtraction left to right.',
    '1. Simplify inside grouping symbols first: parentheses $(\\ )$, braces $\\{\\ \\}$, and brackets $[\\ ]$ are all grouping symbols. 2. Evaluate exponents, roots, and absolute values. 3. Do multiplication and division in the order they appear from left to right. 4. Do addition and subtraction in the order they appear from left to right. Multiplication does not automatically come before division, and addition does not automatically come before subtraction: within each pair, use left-to-right order.',
    '**Exponent** — a small raised number such as the 2 in $8^2$, meaning $8\\times8$.  \n**Left to right** — begin with the first operation of that priority that appears as you read the expression.',
    undefined,
    {
      recognition: 'Scan an expression in this order: grouping; exponents, roots, and absolute values; multiplication and division left to right; addition and subtraction left to right.',
      trap: 'Multiplication does not always come before division, and addition does not always come before subtraction. At each shared level, follow the expression from left to right.',
    },
  ),
  explainedPage(
    18,
    'Order of Operations — Examples 1 and 2',
    'The source asks you to evaluate two expressions; the grouped subtraction in Example 2 is done before multiplication or division.',
    '**Example 1:** $6\\cdot5-4\\div2+2$. **Example 2:** $6\\cdot(5-4)\\div2+2$. Try each one using the four levels from page 17. In Example 2, simplify $(5-4)$ first because it is inside parentheses. The source gives both results on page 20, where the intermediate steps are shown here.',
    '**$\\cdot$** — multiplication.  \n**$\\div$** — division.',
  ),
  explainedPage(
    19,
    'Order of Operations — Examples 3 and 4',
    'The source gives two more expressions: one has parentheses and a square; the other has an exponent.',
    '**Example 3:** $4^2+(19-15)\\cdot3$. **Example 4:** $2+6+8^2$. Before adding, evaluate the parentheses and exponent; then do multiplication if present. The source lists the results on page 20.',
    '**$4^2$** — 4 squared, or $4\\times4$.  \n**$8^2$** — 8 squared, or $8\\times8$.',
  ),
  explainedPage(
    20,
    'Order of Operations — worked solutions',
    'The four answers shown are 30, 5, 28, and 72; applying the priority rules produces each one.',
    '**Example 1:** $6\\cdot5-4\\div2+2=30-2+2=28+2=30$. Multiplication and division are done first, from left to right; then subtraction and addition from left to right.\n\n**Example 2:** $6\\cdot(5-4)\\div2+2=6\\cdot1\\div2+2=6\\div2+2=3+2=5$.\n\n**Example 3:** $4^2+(19-15)\\cdot3=16+4\\cdot3=16+12=28$.\n\n**Example 4:** $2+6+8^2=2+6+64=8+64=72$.',
    '**Check:** Each result matches the answer printed on the source slide. The intermediate equalities show which operation was evaluated at each step.',
    undefined,
    {
      recognition: 'Before calculating, mark the first operation in the highest-priority level. Simplify it, rewrite the expression, and repeat until only one value remains.',
      trap: 'Do not combine operations from different levels in one jump. In Example 2, evaluate $(5-4)$ before multiplying; in Example 3, evaluate $4^2$ and $(19-15)$ before multiplying and adding.',
    },
  ),
  {
    sourcePage: 21,
    title: 'Absolute Value — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This title slide introduces absolute value. The definition and number-line interpretation appear on source page 22.',
  },
  explainedPage(
    22,
    'Absolute Value — distance from zero',
    'Absolute value is distance from zero, so it is never negative; $|x-y|$ is the distance between $x$ and $y$.',
    'The piecewise definition is $|x|=x$ when $x\\ge0$, and $|x|=-x$ when $x<0$. If $x$ is already nonnegative, its distance from 0 is $x$. If $x$ is negative, negate it to get the positive distance: $|-5|=5$. For every real $x$, $|x|\\ge0$, and $|x|=0$ exactly when $x=0$. On the diagrams, $|3|=3$, $|-5|=5$, and $|4-1|=|1-4|=3$: both expressions measure the distance between 1 and 4.',
    '**$|x|$** — absolute value of $x$. The vertical bars mean distance here.  \n**$x\\ge0$** — $x$ is at least 0.  \n**Piecewise definition** — a rule whose formula depends on which condition is true.',
    undefined,
    {
      recognition: 'If the expression is $|x|$, measure from 0. If it is $|x-y|$, measure the distance between the two numbers; distance is nonnegative either way.',
      trap: 'Do not treat the bars as ordinary parentheses or leave a negative result. For a negative input, negate the input to obtain its positive distance from zero.',
      analogy: 'Walking from 0 to $-5$ takes 5 steps. Absolute value reports the number of steps, not whether you walked left or right.',
    },
  ),
  explainedPage(
    23,
    'Absolute Value Properties',
    'Absolute value preserves magnitude across negatives, products, and quotients; the triangle inequality bounds the size of a sum.',
    'The slide lists four properties:\n\n1. $|-a|=|a|$: a number and its negative have the same distance from 0.\n2. $|ab|=|a||b|$: the absolute value of a product is the product of the magnitudes.\n3. $\\left|\\frac{a}{b}\\right|=\\frac{|a|}{|b|}$: absolute value of a quotient is the quotient of the magnitudes; this requires $b\\ne0$.\n4. $|a+b|\\le|a|+|b|$: the triangle inequality says the magnitude of the sum is no greater than the sum of the separate magnitudes.',
    '**$\\le$** — less than or equal to.  \n**Triangle inequality** — the fourth property shown on the slide.',
    'The source gives the quotient rule without printing its domain condition; $b\\ne0$ is required because the left side divides by $b$.',
    {
      recognition: 'For $|-a|$, $|ab|$, and $|a/b|$, compare magnitudes; for a sum, the triangle inequality gives an upper bound.',
      trap: 'The quotient identity needs $b\\ne0$. The triangle inequality uses $\\le$, not equality in every case.',
    },
  ),
  {
    sourcePage: 24,
    title: 'Thank You — closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'Closing slide with the EELU logo and “Thank you for watching” / “Questions?” text. It adds no mathematics content.',
  },
];

export const mathematics1Lessons: Lesson[] = [
  {
    id: 'mathematics-1-lecture-1-current',
    courseId: 'mathematics-1',
    sourceKey: 'current:mathematics-1:lecture 1 math 1.pdf',
    sourcePath: 'The Lectures i downloaded this term recently/lecture 1 math 1.pdf',
    title: 'Lecture 1: Number Systems, Operations, and Absolute Value',
    sourcePageCount: 24,
    pages,
    lastReviewed: '2026-10-14',
  },
];
