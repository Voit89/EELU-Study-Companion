import type { Lesson, LessonPage } from '../types';

interface TeachingDetails {
  recognition?: string;
  trap?: string;
  sourceNote?: string;
  recap?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  terms: string,
  teaching: TeachingDetails = {},
): LessonPage {
  const blocks: LessonPage['blocks'] = [
    { type: 'zobda', text: takeaway },
    { type: 'recognition', title: 'Key words and symbols — مصطلحات مهمة', markdown: terms },
    { type: 'foundation', title: 'Walk through the idea', markdown: explanation },
  ];
  if (teaching.recognition) {
    blocks.push({ type: 'recognition', title: 'How to recognize and reuse it', markdown: teaching.recognition });
  }
  if (teaching.trap) {
    blocks.push({ type: 'trap', title: 'A mix-up to avoid', markdown: teaching.trap });
  }
  if (teaching.sourceNote) {
    blocks.push({ type: 'source-note', text: teaching.sourceNote });
  }
  if (teaching.recap) {
    blocks.push({ type: 'foundation', title: 'Quick lecture recap', markdown: teaching.recap });
  }
  return { sourcePage, title, coverage: 'explained', blocks };
}

function visualPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [], note };
}

const pages: LessonPage[] = [
  visualPage(
    1,
    'Graph Coloring — cover',
    'The cover names this deck Graph Coloring: Practical Applications in Computer Science, with real-world examples and step-by-step solutions. The PDF pages do not print a course lecture number or academic year. Its file metadata shows a modification timestamp in November 2025, which does not establish the course year.',
  ),
  explainedPage(
    2,
    'A five-step method — build the model, list conflicts, and start',
    'Translate the story into a graph before coloring: objects become vertices, conflicts become edges, and each color stands for one resource such as a time slot or room.',
    'The slide introduces the first three steps. **1. Build the graph:** decide what each vertex represents, what an edge means, and what the colors will stand for. For an exam problem, a vertex can be a course, an edge means two courses share students, and a color is an exam time. **2. List conflicts:** make a neighbor list so you can check every restriction instead of relying on memory. If A conflicts with B, the graph has the undirected edge A–B; the relationship is mutual. **3. Start coloring:** give one vertex a color. The slide allows any starting vertex and suggests beginning with a vertex that has many neighbors.',
    '**Vertex (رأس / عقدة)** — one object in the problem.  \n**Edge (حافة)** — a connection representing a conflict.  \n**Adjacent (متجاور)** — two vertices joined by an edge.  \n**Color** — a label for one resource, not necessarily a literal color.',
    {
      recognition: 'When a word problem says two items cannot happen together or cannot share something, use those items as vertices and connect each conflicting pair with an edge.',
      trap: 'Do not color before you decide exactly what an edge means. Missing one conflict can make the final schedule invalid.',
    },
  ),
  explainedPage(
    3,
    'A five-step method — color neighbors and check the number used',
    'For each vertex, avoid the colors already used by its neighbors and choose an available one; then verify the coloring. A greedy pass gives a valid coloring, but it does not automatically prove the number is minimum.',
    'The slide finishes the method. **4. Color neighbors:** for a vertex, look at its adjacent vertices that are already colored. Choose the smallest-numbered color that none of them uses. You may reuse a color on vertices that are not adjacent. **5. Count and verify:** count distinct colors, then check every edge to make sure its endpoints have different colors. The slide calls this count the chromatic number; mathematically, the count from one coloring is the chromatic number only when you have also shown that fewer colors cannot work. Otherwise, it is an upper bound on the minimum. The suggested high-degree-first order is a useful heuristic because a vertex with many neighbors has more restrictions, but changing the order can change the number of colors a greedy method uses.',
    '**Degree (درجة الرأس)** — how many neighbors a vertex has.  \n**Greedy coloring (التلوين الجشع)** — process vertices in an order and give each the first color currently available.  \n**Chromatic number, χ(G) (العدد اللوني)** — the minimum number of colors over all proper colorings of graph G.',
    {
      recognition: 'If the question asks for the minimum, first produce a valid coloring for an upper bound, then look for a reason fewer colors are impossible, such as a group of mutually adjacent vertices.',
      trap: 'The highest-degree-first rule is not a guarantee of an optimal answer. A proper coloring is valid; the chromatic number is the smallest possible valid count.',
    },
  ),
  explainedPage(
    4,
    'What graph coloring means',
    'A proper vertex coloring assigns colors so the two endpoints of every edge have different colors; χ(G) is the fewest colors that can achieve that.',
    'A graph has vertices and edges. In graph coloring, the things being colored are the **vertices**, not the edges. If two vertices are joined by an edge, they are adjacent and must have different colors. Vertices with no edge between them are allowed to share a color. The dinner-table picture on the slide is a mental analogy: people who conflict must be assigned to different tables, and people at the same table must have no conflict with one another. The goal is to use as few tables, or colors, as possible. The minimum is called the chromatic number and is written χ(G).',
    '**Proper coloring (تلوين صحيح)** — adjacent vertices have different colors.  \n**Chromatic number χ(G) (العدد اللوني)** — the smallest number of colors needed for graph G.  \n**Neighbor (جار)** — another vertex connected by an edge.',
    {
      recognition: 'Ask: which pairs are forbidden from sharing a resource? Those are exactly the pairs that need an edge and different colors.',
      trap: 'The physical position, line length, or line crossing in a drawing does not create a conflict. Only an edge connecting two vertices does.',
    },
  ),
  explainedPage(
    5,
    'Why graph coloring is useful — five applications',
    'Scheduling and assignment problems become coloring problems when each item has conflicts: edges record the conflicts, and colors name reusable resources.',
    'The slide lists five translations from real situations into graphs. **Exam scheduling:** courses are vertices; courses with common students are connected; colors are time slots. **Radio frequency assignment:** nearby stations that interfere are connected; colors are frequencies. **Compiler register allocation:** program variables are vertices; variables used at the same time conflict and need different CPU registers. **Meeting rooms:** meetings with common attendees cannot be simultaneous in the same room, so they are adjacent; colors are rooms. **Map coloring:** regions are vertices; regions sharing a border are adjacent; colors identify regions. The Four Color Theorem is the map-coloring connection developed later in the deck.',
    '**Interference (تداخل)** — two transmissions affect one another.  \n**Register (مسجل)** — a small storage location used by a processor.  \n**Resource (مورد)** — something being assigned, such as a time, room, register, or channel.',
    {
      recognition: 'In any application, say the three parts aloud: “What is a vertex? What creates an edge? What does a color represent?” If those are clear, the graph model is clear.',
      trap: 'A shared resource is permitted for two items only when the problem gives no conflict edge between them.',
    },
  ),
  explainedPage(
    6,
    'Exam scheduling — read a conflict table and its graph',
    'Each listed shared-student pair becomes an edge, so those two courses cannot receive the same exam time.',
    'The table and the drawing describe conflicts among six named courses. For example, CS101 is adjacent to CS102, MATH101, and PHYS101, so it needs a different time from each of those three. MATH101 has five listed neighbors: CS101, CS102, PHYS101, CHEM101, and BIO101. The diagram is another way to see those same connections; it is not yet a complete exam schedule because no time colors are assigned in the table. The ENG101 square appears by itself in the diagram and has no edge. If it is an intended extra vertex, it has no listed conflict and can use any already available time; the table does not explain why it is absent from the course list.',
    '**Conflict graph (رسم بياني للتعارض)** — a graph whose edges mark pairs that cannot share a time or resource.  \n**Isolated vertex (رأس معزول)** — a vertex with no incident edges.',
    {
      recognition: 'A table row gives one course and its neighbors. Confirm that the relation is mutual: if A is listed against B, the graph should have one undirected edge A–B.',
      trap: 'The diagram uses colored node fills but gives no color key or schedule. Do not treat those fills as an exam-time assignment.',
      sourceNote: 'The graph includes an isolated ENG101 square that is not included in the six-course conflict table. The slide does not explain this mismatch.',
    },
  ),
  explainedPage(
    7,
    'Meeting-room scheduling — six meetings and their conflicts',
    'The conflict list on this slide actually needs four rooms: the five outer meetings form an odd cycle needing three colors, and M3 conflicts with every outer meeting, so it needs a fourth.',
    'A shared attendee makes two meetings adjacent, since those meetings cannot use the same room at the same time. The slide lists M3 as conflicting with all five other meetings. Outside M3, the conflicts form the cycle M1–M2–M5–M6–M4–M1. That is a 5-cycle, so its five meetings cannot be colored with only two colors; it needs at least three. Because M3 is adjacent to every meeting on that cycle, it cannot use any of those three colors. Therefore at least four rooms are needed. Four suffice, for example: **Room 1:** M1 and M5; **Room 2:** M2 and M6; **Room 3:** M4; **Room 4:** M3. Check each conflict in the list: no connected pair shares a room.',
    '**Common-attendee conflict** — two meetings share someone who cannot attend both at once.  \n**Odd cycle** — a closed loop with an odd number of vertices; alternating two colors comes back to a conflict.  \n**Lower bound** — a reason the answer cannot use fewer than a certain number of colors.',
    {
      recognition: 'When one vertex is adjacent to every other vertex, color the remaining subgraph first. The universal vertex must then use a color not used by any of its neighbors.',
      trap: 'Do not infer the answer from the diagram’s decorative node colors. Use the written conflict list and verify each edge against the proposed rooms.',
      sourceNote: 'The minimum of four above is checked from the conflicts printed on this page. Page 18 later prints a three-room solution for another six-meeting conflict list; if it was intended to solve this exact example, the two slides disagree.',
    },
  ),
  explainedPage(
    8,
    'TV channel assignment — model interference as edges',
    'Stations within the stated 150-mile interference range are joined by edges, and a channel assignment must give each connected pair different channels.',
    'The slide makes the model explicit: vertices are stations, edges represent interference, and colors stand for channels. S1 conflicts with S2 and S3; S3 has four neighbors: S1, S2, S4, and S5. Notice that S1, S2, and S3 are pairwise connected, so they form a triangle and already force at least three different channels. The table and graph show the restrictions; the actual assignment is worked on source page 19.',
    '**Interference graph** — vertices are transmitters and edges mark pairs that cannot reuse a channel.  \n**Triangle** — three vertices, each adjacent to the other two; it requires three distinct colors.',
    {
      recognition: 'Look first for a clique: a group where every pair conflicts. A clique of size k proves that at least k colors are needed.',
      trap: 'The distance is part of this example’s stated rule. Do not generalize the 150-mile cutoff to every radio-frequency problem.',
    },
  ),
  explainedPage(
    9,
    'Practice — schedule clubs with shared members',
    'A shared member creates an edge between two clubs; for this graph, Chess, Drama, and Robotics form a triangle, so at least three rooms are necessary.',
    'The table and drawing provide the conflict graph. Chess conflicts with Drama and Robotics. Drama also conflicts with Music. Music conflicts with Science, and Robotics conflicts with Science. The three clubs Chess, Drama, and Robotics conflict pairwise, forming a triangle; therefore two rooms cannot work. Source page 24 later gives a valid three-room grouping: **Room 1:** Drama and Science; **Room 2:** Chess and Music; **Room 3:** Robotics. Each room contains no conflicting pair, so three rooms are enough as well as necessary.',
    '**Shared members** — a reason two clubs’ meetings cannot happen at the same time.  \n**Clique** — a set of vertices where each pair is adjacent; a clique of size three is a triangle.',
    {
      recognition: 'To prove a minimum, combine a lower bound (the triangle forces at least three) with a matching valid assignment (the three-room grouping on page 24).',
      trap: 'A coloring is valid only if every conflict edge has differently colored endpoints. Check the graph, not just the list of room names.',
    },
  ),
  explainedPage(
    10,
    'Bipartite graphs Kₘ,ₙ — split vertices into two groups',
    'In a bipartite graph, every edge goes between the two groups; color one whole group with one color and the other group with a second.',
    'The slide shows K₃,₃: group A has A1, A2, A3 and group B has B1, B2, B3. Edges go across from an A vertex to a B vertex; there are no edges among A vertices or among B vertices. That means all the A vertices may share one color, and all the B vertices may share another. Since this example has edges between the groups, one color would fail on an edge, so exactly two colors are needed. For a general bipartite graph, two colors are sufficient; if it has no edges at all, only one color is needed.',
    '**Bipartite graph (رسم ثنائي التقسيم)** — vertices can be divided into two groups with no edges within either group.  \n**Kₘ,ₙ** — the complete bipartite graph with m vertices on one side and n on the other, with every possible cross-group edge.  \n**χ(Kₘ,ₙ) = 2** when m and n are positive.',
    {
      recognition: 'If you can divide the vertices into two groups so every edge crosses between the groups, color by group. This works even if some possible cross-group edges are missing.',
      trap: 'The coloring rule uses at most two colors for a bipartite graph. “Exactly two” assumes the graph has at least one edge; an edgeless graph needs one.',
    },
  ),
  explainedPage(
    11,
    'A summary slide appears before the lecture is finished',
    'This slide recaps the graph-modeling method and applications, but the PDF continues with complete graphs, cycles, worked schedules, and the Four Color Theorem.',
    'The slide reviews five skills: model a practical problem, identify vertices/edges/colors, use a systematic coloring process, apply the method to schedules or assignments, and recognize graph patterns. It then suggests more practice and topics such as greedy algorithms, edge coloring, and list coloring. Treat this as a recap of the material up to this point, not as the final slide of the whole PDF.',
    '**Edge coloring** — coloring edges rather than vertices; it is only named here as a later topic.  \n**List coloring** — another named extension; this slide does not define or teach it.',
    {
      recognition: 'A slide labeled “Closing” can still be an intermediate recap if later source pages continue. Follow the actual PDF page order.',
      sourceNote: 'Although the slide is titled “Closing,” source pages 12–24 continue the lecture.',
    },
  ),
  explainedPage(
    12,
    'Complete graphs Kₙ — every pair is adjacent',
    'In Kₙ every vertex is connected to every other vertex, so all n vertices need different colors and χ(Kₙ) = n.',
    'The subscript n tells you how many vertices are in the complete graph. “Complete” means no pair is missing its edge. Since each vertex is adjacent to all the others, none can reuse another vertex’s color. That gives a lower bound of n colors. Giving every vertex its own color uses n, so the lower bound is achieved and the chromatic number is exactly n. The drawing shows K₄ as a small example.',
    '**Complete graph Kₙ (الرسم البياني الكامل)** — a graph with an edge between every pair of distinct vertices.  \n**χ(Kₙ) = n** — the minimum number of colors equals the number of vertices.',
    {
      recognition: 'If a graph is complete, count the vertices: that count is its chromatic number.',
      trap: '“At most four” is a different kind of statement from Kₙ needing exactly n. Do not confuse this exact formula with the Four Color Theorem later.',
    },
  ),
  explainedPage(
    13,
    'K₅ — a complete graph needs five colors',
    'Each of the five vertices is adjacent to the other four, so each must receive a distinct color; the table’s five colors are necessary and sufficient.',
    'The table lists v1 through v5. For example, v1 is adjacent to v2, v3, v4, and v5; the same is true of every other vertex. If v1 and v2 shared a color, their connecting edge would violate proper coloring. The same restriction applies to every pair, so all five colors must be distinct. The shown assignment Red, Blue, Green, Yellow, Brown uses five, and the K₅ rule proves fewer cannot work. Thus χ(K₅) = 5.',
    '**K₅** — the complete graph on five vertices.  \n**Necessary and sufficient** — needed to reach the goal, and enough to reach it.',
    {
      recognition: 'A complete-graph table repeats the same pattern: every row lists all other vertices as neighbors, so no color can be reused.',
      trap: 'The color names themselves have no special meaning. Any five distinct labels would work.',
    },
  ),
  explainedPage(
    14,
    'Build the model for seven final exams',
    'Represent the seven courses as vertices, join courses that share students, and let colors represent exam time slots.',
    'The story’s rule is that no student should have two exams at once. So two courses conflict exactly when at least one student is enrolled in both. Draw one edge for each such pair. Then a proper vertex coloring assigns different time slots to every connected pair. This page sets up the model but does not yet list the seven courses’ conflict pairs; the detailed neighbor list and coloring appear on page 17.',
    '**Course vertex** — one course’s final exam.  \n**Shared students** — the condition that creates an edge.  \n**Time slot** — the resource represented by a color.',
    {
      recognition: 'Before choosing times, write the adjacency list. Without the actual conflict pairs you cannot verify a schedule.',
      trap: 'Seven exams do not imply seven time slots. Nonconflicting exams may run at the same time.',
    },
  ),
  explainedPage(
    15,
    'Cycle graphs Cₙ — the even/odd coloring rule',
    'A cycle can use two alternating colors when its length is even; an odd cycle needs a third color to close the loop without a conflict.',
    'In a cycle, the vertices form one closed loop and each vertex has two neighbors. Start at one vertex and alternate Red, Blue, Red, Blue as you travel around it. For an even number of vertices, the last vertex receives Blue and its closing edge returns to the first Red, so the loop is valid with two colors. For an odd number, alternating would make the last vertex the same color as the first, even though they share an edge. A third color resolves that final conflict. The slide illustrates C₅ and C₆; page 16 walks through them.',
    '**Cycle Cₙ** — a closed loop with n vertices.  \n**Even** — divisible by 2.  \n**Odd** — not divisible by 2.  \n**χ(Cₙ) = 2** for even n; **χ(Cₙ) = 3** for odd n.',
    {
      recognition: 'When a graph is a single loop, count its vertices and check parity before trying colors.',
      trap: 'Do not stop after coloring a path. The last vertex also touches the first because the graph closes into a cycle.',
    },
  ),
  explainedPage(
    16,
    'Coloring C₆ and C₅ step by step',
    'C₆ closes cleanly with Red–Blue alternation; C₅ makes its last vertex touch both colors, so it needs Green.',
    'For C₆, color vertices 1–6 in order: 1 Red, 2 Blue, 3 Red, 4 Blue, 5 Red, 6 Blue. The closing neighbors of vertex 6 are vertex 5 (Red) and vertex 1 (Red), so Blue is allowed. Two colors work, and the edge 1–2 proves one color cannot work; therefore χ(C₆) = 2. For C₅, alternate through vertices 1–4: Red, Blue, Red, Blue. Vertex 5 touches vertex 4 (Blue) and vertex 1 (Red), so neither color is allowed. Give vertex 5 Green. The triangle formed by vertices 1, 2, and 5 forces at least three colors, and this assignment uses three, so χ(C₅) = 3.',
    '**Closing edge** — the edge that connects the last vertex back to the first.  \n**Conflict check** — compare a vertex’s color with every neighbor, including the neighbor across the closing edge.',
    {
      recognition: 'On an odd cycle, the failure appears at the final vertex. On an even cycle, the alternating pattern returns with the opposite color at the first vertex.',
      trap: 'For C₅, vertex 5 cannot be Red because of its edge to vertex 1, and cannot be Blue because of its edge to vertex 4.',
    },
  ),
  explainedPage(
    17,
    'Seven-exam solution — use the conflict table to verify four times',
    'The table’s coloring is valid with four time slots, and courses 1, 2, 3, and 4 form a K₄, proving that four is the minimum.',
    'Read each row by checking the colors already used by its neighbors. Course 1 has no earlier colored conflicts, so it gets Red. Course 2 conflicts with course 1, so it gets Blue. Course 3 sees Red and Blue among its neighbors, so it gets Green. Course 4 sees Red, Blue, and Green, so it needs Brown. Course 5 sees Blue and Brown and can reuse Green. Course 6 sees Green and Brown and can reuse Red. Course 7 sees Red, Blue, and Green and reuses Brown. The four first courses form a complete graph: each pair among 1, 2, 3, and 4 conflicts, so at least four times are necessary. Since the table gives a valid four-color assignment, the minimum is exactly four. Grouping the table by its colors gives **Time I/Red:** 1 and 6; **Time II/Blue:** 2; **Time III/Green:** 3 and 5; **Time IV/Brown:** 4 and 7.',
    '**Neighbor colors** — the colors already assigned to adjacent courses; a course must avoid them.  \n**K₄** — four vertices that are all pairwise adjacent, forcing four colors.',
    {
      recognition: 'A worked coloring proves the minimum when it matches a lower bound. Here the four mutually conflicting courses give the lower bound, and the table reaches it.',
      trap: 'Always compare the final schedule against every conflict edge, not just the number of colors used.',
      sourceNote: 'The visible schedule at the bottom of the source slide stops after Time I and Time II. The four complete groups above are derived from the color assignments in its table.',
    },
  ),
  explainedPage(
    18,
    'Six-meeting solution — check which conflict list this table uses',
    'The page’s own A–F table has a valid three-room coloring, but it does not match the six-meeting conflict list on page 7 if A–F are meant to correspond to M1–M6.',
    'Use only the conflicts listed in this table: B–A; C–A and B; D–A and C; E–B and D; F–C and E. These edges allow the shown grouping: **Room 1/Red:** A and E; **Room 2/Blue:** B, D, and F; **Room 3/Green:** C. No listed edge has both endpoints in the same room. A, B, and C make a triangle, so at least three rooms are needed; this assignment uses three, making three the minimum for this table’s graph. But page 7 lists a different graph: it includes M4–M6, M5–M3, and M5–M6. In particular, if D=M4 and F=M6, page 7 says D conflicts with F, while this page assigns both Blue. So this three-room answer must not be used for page 7’s conflict list.',
    '**Previously colored neighbors** — the earlier vertices in the table that conflict with the current one. An undirected edge can be listed just once, when its later endpoint is colored.  \n**Same graph check** — compare the conflict edges before carrying a solution from one page to another.',
    {
      recognition: 'When two slides share an example title, compare their adjacency lists before assuming the later coloring solves the earlier graph.',
      trap: 'A schedule can be valid for the table printed on one slide and still be invalid for a different conflict graph elsewhere in the deck.',
      sourceNote: 'The PDF labels both pages 7 and 18 as the six-meeting example. Their conflict data do not agree under the natural M1=A, M2=B, …, M6=F mapping; page 7’s list requires four rooms, while page 18’s table requires three.',
    },
  ),
  explainedPage(
    19,
    'Five-station channel assignment — a valid three-channel solution',
    'Assign S1→Channel 2, S2→3, S3→4, S4→2, and S5→3; the triangle S1–S2–S3 proves that three channels are also necessary.',
    'Follow the table row by row. S1 can start on Channel 2. S2 conflicts with S1, so use Channel 3. S3 conflicts with S1 and S2, so use Channel 4. S4 conflicts with S2 and S3, so it may reuse Channel 2. S5 conflicts with S3 and S4, so it may reuse Channel 3. To check the minimum, note that S1, S2, and S3 are pairwise connected; a triangle needs three distinct channels. The assignment uses exactly three and respects every edge, so the minimum is three. Channel numbers are just labels: the use of Channels 2, 3, and 4 still means three colors.',
    '**Assigned channel** — the color given to a station.  \n**Triangle lower bound** — three pairwise conflicting stations cannot share fewer than three channels.',
    {
      recognition: 'To verify an assignment, for each station compare its channel with every station in its “interferes with” row.',
      trap: 'The channel labels need not start at 1. Count distinct channels, not the largest channel number shown.',
    },
  ),
  explainedPage(
    20,
    'The Four Color Theorem — planar graphs need at most four colors',
    'If a graph can be drawn without edge crossings, four colors are enough for a proper vertex coloring; a particular planar graph may need fewer.',
    'A graph is planar when it has some drawing on a flat surface with no edges crossing. For a map, make each region a vertex and connect two vertices when the regions share a border. The theorem says every planar graph can be properly colored with at most four colors. “At most” is an upper bound, not a claim that four are always necessary. The slide also reports that the theorem’s proof used computer assistance in 1976 after the problem had remained open for a long time. The historical note is context; the theorem itself is the reusable result. A theorem guaranteeing that four colors suffice does not, by itself, show which color to give each region in a particular map.',
    '**Planar graph (رسم مستوٍ)** — a graph that can be drawn with no edge crossings.  \n**At most four (على الأكثر أربعة)** — four is a ceiling; fewer may suffice.  \n**Region adjacency** — two map areas are adjacent when they share a border.',
    {
      recognition: 'Use the Four Color Theorem only after the graph is known to be planar. It gives a maximum needed, not the exact chromatic number of every planar graph.',
      trap: 'A drawing with crossings does not automatically prove a graph is nonplanar; the same graph might be redrawn without crossings.',
      sourceNote: 'The historical details on this page are summarized as the lecture presents them; this slide is not a proof of the theorem.',
    },
  ),
  explainedPage(
    21,
    'Key takeaways — definitions, applications, methods, and patterns',
    'Model conflicts as edges, then color vertices so no edge has matching endpoints; use pattern rules when they apply and prove minimum claims carefully.',
    'The slide gathers the lecture’s main ideas. Graph coloring assigns colors to vertices, and χ(G) is the minimum number for a proper coloring. Real problems become graphs when conflicts can be listed. The five-step method builds the model, records conflicts, starts a coloring, chooses available colors, and verifies the result. The named patterns are: complete graphs Kₙ use n colors; bipartite graphs use at most two; even cycles use two; odd cycles use three; planar graphs use at most four. For a particular graph, the pattern or a worked coloring still needs to match its actual edges.',
    '**Exact chromatic number** — the proven minimum number of colors.  \n**Upper bound** — a number known to be enough, though fewer might work.',
    {
      recognition: 'Identify the graph type first. Then check whether the question asks for an exact minimum or only a guaranteed upper bound.',
      trap: 'The summary’s phrase “find chromatic numbers using the five-step method” is a goal, not a guarantee that greedy coloring alone always proves the minimum.',
      sourceNote: 'This is another recap slide, but source pages 22–24 continue with the club practice problem.',
    },
  ),
  explainedPage(
    22,
    'Practice — campus club meeting rooms',
    'The five clubs are the vertices, but this page alone does not say which pairs share members; without those edges, the minimum room count cannot yet be determined.',
    'The slide names Chess, Drama, Music, Robotics, and Science and explains why shared members create conflicts. To solve it, we still need the actual shared-member pairs. Source page 9 earlier gives a conflict table for these same clubs, and page 24 later supplies a solution using those relationships. If you were given only this page, the correct next step would be to ask for or collect the conflict pairs before coloring.',
    '**Missing edge data** — the names of the vertices are not enough; we must know which pairs are adjacent.  \n**Shared member** — a person whose membership in two clubs creates a scheduling conflict.',
    {
      recognition: 'Before coloring, check that the problem has specified both the vertices and all the edges.',
      trap: 'Do not invent conflict pairs from the club names. A graph’s edges must come from the supplied information.',
    },
  ),
  explainedPage(
    23,
    'Quick reference — common graph coloring rules',
    'Use χ(Kₙ)=n, two colors for a bipartite graph, two for an even cycle, three for an odd cycle, and at most four for a planar graph.',
    'The table is a compact reference. **Complete graph:** every pair is adjacent, so Kₙ needs n colors. **Bipartite graph:** color by the two groups; at most two colors suffice, and χ(Kₘ,ₙ)=2 when both sides are nonempty. **Even cycle:** alternate two colors. **Odd cycle:** alternation fails at the closing edge, so three are needed. **Planar graph:** the Four Color Theorem gives χ(G)≤4. The final note on the slide is important: the general pattern gives an exact number only where it says equality; the planar rule is an upper bound. For an individual graph, verify its edges and whether a lower bound proves the minimum.',
    '**χ(G)** — chromatic number of graph G.  \n**≤ 4** — no more than four; the actual number could be 1, 2, 3, or 4.  \n**Kₘ,ₙ** — complete bipartite graph with m and n vertices in its two groups.',
    {
      recognition: 'Match the graph’s structure to a row in the table before using a formula.',
      trap: 'The table’s χ(Kₘ,ₙ)=2 presumes m,n are positive. A bipartite graph with no edges at all needs only one color; the safe general statement is at most two.',
    },
  ),
  explainedPage(
    24,
    'Club scheduling solution — three rooms are necessary and sufficient',
    'The listed coloring uses three rooms without placing a conflicting pair together; the Chess–Drama–Robotics triangle proves that two rooms cannot work.',
    'The table colors the clubs in order. Drama has no earlier listed conflict, so it gets Red. Chess conflicts with Drama, so it gets Blue. Robotics conflicts with both Chess and Drama, so it needs Green. Music conflicts with Drama, so it can reuse Blue. Science conflicts with Music and Robotics, so it can reuse Red. The rooms are therefore **Room 1/Red:** Drama and Science; **Room 2/Blue:** Chess and Music; **Room 3/Green:** Robotics. Check the lower bound: Chess conflicts with Drama and Robotics, and Drama conflicts with Robotics, so those three form a triangle and require three different rooms. The assignment uses three, so the chromatic number is exactly 3.',
    '**Colors used** — colors already assigned to the current club’s earlier conflicting neighbors.  \n**Valid coloring** — every club pair connected by an edge is assigned different rooms.',
    {
      recognition: 'For any proposed minimum, show both sides: a valid coloring with k colors and a structure that forces at least k.',
      trap: 'The line on page 22 does not itself provide the conflict pairs; page 9’s table and graph supply the same relationships used in this solution.',
      recap: 'Reusable approach: (1) define vertices, edges, and resource colors; (2) list every neighbor; (3) color while checking the neighbors; (4) verify all edges; (5) prove minimality with a lower bound such as a clique. Greedy ordering is a helpful starting strategy, not a proof of optimality by itself. Remember the source’s specific patterns: χ(Kₙ)=n; bipartite graphs need at most two colors; χ(Cₙ)=2 for even n and 3 for odd n; planar graphs need at most four. The six-meeting graph on page 7 and its later three-room table on page 18 disagree, so use the conflict data from the version of the problem you are actually solving.',
    },
  ),
];

export const discreteMathLecture6Lesson: Lesson = {
  id: 'discrete-math-lecture-6',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/Graph_Coloring__Practical_Applications_in_Computer_5-1-1.pdf',
  sourcePath: 'Discrete Math/lecture/Graph_Coloring__Practical_Applications_in_Computer_5-1-1.pdf',
  title: 'Supplementary: Graph Coloring — Practical Applications in Computer Science',
  sourcePageCount: 24,
  pages,
  lastReviewed: '2026-10-14',
};
