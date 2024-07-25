import { removeDuplicatesInSortedArray } from "./helpers.js";

export default class Tree {
  constructor(array) {
    this.CALLBACK_ERROR = "Callback must be provided";

    const sorted = array.sort((a, b) => a - b);
    const filtered = removeDuplicatesInSortedArray(sorted);
    this.root = this.buildTree(filtered);
  }
  buildTree(array) {
    if (array.length === 0) return null;

    const middleIndex = Math.floor(array.length / 2);
    const middle = array[middleIndex];
    const node = new Node(middle);
    if (array.length === 1) {
      return node;
    }

    const leftArray = array.slice(0, middleIndex);
    const rightArray = array.slice(middleIndex + 1);
    node.left = this.buildTree(leftArray);
    node.right = this.buildTree(rightArray);
    return node;
  }
  insert(value, node = this.root) {
    const newNode = new Node(value);

    if (node === null) {
      return newNode;
    } else if (value === node.data) {
      return;
    } else if (value < node.data) {
      node.left = this.insert(value, node.left) || node.left;
    } else {
      node.right = this.insert(value, node.right) || node.right;
    }
  }
  deleteItem(value, node = this.root) {
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
        node.right = this.deleteItem(temp.data, node.right);
        return node;
      }
    } else if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
      return node;
    } else {
      node.right = this.deleteItem(value, node.right);
      return node;
    }
  }
  find(value, node = this.root) {
    if (node === null) return null;

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }
  levelOrder(callback) {
    if (!callback) throw new Error(this.CALLBACK_ERROR);

    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  inOrder(callback, node = this.root) {
    if (!callback) throw new Error(this.CALLBACK_ERROR);

    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }
  preOrder(callback, node = this.root) {
    if (!callback) throw new Error(this.CALLBACK_ERROR);

    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }
  postOrder(callback, node = this.root) {
    if (!callback) throw new Error(this.CALLBACK_ERROR);

    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }
  height(node, maxHeightLeft = 0, maxHeightRight = 0) {
    if (node === null) return;

    // this variable it created to prevent maxHeightLeft from being changed inside of function call determening new maxHeightRight
    let newMaxHeightLeft = maxHeightLeft;
    if (node.left !== null) {
      newMaxHeightLeft = this.height(
        node.left,
        ++maxHeightLeft,
        maxHeightRight
      );
    }
    if (node.right !== null) {
      maxHeightRight = this.height(node.right, maxHeightLeft, ++maxHeightRight);
    }
    return Math.max(newMaxHeightLeft, maxHeightRight);
  }
  depth(node, searchNode = this.root, currentDepth = 0) {
    if (searchNode === null || node === null) return;

    if (searchNode.data === node.data) {
      return currentDepth;
    } else if (searchNode.data > node.data) {
      return this.depth(node, searchNode.left, ++currentDepth);
    } else {
      return this.depth(node, searchNode.right, ++currentDepth);
    }
  }
  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const left = this.isBalanced(node.left);
    if (!left) return false;
    const right = this.isBalanced(node.right);
    if (!right) return false;

    if (Math.abs(left - right) > 1) return false;

    // If we reached this as a root, tree is balanced
    if (this.root.data === node.data) return true;
    return Math.max(left, right) + 1;
  }
  rebalance() {
    const array = [];
    this.levelOrder((node) => array.push(node.data));
    this.root = new Tree(array).root;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
