class Tree {
  constructor(array) {
    const sorted = array.sort((a, b) => a - b);
    const filtered = removeDuplicatesInSorted(sorted);
    this.root = buildTree(filtered);
  }
}

function buildTree(array) {
  const middleIndex = Math.floor(array.length / 2);
  const middle = array[middleIndex];
  const node = new Node(middle);
  if (array.length < 2) {
    return node;
  }

  const leftArray = array.slice(0, middleIndex);
  const rightArray = array.slice(middleIndex);
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
prettyPrint(tree.root);

function removeDuplicatesInSorted(array) {
  const filtered = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] !== array[i + 1]) {
      filtered.push(array[i]);
    }
  }
  return filtered;
}
