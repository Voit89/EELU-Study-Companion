import type { Lesson, LessonPage } from '../types';

interface PageTeachingNotes {
  recognition?: string;
  trap?: string;
  analogy?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  terms?: string,
  note?: string,
  teaching?: PageTeachingNotes,
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (terms) blocks.push({ type: 'recognition', title: 'Key words and symbols', markdown: terms });
  if (teaching?.recognition) {
    blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: teaching.recognition });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: explanation });
  if (teaching?.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: teaching.trap });
  }
  if (teaching?.analogy) {
    blocks.push({ type: 'alternate', title: 'A quick mental picture', markdown: teaching.analogy });
  }
  return { sourcePage, title, coverage: 'explained', blocks, ...(note ? { note } : {}) };
}

const pages: LessonPage[] = [
  {
    sourcePage: 1,
    title: 'Graphs: Definitions and Basic Properties — section cover',
    coverage: 'visual-only',
    blocks: [],
    note: 'This is the title slide for Section 10.1. The archived older course copy is a provisional study reference; this lecture moves from representing relationships with graphs to graph types, matrices, and degree rules.',
  },
  explainedPage(
    2,
    'Why represent relationships with a graph?',
    'A graph can turn a people-and-partners question into a picture: people will become vertices, and past working relationships will become edges.',
    `The slide describes an organization that needs teams of three. The director wants each team to include as many people as possible who have successfully worked together before, so the members report their past partners.

This is a relationship problem. A graph is useful because it can show who is connected to whom without needing to reason from a long list each time. The next page gives the same information as both a table and a diagram.`,
    `**Relationship** — here, two people are connected when they have previously worked together successfully.  
**Graph idea** — represent each person by a point and each relationship by a line between the relevant points.`,
    undefined,
    {
      recognition: 'When a problem asks who is connected, associated, or has worked with whom, look for objects that can be vertices and relationships that can be edges.',
      analogy: 'Think of a graph as a map of connections: the points are the people, while the lines record the relationships.',
    },
  ),
  explainedPage(
    3,
    'One relationship list, shown as a table and a graph',
    'Each name is a vertex, and each pair listed as past partners is represented by an edge; the table and drawing encode the same connections.',
    `The table lists nine people: Ana, Bev, Cai, Dan, Ed, Flo, Gia, Hal, and Ira. Its partner pairs correspond to the ten undirected edges in the drawing:

- Ana–Dan and Ana–Flo.
- Bev–Cai, Bev–Flo, and Bev–Hal.
- Cai–Flo.
- Dan–Ed and Ed–Hal.
- Gia–Hal and Hal–Ira.

For example, the line between Bev and Cai records their past partnership. The line between Hal and Gia does the same. The layout is only chosen to make the connections visible; the physical positions of the names do not change the relationship.`,
    `**Vertex** — a point standing for one object or person.  
**Edge** — a line standing for a relationship between its endpoint vertices.  
**Undirected edge** — a relationship with no arrow specifying a direction.`,
    'The original slide is a worked scenario rather than a formal definition. The partner table and graph were checked visually; the listed pairs above are the distinct undirected connections in the drawing.',
    {
      recognition: 'To read a relationship graph, first identify what the points mean, then read each connecting line as one relationship. A crossing of lines is not automatically a vertex.',
      trap: 'Do not treat the shape or length of a line as extra information. Only its endpoints and any arrow or label matter here.',
    },
  ),
  explainedPage(
    4,
    'Choose a team by finding a triangle of partners',
    'Bev, Cai, and Flo form a group in which every pair has worked together; after choosing them, remove their vertices and the edges attached to them.',
    `On the graph from page 3, Bev is connected to Cai and Flo, and Cai is also connected to Flo. So all three pairs are present: Bev–Cai, Bev–Flo, and Cai–Flo. This group of three mutually connected vertices is the one highlighted by the slide.

After the team is chosen, the second drawing removes Bev, Cai, and Flo, along with every edge that touched one of them. The remaining diagram shows the relationships among the people still available. This is a visual way to update the problem after a choice.`,
    `**Triangle in this drawing** — three vertices with an edge between every pair of them.  
**Remove a vertex** — delete the point and every edge incident on it.`,
    undefined,
    {
      recognition: 'For a fully connected group of three, check all three pairings. Finding only two of the three lines does not show that all three people are mutual partners.',
      trap: 'When a person is removed, also remove their relationship lines. A remaining line should connect only people who remain.',
    },
  ),
  explainedPage(
    5,
    'Edges can curve, repeat a connection, or return to one vertex',
    'A graph edge can be drawn straight or curved; the endpoints determine the connection, while a loop uses one vertex and parallel edges repeat the same endpoint pair.',
    `The figure introduces three useful cases:

- Edges e2 and e3 both connect v2 to v3. They are **parallel edges** because they share the same two endpoints.
- Edge e5 starts and ends at v4. It is a **loop**.
- Vertex v5 has no edge touching it. It is an **isolated vertex**.
- Edge e6 connects v6 to v7, showing an ordinary connection.

An edge may be drawn as a curve or a straight segment. The curve does not change which vertices it connects.`,
    `**Endpoint** — a vertex at which an edge begins or ends.  
**Loop** — an edge with one endpoint vertex; visually it leaves and returns to that vertex.  
**Parallel edges** — two or more distinct edges with the same endpoint set.  
**Isolated vertex** — a vertex with no incident edges.`,
    undefined,
    {
      recognition: 'Follow a line to its endpoint dots. If it returns to the same dot, it is a loop; if another distinct line has the same two endpoint dots, the lines are parallel.',
      trap: 'A curved edge is not necessarily a loop. It is a loop only when both ends meet the same vertex.',
    },
  ),
  explainedPage(
    6,
    'Formal graph definition and connection vocabulary',
    'A graph G is built from a nonempty vertex set V(G), an edge set E(G), and an endpoint assignment for every edge.',
    `The definition names the pieces of a graph:

1. V(G) is the finite, nonempty set of vertices.
2. E(G) is the finite set of edges.
3. Each edge is assigned one endpoint vertex (a loop) or two endpoint vertices.
4. The rule that assigns endpoints to edges is called the **edge-endpoint function**.

The remaining words describe how pieces meet. An edge is **incident on** each of its endpoint vertices. Two distinct vertices are **adjacent** when an edge connects them. Two edges are adjacent when they share an endpoint. A vertex with a loop is adjacent to itself. A vertex with no incident edges is isolated. These definitions also allow parallel edges, as the preceding picture demonstrates.`,
    `**V(G)** — the set of vertices in graph G.  
**E(G)** — the set of edges in graph G.  
**Incident** — an edge touches a vertex that is one of its endpoints.  
**Adjacent vertices** — vertices joined by an edge.  
**Adjacent edges** — edges sharing an endpoint.  
**Edge-endpoint function** — the lookup rule that tells which vertex or vertices belong to each edge.`,
    undefined,
    {
      recognition: 'When asked for V(G), list the vertex names. When asked for E(G), list the edge names. When asked for endpoints, match every edge to the vertex dot or dots it touches.',
      trap: 'A loop has one endpoint vertex, but it contributes two edge ends to degree later. Keep the endpoint definition separate from the degree-counting rule.',
    },
  ),
  explainedPage(
    7,
    'Example 1 — read the graph before answering',
    'This example asks you to list the vertices and edges, match each edge to its endpoints, then use the picture to identify incidence and adjacency.',
    `The graph contains six labeled vertices, $v_1$ through $v_6$, and seven labeled edges, $e_1$ through $e_7$. Before using the terminology, trace the diagram:

- e1 joins v1 to v2.
- e2 and e3 both join v1 to v3.
- e4 joins v2 to v3.
- e5 joins v5 to v6.
- e6 is a loop at v5, and e7 is a loop at v6.
- v4 is drawn alone.

Part (a) asks for V(G), E(G), and the edge-endpoint function. Part (b) asks you to apply the words from page 6. The next two pages show the requested answers.`,
    `**V(G)** lists points; **E(G)** lists labeled lines.  
**Endpoint table** records which point or points each edge touches.`,
    'The worked result is on source pages 8 and 9. The endpoint list above is transcribed from the page 7 diagram and checked against the solution table on page 8.',
    {
      recognition: 'Start by tracing each edge label to its endpoint dots. This avoids confusing the edge label e_i with a vertex label v_i.',
      trap: 'The isolated vertex v4 belongs in V(G) even though it is not an endpoint of any edge.',
    },
  ),
  explainedPage(
    8,
    'Example 1(a) — vertex set, edge set, and endpoint table',
    'The graph has six vertices and seven edges; the endpoint table is the complete record of how those seven edges connect.',
    `The vertex set is $V(G)=\\{v_1,v_2,v_3,v_4,v_5,v_6\\}$. The edge set is $E(G)=\\{e_1,e_2,e_3,e_4,e_5,e_6,e_7\\}$.

The edge-endpoint function is:

| Edge | Endpoint vertex or vertices |
| --- | --- |
| $e_1$ | $\\{v_1,v_2\\}$ |
| $e_2$ | $\\{v_1,v_3\\}$ |
| $e_3$ | $\\{v_1,v_3\\}$ |
| $e_4$ | $\\{v_2,v_3\\}$ |
| $e_5$ | $\\{v_5,v_6\\}$ |
| $e_6$ | $\\{v_5\\}$ |
| $e_7$ | $\\{v_6\\}$ |

Notice that e2 and e3 are different edge names even though their endpoint sets match. The one-element endpoint sets for e6 and e7 show that these are loops.`,
    `**Set braces { }** collect the members of a set.  
**{v1, v3}** as an endpoint set means that the edge joins v1 and v3; order does not matter for this undirected graph.  
**{v5}** means the edge has the single endpoint vertex v5.`,
    undefined,
    {
      recognition: 'An endpoint table is read one edge at a time: choose the edge label in the left column, then read the vertex set on the same row.',
      trap: 'Do not merge e2 and e3 in E(G). They are two distinct edges, even though both have endpoints {v1, v3}.',
    },
  ),
  explainedPage(
    9,
    'Example 1(b) — use the graph vocabulary',
    'Incidence asks which edges touch a vertex; adjacency asks which vertices or edges share a connection point.',
    `Use the endpoint table from page 8 to justify each answer:

- **Edges incident on v1:** e1, e2, e3. Each has v1 as an endpoint.
- **Vertices adjacent to v1:** v2 and v3. Those are the other endpoints of e1, e2, and e3.
- **Edges adjacent to e1:** e2 and e3 share v1 with e1, while e4 shares v2 with e1.
- **Loops:** e6 at v5 and e7 at v6, because each has only one endpoint vertex.
- **Parallel edges:** e2 and e3, because both have endpoint set {v1, v3}.
- **Vertices adjacent to themselves:** v5 and v6, because each has a loop.
- **Isolated vertex:** v4, because no edge touches it.`,
    `**Incident on v1** — the edge has v1 as an endpoint.  
**Adjacent to v1** — a different vertex is joined to v1 by an edge.  
**Parallel** — distinct edges have the same endpoints.`,
    undefined,
    {
      recognition: 'For a vertex question, inspect the vertex endpoints. For an edge-adjacency question, look for a shared endpoint. For parallel edges, compare the complete endpoint sets.',
      trap: 'An edge adjacent to e1 is not the same thing as a vertex adjacent to v1. The first asks for edge labels; the second asks for vertex labels.',
    },
  ),
  explainedPage(
    10,
    'Directed graphs — endpoints have an order',
    'In a directed graph, an edge points from a starting vertex to an ending vertex, so reversing the order describes a different direction.',
    `A **directed graph**, or **digraph**, has a vertex set V(G) and directed edges. Each directed edge is associated with an ordered pair (v, w). The order matters: the edge goes **from v to w**.

An ordinary undirected graph can be obtained by ignoring the arrows. That operation keeps which vertices are connected but forgets which way each edge points.`,
    `**Ordered pair (v, w)** — first vertex v is the start; second vertex w is the destination.  
**Digraph** — a graph whose edges have directions.  
**Underlying undirected graph** — the same vertices and connections after arrow directions are ignored.`,
    undefined,
    {
      recognition: 'If the diagram has arrowheads, follow each arrow from its tail to its head. Do not treat a one-way edge as a two-way connection.',
      trap: 'The pairs (v, w) and (w, v) are different directed edges. Ignoring direction is a separate step that produces an associated undirected graph.',
    },
  ),
  explainedPage(
    11,
    'Digraph example — in-degree and out-degree',
    'In-degree counts arrows entering a vertex; out-degree counts arrows leaving it. The slide gives the counts for a, b, c, and d.',
    `The notation on the slide uses deg⁻ for in-degree and deg⁺ for out-degree. Read an arrowhead pointing into a vertex as one incoming edge; read an arrow leaving it as one outgoing edge. The displayed results are:

| Vertex | In-degree deg⁻ | Out-degree deg⁺ |
| --- | ---: | ---: |
| a | 1 | 2 |
| b | 4 | 2 |
| c | 0 | 2 |
| d | 2 | 1 |

For example, c has no arrow pointing into it, so deg⁻(c) = 0; the two arrows leaving c give deg⁺(c) = 2. The loop at b contributes one incoming and one outgoing arrow at b, because it leaves b and returns to b.`,
    `**deg⁻(v)** — number of directed edges entering vertex v.  
**deg⁺(v)** — number of directed edges leaving vertex v.  
**Loop in a digraph** — contributes once to in-degree and once to out-degree at its vertex.`,
    'The graph itself and the degree values were checked visually. The slide states the numeric answers but does not write out the individual arrow-counting steps; the explanation above applies the in/out definitions to the displayed diagram.',
    {
      recognition: 'At each vertex, count arrowheads for the in-degree and arrow tails for the out-degree. Count a loop once in each column.',
      trap: 'Do not combine in-degree and out-degree into one undirected degree. They answer two different direction-sensitive questions.',
    },
  ),
  explainedPage(
    12,
    'Adjacency matrix of an undirected multigraph',
    'An adjacency matrix stores the number of edges between each ordered row-column vertex pair; here rows and columns both follow v1, v2, v3, v4, v5.',
    `An **n by n matrix** is a square table with n rows and n columns. Here its entry $a_{ij}$ counts edges between row vertex $v_i$ and column vertex $v_j$. If no edge joins that pair, the entry is 0. For an undirected multigraph, the matrix is symmetric because a connection between $v_i$ and $v_j$ is the same connection when the pair is read in reverse.

The slide displays:

$$
A(G)=\\begin{bmatrix}0&1&0&1&0\\\\1&1&3&0&0\\\\0&3&0&2&0\\\\1&0&2&0&1\\\\0&0&0&1&0\\end{bmatrix}
$$

Read each row in the order $v_1$ through $v_5$. For instance, row $v_2$ says there is one edge between $v_2$ and $v_1$, one loop at $v_2$, three parallel edges joining $v_2$ and $v_3$, and none between $v_2$ and $v_4$ or $v_5$. Row $v_3$ records three edges to $v_2$ and two edges to $v_4$. The diagonal entry at row $v_2$, column $v_2$ records the loop at $v_2$.`,
    `**$a_{ij}$** — matrix entry in row i and column j.  
**n by n** — n rows and n columns, one for each vertex in each direction.  
**Multigraph** — a graph that can have loops and multiple edges with the same endpoints.  
**Diagonal entry** — an entry where row and column name the same vertex; it records loops in this example.`,
    'The source definition has awkward wording and a missing verb, but the displayed matrix and graph agree: each entry is the number of edges for that vertex pair. The matrix is reproduced in row order v1, v2, v3, v4, v5.',
    {
      recognition: 'To build or read an adjacency matrix, fix the vertex order first. For each cell, ask how many edges connect the row vertex with the column vertex.',
      trap: 'For a multigraph, an entry can be 2 or 3, not just 0 or 1. The diagonal can also be nonzero when there is a loop.',
    },
  ),
  explainedPage(
    13,
    'Adjacency matrix of a digraph',
    'For a directed graph, the matrix entry records an arrow from the row vertex to the column vertex, so direction can make the matrix nonsymmetric.',
    `The slide says to define the directed adjacency matrix in a similar way to the undirected one. In this example, rows are starting vertices and columns are destination vertices. A 1 means the shown arrow goes from that row vertex to that column vertex; a 0 means there is no such arrow.

With row and column order v1, v2, v3, v4, v5, the displayed matrix is:

$$
A(D)=\\begin{bmatrix}0&1&0&0&0\\\\0&0&0&1&1\\\\0&0&0&1&0\\\\0&0&0&0&1\\\\0&0&0&1&0\\end{bmatrix}
$$

For example, the 1 in row $v_2$, column $v_4$ means $v_2$ points to $v_4$. The 1 in row $v_5$, column $v_4$ means a separate arrow points from $v_5$ to $v_4$. These two opposite-direction entries are recorded separately.`,
    `**Row vertex** — the starting point (tail) of a directed edge.  
**Column vertex** — the destination (head) of a directed edge.  
**A(D)** — the adjacency matrix for directed graph D.`,
    'The slide only says the definition is similar; it does not explicitly state row-versus-column direction. The row-as-source, column-as-destination convention is inferred from the arrows and the displayed matrix, which agree with each other.',
    {
      recognition: 'For each directed edge, find its tail row and head column, then put a 1 in that cell. Do not mirror it automatically into the opposite cell.',
      trap: 'An arrow v2 to v4 does not imply an arrow v4 to v2. The matrix entries for those two directions are different cells.',
    },
  ),
  explainedPage(
    14,
    'Graphs as a tool for representing networks',
    'A graph simplifies a real network into points and connections so people can inspect routes, costs, and service choices visually or with a computer.',
    `The slide names telephone, electric power, gas pipelines, air transport, and computer networks as systems that can be represented by graphs. In each case, points stand for locations or devices and edges stand for connections.

Once the network is represented this way, a designer can ask which edges to choose to reduce cost or improve a service. The graph is a compact model of the situation; the questions asked of it depend on what the network is meant to do.`,
    `**Network model** — a simplified representation that keeps the objects and connections relevant to a question.  
**Edge choice** — deciding which connections to include or use.`,
    undefined,
    {
      recognition: 'When a real-world problem is about routes, wires, pipelines, or communications, identify the locations/devices and the links between them before drawing the graph.',
      trap: 'A graph model contains only the details encoded in its vertices, edges, labels, or weights. A plain line drawing alone does not tell you the cost of a connection.',
    },
  ),
  explainedPage(
    15,
    'Network example — a hub-and-spoke drawing',
    'The slide uses cities and connecting routes to show a network; a hub is a central connection point with several spokes branching out.',
    `The named vertices are San Francisco, Los Angeles, Denver, Chicago, Boston, New York, and Washington. Lines show direct connections between locations. Smaller unnamed points branch off several cities, illustrating local connections around the larger network.

Chicago has several visible connections and acts as a hub in this drawing. The graph makes the overall structure easier to scan: one can see major links between cities and branches without reading a long route list.`,
    `**Hub** — a central vertex with several connections.  
**Spoke** — a branch connection extending from a hub to another vertex.  
**Direct connection** — one edge between the two endpoint vertices.`,
    'The slide illustrates a network rather than giving a route table or travel-cost data. The explanation identifies only what the labels and lines show; it does not infer distances or prices.',
    {
      recognition: 'Look for a vertex with many incident edges to spot a hub. Then follow the edges to see its direct neighbors.',
      trap: 'The cities are labels on vertices; the diagram is not a geographic map to scale. A short-looking line is not evidence of a shorter journey.',
    },
  ),
  explainedPage(
    16,
    'Simple graphs',
    'A simple graph has no loops and no parallel edges; in it, an edge can be identified just by its two distinct endpoints.',
    `The slide defines a simple graph as one with neither loops nor parallel edges. Since no endpoint pair is used by two edges, writing {v, w} completely identifies the edge connecting v and w.

The braces mean that the endpoints are an unordered pair: {v, w} and {w, v} name the same undirected edge. “Distinct” matters: a simple graph does not have an edge from a vertex back to itself.`,
    `**Simple graph** — a graph with no loops and no parallel edges.  
**{v, w}** — the undirected edge joining distinct vertices v and w.  
**Unordered pair** — the order of the two endpoints does not change the edge.`,
    undefined,
    {
      recognition: 'To check whether a graph is simple, scan for a loop at any vertex and for repeated edges between any one pair of vertices.',
      trap: 'A graph with two edges between the same pair is not simple, even if those edges are drawn with different curves or colors.',
    },
  ),
  explainedPage(
    17,
    'Example 8 — list possible edges on four vertices',
    'With vertices {u, v, w, x}, there are six possible edges in a simple graph because an edge chooses two distinct vertices without regard to order.',
    `The vertices are u, v, w, and x. A simple graph edge is one unordered pair of distinct vertices. Listing each pair once gives:

{u, v}, {u, w}, {u, x}, {v, w}, {v, x}, {w, x}.

The slide writes the count as “4 choose 2,” or $\\binom{4}{2}$: choose two of the four vertices. Its value is $\\frac{4\\times3}{2\\times1}=6$. The division removes the duplicate orderings: choosing $u$ then $v$ does not make a new undirected edge beyond choosing $v$ then $u$.

The problem fixes {u, v} as one edge and asks for graphs with one additional edge. Since that first pair is already used, any one of the other five pairs can be the second edge.`,
    `**Choose notation $\\binom{4}{2}$** — the number of ways to select 2 distinct objects from 4 when order does not matter.  
**Possible edge** — one pair from the list of two-vertex subsets.`,
    undefined,
    {
      recognition: 'For a simple graph on a small named vertex set, enumerate all distinct unordered pairs. If one edge is fixed, remove it from the candidate list.',
      trap: 'Do not count {u, v} and {v, u} twice. Edges in a simple undirected graph do not have a direction.',
    },
  ),
  explainedPage(
    18,
    'Example 8 — draw the five possible graphs',
    'Keep the required edge {u, v}; pair it in turn with each of the five remaining possible edges to get all five graphs.',
    `The source diagrams show these choices for the second edge:

1. {u, w}
2. {u, x}
3. {v, w}
4. {v, x}
5. {w, x}

Every drawing also contains the required edge {u, v}. Each graph has exactly two edges, and no pair is repeated. Because the five choices exhaust every possible edge other than {u, v}, there are no additional cases.`,
    `**Fixed edge** — the required edge {u, v} that appears in every drawing.  
**Case-by-case list** — choose exactly one of the remaining endpoint pairs as the second edge.`,
    'The five possibilities were matched to the five diagrams in the PDF. The drawings are small, so the written endpoint pairs make each case easier to distinguish.',
    {
      recognition: 'When a problem says “all graphs” and fixes one edge, hold that edge constant and vary only the other edge through the remaining list.',
      trap: 'A visual crossing or a different line shape does not create a new graph if the endpoint pairs have not changed.',
    },
  ),
  explainedPage(
    19,
    'Complete graphs',
    'A complete graph connects every distinct pair of vertices with exactly one edge; it is written K_n when it has n vertices.',
    `The definition applies to a positive integer n. K_n is a simple graph with n vertices and exactly one edge between every pair of distinct vertices. So “complete” means no pair is missing a connection, while “simple” rules out loops and duplicate edges.

For n = 1 there is only one vertex and no distinct pair to connect. With two vertices, the one pair has one edge. The next slide draws examples through five vertices.`,
    `**K_n** — the complete simple graph on n vertices.  
**Pair of distinct vertices** — two different vertices; a vertex is not paired with itself here.`,
    undefined,
    {
      recognition: 'To check completeness, take each distinct vertex pair and verify that exactly one edge joins it.',
      trap: 'Completeness does not mean every vertex has a loop. It means all pairs of different vertices are connected.',
    },
  ),
  explainedPage(
    20,
    'Example 9 — the complete graphs K1 through K5',
    'Each drawing K1, K2, K3, K4, and K5 connects every pair of distinct vertices exactly once; the number of vertices increases from one drawing to the next.',
    `Read each picture using the definition from page 19:

- K1 has one vertex and no edge, because there is no distinct pair.
- K2 has two vertices joined by one edge.
- K3 is a triangle: all three pairs of its three vertices are joined.
- K4 has four vertices. The square edges plus its two diagonals connect all six distinct pairs.
- K5 has five vertices, with every distinct pair connected once.

The positions are chosen to make the edges drawable. In K4 and K5, some lines cross in the picture; an unmarked crossing is not a new vertex.`,
    `**K1, K2, …, K5** — complete graphs whose subscripts give their vertex counts.  
**Diagonal** — an edge across the inside of the drawn square K4.`,
    'The vertex counts and edge patterns were checked against the drawings. No edge-count formula beyond what is visibly shown is needed for this page.',
    {
      recognition: 'For a complete graph, verify all vertex pairs, not just the outside boundary of the drawing.',
      trap: 'A crossing of two edges does not become a vertex unless the graph marks it as one. The drawn dots are the vertices.',
    },
  ),
  explainedPage(
    21,
    'Degree of a vertex',
    'The degree deg(v) counts the edge-ends incident on v; a loop counts twice, and the total degree adds the degrees of every vertex.',
    `The slide first describes degree as the number of edge-end segments that “stick out of” a vertex. In notation, deg(v) is the degree of vertex v. Count one for each ordinary edge-end at v; a loop contributes two because both of its ends meet that same vertex.

The **total degree** of graph G is the sum of the degrees of all its vertices. The slide previews the Handshake Theorem: this sum equals twice the number of edges.`,
    `**deg(v)** — degree of vertex v.  
**Edge-end segment** — one end of an edge where it meets a vertex.  
**Total degree** — deg(v1) + deg(v2) + … across every vertex in G.`,
    undefined,
    {
      recognition: 'Count edge ends at the vertex. A loop visibly leaves and returns to the same point, so count its two ends separately.',
      trap: 'Counting each loop as only one can make the vertex degree and total-degree check wrong.',
    },
  ),
  explainedPage(
    22,
    'Count a loop as two edge-ends',
    'The pictured vertex has degree 5: three ordinary edges contribute 1 each, and its loop contributes 2.',
    `The drawing has one loop and three non-loop edges meeting at the same vertex. Count the three ordinary ends: 1 + 1 + 1. The loop has two ends at that vertex, so add 2. Therefore the degree is 1 + 1 + 1 + 2 = 5, as the slide labels it.

The dashed outline is a visual aid around the five ends being counted; it is not an extra edge.`,
    `**Count edge-ends** — count each point where an edge arrives at or leaves from the vertex.  
**Loop contribution** — 2 to the degree of its endpoint vertex.`,
    undefined,
    {
      recognition: 'If a loop appears in a degree question, count the two places where its curve meets the vertex, even though it is one edge label.',
      trap: 'The loop is one edge in the edge set but contributes two to degree. “Number of edges” and “degree” are different counts.',
    },
  ),
  explainedPage(
    23,
    'Example 12 — inspect the graph before counting',
    'The graph has an isolated vertex v1, two parallel edges between v2 and v3, and one loop at v3; count these incidences for each vertex.',
    `The drawing contains the vertices v1, v2, and v3. Edge e1 joins v2 to v3, and e2 also joins v2 to v3, so these are parallel edges. Edge e3 is a loop at v3. Vertex v1 has no incident edge.

The question asks for every vertex degree and their total. On the next page, count e1 and e2 once at each of v2 and v3, and count the loop e3 twice at v3.`,
    `**deg(v)** — number of edge-ends at v, counting a loop twice.  
**Isolated vertex** — a vertex with no incident edge.`,
    'This slide gives the diagram and question but not the numeric answers; the worked result is on source page 24.',
    {
      recognition: 'Before calculating degrees, mark which edges touch each vertex and identify any loops. This makes the later counting auditable.',
      trap: 'The two curved edges between v2 and v3 are two separate edges, not one thick edge.',
    },
  ),
  explainedPage(
    24,
    'Example 12 — calculate each degree and the total',
    'The degrees are deg(v1) = 0, deg(v2) = 2, and deg(v3) = 4, so the total degree is 6.',
    `Count each vertex from the page 23 drawing:

1. v1 has no incident edges, so deg(v1) = 0.
2. v2 touches e1 and e2, so deg(v2) = 2.
3. v3 touches e1 and e2, contributing 2, and the loop e3 contributes 2 more. Therefore deg(v3) = 2 + 2 = 4.
4. Add the three degrees: 0 + 2 + 4 = 6.

There are three edges in the graph, including the loop. Twice the number of edges is 2 × 3 = 6, which checks the total against the Handshake Theorem previewed on page 21.`,
    `**deg(v1) + deg(v2) + deg(v3)** — total degree for this graph.  
**Check** — the total degree should equal 2 times the number of edges, including loops.`,
    undefined,
    {
      recognition: 'For a degree table, count every non-loop incident edge once and every incident loop twice, then add the vertex degrees.',
      trap: 'Do not add the three edge labels as 1 each to the total degree. The loop contributes two edge-ends, which is why the total is 6 rather than 3.',
    },
  ),
  explainedPage(
    25,
    'Handshake Theorem — total degree is twice the edge count',
    'The sum of all vertex degrees equals twice the number of edges because every edge contributes two ends; consequently, the total degree is always even.',
    `The theorem states:

$$
\\text{total degree of }G=\\deg(v_1)+\\deg(v_2)+\\cdots+\\deg(v_n)=2\\times(\\text{number of edges of }G).
$$

Why does the factor 2 appear? When we add degrees, we count edge-ends. Every ordinary edge has two ends at its two endpoint vertices. A loop also has two ends, both at its one endpoint vertex. Thus each edge contributes exactly 2 to the total, and the sum is twice the number of edges.

The corollary follows because twice any whole-number edge count is even. The source explicitly notes that the theorem still holds when loops are present.`,
    `**Handshake Theorem** — total degree = 2 × number of edges.  
**Even number** — an integer divisible by 2.  
**Edge count** — the number of members in edge set E(G).`,
    'The slide says n is a nonnegative integer when naming v1 through vn. Because the preceding graph definition requires a nonempty vertex set, the number of vertices for these graphs is at least 1; this wording does not affect the theorem.',
    {
      recognition: 'Use the theorem to check a degree sum or find the number of edges when the total degree is known. The sum must be even.',
      trap: 'A loop is still one edge in the edge count, but it contributes two to the total degree. The theorem handles this by counting its two ends.',
    },
  ),
  explainedPage(
    26,
    'A graph has an even number of odd-degree vertices',
    'The number of vertices whose degrees are odd must itself be even; an odd total of odd-degree vertices would make the degree sum odd, contradicting the Handshake Theorem.',
    `The proposition follows from the previous page. The sum of all vertex degrees is even. Every even-degree vertex contributes an even number to that sum, so only the odd-degree vertices affect whether the sum is odd or even.

An odd number of odd integers adds to an odd integer; an even number of odd integers adds to an even integer. Since the full degree sum is even, the graph must have an even number of odd-degree vertices. For example, a graph may have 0, 2, 4, or another even count of odd-degree vertices, but not exactly 1 or 3.`,
    `**Odd-degree vertex** — a vertex whose degree is an odd integer such as 1, 3, or 5.  
**Parity** — whether an integer is even or odd.`,
    'The PDF states the proposition and says it follows from the previous corollary using even/odd integer properties; the short parity argument above makes that deduction explicit.',
    {
      recognition: 'If a degree list is given, count the odd entries. This count should be even; if it is not, recheck the degree calculations.',
      trap: 'The proposition is about how many vertices have odd degree, not about the sum of their degree values being even by itself.',
    },
  ),
];

export const discreteMathLecture5Lesson: Lesson = {
  id: 'discrete-math-lecture-5',
  courseId: 'discrete-math',
  sourceKey: 'archive:discrete-math:lecture/5 Graph-theory.pdf',
  sourcePath: 'Discrete Math/lecture/5 Graph-theory.pdf',
  title: 'Lecture 5: Graphs — Definitions and Basic Properties',
  sourcePageCount: 26,
  pages,
  lastReviewed: '2026-10-14',
};
