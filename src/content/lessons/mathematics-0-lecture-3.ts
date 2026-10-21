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
        text: 'The cover identifies Mathematics (0), Fall Semester 2025–2026, and Dr. Amany Magdy, Dr. Adel Mourad, and Dr. Mohamed Ghaleb. This is an older archive lecture, so use it as a provisional study reference and follow the current Moodle file if its content differs.',
      },
    ],
  },
  dividerPage(2, 'Revision', 'A section divider. The revision question begins on page 3.'),
  explainedPage(
    3,
    'Revision — shaded fractions question',
    'A fraction describes how many equal parts are shaded out of all equal parts. For one sixth, look for exactly one shaded part among six equal-area parts.',
    {
      type: 'foundation',
      title: 'Where this lecture is going',
      markdown: 'This archived lecture reviews fractions, their types, how to compare them, and the four basic fraction operations. The opening revision question checks the key idea behind a fraction: the whole is split into equal-sized parts, and the numerator counts selected parts.',
    },
    {
      type: 'recognition',
      title: 'Decode the question',
      markdown: 'The slide asks which pictured squares have $\\frac{1}{6}$ of their area shaded. The numerator $1$ means one selected part; the denominator $6$ means the whole is divided into six equal-area parts. Equal-sized parts matter: six regions of different areas would not each represent one sixth.',
    },
    {
      type: 'foundation',
      title: 'What to check before choosing',
      markdown: 'Count the equal-area regions in each square, then count the shaded regions. A matching picture needs six equal parts in total and one of them shaded. Page 4 reveals the marked choices.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not count just the number of lines or colored pieces. First check whether the pieces are equal in area; the denominator counts equal parts of the whole.',
    },
  ),
  explainedPage(
    4,
    'Revision — answer to the shaded fractions question',
    'The slide marks A and C. Each has one of six equal-area parts shaded, so each represents $\\frac{1}{6}$.',
    {
      type: 'worked-example',
      title: 'Check each picture against one sixth',
      steps: [
        'A: the square is split into 2 columns and 3 rows, so there are $2\\times3=6$ equal rectangles. One is shaded: $\\frac{1}{6}$.',
        'B: the square has 6 equal vertical strips, but all 6 are shaded. That is $\\frac{6}{6}=1$ whole, not $\\frac{1}{6}$.',
        'C: the square is split into 6 equal vertical strips and exactly 1 is shaded. That is $\\frac{1}{6}$.',
        'D: the shaded bottom triangle is not one of six equal-area regions; it is one quarter of the square. It does not show $\\frac{1}{6}$.',
      ],
      conclusion: 'The correct choices are A and C, as highlighted on the source slide.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'In B, there are six parts but six are shaded, so the fraction is $\\frac{6}{6}$, not $\\frac{1}{6}$. The denominator counts all equal parts; the numerator counts only the shaded ones.',
    },
  ),
  dividerPage(5, 'Fractions', 'A section divider. The lecture begins classifying fractions on page 6.'),
  dividerPage(6, 'Types of Fractions', 'A section heading. The definitions and examples start on page 7.'),
  explainedPage(
    7,
    'Proper fractions',
    'A proper fraction has a smaller numerator than denominator, so it is less than one whole.',
    {
      type: 'recognition',
      title: 'Decode the fraction',
      markdown: 'In a fraction $\\frac{a}{b}$, the **numerator** $a$ is the top number and counts the selected parts. The **denominator** $b$ is the bottom number and tells how many equal parts make one whole. Here the slide uses $\\frac{3}{7}$: three selected parts out of seven equal parts.',
    },
    {
      type: 'worked-example',
      title: 'Read the example $\\frac{3}{7}$',
      givens: String.raw`\frac{3}{7}`,
      steps: [
        'The whole is divided into 7 equal pieces.',
        'The numerator 3 says that 3 of those pieces are selected.',
        'Because $3<7$, the selected amount is less than all 7 pieces, so $\\frac{3}{7}<1$.',
      ],
      conclusion: 'The slide’s pizza picture is an analogy: 3 slices out of 7 equal slices is a proper fraction.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Compare the top and bottom numbers. If the numerator is smaller than the positive denominator, the fraction is proper and has value below 1.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not reverse the roles: the denominator gives the total number of equal parts, while the numerator gives how many are counted.',
    },
  ),
  explainedPage(
    8,
    'Improper fractions',
    'An improper fraction has a numerator at least as large as its denominator, so its value is one or more whole units.',
    {
      type: 'recognition',
      title: 'Decode the example',
      markdown: 'For $\\frac{9}{4}$, the denominator 4 means each whole is divided into fourths; the numerator 9 counts nine fourth-size pieces. Since $9\\ge4$, the fraction is improper.',
    },
    {
      type: 'worked-example',
      title: 'See how many wholes are in $\\frac{9}{4}$',
      givens: String.raw`\frac{9}{4}`,
      steps: [
        'Group the 9 fourths into sets of 4 fourths, because $\\frac{4}{4}=1$ whole.',
        'There are 2 complete groups of 4, using 8 fourths, with 1 fourth left over.',
        'So $\\frac{9}{4}=2\\frac{1}{4}$: two wholes and one quarter.',
      ],
      conclusion: 'The source compares this to 9 pieces when each cake is cut into 4 equal pieces: that is 2 full cakes and one quarter of another.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'If the numerator is equal to or greater than the denominator, expect a value of at least 1. When the numerator is larger, divide it by the denominator to identify whole groups and a remainder.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: '“Improper” does not mean the fraction is invalid. It is another way to write a value that may contain one or more wholes.',
    },
  ),
  explainedPage(
    9,
    'Mixed fractions',
    'A mixed fraction combines a whole number with a proper fraction. Convert it to an improper fraction by multiplying the whole number by the denominator, then adding the numerator.',
    {
      type: 'recognition',
      title: 'Read the notation',
      markdown: 'The slide’s mixed number is $2\\frac{1}{2}$: it means 2 whole units plus $\\frac{1}{2}$ of another unit. The fractional part is proper because $1<2$.',
    },
    {
      type: 'worked-example',
      title: 'Convert $2\\frac{1}{2}$ to an improper fraction',
      steps: [
        'Each whole contains 2 halves, so 2 wholes contain $2\\times2=4$ halves.',
        'Add the extra half shown by the numerator: $4+1=5$ halves.',
        'Keep the same denominator, 2: $2\\frac{1}{2}=\\frac{5}{2}$.',
      ],
      conclusion: 'The cake analogy means 2 full cakes plus half of another cake.',
    },
    {
      type: 'formula',
      label: 'Mixed number to improper fraction',
      latex: String.raw`w\frac{n}{d}=\frac{wd+n}{d}`,
      explanation: 'Here $w$ is the whole-number part, $n$ the fractional numerator, and $d$ the denominator. This works by counting how many denominator-sized parts are in the wholes, then adding the remaining $n$ parts.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not multiply the whole number by the numerator. For $2\\frac{1}{2}$, calculate $2\\times2+1=5$ over the original denominator 2.',
    },
  ),
  explainedPage(
    10,
    'Like and unlike fractions',
    'Like fractions have the same denominator; unlike fractions have different denominators. Addition and subtraction need a common denominator first when the denominators differ.',
    {
      type: 'recognition',
      title: 'Decode the examples',
      markdown: 'The denominator tells the size of each part. The examples $\\frac{3}{8},\\frac{5}{8},\\frac{7}{8}$ are like fractions because each part is an eighth. The examples $\\frac{2}{3}$ and $\\frac{4}{5}$ are unlike fractions because thirds and fifths are different-sized parts.',
    },
    {
      type: 'foundation',
      title: 'Why a common denominator helps',
      markdown: 'You can add or subtract counts directly when the units have the same size. For example, 3 eighths plus 2 eighths is 5 eighths. With thirds and fifths, first rewrite both using equal-sized parts, as shown later in the lecture.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Check the denominators first. Same denominator: the fractional units match. Different denominators: find a common denominator before adding or subtracting.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not add or subtract unlike denominators by combining the top and bottom numbers separately. The pieces must be the same size before their counts can be combined.',
    },
  ),
  explainedPage(
    11,
    'Equivalent fractions',
    'Equivalent fractions look different but have the same value. Multiply or divide the numerator and denominator by the same nonzero number to keep the value unchanged.',
    {
      type: 'recognition',
      title: 'Read the examples',
      markdown: 'The slide lists $\\frac{1}{2}$, $\\frac{2}{4}$, and $\\frac{4}{8}$. All represent one half: the numerator is half of the denominator in each case.',
    },
    {
      type: 'formula',
      label: 'Equivalent-fraction rule',
      latex: String.raw`\frac{a}{b}=\frac{ka}{kb}\qquad (b\ne0,\ k\ne0)`,
      explanation: 'Multiplying the numerator and denominator by the same nonzero number $k$ is multiplying by $\\frac{k}{k}=1$, so the value does not change. Dividing both by a shared nonzero factor also preserves the value.',
    },
    {
      type: 'worked-example',
      title: 'Scale one half into fourths and eighths',
      steps: [
        'Start with $\\frac{1}{2}$. Multiply top and bottom by 2: $\\frac{1\\times2}{2\\times2}=\\frac{2}{4}$.',
        'From $\\frac{2}{4}$, multiply top and bottom by 2 again: $\\frac{2\\times2}{4\\times2}=\\frac{4}{8}$.',
        'The written numbers changed, but each fraction still represents the same half of a whole.',
      ],
      conclusion: 'The slide describes this as scaling the numerator and denominator together.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not change only the numerator or only the denominator. For example, $\\frac{1}{2}$ is not equal to $\\frac{2}{2}$; both parts must be scaled together.',
    },
  ),
  explainedPage(
    12,
    'Unit fractions',
    'A unit fraction has numerator 1 and a positive integer denominator. It represents one of the equal parts that make a whole.',
    {
      type: 'recognition',
      title: 'Decode the form and examples',
      markdown: 'The slide writes the form as $\\frac{1}{n}$, where $n$ is a natural number with $n>0$. Examples are $\\frac{1}{2}$ (one half), $\\frac{1}{3}$ (one third), and $\\frac{1}{6}$ (one sixth).',
    },
    {
      type: 'worked-example',
      title: 'Write $\\frac{3}{4}$ as a sum of unit fractions',
      steps: [
        'The denominator 4 means the counted pieces are fourths.',
        'The numerator 3 means there are three such pieces.',
        'Write one $\\frac{1}{4}$ for each piece: $\\frac{3}{4}=\\frac{1}{4}+\\frac{1}{4}+\\frac{1}{4}$.',
      ],
      conclusion: 'This is the slide’s example: any fraction can be expressed as a sum of unit fractions by repeating its unit part as many times as its numerator.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'A unit fraction has numerator 1. $\\frac{3}{4}$ is not itself a unit fraction, even though it can be written as a sum of three unit fractions.',
    },
  ),
  dividerPage(13, 'Comparing Fractions', 'A section divider. The comparison rules begin on page 14.'),
  explainedPage(
    14,
    'Compare like fractions',
    'When two positive fractions have the same denominator, compare their numerators; the larger numerator gives the larger fraction.',
    {
      type: 'recognition',
      title: 'Why comparing the numerators works',
      markdown: 'Both fractions use the same-sized pieces because their denominators are both 9. The only difference is how many ninths are counted.',
    },
    {
      type: 'worked-example',
      title: 'Compare $\\frac{5}{9}$ and $\\frac{3}{9}$',
      givens: String.raw`\frac{5}{9}\quad\text{and}\quad\frac{3}{9}`,
      steps: [
        'The denominators match: both are 9, so both fractions count ninths.',
        'Compare the numerators: $5>3$.',
        'Therefore $\\frac{5}{9}>\\frac{3}{9}$.',
      ],
      conclusion: 'This is the like-fraction rule shown on the slide.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Same positive denominator? Keep the denominator fixed and compare the top numbers.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'This shortcut depends on the denominators being the same. If they differ, the numerator alone is not enough; use a common denominator or compare by cross multiplication.',
    },
  ),
  explainedPage(
    15,
    'Compare unlike fractions using the LCD',
    'For unlike fractions, rewrite both with the least common denominator (LCD). Then compare their numerators.',
    {
      type: 'recognition',
      title: 'What LCD means',
      markdown: 'The **least common denominator** is the smallest positive common multiple of the denominators. It gives both fractions the same-sized parts while keeping their values equivalent.',
    },
    {
      type: 'worked-example',
      title: 'Compare $\\frac{2}{5}$ and $\\frac{3}{7}$',
      givens: String.raw`\frac{2}{5}\quad\text{and}\quad\frac{3}{7}`,
      steps: [
        'Find a common denominator: multiples of 5 include 5, 10, 15, 20, 25, 30, 35; multiples of 7 include 7, 14, 21, 28, 35. The least common one is 35.',
        'Convert $\\frac{2}{5}$ to denominator 35 by multiplying top and bottom by 7: $\\frac{2}{5}=\\frac{14}{35}$.',
        'Convert $\\frac{3}{7}$ to denominator 35 by multiplying top and bottom by 5: $\\frac{3}{7}=\\frac{15}{35}$.',
        'Now compare equal-sized parts: $14<15$, so $\\frac{14}{35}<\\frac{15}{35}$.',
        'Therefore $\\frac{2}{5}<\\frac{3}{7}$.',
      ],
      conclusion: 'This matches the source slide’s result.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'Different denominators? Find an LCD, make equivalent fractions, then compare the top numbers.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'When changing a denominator, multiply the numerator by the same factor. Changing only the denominator changes the fraction’s value.',
    },
  ),
  explainedPage(
    16,
    'Compare fractions by cross multiplication',
    'For positive denominators, cross multiply and compare the products. Here $\\frac{4}{9}<\\frac{5}{11}$ because $4\\times11=44$ is less than $5\\times9=45$.',
    {
      type: 'recognition',
      title: 'Set up the comparison',
      markdown: 'To compare $\\frac{a}{b}$ with $\\frac{c}{d}$ when $b$ and $d$ are positive, compare $a\\times d$ with $c\\times b$. The multiplication uses each numerator with the other fraction’s denominator.',
    },
    {
      type: 'worked-example',
      title: 'Compare $\\frac{4}{9}$ and $\\frac{5}{11}$',
      givens: String.raw`\frac{4}{9}\quad\text{and}\quad\frac{5}{11}`,
      steps: [
        'Cross multiply: $4\\times11=44$.',
        'The other product is $5\\times9=45$.',
        'Compare: $44<45$.',
        'So $\\frac{4}{9}<\\frac{5}{11}$.',
      ],
      conclusion: 'The result agrees with the source slide.',
    },
    {
      type: 'why',
      title: 'Why the comparison works',
      markdown: 'With positive denominators, both fractions can be compared after multiplying by the positive number $9\\times11$. The cross-products preserve their order, which is why the larger cross-product belongs to the larger fraction.',
    },
    {
      type: 'foundation',
      title: 'Same-numerator note from the slide',
      markdown: 'If two positive fractions have the same numerator, the one with the smaller denominator is greater: its numerator is divided into fewer, larger-sized parts. For example, $\\frac{3}{4}>\\frac{3}{5}$. This example illustrates the note on the slide.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not compare $4$ with $5$ alone or compare $9$ with $11$ alone. Cross multiplication combines the numerator of one fraction with the denominator of the other.',
    },
  ),
  dividerPage(17, 'Operations with Fractions', 'A section divider. Fraction addition starts on page 18.'),
  explainedPage(
    18,
    'Add fractions',
    'For like fractions, add the numerators and keep the denominator. For unlike fractions, first rewrite both fractions with a common denominator.',
    {
      type: 'worked-example',
      title: 'Like fractions: $\\frac{2}{7}+\\frac{3}{7}$',
      givens: String.raw`\frac{2}{7}+\frac{3}{7}`,
      steps: [
        'Both fractions count sevenths, so the parts are the same size.',
        'Add the counts: $2+3=5$.',
        'Keep the denominator 7: $\\frac{2}{7}+\\frac{3}{7}=\\frac{5}{7}$.',
      ],
      conclusion: 'The result is five sevenths, as shown on the slide.',
    },
    {
      type: 'worked-example',
      title: 'Unlike fractions: $\\frac{2}{3}+\\frac{5}{6}$',
      givens: String.raw`\frac{2}{3}+\frac{5}{6}`,
      steps: [
        'The denominators differ, so find a common denominator. The least common denominator of 3 and 6 is 6.',
        'Rewrite $\\frac{2}{3}$ in sixths by multiplying top and bottom by 2: $\\frac{2}{3}=\\frac{4}{6}$. Keep $\\frac{5}{6}$ as it is.',
        'Add the numerators and keep denominator 6: $\\frac{4}{6}+\\frac{5}{6}=\\frac{9}{6}$.',
        'Supplemental simplification: divide top and bottom by 3 to get $\\frac{9}{6}=\\frac{3}{2}=1\\frac{1}{2}$.',
      ],
      conclusion: 'The source stops at $\\frac{9}{6}$; the final equal forms are added to show that the result can be simplified.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: 'For addition, check denominators first. If equal, add the top numbers; if different, make equivalent fractions with a common denominator first.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not add the denominators. The denominator describes the size of each part; once the parts match, only their counts are added.',
    },
  ),
  explainedPage(
    19,
    'Subtract fractions',
    'Subtraction follows the same denominator rule as addition: match unlike denominators first, then subtract the numerators.',
    {
      type: 'worked-example',
      title: 'Like fractions: $\\frac{7}{9}-\\frac{2}{9}$',
      givens: String.raw`\frac{7}{9}-\frac{2}{9}`,
      steps: [
        'Both fractions count ninths, so the parts match.',
        'Subtract the counts: $7-2=5$.',
        'Keep denominator 9: $\\frac{7}{9}-\\frac{2}{9}=\\frac{5}{9}$.',
      ],
      conclusion: 'This is the like-fraction subtraction shown on the slide.',
    },
    {
      type: 'worked-example',
      title: 'Unlike fractions: $\\frac{5}{6}-\\frac{1}{4}$',
      givens: String.raw`\frac{5}{6}-\frac{1}{4}`,
      steps: [
        'The denominators 6 and 4 differ. Their least common denominator is 12.',
        'Convert $\\frac{5}{6}$ to twelfths: multiply top and bottom by 2, giving $\\frac{10}{12}$.',
        'Convert $\\frac{1}{4}$ to twelfths: multiply top and bottom by 3, giving $\\frac{3}{12}$.',
        'Subtract the numerators and keep denominator 12: $\\frac{10}{12}-\\frac{3}{12}=\\frac{7}{12}$.',
      ],
      conclusion: 'The slide’s answer is $\\frac{7}{12}$.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not subtract the denominators. Match the part sizes first, then subtract how many parts are counted.',
    },
  ),
  explainedPage(
    20,
    'Multiply fractions',
    'To multiply fractions, multiply the numerators together and the denominators together, then simplify if possible.',
    {
      type: 'recognition',
      title: 'Read the rule',
      markdown: 'For $\\frac{a}{b}\\times\\frac{c}{d}$, the new numerator is $a\\times c$ and the new denominator is $b\\times d$ (with nonzero denominators). Unlike addition, multiplication does not need a common denominator first.',
    },
    {
      type: 'worked-example',
      title: 'Multiply $\\frac{3}{5}\\times\\frac{4}{7}$',
      givens: String.raw`\frac{3}{5}\times\frac{4}{7}`,
      steps: [
        'Multiply the numerators: $3\\times4=12$.',
        'Multiply the denominators: $5\\times7=35$.',
        'Combine them: $\\frac{3}{5}\\times\\frac{4}{7}=\\frac{12}{35}$.',
        'Check whether 12 and 35 share a common factor greater than 1. They do not, so $\\frac{12}{35}$ is already simplified.',
      ],
      conclusion: 'This matches the source slide’s product.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not add across the numerators or denominators. For multiplication, multiply top by top and bottom by bottom.',
    },
  ),
  explainedPage(
    21,
    'Divide fractions — Keep, Change, Flip',
    'To divide by a nonzero fraction, keep the first fraction, change division to multiplication, and flip the second fraction to its reciprocal.',
    {
      type: 'recognition',
      title: 'Decode “reciprocal”',
      markdown: 'The reciprocal of $\\frac{a}{b}$ is $\\frac{b}{a}$, so the numerator and denominator switch places. A fraction has a reciprocal only when it is nonzero.',
    },
    {
      type: 'worked-example',
      title: 'Calculate $\\frac{5}{6}\\div\\frac{2}{3}$',
      givens: String.raw`\frac{5}{6}\div\frac{2}{3}`,
      steps: [
        'Keep the first fraction: $\\frac{5}{6}$.',
        'Change division to multiplication: $\\frac{5}{6}\\times$.',
        'Flip the second fraction: the reciprocal of $\\frac{2}{3}$ is $\\frac{3}{2}$.',
        'Multiply: $\\frac{5}{6}\\times\\frac{3}{2}=\\frac{5\\times3}{6\\times2}=\\frac{15}{12}$.',
        'Simplify by dividing top and bottom by 3: $\\frac{15}{12}=\\frac{5}{4}$.',
        'Supplemental mixed-number form: $\\frac{5}{4}=1\\frac{1}{4}$.',
      ],
      conclusion: 'The slide’s final simplified answer is $\\frac{5}{4}$.',
    },
    {
      type: 'why',
      title: 'Why the flip is used',
      markdown: 'Dividing by a number asks how many groups of that size fit. Multiplying by its reciprocal gives the same result; for instance, dividing by $\\frac{2}{3}$ is multiplying by $\\frac{3}{2}$.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Flip only the second fraction, the one after the division sign. Keep the first fraction unchanged, and do not leave the division sign in place after changing to multiplication.',
    },
    {
      type: 'foundation',
      title: 'Quick reusable summary',
      markdown: '- **Classify:** compare numerator and denominator for proper or improper; a mixed number has a whole part plus a proper fraction.  \n- **Compare:** same denominator → compare numerators; different denominators → use an LCD or cross multiplication.  \n- **Add/subtract:** match denominators first, then combine numerators.  \n- **Multiply:** numerator by numerator and denominator by denominator.  \n- **Divide:** keep, change, flip the second fraction.  \nFor every operation, keep track of what the numerator counts and what the denominator means.',
    },
  ),
  {
    sourcePage: 22,
    title: 'Thank you for watching — closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'Closing slide with EELU branding and “Thank you for watching / Questions?” It introduces no additional mathematics.',
  },
];

export const mathematics0Lecture3Lesson: Lesson = {
  id: 'mathematics-0-lecture-3-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 3.pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 3.pdf',
  title: 'Lecture 3: Fractions — Types, Comparison, and Operations (2025–2026 archive)',
  sourcePageCount: 22,
  pages,
  lastReviewed: '2026-10-14',
};
