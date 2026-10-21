import type { Topic, TopicSet } from '../../types';

// ---------------------------------------------------------------------------
// Electronics — LECTURE 4: Kirchhoff's Laws, Node-Voltage & Mesh Analysis,
// Network Theorems (Superposition, Source Transformation, Thévenin).
// Grounded in "Electronics/lecture/Lec_4 elec.pdf" pages 1-58 (58 slides,
// transcribed slide-by-slide via the vision pipeline — see
// workspace/extracted/elec-lec4-slides/Lec4_slide_transcript.md).
//
// Masterpiece DNA (the Electronics page-12 nodal exemplar, kept for every CU):
//   1. الزتونة first — the essence + reusable algorithm before everything.
//   2. Rebuild from zero — numbered steps, complete arithmetic, no jumps.
//   3. "Understand the figure" — plain-language description + ASCII circuit.
//   4. Recognition tricks — how to SEE the question type in 3 seconds.
//   5. Teacher advice + exam shortcuts (box the formulas, skip the listing).
//   6. Sanity check — re-substitute into the original KCL/KVL. No guessing.
//   7. Reusable recipe + "what usually confuses students" + compact summary
//      table + recall chain (افتكر دي).
//
// Anti-hallucination: every numeric claim below is recomputed by
// pipeline/verify-claims.mjs — verification family E4.* (IDs in comments).
// ---------------------------------------------------------------------------

const VERIFIED = '2026-10-21';
const L4 = 'electronics-lecture-4';

function md(lines: string[]): string {
  return lines.join('\n');
}

// ===========================================================================
// CU 4.1 — Circuit anatomy: branch, node, loop, mesh (pages 3-4, 19)
// ===========================================================================

const circuitAnatomy: Topic = {
  id: 'el4-circuit-anatomy',
  lessonId: L4,
  cuCode: 'CU 4.1',
  title: 'Circuit Anatomy — Branch, Node, Loop, Mesh',
  quick:
    'الزتونة: **branch** = one two-terminal element (battery, resistor, source…). **Node** = a connection point where 2+ branches meet. **Loop** = any closed path. **Mesh** = a loop with NO smaller loop inside it (a "window"). Count them BEFORE solving: unknowns of node analysis = nodes − 1; unknowns of mesh analysis = number of windows. The smaller count usually wins.',
  sourcePages: [3, 4, 19],
  prerequisites: [],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The City Map',
      markdown: md([
        'Think of the circuit as a **city map** (this is exactly the picture on slide 4):',
        '',
        '- **Branches** are the roads: one road = one street segment. In circuits, one branch = ONE element: a battery, a resistor, a source — anything with exactly two terminals.',
        '- **Nodes** are the intersections (نقطة التقاء): where two or more roads meet. Three intersections on slide 4: **a**, **b**, **c**.',
        '- **A loop** is any round trip: leave home, walk, come back without retracing.',
        '- **A mesh** is a city BLOCK (شُبّاك): a round trip around one block that contains no smaller streets inside. The outside "grand tour" of the whole map is a loop but NOT a mesh.',
        '',
        'افتكر دي: **mesh = شُبّاك** — a window pane. Count the window panes of the drawing, not the trips around the whole building.',
        '',
        'The slide-4 circuit has **5 branches**: the 10-V source, the 5-Ω resistor, the 2-Ω resistor, the 3-Ω resistor, and the 2-A source — and **3 nodes**: a, b, c.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Count on the Slide-4 Circuit (USE THIS)',
      markdown: md([
        '**Understand the figure.** Slide 4 shows one circuit; here it is redrawn:',
        '',
        '```',
        '        a ────[ 5 Ω ]──── b',
        '        │               / │ \\',
        '      + │            2Ω   3Ω',
        '   [10 V]│             │   │',
        '      - │          2A ↑   │   ← arrow points UP (c → b)',
        '        c ───────────────┴───┘',
        '```',
        '',
        'Five separate elements hang on this map, so **branch count = 5**: the 10-V source (a↔c), the 5-Ω (a↔b), the 2-Ω (b↔c), the 3-Ω (b↔c), and the 2-A source (c↔b). (verified: E4.1.1)',
        '',
        'Junction dots where elements meet: **a** (10-V and 5-Ω), **b** (5-Ω, 2-Ω, 3-Ω, 2-A), **c** (10-V, 2-Ω, 3-Ω, 2-A). So **node count = 3**. (verified: E4.1.2)',
        '',
        '**The trap the picture hides:** the 2-Ω, the 3-Ω and the 2-A source ALL connect the same pair of nodes (b and c) — three PARALLEL branches, drawn as three separate roads between the same two intersections. (verified: E4.1.3)',
        '',
        '**Counting recipe (10 seconds):**',
        '1. Touch every element once with your pencil → each touch = 1 branch.',
        '2. Circle every junction dot → each dot = 1 node. Two dots joined by BARE wire are the SAME node (wires are invisible). (verified: E4.1.4)',
        '3. Count window panes of the planar drawing → each pane = 1 mesh.',
        '',
        '**Why counting decides your weapon (teacher advice):** node-voltage analysis solves **nodes − 1** unknowns; mesh analysis solves **windows** unknowns. Slide 4 circuit: 3 nodes → 2 unknowns for node analysis. The slide-21 mesh circuit has 6 branches, 5 nodes and 2 windows → 2 unknowns either way, but **6 − 5 + 1 = 2** is the formula that hands you the window count instantly. (verified: E4.1.5)',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Four Definitions',
      markdown: md([
        'From the slides:',
        '',
        '- **Branch:** "a single element such as a voltage source or a resistor … any two-terminal element" (slide 4).',
        '- **Node:** "the point of connection between two or more branches" (slide 4).',
        '- **Loop:** a closed path through circuit elements that starts and ends at the same node.',
        '- **Mesh:** "a loop which does not contain any other loops within it" (slide 19).',
        '',
        'Consequences you can quote in an exam:',
        '',
        '1. Every mesh is a loop; the outer boundary is a loop but (usually) NOT a mesh.',
        '2. A dependent source (the diamond shapes on slides 16, 33, 43) is still a branch — count it.',
        '3. For a connected planar circuit: $\\text{\\#independent loops} = B - N + 1$, and the number of meshes equals exactly that count of windows. (verified: E4.1.5)',
        '4. Parallel branches share BOTH endpoints — like the 2-Ω, 3-Ω, 2-A trio on slide 4. (verified: E4.1.3)',
      ]),
    },
  ],
  methods: [
    {
      question: 'How do I count nodes fast in a messy drawing?',
      collegeMethod:
        'List every junction explicitly: name each dot (a, b, c, …), then merge dots that are connected only by plain wire, and state the final list. Slow but never wrong.',
      fastMethod:
        'Color the wires with your eyes: every blob of bare wire = ONE node, no matter how many dots are drawn on it. Count the blobs. Three blobs on slide 4 → three nodes.',
    },
    {
      question: 'Which method should I pick for a given circuit?',
      collegeMethod:
        'Write both candidate counts: nodes − 1 and number of meshes. Choose the smaller; if equal, prefer the method whose sources match (current sources → node analysis, voltage sources → mesh analysis).',
      fastMethod:
        'Glance rule: many current sources or a clear ground rail → NODE. Many voltage sources around loops → MESH. Same count → the matching-sources rule breaks the tie in 3 seconds.',
    },
  ],
  recipe: {
    trigger: 'Before ANY circuit problem — "find i", "find v", "find node voltages" — you first count anatomy.',
    steps: [
      'Branches: pencil-touch every element once. Sources and resistors each count as ONE branch.',
      'Nodes: circle the junction dots; merge bare-wire-connected dots into one node.',
      'Loops/meshes: count window panes of the planar drawing; check with $B - N + 1$.',
      'Decide: unknowns of node analysis = $N-1$; of mesh analysis = #windows. Pick the smaller.',
    ],
    check: 'The slide-4 circuit gives 5 branches, 3 nodes, 2 windows — say those three numbers out loud before moving on.',
  },
  traps: [
    'Two dots joined by plain wire are ONE node — the wire is invisible. Drawing ≠ anatomy.',
    'The grand outer loop is a loop but NOT a mesh: it contains smaller loops inside.',
    'The 2-Ω, 3-Ω and 2-A source on slide 4 are THREE branches but only ONE branch-pair of nodes (b↔c) — parallel, not series.',
    'Dependent sources (diamonds) count as branches too — never "hide" them.',
  ],
  summaryTable: {
    title: 'Anatomy of the Slide-4 Circuit at a Glance',
    headers: ['Term', 'Definition', 'In the slide-4 circuit'],
    rows: [
      ['Branch', 'One two-terminal element', '5 (10-V, 5-Ω, 2-Ω, 3-Ω, 2-A)'],
      ['Node', 'Junction of 2+ branches', '3 (a, b, c)'],
      ['Loop', 'Any closed path', 'e.g. 10-V → 5-Ω → 2-Ω → back'],
      ['Mesh', 'Loop with nothing inside', 'the window panes of the drawing'],
    ],
  },
  recall: [
    { q: 'Branch?', a: 'One element with two terminals. Count elements, not lines.' },
    { q: 'Node vs mesh in one breath?', a: 'Node = نقطة التقاء (junction); mesh = شُبّاك (window pane with nothing inside).' },
    { q: 'How many unknowns will node analysis give me?', a: 'Nodes − 1 (ground is free).' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.2 — Kirchhoff's Current Law (pages 5-6)
// ===========================================================================

const kcl: Topic = {
  id: 'el4-kcl',
  lessonId: L4,
  cuCode: 'CU 4.2',
  title: 'KCL — Current Cannot Pile Up',
  quick:
    'الزتونة: at ANY point of a circuit, **what goes in must come out**: $\\sum i = 0$. Declare "into the node = positive", "out = negative", add everything, get zero. Slide 5: 5 A + 3 A in ⇒ 8 A out. Charge never queues at a junction.',
  sourcePages: [5, 6],
  prerequisites: ['CU 4.1'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — Water Pipes at a Junction',
      markdown: md([
        'Current is water in pipes (slide 5 draws exactly this as Fig. 9-1):',
        '',
        'Two pipes pour INTO point P: 5 L/s and 3 L/s. One pipe leaves P. The water cannot vanish and cannot be stored at P, so the out-pipe must carry **8 L/s**.',
        '',
        '```',
        '   5 A →  ╲              ╱ → 8 A',
        '            ●  P       ',
        '   3 A →  ╱              ╲',
        '```',
        '',
        'Where would the extra water go? Nowhere — there is no tank at P. In a circuit there is no "charge tank" either: otherwise "charge would accumulate at the point" (slide 5) and the junction would explode.',
        '',
        'افتكر دي: الكهرباء زي المية — ما يدخل لازم يخرج. (Electricity is like water: whatever enters must leave.)',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Sign Machine (USE THIS IN EVERY EXAM)',
      markdown: md([
        '**Step 0 — from zero.** A "current" is just a labeled arrow with a size. The arrow says which way the charge walks. KCL never looks at resistors or voltages — only at arrows touching a point.',
        '',
        '**The slide-5 numbers (Fig. 9-1, point P):** $I_A = 5$ A and $I_B = 3$ A point INTO P; $I_C = 8$ A points OUT.',
        '',
        '1. Declare the convention (slide 5): currents INTO the point are **positive**, currents OUT are **negative**.',
        '2. Write the sum: $I_A + I_B - I_C = 0$.',
        '3. Substitute: $5 + 3 - 8 = 0$. ✓ (verified: E4.2.1)',
        '',
        'Same statement, other shape (the "balance" form): $\\underbrace{I_A + I_B}_{\\text{in}} = \\underbrace{I_C}_{\\text{out}}$ → $5 + 3 = 8$. Both forms say the same thing.',
        '',
        '**Slide 6 — the general law:** $\\sum_{n=1}^{N} i_n = 0$ at a node. The slide draws one node with five arrows: $i_1, i_2$ in and $i_3, i_4, i_5$ out, so',
        '',
        '$$i_1 + i_2 - i_3 - i_4 - i_5 = 0 \\quad\\Longleftrightarrow\\quad i_1 + i_2 = i_3 + i_4 + i_5$$ (verified: E4.2.2)',
        '',
        '**Missing-current drill** (the exam version): 4 A and 2 A enter a node; 3 A leaves through a third wire. The fourth wire must carry $4 + 2 - 3 = 3$ A OUT. (verified: E4.2.3)',
        '',
        '**Sanity check habit:** after finding any current, re-add ALL arrows at the node with signs. If the sum is not 0, a sign flipped somewhere — go back before continuing.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Statement and Why It Is True',
      markdown: md([
        'Slide 5 statement: "The algebraic sum of the currents entering and leaving any point in a circuit must equal zero … otherwise, charge would accumulate at the point, instead of having a conducting path."',
        '',
        'Slide 6 statement: "KCL states that the algebraic sum of currents entering a node (or a closed boundary) is zero: $\\sum_{n=1}^{N} i_n = 0$."',
        '',
        'Two formal remarks that earn marks:',
        '',
        '1. **An algebraic sum** means signed addition — positive and negative values combined (slide 5). The sign comes from YOUR declared arrow direction, not from the metal.',
        '2. **The closed-boundary clause**: KCL holds for ANY closed surface, not just single nodes. Slice a whole sub-circuit with an imaginary bag: total current INTO the bag = total OUT. Examiners love this word "closed boundary" (it is printed on slide 6).',
        '',
        'The physical root is **conservation of charge**: charge is neither created nor destroyed at a junction, so its bookkeeping must balance exactly.',
      ]),
    },
  ],
  methods: [
    {
      question: 'Find the unknown current at a junction.',
      collegeMethod:
        'Write KCL in the full signed form: name every arrow, declare into-node positive, write $\\sum i = 0$, substitute all knowns, solve the one unknown.',
      fastMethod:
        'Balance form: total IN = total OUT. Move the knowns to the correct side mentally and the unknown falls out in one line: $i_{out} = 4 + 2 - 3 = 3$ A.',
    },
    {
      question: 'A current source arrow points down — so the current is negative?',
      collegeMethod:
        'No. Set the convention first: an arrow SHOWS direction; its label is a magnitude. Decide +/− only after declaring what "positive at this node" means.',
      fastMethod:
        'Arrows are instructions, not verdicts. Draw your own arrows on the sketch, keep them consistent, and let negative ANSWERS tell you a drawn arrow was backwards.',
    },
  ],
  recipe: {
    trigger: 'Any question that says "find the current i in this branch" where the branch touches a junction with known currents — or every node equation you will ever write.',
    steps: [
      'Point at the node. List every arrow touching it (in-currents and out-currents).',
      'Declare: INTO the node = +, OUT = − (say it, write it).',
      'Write $\\sum i = 0$, one term per arrow.',
      'Substitute the known values, keeping signs.',
      'Solve for the unknown. CHECK: re-add every term — the sum must return 0.',
    ],
    check: 'Slide-5 numbers: 5 + 3 − 8 = 0. If your final sum is not zero, you flipped one arrow.',
  },
  traps: [
    'Signs come from YOUR arrow convention — a current source arrow shows the direction the source pushes, not "negative".',
    'KCL applies to closed surfaces too, not only single nodes (slide 6 prints it: "or a closed boundary").',
    'A junction of TWO branches only (in-line elements) is trivial: the current in = the current out — no new information, skip it.',
    'Zero total does not mean each current is zero — big currents can cancel (you will see −1.667 A + 6.667 A = 5 A in CU 4.4).',
  ],
  summaryTable: {
    title: 'KCL — The One-Line Law',
    headers: ['Form', 'Equation', 'Slide-5 numbers'],
    rows: [
      ['Signed sum', '$I_A + I_B - I_C = 0$', '$5 + 3 - 8 = 0$'],
      ['Balance', 'in = out: $I_A + I_B = I_C$', '$5 + 3 = 8$'],
      ['General (slide 6)', '$\\sum_{n=1}^{N} i_n = 0$', 'holds for nodes AND closed boundaries'],
    ],
  },
  recall: [
    { q: 'KCL in three words?', a: 'In = Out. (الزتونة: ما يدخل لازم يخرج)' },
    { q: 'Why must it hold?', a: 'Charge cannot accumulate at a point — conservation of charge.' },
    { q: 'What is an "algebraic sum"?', a: 'A signed sum: + for into-node arrows, − for out, then add.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.3 — Kirchhoff's Voltage Law (page 7)
// ===========================================================================

const kvl: Topic = {
  id: 'el4-kvl',
  lessonId: L4,
  cuCode: 'CU 4.3',
  title: 'KVL — Every Climb Is Repaid',
  quick:
    'الزتونة: walk any closed loop and you return to the same height: **total rises = total drops**, $\\sum v = 0$. Walking − to + inside an element = a RISE (write +v); walking + to − = a DROP (write −v). Slide 7: $-v_1 + v_2 + v_3 - v_4 + v_5 = 0$, i.e. $v_2+v_3+v_5 = v_1+v_4$.',
  sourcePages: [7],
  prerequisites: ['CU 4.1'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Closed Hike',
      markdown: md([
        'KVL is a hiking rule: if you leave camp and return to camp, the total elevation you CLIMBED must equal the total elevation you DESCENDED — otherwise you would end up floating or underground.',
        '',
        'Voltage = height. A battery is a staircase going up (from − to +); a resistor is a slide going down (current falls through it, high potential to low). Slide 7 draws a loop of five elements: sources $v_1$, $v_4$ and elements $v_2$, $v_3$, $v_5$ — a closed trail.',
        '',
        'افتكر دي: KVL هو قانون رحلة المقعد الأصلي — أي دورة مغلقة ترجعك لنفس الطابق. (A closed walk always returns you to the same floor.)',
        '',
        'The payoff sentence printed on slide 7: **"Sum of voltage drops = Sum of voltage rises."**',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — The Sign Walk (USE THIS IN EVERY EXAM)',
      markdown: md([
        '**Step 0 — from zero.** Voltage signs in KVL come from ONE question, asked per element: **which terminal do I hit first on my walk?**',
        '',
        '- Hit the **−** terminal first (leave through +): the element RAISED you → write **+$v$**.',
        '- Hit the **+** terminal first (leave through −): the element DROPPED you → write **−$v$**.',
        '- Finish the loop; the signed sum MUST be zero.',
        '',
        '**Slide 7, the five-element loop.** The slide walks its loop clockwise and collects:',
        '',
        '$$-v_1 + v_2 + v_3 - v_4 + v_5 = 0$$',
        '',
        'Rearranged (move the negative terms across):',
        '',
        '$$v_2 + v_3 + v_5 = v_1 + v_4$$',
        '',
        'which slide 7 reads aloud as **"sum of voltage drops = sum of voltage rises."** (verified: E4.3.1)',
        '',
        '**Number drill:** pick $v_1 = 3$ V, $v_2 = 1$ V, $v_3 = 2$ V, $v_4 = 1$ V, $v_5 = 1$ V. Then drops $v_2+v_3+v_5 = 1+2+1 = 4$ V and rises $v_1+v_4 = 3+1 = 4$ V ✓, and the signed sum $-3+1+2-1+1 = 0$ ✓. (verified: E4.3.2)',
        '',
        '**Sanity check habit:** after solving ANY loop problem, plug your currents back into one untouched loop and re-walk it: the signed sum must return 0 (you will see this exact habit finish the mesh example of CU 4.6).',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Statement',
      markdown: md([
        'Slide 7 statement: "KVL states that the algebraic sum of all voltages around a closed path (or loop) is zero: $\\sum_{m=1}^{M} v_m = 0$."',
        '',
        'Formal consequences worth writing in an exam:',
        '',
        '1. KVL needs a **closed path** — an open walk from a to b measures $v_{ab}$, it does not have to vanish.',
        '2. The equation is **independent of direction**: walking counter-clockwise just multiplies the whole equation by −1; the balance survives.',
        '3. KVL is energy conservation per coulomb: the loop is a closed electric field path, and a charge coming home neither gains nor loses net energy.',
        '4. Rearranged form (slide 7): $\\sum \\text{drops} = \\sum \\text{rises}$ — the bookkeeping form used in every mesh equation of CU 4.6.',
      ]),
    },
  ],
  methods: [
    {
      question: 'Write the KVL equation for a loop with polarities marked.',
      collegeMethod:
        'Choose a walk direction, list the elements in order with the terminal you meet first, assign + for −-to-+ traversal and − for +-to-− traversal, then set the signed sum to zero.',
      fastMethod:
        'Two-column T-account: left column = rises, right column = drops. Fill it while walking once, then state "left = right". No sign errors possible.',
    },
    {
      question: 'The circuit has two batteries facing opposite ways — can the loop still balance?',
      collegeMethod:
        'Yes — opposite batteries simply contribute with opposite signs in the same equation. Solve normally; the algebra is honest even when intuition is confused.',
      fastMethod:
        'Think heights: one staircase up 15 V, one staircase up 10 V in the other direction — the net climb is 5 V, so the resistor drops must total 5 V. (This exact shape is the CU 4.6 mesh example.)',
    },
  ],
  recipe: {
    trigger: 'Any loop problem — mesh analysis, "verify this solution", "find the source voltage", every mesh equation.',
    steps: [
      'Choose ONE loop and ONE walk direction (clockwise is the class habit).',
      'Walk element by element; ask only: "which polarity do I meet first?"',
      'Meet − first → the element is a rise → write +$v$. Meet + first → drop → write −$v$.',
      'Resistors: write the drop as $R \\cdot i$ using YOUR current arrow (same direction as walk = $+Ri$; against the walk = $-Ri$).',
      'Close the loop and set the signed sum $= 0$. CHECK: substitute a numeric solution — the sum must return 0.',
    ],
    check: 'Slide-7 rearrangement: $v_2+v_3+v_5 = v_1+v_4$. Numeric drill: $-3+1+2-1+1 = 0$.',
  },
  traps: [
    'The sign belongs to the WALK, not to the element: the same battery is +v in one direction and −v in the other.',
    'A "small" battery facing against the walk is NOT zero — it subtracts (the 10 V source inside the CU 4.6 mesh example proves it).',
    'KVL needs a CLOSED path — no closed path, no zero guarantee.',
    'Do not mix KVL (voltages around loops) with KCL (currents at points) inside one equation — one equation, one law.',
  ],
  summaryTable: {
    title: 'KVL — The One-Line Law',
    headers: ['Form', 'Equation', 'Reading'],
    rows: [
      ['Signed sum (slide 7)', '$-v_1+v_2+v_3-v_4+v_5 = 0$', 'walk signs collected'],
      ['Balance (slide 7)', '$v_2+v_3+v_5 = v_1+v_4$', 'sum of drops = sum of rises'],
      ['General', '$\\sum_{m=1}^{M} v_m = 0$', 'around any closed path'],
    ],
  },
  recall: [
    { q: 'KVL in four words?', a: 'Rises = drops. (كل صعود له هبوط)' },
    { q: 'When do I write +v?', a: 'When my walk enters at the − terminal (the element lifts me).' },
    { q: 'Why must it hold?', a: 'Energy per coulomb over a closed path nets to zero — no free lunch.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.4 — Node-voltage analysis (pages 8-15) — THE GOLDEN-STANDARD METHOD
// ===========================================================================

const nodeVoltage: Topic = {
  id: 'el4-node-voltage',
  lessonId: L4,
  cuCode: 'CU 4.4',
  title: 'Node-Voltage Analysis — One Unknown per Node',
  quick:
    'الزتونة: nail ONE node to the floor and call it **ground (0 V)**. Every other node gets ONE unknown voltage, measured FROM ground. At each unknown node write KCL, but replace every branch current with Ohm\'s law: $i = \\frac{v_{\\text{here}} - v_{\\text{there}}}{R}$. Result: exactly ONE equation per unknown node. $n$ nodes ⇒ $n-1$ equations. Solve. Done.',
  sourcePages: [8, 9, 10, 11, 12, 13, 14, 15],
  prerequisites: ['CU 4.1', 'CU 4.2'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — Floors of a Building',
      markdown: md([
        'Slides 8-10 build the idea with one picture: **a building with a street exit.**',
        '',
        '- Call the street level **0** (that is the ground node).',
        '- Every floor is described by ONE number: its height above the street — $v_1$, $v_2$ (these are the **node voltages**).',
        '- Water in a pipe between floor $v_1$ and floor $v_2$ flows by itself from the HIGHER to the LOWER — and its flow rate is the height difference divided by the pipe\'s resistance: $i = \\frac{v_1 - v_2}{R}$ (slide 10 prints exactly this: "current flows from a higher potential to a lower potential in a resistor").',
        '',
        'So you never need "the current in each pipe" as a separate unknown: heights generate currents. Count floors, write water balance at each floor, and the heights fall out.',
        '',
        'افتكر دي: **الأرضية = البحر** — كل طابق يُقاس من البحر. (Ground = sea level: every floor is measured from it.)',
        '',
        'And the slogan of slide 9-10: node equations are just **KCL dressed in Ohm\'s law**.',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Rebuild the Golden Example From Zero (pages 11-13)',
      markdown: md([
        '**Understand the figure (slide 11).** Two nodes sit above a ground rail:',
        '',
        '- Node 1: joined to ground by a **2-Ω** resistor ($i_3$, down).',
        '- Node 2: joined to ground by a **6-Ω** resistor ($i_5$, down).',
        '- The two nodes are joined by a **4-Ω** resistor ($i_2$, assumed 1 → 2) **in parallel with a 5-A current source** pushing its current INTO node 1.',
        '- A **10-A source** pushes up from ground into node 2.',
        '',
        '```',
        '                ┌────[ 4 Ω ]────┐',
        '                │   i₂: 1 → 2   │',
        '   node 1 ●──────┤               ├──────● node 2',
        '     │          │               │        │',
        '     │      5A source (i₁ = 5 A, INTO node 1)',
        '     │          └───────────────┘        │',
        '   [ 2 Ω ]   i₃ ↓                     [ 6 Ω ]   i₅ ↓',
        '     │                                   │',
        '     │            10 A ↑ (i₄, into node 2)│',
        '   ══╩═══════════════════════════════════╩══  ground rail = 0 V',
        '```',
        '',
        '**Step 1 — Ground.** Bottom rail = 0 V. Unknowns: $v_1$, $v_2$. Two unknowns → two KCL equations (nodes 1 and 2). Ground itself is NEVER an equation — it is the free known.',
        '',
        '**Step 2 — Name the arrows (slides 11-12):** $i_1 = 5$ A (source into node 1), $i_2$ through the 4-Ω (assumed 1→2), $i_3$ through the 2-Ω (1→ground), $i_4 = 10$ A (into node 2), $i_5$ through the 6-Ω (2→ground).',
        '',
        '**Step 3 — KCL at node 1 (in = out):**',
        '',
        '$$i_1 = i_2 + i_3 \\;\\Longrightarrow\\; 5 = \\frac{v_1 - v_2}{4} + \\frac{v_1 - 0}{2}$$',
        '',
        '(each current became Ohm\'s law: high node minus low node over R — slide 10\'s rule)',
        '',
        '**Step 4 — clear fractions (×4):** $20 = (v_1 - v_2) + 2v_1$, i.e.',
        '',
        '$$\\boxed{\\,3v_1 - v_2 = 20\\,}$$ (verified: E4.4.2)',
        '',
        '**Step 5 — KCL at node 2 (in = out):** in: $i_2 + i_4$; out: $i_1 + i_5$ (the 5-A source leaves node 2 on its way to node 1):',
        '',
        '$$\\frac{v_1 - v_2}{4} + 10 = 5 + \\frac{v_2 - 0}{6}$$',
        '',
        '**Step 6 — clear fractions (×12):** $3(v_1 - v_2) + 120 = 60 + 2v_2$, so $3v_1 - 3v_2 + 120 = 60 + 2v_2$, i.e.',
        '',
        '$$\\boxed{\\,-3v_1 + 5v_2 = 60\\,}$$ (verified: E4.4.4)',
        '',
        '**Step 7 — solve, METHOD 1: elimination (slide 13).** Add the two boxed equations: $(3v_1 - v_2) + (-3v_1 + 5v_2) = 20 + 60$ → $4v_2 = 80$ →',
        '',
        '$$v_2 = 20 \\text{ V}$$',
        '',
        'Back-substitute: $3v_1 - 20 = 20$ → $3v_1 = 40$ →',
        '',
        '$$v_1 = \\frac{40}{3} = 13.\\overline{3} \\approx 13.33 \\text{ V}$$ (verified: E4.4.5, E4.4.6)',
        '',
        'Teacher note (printed in the legacy page-12 notes and still true): a node voltage can come out LARGER than ground or smaller than its neighbor — here $v_1 < v_2$ even though the 5-A source points at node 1. The algebra decides; the picture does not.',
        '',
        '**Step 7′ — solve, METHOD 2: Cramer\'s rule (slide 14).** Matrix form:',
        '',
        '$$\\begin{bmatrix}3 & -1\\\\ -3 & 5\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix} = \\begin{bmatrix}20\\\\60\\end{bmatrix}$$',
        '',
        '- Main determinant: $\\Delta = 3\\cdot5 - (-1)(-3) = 15 - 3 = 12$.',
        '- $\\Delta_1 = \\begin{vmatrix}20 & -1\\\\ 60 & 5\\end{vmatrix} = 100 + 60 = 160$ → $v_1 = \\Delta_1/\\Delta = 160/12 = 13.33$ V.',
        '- $\\Delta_2 = \\begin{vmatrix}3 & 20\\\\ -3 & 60\\end{vmatrix} = 180 + 60 = 240$ → $v_2 = 240/12 = 20$ V.',
        '',
        'Both methods agree. (verified: E4.4.7, E4.4.8, E4.4.9)',
        '',
        '**Step 8 — currents from voltages (slide 15):**',
        '',
        '- $i_2 = \\frac{v_1 - v_2}{4} = \\frac{13.33 - 20}{4} = \\frac{-6.67}{4} = -1.667$ A → **negative**: the 4-Ω current actually flows 2 → 1. (verified: E4.4.10)',
        '- $i_3 = \\frac{v_1}{2} = 6.67$ A down. $i_5 = \\frac{v_2}{6} = 3.33$ A down. (verified: E4.4.11)',
        '',
        '**Step 9 — SANITY CHECK (never skip):** re-substitute into the ORIGINAL KCL sentences:',
        '',
        '- Node 1: in $= 5$ A; out $= i_2 + i_3 = -1.667 + 6.667 = 5.000$ A ✓ (verified: E4.4.12)',
        '- Node 2: in $= i_2 + i_4 = -1.667 + 10 = 8.333$ A; out $= i_1 + i_5 = 5 + 3.333 = 8.333$ A ✓ (verified: E4.4.13)',
        '',
        'The solution balances at both nodes — it is not a guess, it is bookkeeping that closes.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Method as Four Printed Facts',
      markdown: md([
        'Slides 8-10 state the machinery; here it is compressed:',
        '',
        '1. **Ground choice is free** (slide 8): pick any node as reference 0 V; the most-connected node saves the most ink. $n$ nodes ⇒ $n-1$ unknown voltages.',
        '2. **KCL at each unknown node** (slide 9): at node 1, $I_1 = I_2 + i_1 + i_2$; at node 2, $I_2 + i_2 = i_3$ — currents in/out, nothing else.',
        '3. **Ohm\'s law replaces every resistor current** (slide 10): $i = \\frac{v_{\\text{higher}} - v_{\\text{lower}}}{R}$, or in conductance form $i = G(v_a - v_b)$ with $G = 1/R$.',
        '4. **The system is linear** in $v_1, v_2, \\dots$ — elimination, Cramer, matrix inverse, ANY linear-algebra weapon works. That is why slides 13-14 bother to show two solution methods.',
      ]),
    },
  ],
  methods: [
    {
      question: 'Solve the two node equations.',
      collegeMethod:
        'Elimination (slide 13): add/subtract multiples of the two equations to kill one unknown, back-substitute the survivor. Shows understanding, always works, slower for 3+ unknowns.',
      fastMethod:
        'Cramer (slide 14): write the matrix, compute $\\Delta$, replace the k-th column with the RHS for $\\Delta_k$, divide. Mechanical, scales to 3 nodes, and the determinants double as a sign-check (here $\\Delta = 12 > 0$).',
    },
    {
      question: 'A current source sits between two NON-ground nodes (like the 5-A here) — where does it appear?',
      collegeMethod:
        'In BOTH node equations: as "out" of one node and "in" to the other, with its full fixed value. Write both KCL sentences first, then substitute Ohm\'s law only into resistor currents.',
      fastMethod:
        'Shortcut called the supernode: you may also merge the two nodes into one bigger KCL region (the source fixes the DIFFERENCE). For this lecture the sentence-level treatment is enough — just do not lose the 5 A on one side.',
    },
  ],
  recipe: {
    trigger: '"Find the node voltages", "find v1 and v2", a circuit with several current sources and a clear ground rail, or any circuit where nodes − 1 < number of meshes.',
    steps: [
      'Ground the most-connected node: $v = 0$ there. Count unknowns = remaining nodes.',
      'Name the unknowns $v_1, v_2, \\dots$ and draw ONE arrow per branch current.',
      'Write KCL (in = out) at each unknown node, in words first.',
      'Replace every RESISTOR current by $\\frac{v_{\\text{here}} - v_{\\text{there}}}{R}$; keep source currents as numbers.',
      'Clear denominators with the LCM; box one simplified equation per node.',
      'Solve (elimination or Cramer). Then compute asked currents from the voltages.',
      'SANITY: re-substitute into the original in=out sentences — both must balance.',
    ],
    check: 'Golden example: node 1 balance gives $-1.667 + 6.667 = 5$ ✓ and node 2 gives $-1.667 + 10 = 5 + 3.333$ ✓. If your numbers do not close KCL, fix them before the exam grader does.',
  },
  traps: [
    'Writing an equation AT the ground node — it is already known (0 V); unknowns only.',
    'Sign of $\\frac{v_1 - v_2}{R}$ follows YOUR assumed arrow; a negative result does not mean "wrong" — it means the arrow points backwards (the −1.667 A here).',
    'The 5-A source between nodes 1 and 2 belongs to BOTH equations — forgetting it on one side is the #1 lost mark.',
    'Fractions: multiply through by the LCM (4, then 12) BEFORE combining — the boxed equations $3v_1 - v_2 = 20$ and $-3v_1 + 5v_2 = 60$ have no fractions left.',
    'Do NOT write KCL at a node with only two branches (in-line) — it carries no information.',
  ],
  summaryTable: {
    title: 'The Golden Example — Whole Solution on One Card',
    headers: ['Step', 'What you write', 'Result'],
    rows: [
      ['Ground', 'bottom rail = 0 V', 'unknowns: $v_1, v_2$'],
      ['KCL node 1', '$5 = \\frac{v_1-v_2}{4} + \\frac{v_1}{2}$ (×4)', '$3v_1 - v_2 = 20$'],
      ['KCL node 2', '$\\frac{v_1-v_2}{4} + 10 = 5 + \\frac{v_2}{6}$ (×12)', '$-3v_1 + 5v_2 = 60$'],
      ['Elimination (13)', 'add both: $4v_2 = 80$', '$v_2 = 20$ V'],
      ['Back-substitute', '$3v_1 = 20 + v_2 = 40$', '$v_1 = 40/3 \\approx 13.33$ V'],
      ['Cramer (14)', '$\\Delta = 12,\\; \\Delta_1 = 160,\\; \\Delta_2 = 240$', '$13.33$ V, $20$ V ✓'],
      ['Currents (15)', '$i_2 = -1.667$ A, $i_3 = 6.667$ A, $i_5 = 3.333$ A', 'signs tell true directions'],
    ],
  },
  recall: [
    { q: 'How many equations for n nodes?', a: 'n − 1 (ground is the free known). One node = one equation.' },
    { q: 'The resistor current formula?', a: '$i = (v_{\\text{here}} - v_{\\text{there}})/R$ — high minus low over R.' },
    { q: 'Golden example answers?', a: '$v_1 = 40/3 \\approx 13.33$ V, $v_2 = 20$ V; the 4-Ω current is −1.667 A (flows 2→1).' },
    { q: 'افتكر دي shortcut?', a: 'Ground = sea; heights from the sea; check in = out at every floor.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.5 — Node analysis with a dependent source (pages 16-18)
// ===========================================================================

const nodeDependent: Topic = {
  id: 'el4-node-dependent-source',
  lessonId: L4,
  cuCode: 'CU 4.5',
  title: 'Node Analysis + a Dependent Source — The Puppet Master Rule',
  quick:
    'الزتونة: a dependent source adds **NO new unknown** — it is a puppet. Its controller ($i_x$ or $v_x$) is already expressible with node voltages. So: write KCL at every node as usual; wherever the puppet or its controller appears, replace the control using Ohm\'s law ($i_x = \\frac{v_1-v_2}{R}$); solve the bigger system. NEVER kill a dependent source.',
  sourcePages: [16, 17, 18],
  prerequisites: ['CU 4.4'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Thermostat',
      markdown: md([
        'A dependent source is a **thermostat**: it does whatever its sensor says — "output = 2 × whatever the sensor reads". The thermostat is not independent; there is no point "turning it off" or asking for its own equation. Control the SENSOR and the thermostat obeys.',
        '',
        'On slide 16 the puppet is a current source of value $2i_x$ (arrow down into ground at node 3), and its sensor $i_x$ is simply the current through the 2-Ω resistor between nodes 1 and 2. Whoever knows $v_1 - v_2$ knows $i_x$ — and then the puppet\'s value is $2i_x$, automatically.',
        '',
        'افتكر دي: المصدر التابع = دمية (puppet). اكتب المعادلات العادية، وبدّل قيمته بمقياس المتحكم. (The dependent source is a puppet: write ordinary equations, substitute its controller\'s reading.)',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Rebuild the Three-Node Example From Zero (pages 16-18)',
      markdown: md([
        '**Understand the figure (slide 16).** Three unknown nodes above ground:',
        '',
        '- A **3-A source** pushes up into node 1.',
        '- **2-Ω** resistor between node 1 and node 2 — its current is the sensor $i_x$ (assumed 1 → 2).',
        '- **8-Ω** resistor between node 2 and node 3.',
        '- **4-Ω** resistor between node 2 and ground.',
        '- **4-Ω** resistor between node 1 and node 3.',
        '- The puppet: a dependent current source of value $2i_x$, arrow DOWN from node 3 to ground.',
        '',
        '```',
        '          3 A ↑                ',
        '           │        i_x (1→2)  ',
        '   node 1 ●────[ 2 Ω ]────● node 2',
        '     │   \\                 │    \\',
        '     │    [ 4 Ω ]        [ 4 Ω ] [ 8 Ω ]',
        '     │    (1→3)           │      (2→3)',
        '     │      │             │        │',
        '     │      ●── node 3 ───┴────────┘',
        '     │      │',
        '     │   [ 2·i_x ↓ ]  dependent source to ground',
        '   ══╩══════╩═══════════════════════  ground = 0 V',
        '```',
        '',
        '**Step 1 — unknowns:** $v_1, v_2, v_3$ (three nodes, ground = 0). Three KCL equations coming.',
        '',
        '**Step 2 — node 1 (in = out):** in: 3 A. Out: the 4-Ω current to node 3, $\\frac{v_1 - v_3}{4}$, plus the 2-Ω current $i_x = \\frac{v_1 - v_2}{2}$:',
        '',
        '$$3 = \\frac{v_1 - v_3}{4} + \\frac{v_1 - v_2}{2} \\;\\;\\xrightarrow{\\times 4}\\;\\; \\boxed{\\,3v_1 - 2v_2 - v_3 = 12\\,}$$ (verified: E4.5.2)',
        '',
        '**Step 3 — node 2 (in = out):** in: $i_x$. Out: the 8-Ω current to node 3, $\\frac{v_2 - v_3}{8}$, plus the 4-Ω current to ground, $\\frac{v_2}{4}$:',
        '',
        '$$\\frac{v_1 - v_2}{2} = \\frac{v_2 - v_3}{8} + \\frac{v_2}{4} \\;\\;\\xrightarrow{\\times 8}\\;\\; \\boxed{\\,-4v_1 + 7v_2 - v_3 = 0\\,}$$ (verified: E4.5.3)',
        '',
        '**Step 4 — node 3 (in = out):** in: the two arriving currents $\\frac{v_1 - v_3}{4} + \\frac{v_2 - v_3}{8}$. Out: the puppet $2i_x$. Replace the control FIRST:',
        '',
        '$$i_x = \\frac{v_1 - v_2}{2} \\;\\Longrightarrow\\; 2i_x = 2 \\cdot \\frac{v_1 - v_2}{2} = v_1 - v_2$$',
        '',
        'So node 3 says $\\frac{v_1 - v_3}{4} + \\frac{v_2 - v_3}{8} = (v_1 - v_2)$; multiply by 8 and divide by −3:',
        '',
        '$$\\boxed{\\,2v_1 - 3v_2 + v_3 = 0\\,}$$ (verified: E4.5.4)',
        '',
        '**Step 5 — solve by elimination (slide 18):**',
        '',
        '- Add [node 1] + [node 3]: $(3v_1+2v_1) + (-2v_2-3v_2) + (-v_3+v_3) = 12$ → $5v_1 - 5v_2 = 12$ → $v_1 - v_2 = 2.4$. (verified: E4.5.5)',
        '- Add [node 2] + [node 3]: $(-4v_1+2v_1) + (7v_2-3v_2) + (-v_3+v_3) = 0$ → $-2v_1 + 4v_2 = 0$ → $v_1 = 2v_2$. (verified: E4.5.6)',
        '- Substitute: $2v_2 - v_2 = 2.4$ → $v_2 = 2.4$ V, then $v_1 = 4.8$ V, then from node 3: $v_3 = 3v_2 - 2v_1 = 7.2 - 9.6 = -2.4$ V. (verified: E4.5.7)',
        '',
        '**Step 6 — the puppet\'s actual value:** $i_x = \\frac{v_1 - v_2}{2} = \\frac{2.4}{2} = 1.2$ A, so the dependent source carries $2i_x = 2.4$ A down into ground. (verified: E4.5.8)',
        '',
        '**Step 7 — SANITY CHECK (slide 18\'s own habit):**',
        '',
        '- Node 1: in 3 A = out $\\frac{v_1-v_3}{4} + i_x = \\frac{4.8+2.4}{4} + 1.2 = 1.8 + 1.2 = 3$ A ✓',
        '- Node 2: in $i_x = 1.2$ = out $\\frac{v_2-v_3}{8} + \\frac{v_2}{4} = 0.6 + 0.6 = 1.2$ A ✓',
        '- Node 3: in $1.8 + 0.6 = 2.4$ A = out $2i_x = 2.4$ A ✓ (verified: E4.5.9)',
        '',
        'Everything closes — including the puppet\'s promise.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — Why the Puppet Adds No Unknown',
      markdown: md([
        'Slide 17 derives the three equations exactly as above, then slide 18 solves them three ways (elimination shown; Cramer and matrix elimination are the alternatives). The formal points:',
        '',
        '1. A dependent source is a branch whose value is a FUNCTION of other branch variables: $2i_x$, $0.25v_x$, $5i_o$, … (the diamond symbol).',
        '2. In node analysis, every controlling variable is already writable in terms of node voltages (via Ohm\'s law) — so the dependent source brings an EQUATION constraint, not an unknown.',
        '3. Consequence: $n$ nodes with dependent sources still usually needs only $n-1$ KCL equations, because the control substitution happens INSIDE those equations.',
        '4. The same puppet rule returns twice later in this lecture: superposition (CU 4.7) keeps dependent sources ALIVE in every pass, and source transformation (CU 4.8) may transform them only if the control survives.',
      ]),
    },
  ],
  methods: [
    {
      question: 'Where do I substitute the controlling variable?',
      collegeMethod:
        'Write all node equations with the control symbol ($i_x$) left in place; then write a separate control equation ($i_x = (v_1-v_2)/R$) and substitute it into every node equation. Transparent and self-checking.',
      fastMethod:
        'Substitute inline the moment the control appears — in this example the puppet $2i_x$ becomes $v_1 - v_2$ in one line ($2 \\cdot \\frac{v_1-v_2}{2} = v_1 - v_2$). One pass, no extra sheet.',
    },
    {
      question: 'My answer has a NEGATIVE node voltage — error?',
      collegeMethod:
        'Not necessarily. Re-verify by substituting all values into every original equation. If all close, the negative is physical: the node sits BELOW ground because the sources pull it there.',
      fastMethod:
        'Here $v_3 = -2.4$ V is the printed slide answer — negative nodes are legal citizens. Check closure, not sign aesthetics.',
    },
  ],
  recipe: {
    trigger: '"Find the node voltages" AND the circuit contains a diamond-shaped source labeled 2iₓ / 0.25vₓ / k·vₓ / k·iₓ.',
    steps: [
      'Ground the best node; name the unknowns $v_1, v_2, \\dots$ as always.',
      'Write KCL at each unknown node, leaving the dependent source\'s SYMBOL in place.',
      'Find the controlling variable: express $i_x$ or $v_x$ in terms of node voltages (Ohm\'s law or a node difference).',
      'Substitute the control into ALL equations where it appears (including inside the puppet value).',
      'Solve the linear system (elimination/Cramer).',
      'SANITY: re-substitute every value into every original equation — including the puppet: its value must equal k × control.',
    ],
    check: 'Here: $i_x = 1.2$ A → puppet $= 2.4$ A → node 3 closes $1.8 + 0.6 = 2.4$ ✓.',
  },
  traps: [
    'KILLING a dependent source (shorting/opening it) — the classic fatal error. Only INDEPENDENT sources ever get killed (that rule arrives in CU 4.7/4.9).',
    'Forgetting to re-express the control EACH time — in CU 4.7 superposition, the control value changes per pass ($5i_o\'$ vs $5i_o\'\'$).',
    '$v_3 = -2.4$ V below ground is legal — do not "fix" it by flipping signs afterward.',
    'The puppet\'s current still obeys KCL at its node — it is a branch like any other, just self-steering.',
  ],
  summaryTable: {
    title: 'Three-Node Puppet Example — Whole Solution on One Card',
    headers: ['Node', 'KCL sentence', 'Boxed equation'],
    rows: [
      ['1', '$3 = \\frac{v_1-v_3}{4} + \\frac{v_1-v_2}{2}$', '$3v_1 - 2v_2 - v_3 = 12$'],
      ['2', '$\\frac{v_1-v_2}{2} = \\frac{v_2-v_3}{8} + \\frac{v_2}{4}$', '$-4v_1 + 7v_2 - v_3 = 0$'],
      ['3', '$\\frac{v_1-v_3}{4}+\\frac{v_2-v_3}{8} = 2i_x = v_1 - v_2$', '$2v_1 - 3v_2 + v_3 = 0$'],
      ['Solution', '$v_1 = 4.8$ V, $v_2 = 2.4$ V, $v_3 = -2.4$ V', '$i_x = 1.2$ A → $2i_x = 2.4$ A ✓'],
    ],
  },
  recall: [
    { q: 'Does a dependent source add an unknown?', a: 'No — it adds a constraint. Replace its control with node voltages.' },
    { q: 'The puppet rule in one line?', a: 'المصدر التابع دمية: بدّل المتحكم، مش تعمل مصدر جديد. (Puppet: substitute the controller, never invent a new source.)' },
    { q: 'This example\'s answers?', a: '$v_1 = 4.8$ V, $v_2 = 2.4$ V, $v_3 = -2.4$ V, $i_x = 1.2$ A.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.6 — Mesh analysis (pages 19-23)
// ===========================================================================

const meshAnalysis: Topic = {
  id: 'el4-mesh-analysis',
  lessonId: L4,
  cuCode: 'CU 4.6',
  title: 'Mesh Analysis — One Current per Window',
  quick:
    'الزتونة: paint a CLOCKWISE current inside every window (mesh) of the circuit. Write KVL once per window. A resistor shared by two windows carries the DIFFERENCE $(i_1 - i_2)$. Solve for the window currents; any real branch current = the difference of the windows touching it. Slide 22 finishes in 4 lines: $i_1 = i_2 = 1$ A, center branch $I_3 = 0$.',
  sourcePages: [19, 20, 21, 22, 23],
  prerequisites: ['CU 4.1', 'CU 4.3'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — Two Neighbor Water Wheels',
      markdown: md([
        'Picture two water wheels turning clockwise in neighboring windows of a mill (slides 19-20 draw exactly two windows). Each wheel has its own push, $i_1$ and $i_2$.',
        '',
        'The SHARED wall between the two wheels feels both pushes — but only their DIFFERENCE: if both wheels turn equally, the wall feels nothing at all ($i_1 - i_2 = 0$). If the left wheel turns harder, the wall is dragged left.',
        '',
        'That wall is the shared resistor: its current is $i_1 - i_2$ (or $i_2 - i_1$), never the sum.',
        '',
        'افتكر دي: العجلتين المتجاورتين — الحائط المشترك يحس بالفرق مش بالمجموع. (Neighbor wheels: the shared wall feels the DIFFERENCE, not the sum.)',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Rebuild the Two-Window Example From Zero (pages 21-22)',
      markdown: md([
        '**Understand the figure (slide 21).** Two windows side by side:',
        '',
        '- Left window: a **15-V source** (+ at top) on the left side, a **5-Ω** resistor along the top, the **shared 10-Ω** resistor in the middle, and a **10-V source** (+ at top) in the bottom wire.',
        '- Right window: the shared 10-Ω, a **6-Ω** on top, and a **4-Ω** on the right.',
        '',
        '```',
        '   ┌──[ 5 Ω ]──┬──[ 6 Ω ]──┐',
        '   │    i₁ ↻   │    i₂ ↻   │',
        '[15 V]      [10 Ω]       [4 Ω]',
        '   │ +        │            │',
        '   └─[10 V]───┴────────────┘',
        '        +',
        '```',
        '',
        'Anatomy check: 6 branches, 5 nodes → $6 - 5 + 1 = 2$ windows → 2 unknowns $i_1, i_2$. (verified: E4.1.5)',
        '',
        '**Step 1 — assume both mesh currents CLOCKWISE** (the class habit; makes shared-resistor signs systematic).',
        '',
        '**Step 2 — KVL around window 1 (walk clockwise, rises = drops):**',
        '',
        'The 15-V source is met at its − terminal first → a rise of 15 V. The 5-Ω drop: $+5i_1$. The shared 10-Ω carries $i_1 - i_2$ downward → drop $10(i_1 - i_2)$. The 10-V source is met at − first → rise of 10 V:',
        '',
        '$$-15 + 5i_1 + 10(i_1 - i_2) + 10 = 0 \\;\\;\\Longrightarrow\\;\\; 15i_1 - 10i_2 = 5 \\;\\;\\Longrightarrow\\;\\; \\boxed{\\,3i_1 - 2i_2 = 1\\,}$$ (verified: E4.6.1)',
        '',
        '**Step 3 — KVL around window 2:** the 6-Ω and 4-Ω drops are $6i_2$ and $4i_2$; the shared 10-Ω now carries $i_2 - i_1$ (same branch, walked from the other side): drop $10(i_2 - i_1)$; the 10-V source is met at its + terminal first → a DROP of 10 V:',
        '',
        '$$6i_2 + 4i_2 + 10(i_2 - i_1) - 10 = 0 \\;\\;\\Longrightarrow\\;\\; 20i_2 - 10i_1 = 10 \\;\\;\\Longrightarrow\\;\\; \\boxed{\\,i_1 = 2i_2 - 1\\,}$$ (verified: E4.6.2)',
        '',
        '**Step 4 — substitute (slide 22):** put $i_1 = 2i_2 - 1$ into the first box:',
        '',
        '$$3(2i_2 - 1) - 2i_2 = 1 \\;\\Longrightarrow\\; 6i_2 - 3 - 2i_2 = 1 \\;\\Longrightarrow\\; 4i_2 = 4 \\;\\Longrightarrow\\; i_2 = 1 \\text{ A}$$',
        '',
        'then $i_1 = 2(1) - 1 = 1$ A. Both mesh currents are **1 A**. (verified: E4.6.3)',
        '',
        '**Step 5 — real branch currents (the point of the method):**',
        '',
        '- $I_1$ (through 5-Ω) $= i_1 = 1$ A. $I_2$ (through 6-Ω) $= i_2 = 1$ A.',
        '- $I_3$ (through the shared 10-Ω) $= i_1 - i_2 = 1 - 1 = \\mathbf{0}$ A. (verified: E4.6.4)',
        '',
        '**Step 6 — SANITY CHECK (re-walk both windows with the numbers):**',
        '',
        '- Window 1: $-15 + 5(1) + 10(0) + 10 = 0$ ✓',
        '- Window 2: $6(1) + 4(1) + 10(0) - 10 = 0$ ✓ (verified: E4.6.5)',
        '',
        'The shared branch genuinely carries NO current even though both windows spin — the two pushes cancel exactly at the wall. (The legacy example-3 note said it best: "the center branch has no current even though both outer mesh currents are nonzero.")',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The General Two-Mesh Pattern',
      markdown: md([
        'Slides 19-20 print the general circuit ($V_1$, $R_1$, shared $R_3$, $R_2$, $V_2$) and its equations:',
        '',
        '$$-V_1 + R_1 i_1 + R_3(i_1 - i_2) = 0 \\;\\Longrightarrow\\; (R_1 + R_3)i_1 - R_3 i_2 = V_1$$',
        '',
        '$$R_2 i_2 + V_2 + R_3(i_2 - i_1) = 0 \\;\\Longrightarrow\\; -R_3 i_1 + (R_2 + R_3)i_2 = -V_2$$',
        '',
        'The pattern to memorize:',
        '',
        '1. **Own window:** sum of its resistors × own current, on the left with +.',
        '2. **Shared resistor:** −(shared R) × neighbor current, on the left.',
        '3. **Right side:** the sources your window traverses as rises, with signs.',
        '4. Slide 19\'s definition earns the method its name: "nodal analysis applies KCL to find unknown voltages … mesh analysis applies KVL to find unknown currents" — and a mesh is "a loop which does not contain any other loops within it."',
      ]),
    },
  ],
  methods: [
    {
      question: 'Mesh or node analysis for this circuit?',
      collegeMethod:
        'Count windows vs (nodes − 1), check source types (voltage-source-heavy → mesh; current-source-heavy → node), then commit and solve the smaller system with full bookkeeping.',
      fastMethod:
        'Two windows with voltage sources everywhere → mesh wins before counting ends. A current source sitting on the OUTER edge makes it even faster: that mesh current IS the source value.',
    },
    {
      question: 'A current source lies INSIDE one mesh only — do I still write KVL there?',
      collegeMethod:
        'No: KVL across a current source has no fixed voltage rule. Instead, note that the mesh current is fixed by the source: if the source value is 2 A and lies wholly in mesh 2 (arrow agreeing with the mesh direction), then $i_2 = 2$ A — an equation for free.',
      fastMethod:
        'Free-variable trick: current source wholly inside a window → that window current = ± the source value on sight. Current source SHARED between two windows → "supermesh": write one KVL around the outer ring of both windows plus the constraint $i_a - i_b = I_{source}$.',
    },
  ],
  recipe: {
    trigger: '"Find the mesh currents", "find I₁, I₂", a planar circuit full of voltage sources, or windows < nodes − 1.',
    steps: [
      'Count windows (= unknowns). Paint a CLOCKWISE current in each: $i_1, i_2, \\dots$',
      'Per window, walk KVL clockwise; write each resistor drop with the CURRENT THROUGH IT: own window $Ri_k$, shared resistor $R(i_k - i_j)$.',
      'Sources: meet − first → +V; meet + first → −V. (CU 4.3\'s rule, unchanged.)',
      'Collect terms: own-resistor sum on the diagonal, −(shared R) off-diagonal, sources right.',
      'Solve (substitution for 2 unknowns; Cramer/elimination for 3).',
      'Branch currents: outer branches = their window current; shared = difference.',
      'SANITY: re-walk one full window with numbers — must sum to 0.',
    ],
    check: 'Slide-22 drill: $-15+5(1)+10(0)+10 = 0$ and $6(1)+4(1)+10(0)-10 = 0$. If a window fails, a shared-resistor sign is flipped.',
  },
  traps: [
    'Writing the shared resistor as $i_1 + i_2$ — it is ALWAYS a difference (the two mesh currents push opposite ways through it).',
    'Mesh current ≠ branch current: the 10-Ω carries $i_1 - i_2$, and here that is 0 A even with both wheels spinning.',
    'Mixing walk directions (one clockwise, one counter-clockwise) destroys the systematic signs — keep ALL clockwise.',
    'The 10-V source appears in BOTH window equations with opposite signs (it is met at − first in window 1, at + first in window 2) — that is correct, not a typo.',
    'KVL across a current source: do not write it; use the free-known trick or the supermesh instead.',
  ],
  summaryTable: {
    title: 'Mesh Example on One Card',
    headers: ['Window', 'KVL collected', 'Simplified'],
    rows: [
      ['1', '$-15 + 5i_1 + 10(i_1-i_2) + 10 = 0$', '$3i_1 - 2i_2 = 1$'],
      ['2', '$6i_2 + 4i_2 + 10(i_2-i_1) - 10 = 0$', '$i_1 = 2i_2 - 1$'],
      ['Solution', 'substitute → $4i_2 = 4$', '$i_1 = i_2 = 1$ A'],
      ['Branch currents', '$I_1 = 1$ A, $I_2 = 1$ A, $I_3 = i_1 - i_2$', '$I_3 = 0$ A'],
    ],
  },
  recall: [
    { q: 'What does a shared resistor carry?', a: 'The DIFFERENCE $i_1 - i_2$ — never the sum. (الحائط المشترك يحس بالفرق)' },
    { q: 'Mesh definition?', a: 'A loop with no other loops inside — a window pane (شُبّاك).' },
    { q: 'This example\'s answer?', a: '$i_1 = i_2 = 1$ A and the center branch carries 0 A.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.7 — Superposition theorem (pages 26-37)
// ===========================================================================

const superposition: Topic = {
  id: 'el4-superposition',
  lessonId: L4,
  cuCode: 'CU 4.7',
  title: 'Superposition — One Source at a Time',
  quick:
    'الزتونة: circuit with 2+ sources? Solve N small circuits instead of one big one. Each pass: keep ONE independent source ALIVE and KILL the others — voltage source → SHORT (a wire), current source → OPEN (a break). Add the pass answers algebraically. Dependent sources are NEVER killed; they just re-read their control each pass. Slide 31 finishes: $v = v_1 + v_2 = 2 + 8 = 10$ V.',
  sourcePages: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
  prerequisites: ['CU 4.2', 'CU 4.3'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — Three Friends and a Cart',
      markdown: md([
        'Three friends push a shopping cart from different sides. How fast does it move? Two honest ways to answer:',
        '',
        '- **Big way:** one giant equation with all three pushes tangled together.',
        '- **Superposition:** let each friend push ALONE and write down the cart\'s speed; then add the three speeds.',
        '',
        'Why is adding legal? Because the circuit is LINEAR — slide 26 prints it: "the idea of superposition rests on the linearity property." Double a push and the cart doubles; that is all linearity asks. That is why the theorem works for voltages and currents but NOT for power (power grows with the SQUARE — see the trap below).',
        '',
        'And what does "friend off duty" mean physically? Slide 27: replace a voltage source with 0 V (a SHORT — plain wire) and a current source with 0 A (an OPEN — cut the branch).',
        '',
        'افتكر دي: صديق واحد يدفع في كل مرة. (One friend pushes per round.)',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Rebuild Both Examples From Zero (pages 28-31, 33-37)',
      markdown: md([
        '**Example 1 — "Use the superposition theorem to find v" (slides 28-31).**',
        '',
        'The circuit: a **6-V source** (+ top) in series with an **8-Ω** resistor, feeding a node; from that node to the bottom rail: a **4-Ω** resistor ($v$ is across it, + at top) IN PARALLEL with a **3-A source** (arrow up).',
        '',
        '```',
        '   +6 V ──[ 8 Ω ]──●────┐',
        '     │            │     │',
        '     │          [4 Ω]  (3 A ↑)',
        '     │            │ v   │',
        '   ══╩════════════╩═════╧══  bottom rail',
        '```',
        '',
        'Two sources ⇒ two passes: $v = v_1 + v_2$ (slide 29).',
        '',
        '**Pass 1 — only the 6-V source; kill the 3-A source (OPEN it).** One single loop remains: 8 + 4 = 12 Ω. KVL (slide 29):',
        '',
        '$$12i_1 - 6 = 0 \\;\\Longrightarrow\\; i_1 = 0.5 \\text{ A} \\;\\Longrightarrow\\; v_1 = 4i_1 = 2 \\text{ V}$$ (verified: E4.7.1, E4.7.2)',
        '',
        'Cross-check by voltage division (slide 30 shows BOTH roads): $v_1 = \\frac{4}{4+8}(6) = 2$ V ✓.',
        '',
        '**Pass 2 — only the 3-A source; kill the 6-V source (SHORT it).** Now the 3 A splits between the 4-Ω (down) and the 8-Ω (left, looping through the short). Current division (slide 31):',
        '',
        '$$i_3 = \\frac{8}{4+8}(3) = 2 \\text{ A} \\;\\Longrightarrow\\; v_2 = 4i_3 = 8 \\text{ V}$$ (verified: E4.7.3)',
        '',
        '**Total:** $v = v_1 + v_2 = 2 + 8 = \\mathbf{10\\ \\text{V}}$ (verified: E4.7.4).',
        '',
        'SANITY: total current through the 4-Ω = $10/4 = 2.5$ A = $0.5 + 2$ ✓ — the pass answers add like the theorem promised.',
        '',
        'POWER WARNING (the exam trap): on the 4-Ω, true power $= (2.5)^2 \\cdot 4 = 25$ W. Sum of pass powers $= (0.5)^2\\cdot4 + (2)^2\\cdot4 = 1 + 16 = 17$ W ≠ 25 W. **Power does not superpose** — it is quadratic. (verified: E4.7.5)',
        '',
        '**Example 2 — dependent source present: "Find $i_o$" (slides 33-37).** Circuit: **4-A** source (up) on the far left; **3-Ω** top-left; **2-Ω** top; **1-Ω** middle; a dependent V-source $5i_o$ (+ left) in series with the 1-Ω; **5-Ω** bottom-left with $i_o$ marked DOWN it; **4-Ω** right; **20-V** source (+ left) in the bottom branch.',
        '',
        '$$i_o = i_o\' + i_o\'\'$$ (pass 1: 4-A source; pass 2: 20-V source) — and the PUPPET $5i_o$ stays ALIVE in both passes, re-reading its control each time.',
        '',
        '**Pass 1 (kill the 20-V: short it).** Mesh bookkeeping (slides 35-36) forces loop 1: $i_1 = 4$ A, and node 0 gives $i_3 = 4 - i_o\'$. Eliminating $i_2$ and $i_3$ from the three printed loop equations leaves the slide-36 boxed pair:',
        '',
        '$$\\begin{cases} 3i_2 - 2i_o\' &= 8 \\\\ i_2 + 5i_o\' &= 20 \\end{cases}$$',
        '',
        'Solve: from the second, $i_2 = 20 - 5i_o\'$; substitute into the first: $3(20 - 5x) = 8 + 2x$ → $60 - 15x = 8 + 2x$ → $52 = 17x$:',
        '',
        '$$i_o\' = \\frac{52}{17} \\approx 3.059 \\text{ A}$$ (verified: E4.7.6)',
        '',
        '**Pass 2 (kill the 4-A: open it).** Slides 37: loops 4 and 5 with $i_5 = -i_o\'\'$ give',
        '',
        '$$\\begin{cases} 6i_4 - 4i_o\'\' &= 0 \\\\ i_4 + 5i_o\'\' &= -20 \\end{cases}$$',
        '',
        'From the first: $i_4 = \\tfrac{2}{3}i_o\'\'$. Substitute: $\\tfrac{2}{3}x + 5x = -20$ → $\\tfrac{17}{3}x = -20$ →',
        '',
        '$$i_o\'\' = -\\frac{60}{17} \\approx -3.529 \\text{ A}$$ (verified: E4.7.7)',
        '',
        '**Total:**',
        '',
        '$$i_o = \\frac{52}{17} - \\frac{60}{17} = -\\frac{8}{17} \\approx -0.471 \\text{ A}$$ (verified: E4.7.8)',
        '',
        'The negative sign is the answer speaking: $i_o$ really flows UP, against the drawn arrow — two almost-equal pushes canceling. (The slide prints $i_o = -8/17 = -0.4706$ A.)',
        '',
        'SANITY: $\\frac{52}{17} + \\left(-\\frac{60}{17}\\right) = -\\frac{8}{17}$ ✓, and pass magnitudes are near-equal (3.06 vs 3.53) — so a small negative total is plausible, not an error.',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Theorem and the 3-Step Procedure (slide 32)',
      markdown: md([
        'Slide 26 statement: "In a network with two or more sources, the current or voltage for any component is the algebraic sum of the effects produced by each source acting separately."',
        '',
        'Slide 32 prints the procedure verbatim:',
        '',
        '1. Turn off all independent sources except ONE. Find the output (voltage or current) due to that active source.',
        '2. Repeat step 1 for each of the other independent sources.',
        '3. Find the total contribution by adding ALGEBRAICALLY all the contributions.',
        '',
        'The fine print that separates full marks from zero:',
        '',
        '- "Turn off" means: voltage source → 0 V = **short circuit**; current source → 0 A = **open circuit** (slide 27). Resistors are never "off".',
        '- **Dependent sources are never turned off** — their control variable simply gets re-derived in each pass (here: $5i_o\'$ in pass 1, $5i_o\'\'$ in pass 2).',
        '- Superposition applies to currents and voltages (linear quantities) — NOT to power.',
        '- The theorem rests on **linearity** (slide 26): it is the reason adding pass-results is legal at all.',
      ]),
    },
  ],
  methods: [
    {
      question: 'Two sources, one target quantity — which pass do I run first?',
      collegeMethod:
        'It does not matter mathematically; run all passes in source order and add. Each pass is a small circuit solved with KVL/KCL or divider rules.',
      fastMethod:
        'Start with the source that leaves the SIMPLEST circuit (a single loop or single node pair). You get one contribution fast, and the method\'s rhythm before the messier pass.',
    },
    {
      question: 'The final answer is negative — did I kill a source wrongly?',
      collegeMethod:
        'Maybe, maybe not. Re-run both passes and re-add. If the passes are individually correct, a negative total just means the drawn arrow was optimistic (example 2: $-8/17$ A).',
      fastMethod:
        'Check magnitudes: if the two contributions nearly cancel (3.059 and −3.529), the small negative total is exactly what linearity predicts. Flip the arrow and report |value| with the correct direction.',
    },
  ],
  recipe: {
    trigger: '"Using superposition, find v/i", or any circuit with 2+ INDEPENDENT sources — especially when one source at a time makes the circuit trivially simpler.',
    steps: [
      'Count independent sources = number of passes. Declare $v = v_1 + v_2 + \\dots$ (or $i$).',
      'Pass k: keep ONE independent source; kill the others: V-source → short, I-source → open.',
      'Leave dependent sources ALIVE; re-derive their control variable in THIS pass\'s circuit.',
      'Solve the small circuit (divider rules usually suffice). Record the contribution WITH its sign.',
      'Repeat for every independent source.',
      'Add all contributions algebraically. SANITY: check near-cancellation stories, and re-derive one pass by a second method (divider vs Ohm).',
    ],
    check: 'Example 1: $v = 2 + 8 = 10$ V, and the 4-Ω total current $2.5 = 0.5 + 2$ closes the story. Power check reminder: 25 W ≠ 1 + 16 — never superpose power.',
  },
  traps: [
    'Killing a DEPENDENT source — forbidden. It is not independent; it follows its control ($5i_o$ stays alive in both passes).',
    'Wrong kill: voltage source must become a SHORT (wire), current source an OPEN (cut) — never swapped.',
    'Superposing power: forbidden — power is quadratic (25 W vs 1+16 = 17 W in example 1).',
    'Forgetting the pass-prime on the control: in pass 1 the puppet reads $5i_o\'$; in pass 2 it reads $5i_o\'\'$ — different values, same rule.',
    'Adding magnitudes instead of signed values: example 2 gives $+52/17$ and $-60/17$; the sum is $-8/17$, not $112/17$.',
  ],
  summaryTable: {
    title: 'Superposition — Both Examples on One Card',
    headers: ['Pass', 'Alive', 'Killed as', 'Key line', 'Contribution'],
    rows: [
      ['Ex 1, pass 1', '6-V source', '3 A → open', '$12i_1 - 6 = 0$', '$v_1 = 2$ V'],
      ['Ex 1, pass 2', '3-A source', '6 V → short', '$i_3 = \\frac{8}{12}(3) = 2$ A', '$v_2 = 8$ V'],
      ['Ex 1 total', '—', '—', '$v = v_1 + v_2$', '$v = 10$ V'],
      ['Ex 2, pass 1', '4-A source', '20 V → short', '$3(20-5x) = 8+2x$', '$i_o\' = 52/17$ A'],
      ['Ex 2, pass 2', '20-V source', '4 A → open', '$\\tfrac{2}{3}x + 5x = -20$', '$i_o\'\' = -60/17$ A'],
      ['Ex 2 total', '—', '—', '$i_o = i_o\'+i_o\'\'$', '$i_o = -8/17 \\approx -0.471$ A'],
    ],
  },
  recall: [
    { q: 'Kill rules in one breath?', a: 'Voltage source → short (wire); current source → open (cut). (الفولت سلك، التيار قطع)' },
    { q: 'Do dependent sources get killed?', a: 'NEVER. They stay alive and re-read their control every pass.' },
    { q: 'Does power superpose?', a: 'No — quadratic. 25 W ≠ 1 W + 16 W.' },
    { q: 'Example-2 final answer?', a: '$i_o = -8/17 \\approx -0.471$ A — flows opposite the drawn arrow.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.8 — Source transformation (pages 38-46)
// ===========================================================================

const sourceTransformation: Topic = {
  id: 'el4-source-transformation',
  lessonId: L4,
  cuCode: 'CU 4.8',
  title: 'Source Transformation — Same R, Other Shape',
  quick:
    'الزتونة: a voltage source $v_s$ in SERIES with $R$ ⇄ a current source $i_s$ in PARALLEL with the SAME $R$: $v_s = i_s R$ and $i_s = v_s/R$. The current-source arrow points toward the old + terminal. Use it to FOLD parts of a circuit (parallel merges, series merges) until one loop or one node remains — then solve in one line.',
  sourcePages: [38, 39, 40, 41, 42, 43, 44, 45, 46],
  prerequisites: ['CU 4.2'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Same Pump, Two Stories',
      markdown: md([
        'Slide 38 draws the equivalence with two boxes and a double arrow. Think of one water pump described two ways:',
        '',
        '- **Series story (voltage source + R):** "I guarantee 12 V of pressure, but friction (R) eats some as you draw water."',
        '- **Parallel story (current source ∥ R):** "I guarantee 3 A of flow, and R is a leak path that also lets water circle."',
        '',
        'Same pump, same pipes — a customer at terminals a-b cannot tell which story you used. Slide 38 prints the contract: $v_s = i_s R$ (or $i_s = v_s / R$).',
        '',
        'The one number that NEVER changes between the two stories: **R itself**. And the one direction that must be preserved: the current arrow points INTO the + terminal (a 3-A source with − at top transformed to 12 V with − at top — watch it happen in the worked example).',
        '',
        'افتكر دي: نفس المضخة بحكايتين — نفس R، بس الشكل اتغير. (Same pump, two stories: same R, different shape.)',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Rebuild Both Examples From Zero (pages 39-42 and 43-46)',
      markdown: md([
        '**Example 1 — "Use source transformation to find $v_o$" (slides 39-42).**',
        '',
        'The circuit: a **3-A source (arrow DOWN)** in parallel with a **4-Ω**; then a **2-Ω** in series along the top; then a node where an **8-Ω** (with $v_o$ across it, + top) hangs down, in parallel with a **3-Ω in series with a 12-V source (+ top)**.',
        '',
        '```',
        '  ┌─[3A ↓]─┬─[2Ω]─●──────┬──────┐',
        '  │        │      │      │      │',
        ' [4Ω]      │    [8Ω]   [3Ω]  [12V]',
        '  │        │    (vₒ)    │    (+ top)',
        '  └────────┴──────┴──────┴──────┘',
        '```',
        '',
        '**Step 1 — transform the LEFT pair (slides 40):** 3 A ∥ 4-Ω → voltage source $v_s = i_s R = 3 \\cdot 4 = 12$ V in series with the 4-Ω. Arrow DOWN ⇒ the + terminal is at the BOTTOM, so the slide prints "12 V with the negative at the top". Series now: 4 + 2 = **6-Ω** in series with that 12-V. (verified: E4.8.1)',
        '',
        '**Step 2 — transform the RIGHT pair (slide 40 bottom):** 12-V (+ top) in series with 3-Ω → $i_s = 12/3 = 4$ A (arrow UP, toward the old +) in parallel with 3-Ω. (verified: E4.8.1)',
        '',
        '**Step 3 — transform the LEFT block AGAIN (slide 41):** 12-V (− top) in series with 6-Ω → $i_s = 12/6 = 2$ A, arrow DOWN (away from the old + which was at the bottom), in parallel with 6-Ω.',
        '',
        '**Step 4 — merge the parallel sources (slide 41 bottom):** 4 A up and 2 A down at the same node ⇒ net $4 - 2 = 2$ A UP, in parallel with $6 \\parallel 3 = 2$ Ω and the 8-Ω.',
        '',
        '**Step 5 — slide 42\'s final cut:** keep the 8-Ω on one side; combine $6\\parallel3 = 2$ Ω with the net 2-A source. Current division into the 8-Ω branch:',
        '',
        '$$i = \\frac{2}{2+8}(2) = 0.4 \\text{ A} \\;\\Longrightarrow\\; v_o = 8i = 8(0.4) = \\mathbf{3.2\\ \\text{V}}$$ (verified: E4.8.2)',
        '',
        'SANITY (independent road): net 2 A INTO the parallel set $6\\parallel8\\parallel3 = 1.6$ Ω → $v_o = 2 \\times 1.6 = 3.2$ V ✓. (verified: E4.8.3)',
        '',
        '**Example 2 — dependent source: "Use source transformation to find $v_x$" (slides 43-46).**',
        '',
        'The circuit (200-dpi re-verified): **6-V source (+ top)** in series with a **2-Ω** to the central node; a **2-Ω** from the central node DOWN to ground with $v_x$ across it (+ top); a **4-Ω** from the central node rightward; a dependent current source $0.25v_x$ (arrow LEFT, INTO the central node) in parallel with that 4-Ω; and an **18-V source (+ top)** on the far right to ground.',
        '',
        '**Step 1 (slide 44) — left pair:** 6-V + 2-Ω → $i_s = 6/2 = 3$ A (up) ∥ 2-Ω; the 2-Ω with $v_x$ hangs on the same two nodes ⇒ now THREE parallel items at the left node: 3-A source, 2-Ω, 2-Ω.',
        '',
        '**Step 2 (slide 44) — right pair, the puppet:** $0.25v_x$ ∥ 4-Ω → voltage source $v_s = (0.25v_x)(4) = v_x$ volts (+ toward the central node) in series with 4-Ω. The control SURVIVES this transformation — the value is still exactly $v_x$. (verified: E4.8.4)',
        '',
        '**Step 3 (slide 45) — shrink the left:** $2\\parallel2 = 1$ Ω; so 3-A ∥ 1-Ω → back to a voltage source $3 \\cdot 1 = 3$ V (+ top) in series with 1-Ω. (verified: E4.8.5)',
        '',
        '**Step 4 (slide 45-46) — ONE loop remains:** 3-V source, 1-Ω, the $v_x$ node, 4-Ω, the dependent source $v_x$ (+ left), and the 18-V source (+ top). KVL clockwise:',
        '',
        '$$-3 + 5i + v_x + 18 = 0$$',
        '',
        '(5i = the 1-Ω and 4-Ω drops; $v_x$ = drop across the puppet met at + first; 18 = rise met at − first.)',
        '',
        'The inner loop (3-V, 1-Ω only) gives the control equation:',
        '',
        '$$-3 + 1i + v_x = 0 \\;\\Longrightarrow\\; v_x = 3 - i$$',
        '',
        'Substitute into the big loop:',
        '',
        '$$-3 + 5i + (3-i) + 18 = 0 \\;\\Longrightarrow\\; 18 + 4i = 0 \\;\\Longrightarrow\\; i = -4.5 \\text{ A}$$ (verified: E4.8.6)',
        '',
        'and therefore $v_x = 3 - (-4.5) = \\mathbf{7.5\\ \\text{V}}$ — the slide stops one line earlier, at $i = -4.5$ A; this last line is the finish (flagged honestly as derived). (verified: E4.8.7)',
        '',
        'SANITY (independent road — the original circuit, no transformations): KCL at the $v_x$ node, using $v_B = 18$ V on the right:',
        '',
        '$$\\frac{6 - v_x}{2} + 0.25v_x = \\frac{v_x}{2} + \\frac{v_x - 18}{4}$$',
        '',
        '×4: $2(6 - v_x) + v_x = 2v_x + (v_x - 18)$ → $12 - 2v_x + v_x = 3v_x - 18$ → $30 = 4v_x$ → $v_x = 7.5$ V ✓✓. (verified: E4.8.8)',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Contract and Its Limits',
      markdown: md([
        'Slide 38 prints the equivalence contract:',
        '',
        '$$v_s = i_s R \\quad \\text{or} \\quad i_s = \\frac{v_s}{R}$$',
        '',
        'Three formal clauses that make or break the proof:',
        '',
        '1. **Same R both shapes** — the resistance is a passenger, not a participant in the arithmetic. It never gets doubled or halved by the transformation itself.',
        '2. **Equivalence is at the TERMINALS only.** Inside the box, the two shapes have different currents through R (that is the price of the trick). Never use a transformed block to answer a question about an INTERNAL current.',
        '3. **Dependent sources may be transformed only if their control variable survives.** Here $(0.25v_x)(4) = v_x$ survives beautifully; in general, if the transformation would swallow the controlling node/current, STOP and use another method.',
      ]),
    },
  ],
  methods: [
    {
      question: 'Which side should I transform — toward voltage sources or toward current sources?',
      collegeMethod:
        'Transform toward the shape that reduces MORE: parallel current sources merge by addition; series voltage sources merge by addition. Redraw after every step and re-label terminals a-b.',
      fastMethod:
        'Series chain with a battery → convert it to a current source and MERGE everything in parallel at the target node. Then one final division/Ohm step ends the problem (the $v_o$ example: three transformations, one current division, done).',
    },
    {
      question: 'The arrow direction confuses me every time — is there a rule?',
      collegeMethod:
        'Write the terminal voltages before transforming: the + terminal is fixed in space. In the current-source shape, the arrow must push current TOWARD that + terminal (through the external circuit direction).',
      fastMethod:
        'افتكر دي: السهم داخل على الزائد. (The arrow enters at the +.) In example 1: 3-A arrow DOWN ⇒ + at the BOTTOM ⇒ transformed 12-V has − at the top, exactly as slide 40 prints.',
    },
  ],
  recipe: {
    trigger: '"Using source transformation, find v/i", or a chain of (source + R) blocks you want to fold into one loop / one node.',
    steps: [
      'Spot a pair: a source WITH its own series/parallel R (v_s + R in series, or i_s ∥ R).',
      'Apply the contract: $i_s = v_s/R$ or $v_s = i_s \\cdot R$ — R unchanged; arrow toward the old + terminal.',
      'After each step: merge whatever became parallel (current sources add; resistances combine) or series (voltage sources add; resistances combine).',
      'Keep the load and the target variable OUTSIDE the transformations.',
      'When one loop or one node-pair remains, finish with KVL or Ohm/divider.',
      'SANITY: re-solve with one untouched method (node KCL) — both roads must agree (the 7.5-V check).',
    ],
    check: 'Example 1: every conversion must keep R identical (4, 6→2 after merge, 3) and the final $v_o = 3.2$ V must survive the independent node check.',
  },
  traps: [
    'Changing R during the transformation — R is the SAME resistor in both shapes; only its CONNECTION (series vs parallel) changes.',
    'Arrow direction flipped: the current-source arrow must point toward the old + terminal (example 1 prints 12-V with − at top precisely for this reason).',
    'Reading INTERNAL currents after a transformation — equivalence holds at the terminals only.',
    'Transforming a dependent source whose control would disappear — check that the control survives (here $0.25v_x$ with 4-Ω → exactly $v_x$).',
    'Merging sources without signs: 4-A up and 2-A down at the same node give net 2-A UP, not 6-A.',
  ],
  summaryTable: {
    title: 'Source Transformation — Contract and Worked Results',
    headers: ['Object', 'Transformed to', 'Key numbers'],
    rows: [
      ['3 A ∥ 4-Ω', '12-V (− top) + 4-Ω series', '$v_s = i_s R = 3 \\cdot 4$'],
      ['12-V + 6-Ω', '2 A (down) ∥ 6-Ω', '$i_s = 12/6$'],
      ['12-V + 3-Ω', '4 A (up) ∥ 3-Ω', '$i_s = 12/3$'],
      ['Net at node', '2 A up ∥ (6∥3‖8)', '$4 - 2 = 2$; $v_o = 2(1.6) = 3.2$ V'],
      ['$0.25v_x$ ∥ 4-Ω', '$v_x$-volt source + 4-Ω series', '$(0.25v_x)(4) = v_x$'],
      ['Final loop', 'KVL: $-3+5i+v_x+18 = 0$, $v_x = 3-i$', '$i = -4.5$ A → $v_x = 7.5$ V'],
    ],
  },
  recall: [
    { q: 'The contract?', a: '$v_s = i_s R$; $i_s = v_s/R$; SAME R both shapes.' },
    { q: 'Arrow rule?', a: 'The current arrow enters at the old + terminal. (السهم داخل على الزائد)' },
    { q: 'The two worked answers?', a: '$v_o = 3.2$ V; $v_x = 7.5$ V (slide stops at $i = -4.5$ A).' },
    { q: 'May I transform dependent sources?', a: 'Only if the control survives the transformation.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// CU 4.9 — Thévenin's theorem (pages 47-57)
// ===========================================================================

const thevenin: Topic = {
  id: 'el4-thevenin',
  lessonId: L4,
  cuCode: 'CU 4.9',
  title: "Thévenin's Theorem — The Whole Network Is One Battery",
  quick:
    'الزتونة: ANY linear two-terminal network behaves EXACTLY like ONE battery $V_{Th}$ in series with ONE resistor $R_{Th}$. To find them: $V_{Th}$ = voltage across the terminals with the load REMOVED (open); $R_{Th}$ = resistance seen from the terminals with independent sources KILLED (V→short, I→open; dependent stay). Then ANY load: $I_L = \\frac{V_{Th}}{R_{Th}+R_L}$. Solve ONCE, swap loads forever.',
  sourcePages: [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
  prerequisites: ['CU 4.6', 'CU 4.7'],
  doors: [
    {
      kind: 'analogy',
      title: 'Door 1 — The Wall Socket',
      markdown: md([
        'A wall socket hides an entire power network behind it. What does your lamp actually see? Not the network — it sees "one ideal push + one internal resistance". That is Thévenin\'s promise (slide 47): **a linear two-terminal circuit can be replaced by a voltage source $V_{Th}$ in series with a resistor $R_{Th}$.**',
        '',
        'You plug a lamp, a charger, a heater — different $R_L$ each time — but the socket\'s own story ($V_{Th}, R_{Th}$) NEVER changes. That is why the theorem pays rent: compute the network ONCE, answer every load question in one division.',
        '',
        'What are the two magic measurements? Slide 49 prints them as pictures:',
        '',
        '- **$V_{Th} = v_{oc}$** — the OPEN-circuit voltage at the terminals (nobody is drawing current).',
        '- **$R_{Th} = R_{in}$** — the resistance looking INTO the terminals with all independent sources set to zero.',
        '',
        'افتكر دي: افتح، اقفل، اقسم — open the load for $V_{Th}$, kill the sources for $R_{Th}$, divide for $I_L$. (Open, switch off, divide.)',
      ]),
    },
    {
      kind: 'mechanical',
      title: 'Door 2 — Rebuild Both Examples From Zero (pages 50-54 and 55-57)',
      markdown: md([
        '**Example 1 (slides 50-54).** The network left of terminals a-b: a **32-V source**, then a **4-Ω** in series, then a **12-Ω** down to the bottom rail IN PARALLEL with a **2-A source pointing UP**, then a **1-Ω** in series to terminal a; terminal b is the bottom rail; the load $R_L$ sits between a and b. Task: find the equivalent, then the current for $R_L = 6, 16, 36$ Ω.',
        '',
        '```',
        '  [32 V]──[4 Ω]──●──[1 Ω]──● a',
        '   +            │          │',
        '                │         [R_L]',
        '             [12 Ω]        │',
        '                │          │',
        '  ══════════════●══[2 A ↑]═● b',
        '```',
        '',
        '**Step 1 — $R_{Th}$ (slide 51):** kill independent sources: short the 32-V, open the 2-A. Look INTO a-b: the 1-Ω in series with (4-Ω parallel 12-Ω):',
        '',
        '$$R_{Th} = 1 + \\frac{4 \\cdot 12}{4+12} = 1 + 3 = \\mathbf{4\\ \\Omega}$$ (verified: E4.9.1)',
        '',
        '**Step 2 — $V_{Th}$ (slide 52):** REMOVE the load (open a-b). No current flows through the 1-Ω (the road is cut), so $V_{Th}$ = the voltage across the 12-Ω ∥ 2-A pair. Mesh analysis with two loops ($i_1$ left, $i_2$ right):',
        '',
        '$$-32 + 4i_1 + 12(i_1 - i_2) = 0, \\qquad i_2 = -2 \\text{ A}$$',
        '',
        'Why $i_2 = -2$? The 2-A source pushes UP through the right window, against the clockwise mesh direction — so the mesh current there is exactly minus the source value.',
        '',
        'Substitute: $-32 + 4i_1 + 12i_1 + 24 = 0$ → $16i_1 = 8$ → $i_1 = 0.5$ A. Then:',
        '',
        '$$V_{Th} = 12(i_1 - i_2) = 12(0.5 + 2) = \\mathbf{30\\ \\text{V}}$$ (verified: E4.9.2, E4.9.3)',
        '',
        '(reading: the pair carries $i_1 - i_2 = 2.5$ A downward through the 12-Ω → 30 V, and the 1-Ω adds nothing because it is open-circuited.)',
        '',
        '**Step 3 — the equivalent (slide 53):** one 30-V battery in series with 4 Ω feeding a-b.',
        '',
        '**Step 4 — the loads (slide 54):** each load is ONE division:',
        '',
        '- $R_L = 6$: $I_L = \\frac{30}{4+6} = \\frac{30}{10} = 3$ A',
        '- $R_L = 16$: $I_L = \\frac{30}{4+16} = \\frac{30}{20} = 1.5$ A',
        '- $R_L = 36$: $I_L = \\frac{30}{4+36} = \\frac{30}{40} = 0.75$ A (verified: E4.9.4)',
        '',
        'Teacher advice (the whole point of the theorem): three loads = three ONE-LINE answers. Without Thévenin, each load would mean re-solving the full mesh/node system. With it, the network was solved ONCE.',
        '',
        '**Example 2 (slides 55-57).** The network left of terminals A-B: a **36-V source** in series with **$R_1 = 3$ Ω**, then **$R_2 = 6$ Ω** down to the bottom rail; the terminals A (top) and B (bottom rail); the load $R_L = 2$ Ω sits between them.',
        '',
        '**Step 1 — $V_{AB}$ with the load OPEN (slide 56, diagram b):** no load current ⇒ $R_1$ and $R_2$ form a plain voltage divider:',
        '',
        '$$V_{AB} = V_{Th} = \\frac{6}{3+6}(36) = 24 \\text{ V}$$ (verified: E4.9.5)',
        '',
        '**Step 2 — $R_{AB}$ with the 36-V source SHORTED (slide 56, diagram c "Short across V"):**',
        '',
        '$$R_{AB} = R_{Th} = 3 \\parallel 6 = \\frac{3 \\cdot 6}{9} = 2\\ \\Omega$$ (verified: E4.9.5)',
        '',
        '**Step 3 — the equivalent with the load (slide 57, diagrams d-e):** 24-V source + 2-Ω + $R_L = 2$ Ω:',
        '',
        '$$I_L = \\frac{24}{2+2} = 6 \\text{ A}, \\qquad V_L = I_L \\cdot R_L = 12 \\text{ V}$$',
        '',
        'Slide 57 PRINTS $V_L = 12$ V on diagram (e) (the numeric current is the one-line finish: $24/4 = 6$ A, equally $12/2$). (verified: E4.9.6)',
      ]),
    },
    {
      kind: 'formal',
      title: 'Door 3 — The Statement, Printed and Precise',
      markdown: md([
        'Slide 47 statement: "Thévenin\'s theorem states that a linear two-terminal circuit can be replaced by an equivalent circuit consisting of a voltage source $V_{Th}$ in series with a resistor $R_{Th}$, where $V_{Th}$ is the open-circuit voltage at the terminals and $R_{Th}$ is the input or equivalent resistance at the terminals when the independent sources are turned off."',
        '',
        'Formal reading of the two definitions (slide 49):',
        '',
        '1. $V_{Th} = v_{oc}$ — open the terminals, compute the voltage between them (any method: divider, mesh, node — whichever the open circuit simplifies into).',
        '2. $R_{Th} = R_{in}$ — with all INDEPENDENT sources off (voltage → short, current → open), combine the remaining resistances from the terminals.',
        '3. Fine print for dependent sources: they do NOT turn off. When one is present, take the test-source route ($R_{Th} = v_{test}/i_{test}$) or the short-circuit route ($R_{Th} = V_{Th}/I_{sc}$).',
        '4. The load equation for any $R_L$: $I_L = \\frac{V_{Th}}{R_{Th} + R_L}$ (slide 54 prints it) — and $V_L = I_L \\cdot R_L$.',
      ]),
    },
  ],
  methods: [
    {
      question: '"Find the current for R_L = 6, 16, and 36 Ω" — method?',
      collegeMethod:
        'Full re-solve per load: mesh or node analysis three times over the original network. Three systems, three sets of arithmetic, three chances to slip.',
      fastMethod:
        'Thévenin once (slides 51-53), then three one-line divisions (slide 54): 3 A, 1.5 A, 0.75 A. One system, zero repeated effort — this is the exam-speed gap the theorem exists to close.',
    },
    {
      question: 'The circuit contains a dependent source — can I still "turn off sources" for R_Th?',
      collegeMethod:
        'Only the independent ones. For the dependent survivor, apply a test source $v_{test}$ at the terminals, find $i_{test}$, and $R_{Th} = v_{test}/i_{test}$; or compute the short-circuit current $I_{sc}$ and use $R_{Th} = V_{Th}/I_{sc}$.',
      fastMethod:
        'Open → $V_{Th}$; short the terminals → $I_{sc}$; then $R_{Th} = V_{Th}/I_{sc}$ in one division. Two measurements, no graph surgery, dependent sources welcome.',
    },
  ],
  recipe: {
    trigger: '"Find the Thevenin equivalent", "the network to the LEFT of terminals a-b", "find the current for several load values", or "what does the load see?"',
    steps: [
      'Name the terminals a-b and TAKE THE LOAD OUT (open circuit).',
      '$V_{Th}$: solve the OPEN-circuit network for the terminal voltage (divider/mesh/node — pick the easiest).',
      '$R_{Th}$: kill INDEPENDENT sources (V→short, I→open; dependent survive — use test-source or $V_{Th}/I_{sc}$ if one is present), then combine resistances from a-b.',
      'Draw the equivalent: $V_{Th}$ (+ toward a) in series with $R_{Th}$, feeding the terminals.',
      'Re-attach the load: $I_L = \\frac{V_{Th}}{R_{Th}+R_L}$, $V_L = I_L R_L$. One division per load.',
      'SANITY: check one load against a direct solve, or check that $V_L \\le V_{Th}$ and $I_L$ falls as $R_L$ grows (3 A → 1.5 A → 0.75 A as $R_L$ rises 6→16→36).',
    ],
    check: 'Example 1: $R_{Th} = 4$, $V_{Th} = 30$, loads give 3 / 1.5 / 0.75 A — the current halves when $R_{Th}+R_L$ doubles. Example 2: 24-V/2-Ω with a 2-Ω load gives $V_L = 12$ V (printed), $I_L = 6$ A.',
  },
  traps: [
    'Computing $V_{Th}$ with the load attached — NO: the load must be REMOVED (open) for the open-circuit voltage.',
    'Forgetting to remove the load while computing $R_{Th}$ — the load is NEVER part of the network behind a-b.',
    'Turning off a dependent source — forbidden (same rule as superposition); use the test-source or $V_{Th}/I_{sc}$ route.',
    'Polarity: the + of $V_{Th}$ goes to the terminal you called a; swap the name and you flip the sign of every answer.',
    'Including $R_L$ inside $R_{Th}$ — the theorem separates "network" from "load" once, forever.',
  ],
  summaryTable: {
    title: "Thévenin — Both Examples on One Card",
    headers: ['Step', 'Example 1 (slides 50-54)', 'Example 2 (slides 55-57)'],
    rows: [
      ['$V_{Th}$ (open load)', 'mesh: $i_1 = 0.5$, $i_2 = -2$ → $12(2.5)$', 'divider: $\\frac{6}{9}(36)$'],
      ['', '$= 30$ V', '$V_{AB} = 24$ V'],
      ['$R_{Th}$ (sources off)', '$1 + (4\\parallel12) = 1+3 = 4\\ \\Omega$', '$3\\parallel6 = 2\\ \\Omega$'],
      ['Load line', '$I_L = 30/(4+R_L)$', '$I_L = 24/(2+2) = 6$ A'],
      ['Answers', '6→3 A, 16→1.5 A, 36→0.75 A', '$V_L = 6 \\cdot 2 = 12$ V (printed)'],
    ],
  },
  recall: [
    { q: 'Thévenin in one breath?', a: 'Open for $V_{Th}$, sources-off for $R_{Th}$, one division per load. (افتح، اقفل، اقسم)' },
    { q: 'Exact statement?', a: 'A linear two-terminal circuit ⇄ $V_{Th}$ (open-circuit voltage) in series with $R_{Th}$ (input resistance, independent sources off).' },
    { q: 'The load equation?', a: '$I_L = V_{Th}/(R_{Th}+R_L)$.' },
    { q: 'Example answers to memorize?', a: '30 V + 4 Ω → 3 / 1.5 / 0.75 A; 24 V + 2 Ω with 2-Ω load → 6 A, $V_L = 12$ V.' },
  ],
  verifiedOn: VERIFIED,
};

// ===========================================================================
// TopicSet export
// ===========================================================================

export const lecture4NetworkTheoremsTopicSet: TopicSet = {
  lessonId: L4,
  lectureLabel: 'Electronics · Lecture 4 — Kirchhoff, Node & Mesh Analysis, Network Theorems',
  topics: [
    circuitAnatomy,
    kcl,
    kvl,
    nodeVoltage,
    nodeDependent,
    meshAnalysis,
    superposition,
    sourceTransformation,
    thevenin,
  ],
};
