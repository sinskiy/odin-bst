export function removeDuplicatesInSortedArray(array) {
  const filtered = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
      filtered.push(array[i]);
    }
  }
  return filtered;
}

export function prettyPrint(node, prefix = "", isLeft = true) {
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
}
