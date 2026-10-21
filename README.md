# EELU Study Companion (v2 — Concept-First Architecture)

A local-first study companion that renders your original college PDFs/PPTs **beside** explanations designed for understanding and exam speed — built around **concepts**, not pages.

## What's new in v2

The original app mirrored the source material page-by-page. v2 adds a **concept-first layer** on top of everything you already had (all legacy content and views still work):

| Feature | Purpose |
|---|---|
| **Topic schema** (`src/content/topics/`) | The new atomic teaching unit: anchored to a concept, cites source pages instead of being bound to them |
| **3-Door explanations** | Every topic ships three explanation styles — *Analogy*, *Mechanical (exam tool)*, *Formal proof*. If one doesn't click, walk through another door |
| **Dual methods** | Every worked example solved the *College way* AND the *Fast way* side-by-side |
| **Exam recipe cards** | Trigger → steps → full-marks check, per question type |
| **Verification pipeline** | `pipeline/verify-claims.mjs` — every mathematical claim in generated content is checked programmatically before commit (27/27 passing) |
| **Concepts tab** | New first-class view in the lesson reader, with verified badges and source-page jumps |

## Quick start

```bash
# 1. Place this folder NEXT TO your course folders:
#    My Documents/
#    ├── EELU-Study-Companion/   ← this repo
#    ├── Discrete Math/
#    ├── Electronics/
#    └── … (course folders, see server/sourceRoots.mjs)

# 2. Install and build
npm install
npm run build

# 3. Run the local server (serves the app + your course files)
npm start          # → http://127.0.0.1:4177
```

Development mode (two terminals):

```bash
npm start          # terminal 1 — API + source files on :4177
npm run dev        # terminal 2 — Vite dev server on :5173 (proxies /api)
```

## Content pipeline (how new lectures get explained)

```
┌─ Phase A: Extract ──────── PDF text extraction → concept map (28 CUs for Discrete Math)
├─ Phase B: Generate ─────── Topics authored in the new schema (3 doors, dual methods, recipes)
├─ Phase C: Verify ──────── npm run verify:claims   ← a FAIL blocks commit
└─ Phase D: Integrate ───── file lands in src/content/topics/, appears in the app instantly
```

See `pipeline/README.md` for the full pipeline contract.

## Repository layout

```
server/               Local Node.js server (catalog, source files, compare API)
src/                  React 18 + TypeScript + Vite frontend
  components/         Views: CourseLibrary, LessonReader, MasterKeyView, TopicExplorer (new), …
  content/lessons/    Legacy page-by-page explanations (unchanged)
  content/masterKeys/ Master Keys (sprint, recall, recipes)
  content/topics/     NEW concept-first topic sets (discrete-math pilot included)
pipeline/             NEW generation + verification pipeline (Node.js, zero deps)
scripts/              Content validators (check-lessons.mjs)
```

## Verification-first content policy

Generated content is **never trusted blindly**. Each topic file carries a `verifiedOn` stamp
that is only valid if `pipeline/verify-claims.mjs` passes on the current claim set. The
checker recomputes every checkable claim (truth-table equivalences, set cardinalities,
function-test verdicts, handshake totals, Euler's formula instances) instead of comparing
strings — so a regression in the math is caught mechanically.

## Status

- ✅ v2 architecture + pilot (Discrete Math: Power Sets, The Function Test, Contrapositive Family)
- ✅ 27/27 claims verified
- 🚧 Next: extend topic coverage to all 28 Discrete Math concept units, then other subjects
