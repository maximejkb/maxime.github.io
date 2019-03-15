import sys
from graph import Graph
from priorityQueue import PriorityQueue

def djikstra(G: Graph, source):
    V = G.vertices()
    visited = {v: False for v in V}
    prev = {v: -1 for v in V}
    prev[source] = source
    dist = {v: sys.maxsize for v in V}
    dist[source] = 0

    fringe = PriorityQueue()
    fringe.push(source, 0)

    while fringe.size() > 0:
        current = fringe.pop()
        visited[current] = True

        for neighbor, weight in G.weightedNeighbors(current):
            if not visited[neighbor]:
                # Update.
                if dist[current] + weight < dist[neighbor]:
                    dist[neighbor] = dist[current] + weight
                    prev[neighbor] = current
                    if neighbor in fringe:
                        fringe.update(neighbor, dist[current] + weight)
                    else:
                        fringe.push(neighbor, dist[current] + weight)

    # Construct paths.
    paths = {v: [v] for v in V}
    for target in prev:
        path = paths[target]
        current = target
        # Stop when we get to source.
        while current != source:
            previous = prev[current]
            path.insert(0, previous)
            current = previous
    return paths

if __name__ == "__main__":
    import random

    NUM_VERTICES = 1000
    NUM_EDGES = 1000000

    # Simple.
    V = [1, 2, 3]
    E = [(1, 3, 1), (3, 2, 1), (1, 2, 100)]

    # Build.
    g = Graph(V, E)

    paths = djikstra(g, 1)

    # More complicated.
    V = [0, 1, 2, 3, 4, 5, 6]
    E = [(0, 1, 2), (0, 2, 1), (1, 2, 5), (1, 3, 11),
         (1, 4, 3), (4, 2, 1), (2, 5, 15), (3, 4, 2),
         (4, 5, 4), (4, 6, 5), (6, 3, 1), (6, 5, 1)]

    # Build.
    g = Graph(V, E)
    paths = djikstra(g, 0)
    print(paths)

    # Randomized.
    V = list(range(NUM_VERTICES))
    E = [(random.randint(0, NUM_VERTICES - 1), random.randint(0, NUM_VERTICES - 1), 1) for _ in range(NUM_EDGES)]

    # Build.
    g = Graph(V, E)

    paths = djikstra(g, V[0])