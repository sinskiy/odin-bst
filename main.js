import { removeDuplicatesInSortedArray, prettyPrint } from "./helpers.js";

class Tree {
  constructor(array) {
    this.CALLBACK_ERROR = "Callback must be  provided";

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

prettyPrint(tree.root);
tree.postOrder((node) => console.log(node.data));
