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
    note: 'The current Moodle cover names Mathematics (1), the three instructors, Fall Semester, and year 2026–2027.',
  },
  {
    sourcePage: 2,
    title: 'Revision — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This is a title slide for the revision material; the algebra basics begin on source page 3.',
  },
  {
    sourcePage: 3,
    title: 'Algebra Basics — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This slide introduces the Algebra Basics section. Its first explanation begins on source page 4.',
  },
  explainedPage(
    4,
    'From arithmetic to variables',
    'Arithmetic uses specific numbers; algebra can use a letter whose value changes. Substitute the given value to evaluate an expression such as $x+5$.',
    'The slide contrasts calculations with known numbers, such as $23+5$, with an expression that contains a variable. In $x+5$, the letter $x$ stands for a value that may vary with the situation.\n\n- If $x=1$, substitute 1 for $x$: $x+5=1+5=6$.\n- If $x=-7$, substitute $-7$: $x+5=-7+5=-2$.\n\nThe expression $x+5$ stays the same algebraic expression even though its value changes when $x$ changes.',
    '**Variable** — a symbol, often a letter, that represents a value.  \n**Expression** — a mathematical phrase such as $x+5$; by itself, it does not state that two quantities are equal.',
    undefined,
    {
      recognition: 'If a question gives a value for a variable, replace each matching letter with that value, keep any negative sign in parentheses when useful, then calculate.',
      trap: 'Do not treat a variable as one fixed number unless the question gives its value. The same $x+5$ evaluates differently for $x=1$ and $x=-7$.',
    },
  ),
  explainedPage(
    5,
    'The language of algebra — variables and constants',
    'A variable can represent an unknown or changing value; a constant is a fixed number in the expression or equation.',
    'The slide defines variables as symbols such as $x$, $y$, $a$, or $b$. They can stand for unknown quantities or values that change in context. Constants are fixed numerical values, with $3$, $-5$, and $10$ given as examples.\n\nIn $x+10$, $x$ is the variable and 10 is a constant. The number 10 stays fixed while the value assigned to $x$ may change.',
    '**Variable** — a symbol used to represent a quantity or value.  \n**Constant** — a fixed numerical value.',
    undefined,
    {
      recognition: 'When reading an expression, ask which symbol can vary and which written number is fixed. A letter is usually the variable here; a standalone number is a constant.',
    },
  ),
  explainedPage(
    6,
    'The language of algebra — coefficients and expressions',
    'A coefficient is the number multiplying a variable; an expression combines numbers, variables, and operations.',
    'In $3x$, the 3 multiplies $x$, so 3 is its coefficient and $x$ is the variable. In $2x+3$, the expression combines the coefficient 2, variable $x$, constant 3, and addition.\n\nA coefficient of 1 is often not written: $x$ means $1x$. A variable with no written number in front still has an implied coefficient.',
    '**Coefficient** — a numerical factor multiplying a variable.  \n**Expression** — a mathematical combination of values, variables, and operations; for example, $2x+3$.',
    undefined,
    {
      recognition: 'In a term such as $7a$, identify the coefficient by finding the number multiplying the letter. If there is no visible number, the coefficient is 1.',
      trap: 'In $2x+3$, the coefficient of $x$ is 2, not 3. The 3 is a separate constant term.',
    },
  ),
  explainedPage(
    7,
    'Multiplication in algebra — the missing sign',
    'Adjacent numbers, letters, or parentheses mean multiplication in algebra, so the multiplication sign is often omitted.',
    'The table pairs ordinary multiplication with algebraic notation:\n\n- $4\\times x$ is written $4x$.\n- $x\\times y$ is written $xy$.\n- $7\\times a$ is written $7a$.\n- $2\\times(x+3)$ is written $2(x+3)$.\n- $(x+2)\\times(x+3)$ is written $(x+2)(x+3)$.\n\nThe expressions next to one another are multiplied; the parentheses keep each grouped sum together. For instance, $2(x+3)$ means 2 times the entire quantity $x+3$.',
    '**Juxtaposition** — writing symbols side by side to mean multiplication.  \n**Parentheses** — grouping symbols that show which terms belong together.',
    undefined,
    {
      recognition: 'If a number is directly beside a letter, or two parenthesized expressions are side by side, read the adjacency as multiplication.',
      trap: 'The letter $x$ and the multiplication sign $\\times$ look similar, but they play different roles. In $4x$, the $x$ is a variable and the multiplication is implied.',
      analogy: 'Think of $4x$ as a shorter label for “four groups of $x$.” The short form saves space; it does not change the operation.',
    },
  ),
  explainedPage(
    8,
    'Solving equations — what a solution means',
    'An equation says two expressions are equal; its solution is any variable value that makes that statement true.',
    'The slide defines an equation as a statement that two expressions are equal. For example, $5+3=6+2$ is true because both sides equal 8.\n\nFor an equation with a variable, the solution is the value (or values) that make its two sides equal. The next slide demonstrates finding such a value while keeping the equality true.',
    '**Equation** — a statement with an equals sign asserting that its left and right sides have the same value.  \n**Solution** — a value that makes the equation true.',
    undefined,
    {
      recognition: 'To check a proposed solution, substitute it for the variable and calculate both sides. A solution works when the two sides match.',
      analogy: 'The equals sign is like a balanced scale: an equation remains balanced if you make the same change to both sides.',
    },
  ),
  explainedPage(
    9,
    'Solving an equation — isolate k',
    'Undo the $+22$ by subtracting 22 from both sides: $k+22=29$ gives $k=7$.',
    'The goal is to leave $k$ by itself while preserving equality.\n\n1. Start with $k+22=29$.\n2. Subtract 22 from each side: $k+22-22=29-22$.\n3. The left side simplifies to $k$ and the right to 7, so $k=7$.\n\nCheck: $7+22=29$, so 7 satisfies the original equation.',
    '**Isolate** — get the chosen variable alone on one side of the equation.  \n**Equivalent equation** — an equation with the same solution set as the original.',
    undefined,
    {
      recognition: 'When a constant is added to the variable, subtract that same constant from both sides to undo the addition.',
      trap: 'Subtract 22 from both sides, not just from the side containing $k$. Changing only one side would break the equality.',
    },
  ),
  explainedPage(
    10,
    'Equation examples — two problems to solve',
    'Both examples ask you to isolate the variable: $3x+2=14$ and $3y+3=y+7$.',
    'Try the first equation by undoing the $+2$ and then the multiplication by 3. In the second, first collect the variable terms on one side and constants on the other.\n\nThe next source page shows the full workings: Example 1 gives $x=4$, and Example 2 gives $y=2$.',
    '**Unknown** — the variable value being found.  \n**Solve** — find the value(s) that make the equation true.',
    'These are the two exact exercises on the source slide. Their worked solutions appear on source page 11.',
    {
      recognition: 'For an equation like $3x+2=14$, undo addition/subtraction before multiplication/division. If the variable appears on both sides, move variable terms together first.',
    },
  ),
  explainedPage(
    11,
    'Equation examples — worked solutions',
    'Undo operations in reverse order while doing the same thing to both sides: Example 1 gives $x=4$ and Example 2 gives $y=2$.',
    '**Example 1: $3x+2=14$**\n\n1. Subtract 2 from both sides: $3x+2-2=14-2$, so $3x=12$.\n2. Divide both sides by 3: $\\frac{3x}{3}=\\frac{12}{3}$.\n3. Therefore $x=4$. Check: $3(4)+2=12+2=14$.\n\n**Example 2: $3y+3=y+7$**\n\n1. Subtract $y$ from both sides: $3y-y+3=y-y+7$, so $2y+3=7$.\n2. Subtract 3 from both sides: $2y=4$.\n3. Divide both sides by 2: $y=2$. Check: the left side is $3(2)+3=9$ and the right side is $2+7=9$.',
    '**Both sides** — the expressions to the left and right of the equals sign.  \n**Undoing an operation** — applying its inverse operation; subtraction undoes addition, and division undoes multiplication.',
    undefined,
    {
      recognition: 'If the variable appears on both sides, subtract one variable term from both sides first. Then undo the remaining addition and multiplication.',
      trap: 'When moving terms, keep equality balanced by applying the operation to both sides. The intermediate line $2y+3=7$ comes from subtracting $y$ from each side, not from simply deleting a term.',
    },
  ),
  explainedPage(
    12,
    'Solving inequalities — meaning and intervals',
    'An inequality compares expressions with $<$, $>$, $\\le$, or $\\ge$; its solution is a set of values that makes the comparison true.',
    'An inequality relates algebraic expressions rather than asserting that they are equal. The slide lists less than $<$, greater than $>$, less than or equal to $\\le$, and greater than or equal to $\\ge$.\n\nAn interval is a part of the real line that contains at least two numbers and every real number between any two of its members. Intervals can include or exclude their boundary values; the next pages give examples and notation.',
    '**Real line** — the line representing all real numbers.  \n**Interval** — a set of real numbers with no gaps between its members.  \n**$\\le$ / $\\ge$** — less than or equal to / greater than or equal to.',
    undefined,
    {
      recognition: 'A strict symbol ($<$ or $>$) excludes equality at the boundary. A symbol with a bar ($\\le$ or $\\ge$) includes equality.',
    },
  ),
  explainedPage(
    13,
    'Solving inequalities — examples and solution sets',
    'The solution set collects every value that makes the inequality true; many one-variable solutions form an interval.',
    'The slide gives two examples of intervals: $x>6$ describes all real numbers greater than 6, and $-2\\le x\\le5$ describes all real numbers from $-2$ through 5, including both endpoints.\n\nThe solution of an inequality is the set of all variable values that satisfy it. For $x>6$, the solution set is $(6,\\infty)$; for $-2\\le x\\le5$, it is $[-2,5]$.',
    '**Solution set** — all values that make an equation or inequality true.  \n**Endpoint** — a boundary value of an interval.',
    undefined,
    {
      recognition: 'Translate the comparison directly: $x>6$ shades to the right of 6, while $-2\\le x\\le5$ includes every point between and both endpoints.',
      trap: 'Do not include a boundary that a strict inequality excludes. The set $x>6$ does not contain 6.',
    },
  ),
  explainedPage(
    14,
    'Types of intervals — notation and number-line pictures',
    'Parentheses exclude an endpoint and square brackets include it; infinity always uses a parenthesis because it is not a real endpoint.',
    'The table pairs interval notation with an inequality and a number-line picture. An open circle means the endpoint is excluded; a filled circle means it is included.\n\n**Finite intervals**\n\n- $(a,b)=\\{x\\mid a<x<b\\}$: neither endpoint is included (open).\n- $[a,b]=\\{x\\mid a\\le x\\le b\\}$: both endpoints are included (closed).\n- $[a,b)=\\{x\\mid a\\le x<b\\}$ and $(a,b]=\\{x\\mid a<x\\le b\\}$: one endpoint is included and the other is excluded (half-open).\n\n**Intervals extending without bound**\n\n- $(a,\\infty)$ means $x>a$; $[a,\\infty)$ means $x\\ge a$.\n- $(-\\infty,b)$ means $x<b$; $(-\\infty,b]$ means $x\\le b$.\n- $(-\\infty,\\infty)$ is the set of all real numbers, also written $\\mathbb{R}$.\n\nThe arrows in the table show that the solution continues indefinitely in that direction.',
    '**$\\{x\\mid\\text{condition}\\}$** — “the set of all $x$ such that the condition is true.”  \n**Open / closed endpoint** — excluded / included endpoint.  \n**$\\infty$ and $-\\infty$** — directions without a last or first real number; neither is an endpoint that can be included.',
    undefined,
    {
      recognition: 'Read each endpoint separately: a square bracket matches $\\le$ or $\\ge$; a parenthesis matches $<$ or $>$. Use the arrow direction to tell whether the interval extends right or left.',
      trap: 'Never write a square bracket next to $\\infty$ or $-\\infty$. No real number is “infinity,” so an infinite direction is always open.',
    },
  ),
  explainedPage(
    15,
    'Inequality examples — set up Examples 3 and 4',
    'The two problems are $2x-1<x+3$ and $-\\frac{x}{3}<2x+1$; solve each, then express its answer as a real-line interval.',
    'These slides ask for both an algebraic solution and its number-line solution set. In Example 3, collect the $x$ terms on one side. In Example 4, first clear the denominator by multiplying both sides by 3, which is positive and therefore does not reverse the inequality.\n\nThe next source page shows the transformations and graphs: Example 3 has solution $x<4$, and Example 4 has solution $x>-\\frac{3}{7}$.',
    '**Solution set on the real line** — the set of satisfying values shown by shading in the appropriate direction.  \n**Strict inequality** — an inequality using $<$ or $>$, so its boundary is excluded.',
    'The source slide gives the exercises; their worked calculations and graphs appear on source page 16.',
    {
      recognition: 'When clearing a denominator in an inequality, check its sign. Multiplying by a positive number keeps the inequality direction; multiplying by a negative number reverses it.',
    },
  ),
  explainedPage(
    16,
    'Inequality examples — worked solutions and graphs',
    'Example 3 gives $x<4$ and Example 4 gives $x>-\\frac{3}{7}$; both boundaries are open because the original inequalities are strict.',
    '**Example 3: $2x-1<x+3$**\n\n1. Add 1 to both sides: $2x<x+4$.\n2. Subtract $x$ from both sides: $x<4$.\n3. Since 4 is excluded and all smaller values work, the solution is $(-\\infty,4)$. The graph has an open circle at 4 and shading to the left.\n\n**Example 4: $-\\frac{x}{3}<2x+1$**\n\n1. Multiply both sides by 3: $-x<6x+3$. The direction stays the same because 3 is positive.\n2. Add $x$ to both sides: $0<7x+3$.\n3. Subtract 3: $-3<7x$.\n4. Divide by 7, which is positive: $-\\frac{3}{7}<x$, or $x>-\\frac{3}{7}$.\n5. The solution is $(-\\frac{3}{7},\\infty)$, shown with an open circle at $-\\frac{3}{7}$ and shading right.',
    '**Open circle** — the boundary is not part of the solution.  \n**$(-\\infty,4)$** — every real number less than 4.  \n**$(-\\frac{3}{7},\\infty)$** — every real number greater than $-\\frac{3}{7}$.',
    undefined,
    {
      recognition: 'After isolating $x$, translate $x<c$ to an interval extending left and $x>c$ to one extending right. A strict inequality gets an open endpoint.',
      trap: 'Only reverse an inequality when multiplying or dividing by a negative number. Here the divisions are by 3 and 7, both positive, so the direction remains unchanged.',
    },
  ),
  explainedPage(
    17,
    'Absolute-value rules for equations and inequalities',
    'For positive $a$, $|x|=a$ gives two points; values with $|x|<a$ lie between $-a$ and $a$, while values with $|x|>a$ lie outside.',
    'The inset lists five rules for a positive number $a$. Absolute value measures distance from zero, so equal distance can occur on either side of zero.\n\n1. $|x|=a$ exactly when $x=a$ or $x=-a$, written $x=\\pm a$.\n2. $|x|<a$ exactly when $-a<x<a$: the distance is less than $a$, so $x$ lies inside the two boundary points.\n3. $|x|>a$ exactly when $x>a$ or $x<-a$: the distance is greater than $a$, so $x$ lies outside.\n4. $|x|\\le a$ exactly when $-a\\le x\\le a$: the boundary points are included.\n5. $|x|\\ge a$ exactly when $x\\ge a$ or $x\\le-a$: either outside boundary is included.\n\nThe word “or” in the outside cases means the solution is a union of two separate rays, not the interval between them.',
    '**$|x|$** — the absolute value of $x$, or its distance from zero.  \n**$\\pm a$** — the two values $+a$ and $-a$.  \n**Union ($\\cup$)** — combining two sets of values.',
    'The source states these rules for positive $a$. The conditions matter: these inside/outside patterns use a positive distance threshold.',
    {
      recognition: 'Look at the comparison sign: “less than” means between the two boundaries; “greater than” means on either outside branch. A strict sign leaves open endpoints; a bar under it includes them.',
      trap: 'For $|x|>a$ or $|x|\\ge a$, do not write $-a<x<a$. That describes values close to zero, while “greater than” means farther from zero.',
      analogy: 'On a number line, $|x|$ is how far you walk from 0, regardless of whether you walk left or right.',
    },
  ),
  explainedPage(
    18,
    'Absolute-value examples — equations and inequalities',
    'The slide asks you to solve $|2x-3|=7$ and $|2x-3|\\le1$; the first splits into two equations, and the second becomes a double inequality.',
    'The quantity inside the absolute-value bars is $2x-3$. For Example 5, set that quantity equal to both $7$ and $-7$, then solve each equation. For Example 6, use the “less than or equal to” rule from page 17 to write $-1\\le2x-3\\le1$, then isolate $x$.\n\nThe worked results on the next source slide are: Example 5, $x=5$ or $x=-2$; Example 6, $1\\le x\\le2$.',
    '**Inside expression** — the quantity between the absolute-value bars; here it is $2x-3$.  \n**Double inequality** — one statement that gives both a lower and upper bound.',
    'The source presents the two questions on page 18 and their solutions on page 19.',
    {
      recognition: 'An absolute value equal to a positive number has two branches. An absolute value less than or equal to a positive number turns into one bounded double inequality.',
    },
  ),
  explainedPage(
    19,
    'Absolute-value examples — worked solutions',
    'The equation $|2x-3|=7$ has solutions $x=5,-2$; the inequality $|2x-3|\\le1$ has solution interval $[1,2]$.',
    '**Example 5: $|2x-3|=7$**\n\nThe absolute-value equation means the inside can be 7 or $-7$.\n\n- $2x-3=7$: add 3 to get $2x=10$, then divide by 2 to get $x=5$.\n- $2x-3=-7$: add 3 to get $2x=-4$, then divide by 2 to get $x=-2$.\n\nCheck: $|2(5)-3|=|7|=7$ and $|2(-2)-3|=|-7|=7$.\n\n**Example 6: $|2x-3|\\le1$**\n\n1. Apply the inside rule: $-1\\le2x-3\\le1$.\n2. Add 3 to all three parts: $2\\le2x\\le4$.\n3. Divide all three parts by 2: $1\\le x\\le2$.\n4. Both endpoints are included, so the solution set is the closed interval $[1,2]$. The graph uses filled circles at 1 and 2.',
    '**Closed interval $[1,2]$** — all numbers from 1 through 2, including both endpoints.  \n**All three parts** — when adding or dividing a double inequality, apply the operation to the left bound, middle expression, and right bound.',
    undefined,
    {
      recognition: 'For $|A|=c$ with $c>0$, solve $A=c$ and $A=-c$. For $|A|\\le c$, place $A$ between $-c$ and $c$ and then isolate the variable.',
      trap: 'Do not keep only the positive branch in an absolute-value equation. The value $-2$ works because its inside expression is $-7$, whose distance from zero is 7.',
    },
  ),
  explainedPage(
    20,
    'Absolute-value inequality — set up Example 7',
    'Example 7 asks for $|2x-3|\\ge1$; because the distance is at least 1, the inside must be at least 1 or at most $-1$.',
    'Use the “greater than or equal to” rule from source page 17. It produces two cases: $2x-3\\ge1$ or $2x-3\\le-1$. Solve each case separately, then combine both solution rays. The worked algebra and graph appear on the next source page.',
    '**“Or”** — either branch can make the original inequality true.  \n**Ray** — part of the number line continuing in one direction from an endpoint.',
    'The source slide states the problem; its complete solution appears on source page 21.',
    {
      recognition: 'When $|A|\\ge c$ for positive $c$, split into the two outside cases $A\\ge c$ or $A\\le-c$.',
      trap: 'Do not combine the two cases with “and.” A value can be on the left side or the right side of the excluded middle region.',
    },
  ),
  explainedPage(
    21,
    'Absolute-value inequality — Example 7 solution',
    'The solution to $|2x-3|\\ge1$ is $x\\le1$ or $x\\ge2$, written $(-\\infty,1]\\cup[2,\\infty)$.',
    'Because the comparison is “at least 1,” apply the outside rule:\n\n- $2x-3\\ge1$: add 3 to get $2x\\ge4$, then divide by 2 to get $x\\ge2$.\n- $2x-3\\le-1$: add 3 to get $2x\\le2$, then divide by 2 to get $x\\le1$.\n\nCombine the two branches with a union: $(-\\infty,1]\\cup[2,\\infty)$. The graph fills the rays to the left of 1 and right of 2 and uses filled endpoints because equality is allowed. Values strictly between 1 and 2 do not satisfy the inequality.',
    '**$\\cup$** — union, meaning values in either interval.  \n**$(-\\infty,1]$** — all real numbers at most 1.  \n**$[2,\\infty)$** — all real numbers at least 2.',
    undefined,
    {
      recognition: 'Solve each branch, translate $x\\le c$ to a leftward ray and $x\\ge c$ to a rightward ray, then join the two intervals with $\\cup$.',
      trap: 'Since the original symbol is $\\ge$, include the boundary values 1 and 2. The number-line graph must use filled endpoints.',
    },
  ),
  explainedPage(
    22,
    'Check Your Knowledge — solve four inequalities',
    'The four practice solutions are $x>-\\frac{2}{3}$, $x>-\\frac{3}{11}$, $\\frac{1}{3}<x<\\frac{1}{2}$, and $x\\le1$ or $x\\ge4$.',
    'These are the four exact exercises printed on the slide. The working below is supplied to help check each one; the interval notation and endpoint choice come from the original inequality signs.\n\n**1. $-3-6x<1$**\n\nAdd 3 to both sides: $-6x<4$. Divide by $-6$ and reverse the inequality: $x>-\\frac{2}{3}$. The solution is $(-\\frac{2}{3},\\infty)$.\n\n**2. $2-7x<5+4x$**\n\nSubtract 2: $-7x<3+4x$. Subtract $4x$: $-11x<3$. Divide by $-11$ and reverse the inequality: $x>-\\frac{3}{11}$. The solution is $(-\\frac{3}{11},\\infty)$.\n\n**3. $\\left|5-\\frac{2}{x}\\right|<1$**\n\nFirst note $x\\ne0$, since the fraction is undefined at zero. If $x<0$, then $2/x<0$, so $5-2/x>5$; its absolute value is greater than 1, and there are no negative solutions. For $x>0$, use the inside rule:\n\n$-1<5-\\frac{2}{x}<1$.\n\nSubtract 5: $-6<-\\frac{2}{x}<-4$. Since $x>0$, multiply through by $x$ without reversing either inequality: $-6x<-2<-4x$. Solve both sides: dividing $-6x<-2$ by $-6$ gives $x>\\frac13$; dividing $-2<-4x$ by $-4$ gives $x<\\frac12$. Therefore $\\frac13<x<\\frac12$, or $(\\frac13,\\frac12)$.\n\n**4. $|2x-5|\\ge3$**\n\nSplit into outside cases: $2x-5\\ge3$ or $2x-5\\le-3$. The first gives $2x\\ge8$, so $x\\ge4$. The second gives $2x\\le2$, so $x\\le1$. The solution is $(-\\infty,1]\\cup[4,\\infty)$.',
    '**Reverse the inequality** — when multiplying or dividing both sides by a negative number, switch $<$ to $>$ (and $\\le$ to $\\ge$), or vice versa.  \n**Domain restriction** — a value such as $x=0$ that must be excluded because it makes an expression undefined.',
    'The PDF shows the four questions but no answers. These solutions are worked from the printed expressions and are not presented as an official answer key.',
    {
      recognition: 'For ordinary linear inequalities, isolate $x$ and watch for division by a negative. For $|A|<c$, put $A$ between $-c$ and $c$; for $|A|\\ge c$, split into two outside cases.',
      trap: 'In question 3, keep the restriction $x\\ne0$ and check the sign of $x$ before multiplying through by it. Multiplication by a negative value would reverse the inequality, so the positive and negative cases cannot be mixed.',
    },
  ),
  {
    sourcePage: 23,
    title: 'Thank You — closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'The closing slide shows the EELU logo and “Thank you for watching” / “Questions?” It adds no mathematics content.',
  },
];

export const mathematics1Lecture2Lesson: Lesson = {
  id: 'mathematics-1-lecture-2-current',
  courseId: 'mathematics-1',
  sourceKey: 'current:mathematics-1:lecture 2 math 1.pdf',
  sourcePath: 'The Lectures i downloaded this term recently/lecture 2 math 1.pdf',
  title: 'Lecture 2: Algebra, Equations, Inequalities, Absolute Values, and Intervals',
  sourcePageCount: 23,
  pages,
  lastReviewed: '2026-10-14',
};
