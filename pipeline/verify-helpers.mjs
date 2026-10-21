/**
 * Shared helpers for pipeline/verify-claims.mjs.
 * Pure functions — no framework dependencies — so the pipeline stays runnable
 * with plain Node.js forever.
 */

export const topics = {
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
