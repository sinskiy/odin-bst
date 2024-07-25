import Tree from "./main.js";
import { createRandomTreeArray, prettyPrint } from "./helpers.js";

const tree = new Tree(createRandomTreeArray());
console.assert(tree.isBalanced());
tree.levelOrder((node) => console.log(node.data));
tree.inOrder((node) => console.log(node.data));
tree.preOrder((node) => console.log(node.data));
tree.postOrder((node) => console.log(node.data));
tree.insert(120);
tree.insert(140);
tree.insert(160);
console.assert(!tree.isBalanced());
