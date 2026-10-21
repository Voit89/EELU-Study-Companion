import type { Lesson, LessonPage } from '../types';

interface TeachingNotes {
  recognition?: string;
  trap?: string;
  note?: string;
}

function md(...lines: string[]): string {
  return lines.join('\n');
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  teaching: TeachingNotes = {},
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (teaching.recognition) {
    blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: teaching.recognition });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: explanation });
  if (teaching.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: teaching.trap });
  }
  return {
    sourcePage,
    title,
    coverage: 'explained',
    blocks,
    ...(teaching.note ? { note: teaching.note } : {}),
  };
}

const pages: LessonPage[] = [
  {
    sourcePage: 1,
    title: 'Logic — lecture map',
    coverage: 'visual-only',
    blocks: [],
    note: 'This opening slide names propositional logic, first-order logic, quantifiers, and proof methods, with pictures suggesting reasoning puzzles. It is an orientation slide and introduces no rule that needs a worked explanation.',
  },
  explainedPage(
    2,
    'Statements and propositions',
    'A proposition is a sentence with one definite truth value: true or false. If the truth changes with unspecified variables, the expression is not yet a proposition.',
    md(
      '**Definition.** A statement, or proposition, is a declarative sentence that is either true or false.',
      '',
      '- $2+2=4$ is a true proposition.',
      '- $3\\times3=8$ is a false proposition. It is still a proposition because its truth value is definite.',
      '- “787009911 is a prime” is also a proposition: it has a definite truth value, even if we have not checked it yet.',
      '- $x+y>0$ and $x^2+y^2=z^2$ are not propositions while the variables are unspecified. They can be true for some choices and false for others.',
      '',
      'Once specific values are assigned to the variables, the last expressions become ordinary statements that can be checked.'
    ),
    {
      recognition: 'Ask: could this whole sentence already be labeled true or false without choosing a missing value? If yes, it is a proposition.',
      trap: 'A sentence does not stop being a proposition just because you do not know whether it is true. The key is whether it has a definite truth value.',
    },
  ),
  explainedPage(
    3,
    'The three basic logic operators',
    'NOT flips a truth value, AND is true only when both inputs are true, and inclusive OR is true when at least one input is true.',
    md(
      'The slide uses $p$ and $q$ as statement variables. $T$ means true and $F$ means false.',
      '',
      '| $p$ | $q$ | $p\\land q$ (AND) | $p\\lor q$ (OR) |',
      '| --- | --- | --- | --- |',
      '| T | T | T | T |',
      '| T | F | F | T |',
      '| F | T | F | T |',
      '| F | F | F | F |',
      '',
      '$\\neg p$ (also written $\\sim p$) means “not $p$”: it is true exactly when $p$ is false. The tables show that OR here is inclusive: when both statements are true, $p\\lor q$ is true too.'
    ),
    {
      recognition: 'For AND, look for the one all-true row. For OR, look for the one all-false row. NOT simply reverses T and F.',
      trap: 'Do not read $p\\lor q$ as “exactly one.” Exactly one is exclusive OR, introduced later.',
    },
  ),
  explainedPage(
    4,
    'Turn everyday sentences into compound statements',
    'Choose a short name for each basic statement, then join or negate those names to match the English sentence.',
    md(
      'The slide defines $p$ as “it is hot” and $q$ as “it is sunny.” It then translates:',
      '',
      '- “It is hot and sunny” becomes $p\\land q$.',
      '- “It is not hot but sunny” becomes $\\neg p\\land q$. Here “but” still means AND; it adds contrast in English, not a new logic operator.',
      '- “It is neither hot nor sunny” becomes $\\neg p\\land\\neg q$. Both statements are false.',
      '',
      'This translation step is useful because the truth-table rules apply to the symbols after the sentence has been split into its basic claims.'
    ),
    {
      recognition: 'Underline each basic claim, assign a letter, and translate words such as “not,” “and,” and “or” one at a time.',
      trap: '“But” usually connects claims with AND. “Neither … nor …” negates both claims and joins them with AND.',
    },
  ),
  explainedPage(
    5,
    'De Morgan’s laws — negating AND and OR',
    'When you negate a compound statement, negate each part and switch AND with OR: NOT(AND) becomes OR of the NOTs; NOT(OR) becomes AND of the NOTs.',
    md(
      'The slide defines logical equivalence as having the same truth table, then gives two reusable laws:',
      '',
      '- $\\neg(p\\land q)\\equiv\\neg p\\lor\\neg q$. “Tom is on the football team and the basketball team” is false if he is missing from either team.',
      '- $\\neg(p\\lor q)\\equiv\\neg p\\land\\neg q$. “The number is divisible by 7 or 11” is false only if it is divisible by neither: not by 7 AND not by 11.',
      '',
      'The symbol $\\equiv$ says the expressions are logically equivalent, not that the symbols on each side are written in the same way.'
    ),
    {
      recognition: 'For a negation, move it inward one part at a time and switch $\\land$ to $\\lor$, or $\\lor$ to $\\land$.',
      trap: 'Do not negate each part and leave the connecting operator unchanged. The operator must switch.',
    },
  ),
  explainedPage(
    6,
    'Check De Morgan’s law with a truth table',
    'The two columns for $\\neg(p\\land q)$ and $\\neg p\\lor\\neg q$ match on all four input rows, so the expressions are equivalent.',
    md(
      'Read the rows in the order $TT, TF, FT, FF$. The source table gives the same output for both sides:',
      '',
      '| $p$ | $q$ | $\\neg(p\\land q)$ | $\\neg p\\lor\\neg q$ |',
      '| --- | --- | --- | --- |',
      '| T | T | F | F |',
      '| T | F | T | T |',
      '| F | T | T | T |',
      '| F | F | T | T |',
      '',
      'For the second law, $\\neg(p\\lor q)$ is true only in the $FF$ row. So is $\\neg p\\land\\neg q$: both inputs must be false. The matching truth values verify both laws.'
    ),
    {
      recognition: 'To verify equivalence by table, compute each expression column and compare the two final columns row by row.',
      trap: 'One matching row is not enough. Logical equivalence requires matching outputs for every possible input row.',
    },
  ),
  explainedPage(
    7,
    'Simplify a compound statement one law at a time',
    'The expression $\\neg(\\neg p\\land q)\\land(p\\lor q)$ simplifies to $p$; each replacement uses an equivalence law, so the truth value is preserved.',
    md(
      'Follow the source from top to bottom:',
      '',
      '1. $\\neg(\\neg p\\land q)\\land(p\\lor q)$',
      '2. $\\equiv(\\neg\\neg p\\lor\\neg q)\\land(p\\lor q)$ — De Morgan’s law.',
      '3. $\\equiv(p\\lor\\neg q)\\land(p\\lor q)$ — double negation, $\\neg\\neg p\\equiv p$.',
      '4. $\\equiv p\\lor(\\neg q\\land q)$ — distributive law, factoring the common $p$.',
      '5. $\\equiv p\\lor\\text{False}$ — $\\neg q\\land q$ can never be true.',
      '6. $\\equiv p$ — OR with false leaves the other statement unchanged.',
      '',
      'The equivalence sign on each line means the new line has the same truth values as the one above it.'
    ),
    {
      recognition: 'When simplifying, choose one matching law, rewrite only the needed part, and keep a reason beside every step.',
      trap: 'Do not skip from the first line straight to $p$ when learning the method. The intermediate lines show why the result follows.',
    },
  ),
  explainedPage(
    8,
    'Exclusive OR from its true rows',
    'Exclusive OR, $p\\oplus q$, is true when exactly one input is true. The two true rows produce $(p\\land\\neg q)\\lor(\\neg p\\land q)$.',
    md(
      'The truth table is false for $TT$ and $FF$, and true for $TF$ and $FT$. To write a formula from the true rows:',
      '',
      '- The $TF$ row is described by $p\\land\\neg q$: $p$ is true and $q$ is false.',
      '- The $FT$ row is described by $\\neg p\\land q$: $p$ is false and $q$ is true.',
      '- Either true row is enough, so join the row descriptions with OR: $$(p\\land\\neg q)\\lor(\\neg p\\land q).$$',
      '',
      'This is the “coffee or tea” meaning of exclusive OR: choose one, but not both.'
    ),
    {
      recognition: 'To build a formula from true rows, write one AND-condition for each true row, then join those row-conditions with OR.',
      trap: 'An exclusive OR is not the same as inclusive OR: the $TT$ row must be false.',
    },
  ),
  explainedPage(
    9,
    'Exclusive OR by excluding the false rows',
    'Another formula for exclusive OR says the inputs are not both true and are not both false: $\\neg(p\\land q)\\land\\neg(\\neg p\\land\\neg q)$.',
    md(
      'The false rows are $TT$ and $FF$.',
      '',
      '- “Not the $TT$ row” is $\\neg(p\\land q)$.',
      '- “Not the $FF$ row” is $\\neg(\\neg p\\land\\neg q)$.',
      '- Both exclusions must hold, so join them with AND: $$\\neg(p\\land q)\\land\\neg(\\neg p\\land\\neg q).$$',
      '',
      'That leaves only $TF$ and $FT$, exactly the two rows where exclusive OR is true.'
    ),
    {
      recognition: 'When a formula must be true outside every false row, describe each false row, negate it, and require all exclusions with AND.',
      trap: 'The row descriptions use AND inside each row. The exclusions of the separate rows are then joined by AND.',
    },
  ),
  explainedPage(
    10,
    'Check an exclusive-OR formula for equivalence',
    'The candidate formula $(p\\lor q)\\land\\neg(p\\land q)$ matches $p\\oplus q$ in every truth-table row.',
    md(
      'The candidate formula combines two requirements:',
      '',
      '1. $p\\lor q$: at least one input is true.',
      '2. $\\neg(p\\land q)$: the two inputs are not both true.',
      '',
      'Both requirements hold together only in rows $TF$ and $FT$. The source table shows its final column $F,T,T,F$, matching the $p\\oplus q$ column exactly. This is the guess-and-check method for logical equivalence.',
      '',
      'A truth table is a direct check: make columns for the inputs, each component, and the candidate; compare the candidate output with the target output.'
    ),
    {
      recognition: 'For “exactly one,” combine “at least one” with “not both.”',
      trap: 'Matching just the two true rows is insufficient if the candidate accidentally becomes true in a false row; compare all four.',
    },
  ),
  explainedPage(
    11,
    'Read a digital circuit as a truth table',
    'The circuit uses OR and AND/NOT gates to produce a sum bit and a carry bit. Its truth table is another way to specify the same input-output behavior.',
    md(
      'The inputs are $p$ and $q$. The circuit sends them through logic gates and labels its two outputs “sum” and “carry.” The table reads:',
      '',
      '| $p$ | $q$ | sum | carry |',
      '| --- | --- | --- | --- |',
      '| 1 | 1 | 0 | 1 |',
      '| 1 | 0 | 1 | 0 |',
      '| 0 | 1 | 1 | 0 |',
      '| 0 | 0 | 0 | 0 |',
      '',
      'From the table, $\\text{sum}=p\\oplus q$ and $\\text{carry}=p\\land q$. For example, $1+1$ gives a sum bit of 0 and carries 1 into the next binary place. The point of the slide is that a circuit can be converted into a truth table, and a desired truth table can guide construction of a matching formula or circuit.'
    ),
    {
      recognition: 'Read the output columns first; then identify which Boolean expression has exactly those output values.',
      trap: 'The circuit has two separate outputs. Do not confuse the sum bit with the carry bit.',
      note: 'The source does not name the circuit. The sum/carry interpretation follows its visible labels and truth table.',
    },
  ),
  explainedPage(
    12,
    'Tautologies, contradictions, and satisfiability',
    'A tautology is true on every input row; a contradiction is false on every row. To show a formula is not a contradiction, one satisfying row is enough.',
    md(
      '$p\\lor\\neg p$ is always true: either $p$ is true, or its negation is. This is a tautology.',
      '',
      '$p\\land\\neg p$ is always false because $p$ and NOT $p$ cannot both be true. This is a contradiction, the negation of a tautology.',
      '',
      'The longer expressions on the slide list all four possible combinations of $p$ and $q$. Their disjunctive form is true in every row, and their conjunctive form fails in every row.',
      '',
      'The slide connects this idea to the satisfiability problem in computer science: determine whether there is any assignment of truth values that makes a statement true.'
    ),
    {
      recognition: '“Always true” means every row is T. “Always false” means every row is F. “Satisfiable” means at least one row is T.',
      trap: 'One false row disproves a tautology, but one true row is enough to disprove that a formula is a contradiction.',
    },
  ),
  explainedPage(
    13,
    'Exercises — equivalence and negations',
    'Use De Morgan’s laws and endpoint logic: the two compound statements in Exercise 1 are equivalent, and each inequality negation reverses its boundary inclusions.',
    md(
      '**1. Compare the statements.**',
      '',
      '- (a) $x<2\\lor\\neg(1<x<3)$. The negation of $1<x<3$ is $x\\le1\\lor x\\ge3$. So (a) becomes $x<2\\lor x\\le1\\lor x\\ge3$, which simplifies to $x<2\\lor x\\ge3$ because $x\\le1$ is already included in $x<2$.',
      '- (b) $x\\le1\\lor x<2\\lor x\\ge3$ also simplifies to $x<2\\lor x\\ge3$. Therefore (a) and (b) are logically equivalent.',
      '',
      '**2. Write each negation.**',
      '',
      '- $-2<x<7$ becomes $x\\le-2\\lor x\\ge7$.',
      '- $x<2\\lor x>5$ becomes $x\\ge2\\land x\\le5$.',
      '- $x\\le-1\\lor x>1$ becomes $x>-1\\land x\\le1$.',
      '- $1>x\\ge-3$, or $-3\\le x<1$, becomes $x<-3\\lor x\\ge1$.'
    ),
    {
      recognition: 'Negating “between two bounds” means being at or beyond one endpoint. A strict bound becomes inclusive at the boundary after negation.',
      trap: 'Keep AND/OR straight: the negation of a condition requiring both bounds uses OR; the negation of an OR statement uses AND.',
    },
  ),
  explainedPage(
    14,
    'Reference table — common logical equivalences',
    'Use this page as a law sheet: the laws let you replace a statement with another that has the same truth table.',
    md(
      'In this table, $t$ means a tautology (always true) and $c$ means a contradiction (always false). The source lists:',
      '',
      '| Law | AND form | OR form |',
      '| --- | --- | --- |',
      '| Commutative | $p\\land q\\equiv q\\land p$ | $p\\lor q\\equiv q\\lor p$ |',
      '| Associative | $(p\\land q)\\land r\\equiv p\\land(q\\land r)$ | $(p\\lor q)\\lor r\\equiv p\\lor(q\\lor r)$ |',
      '| Distributive | $p\\land(q\\lor r)\\equiv(p\\land q)\\lor(p\\land r)$ | $p\\lor(q\\land r)\\equiv(p\\lor q)\\land(p\\lor r)$ |',
      '| Identity | $p\\land t\\equiv p$ | $p\\lor c\\equiv p$ |',
      '| Negation | $p\\land\\neg p\\equiv c$ | $p\\lor\\neg p\\equiv t$ |',
      '| Double negative | $\\neg(\\neg p)\\equiv p$ |  |',
      '| Idempotent | $p\\land p\\equiv p$ | $p\\lor p\\equiv p$ |',
      '| Universal bound | $p\\land c\\equiv c$ | $p\\lor t\\equiv t$ |',
      '| De Morgan | $\\neg(p\\land q)\\equiv\\neg p\\lor\\neg q$ | $\\neg(p\\lor q)\\equiv\\neg p\\land\\neg q$ |',
      '| Absorption | $p\\land(p\\lor q)\\equiv p$ | $p\\lor(p\\land q)\\equiv p$ |',
      '| Negating constants | $\\neg c\\equiv t$ | $\\neg t\\equiv c$ |',
      '',
      'The same law may be used from left to right or right to left. For example, distributivity can expand a formula or factor a common part.'
    ),
    {
      recognition: 'Before changing a formula, identify its shape: a repeated term may signal idempotence or absorption; a negation outside parentheses may signal De Morgan.',
      trap: 'Do not swap the meanings of $t$ and $c$: $t$ is always true and $c$ is always false.',
      note: 'This slide is a compact reference. The names and formulas above follow the visible theorem table.',
    },
  ),
  explainedPage(
    15,
    'Set up an equivalence proof by replacing parts',
    'To prove the left expression is equivalent to $p$, replace one subexpression at a time using a named law; the source works through the result on the next page.',
    md(
      'The target is $\\neg(\\neg p\\land q)\\land(p\\lor q)\\equiv p$.',
      '',
      'A replacement by a logical equivalence preserves the truth table of the whole expression. The method is to find a useful law inside the current formula, substitute its equivalent form, and repeat until the result is the expression on the right.',
      '',
      'The next slide applies De Morgan’s law, double negation, distributivity, the contradiction law, and the identity law.'
    ),
    {
      recognition: 'When asked to “verify an equivalence,” annotate every transformation with the law that justifies it.',
      trap: 'Do not merely state that the first and last expressions match. The exercise is asking for a chain of valid replacements.',
    },
  ),
  explainedPage(
    16,
    'Worked equivalence proof — finish the simplification',
    'The worked chain reaches $p$ without changing truth values at any step.',
    md(
      'Here is every step from the slide:',
      '',
      '1. $\\neg(\\neg p\\land q)\\land(p\\lor q)$',
      '2. $\\equiv(\\neg(\\neg p)\\lor\\neg q)\\land(p\\lor q)$ — De Morgan’s law.',
      '3. $\\equiv(p\\lor\\neg q)\\land(p\\lor q)$ — double negative.',
      '4. $\\equiv p\\lor(\\neg q\\land q)$ — distributive law.',
      '5. $\\equiv p\\lor(q\\land\\neg q)$ — commutativity of AND.',
      '6. $\\equiv p\\lor c$ — a statement AND its negation is false.',
      '7. $\\equiv p$ — identity law for OR.',
      '',
      'Because each adjacent pair is equivalent, the original expression is equivalent to $p$.'
    ),
    {
      recognition: 'The law name should match the exact local pattern being changed, not just the overall formula.',
      trap: 'A chain is only as trustworthy as its individual steps. Check the parentheses before applying a law.',
    },
  ),
  explainedPage(
    17,
    'Exercises — derive equivalences and name each law',
    'The first two chains factor a common statement; the remaining exercises use the same reference laws, especially absorption, De Morgan, distributivity, and contradiction.',
    md(
      '**1.** $(p\\land\\neg q)\\lor(p\\land q)$',
      '',
      '- $\\equiv p\\land(\\neg q\\lor q)$ — distributive law.',
      '- $\\equiv p\\land(q\\lor\\neg q)$ — commutative law.',
      '- $\\equiv p\\land t$ — negation law.',
      '- $\\equiv p$ — identity law.',
      '',
      '**2.** $(p\\lor\\neg q)\\land(\\neg p\\lor\\neg q)$',
      '',
      '- $\\equiv(\\neg q\\lor p)\\land(\\neg q\\lor\\neg p)$ — commutative law.',
      '- $\\equiv\\neg q\\lor(p\\land\\neg p)$ — distributive law.',
      '- $\\equiv\\neg q\\lor c$ — negation law.',
      '- $\\equiv\\neg q$ — identity law.',
      '',
      '**The remaining displayed results:**',
      '',
      '3. $(p\\land\\neg q)\\lor p\\equiv p$ — absorption.',
      '4. $\\neg(p\\lor\\neg q)\\lor(\\neg p\\land\\neg q)\\equiv\\neg p$ — De Morgan, then factor $\\neg p$ and use $q\\lor\\neg q\\equiv t$.',
      '5. $\\neg((\\neg p\\land q)\\lor(\\neg p\\land\\neg q))\\lor(p\\land q)\\equiv p$ — factor the inner $\\neg p$, use $q\\lor\\neg q\\equiv t$, then absorption.',
      '6. $(p\\land\\neg(\\neg p\\lor q))\\lor(p\\land q)\\equiv p$ — De Morgan and double negation reduce the first term to $p\\land\\neg q$; then factor $p$ and use $\\neg q\\lor q\\equiv t$.',
      '7. $p\\land(\\neg q\\lor p)\\equiv p$ — absorption.'
    ),
    {
      recognition: 'Look for a repeated outer term to factor, then simplify a term such as $q\\lor\\neg q$ to true or $q\\land\\neg q$ to false.',
      trap: 'The exercise asks for a reason at every step. A correct final expression alone does not explain which law was applied.',
      note: 'The source leaves exercises 3–7 for the student; the listed one-line justifications are supplemental worked guidance derived from the printed formulas.',
    },
  ),
  {
    sourcePage: 18,
    title: 'Propositional logic — section divider',
    coverage: 'visual-only',
    blocks: [],
    note: 'This slide only labels the next section “Propositional Logic (Zero-order logic).” It introduces no new definition or worked example.',
  },
  explainedPage(
    19,
    'Conditional statement — if p then q',
    'A conditional $p\\to q$ is false in exactly one case: $p$ is true and $q$ is false. If the hypothesis is false, the conditional is true by the course convention.',
    md(
      'In “if $p$ then $q$,” $p$ is the **hypothesis** (the condition) and $q$ is the **conclusion** (what is promised if the condition holds).',
      '',
      'For “If your GPA is 4.0, then you do not need to pay tuition,” the promise is broken when GPA is 4.0 but tuition is still due. If GPA is below 4.0, the sentence is not broken: its condition did not occur.',
      '',
      'For “If there is a bandh today, then there is no class,” the false case is: there is a bandh and class is not cancelled.'
    ),
    {
      recognition: 'To test an if-then claim, search for a case where the condition is true but the promised result is false.',
      trap: 'A false hypothesis does not make a conditional false. Only the $T,F$ row violates the promise.',
    },
  ),
  explainedPage(
    20,
    'Exercise — translate sufficient conditions',
    '“A is sufficient for B” means that A guarantees B, so write “if A, then B.”',
    md(
      '1. “Catching the 8:05 bus is a sufficient condition for my being on time for work” becomes: **If I catch the 8:05 bus, then I will be on time for work.**',
      '',
      '2. “Having two 45° angles is a sufficient condition for this triangle to be a right triangle” becomes: **If this triangle has two 45° angles, then it is a right triangle.** The third angle is $180°-45°-45°=90°$.',
      '',
      'The first phrase after “if” is the condition being offered as enough to guarantee the result.'
    ),
    {
      recognition: 'Translate “A is sufficient for B” as $A\\to B$.',
      trap: 'Do not reverse the arrow: “A is sufficient for B” does not mean that B guarantees A.',
      note: 'The 90° calculation spells out why the second printed condition yields a right triangle.',
    },
  ),
  explainedPage(
    21,
    'Truth table for implication',
    'The implication table has outputs $T,F,T,T$ for rows $TT,TF,FT,FF$. Only true-to-false breaks an if-then promise.',
    md(
      '| $p$ | $q$ | $p\\to q$ |',
      '| --- | --- | --- |',
      '| T | T | T |',
      '| T | F | F |',
      '| F | T | T |',
      '| F | F | T |',
      '',
      'The slide states the convention in everyday terms: if nothing wrong with the promise has happened, it is counted as true. “Nothing wrong” means we have not seen $p$ true together with $q$ false.'
    ),
    {
      recognition: 'For $p\\to q$, mark the $TF$ row as false and all other rows true.',
      trap: 'Implication is not the same as cause-and-effect language. Its formal truth table is the rule used here.',
    },
  ),
  explainedPage(
    22,
    'Three ways to analyze a conditional equivalence',
    'For a question such as $p\\to q\\equiv?$, the lecture offers a truth table, known logical rules, or intuition.',
    md(
      '1. **Truth table:** compare the output columns for every input row.',
      '2. **Logical rules:** rewrite the conditional using established equivalences, such as $p\\to q\\equiv\\neg p\\lor q$.',
      '3. **Intuition:** interpret what the conditional promises and find the case that would break it.',
      '',
      'The first two give systematic checks. Intuition is helpful for understanding, but a formal proof should still show why the equivalence holds.'
    ),
    {
      recognition: 'Choose a truth table when there are few variables; choose a law-based rewrite when a known identity fits the expression.',
    },
  ),
  explainedPage(
    23,
    'Rewrite “if p then q” as an OR statement',
    'A conditional fails only when $p\\land\\neg q$ happens, so $p\\to q\\equiv\\neg(p\\land\\neg q)\\equiv\\neg p\\lor q$.',
    md(
      'Start with the only false row of $p\\to q$: $p$ is true and $q$ is false, written $p\\land\\neg q$. To describe all the rows where the conditional is true, exclude that one combination:',
      '',
      '$$p\\to q\\equiv\\neg(p\\land\\neg q)\\equiv\\neg p\\lor q.$$',
      '',
      'For “If you do not give me all your money, then I will kill you,” let $p$ mean “you give me all your money” and $q$ mean “I will kill you.” The conditional is $\\neg p\\to q$, equivalent to $p\\lor q$: “Either you give me all your money or I will kill you, or both.”',
      '',
      'Likewise, “If you talk to her, then you can never talk to me” is equivalent to “Either you do not talk to her or you can never talk to me.”'
    ),
    {
      recognition: 'Translate implication as “not the case that the condition is true and the result is false.”',
      trap: 'The OR in $\\neg p\\lor q$ is inclusive. Both parts may be true.',
    },
  ),
  explainedPage(
    24,
    'Negate an if-then statement',
    'The negation of $p\\to q$ is $p\\land\\neg q$: the condition happens and the promised result fails.',
    md(
      'Using the previous slide and De Morgan’s law:',
      '',
      '$$\\neg(p\\to q)\\equiv\\neg(\\neg p\\lor q)\\equiv\\neg\\neg p\\land\\neg q\\equiv p\\land\\neg q.$$',
      '',
      'So the GPA statement is false exactly when the GPA is 4.0 AND tuition is still required. The computer statement “If my computer is not working, then I cannot finish my homework” is false when the computer is not working AND I can finish the homework.',
      '',
      'The word “but” in the second counterexample still connects the two facts with AND.'
    ),
    {
      recognition: 'Negate a conditional by keeping its hypothesis and negating its conclusion.',
      trap: 'Do not negate both parts. The correct form is $p\\land\\neg q$, not $\\neg p\\land q$.',
    },
  ),
  explainedPage(
    25,
    'Translate a fault argument into symbols',
    'Let $H$ mean hardware fault and $S$ software fault. The claim is: $S\\lor H$, $\\neg H$, therefore $S$.',
    md(
      'The narrative says the fault is either hardware or software, then rules out hardware. In symbols:',
      '',
      '- $S\\lor H$: at least one kind of fault is present.',
      '- $\\neg H$: there is no hardware fault.',
      '- Therefore $S$: there is a software fault.',
      '',
      'The symbol $\\vdash$ in $S\\lor H,\\ \\neg H\\vdash S$ separates the assumptions from the proposed conclusion. The next slide fills in a proof using equivalence and implication elimination.'
    ),
    {
      recognition: 'Before selecting a proof rule, assign a symbol to each complete claim and write the assumptions separately from the conclusion.',
      trap: 'The conclusion is not simply “one of the two faults exists.” It is specifically $S$, obtained after $H$ is ruled out.',
    },
  ),
  explainedPage(
    26,
    'Worked proof — rule out the hardware fault',
    'Commutativity and double negation turn $S\\lor H$ into an implication whose antecedent is $\\neg H$; applying that implication yields $S$.',
    md(
      'The completed proof on the slide is:',
      '',
      '1. $S\\lor H$ — hypothesis.',
      '2. $H\\lor S$ — commutativity of OR on line 1.',
      '3. $\\neg\\neg H\\lor S$ — double negation on line 2.',
      '4. $\\neg H\\to S$ — conditional equivalence $p\\to q\\equiv\\neg p\\lor q$, with $p=\\neg H$ and $q=S$.',
      '5. $\\neg H$ — hypothesis.',
      '6. $S$ — apply implication elimination to lines 4 and 5.',
      '',
      'The key is to make the known fact $\\neg H$ the antecedent of a conditional that concludes $S$.'
    ),
    {
      recognition: 'When you know $\\neg H$ and need $S$, try rewriting a disjunction as an implication with antecedent $\\neg H$.',
      trap: 'To use implication elimination, the known statement must match the conditional antecedent exactly.',
    },
  ),
  explainedPage(
    27,
    'Exercise — negate conditional statements',
    'For each conditional, preserve the whole “if” clause and negate the whole “then” clause: $\\neg(p\\to q)=p\\land\\neg q$.',
    md(
      'Applying that pattern to each printed statement:',
      '',
      '- (a) $P$ is a square, and $P$ is not a rectangle.',
      '- (b) Today is New Year’s Eve, and tomorrow is not January.',
      '- (c) The decimal expansion of $r$ is terminating, and $r$ is not rational.',
      '- (d) $n$ is prime, and it is not the case that $n$ is odd or $n=2$. By De Morgan, this is: $n$ is prime, $n$ is not odd, and $n\\ne2$.',
      '- (e) $x$ is nonnegative, and it is not the case that $x$ is positive or $x=0$. This cannot happen for a real $x$, so the original conditional has no counterexample.',
      '- (f) Tom is Ann’s father, and either Jim is not her uncle or Sue is not her aunt.',
      '- (g) $n$ is divisible by 6, and either it is not divisible by 2 or it is not divisible by 3.',
      '',
      'For (f) and (g), the result part contains AND, so negating the result changes that AND into OR.'
    ),
    {
      recognition: 'First bracket the entire consequent. Negate that bracket with De Morgan’s laws if it contains more than one claim.',
      trap: 'The original statements are conditionals; their negations are counterexamples, so the antecedent remains true.',
    },
  ),
  explainedPage(
    28,
    'Contrapositive — reverse the order and negate both parts',
    'The contrapositive of $p\\to q$ is $\\neg q\\to\\neg p$. A conditional and its contrapositive are logically equivalent.',
    md(
      'The slide applies the rule to an AI-year-1 example: “If you are an AI year 1 student, then you are taking MTH1101” becomes “If you are not taking MTH1101, then you are not an AI year 1 student.”',
      '',
      'It also gives the integer example: “If $x^2$ is even, then $x$ is even” becomes “If $x$ is odd, then $x^2$ is odd.” The contrapositive keeps the original meaning while changing the form.',
      '',
      'The square example assumes $x$ is an integer; otherwise “odd” and “even” are not defined for arbitrary real values.'
    ),
    {
      recognition: 'To form the contrapositive, swap the hypothesis and conclusion, then negate each one: $p\\to q$ becomes $\\neg q\\to\\neg p$.',
      trap: 'This is not the converse $q\\to p$. Do not reverse the order without also negating both claims.',
    },
  ),
  explainedPage(
    29,
    'Truth-table proof of the contrapositive law',
    'The columns for $p\\to q$ and $\\neg q\\to\\neg p$ match row by row, confirming that the conditional is equivalent to its contrapositive.',
    md(
      '| $p$ | $q$ | $p\\to q$ | $\\neg q$ | $\\neg p$ | $\\neg q\\to\\neg p$ |',
      '| --- | --- | --- | --- | --- | --- |',
      '| T | T | T | F | F | T |',
      '| T | F | F | T | F | F |',
      '| F | T | T | F | T | T |',
      '| F | F | T | T | T | T |',
      '',
      'The matching output columns prove equivalence. The bottom line of the source also rewrites the conditional as $\\neg p\\lor q$, then $q\\lor\\neg p$, and finally as $\\neg q\\to\\neg p$.'
    ),
    {
      recognition: 'To verify the contrapositive rule, compare only the two final conditional columns after filling their component columns.',
      trap: 'The truth values of $p$ and $q$ change across rows, but the two complete conditional expressions still match.',
    },
  ),
  explainedPage(
    30,
    'Worked examples — write the contrapositive',
    'Negate the result first, then the condition: “If A then B” becomes “If not B then not A.”',
    md(
      '- Original: If Howard can swim across the lake, then he can swim to the island. Contrapositive: **If Howard cannot swim to the island, then he cannot swim across the lake.**',
      '- Original: If today is Easter, then tomorrow is Monday. Contrapositive: **If tomorrow is not Monday, then today is not Easter.**',
      '',
      'Each answer reverses the order of the claims and negates both. It does not assert the converse.'
    ),
    {
      recognition: 'Write the original as $p\\to q$, then mechanically write $\\neg q\\to\\neg p$.',
      trap: 'Do not change only one part or reverse without negating.',
    },
  ),
  explainedPage(
    31,
    'Exercise — express necessary conditions in two ways',
    '“S is necessary for R” means $R\\to S$. Its equivalent contrapositive is $\\neg S\\to\\neg R$.',
    md(
      '**1. Divisibility.** “Being divisible by 3 is necessary for this number to be divisible by 9.”',
      '',
      '- If the number is divisible by 9, then it is divisible by 3.',
      '- If the number is not divisible by 3, then it is not divisible by 9.',
      '',
      '**2. Homework and passing.** “Doing homework regularly is necessary for Jim to pass the course.”',
      '',
      '- If Jim passes the course, then he does homework regularly.',
      '- If Jim does not do homework regularly, then he does not pass the course.',
      '',
      'The second sentence in each pair is the contrapositive of the first.'
    ),
    {
      recognition: 'For “S is necessary for R,” place R before the arrow and S after it: $R\\to S$.',
      trap: '“Necessary” points from the result toward the required condition. It does not mean the condition alone guarantees the result.',
    },
  ),
  explainedPage(
    32,
    'Converse and inverse are different forms',
    'From $p\\to q$, the converse is $q\\to p$ and the inverse is $\\neg p\\to\\neg q$. Neither is generally equivalent to the original.',
    md(
      'The slide compares three forms:',
      '',
      '- Original: $p\\to q$.',
      '- Converse: $q\\to p$ (reverse the order only).',
      '- Inverse: $\\neg p\\to\\neg q$ (negate both, keep the order).',
      '',
      'Only the contrapositive $\\neg q\\to\\neg p$ is guaranteed equivalent to the original. The converse and inverse are equivalent to each other, but they do not generally preserve the original statement’s truth table.'
    ),
    {
      recognition: 'Use the two questions “Did I reverse the order?” and “Did I negate both?” to distinguish converse, inverse, and contrapositive.',
      trap: 'A true conditional does not automatically make its converse true. An if-statement is not a two-way definition unless the reverse direction is also given.',
    },
  ),
  explainedPage(
    33,
    'If, only if, and if and only if',
    '“R if S” means $S\\to R$. “R only if S” means $R\\to S$. “R iff S” means both directions hold.',
    md(
      'The slide’s wording can be decoded by translating the location of “if” and “only if”:',
      '',
      '- “If you work hard, you will succeed” is work hard $\\to$ succeed.',
      '- “You work hard only if you will succeed” is also work hard $\\to$ succeed. Success is necessary for working hard, in the sentence’s stated relationship.',
      '- “You will succeed if and only if you work hard” says succeed $\\to$ work hard AND work hard $\\to$ succeed.',
      '',
      'More generally, “R if S” means “if S then R”: S is sufficient for R. “R only if S” means “if R then S”: S is necessary for R.'
    ),
    {
      recognition: 'In “R if S,” the condition after “if” goes first in the arrow. In “R only if S,” R goes first and S follows the arrow.',
      trap: '“If” and “only if” point in different directions. Translate the full phrase before drawing an arrow.',
    },
  ),
  explainedPage(
    34,
    'Biconditional — necessary and sufficient',
    'The biconditional $p\\leftrightarrow q$ is true when $p$ and $q$ have the same truth value; it means both implications hold.',
    md(
      '| $p$ | $q$ | $p\\leftrightarrow q$ |',
      '| --- | --- | --- |',
      '| T | T | T |',
      '| T | F | F |',
      '| F | T | F |',
      '| F | F | T |',
      '',
      '$$p\\leftrightarrow q\\equiv(p\\to q)\\land(q\\to p).$$',
      '',
      'It is also equivalent to $(p\\to q)\\land(\\neg p\\to\\neg q)$, because the inverse of one direction is equivalent to the other direction.',
      '',
      'For integer $x$, “$x$ is even iff $x^2$ is even” is true: an even $x$ has an even square, and if the square of an integer is even, the integer itself must be even.'
    ),
    {
      recognition: 'Use iff when the sentence asserts both “if” directions. The two statements must agree: both true or both false.',
      trap: 'A biconditional is not just one implication. You must establish both directions.',
      note: 'The parity statement is interpreted over integers, where evenness is defined.',
    },
  ),
  explainedPage(
    35,
    'Mathematical conditionals and extra meaning in English',
    'Formal logic records only the stated implication. Everyday context may suggest another direction, but that extra idea does not follow automatically.',
    md(
      'In the parent example, let $C$ mean “you clean your room” and $D$ mean “you can watch a DVD.” The stated sentence is $\\neg C\\to\\neg D$. It does not logically imply $C\\to D$; that is an additional everyday expectation.',
      '',
      'The mathematical example says that if an integer $x>2$ is not odd, then it is not prime. With $O$ meaning “$x$ is odd” and $P$ meaning “$x$ is prime,” this is $\\neg O\\to\\neg P$. It does not mean $O\\to P$: an odd number greater than 2 need not be prime.',
      '',
      'The lecture is warning that ordinary conversation can carry assumptions that are not part of the formal conditional.'
    ),
    {
      recognition: 'Write exactly the condition and result that the sentence states; test any supposed reverse direction separately.',
      trap: 'The converse of a true conditional may be false. “If not odd then not prime” does not say “if odd then prime.”',
      note: 'The number example is read over integers greater than 2, where odd/even and primality apply.',
    },
  ),
  explainedPage(
    36,
    'Card activity — check “if vowel, then even”',
    'To test “vowel implies even,” turn over A and 3. A could have an odd number behind it; 3 could have a vowel behind it.',
    md(
      'The four visible cards are A, 2, 3, and K. The rule is: **if there is a vowel on one side, there is an even number on the other side.**',
      '',
      '- Turn over **A**: its reverse must be even for the rule to hold.',
      '- Turn over **3**: because 3 is odd, its reverse must not be a vowel; otherwise an odd number would be paired with a vowel and disprove the rule.',
      '- You do not need to turn over **2**: the rule does not say every even number must have a vowel.',
      '- You do not need to turn over **K**: the rule says nothing about consonants.',
      '',
      'The equivalent contrapositive is “if odd, then not a vowel,” which explains why the odd card matters.'
    ),
    {
      recognition: 'For “if vowel, then even,” check the triggering category (vowels) and the forbidden counterexample category (odd numbers).',
      trap: 'Checking only A tests whether the rule can succeed; flipping 3 checks whether a forbidden counterexample exists.',
      note: 'The source poses the activity without a printed answer; A and 3 follow from the conditional and its contrapositive.',
    },
  ),
  explainedPage(
    37,
    'Arguments, assumptions, and conclusions',
    'An argument is valid when no situation makes all its assumptions true and its conclusion false.',
    md(
      'All statements before the final one are the **assumptions** (also called hypotheses). The final statement is the **conclusion**.',
      '',
      'The example has two assumptions: “If today is Wednesday, then yesterday was Tuesday” and “Today is Wednesday.” The conclusion “Yesterday was Tuesday” follows.',
      '',
      'Validity is about the structure: whenever all assumptions are true, the conclusion must be true too.'
    ),
    {
      recognition: 'To test validity with a truth table, look only for a row where every assumption is T and the conclusion is F.',
      trap: 'An argument can have a false assumption and still be valid. Validity asks what happens when all assumptions are true.',
    },
  ),
  explainedPage(
    38,
    'Modus ponens — apply a conditional',
    'From $p\\to q$ and $p$, conclude $q$. The condition happened, so the promised result follows.',
    md(
      'The valid pattern is:',
      '',
      '1. If $p$, then $q$.',
      '2. $p$.',
      '3. Therefore $q$.',
      '',
      'In the lecture example: if there is a bandh, class is cancelled; there is a bandh; therefore class is cancelled. In the truth table, the row where both assumptions $p\\to q$ and $p$ are true has $q$ true.',
      '',
      'The slide notes that *modus ponens* means “method of affirming.”'
    ),
    {
      recognition: 'Match the known fact to the left side of the arrow, then conclude the right side.',
      trap: 'The premise must be $p$, not $q$. Knowing only that $q$ is true does not establish $p$.',
    },
  ),
  explainedPage(
    39,
    'Modus tollens — deny the result',
    'From $p\\to q$ and $\\neg q$, conclude $\\neg p$. If the promised result did not happen, the condition could not have happened.',
    md(
      'The valid pattern is:',
      '',
      '1. If $p$, then $q$.',
      '2. Not $q$.',
      '3. Therefore not $p$.',
      '',
      'Example: if there is a bandh, class is cancelled; class was not cancelled; therefore there was no bandh. The table highlights the row where both assumptions are true and the conclusion $\\neg p$ is also true.',
      '',
      'The slide notes that *modus tollens* means “method of denying.”'
    ),
    {
      recognition: 'Use modus tollens when you know the conditional result is false: pair $p\\to q$ with $\\neg q$.',
      trap: 'Negate the consequent to infer the negated antecedent. Do not infer $\\neg q$ merely from $\\neg p$.',
    },
  ),
  explainedPage(
    40,
    'A cycle of implications — is the argument valid?',
    'The assumptions $P\\to Q$, $Q\\to R$, and $R\\to P$ do not by themselves prove that $P$, $Q$, and $R$ are true.',
    md(
      'The proposed argument has three assumptions:',
      '',
      '- $P\\to Q$',
      '- $Q\\to R$',
      '- $R\\to P$',
      '',
      'The conclusion is $P\\land Q\\land R$, which requires all three propositions to be true. The arrows only say that truth would pass around the cycle; they do not supply an initial true proposition.',
      '',
      'The next slide checks the argument and identifies a counterexample.'
    ),
    {
      recognition: 'Separate what the premises relate from what the conclusion demands. Implications among propositions do not assert that any proposition is true.',
      trap: 'A chain or cycle of “if” statements is not a proof that its starting point is true.',
    },
  ),
  explainedPage(
    41,
    'Counterexample — the implication cycle is invalid',
    'Set $P=F$, $Q=F$, and $R=F$. Then all three implications are true while $P\\land Q\\land R$ is false, so the argument is invalid.',
    md(
      'In the final row of the source table:',
      '',
      '- $P\\to Q$ is $F\\to F$, which is true.',
      '- $Q\\to R$ is $F\\to F$, which is true.',
      '- $R\\to P$ is $F\\to F$, which is true.',
      '- But $P\\land Q\\land R=F\\land F\\land F=F$.',
      '',
      'This one row has all assumptions true and the conclusion false. That is enough to disprove validity; a search for every other row is not needed once the counterexample is found.'
    ),
    {
      recognition: 'To prove an argument invalid, find one counterexample row: all assumptions T, conclusion F.',
      trap: 'Do not mark an argument valid merely because the conclusion is true in some rows. It must be true in every row where all assumptions are true.',
    },
  ),
  explainedPage(
    42,
    'Invalid form — affirming the consequent',
    'The form $p\\to q$, $q$, therefore $p$ is invalid. A result can have other causes, so observing $q$ does not prove $p$.',
    md(
      'The fish example says: if you are a fish, then you drink water; you drink water; therefore you are a fish. That conclusion does not follow.',
      '',
      'A truth-table counterexample is $p=F$, $q=T$. Then $p\\to q=T$ and the second assumption $q=T$, but the conclusion $p=F$.',
      '',
      'This invalid reasoning pattern is called **affirming the consequent**: it treats the result $q$ as proof of the condition $p$.'
    ),
    {
      recognition: 'When the argument gives $q$ and tries to infer $p$ from $p\\to q$, test whether something else could also make $q$ true.',
      trap: 'This is not modus ponens. Modus ponens needs $p$ as the second premise.',
    },
  ),
  explainedPage(
    43,
    'Invalid form — denying the antecedent',
    'The form $p\\to q$, $\\neg p$, therefore $\\neg q$ is invalid. The result may still be true for another reason.',
    md(
      'The fish example says: if you are a fish, then you drink water; you are not a fish; therefore you do not drink water. That conclusion is not guaranteed.',
      '',
      'Use $p=F$ and $q=T$ as a counterexample. Then $p\\to q=T$, $\\neg p=T$, but $\\neg q=F$. The assumptions are true and the conclusion is false.',
      '',
      'This pattern is called **denying the antecedent**. It incorrectly assumes that if the condition is absent, the result must also be absent.'
    ),
    {
      recognition: 'When the argument gives $\\neg p$ and concludes $\\neg q$, test the row where $p$ is false but $q$ is true.',
      trap: 'Do not confuse this with modus tollens, which needs $\\neg q$ and concludes $\\neg p$.',
    },
  ),
  explainedPage(
    44,
    'Reference table — valid argument forms',
    'A valid argument form guarantees its conclusion whenever its premises are true. Match the form before using the rule.',
    md(
      'The source table lists these patterns:',
      '',
      '| Rule | Premises | Conclusion |',
      '| --- | --- | --- |',
      '| Modus ponens | $p\\to q$, $p$ | $q$ |',
      '| Modus tollens | $p\\to q$, $\\neg q$ | $\\neg p$ |',
      '| Generalization | $p$ (or $q$) | $p\\lor q$ |',
      '| Specialization | $p\\land q$ | $p$ (or $q$) |',
      '| Conjunction | $p$, $q$ | $p\\land q$ |',
      '| Elimination | $p\\lor q$, $\\neg q$ | $p$; or $p\\lor q$, $\\neg p$ | $q$ |',
      '| Transitivity | $p\\to q$, $q\\to r$ | $p\\to r$ |',
      '| Proof by cases | $p\\lor q$, $p\\to r$, $q\\to r$ | $r$ |',
      '| Contradiction rule | $\\neg p\\to c$ | $p$ |',
      '| Cases conjunction | $p\\lor q\\to r$ | $(p\\to r)\\land(q\\to r)$ |',
      '',
      'Here $c$ denotes a contradiction. “Elimination” uses a disjunction and rules out one side; “proof by cases” checks both possible sides and reaches the same result.'
    ),
    {
      recognition: 'Write the premises in a column and compare them to a rule’s pattern, including the order and negations.',
      trap: 'A small symbol change can turn a valid form into an invalid one. In particular, do not confuse modus ponens with affirming the consequent.',
      note: 'The wording “cases conjunction” follows the final rule printed at the bottom of the source table.',
    },
  ),
  explainedPage(
    45,
    'Model a lift system — assign proposition names',
    'Before translating a system requirement, give each basic claim one clear symbol: $E$ for capacity exceeded, $S$ for doors closed, $M$ for lift moving, and $A$ for alarm on.',
    md(
      'The slide defines:',
      '',
      '- $E$: the lift capacity is exceeded.',
      '- $S$: the lift doors are closed.',
      '- $M$: the lift is moving.',
      '- $A$: the alarm is on.',
      '',
      'It describes three rules in English: exceeding capacity means the doors remain open; moving means the doors are closed; the alarm is on if either the doors are closed while capacity is exceeded, or the lift is moving while the doors are open.',
      '',
      'This page sets up the vocabulary. The symbolic translations appear on the next page.'
    ),
    {
      recognition: 'Define each basic statement before translating a long sentence, and reuse that same symbol consistently.',
      trap: 'Here $S$ means “doors closed,” so “doors open” must be written $\\neg S$.',
    },
  ),
  explainedPage(
    46,
    'Translate the lift rules with connectives',
    'The three rules become $E\\to\\neg S$, $M\\to S$, and $((S\\land E)\\lor(M\\land\\neg S))\\to A$.',
    md(
      'Translate each sentence after substituting the meanings of the letters:',
      '',
      '1. “If capacity is exceeded, doors remain open.” Open means not closed, so $E\\to\\neg S$.',
      '2. “The doors are closed when the lift is moving.” This means if moving, then closed: $M\\to S$.',
      '3. “The alarm is on whenever the doors are closed and capacity is exceeded, or the lift is moving with doors open.” The trigger is $(S\\land E)\\lor(M\\land\\neg S)$, so the rule is $$((S\\land E)\\lor(M\\land\\neg S))\\to A.$$',
      '',
      'Parentheses group the two alternative alarm triggers before saying that either trigger implies $A$.'
    ),
    {
      recognition: '“Whenever” and “if” introduce a condition-to-result arrow. “And” joins facts within one case; “or” joins alternative cases.',
      trap: 'Do not write $S$ for an open door; the chosen symbol means closed, so open is $\\neg S$.',
    },
  ),
  explainedPage(
    47,
    'Why model a system with logic?',
    'A precise model helps every stakeholder check that the system requirements are understood and that the resulting software behaves safely.',
    md(
      'The slide names four people who benefit from the lift model:',
      '',
      '1. The client wants confidence that the system is sound and safe.',
      '2. The designer needs a clear account of the required behavior.',
      '3. The implementer needs a model to guide correct control software.',
      '4. Lift users want confidence in the design and manufacture.',
      '',
      'In practice, writing requirements as propositions makes hidden conditions easier to inspect before they become code.'
    ),
  ),
  explainedPage(
    48,
    'Work backward from an alarm-off condition',
    'Given the alarm rule and $\\neg A$, modus tollens says neither alarm trigger occurred; De Morgan then derives $E\\to\\neg S$ and $M\\to S$.',
    md(
      'Let $X=(S\\land E)\\lor(M\\land\\neg S)$. The source gives $X\\to A$ and asks what follows when the alarm is off.',
      '',
      '1. $X\\to A$ — the alarm rule.',
      '2. $\\neg A$ — the alarm is off.',
      '3. $\\neg X$ — modus tollens from lines 1–2.',
      '4. $\\neg((S\\land E)\\lor(M\\land\\neg S))$ — substitute the definition of $X$.',
      '5. $\\neg(S\\land E)\\land\\neg(M\\land\\neg S)$ — De Morgan on the outer OR.',
      '6. $(\\neg S\\lor\\neg E)\\land(\\neg M\\lor S)$ — De Morgan on both AND parts.',
      '7. Specialize the conjunction to get $\\neg S\\lor\\neg E$ and $\\neg M\\lor S$.',
      '8. Reorder the first disjunction: $\\neg E\\lor\\neg S$.',
      '9. Convert with $p\\to q\\equiv\\neg p\\lor q$: $E\\to\\neg S$ and $M\\to S$.',
      '',
      'So the doors are open if capacity is exceeded, and closed if the lift is moving. The derivation uses only the alarm rule and the fact that the alarm is off.'
    ),
    {
      recognition: 'If a conditional conclusion is false, use modus tollens to rule out its whole antecedent; then simplify the negated condition.',
      trap: 'The alarm rule says a trigger implies alarm. It does not say the alarm can be on only for those triggers; do not reverse the implication.',
    },
  ),
  explainedPage(
    49,
    'Exercises — derive conclusions from valid forms',
    'Use the printed premises to work toward each stated conclusion. These four deductions practice disjunctive syllogism, modus tollens, implication elimination, and conjunction.',
    md(
      '**Top-left: conclude $\\neg q$.**',
      '',
      '1. From $\\neg t$ and $p\\to t$, infer $\\neg p$ by modus tollens.',
      '2. From $\\neg p$, infer $\\neg p\\lor q$ by generalization; then use $(\\neg p\\lor q)\\to r$ to get $r$.',
      '3. Combine $\\neg p$ and $r$ to use $(\\neg p\\land r)\\to\\neg s$, obtaining $\\neg s$.',
      '4. From $s\\lor\\neg q$ and $\\neg s$, eliminate $s$ to conclude $\\neg q$.',
      '',
      '**Top-right: conclude $\\neg t$.**',
      '',
      '1. From $u\\lor w$ and $\\neg w$, eliminate $w$ to get $u$.',
      '2. From $u\\to\\neg p$, get $\\neg p$. Then $(\\neg p)\\to(r\\land\\neg s)$ gives $\\neg s$.',
      '3. From $t\\to s$ and $\\neg s$, use modus tollens to conclude $\\neg t$.',
      '',
      '**Bottom-left: conclude $t$.**',
      '',
      '1. From $q\\to r$ and $\\neg r$, use modus tollens to get $\\neg q$.',
      '2. From $\\neg q\\to(u\\land s)$, get $s$. From $p\\lor q$ and $\\neg q$, eliminate $q$ to get $p$.',
      '3. Combine $p$ and $s$ into $p\\land s$, then use $(p\\land s)\\to t$ to conclude $t$.',
      '',
      '**Bottom-right: conclude $u\\land w$.**',
      '',
      '1. From $\\neg s$ and $\\neg s\\to\\neg t$, infer $\\neg t$.',
      '2. From $p\\to q$, $\\neg q\\lor s$, and $\\neg s$: first eliminate $s$ to get $\\neg q$, then modus tollens gives $\\neg p$.',
      '3. From $r\\lor s$ and $\\neg s$, get $r$. Thus $\\neg p\\land r$, and $(\\neg p\\land r)\\to u$ gives $u$.',
      '4. From $w\\lor t$ and $\\neg t$, get $w$. Combine $u$ and $w$ to conclude $u\\land w$.',
      '',
      '**Lecture recap:** translate English carefully; use truth tables to check equivalence and validity; simplify with named laws; for if-then claims remember the false case $p\\land\\neg q$; and match argument premises to a valid form before drawing a conclusion.'
    ),
    {
      recognition: 'Start from a premise that already contains the target or its opposite, then choose a rule that moves one step closer to the requested conclusion.',
      trap: 'Do not use the invalid forms from pages 42–43. A disjunction needs the other option ruled out before elimination is valid.',
      note: 'The source page gives four premise sets and asks students to derive the listed conclusions; the derivations above are supplemental worked guidance.',
    },
  ),
];

export const discreteMathLecture3Lesson: Lesson = {
  id: 'discrete-math-lecture-3',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/3 Propositional Logic.pdf',
  sourcePath: 'Discrete Math/lecture/3 Propositional Logic.pdf',
  title: 'Lecture 3: Propositional Logic — older course archive',
  sourcePageCount: 49,
  pages,
  lastReviewed: '2026-10-14',
};
