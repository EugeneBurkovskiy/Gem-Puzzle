import getSize from "./getSize";
import restartField from "./restart";

function swapItems(e, options, field, audio, winSound, moves, stopField, results, restart) {
  if (e.target && e.target.textContent != '' && (e.target.classList.contains('game__item'))) {
    let winCheck = true;
    const emptyItem = document.querySelector('.empty'),
      emptyLeft = getSize(emptyItem, 'left'),
      emptyTop = getSize(emptyItem, 'top'),
      itemLeft = getSize(e.target, 'left'),
      itemTop = getSize(e.target, 'top'),

      leftDiff = Math.abs(emptyLeft - itemLeft),
      topDiff = Math.abs(emptyTop - itemTop),
      diff = Math.floor(Math.abs(leftDiff - topDiff));

    let itemWidth = Math.floor(getSize(document.querySelector('.game__item'), 'width'));
    if ((leftDiff === 0 || topDiff === 0) && diff === itemWidth) {
      audio.play();
      field.style.pointerEvents = 'none';
      e.target.style.left = `${emptyLeft}px`;
      e.target.style.top = `${emptyTop}px`;
      emptyItem.style.left = `${itemLeft}px`;
      emptyItem.style.top = `${itemTop}px`;

      moves.textContent = `Moves: ${++options.movesCounter}`;

      let itemIndex = options.numArr.findIndex(num => num == e.target.textContent),
        emptyItemIndex = options.numArr.findIndex(num => num == emptyItem.textContent);

      options.numArr[itemIndex] = emptyItem.textContent;
      options.numArr[emptyItemIndex] = +e.target.textContent;
    }
    for (let i = 0; i < options.numArr.length - 2; i++) {
      if (options.numArr[i] > options.numArr[i + 1]) {
        winCheck = false;
      }
    }
    if (winCheck === true) {
      stopField.style.top = '0%';
      options.secondsCounter < 10 ? options.secondsCounter = '0' + options.secondsCounter : false;
      stopField.innerHTML = `<p>Ура! Вы решили головоломку за ${options.minutesCounter}:${options.secondsCounter} и ${options.movesCounter} ходов!</p>`;

      results.push([options.minutesCounter, options.secondsCounter, options.movesCounter, options.rowSize]);
      results.sort((a, b) => {
        a = a[0] * 60 + a[1];
        b = b[0] * 60 + b[1];
        return a - b;
      });
      if (results.length > 10) {
        results.pop(results[results.length - 1]);
      }
      localStorage.setItem('results', JSON.stringify(results));
      winSound.play();
      setTimeout(() => { stopField.style.top = '-100%'; restart(); }, 3000);
    }

    setTimeout(() => {
      field.style.pointerEvents = '';
    }, 700);
  }
}
export default swapItems;