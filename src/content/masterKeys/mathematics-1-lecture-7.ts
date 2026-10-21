import type { LessonMasterKey, PageGuide } from '../types';

export const mathematics1Lecture7MasterKey: LessonMasterKey = {
  bigIdea:
    'This lecture has two jobs. At infinity, compare the degrees of a rational function to find its end behavior. At a finite point, test continuity with three conditions: the value exists, the limit exists, and they are equal. When continuity fails, classify the break as removable, jump, or infinite.',

  rules: [
    {
      name: 'Reciprocal powers vanish',
      plain:
        'As x grows in either direction, 1/x, 1/x², 1/x³, and every higher reciprocal power approach 0.',
      latex: String.raw`\lim_{x\to\pm\infty}\frac{1}{x^n}=0\qquad(n>0)`,
      when: 'Use this whenever a rational function has lower-degree terms after division.',
    },
    {
      name: 'Degree comparison',
      plain:
        'For a polynomial over a polynomial: smaller top degree gives 0; equal degrees give the ratio of leading coefficients; larger top degree gives an unbounded result.',
      latex: String.raw`\deg P<\deg Q\Rightarrow0,\qquad \deg P=\deg Q\Rightarrow\frac{a_n}{b_n},\qquad \deg P>\deg Q\Rightarrow\pm\infty`,
      when: 'Use this first for every limit at infinity of a rational function.',
    },
    {
      name: 'Infinity over infinity is not a value',
      plain:
        'The form ∞/∞ is indeterminate. It tells you both parts grow, not what their ratio does. Compare growth rates or divide by the highest denominator power.',
      when: 'Use this to avoid stopping at the form instead of finding the limit.',
    },
    {
      name: 'Three-part continuity test',
      plain:
        'A function is continuous at c when f(c) exists, the two-sided limit exists, and the limit equals f(c). All three are required.',
      latex: String.raw`f(c)\text{ exists},\qquad \lim_{x\to c}f(x)\text{ exists},\qquad \lim_{x\to c}f(x)=f(c)`,
      when: 'Use this for every "is f continuous at c?" question.',
    },
    {
      name: 'Endpoint continuity',
      plain:
        'At a left endpoint, approach from the right. At a right endpoint, approach from the left. Do not demand a two-sided limit outside the domain.',
      latex: String.raw`\lim_{x\to a^+}f(x)=f(a),\qquad \lim_{x\to b^-}f(x)=f(b)`,
      when: 'Use this when the point is the end of the interval, not an interior point.',
    },
    {
      name: 'Polynomial and rational continuity',
      plain:
        'Every polynomial is continuous everywhere. A rational function is continuous at every input where its denominator is nonzero.',
      when: 'Use this to find intervals of continuity and to justify direct substitution.',
    },
    {
      name: 'Composition continuity',
      plain:
        'If the inner limit exists and the outer function is continuous at that limit, the limit passes through: substitute the inner limit into the outer function.',
      latex: String.raw`\lim_{x\to c}g(f(x))=g\left(\lim_{x\to c}f(x)\right)`,
      when: 'Use this for nested functions such as cos(2x + sin(...)).',
    },
    {
      name: 'Discontinuity types',
      plain:
        'Removable: a finite limit exists but the point is missing or misplaced. Jump: the two finite one-sided limits differ. Infinite: at least one side goes to +∞ or −∞.',
      when: 'Use this after computing the one-sided limits at a break.',
    },
  ],

  recipes: [
    {
      id: 'rational-end-behavior',
      name: 'Rational function at infinity',
      trigger: 'The question asks for the limit as x → +∞ or x → −∞ of a polynomial over a polynomial.',
      steps: [
        'Compare the numerator degree with the denominator degree.',
        'Top lower gives 0; equal gives the ratio of leading coefficients; top higher gives ±∞.',
        'If the top degree is higher, check the sign of the leading terms in the direction asked.',
        'Show division by the highest denominator power only when the question asks for the method.',
      ],
      example: {
        question: String.raw`Find $\displaystyle\lim_{x\to\infty}\frac{2x^2+3x+1}{x^2-x-3}$.`,
        steps: [
          'Both polynomials have degree 2.',
          'The leading coefficients are 2 and 1.',
          'Equal degrees: the limit is the ratio $2/1$.',
        ],
        answer: '2',
      },
      check: 'Equal degrees give a finite leading-coefficient ratio, not ∞/∞.',
    },
    {
      id: 'direct-substitution',
      name: 'Substitute through a continuous function',
      trigger: 'The limit is at a finite point and the function is a polynomial, a rational with nonzero denominator, sine/cosine, or a composition of continuous functions.',
      steps: [
        'Confirm the function is continuous at the target point.',
        'Substitute the target value from the inside out.',
        'If substitution gives 0/0, simplify; if it gives nonzero/0, check one-sided signs for ±∞.',
      ],
      example: {
        question: String.raw`Find $\displaystyle\lim_{x\to\pi/2}\cos\left(2x+\sin\left(\frac{3\pi}{2}+x\right)\right)$.`,
        steps: [
          String.raw`Inside the sine: $\frac{3\pi}{2}+\frac{\pi}{2}=2\pi$, so $\sin(2\pi)=0$.`,
          String.raw`The cosine input becomes $2(\pi/2)+0=\pi$.`,
          String.raw`Cosine is continuous, so the limit is $\cos\pi=-1$.`,
        ],
        answer: '-1',
      },
      check: 'Direct substitution is legal only when the function is continuous at the target.',
    },
    {
      id: 'zero-over-zero',
      name: 'Handle 0/0 by factoring or rationalizing',
      trigger: 'Direct substitution gives 0/0, especially with a factorable polynomial or a square root.',
      steps: [
        'Confirm that substitution gives 0/0.',
        'Factor and cancel, or multiply by the conjugate for a square root.',
        'Substitute again; the limit can exist even when the original point is undefined.',
      ],
      example: {
        question: String.raw`Find $\displaystyle\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}$.`,
        steps: [
          'Substitution gives 0/0, so multiply by the conjugate.',
          String.raw`$\frac{\sqrt{x+1}-1}{x}\cdot\frac{\sqrt{x+1}+1}{\sqrt{x+1}+1}=\frac{x}{x(\sqrt{x+1}+1)}$.`,
          String.raw`For $x\ne0$, this is $\frac{1}{\sqrt{x+1}+1}$, which approaches $1/2$.`,
        ],
        answer: '1/2',
      },
      check: 'Cancel only for x ≠ a, and state that the original point may remain undefined.',
    },
    {
      id: 'continuity-test',
      name: 'Three-part continuity test',
      trigger: 'The question asks whether f is continuous at a point, especially for a piecewise function.',
      steps: [
        'Find f(c) from the branch that includes c.',
        'Find the left and right limits from the neighboring branches; at an endpoint use only the inside one-sided limit.',
        'Check all three: f(c) exists, the limit exists, and the limit equals f(c).',
      ],
      example: {
        question: String.raw`For $f(x)=\begin{cases}7x-2,&x<1\\5,&x=1\\5x^2,&x>1\end{cases}$, is $f$ continuous at $1$?`,
        steps: [
          String.raw`$f(1)=5$ from the middle branch.`,
          String.raw`Left limit: $7(1)-2=5$. Right limit: $5(1)^2=5$.`,
          'The two-sided limit is 5 and equals f(1).',
        ],
        answer: 'Yes, f is continuous at 1.',
      },
      check: 'All three conditions must hold; a defined value alone is not enough.',
    },
    {
      id: 'classify-discontinuity',
      name: 'Classify a discontinuity',
      trigger: 'The question asks for removable, jump, or infinite, or shows a graph with a break.',
      steps: [
        'Compute the one-sided limits at the break.',
        'Finite and equal but f(a) missing or different gives removable.',
        'Finite but unequal gives jump; any one-sided ±∞ gives infinite.',
      ],
      example: {
        question: String.raw`Classify the break at $x=3$ for $f(x)=\begin{cases}-x^2+4,&x\le3\\4x-8,&x>3\end{cases}$.`,
        steps: [
          String.raw`Left limit: $-(3)^2+4=-5$.`,
          String.raw`Right limit: $4(3)-8=4$.`,
          'Both limits are finite but unequal.',
        ],
        answer: 'Jump discontinuity',
      },
      check: 'A jump needs two finite unequal sides; an infinite break needs a vertical asymptote.',
    },
    {
      id: 'continuity-on-domain',
      name: 'Continuity on a domain or through a composition',
      trigger: 'The question asks where a function is continuous, or asks for a limit through a continuous outer function.',
      steps: [
        'Start with the domain: exclude denominator zeros and other undefined inputs.',
        'Polynomials are continuous everywhere; rational functions are continuous where the denominator is nonzero.',
        'For a composition, check the outer function at the inner limit; if it is continuous there, substitute.',
        'State the answer as intervals or as a domain restriction.',
      ],
      example: {
        question: String.raw`Where is $f(x)=\frac1x$ continuous?`,
        steps: [
          'The denominator is zero at x = 0, so the domain is x ≠ 0.',
          'A rational function is continuous wherever its denominator is nonzero.',
        ],
        answer: 'Continuous on every interval that does not contain 0, such as (−∞,0) or (0,∞).',
      },
      check: 'An excluded point is not repaired by canceling; continuity is stated on the domain.',
    },
  ],

  formulaSheet: [
    {
      label: 'Reciprocal powers',
      latex: String.raw`\lim_{x\to\pm\infty}\frac{1}{x^n}=0`,
      plain: 'A reciprocal power shrinks to zero in either direction.',
    },
    {
      label: 'Degree comparison',
      latex: String.raw`\begin{array}{c|c}\deg P<\deg Q&0\\\deg P=\deg Q&\dfrac{a_n}{b_n}\\\deg P>\deg Q&\pm\infty\end{array}`,
      plain: 'Smaller top gives 0; equal gives the leading ratio; larger top gives an unbounded result.',
    },
    {
      label: 'Equal degrees',
      latex: String.raw`\lim_{x\to\pm\infty}\frac{a_nx^n+\cdots}{b_nx^n+\cdots}=\frac{a_n}{b_n}`,
      plain: 'Only the leading coefficients matter when the degrees match.',
    },
    {
      label: 'Continuity test',
      latex: String.raw`f(c)\text{ exists},\quad \lim_{x\to c}f(x)\text{ exists},\quad \lim_{x\to c}f(x)=f(c)`,
      plain: 'Value, limit, and equality: all three are required.',
    },
    {
      label: 'Left endpoint',
      latex: String.raw`\lim_{x\to a^+}f(x)=f(a)`,
      plain: 'At the left end of the domain, approach from the right.',
    },
    {
      label: 'Right endpoint',
      latex: String.raw`\lim_{x\to b^-}f(x)=f(b)`,
      plain: 'At the right end of the domain, approach from the left.',
    },
    {
      label: 'Polynomial continuity',
      latex: String.raw`P(x)\text{ is continuous on }\mathbb{R}`,
      plain: 'Every polynomial is continuous everywhere.',
    },
    {
      label: 'Rational continuity',
      latex: String.raw`\frac{P(x)}{Q(x)}\text{ is continuous where }Q(x)\ne0`,
      plain: 'A rational function is continuous at every input that does not zero the denominator.',
    },
    {
      label: 'Composition',
      latex: String.raw`\lim_{x\to c}g(f(x))=g\left(\lim_{x\to c}f(x)\right)`,
      plain: 'If the outer function is continuous at the inner limit, substitute through.',
    },
    {
      label: 'Removable discontinuity',
      latex: String.raw`\lim_{x\to a}f(x)=L,\qquad f(a)\ne L\text{ or }f(a)\text{ undefined}`,
      plain: 'A finite limit exists, but the point is missing or placed elsewhere.',
    },
    {
      label: 'Jump discontinuity',
      latex: String.raw`\lim_{x\to a^-}f(x)\ne\lim_{x\to a^+}f(x),\qquad\text{both finite}`,
      plain: 'The two sides approach different finite heights.',
    },
    {
      label: 'Infinite discontinuity',
      latex: String.raw`\lim_{x\to a^\pm}f(x)=\pm\infty`,
      plain: 'At least one side grows without bound at a vertical asymptote.',
    },
  ],

  traps: [
    'Do not write ∞/∞ as the answer. It is an indeterminate form; compare degrees or divide by the highest denominator power.',
    'When x → −∞, x² still goes to +∞. The direction of x does not make an even power negative.',
    'Equal degrees use the leading coefficients, not the constant terms or the coefficients of lower powers.',
    'A higher numerator degree does not automatically mean +∞. Check the sign of the leading terms in the direction asked.',
    'A finite limit does not prove continuity. The function must also be defined there and equal to the limit.',
    'A defined f(a) does not prove continuity. The two-sided limit must also exist and match it.',
    'Canceling a factor does not restore the original point. The simplified formula may have a limit while the original function is still undefined.',
    'At a left endpoint use a⁺; at a right endpoint use b⁻. The plus/minus can feel reversed until you picture the domain.',
    'A jump has two finite unequal sides. If either side is infinite, classify it as infinite, not jump.',
    'Do not use direct substitution at a break. It is valid only when the function is continuous at the target.',
    'At a piecewise boundary, the middle value gives f(a), not either one-sided limit. Use the neighboring branches for the limits.',
    'A rational function can be continuous on its domain and still fail at an excluded denominator value. State the domain first.',
  ],

  recall: [
    { prompt: 'What is lim x→±∞ 1/xⁿ for n > 0?', answer: '0.' },
    { prompt: 'Top degree smaller than bottom degree: what is the end behavior?', answer: 'The limit is 0.' },
    { prompt: 'Top degree equal to bottom degree: what is the end behavior?', answer: 'The ratio of the leading coefficients.' },
    { prompt: 'Top degree larger than bottom degree: what is the end behavior?', answer: 'Unbounded; check the sign for ±∞.' },
    { prompt: 'What does ∞/∞ mean?', answer: 'An indeterminate form: both parts grow, so their ratio still needs work.' },
    { prompt: 'What are the three continuity conditions at c?', answer: 'f(c) exists, the limit exists, and the limit equals f(c).' },
    { prompt: 'At a left endpoint, which one-sided limit do you use?', answer: 'The right-hand limit, x → a⁺.' },
    { prompt: 'At a right endpoint, which one-sided limit do you use?', answer: 'The left-hand limit, x → b⁻.' },
    { prompt: 'What is a removable discontinuity?', answer: 'A finite limit exists, but f(a) is missing or different.' },
    { prompt: 'What is a jump discontinuity?', answer: 'The two one-sided limits are finite but unequal.' },
    { prompt: 'What is an infinite discontinuity?', answer: 'At least one one-sided limit is +∞ or −∞ at a vertical asymptote.' },
    { prompt: 'What do you try when substitution gives 0/0?', answer: 'Factor and cancel, or rationalize a square root.' },
    { prompt: 'When can you substitute through a composition?', answer: 'When the outer function is continuous at the inner limit.' },
    { prompt: 'Where is a rational function continuous?', answer: 'At every input where its denominator is nonzero.' },
  ],

  checklist: [
    'Can you state the three degree cases for a rational function at infinity?',
    'Can you find the limit without writing ∞/∞ as an answer?',
    'Can you check the sign when the numerator degree is higher?',
    'Can you show the division by the highest denominator power when asked?',
    'Can you state and apply the three continuity conditions?',
    'Can you test a piecewise function at its boundary using both branches?',
    'Can you use the correct one-sided limit at an endpoint?',
    'Can you classify removable, jump, and infinite discontinuities?',
    'Can you handle 0/0 by factoring or rationalizing?',
    'Can you decide where a polynomial or rational function is continuous?',
    'Can you substitute through a continuous composition?',
    'Did you state the domain before claiming continuity?',
  ],

  sprint: [
    {
      minutes: 8,
      title: 'Master Key',
      detail: 'Read the big idea, the eight rules, and the formula sheet once.',
      view: 'master',
    },
    {
      minutes: 18,
      title: 'Quick pass',
      detail: 'One card per slide: Zatoona, fast method, recognition, trap.',
      view: 'slides',
    },
    {
      minutes: 14,
      title: 'Recipes',
      detail: 'Work through the six question recipes and their solved examples.',
      view: 'master',
      anchor: 'mk-recipes',
    },
    {
      minutes: 10,
      title: 'Recall',
      detail: 'Answer the 14 recall cards, then read the ready checklist.',
      view: 'recall',
    },
    {
      minutes: 5,
      title: 'Buffer',
      detail: 'Re-read the traps and the formula sheet. Stop there.',
      view: 'master',
      anchor: 'mk-formula-sheet',
    },
  ],
};

export const mathematics1Lecture7PageGuides: Record<number, PageGuide> = {
  1: { importance: 'skip' },
  2: { importance: 'skip' },
  3: { importance: 'skip' },
  4: { importance: 'skip' },
  5: {
    importance: 'must',
    examMove: [
      'Track what happens to f(x), not to x.',
      'A finite L means the graph settles at height L.',
      'Check x → +∞ and x → −∞ separately.',
    ],
    check: 'The two directions can give different answers.',
  },
  6: {
    importance: 'must',
    examMove: [
      'Reciprocal powers such as 3/x² and 5/x³ go to 0.',
      'A constant stays constant.',
      'An even power of x grows to +∞ in either direction.',
    ],
    check: 'Do not turn 3x² into −∞ just because x → −∞.',
  },
  7: {
    importance: 'must',
    examMove: [
      'Send each reciprocal term to 0.',
      'Keep the constants and the growing power.',
      'Read the four answers in order.',
    ],
    check: 'The answers are 0, +∞, 1, and −3.',
  },
  8: {
    importance: 'must',
    examMove: [
      'Compare the degrees first; that gives the answer.',
      'Divide by the highest denominator power only when showing work.',
      'Treat ∞/∞ as indeterminate, not as a value.',
    ],
    check: 'Degree comparison is the fast route; division is the proof.',
  },
  9: {
    importance: 'must',
    examMove: [
      'Both polynomials have degree 2.',
      'Use the ratio of leading coefficients: 2/1.',
      'The lower-degree terms do not affect the limit.',
    ],
    check: 'Equal degrees give a finite ratio.',
  },
  10: {
    importance: 'must',
    examMove: [
      'Divide every term by x².',
      'Every 1/x or 1/x² term goes to 0.',
      'The result is 2/1 = 2.',
    ],
    check: 'The denominator approaches 1, not 0.',
  },
  11: {
    importance: 'must',
    examMove: [
      'Top degree 1 is smaller than bottom degree 2.',
      'Smaller over larger gives 0.',
      'The sign of the numerator does not change the limit 0.',
    ],
    check: 'A shrinking fraction approaches 0, even from below.',
  },
  12: {
    importance: 'must',
    examMove: [
      'Divide by x².',
      'The numerator goes to 0 and the denominator goes to 1.',
      'The quotient goes to 0/1 = 0.',
    ],
    check: 'Do not call 0/1 undefined.',
  },
  13: {
    importance: 'must',
    examMove: [
      'Top degree 4 is larger than bottom degree 3.',
      'The quotient is unbounded.',
      'For x → +∞ the leading terms are positive, so the limit is +∞.',
    ],
    check: 'Higher degree means ±∞, not a finite leading ratio.',
  },
  14: {
    importance: 'must',
    examMove: [
      'Divide by x³.',
      'The numerator becomes 2x + 3/x², which goes to +∞.',
      'The denominator goes to 1, so the limit is +∞.',
    ],
    check: 'Do not stop at the original ∞/∞ form.',
  },
  15: { importance: 'skip' },
  16: {
    importance: 'must',
    examMove: [
      'Continuity is checked at a point or on an interval.',
      'A graph with no break at the point is continuous there.',
      'A function can be continuous on its domain without being continuous everywhere.',
    ],
    check: 'Do not judge the whole graph from one break.',
  },
  17: {
    importance: 'must',
    examMove: [
      'Step 1: check whether f(c) is defined.',
      'An open circle means the point is missing.',
      'No value means the function is not continuous there.',
    ],
    check: 'A missing value fails continuity even if the limit exists.',
  },
  18: {
    importance: 'must',
    examMove: [
      'Step 2: compare the left and right limits.',
      'If they approach different heights, the two-sided limit does not exist.',
      'A filled point does not repair a jump.',
    ],
    check: 'A defined value does not guarantee a limit.',
  },
  19: {
    importance: 'must',
    examMove: [
      'Step 3: compare the limit with f(c).',
      'If the filled point is at a different height, continuity fails.',
      'All three conditions must agree.',
    ],
    check: 'Equality is required, not just existence.',
  },
  20: {
    importance: 'must',
    examMove: [
      'List the three conditions in order.',
      'Find f(c), then the two-sided limit, then compare.',
      'If one condition fails, stop and name it.',
    ],
    check: 'The three conditions are cumulative.',
  },
  21: {
    importance: 'must',
    examMove: [
      'Interior point: check both sides.',
      'Left endpoint: check from the right only.',
      'Right endpoint: check from the left only.',
    ],
    check: 'Use the side that lies inside the domain.',
  },
  22: {
    importance: 'must',
    examMove: [
      'Interior c: use the two-sided limit.',
      'Left endpoint a: use x → a⁺.',
      'Right endpoint b: use x → b⁻.',
    ],
    check: 'At the left endpoint use +; at the right endpoint use −.',
  },
  23: {
    importance: 'must',
    examMove: [
      'Read f(2) = 4 from the piecewise rule.',
      'Simplify the nearby fraction to find the limit.',
      'Compare the limit with 4.',
    ],
    check: 'Use the branch that includes the point for f(2).',
  },
  24: {
    importance: 'must',
    examMove: [
      'Factor x² − 4 and cancel x − 2 for x ≠ 2.',
      'The nearby formula is x + 2, so the limit is 4.',
      'Since f(2) = 4, all three conditions hold.',
    ],
    check: 'The original fraction is undefined at 2, but the piecewise value fills the hole.',
  },
  25: {
    importance: 'must',
    examMove: [
      'Right side uses 2x + 5; left side uses x² + 2.',
      'f(3) comes from the branch that includes 3.',
      'Compare both one-sided limits with f(3).',
    ],
    check: 'Use each branch only on its own side.',
  },
  26: {
    importance: 'must',
    examMove: [
      'Right limit: 2(3) + 5 = 11.',
      'Left limit: 3² + 2 = 11.',
      'f(3) = 11, so the function is continuous at 3.',
    ],
    check: 'Both sides and the point value equal 11.',
  },
  27: {
    importance: 'must',
    examMove: [
      'Read f(1) = 5 from the middle branch.',
      'Use 7x − 2 on the left and 5x² on the right.',
      'Compare the two limits with 5.',
    ],
    check: 'The middle value is f(1), not a one-sided limit.',
  },
  28: {
    importance: 'must',
    examMove: [
      'Left limit: 7(1) − 2 = 5.',
      'Right limit: 5(1)² = 5.',
      'f(1) = 5, so all three match.',
    ],
    check: 'Continuous means the limit equals the value.',
  },
  29: {
    importance: 'skim',
    check: 'Continuity on an interval means continuity at every point in it; 1/x fails on any interval containing 0.',
  },
  30: {
    importance: 'skim',
    check: 'Sums, products, constant multiples, and quotients of continuous functions stay continuous where defined.',
  },
  31: {
    importance: 'must',
    examMove: [
      'Polynomials are continuous everywhere.',
      'A rational function is continuous wherever its denominator is nonzero.',
      'For the example, exclude x = 0, 1, and −2.',
    ],
    check: 'Start with the denominator, not the canceled form.',
  },
  32: {
    importance: 'skim',
    check: 'If the outer function is continuous at the inner limit, substitute the inner limit into the outer function.',
  },
  33: {
    importance: 'skim',
    check: 'Evaluate the nested expression from the inside out; sine and cosine are continuous.',
  },
  34: { importance: 'skip' },
  35: {
    importance: 'must',
    examMove: [
      'Hole → removable.',
      'Finite unequal side-heights → jump.',
      'Vertical asymptote → infinite.',
    ],
    check: 'Classify from the limits, not from the drawing alone.',
  },
  36: {
    importance: 'must',
    examMove: [
      'Removable: finite two-sided limit but f(a) missing or different.',
      'Jump: two finite unequal one-sided limits.',
      'Infinite: at least one side is ±∞.',
    ],
    check: 'A jump requires both sides to be finite.',
  },
  37: {
    importance: 'must',
    examMove: [
      'Factor and cancel to find the finite limit 4.',
      'Note that the original function is undefined at 2.',
      'Finite limit plus a hole means removable.',
    ],
    check: 'Canceling does not restore the original point.',
  },
  38: {
    importance: 'must',
    examMove: [
      'Left limit: −5. Right limit: 4.',
      'Both are finite but unequal.',
      'That is a jump discontinuity.',
    ],
    check: 'It is not infinite because neither side goes to ±∞.',
  },
  39: {
    importance: 'must',
    examMove: [
      'Substitution gives 0/0, so multiply by the conjugate.',
      'The fraction simplifies to 1/(√(x+1)+1), whose limit is 1/2.',
      'But f(0) = 3, so the limit does not equal the value.',
    ],
    check: 'A finite limit with a different point value is a removable discontinuity.',
  },
  40: { importance: 'skip' },
};
