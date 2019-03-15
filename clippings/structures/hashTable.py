# Author: Maxime Kawawa-Beaudan (maximejkb@berkeley.edu)

class HashTable:
    RESIZE_THRESHOLD = 10

    def __init__(self):
        self.size = 0
        self.buckets = [[]]

    def resize(self, factor):
        oldBuckets = self.buckets

        self.buckets = []
        for _ in range(max(1, int(len(oldBuckets) * factor))):
            self.buckets.append([])

        # Hash-code-as-key mappings fall out of date
        # if we don't reinsert.
        for bucket in oldBuckets:
            for entry in bucket:
                hc = hash(entry[0])
                index = hc % len(self.buckets)
                bucket = self.buckets[index]
                bucket.append([hc, entry[1]])

    def insert(self, key, value):
        # Hash code becomes an implicit key.
        hc = hash(key)
        index = hc % len(self.buckets)
        bucket = self.buckets[index]
        bucket.append([hc, value])

        self.size += 1
        if self.size / len(self.buckets) > HashTable.RESIZE_THRESHOLD:
            self.resize(2)

    def get(self, key):
        hc = hash(key)
        index = hc % len(self.buckets)
        bucket = self.buckets[index]

        for mapping in bucket:
            if mapping[0] == hc:
                return mapping[1]
        return None

    def remove(self, key):
        hc = hash(key)
        index = hc % len(self.buckets)
        bucket = self.buckets[index]

        for mapping in bucket:
            if mapping[0] == hc:
                bucket.remove(mapping)
                self.size -= 1
                if self.size / len(self.buckets) <= HashTable.RESIZE_THRESHOLD:
                    self.resize(0.5)
                return

    def __contains__(self, key):
        return self.get(key) is not None

def benchmark():
    NUM_TRIALS = 1000000
    h = HashTable()

    htStart = time.time()
    for i in range(NUM_TRIALS):
        h.insert(i, random.randint(-100, 100))
    htInsert = time.time()

    for i in range(NUM_TRIALS):
        h.get(i)
    htGet = time.time()

    d = {}

    dStart = time.time()
    for i in range(NUM_TRIALS):
       d[i] = random.randint(-100, 100)
    dInsert = time.time()

    for i in range(NUM_TRIALS):
        d[i]
    dGet = time.time()

    print("HashTable insert speedup: {}".format((dStart - dInsert) / (htStart - htInsert)))
    print("HashTable get speedup: {}".format((dInsert - dGet) / (htInsert - htGet)))

if __name__ == "__main__":
    import random
    import time
    import string

    NUM_TRIALS = 10000
    h = HashTable()
    reference = {}
    for i in range(NUM_TRIALS):
        randString = ''.join(random.choices(string.ascii_uppercase + string.digits, k=20))
        h.insert(i, randString)
        reference[i] = randString

    for i in range(NUM_TRIALS):
        expected = reference[i]
        actual = h.get(i)
        if actual != expected:
            print("Expected and actual do not match: {0}, {1}".format(expected, actual))

    benchmark()
