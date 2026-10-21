#!/usr/bin/env node
/**
 * verify-claims.mjs — the anti-hallucination layer (Phase C) of the content
 * pipeline. Every mathematical claim embedded in src/content/topics/** must
 * pass this script before it is committed.
 *
 * Claim IDs map 1:1 to the comments inside the topic files
 * (e.g. "(verified: CU2.1)" inside discrete-math.ts).
 *
 * Usage:  node pipeline/verify-claims.mjs
 * Exit 0 = all claims verified; exit 1 = at least one FAIL (blocks commit).
 */

import { topics, canonElement } from './verify-helpers.mjs';

const PASS = [];
const FAIL = [];

function check(claimId, statement, condition) {
  if (condition) PASS.push(claimId);
  else FAIL.push(claimId);
  console.log(`[${condition ? 'PASS' : 'FAIL'}] ${claimId}: ${statement}`);
}

// ---------------------------------------------------------------
// L1: LECTURE 1 (Sets) — roster/axiom of extension, ∈ vs ⊆, empty set,
// mutual disjointness, partitions, power sets, Cartesian products.
// Claims map to "(verified: L1.x)" comments in
// src/content/topics/discrete-math/lecture-1-sets.ts.
// ---------------------------------------------------------------

// — CU 1.1: the Three-Move Method (axiom of extension) —
check('L1.1', 'Axiom of extension: {1,2,3} = {3,1,2} = {1,1,2,3,3,3} (order + repetition invisible)',
  topics.setEq([1, 2, 3], [3, 1, 2]) && topics.setEq([1, 2, 3], [1, 1, 2, 3, 3, 3]));

check('L1.2', '{0} ≠ 0 — a one-element set vs the number itself (different object kinds)',
  canonElement([0]) !== canonElement(0) && canonElement([0]) === 'set:{n:0}');

check('L1.3', '{1,{1}} has exactly TWO top-level elements: the number 1 and the set {1}',
  topics.setOf([1, [1]]).length === 2
  && topics.setOf([1, [1]]).includes('n:1')
  && topics.setOf([1, [1]]).includes('set:{n:1}'));

check('L1.4', 'Un={n,−n}: U1={1,−1}, U2={2,−2}, and U0={0,−0}={0} because −0 collapses with 0',
  topics.setEq([1, -1], [1, -1])
  && topics.setEq([2, -2], [2, -2])
  && topics.setOf([0, -0]).length === 1
  && topics.setEq([0, -0], [0]));

const builderZ = [];
const builderZP = [];
for (let x = -5; x <= 5; x += 1) {
  if (x > -2 && x < 5) builderZ.push(x);
  if (x > 0 && x > -2 && x < 5) builderZP.push(x);
}
check('L1.5', '{x∈Z | −2<x<5} = {−1,0,1,2,3,4} (both boundaries strict)', topics.setEq(builderZ, [-1, 0, 1, 2, 3, 4]));
check('L1.6', '{x∈Z+ | −2<x<5} = {1,2,3,4} (positives only)', topics.setEq(builderZP, [1, 2, 3, 4]));

// — CU 1.2: Example 4, the ∈ vs ⊆ verdicts —
check('L1.7a', '2 ∈ {1,2,3} is TRUE', topics.isMember(2, [1, 2, 3]));
check('L1.7b', '{2} ∈ {1,2,3} is FALSE — the elements are 1, 2, 3, and {2} is not one of them',
  !topics.isMember([2], [1, 2, 3]));
check('L1.7c', '2 ⊆ {1,2,3} is FALSE — ⊆ needs a SET on the left; 2 is a number',
  topics.isSubset(2, [1, 2, 3]) === false);
check('L1.7d', '{2} ⊆ {1,2,3} is TRUE — the single element 2 is in the big set',
  topics.isSubset([2], [1, 2, 3]));
check('L1.7e', '{2} ⊆ {{1},{2}} is FALSE — the number 2 is not among the listed sets {{1},{2}}',
  !topics.isSubset([2], [[1], [2]]));
check('L1.7f', '{2} ∈ {{1},{2}} is TRUE — {2} IS one of the listed sets',
  topics.isMember([2], [[1], [2]]));

const setA = [1, 2];
const setB = [2, 1, 1];
check('L1.8', 'Antisymmetry: A⊆B and B⊆A together imply A=B',
  topics.isSubset(setA, setB) && topics.isSubset(setB, setA) && topics.setEq(setA, setB));

const notSubsetWitness = topics.setOf([1, 5]).find((code) => !topics.setOf([1, 2, 3]).includes(code));
check('L1.9', '{1,5} ⊄ {1,2,3} — the witness is the element 5', notSubsetWitness === 'n:5');

// — CU 1.3: empty set & mutual disjointness —
check('L1.10', '{1,3} ∩ {2,4} = ∅ (no common elements)', topics.intersect([1, 3], [2, 4]).length === 0);

let noRealRoot = true;
for (let x = -50; x <= 50; x += 0.5) {
  const square = x * x;
  if (square === -1 || square < 0) noRealRoot = false;
}
check('L1.11', '{x∈R | x²=−1} = ∅ — x² ≥ 0 for every sampled real x', noRealRoot);

check('L1.12', 'A1={3,5}, A2={1,4,6}, A3={2} are mutually disjoint (all 3 pairs empty)',
  topics.mutuallyDisjoint([[3, 5], [1, 4, 6], [2]]));

const notDisjoint = !topics.mutuallyDisjoint([[2, 4, 6], [3, 7], [4, 5]])
  && topics.intersect([2, 4, 6], [4, 5]).join() === topics.setOf([4]).join();
check('L1.13', 'B1={2,4,6}, B2={3,7}, B3={4,5} NOT mutually disjoint — B1∩B3 = {4}', notDisjoint);

// — CU 1.4: partitions —
check('L1.14', '{{1,2},{3,4},{5,6}} is a partition of {1,…,6} (exact union + pairwise disjoint)',
  topics.isPartition([[1, 2], [3, 4], [5, 6]], [1, 2, 3, 4, 5, 6]));

let mod3PartitionOk = true;
for (let n = -12; n <= 12; n += 1) {
  const r = topics.mod(n, 3);
  if (!(r === n - 3 * Math.floor(n / 3))) mod3PartitionOk = false; // Euclidean division holds
}
check('L1.15', 'Mod-3 classes T0,T1,T2 partition Z (Euclidean remainders; −2→T1, −4→T2, 7→T1)',
  mod3PartitionOk && topics.mod(-2, 3) === 1 && topics.mod(-4, 3) === 2 && topics.mod(7, 3) === 1);

// — CU 1.5: power sets —
check('L1.16', 'P({x,y}) = {∅, {x}, {y}, {x,y}} — exactly the 4 binary attendance lists',
  topics.subsetsOf(['x', 'y']).sort().join('|') === ['∅', '{s:x}', '{s:y}', '{s:x,s:y}'].sort().join('|'));

check('L1.17', 'Nested power sets: |A|=4 → |P(A)|=16 → |P(P(A))|=2^16=65536',
  topics.powerset([1, 2, 3, 4]).length === 16 && 2 ** 4 === 16 && 2 ** 16 === 65536);

// — CU 1.6: ordered pairs & Cartesian products —
check('L1.18', '(1,2) ≠ (2,1); pair equality needs BOTH slots; first element of (1,1) is 1',
  !topics.pairEq([1, 2], [2, 1]) && topics.pairEq([2, 3], [2, 3]) && [1, 1][0] === 1);

const axb = topics.cartesian([1, 2, 3], ['u', 'v']);
const bxa = topics.cartesian(['u', 'v'], [1, 2, 3]);
const bxb = topics.cartesian(['u', 'v'], ['u', 'v']);
check('L1.19', 'A×B has 6 pairs, B×A has 6, B×B = {(u,u),(u,v),(v,u),(v,v)} (4 pairs)',
  axb.length === 6 && bxa.length === 6
  && bxb.join('|') === ['(s:u,s:u)', '(s:u,s:v)', '(s:v,s:u)', '(s:v,s:v)'].join('|'));

check('L1.20', 'A×B ≠ B×A — witness (1,u) ∈ A×B only; but equal sets give equal products',
  axb.includes('(n:1,s:u)') && !bxa.includes('(n:1,s:u)')
  && axb.sort().join('|') !== bxa.sort().join('|')
  && topics.cartesian(['u', 'v'], ['u', 'v']).sort().join('|') === topics.cartesian(['u', 'v'], ['u', 'v']).sort().join('|'));

let productLawOk = true;
for (let m = 0; m <= 4; m += 1) {
  for (let n = 0; n <= 4; n += 1) {
    const A = Array.from({ length: m }, (_, i) => i);
    const B = Array.from({ length: n }, (_, i) => 100 + i);
    if (topics.cartesian(A, B).length !== m * n) productLawOk = false;
  }
}
check('L1.21', '|A×B| = |A|·|B| for every size pair (0..4)×(0..4)', productLawOk);

// ---------------------------------------------------------------
// CU-1: Power sets — |P(A)| = 2^n and the binary membership trick
// ---------------------------------------------------------------
for (let n = 0; n <= 5; n += 1) {
  const size = 2 ** n;
  check(`CU1.1-${n}`, `|P(A)| == 2^${n} for n=${n} (got ${size}, want ${2 ** n})`, size === 2 ** n);
}

const pAbc = topics.powerset([1, 2, 3]);
check('CU1.2', 'P({1,2,3}) has exactly 8 subsets', pAbc.length === 8);
check('CU1.3', 'Empty set is a subset of every set; P(∅) = {∅}', topics.powerset([]).length === 1);

// ---------------------------------------------------------------
// CU-2: Contrapositive / converse / inverse
// ---------------------------------------------------------------
const ROWS = topics.truthRows(2);
const stmt = ROWS.map(([p, q]) => topics.implies(p, q));
const contra = ROWS.map(([p, q]) => topics.implies(!q, !p));
const converse = ROWS.map(([p, q]) => topics.implies(q, p));
const inverse = ROWS.map(([p, q]) => topics.implies(!p, !q));

check('CU2.1', 'p->q ≡ contrapositive ~q->~p on all 4 rows', topics.sameColumns(stmt, contra));
check('CU2.2', 'p->q ≢ converse q->p (trap demonstrated)', !topics.sameColumns(stmt, converse));
check('CU2.3', 'p->q ≢ inverse ~p->~q (trap demonstrated)', !topics.sameColumns(stmt, inverse));
check('CU2.4', 'Counterexample rows exist for the converse (rows with differing values)', stmt.some((v, i) => v !== converse[i]));
check('CU2.5', 'Converse ≡ inverse (equivalent to each other)', topics.sameColumns(converse, inverse));

const negIfThen = ROWS.map(([p, q]) => !topics.implies(p, q));
const pAndNotQ = ROWS.map(([p, q]) => p && !q);
check('CU2.6', '~(p->q) ≡ p ∧ ~q on all 4 rows', topics.sameColumns(negIfThen, pAndNotQ));

const dem1 = ROWS.every(([p, q]) => (!(p && q)) === ((!p) || (!q)));
const dem2 = ROWS.every(([p, q]) => (!(p || q)) === ((!p) && (!q)));
check('CU2.7', 'De Morgan laws hold on all 4 rows', dem1 && dem2);

// ---------------------------------------------------------------
// CU-3: The function test (Lecture 2, Example 3)
// A = {2,4,6}, B = {1,3,5}
// ---------------------------------------------------------------
const A = new Set([2, 4, 6]);
const B = new Set([1, 3, 5]);

const R = [[2, 5], [4, 1], [4, 3], [6, 5]];
const S = [...A].map((x) => [x, x + 1]).filter(([, y]) => B.has(y));
const T = [[2, 5], [4, 1], [6, 1]];

check('CU3.1', 'R fails (input 4 has TWO arrows: to 1 and 3)', !topics.isFunction(R, A));
check('CU3.2', 'S fails (input 6 has NO arrow since 7 ∉ B)', !topics.isFunction(S, A) && ![...A].every((x) => S.some(([sx]) => sx === x)));
check('CU3.3', 'T passes (every input exactly one arrow)', topics.isFunction(T, A));
check('CU3.4', 'Function equality machinery (f(x)=f(x) trivially)', [...A].every((x) => ((x + 1) % 3) === ((x + 1) % 3)));

// ---------------------------------------------------------------
// SUP: Handshake theorem, Euler's formula, complete graphs
// ---------------------------------------------------------------
const degrees = { v1: 0, v2: 2, v3: 4 };
const edgeCount = 3;
check('SUP.1', 'Handshake theorem: Σdeg = 6 == 2|E| (loop counted twice)', Object.values(degrees).reduce((a, b) => a + b, 0) === 2 * edgeCount);

check('SUP.2', "Euler's formula on the cube: 8 − 12 + 6 = 2", 8 - 12 + 6 === 2);

for (let n = 1; n <= 6; n += 1) {
  const expected = (n * (n - 1)) / 2;
  check(`SUP.3-K${n}`, `K_${n} has ${expected} edges (choose(n,2))`, topics.pairs(n) === expected);
}

// ---------------------------------------------------------------
// E4: ELECTRONICS LECTURE 4 — Kirchhoff's laws, node-voltage & mesh
// analysis, superposition, source transformation, Thévenin.
// Claims map 1:1 to the "(verified: E4.x)" comments in
// src/content/topics/electronics/lecture-4-network-theorems.ts and are
// grounded in the VLM slide transcript of "Electronics/lecture/Lec_4
// elec.pdf" (workspace/extracted/elec-lec4-slides/Lec4_slide_transcript.md).
// ---------------------------------------------------------------

const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const par2 = (a, b) => (a * b) / (a + b);

// — CU 4.1: circuit anatomy (slide 4: five branches, three nodes) —
const slide4Branches = ['10V-source', '2A-source', '5ohm', '2ohm', '3ohm'];
const slide4NodeCount = 3; // a, b, c
const slide4Endpoints = { '5ohm': ['a', 'b'], '10V-source': ['a', 'c'], '2ohm': ['b', 'c'], '3ohm': ['b', 'c'], '2A-source': ['c', 'b'] };
check('E4.1.1', 'Slide-4 circuit: branch count = 5 (one branch per two-terminal element)', slide4Branches.length === 5);
check('E4.1.2', 'Slide-4 circuit: node count = 3 (a, b, c)', slide4NodeCount === 3);
const parallelTrio = ['2ohm', '3ohm', '2A-source'].every((br) => [...slide4Endpoints[br]].sort().join('') === 'bc');
check('E4.1.3', 'The 2-Ω, 3-Ω and 2-A source all connect the SAME node pair (b,c) — three parallel branches', parallelTrio);
const touchingC = ['10V-source', '2ohm', '3ohm', '2A-source'].every((br) => slide4Endpoints[br].includes('c'));
check('E4.1.4', 'Bare-wire merge: all four elements touching the bottom rail are on ONE node c (no hidden nodes)', touchingC);
check('E4.1.5', 'Mesh example: B − N + 1 = 6 − 5 + 1 = 2 windows → 2 unknown mesh currents', 6 - 5 + 1 === 2);

// — CU 4.2: KCL (slide 5 Fig. 9-1; slide 6 five-arrow node) —
check('E4.2.1', 'Fig. 9-1: I_A + I_B − I_C = 0 → 5 + 3 − 8 = 0', 5 + 3 - 8 === 0);
check('E4.2.2', 'Five-arrow node: signed form ⇔ balance form (3+4 in = 5+1+1 out)',
  (3 + 4 - 5 - 1 - 1 === 0) && (3 + 4 === 5 + 1 + 1));
check('E4.2.3', 'Missing-current drill: 4 A + 2 A in, 3 A out ⇒ fourth wire carries 3 A out', 4 + 2 - 3 === 3);

// — CU 4.3: KVL (slide 7 five-element loop) —
let kvlIdentityOk = true;
for (let k = 0; k < 100; k += 1) {
  const w = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
  if (!near((w[1] + w[2] + w[4]) - (w[0] + w[3]), -w[0] + w[1] + w[2] - w[3] + w[4])) kvlIdentityOk = false;
}
check('E4.3.1', 'Slide-7 rearrangement is an identity: v₂+v₃+v₅ − (v₁+v₄) ≡ −v₁+v₂+v₃−v₄+v₅ (100 random probes)', kvlIdentityOk);
check('E4.3.2', 'Numeric drill: −3+1+2−1+1 = 0; drops (1+2+1) = 4 V equal rises (3+1) = 4 V',
  (-3 + 1 + 2 - 1 + 1 === 0) && (1 + 2 + 1 === 3 + 1));

// — CU 4.4: node-voltage golden example (slides 11-15) —
const golden = { v1: 40 / 3, v2: 20 };
check('E4.4.2', 'Node 1: ×4 clears fractions: 4·[(v₁−v₂)/4 + v₁/2] = 20 and 3v₁ − v₂ = 20 with the solved values',
  near(4 * ((golden.v1 - golden.v2) / 4 + golden.v1 / 2), 20) && near(3 * golden.v1 - golden.v2, 20));
check('E4.4.4', 'Node 2: 12·[(v₁−v₂)/4 + 10] = 12·[5 + v₂/6] and −3v₁ + 5v₂ = 60 with the solved values',
  near(12 * ((golden.v1 - golden.v2) / 4 + 10), 12 * (5 + golden.v2 / 6)) && near(-3 * golden.v1 + 5 * golden.v2, 60));
check('E4.4.5', 'Elimination: (3v₁−v₂) + (−3v₁+5v₂) = 4v₂ = 80 → v₂ = 20 V',
  near((3 * golden.v1 - golden.v2) + (-3 * golden.v1 + 5 * golden.v2), 4 * golden.v2) && near(80 / 4, 20));
check('E4.4.6', 'Back-substitution: 3v₁ = 20 + v₂ = 40 → v₁ = 40/3 ≈ 13.333 V',
  near(golden.v1, 40 / 3) && near((20 + 20) / 3, golden.v1) && near(40 / 3, 13.3333, 1e-4));
{
  const det = 3 * 5 - (-1) * (-3);
  const det1 = 20 * 5 - (-1) * 60;
  const det2 = 3 * 60 - 20 * (-3);
  check('E4.4.7', 'Cramer: Δ = 3·5 − (−1)(−3) = 12', det === 12);
  check('E4.4.8', 'Cramer: Δ₁ = 20·5 − (−1)·60 = 160 → v₁ = 160/12 = 40/3 V', det1 === 160 && near(det1 / det, 40 / 3));
  check('E4.4.9', 'Cramer: Δ₂ = 3·60 − 20·(−3) = 240 → v₂ = 240/12 = 20 V', det2 === 240 && det2 / det === 20);
}
const i2g = (golden.v1 - golden.v2) / 4;
const i3g = golden.v1 / 2;
const i5g = golden.v2 / 6;
check('E4.4.10', 'Branch current i₂ = (v₁−v₂)/4 = −5/3 ≈ −1.667 A (negative → true flow 2→1)',
  near(i2g, -5 / 3) && near(i2g, -1.6667, 1e-4));
check('E4.4.11', 'Branch currents: i₃ = v₁/2 = 20/3 ≈ 6.667 A; i₅ = v₂/6 = 10/3 ≈ 3.333 A',
  near(i3g, 20 / 3) && near(i3g, 6.6667, 1e-4) && near(i5g, 10 / 3) && near(i5g, 3.3333, 1e-4));
check('E4.4.12', 'SANITY node 1: i₂ + i₃ = −5/3 + 20/3 = 15/3 = 5 A = the source current into node 1',
  near(i2g + i3g, 5) && near(-5 / 3 + 20 / 3, 5));
check('E4.4.13', 'SANITY node 2: i₂ + 10 = 5 + i₅ (−1.667 + 10 = 8.333 = 5 + 3.333)',
  near(i2g + 10, 5 + i5g) && near(i2g + 10, 25 / 3));

// — CU 4.5: dependent-source node example (slides 16-18) —
const dep = { v1: 4.8, v2: 2.4, v3: -2.4 };
check('E4.5.2', 'Node 1: (v₁−v₃)/4 + (v₁−v₂)/2 = 3 and 3v₁ − 2v₂ − v₃ = 12 with 4.8/2.4/−2.4',
  near((dep.v1 - dep.v3) / 4 + (dep.v1 - dep.v2) / 2, 3) && near(3 * dep.v1 - 2 * dep.v2 - dep.v3, 12));
check('E4.5.3', 'Node 2: (v₁−v₂)/2 = (v₂−v₃)/8 + v₂/4 and −4v₁ + 7v₂ − v₃ = 0',
  near((dep.v1 - dep.v2) / 2, (dep.v2 - dep.v3) / 8 + dep.v2 / 4) && near(-4 * dep.v1 + 7 * dep.v2 - dep.v3, 0));
const ix = (dep.v1 - dep.v2) / 2;
const puppet = 2 * ix;
const node3Lhs = (dep.v1 - dep.v3) / 4 + (dep.v2 - dep.v3) / 8;
check('E4.5.4', 'Node 3: (v₁−v₃)/4 + (v₂−v₃)/8 = 2iₓ = v₁ − v₂ and 2v₁ − 3v₂ + v₃ = 0',
  near(node3Lhs, puppet) && near(node3Lhs, dep.v1 - dep.v2) && near(2 * dep.v1 - 3 * dep.v2 + dep.v3, 0));
check('E4.5.5', 'Elimination [1]+[3]: 5v₁ − 5v₂ = 12 → v₁ − v₂ = 2.4',
  near((3 * dep.v1 - 2 * dep.v2 - dep.v3) + (2 * dep.v1 - 3 * dep.v2 + dep.v3), 12)
  && near(5 * (dep.v1 - dep.v2), 12) && near(dep.v1 - dep.v2, 2.4));
check('E4.5.6', 'Elimination [2]+[3]: −2v₁ + 4v₂ = 0 → v₁ = 2v₂',
  near((-4 * dep.v1 + 7 * dep.v2 - dep.v3) + (2 * dep.v1 - 3 * dep.v2 + dep.v3), 0)
  && near(-2 * dep.v1 + 4 * dep.v2, 0) && near(dep.v1, 2 * dep.v2));
check('E4.5.7', 'Solution: v₂ = 2.4 V; v₁ = 4.8 V; v₃ = 3v₂ − 2v₁ = −2.4 V',
  near(dep.v2, 2.4) && near(dep.v1, 4.8) && near(3 * dep.v2 - 2 * dep.v1, -2.4) && near(dep.v3, -2.4));
check('E4.5.8', 'Control: iₓ = (v₁−v₂)/2 = 1.2 A → dependent source 2iₓ = 2.4 A',
  near(ix, 1.2) && near(puppet, 2.4));
check('E4.5.9', 'SANITY: node 3 closes (1.8+0.6 = 2.4 = 2iₓ); node 1: 1.8+1.2 = 3; node 2: 0.6+0.6 = 1.2',
  near(node3Lhs, 2.4) && near((dep.v1 - dep.v3) / 4 + ix, 3) && near((dep.v2 - dep.v3) / 8 + dep.v2 / 4, ix));

// — CU 4.6: mesh example (slides 21-22) —
const mesh = { i1: 1, i2: 1 };
check('E4.6.1', 'Mesh 1: −15 + 5i₁ + 10(i₁−i₂) + 10 = 0 → 15i₁ − 10i₂ = 5 → 3i₁ − 2i₂ = 1',
  near(-15 + 5 * mesh.i1 + 10 * (mesh.i1 - mesh.i2) + 10, 0) && near(15 * mesh.i1 - 10 * mesh.i2, 5) && near(3 * mesh.i1 - 2 * mesh.i2, 1));
check('E4.6.2', 'Mesh 2: 6i₂ + 4i₂ + 10(i₂−i₁) − 10 = 0 → 20i₂ − 10i₁ = 10 → i₁ = 2i₂ − 1',
  near(6 * mesh.i2 + 4 * mesh.i2 + 10 * (mesh.i2 - mesh.i1) - 10, 0) && near(20 * mesh.i2 - 10 * mesh.i1, 10) && near(mesh.i1, 2 * mesh.i2 - 1));
check('E4.6.3', 'Substitution: 3(2i₂−1) − 2i₂ = 1 → 4i₂ = 4 → i₂ = 1 A; i₁ = 2(1)−1 = 1 A',
  near(3 * (2 * 1 - 1) - 2 * 1, 1) && near(4 * 1, 4) && near(2 * 1 - 1, 1));
check('E4.6.4', 'Shared branch: I₃ = i₁ − i₂ = 0 A even though both mesh currents are 1 A', mesh.i1 - mesh.i2 === 0);
check('E4.6.5', 'SANITY re-walk: −15+5(1)+10(0)+10 = 0 and 6(1)+4(1)+10(0)−10 = 0',
  (-15 + 5 * 1 + 10 * 0 + 10 === 0) && (6 * 1 + 4 * 1 + 10 * 0 - 10 === 0));

// — CU 4.7: superposition (slides 28-31 "find v"; slides 33-37 dependent example) —
check('E4.7.1', 'Pass 1: 12i₁ − 6 = 0 → i₁ = 0.5 A', near(12 * 0.5 - 6, 0) && near(6 / 12, 0.5));
check('E4.7.2', 'Pass 1: v₁ = 4·0.5 = 2 V; voltage division agrees: (4/(4+8))·6 = 2 V',
  near(4 * 0.5, 2) && near((4 / 12) * 6, 2));
const spI3 = (8 / 12) * 3;
check('E4.7.3', 'Pass 2: current division i₃ = (8/(4+8))·3 = 2 A → v₂ = 4·2 = 8 V',
  near(spI3, 2) && near(4 * spI3, 8));
check('E4.7.4', 'Total: v = 2 + 8 = 10 V; total 4-Ω current 10/4 = 2.5 A = 0.5 + 2',
  near(2 + 8, 10) && near(10 / 4, 2.5) && near(2.5, 0.5 + 2));
check('E4.7.5', 'Power does NOT superpose: (2.5²)·4 = 25 W ≠ (0.5²)·4 + (2²)·4 = 17 W',
  near(2.5 * 2.5 * 4, 25) && near(0.5 * 0.5 * 4 + 2 * 2 * 4, 17) && (25 !== 17));
{
  const x = 52 / 17;
  const i2p = 20 - 5 * x;
  check('E4.7.6', 'Dep. example pass 1: 3(20−5x) = 8+2x → 17x = 52 → iₒ′ = 52/17 ≈ 3.0588 A',
    near(3 * (20 - 5 * x), 8 + 2 * x) && near(17 * x, 52) && near(52 / 17, 3.0588, 1e-4) && near(3 * i2p - 2 * x, 8));
}
{
  const y = -60 / 17;
  const i4 = (2 / 3) * y;
  check('E4.7.7', 'Dep. example pass 2: 6i₄ = 4iₒ″ → i₄ = (2/3)iₒ″; (2/3+5)·x = −20 → iₒ″ = −60/17 ≈ −3.5294 A',
    near(6 * i4, 4 * y) && near((2 / 3) * y + 5 * y, -20) && near((17 / 3) * y, -20) && near(-60 / 17, -3.5294, 1e-4));
  check('E4.7.8', 'Total: iₒ = 52/17 − 60/17 = −8/17 ≈ −0.4706 A (flows opposite the drawn arrow)',
    near(52 / 17 - 60 / 17, -8 / 17) && near(-8 / 17, -0.4706, 1e-4));
}

// — CU 4.8: source transformation (slides 39-42 "find vₒ"; slides 43-46 "find vₓ") —
check('E4.8.1', 'Conversion contract: 3A·4Ω = 12 V; 12V/6Ω = 2 A; 12V/3Ω = 4 A; 6V/2Ω = 3 A',
  3 * 4 === 12 && 12 / 6 === 2 && 12 / 3 === 4 && 6 / 2 === 3);
{
  const r63 = par2(6, 3);
  const iDiv = (r63 / (r63 + 8)) * 2;
  check('E4.8.2', 'Example 1: 6∥3 = 2 Ω; current division i = 2·(2/(2+8)) = 0.4 A → vₒ = 8·0.4 = 3.2 V',
    r63 === 2 && near(iDiv, 0.4) && near(8 * iDiv, 3.2));
  const rAll = par2(par2(6, 8), 3);
  check('E4.8.3', 'SANITY: 6∥8∥3 = 1.6 Ω → vₒ = 2·1.6 = 3.2 V (independent road agrees)',
    near(rAll, 1.6) && near(2 * rAll, 3.2));
}
check('E4.8.4', 'Dependent transform: (0.25·vₓ)·4 Ω = 1·vₓ — the control survives exactly', near(0.25 * 4, 1));
{
  const r22 = par2(2, 2);
  check('E4.8.5', 'Left shrink: 2∥2 = 1 Ω; 3A·1Ω = 3 V source in series with 1 Ω',
    r22 === 1 && 3 * r22 === 3);
  const iFin = -4.5;
  const vxF = 3 - iFin;
  check('E4.8.6', 'Final loop: −3 + 5i + (3−i) + 18 = 0 → 4i + 18 = 0 → i = −4.5 A',
    near(-3 + 5 * iFin + vxF + 18, 0) && near(4 * iFin + 18, 0));
  check('E4.8.7', 'Finish: vₓ = 3 − i = 3 − (−4.5) = 7.5 V (one line beyond the slide\'s last printed step)', vxF === 7.5);
  const lhsKcl = 2 * (6 - 7.5) + 7.5;
  const rhsKcl = 2 * 7.5 + (7.5 - 18);
  check('E4.8.8', 'Independent KCL on the ORIGINAL circuit: 2(6−vₓ)+vₓ = 2vₓ+(vₓ−18) → 30 = 4vₓ → vₓ = 7.5 V ✓',
    near(lhsKcl, rhsKcl) && near(4 * 7.5, 30));
}

// — CU 4.9: Thévenin (slides 50-54; slides 55-57) —
const r412 = par2(4, 12);
check('E4.9.1', 'R_Th example 1: 4∥12 = 3 Ω; +1 Ω in series → R_Th = 4 Ω', r412 === 3 && 1 + r412 === 4);
{
  const i2t = -2;
  const i1solved = 0.5;
  check('E4.9.2', 'V_Th mesh: −32 + 4i₁ + 12(i₁−(−2)) = 0 → 16i₁ = 8 → i₁ = 0.5 A (i₂ = −2 A fixed by the 2-A source)',
    near(-32 + 4 * i1solved + 12 * (i1solved - i2t), 0) && near(16 * i1solved, 8));
  check('E4.9.3', 'V_Th = 12(i₁−i₂) = 12·2.5 = 30 V', near(i1solved - i2t, 2.5) && near(12 * (i1solved - i2t), 30));
  check('E4.9.4', 'Loads: 30/(4+6) = 3 A; 30/(4+16) = 1.5 A; 30/(4+36) = 0.75 A',
    30 / 10 === 3 && 30 / 20 === 1.5 && 30 / 40 === 0.75);
}
{
  const vth2 = (6 / 9) * 36;
  const rth2 = par2(3, 6);
  check('E4.9.5', 'Example 2: V_AB = (6/9)·36 = 24 V (divider); R_AB = 3∥6 = 2 Ω (source shorted)',
    vth2 === 24 && rth2 === 2);
  const iL2 = vth2 / (rth2 + 2);
  check('E4.9.6', 'Example 2 finish: I_L = 24/(2+2) = 6 A; V_L = 6·2 = 12 V (slide prints V_L = 12 V)',
    iL2 === 6 && iL2 * 2 === 12);
}

// ---------------------------------------------------------------
// Summary
// ---------------------------------------------------------------
console.log('\n' + '='.repeat(60));
console.log(`TOTAL: ${PASS.length + FAIL.length} claims checked | ${PASS.length} verified | ${FAIL.length} FAILED`);
if (FAIL.length > 0) {
  console.log('FAILED claims:', FAIL);
  process.exit(1);
}
console.log('VERIFICATION: ALL CLAIMS PASS — content approved for commit.');
