export function removeDuplicatesInSortedArray(array) {
  const filtered = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
      filtered.push(array[i]);
    }
  }
  return filtered;
}
