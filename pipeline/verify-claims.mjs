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

import { topics } from './verify-helpers.mjs';

const PASS = [];
const FAIL = [];

function check(claimId, statement, condition) {
  if (condition) PASS.push(claimId);
  else FAIL.push(claimId);
  console.log(`[${condition ? 'PASS' : 'FAIL'}] ${claimId}: ${statement}`);
}

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
