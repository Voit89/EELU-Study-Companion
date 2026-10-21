import type { LessonMasterKey, PageGuide } from '../types';

export const discreteMathLecture3MasterKey: LessonMasterKey = {
  bigIdea:
    'Propositional logic is arithmetic with two values: **T** and **F**. Every question in this lecture is one of six moves: decide whether a sentence is a proposition, translate English into symbols, build a truth table, simplify or negate with laws, rewrite a conditional, or test an argument.',

  rules: [
    {
      name: 'Proposition test',
      plain:
        'A proposition is a sentence with one definite truth value. A question, a command, or an expression with an undefined variable is not a proposition.',
      when: 'Use this on every “is this a statement?” question.',
    },
    {
      name: 'The four connectives',
      plain:
        'NOT flips T and F. AND is true only when both inputs are true. Inclusive OR is false only when both inputs are false. XOR is true only when the inputs differ.',
      latex: String.raw`\neg p,\quad p\land q,\quad p\lor q,\quad p\oplus q`,
      when: 'Use this to translate or evaluate basic compound statements.',
    },
    {
      name: 'Implication',
      plain:
        'p → q is false in exactly one case: p is true and q is false. If the hypothesis is false, the implication is true.',
      latex: String.raw`p\to q`,
      when: 'Use this for every if-then truth value.',
    },
    {
      name: 'Logical equivalence',
      plain:
        'Two statements are equivalent when they have the same truth table. In a simplification, every line must be equivalent to the line before it, and you should name the law used.',
      latex: String.raw`p\equiv q`,
      when: 'Use this for simplify, prove, and “supply the reason” questions.',
    },
    {
      name: 'De Morgan',
      plain:
        'To negate an AND or an OR, negate each part and flip the connective: NOT(AND) becomes OR of the NOTs; NOT(OR) becomes AND of the NOTs.',
      latex: String.raw`\neg(p\land q)\equiv\neg p\lor\neg q,\qquad \neg(p\lor q)\equiv\neg p\land\neg q`,
      when: 'Use this whenever a NOT sits outside parentheses.',
    },
    {
      name: 'Conditional family',
      plain:
        'An implication can be written with OR, and its contrapositive is equivalent. The converse and inverse are not equivalent.',
      latex: String.raw`p\to q\equiv\neg p\lor q\equiv\neg q\to\neg p`,
      when: 'Use this for if-then as OR, contrapositive, converse, and inverse questions.',
    },
    {
      name: 'Validity',
      plain:
        'An argument is valid when there is no row with all premises true and the conclusion false. One such row is a counterexample and proves the argument invalid.',
      when: 'Use this for arguments, proofs, and word-problem modeling.',
    },
  ],

  recipes: [
    {
      id: 'proposition-test',
      name: 'Proposition or not?',
      trigger: 'The question asks whether a sentence is a statement or proposition.',
      steps: [
        'Look for a question mark, a command, or a variable with no assigned value.',
        'If one of those appears, it is not a proposition.',
        'Otherwise ask: can this sentence be labeled T or F right now, even if nobody knows which? If yes, it is a proposition.',
      ],
      example: {
        question: 'Which are propositions: (a) 3 × 3 = 8, (b) x + y > 0, (c) Close the door.',
        steps: [
          '(a) It is definitely false, so it has a definite truth value.',
          '(b) x and y are undefined, so the truth changes with the values.',
          '(c) It is a command, not a claim.',
        ],
        answer: 'Only (a) is a proposition.',
      },
      check: 'A false statement is still a proposition. “Unknown” does not mean “not a proposition.”',
    },
    {
      id: 'translate-english',
      name: 'English → symbols',
      trigger: 'A sentence uses and, or, not, if, only if, unless, necessary, sufficient, neither…nor, or iff.',
      steps: [
        'Underline each basic claim and give it one letter.',
        'Replace the keywords: and/but = ∧, or = ∨, not = ¬, if p then q = p → q.',
        'Translate “p only if q” as p → q, “p if q” as q → p, and “p iff q” as p ↔ q.',
        'Put parentheses around each compound part before joining it to another part.',
      ],
      example: {
        question: '“It is not hot but it is sunny.” Let p = hot, q = sunny.',
        steps: [
          '“not hot” becomes ¬p.',
          '“but” is AND, so it becomes ∧.',
          '“sunny” is q.',
        ],
        answer: '¬p ∧ q.',
      },
      check: 'The direction of “only if” is the most common translation trap.',
    },
    {
      id: 'truth-table',
      name: 'Truth table without wasted work',
      trigger: 'The question asks for a truth table, an equivalence, a tautology, or a validity check.',
      steps: [
        'If the question does not explicitly require a table, use a law or a known valid form first.',
        'To disprove equivalence, one differing row is enough; to prove it, every row must match, so finish the table.',
        'For validity, stop at the first row where all premises are T and the conclusion is F.',
        'When you must build the table, add only the columns you need and evaluate the outermost connective last.',
      ],
      example: {
        question: 'Show that ¬(p ∧ q) ≡ ¬p ∨ ¬q.',
        steps: [
          'Make four rows for p and q.',
          'Compute p ∧ q, then negate that column.',
          'Compute ¬p, ¬q, then OR those two columns.',
          'Compare the final columns row by row.',
        ],
        answer: 'Both final columns are F, T, T, T, so the statements are equivalent.',
      },
      check: 'To prove equivalence, every row must match. To disprove, one row is enough.',
    },
    {
      id: 'simplify-negate',
      name: 'Simplify or negate with laws',
      trigger: 'The question says simplify, prove an equivalence, or write a negation.',
      steps: [
        'Push every NOT inward first, using De Morgan.',
        'Use distributive or factoring to expose a common part.',
        'Replace p ∨ ¬p with T, p ∧ ¬p with F, p ∧ T with p, and p ∨ F with p.',
        'Write the name of the law beside each line.',
      ],
      example: {
        question: 'Simplify ¬(¬p ∧ q) ∧ (p ∨ q).',
        steps: [
          'De Morgan: (p ∨ ¬q) ∧ (p ∨ q).',
          'Distributive: p ∨ (¬q ∧ q).',
          'Complement: p ∨ F.',
          'Identity: p.',
        ],
        answer: 'p.',
      },
      check: 'Every line must keep the same truth table; a missing law name leaves the proof incomplete.',
    },
    {
      id: 'conditional-forms',
      name: 'Rewrite a conditional',
      trigger: 'The question asks for contrapositive, converse, inverse, negation, or if-then as OR.',
      steps: [
        'Write the original as p → q.',
        'Contrapositive: swap and negate both, ¬q → ¬p. This one is equivalent.',
        'Converse: q → p. Inverse: ¬p → ¬q. Neither is equivalent in general.',
        'Negation: p ∧ ¬q. If-then as OR: ¬p ∨ q.',
      ],
      example: {
        question: 'For “If x² is even, then x is even”, write the contrapositive and the negation.',
        steps: [
          'p = “x² is even”, q = “x is even”.',
          'Contrapositive: ¬q → ¬p.',
          'Negation: p ∧ ¬q.',
        ],
        answer: 'Contrapositive: if x is not even, then x² is not even. Negation: x² is even and x is not even.',
      },
      check: 'Do not call the converse or the inverse “equivalent” to the original.',
    },
    {
      id: 'argument-validity',
      name: 'Test an argument or model a system',
      trigger: 'The question gives premises and a conclusion, or asks you to translate a word problem into logic.',
      steps: [
        'Give every basic claim a letter and translate each sentence.',
        'Try a known valid form: modus ponens (p → q, p ⊢ q), modus tollens (p → q, ¬q ⊢ ¬p), or disjunctive syllogism (p ∨ q, ¬p ⊢ q).',
        'If no form fits, search for one row where all premises are true and the conclusion is false. That row proves the argument invalid.',
        'For a system model, write each rule as an implication and derive only what the rules force.',
      ],
      example: {
        question: 'If it rains, the match is cancelled. The match is not cancelled. What follows?',
        steps: [
          'Let p = rain, q = cancelled.',
          'Premises: p → q and ¬q.',
          'This is modus tollens.',
        ],
        answer: '¬p: it did not rain.',
      },
      check: 'Affirming the consequent (p → q, q ⊢ p) and denying the antecedent (p → q, ¬p ⊢ ¬q) are invalid.',
    },
  ],

  formulaSheet: [
    {
      label: 'Implication as OR',
      latex: String.raw`p\to q\equiv\neg p\lor q`,
      plain: 'An if-then is the same as “not p, or q.”',
    },
    {
      label: 'Negation of an implication',
      latex: String.raw`\neg(p\to q)\equiv p\land\neg q`,
      plain: 'The only way an if-then fails is: p happens and q fails.',
    },
    {
      label: 'Contrapositive',
      latex: String.raw`p\to q\equiv\neg q\to\neg p`,
      plain: 'Swap the two parts and negate both.',
    },
    {
      label: 'Biconditional',
      latex: String.raw`p\leftrightarrow q\equiv(p\to q)\land(q\to p)`,
      plain: 'Iff means both directions.',
    },
    {
      label: 'De Morgan 1',
      latex: String.raw`\neg(p\land q)\equiv\neg p\lor\neg q`,
      plain: 'NOT over AND becomes OR of the NOTs.',
    },
    {
      label: 'De Morgan 2',
      latex: String.raw`\neg(p\lor q)\equiv\neg p\land\neg q`,
      plain: 'NOT over OR becomes AND of the NOTs.',
    },
    {
      label: 'Distributive',
      latex: String.raw`p\land(q\lor r)\equiv(p\land q)\lor(p\land r)`,
      plain: 'Multiply the outside part into the bracket.',
    },
    {
      label: 'Distributive (dual)',
      latex: String.raw`p\lor(q\land r)\equiv(p\lor q)\land(p\lor r)`,
      plain: 'The same rule with AND and OR swapped.',
    },
    {
      label: 'Complement',
      latex: String.raw`p\lor\neg p\equiv\mathbf T,\qquad p\land\neg p\equiv\mathbf F`,
      plain: 'A statement or its negation is always true; both together are always false.',
    },
    {
      label: 'Identity',
      latex: String.raw`p\land\mathbf T\equiv p,\qquad p\lor\mathbf F\equiv p`,
      plain: 'AND with true and OR with false change nothing.',
    },
    {
      label: 'Domination',
      latex: String.raw`p\lor\mathbf T\equiv\mathbf T,\qquad p\land\mathbf F\equiv\mathbf F`,
      plain: 'True swallows an OR; false swallows an AND.',
    },
    {
      label: 'Double negation',
      latex: String.raw`\neg\neg p\equiv p`,
      plain: 'Two NOTs cancel.',
    },
    {
      label: 'Modus ponens',
      latex: String.raw`p\to q,\ p\ \vdash\ q`,
      plain: 'Affirm the hypothesis, then affirm the conclusion.',
    },
    {
      label: 'Modus tollens',
      latex: String.raw`p\to q,\ \neg q\ \vdash\ \neg p`,
      plain: 'Deny the conclusion, then deny the hypothesis.',
    },
    {
      label: 'Disjunctive syllogism',
      latex: String.raw`p\lor q,\ \neg p\ \vdash\ q`,
      plain: 'One option is ruled out, so the other one must hold.',
    },
    {
      label: 'Hypothetical syllogism',
      latex: String.raw`p\to q,\ q\to r\ \vdash\ p\to r`,
      plain: 'Chain two implications.',
    },
  ],

  traps: [
    'The converse (q → p) and inverse (¬p → ¬q) are not equivalent to p → q. Only the contrapositive is.',
    'p → q is true when p is false. The only false row is p true, q false.',
    'The negation of p → q is p ∧ ¬q, not ¬p → ¬q.',
    'De Morgan requires flipping the connective. Putting NOT on each part without flipping is wrong.',
    '“p only if q” means p → q. “p if q” means q → p. The direction is reversed.',
    'A truth table must contain all 2ⁿ rows. Missing rows can hide a counterexample.',
    'One matching row does not prove equivalence. The whole final columns must match.',
    'Inclusive OR is true when both inputs are true. XOR is the one that is false when both are true.',
    'A valid argument can have a false conclusion if one of its premises is false. Validity is about the form.',
    'One counterexample row is enough to prove an argument invalid.',
    'Do not add real-world “extra meaning” to an implication. Logic keeps only the stated direction.',
    'When a proof asks for a reason, an unnamed step is incomplete even if the algebra is correct.',
  ],

  recall: [
    {
      prompt: 'When is p → q false?',
      answer: 'Only when p is true and q is false.',
    },
    {
      prompt: 'Write p → q using only NOT and OR.',
      answer: '¬p ∨ q.',
    },
    {
      prompt: 'Negate p → q.',
      answer: 'p ∧ ¬q.',
    },
    {
      prompt: 'Write the contrapositive of p → q.',
      answer: '¬q → ¬p. It is equivalent to the original.',
    },
    {
      prompt: 'Are the converse and inverse equivalent to p → q?',
      answer: 'No. Converse: q → p. Inverse: ¬p → ¬q.',
    },
    {
      prompt: 'Apply De Morgan to ¬(p ∧ q).',
      answer: '¬p ∨ ¬q.',
    },
    {
      prompt: 'Apply De Morgan to ¬(p ∨ q).',
      answer: '¬p ∧ ¬q.',
    },
    {
      prompt: 'Translate “p only if q”.',
      answer: 'p → q.',
    },
    {
      prompt: 'Translate “p if q”.',
      answer: 'q → p.',
    },
    {
      prompt: 'When is an argument invalid?',
      answer: 'When at least one row makes all premises true and the conclusion false.',
    },
    {
      prompt: 'What is modus ponens?',
      answer: 'p → q, p ⊢ q.',
    },
    {
      prompt: 'What is modus tollens?',
      answer: 'p → q, ¬q ⊢ ¬p.',
    },
  ],

  checklist: [
    'I can tell a proposition from a question, command, or open sentence.',
    'I can translate and, or, not, if, only if, and iff without reversing the direction.',
    'I can build a truth table with all 2ⁿ rows and the right subexpression columns.',
    'I can prove an equivalence with a truth table or with named laws.',
    'I can negate an AND, an OR, and an if-then correctly.',
    'I can write the contrapositive and explain why it is equivalent; I know the converse and inverse are not.',
    'I can test an argument with modus ponens, modus tollens, or a counterexample row.',
    'I can translate a short system description into implications.',
    'I can spot the invalid forms: affirming the consequent and denying the antecedent.',
    'I can name every law used in a simplification proof.',
  ],

  sprint: [
    {
      minutes: 8,
      title: 'Master Key',
      detail: 'Read the big idea, the 7 rules, and the formula sheet once.',
      view: 'master',
      anchor: 'mk-rules',
    },
    {
      minutes: 18,
      title: 'Quick pass',
      detail: 'One card per slide: Zatoona, exam move, trap. Skip the 3 marked slides.',
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
      detail: 'Answer the 12 recall cards, then read the ready checklist.',
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

export const discreteMathLecture3PageGuides: Record<number, PageGuide> = {
  1: { importance: 'skip' },
  2: {
    importance: 'must',
    examMove: [
      'Ask whether the sentence already has one definite truth value.',
      'If it contains an undefined variable, a question, or a command, it is not a proposition.',
      'If it is a definite claim, it is a proposition even when it is false or unknown.',
    ],
    check: 'False or unknown does not mean “not a proposition.”',
  },
  3: {
    importance: 'must',
    examMove: [
      'NOT: flip the truth value.',
      'AND: true only in the TT row.',
      'Inclusive OR: false only in the FF row.',
    ],
    check: 'Inclusive OR is false only in the FF row; AND is true only in the TT row.',
  },
  4: {
    importance: 'must',
    examMove: [
      'Give each basic claim a letter.',
      'Replace and/but with ∧, or with ∨, not with ¬.',
      'Keep parentheses around each compound part.',
    ],
    check: '“But” is AND, not a new operator.',
  },
  5: {
    importance: 'must',
    examMove: [
      'Negate each part.',
      'Flip ∧ to ∨ and ∨ to ∧.',
      'Do not change the parts themselves.',
    ],
    check: 'NOT over AND becomes OR of the NOTs.',
  },
  6: {
    importance: 'must',
    examMove: [
      'Use De Morgan directly: ¬(p ∧ q) ≡ ¬p ∨ ¬q.',
      'If asked for a table, check the rows where p ∧ q is true, then negate.',
      'Compare only the two final columns.',
    ],
    check: 'The final columns must match in every row.',
  },
  7: {
    importance: 'must',
    examMove: [
      'Push NOT inward with De Morgan.',
      'Factor or rearrange with the distributive law.',
      'Use p ∨ ¬p = T and p ∧ T = p; name each law.',
    ],
    check: 'Every line must keep the same truth table.',
  },
  8: {
    importance: 'must',
    examMove: [
      'XOR is true when exactly one input is true.',
      'Build one AND term for each true row: p ∧ ¬q and ¬p ∧ q.',
      'OR the terms together.',
    ],
    check: 'XOR is false when both inputs are true.',
  },
  9: {
    importance: 'must',
    examMove: [
      'XOR is false in the TT and FF rows.',
      'Write the negation of each false row: ¬(p ∧ q) and ¬(¬p ∧ ¬q).',
      'AND those two conditions.',
    ],
    check: 'This formula must match the true-row formula.',
  },
  10: {
    importance: 'must',
    examMove: [
      'XOR is true only when the inputs differ: check TF and FT first.',
      'It must be false on TT and FF; if not, reject the candidate.',
      'Build the full table only if the candidate has extra columns or the question asks.',
    ],
    check: 'XOR is true exactly when the inputs differ.',
  },
  11: {
    importance: 'must',
    examMove: [
      'List every input combination.',
      'Evaluate each gate from left to right.',
      'Record the sum and carry outputs in their own columns.',
    ],
    check: 'Trace each output separately.',
  },
  12: {
    importance: 'must',
    examMove: [
      'Tautology: the final column is all T.',
      'Contradiction: the final column is all F.',
      'To disprove, find one row that breaks the claim.',
    ],
    check: 'One satisfying row proves “not a contradiction.”',
  },
  13: {
    importance: 'skim',
    check: 'Use this page to check De Morgan and inequality endpoint behavior.',
  },
  14: {
    importance: 'must',
    examMove: [
      'Identify the outer operator.',
      'Find the matching law on the sheet.',
      'Replace only that part and name the law.',
    ],
    check: 'Use the law in the direction that simplifies the expression.',
  },
  15: {
    importance: 'must',
    examMove: [
      'Start from the more complicated side.',
      'Replace one subexpression at a time.',
      'Write the law name beside every line.',
    ],
    check: 'Never change both sides at once.',
  },
  16: {
    importance: 'must',
    examMove: [
      'Continue until you reach the target expression.',
      'Check that every line is equivalent to the previous one.',
      'State the final equivalence clearly.',
    ],
    check: 'A missing reason leaves the proof incomplete.',
  },
  17: {
    importance: 'skim',
    check: 'Use this page to practise naming the law for each step.',
  },
  18: { importance: 'skip' },
  19: {
    importance: 'must',
    examMove: [
      'p → q is false only when p is true and q is false.',
      'If p is false, the implication is true.',
      'Read “if p then q” as a promise that is broken only by p-and-not-q.',
    ],
    check: 'True-to-false is the only broken promise.',
  },
  20: {
    importance: 'skim',
    check: '“A is sufficient for B” means A → B.',
  },
  21: {
    importance: 'must',
    examMove: [
      'Check only the T→F case: p true, q false.',
      'Every other case makes p → q true.',
      'Do not build the full table unless the question asks for one.',
    ],
    check: 'True-to-false is the only false row.',
  },
  22: {
    importance: 'skim',
    check: 'For a conditional equivalence, choose truth table, laws, or intuition.',
  },
  23: {
    importance: 'must',
    examMove: [
      'Replace p → q with ¬p ∨ q.',
      'Check: it is false only when p is true and q is false.',
      'Use this to remove arrows before simplifying.',
    ],
    check: 'The NOT goes on the hypothesis, not the conclusion.',
  },
  24: {
    importance: 'must',
    examMove: [
      'An if-then fails only when p happens and q fails.',
      'So ¬(p → q) = p ∧ ¬q.',
      'Never write ¬p → ¬q as the negation.',
    ],
    check: 'The negation of an if-then is an AND statement.',
  },
  25: {
    importance: 'skim',
    check: 'Translate each English claim before trying to prove anything.',
  },
  26: {
    importance: 'skim',
    check: 'This is a worked example of rewriting an OR as an implication.',
  },
  27: {
    importance: 'skim',
    check: 'Keep the whole “if” clause and negate the whole “then” clause.',
  },
  28: {
    importance: 'must',
    examMove: [
      'Swap p and q.',
      'Negate both parts: ¬q → ¬p.',
      'This is equivalent to the original implication.',
    ],
    check: 'The contrapositive is not the converse.',
  },
  29: {
    importance: 'must',
    examMove: [
      'Swap and negate both: ¬q → ¬p.',
      'Use it directly; the contrapositive is automatically equivalent.',
      'Build the table only if the question explicitly asks for one.',
    ],
    check: 'The contrapositive is equivalent; the converse is not.',
  },
  30: {
    importance: 'skim',
    check: 'Negate the result first, then the condition.',
  },
  31: {
    importance: 'skim',
    check: '“S is necessary for R” means R → S; its contrapositive is ¬S → ¬R.',
  },
  32: {
    importance: 'must',
    examMove: [
      'Converse: q → p.',
      'Inverse: ¬p → ¬q.',
      'Neither is equivalent to p → q in general.',
    ],
    check: 'Only the contrapositive is equivalent.',
  },
  33: {
    importance: 'must',
    examMove: [
      '“R if S” = S → R.',
      '“R only if S” = R → S.',
      '“R iff S” = both directions.',
    ],
    check: '“Only if” points from R to S.',
  },
  34: {
    importance: 'must',
    examMove: [
      'p ↔ q is true when p and q have the same truth value.',
      'Rewrite it as (p → q) ∧ (q → p).',
      'To prove it, prove both directions.',
    ],
    check: 'One direction alone is not enough.',
  },
  35: {
    importance: 'skim',
    check: 'Logic records only the stated implication, not extra real-world meaning.',
  },
  36: {
    importance: 'skim',
    check: 'Turn over A and 3: A could hide an odd number; 3 could hide a vowel.',
  },
  37: {
    importance: 'must',
    examMove: [
      'Assume all premises are true.',
      'Ask whether the conclusion must also be true.',
      'If one row makes the premises true and the conclusion false, the argument is invalid.',
    ],
    check: 'Validity is about the form, not whether the conclusion happens to be true.',
  },
  38: {
    importance: 'must',
    examMove: [
      'Match p → q and p.',
      'Conclude q.',
      'Do not reverse the implication.',
    ],
    check: 'Affirming the consequent is invalid.',
  },
  39: {
    importance: 'must',
    examMove: [
      'Match p → q and ¬q.',
      'Conclude ¬p.',
      'Do not conclude ¬q from ¬p.',
    ],
    check: 'Denying the antecedent is invalid.',
  },
  40: {
    importance: 'must',
    examMove: [
      'The assumptions P → Q, Q → R, R → P do not force P, Q, and R to be true.',
      'Try P = Q = R = false.',
      'All three implications are still true, so the argument is invalid.',
    ],
    check: 'A valid argument must force the conclusion in every row.',
  },
  41: {
    importance: 'skim',
    check: 'This page is the counterexample row for the implication cycle.',
  },
  42: {
    importance: 'must',
    examMove: [
      'Form: p → q, q, therefore p.',
      'This form is invalid.',
      'Counterexample: p false, q true.',
    ],
    check: 'The result can be true for another reason.',
  },
  43: {
    importance: 'skim',
    check: 'Form: p → q, ¬p, therefore ¬q. This is also invalid.',
  },
  44: {
    importance: 'must',
    examMove: [
      'Match the exact form before applying a rule.',
      'Modus ponens: p → q, p ⊢ q.',
      'Modus tollens: p → q, ¬q ⊢ ¬p.',
      'Disjunctive syllogism: p ∨ q, ¬p ⊢ q.',
    ],
    check: 'If the form is not on the list, test it with a counterexample.',
  },
  45: {
    importance: 'must',
    examMove: [
      'Assign one letter per basic claim.',
      'Write each sentence as an implication or compound statement.',
      'Keep the direction of “if” and “when” exactly.',
    ],
    check: 'Do not add facts the sentence does not state.',
  },
  46: {
    importance: 'must',
    examMove: [
      'E → ¬S: capacity exceeded means the doors are not closed.',
      'M → S: moving means the doors are closed.',
      '((S ∧ E) ∨ (M ∧ ¬S)) → A: the alarm trigger.',
    ],
    check: 'Parenthesize the whole trigger before the arrow.',
  },
  47: { importance: 'skip' },
  48: {
    importance: 'must',
    examMove: [
      'Start from the alarm rule and ¬A.',
      'Modus tollens makes the whole trigger false.',
      'Use De Morgan to split it into the two rules.',
    ],
    check: 'Keep track of the outer negation.',
  },
  49: {
    importance: 'skim',
    check: 'Use this page to practise choosing a valid form for each conclusion.',
  },
};
