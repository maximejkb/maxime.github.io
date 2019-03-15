# Author: Maxime Kawawa-Beaudan (maximejkb@berkeley.edu)

class SetNode:
    def __init__(self, value, parent=None):
        self.value = value
        self.rank = 1
        self.parent = parent

    def __repr__(self):
        return str(self.value)

class DisjointSets:
    def __init__(self, elements):
        # Make-sets: each element is a singleton set.
        self.sets = [SetNode(elem) for elem in elements]

    def find(self, elem):
        # By construction, elem is a SetNode.
        if not elem.parent:
            return elem

        root = self.find(elem.parent)
        # Implement path compression.
        elem.parent = root
        return root

    def union(self, elem1, elem2):
        parent1 = self.find(elem1)
        parent2 = self.find(elem2)
        if parent1 == parent2:
            return

        if parent1.rank > parent2.rank:
            parent2.parent = parent1
        else:
            parent1.parent = parent2
            if parent1.rank == parent2.rank:
                # Parent2's rank was just increased.
                parent2.rank += 1

    def isConnected(self, elem1, elem2):
        return self.find(elem1) == self.find(elem2)

if __name__ == "__main__":
    import random
    NUM_SETS = 1000000
    NUM_TRIALS = 1000
    d = DisjointSets(list(range(NUM_SETS)))

    for i in range(NUM_TRIALS):
        randSet1 = random.randint(0, NUM_SETS - 1)
        randSet2 = random.randint(0, NUM_SETS - 1)
        d.union(d.sets[randSet1], d.sets[randSet2])

        if not d.isConnected(d.sets[randSet1], d.sets[randSet2]):
            print("Union failed.")
