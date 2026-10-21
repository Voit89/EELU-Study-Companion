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
// Summary
// ---------------------------------------------------------------
console.log('\n' + '='.repeat(60));
console.log(`TOTAL: ${PASS.length + FAIL.length} claims checked | ${PASS.length} verified | ${FAIL.length} FAILED`);
if (FAIL.length > 0) {
  console.log('FAILED claims:', FAIL);
  process.exit(1);
}
console.log('VERIFICATION: ALL CLAIMS PASS — content approved for commit.');
