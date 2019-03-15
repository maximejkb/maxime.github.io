from graph import Graph

def bfs(G: Graph, source, visitor: callable):
    visited = {v: False for v in G.vertices()}
    visited[source] = True

    prev = {v: -1 for v in G.vertices()}
    prev[source] = source

    queue = [source]
    while queue:
        current = queue.pop(0)
        visited[current] = True
        visitor(current)
        for neighbor in G.neighbors(current):
            if not visited[neighbor]:
                prev[neighbor] = current
                queue.append(neighbor)
    return prev

if __name__ == "__main__":
    airports = ['LAX', 'SFO', 'JFK', 'Charles de Gaulle', 'Heathrow']
    flights = [('SFO', 'LAX', 1), ('JFK', 'SFO', 1), ('JFK', 'Charles de Gaulle', 1), ('Charles de Gaulle', 'Heathrow', 1), ('LAX', 'JFK', 1)]
    G = Graph(airports, flights)
    visitor = lambda v: print(v)
    print(bfs(G, 'SFO', visitor))