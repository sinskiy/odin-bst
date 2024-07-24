class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function buildTree(array) {
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

const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

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
