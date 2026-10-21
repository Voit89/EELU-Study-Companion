import type { Lesson, LessonBlock, LessonPage } from '../types';

interface WorkedExample {
  title: string;
  givens?: string;
  steps: string[];
  conclusion?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  options: { recognition?: string; trap?: string; sourceNote?: string; example?: WorkedExample; recap?: string } = {},
): LessonPage {
  const blocks: LessonBlock[] = [{ type: 'zobda', text: takeaway }];
  blocks.push({ type: 'foundation', title: 'Step-by-step explanation', markdown: explanation });
  if (options.recognition) blocks.push({ type: 'recognition', title: 'How to recognize it', markdown: options.recognition });
  if (options.example) {
    blocks.push({ type: 'worked-example', title: options.example.title, ...(options.example.givens ? { givens: options.example.givens } : {}), steps: options.example.steps, ...(options.example.conclusion ? { conclusion: options.example.conclusion } : {}) });
  }
  if (options.trap) blocks.push({ type: 'trap', title: 'Common mix-up', markdown: options.trap });
  if (options.sourceNote) blocks.push({ type: 'source-note', text: options.sourceNote });
  if (options.recap) blocks.push({ type: 'foundation', title: 'Quick review recap', markdown: options.recap });
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualOnlyPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [{ type: 'source-note', text: note }] };
}

const pages: LessonPage[] = [
  visualOnlyPage(1, 'Mathematics (0) — Fall 2025–2026 cover', 'The cover identifies Mathematics (0), the listed instructors, and Fall Semester 2025–2026.'),
  visualOnlyPage(2, 'Revision — divider slide', 'This slide marks a revision section. The following slides introduce radical equations.'),
  visualOnlyPage(3, 'Radical equations — section divider', 'This is the topic title slide. The definition and solving strategy begin on source page 4.'),
  explainedPage(4, 'Radical equations · Definition and first example', 'A radical equation has the variable under a root. The slide’s example √(x+2)=x−2 has the valid solution x=(5+√17)/2.', 'A radical sign is a root: a square root has index 2, a cube root index 3, and so on. The slide’s example is √(x+2)=x−2. Before solving, note that x+2 must be nonnegative, and the right side must also be nonnegative because it equals a square root; therefore x≥2. Squaring gives x+2=(x−2)², or x²−5x+2=0. The roots are (5±√17)/2, but the smaller root is below 2 and fails the original equation. The larger root is valid. This equation is shown as an illustration here; its solution is not worked elsewhere in the source deck.', { recognition: '**Radical equation (معادلة جذرية):** an equation with the variable inside a root. For an even root, the radicand must be nonnegative over the real numbers.', trap: 'After squaring, always test candidates in the original equation. Squaring can remove sign information and create an extraneous root.', sourceNote: 'The slide presents this equation as an example but does not solve it. The walkthrough completes it and checks the domain.' }),
  explainedPage(5, 'Radical equations · General solving steps', 'Isolate the radical, raise both sides to its index, solve the new equation, then check every candidate in the original.', 'For a square root, square both sides; for a cube root, cube both sides. Raising both sides to a power removes the radical, but it may also make a false candidate appear, so checking is part of the solution—not an optional final polish. If there are several radicals, isolate one and remove it before deciding whether another squaring step is needed.', { recognition: 'If the radical is not alone, first move the other terms so the radical expression is isolated before raising both sides to a power.', trap: 'For even roots, the principal square root is nonnegative. The equation √A=B therefore requires B≥0 as well as A≥0.' }),
  explainedPage(6, 'Example 1 · Set up √(x+5)=9', 'The radical is already isolated; square both sides to remove it.', 'This slide gives the equation and leaves the calculation for the next page. The left side is the principal square root of x+5, and the right side is the positive number 9. Since both sides are nonnegative, squaring is safe here; after solving, substitute the result into the original equation.', { recognition: 'When the equation has the form √A = a known nonnegative number, square both sides to get A equal to that number squared.' }),
  explainedPage(7, 'Example 1 · Solve and check √(x+5)=9', 'Squaring gives x+5=81, so x=76; checking gives √81=9.', 'Square both sides: (√(x+5))²=9², which reduces to x+5=81. Subtract 5 to get x=76. Check the original, not only the squared equation: √(76+5)=√81=9, so the answer is valid.', { example: { title: 'Solve Example 1', givens: '√(x+5)=9', steps: ['Square both sides: x+5=81.', 'Subtract 5: x=76.', 'Check: √(76+5)=√81=9.'], conclusion: 'The solution is x=76.' } }),
  explainedPage(8, 'Example 2 · Set up √(2x+3)=√(x+9)−1', 'This equation has a radical on each side; after the first squaring, another radical remains.', 'The source gives √(2x+3)=√(x+9)−1 but does not yet show the algebra. The radicands require 2x+3≥0 and x+9≥0. Since the left side is nonnegative, the right side must also be nonnegative; the first radicand condition already implies x≥−1.5, which satisfies that sign requirement. Square once, simplify, isolate the remaining radical, then square again and check candidates.', { recognition: 'If squaring once leaves a square root, isolate that remaining radical before squaring a second time.' }),
  explainedPage(9, 'Example 2 · First squaring and isolate the remaining root', 'After the first square, the equation reduces to √(x+9)=(7−x)/2; this also requires x≤7.', 'Square both sides of √(2x+3)=√(x+9)−1. Expand the right square: (√(x+9)−1)²=x+10−2√(x+9). Equating and simplifying gives x−7=−2√(x+9), hence √(x+9)=(7−x)/2. Because the left side is nonnegative, keep the condition x≤7. This sign condition will reject one of the candidates after the next square.', { example: { title: 'Keep the sign information from the first step', steps: ['Square: 2x+3=(√(x+9)−1)²=x+10−2√(x+9).', 'Rearrange: x−7=−2√(x+9).', 'Divide by 2 and change signs: √(x+9)=(7−x)/2.', 'Since √(x+9)≥0, require 7−x≥0, so x≤7.'], conclusion: 'The condition x≤7 must be retained when selecting roots.' } }),
  explainedPage(10, 'Example 2 · Finish, then reject the extraneous root', 'The quadratic gives x=9±2√17, but only x=9−2√17 satisfies the original equation.', 'Square √(x+9)=(7−x)/2: x+9=(7−x)²/4. Multiply by 4 and collect terms to get x²−18x+13=0. The quadratic formula gives x=9±2√17. The plus root is about 17.246, which violates x≤7 and fails the original equation. The minus root is about 0.754 and checks in the original. Therefore the only solution is 9−2√17.', { example: { title: 'Solve the quadratic and test both candidates', givens: 'From page 9: √(x+9)=(7−x)/2 and x≤7.', steps: ['Square: 4x+36=(7−x)²=x²−14x+49.', 'Collect: x²−18x+13=0.', 'Quadratic formula: x=(18±√272)/2=9±2√17.', 'Reject 9+2√17 because it is greater than 7 and does not satisfy the original equation.', 'Check 9−2√17≈0.754 in the original; both sides are approximately 2.12.'], conclusion: 'The valid solution is x=9−2√17.' }, sourceNote: 'The slide correctly rejects the larger root; the retained x≤7 condition explains why the second squaring created it.' }),
  explainedPage(11, 'Example 3 · Set up √(x+1)/(x−1)=1', 'The denominator requires x≠1; the square root also requires x≥−1.', 'This slide gives the equation but no working. Before clearing the denominator, record x≠1 and x≥−1. Multiplying by x−1 yields √(x+1)=x−1. Since a square root is nonnegative, any valid solution must also satisfy x−1>0, or x>1. The next slide squares and checks the candidates.', { recognition: 'For a radical fraction, check both the radicand and the denominator before manipulating the equation.' }),
  explainedPage(12, 'Example 3 · Reject x=0 and keep x=3', 'Clearing the denominator and squaring produces x=0 or 3; only x=3 works in the original equation.', 'Multiply by x−1, which is allowed because x≠1: √(x+1)=x−1. Squaring gives x+1=(x−1)²=x²−2x+1, so x²−3x=0 and x(x−3)=0. The candidates are 0 and 3. At x=0, the original left side is √1/(−1)=−1, not 1, so 0 is extraneous. At x=3, it is √4/2=1. The valid answer is x=3.', { example: { title: 'Check candidates in the unsquared fraction', givens: '√(x+1)/(x−1)=1; x≥−1 and x≠1.', steps: ['Multiply by x−1: √(x+1)=x−1.', 'Square: x+1=(x−1)², giving x²−3x=0.', 'Factor: x(x−3)=0, so candidates are x=0 and x=3.', 'At 0, the original fraction is −1, so reject it. At 3, the fraction is 2/2=1.'], conclusion: 'Only x=3 solves the original equation.' }, trap: 'A candidate can satisfy the squared equation but not the original equation. Also retain x≠1, since that value makes the original denominator zero.' }),
  explainedPage(13, 'Example 4 · Set up 1/√(x−1) + √(x−1) = 3', 'The radical is also in a denominator, so the domain is x>1; multiplying by √(x−1) clears the fraction.', 'The equation is 1/√(x−1)+√(x−1)=3. Because the denominator cannot be zero and the radicand must be nonnegative, require x>1. The slide leaves the solution for the next two pages. Once multiplied by √(x−1), the first term becomes 1, the second becomes x−1, and the right side becomes 3√(x−1).', { recognition: 'If √(x−1) is in a denominator, x must be strictly greater than 1—not merely greater than or equal to 1.' }),
  explainedPage(14, 'Example 4 · Clear the denominator and solve the quadratic', 'The equation becomes x=3√(x−1); squaring gives roots x=(9±3√5)/2.', 'Multiply both sides by √(x−1), which is positive because x>1: 1+(√(x−1))²=3√(x−1). Simplify to x=3√(x−1). Square both sides: x²=9(x−1), so x²−9x+9=0. The quadratic formula gives x=(9±√45)/2=(9±3√5)/2. Both candidates are greater than 1, but because we squared, verify them in the original equation as the following slide does.', { example: { title: 'Solve after clearing the radical denominator', givens: '1/√(x−1)+√(x−1)=3, with x>1.', steps: ['Multiply by √(x−1): 1+(x−1)=3√(x−1), so x=3√(x−1).', 'Square: x²=9(x−1), hence x²−9x+9=0.', 'Quadratic formula: x=(9±√45)/2=(9±3√5)/2.', 'Both values are greater than 1; test both in the original equation.'], conclusion: 'The candidates are (9+3√5)/2 and (9−3√5)/2.' } }),
  explainedPage(15, 'Example 4 · Verify both exact roots', 'Both roots, (9+3√5)/2 and (9−3√5)/2, are greater than 1 and satisfy the original equation.', 'The source checks decimal approximations: x≈7.854 gives √(x−1)≈√6.854 and its reciprocal; x≈1.146 gives √(x−1)≈√0.146. In each case the two terms add to approximately 3. Both roots are in the required domain x>1, so neither is extraneous. An exact check is also possible by setting t=√(x−1)>0: 1/t+t=3 gives t²−3t+1=0, whose two positive roots lead to the same exact x-values.', { example: { title: 'Why both candidates remain', steps: ['The exact roots are approximately 7.854 and 1.146, both greater than the domain boundary x=1.', 'Substitution into 1/√(x−1)+√(x−1) gives approximately 3 for each.', 'Therefore neither candidate is extraneous.'], conclusion: 'Both exact roots are valid.' }, recap: 'For radical equations, record the domain first, isolate and remove radicals carefully, and check every candidate in the original equation. Squaring may introduce an extra root; a final substitution decides which answers remain.' }),
  visualOnlyPage(16, 'Thank-you slide', 'The final page is a closing EELU graphic and contains no additional mathematics.'),
];

export const mathematics0Lecture11Lesson: Lesson = {
  id: 'mathematics-0-lecture-11-archive',
  courseId: 'mathematics-0',
  sourceKey: 'archive:mathematics-0:lecture/lecture 11.pdf',
  sourcePath: 'Mathematics 0/lecture/lecture 11.pdf',
  title: 'Lecture 11: Radical Equations (Fall 2025–2026)',
  sourcePageCount: 16,
  pages,
  lastReviewed: '2026-10-14',
};
