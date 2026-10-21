import type { Lesson, LessonPage } from '../types';

interface PageNotes {
  terms?: string;
  recognition?: string;
  trap?: string;
  note?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  walkthrough: string,
  notes: PageNotes = {},
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (notes.terms) {
    blocks.push({ type: 'recognition', title: 'Key words and symbols', markdown: notes.terms });
  }
  if (notes.recognition) {
    blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: notes.recognition });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: walkthrough });
  if (notes.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: notes.trap });
  }
  if (notes.note) blocks.push({ type: 'source-note', text: notes.note });
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualOnlyPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [], note };
}

const pages: LessonPage[] = [
  visualOnlyPage(
    1,
    'First Order Logic — title slide',
    'The cover names the topic and shows a portrait; it contains no definitions or worked material.',
  ),
  explainedPage(
    2,
    'This lecture — what first-order logic adds',
    'This lecture moves from whole statements to statements about objects: variables let us describe a property, and quantifiers say whether it holds for all objects or at least one.',
    `The lecture places first-order logic beside propositional logic:

- **Propositional logic** works with complete statements such as “it is raining,” treating each as true or false.
- **First-order logic** can talk about objects and their properties, such as “every integer has a successor” or “some equation has a solution.”

The listed path is: quantifiers, negating quantified statements, using multiple quantifiers, and reasoning (arguments) with quantified statements. The central change is that a variable such as $x$ ranges over a domain, and a quantifier tells how broadly a predicate must hold.`,
    {
      terms: `**Domain** — the set of allowed values for a variable.  
**Predicate** — a statement with variable slots; its truth can change when the variables change.  
**Quantifier** — a symbol meaning “for every” ($\\forall$) or “there exists” ($\\exists$).`,
      recognition: 'When a sentence says “all,” “every,” “some,” or “there exists,” expect a quantifier. First identify the domain, then decide whether the claim is universal or existential.',
    },
  ),
  explainedPage(
    3,
    'Why propositional logic needs an extension',
    'A finite list of whole propositions is awkward for claims about infinitely many objects; variables and quantifiers let one short formula express the pattern.',
    `The slide recalls the familiar propositional connectives $\\neg$, $\\land$, $\\lor$, $\\to$, and $\\leftrightarrow$. They combine statements, but do not by themselves explain the internal structure of claims such as:

- “There are infinitely many primes.”
- “There exists a solution to this equation.”

First-order logic adds variables, predicates, and quantifiers. For instance, “there exists a prime greater than $n$” can be represented by a quantified predicate once the domain and predicate are specified. The point of the slide is the extra expressive power, not a proof of either example.`,
    {
      recognition: 'If the sentence describes a property of an unspecified object, do not treat it as one indivisible letter. Introduce a variable, state its domain, and quantify it.',
      trap: 'A predicate with a free variable is not yet a complete true-or-false statement; the variable still needs a value or a quantifier.',
    },
  ),
  explainedPage(
    4,
    'Predicates — statements with variable slots',
    'A predicate becomes a proposition after its variables receive values. Here $P(x,y)$ means $x+2=y$, so the same rule can be true for one input pair and false for another.',
    `The slide defines $P(x,y) ::= x+2=y$. The symbol $::=$ means “is defined to mean.” Now substitute the listed values:

1. For $x=1$ and $y=3$, $P(1,3)$ asks whether $1+2=3$. Since $3=3$, it is **true**.
2. For $x=1$ and $y=4$, $P(1,4)$ asks whether $1+2=4$. Since $3\\ne4$, it is **false**.
3. Therefore its negation $\\neg P(1,4)$ is **true**.

The **domain** is the set of values allowed for a variable. For a two-variable predicate, specify the allowed values for both variables; the domain determines which substitutions are being considered.`,
    {
      terms: `**$P(x,y)$** — the predicate rule, here “$x+2=y$.”  
**$P(1,3)$** — substitute 1 for $x$ and 3 for $y$, then check the resulting statement.  
**$\\neg P$** — “not $P$”; it reverses true and false.`,
      recognition: 'To evaluate a predicate, substitute each value into the matching variable, then calculate or compare both sides.',
      trap: 'Do not decide whether $P(x,y)$ is true before the variables are assigned or quantified. Its truth depends on their values.',
    },
  ),
  explainedPage(
    5,
    'Sets — specify the domain and test membership',
    'The domain tells which values a variable may take. The symbols $\\mathbb R$, $\\mathbb Z$, and $\\mathbb Q$ name the real, integer, and rational numbers.',
    `A **set** is a collection of objects. The slide lists three common domains:

- $\\mathbb R$: the real numbers, including values such as $-2$, $0$, $1/2$, and $\\sqrt2$.
- $\\mathbb Z$: the integers, such as $-2,-1,0,1,2$.
- $\\mathbb Q$: the rational numbers, which can be written as $m/n$ for integers $m,n$ with $n\\ne0$.

The page uses $x\\in A$ to say that $x$ is an element of set $A$ (“$x$ is in $A$”), and $x\\notin A$ to say that it is not. It also shows roster examples such as $\\{1,2,4,8,16,32,\\ldots\\}$ and identifiers like $\\{D1130,D2110,\\ldots\\}$; the ellipsis means the displayed pattern continues.

For a domain, membership matters: if $x\\in\\mathbb Z$, a value such as $1/2$ is not an allowed substitution.`,
    {
      recognition: 'Before evaluating a quantified claim, underline its domain. It decides which objects count as possible values.',
      trap: 'Real numbers, integers, and rationals overlap but are not interchangeable domains. A statement can change truth when the domain changes.',
    },
  ),
  explainedPage(
    6,
    'Truth sets — collect the values that make a predicate true',
    'The truth set of $P(x)$ is the part of its domain that passes the predicate test: $\\{x\\in D\\mid P(x)\\}$.',
    `Read the set-builder notation from left to right:

1. $x\\in D$ says which values are candidates.
2. The bar $\\mid$ means “such that.”
3. $P(x)$ is the condition; keep only candidates for which it is true.

The slide gives two examples with the **positive integers** as domain. If $P(x)$ means “$x$ is a prime number,” its truth set is $\\{2,3,5,7,11,\\ldots\\}$. If $P(x)$ means “$x$ is the square of a number,” the displayed examples include positive squares such as $1,4,9,16,\\ldots$. The slide does not specify the domain for the inner word “number,” so use the course’s intended meaning when listing the full truth set. In each case, the stated domain for $x$ prevents unrelated values from being considered.

This is useful when a set is too large or inconvenient to list explicitly.`,
    {
      terms: `**Truth set** — all values in the specified domain that make the predicate true.  
**$D$** — the domain.  
**$\\mid$** — “such that.”`,
      recognition: 'When you see $\\{x\\in D\\mid P(x)\\}$, say: “start with values in $D$; keep the ones for which $P(x)$ is true.”',
      trap: 'The predicate alone does not determine the truth set. Changing $D$ can add or remove candidates.',
    },
  ),
  explainedPage(
    7,
    'Exercises — evaluate predicates and truth sets',
    'For these exercises, substitute carefully, respect the domain, and remember that an implication is false only when its “if” part is true and its “then” part is false.',
    `**1. $Q(n)$ means $n^2\\le30$.**

- (a) $Q(2)$: $2^2=4\\le30$, true. $Q(-2)$: $(-2)^2=4\\le30$, true. $Q(7)$: $49\\nleq30$, false. $Q(-7)$: $(-7)^2=49\\nleq30$, false.
- (b) For integer $n$, $n^2\\le30$ means $|n|\\le\\sqrt{30}\\approx5.48$. The integer truth set is $\\{-5,-4,-3,-2,-1,0,1,2,3,4,5\\}$.
- (c) Restrict that list to positive integers: $\\{1,2,3,4,5\\}$.

**2. $Q(x,y)$ means “if $x<y$, then $x^2<y^2$,” with $x,y\\in\\mathbb R$.**

- (a) At $(-2,1)$, the premise $-2<1$ is true, but the conclusion $4<1$ is false. So the implication is false.
- (b) Another counterexample is $x=-3,y=-2$: $-3<-2$ is true, but $9<4$ is false.
- (c) At $(3,8)$, $3<8$ and $9<64$, so the implication is true.
- (d) A different true pair is $(1,2)$: $1<2$ and $1<4$.

**3. $B(x)$ means $-10<x<10$.** The strict bounds exclude $-10$ and 10.

- (a) Integer domain: $\\{-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9\\}$.
- (b) Positive-integer domain: $\\{1,2,3,4,5,6,7,8,9\\}$.
- (c) Even-integer domain: $\\{-8,-6,-4,-2,0,2,4,6,8\\}$.

Each answer is obtained by applying the condition only to values allowed by the stated domain.`,
    {
      terms: `**Implication $A\\to B$** — false only when $A$ is true and $B$ is false; if $A$ is false, the implication is true.  
**Strict inequality $a<x<b$** — excludes both endpoints.`,
      recognition: 'For a truth-set question, write the domain first, then filter it. For an implication, test the premise before the conclusion.',
      trap: 'Squaring a negative number makes it positive, so $x<y$ alone does not guarantee $x^2<y^2$.',
    },
  ),
  explainedPage(
    8,
    'The universal quantifier — “for all”',
    '$\\forall x$ means the predicate must be true for every allowed $x$. One counterexample is enough to disprove a universal statement.',
    `The symbol $\\forall$ is read “for all” or “for every.” In the example

$$\\forall x\\in\\mathbb Z\\;\\forall y\\in\\mathbb Z,\\quad x+y=y+x,$$

the statement claims that addition is commutative for every pair of integers. The domain is part of the statement; the slide also depicts Pythagoras’ theorem as a universal claim: for every right-angled triangle, if $a,b$ are its legs and $c$ its hypotenuse, then $a^2+b^2=c^2$.

The page’s final example is $\\forall x,\\;x^2\\ge x$. For integer $x$, rewrite it as $x(x-1)\\ge0$. Consecutive integers $x$ and $x-1$ are either both nonnegative (when $x\\ge1$) or both nonpositive (when $x\\le0$), so their product is nonnegative. It is true over $\\mathbb Z$.

It is **not** true over $\\mathbb R$: choose $x=1/2$. Then $x^2=1/4$, and $1/4\\not\\ge1/2$. This is why the domain must be stated.`,
    {
      terms: `**$\\forall$** — “for every value in the domain.”  
**Counterexample** — one allowed value that makes the predicate false.  
**Hypotenuse $c$** — the side opposite the right angle; $a,b$ are the two legs.`,
      recognition: 'To prove a universal claim, reason for an arbitrary allowed value. To disprove it, find one allowed counterexample.',
      trap: 'Do not silently switch from integers to reals: $x^2\\ge x$ is true for all integers but false for some real numbers.',
    },
  ),
  explainedPage(
    9,
    'The existential quantifier — “there exists”',
    '$\\exists y$ means at least one allowed value of $y$ makes the predicate true. For $\\forall x\\exists y,\\;x<y$, the witness $y$ may depend on $x$.',
    `The symbol $\\exists$ is read “there exists” or “for some.” The slide shows $\\exists y,\\;y^2=y$. Over the real numbers, $y=0$ is a witness because $0^2=0$ (and $y=1$ also works). The domain still matters: the witness must belong to it.

The table evaluates

$$\\forall x\\;\\exists y,\\quad x<y,$$

where both variables use the listed domain:

- **Integers $\\mathbb Z$: true.** Given any integer $x$, choose $y=x+1$, which is also an integer and is larger.
- **Positive integers $\\mathbb Z^+$: true.** Again choose $y=x+1$; it remains positive.
- **Negative integers $\\mathbb Z^-$: false.** At $x=-1$, there is no negative integer greater than $-1$. A single failing $x$ disproves the outer “for all.”
- **Negative reals $\\mathbb R^-$: true.** For any negative real $x$, choose $y=x/2$. It is still negative, and dividing a negative number by 2 makes it larger (closer to zero), so $x<y$.

The order means: first take any $x$; after seeing it, find a suitable $y$.`,
    {
      terms: `**Witness** — a particular allowed value that makes an existential predicate true.  
**$\\mathbb Z^+$ / $\\mathbb Z^-$** — positive / negative integers.  
**$\\mathbb R^-$** — negative real numbers.`,
      recognition: 'Read $\\forall x\\exists y$ as “for each $x$, find a possibly different $y$.” Try to write an explicit rule for choosing $y$.',
      trap: 'The statement does not require one fixed $y$ to work for every $x$. That would be the different order $\\exists y\\forall x$.',
    },
  ),
  explainedPage(
    10,
    'Quantified statements — read a predicate on a diagram',
    'Translate each symbol first, then check the pictured objects: the four answers are (a) true, (b) false, (c) true, and (d) false.',
    `The diagram names objects $a$ through $k$. The slide defines **Triangle$(x)$**, **Blue$(y)$**, and **RightOf$(x,y)$** (“$x$ is to the right of $y$,” even if they are in different rows). The objects also visibly have shapes and colors used by the questions. The square at $e$ is blue; the squares at $h$ and $j$ are dark/black; none of the squares is the lighter gray used for the circles.

- **(a) $\\forall t,\\;Triangle(t)\\to Blue(t)$ — true.** The triangles are $a,c,g$, and all three are blue.
- **(b) $\\forall x,\\;Blue(x)\\to Triangle(x)$ — false.** Object $e$ is blue but is a square, not a triangle. One counterexample disproves the universal statement.
- **(c) $\\exists y,\\;Square(y)\\land RightOf(d,y)$ — true.** For example, $y=e$ works: $e$ is a square, and $d$ is to its right. The square $h$ also works.
- **(d) $\\exists z,\\;Square(z)\\land Gray(z)$ — false.** The squares shown are blue ($e$) or dark/black ($h,j$); none is the lighter gray color. So no object satisfies both conditions.

For a universal implication, check every object of the kind described by its premise. For an existential conjunction, find one object satisfying both parts.`,
    {
      terms: `**$A\\to B$** — “if $A$, then $B$.”  
**$A\\land B$** — both conditions must hold.  
**$\\forall$ / $\\exists$** — every object / at least one object.`,
      recognition: 'For $\\forall x(A(x)\\to B(x))$, look for an $A$ that is not $B$. For $\\exists x(A(x)\\land B(x))$, look for one object that is both.',
      trap: 'In (b), “every blue object is a triangle” is not the same as “every triangle is blue.” Also distinguish the dark squares from the lighter gray objects in (d).',
    },
  ),
  visualOnlyPage(
    11,
    'Section divider — negation',
    'This outline slide highlights “Negation” and introduces no new definition or example.',
  ),
  explainedPage(
    12,
    'Negating a universal — “not all” means “some do not”',
    'The negation of “everyone likes football” is “someone does not like football,” not “nobody likes football.”',
    `Let $P(x)$ mean “$x$ likes football,” with people as the domain. “Everyone likes football” is $\\forall xP(x)$. Its negation is

$$\\neg\\forall xP(x)\\equiv\\exists x\\neg P(x).$$

To see why, suppose the domain has just three people, 1, 2, and 3. Then $\\forall xP(x)$ means $P(1)\\land P(2)\\land P(3)$. Negating it gives

$$\\neg(P(1)\\land P(2)\\land P(3))
\\equiv\\neg P(1)\\lor\\neg P(2)\\lor\\neg P(3).$$

That says at least one person fails to like football, which is exactly $\\exists x\\neg P(x)$. The same pattern works for any domain size; the slide notes that induction can prove the general version.`,
    {
      terms: `**Negation $\\neg P$** — “not $P$.”  
**$\\equiv$** — logically equivalent; the two statements have the same truth value.  
**Generalized De Morgan law** — negating “all” changes it to “there exists” and negates the predicate.`,
      recognition: 'To negate “every,” search for a counterexample: “there is at least one that does not.”',
      trap: '“Not everyone likes football” allows many people to like it. It does not say “no one likes football.”',
    },
  ),
  explainedPage(
    13,
    'Negating an existential — “none exist” means “all fail”',
    'The negation of “there is a plant that can fly” is “every plant cannot fly”: deny the property for every allowed plant.',
    `Let $P(x)$ mean “$x$ can fly,” with plants as the domain. The original claim is $\\exists xP(x)$. Its negation is

$$\\neg\\exists xP(x)\\equiv\\forall x\\neg P(x).$$

For a three-object domain, the original existential is $P(1)\\lor P(2)\\lor P(3)$. Negating it gives

$$\\neg(P(1)\\lor P(2)\\lor P(3))
\\equiv\\neg P(1)\\land\\neg P(2)\\land\\neg P(3).$$

All three predicates must be false, so every plant fails to fly. The slide again notes that the finite pattern generalizes to any number of values.`,
    {
      terms: `**Generalized De Morgan law** — negating “there exists” changes it to “for all” and negates the predicate.  
**$\\land$ / $\\lor$** — “and” / “or.”`,
      recognition: 'To negate “there exists,” say “there is no such object,” then rewrite as “every object does not have the property.”',
      trap: 'Do not leave the existential quantifier in place when negating. Both the quantifier and the predicate change.',
    },
  ),
  visualOnlyPage(
    14,
    'Section divider — multiple quantifiers',
    'This outline slide highlights “Multiple quantifiers” and adds no new rule.',
  ),
  explainedPage(
    15,
    'Order of quantifiers — a different defense for each virus',
    'The order $\\forall V\\exists P$ allows the defense program to depend on which virus was chosen: for each virus, there is some program that kills it.',
    `Let $V$ range over computer viruses, $P$ over antivirus programs, and $Kill(P,V)$ mean “program $P$ kills virus $V$.” The first interpretation is

$$\\forall V\\;\\exists P,\\quad Kill(P,V).$$

Read it from left to right: choose any virus $V$; then find a program $P$ that kills that virus. The program may differ from one virus to another. The slide illustrates this with Defender for MYDOOM, Norton for ILOVEYOU, and Zonealarm for BABLAS, then remarks that maintaining different defenses is expensive.`,
    {
      terms: `**$V$** — a virus.  
**$P$** — an antivirus program.  
**$Kill(P,V)$** — the predicate that program $P$ kills virus $V$.`,
      recognition: 'In $\\forall V\\exists P$, the existential choice happens after the virus is specified, so it may vary with $V$.',
      trap: 'Do not read this as one program that kills every virus. That stronger claim puts $\\exists P$ first.',
      note: 'The examples are the lecture’s illustration of quantifier order; they are not a current software recommendation.',
    },
  ),
  explainedPage(
    16,
    'Order of quantifiers — one program for every virus',
    'The order $\\exists P\\forall V$ is stronger: choose one program first, then that same program must kill every virus.',
    `The second reading is

$$\\exists P\\;\\forall V,\\quad Kill(P,V).$$

Now choose a single program $P$. The inner $\\forall V$ requires that this same choice work for every virus. The slide calls this “one defense good against every attack” and gives a hypothetical program $P$ that protects against all viruses.

Compare the two formulas:

- $\\forall V\\exists P$: each virus has some suitable program; choices can differ.
- $\\exists P\\forall V$: one fixed program works for all viruses.

Changing the order changes the meaning, and generally changes the truth of the claim.`,
    {
      recognition: 'When the sentence says “one and the same,” place its existential choice before the universal quantifier.',
      trap: 'A collection of programs that covers all viruses does not prove there is one program that covers all viruses.',
    },
  ),
  explainedPage(
    17,
    'A 6×6 array — every row has at least one 1',
    'The displayed array satisfies $\\forall\\text{ row }x\\;\\exists\\text{ column }y,\\;A[x,y]=1$ because each row contains at least one 1.',
    `Here $A[x,y]$ is the value in row $x$, column $y$. The formula says: for every row, there is at least one column where the entry is 1.

The diagram has six rows. Reading from top to bottom, a 1 appears in column 1 of row 1; columns 2, 3, and 5 of row 2; column 3 of row 3; columns 3 and 4 of row 4; column 4 of row 5; and column 2 of row 6. Every row gets at least one witness column, so the statement is true for this array.

The requirement is **at least one** 1 in each row, not exactly one and not all six entries.`,
    {
      terms: `**$A[x,y]$** — the entry at row $x$, column $y$.  
**$\\forall x\\exists y$** — for each row, a column can be found; the column may differ by row.`,
      recognition: 'To check $\\forall x\\exists y$, inspect every row separately and find at least one matching column in each.',
      trap: 'One 1 in the whole array is not enough. The existential condition must be met separately for every row.',
    },
  ),
  explainedPage(
    18,
    'Reverse the array quantifiers — one all-1 row is required',
    'The reversed formula $\\exists\\text{ row }x\\;\\forall\\text{ column }y,\\;A[x,y]=1$ asks for one row whose every entry is 1; the scattered array on page 17 does not have one.',
    `Read the new order in sequence:

1. $\\exists$ row $x$: choose one particular row.
2. $\\forall$ column $y$: every entry in that chosen row must equal 1.

On page 17, each row had at least one 1, but no row had all six entries equal to 1. So the earlier array satisfies $\\forall x\\exists y$ while failing $\\exists x\\forall y$.

This is a concrete example that swapping a universal and existential quantifier can change truth.`,
    {
      recognition: 'Translate the outer quantifier first: “there exists a row” means the same row must pass the whole inner condition.',
      trap: 'Do not use a different row for each column. The existential row is chosen once, before checking all columns.',
    },
  ),
  explainedPage(
    19,
    'Build an array that satisfies the reversed formula',
    'To satisfy $\\exists\\text{ row }x\\;\\forall\\text{ column }y,\\;A[x,y]=1$, make at least one complete row all ones.',
    `The slide shows a 6×6 example with one full row of six 1s. Choose that row as the existential witness $x$. Then whichever column $y$ is selected, its entry in that row is 1, so the inner universal statement holds.

The other rows do not matter for this formula; the requirement is only that there be at least one qualifying row.`,
    {
      recognition: 'For $\\exists x\\forall y$, search for one row that passes every column test.',
      trap: 'A row with five 1s and one 0 is not a witness: the inner “for every column” fails at that zero.',
    },
  ),
  explainedPage(
    20,
    'Which quantifier orders can be swapped?',
    'Two universal quantifiers commute, and two existential quantifiers commute: $\\forall x\\forall y$ can swap order, as can $\\exists x\\exists y$.',
    `For the universal pair, both formulas say every row-column pair has a 1:

$$\\forall x\\forall y,\\;A[x,y]=1
\\quad\\text{and}\quad
\\forall y\\forall x,\\;A[x,y]=1.$$

Checking every row then every column, or every column then every row, checks the same set of pairs. For the existential pair, both formulas say at least one row-column pair has a 1:

$$\\exists x\\exists y,\\;A[x,y]=1
\\quad\\text{and}\quad
\\exists y\\exists x,\\;A[x,y]=1.$$

The slide’s answer is yes for both pairs. This does **not** say that a universal and an existential can generally be swapped; pages 15–19 showed why their order matters.`,
    {
      recognition: 'Compare the quantifier types: same-type pairs ($\\forall,\\forall$ or $\\exists,\\exists$) can commute; a mixed pair generally cannot.',
      trap: 'Do not generalize this rule to $\\forall x\\exists y$ versus $\\exists y\\forall x$. Those are different claims.',
    },
  ),
  explainedPage(
    21,
    'Negate a statement with multiple quantifiers',
    'The negation of “one program kills every virus” is “for every program, there is a virus it cannot kill.”',
    `Start with the formula from page 16:

$$\\exists P\\;\\forall V,\\;Kill(P,V).$$

Negate it one step at a time:

1. Put a negation around the whole claim: $\\neg(\\exists P\\forall V\\,Kill(P,V))$.
2. Negating $\\exists P$ changes it to $\\forall P$; negate what follows: $\\forall P\\,\\neg(\\forall V\\,Kill(P,V))$.
3. Negating $\\forall V$ changes it to $\\exists V$, and negate the predicate: $\\forall P\\exists V\\,\\neg Kill(P,V)$.

So every candidate program has at least one virus that it does not kill. The virus may differ from program to program.`,
    {
      terms: `**Negate a quantifier:** $\\neg\\forall xP(x)\\equiv\\exists x\\neg P(x)$; $\\neg\\exists xP(x)\\equiv\\forall x\\neg P(x)$.`,
      recognition: 'Move the negation inward one quantifier at a time: flip $\\forall$ and $\\exists$, then negate the final predicate.',
      trap: 'Negating the outer quantifier alone is not enough. The predicate must also be negated, and every quantifier in a chain must be handled.',
    },
  ),
  explainedPage(
    22,
    'Exercises — test two quantified equation claims',
    'Statement (1) lets $y$ depend on each $x$; statement (2) asks for one fixed $x$ that works for every $y$. The answers for (1)/(2) are: (a) true/false, (b) true/true, (c) true/false, (d) true/true, (e) false/false.',
    `For each equation, evaluate:

1. $\\forall x\\in\\mathbb R\\;\\exists y\\in\\mathbb R$ such that the equation holds.
2. $\\exists x\\in\\mathbb R\\;\\forall y\\in\\mathbb R$ such that it holds.

**(a) $2x+y=7$.** For (1), given any $x$, choose $y=7-2x$; substitution gives $2x+(7-2x)=7$. For (2), no fixed $x$ can make the equation hold for every $y$: changing $y$ changes the left side.

**(b) $y+x=x+y$.** Addition is commutative, so the equation holds for every pair $(x,y)$. Thus both statements are true; for (2), any fixed real $x$ works.

**(c) $x^2-2xy+y^2=0$.** Factor the left side: $(x-y)^2=0$, which is true exactly when $y=x$. For (1), choose $y=x$ for each $x$. For (2), one fixed $x$ cannot equal every real $y$, so it is false.

**(d) $(x-5)(y-1)=0$.** For (1), choose $y=1$, making the second factor zero for every $x$. For (2), choose $x=5$, making the first factor zero for every $y$. Both are true.

**(e) $x^2+y^2=-1$.** For real $x,y$, both squares are nonnegative, so their sum cannot be $-1$. There is no $y$ for any $x$, and no fixed $x$ works for every $y$. Both are false.

The exercise’s note is important: the two statements can both be true (for example, (b) and (d)) or both be false (e).`,
    {
      terms: `**Statement (1): $\\forall x\\exists y$** — after each $x$ is given, a matching $y$ may be chosen.  
**Statement (2): $\\exists x\\forall y$** — choose one $x$ that must work for every $y$.`,
      recognition: 'Translate the quantifiers before solving: ask whether the second variable may respond to the first, or whether one fixed first value must handle all second values.',
      trap: 'A solution pair for one $y$ does not prove statement (2). In (2), the same $x$ must work for all real $y$.',
    },
  ),
  visualOnlyPage(
    23,
    'Section divider — arguments with quantified statements',
    'This outline slide highlights the final topic and adds no rule or example.',
  ),
  explainedPage(
    24,
    'Universal generalization — prove an arbitrary case',
    'If you prove $R(c)$ for an arbitrary object $c$ without using any special fact about it, you may conclude $\\forall xR(x)$.',
    `The displayed rule has the form

$$\\frac{A\\to R(c)}{A\\to\\forall xR(x)},$$

provided $c$ is independent of assumption $A$. “Independent” means $c$ was not chosen because it has a special property supplied by $A$. If the proof only works for a special $c$, it cannot establish a claim about every $x$.

The slide’s informal example says: take any integer $c$; then $2c$ is even. Since $c$ was arbitrary, conclude that $2x$ is even for every integer $x$. The domain should be understood as integers here, because “even” is a property of integers.

The page remarks that universal claims can be difficult to prove and names mathematical induction as a method introduced later.`,
    {
      terms: `**Universal generalization** — move from a proof for an arbitrary domain element to a statement about every element.  
**$c$ independent of $A$** — the assumptions did not restrict $c$ to a special case.`,
      recognition: 'Before generalizing, ask: “Would this reasoning work for any object in the domain, or did I rely on a special feature of this one?”',
      trap: 'If the proof depends on a special choice of $c$ (for example, that $c=0$), it does not prove $R(x)$ for all $x$.',
      note: 'The slide says “any number” in its even-number example; the domain is stated here as integers because only integers are classified as even.',
    },
  ),
  explainedPage(
    25,
    'Rules of inference — four quantified moves',
    'The table separates safe moves from universal and existential claims: specialize a universal, generalize an arbitrary case, name an existential witness, or generalize a known example.',
    `The slide’s table lists four rules:

1. **Universal instantiation:** from $\\forall xP(x)$, infer $P(c)$ for any particular $c$ in the domain. If every integer is even after doubling, then the claim applies to 4.
2. **Universal generalization:** if you prove $P(c)$ for an arbitrary $c$, infer $\\forall xP(x)$. The word **arbitrary** matters: $c$ cannot be a specially selected witness.
3. **Existential instantiation:** from $\\exists xP(x)$, introduce a name $c$ for some object that satisfies it, and use $P(c)$. The named $c$ is a witness, not an arbitrary object.
4. **Existential generalization:** from $P(c)$ for a known object, infer $\\exists xP(x)$, because at least one object has the property.

Think of the universal rules as “all implies this one” and “arbitrary one implies all”; the existential rules are “there is one, so name a witness” and “this one works, so at least one exists.”`,
    {
      terms: `**Instantiation** — apply a quantified statement to a particular domain object.  
**Generalization** — infer a quantified statement from an appropriate particular case.  
**Witness** — the object that makes an existential predicate true.`,
      recognition: 'For a conclusion about one object, instantiate a universal. For a conclusion about all objects, prove an arbitrary case. For existence, identify an actual witness.',
      trap: 'Do not treat an existential witness as arbitrary. From “some student passed,” you cannot infer that every student passed.',
      note: 'The page is a scanned image table; its text was read from the rendered slide because extraction returned no text.',
    },
  ),
  explainedPage(
    26,
    'Arguments with quantified statements — use a named object',
    'After substituting a particular object $a$ into a universal rule, ordinary modus ponens and modus tollens can be used on that case.',
    `The slide gives three argument patterns:

- **Universal instantiation:** from $\\forall xP(x)$, conclude $P(a)$ for a selected object $a$ in the domain.
- **Universal modus ponens:** from $\\forall x(P(x)\\to Q(x))$ and $P(a)$, first instantiate to $P(a)\\to Q(a)$, then use modus ponens to conclude $Q(a)$.
- **Universal modus tollens:** from $\\forall x(P(x)\\to Q(x))$ and $\\neg Q(a)$, instantiate to $P(a)\\to Q(a)$, then modus tollens gives $\\neg P(a)$.

**Added example:** if every enrolled student has an ID and Mariam is enrolled, the first two premises give that Mariam has an ID. If the rule says enrolled students have an ID and Mariam does not have an ID, modus tollens lets us conclude she is not enrolled (assuming the rule applies to her domain).`,
    {
      terms: `**Modus ponens:** $P\\to Q$, $P$; therefore $Q$.  
**Modus tollens:** $P\\to Q$, $\\neg Q$; therefore $\\neg P$.`,
      recognition: 'Substitute the same named object into every occurrence of the quantified rule before applying a propositional inference rule.',
      trap: 'The conclusion must concern the same object $a$ used in the premise. Do not mix predicates or witnesses from different objects.',
    },
  ),
  explainedPage(
    27,
    'Worked argument — a student who passed has not read the book',
    'Use the first premise to name one class member who has not read the book; the second premise guarantees that this same student passed.',
    `Define $C(x)$ = “$x$ is in this class,” $B(x)$ = “$x$ has read the book,” and $P(x)$ = “$x$ passed the first exam.” The premises and target are:

$$\\exists x(C(x)\\land\\neg B(x)),\\qquad
\\forall x(C(x)\\to P(x));\\qquad
\\text{conclude }\\exists x(P(x)\\land\\neg B(x)).$$

Follow the proof table in order:

1. **Premise:** some $x$ is in the class and has not read the book.
2. **Existential instantiation:** call that same student $a$. Then $C(a)\\land\\neg B(a)$.
3. **Simplification:** keep $C(a)$; the conjunction also gives $\\neg B(a)$.
4. **Premise:** every class member passed: $\\forall x(C(x)\\to P(x))$.
5. **Universal instantiation:** apply it to $a$: $C(a)\\to P(a)$.
6. **Modus ponens:** because $C(a)$, conclude $P(a)$.
7. We still have $\\neg B(a)$ from step 2.
8. **Conjunction:** combine the two facts into $P(a)\\land\\neg B(a)$.
9. **Existential generalization:** since this particular $a$ has both properties, conclude $\\exists x(P(x)\\land\\neg B(x))$.

The key is preserving the same witness $a$ throughout; that is what connects “passed” to “has not read.”`,
    {
      terms: `**Simplification** — from $A\\land B$, infer either part.  
**Conjunction** — combine $A$ and $B$ into $A\\land B$.`,
      recognition: 'In an existential premise, name its witness once and carry that same name through the rest of the proof.',
      trap: 'Do not use one student for the “not read” fact and a different student for the “passed” fact. The conclusion needs one person with both properties.',
      note: 'The proof slide is legible visually, but its text extraction is empty; this walkthrough follows the displayed proof table.',
    },
  ),
  explainedPage(
    28,
    'Predicate-calculus validity — true for every domain and predicate',
    'If every object has both $Q$ and $P$, then every object has $Q$ and every object has $P$; this implication is valid regardless of the domain or predicates.',
    `The slide contrasts two kinds of validity:

- **Propositional validity:** $(A\\to B)\\lor(B\\to A)$ is true for every choice of truth values for $A$ and $B$. One of the two implications must hold.
- **Predicate-calculus validity:**

$$\\forall z[Q(z)\\land P(z)]\\to[\\forall xQ(x)\\land\\forall yP(y)].$$

To read the second formula, assume its left side: every domain object $z$ has both properties $Q$ and $P$. Then any object $x$ has $Q$, so $\\forall xQ(x)$; and any object $y$ has $P$, so $\\forall yP(y)$. Thus the right side follows.

“Valid” means the logical form guarantees truth; the particular people, numbers, or predicates do not have to be filled in first.`,
    {
      terms: `**Valid rule** — an implication whose conclusion follows from its logical form in every interpretation.  
**$\\land$** — both statements hold.`,
      recognition: 'For a proposed validity, assume the antecedent is true and see whether the consequent must follow for arbitrary objects.',
      trap: 'Validity does not mean the conclusion is true in every situation by itself. It means that whenever the premise holds, the conclusion follows.',
    },
  ),
  explainedPage(
    29,
    'Countermodel — the disjunction quantifier rule is invalid',
    'The implication $\\forall z[Q(z)\\lor P(z)]\\to[(\\forall xQ(x))\\lor(\\forall yP(y))]$ is not valid: each object may satisfy a different side of the “or.”',
    `To disprove validity, find one **countermodel**: choose a domain and predicates where the premise is true but the conclusion is false.

Let the domain be all integers. Define $Q(n)$ to mean “$n$ is even” and $P(n)$ to mean “$n$ is odd.”

- The premise $\\forall z[Q(z)\\lor P(z)]$ is true: every integer is either even or odd.
- $\\forall xQ(x)$ is false because, for example, 1 is not even.
- $\\forall yP(y)$ is false because, for example, 2 is not odd.
- Therefore the consequent, which is “all are even **or** all are odd,” is false.

So the implication has a true premise and a false conclusion in this interpretation, proving the proposed rule invalid. The mistake would be to move “or” outside the universal quantifier: different integers can satisfy different sides.

**Whole-lecture recap:** state the domain; read quantifiers from left to right; negate by flipping each quantifier and negating the predicate; do not swap a mixed $\\forall/\\exists$ pair without proof; and check inference steps by keeping the same object or witness throughout.`,
    {
      terms: `**Countermodel** — a concrete interpretation that makes a proposed universal rule fail.  
**$Q(z)\\lor P(z)$** — at least one of the two predicates holds for each $z$; it need not be the same predicate for every object.`,
      recognition: 'To challenge a rule, try splitting a domain into two groups: one satisfies $Q$, the other satisfies $P$. This may keep $Q\\lor P$ true while making both universal claims false.',
      trap: 'From “each object is even or odd,” you cannot conclude “all objects are even or all are odd.” The side of the disjunction can vary by object.',
    },
  ),
];

export const discreteMathLecture4Lesson: Lesson = {
  id: 'discrete-math-lecture-4',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/4 Quantifiers.pdf',
  sourcePath: 'Discrete Math/lecture/4 Quantifiers.pdf',
  title: 'Lecture 4: Quantifiers and First-Order Logic — older course archive',
  sourcePageCount: 29,
  pages,
  lastReviewed: '2026-10-14',
};
