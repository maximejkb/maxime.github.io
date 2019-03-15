def merge(a1, a2):
    merged = []
    while a1 and a2:
        if a1[0] == a2[0]:
            merged.append(a1.pop(0))
            merged.append(a2.pop(0))
        elif a1[0] > a2[0]:
            merged.append(a2.pop(0))
        else:
            merged.append(a1.pop(0))

    if a1:
        return merged + a1
    elif a2:
        return merged + a2
    else:
        return merged

def mergeSort(a):
    if len(a) <= 1:
        return a

    mid = len(a) // 2
    left = a[:mid]
    right = a [mid:]

    return merge(mergeSort(left), mergeSort(right))

if __name__ == "__main__":
    import random
    NUM_TRIALS = 1000
    # Loop over these list lengths for test cases.
    LENGTHS = [2, 3, 5, 7, 9, 12, 20, 100, 200, 550, 675, 321]

    for i in range(NUM_TRIALS):
        length = LENGTHS[i % len(LENGTHS)]
        a = [random.randint(-1000, 1000) for _ in range(length)]
        b = a[:]

        a = mergeSort(a)
        b.sort()

        if a != b:
            print("Expected and actual do not match.")
