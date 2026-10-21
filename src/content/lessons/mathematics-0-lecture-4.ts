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
    title: 'Mathematics (0) - archived lecture cover',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'The cover identifies Mathematics (0), Fall Semester 2025-2026, and Dr. Amany Magdy, Dr. Adel Mourad, and Dr. Mohamed Ghaleb. This lesson is based on that archived version. Use it as a provisional reference and follow the current Moodle file if the instructor later uploads a different version.',
      },
    ],
  },
  dividerPage(2, 'Revision', 'A section divider only. The review topic begins on page 3.'),
  dividerPage(3, 'Multiples vs. Factors', 'A topic heading. The definitions and examples begin on page 4.'),
  explainedPage(
    4,
    'Multiples and factors',
    'A multiple is made by multiplying a number; a factor divides a number exactly. To tell them apart, ask whether you are building a number by multiplication or breaking it into exact divisors.',
    {
      type: 'foundation',
      title: 'How this lecture connects',
      markdown: 'This lecture first reviews multiples and factors. Multiples help find the LCD so unlike fractions can use matching denominator units; factors help find the GCF so fractions can be simplified. The final pages practise these ideas and convert between improper fractions and mixed numbers.',
    },
    {
      type: 'foundation',
      title: 'Decode the two ideas',
      markdown: '**Multiple:** choose a number such as 3 and multiply it by positive whole-number multipliers: $3\\times1=3$, $3\\times2=6$, $3\\times3=9$, and so on. These results are multiples of 3. The dots mean the list continues.\n\n**Factor:** a factor of 12 is a positive whole number that divides 12 with no remainder. For example, $12\\div3=4$ exactly, so 3 is a factor of 12.',
    },
    {
      type: 'worked-example',
      title: 'Read the slide’s examples',
      steps: [
        'Multiples of 3: start at 3 and keep adding 3, or multiply 3 by 1, 2, 3, 4, and so on: $3,6,9,12,15,18,\\ldots$.',
        'Factors of 12: test the positive whole numbers that divide 12 evenly: $12\\div1=12$, $12\\div2=6$, $12\\div3=4$, and $12\\div4=3$. The complete positive factor list is $1,2,3,4,6,12$.',
        'The number 5 is not a factor of 12 because dividing 12 by 5 leaves a remainder. The number 12 is a factor because $12\\div12=1$.',
      ],
      conclusion: 'The list of positive multiples continues upward; the list of positive factors of a fixed number is finite and includes 1 and the number itself.',
    },
    {
      type: 'recognition',
      title: 'If you see this, think…',
      markdown: '“Multiples of 3” means calculate $3\\times1,3\\times2,3\\times3,\\ldots$. “Factors of 12” means find numbers that divide 12 with no remainder.',
    },
    {
      type: 'trap',
      title: 'Common mix-up',
      markdown: 'A factor divides the target number; a multiple is the result of multiplying the starting number. For example, 3 is a factor of 12, while 12 is a multiple of 3.',
    },
  ),
  explainedPage(
    5,
    'Find the least common denominator (LCD)',
    'The LCD is the smallest positive number that is a multiple of every denominator. List multiples and stop at the first shared value; multiply the denominators directly only when they share no factor greater than 1.',
    {
      type: 'foundation',
      title: 'What the words mean',
      markdown: 'A **common multiple** is a number that appears in every denominator’s multiple list. The **least** common multiple is the smallest such number. When the denominators are used under fractions, that least common multiple is called the least common denominator (LCD). It gives fractions the same-sized denominator units.',
    },
    {
      type: 'worked-example',
      title: 'Find the LCD of 3 and 4 by listing multiples',
      steps: [
        'List multiples of 3: $3,6,9,12,15,\\ldots$.',
        'List multiples of 4: $4,8,12,16,\\ldots$.',
        'The first number that appears in both lists is 12. Earlier entries do not match, so 12 is the least common multiple and the LCD.',
      ],
      conclusion: 'For denominators 3 and 4, LCD = 12.',
    },
    {
      type: 'worked-example',
      title: 'Use the shortcut for 2 and 5',
      steps: [
        'The only positive factor shared by 2 and 5 is 1; neither denominator has a shared factor greater than 1.',
        'Multiply them: $2\\times5=10$.',
        'The multiples of 2 and 5 first meet at 10, so LCD = 10.',
      ],
      conclusion: 'The slide’s shortcut works here because the denominators have no common factor greater than 1.',
    },
    {
      type: 'trap',
      title: 'When not to use the shortcut',
      markdown: 'Do not automatically multiply denominators when they share a factor. For 6 and 4, the product is 24, but 12 is already a common multiple and is smaller, so the LCD is 12. Listing multiples always works.',
    },
  ),
  explainedPage(
    6,
    'Find the greatest common factor (GCF) by listing',
    'The GCF is the largest positive factor shared by all the numbers. List each number’s factors, keep the ones that appear in every list, and choose the largest.',
    {
      type: 'worked-example',
      title: 'Find GCF(12, 18)',
      steps: [
        'List the positive factors of 12: $1,2,3,4,6,12$.',
        'List the positive factors of 18: $1,2,3,6,9,18$.',
        'The factors present in both lists are $1,2,3,6$. These are the common factors.',
        'The greatest (largest) common factor is 6, so $\\operatorname{GCF}(12,18)=6$.',
      ],
      conclusion: 'You can check: $12\\div6=2$ and $18\\div6=3$, both with no remainder.',
    },
    {
      type: 'recognition',
      title: 'If you see “greatest common factor”…',
      markdown: '“Common” means it divides every number in the question exactly. “Greatest” means choose the largest shared divisor, not just any shared divisor.',
    },
    {
      type: 'trap',
      title: 'Common trap',
      markdown: 'A number can be a common factor without being the GCF. For 12 and 18, 2 and 3 are common factors, but 6 is the greatest one.',
    },
  ),
  explainedPage(
    7,
    'Find the GCF by common division',
    'Repeatedly divide both numbers by a shared factor, then multiply the shared divisors. For 24 and 36, the common divisors used are 2, 3, and 2, so the GCF is $2\\times3\\times2=12$.',
    {
      type: 'foundation',
      title: 'What the method is doing',
      markdown: 'Each exact division removes one factor that belongs to both numbers. The product of all removed common factors is the common part they share. Stop when the remaining pair has no common factor greater than 1.',
    },
    {
      type: 'worked-example',
      title: 'Follow the slide’s divisions for 24 and 36',
      givens: String.raw`24\quad\text{and}\quad36`,
      steps: [
        'Both numbers are even, so divide each by 2: $24\\div2=12$ and $36\\div2=18$. Save this common divisor, 2.',
        'Both remaining numbers, 12 and 18, are divisible by 3: $12\\div3=4$ and $18\\div3=6$. Save 3.',
        'Both remaining numbers, 4 and 6, are divisible by 2: $4\\div2=2$ and $6\\div2=3$. Save 2.',
        'The final pair is 2 and 3. They have no common factor greater than 1, so stop.',
        'Multiply the saved divisors: $2\\times3\\times2=12$.',
      ],
      conclusion: 'Therefore, $\\operatorname{GCF}(24,36)=12$. Check: $24\\div12=2$ and $36\\div12=3$.',
    },
    {
      type: 'trap',
      title: 'Do not add the divisors',
      markdown: 'The saved factors build the shared factor by multiplication, not addition. Here $2+3+2=7$ is unrelated to the GCF; the correct product is 12.',
    },
  ),
  explainedPage(
    8,
    'Find the GCF by prime factorization',
    'Write both numbers as products of primes, then multiply the prime factors they share, counting repeats only as many times as both numbers contain them.',
    {
      type: 'foundation',
      title: 'What is a prime factorization?',
      markdown: 'A **prime number** is a whole number greater than 1 with exactly two positive factors: 1 and itself. Prime factorization rewrites a number as multiplication using only primes. The factor 2 is repeated in 12 because $2\\times2$ is part of its product.',
    },
    {
      type: 'worked-example',
      title: 'Find GCF(12, 18)',
      steps: [
        'Factor 12: $12=2\\times2\\times3$. Every factor shown is prime.',
        'Factor 18: $18=2\\times3\\times3$.',
        'Match prime factors across the two lists: both contain one 2 and one 3.',
        'Multiply the matched factors: $2\\times3=6$.',
      ],
      conclusion: 'So $\\operatorname{GCF}(12,18)=6$. The extra 2 in the factorization of 12 and extra 3 in 18 are not shared, so they are not included.',
    },
    {
      type: 'recognition',
      title: 'How to count repeated primes',
      markdown: 'For each prime, use the smaller repeat-count from the two factorizations. Here 12 has two 2s and one 3; 18 has one 2 and two 3s. The shared part is one 2 and one 3.',
    },
    {
      type: 'trap',
      title: 'Common trap',
      markdown: 'Do not include every prime from either number. Include only the prime factors that can be paired between both numbers.',
    },
  ),
  dividerPage(9, 'Simplify Fractions', 'A section divider only. The simplifying rule and example begin on page 10.'),
  explainedPage(
    10,
    'Simplify a fraction using the GCF',
    'Divide the numerator and denominator by the same greatest common factor. The fraction’s value stays the same, and the result is in simplest form.',
    {
      type: 'foundation',
      title: 'Numerator and denominator',
      markdown: 'In $\\frac{18}{24}$, the **numerator** 18 is the top number and the **denominator** 24 is the bottom number. Dividing both by the same nonzero number scales each count equally, so the ratio stays the same. Here both are divided by 6.',
    },
    {
      type: 'worked-example',
      title: 'Simplify $\\frac{18}{24}$',
      givens: String.raw`\frac{18}{24}`,
      steps: [
        'Find the GCF of 18 and 24. Their greatest shared factor is 6.',
        'Divide the numerator by 6: $18\\div6=3$.',
        'Divide the denominator by the same 6: $24\\div6=4$.',
        'Write the results as a fraction: $\\frac{18}{24}=\\frac{3}{4}$.',
        'Check that 3 and 4 share no factor greater than 1, so the fraction cannot be reduced further.',
      ],
      conclusion: 'The simplified fraction is $\\frac{3}{4}$.',
    },
    {
      type: 'why',
      title: 'Why the value does not change',
      markdown: 'Here $18=6\\times3$ and $24=6\\times4$. Both counts contain the same group size, 6. Remove that shared group from each count: the comparison is 3 groups to 4 groups, so the ratio is still $\\frac{3}{4}$. This is why we divide both parts by the same GCF.',
    },
    {
      type: 'trap',
      title: 'Common trap',
      markdown: 'Use the same divisor on the top and bottom. Dividing only one of them changes the value instead of simplifying the same fraction.',
    },
  ),
  dividerPage(11, 'Improper Fractions and Mixed Numbers', 'A section heading only. The conversion rules begin on page 12.'),
  explainedPage(
    12,
    'Convert an improper fraction to a mixed number',
    'Divide the numerator by the denominator: the quotient counts whole groups, the remainder counts leftover denominator-sized parts, and the denominator stays the same.',
    {
      type: 'foundation',
      title: 'Decode quotient and remainder',
      markdown: 'An **improper fraction** has a numerator at least as large as its denominator. A **mixed number** writes the same amount as a whole number plus a proper fraction. In a division statement, the **quotient** is the number of complete groups and the **remainder** is what is left after those groups.',
    },
    {
      type: 'worked-example',
      title: 'Convert $\\frac{11}{4}$',
      givens: String.raw`11\div4`,
      steps: [
        'Divide 11 by 4. Two groups of 4 fit, because $4\\times2=8$.',
        'Subtract the 8 used: $11-8=3$. So the quotient is 2 and the remainder is 3: $11=4\\times2+3$.',
        'The quotient 2 becomes the whole-number part. The remainder 3 becomes the new numerator.',
        'Keep denominator 4 because the original pieces are fourths: $\\frac{11}{4}=2\\frac{3}{4}$.',
      ],
      conclusion: 'The remainder 3 is smaller than 4, so $\\frac{3}{4}$ is a proper fractional part.',
    },
    {
      type: 'recognition',
      title: 'If you see an improper fraction…',
      markdown: 'Divide top by bottom. Write the whole-number quotient first, then put the remainder over the original denominator. If the remainder is 0, the fraction is a whole number.',
    },
    {
      type: 'trap',
      title: 'Common trap',
      markdown: 'Do not use the quotient as the new numerator. In $11\\div4$, the quotient is 2 and the remainder is 3, so the mixed number is $2\\frac{3}{4}$, not $3\\frac{2}{4}$.',
    },
  ),
  explainedPage(
    13,
    'Convert a mixed number to an improper fraction',
    'Multiply the whole number by the denominator, add the numerator, and put that total over the original denominator. This counts all the fractional pieces, including those inside the whole units.',
    {
      type: 'worked-example',
      title: 'Convert $2\\frac{3}{4}$',
      givens: String.raw`2\frac{3}{4}`,
      steps: [
        'The denominator 4 means each whole is split into fourths. One whole contains 4 fourths.',
        'Two wholes contain $2\\times4=8$ fourths.',
        'The fraction part adds 3 more fourths: $8+3=11$ fourths.',
        'Keep the denominator 4, so $2\\frac{3}{4}=\\frac{11}{4}$.',
      ],
      conclusion: 'The slide’s calculation is $2\\times4+3=8+3=11$, giving $\\frac{11}{4}$.',
    },
    {
      type: 'formula',
      label: 'Mixed number to improper fraction',
      latex: String.raw`w\frac{n}{d}=\frac{wd+n}{d}`,
      explanation: 'Here $w$ is the whole-number part, $n$ is the fractional numerator, and $d$ is the denominator. Multiply $w$ by $d$ to count the denominator-sized pieces in all the wholes, add the extra $n$ pieces, and keep the same denominator.',
    },
    {
      type: 'trap',
      title: 'Common trap',
      markdown: 'Do not multiply the whole number by the numerator. For $2\\frac{3}{4}$, the correct count is $2\\times4+3=11$, not $2\\times3+4$.',
    },
  ),
  explainedPage(
    14,
    'Practice: equivalent, proper, and improper fractions; LCD',
    'For each question, identify what it is testing before choosing a method: equal value, numerator-versus-denominator size, fraction type, or a smallest shared denominator.',
    {
      type: 'foundation',
      title: 'The four questions on this page',
      markdown: 'This page presents Examples 1-4 without marked answers. The next source page highlights the selected choices. Try each one first, then use the explanations on page 15 to check the reasoning.',
    },
    {
      type: 'worked-example',
      title: 'Example 1: which fraction equals $\\frac{2}{3}$?',
      steps: [
        'Equivalent fractions have the same value. Multiply both numerator and denominator of $\\frac{2}{3}$ by 2: $\\frac{2\\times2}{3\\times2}=\\frac{4}{6}$.',
        'Choice B, $\\frac{4}{6}$, is equivalent. Choice A is $\\frac{3}{4}$; choice C, $\\frac{6}{8}$, simplifies to $\\frac{3}{4}$; choice D is $\\frac{3}{5}$. None of those equals $\\frac{2}{3}$.',
      ],
      conclusion: 'The answer marked on page 15 is B.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: identify a proper fraction',
      steps: [
        'A proper fraction has a positive numerator smaller than its denominator, so its value is less than 1.',
        '$\\frac{5}{3}$ and $\\frac{10}{5}$ have numerators larger than denominators; they are improper. $\\frac{8}{8}=1$, so it is not proper.',
        'In $\\frac{7}{9}$, $7<9$, so it is proper.',
      ],
      conclusion: 'The answer marked on page 15 is C, $\\frac{7}{9}$.',
    },
    {
      type: 'worked-example',
      title: 'Example 3: classify $\\frac{15}{5}$',
      steps: [
        'Compare the numerator and denominator: $15>5$, so the fraction is improper by the lecture’s definition.',
        'It also equals 3 because $15\\div5=3$. Its value being a whole number does not change the fraction-type label asked for here.',
        'It is not proper (the top is not smaller), not a mixed number (there is no separate whole-number part written), and not a unit fraction (its numerator is not 1).',
      ],
      conclusion: 'The answer marked on page 15 is D, improper fraction.',
    },
    {
      type: 'worked-example',
      title: 'Example 4: find the LCD of 6 and 4',
      steps: [
        'List multiples of 6: $6,12,18,24,\\ldots$.',
        'List multiples of 4: $4,8,12,16,\\ldots$.',
        'The smallest common value is 12.',
      ],
      conclusion: 'The answer marked on page 15 is A, 12.',
    },
    {
      type: 'recognition',
      title: 'Quick recognition cues',
      markdown: '“Equivalent” means preserve the value by scaling top and bottom together. “Proper” means top < bottom. “What type?” asks for the numerator-denominator classification even if the fraction simplifies to a whole number. “LCD” asks for the first common multiple of the denominators.',
    },
  ),
  explainedPage(
    15,
    'Answer key: Examples 1-4',
    'The green highlights show B, C, D, and A for Examples 1 through 4. The reasoning is: matching value, top smaller than bottom, top larger than bottom, and first common multiple.',
    {
      type: 'foundation',
      title: 'Reading the answer slide',
      markdown: 'The source repeats the four questions from page 14 and highlights one choice in green for each. The explanations below show why each highlighted answer fits and why the nearby distractors do not.',
    },
    {
      type: 'worked-example',
      title: 'Example 1 - answer B: $\\frac{4}{6}$',
      steps: [
        'Scale $\\frac{2}{3}$ by $\\frac{2}{2}$: $\\frac{2\\times2}{3\\times2}=\\frac{4}{6}$. Since $\\frac{2}{2}=1$, this change preserves the value.',
        '$\\frac{6}{8}$ reduces to $\\frac{3}{4}$, and choices $\\frac{3}{4}$ and $\\frac{3}{5}$ also differ from $\\frac{2}{3}$.',
      ],
      conclusion: 'The green answer is B.',
    },
    {
      type: 'worked-example',
      title: 'Example 2 - answer C: $\\frac{7}{9}$',
      steps: [
        'Only $\\frac{7}{9}$ has a smaller numerator than denominator.',
        '$\\frac{8}{8}=1$ is not less than 1. The other two fractions are greater than 1.',
      ],
      conclusion: 'The green answer is C.',
    },
    {
      type: 'worked-example',
      title: 'Example 3 - answer D: improper fraction',
      steps: [
        'Because $15>5$, the written fraction is improper.',
        'Although its value simplifies to 3, the question asks what type the original fraction is.',
      ],
      conclusion: 'The green answer is D.',
    },
    {
      type: 'worked-example',
      title: 'Example 4 - answer A: LCD 12',
      steps: [
        'A common denominator must be divisible by both 6 and 4.',
        '12 is divisible by both: $12\\div6=2$ and $12\\div4=3$. No smaller positive number is in both multiple lists.',
      ],
      conclusion: 'The green answer is A, 12.',
    },
  ),
  explainedPage(
    16,
    'Practice: GCF, simplification, whole numbers, and unit fractions',
    'These four questions use the same tools from the earlier pages: shared factors, reducing by a GCF, checking whether a fraction is an integer, and recognizing numerator 1.',
    {
      type: 'foundation',
      title: 'The four questions on this page',
      markdown: 'This is the unmarked question slide for Examples 5-8. The following page highlights the selected answers. Work through the factor or fraction meaning before looking at that key.',
    },
    {
      type: 'worked-example',
      title: 'Example 5: find GCF(16, 20)',
      steps: [
        'Factors of 16: $1,2,4,8,16$. Factors of 20: $1,2,4,5,10,20$.',
        'The shared factors are $1,2,4$. The greatest is 4.',
      ],
      conclusion: 'The answer marked on page 17 is B, 4.',
    },
    {
      type: 'worked-example',
      title: 'Example 6: simplify $\\frac{9}{12}$',
      steps: [
        'The GCF of 9 and 12 is 3.',
        'Divide top and bottom by 3: $\\frac{9}{12}=\\frac{9\\div3}{12\\div3}=\\frac{3}{4}$.',
      ],
      conclusion: 'The answer marked on page 17 is A, $\\frac{3}{4}$.',
    },
    {
      type: 'worked-example',
      title: 'Example 7: choose the fraction that represents a whole number',
      steps: [
        '$\\frac{3}{2}=1\\frac{1}{2}$ is not a whole number.',
        '$\\frac{5}{6}$ and $\\frac{7}{9}$ are not whole numbers because their divisions leave nonzero fractional parts.',
        '$\\frac{8}{4}=2$ exactly, and 2 is a whole number.',
      ],
      conclusion: 'The answer marked on page 17 is C, $\\frac{8}{4}$.',
    },
    {
      type: 'worked-example',
      title: 'Example 8: name a fraction with numerator 1',
      steps: [
        'A numerator is the top number in a fraction.',
        'A fraction with numerator 1 is called a unit fraction, such as $\\frac{1}{2}$ or $\\frac{1}{7}$.',
      ],
      conclusion: 'The answer marked on page 17 is B, unit fraction.',
    },
    {
      type: 'recognition',
      title: 'Quick recognition cues',
      markdown: 'For a GCF, list shared divisors and take the largest. To simplify, divide both parts by the same GCF. To test for a whole number, divide and check for no remainder. “Unit fraction” signals a numerator of 1.',
    },
  ),
  explainedPage(
    17,
    'Answer key: Examples 5-8',
    'The green highlights show B, A, C, and B for Examples 5 through 8: GCF 4, simplified form $\\frac{3}{4}$, whole-number value 2, and unit fraction.',
    {
      type: 'foundation',
      title: 'Check each green selection',
      markdown: 'This page repeats the questions from page 16 and displays their highlighted answers. Use the checks below to connect each answer to the definition or calculation that supports it.',
    },
    {
      type: 'worked-example',
      title: 'Example 5 - answer B: 4',
      steps: [
        '4 divides 16 and 20 exactly: $16\\div4=4$ and $20\\div4=5$.',
        '8 divides 16 but not 20, and 6 does not divide both. Thus 4 is the largest shared factor among the choices.',
      ],
      conclusion: 'The green answer is B.',
    },
    {
      type: 'worked-example',
      title: 'Example 6 - answer A: $\\frac{3}{4}$',
      steps: [
        'Divide numerator and denominator by 3: $9\\div3=3$, $12\\div3=4$.',
        'So $\\frac{9}{12}=\\frac{3}{4}$. The other listed fractions do not result from dividing both parts by the same factor.',
      ],
      conclusion: 'The green answer is A.',
    },
    {
      type: 'worked-example',
      title: 'Example 7 - answer C: $\\frac{8}{4}$',
      steps: [
        '$8\\div4=2$ with no remainder, so $\\frac{8}{4}$ is exactly the whole number 2.',
        'The remaining options do not divide to whole numbers.',
      ],
      conclusion: 'The green answer is C.',
    },
    {
      type: 'worked-example',
      title: 'Example 8 - answer B: unit fraction',
      steps: [
        'The defining clue is that the numerator is 1.',
        'A proper fraction may have other numerators, so “proper” is not the specific name asked for.',
      ],
      conclusion: 'The green answer is B.',
    },
  ),
  explainedPage(
    18,
    'Practice: convert between improper fractions and mixed numbers',
    'To change an improper fraction into a mixed number, divide; to change a mixed number into an improper fraction, multiply the whole part by the denominator and add the numerator.',
    {
      type: 'foundation',
      title: 'The two questions on this page',
      markdown: 'This unmarked slide contains Examples 9 and 10. The next page shows the green answer selections. Both questions reverse the conversions explained on pages 12 and 13.',
    },
    {
      type: 'worked-example',
      title: 'Example 9: convert $\\frac{9}{2}$ to a mixed number',
      steps: [
        'Divide 9 by 2. Four groups fit because $2\\times4=8$.',
        'Subtract: $9-8=1$, so the remainder is 1.',
        'Use quotient 4 as the whole part, remainder 1 as the numerator, and keep denominator 2.',
      ],
      conclusion: '$\\frac{9}{2}=4\\frac{1}{2}$, choice A on page 19.',
    },
    {
      type: 'worked-example',
      title: 'Example 10: convert $1\\frac{2}{3}$ to an improper fraction',
      steps: [
        'The denominator 3 means each whole has 3 thirds. One whole is $\\frac{3}{3}$.',
        'Add the extra 2 thirds: $3+2=5$ thirds.',
        'Keep denominator 3, giving $1\\frac{2}{3}=\\frac{5}{3}$.',
      ],
      conclusion: 'The answer is choice B on page 19.',
    },
    {
      type: 'recognition',
      title: 'Recognition cue',
      markdown: 'An improper fraction to mixed number? Use quotient and remainder. A mixed number to improper fraction? Use whole $\\times$ denominator $+$ numerator, all over the same denominator.',
    },
  ),
  explainedPage(
    19,
    'Answer key: Examples 9-10',
    'The green highlights show A for $\\frac{9}{2}$ and B for $1\\frac{2}{3}$. The first is quotient-and-remainder division; the second counts all thirds.',
    {
      type: 'foundation',
      title: 'Check the two marked answers',
      markdown: 'This page repeats the conversion questions from page 18 and highlights the selected choices in green.',
    },
    {
      type: 'worked-example',
      title: 'Example 9 - answer A: $4\\frac{1}{2}$',
      steps: [
        'Since $9=2\\times4+1$, division gives quotient 4 and remainder 1.',
        'Write the quotient as the whole part and the remainder over the unchanged denominator: $\\frac{9}{2}=4\\frac{1}{2}$.',
      ],
      conclusion: 'The green answer is A.',
    },
    {
      type: 'worked-example',
      title: 'Example 10 - answer B: $\\frac{5}{3}$',
      steps: [
        'One whole is 3 thirds, so one whole plus 2 thirds is $3+2=5$ thirds.',
        'Write five thirds over the original denominator: $1\\frac{2}{3}=\\frac{5}{3}$.',
      ],
      conclusion: 'The green answer is B.',
    },
    {
      type: 'trap',
      title: 'Common conversion trap',
      markdown: 'Keep the denominator fixed during either conversion. In Example 10, do not add 1 and 2 to get a numerator of 3; the whole number first contributes three thirds, then the extra two thirds make five.',
    },
    {
      type: 'foundation',
      title: 'Quick re-use summary for this lecture',
      markdown: '- **Multiples:** build a list by multiplying; use them to find an LCD.  \n- **Factors:** exact divisors; use the greatest shared factor to simplify fractions.  \n- **Simplify:** divide the numerator and denominator by the same GCF.  \n- **Improper fraction to mixed number:** divide; quotient is the whole part, remainder goes over the unchanged denominator.  \n- **Mixed number to improper fraction:** whole $\\times$ denominator $+$ numerator, over the same denominator.  \nThese are the rules used in the source questions on pages 14-19.',
    },
  ),
  {
    sourcePage: 20,
    title: 'Thank you for watching - closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'The final page is an EELU-branded “Thank you for watching / Questions?” closing graphic. It contains no additional lesson content.',
  },
];

export const mathematics0Lecture4Lesson: Lesson = {
  id: 'mathematics-0-lecture-4-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 4.pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 4.pdf',
  title: 'Lecture 4: Factors, Fraction Simplification, and Mixed Numbers (2025-2026 archive)',
  sourcePageCount: 20,
  pages,
  lastReviewed: '2026-10-14',
};
