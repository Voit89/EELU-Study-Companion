import type { Lesson, LessonPage } from '../types';

interface PageTeachingNotes {
  recognition?: string;
  trap?: string;
  mentalPicture?: string;
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
  if (teaching?.mentalPicture) {
    blocks.push({ type: 'alternate', title: 'A quick mental picture', markdown: teaching.mentalPicture });
  }
  return { sourcePage, title, coverage: 'explained', blocks, ...(note ? { note } : {}) };
}

const pages: LessonPage[] = [
  {
    sourcePage: 1,
    title: 'Chapter 1 — Speaking Mathematically',
    coverage: 'visual-only',
    blocks: [],
    note: 'This is a chapter cover with a title and decorative image. It introduces no set definitions or exercises.',
  },
  explainedPage(
    2,
    'The language of sets — membership and roster notation',
    'A set is a collection of distinct elements: use $x\\in S$ to say “$x$ is in $S$,” and list elements inside braces when using roster notation. Order and repeated listings do not change the set.',
    `A set is a collection of objects called elements. The notation on this page tells us how to say whether an object belongs to a set and how to list its members.

- $x\\in S$ means $x$ is an element of $S$.
- $x\\notin S$ means $x$ is not an element of $S$.

The **set-roster notation** writes the elements between braces. For example, $\\{1,2,3\\}$ is the set with elements 1, 2, and 3. The axiom of extension on this page says that a set is determined by which elements it contains—not their order or how many times a member is written. So $\\{1,2,3\\}=\\{3,1,2\\}=\\{1,1,2,3,3\\}$.

For a long list, an ellipsis $\\ldots$ means “and so forth.” Thus $\\{1,2,3,\\ldots,100\\}$ lists the integers from 1 through 100, while $\\{1,2,3,\\ldots\\}$ continues through all positive integers.`,
    `**Set** — a collection of distinct members.  
**Element** — one object in a set.  
**$\\in$ / $\\notin$** — is an element of / is not an element of.  
**Braces $\\{\\}$** — mark the beginning and end of a set listing.  
**Ellipsis $\\ldots$** — “and so forth,” when the pattern is clear.`,
    undefined,
    {
      recognition: 'If you see $x\\in S$, check whether the exact object $x$ appears among the members of $S$. For roster sets, ignore order and repeated copies.',
      trap: 'A set is not a list: $\\{1,2,3\\}$ and $\\{3,2,1\\}$ are the same set, and repeating 2 does not create a new element.',
    },
  ),
  explainedPage(
    3,
    'Example 1 — using set-roster notation',
    'Compare the members inside the braces, not their order or repetition: $A$, $B$, and $C$ all contain exactly $1,2,3$.',
    `Part (a) asks whether three differently written rosters describe the same set.

- $A=\\{1,2,3\\}$ has members 1, 2, and 3.
- $B=\\{3,1,2\\}$ lists those same three members in another order.
- $C=\\{1,1,2,3,3,3\\}$ repeats some members, but a set counts each distinct member once.

Therefore $A=B=C=\\{1,2,3\\}$. The page also asks parts (b)–(d); their solutions continue on source page 4.`,
    `**Same set** — two rosters are equal when their distinct members match.  
**Nonnegative integer** — an integer that is zero or positive; here $n$ is the input to the definition $U_n=\\{n,-n\\}$.`,
    'This slide shows the full question and only the solution to part (a). Parts (b)–(d) are explained with their printed solutions on source page 4.',
    {
      recognition: 'To compare two roster sets, list each distinct member once. Matching members mean matching sets even if the printed lists look different.',
    },
  ),
  explainedPage(
    4,
    'Example 1 — zero and nested sets',
    'Braces change what the object is: $0$ is a number, while $\\{0\\}$ is a one-element set. In $U_0$, both listed values collapse to the same element, so $U_0=\\{0\\}$.',
    `**Part (b): is $\\{0\\}=0$?** No. The left side is a set with one member, while the right side is the number zero itself.

**Part (c): how many members are in $\\{1,\\{1\\}\\}$?** There are two: the number $1$, and the set $\\{1\\}$. The inside set is one object in the outside set. Its member happens to be 1, but the set $\\{1\\}$ is not the same object as the number 1.

**Part (d): use $U_n=\\{n,-n\\}$.** Substitute the requested values:

- $U_1=\\{1,-1\\}$.
- $U_2=\\{2,-2\\}$.
- $U_0=\\{0,-0\\}=\\{0,0\\}=\\{0\\}$, because $-0=0$ and a set keeps only distinct members.`,
    `**Nested set** — a set used as one member of another set.  
**$U_n$** — the set made from $n$ and its opposite $-n$; for $n=0$, both entries are zero.`,
    undefined,
    {
      recognition: 'When braces appear inside braces, count the whole inner set as one member. When a roster repeats equal values, keep one copy.',
      trap: 'Do not confuse “the number $0$” with “the set containing 0.” Likewise, $1$ and $\\{1\\}$ are different objects.',
    },
  ),
  explainedPage(
    5,
    'The language of sets — common number sets',
    'Recognize the three number-set symbols on the slide: $\\mathbb R$ is the real numbers, $\\mathbb Z$ is the integers, and $\\mathbb Q$ is the rational numbers.',
    `The table assigns a standard symbol to each of three number sets.

- $\\mathbb R$: all real numbers, pictured as the full number line. It includes values such as $-2$, $0$, $3.5$, and $\\sqrt2$.
- $\\mathbb Z$: all integers—negative whole numbers, zero, and positive whole numbers, such as $-2,-1,0,1,2$.
- $\\mathbb Q$: all rational numbers, meaning numbers that can be written as a quotient $m/n$ of integers with $n\\ne0$. Examples include $3/4$, $-2= -2/1$, and $0=0/1$.

The table is a symbol-to-set key. **Supplemental examples:** $3/4$ is rational, and $\\sqrt2$ is real but not an integer. When a later set-builder expression says $x\\in\\mathbb Z$, only integers are allowed as candidates for $x$; if it says $x\\in\\mathbb R$, any real number may be considered.`,
    `**Real ($\\mathbb R$)** — the numbers on the continuous number line.  
**Integer ($\\mathbb Z$)** — a negative whole number, zero, or positive whole number.  
**Rational ($\\mathbb Q$)** — a number expressible as a fraction of integers with nonzero denominator.  
**Real ($\\mathbb R$)** — a number on the continuous number line.`,
    undefined,
    {
      recognition: 'Read the domain symbol before solving: $x\\in\\mathbb Z$ restricts answers to integers; $x\\in\\mathbb R$ allows all real-number values.',
    },
  ),
  explainedPage(
    6,
    'The language of sets — discrete objects and set-builder notation',
    'Set-builder notation describes a set by a domain and a condition: $\\{x\\in S\\mid P(x)\\}$ means the members of $S$ that make $P(x)$ true.',
    `The integers are discrete because neighboring integers are separated; the real number line is continuous. The slide then introduces a second way to describe a set.

Set-builder notation is a compact “filter” for a set. In $\\{x\\in S\\mid P(x)\\}$:

1. $S$ is the starting set, so it tells us which objects are allowed to be considered.
2. $P(x)$ is a condition or property that may be true or false for each candidate $x$.
3. The vertical bar $\\mid$ is read “such that.” Keep only candidates for which $P(x)$ is true.

**Supplemental example:** $\\{x\\in\\mathbb Z\\mid x>0\\}$ means “the integers $x$ such that $x$ is greater than zero,” so it describes the positive integers.`,
    `**Set-builder notation** — a domain plus a condition that filters its members.  
**$P(x)$** — a condition tested on $x$.  
**$\\mid$** — “such that.”  
**Discrete** — separated values rather than every point of a continuous interval.`,
    undefined,
    {
      recognition: 'When you see $\\{x\\in S\\mid\u00a0\\text{condition}\\}$, read it left to right: “choose $x$ from $S$; keep it only if the condition is true.”',
      trap: 'Do not skip the domain $S$. The same condition can describe different sets when $x$ is allowed to be real, integer, or positive integer.',
    },
  ),
  explainedPage(
    7,
    'Example 2 — read three set-builder descriptions',
    'The three sets all use the same strict bounds, $-2<x<5$; the domain decides whether the answers are all real numbers, only integers, or only positive integers.',
    `Here $\\mathbb R$ denotes all real numbers, $\\mathbb Z$ all integers, and $\\mathbb Z^+$ all positive integers. Read each expression as a domain plus a condition.

- (a) $\\{x\\in\\mathbb R\\mid -2<x<5\\}$: candidates are all real numbers, then retain those between the bounds.
- (b) $\\{x\\in\\mathbb Z\\mid -2<x<5\\}$: candidates are integers only.
- (c) $\\{x\\in\\mathbb Z^+\\mid -2<x<5\\}$: candidates are positive integers only.

The slide gives the descriptions and asks you to write out each set. Its worked results are on source page 8.`,
    `**Domain** — the allowed starting set from which $x$ is chosen.  
**$\\mathbb Z^+$** — the positive integers $1,2,3,\\ldots$.`,
    'This page contains the three questions; their worked interpretations appear on source page 8.',
    {
      recognition: 'First copy the allowed domain, then apply the inequality. The interval condition does not override a domain restriction.',
    },
  ),
  explainedPage(
    8,
    'Example 2 — solutions in the reals, integers, and positive integers',
    'The same bounds produce different sets because the allowed candidates change: an open real interval, six integers, or four positive integers.',
    `**(a) Real-number domain.** The set contains all real values strictly between $-2$ and 5. **Supplemental notation:** this open interval can be written $(-2,5)$. The number line shows open endpoints.

**(b) Integer domain.** Keep only integer values between those bounds: $-1,0,1,2,3,4$. Thus the set is $\\{-1,0,1,2,3,4\\}$. The endpoints $-2$ and 5 are excluded.

**(c) Positive-integer domain.** From those integers, keep only positive ones: $1,2,3,4$. So the set is $\\{1,2,3,4\\}$.

Notice the order of reasoning: domain first, condition second. A real interval includes non-integers such as $1/2$; an integer-domain set cannot.`,
    `**Open interval $(a,b)$** — real numbers strictly between $a$ and $b$.  
**Positive integer** — an integer greater than zero.`,
    undefined,
    {
      recognition: 'If the domain is $\\mathbb R$, describe an interval. If it is $\\mathbb Z$ or $\\mathbb Z^+$ and the bounds are finite, list the allowed integers carefully.',
      trap: 'Do not include $-2$ or 5: $-2<x<5$ uses strict $<$ signs. Also, the real answer is not just the six integers; it includes every real number between them.',
    },
  ),
  explainedPage(
    9,
    'Subsets — every member stays inside the larger set',
    '$A\\subseteq B$ means every element of $A$ is also an element of $B$. It does not require $A$ to be smaller; equality is allowed.',
    `A basic relation between sets is containment: every member of the smaller set must also be a member of the larger one.

**Supplemental example:** if $A=\\{2,4\\}$ and $B=\\{1,2,3,4\\}$, then $A\\subseteq B$ because both 2 and 4 are members of $B$. The phrases “$A$ is contained in $B$” and “$B$ contains $A$” mean the same thing.

The subset relation allows $A=B$: every element of a set is also an element of itself, so $A\\subseteq A$. A **proper subset** is stricter and is introduced on the next page.`,
    `**Subset ($A\\subseteq B$)** — every member of $A$ is also in $B$.  
**For all ($\\forall$)** — the rule must hold for every candidate $x$.  
**Contained in** — another phrase for “is a subset of.”`,
    undefined,
    {
      recognition: 'To test $A\\subseteq B$, inspect the members of the left-hand set $A$ one by one. If even one is missing from $B$, the statement is false.',
      trap: 'Subset does not mean “has fewer elements.” A set is a subset of itself, so equality is permitted by $\\subseteq$.',
      mentalPicture: 'Think of $A$ as a smaller container placed inside $B$: every item in the smaller container must also be present in the larger one.',
    },
  ),
  explainedPage(
    10,
    'Subsets — not a subset and proper subset',
    'One counterexample disproves a subset claim. A proper subset $A\\subset B$ means all of $A$ is in $B$, and $B$ has at least one extra element.',
    `The page first explains how to disprove a subset claim, then defines the stricter relation called a proper subset.

The page then defines a **proper subset**. In the source notation, $A\\subset B$ means:

1. Every element of $A$ is in $B$; and
2. At least one element of $B$ is not in $A$.

**Supplemental example:** $\\{2\\}\\subset\\{1,2,3\\}$ is proper because 2 is in the larger set and 1 and 3 are extra members. But $\\{1,2,3\\}\\subseteq\\{1,2,3\\}$ is a subset, not a proper subset.`,
    `**Not a subset ($A\\nsubseteq B$)** — some member of $A$ is absent from $B$.  
**Proper subset ($A\\subset B$ in this source)** — $A$ is contained in $B$, and $B$ has at least one additional element.`,
    'The source uses $\\subseteq$ for subset and $\\subset$ for proper subset. Some books use $\\subset$ differently, so follow the definitions printed in this lecture.',
    {
      recognition: 'For “not a subset,” search for one counterexample. For “proper subset,” check both containment and that the larger set has something extra.',
      trap: 'Containment alone does not prove a proper subset: if $A=B$, then $A\\subseteq B$ but not $A\\subset B$.',
    },
  ),
  explainedPage(
    11,
    'Example 4 — membership $\\in$ versus subset $\\subseteq$',
    '$\\in$ asks whether one object is a member; $\\subseteq$ asks whether every member of one set lies in another. The slide’s true statements are (a), (d), and (f).',
    `These six statements deliberately mix the membership symbol $\\in$ and the subset symbol $\\subseteq$. Check which kind of relation each one asserts.

- **(a) $2\\in\\{1,2,3\\}$ — true.** The number 2 is one of the listed members.
- **(b) $\\{2\\}\\in\\{1,2,3\\}$ — false.** The members on the right are the numbers 1, 2, and 3; the set $\\{2\\}$ is not one of them.
- **(c) $2\\subseteq\\{1,2,3\\}$ — false.** The left side of a subset relation must be a set; 2 is a number, not a set in this lesson.
- **(d) $\\{2\\}\\subseteq\\{1,2,3\\}$ — true.** The only member of the left set is 2, and 2 is in the right set.
- **(e) $\\{2\\}\\subseteq\\{\\{1\\},\\{2\\}\\}$ — false.** The left set contains the number 2, but the right set contains the two sets $\\{1\\}$ and $\\{2\\}$; it does not contain the number 2.
- **(f) $\\{2\\}\\in\\{\\{1\\},\\{2\\}\\}$ — true.** Here the entire set $\\{2\\}$ is exactly one of the right-hand set's members.

So the source answer, only (a), (d), and (f), follows by checking whether each statement asks for membership or containment.`,
    `**$2\\in S$** — test whether the number 2 itself is a member.  
**$\\{2\\}\\in S$** — test whether the whole one-member set is listed as a member.  
**$\\{2\\}\\subseteq S$** — test whether the member inside the braces, 2, is in $S$.`,
    undefined,
    {
      recognition: 'Circle the relation: $\\in$ compares one object to a set; $\\subseteq$ compares a set to another set. Then check the exact object inside the braces.',
      trap: 'The number 2 and the one-element set $\\{2\\}$ are not interchangeable. A set that contains 2 does not automatically contain $\\{2\\}$ as a member.',
    },
  ),
  explainedPage(
    12,
    'Example 4 — why the remaining subset statements are false',
    'The last two false answers come from checking the actual member on the left: 2 is not a set, and 2 is not either of the set-valued members on the right.',
    `For (c), the number 2 is not a set, so it cannot be a subset of $\\{1,2,3\\}$.

- **(c) $2\\subseteq\\{1,2,3\\}$ is false.** To use $\\subseteq$, the left side must be a set whose members can be checked. The number 2 is not a set in this course, so it cannot be the left-hand set in a subset claim.
- **(e) $\\{2\\}\\subseteq\\{\\{1\\},\\{2\\}\\}$ is false.** The only member of the left side is the number 2. The right side's members are the sets $\\{1\\}$ and $\\{2\\}$, not the number 2. Therefore the left member is not contained in the right set.

Read one pair of braces at a time: the inside object matters. The number 2 is different from the set $\\{2\\}$. **Supplemental notation example:** $\\{\\{2\\}\\}$ is a set whose only member is the set $\\{2\\}$. `,
    `**One layer of braces** — $\\{2\\}$ is a set containing the number 2.  
**Two layers** — $\\{\\{2\\}\\}$ is a set containing the one-element set $\\{2\\}$.`,
    undefined,
    {
      recognition: 'For a subset statement, take each member of the left set and ask whether that exact object appears among the right set’s members.',
      trap: 'Do not silently remove braces while comparing members. The number 2 and the set $\\{2\\}$ are different objects.',
    },
  ),
  explainedPage(
    13,
    'The empty set',
    'The empty set $\\emptyset$ has no elements. An intersection is empty when the two sets share no members; no real number squares to $-1$.',
    `A set is allowed to contain no elements. The slide gives this unique set its own name and symbol.

The examples show two ways to get an empty set:

- $\\{1,3\\}\\cap\\{2,4\\}=\\emptyset$. The symbol $\\cap$ means **intersection**: keep only elements that appear in both sets. Here there are none in common.
- $\\{x\\in\\mathbb R\\mid x^2=-1\\}=\\emptyset$. This asks for real numbers whose square is $-1$. A real number multiplied by itself is never negative, so there is no real $x$ that meets the condition.

**Supplemental distinction:** the empty set is different from $\\{\\emptyset\\}$: the latter is a set with one element, namely the empty set.`,
    `**Empty set ($\\emptyset$)** — the set with zero elements.  
**Intersection ($A\\cap B$)** — the set of elements that belong to both $A$ and $B$.  
**$x^2$** — $x$ multiplied by itself.`,
    undefined,
    {
      recognition: 'If a set-builder condition cannot be true for any allowed value, the described set is $\\emptyset$. For an intersection, look for common members.',
      trap: 'The empty set has no members; $\\{\\emptyset\\}$ has one member. The outer braces create a set containing the empty set.',
    },
  ),
  {
    sourcePage: 14,
    title: 'Why programmers learn sets — source slide partly unreadable',
    coverage: 'unreadable',
    blocks: [],
    note: 'The slide title and sentence about distinguishing valid and invalid input types are readable. It visibly labels examples as `"" : string`, a quoted blank as `space`, `0 : value`, and `null : ∅`; however, the left-side arrow examples are blank or missing in this PDF, so their intended mapping and full explanation cannot be recovered reliably. This is an application-motivation slide, not a new set rule.',
  },
  explainedPage(
    15,
    'Example 5 — mutually disjoint sets',
    'A family of sets is mutually disjoint when every pair has no shared elements. One overlapping pair is enough to answer “no.”',
    `**Part (a):** $A_1=\\{3,5\\}$, $A_2=\\{1,4,6\\}$, and $A_3=\\{2\\}$. No member is shared by any pair.

**Part (b):** $B_1=\\{2,4,6\\}$, $B_2=\\{3,7\\}$, and $B_3=\\{4,5\\}$. $B_1$ and $B_3$ both contain 4. Therefore they are not mutually disjoint, $B_2$ shares no member with either one.`,
    `**Disjoint sets** — sets that have no common elements.  
**Mutually disjoint** — every distinct pair in the family is disjoint.`,
    undefined,
    {
      recognition: 'For three or more sets, compare every pair. Stop as soon as one shared member appears; that disproves mutual disjointness.',
      trap: 'It is not enough that most pairs are disjoint. “Mutually” requires every pair to have no overlap.',
    },
  ),
  explainedPage(
    16,
    'Partitions of sets — split a set into non-overlapping pieces',
    'A partition breaks all of $A$ into pieces that do not overlap: each piece is a subset of $A$, and together their union is exactly $A$.',
    `The diagram divides a larger region $A$ into four regions $A_1,A_2,A_3,A_4$. Each piece stays inside $A$, and all four pieces together cover $A$.

$$A=A_1\\cup A_2\\cup A_3\\cup A_4.$$

The symbol $\\cup$ means **union**: include anything that belongs to at least one of the listed sets. So this equation says the pieces cover all of $A$ without adding anything outside $A$. Because the drawn regions do not overlap—and the prior page defined mutual disjointness—a partition also requires the pieces to be pairwise disjoint.

In ordinary language, a partition is a complete sorting of the original set: every element goes into one piece, and no element is placed into two pieces.`,
    `**Union ($A\\cup B$)** — members in $A$, in $B$, or in both.  
**Partition** — nonempty subsets that cover the whole set and are mutually disjoint; in this example each drawn piece is a region inside $A$.`,
    'The figure labels four regions; the next page tests the same partition idea using listed sets and integer classes.',
    {
      recognition: 'To decide whether proposed pieces partition $A$, check both: (1) their union covers every member of $A$, and (2) no member is shared by two pieces.',
      trap: 'Covering $A$ alone is not enough: overlapping pieces fail the disjointness requirement. Disjointness alone is not enough either if some element of $A$ is left out.',
    },
  ),
  explainedPage(
    17,
    'Example 6 — test two proposed partitions',
    'For a partition, prove “covers everything” and “no overlap.” In part (b), every integer belongs to exactly one remainder class: 0, 1, or 2 after division by 3.',
    `**Part (a)** uses $A=\\{1,2,3,4,5,6\\}$ with $A_1=\\{1,2\\}$, $A_2=\\{3,4\\}$, and $A_3=\\{5,6\\}$. Check whether the pieces cover every element exactly once.

**Part (b)** defines three subsets of the integers $\\mathbb Z$:

- $T_0=\\{n\\in\\mathbb Z\\mid n=3k\\text{ for some integer }k\\}$: multiples of 3.
- $T_1=\\{n\\in\\mathbb Z\\mid n=3k+1\\text{ for some integer }k\\}$: integers that are 1 more than a multiple of 3.
- $T_2=\\{n\\in\\mathbb Z\\mid n=3k+2\\text{ for some integer }k\\}$: integers that are 2 more than a multiple of 3.

Here $k$ is an integer that can be positive, zero, or negative. **Supplemental examples:** $8=3(2)+2$, so $8\\in T_2$; $-4=3(-2)+2$, so $-4\\in T_2$. The question asks whether these classes partition all integers; the next slide explains why.`,
    `**$k$** — an integer used to generate members of a remainder class.  
**Remainder classes mod 3** — the groups of integers represented by $3k$, $3k+1$, and $3k+2$.  
**$T_0,T_1,T_2$** — names for these three groups, not individual numbers.`,
    'The source defines all three sets and asks whether they form a partition; its justification appears on source page 18.',
    {
      recognition: 'When integers are sorted by formulas $3k$, $3k+1$, and $3k+2$, think of division by 3 and its three possible remainders.',
      trap: 'Do not restrict $k$ to positive integers. The source says $k$ is an integer, so the classes include negative numbers as well as zero and positive numbers.',
    },
  ),
  explainedPage(
    18,
    'Example 6 — why both collections are partitions',
    'Part (a) covers $A$ with three non-overlapping groups. Part (b) works because every integer has exactly one remainder, 0, 1, or 2, when divided by 3.',
    `**Part (a):** Yes. $A=A_1\\cup A_2\\cup A_3$, and no number appears in two pieces, so the sets form a partition of $A$.

**Part (b): all integers.** The slide says every integer $n$ has exactly one of these forms for some integer $k$:

$$n=3k,\\qquad n=3k+1,\\qquad n=3k+2.$$

Read this as division by 3 with remainder 0, 1, or 2. “Exactly one” does two jobs:

1. An integer cannot be in two different classes, so $T_0,T_1,T_2$ are mutually disjoint.
2. Every integer is in one of the classes, so their union is all of $\\mathbb Z$:

$$\\mathbb Z=T_0\\cup T_1\\cup T_2.$$

Together, no overlap plus complete coverage proves that $\\{T_0,T_1,T_2\\}$ is a partition of $\\mathbb Z$.`,
    `**“Exactly one”** — at least one class contains the integer, and no second class does.  
**$\\mathbb Z$** — all integers, including negative integers and zero.`,
    undefined,
    {
      recognition: 'A proof of partition is complete when it establishes both coverage and pairwise disjointness. The phrase “exactly one” establishes both at once.',
      trap: 'Showing only that each integer has one of the forms proves coverage; the word “exactly” is what also rules out overlap.',
    },
  ),
  explainedPage(
    19,
    'Example 7 — the power set',
    'The power set $\\mathcal P(A)$ is the set of every subset of $A$. A two-element set has four subsets: the empty set, either one-element set, and the whole set.',
    `The power set collects every possible subset of the original set. The source asks us to do this for $\\{x,y\\}$.

Check the possible subsets:

1. $\\emptyset$ has no elements, so it is contained in $\\{x,y\\}$.
2. $\\{x\\}$ contains only $x$.
3. $\\{y\\}$ contains only $y$.
4. $\\{x,y\\}$ is a subset of itself.

There are no others because a subset can include or leave out each of the two elements. Therefore

$$\\mathcal P(\\{x,y\\})=\\{\\emptyset,\\{x\\},\\{y\\},\\{x,y\\}\\}.$$

Notice the nested braces: the outermost braces collect the four subsets; each inner set is one member of the power set.`,
    `**Power set ($\\mathcal P(A)$ or $P(A)$)** — the set of all subsets of $A$.  
**Subset of itself** — every set is contained in itself.  
**$\\emptyset$** — one subset that every set has.`,
    undefined,
    {
      recognition: 'To build a power set, list every possible selection of the original elements, including selecting none and selecting all.',
      trap: 'Do not confuse $\\emptyset$ with $\\{\\emptyset\\}$. The first has no members; the second has one member (the empty set).',
      mentalPicture: 'For each element, decide “include it” or “leave it out.” With $x$ and $y$, the four choices give $\\emptyset$, $\\{x\\}$, $\\{y\\}$, and $\\{x,y\\}$.',
    },
  ),
  explainedPage(
    20,
    'Exercise — test membership and subset statements',
    'For each line, first identify the relation: membership asks whether the whole left object is listed; subset asks whether every member inside the left set belongs to the right set.',
    `If $X=\\{1,2,3,4\\}$, decide whether each displayed membership or subset statement is true.

| Statement | Check | Result |
| --- | --- | --- |
| $\\emptyset\\in X$ | $X$ lists only the numbers 1, 2, 3, 4; it does not list the empty set. | False |
| $\\emptyset=0$ | One side is a set and the other is the number zero. | False |
| $\\emptyset=\\{\\emptyset\\}$ | The right side contains one member; the left has none. | False |
| $\\{1,3\\}\\subset X$ | Both 1 and 3 are in $X$, and $X$ has other elements too. | True |
| $\\emptyset\\subset P(X)$ | The empty set is a proper subset of every nonempty set; $P(X)$ is nonempty. | True |
| $1\\in X$ | The number 1 is listed in $X$. | True |
| $\\{1,3\\}\\in X$ | $X$ contains the numbers 1, 2, 3, 4, not the set $\\{1,3\\}$. | False |
| $\\{\\{1,2\\}\\}\\subset P(X)$ | Its only member $\\{1,2\\}$ is a subset of $X$, so it is an element of $P(X)$. | True |
| $\\{2\\}\\subset P(X)$ | This would require the number 2 itself to be an element of $P(X)$, meaning 2 would have to be a subset of $X$. In this lecture numbers are not sets. | **False** |
| $\\{\\{1\\}\\}\\subset X$ | Its only member is the set $\\{1\\}$, which is not one of the number-members of $X$. | False |
| $\\emptyset\\subset X$ | The empty set is contained in every set, and $X$ has members beyond it. | True |
| $1\\subset X$ | The left side is a number, not a set. | False |

So the true statements by these definitions are $\\{1,3\\}\\subset X$, $\\emptyset\\subset P(X)$, $1\\in X$, $\\{\\{1,2\\}\\}\\subset P(X)$, and $\\emptyset\\subset X$.`,
    `**$P(X)$** — the power set; its members are subsets of $X$.  
**Membership check** — compare one complete object with the listed members.  
**Subset check** — compare each member of the left set with the members of the right set.`,
    'Source ambiguity: the PDF shows rounded boxes around several statements but does not label what the boxes mean. One box appears around $\\{2\\}\\subset P(X)$; under the lecture’s own distinction that 2 is a number and not a set (source pages 11–12), that statement is false. The table above checks every line from the definitions rather than treating the boxes as an answer key.',
    {
      recognition: 'Translate in order: $a\\in X$ asks “is $a$ one of the listed members?”; $A\\subseteq X$ asks “is each member of $A$ listed in $X$?”; $A\\in P(X)$ asks “is $A$ itself a subset of $X$?”',
      trap: 'For $A\\subset P(X)$, do not merely check whether $A$ is a subset of $X$. Check the members of $A$: each one must itself be a member of the power set.',
    },
  ),
  explainedPage(
    21,
    'Example 8 — ordered pairs',
    'An ordered pair remembers position: $(a,b)=(c,d)$ only when the first entries match and the second entries match. Reversing entries usually changes the pair.',
    `An ordered pair stores two entries in fixed positions. The page compares pairs by checking the first positions and then the second positions.

**(a)** $(1,2)$ is not $(2,1)$ because equality would require both $1=2$ and $2=1$. Those are false, so the pairs differ.

**(b)** The slide asks whether $\\left(3,\\frac{5}{10}\\right)=\\left(\\sqrt9,\\frac12\\right)$. Compare corresponding positions:

- First: $3=\\sqrt9$, since $\\sqrt9=3$.
- Second: $\\frac{5}{10}=\\frac12$, after dividing numerator and denominator by 5.

Both positions match, so these ordered pairs are equal. The solution continues on source page 22.`,
    `**Ordered pair $(a,b)$** — a first entry $a$ followed by a second entry $b$.  
**Equality rule** — $(a,b)=(c,d)$ exactly when $a=c$ and $b=d$.  
**Corresponding positions** — first with first, second with second.`,
    'Part (c), asking for the first entry of $(1,1)$, is answered on source page 22.',
    {
      recognition: 'To compare ordered pairs, do not compare them as sets. Check first-to-first and second-to-second.',
      trap: 'Even if the entries are the same two numbers, reversing their positions changes the ordered pair: $(1,2)\\ne(2,1)$.',
    },
  ),
  explainedPage(
    22,
    'Example 8 — finish the ordered-pair questions',
    'The pairs in part (b) are equal because both corresponding entries match; in $(1,1)$, both the first and second entries are 1.',
    `**Part (b):** Equality requires the first entries to match and the second entries to match; simplify the radical and fraction to check.

**Part (c):** The first element of $(1,1)$ is the entry before the comma: 1. The second element is also 1; the two positions happen to contain equal values.`,
    `**First element** — the entry to the left of the comma.  
**Second element** — the entry to the right of the comma.`,
    undefined,
    {
      recognition: 'When a question asks for the first element, read the left position; do not confuse it with “the first distinct value.”',
    },
  ),
  explainedPage(
    23,
    'Cartesian products — pair one member from each set',
    '$A\\times B$ is the set of ordered pairs whose first entry comes from $A$ and whose second entry comes from $B$. The order of the sets determines the order inside each pair.',
    `Given sets $A$ and $B$, the Cartesian product $A\\times B$ (“$A$ cross $B$”) contains ordered pairs formed from one member of each set.

$$A\\times B=\\{(a,b)\\mid a\\in A\\text{ and }b\\in B\\}.$$

To form one pair, choose its first entry from $A$, then its second from $B$. “And” means both membership conditions must hold for each pair. **Supplemental example:** if $A=\\{1,2\\}$ and $B=\\{u,v\\}$, then $(1,u)$ and $(2,v)$ belong to $A\\times B$; $(u,1)$ belongs to $B\\times A$, not $A\\times B$.

The symbol $\\times$ here names a set operation. It does not mean multiply the elements as numbers.`,
    `**Cartesian product ($A\\times B$)** — all ordered pairs $(a,b)$ with $a\\in A$ and $b\\in B$.  
**“And” in the definition** — both $a\\in A$ and $b\\in B$ must be true.  
**Ordered** — swapping the positions can create a different pair.`,
    undefined,
    {
      recognition: 'For $A\\times B$, make the first coordinate from $A$ and the second coordinate from $B$. For $B\\times A$, swap those roles.',
      trap: 'Do not confuse the Cartesian product with numerical multiplication or assume $A\\times B=B\\times A$. Ordered pairs preserve which set supplied each position.',
    },
  ),
  explainedPage(
    24,
    'Example 9 — questions about Cartesian products',
    'With $A=\\{1,2,3\\}$ and $B=\\{u,v\\}$, form pairs in the stated order, then count the choices. The worked lists are on the next page.',
    `The slide sets $A=\\{1,2,3\\}$ and $B=\\{u,v\\}$, then asks you to list products, count them, and describe the product of the real numbers with themselves.

- (a) list $A\\times B$: first coordinate from $A$, second from $B$.
- (b) list $B\\times A$: reverse the source of the two coordinates.
- (c) list $B\\times B$: both coordinates come from $B$.
- (d) count the pairs in each product.
- (e) describe $\\mathbb R\\times\\mathbb R$, where each coordinate may be any real number.

Before listing, use the definition from source page 23 to keep the positions straight. The exact enumerations and counts are on page 25; the coordinate-plane interpretation of part (e) continues on page 26.`,
    `**$A=\\{1,2,3\\}$**, **$B=\\{u,v\\}$** — the two sets used in parts (a)–(d).  
**Count of choices** — each first-coordinate choice pairs with every allowed second-coordinate choice.`,
    'This page contains the questions; the solutions span source pages 25–26.',
    {
      recognition: 'For a finite Cartesian product, list every combination of a first-set member and a second-set member; for the count, multiply the sizes of the two sets.',
    },
  ),
  explainedPage(
    25,
    'Example 9 — enumerate and count the products',
    'List every allowed pair in order. The counts are $|A\\times B|=|A||B|=6$, $|B\\times A|=6$, and $|B\\times B|=4$.',
    `**(a) $A\\times B$.** The first entry comes from $A$ and the second from $B$. For each second entry, pair it with 1, 2, and 3:

$$A\\times B=\\{(1,u),(2,u),(3,u),(1,v),(2,v),(3,v)\\}.$$

There are $3\\cdot2=6$ pairs.

**(b) $B\\times A$.** Now the first entry comes from $B$:

$$B\\times A=\\{(u,1),(u,2),(u,3),(v,1),(v,2),(v,3)\\}.$$

Again there are $2\\cdot3=6$ pairs. The count matches, but the pairs are arranged in the opposite coordinate order.

**(c) $B\\times B$.** Pair each first choice with both second choices:

$$B\\times B=\\{(u,u),(u,v),(v,u),(v,v)\\}.$$

There are $2\\cdot2=4$ pairs. In general, if finite sets have $m$ and $n$ members, their Cartesian product has $mn$ ordered pairs because each of the $m$ first choices can pair with all $n$ second choices.`,
    `**$|A|$** — the number of elements in finite set $A$.  
**$|A\\times B|$** — the number of ordered pairs in the product.  
**Counting rule** — each of $|A|$ first choices combines with each of $|B|$ second choices.`,
    undefined,
    {
      recognition: 'A reliable listing method: choose one first-coordinate value, pair it with every allowed second-coordinate value, then move to the next first value.',
      trap: 'The number of pairs in $A\\times B$ and $B\\times A$ can match even though the products differ. Check the coordinate positions, not just the count.',
    },
  ),
  explainedPage(
    26,
    'Example 9 — the real plane as $\\mathbb R\\times\\mathbb R$',
    '$\\mathbb R\\times\\mathbb R$ is all ordered pairs $(x,y)$ of real numbers. Each pair identifies one point: $x$ gives horizontal position and $y$ gives vertical position.',
    `For part (e), both coordinates range over all real numbers. The slide explains how these ordered pairs correspond to points in a plane.

$$\\mathbb R\\times\\mathbb R=\\{(x,y)\\mid x\\in\\mathbb R\\text{ and }y\\in\\mathbb R\\}.$$

Draw a horizontal axis and a vertical axis, with a unit length marked on each. Starting at the origin $(0,0)$, the first coordinate tells how far and in which direction to move horizontally; the second tells how far and in which direction to move vertically. This gives one point for each real pair.

The first coordinate is not the vertical value: the order $(x,y)$ is deliberate. The next source page labels example points on the picture.`,
    `**Coordinate pair $(x,y)$** — $x$ is horizontal; $y$ is vertical.  
**Origin $(0,0)$** — the intersection of the two axes.  
**Unit length** — the marked distance used to count coordinate steps.`,
    undefined,
    {
      recognition: 'To plot $(x,y)$, move to $x$ along the horizontal axis first, then to height $y$. A negative coordinate means move left (for $x$) or down (for $y$).',
      trap: 'Do not swap coordinates: $(2,1)$ is 2 units right and 1 up, while $(1,2)$ is 1 right and 2 up.',
      mentalPicture: 'Treat $(x,y)$ like an address: first say how far across, then how far up or down.',
    },
  ),
  explainedPage(
    27,
    'The Cartesian plane — read plotted ordered pairs',
    'A point’s horizontal coordinate is read first and its vertical coordinate second: the plotted labels are $(-3,2)$, $(2,1)$, $(-2,-2)$, and $(1,-2)$.',
    `The Cartesian plane is a plane with horizontal and vertical coordinate axes. Each labeled point shows an ordered pair.

- $(-3,2)$: move 3 units left, then 2 units up.
- $(2,1)$: move 2 units right, then 1 unit up.
- $(-2,-2)$: move 2 units left, then 2 units down.
- $(1,-2)$: move 1 unit right, then 2 units down.

Negative $x$-coordinates lie to the left of the vertical axis; negative $y$-coordinates lie below the horizontal axis. These are examples of points in $\\mathbb R\\times\\mathbb R$, whose meaning was introduced on source page 26.`,
    `**Cartesian plane** — the plane with horizontal $x$- and vertical $y$-axes.  
**Coordinate $(x,y)$** — horizontal location first, vertical location second.`,
    undefined,
    {
      recognition: 'Read a plotted coordinate in order: locate $x$ on the horizontal axis, then $y$ on the vertical axis. Use the signs to choose left/right and up/down.',
      trap: 'A point above the $x$-axis has positive $y$; a point below it has negative $y$. A point left of the $y$-axis has negative $x$.',
    },
  ),
];

export const discreteMathLecture1Lesson: Lesson = {
  id: 'discrete-math-sets-lecture-1-archive',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/1 Sets.pdf',
  sourcePath: 'Discrete Math/lecture/1 Sets.pdf',
  title: 'Lecture 1: Sets — older course archive',
  sourcePageCount: 27,
  pages,
  lastReviewed: '2026-10-14',
};
