import type { Lesson, LessonPage } from '../types';

interface TeachingNotes {
  recognition?: string;
  trap?: string;
  analogy?: string;
  note?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  walkthrough: string,
  terms?: string,
  teaching?: TeachingNotes,
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (terms) blocks.push({ type: 'recognition', title: 'Key words and symbols', markdown: terms });
  if (teaching?.recognition) {
    blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: teaching.recognition });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: walkthrough });
  if (teaching?.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: teaching.trap });
  }
  if (teaching?.analogy) {
    blocks.push({ type: 'alternate', title: 'A quick mental picture', markdown: teaching.analogy });
  }
  return {
    sourcePage,
    title,
    coverage: 'explained',
    blocks,
    ...(teaching?.note ? { note: teaching.note } : {}),
  };
}

const pages: LessonPage[] = [
  explainedPage(
    1,
    'Slides 1–2 · Chapter 1 roadmap and powers of ten',
    'The first slide maps the chapter; the second reminds you how powers of ten represent large and small values. A positive exponent counts powers above 1, while a negative exponent represents a fraction of 1.',
    'The roadmap names six sections: basic concepts; voltage and potential difference; current; resistance and conductance; the closed circuit; and the difference between voltage and current. The second slide labels 10^x: 10 is the base and x is the exponent. Read the table as examples: 10^3 = 1,000, 10^0 = 1, and 10^-3 = 0.001. Each step upward in a positive exponent multiplies by 10; each step farther below zero divides by 10. The table runs from 10^9 down to 10^2, includes 10^1 and 10^0, then lists small values from 10^-1 through 10^-12.',
    '**Base** — the number being repeatedly multiplied; here it is 10.  \n**Exponent** — how many factors of the base are represented; a negative exponent means a reciprocal.',
    {
      recognition: 'If a decimal value is written with a power of ten, use the exponent to track how many places separate it from 1. For example, 10^-6 means 1 divided by 1,000,000.',
      note: 'The source footer is dated 9/25/2025. This lesson follows the supplied file in the current Moodle folder.',
    },
  ),
  explainedPage(
    2,
    'Slides 3–4 · Metric prefixes and electrical quantities',
    'A metric prefix tells you the power-of-ten scale attached to a unit. The second slide pairs electrical quantities with their standard unit names and symbols.',
    'The prefix table gives tera (T) = 10^12, giga (G) = 10^9, mega (M) = 10^6, kilo (k) = 10^3, milli (m) = 10^-3, micro (μ) = 10^-6, nano (n) = 10^-9, and pico (p) = 10^-12. Keep the prefix symbol’s letter case: M is mega, while m is milli. For example, 1 kΩ means 1,000 ohms; 1 mA means 0.001 ampere.\n\nThe electrical-quantity table lists current in amperes (A), symbol I; voltage in volts (V), symbol V; resistance in ohms (Ω), symbol R; frequency in hertz (Hz), symbol f; capacitance in farads (F), symbol C; inductance in henries (H), symbol L; and power in watts (W), symbol P. The smaller SI table also shows meter (m), kilogram (kg), second (s), ampere (A), kelvin (K), and candela (cd) as base units.',
    '**Quantity** — what is being measured, such as current or resistance.  \n**Unit** — the standard scale used to report that measurement.  \n**Symbol** — the short letter used in formulas or circuit diagrams.',
    {
      recognition: 'When you see a prefix, replace it with its power of ten before calculating. Convert to compatible units before dividing or multiplying electrical values.',
      trap: 'Do not confuse uppercase M (mega, one million) with lowercase m (milli, one thousandth).',
    },
  ),
  explainedPage(
    3,
    'Slides 5–6 · Charge, protons, electrons, and atomic structure',
    'Electric charge is a property of particles. Electrons are negative and protons are positive; in a neutral atom, their counts are equal.',
    'The first slide introduces the electron and proton as basic charge-carrying particles and illustrates a battery lighting a lamp. The next slide uses a Bohr-style picture: protons and neutrons are in the nucleus, and negatively charged electrons are shown in separate shells around it. The atomic number is the number of protons and identifies the element. A neutral atom has the same number of electrons as protons. The carbon picture labels 6 protons and 6 neutrons, with six electrons; the other pictures illustrate discrete energy levels around a nucleus. They are visual models for structure, not a scale drawing of an atom.',
    '**Electron** — a negatively charged particle.  \n**Proton** — a positively charged particle in the nucleus.  \n**Neutron** — an uncharged particle in the nucleus.  \n**Nucleus** — the central part of the atom.',
    {
      recognition: 'For a neutral atom, compare proton and electron counts: they must match. If they differ, the atom has a net charge.',
      analogy: 'As a mental picture, imagine the nucleus as the center and electron shells as allowed rings around it. The rings help organize the drawing; they are not literal planet-like paths.',
    },
  ),
  explainedPage(
    4,
    'Slides 7–8 · The atom and its energy levels',
    'The source uses hydrogen and carbon diagrams to show a nucleus with electrons outside it, then illustrates that electrons occupy distinct energy levels.',
    'The hydrogen figure labels one proton in the nucleus and one electron in orbit. The accompanying text says a proton is about 1,840 times heavier than an electron. The carbon picture labels a nucleus containing 6 protons and 6 neutrons, with six electrons arranged in shells. The adjacent energy-level sketches label the nucleus and levels around it; their purpose here is to show discrete levels and increasing distance from the nucleus. Use the source diagrams to identify the parts, not as exact-to-scale pictures.',
    '**Hydrogen (H)** — the pictured atom has one proton and one electron.  \n**Carbon** — the pictured nucleus has six protons and six neutrons.  \n**Energy level / shell** — one of the allowed levels represented around the nucleus.',
    {
      recognition: 'When reading an atom diagram, first find the nucleus, then distinguish the positively charged protons from the negatively charged electrons outside it.',
    },
  ),
  explainedPage(
    5,
    'Slides 9–10 · Electric charge and charge in motion',
    'Charge is measured in coulombs, and one electron carries a charge of −1.602 × 10^-19 C. Current appears when charge moves through a conducting path.',
    'The slide calls charge the basic quantity behind electrical effects and gives the electron charge as −1.602 × 10^-19 coulomb (C). The magnitude is 1.602 × 10^-19 C; the minus sign records the electron’s negative polarity. Charges found in nature are described as integral multiples of this elementary charge. The battery-and-lamp picture introduces a closed path. In the text and wire diagram, a battery creates a potential difference that makes mobile charges move. Electrons move one way while positive-charge motion is taken in the opposite direction; conventional current is defined in the positive-charge direction.',
    '**Coulomb (C)** — the unit of electric charge.  \n**Elementary charge magnitude** — 1.602 × 10^-19 C.  \n**Conventional current** — the reference direction defined as positive-charge motion.',
    {
      recognition: 'If a question asks for the charge sign of an electron, keep the minus sign. If it asks only for the magnitude, report the positive size.',
      trap: 'Do not confuse electron-flow direction with conventional-current direction; the source defines them as opposite.',
    },
  ),
  explainedPage(
    6,
    'Slides 11–12 · Current, current graphs, and electron count',
    'Current is the rate at which charge passes a point: i = dq/dt, measured in amperes. One ampere equals one coulomb per second.',
    'The slide defines electric current as the rate of charge flow and writes $i = \\frac{dq}{dt}$. Here $q$ is charge in coulombs, $t$ is time in seconds, and $i$ is current in amperes (A). For a constant rate, the same relationship is written $I = \\frac{Q}{T}$. Since 1 C/s = 1 A, one ampere means one coulomb passes the point each second. The graphs contrast a steady positive DC current with a sinusoidal AC current that changes with time and crosses zero.\n\nThe example asks for the charge represented by 4,600 electrons. Multiply the signed charge of one electron by the count:\n1. $(-1.602 \\times 10^{-19}\\,\\mathrm{C/electron})(4{,}600\\,\\mathrm{electrons})$\n2. $= -7.3692 \\times 10^{-16}\\,\\mathrm{C}$\n3. Rounded as on the slide: $-7.369 \\times 10^{-16}\\,\\mathrm{C}$.',
    '**Rate** — amount transferred per unit time.  \n**$q$ or $Q$** — charge; **$t$ or $T$** — time; **$i$ or $I$** — current. Lowercase often labels a changing instantaneous value; uppercase may label a fixed or total value.  \n**DC** — current with a steady direction; **AC** — current that varies sinusoidally in the pictured example.',
    {
      recognition: 'If the problem gives charge and elapsed time, divide charge by time. If it gives a number of electrons, multiply that count by the signed charge per electron first.',
    },
  ),
  explainedPage(
    7,
    'Slides 13–14 · Potential and separated charge',
    'Potential difference describes energy available per charge because work was done to separate charges. The diagrams show that different separations require different amounts of work.',
    'The slide introduces potential as the possibility of doing work. Opposite charges attract, so separating electrons and protons requires work and leaves the separated charges with the ability to do work as they move back toward a neutral arrangement. The electric field is the region associated with the forces between charges. The bottom sequence of diagrams compares charge separations and shows that the work needed to move a charge depends on the potential difference between the two points. The second slide is the chapter roadmap with sections 1.1 and 1.2 highlighted; it marks the transition from basic concepts to voltage. The following page turns that idea into the volt formula.',
    '**Work / energy ($W$)** — energy transferred, measured in joules (J).  \n**Potential difference (PD)** — the difference in electric potential between two points.  \n**Electric field** — the region in which electric charges exert forces on one another.',
    {
      recognition: 'When you see “between two points,” think potential difference. A voltage measurement always compares locations; it is not a property measured at only one point.',
    },
  ),
  explainedPage(
    8,
    'Slides 15–16 · The volt and a worked voltage calculation',
    'One volt is one joule of energy per coulomb of charge: V = W/Q. Divide energy by charge to find the potential difference.',
    'The slide defines the volt and gives $V = \\frac{W}{Q}$, where $V$ is voltage in volts, $W$ is work or energy in joules, and $Q$ is charge in coulombs.\n\nThe example gives 3.6 J and 0.5 C:\n1. Choose $V = W/Q$ because energy and charge are known.\n2. Substitute: $V = 3.6\\,\\mathrm{J} / 0.5\\,\\mathrm{C}$.\n3. Divide: $V = 7.2\\,\\mathrm{J/C} = 7.2\\,\\mathrm{V}$.',
    '**Volt (V)** — one joule per coulomb.  \n**Joule (J)** — the unit of work or energy.  \n**Coulomb (C)** — the unit of charge.',
    {
      recognition: 'If the question gives work or energy and charge, use $V=W/Q$. Check that the answer unit reduces to J/C, which is a volt.',
      trap: 'Keep the order as energy divided by charge. Reversing the ratio gives C/J, not volts.',
    },
  ),
  explainedPage(
    9,
    'Slides 17–18 · DC and AC voltage; chapter roadmap',
    'A constant voltage is called DC voltage; a sinusoidally time-varying voltage is AC voltage. The slide associates a battery with DC and an electric generator with AC.',
    'The first slide compares voltage types: a constant voltage is represented by $V$ and called DC voltage; a sinusoidal time-varying voltage is represented by $v$ and called AC voltage. Its examples are a battery for DC and an electric generator for AC. The different capitalization in this slide is a notation choice in the source; read the graph to see whether voltage is constant or changes with time. The second slide is the chapter roadmap through section 1.3, “Charge in Motion Is Current.”',
    '**DC voltage** — fixed polarity in the source example.  \n**AC voltage** — sinusoidally changing voltage in the source example.  \n**$V$ / $v$** — voltage symbols used on these slides.',
    {
      recognition: 'A flat voltage-versus-time line indicates constant DC in this slide; a sinusoid that alternates above and below zero indicates AC.',
    },
  ),
  explainedPage(
    10,
    'Slides 19–20 · Electron drift and the ampere',
    'A potential difference can move free electrons through a conductor. Current measures how much charge crosses a point each second: I = Q/T.',
    'The wire diagram shows free electrons drifting through copper from the negatively charged end toward the positive end when a voltage is applied. This is electron flow; conventional current is in the opposite direction. The next slide defines the ampere as the unit of current and relates current to charge and time with $I = Q/T$. Here $Q$ is the charge passing a point and $T$ is the elapsed time. It also gives the electron-count equivalent: about $6.25 \\times 10^{18}$ electrons passing each second make 1 A.',
    '**Free electron** — an electron in a conductor that can move relatively easily.  \n**Ampere (A)** — one coulomb of charge per second.  \n**$I$** — current; **$Q$** — charge; **$T$** — time.',
    {
      recognition: 'If a problem says “charge passes every second,” convert that rate directly to amperes: coulombs per second equals amperes.',
      trap: 'Electron drift points from the negative terminal toward the positive terminal outside the battery; the conventional-current arrow points the other way.',
    },
  ),
  explainedPage(
    11,
    'Slides 21–22 · Current example and current in a conductor',
    'For a steady flow of 12 C each second, the current is 12 A. In a metal wire, electrons are the moving charges, while conventional current is defined in the opposite direction.',
    'Example 1–6 says 12 C passes a point every second. Use $I=Q/T$:\n1. $Q=12\\,\\mathrm{C}$ and $T=1\\,\\mathrm{s}$.\n2. $I = 12\\,\\mathrm{C}/1\\,\\mathrm{s}$.\n3. $I=12\\,\\mathrm{A}$.\n\nThe second slide explains that free electrons in a metal provide the moving charge. The electron drift is from the negative side toward the positive side, but conventional current is the positive-charge reference direction, opposite to electron motion. Current is still defined by charge transferred per time, regardless of whether the moving charges are electrons or positive ions.',
    '**Current intensity** — another phrase on the example slide for the rate of charge flow.  \n**Electron flow** — motion of negatively charged electrons.  \n**Conventional current** — the opposite reference direction used in circuit diagrams.',
    {
      recognition: 'When charge is given “per second,” the time is already 1 s. Keep the C/s units visible until the last step so the result becomes amperes.',
    },
  ),
  explainedPage(
    12,
    'Slides 23–24 · Resistance opposes current',
    'Resistance limits current. In the lecture’s copper-versus-carbon comparison, the same applied voltage produces less current in the material with higher resistance.',
    'The first slide is the chapter roadmap through section 1.4, “Resistance & Conductance.” The second slide uses heating in a current-carrying wire as evidence that the applied voltage does work against opposition. That opposition is called resistance. It says conductors have relatively little resistance and insulators have much more. The comparison then describes copper as having many mobile electrons and low resistance, while carbon has fewer mobile electrons and higher resistance. At the same voltage, fewer charges flow through the higher-resistance carbon; increasing the voltage can produce the same current but requires more work and produces more heat. This is the source’s introductory comparison of those materials.',
    '**Resistance ($R$)** — opposition that limits current.  \n**Conductor** — material through which charge can move relatively easily.  \n**Insulator** — material with much greater opposition to charge flow.',
    {
      recognition: 'For a fixed applied voltage, less current means greater resistance. The relation is made quantitative later by Ohm’s law.',
      analogy: 'As a mental picture, resistance is like a narrower passage that lets less flow through for the same push. This is only an analogy; electrical resistance is quantified in ohms.',
    },
  ),
  explainedPage(
    13,
    'Slides 25–26 · Ohms, resistor symbols, and resistor types',
    'Resistance is measured in ohms (Ω) and represented by R. The slide also shows physical resistors and their circuit symbol.',
    'The practical unit of resistance is the ohm, symbol Ω; the quantity is represented by R. The slide gives a historical heat-based description: a resistance that develops 0.24 calorie when 1 A flows through it for 1 second has a resistance of 1 Ω. Its diagram shows a physical wire-wound resistor and the zigzag resistor symbol used in a circuit. The next slide shows a carbon-composition resistor, a resistor mounted on a printed-circuit board, and several physical resistor examples. These are different appearances of components that provide resistance.',
    '**Ohm (Ω)** — unit of resistance.  \n**$R$** — resistance quantity or resistor label in a circuit.  \n**Resistor** — a component used to provide resistance.',
    {
      recognition: 'A zigzag component marked R in the circuit diagram represents resistance; read Ω as the unit, not as a second variable.',
    },
  ),
  explainedPage(
    14,
    'Slides 27–28 · Resistor color bands and conductance',
    'The first two resistor bands encode digits, the third is a decimal multiplier, and the fourth is tolerance. Conductance G is the reciprocal of resistance.',
    'The color-band diagram labels band A as the first digit, band B as the second digit, band C as the decimal multiplier, and band D as tolerance. The table maps colors to digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, and white 9. Gold indicates 5% tolerance and silver 10%. Read bands in the labeled order; the diagram does not provide a worked resistor value to decode.\n\nThe next slide defines conductance as the opposite measure to resistance. It uses G and siemens (S), and notes the older unit name mho. The equations are $G=1/R$ and $R=1/G$. Thus a smaller resistance corresponds to a larger conductance.',
    '**Tolerance** — the allowed percentage variation from a resistor’s stated value.  \n**Conductance ($G$)** — reciprocal of resistance, measured in siemens (S).  \n**Multiplier** — the factor applied after reading the first two color digits.',
    {
      recognition: 'When reading the bands, identify the tolerance band separately, then read the two digits and multiplier in order. For conductance and resistance, use reciprocal formulas.',
      trap: 'Do not treat the fourth tolerance band as a third digit; it describes the permitted variation.',
    },
  ),
  explainedPage(
    15,
    'Slides 29–30 · Conductance examples and closed-circuit section roadmap',
    'To convert conductance to resistance, take its reciprocal: R = 1/G. The second slide is a roadmap marking the closed-circuit section.',
    'Example 1–8 asks for resistance at two conductance values:\n1. For $G=0.05\\,\\mathrm{S}$, $R=1/G=1/0.05=20\\,\\Omega$.\n2. For $G=0.1\\,\\mathrm{S}$, $R=1/G=1/0.1=10\\,\\Omega$.\nThe slide notes that higher conductance corresponds to lower resistance.\n\nThe second slide is the chapter roadmap, now highlighting section 1.5, “The Closed Circuit.” The next page begins that section with a battery-and-lamp loop and a simplified circuit labelled with a 1.5 V source and 300 Ω load.',
    '**Siemens (S)** — unit of conductance.  \n**Reciprocal** — 1 divided by the quantity; here $R=1/G$.  \n**Load** — the component connected to the source that receives electrical energy.',
    {
      recognition: 'If conductance is given in siemens and resistance is requested, use $R=1/G$. Check that a larger G gives a smaller R.',
    },
  ),
  explainedPage(
    16,
    'Slides 31–32 · The three requirements for a closed circuit',
    'A working circuit needs a voltage source, a complete conducting path, and resistance in that path. If any part of the loop is open, current cannot flow.',
    'The slide lists three circuit characteristics:\n1. A source of potential difference is needed; without applied voltage, current cannot flow.\n2. There must be a complete path from one side of the source through the external circuit and back to the other side.\n3. The path must contain resistance, which can produce heat or limit how much current flows.\n\nThe prior slide’s battery-and-lamp picture shows these pieces together: source, connecting path, and load. The simplified diagram labels the source voltage as 1.5 V, the load resistance as 300 Ω, and current around the closed loop.',
    '**Voltage source** — maintains a potential difference between its terminals.  \n**Closed path** — an unbroken conducting route returning to the source.  \n**Load resistance** — resistance in the external circuit.',
    {
      recognition: 'When checking a circuit diagram, trace a complete loop from one source terminal through the load and back. A visible gap means the path is not closed.',
    },
  ),
  explainedPage(
    17,
    'Slides 33–34 · Voltage and current are different circuit quantities',
    'Current is charge moving through a circuit; voltage is the potential difference across two points. The battery’s 1.5 V and 300 Ω load are shown as a closed loop.',
    'The first slide is a roadmap marking section 1.6. The next slide states that current moves through the circuit, while potential difference does not move around the path. In the lamp example, voltage across the filament resistance makes electrons flow, while current flows around the complete circuit. The diagram labels a voltage source $V=1.5\\,\\mathrm{V}$ and a resistance load $R=300\\,\\Omega$; the arrows distinguish voltage across a component from current along the loop.',
    '**Voltage ($V$)** — potential difference between two points.  \n**Current ($I$)** — rate of charge flow through a point or branch.  \n**Across** — measured between the two ends of a component.',
    {
      recognition: 'If the diagram shows a quantity across both ends of a component, think voltage. If an arrow follows the path through the component, think current.',
      trap: 'Do not say that voltage flows through the wire. Charge flows as current; voltage is a difference measured between two points.',
    },
  ),
  explainedPage(
    18,
    'Slides 35–36 · Measuring voltage and current; open-path example',
    'A voltmeter connects across a component; an ammeter must be inserted into the current path. A battery can still have voltage when the circuit is open and current is zero.',
    'The first slide compares voltage across a resistor with current through it. To measure potential difference, connect the two voltmeter leads to the two ends of the resistor. To measure current, open the path and insert the current meter so the circuit is completed through the meter. The diagram labels current through R and voltage across R.\n\nThe second slide explains “across”: voltage is a difference between two points, while current can be described at a point as charge passing through. If the bulb is disconnected, there is no closed path, so no current flows. The battery can still have 1.5 V between its terminals. The slide’s conclusion is that voltage can exist without current, but current cannot exist without voltage.',
    '**Voltmeter** — measures voltage between two points.  \n**Ammeter / current meter** — measures current in a path.  \n**Open path** — broken circuit with no complete conducting loop.',
    {
      recognition: 'Voltage measurement: place the leads across the component. Current measurement: break the path and place the meter in series so the current passes through it.',
      trap: 'Do not put the ammeter across a component as if it were a voltmeter; this slide specifically shows the current meter inserted into the path.',
    },
  ),
  explainedPage(
    19,
    'Slides 37–38 · How the source sustains current; source and load',
    'A battery maintains its terminal potential difference through internal chemical action. The source supplies energy, and the load receives that energy; lower load resistance corresponds to higher current in the slide’s comparison.',
    'The first slide explains that electrons leave the battery’s negative terminal and return to its positive terminal through the conductor. As charge moves, the terminal charges would tend to neutralize. Chemical action inside the battery continually separates charge again, maintaining the potential difference that drives current.\n\nThe second slide calls the battery the source and the connected bulb filament the load resistance. Electrical energy carried by the current is used in the filament to produce heat. It calls the current through the load the load current and states that, in this comparison, a lower resistance in ohms corresponds to a higher load current. A heavy or big load is described as drawing high current and receiving more work from the source.',
    '**Source** — the battery in the example, which maintains voltage and supplies energy.  \n**Load resistance** — the part connected to the source that uses electrical energy.  \n**Load current** — the current flowing through that load.',
    {
      recognition: 'When you see a circuit divided into source and load, identify which part provides energy and which part receives it.',
    },
  ),
  explainedPage(
    20,
    'Slides 39–40 · Open circuits, short circuits, and current direction',
    'An open circuit has a broken path and no current; a short circuit provides a very low-resistance bypass and can create excessive current. Current direction depends on whether the diagram tracks electrons or conventional current.',
    'The first slide defines an open circuit as a path with a break, so there is no conducting route and no current. It treats an open circuit as having infinitely high resistance. A short circuit is a closed path around the source with practically zero resistance; the result can be too much current. The example bypasses a bulb, so current goes through the connecting wires instead of the bulb. The slide notes that wires can become hot and a fuse can protect the line.\n\nThe current-direction figure then shows four cases: electron flow and conventional current, each with one source polarity and with the polarity reversed. Electron-flow arrows and conventional-current arrows point in opposite directions. Reversing the source polarity reverses the current direction in the pictured circuit.',
    '**Open circuit** — broken path, effectively infinite resistance, no current.  \n**Short circuit** — a very low-resistance path that bypasses the intended load.  \n**Polarity** — which source terminal is positive and which is negative.',
    {
      recognition: 'Look for a gap to identify an open circuit. Look for a wire path bypassing the load to identify a short circuit.',
      trap: 'A short circuit is not a normal low-resistance load: the slide warns that it can allow excessive current and overheat connecting wires.',
    },
  ),
  explainedPage(
    21,
    'Slides 41–42 · Electron flow and conventional current',
    'In the external circuit, electrons move from the negative side toward the positive side. Conventional current is defined in the opposite direction, from positive toward negative.',
    'The electron-flow slide traces electrons leaving the negative terminal, moving through the external circuit, and returning to the positive terminal. Inside the battery, chemical action moves electrons toward the negative terminal and separates charge to maintain the terminal voltage. The following slide names the opposite positive-charge reference direction conventional current. Its diagrams show that the circuit works with either arrow convention as long as the chosen convention is used consistently.',
    '**Electron flow** — direction of negative-charge motion.  \n**Conventional current** — positive-charge reference direction used in circuit analysis.  \n**External circuit** — the conducting path outside the battery or source.',
    {
      recognition: 'First identify which convention a diagram is using. The electron-flow arrow points from negative to positive outside the source; conventional current points from positive to negative.',
      trap: 'Do not combine an electron-flow arrow on one part of a calculation with conventional-current direction on another without accounting for the reversal.',
    },
  ),
  explainedPage(
    22,
    'Slides 43–44 · Direct current and alternating current',
    'DC keeps the same polarity in the source graph; AC reverses polarity and varies sinusoidally in the pictured graph. The table compares the source’s listed DC and AC voltage properties.',
    'The graphs show DC voltage as a steady positive level over time and AC voltage as a sine wave alternating above and below zero. The comparison table says DC voltage has fixed polarity, can be steady or vary in magnitude, cannot be stepped up or down by a transformer, is used as a terminal voltage for transistor amplifiers, and is easier to measure. It says AC voltage reverses polarity, varies in magnitude and polarity, can be stepped up or down by a transformer, and is a signal input/output for amplifiers. The table says the heating effect is the same for direct or alternating current.',
    '**Polarity** — the positive/negative orientation of a voltage source.  \n**Time axis** — the horizontal axis in the graphs.  \n**Sinusoidal** — changing in the smooth wave shape shown for AC.',
    {
      recognition: 'If the graph crosses zero and alternates positive/negative, identify the source example as AC. A fixed positive line is the DC example.',
      note: 'The comparison is transcribed from the supplied slide; use the circuit-specific details given in later course material when applying these broad descriptions.',
    },
  ),
  explainedPage(
    23,
    'Slides 45–46 · Digital multimeter and electrical characteristics',
    'The slide introduces a digital multimeter. Its table summarizes charge, current, voltage, resistance, and conductance.',
    'The first slide introduces a digital multimeter and shows an example device. The next slide gives an electrical-characteristics table:\n\n- Charge: Q or q, coulomb (C), with $Q=I\\times T$.\n- Current: I or i, ampere (A), with $I=Q/T$.\n- Voltage: V or v, volt (V), potential difference between two points that makes charge move to produce current.\n- Resistance: R or r, ohm (Ω), opposition that reduces current; $R=1/G$.\n- Conductance: G or g, siemens (S), reciprocal of resistance; $G=1/R$.\n\nThe two charge/current equations express the same relation rearranged: multiply current by time to get charge, or divide charge by time to get current.',
    '**Digital multimeter (DMM)** — instrument pictured measuring several electrical quantities.  \n**$Q=I T$** and **$I=Q/T$** — charge and current relationships for the table.  \n**$G$** — conductance, reciprocal of resistance.',
  ),
  explainedPage(
    24,
    'Slides 47–48 · Multimeter measurement setups and chapter outline',
    'The meter diagrams distinguish measuring voltage, current, and resistance. The second slide highlights the Ohm’s Law chapter and shows a reference-book cover.',
    'The first slide labels three digital-multimeter setups: (a) measuring voltage, (b) measuring current, and (c) measuring resistance. Voltage is measured across two points, current by placing the meter in the current path, and resistance across the component as shown. The second slide highlights Chapter 03, Ohm’s Law, among later topics such as series circuits, parallel circuits, network theorems, capacitance, inductance, diodes, transistors, and operational amplifiers. The book cover shown is Grob’s Basic Electronics, 13th Edition, by Mitchell E. Schultz. This is a reference image; the slide does not assign specific textbook pages.',
    '**Chapter outline** — roadmap of topics shown on the slide.  \n**Reference image** — Grob’s Basic Electronics, 13th Edition.',
    {
      recognition: 'Voltage: connect across two points. Current: put the meter in the path. Resistance: measure across the component.',
      trap: 'Do not use one meter connection for all three quantities; the slide shows separate setups.',
    },
  ),
  explainedPage(
    25,
    'Slides 49–50 · Ohm’s Law chapter roadmap',
    'These two slides introduce Chapter 3 and highlight its first section, Ohm’s Law. The following slides present the relationship and examples.',
    'Both slides are the Chapter 3 roadmap: slide 49 introduces Ohm’s Law, electric power, power dissipation in resistance, and power formulas; slide 50 highlights section 2.1, Ohm’s Law. The next page states the relationship and works the first current example.',
  ),
  explainedPage(
    26,
    'Slides 51–52 · Ohm’s Law and changing the applied voltage',
    'Ohm’s law is I = V/R: current rises with voltage when resistance is fixed and falls as resistance rises for fixed voltage. The bulb sequence shows the fixed-load voltage pattern.',
    'The first slide states that current is directly proportional to voltage and inversely proportional to resistance, then gives $I=V/R$. Its “high voltage but low current” example calculates $1{,}000\\,\\mathrm{V}/1{,}000{,}000\\,\\Omega=0.001\\,\\mathrm{A}$. The practical point is that voltage and resistance both determine the current.\n\nThe second slide shows a selector applying 2, 4, 6, 8, 10, or 12 V to a lamp circuit with an ammeter. The caption says increasing the applied voltage produces more current and lights the bulb more intensely. This is the fixed-load pattern described by Ohm’s law.',
    '**$V$** — applied voltage.  \n**$I$** — circuit current.  \n**$R$** — load resistance, held the same for the voltage comparison.',
    {
      recognition: 'When a figure changes only the voltage setting while leaving the load the same, expect the current to rise with voltage.',
    },
  ),
  explainedPage(
    27,
    'Slides 53–54 · Circuit values and low voltage with high current',
    'For the shown 6 V source and 3 Ω load, current is 2 A. A very small resistance can allow a large current even when voltage is low.',
    'The circuit example labels a 6 V battery, a 3 Ω resistance, and $I=V/R=2\\,\\mathrm{A}$. It also labels the same 6 V across the load, consistent with the source connected directly across it.\n\nThe next slide gives a 6 V battery across 0.01 Ω:\n1. Use $I=V/R$.\n2. Substitute $I=6\\,\\mathrm{V}/0.01\\,\\Omega$.\n3. Divide to get $I=600\\,\\mathrm{A}$.\nThis illustrates the heading “Low Voltage but High Current.”',
    '**Given values** — the source voltage $V$ and load resistance $R$.  \n**Current** — solve using $I=V/R$.  \n**Small resistance** — a small denominator can make the calculated current large.',
    {
      recognition: 'If voltage is low but resistance is extremely small, calculate the ratio before assuming current is also small.',
      trap: 'For 0.01 Ω, do not drop the zeros or read it as 0.1 Ω; $6/0.01=600$, not 60.',
    },
  ),
  explainedPage(
    28,
    'Slides 55–56 · Ohm’s Law examples and V = IR',
    'Rearrange Ohm’s law to find whichever value is missing. The heater draws 15 A; in the circuit diagram 2 A through 3 Ω corresponds to 6 V.',
    'Example 3–1 gives an 8 Ω heater on 120 V:\n1. Use $I=V/R$ because current is requested.\n2. $I=120\\,\\mathrm{V}/8\\,\\Omega$.\n3. $I=15\\,\\mathrm{A}$.\n\nThe next slide rearranges the same relationship to $V=IR$. In its diagram, $I=2\\,\\mathrm{A}$ and $R=3\\,\\Omega$, so $V=(2\\,\\mathrm{A})(3\\,\\Omega)=6\\,\\mathrm{V}$. The load is directly across the 6 V source, so the resistor voltage equals the source voltage in this example.',
    '**$I=V/R$** — use when current is unknown.  \n**$V=IR$** — use when voltage is unknown.  \n**Ohm (Ω)** — volts per ampere for resistance.',
    {
      recognition: 'Circle the unknown first: current uses V/R; voltage uses I×R; resistance uses V/I.',
      trap: 'Do not multiply voltage by resistance to find current. Current is voltage divided by resistance.',
    },
  ),
  explainedPage(
    29,
    'Slides 57–58 · Find voltage and express resistance as V/I',
    'Use V = IR to find voltage. The worked example gives 30 V; the next slide states resistance as R = V/I.',
    'Example 3–3 gives $R=12\\,\\mathrm{\\Omega}$ and $I=2.5\\,\\mathrm{A}$:\n1. Choose $V=IR$.\n2. $V=(2.5\\,\\mathrm{A})(12\\,\\mathrm{\\Omega})$.\n3. $V=30\\,\\mathrm{V}$.\n\nThe adjacent slide states $R=V/I$ and shows a 12 V source, 4 Ω load, and 3 A current; the labeled values satisfy $12/4=3$.',
    '**Voltage ($V$)** — measured in volts.  \n**Current ($I$)** — measured in amperes.  \n**Resistance ($R$)** — measured in ohms.',
    {
      recognition: 'If current and resistance are known, multiply them to find voltage. If voltage and current are known, divide V by I to find resistance.',
    },
  ),
  explainedPage(
    30,
    'Slides 59–60 · Finding resistance and current with prefixes',
    'A 12 V lamp drawing 0.16 A has 75 Ω resistance; 60 V across 12 kΩ produces 5 mA.',
    'Example 3–4 gives 12 V and 0.16 A:\n1. Use $R=V/I$.\n2. $R=12\\,\\mathrm{V}/0.16\\,\\mathrm{A}=75\\,\\Omega$.\n\nExample 3–6 gives 60 V across 12 kΩ:\n1. Convert $12\\,\\mathrm{k}\\Omega$ to $12{,}000\\,\\Omega=12\\times10^3\\,\\Omega$.\n2. Use $I=V/R$: $I=60/(12\\times10^3)\\,\\mathrm{A}$.\n3. $I=5\\times10^{-3}\\,\\mathrm{A}=5\\,\\mathrm{mA}$.\nThe slide notes that volts across kilohms produces milliamperes, and volts across megohms produces microamperes.',
    '**kilo (k)** — multiply by 1,000.  \n**milli (m)** — multiply by 0.001.  \n**$1\\,\\mathrm{k}\\Omega=1{,}000\\,\\Omega$** and **$1\\,\\mathrm{mA}=0.001\\,\\mathrm{A}$.**',
    {
      recognition: 'When V is in volts and R is in kilohms, the numerical current often comes out in milliamperes; still convert or check the units explicitly.',
      trap: 'Do not report 5×10^-3 A as 5 A. It is 0.005 A, which equals 5 mA.',
    },
  ),
  explainedPage(
    31,
    'Slides 61–62 · Practical electrical units and prefix conversions',
    'Ohm’s law defines the practical relationships among amperes, volts, and ohms. The tables show common metric-prefix conversions and the units behind electrical quantities.',
    'Slide 61 states the practical unit relationships from Ohm’s law: $1\\,\\mathrm{A}=1\\,\\mathrm{V}/1\\,\\Omega$, $1\\,\\mathrm{V}=1\\,\\mathrm{A}\\times1\\,\\Omega$, and $1\\,\\Omega=1\\,\\mathrm{V}/1\\,\\mathrm{A}$. It explains these as the current, voltage, and opposition in a one-ohm circuit.\n\nSlide 62 gives the conversion-factor table: mega M = 10^6, kilo k = 10^3, milli m = 10^-3, and micro μ = 10^-6. Examples include 5 MΩ = 5,000,000 Ω, 18 kV = 18,000 V, 48 mA = 0.048 A, and 15 μV = 0.000015 V. Its practical-units table also equates one ampere with 6.25 × 10^18 electrons per second and one coulomb per second; one volt with one joule per coulomb; one watt with one joule per second; one ohm with one volt per ampere; and one siemens with one ampere per volt.',
    '**Practical-unit relationships** — the ampere, volt, and ohm can each be expressed using the other two.  \n**Prefix** — a power-of-ten factor attached to a unit.',
    {
      recognition: 'Convert by replacing the prefix with its factor and preserving the base unit. For example, mA becomes 10^-3 A.',
      trap: 'The table’s mA and μV prefixes point in opposite exponent directions: milli is 10^-3; micro is 10^-6.',
    },
  ),
  explainedPage(
    32,
    'Slides 63–64 · Linear V–I relationship and the electric-power section',
    'At a fixed 2 Ω resistance, current rises in direct proportion to voltage. The graph is a straight line through the origin; the roadmap then highlights electric power.',
    'Slide 63 shows a circuit with a variable voltage from 0 to 12 V, a constant $R=2\\,\\Omega$, and a current meter. Its table pairs 0, 2, 4, 6, 8, 10, 12 V with 0, 1, 2, 3, 4, 5, 6 A. The graph plots current vertically and voltage horizontally and forms a straight line through (0,0): each 2 V increase gives 1 A more because $I=V/2$.\n\nSlide 64 is the chapter roadmap highlighting section 2.2, Electric Power, after Ohm’s Law and before power dissipation and power formulas.',
    '**Constant resistance** — R stays fixed as V and I change.  \n**Linear relationship** — the plotted values lie on a straight line.  \n**Slope in this graph** — 1/2 A per volt, because $I=V/2\\,\\Omega$.',
    {
      recognition: 'At fixed R, if V doubles, I doubles. On this graph the slope is 1/2 A per volt because R = 2 Ω.',
    },
  ),
  explainedPage(
    33,
    'Slides 65–66 · Electric power and the toaster example',
    'Electric power is the rate of energy transfer, measured in watts. In a circuit, P = VI; a 120 V toaster taking 10 A uses 1,200 W or 1.2 kW.',
    'The slide defines one watt as one joule per second. Since volts are joules per coulomb and amperes are coulombs per second, their product is joules per second: $P=V\\times I$. A 6 V battery producing 2 A gives $P=(6)(2)=12\\,\\mathrm{W}$. Rearranging gives $I=P/V$ and $V=P/I$.\n\nExample 3–7 gives a 120 V toaster taking 10 A:\n1. Use $P=VI$ because voltage and current are known.\n2. $P=(120\\,\\mathrm{V})(10\\,\\mathrm{A})=1{,}200\\,\\mathrm{W}$.\n3. Since 1 kW = 1,000 W, $1{,}200\\,\\mathrm{W}=1.2\\,\\mathrm{kW}$.',
    '**Power ($P$)** — energy transferred each second, measured in watts (W).  \n**Watt (W)** — one joule per second.  \n**$P=VI$** — voltage times current.',
    {
      recognition: 'If voltage and current are given and power is asked for, multiply them. If only two of P, V, and I are known, rearrange the same equation.',
      trap: 'Write the unit conversion explicitly: 1,200 W is 1.2 kW, not 1,200 kW.',
    },
  ),
  explainedPage(
    34,
    'Slides 67–68 · Power dissipated in a resistor',
    'Substituting Ohm’s law into P = VI gives two useful resistor formulas: P = I²R and P = V²/R. The slide’s 12 V, 6 Ω circuit dissipates 24 W.',
    'The first slide is the Chapter 3 roadmap highlighting section 2.3, Power Dissipation in Resistance. The second slide derives two resistor forms from $P=VI$:\n\n- Replace voltage with $V=IR$: $P=(IR)I=I^2R$.\n- Replace current with $I=V/R$: $P=V(V/R)=V^2/R$.\n\nThe circuit labels $V=12\\,\\mathrm{V}$, $R=6\\,\\Omega$, and $I=2\\,\\mathrm{A}$. Each form gives the same result:\n1. $P=VI=(12)(2)=24\\,\\mathrm{W}$.\n2. $P=I^2R=(2)^2(6)=4(6)=24\\,\\mathrm{W}$.\n3. $P=V^2/R=12^2/6=144/6=24\\,\\mathrm{W}$.',
    '**Dissipated power** — electrical power converted by the resistance, including heat in the source example.  \n**$I^2$** — current multiplied by itself.  \n**$V^2$** — voltage multiplied by itself.',
    {
      recognition: 'Use P = I²R when current and resistance are known; use P = V²/R when voltage and resistance are known.',
      trap: 'Do not mix the versions: P = I²R uses current, while P = V²/R uses voltage.',
    },
  ),
  explainedPage(
    35,
    'Slides 69–70 · Comparing resistor power examples',
    'For 100 V, 2 A, and 50 Ω, the resistor dissipates 200 W. With the same 100 V source but 4 A through 25 Ω, it dissipates 400 W.',
    'Example 3–11 gives $I=2\\,\\mathrm{A}$ and $R=50\\,\\Omega$:\n1. Use $P=I^2R$.\n2. $P=(2)^2(50)=4(50)=200\\,\\mathrm{W}$.\nThe slide says the source delivers 200 W to the resistance and the resistance dissipates 200 W as heat.\n\nExample 3–12 uses the same 100 V source, with $I=4\\,\\mathrm{A}$ and $R=25\\,\\Omega$:\n1. $P=(4)^2(25)=16(25)=400\\,\\mathrm{W}$.\n2. The slide notes the power is higher because current is larger, even though resistance is lower.',
    '**Power in a resistor** — can be calculated from current and resistance using $P=I^2R$.  \n**Same source** — both examples use 100 V.',
    {
      recognition: 'When current and resistance are supplied, square the current first, then multiply by resistance.',
      trap: 'In P = I²R, square I before multiplying by R; do not calculate I×R and square the entire product.',
    },
  ),
  explainedPage(
    36,
    'Slides 71–72 · The complete set of power formulas',
    'Choose the power formula that uses the values you know. The three equivalent forms are P = VI, P = I²R, and P = V²/R, with rearrangements for the unknown.',
    'The first slide is the chapter roadmap highlighting section 2.4, Power Formulas. The formula table groups equivalent equations:\n\n- From $P=VI$: $I=P/V$ and $V=P/I$.\n- From $P=I^2R$: $R=P/I^2$ and $I=\\sqrt{P/R}$.\n- From $P=V^2/R$: $R=V^2/P$ and $V=\\sqrt{PR}$.\n\nThe forms come from combining the original power equation with Ohm’s law. For example, to solve for current from power and resistance, start with $P=I^2R$, divide by R to get $I^2=P/R$, then take the positive square root for the current magnitude: $I=\\sqrt{P/R}$.',
    '**Known values** — quantities given in the question.  \n**Unknown** — quantity requested.  \n**Square root ($\\sqrt{\\ }$)** — the inverse of squaring a nonnegative magnitude.',
    {
      recognition: 'Choose a formula containing the unknown and only the quantities you were given. Write units beside each value before substituting.',
      trap: 'Do not use P = I²R if you only know voltage and resistance unless you first find current or use the equivalent P = V²/R form.',
    },
  ),
  explainedPage(
    37,
    'Slides 73–74 · Finding current from power',
    'A 600 W toaster on 120 V needs 5 A. A 24 Ω resistor dissipating 600 W also carries 5 A.',
    'Example 3–13 gives $P=600\\,\\mathrm{W}$ and $V=120\\,\\mathrm{V}$:\n1. Use $I=P/V$.\n2. $I=600/120=5\\,\\mathrm{A}$.\n\nExample 3–15 gives $P=600\\,\\mathrm{W}$ and $R=24\\,\\Omega$:\n1. Use $I=\\sqrt{P/R}$ because current, power, and resistance are related by $P=I^2R$.\n2. $I=\\sqrt{600/24}=\\sqrt{25}$.\n3. $I=5\\,\\mathrm{A}$.',
    '**$I=P/V$** — current from power and voltage.  \n**$I=\\sqrt{P/R}$** — current magnitude from power and resistance.',
    {
      recognition: 'Use the simple ratio P/V when voltage is given. Use the square-root form when power and resistance are given.',
      trap: 'For the second example, take the square root after dividing: 600/24 = 25, then √25 = 5 A.',
    },
  ),
  {
    sourcePage: 38,
    title: 'Slide 75 · Thank-you closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'The closing slide says “Thank you for watching” and “Questions?” It contains no additional lesson content.',
  },
];

export const electronicsLecture1: Lesson = {
  id: 'electronics-lecture-1',
  courseId: 'electronics',
  sourceKey: 'current:electronics:Lec_1 Electronics.pdf',
  sourcePath: 'The Lectures i downloaded this term recently/Lec_1 Electronics.pdf',
  title: 'Electronics Lecture 1 — Electricity, Ohm’s Law, and Electric Power',
  sourcePageCount: 38,
  pages,
};
