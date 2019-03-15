class MinHeap:
    def __init__(self):
        self.tree = []

    def __repr__(self):
        return str(self.tree)

    def __contains__(self, value):
        return value in self.tree

    def values(self):
        return self.tree

    def swim(self, index):
        if not index:
            return index

        parent = (index - 1) // 2
        if self.tree[parent] > self.tree[index]:
            temp = self.tree[parent]
            self.tree[parent] = self.tree[index]
            self.tree[index] = temp
            return self.swim(parent)
        # This is the final position of the item.
        return index

    def sink(self, index):
        left = 2 * index + 1
        right = 2 * index + 2
        limit = len(self.tree)

        if left >= limit and right >= limit:
            return index

        if left < limit and right < limit:
            minIndex = min(left, right, key=lambda i: self.tree[i])
        elif left < limit:
            minIndex = left
        else:
            minIndex = right

        temp = self.tree[minIndex]
        if temp < self.tree[index]:
            self.tree[minIndex] = self.tree[index]
            self.tree[index] = temp
            return self.sink(minIndex)
        return index

    def size(self):
        return len(self.tree)

    def pop(self):
        temp = self.tree[0]
        self.tree[0] = self.tree[-1]
        self.tree.pop()
        self.sink(0)
        return temp

    def push(self, value):
        self.tree.append(value)
        self.swim(len(self.tree) - 1)

    def update(self, old, new):
        if old not in self:
            return

        current = self.tree.index(old)
        self.tree[current] = new
        current = self.swim(current)
        self.sink(current)


if __name__ == "__main__":
    import random
    h = MinHeap()
    for i in range(100):
        h.push(random.randint(-1000, 1000))

    while h.size():
        prediction = min(h.tree)
        actual = h.pop()
        if actual != prediction:
            print("Expected and actual do not match: {0}, {1}".format(prediction, actual))

    values = [random.randint(-1000, 1000) for _ in range(100)]
    for v in values:
        h.push(v)
    for v in values:
        h.update(v, random.randint(-1000, 1000))

    previous = h.pop()
    while h.size():
        current = h.pop()
        if previous > current:
            print("An entry popped out of order after updates.")
        previous = current

