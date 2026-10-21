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
    title: 'Archived course cover — Mathematics (1)',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'The cover identifies Mathematics (1), the Fall Semester, year 2025–2026, and lecturers Dr. Amany Magdy, Dr. Talat Eldanaf, and Dr. Mohamed Ghaleb. This is an archived course file; compare it with the current Moodle lecture when that version is released. The lecture topics are the coordinate plane, relations and functions, function graphs, and domain and range.',
      },
    ],
  },
  dividerPage(2, 'Revision — section divider', 'This slide only says “Revision.” It contains no worked revision question; the new lecture topic begins on source page 3.'),
  dividerPage(3, 'The Coordinate Plane — section divider', 'This slide names the coordinate plane topic. The first definition and sign rules are on source page 4.'),
  explainedPage(
    4,
    'The coordinate plane, axes, and quadrants',
    'The x-axis runs horizontally and the y-axis vertically; they meet at the origin $(0,0)$. A point’s signs tell you its quadrant.',
    {
      type: 'foundation',
      title: 'Read the two axes',
      markdown: 'The **coordinate plane** is a flat, two-dimensional grid. Its horizontal number line is the **x-axis**; its vertical number line is the **y-axis**. They cross at a right angle at the **origin**, written $(0,0)$. This is the starting point for locating points.',
    },
    {
      type: 'recognition',
      title: 'Quadrant signs (read x first, then y)',
      markdown: 'The axes split the plane into four regions called **quadrants**. Number them counterclockwise, starting at the upper right:  \n- I: $(+,+)$  \n- II: $(-,+)$  \n- III: $(-,-)$  \n- IV: $(+,-)$  \nThe first sign is the horizontal coordinate; the second is the vertical coordinate. Points on either axis are not inside a quadrant.',
    },
    {
      type: 'worked-example',
      title: 'Supplemental example: locate the sign pair',
      givens: 'A point has coordinates $(-3,2)$.',
      steps: [
        'The first coordinate is negative, so move left of the y-axis.',
        'The second coordinate is positive, so move above the x-axis.',
        'A point left and above the origin has sign pair $(-,+)$, which is Quadrant II.',
      ],
      conclusion: 'The grid is used to locate points and display relationships or equations.',
    },
  ),
  explainedPage(
    5,
    'Ordered pairs and plotting points',
    'An ordered pair $(x,y)$ always gives the horizontal move first and the vertical move second.',
    {
      type: 'recognition',
      title: 'Decode the order',
      markdown: 'A point is written as $(x,y)$. **x comes first** and tells how far left or right to go; **y comes second** and tells how far down or up to go. “Ordered” matters: $(3,-2)$ is not the same point as $(-2,3)$.',
    },
    {
      type: 'worked-example',
      title: 'Plot the source examples',
      givens: '$(3,-2)$ and $(-4,3)$',
      steps: [
        'For $(3,-2)$, start at $(0,0)$, move 3 units right because $x=3$, then 2 units down because $y=-2$.',
        'For $(-4,3)$, start at the origin, move 4 units left because $x=-4$, then 3 units up because $y=3$.',
        'Mark the final location. The point is where the two moves end, not either intermediate corner.',
      ],
      conclusion: 'A reliable plotting routine is: origin, horizontal x-move, vertical y-move, mark.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not swap the coordinates or treat a negative sign as a negative distance. The sign gives the direction: negative x means left; negative y means down.',
    },
  ),
  explainedPage(
    6,
    'The origin and points on the axes',
    'A point on the x-axis has $y=0$; a point on the y-axis has $x=0$.',
    {
      type: 'foundation',
      title: 'Recognize the special forms',
      markdown: 'The origin is $(0,0)$. On the **x-axis**, there is no up/down displacement, so every point looks like $(x,0)$. On the **y-axis**, there is no left/right displacement, so every point looks like $(0,y)$.',
    },
    {
      type: 'worked-example',
      title: 'Supplemental example: use the zero coordinate',
      givens: '$(5,0)$ and $(0,-2)$',
      steps: [
        'In $(5,0)$, the y-coordinate is zero, so the point lies on the x-axis, 5 units right of the origin.',
        'In $(0,-2)$, the x-coordinate is zero, so the point lies on the y-axis, 2 units below the origin.',
        'For a graph, an x-intercept is where the graph meets the x-axis, so its y-coordinate is 0. A y-intercept has x-coordinate 0.',
      ],
      conclusion: 'The zero coordinate tells you which axis contains the point.',
    },
  ),
  dividerPage(7, 'Relations — section divider', 'This slide introduces the relations section. Its definition and first example begin on source page 8.'),
  explainedPage(
    8,
    'Relations and one way to write them',
    'A relation is a collection of ordered pairs connecting inputs to outputs; $R=\\{(1,2),(2,3),(3,4)\\}$ is one example.',
    {
      type: 'foundation',
      title: 'What the pairs mean',
      markdown: 'A **relation** is a set of ordered pairs. The first number is treated as an input, and the second as its associated output. In $R=\\{(1,2),(2,3),(3,4)\\}$, for example, the pairs associate 1 with 2, 2 with 3, and 3 with 4. The braces mean “the set containing these pairs.”',
    },
    {
      type: 'recognition',
      title: 'Relations can describe real connections',
      markdown: 'The slide gives time with temperature, distance with speed, and price with quantity purchased. These examples describe a relationship between two kinds of values; the actual rule or data would determine which pairs belong in the relation.',
    },
    {
      type: 'foundation',
      title: 'One relation, several displays',
      markdown: 'This slide starts with the **set of ordered pairs** form. The next slide shows three other ways to display the same sort of input-output information: a table, arrows in a mapping diagram, or plotted points on a graph.',
    },
  ),
  explainedPage(
    9,
    'Tables, mapping diagrams, graphs, domain, and range',
    'The domain collects the first coordinates (inputs); the range collects the second coordinates (outputs), listing each value only once.',
    {
      type: 'foundation',
      title: 'Four ways to display a relation',
      markdown: 'A **table** puts each input beside its output. A **mapping diagram** draws arrows from the input set to the output set. A **graph** plots each pair $(x,y)$ as a point. These are different displays of input-output associations.',
    },
    {
      type: 'worked-example',
      title: 'Find the domain and range',
      givens: '$R=\\{(2,5),(3,7),(4,7)\\}$',
      steps: [
        'The domain is made from the first entries: 2, 3, and 4. Thus the domain is $\\{2,3,4\\}$.',
        'The outputs are 5, 7, and 7. A set lists a repeated value once, so the range is $\\{5,7\\}$.',
        'Notice that two different inputs can share the same output; that does not add another 7 to the range.',
      ],
      conclusion: 'For ordered pairs, scan left entries for the domain and right entries for the range.',
    },
  ),
  explainedPage(
    10,
    'One-to-one, many-to-one, and one-to-many relations',
    'A many-to-one relation can still be a function; a one-to-many relation cannot, because one input has two outputs.',
    {
      type: 'foundation',
      title: 'Compare what happens to the inputs',
      markdown: '- **One-to-one:** distinct inputs pair with distinct outputs, as in $(1,2),(2,3),(3,4)$.  \n- **Many-to-one:** different inputs can share an output, as in $(-2,4),(-1,4),(0,4)$.  \n- **One-to-many:** the same input is paired with multiple outputs, as in $(2,3),(2,5)$.',
    },
    {
      type: 'recognition',
      title: 'Check the function rule',
      markdown: 'A function requires every input to have **exactly one** output. Therefore many-to-one is allowed: each input still has one output. One-to-many is not allowed: input 2 is assigned both 3 and 5.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not require every output to be unique. Two inputs can point to the same y-value and still form a function. The rule checks each input, not whether outputs repeat.',
    },
  ),
  dividerPage(11, 'Functions — section divider', 'This slide only announces “Functions.” The definition begins on source page 12.'),
  explainedPage(
    12,
    'What makes a relation a function?',
    'A relation is a function when every allowed input has one and only one output.',
    {
      type: 'foundation',
      title: 'The exact-one-output rule',
      markdown: 'A **function** is a special relation. For each input $x$, there must be an output $y$, and there cannot be two different outputs for that same input. In pair notation, $(2,5)$ and $(2,7)$ together break the rule because input 2 is assigned twice. An input missing an output also breaks the rule.',
    },
    {
      type: 'recognition',
      title: 'Think of a dependable rule',
      markdown: 'For a chosen input, the function must give one determinate answer. The slide’s examples describe height as depending on age, temperature on date, and a square’s area on its side length. These are examples of one quantity being determined by another.',
    },
    {
      type: 'trap',
      title: 'Keep the direction straight',
      markdown: 'The function rule checks from input to output. Different inputs may share one output, but one input may not split into two outputs. This is why many-to-one can be a function while one-to-many cannot.',
    },
  ),
  explainedPage(
    13,
    'Function notation: $f:X\\to Y$ and $y=f(x)$',
    'The notation $y=f(x)$ says that applying the function rule $f$ to input $x$ produces output $y$.',
    {
      type: 'foundation',
      title: 'Decode each symbol',
      markdown: 'A **set** is a collection of elements. The slide describes nonempty sets $X$ and $Y$; “nonempty” means each set has at least one element. The notation $f:X\\to Y$ means the function $f$ takes an input from $X$ and assigns it an output in $Y$. In $y=f(x)$, $x$ is the input, $f$ names the rule, and $f(x)$ is the output.',
    },
    {
      type: 'worked-example',
      title: 'Supplemental example: a small function rule',
      givens: '$f(x)=x+1$',
      steps: [
        'Choose an input, for example $x=2$.',
        'Apply the rule “add 1”: $f(2)=2+1=3$.',
        'So the corresponding input-output pair is $(2,3)$, and in the equation $y=f(x)$ this output is $y=3$.',
      ],
      conclusion: 'The notation $f(2)$ means “the value of the function at input 2”; it is not $f$ multiplied by 2.',
    },
    {
      type: 'foundation',
      title: 'Read the diagram',
      markdown: 'The slide’s diagram shows the input $x$ entering the rule $f$ and the output $f(x)$ coming out. The rule must produce exactly one output for each input in $X$.',
    },
  ),
  explainedPage(
    14,
    'Domain, codomain, range, and variables',
    'The domain is the set of permitted inputs; the range is the outputs the function actually produces, and the range is contained in the codomain.',
    {
      type: 'foundation',
      title: 'Separate the three sets',
      markdown: 'The source uses $X$ and $Y$ for sets of real numbers in its usual examples. $X$ is the **domain** and is denoted $D_f$. $Y$ is the **codomain**: the set where outputs are allowed to land. The **range** is $R_f=\\{f(x):x\\in X\\}$, the set of outputs actually reached. Thus $R_f\\subseteq Y$; the range can be smaller than the codomain.',
    },
    {
      type: 'worked-example',
      title: 'Supplemental example: allowed versus actual outputs',
      givens: '$X=\\{1,2\\}$, $Y=\\{a,b,c\\}$, with $f(1)=a$ and $f(2)=a$',
      steps: [
        'Both allowed inputs are 1 and 2, so $D_f=X=\\{1,2\\}$.',
        'The codomain is the full target set $Y=\\{a,b,c\\}$.',
        'The function actually outputs only $a$, so its range is $R_f=\\{a\\}$.',
      ],
      conclusion: 'Every range value belongs to the codomain, but some codomain values may never be used.',
    },
    {
      type: 'foundation',
      title: 'Independent and dependent variables',
      markdown: '$x$ is called the **independent variable** because it is the input we choose. $y=f(x)$ is the **dependent variable** because its value depends on the chosen $x$.',
    },
    {
      type: 'trap',
      title: 'Source notation correction',
      markdown: 'The slide correctly defines $X$ as the domain and $Y$ as the codomain, but its parenthetical note says $D_f\\subseteq Y$. That conflicts with the definitions. The consistent statements are $D_f=X$ and $R_f\\subseteq Y$; the range, not the domain, is a subset of the codomain.',
    },
  ),
  explainedPage(
    15,
    'Mapping diagrams — Examples 1 and 2',
    'For each mapping diagram, inspect every element in the left set $X$: it must have one arrow leaving it.',
    {
      type: 'foundation',
      title: 'How to read the diagrams',
      markdown: 'The left oval is the input set $X$ and the right oval is the output set $Y$. An arrow $x\\to y$ means input $x$ is paired with output $y$. The question under each diagram asks whether that relation is a function.',
    },
    {
      type: 'recognition',
      title: 'Preview the two checks',
      markdown: 'In Example 1, input 2 has arrows to two outputs (5 and 6), while inputs 1 and 3 each have one. In Example 2, inputs 1 and 2 each have arrows to two outputs, and input 3 has none. Either multiple arrows from one input or no arrow from an input violates the function definition; page 16 states the source’s conclusions.',
    },
    {
      type: 'trap',
      title: 'Do not judge by the number of arrows reaching an output',
      markdown: 'Several inputs may point to the same output. The question is whether each left-side input has exactly one arrow leaving it.',
    },
  ),
  explainedPage(
    16,
    'Why the mappings in Examples 1 and 2 are not functions',
    'Both diagrams fail the same rule: an input must have exactly one image, but these examples have an input with multiple images or no image.',
    {
      type: 'worked-example',
      title: 'Example 1: check $f_1$',
      steps: [
        'The source identifies input 2 in $X$ as having two images in $Y$.',
        'That means two arrows leave the same input and point to different outputs.',
        'A function cannot assign two outputs to one input.',
      ],
      conclusion: '$f_1$ is not a function.',
    },
    {
      type: 'worked-example',
      title: 'Example 2: check $f_2$',
      steps: [
        'The source identifies both inputs 1 and 2 as having two images in $Y$. Either one is enough to fail the function rule.',
        'It also identifies input 3 in $X$ as having no image in $Y$. A function must assign an output to every element of its domain.',
        'The issue is the mapping from the left set to the right set, not whether every element of $Y$ receives an arrow.',
      ],
      conclusion: '$f_2$ is not a function for both reasons shown on the slide.',
    },
    {
      type: 'recognition',
      title: 'Fast diagram check',
      markdown: 'Trace the arrows from left to right, one input at a time. Exactly one arrow must start at each input. Zero or two arrows means “not a function.”',
    },
  ),
  explainedPage(
    17,
    'Example 3 mapping and Example 4 choices',
    'Example 3 appears to give one output to each input; in Example 4, compare repeated first coordinates to find a relation that is not a function.',
    {
      type: 'foundation',
      title: 'Example 3: read the diagram',
      markdown: 'The source diagram shows $1\\to4$, $2\\to5$, and $3\\to6$. Each element of $X=\\{1,2,3\\}$ has one arrow. The slide gives the question here and its conclusion on page 18.',
    },
    {
      type: 'recognition',
      title: 'Example 4: what to inspect in the choices',
      markdown: 'For a set of ordered pairs, the first coordinate is the input. Check whether a first coordinate is paired with two different second coordinates. The choices are:  \n- a) $\\{(1,2),(2,4),(3,6)\\}$  \n- b) $\\{(-1,1),(-2,4),(2,4)\\}$  \n- c) $\\{(1,2),(1,4),(2,5),(3,8)\\}$  \n- d) $\\{(1,1),(2,2),(3,3)\\}$',
    },
    {
      type: 'worked-example',
      title: 'Start the comparison',
      givens: 'Choice c begins with $(1,2)$ and $(1,4)$.',
      steps: [
        'The input in both pairs is 1.',
        'The outputs are different: one pair gives 2 and the other gives 4.',
        'This is the exact pattern that a function forbids.',
      ],
      conclusion: 'Page 18 confirms choice c as the answer and completes the other checks.',
    },
  ),
  explainedPage(
    18,
    'Example 3 and the non-function choice',
    'Example 3 is a function because each input has exactly one arrow; choice c is not because input 1 has two outputs.',
    {
      type: 'worked-example',
      title: 'Finish Example 3',
      steps: [
        'The inputs are $X=\\{1,2,3\\}$. The diagram gives 1 the output 4, 2 the output 5, and 3 the output 6.',
        'Every input has one and only one image, so $f_3$ is a function.',
        'The domain is $D_{f_3}=\\{1,2,3\\}$ and the actual range is $R_{f_3}=\\{4,5,6\\}$. The element 7 shown in $Y$ is unused; that is allowed.',
      ],
      conclusion: 'The source’s Example 3 answer is “function.”',
    },
    {
      type: 'worked-example',
      title: 'Check each Example 4 choice',
      steps: [
        'a) Inputs 1, 2, and 3 each appear once, so it is a function.',
        'b) Inputs $-1$, $-2$, and 2 each appear once. Sharing output 4 is allowed, so it is a function.',
        'c) Input 1 is paired with both 2 and 4. This fails the exact-one-output rule, so it is not a function.',
        'd) Inputs 1, 2, and 3 each appear once, so it is a function.',
      ],
      conclusion: 'The slide’s answer is c. Repeated outputs are okay; repeated inputs with different outputs are the problem.',
    },
  ),
  dividerPage(19, 'The Vertical Line Test — section divider', 'This slide names the test. The definition and two graphs are on source page 20.'),
  explainedPage(
    20,
    'The vertical line test',
    'A graph represents $y$ as a function of $x$ exactly when every vertical line hits it at most once.',
    {
      type: 'foundation',
      title: 'Why vertical lines test inputs',
      markdown: 'A vertical line holds $x$ fixed and moves up and down through possible $y$-values. If it crosses the graph twice, the same input $x$ has two outputs, so the graph is not a function. If no vertical line crosses more than once, each represented $x$ has at most one $y$.',
    },
    {
      type: 'worked-example',
      title: 'Compare the source graphs',
      steps: [
        'For the circle labeled $R$, choose a vertical line through its middle. It meets the circle once above and once below, giving two y-values for the same x.',
        'Therefore $R$ does not represent $y$ as a function of $x$.',
        'For the curve labeled $S$, any vertical line meets it at most once, including at its left endpoint.',
      ],
      conclusion: '$S$ passes the vertical line test and represents $y$ as a function of $x$.',
    },
    {
      type: 'recognition',
      title: 'If you see a graph, think…',
      markdown: 'Imagine sliding a vertical ruler from left to right across the graph. Two hits at the same position mean “not a function.” One hit or no hit at each position passes.',
    },
  ),
  dividerPage(21, 'Graph of a Function — section divider', 'This slide announces the graph topic. The definition begins on source page 22.'),
  explainedPage(
    22,
    'What points make up a function graph?',
    'The graph of $f$ is the collection of coordinate pairs $(x,f(x))$ for the inputs in its domain.',
    {
      type: 'foundation',
      title: 'Turn each input-output pair into a point',
      markdown: 'The horizontal coordinate is an input $x$ from the domain $D$; the vertical coordinate is the corresponding output $f(x)$. So for each permitted input, place the point $(x,f(x))$ on the coordinate plane. The slide’s axes are blank because they are ready for these points.',
    },
    {
      type: 'worked-example',
      title: 'Supplemental example: make one point from a rule',
      givens: '$f(x)=x^2$ and input $x=-2$',
      steps: [
        'Use the input as the first coordinate: $x=-2$.',
        'Evaluate the rule: $f(-2)=(-2)^2=4$. Squaring the negative number gives positive 4.',
        'The graph therefore contains the point $(-2,4)$.',
      ],
      conclusion: 'Every point on a function graph records one input and the output produced from it.',
    },
  ),
  explainedPage(
    23,
    'Read a function’s output as graph height',
    'At a fixed horizontal position $x$, the graph’s vertical coordinate is $y=f(x)$; it can be positive, zero, or negative.',
    {
      type: 'foundation',
      title: 'Read the illustrated heights',
      markdown: 'The curve is a picture of a function. At $x=1$, the curve’s height is labeled $f(1)$; at $x=2$, its height is $f(2)$. In general, the point on the curve above input $x$ has coordinates $(x,f(x))$.',
    },
    {
      type: 'recognition',
      title: 'Above and below the x-axis',
      markdown: 'If the curve is above the x-axis, its y-value is positive. On the x-axis, the y-value is 0. Below the x-axis, the y-value is negative. The right-hand example point $(x,y)$ is below the axis, so $f(x)=y<0$ there.',
    },
    {
      type: 'trap',
      title: 'The height is signed',
      markdown: '“Height” does not mean a distance that must be positive. On a coordinate graph, vertical position below the x-axis is a negative y-value.',
    },
  ),
  explainedPage(
    24,
    'Sketch $y=x^2$: make a table and plot points',
    'To graph $y=x^2$, choose x-values in the interval, square each one to get y, and plot the resulting pairs.',
    {
      type: 'worked-example',
      title: 'Calculate the table values',
      givens: 'The source uses $y=x^2$ for $x$ in $[-2,2]$.',
      steps: [
        'The interval $[-2,2]$ means all real x-values from -2 through 2, including both endpoints. The table samples several of those inputs.',
        'At $x=-2$, $y=(-2)^2=4$. At $x=-1$, $y=(-1)^2=1$. At $x=0$, $y=0^2=0$.',
        'At $x=1$, $y=1^2=1$. At $x=\\frac32$, $y=(\\frac32)^2=\\frac{3^2}{2^2}=\\frac94$. At $x=2$, $y=2^2=4$.',
        'The plotted pairs are $(-2,4),(-1,1),(0,0),(1,1),(\\frac32,\\frac94),(2,4)$.',
      ],
      conclusion: 'The x-value is the input; its square is the y-value. In particular, $(-2)^2$ is positive 4.',
    },
    {
      type: 'recognition',
      title: 'Put a pair on the plane',
      markdown: 'For a point $(x,y)$, move to x horizontally first and then to y vertically. The source plots the table values and uses a fraction for $\\frac32$ because its output $\\frac94$ is exact.',
    },
    {
      type: 'trap',
      title: 'Common trap to avoid',
      markdown: 'Do not calculate $(-2)^2$ as $-4$. The parentheses say the whole number -2 is multiplied by itself: $(-2)(-2)=4$.',
    },
  ),
  explainedPage(
    25,
    'Sketch $y=x^2$: draw the curve',
    'After plotting the table, connect the points with a smooth U-shaped curve and label it $y=x^2$.',
    {
      type: 'foundation',
      title: 'What the plotted shape tells you',
      markdown: 'The curve is a **parabola** opening upward. Its lowest point is the vertex $(0,0)$. The points at opposite x-values match in height: $(-1,1)$ and $(1,1)$, and $(-2,4)$ and $(2,4)$.',
    },
    {
      type: 'recognition',
      title: 'Why a smooth curve is appropriate',
      markdown: 'The rule $y=x^2$ is defined for every real input in the interval, not only the six values in the table. The table gives sample points; the smooth curve represents the intermediate values too.',
    },
    {
      type: 'trap',
      title: 'Keep the graph tied to its rule',
      markdown: 'Do not connect the points with unrelated straight segments or forget the label. The graph is the shape of all pairs satisfying $y=x^2$ over the stated interval.',
    },
  ),
  dividerPage(26, 'Domain and Range — section divider', 'This slide introduces the final topic. Definitions begin on source page 27.'),
  explainedPage(
    27,
    'Domain and range: allowed inputs and possible outputs',
    'The domain contains inputs that do not make the rule undefined; the range contains the outputs produced by those inputs.',
    {
      type: 'foundation',
      title: 'Domain',
      markdown: 'The **domain** is the set of all allowed x-values. Check that substituting an input does not make the expression undefined. Two common restrictions are shown: division by zero is forbidden, and an even root such as a square root needs a nonnegative expression inside it (the **radicand**).',
    },
    {
      type: 'foundation',
      title: 'Range',
      markdown: 'The **range** is the set of y-values that actually result when you use domain inputs in $f(x)$. Domain asks “what may I put in?” Range asks “what outputs can come out?”',
    },
    {
      type: 'recognition',
      title: 'Quick domain checklist',
      markdown: 'Look for a denominator and require it to be nonzero. Look for an even root and require its radicand to be at least zero. If the root is itself in a denominator, it must also not equal zero, so its radicand must be strictly positive.',
    },
  ),
  explainedPage(
    28,
    'Example 5: identify three functions before solving',
    'The three examples test the two common domain restrictions: a square-root radicand must be nonnegative, and a denominator must not be zero.',
    {
      type: 'recognition',
      title: 'Read the expressions carefully',
      markdown: 'The source asks for the domain of:  \n1. $f(x)=\\sqrt{x+3}$  \n2. $f(x)=x^2$  \n3. $f(x)=\\frac{1}{x^2-x}$.  \nIn the first expression, the radical bar covers $x+3$. In the third, the entire $x^2-x$ is the denominator.',
    },
    {
      type: 'foundation',
      title: 'Choose the rule for each one',
      markdown: 'For 1, make the expression under the square root at least zero. For 2, a polynomial such as $x^2$ is defined for every real x. For 3, find the values that make the denominator zero and exclude them. The source works these out on page 29.',
    },
  ),
  explainedPage(
    29,
    'Example 5: solve the three domain questions',
    'The domains are $[-3,\\infty)$, all real numbers, and all real numbers except 0 and 1.',
    {
      type: 'worked-example',
      title: '1. $f(x)=\\sqrt{x+3}$',
      steps: [
        'A square root is real only when its radicand is nonnegative, so require $x+3\\ge0$.',
        'Subtract 3 from both sides: $x\\ge-3$.',
        'The endpoint -3 is included because $\\sqrt{-3+3}=\\sqrt0=0$ is defined.',
      ],
      conclusion: '$D_f=[-3,\\infty)$. The square bracket means -3 is included.',
    },
    {
      type: 'worked-example',
      title: '2. $f(x)=x^2$',
      steps: [
        'Squaring any real number gives a real number.',
        'There is no denominator or even root imposing a restriction.',
      ],
      conclusion: '$D_f=\\mathbb R=(-\\infty,\\infty)$, all real numbers.',
    },
    {
      type: 'worked-example',
      title: '3. $f(x)=\\frac{1}{x^2-x}$',
      steps: [
        'A denominator cannot equal zero, so require $x^2-x\\ne0$.',
        'Find the forbidden values by solving $x^2-x=0$. Factor: $x(x-1)=0$.',
        'A product is zero when one factor is zero, so $x=0$ or $x-1=0$, giving $x=0$ or $x=1$.',
        'Exclude both values. Every other real x leaves a nonzero denominator.',
      ],
      conclusion: '$D_f=\\mathbb R\\setminus\\{0,1\\}$. The symbol $\\setminus$ means “remove these values from the set.”',
    },
  ),
  explainedPage(
    30,
    'Reference table: common domains and ranges',
    'A domain restriction controls which x-values are allowed; the range records the y-values that the rule can actually produce.',
    {
      type: 'foundation',
      title: 'Read the interval and set notation',
      markdown: 'Parentheses mean an endpoint is excluded; square brackets mean it is included. $\\cup$ means “union,” or combine the listed sets. $(-\\infty,0)\\cup(0,\\infty)$ is every real number except 0. $\\infty$ is not a number that can be included as an endpoint.',
    },
    {
      type: 'worked-example',
      title: 'Understand each row',
      steps: [
        '$y=x^2$: every real x is allowed; squares are never negative, so the range is $[0,\\infty)$.',
        '$y=1/x$: x cannot be zero because it is the denominator. The output also cannot be zero because $1/x$ is never 0. Both domain and range omit 0.',
        '$y=\\sqrt{x}$: require $x\\ge0$. The principal square root is also nonnegative, so both domain and range are $[0,\\infty)$.',
        '$y=\\sqrt{4-x}$: require $4-x\\ge0$, so $x\\le4$. Its outputs are all nonnegative values, giving domain $(-\\infty,4]$ and range $[0,\\infty)$.',
        '$y=\\sqrt{1-x^2}$: require $1-x^2\\ge0$, which is equivalent to $x^2\\le1$ and hence $-1\\le x\\le1$. The output runs from 0 to 1, so the range is $[0,1]$.',
      ],
      conclusion: 'Use the formula to find allowed inputs, then reason separately about the outputs it can reach.',
    },
    {
      type: 'trap',
      title: 'Domain and range are not interchangeable',
      markdown: 'The domain is written in x-values; the range is written in y-values. A valid domain does not automatically tell you the range: inspect what the rule does to those inputs.',
    },
  ),
  explainedPage(
    31,
    'Check your knowledge: three domain questions',
    'Apply the same checks: polynomials allow every real input, square-root radicands must be nonnegative, and denominators must stay nonzero.',
    {
      type: 'foundation',
      title: 'The slide’s questions',
      markdown: 'The slide asks for the domains of $f(x)=3x^2-2x+4$, $h(x)=\\frac{\\sqrt{3x-9}}{x-4}$, and $g(x)=\\frac{5}{\\sqrt{x-8}}$. Its page does not show answers; the following worked solutions are included to help you check your method.',
    },
    {
      type: 'worked-example',
      title: '1. $f(x)=3x^2-2x+4$',
      steps: [
        'This is a polynomial: it uses addition, subtraction, multiplication, and nonnegative integer powers.',
        'Those operations produce a real value for every real input; there is no denominator or root to restrict x.',
      ],
      conclusion: '$D_f=\\mathbb R$.',
    },
    {
      type: 'worked-example',
      title: '2. $h(x)=\\frac{\\sqrt{3x-9}}{x-4}$',
      steps: [
        'The square-root radicand must be nonnegative: $3x-9\\ge0$.',
        'Add 9 and divide by positive 3: $3x\\ge9$, so $x\\ge3$.',
        'The denominator must not be zero: $x-4\\ne0$, so $x\\ne4$.',
        'Combine the conditions: keep all x from 3 upward, but remove 4. The value 3 is allowed because the numerator becomes $\\sqrt0$ and the denominator is -1.',
      ],
      conclusion: '$D_h=[3,4)\\cup(4,\\infty)$.',
    },
    {
      type: 'worked-example',
      title: '3. $g(x)=\\frac{5}{\\sqrt{x-8}}$',
      steps: [
        'The square-root radicand must be nonnegative, but the square root is also a denominator and therefore cannot be zero.',
        'Together these conditions require $x-8>0$, not merely $x-8\\ge0$.',
        'Add 8: $x>8$. The endpoint 8 is excluded because it would make the denominator $\\sqrt0=0$.',
      ],
      conclusion: '$D_g=(8,\\infty)$.',
    },
    {
      type: 'foundation',
      title: 'Lecture recap',
      markdown: '- **Coordinates:** read $(x,y)$ as horizontal first, vertical second.  \n- **Functions:** each domain input must have exactly one output; repeated outputs are okay.  \n- **Graphs:** use the vertical line test to check whether a graph gives at most one y for each x.  \n- **Domain:** exclude inputs that make an expression undefined; for a square root require a nonnegative radicand. If the root is a denominator, require a positive radicand.  \n- **Range:** collect the outputs actually produced by allowed inputs.  \nThe explanations follow the archived Fall 2025–2026 lecture; compare this version with the current Moodle file when it becomes available.',
    },
  ),
  {
    sourcePage: 32,
    title: 'Thank you for watching — closing slide',
    coverage: 'visual-only',
    blocks: [
      {
        type: 'source-note',
        text: 'This slide shows the EELU logo, “Thank you for watching,” and “Questions?” It has no additional mathematics content.',
      },
    ],
  },
];

export const mathematics1Lecture4Lesson: Lesson = {
  id: 'mathematics-1-lecture-4-archive',
  courseId: 'mathematics-1',
  sourceKey: 'archive:mathematics-1:lecture/lecture 4.pdf',
  sourcePath: 'Mathematics 1/lecture/lecture 4.pdf',
  title: 'Archived Lecture 4: Coordinate Plane, Relations, Functions, and Domain and Range',
  sourcePageCount: 32,
  pages,
  lastReviewed: '2026-10-14',
};
