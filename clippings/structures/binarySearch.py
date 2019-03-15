def binarySearch(A, target):
    # Takes in a sorted list.
    if not A:
        return -1

    low = 0
    high = len(A) - 1
    while low <= high:
        mid = (low + high) // 2
        if A[mid] == target:
            return mid
        elif A[mid] > target:
            high = mid - 1
        else:
            low = mid + 1
    return -1

if __name__ == "__main__":
    import random
    NUM_TRIALS = 1
    LEN_TRIAL = 10
    # Test cases of form (input array, target, expected output).
    null = ([], 1, -1)
    singleton = ([1], 1, 0)
    endsLow = ([1, 2], 1, 0)
    endsHigh = ([1, 2], 2, 1)
    odd = ([1, 2, 3], 3, 2)
    inMiddle = ([1, 2, 3], 2, 1)
    even = ([1, 2, 3, 4], 4, 3)
    falsify = ([1, 2, 3, 5], 4, -1)

    cases = [null, singleton, endsLow, endsHigh, odd, inMiddle, even, falsify]

    for _ in range(NUM_TRIALS):
        A = [random.randint(-1000, 1000) for _ in range(LEN_TRIAL)]
        A.sort()
        expected = random.randint(0, LEN_TRIAL - 1)
        target = A[expected]
        cases.append((A, target, expected))

    for case in cases:
        A, target, expected = case
        actual = binarySearch(A, target)
        if actual != expected:
            print("Expected does not match actual: input: {0}, target: {1}, "
                  "actual: {2}, expected: {3}.".format(A, target, actual, expected))




