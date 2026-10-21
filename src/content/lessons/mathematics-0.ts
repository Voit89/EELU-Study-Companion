import type { Lesson, LessonBlock, LessonPage } from '../types';

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
  const blocks: LessonBlock[] = [{ type: 'zobda', text: takeaway }];
  if (terms) {
    blocks.push({ type: 'recognition', title: 'Key words and symbols', markdown: terms });
  }
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
  explainedPage(
    1,
    'Mathematics (0) — course cover',
    'This cover identifies Mathematics (0), the Fall Semester 2026–2027, and the two instructors named on the current slide.',
    'The image is a course cover rather than a mathematics explanation. It places Mathematics (0) under the Information Technology program branding and names Dr. Amany Magdy and Dr. Adel Mourad. Use the following pages for the course details and number-system material.',
    '**Mathematics (0)** — the course title shown on this year’s Moodle file.  \n**Fall Semester 2026–2027** — the semester label printed on this cover.',
    'The older 2025–2026 cover includes a third instructor; this lesson follows the current Moodle file.',
  ),
  explainedPage(
    2,
    'Instructors Information — course administration',
    'The current slide lists Dr. Amany Magdy for Ain Shams and Dr. Adel Mourad for Menoufia.',
    'This is an instructor and center reference table, not a mathematics topic. The current file lists two instructors and their centers. Email addresses also appear in the original slide; open the source if you need to copy one exactly.',
    '**Center** — the university center associated with an instructor in this slide.',
    'The older archive lists an additional instructor. The current Moodle slide is the reference for this semester.',
  ),
  explainedPage(
    3,
    'Sectors — center locations',
    'The slide maps centers to the instructors shown on the current course file.',
    'The table associates Dr. Amany Magdy with Ain Shams, Assuit, Qena, Suhag, Hurghada, and Aswan. It associates Dr. Adel Mourad with Menoufia, Alexandria, ElSadat, Tanta, Fayoum, Beni Suief, and Esmaielia. This is administrative information; it does not introduce a math concept.',
    '**Sector / center** — a location grouping used in the course information.',
    'This mapping follows the current Moodle slide, whose instructor list differs from the older archive.',
  ),
  explainedPage(
    4,
    'Grade Distribution — current course weights',
    'The current slide allocates 10% to section attendance and assignments, 20% to two quizzes, 20% to the midterm, and 50% to the final.',
    'Read each percentage as that item’s share of the course grade. The listed weights add to 100%: 10 + 20 + 20 + 50 = 100. The older file gives different weights for quizzes and the midterm, so use this current Moodle slide if you are checking the stated distribution.',
    '**Weight** — the percentage of the total course grade assigned to an item.',
    'Course grading can be updated; check the latest Moodle announcement if the course team posts a newer distribution.',
  ),
  explainedPage(
    5,
    'Text book — reference title',
    'The slide names Thomas’ Calculus: Early Transcendentals, 15th edition.',
    'This page is a textbook citation, not a worked lesson. It gives the title and edition so you can identify the stated reference. It does not specify a chapter or page range for this lecture.',
    '**15th edition** — the edition number printed in the source.',
  ),
  explainedPage(
    6,
    'Course Outline — topics ahead',
    'The course outline moves from number and algebra basics through equations, inequalities, functions, trigonometry, and analytic geometry.',
    'The slide lists these areas: numbers and algebra basics; equations; inequalities; functions and graphs; inverse functions; trigonometry basics; and analytic geometry basics. Think of this as a course roadmap. This lecture begins with the number system, so the later topics are not explained on this page.',
    '**Inverse function** — a function that reverses the input-output action of another function, when the inverse is defined.  \n**Analytic geometry** — using algebra and coordinates to study geometric shapes.',
    'The short definitions in the vocabulary box are background wording to help read the outline; the slide itself only lists the topics.',
  ),
  explainedPage(
    7,
    'The Number System — section divider',
    'This title page marks the start of the number-system material.',
    'There is no definition or example yet. The next pages begin with what a number is, then introduce number systems and decimal place value.',
  ),
  explainedPage(
    8,
    'What Is a Number?',
    'Numbers can count, show order, measure quantities, and take part in arithmetic operations.',
    'The slide gives four uses. **Counting:** 1, 2, 3 can count objects. **Ordering:** 1st, 2nd, 3rd show a position in a sequence. **Measurement:** real numbers can represent length, weight, or time. **Arithmetic:** numbers can be added, subtracted, multiplied, or divided. A number’s role depends on what you are describing.',
    '**Quantify** — say how many or how much.  \n**Measure** — describe a quantity such as length or time.  \n**Label** — identify or name something with a number.',
  ),
  explainedPage(
    9,
    'What Is a Number System?',
    'A number system gives rules for writing numbers: which symbols are allowed, what the base is, and how digit positions affect value.',
    'The slide introduces four systems. **Decimal, base 10:** digits 0–9. **Binary, base 2:** digits 0 and 1, used in computers. **Octal, base 8:** digits 0–7. **Hexadecimal, base 16:** digits 0–9 and A–F. The base tells you how many distinct digit symbols the system uses, including zero; place value explains how a symbol’s position contributes to the whole number.',
    '**Base** — the number of digit symbols in the system.  \n**Place value** — the value a digit gets from its position.  \n**Hexadecimal** — A, B, C, D, E, and F stand for the values after 9 in this base-16 system.',
  ),
  explainedPage(
    10,
    'Decimal Number System — powers of ten',
    'In base 10, each place moving left is worth ten times the place to its right.',
    `The digits are 0 through 9. From right to left, the places are units ($10^0=1$), tens ($10^1=10$), hundreds ($10^2=100$), thousands ($10^3=1000$), and so on. The slide expands 10285 like this:

$$10285=(1\\times10^4)+(0\\times10^3)+(2\\times10^2)+(8\\times10^1)+(5\\times10^0)$$

That is $10000+0+200+80+5=10285$. The zero matters because it holds the thousands place even though it contributes zero to the sum.`,
    '**$10^0$** — one unit.  \n**$10^1$** — ten.  \n**$10^2$** — one hundred.  \n**Expanded form** — writing each digit’s place-value contribution as a sum.',
    undefined,
    {
      recognition: 'When a number is expanded as digit × place value, start at the rightmost digit with $10^0$ and increase the exponent by 1 for each place to the left.',
      trap: 'Do not remove a zero placeholder from the written number. In 10285, the zero contributes 0 to the sum but keeps the other digits in their correct places.',
    },
  ),
  explainedPage(
    11,
    'Standard, Expanded, and Written Forms',
    'A number can be written as digits, as a sum of place values, or in words.',
    'For 724, the **standard form** is $724$. The **expanded form** is $700+20+4$, showing the value of each digit. The **written form** is “seven hundred twenty-four.” Place value helps you compare numbers and do arithmetic with multi-digit numbers; it also appears when counting money or measuring quantities.',
    '**Standard form** — the usual digit form.  \n**Expanded form** — the sum of each digit’s value.  \n**Written form** — the number expressed in words.',
  ),
  explainedPage(
    12,
    'Place-Value Practice — questions',
    'Use the digit’s position to answer the first two questions, then use place-value sums for the last two.',
    'The slide asks you to identify the place of 8 in 3,482 and 7 in 27,654; choose the expanded form of 5,246; and turn a place-value sum into a standard number. Try each one before moving to the worked solutions on source page 13.',
    '**A digit** is one symbol in a number. For example, 8 is a digit in 3,482. The digit and its place are different: the digit is 8, and its place in this number is tens.',
    'The source puts the questions on this page and highlights their answers on page 13.',
  ),
  explainedPage(
    13,
    'Place-Value Practice — worked solutions',
    'The four answers are: tens, thousands, $5000+200+40+6$, and 7439.',
    '**Example 1:** In 3,482, count places from the right: 2 ones, 8 tens, 4 hundreds, 3 thousands. So 8 is in the tens place (**B**). **Example 2:** In 27,654, the places are 4 ones, 5 tens, 6 hundreds, 7 thousands, 2 ten-thousands. So 7 is in the thousands place (**C**). **Example 3:** $5,246=(5\times1000)+(2\times100)+(4\times10)+(6\times1)=5000+200+40+6$ (**B**). **Example 4:** $(7\times1000)+(4\times100)+(3\times10)+(9\times1)=7000+400+30+9=7439$ (**A**).',
    '**Ones, tens, hundreds, thousands** — positions counted from the right. Each step left is ten times larger in base 10.',
    undefined,
    {
      recognition: 'If the question asks for a digit’s *place*, count positions from the right starting with ones. If it asks for the digit’s *value*, multiply the digit by that place value.',
      trap: '“7 is in the thousands place” names its position; its value in 27,654 is 7,000. Do not swap the place name with the value.',
    },
  ),
  explainedPage(
    14,
    'Negative Number — section divider',
    'This title page introduces the next topic: negative numbers.',
    'The page is a divider. The following slide explains why values below zero are useful and gives temperature and bank examples.',
  ),
  explainedPage(
    15,
    'Negative Numbers — values below zero',
    'A negative number represents a value below zero; the slide illustrates this with temperature and bank deposits or withdrawals.',
    'If a temperature is 8 degrees below zero, write it as $-8^\\circ$. The minus sign tells you the value lies below zero; it does not mean “remove 8” by itself. In the slide’s bank example, positive values represent deposits and negative values represent withdrawals. The sign communicates direction relative to zero.',
    '**Negative number** — a number less than zero.  \n**Positive number** — a number greater than zero.  \n**Zero** — the boundary between positive and negative numbers.',
  ),
  explainedPage(
    16,
    'Number Line — section divider',
    'This title page introduces the number line, which the next page uses to order and compare numbers.',
    'No number-line rule is stated on this divider. The lesson begins on source page 17.',
  ),
  explainedPage(
    17,
    'Number Line — order and compare',
    'Numbers farther left are smaller; numbers farther right are larger. Zero separates negative numbers from positive numbers.',
    'The line in the slide starts at 0 and continues to the right through positive numbers. Moving left of 0 gives $-1,-2,-3,\\ldots$. Each tick is one step in this picture. To compare two values, locate them: the one farther to the right is greater. For example, $-1$ is to the right of $-3$, so $-1>-3$. This comparison example restates the source’s left-to-right rule.',
    '**Number line** — a line that places numbers in order.  \n**Less than** ($<$) — lies to the left on the number line.  \n**Greater than** ($>$) — lies to the right.',
  ),
  explainedPage(
    18,
    'Example 5 — locate the marked point',
    'The marked point is three equal tick-steps to the left of $-8$; the next slide reveals its value as $-32$.',
    'The labels $-8$, $0$, and $8$ sit on consecutive ticks, so each tick changes by 8. The blue point is three ticks left of $-8$: $-8-8-8-8=-32$. First identify the value of one interval from the labeled ticks, then count intervals to the marked point.',
    '**Equal intervals** — neighboring ticks are separated by the same distance and, on this labeled line, the same change in value.',
    undefined,
    {
      recognition: 'For a marked point on an equally spaced number line, find the value of one interval from two labeled ticks, then count intervals from a labeled value to the point.',
      trap: 'Count the gaps between ticks, not the tick marks themselves. Moving left decreases the value, so subtract 8 at each step here.',
    },
  ),
  explainedPage(
    19,
    'Example 5 — solution: $-32$',
    'The solution labels the marked point $-32$.',
    'The solution line marks values in steps of 8: $-40,-32,-24,-16,-8,0,8,16,24,32,40$. The blue point is on the tick labeled $-32$. This confirms the counting from the previous page.',
    '**Check:** $-32$ is left of $-8$, which matches the marked point’s position.',
  ),
  explainedPage(
    20,
    'Fractions — section divider',
    'This title page introduces fractions; the definition and examples begin on the next page.',
    'There is no fraction rule on this divider. Continue to source page 21 for the meaning of numerator and denominator.',
  ),
  explainedPage(
    21,
    'What Is a Fraction?',
    'A fraction describes how many equal parts are selected out of how many equal parts make up the whole.',
    'The top number is the **numerator**: it counts the selected or shaded parts. The bottom number is the **denominator**: it counts all equal parts into which the whole is divided. In $\\frac{3}{5}$, for example, 3 would count the selected parts and 5 would count all equal parts; this small number example is included only to explain the labels. The parts must be equal-sized for this “part of a whole” interpretation.',
    '**Numerator** — top number; selected parts.  \n**Denominator** — bottom number; total equal parts.  \n**Fraction bar** — the line separating numerator from denominator; it also means division.',
    'The source defines the parts and labels. The numerical illustration $3/5$ is an added example to make those labels concrete.',
    {
      recognition: 'For a shaded-part picture, count selected equal parts for the numerator and all equal parts in the whole for the denominator.',
      trap: 'The denominator is the total number of equal parts, including unshaded parts. The “parts of a whole” picture only works when the parts are equal-sized.',
      analogy: 'Think of a chocolate bar split into equal squares: the denominator counts all squares, and the numerator counts the squares you take.',
    },
  ),
  explainedPage(
    22,
    'Fraction Practice — count the shaded parts',
    'For each shape, count the blue equal parts for the numerator and all equal parts for the denominator.',
    'This page shows four unsolved pictures. Count each small cell once. For Example 6, there are 6 cells in total; for Example 7, 4; for Example 8, 3; and for Example 9, 9. Then count how many of those cells are blue. Write “blue cells / total cells.” The next source page shows the completed fractions.',
    '**Example 6–9** — labels for the four diagrams, not powers or multiplication.',
  ),
  explainedPage(
    23,
    'Fraction Practice — solutions',
    'The four pictured fractions are $4/6$, $1/4$, $2/3$, and $6/9$.',
    '**Example 6:** 4 of 6 equal cells are blue, so $\\frac{4}{6}$. **Example 7:** 1 of 4 is blue, so $\\frac{1}{4}$. **Example 8:** 2 of 3 is blue, so $\\frac{2}{3}$. **Example 9:** 6 of 9 is blue, so $\\frac{6}{9}$. In every answer, the numerator counts blue cells and the denominator counts every cell in the shape.',
    '**Before writing the fraction:** make sure you counted all cells, including the white ones, in the denominator.',
  ),
  explainedPage(
    24,
    'Absolute Value — section divider',
    'This title page introduces absolute value; the rule and number-line meaning appear on the next page.',
    'No absolute-value definition is given on this divider. Continue to source page 25.',
  ),
  explainedPage(
    25,
    'Absolute Value — distance from zero',
    'Absolute value is a number’s distance from zero, so it is never negative.',
    'The source defines $|x|$ in two cases: $|x|=x$ when $x\\ge0$, and $|x|=-x$ when $x<0$. If $x$ is negative, changing $x$ to $-x$ makes its absolute value positive; for example, $|-5|=5$. The diagrams also show $|3|=3$ and $|4-1|=|1-4|=3$. More generally, $|x-y|$ is the distance between $x$ and $y$ on the number line. Distance is nonnegative, and it is zero only when the two positions are the same.',
    '**$|x|$** — absolute value of $x$. The bars mean distance from zero here, not ordinary parentheses.  \n**$|x-y|$** — distance between the positions $x$ and $y$.',
    undefined,
    {
      recognition: 'If you see $|x|$, ask how far $x$ is from 0. If $x<0$, change its sign to report the nonnegative distance.',
      trap: 'Absolute value does not keep a negative result. For example, $|-5|=5$ because distance cannot be negative.',
      analogy: 'On a number line, $|-5|$ is how many steps separate $-5$ from 0; the direction is ignored, but the distance remains 5.',
    },
  ),
  explainedPage(
    26,
    'Absolute Value Properties',
    'The slide lists how absolute value behaves with negatives, products, quotients, and sums.',
    '1. $|-a|=|a|$: a number and its negative have equal distance from zero. 2. $|ab|=|a||b|$: the absolute value of a product is the product of the absolute values. 3. $\\left|\\frac{a}{b}\\right|=\\frac{|a|}{|b|}$: absolute value of a quotient is the quotient of the absolute values. 4. $|a+b|\\le|a|+|b|$: this is the **triangle inequality**; the size of a sum cannot exceed the sum of the separate sizes.',
    '**$\\le$** — “less than or equal to.”  \n**Triangle inequality** — the fourth property shown on the slide.',
    'For the quotient property, $b$ must be nonzero because division by zero is undefined. This condition is necessary for the formula to make sense.',
    {
      recognition: 'For products and quotients, take the absolute value of each factor. For sums, use $|a+b|\\le|a|+|b|$ as a bound, not automatically as an equality.',
      trap: 'Do not treat the triangle inequality as equality in every case: $|1+(-1)|=0$, while $|1|+|-1|=2$.',
    },
  ),
  {
    sourcePage: 27,
    title: 'Thank You — end of lecture',
    coverage: 'visual-only',
    blocks: [],
    note: 'Closing slide with the EELU logo and “Thank you for watching” message. It contains no additional mathematics content.',
  },
];

export const mathematics0Lessons: Lesson[] = [
  {
    id: 'mathematics-0-lecture-1-current',
    courseId: 'mathematics-0',
    sourceKey: 'current:mathematics-0:lecture 1 math 0.pdf',
    sourcePath: 'lecture 1 math 0.pdf',
    title: 'Lecture 1: Number Systems, Fractions, and Absolute Value',
    sourcePageCount: 27,
    pages,
    lastReviewed: '2026-10-14',
  },
];
