/**
 * Shared helpers for pipeline/verify-claims.mjs.
 * Pure functions — no framework dependencies — so the pipeline stays runnable
 * with plain Node.js forever.
 *
 * Encoding for Lecture 1 (Sets): sets are represented as arrays; an element is
 * a number, a string, or another array (a nested set). Every element gets a
 * CANONICAL STRING CODE:
 *     number 7      -> "n:7"        (String(-0) === "0", so -0 collapses with 0)
 *     string "x"    -> "s:x"
 *     set {1}       -> "set:{n:1}"  (recursively canonicalized)
 * All set operations compare codes, which makes order, repetition, and nesting
 * observable exactly the way the axiom of extension demands.
 */

export function canonElement(x) {
  if (Array.isArray(x)) return `set:{${setOf(x).join(',')}}`;
  if (typeof x === 'number') return `n:${x}`;
  return `s:${x}`;
}

/** Canonical, deduplicated, sorted element-code list of a set. */
export function setOf(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const code = canonElement(item);
    if (!seen.has(code)) {
      seen.add(code);
      out.push(code);
    }
  }
  return out.sort();
}

export const topics = {
  /** Canonical, deduplicated, sorted element-code list of a set. */
  setOf,

  /** All subsets of an array (as sorted arrays), from size 0 to n. */
  powerset(items) {
    const result = [];
    const walk = (index, current) => {
      if (index === items.length) {
        result.push([...current].sort((a, b) => a - b));
        return;
      }
      walk(index + 1, current);
      current.push(items[index]);
      walk(index + 1, current);
      current.pop();
    };
    walk(0, []);
    return result;
  },

  /** Set equality via canonical codes (order + repetition invisible). */
  setEq(a, b) {
    return setOf(a).join('\u0001') === setOf(b).join('\u0001');
  },

  /** x ∈ B — is the OBJECT x (number, string, or set-as-array) a member of B? */
  isMember(x, b) {
    return setOf(b).includes(canonElement(x));
  },

  /** A ⊆ B — every element of A is a member of B. Left must be a set. */
  isSubset(a, b) {
    if (!Array.isArray(a)) return false;
    const bCodes = setOf(b);
    return setOf(a).every((code) => bCodes.includes(code));
  },

  /** A ∩ B as canonical codes. */
  intersect(a, b) {
    const bCodes = setOf(b);
    return setOf(a).filter((code) => bCodes.includes(code));
  },

  /** Every pair of the family is disjoint. */
  mutuallyDisjoint(family) {
    for (let i = 0; i < family.length; i += 1) {
      for (let j = i + 1; j < family.length; j += 1) {
        if (this.intersect(family[i], family[j]).length > 0) return false;
      }
    }
    return true;
  },

  /** {A1..An} is a partition of A: non-empty pieces, exact union, pairwise disjoint. */
  isPartition(parts, whole) {
    if (parts.some((part) => setOf(part).length === 0)) return false;
    let union = [];
    for (const part of parts) union = union.concat(part);
    if (!this.setEq(union, whole)) return false;
    return this.mutuallyDisjoint(parts);
  },

  /** All subsets of items as readable canonical strings ("∅", "{s:x}", ...). */
  subsetsOf(items) {
    const codes = items.map((item) => canonElement(item));
    const out = [];
    const walk = (index, current) => {
      if (index === codes.length) {
        out.push(current.length === 0 ? '∅' : `{${[...current].sort().join(',')}}`);
        return;
      }
      walk(index + 1, current);
      current.push(codes[index]);
      walk(index + 1, current);
      current.pop();
    };
    walk(0, []);
    return out.sort();
  },

  /** A×B as canonical pair strings "(slot1,slot2)". */
  cartesian(a, b) {
    const out = [];
    for (const x of a) {
      for (const y of b) out.push(`(${canonElement(x)},${canonElement(y)})`);
    }
    return out;
  },

  /** Ordered pair equality: (a,b) = (c,d) iff BOTH slots match. */
  pairEq([a, b], [c, d]) {
    return canonElement(a) === canonElement(c) && canonElement(b) === canonElement(d);
  },

  /** Euclidean remainder r in {0,1,...,n-1} — correct for negative operands. */
  mod(n, m) {
    return ((n % m) + m) % m;
  },

  /** Material implication. */
  implies(p, q) {
    return !p || q;
  },

  /** All truth-table rows for `variableCount` variables, TT…F order. */
  truthRows(variableCount) {
    const rows = [];
    const total = 2 ** variableCount;
    for (let mask = 0; mask < total; mask += 1) {
      const row = [];
      for (let bit = variableCount - 1; bit >= 0; bit -= 1) row.push(Boolean((mask >> bit) & 1));
      rows.push(row);
    }
    return rows;
  },

  /** Column equality for equivalence checks. */
  sameColumns(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  },

  /** The function test: total on the domain + single-valued. */
  isFunction(relation, domain) {
    const firsts = relation.map(([x]) => x);
    const everyInputCovered = [...domain].every((x) => firsts.includes(x));
    const singleValued = new Set(firsts).size === firsts.length;
    return everyInputCovered && singleValued;
  },

  /** Number of unordered pairs among n items. */
  pairs(n) {
    return (n * (n - 1)) / 2;
  },
};
