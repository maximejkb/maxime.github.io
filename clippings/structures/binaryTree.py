class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def __str__(self):
        self.bfs_print()
        return ""

    def bfs_print(self):
        current_level = [self]
        while current_level:
            next_level = []
            current_level_string = ""
            for current in current_level:
                current_level_string += str(current.value) + "   "
                if current.left:
                    next_level.append(current.left)
                if current.right:
                    next_level.append(current.right)
            print(current_level_string)
            current_level = next_level

    def is_leaf(self):
        return not self.left and not self.right

    def search(self, value):
        if self.is_leaf():
            return self.value == value
        elif self.left and self.right:
            return self.value == value or self.left.search(value) or self.right.search(value)
        elif self.left:
            return self.value == value or self.left.search(value)
        else:
            return self.value == value or self.right.search(value)

    def insert(self, value):
        if self.is_leaf():
            if value > self.value:
                self.right = BinaryTree(value)
            else:
                self.left = BinaryTree(value)
        elif value > self.value:
            if self.right:
                self.right.insert(value)
            else:
                self.right = BinaryTree(value)
        else:
            if self.left:
                self.left.insert(value)
            else:
                self.left = BinaryTree(value)

