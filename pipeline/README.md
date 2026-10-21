# Content Pipeline

The pipeline that turns a raw college PDF into verified, exam-optimized concept content.

## Contract

A lecture is "explained" when **all four phases** have completed:

| Phase | Stage | Output | Gate |
|---|---|---|---|
| A | Extract | `concept-map` (list of CUs with prerequisites, source-page citations, exam weights) | Human reviews CU boundaries |
| B | Generate | Topic files in `src/content/topics/` (3 doors, dual methods, recipe, traps, recall) | Schema + grounding review |
| C | Verify | `verify-claims` run | **27/27 checks must pass — a FAIL blocks commit** |
| D | Integrate | Topic file imported in `topics/index.ts` | `npm run typecheck` green |

## Phase A — Extraction rules

1. Parse the PDF (text + layout). Title slides, copyright notices, and pure-picture
   orientation slides are marked `skip`; pure formula-review slides are marked `skim`.
2. Regroup the remaining pages into **concept units (CUs)**. A CU is a concept, not a
   page range — it may cite several pages, and pages may cite several CUs.
3. Record prerequisites between CUs. Prerequisite cycles are an error.
4. Assign exam weight (★★★/★★☆) from the midterm revision + section files.

## Phase B — Topic authoring rules

Every topic MUST contain:

- `quick`: a ≤ 40-word version a student reads in 30 seconds
- `doors`: exactly 3 entries, kinds `analogy`, `mechanical`, `formal` — in that order.
  The *mechanical* door is the one students use in exams; it must be actionable as steps.
- `methods`: ≥ 1 dual-method entry (college vs fast) with an honest, non-strawman
  description of the college method
- `recipe`: trigger phrased as "if you see…", steps executable without re-reading theory,
  and a `check` that catches the most common mistake for that question type
- `traps`: at least one genuine distractor encountered in exams
- `recall`: 1–3 question/answer pairs
- `sourcePages`: every topic must trace back to its source pages (grounding)
- Every checkable math claim carries a `(verified: <claimId>)` comment that maps to a
  check in `verify-claims.mjs`

## Phase C — Verification

```bash
npm run verify:claims
```

- Checks are **recomputations**, not string comparisons (truth tables built from
  `implies()`, power sets enumerated, function tests executed, graph identities summed).
- New content = new checks. A claim without a check is a content bug.
- CI-ready: exit code 1 on any failure.

## Phase D — Integration

Add the topic file, export it from `src/content/topics/index.ts`, and the Concepts tab
appears automatically for the matching lesson (matched by `lessonId`).

## Grounding policy

- Content may **never invent material that is not in the source PDF** without marking it
  as external. Analogies and mnemonics are allowed (they are explanations, not claims).
- If the source is ambiguous, the topic says so in `traps` — it does not silently pick
  one reading.
