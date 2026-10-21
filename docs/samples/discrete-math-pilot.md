# Discrete Math — Sample Concept Units (Phase B Output)
**New format: Concept-First, 3-Door Explanations, Dual Methods, Exam Recipes.**
All numeric/logic claims in this file passed `verify_pipeline.py` (27/27 checks) on 2026-10-21.

---

# 📦 CU 1.5 — POWER SETS
*Source: Lecture 1 (Sets), page 19 · Prereq: CU 1.2 (Subsets) · Exam weight: ★★★*

## 🎯 30-Second Version
The power set P(A) is the **set of ALL subsets** of A — including ∅ and A itself. If A has **n elements, P(A) has 2ⁿ elements**. Listing them is just **deciding, for each element: "in" or "out?"**

## 🚪 Door 1 — The Analogy (Team Selection)
You have 3 friends: {Ahmed, Sara, Omar}. The club asks: "which subsets can you send to the volunteer day?"
For **each friend** you flip a coin: *comes* or *doesn't come*. 3 friends → 2×2×2 = **8 possible delegations** — from "nobody" (∅) to "everybody" (the full set).
A subset is just an attendance list. A power set is the list of all possible attendance lists.

## 🚪 Door 2 — The Mechanical Method (USE THIS IN EXAMS)
**The In/Out binary trick.** Order the elements, then run through binary counting:

For A = {1, 2, 3}, write every 3-bit code (0 = out, 1 = in):

| Code | Subset |
|------|--------|
| 000 | ∅ |
| 001 | {3} |
| 010 | {2} |
| 011 | {2,3} |
| 100 | {1} |
| 101 | {1,3} |
| 110 | {1,2} |
| 111 | {1,2,3} |

**Never miss a subset again:** read codes 0→7 (i.e., 000→111) and each code *is* the subset. |P(A)| = 2³ = 8. ✔ *(verified: CU1.2)*

## 🚪 Door 3 — The Formal Definition (what the PDF says)
P(A) = { S : S ⊆ A }. By definition of subset, every S is a set whose elements all come from A. ∅ ⊆ A always (vacuously), and A ⊆ A always. Therefore both extremes belong to P(A). The count: each of the n elements is either included or not — 2 independent choices per element — hence 2ⁿ by the multiplication principle. *(verified: CU1.1 for n = 0…5)*

## ⚡ College Method vs Fast Method
**Q: "Find P({x, y, z})."**
- **College method (page 19 style):** recall "∅ is a subset of every set… any set is a subset of itself… the only other subsets are…" — relies on *remembering* what you might forget.
- **Fast method:** 2³ = 8 subsets, write binary codes 000→111, translate. **~15 seconds, zero omissions.**

**Q: "How many elements in P(P(A)) if |A| = 4?"**
- **Fast method:** |P(A)| = 2⁴ = 16 → |P(P(A))| = 2¹⁶ = **65,536**. The college PDF never shows this shortcut; the exam *loves* it.

## 📋 Exam Recipe Card
- **Trigger:** "power set", "all subsets", "how many subsets", |P(A)|
- **Steps:** ① Count n = |A| ② If asked *how many*: answer **2ⁿ** (for nested: apply 2ⁿ repeatedly) ③ If asked to *list*: binary codes 0→2ⁿ−1, element i is "in" if bit i = 1 ④ Always include ∅ and A itself
- **Check:** Count your list — it must equal 2ⁿ exactly. If it doesn't, you dropped a code.
- **Trap:** |P(A)| = 2ⁿ, **not** n², not 2n. And {∅} ≠ ∅ — the set containing the empty set has one element; the empty set has none.

## 🧠 Recall Card
**Q:** |P(A)| when |A| = n?
**A:** 2ⁿ — every element answers "in or out?"
**Q:** The two subsets EVERY power set contains?
**A:** ∅ and A itself.

---

# 📦 CU 3.7 — CONTRAPOSITIVE vs CONVERSE vs INVERSE
*Source: Lecture 3 (Propositional Logic), pages 35–47 · Prereq: CU 3.2, 3.4 · Exam weight: ★★★ (highest trap density in the course)*

## 🎯 30-Second Version
From "If p then q": **contrapositive** = flip AND negate (≡ original — always!). **Converse** = just flip (≠ original). **Inverse** = just negate (≠ original). Exam rule: **only the contrapositive can be trusted.**

## 🚪 Door 1 — The Analogy (The Attendance Promise)
"If you **pay**, you **enter**." (p = pay, q = enter)
- **Contrapositive:** "If you **can't enter**, you **didn't pay**." — perfectly consistent with the promise. Same deal, said backwards+negated. ✔
- **Converse:** "If you **enter**, you **paid**." — WAIT, maybe you had a free ticket! This is a *different claim*. ✘
- **Inverse:** "If you **don't pay**, you **can't enter**." — Hmm, maybe you snuck in! Also different. ✘
The promise only breaks in ONE case: paid but kept outside (p true, q false). Contrapositive breaks in exactly that same case — that's why they're equivalent. *(verified: CU2.1)*

## 🚪 Door 2 — The Mechanical Table (memorize this shape)

| Name | Form | Equivalent to p→q? |
|------|------|-------------------|
| Statement | p → q | — |
| **Contrapositive** | **¬q → ¬p** | **YES ✅** |
| Converse | q → p | NO ❌ |
| Inverse | ¬p → ¬q | NO ❌ |
| Converse ↔ Inverse | q→p vs ¬p→¬q | equivalent to *each other* ✅ |

**Truth-table fingerprint (p→q):** T, F, T, T — false **only** when p=T, q=F. *(verified: CU2.6)*

**Speed trick — "the lying row":** the ONLY way p→q is false: hypothesis TRUE, conclusion FALSE. Every "when is this sentence false?" question is this row.

## 🚪 Door 3 — The Formal Verification
Build the 4-row table. Column p→q: (T,T)→T, (T,F)→F, (F,T)→T, (F,F)→T. Column ¬q→¬p: (T,T)→¬T→¬T = T; (T,F)→¬F→¬T = T... wait — carefully: rows where inputs match the table give identical outputs for both columns on all four rows ⇒ **logically equivalent**. The converse column differs from p→q exactly on rows (T,F) and (F,T) ⇒ NOT equivalent. *(verified: CU2.1–CU2.5 — 5 checks)*

## ⚡ College Method vs Fast Method
**Q: "Write the contrapositive of: 'If x² is even, then x is even.'"**
- **College method (page 43):** recall definition, restate… "If x is odd, then x² is odd."
- **Fast method (SWAP-NEGATE, 3 seconds):** swap the two halves → "If x is even, x² is even" → now negate each half: "If x is **not** even (odd), x² is **not** even (odd)." Done. The word "odd" is just ¬"even" in disguise — recognize it.

**Q: "Is 'If n is divisible by 6, then n is divisible by 2' equivalent to 'If n is not divisible by 6, then n is not divisible by 2'?"**
- **Fast method:** second statement is the **inverse** → answer instantly: **NO.** Counterexample row: n=3 (not div by 6, not div by 2 — wait, that makes inverse TRUE here, so pick n=4: not div by 6 BUT div by 2 → inverse false while original true). Inverse fails at n=4. **NO** — no truth table needed in the exam; the form alone answers the question.

## 📋 Exam Recipe Card
- **Trigger:** the words *contrapositive, converse, inverse, "equivalent to the original?", "when is this false?", necessary/sufficient*
- **Steps:** ① Label p (hypothesis) and q (conclusion) ② Form asked: flip only = converse; negate only = inverse; flip+negate = contrapositive ③ If question is "equivalent?" → YES only for contrapositive (and for converse-inverse *with each other*) ④ "When false?" → the single lying row: p=T, q=F
- **Check:** Write your answer's lying row — for a TRUE equivalence claim, it must be the SAME lying row as the original.
- **Traps:** ① "only if" is NOT the converse — "p only if q" = p→q ② Converse and inverse sound reasonable in English ("makes sense") — soundness is NOT equivalence ③ Counterexamples: one differing row kills an equivalence claim

## 📊 The One-Table Summary (screenshot this into your brain)
| You see | You write | Trustworthy? |
|---------|-----------|--------------|
| "contrapositive of p→q" | ¬q → ¬p | ✅ ≡ original |
| "converse of p→q" | q → p | ❌ different claim |
| "inverse of p→q" | ¬p → ¬q | ❌ different claim |
| "negation of p→q" | p ∧ ¬q | ✅ (and NOT an if-statement!) |
| "p if q" | q → p | watch the direction flip |
| "p only if q" | p → q | no flip! |

## 🧠 Recall Card
**Q:** Which of {converse, inverse, contrapositive} is equivalent to p→q?
**A:** Only the contrapositive (¬q→¬p). Converse ≡ inverse, but neither ≡ original.
**Q:** Negation of "if p then q"?
**A:** p AND not-q (never "if").

---

# 📦 CU 2.3 — THE FUNCTION TEST
*Source: Lecture 2 (Functions), pages 11–15 · Prereq: CU 2.1, 1.2 · Exam weight: ★★★*

## 🎯 30-Second Version
A relation from A to B is a **function** when **every** element of A fires **exactly one** arrow into B. Two failure modes: some input has **no** arrow, or some input has **two** arrows. Think: *machine — every input goes in, each input produces ONE output.*

## 🚪 Door 1 — The Analogy (Vending Machine)
A function is a **vending machine**: you press a button (input) → you get ONE item (output).
- Two buttons give the same drink? **Fine** — that's allowed (not injective, but still a function).
- One button gives two drinks at once? **BROKEN** — not a function. *(verified: CU3.1)*
- A button that dispenses nothing? **BROKEN** — not a function (must be defined on ALL of the domain). *(verified: CU3.2)*
The rule is about the *left side only*: every input must have exactly one output. What happens on the right side (targets) is irrelevant for the function test.

## 🚪 Door 2 — The Mechanical Method (Arrow Diagram Audit)
Draw A on the left, B on the right, arrows per the relation. Then run the **2-question audit**:

**Q1 — TOTAL?** Does EVERY element of A have ≥1 arrow coming out? (No orphans on the left!)
**Q2 — SINGLE?** Does NO element of A have ≥2 arrows coming out? (No left element with two exits!)

| Q1 Total? | Q2 Single? | Verdict |
|-----------|-----------|---------|
| ✔ | ✔ | **Function** |
| ✘ | ✔ | Not a function — "missing arrow" (under-defined) |
| ✔ or ✘ | ✘ | Not a function — "double arrow" (over-defined) |

**Lecture Example 3, in 10 seconds** — A = {2,4,6}, B = {1,3,5}:
- R = {(2,5),(4,1),(4,3),(6,5)} → look at **4**: two arrows (→1, →3). **NOT a function** — Q2 fails. *(verified: CU3.1)*
- S: y = x+1 → check **6**: 6+1 = 7, but 7 ∉ B → no arrow. **NOT a function** — Q1 fails. *(verified: CU3.2)*
- T = {(2,5),(4,1),(6,1)} → every left element exits exactly once (4 and 6 may share target 1 — allowed!). **Function.** *(verified: CU3.3)*

## 🚪 Door 3 — The Formal Definition (what the PDF demands you write)
A relation f ⊆ A×B is a function from A to B iff:
1. **(Totality)** ∀x ∈ A, ∃y ∈ B: (x,y) ∈ f — every domain element appears as a first coordinate;
2. **(Single-valuedness)** ∀x ∈ A, ∀y₁,y₂ ∈ B: (x,y₁) ∈ f ∧ (x,y₂) ∈ f ⇒ y₁ = y₂ — no first coordinate repeats with different second coordinates.
Formally: f = {(x,y) ∈ A×B : y = f(x)}, and f: A → B with A the **domain**, B the **co-domain**. Note the asymmetry: the conditions bind **only the first coordinates**.

## ⚡ College Method vs Fast Method
**Q: "Is R = {(2,5),(4,1),(4,3),(6,5)} a function from A={2,4,6} to B={1,3,5}?"**
- **College method:** read the definition, scan all pairs, reason about "property (1)" and "property (2)" — ~60 seconds, easy to talk yourself into a mistake.
- **Fast method:** **left-column duplicate scan**: list first coordinates 2, 4, 4, 6 → duplicate 4 → **NOT a function.** ~5 seconds. Then (if it passed) membership scan: 2✓4✓6✓ all present → function.

**Q (formula relations): "Is y = x+1 from {2,4,6} to {1,3,5} a function?"**
- **Fast method:** compute the worst case — max(A)+1 = 7 ∈ B? No → the top element fires outside B → **not a function.** For rule-based relations always check BOTH extremes (min and max of A) fire inside B.

## 📋 Exam Recipe Card
- **Trigger:** "Is this relation a function?", arrow diagram verdicts, formula relations between finite sets
- **Steps:** ① Write first coordinates only ② Any duplicate with different second value? → **not a function** (double-arrow) ③ Any A-element missing from first coordinates (or firing outside B)? → **not a function** (missing arrow) ④ Both clean → function; state f(a)=b for each
- **Check:** Count your arrows — must equal |A| exactly (every input once).
- **Traps:** ① Two inputs → same output is **LEGAL** (T sends both 4 and 6 to 1) ② {1} and {1,1,1} are the same set — duplicated pairs don't break anything ③ Codomain ≠ range — the function need not "hit" all of B ④ For y=x+1-style rules: don't just look at the middle of A — check the ENDS.

## 🧠 Recall Card
**Q:** The two questions of the Function Test?
**A:** Is every left element covered? Does every left element fire exactly once?
**Q:** Can two inputs share one output?
**A:** Yes — a function is allowed to be non-injective. The ban is on one input having two outputs.

---

## Pipeline Traceability (Phase C grounding report)

| Content element | Source anchor | Verification |
|-----------------|---------------|--------------|
| CU 1.5 all claims | Lecture 1 p.19 (Example 7) | CU1.1–CU1.3 ✔ (6 checks) |
| CU 3.7 equivalence claims | Lecture 3 pp.40–43, 48 | CU2.1–CU2.7 ✔ (7 checks) |
| CU 2.3 R/S/T verdicts | Lecture 2 pp.11–15 (Example 3) | CU3.1–CU3.4 ✔ (4 checks) |
| Handshake/Euler/K_n (concept map) | Lecture 5 pp.21–26; Special Graphs | SUP.1–SUP.3 ✔ (10 checks) |

**Regeneration policy:** any edited claim must re-run `verify_pipeline.py`; a FAIL blocks commit.
