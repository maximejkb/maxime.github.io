# Author: Maxime Kawawa-Beaudan (maximejkb@berkeley.edu)

class Graph:
    def __init__(self, V=None, E=None):
        # Adjacency list implementation.
        self.adjacencies = {}
        if V or E:
            self.buildGraph(V, E)

    def buildGraph(self, V, E):
        # Builds a graph from a set of vertices (integers) and edges
        # (integer [u], integer [v], integer [weight]) tuples.
        for v in V:
            self.adjacencies[v] = []
        for e in E:
            u, v, w = e
            # Directed.
            self.adjacencies[u].append((v, w))

    def vertices(self):
        return [v for v in self.adjacencies]

    def weightedNeighbors(self, v):
        # Return the neighbors of v with their weights.
        return self.adjacencies[v]

    def neighbors(self, v):
        return [u for u, _  in self.adjacencies[v]]

    def addEdge(self, e):
        u, v, w = e
        self.adjacencies[u].append((v, w))

if __name__ == "__main__":
    import random
    NUM_VERTICES = 1000
    NUM_EDGES = 500
    V = list(range(NUM_VERTICES))
    E = [(random.randint(0, NUM_VERTICES - 1), random.randint(0, NUM_VERTICES - 1), 1) for _ in range(NUM_EDGES)]

    # Build.
    g = Graph(V, E)

    for e in E:
        u, v, w = e
        if v not in g.neighbors(u):
            print("Expected an edge between {0} and {1}.".format(u, v))
