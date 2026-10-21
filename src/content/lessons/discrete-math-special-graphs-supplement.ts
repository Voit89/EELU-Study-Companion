import type { Lesson, LessonPage } from '../types';

interface TeachingNotes {
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
  notes: TeachingNotes = {},
): LessonPage {
  const blocks: LessonPage['blocks'] = [
    { type: 'zobda', text: takeaway },
    { type: 'recognition', title: 'Key words and symbols — مصطلحات مهمة', markdown: terms },
    { type: 'foundation', title: 'Walk through the idea', markdown: explanation },
  ];
  if (notes.recognition) {
    blocks.push({ type: 'recognition', title: 'How to recognize and reuse it', markdown: notes.recognition });
  }
  if (notes.trap) blocks.push({ type: 'trap', title: 'A mix-up to avoid', markdown: notes.trap });
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
    'Special Graphs — cover',
    'The cover lists planar, regular, bipartite, complete bipartite, tree, cycle, and wheel graphs, plus faces. It is a title slide rather than a numbered lecture page. The PDF metadata gives a creation/modification timestamp of 27 November 2025, but the slides do not state an academic year or lecture number; treat this as a supplementary topic deck.',
  ),
  explainedPage(
    2,
    'Graph theory introduction — vertices and edges model relationships',
    'A graph G = (V, E) records objects and the connections between them: V is the set of vertices and E is the set of edges.',
    'Think of a map of people who know one another: each person is a vertex, and a line joins two people who know each other. The same model can represent computers and communication links, tasks and dependencies, or locations and roads. The meaning of a vertex and an edge depends on the problem, so state that meaning before using a graph. This deck compares several graph families by their extra rules, then shows where each model can be useful.',
    '**Graph (رسم بياني)** — a set of vertices together with edges joining selected pairs.  \n**Vertex / node (رأس / عقدة)** — one represented object.  \n**Edge (حافة)** — a represented connection.  \n**G = (V, E)** — the graph G is described by vertex set V and edge set E.',
    { recognition: 'When a problem describes objects and pairwise relationships, ask what each dot and line should mean. That choice is the graph model.' },
  ),
  explainedPage(
    3,
    'Planar graphs — a crossing-free drawing must exist',
    'A graph is planar when it has at least one drawing in the plane with no edge crossings except at shared endpoints; the drawing divides the plane into faces.',
    'The property belongs to the abstract graph, not to one particular sketch. A drawing with crossing lines may still represent a planar graph if the vertices and edges can be rearranged to remove the crossings. A graph such as K₅ or K₃,₃ is non-planar: no redraw in a flat plane can avoid every crossing. When a planar drawing is made, its regions are called **faces**; the unbounded outside region also counts as a face. In the slide’s visual comparison, the left picture has a crossing-free embedding, while the right picture is labeled non-planar.',
    '**Planar graph (رسم مستوٍ)** — a graph that can be drawn without crossings.  \n**Planar embedding** — a particular crossing-free drawing of a planar graph.  \n**Face (وجه)** — a region of a planar drawing, including the outside region.  \n**K₅ / K₃,₃** — standard examples of non-planar graphs.',
    {
      recognition: 'If a sketch crosses, try to redraw it before concluding that the graph is non-planar. A crossing in one picture is not a proof.',
      trap: 'An edge may not pass through a vertex that is not one of its endpoints. Only shared endpoints are allowed as intersections.',
    },
  ),
  explainedPage(
    4,
    'Euler’s formula — count vertices, edges, and faces',
    'For a connected planar graph, v − e + f = 2, counting the outside region among the faces.',
    'Here v is the number of vertices, e the number of edges, and f the number of faces. The cube example gives v = 8, e = 12, and f = 6. Substitute carefully: 8 − 12 + 6 = 2, so the counts satisfy Euler’s formula. This is a useful consistency check for a connected planar drawing; it does not by itself prove that an arbitrary graph is planar. For a disconnected planar graph with c connected components, the corresponding relation is v − e + f = 1 + c.',
    '**Connected graph (رسم متصل)** — every pair of vertices can be joined by a path.  \n**Face (وجه)** — one region of a planar embedding; include the exterior.  \n**Euler’s formula** — v − e + f = 2 for a connected planar graph.',
    {
      recognition: 'For a connected planar graph, plug the three counts into v − e + f. If the result is not 2, at least one count or assumption is wrong.',
      trap: 'Do not forget the outer face. The cube’s 6 faces are the faces of the planar graph drawing, not the six sides visible in one perspective sketch.',
    },
  ),
  explainedPage(
    5,
    'Planar graphs — physical layout and map coloring',
    'Planarity is useful when links must be laid out on a flat surface without crossings, and it also underlies planar map-coloring problems.',
    'The slide connects planar graphs to four settings. In a printed circuit board or chip layout, vertices can represent components and edges can represent required connections; a planar model captures a single-layer layout with no crossing wires. Real boards often use multiple copper layers or vias, so the abstract planar model is an idealization, not a rule that all electronics must be planar. A transportation layout can use the same idea to reduce crossings. For maps, make each country or region a vertex and connect two vertices when the regions share a boundary segment. The Four Color Theorem says every planar map can be colored with at most four colors so neighboring regions differ.',
    '**Layout (تخطيط)** — placing graph vertices and edges in a physical space.  \n**Adjacent map regions** — regions that share a boundary segment.  \n**Four Color Theorem** — four colors suffice for every planar map.',
    {
      recognition: 'A physical crossing constraint suggests planarity; a “neighboring regions need different labels” problem suggests map coloring.',
      trap: 'Two map regions that meet only at a point are not usually treated as adjacent for the Four Color Theorem formulation. Also, a multi-layer circuit can route over/under another wire, so it is not restricted to a single planar layer.',
    },
  ),
  explainedPage(
    6,
    'Regular graphs — all vertices have the same degree',
    'A graph is k-regular when every vertex has degree k; its edge count is e = nk/2 for n vertices.',
    'The **degree** of a vertex is the number of edges incident to it. In a k-regular graph, every one of the n vertices contributes k to the degree total, giving nk. Each edge touches two endpoints and is therefore counted twice, so 2e = nk and e = nk/2. For a square C₄, there are four vertices and each has degree 2, so e = (4 × 2)/2 = 4. Every complete graph Kₙ is (n − 1)-regular because each vertex connects to all the other n − 1 vertices.',
    '**Degree (درجة الرأس)** — number of edges incident to a vertex.  \n**k-regular** — every vertex has degree k.  \n**Complete graph Kₙ** — every pair of distinct vertices is joined by an edge.',
    {
      recognition: 'If all vertex degrees are equal, name that common value k, then use 2e = nk to find the edge count.',
      trap: 'Do not use e = nk: that counts each edge once from each endpoint. The division by 2 is essential, and nk must be even.',
    },
  ),
  explainedPage(
    7,
    'Regular graphs — balanced connectivity in applications',
    'Regularity gives every vertex the same number of direct connections, which can support balanced network designs.',
    'The slide gives symmetric communication networks, peer-to-peer systems, and data-center topologies as examples: equal degree can make local connectivity requirements more uniform. It also mentions molecular structures. A simplified graph can represent atoms as vertices and bonds as edges; for example, the carbon ring in benzene gives each ring carbon two ring-neighbors, while fullerene carbon frameworks are commonly modeled with degree 3. The graph records connectivity, not every physical or chemical detail, and equal degree alone does not guarantee equal traffic, reliability, or performance.',
    '**Symmetric network (شبكة متماثلة)** — a network with the same local connection pattern at each node.  \n**Peer-to-peer (نظير إلى نظير)** — nodes communicate without relying only on one central server.  \n**Molecular graph (رسم جزيئي)** — atoms and bonds represented by vertices and edges.',
    { trap: 'A regular graph only promises equal degree. It does not, by itself, prove the network is optimally balanced or fault tolerant.' },
  ),
  explainedPage(
    8,
    'Bipartite graphs — split vertices into two sides',
    'A bipartite graph can split its vertices into disjoint sets V₁ and V₂ so every edge runs from one side to the other.',
    'There are no edges between two vertices within V₁, and none within V₂. That is why each side is an independent set. A graph is bipartite exactly when it has no odd cycle: if a cycle has odd length, alternating sides eventually forces its last edge to join two vertices on the same side; if there are no odd cycles, the vertices can be assigned to two sides by alternating along paths. Coloring the two sides with two colors gives a proper coloring. The chromatic number is exactly 2 when the graph has at least one edge; an edgeless graph with vertices needs only one color.',
    '**Bipartite graph (رسم ثنائي التقسيم)** — vertices partitioned into two independent sets.  \n**Disjoint sets** — V₁ ∩ V₂ = ∅.  \n**Odd cycle (دورة فردية)** — a cycle with an odd number of edges.  \n**Chromatic number χ(G)** — the minimum number of colors in a proper vertex coloring.',
    {
      recognition: 'To test a proposed bipartition, check every edge: its endpoints must lie on opposite sides. To test by cycles, look for an odd cycle.',
      trap: 'Bipartite graphs can be colored with at most two colors, but “chromatic number = 2” needs at least one edge. An edgeless graph is 1-colorable (under the usual convention for a nonempty vertex set).',
    },
  ),
  explainedPage(
    9,
    'Bipartite matching — assign applicants to companies',
    'Represent companies and applicants as opposite vertex sets, then choose edges so no company or applicant is used more than once; this example can match all three companies.',
    'The slide gives edges C₁–A₁, C₁–A₃, C₂–A₂, C₂–A₃, C₃–A₁, and C₃–A₄. One valid assignment is C₁–A₃, C₂–A₂, C₃–A₁: each chosen pair is an application edge, no company repeats, and no applicant repeats. Thus three matches are possible, which is maximum because there are only three companies. Another maximum assignment is C₁–A₁, C₂–A₃, C₃–A₄. The chosen assignments are a **matching**; maximizing the number of edges in such a set is maximum matching.',
    '**Matching (مطابقة)** — a set of edges with no shared endpoints.  \n**Maximum matching** — a matching with the greatest possible number of edges.  \n**Bipartite sides** — here, companies on one side and applicants on the other.',
    {
      recognition: 'To find a maximum matching, look for a set of allowed edges with no repeated endpoint. When a choice blocks a later vertex, try a different edge or an augmenting path.',
      trap: 'A company cannot hire two applicants in this model, and an applicant cannot be assigned to two companies. The slide explicitly says the company capacity; the one-applicant-per-match rule is part of the standard matching model.',
      sourceNote: 'The slide mentions the Hungarian algorithm. It is commonly used for weighted assignment problems; general maximum-cardinality bipartite matching is also solved by augmenting-path algorithms. The slide does not show an algorithm run, only the matching model.',
    },
  ),
  explainedPage(
    10,
    'Bipartite graphs — matching across two kinds of objects',
    'Bipartite modeling is natural whenever relationships connect two different categories, such as students and courses or workers and tasks.',
    'The slide lists job assignment, student-course allocation, product or movie recommendations, worker-task assignment, and drug-target interaction as applications. In each case, vertices on one side represent one type of entity and vertices on the other side represent the second type; an edge records an allowed, observed, or relevant relationship. Matching then asks for a selection without repeated endpoints. Real allocation problems may add capacities, costs, preferences, or eligibility rules, which require extra information beyond a plain unweighted graph.',
    '**Entity (كيان)** — an object represented in the model.  \n**Eligibility edge** — an edge meaning an assignment is allowed.  \n**Recommendation graph** — for example, users on one side and items on the other, joined when a user interacted with an item.',
    { recognition: 'If every relationship is between a member of group A and a member of group B, try a bipartite model before reaching for a more general graph.' },
  ),
  explainedPage(
    11,
    'Complete bipartite graphs — every cross-pair is connected',
    'In Kₘ,ₙ, every one of the m vertices on the first side connects to all n vertices on the other, so there are m + n vertices and mn edges.',
    'The two sides have no within-side edges. For each of the m first-side vertices, there are n choices of opposite-side neighbor, giving mn edges in total. The graph is bipartite, so two colors suffice; if it has an edge, two are needed. The slide’s examples are K₁,ₙ, a star with one center and n leaves, and K₃,₃, the three-utilities graph. Diameter means the greatest shortest-path distance: Kₘ,ₙ has diameter 2 when both sides are nonempty and at least one side has size greater than 1; the special graph K₁,₁ has diameter 1.',
    '**Kₘ,ₙ** — complete bipartite graph with side sizes m and n.  \n**Cross-set edge** — an edge between the two sides.  \n**Diameter (القطر)** — maximum shortest-path distance between vertices.  \n**Star graph** — K₁,ₙ, with one center joined to n leaves.',
    {
      recognition: 'For Kₘ,ₙ, multiply the side sizes for the edge count. Do not add within-side edges: a bipartite graph has none.',
      trap: 'The PDF’s diameter line says diameter 1 when m = 1 or n = 1. That is incorrect for K₁,ₙ when n > 1: two leaves are distance 2 through the center. Only K₁,₁ has diameter 1.',
      sourceNote: 'The subscripts are faint or displaced in parts of the slide text; the intended notation is Kₘ,ₙ, K₁,ₙ, and K₃,₃.',
    },
  ),
  explainedPage(
    12,
    'The three-utilities problem — model it as K₃,₃',
    'Three houses each connected to three utilities form K₃,₃, with 3 × 3 = 9 required edges.',
    'Put houses H₁, H₂, H₃ in one vertex set and water W, gas G, and electricity E in the other. Every house must connect to every utility, so every possible cross-set pair is an edge: H₁ to W, G, E; H₂ to W, G, E; and H₃ to W, G, E. This gives nine edges. The puzzle asks whether these connections can all be drawn in one flat plane without crossings, which is exactly asking whether K₃,₃ is planar.',
    '**Utility (مرفق)** — a service such as water, gas, or electricity.  \n**K₃,₃** — complete bipartite graph with 3 vertices on each side.  \n**Planar layout** — a drawing with no edge crossings.',
    { recognition: 'When every item on one side must connect to every item on the other, the model is Kₘ,ₙ. Here both sets have size 3.' },
  ),
  explainedPage(
    13,
    'K₃,₃ is non-planar — the three-utilities puzzle cannot be drawn flat',
    'K₃,₃ is non-planar, so all nine utility connections cannot be drawn in a single plane without crossings.',
    'This conclusion applies to the usual puzzle model: each connection is a curve in one plane, and curves may meet only at their intended house or utility endpoints. A bridge, tunnel, second layer, or an omitted connection changes the physical puzzle. The slide links K₃,₃ and K₅ to Kuratowski’s theorem, which characterizes planar graphs by forbidden subdivisions: a finite graph is planar exactly when it contains no subdivision of K₅ or K₃,₃. A related result, Wagner’s theorem, uses minors instead. A subdivision replaces edges by paths, possibly inserting degree-2 vertices; a minor can also be formed by deleting vertices or edges and contracting edges.',
    '**Non-planar (غير مستوٍ)** — no crossing-free drawing exists in the plane.  \n**Subdivision (تقسيم الحواف إلى مسارات)** — replacing edges by paths.  \n**Minor (قاصر بياني)** — formed using vertex/edge deletion and edge contraction.  \n**Kuratowski’s theorem** — planarity is equivalent to containing no subdivision of K₅ or K₃,₃.',
    {
      trap: 'Do not conclude “non-planar” merely because one drawing crosses. For K₃,₃, non-planarity is a theorem about every possible planar redraw.',
      sourceNote: 'The slide blends two related formulations: Kuratowski’s theorem is stated with subdivisions; Wagner’s theorem is the corresponding forbidden-minor characterization. The slide’s final subdivision statement is the precise Kuratowski formulation.',
    },
  ),
  explainedPage(
    14,
    'Trees — connected graphs with no cycles',
    'A tree is connected and acyclic; with n vertices it has exactly n − 1 edges and exactly one path between every pair of vertices.',
    'Connected means every two vertices can be reached from one another. Acyclic means there is no closed path that returns to its start without repeating edges. A tree with 10 vertices therefore has 9 edges. It has just enough edges to stay connected: remove any edge and the graph splits into two components; add one new edge between existing vertices and the unique existing path between its endpoints plus the new edge forms one cycle. The family-tree illustration is a simplified hierarchy in which each child has one parent in the depicted structure.',
    '**Tree (شجرة)** — a connected graph with no cycles.  \n**Acyclic (لا دوري)** — contains no cycle.  \n**Unique path** — exactly one route connects any two vertices.  \n**n − 1 rule** — a tree on n vertices has n − 1 edges.',
    {
      recognition: 'If a graph is connected and has no cycles, it is a tree. Conversely, for a finite simple graph with n vertices, connectedness plus n − 1 edges is another tree test.',
      trap: 'The n − 1 edge count alone does not prove a graph is a tree: a disconnected graph may have n − 1 edges and still contain a cycle.',
    },
  ),
  explainedPage(
    15,
    'Trees — hierarchies, indexes, and spanning trees',
    'Trees naturally represent parent-child structure; a spanning tree keeps all network vertices connected while removing cycles.',
    'The slide shows directory hierarchies, database indexes, network routing, parse trees, decision trees, and organization charts. A file system is naturally drawn from parent directories to their children. B-trees and B+ trees are balanced multiway search trees; under the appropriate balanced-tree assumptions, search takes logarithmic time in the number of stored keys. A parse tree records the nested structure of a program expression. In a connected network, a spanning tree includes every vertex but only enough edges to keep them connected. A minimum spanning tree minimizes the total selected edge weight; it does not necessarily give the shortest path between every pair of vertices.',
    '**Hierarchy (تدرّج هرمي)** — parent-child organization.  \n**Spanning tree (شجرة ممتدة)** — a tree containing every vertex of a connected graph.  \n**Minimum spanning tree** — spanning tree with minimum total edge weight.  \n**Parse tree (شجرة التحليل)** — tree showing a program’s grammatical structure.',
    {
      recognition: 'Use a tree when the structure has a root or parent-child relationships, or when a connected network must avoid loops while retaining every node.',
      trap: 'The slide says spanning trees determine “optimal paths.” A spanning tree guarantees connectivity without cycles; only a minimum spanning tree optimizes total edge weight, and even that does not guarantee shortest individual routes.',
      sourceNote: 'The O(log n) database-search claim assumes a balanced search tree and its usual storage/search model; it is not guaranteed by the word “tree” alone.',
    },
  ),
  explainedPage(
    16,
    'Cycle graphs — one closed loop',
    'Cₙ has n vertices and n edges in a single loop, with every vertex of degree 2; it needs 2 colors when n is even and 3 when n is odd.',
    'Start with n ≥ 3 vertices and connect each vertex to its two neighbors around a ring. This makes one cycle with n edges. To color it, alternate two colors as you travel around the ring. If n is even, the last vertex can differ from the first, so two colors work. If n is odd, alternating returns to the first vertex’s color at the last step even though those vertices are adjacent; a third color is needed. The smallest cycle length is n, so the girth is n. The ring can be drawn without crossings, making every cycle graph planar.',
    '**Cycle graph Cₙ (циكل)** — a closed loop of n vertices, n ≥ 3.  \n**2-regular** — every vertex has degree 2.  \n**Girth (محيط أصغر دورة)** — length of the shortest cycle.  \n**Chromatic number χ(Cₙ)** — 2 for even n; 3 for odd n.',
    {
      recognition: 'For cycle coloring, check parity: even rings alternate two colors; odd rings need a third color to close the loop.',
      trap: 'An odd cycle cannot be properly colored with only two colors. The conflict appears at the final edge joining the last vertex back to the first.',
    },
  ),
  explainedPage(
    17,
    'Cycle graphs — rings, tokens, and circular dependencies',
    'A cycle models a ring-shaped topology or a circular dependency, but a single cycle alone does not contain every pairing in a round-robin tournament.',
    'The token-ring example passes permission to transmit from one computer to the next around a loop. Cycle detection in software looks for a path of dependencies that eventually returns to its starting module or resource. A circular clock network can pass timing information to a successor and receive it from a predecessor. For a round-robin tournament with more than three participants, every pair must play; those pairings form the complete graph Kₙ, not just the edges of Cₙ. A cycle or rotation can be part of a scheduling method, but the cycle graph by itself only represents neighbor-to-neighbor pairs.',
    '**Ring topology (تركيب حلقي)** — each node connects to its two neighbors in a closed loop.  \n**Cycle detection** — checking whether a route returns to an earlier node.  \n**Round-robin** — every participant plays every other participant.',
    {
      recognition: 'Use Cₙ when each object connects only to its predecessor and successor in a ring. Use Kₙ to represent all pairwise matchups.',
      sourceNote: 'The slide says cycle graphs ensure every tournament participant competes with every other once. That is too strong for a cycle graph: for n > 3, the cycle contains only n neighbor-pairs. Round-robin scheduling needs all pairs and typically uses a separate rotation construction.',
    },
  ),
  explainedPage(
    18,
    'Wheel graphs — a hub joined to a cycle',
    'Under this deck’s convention, Wₙ has n total vertices: one hub joined to every vertex of the rim cycle Cₙ₋₁.',
    'A wheel combines a central hub with a ring. The rim contributes n − 1 vertices and n − 1 cycle edges; the hub adds one vertex and n − 1 spokes. Therefore the total is n vertices and 2(n − 1) = 2n − 2 edges. For n = 4, the rim is a triangle and the hub joins all three rim vertices, making K₄ with diameter 1. For n > 4, any two vertices are at distance at most 2, and opposite rim vertices can require 2 steps, so the diameter is 2. Each hub-rim edge and adjacent rim edge forms a triangle, giving girth 3. The graph is planar, Hamiltonian, and self-dual as stated on the slide.',
    '**Wheel Wₙ (عجلة)** — one hub plus a cycle rim.  \n**Hub / spoke (مركز / شعاع)** — central vertex / edge joining it to a rim vertex.  \n**Hamiltonian cycle** — a cycle visiting every vertex once.  \n**Self-dual** — a planar graph isomorphic to its planar dual.',
    {
      recognition: 'Count the hub once and the rim vertices separately: in this deck, rim size is n − 1. Then count one spoke per rim vertex plus the rim edges.',
      trap: 'Some books define Wₙ using an n-vertex rim, so check the convention. This PDF explicitly defines W₆ as one hub plus five rim vertices, so here W₆ has six vertices.',
    },
  ),
  explainedPage(
    19,
    'W₆ structure — count the hub, rim, and edges',
    'W₆ has one hub plus a five-vertex rim C₅: 6 vertices total and 5 spokes + 5 rim edges = 10 edges.',
    'The hub is v₀. The rim is v₁, v₂, v₃, v₄, v₅ in a closed cycle. The five spokes are v₀v₁, v₀v₂, v₀v₃, v₀v₄, and v₀v₅. The five rim edges are v₁v₂, v₂v₃, v₃v₄, v₄v₅, and v₅v₁. Add the two edge groups: 5 + 5 = 10. This also matches the general wheel formula 2(n − 1): for n = 6, 2(6 − 1) = 10.',
    '**Rim (محيط العجلة)** — the cycle around the outside.  \n**Spoke (شعاع)** — edge from the hub to a rim vertex.  \n**C₅** — a five-vertex, five-edge cycle.',
    { recognition: 'For any wheel in this deck’s convention, the number of spokes equals the number of rim vertices and the number of rim edges.' },
  ),
  explainedPage(
    20,
    'W₆ verification — why four colors are needed',
    'W₆ has 6 vertices and 10 edges, and it needs 4 colors because its five-vertex rim is an odd cycle.',
    'The vertex and edge checks are direct: n = 6, and 2(n − 1) = 10 = 5 spokes + 5 rim edges. For coloring, the rim C₅ is an odd cycle, so it needs 3 colors. The hub is adjacent to every rim vertex, so it cannot use any of the colors appearing on the rim; give it a fourth color. Thus four colors suffice and are necessary. This explains the slide’s general rule under its convention: Wₙ has chromatic number 3 when n is odd (even rim), and 4 when n is even (odd rim).',
    '**Proper coloring** — adjacent vertices have different colors.  \n**Odd rim** — the rim cycle has an odd number of vertices, so it needs 3 colors.  \n**χ(Wₙ)** — 3 for odd n; 4 for even n under this deck’s Wₙ convention.',
    {
      recognition: 'Color the rim first. The hub touches every rim vertex, so its color must be new relative to all colors used on the rim.',
      trap: 'The number of colors follows the rim length n − 1, not just the total vertex count by rote. Here W₆ has a five-vertex odd rim.',
    },
  ),
  explainedPage(
    21,
    'Wheel graphs — hub-and-ring network designs',
    'A wheel model combines direct links to a central hub with neighbor links around a peripheral ring.',
    'The slide proposes hub-and-spoke networks with a backup ring, telecom hybrids, a central server with peer-to-peer backup, and a hub with a polygonal molecular rim. In a computer network, the hub can offer short paths to the center, while the ring may keep some peripheral communication possible if the hub fails. That benefit depends on the rim links and nodes still working and on what communication the system must support; the graph alone does not guarantee a particular reliability level. The diagram should be read as a possible topology model, not a claim that every system with this shape is optimal.',
    '**Hub-and-spoke** — all peripheral nodes connect to one central node.  \n**Redundancy (تكرار احتياطي)** — alternate structure that can preserve some service after a failure.  \n**Peripheral node** — a node on the outer ring.',
    { trap: 'A backup ring helps only for failures it can route around. If rim links also fail, or the required route depends on a failed node, the wheel may not provide the claimed backup.' },
  ),
  explainedPage(
    22,
    'Summary — choose the graph family that matches the rule',
    'Model by the defining structure: no crossings (planar), equal degrees (regular), two sides (bipartite), all cross-links (complete bipartite), connected without cycles (tree), closed loop (cycle), or hub plus loop (wheel).',
    'Use the comparison as a fast identification guide. For a simple planar graph with n ≥ 3, the edge count is at most 3n − 6. In a k-regular graph, e = nk/2. For a bipartite graph with n total vertices, e ≤ floor(n²/4) for a simple graph; a balanced complete bipartite graph attains this bound. A complete bipartite Kₘ,ₙ has m + n vertices and mn edges. A tree has n − 1 edges; Cₙ has n edges; and Wₙ (using this deck’s convention) has 2n − 2 edges. These are quick checks once you have identified the right graph type.',
    '**Simple graph** — no loops or multiple edges.  \n**Edge bound (حد أعلى)** — a maximum possible edge count under stated assumptions.  \n**floor(x)** — greatest integer not larger than x.  \n**Balanced bipartition** — the two sides are as close in size as possible.',
    {
      recognition: 'First translate the story into vertices and edges. Then match its defining rule to one of these graph families before applying a formula.',
      trap: 'The planar bound e ≤ 3n − 6 assumes a simple planar graph with n ≥ 3. The bipartite bound is e ≤ floor(n²/4) for a simple bipartite graph; it is not the same as the planar bound.',
      sourceNote: 'This comparison deck has no printed academic year or lecture number. The PDF file metadata timestamp is 27 November 2025; that timestamp alone does not establish the course version.',
      recap: 'Planar: crossing-free drawing and faces; connected planar graphs obey v − e + f = 2. Regular: equal degrees, e = nk/2. Bipartite: two independent sides and no odd cycles. Complete bipartite: every cross-pair, mn edges. Tree: connected, acyclic, n − 1 edges. Cycle: n-edge loop, colored by parity. Wheel: hub plus rim; under this deck’s convention, Wₙ has n vertices and 2n − 2 edges.',
    },
  ),
];

export const discreteMathSpecialGraphsSupplementLesson: Lesson = {
  id: 'discrete-math-special-graphs-supplement',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/Special_Graphs__Mathematical_Rules_and_Real-World__1.pdf',
  sourcePath: 'Discrete Math/lecture/Special_Graphs__Mathematical_Rules_and_Real-World__1.pdf',
  title: 'Special Graphs: Mathematical Rules and Real-World Applications (Supplement)',
  sourcePageCount: 22,
  pages,
  lastReviewed: '2026-10-14',
};
