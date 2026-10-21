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
    'The cover identifies Mathematics (1), Fall Semester 2025–2026, and the listed instructors. This guide follows that archived copy; compare it with current Moodle material when available.',
  ),
  visualOnlyPage(2, 'Revision — section divider', 'This slide only announces a revision section.'),
  visualOnlyPage(3, 'Applications of derivatives — section divider', 'This slide names the topic. The definitions of local and absolute extrema begin on source page 4.'),
  explainedPage(
    4,
    'Local versus absolute maxima and minima',
    'A local extremum is highest or lowest compared with nearby inputs. An absolute extremum is highest or lowest over the entire domain.',
    {
      type: 'formula',
      label: 'Definitions from the slide',
      latex: '\\text{Local max at }c:\\ f(x)\\le f(c)\\text{ for nearby }x,\\qquad \\text{Local min at }c:\\ f(x)\\ge f(c)\\text{ for nearby }x',
      explanation: '“Nearby” means all x in some open interval around c. For an absolute maximum, the inequality f(x)≤f(c) must hold for every x in the domain; for an absolute minimum, f(x)≥f(c) throughout the domain.',
    },
    {
      type: 'foundation',
      title: 'Local compares a neighborhood; absolute compares the whole domain',
      markdown: 'A point can be a local maximum without being the highest point anywhere on the graph. Likewise, there can be several local minima but only one absolute minimum (or several points sharing the same absolute value).',
    },
    {
      type: 'recognition',
      title: 'Ask “nearby or everywhere?”',
      markdown: 'If a question asks for a local maximum or minimum, compare values close to the point. If it asks for an absolute maximum or minimum, compare against every value the function takes on its domain.',
    },
  ),
  explainedPage(
    5,
    'Read local and absolute extrema from a graph',
    'The graph distinguishes nearby peaks and valleys from the overall highest and lowest values. A local extremum need not be absolute.',
    {
      type: 'foundation',
      title: 'What the marked curve illustrates',
      markdown: 'At c the curve has a local maximum; at e it has a local minimum. The highest marked value is the absolute maximum at d, and the lowest is the absolute minimum at a. The sketch also labels b as a local minimum using nearby values within the drawn domain.',
    },
    {
      type: 'source-note',
      text: 'Convention note: page 4 defines local extrema at interior points, while this sketch also labels the right endpoint b as a local minimum. The drawing is using a one-sided endpoint convention there; follow the convention your instructor uses when classifying endpoints.',
    },
    {
      type: 'trap',
      title: 'A local peak is not automatically the global peak',
      markdown: 'The curve can rise to a higher point elsewhere. The word absolute means compare across the whole domain, not just the nearby shape.',
    },
  ),
  explainedPage(
    6,
    'Find and classify stationary points with derivatives',
    'For a differentiable interior local maximum or minimum, the tangent is horizontal, so start by solving y′=0. Then use y′′ to classify each candidate when the second derivative test applies.',
    {
      type: 'foundation',
      title: 'The slide’s three-step process',
      markdown: '1. Find the first derivative y′.  \n2. Solve y′=0 to find stationary x-values.  \n3. Find the second derivative y′′ and evaluate it at each candidate: y′′>0 indicates a local minimum; y′′<0 indicates a local maximum.',
    },
    {
      type: 'recognition',
      title: 'What the sign of y′′ tells you',
      markdown: 'If y′′>0 near the candidate, the curve bends upward like a cup, giving a minimum. If y′′<0, it bends downward like a cap, giving a maximum.',
    },
    {
      type: 'trap',
      title: 'Check the test’s assumptions',
      markdown: 'The second derivative test classifies a stationary interior point where y′=0 and y′′ exists. Endpoints and points where y′ is undefined also need checking; they are not found by solving y′=0 alone.',
    },
  ),
  explainedPage(
    7,
    'The second derivative test and its limitation',
    'At a stationary point, y′′<0 gives a local maximum and y′′>0 gives a local minimum. If y′′=0, this test gives no classification.',
    {
      type: 'formula',
      label: 'Second derivative test',
      latex: 'y\\prime(c)=0,\\ y\\prime\\prime(c)<0\\Rightarrow\\text{local maximum};\\qquad y\\prime(c)=0,\\ y\\prime\\prime(c)>0\\Rightarrow\\text{local minimum}',
      explanation: 'The sketches show a curve bending down at a maximum, bending up at a minimum, and changing bend at an inflection point. When y′′(c)=0, the test fails: the point could be a maximum, a minimum, or neither.',
    },
    {
      type: 'source-note',
      text: 'An inflection point is usually identified by a change in concavity, often checked by a sign change in y′′. The fact y′′(c)=0 by itself does not prove that c is an inflection point.',
    },
  ),
  explainedPage(
    8,
    'Example 1: classify the stationary points of a cubic',
    'For y=x³−3x+1, the stationary points are (−1,3), a local maximum, and (1,−1), a local minimum.',
    {
      type: 'formula',
      label: 'Function in Example 1',
      latex: 'y=x^3-3x+1',
      explanation: 'Find stationary points by solving y′=0. Then evaluate the original function to get each point’s y-coordinate, and use y′′ to classify it.',
    },
    {
      type: 'worked-example',
      title: 'Find the stationary x-values and coordinates',
      steps: [
        'Differentiate: y′=3x²−3.',
        'Set y′=0: 3x²−3=0, so x²=1 and x=−1 or x=1.',
        'Evaluate the original function: y(−1)=−1+3+1=3; y(1)=1−3+1=−1.',
        'So the stationary points are (−1,3) and (1,−1).',
      ],
      conclusion: 'The critical x-values are −1 and 1.',
    },
    {
      type: 'worked-example',
      title: 'Use the second derivative to classify each point',
      steps: [
        'Differentiate again: y′′=6x.',
        'At x=−1, y′′=−6<0, so the curve bends down and (−1,3) is a local maximum.',
        'At x=1, y′′=6>0, so the curve bends up and (1,−1) is a local minimum.',
      ],
      conclusion: 'Local maximum: (−1,3). Local minimum: (1,−1).',
    },
  ),
  explainedPage(
    9,
    'Example 2: when the second derivative test is inconclusive',
    'For y=x³+8, x=0 is stationary and y′′(0)=0. The second derivative test alone is inconclusive; checking signs shows (0,8) is a stationary inflection point, not a maximum or minimum.',
    {
      type: 'worked-example',
      title: 'Find the candidate and inspect the second derivative',
      steps: [
        'Differentiate: y′=3x². Set it to zero: 3x²=0 gives x=0.',
        'Find the point: y(0)=0³+8=8, so the stationary point is (0,8).',
        'Differentiate again: y′′=6x, so y′′(0)=0. The second derivative test cannot classify this point.',
        'Check concavity: y′′=6x is negative for x<0 and positive for x>0, so the curve changes concavity at 0.',
        'Check whether it is an extremum: y′=3x² is positive on both sides of 0, so the function keeps increasing and has neither a local maximum nor a local minimum there.',
      ],
      conclusion: '(0,8) is a stationary inflection point.',
    },
    {
      type: 'source-note',
      text: 'The slide correctly marks this particular cubic’s point of inflection, but y′′=0 alone is not enough to prove an inflection. Its own theorem on page 7 says the test fails when y′′=0. Here the sign change in y′′ supplies the needed evidence.',
    },
  ),
  explainedPage(
    10,
    'Example 3: two stationary points, one maximum and one minimum',
    'For y=x³−6x²+9x+2, the stationary points are (1,6), a local maximum, and (3,2), a local minimum.',
    {
      type: 'worked-example',
      title: 'Solve y′=0 and find both point coordinates',
      steps: [
        'Differentiate: y′=3x²−12x+9.',
        'Set equal to zero and divide by 3: x²−4x+3=0.',
        'Factor: (x−1)(x−3)=0, giving x=1 and x=3.',
        'Evaluate the function: y(1)=1−6+9+2=6; y(3)=27−54+27+2=2.',
      ],
      conclusion: 'The stationary points are (1,6) and (3,2).',
    },
    {
      type: 'worked-example',
      title: 'Classify each candidate',
      steps: [
        'The second derivative is y′′=6x−12.',
        'At x=1, y′′=−6<0, so (1,6) is a local maximum.',
        'At x=3, y′′=6>0, so (3,2) is a local minimum.',
      ],
      conclusion: 'Local maximum: (1,6). Local minimum: (3,2).',
    },
  ),
  explainedPage(
    11,
    'Example 4: a quadratic with a local maximum',
    'For y=4x−x², solving y′=0 gives x=2. Since y′′=−2<0, the point (2,4) is a local maximum.',
    {
      type: 'worked-example',
      title: 'Find the stationary point and classify it',
      steps: [
        'Differentiate: y′=4−2x.',
        'Set y′=0: 4−2x=0, so x=2.',
        'Find its height: y(2)=4(2)−2²=8−4=4.',
        'The second derivative is y′′=−2, which is negative.',
      ],
      conclusion: '(2,4) is a local maximum.',
    },
    {
      type: 'recognition',
      title: 'A downward-opening quadratic has a peak',
      markdown: 'The negative x² coefficient means this parabola opens downward. Its stationary point is therefore its highest point; y′′=−2 confirms the maximum.',
    },
  ),
  explainedPage(
    12,
    'Check your knowledge: classify the extrema',
    'For y=2+3x²−x³, the stationary points are (0,2), a local minimum, and (2,6), a local maximum.',
    {
      type: 'formula',
      label: 'Practice function from the slide',
      latex: 'y=2+3x^2-x^3',
      explanation: 'The source slide gives the question but no answer. The worked solution below is a supplemental explanation.',
    },
    {
      type: 'worked-example',
      title: 'Supplemental walkthrough: find and classify both stationary points',
      steps: [
        'Differentiate: y′=6x−3x²=3x(2−x).',
        'Set y′=0: 3x(2−x)=0 gives x=0 or x=2.',
        'Find the coordinates: y(0)=2; y(2)=2+3(4)−8=6. The points are (0,2) and (2,6).',
        'Differentiate again: y′′=6−6x.',
        'At x=0, y′′=6>0, so (0,2) is a local minimum.',
        'At x=2, y′′=−6<0, so (2,6) is a local maximum.',
      ],
      conclusion: 'Local minimum: (0,2). Local maximum: (2,6). This answer is added here; it is not printed on the source slide.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap: classify candidates carefully',
      markdown: '- **Local vs absolute:** local compares nearby values; absolute compares the whole domain.  \n- **Candidates:** for smooth interior points, solve y′=0. Also inspect endpoints and places where y′ is undefined when the problem asks for extrema on a full domain.  \n- **Second derivative test:** y′′>0 gives a local minimum; y′′<0 gives a local maximum. If y′′=0, the test is inconclusive.  \n- **Inflection:** verify a change in concavity; y′′=0 alone is not proof. This guide follows archived Fall 2025–2026 slides; compare with current Moodle material when available.',
    },
  ),
  visualOnlyPage(13, 'Thank you — closing slide', 'This final slide is a thank-you and questions graphic. It contains no further lesson content.'),
];

export const mathematics1Lecture13Lesson: Lesson = {
  id: 'mathematics-1-lecture-13-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/Lecture 13.pdf',
  sourcePath: 'Mathematics 1/lecture/Lecture 13.pdf',
  title: 'Archived Lecture 13: Applications of Derivatives',
  sourcePageCount: 13,
  pages,
  lastReviewed: '2026-10-14',
};
