# Discrete Math — Concept Map (Phase A Output)
**Source:** EELU Curriculum, Discrete Math folder (7 lecture PDFs + 9 section practice files)
**Extraction date:** 2026-10-21 · **Method:** PDF text extraction → concept regrouping (pages demoted to citations)

This map reorganizes the curriculum into **28 concept units (CUs)**. Source pages are
*citations*, not structure. `Prereq` chains enforce learning order. `Exam Weight` is derived
from the midterm revision document and section files.

---

## LECTURE 1 — Sets (27 pages → 6 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| 1.1 | Set-roster notation & axiom of extension (order/repetition don't matter) | 2–8 | — | ★★★ (definition questions) |
| 1.2 | Subsets & the ∈ vs ⊆ distinction | 9–12 | 1.1 | ★★★ (true/false trap questions) |
| 1.3 | Empty set ∅, mutual disjointness | 13–15 | 1.1 | ★★☆ |
| 1.4 | Partitions of sets | 16–18 | 1.3 | ★★☆ |
| 1.5 | **Power sets P(A)** | 19 | 1.2 | ★★★ (counting + listing questions) |
| 1.6 | Ordered pairs & Cartesian products A×B | 21–27 | 1.1 | ★★★ (feeds Functions & Relations) |

## LECTURE 2 — Functions (34 pages → 6 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| 2.1 | Relations as subsets of A×B (x R y notation) | 2–7 | 1.6 | ★★★ |
| 2.2 | Arrow diagrams of relations | 8–10 | 2.1 | ★★☆ |
| 2.3 | **The Function Test** (total + single-valued) | 11–15 | 2.1, 1.2 | ★★★ (the classic "is this a function?" question) |
| 2.4 | Function machines, formulas, equality of functions | 16–24 | 2.3 | ★★☆ |
| 2.5 | Modular arithmetic a mod n (incl. negative operands) | 23–24 | — | ★★★ (feeds CS courses too) |
| 2.6 | Images & inverse images of sets under f | 25–34 | 2.3 | ★★☆ |

## LECTURE 3 — Propositional Logic (49 pages → 8 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| 3.1 | Statements/propositions vs non-statements | 2–7 | — | ★★★ |
| 3.2 | Operators ¬, ∧, ∨ + truth tables | 8–11 | 3.1 | ★★★ |
| 3.3 | English → symbols translation (and/but/or/neither-nor) | 12–14 | 3.2 | ★★★ |
| 3.4 | **De Morgan's laws** (break the bar, flip the sign) | 15–18 | 3.2 | ★★★ |
| 3.5 | Simplification with identity laws ("supply the reason" questions) | 19–28 | 3.4 | ★★★ |
| 3.6 | XOR construction + formula-from-truth-table (true rows / false rows method) | 29–34 | 3.2 | ★★☆ |
| 3.7 | **Conditional p→q, negation, contrapositive vs converse vs inverse** | 35–47 | 3.2, 3.4 | ★★★ (highest trap density) |
| 3.8 | If / only-if / iff / necessary & sufficient conditions; biconditional | 48–49 | 3.7 | ★★★ (translation traps) |

## LECTURE 4 — Quantifiers / First-Order Logic (29 pages → 5 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| 4.1 | Predicates & domains | 4–13 | 3.1, 1.1 | ★★★ |
| 4.2 | Truth sets of predicates | 13–17 | 4.1, 1.2 | ★★☆ |
| 4.3 | Universal ∀ and existential ∃ quantifiers; domain-dependence of truth | 18–25 | 4.1 | ★★★ |
| 4.4 | Negating quantifiers (¬∀ = ∃¬; ¬∃ = ∀¬) | 26–30 | 4.3, 3.4 | ★★★ |
| 4.5 | Multiple quantifiers & ordering (∀x∃y vs ∃y∀x) | 30–38 | 4.3 | ★★☆ (deceptive difficulty) |

## LECTURE 5 — Graph Theory (26 pages → 5 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| 5.1 | Graph definition G=(V,E), edge-endpoint function | 2–8 | 1.1 | ★★★ |
| 5.2 | Terminology: incident, adjacent, loops, parallel, isolated | 7–9 | 5.1 | ★★★ (terminology grid questions) |
| 5.3 | Digraphs: in-degree/out-degree; adjacency matrix (n×n) | 10–15 | 5.1 | ★★★ |
| 5.4 | Simple & complete graphs (K_n has n(n−1)/2 edges) | 16–20 | 5.1 | ★★★ |
| 5.5 | **Degree & Handshake Theorem** (Σdeg = 2|E|; even # of odd vertices) | 21–26 | 5.2 | ★★★ (must-know proof) |

## SUPPLEMENT — Special Graphs (22 pages → 2 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| S.1 | Planar graphs & **Euler's formula v − e + f = 2** (K₅, K₃,₃ non-planar) | 3–8 | 5.1 | ★★★ |
| S.2 | Regular, bipartite, complete bipartite K_{m,n}, trees, cycles C_n, wheels W_n | 9–22 | 5.1, S.1 | ★★☆ |

## SUPPLEMENT — Graph Coloring (24 pages → 2 CUs)

| CU | Concept | Source Pages | Prereq | Exam Weight |
|----|---------|-------------|--------|-------------|
| C.1 | Coloring & chromatic number χ(G); 5-step solving method | 4–12 | 5.2 | ★★★ |
| C.2 | Greedy strategy (highest-degree first) + applications (scheduling, maps) | 12–24 | C.1 | ★★☆ |

## PRACTICE LAYER (feeds all CUs)

- **Sections 1–9** (PDF/PPTX): question banks per lecture, with solutions
- **Midterm Revision (Lec 11) + Solution PDF**: covers CUs 1.1–C.1 (first 8 lectures scope)

---

## Learning-Order Chains (what must be mastered before what)

```
1.1 → 1.2 → 1.5                              (sets → subsets → power sets)
1.1 → 1.6 → 2.1 → 2.2 → 2.3 → 2.4/2.6        (sets → products → relations → functions)
1.6 → 2.1 → 2.3 → [2.5 standalone]           (modular arithmetic is self-contained)
3.1 → 3.2 → {3.3, 3.4} → 3.5 → 3.7 → 3.8      (logic spine; 3.6 branches after 3.2)
3.4 + 4.3 → 4.4                               (De Morgan enables quantifier negation)
4.1 → 4.3 → 4.5                               (predicate → quantifier → multi-quantifier)
5.1 → 5.2 → {5.3, 5.4, 5.5}                   (graph spine)
5.2 → C.1 → C.2                               (coloring needs adjacency)
5.1 → S.1 → S.2                               (planar/special graphs)
```

## Filler-Page Disposition (the "skip" economy)

Of the 224 total source pages: title slides, copyright notices, and pure-picture orientation
slides (~15 pages) are marked `skip` in page guides; formula-review slides (~10 pages) are
marked `skim` (they duplicate content that the Master Summary covers better); the remaining
~199 pages map to the 28 CUs above.
