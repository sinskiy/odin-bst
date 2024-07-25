class Tree {
  constructor(array) {
    const sorted = array.sort((a, b) => a - b);
    const filtered = removeDuplicatesInSortedArray(sorted);
    this.root = buildTree(filtered);
  }
  insert(value) {
    this.insertStartingAt(this.root, value);
  }
  insertStartingAt(node, value) {
    const newNode = new Node(value);

    if (node === null) {
      return newNode;
    } else if (value === node.data) {
      return;
    } else if (value < node.data) {
      node.left = this.insertStartingAt(node.left, value) || node.left;
    } else {
      node.right = this.insertStartingAt(node.right, value) || node.right;
    }
  }
  deleteItem(value) {
    this.deleteStartingAt(this.root, value);
  }
  deleteStartingAt(node, value) {
    if (node === null) return null;

    if (value === node.data) {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        let temp = node.right;
        while (temp.left !== null) {
          temp = temp.left;
        }
        node.data = temp.data;
        node.right = this.deleteStartingAt(node.right, temp.data);
        return node;
      }
    } else if (value < node.data) {
      node.left = this.deleteStartingAt(node.left, value);
      return node;
    } else {
      node.right = this.deleteStartingAt(node.right, value);
      return node;
    }
  }
  find(value) {
    return this.findStartingAt(this.root, value);
  }
  findStartingAt(node, value) {
    if (node === null) return null;

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.findStartingAt(node.left, value);
    } else {
      return this.findStartingAt(node.right, value);
    }
  }
}

function buildTree(array) {
  if (array.length === 0) return null;

  const middleIndex = Math.floor(array.length / 2);
  const middle = array[middleIndex];
  const node = new Node(middle);
  if (array.length === 1) {
    return node;
  }

  const leftArray = array.slice(0, middleIndex);
  const rightArray = array.slice(middleIndex + 1);
  node.left = buildTree(leftArray);
  node.right = buildTree(rightArray);
  return node;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// TODO: delete when finished
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
tree.insert(6);
tree.insert(6);
tree.insert(27);
tree.insert(16);
tree.insert(0);

tree.deleteItem(4);
tree.deleteItem(27);
tree.deleteItem(67);
tree.deleteItem(5);
tree.deleteItem(8);

console.log(tree.find(9));

function removeDuplicatesInSortedArray(array) {
  const filtered = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] !== array[i + 1]) {
      filtered.push(array[i]);
    }
  }
  return filtered;
}
