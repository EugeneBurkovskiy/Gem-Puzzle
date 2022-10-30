function startTimer(options, time) {
  return setInterval(() => {
    options.secondsCounter++;
    if (options.secondsCounter > 59) {
      options.secondsCounter = 0;
      ++options.minutesCounter;
    }
    if (options.secondsCounter > 9 && options.secondsCounter < 60) {
      time.textContent = `Time: ${options.minutesCounter}:${options.secondsCounter}`;
    } else {
      time.textContent = `Time: ${options.minutesCounter}:0${options.secondsCounter}`;
    }

  }, 1000);
}

export default startTimer;