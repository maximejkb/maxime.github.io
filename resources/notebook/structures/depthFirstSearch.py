# Author: Maxime Kawawa-Beaudan (maximejkb@berkeley.edu)

from graph import Graph

def dfsIterative(G: Graph, source, visitor: callable):
    V = G.vertices()
    visited = {v: False for v in V}
    visited[source] = True

    stack = [source]
    while stack:
        current = stack.pop()
        visited[current] = True
        visitor(current)
        for neighbor in G.neighbors(current):
            if not visited[neighbor]:
                stack.append(neighbor)

def dfs(G: Graph, visitor: callable, source=None):
    V = G.vertices()
    visited = {v: False for v in V}

    clock = 1
    pre = {v: -1 for v in V}
    post = {v: -1 for v in V}

    def explore(source):
        nonlocal clock
        pre[source] = clock
        clock += 1

        visited[source] = True
        visitor(source)

        for neighbor in G.neighbors(source):
            if not visited[neighbor]:
                explore(neighbor)

        post[source] = clock
        clock += 1

    # Start at source.
    if source:
        explore(source)

    # Generate entire DFS forest.
    for v in V:
        if not visited[v]:
            explore(v)

    return pre, post


if __name__ == "__main__":
    V = [0, 1, 2, 3, 4]
    E = [(1, 0, 1), (0, 2, 1), (2, 1, 1), (0, 3, 1), (1, 4, 1)]
    g = Graph(V, E)

    pre = [] # Post-order more difficult to get iteratively.
    dfsIterative(g, 0, lambda v: pre.append(v))

    pre, post = dfs(g, lambda v: print(v), 0)
    print(pre)
    print(post)
