import type { Lesson, LessonPage } from '../types';

interface WorkedExample {
  title: string;
  givens?: string;
  steps: string[];
  conclusion?: string;
}

interface TeachingNotes {
  terms?: string;
  cue?: string;
  trap?: string;
  analogy?: string;
  sourceNote?: string;
  example?: WorkedExample;
  recap?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  walkthrough: string,
  notes: TeachingNotes = {},
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (notes.terms) {
    blocks.push({ type: 'recognition', title: 'Key words and symbols · مصطلحات ورموز', markdown: notes.terms });
  }
  if (notes.cue) {
    blocks.push({ type: 'recognition', title: 'If a question describes this…', markdown: notes.cue });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough · الفكرة خطوةً خطوة', markdown: walkthrough });
  if (notes.example) {
    blocks.push({
      type: 'worked-example',
      title: notes.example.title,
      ...(notes.example.givens ? { givens: notes.example.givens } : {}),
      steps: notes.example.steps,
      ...(notes.example.conclusion ? { conclusion: notes.example.conclusion } : {}),
    });
  }
  if (notes.analogy) {
    blocks.push({ type: 'alternate', title: 'A quick mental picture', markdown: notes.analogy });
  }
  if (notes.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: notes.trap });
  }
  if (notes.sourceNote) blocks.push({ type: 'source-note', text: notes.sourceNote });
  if (notes.recap) {
    blocks.push({ type: 'foundation', title: 'Quick lecture recap', markdown: notes.recap });
  }
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [], note };
}

const pages: LessonPage[] = [
  visualPage(
    1,
    'Lecture cover · Electronics, Lecture 2',
    'The cover identifies Electronics Lecture 2 and says Fall Semester 2024–2025. This supplied PDF was exported in August 2025; the lesson follows this archived version.',
  ),
  explainedPage(
    2,
    'Course outline · selected textbook chapters',
    'This is a broad course roadmap. The actual teaching in this PDF covers series circuits (Chapter 4) and parallel circuits (Chapter 5).',
    'The slide lists topics from several chapters of the textbook, including Ohm’s law, circuit laws, network theorems, capacitors, inductors, diodes, transistors, and op-amps. It is not a claim that all those subjects are taught in this 67-page file. The pages that follow begin with Chapter 4, Series Circuits, and then move to Chapter 5, Parallel Circuits. The textbook’s chapter numbers jump because the course selects chapters rather than following every chapter in order.',
    { cue: 'Use the actual page headings to identify what this lecture explains: pages 3–27 are the series-circuit chapter, and pages 28–66 are the parallel-circuit chapter.' },
  ),
  explainedPage(
    3,
    'Chapter 4 map · Series Circuits',
    'Chapter 4 is organized into seven ideas: one-path circuits, resistor voltage drops, KVL, voltage-drop polarity, power, aiding/opposing sources, and open/short troubleshooting.',
    'This contents slide is a map for the first half of the file. Sections 4.1–4.7 appear on the highlighted-outline slides as each topic begins. A useful order is: establish that one current flows through every series part; calculate each resistor’s drop with Ohm’s law; check that the drops add to the source voltage; then handle power, source polarity, and faults.',
    { terms: '**Series circuit (دائرة توالي)** — components connected along one unbranched path.  \n**KVL** — Kirchhoff’s Voltage Law, the voltage-balance rule for a closed loop.' },
  ),
  explainedPage(
    4,
    'Section marker · 4.1 Series Circuits',
    'The outline highlights Section 4.1. The next slides define a series path and show why the current is the same through every component.',
    'This is a navigation slide, not a new rule. Use it to locate the first section of Chapter 4; the explanation and diagrams begin on source page 5.',
  ),
  explainedPage(
    5,
    '4.1 · Series path and total resistance',
    'In a series circuit there is one path for current, so the total resistance is the sum of the component resistances.',
    'The left drawing shows a battery and two resistors connected end-to-end; the right drawing represents the same arrangement as a schematic. The electrons have one continuous route through both resistors. If one component is removed or opened, that only path is broken.\n\nFor resistors in series, add their resistances: $R_T = R_1 + R_2 + R_3 + \\cdots$. The total is larger than any one positive resistor because every resistor adds opposition along the same path.',
    {
      terms: '**Total resistance ($R_T$)** — the single resistance that represents all series resistors together.  \n**Schematic** — a simplified circuit drawing using standard symbols.',
      cue: 'If the current has to pass through each resistor one after another, they are in series.',
      trap: 'A resistor’s position on the page does not decide whether it is in series. Trace the wiring: a branch at the connection means the parts may not share one series current.',
      analogy: 'Picture one hallway with several narrow doors in sequence: everyone passing through must go through every door.',
    },
  ),
  explainedPage(
    6,
    '4.1 · One current and how to recognize series connections',
    'Every component on the same unbranched series path carries the same current; circuit drawings can be rearranged without changing that connection.',
    'In the first diagrams, current is marked as 2 A at different positions in the same loop. It is not 2 A at one resistor and a different amount at the next: with no branch where charge can split, the same current passes through each component. The bottom row redraws series combinations in different shapes. The physical shape may change, but the connection rule is still that each listed resistor lies on one uninterrupted path with no branching junction between them.',
    {
      terms: '**Junction / node (عقدة)** — a connection point where wires or components meet. A node with multiple outgoing paths can allow current to split.',
      cue: 'For a series-circuit problem, write $I_1 = I_2 = I_3 = I$ before calculating voltage drops.',
      trap: 'Do not decide from “left-to-right” appearance. Follow the nodes and ask whether there is exactly one path through the components.',
    },
  ),
  explainedPage(
    7,
    'Example 4-1 · Add series resistances',
    'For two 5 Ω resistors and one 10 Ω resistor in series, the total resistance is 20 Ω.',
    'The example asks for $R_T$. Since all three resistors are in the same series path, use the series sum.',
    {
      example: {
        title: 'Find the total resistance',
        givens: '$R_1=5\\,\\Omega$, $R_2=5\\,\\Omega$, $R_3=10\\,\\Omega$; all are in series.',
        steps: [
          'Use the series rule: $R_T=R_1+R_2+R_3$.',
          'Substitute: $R_T=5+5+10=20\\,\\Omega$.',
        ],
        conclusion: 'The complete string is equivalent, for this calculation, to a 20 Ω resistance.',
      },
      trap: 'This add-the-resistances rule is for series connections. Parallel resistors use a different rule.',
    },
  ),
  explainedPage(
    8,
    'Section marker · 4.2 Series IR Voltage Drops',
    'The outline highlights voltage drops in a series string. The next section uses Ohm’s law on each resistor.',
    'This is a section marker. “IR” means current multiplied by resistance, which is the voltage across a resistor when its current is $I$.',
    { terms: '**IR drop** — the voltage across a resistance, calculated as $V=IR$.' },
  ),
  explainedPage(
    9,
    '4.2 · Calculate each resistor’s voltage drop',
    'Use Ohm’s law, $V=IR$: in the pictured 10 V string, the 4 Ω resistor drops 4 V and the 6 Ω resistor drops 6 V.',
    'First find the series current. The resistors total $4+6=10\\,\\Omega$, so $I=V_T/R_T=10/10=1\\,\\mathrm{A}$. That same 1 A flows through both resistors. Then calculate each drop separately: $V_1=IR_1=1\\times4=4\\,\\mathrm{V}$ and $V_2=IR_2=1\\times6=6\\,\\mathrm{V}$. Their sum is the 10 V source.\n\nA voltage drop is the part of the source voltage used across a component; it leaves the remaining voltage for the rest of the series path.',
    {
      terms: '**Voltage drop ($V_1,V_2$)** — the voltage across one resistor.  \n**Applied voltage ($V_T$)** — the source voltage across the entire series string.',
      cue: 'When a question gives a series current and resistor values, multiply each resistor by that same current to get its drop.',
      trap: 'Do not use the source voltage across each resistor. In series, the source voltage is divided among the resistors.',
    },
  ),
  explainedPage(
    10,
    'Example 4-3 · Set up a three-resistor series problem',
    'This slide gives a 12 V source and 10 Ω, 20 Ω, and 30 Ω resistors in series; it asks for total resistance, current, and every voltage drop.',
    'The circuit has one loop, so first add all three resistances. Then use the source voltage and the total resistance to find the one series current. Finally, use that current for each individual resistor. The solution is on the following slide.',
    {
      terms: '**Given:** $V_T=12\\,\\mathrm{V}$; $R_1=10\\,\\Omega$; $R_2=20\\,\\Omega$; $R_3=30\\,\\Omega$.',
      cue: 'The phrase “solve for $R_T$, $I$, and individual resistor voltage drops” tells you to work in this order: add $R$, find $I$, then find each $V_i$.',
    },
  ),
  explainedPage(
    11,
    'Example 4-3 · Find the current and all three drops',
    'The 12 V, 10 Ω + 20 Ω + 30 Ω series circuit has $R_T=60\\,\\Omega$, $I=0.20\\,\\mathrm{A}$, and drops of 2 V, 4 V, and 6 V.',
    'Work in a sequence so the quantities do not get mixed up. The current written as 200 mA is the same as 0.200 A. Multiplying it by each resistor gives the drop across that resistor. Check the result by adding all three drops: they must recover the 12 V applied source.',
    {
      example: {
        title: 'Solve Example 4-3',
        givens: '$V_T=12\\,\\mathrm{V}$; $R_1=10\\,\\Omega$; $R_2=20\\,\\Omega$; $R_3=30\\,\\Omega$.',
        steps: [
          '$R_T=10+20+30=60\\,\\Omega$.',
          '$I=V_T/R_T=12/60=0.20\\,\\mathrm{A}=200\\,\\mathrm{mA}$.',
          '$V_1=IR_1=0.20\\times10=2\\,\\mathrm{V}$.',
          '$V_2=IR_2=0.20\\times20=4\\,\\mathrm{V}$.',
          '$V_3=IR_3=0.20\\times30=6\\,\\mathrm{V}$.',
          'Check: $2+4+6=12\\,\\mathrm{V}$, equal to the source.',
        ],
        conclusion: 'The same current flows everywhere, while the larger resistor gets the larger voltage drop.',
      },
      terms: '**mA** — milliampere; $1\\,\\mathrm{A}=1000\\,\\mathrm{mA}$.',
      trap: 'If you use 200 mA in $V=IR$, convert it to 0.200 A first, or keep the milli-unit conversion explicit.',
    },
  ),
  explainedPage(
    12,
    'Section marker · 4.3 Kirchhoff’s Voltage Law',
    'The outline highlights KVL. It is the loop rule that checks whether the source voltage balances the series drops.',
    'This slide marks the start of Section 4.3. The statement and equation are on source page 13.',
  ),
  explainedPage(
    13,
    '4.3 · Kirchhoff’s Voltage Law (KVL)',
    'Around the pictured series loop, the applied source voltage equals the sum of the resistor voltage drops: $V_T=V_1+V_2+\\cdots$.',
    'KVL is a voltage-balance rule for a closed loop. The source provides a rise in electrical potential; the resistors produce drops. If you take one full trip around the loop and keep a consistent sign convention, the rises and drops balance. This slide writes the common series form as source voltage equal to the sum of the individual IR drops.',
    {
      terms: '**KVL (قانون كيرشوف للجهد)** — the algebraic sum of voltage changes around a closed loop is zero.  \n**Voltage rise** — moving across a source from its negative to positive terminal.  \n**Voltage drop** — moving through a component in the chosen current direction under the passive sign convention.',
      cue: 'If a problem gives all but one series voltage, subtract the known drops from the source: $V_x=V_T-\\sum V_{\\text{known}}$.',
      trap: 'KVL does not say each resistor has the full source voltage. The individual drops add to the source.',
    },
  ),
  explainedPage(
    14,
    'Example 4-4 · Use KVL to find the applied voltage',
    'The three series drops are 40 V, 60 V, and 180 V, so the applied voltage is 280 V.',
    'Because the resistors are in series, KVL says their drops add to the source. The example also notes the same current is 2 A in every series resistor: $40/20=2$, $60/30=2$, and $180/90=2$. This is a useful consistency check.',
    {
      example: {
        title: 'Find the source voltage',
        givens: '$V_1=40\\,\\mathrm{V}$, $V_2=60\\,\\mathrm{V}$, $V_3=180\\,\\mathrm{V}$.',
        steps: [
          'Apply KVL: $V_T=V_1+V_2+V_3$.',
          '$V_T=40+60+180=280\\,\\mathrm{V}$.',
          'Optional current check: $40/20=60/30=180/90=2\\,\\mathrm{A}$.',
        ],
        conclusion: 'The source must provide 280 V for these drops in the stated series circuit.',
      },
      trap: 'Add voltage drops when they are stated with the same polarity direction around the series loop, as they are in this example.',
    },
  ),
  explainedPage(
    15,
    'Series lamps · Why the example uses two 120 V lamps on 240 V',
    'Two 120 V lamps in series across a 240 V source each receive 120 V only when their voltage drops are equal.',
    'The left drawing is a wiring picture; the right is the same circuit as a schematic. KVL requires the two lamp drops to add to the 240 V source. If the lamps are identical and share voltage equally, each gets 120 V. If their electrical characteristics differ, the drops need not be equal. Opening either lamp breaks the only path and turns both off.',
    {
      terms: '**Rated voltage** — the voltage a component is designed to operate across under its specified conditions.',
      trap: 'Do not assume any two devices connected in series split voltage equally. Equal division here depends on the lamps being matched; KVL only guarantees that the drops add to 240 V.',
      sourceNote: 'The slide uses 120 V lamps and a 240 V line as a textbook illustration. Treat those as the example values in this circuit, not as a general household-voltage rule.',
    },
  ),
  explainedPage(
    16,
    'Section marker · 4.4 Polarity of IR Voltage Drops',
    'The next diagram shows how to mark a resistor’s voltage polarity consistently with electron flow or conventional current.',
    'This outline slide marks Section 4.4. The polarity picture is on source page 17.',
  ),
  explainedPage(
    17,
    '4.4 · Mark the polarity across a resistor',
    'For the same resistor voltage, conventional current enters the marked positive side; electron flow enters the negative side.',
    'The left picture uses electron-flow direction; the right uses conventional current. These directions are opposite by definition. In each picture, the source labels the same resistor voltage $V_1$ with a positive and a negative terminal. The resistor is passive: conventional current enters the + side and exits the − side, so the voltage is a drop in the direction of conventional current. If you instead follow electron flow, it enters the negative side.',
    {
      terms: '**Polarity (+ / −)** — which end of a voltage is at higher potential.  \n**Conventional current** — the reference direction from positive charge motion; opposite electron drift in a metal wire.',
      cue: 'Use the current arrow and resistor polarity together: for a passive resistor, conventional current enters +.',
      trap: 'Do not swap the polarity just because the picture shows electrons. The source shows both conventions for the same resistor voltage.',
    },
  ),
  explainedPage(
    18,
    'Section marker · 4.5 Total Power in a Series Circuit',
    'The next section adds the power dissipated by each resistor and checks it against power supplied by the source.',
    'This is the 4.5 outline marker. The power relationship and a two-resistor example start on source page 19.',
  ),
  explainedPage(
    19,
    '4.5 · Total power is the sum of resistor power',
    'In a series circuit, $P_T=P_1+P_2+\\cdots$; the slide’s 60 V, 2 A example supplies 120 W total.',
    'Each resistor converts electrical energy into heat at a rate called power. For each resistor, you may use any compatible power formula: $P=VI$, $P=I^2R$, or $P=V^2/R$. The pictured circuit has 2 A through both resistors: $R_1=10\\,\\Omega$ has a 20 V drop and dissipates 40 W; $R_2=20\\,\\Omega$ has a 40 V drop and dissipates 80 W. The source provides 60 V total.',
    {
      terms: '**Power ($P$)** — the rate electrical energy is transferred or converted; measured in watts (W).',
      cue: 'When the question asks for total circuit power, add the component powers or calculate $P_T=V_TI_T$.',
      trap: 'Keep the values matched to the same component: its voltage, current, and resistance must satisfy Ohm’s law.',
    },
  ),
  explainedPage(
    20,
    '4.5 · Check that source power equals resistor power',
    'The example’s resistor powers are 40 W and 80 W, totaling 120 W; the source check $60\\,\\mathrm{V}\\times2\\,\\mathrm{A}$ also gives 120 W.',
    'For the 20 Ω resistor, the slide checks power in three equivalent ways: $VI=40\\times2=80\\,\\mathrm{W}$; $I^2R=2^2\\times20=80\\,\\mathrm{W}$; and $V^2/R=40^2/20=80\\,\\mathrm{W}$. Add the two resistor powers, $40+80=120\\,\\mathrm{W}$. The source power is $V_TI=60\\times2=120\\,\\mathrm{W}$, so energy supplied by the source matches the power used in the resistors.',
    {
      terms: '**$P=VI$** works when voltage and current refer to the same element or source.  \n**$P=I^2R$** uses the element current.  \n**$P=V^2/R$** uses the voltage across that element.',
      trap: 'The current is shared in series, but the voltage differs by resistor. Do not use the source voltage in a single resistor’s $V^2/R$ calculation.',
    },
  ),
  explainedPage(
    21,
    'Section marker · 4.6 Series-Aiding and Series-Opposing Voltages',
    'When sources are in series, their polarities determine whether their voltages add or oppose.',
    'This outline slide points to the two-source diagrams on source page 22. Inspect the + and − signs at the source connections before choosing addition or subtraction.',
  ),
  explainedPage(
    22,
    '4.6 · Add aiding sources; subtract opposing sources',
    'The 6 V and 8 V sources give 14 V when aiding and 2 V when opposing.',
    'In (a), the connection makes the source voltages reinforce one another: $V_T=6+8=14\\,\\mathrm{V}$. Across the 2 Ω resistor that gives $I=14/2=7\\,\\mathrm{A}$. In (b), the sources oppose: one pushes in the opposite direction, so the net magnitude is $8-6=2\\,\\mathrm{V}$ and $I=2/2=1\\,\\mathrm{A}$. The current direction follows the stronger 8 V source.',
    {
      terms: '**Series-aiding** — source polarities reinforce, so the voltage magnitudes add.  \n**Series-opposing** — source polarities oppose, so the smaller source voltage subtracts from the larger.',
      cue: 'Trace the source polarities around the loop. If the source rises point the same way, add; if one rise opposes the other, subtract.',
      trap: 'Do not decide from the batteries’ drawn orientation alone. Read the + and − marks at the series connection.',
      example: {
        title: 'Find the net voltage and current',
        givens: '$V_1=6\\,\\mathrm{V}$, $V_2=8\\,\\mathrm{V}$, $R=2\\,\\Omega$.',
        steps: [
          'Aiding: $V_T=6+8=14\\,\\mathrm{V}$, so $I=14/2=7\\,\\mathrm{A}$.',
          'Opposing: $V_T=8-6=2\\,\\mathrm{V}$, so $I=2/2=1\\,\\mathrm{A}$ toward the stronger source polarity.',
        ],
        conclusion: 'The net source voltage depends on polarity, not just on adding every printed voltage.',
      },
    },
  ),
  explainedPage(
    23,
    'Ground symbols · earth, chassis, and common',
    'The slide shows three symbols called earth ground, chassis ground, and common ground; each marks a circuit reference or grounding connection.',
    'These are three different schematic symbols. In a circuit drawing, “ground” commonly marks the node chosen as the 0 V reference so other node voltages can be stated relative to it. Earth ground connects to the physical earth, chassis ground refers to a conductive equipment frame, and common ground names a shared circuit reference. The actual connection among them depends on the system design.',
    {
      terms: '**Reference node (نقطة مرجعية)** — the point assigned 0 V for measuring other voltages.  \n**Chassis (هيكل الجهاز)** — the conductive frame or enclosure of equipment.',
      trap: 'The three symbols are not automatically interchangeable. A circuit’s “common” reference is not always physically connected to earth.',
    },
  ),
  explainedPage(
    24,
    'Ground connection · measuring voltages from a common reference',
    'The ground symbols at the bottom identify the same 0 V return/reference point; the resistor drops add up from that reference to the source voltage.',
    'The figure shows a series source feeding three resistors, with the bottom return drawn as a common path and labeled 0 V at both ends. Those labels mean the points are treated as the same electrical reference in this ideal wire. The marks do not add another resistor or consume voltage. The diagram is teaching how to state node voltages and use a shared return.',
    {
      terms: '**Common return** — the shared conductor through which current returns to the source.  \n**0 V** — the selected reference potential, not a claim that no current flows there.',
      cue: 'When a node is labeled ground/0 V, measure another node’s voltage relative to it.',
      trap: 'Ground is not automatically the same as a battery’s negative terminal in every circuit; here the diagram explicitly chooses the bottom return as 0 V.',
    },
  ),
  explainedPage(
    25,
    'Section marker · 4.7 Troubleshooting opens and shorts',
    'The next diagram compares normal operation, an open component, and a shorted resistor in a series circuit.',
    'This outline slide marks the last section of Chapter 4. Source page 26 provides the circuit diagrams and values.',
  ),
  explainedPage(
    26,
    '4.7 · What an open or short does in a series circuit',
    'An open anywhere in the single series path makes current zero; a short across one resistor bypasses it, so current flows through the remaining resistors.',
    'The normal circuit is 40 V across 25 Ω, 10 Ω, and 5 Ω in series: $R_T=40\\,\\Omega$, so $I=1\\,\\mathrm{A}$. Its drops are 25 V, 10 V, and 5 V. In the open-circuit drawing, the path is broken between $P_1$ and $P_2$: no current flows anywhere, so the intact resistors have 0 V drops and the full 40 V appears across the open gap. In the shorted drawing, a 0 Ω wire bypasses the 10 Ω resistor. The remaining series resistance is $25+5=30\\,\\Omega$, so current rises to about 1.33 A; the 25 Ω and 5 Ω drops are about 33.3 V and 6.67 V, while the shorted resistor has 0 V across it.',
    {
      terms: '**Open circuit (دائرة مفتوحة)** — a broken path with effectively infinite resistance.  \n**Short circuit (قصر كهربائي)** — an unintended low-resistance path that bypasses a component.',
      cue: 'In a series circuit, an open makes every current zero. A short across one component removes that component from the effective resistance.',
      trap: 'A resistor shorted across its own terminals is bypassed; this is different from shorting the voltage source terminals, which can cause dangerous excessive current.',
      example: {
        title: 'Follow the source’s 40 V fault example',
        givens: 'Normal values: $V_T=40\\,\\mathrm{V}$, $R_1=25\\,\\Omega$, $R_2=10\\,\\Omega$, $R_3=5\\,\\Omega$.',
        steps: [
          'Normal: $R_T=25+10+5=40\\,\\Omega$; $I=40/40=1\\,\\mathrm{A}$.',
          'If $R_2$ is shorted, omit its 10 Ω from the series total: $R_T=25+5=30\\,\\Omega$.',
          '$I=40/30=1.333\\,\\mathrm{A}$; $V_1=1.333\\times25\\approx33.3\\,\\mathrm{V}$ and $V_3=1.333\\times5\\approx6.67\\,\\mathrm{V}$.',
          'Check: $33.3+0+6.67\\approx40\\,\\mathrm{V}$.',
        ],
        conclusion: 'The bypassed 10 Ω part has 0 V across it; the remaining drops still balance the 40 V source.',
      },
    },
  ),
  {
    sourcePage: 27,
    title: 'Blank source page',
    coverage: 'not-applicable',
    blocks: [],
    note: 'The supplied PDF page contains only its page number and background; it has no lesson content.',
  },
  explainedPage(
    28,
    'Course outline · Chapter 5 Parallel Circuits',
    'This broad course outline highlights Chapter 5, which is the second main topic in this PDF.',
    'The outline repeats the selected textbook chapters seen near the beginning. Here it highlights Parallel Circuits. The parallel-circuit chapter starts with its title on source page 29 and continues through source page 66.',
  ),
  visualPage(
    29,
    'Chapter divider · Chapter 5 Parallel Circuits',
    'This is a chapter title slide. The section map follows on source page 30.',
  ),
  explainedPage(
    30,
    'Chapter 5 outline · later sections listed',
    'This slide lists the later parallel-circuit topics: total power, analyzing circuits with unknowns, and troubleshooting opens and shorts.',
    'The outline lists sections 5-6 through 5-8. The deck first teaches sections 5-1 through 5-5 on pages 31–56, then returns to the listed later topics on pages 57–63. So the topics are present even though this outline slide only names the final group.',
    { cue: 'Use the page headings to locate the full sequence: parallel voltage/branches, KCL, equivalent resistance, power, and fault troubleshooting.' },
  ),
  explainedPage(
    31,
    '5.1 · Core properties of a parallel circuit',
    'Across parallel branches, voltage is the same, branch currents add, total power adds, and equivalent resistance is smaller than the smallest branch resistance.',
    'A parallel circuit has at least two paths connected across the same two nodes. Because each path starts and ends at the same nodes, every branch has the same potential difference. The source current splits among the branches, so the branch currents add back to the total. Power delivered by the source is accounted for by the sum of the branch powers. Since parallel paths draw more current together than any one path alone, their equivalent resistance is below the smallest branch resistance.',
    {
      terms: '**Branch (فرع)** — one path between the two common nodes.  \n**Equivalent resistance ($R_{EQ}$)** — one resistance that draws the same total current as the parallel bank at the same voltage.',
      cue: 'Parallel: same $V$, split/add $I$, add $P$, and $R_{EQ}$ is less than the smallest branch $R$.',
      trap: 'Do not apply the series rule that current is the same in every component. In parallel, it is the branch voltage that is shared.',
    },
  ),
  explainedPage(
    32,
    '5.1 · What makes branches parallel',
    'Two or more components are parallel when both ends of each are connected to the same two points.',
    'Compare the endpoints, not the drawing shape: if both terminals of one component connect to the same pair of nodes as another component, they are in parallel. The slide uses household receptacles as an example because devices connected to the same line receive the same line voltage and can operate independently.',
    {
      terms: '**Across the same two points** — both terminals share the same pair of electrical nodes.',
      analogy: 'Think of the two wires as common top and bottom rails; every branch connects between those same rails.',
      sourceNote: 'The slide’s 120 V, 60 Hz receptacle example is a textbook illustration. Keep its numbers as the example’s values; they are not a universal supply standard.',
    },
  ),
  explainedPage(
    33,
    'Parallel example · Two equal resistors across 1.5 V',
    'The two 5 Ω resistors connect across the same 1.5 V source, so each branch has 1.5 V across it and carries 0.30 A.',
    'The schematic places both 5 Ω resistors between the same top and bottom nodes, with the 1.5 V source across those nodes. Therefore, each branch has $V_A=1.5\\,\\mathrm{V}$. Ohm’s law gives $I_1=1.5/5=0.30\\,\\mathrm{A}$ and $I_2=1.5/5=0.30\\,\\mathrm{A}$. By KCL the source current is 0.60 A. The slide mainly illustrates the wiring; the branch-current values follow from the diagram.',
    {
      terms: '**Node (عقدة)** — all points joined by ideal wire are at the same potential.',
      example: {
        title: 'Read the pictured parallel circuit',
        givens: '$V_A=1.5\\,\\mathrm{V}$; $R_1=R_2=5\\,\\Omega$.',
        steps: [
          'Same two nodes means the voltage across each resistor is 1.5 V.',
          '$I_1=V_A/R_1=1.5/5=0.30\\,\\mathrm{A}$.',
          '$I_2=V_A/R_2=1.5/5=0.30\\,\\mathrm{A}$.',
          '$I_T=I_1+I_2=0.30+0.30=0.60\\,\\mathrm{A}$.',
        ],
        conclusion: 'Equal branch resistances at the same voltage draw equal branch currents.',
      },
    },
  ),
  explainedPage(
    34,
    'Parallel loads · A bulb and toaster on the same supply',
    'The bulb and toaster are connected as separate parallel branches, so each branch receives the 120 V source voltage.',
    'The wiring drawing shows a 120 V bulb and a 120 V toaster connected to the same receptacle rails. In the schematic, each load is its own branch across the source. Turning off or opening one branch does not break the other branch’s path. The 100 W and 600 W labels identify the pictured loads; this slide does not ask for a current calculation.',
    {
      terms: '**Load (حمل)** — a component or device that uses electrical power.  \n**Independent branch** — one path that can be interrupted without opening the other paths.',
      cue: 'When two household devices are connected to the same two supply wires, their connection is parallel.',
      trap: 'Do not add 120 V + 120 V. Each branch has the same 120 V across it; branch currents, rather than branch voltages, add.',
    },
  ),
  explainedPage(
    35,
    '5.1 · Branch current from Ohm’s law',
    'For each parallel branch, $I=V/R$ using that branch’s resistance; the same applied voltage $V_A$ is across every branch.',
    'A branch is one complete path between the shared nodes. Ohm’s law applies separately to each path: divide the voltage across that branch by its own resistance. Since all branches share the same endpoints, the voltage value is common, but the currents can differ because the resistances differ.',
    {
      terms: '**$V_A$** — applied voltage across the parallel network.  \n**$I_k$** — current in branch $k$.  \n**$R_k$** — resistance in branch $k$.',
      cue: 'Use $I_k=V_A/R_k$ for one branch; use KCL afterward if the question asks for the source current.',
      trap: 'Do not divide the branch voltage by the total equivalent resistance to get an individual branch current. Use that branch’s own $R_k$.',
    },
  ),
  explainedPage(
    36,
    'Parallel branch currents · 10 V across 10 Ω and 5 Ω',
    'With 10 V across both branches, the 10 Ω branch carries 1 A and the 5 Ω branch carries 2 A.',
    'The same 10 V appears across each resistor because both are connected to the same two nodes. Apply Ohm’s law separately. The 5 Ω branch has half the resistance of the 10 Ω branch, so it draws twice the current. This is the core reason current divides unevenly in parallel.',
    {
      terms: '**Branch current** — current in one path only; label it with the branch subscript, such as $I_1$.',
      example: {
        title: 'Calculate each branch current',
        givens: '$V_A=10\\,\\mathrm{V}$; $R_1=10\\,\\Omega$; $R_2=5\\,\\Omega$.',
        steps: [
          '$I_1=V_A/R_1=10/10=1\\,\\mathrm{A}$.',
          '$I_2=V_A/R_2=10/5=2\\,\\mathrm{A}$.',
          'The total source current is $I_T=I_1+I_2=3\\,\\mathrm{A}$.',
        ],
        conclusion: 'The lower-resistance branch draws more current at the shared voltage.',
      },
      trap: 'The 10 V is across each branch, not divided between the two resistors.',
    },
  ),
  explainedPage(
    37,
    'Example 5-1 · Set up the branch-current calculation',
    'The 15 V source is across both parallel resistors, 1 kΩ and 600 Ω; the question asks for each branch current.',
    'The circuit shows each resistor connected directly across the same source terminals. Therefore, use 15 V in both Ohm’s-law calculations. Keep the unit conversion for the first branch explicit: 1 kΩ is 1000 Ω.',
    {
      terms: '**kΩ** — kilohm; $1\\,\\mathrm{k}\\Omega=1000\\,\\Omega$.',
      cue: 'For a parallel problem, write the branch voltage first; here $V_1=V_2=15\\,\\mathrm{V}$.',
    },
  ),
  explainedPage(
    38,
    'Example 5-1 · Solve the branch currents',
    'The currents are $I_1=15\\,\\mathrm{mA}$ through 1 kΩ and $I_2=25\\,\\mathrm{mA}$ through 600 Ω.',
    'The voltage is 15 V across each resistor. Divide by the resistance in each branch; convert amperes to milliamperes by multiplying by 1000.',
    {
      example: {
        title: 'Finish Example 5-1',
        givens: '$V_A=15\\,\\mathrm{V}$; $R_1=1\\,\\mathrm{k}\\Omega=1000\\,\\Omega$; $R_2=600\\,\\Omega$.',
        steps: [
          '$I_1=15/1000=0.015\\,\\mathrm{A}=15\\,\\mathrm{mA}$.',
          '$I_2=15/600=0.025\\,\\mathrm{A}=25\\,\\mathrm{mA}$.',
        ],
        conclusion: 'The 600 Ω branch carries more current because its resistance is lower.',
      },
      trap: 'Keep the units compatible: volts divided by ohms gives amperes, not milliamperes until you convert.',
    },
  ),
  explainedPage(
    39,
    '5.2 · Kirchhoff’s Current Law (KCL)',
    'At a parallel split, the total line current equals the sum of the branch currents: $I_T=I_1+I_2+\\cdots$.',
    'Current arriving along the main line divides among the branches and then recombines on the return side. KCL is charge conservation at a node: current entering a connection equals current leaving it. The figure’s example has a 20 V source, a 20 Ω branch, and a 10 Ω branch. The common voltage gives 1 A and 2 A; the source line supplies 3 A.',
    {
      terms: '**KCL (قانون كيرشوف للتيار)** — total current into a node equals total current out.  \n**Main line** — the source leads carrying the total current before it splits and after branches recombine.',
      cue: 'When branch currents are known, add them for $I_T$. When $I_T$ and all but one branch current are known, subtract to find the missing one.',
      trap: 'Do not add the source current to the branch currents. It is already their total.',
    },
  ),
  explainedPage(
    40,
    'Parallel wiring · Shared supply rails',
    'A shared pair of supply wires can feed several parallel branches, using less wire than running an independent pair from the source to every load.',
    'The slide compares a shared-bus arrangement with separately wiring each branch directly to the source. The top and bottom conductors are shared, and each load connects between them. Electrically, each branch still sees the source voltage. The practical point here is wiring efficiency, not a change in the parallel-circuit rules.',
    {
      terms: '**Bus / rail** — a shared conductor that connects several circuit branches.',
      trap: 'Sharing wires does not turn the branches into a series string: each branch still connects across the same two supply rails.',
    },
  ),
  explainedPage(
    41,
    'Main line and return path',
    'The main line is the pair of leads connecting the parallel branches to the source; it carries the total branch current.',
    'For current to flow, the path must leave one source terminal, pass through a branch, and return to the opposite terminal. Before the split and after the currents recombine, the main line carries $I_T$. Inside the individual branches, the currents are $I_1$, $I_2$, and so on.',
    {
      terms: '**Return path** — the conductor that completes the path back to the source.  \n**Main-line current ($I_T$)** — the combined current supplied to all branches.',
      cue: 'On a diagram, identify the main line before the branching node and after the branches rejoin.',
    },
  ),
  explainedPage(
    42,
    'KCL for any number of branches',
    'For any parallel network, $I_T$ is the sum of every branch current, whether the branch resistances are equal or different.',
    'The current law is about how current divides at a node, not about whether the resistors match. With two branches, $I_T=I_1+I_2$; with four branches, include all four. If the branch directions are not all defined the same way, use signed currents consistently.',
    {
      terms: '**Subscript $T$** — total or main-line value.  \n**Subscript $1,2,\\ldots$** — a particular branch value.',
      cue: 'Before solving, label each branch current. Then write KCL once and substitute the known values.',
    },
  ),
  explainedPage(
    43,
    'KCL diagram · Four currents combine',
    'The diagram shows four branch currents combining into the total line current: $I_T=I_1+I_2+I_3+I_4$.',
    'The arrows show current returning from each branch to the main line and then flowing through the source path. The drawing has no numbers; it illustrates the general KCL equation. If the four branch currents were known numerically, add them to find $I_T$.',
    { cue: 'Count every connected branch once; the number of branches determines how many terms appear in the KCL sum.' },
  ),
  explainedPage(
    44,
    'Example 5-2 · Add three parallel branch currents',
    'Across 120 V, the 20 Ω, 40 Ω, and 60 Ω branches draw 6 A, 3 A, and 2 A; the total is 11 A.',
    'Each branch receives the full 120 V. Find each current using $I=V/R$, then apply KCL to combine them.',
    {
      example: {
        title: 'Find the source current',
        givens: '$V_A=120\\,\\mathrm{V}$; $R_1=20\\,\\Omega$; $R_2=40\\,\\Omega$; $R_3=60\\,\\Omega$.',
        steps: [
          '$I_1=120/20=6\\,\\mathrm{A}$.',
          '$I_2=120/40=3\\,\\mathrm{A}$ and $I_3=120/60=2\\,\\mathrm{A}$.',
          'KCL: $I_T=6+3+2=11\\,\\mathrm{A}$.',
        ],
        conclusion: 'The main-line current is larger than any one branch current because it supplies all three.',
      },
      trap: 'The 120 V is common to all three branches; do not divide it among them before using Ohm’s law.',
    },
  ),
  explainedPage(
    45,
    'Example 5-3 · Find a missing branch current',
    'If the line current is 15 A and one branch uses 10 A, the other branch uses 5 A.',
    'With two branches, KCL reads $I_T=I_1+I_2$. Rearrange it to isolate the unknown: $I_2=I_T-I_1$. The 120 V label is not needed for this calculation because the total and one branch current are already given.',
    {
      example: {
        title: 'Subtract the known branch from the total',
        givens: '$I_T=15\\,\\mathrm{A}$ and $I_1=10\\,\\mathrm{A}$.',
        steps: ['$I_2=I_T-I_1=15-10=5\\,\\mathrm{A}$.'],
        conclusion: 'The other branch must account for the remaining 5 A.',
      },
      trap: 'A branch current cannot be larger than the total line current when all branch currents flow in the same source direction.',
    },
  ),
  explainedPage(
    46,
    'Equivalent resistance · Replace the parallel bank with one resistor',
    'A 60 V source supplying 3 A to the 60 Ω and 30 Ω parallel branches has equivalent resistance $R_{EQ}=20\\,\\Omega$.',
    'The two branches draw $I_1=60/60=1\\,\\mathrm{A}$ and $I_2=60/30=2\\,\\mathrm{A}$, so the source supplies $I_T=3\\,\\mathrm{A}$. An equivalent resistor would draw the same 3 A from the same 60 V source. Ohm’s law gives $R_{EQ}=V_A/I_T=60/3=20\\,\\Omega$.',
    {
      terms: '**Equivalent circuit** — a simpler circuit that has the same behavior at the source terminals for the quantity being analyzed.',
      example: {
        title: 'Find the equivalent resistance from the total current',
        givens: '$V_A=60\\,\\mathrm{V}$, $R_1=60\\,\\Omega$, $R_2=30\\,\\Omega$.',
        steps: [
          '$I_1=60/60=1\\,\\mathrm{A}$ and $I_2=60/30=2\\,\\mathrm{A}$.',
          '$I_T=1+2=3\\,\\mathrm{A}$.',
          '$R_{EQ}=V_A/I_T=60/3=20\\,\\Omega$.',
        ],
        conclusion: 'The 20 Ω equivalent draws the same 3 A from 60 V as the two-branch bank.',
      },
      trap: 'Equivalent resistance is not the resistance of one physical branch; it summarizes the whole bank as seen by the source.',
    },
  ),
  explainedPage(
    47,
    'Equivalent resistance formula',
    'Use $R_{EQ}=V_A/I_T$: divide the common branch voltage by the total line current.',
    'This is Ohm’s law applied to the complete parallel bank viewed as one equivalent resistor. The numerator is the voltage across the two shared nodes; the denominator is the sum of all branch currents. The result has units of ohms.',
    {
      terms: '**$V_A$** — voltage across the full parallel bank.  \n**$I_T$** — current drawn from the source by the bank.',
      cue: 'If you already know the common voltage and the total line current, this is often the quickest way to find $R_{EQ}$.',
      trap: 'Use total current here, not one branch current.',
    },
  ),
  explainedPage(
    48,
    'Parallel bank · Why equivalent resistance is smaller',
    'A group of parallel branches is a bank, and its equivalent resistance is always below the smallest branch resistance.',
    'Adding a branch gives the source another path for current. The total current must therefore be greater than the current in any one branch, for the same applied voltage. Since $R_{EQ}=V_A/I_T$, a larger total current at the same voltage means a smaller equivalent resistance.',
    {
      terms: '**Parallel bank** — a group of branches connected across the same two nodes.',
      cue: 'Use this as a quick check: if your calculated parallel equivalent is larger than the smallest branch, recheck the arithmetic or topology.',
      analogy: 'More open paths let more current through at the same voltage, so the whole bank offers less opposition.',
    },
  ),
  explainedPage(
    49,
    'Adding parallel branches reduces equivalent resistance',
    'Adding another positive-resistance branch increases total current and reduces the equivalent resistance.',
    'The slide restates the check and the trend. The supply voltage is shared, while each added branch draws additional current. Because $R_{EQ}=V_A/I_T$, the same voltage divided by a larger total current gives a smaller equivalent resistance.',
    {
      cue: 'If a parallel circuit gains an extra branch, expect $I_T$ to increase and $R_{EQ}$ to decrease, assuming the source voltage stays fixed.',
      trap: 'This rule assumes the added branch is a real positive resistance and the source voltage is treated as fixed.',
    },
  ),
  explainedPage(
    50,
    'Example 5-5 · Find equivalent resistance from branch currents',
    'Two 5 A branches draw 10 A total from a 90 V source, so the equivalent resistance is 9 Ω.',
    'First use KCL to get the total line current, then use $R_{EQ}=V_A/I_T$. There is no need to know the individual branch resistances because each branch current and the source voltage are enough.',
    {
      example: {
        title: 'Calculate the equivalent resistance',
        givens: '$I_1=5\\,\\mathrm{A}$, $I_2=5\\,\\mathrm{A}$, $V_A=90\\,\\mathrm{V}$.',
        steps: [
          '$I_T=I_1+I_2=5+5=10\\,\\mathrm{A}$.',
          '$R_{EQ}=V_A/I_T=90/10=9\\,\\Omega$.',
        ],
        conclusion: 'The two branches together act like a 9 Ω load across the 90 V source.',
      },
    },
  ),
  explainedPage(
    51,
    'Adding equal parallel branches · Example with 30 Ω resistors',
    'With 60 V across each 30 Ω branch, each carries 2 A; one, two, and three branches draw 2 A, 4 A, and 6 A total.',
    'Every resistor is across the same 60 V source, so each branch current is $60/30=2\\,\\mathrm{A}$. KCL gives the totals shown. Replacing the bank with one resistor gives $R_{EQ}=60/I_T$: 30 Ω for one branch, 15 Ω for two, and 10 Ω for three. The figure labels the three-branch equivalent as 10 Ω.',
    {
      terms: '**Equal branches** — branches with the same resistance and therefore the same current at the same voltage.',
      cue: 'For $n$ equal parallel resistors of value $R$, $R_{EQ}=R/n$.',
      example: {
        title: 'Check the three 30 Ω branches',
        givens: '$V_A=60\\,\\mathrm{V}$; each branch is $30\\,\\Omega$.',
        steps: [
          'Each branch: $I=60/30=2\\,\\mathrm{A}$.',
          'Three branches: $I_T=2+2+2=6\\,\\mathrm{A}$.',
          '$R_{EQ}=60/6=10\\,\\Omega$; equivalently, $30/3=10\\,\\Omega$.',
        ],
        conclusion: 'Each new equal branch adds another 2 A and lowers the equivalent resistance.',
      },
    },
  ),
  explainedPage(
    52,
    'Derive the reciprocal resistance formula',
    'For any number of parallel resistors, add the reciprocals: $1/R_{EQ}=1/R_1+1/R_2+\\cdots$.',
    'Start with KCL: $I_T=I_1+I_2+I_3+\\cdots$. Use Ohm’s law for the equivalent and for each branch: $I_T=V/R_{EQ}$ and $I_k=V/R_k$. Substituting gives $V/R_{EQ}=V/R_1+V/R_2+\\cdots$. Because the voltage $V$ is common and nonzero, divide every term by $V$ to obtain $1/R_{EQ}=1/R_1+1/R_2+\\cdots$. Then take the reciprocal of the entire sum to solve for $R_{EQ}$.',
    {
      terms: '**Reciprocal (مقلوب)** — $1/R$; the number that multiplies $R$ to make 1.  \n**Conductance** — $G=1/R$, a measure of how easily current flows.',
      cue: 'Use the reciprocal formula when there are three or more parallel resistors, or when no total current is given.',
      trap: 'Do not add the resistances themselves for parallel branches. Add $1/R$ terms, then invert the full sum.',
    },
  ),
  explainedPage(
    53,
    'Example · Two methods give 4 Ω',
    'The 20 Ω, 10 Ω, and 10 Ω branches have $R_{EQ}=4\\,\\Omega$; both reciprocal resistance and total-current methods agree.',
    'The left calculation combines the branch resistances directly. The right calculation uses a 20 V source to find the branch currents and then their total. Seeing the same answer from two methods is a useful arithmetic check.',
    {
      example: {
        title: 'Method 1: reciprocal formula',
        givens: '$R_1=20\\,\\Omega$, $R_2=10\\,\\Omega$, $R_3=10\\,\\Omega$.',
        steps: [
          '$1/R_{EQ}=1/20+1/10+1/10=0.05+0.10+0.10=0.25\\,\\Omega^{-1}$.',
          '$R_{EQ}=1/0.25=4\\,\\Omega$.',
        ],
        conclusion: 'The combined resistance is 4 Ω.',
      },
      trap: 'Invert once at the end: $R_{EQ}=1/(1/R_1+1/R_2+1/R_3)$.',
    },
  ),
  explainedPage(
    54,
    'Special shortcut · Exactly two parallel resistors',
    'For exactly two parallel resistors, $R_{EQ}=R_1R_2/(R_1+R_2)$; 40 Ω in parallel with 60 Ω gives 24 Ω.',
    'This product-over-sum rule is a shortcut derived from the reciprocal formula. Multiply the two resistances for the numerator, add them for the denominator, and divide. The result remains in ohms.',
    {
      terms: '**Product-over-sum** — multiply the two resistances, then divide by their sum.',
      example: {
        title: 'Combine 40 Ω and 60 Ω',
        givens: '$R_1=40\\,\\Omega$ and $R_2=60\\,\\Omega$.',
        steps: [
          '$R_{EQ}=(R_1R_2)/(R_1+R_2)$.',
          '$R_{EQ}=(40\\times60)/(40+60)=2400/100=24\\,\\Omega$.',
        ],
        conclusion: '24 Ω is below the smaller branch value, 40 Ω, as a parallel result should be.',
      },
      trap: 'This shortcut is only for two branch resistors. For three or more, use the reciprocal formula or combine pairs step by step.',
    },
  ),
  explainedPage(
    55,
    'Four parallel resistors · Reduce pairs, then combine again',
    'The 60 Ω, 20 Ω, 20 Ω, and 60 Ω bank reduces to 30 Ω in one pair and 10 Ω in the other, then to 7.5 Ω total.',
    'The figure groups the equal outer pair $R_1=60\\,\\Omega$ and $R_4=60\\,\\Omega$ into $R_{14}=30\\,\\Omega$. It groups the middle pair $R_2=20\\,\\Omega$ and $R_3=20\\,\\Omega$ into $R_{23}=10\\,\\Omega$. Those two equivalent branches are still parallel, so combine them once more: $R_{EQ}=(30\\times10)/(30+10)=300/40=7.5\\,\\Omega$.',
    {
      example: {
        title: 'Reduce the four-branch bank',
        givens: '$R_1=60\\,\\Omega$, $R_2=20\\,\\Omega$, $R_3=20\\,\\Omega$, $R_4=60\\,\\Omega$.',
        steps: [
          '$R_{14}=60\\parallel60=60/2=30\\,\\Omega$.',
          '$R_{23}=20\\parallel20=20/2=10\\,\\Omega$.',
          '$R_{EQ}=30\\parallel10=(30\\times10)/(30+10)=7.5\\,\\Omega$.',
        ],
        conclusion: 'The equivalent 7.5 Ω is smaller than every original branch resistance.',
      },
      trap: 'After reducing parallel pairs, the remaining equivalents are still parallel because they share the same two end nodes.',
    },
  ),
  explainedPage(
    56,
    'Open faults in parallel circuits · The affected path',
    'An open branch stops current only in that branch; an open in the main line prevents current from reaching every branch.',
    'The left diagram opens the line before the branches connect, so none of the bulbs has a complete path. The right diagram opens one bulb’s filament. That branch current becomes zero, but the other two bulb branches still connect across the 120 V source and stay lit. The total current falls because one branch no longer draws current.',
    {
      terms: '**Filament (فتيلة المصباح)** — the light-producing wire inside an incandescent lamp.',
      cue: 'Find where the break is: before the branch split affects all loads; inside one parallel branch affects that load alone.',
      trap: 'Do not apply the series-open rule to a parallel branch. One open branch does not automatically break the other paths.',
    },
  ),
  explainedPage(
    57,
    '5.6 · Total power in parallel branches',
    'Total power is the sum of branch powers and also equals source voltage times total line current: $P_T=\\sum P_k=V_TI_T$.',
    'Each branch converts part of the supplied electrical power. Add the branch powers to get total power. Since the branches share one voltage and their currents sum to $I_T$, the same total is $V_A(I_1+I_2+\\cdots)=V_AI_T$.',
    {
      terms: '**Branch power ($P_k$)** — power used by one load.  \n**Total power ($P_T$)** — the power supplied to the whole parallel bank.',
      cue: 'If you have branch powers, add them; if you have source voltage and line current, use $P_T=V_AI_T$.',
    },
  ),
  explainedPage(
    58,
    'Example · Check parallel power two ways',
    'Across 10 V, the 10 Ω branch uses 10 W and the 5 Ω branch uses 20 W; total power is 30 W.',
    'Each branch gets the same 10 V. Use $P=V^2/R$ for each one, then add. The 10 Ω branch current is 1 A and the 5 Ω branch current is 2 A, so the line current is 3 A. The source check $10\\times3$ confirms the 30 W total.',
    {
      example: {
        title: 'Calculate and check the total power',
        givens: '$V_A=10\\,\\mathrm{V}$; $R_1=10\\,\\Omega$; $R_2=5\\,\\Omega$.',
        steps: [
          '$P_1=V_A^2/R_1=10^2/10=10\\,\\mathrm{W}$.',
          '$P_2=V_A^2/R_2=10^2/5=20\\,\\mathrm{W}$.',
          '$P_T=P_1+P_2=10+20=30\\,\\mathrm{W}$.',
          'Check: $I_T=10/10+10/5=1+2=3\\,\\mathrm{A}$, so $P_T=V_AI_T=10\\times3=30\\,\\mathrm{W}$.',
        ],
        conclusion: 'The source power equals the sum of power used in the branches.',
      },
      trap: 'Use the common branch voltage across each resistor in $V^2/R$; the total current belongs in the source-level power check.',
    },
  ),
  explainedPage(
    59,
    'Parallel circuits with an unknown branch current',
    'All branches share the known branch voltage; if $I_T$ and one branch current are known, subtract to find the other branch current.',
    'There is one voltage across the two common nodes, so measuring or calculating it in one branch gives the same branch voltage for the others. For two branches, rearrange KCL: $I_2=I_T-I_1$. For more than two branches, subtract the sum of all known branch currents from $I_T$.',
    {
      cue: 'This is an efficient route when total line current is given: use KCL rather than finding every branch resistance.',
      trap: 'Subtract the sum of all known branch currents, not only one, when the circuit has three or more branches.',
    },
  ),
  explainedPage(
    60,
    'Open circuit in a parallel bank',
    'An open in one branch stops only that branch; an open in the main line stops all branches.',
    'A branch open is a break inside one path, so that branch has no current while other closed branches remain connected to the source. A main-line open interrupts the shared feed or return before current can reach any branch, so the whole bank is off.',
    {
      cue: 'Ask whether the break is before the parallel split or inside a single branch.',
      trap: 'An open in one branch does not increase the voltage across the remaining ideal branches; they remain across the source.',
    },
  ),
  explainedPage(
    61,
    'Open-circuit diagram · Bulbs in parallel',
    'With a main-line break, all three bulbs are off; with one open bulb filament, the other two stay lit and total current is smaller.',
    'The two drawings make the fault location visible. In (a), the open is on the common line before the branch bus, so no branch gets a complete supply path. In (b), bulb 1’s filament is open, but bulbs 2 and 3 still connect between the two source rails. Those two branches continue to work normally.',
    {
      cue: 'A failed load in one parallel branch usually does not turn off the other branches.',
      trap: 'The statement “all bulbs are off” belongs to the open main-line case, not to one open filament.',
    },
  ),
  explainedPage(
    62,
    'Short in a parallel circuit',
    'A zero-resistance short across a parallel bank bypasses the resistors, making their branch voltage zero while the source current becomes very large.',
    'The slide’s ideal short is a wire with zero resistance. If that wire connects the bank’s top and bottom rails, it creates a path that bypasses the resistors. The voltage between those rails is then approximately zero in the idealized circuit, so the ordinary resistor branches carry no current; most current takes the short path. Real source and wire resistance, plus protection devices, limit the actual current.',
    {
      terms: '**Bypass (يتجاوز / يلتف حول)** — a path that lets current go around a component.',
      trap: 'Do not calculate a numerical short current from this slide: it gives no source/internal resistance. “Very high” is the source’s practical description; the ideal zero-ohm model would not provide a finite current value.',
    },
  ),
  explainedPage(
    63,
    'Short-circuit diagram · The branches are bypassed',
    'The wire between points G and H shorts the two supply rails, bypassing both 20 Ω branches; the line current is very high.',
    'The normal circuit at left has a 20 V source and two 20 Ω branches. In the fault drawing, the added wire joins the upper and lower rails at the far right. Since those rails are the two ends of both resistors, the wire provides a zero-resistance route around the entire bank. The slide marks the total current as very high, but does not give source resistance or protection details needed to calculate it.',
    {
      cue: 'Follow the short wire’s two endpoints. If it connects the same two nodes as several branches, it bypasses all those branches.',
      trap: 'This is a source-terminal short across the parallel bank, not an ordinary resistor branch to be simplified using the usual finite-resistance formula.',
    },
  ),
  explainedPage(
    64,
    'Compare series and parallel circuits',
    'Series circuits share current and divide voltage; parallel circuits share voltage and divide current.',
    'Use the table as a fast contrast. **Series:** one path, same current, $R_T=\\sum R$, source voltage is divided into drops, and opening one component opens the whole path. **Parallel:** multiple branches, same voltage, $I_T=\\sum I$, equivalent resistance is below the smallest branch, and opening one branch leaves the others connected. In both cases, total power is the sum of component powers.',
    {
      cue: 'A compact memory pair: series = same current; parallel = same voltage.',
      trap: 'The series power row on the source table appears to print $P_1=P_1+P_2+\\cdots$. That left-hand side is inconsistent with the surrounding slides and should be $P_T=P_1+P_2+\\cdots$.',
      sourceNote: 'Source typo flagged: read the series total-power row as $P_T=\\sum P_k$, consistent with pages 19–20 and the parallel column.',
    },
  ),
  explainedPage(
    65,
    'Important terms · Equivalent resistance, KCL, and main line',
    'The terms recap the source-side equivalent, the current-sum law, the main supply leads, and a bank of parallel branches.',
    'Equivalent resistance is a single value representing the whole bank at the source terminals. KCL says the branch currents sum to the total. The main line is the pair of source leads that carries that total current to and from the bank. A parallel bank is simply the group of parallel-connected branches. The remaining glossary text names the reciprocal-resistance formula and reciprocals of branch resistances.',
    {
      terms: '**Equivalent resistance ($R_{EQ}$)** — one resistance that draws the same total current as the bank.  \n**KCL** — $I_T=I_1+I_2+\\cdots$.  \n**Main line** — the source leads carrying the total current.  \n**Parallel bank** — a group of branches connected in parallel.  \n**Reciprocal resistance formula** — $1/R_{EQ}=1/R_1+1/R_2+\\cdots$.',
      cue: 'When a problem uses “bank,” it means the complete set of parallel branches.',
    },
  ),
  explainedPage(
    66,
    'Related formulas · Parallel-circuit reference and lecture recap',
    'Remember the core sequence: branch current $I_k=V_A/R_k$, add currents for $I_T$, then find $R_{EQ}=V_A/I_T$ or use reciprocals.',
    'The formula sheet gathers the tools from Chapter 5:\n\n- Branch current: $I_k=V_A/R_k$.\n- Total current: $I_T=I_1+I_2+\\cdots$.\n- Equivalent resistance from source values: $R_{EQ}=V_A/I_T$.\n- General parallel-resistance rule: $R_{EQ}=1/(1/R_1+1/R_2+\\cdots)$.\n- For $n$ equal branches of resistance $R$: $R_{EQ}=R/n$.\n- For exactly two branches: $R_{EQ}=R_1R_2/(R_1+R_2)$.\n- If one known $R$ is in parallel with unknown $R_x$: $R_x=R R_{EQ}/(R-R_{EQ})$.\n- Conductance adds: $G_T=G_1+G_2+\\cdots$, where $G=1/R$.\n- Total power: $P_T=P_1+P_2+\\cdots$.\n\nThe two chapters together reduce to this contrast: series has one path, same current, and added resistance; parallel has shared voltage, added currents, and a lower equivalent resistance.',
    {
      terms: '**Conductance ($G$)** — reciprocal of resistance, $G=1/R$; conductances add in parallel.',
      trap: 'The product-over-sum formula is only for two resistors. The equal-branch shortcut $R/n$ applies only when every branch has the same resistance.',
      recap: '**Series:** $I$ is the same; $R_T$ and voltage drops add; an open stops the whole loop.  \n**Parallel:** $V$ is the same; branch currents and powers add; an open branch leaves other paths working; $R_{EQ}$ is less than the smallest branch.',
    },
  ),
  visualPage(
    67,
    'End slide · Thank you',
    'This is the closing slide. The formula recap is on source page 66.',
  ),
];

export const electronicsLecture2Lesson: Lesson = {
  id: 'electronics-lecture-2',
  courseId: 'electronics',
  sourceKey: 'archive:electronics:lecture/Lec_2 elec.pdf',
  sourcePath: 'Electronics/lecture/Lec_2 elec.pdf',
  title: 'Lecture 2: Series and Parallel Circuits',
  sourcePageCount: 67,
  pages,
  lastReviewed: '2026-10-14',
};
