from minHeap import MinHeap

class PQNode:
    def __init__(self, value, priority):
        self.value = value
        self.priority = priority

    def __eq__(self, other):
        return self.priority == other.priority

    def __le__(self, other):
        return self.priority <= other.priority

    def __lt__(self, other):
        return self.priority < other.priority

    def __ge__(self, other):
        return self.priority >= other.priority

    def __gt__(self, other):
        return self.priority > other.priority


class PriorityQueue:
    def __init__(self):
        self.heap = MinHeap()

    def __contains__(self, v):
        # Want to check if any key (with any priority) matches v.
        return v in self.keys

    def __repr__(self):
        return self.heap.__repr__()

    @property
    def keys(self):
        return [node.value for node in self.heap.values()]

    def size(self):
        return self.heap.size()

    def push(self, value, priority):
        node = PQNode(value, priority)
        self.heap.push(node)

    def pop(self):
        return self.heap.pop().value

    def update(self, value, priority):
        potentialKeys = list(filter(lambda n: n.value == value, self.heap.values()))
        if len(potentialKeys) > 1:
            raise Exception("Ambigious key.")
        self.heap.update(potentialKeys[0], PQNode(value, priority))


if __name__ == "__main__":
    import random
    text = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings " \
           "are too small to get its fat little body off the ground. The bee, of course, flies anyway because " \
           "bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. " \
           "Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry!"

    unshuffled = text.split()
    shuffled = unshuffled[:]
    shuffled.sort(key=lambda _: random.randint(-100, 100))

    pq = PriorityQueue()
    for word in shuffled:
        pq.push(word, unshuffled.index(word))

    reconstructed = []
    while pq.size():
        reconstructed.append(pq.pop())
    print("Expected: " + text)
    print("Actual: " + ' '.join(reconstructed))

    pq = PriorityQueue()

    # The greatest items have the minimum priority.
    for i in range(100):
        pq.push(i, i)

    # Invert all priorities.
    for i in range(100):
        pq.update(i, -i)

    # The greatest items now have the minimum priority -- so they will be popped first.
    previous = pq.pop()
    while pq.size():
        current = pq.pop()
        if current > previous:
            print("An element popped out of order after updates.")
        previous = current
