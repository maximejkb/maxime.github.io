import random
import math

MAX_X = 100
MAX_Y = 25
NUM_NODES = 20
NUM_CLUSTERS = 5

def gen_nodes():
    return [(random.randint(0, MAX_X - 1), random.randint(0, MAX_Y - 1)) for _ in range(NUM_NODES)]

def populate_board(nodes):
    plane = []
    for y in range(MAX_Y):
        row = ""
        for x in range(MAX_X):
            if (x, y) in nodes:
                row += "."
            else:
                row += " "
        plane.append(row)

    return plane

def euclidean_distance(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

def cluster(plane, nodes):
    centers = [nodes[0]]
    for i in range(NUM_CLUSTERS):
        # Maximize Euclidean distance.
        center = max(nodes, key=lambda p: min([euclidean_distance(c, p) for c in centers]))
        centers.append(center)

    for node in nodes:
        nodeCenter = min(centers, key=lambda c: euclidean_distance(c, node))
        if node in centers:
            plane[node[1]] = plane[node[1]][:node[0]] + str(centers.index(nodeCenter)) + "C" + plane[node[1]][node[0] + 1:]
        else:
            plane[node[1]] = plane[node[1]][:node[0]] + str(centers.index(nodeCenter)) + " " + plane[node[1]][node[0] + 1:]

if __name__ == "__main__":
    nodes = gen_nodes()
    plane = populate_board(nodes)
    cluster(plane, nodes)
    for row in plane:
        print(row)