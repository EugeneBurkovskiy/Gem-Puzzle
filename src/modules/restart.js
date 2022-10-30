import checkSolution from "./checkSolution";
import createPuzzle from "./createPuzzle";

function restartField(options, sound, stopField, moves, time, field) {
  stopField.style.top = '-100%';
  sound.play();
  options.movesCounter = 0;
  options.secondsCounter = 0;
  options.minutesCounter = 0;
  moves.textContent = 'Moves: 0';
  time.textContent = 'Time: 00:00';
  field.innerHTML = '';
  checkSolution(options.numArr);
  createPuzzle(options, field);
}
export default restartField;