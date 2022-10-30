function checkSolution(arr) {
  let solvable = false,
    sum;
  while (!solvable) {
    arr.sort(() => Math.random() - 0.5);
    let emptyIndex = arr.findIndex(item => item === ''),
      rows = Math.sqrt(arr.length),
      rowsCounter = 0,
      rowWithEmptyItem;
    for (let i = 0; i < arr.length + rows; i += rows) {
      if (emptyIndex < i) {
        rowWithEmptyItem = rowsCounter;
        break;
      }
      rowsCounter++;
    }
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] != '') {
        for (let k = i; k < arr.length; k++) {
          if (arr[i] > arr[k] && arr[k] != '') {
            sum++;
          }
        }
      }
    }
    if (arr.length % 2 === 0) {
      sum += rowWithEmptyItem;
      if (sum % 2 === 0) {
        solvable = true;
      } else {
        sum = 0;
      }
    } else {
      if (sum % 2 === 0) {
        solvable = true;
      } else {
        sum = 0;
      }
    }
  }
  return arr;
}
export default checkSolution;