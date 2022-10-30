/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./modules/getSize.js
function getSize(item, param) {
  if (param === 'width') {
    return +window.getComputedStyle(item).width.match(/\d+\.\d+/ig).join('');
  } else if (param === 'left') {
    var resArr = window.getComputedStyle(item).left.match(/\d+\.\d+/ig);
    if (resArr === null) {
      return 0;
    } else {
      return +resArr.join('');
    }
  } else if (param === 'top') {
    var _resArr = window.getComputedStyle(item).top.match(/\d+\.\d+/ig);
    if (_resArr === null) {
      return 0;
    } else {
      return +_resArr.join('');
    }
  }
}
/* harmony default export */ const modules_getSize = (getSize);
;// CONCATENATED MODULE: ./modules/createPuzzle.js

function createPuzzle(options, field) {
  options.numArr.forEach(function (item, i) {
    var fieldItem = document.createElement('div');
    fieldItem.classList.add('game__item');
    fieldItem.style.width = "".concat(options.cardWidth, "%");
    fieldItem.style.height = "".concat(options.cardHeigth, "%");
    field.style.fontSize = "".concat(options.cardFontSize, "px");
    fieldItem.innerHTML = "".concat(item);
    if (fieldItem.textContent === '') {
      fieldItem.classList.add('empty');
      fieldItem.style.cssText = "background: none;\n                border:none;\n                cursor:default;\n                width:".concat(options.cardWidth, "%;\n                height: ").concat(options.cardHeigth, "%;\n                fontSize:").concat(options.cardFontSize, "px;");
    }
    field.append(fieldItem);
    var fieldItemSize = modules_getSize(fieldItem, 'width'),
      left = i % options.rowSize,
      top = (i - left) / options.rowSize;
    fieldItem.style.left = "".concat(left * fieldItemSize, "px");
    fieldItem.style.top = "".concat(top * fieldItemSize, "px");
  });
}
/* harmony default export */ const modules_createPuzzle = (createPuzzle);
;// CONCATENATED MODULE: ./modules/timer.js
function startTimer(options, time) {
  return setInterval(function () {
    options.secondsCounter++;
    if (options.secondsCounter > 59) {
      options.secondsCounter = 0;
      ++options.minutesCounter;
    }
    if (options.secondsCounter > 9 && options.secondsCounter < 60) {
      time.textContent = "Time: ".concat(options.minutesCounter, ":").concat(options.secondsCounter);
    } else {
      time.textContent = "Time: ".concat(options.minutesCounter, ":0").concat(options.secondsCounter);
    }
  }, 1000);
}
/* harmony default export */ const modules_timer = (startTimer);
;// CONCATENATED MODULE: ./modules/swapItems.js


function swapItems(e, options, field, audio, winSound, moves, stopField, results, restart) {
  if (e.target && e.target.textContent != '' && e.target.classList.contains('game__item')) {
    var winCheck = true;
    var emptyItem = document.querySelector('.empty'),
      emptyLeft = modules_getSize(emptyItem, 'left'),
      emptyTop = modules_getSize(emptyItem, 'top'),
      itemLeft = modules_getSize(e.target, 'left'),
      itemTop = modules_getSize(e.target, 'top'),
      leftDiff = Math.abs(emptyLeft - itemLeft),
      topDiff = Math.abs(emptyTop - itemTop),
      diff = Math.floor(Math.abs(leftDiff - topDiff));
    var itemWidth = Math.floor(modules_getSize(document.querySelector('.game__item'), 'width'));
    if ((leftDiff === 0 || topDiff === 0) && diff === itemWidth) {
      audio.play();
      field.style.pointerEvents = 'none';
      e.target.style.left = "".concat(emptyLeft, "px");
      e.target.style.top = "".concat(emptyTop, "px");
      emptyItem.style.left = "".concat(itemLeft, "px");
      emptyItem.style.top = "".concat(itemTop, "px");
      moves.textContent = "Moves: ".concat(++options.movesCounter);
      var itemIndex = options.numArr.findIndex(function (num) {
          return num == e.target.textContent;
        }),
        emptyItemIndex = options.numArr.findIndex(function (num) {
          return num == emptyItem.textContent;
        });
      options.numArr[itemIndex] = emptyItem.textContent;
      options.numArr[emptyItemIndex] = +e.target.textContent;
    }
    for (var i = 0; i < options.numArr.length - 2; i++) {
      if (options.numArr[i] > options.numArr[i + 1]) {
        winCheck = false;
      }
    }
    if (winCheck === true) {
      stopField.style.top = '0%';
      options.secondsCounter < 10 ? options.secondsCounter = '0' + options.secondsCounter : false;
      stopField.innerHTML = "<p>\u0423\u0440\u0430! \u0412\u044B \u0440\u0435\u0448\u0438\u043B\u0438 \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043A\u0443 \u0437\u0430 ".concat(options.minutesCounter, ":").concat(options.secondsCounter, " \u0438 ").concat(options.movesCounter, " \u0445\u043E\u0434\u043E\u0432!</p>");
      results.push([options.minutesCounter, options.secondsCounter, options.movesCounter, options.rowSize]);
      results.sort(function (a, b) {
        a = a[0] * 60 + a[1];
        b = b[0] * 60 + b[1];
        return a - b;
      });
      if (results.length > 10) {
        results.pop(results[results.length - 1]);
      }
      localStorage.setItem('results', JSON.stringify(results));
      winSound.play();
      setTimeout(function () {
        stopField.style.top = '-100%';
        restart();
      }, 3000);
    }
    setTimeout(function () {
      field.style.pointerEvents = '';
    }, 700);
  }
}
/* harmony default export */ const modules_swapItems = (swapItems);
;// CONCATENATED MODULE: ./modules/checkSolution.js
function checkSolution(arr) {
  var solvable = false,
    sum;
  while (!solvable) {
    arr.sort(function () {
      return Math.random() - 0.5;
    });
    var emptyIndex = arr.findIndex(function (item) {
        return item === '';
      }),
      rows = Math.sqrt(arr.length),
      rowsCounter = 0,
      rowWithEmptyItem = void 0;
    for (var i = 0; i < arr.length + rows; i += rows) {
      if (emptyIndex < i) {
        rowWithEmptyItem = rowsCounter;
        break;
      }
      rowsCounter++;
    }
    for (var _i = 0; _i < arr.length - 1; _i++) {
      if (arr[_i] != '') {
        for (var k = _i; k < arr.length; k++) {
          if (arr[_i] > arr[k] && arr[k] != '') {
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
/* harmony default export */ const modules_checkSolution = (checkSolution);
;// CONCATENATED MODULE: ./modules/restart.js


function restartField(options, sound, stopField, moves, time, field) {
  stopField.style.top = '-100%';
  sound.play();
  options.movesCounter = 0;
  options.secondsCounter = 0;
  options.minutesCounter = 0;
  moves.textContent = 'Moves: 0';
  time.textContent = 'Time: 00:00';
  field.innerHTML = '';
  modules_checkSolution(options.numArr);
  modules_createPuzzle(options, field);
}
/* harmony default export */ const restart = (restartField);
;// CONCATENATED MODULE: ./index.js






document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body'),
    container = document.createElement('div'),
    sound = document.createElement('audio'),
    winSound = document.createElement('audio'),
    wrapper = document.createElement('div'),
    field = document.createElement('div'),
    stopField = document.createElement('div'),
    progressField = document.createElement('div'),
    currentSize = document.createElement('p'),
    moves = document.createElement('p'),
    time = document.createElement('p'),
    btnField = document.createElement('div'),
    restartBtn = document.createElement('p'),
    saveBtn = document.createElement('p'),
    menuBtn = document.createElement('p'),
    menuField = document.createElement('ul'),
    scoreField = document.createElement('ul'),
    loadBtn = document.createElement('li'),
    scoreBtn = document.createElement('li'),
    stopBtn = document.createElement('p'),
    size = document.createElement('select'),
    audio = document.createElement('audio'),
    footer = document.createElement('footer'),
    audioControls = document.createElement('form'),
    sizeBar = document.createElement('div'),
    firstSize = document.createElement('span'),
    secondSize = document.createElement('span'),
    thirdSize = document.createElement('span'),
    fourthSize = document.createElement('span'),
    fifthSize = document.createElement('span'),
    sixSize = document.createElement('span');
  container.classList.add('container');
  menuBtn.classList.add('game__menu');
  saveBtn.classList.add('game__save');
  stopBtn.classList.add('game__stop');
  restartBtn.classList.add('game__restart');
  loadBtn.classList.add('game__load');
  scoreBtn.classList.add('game__results');
  menuField.classList.add('game__menu-field');
  scoreField.classList.add('game__score-field');
  btnField.classList.add('btn__field');
  field.classList.add('game__field');
  stopField.classList.add('game__field_stopped');
  wrapper.classList.add('game__wrapper');
  progressField.classList.add('game__progress');
  moves.classList.add('game__moves');
  currentSize.classList.add('game__current-size');
  time.classList.add('game__time');
  footer.classList.add('footer');
  audioControls.classList.add('audio__controls');
  size.classList.add('game__select');
  sizeBar.classList.add('game__select_footer');
  restartBtn.textContent = 'Shiffle and restart';
  stopBtn.textContent = 'Stop';
  saveBtn.textContent = 'Save';
  menuBtn.textContent = 'Menu';
  loadBtn.textContent = 'Load game';
  scoreBtn.textContent = 'Results';
  audio.innerHTML = '<source type="audio/mpeg" src="audio/sound.mp3"/>';
  audioControls.innerHTML = '<label for="html">Sound</label><input id="html" type="checkbox" checked>';
  stopField.innerHTML = '<p>PAUSE</p>';
  sound.innerHTML = '<source type="audio/mpeg" src="audio/btnsound.mp3"/>';
  winSound.innerHTML = '<source type="audio/mpeg" src="audio/win.mp3"/>';
  size.innerHTML = "\n    <option value=\"3x3\">3x3</option>\n    <option value=\"4x4\" selected>4x4</option>\n    <option value=\"5x5\">5x5</option>\n    <option value=\"6x6\">6x6</option>\n    <option value=\"7x7\">7x7</option>\n    <option value=\"8x8\">8x8</option>";
  currentSize.innerHTML = '4х4';
  firstSize.textContent = '3x3';
  secondSize.textContent = '4x4';
  thirdSize.textContent = '5x5';
  fourthSize.textContent = '6x6';
  fifthSize.textContent = '7x7';
  sixSize.textContent = '8x8';
  btnField.append(restartBtn, stopBtn, saveBtn, menuBtn);
  progressField.append(moves, currentSize, time);
  wrapper.append(stopField, field);
  sizeBar.append(firstSize, secondSize, thirdSize, fourthSize, fifthSize, sixSize);
  container.append(btnField, progressField, wrapper, audio, sound, footer, winSound);
  footer.append(audioControls, sizeBar);
  body.prepend(container);
  var gameResultsArr;
  var gameOptions = {
    cardHeigth: 24,
    cardWidth: 24,
    cardFontSize: 30,
    rowSize: 4,
    secondsCounter: 0,
    minutesCounter: 0,
    movesCounter: 0,
    numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']
  };
  try {
    gameResultsArr = JSON.parse(localStorage.getItem('results'));
    if (gameResultsArr.length === 0) {
      throw new Error('array is empty');
    }
  } catch (err) {
    gameResultsArr = [];
  }
  gameOptions.numArr = modules_checkSolution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']);
  modules_createPuzzle(gameOptions, field);
  moves.textContent = "Moves: ".concat(gameOptions.movesCounter);
  gameOptions.secondsCounter < 10 ? time.textContent = "Time: ".concat(gameOptions.minutesCounter, ":0").concat(gameOptions.secondsCounter) : time.textContent = "Time: ".concat(gameOptions.minutesCounter, ":").concat(gameOptions.secondsCounter);
  var timer = modules_timer(gameOptions, time);
  field.addEventListener('mousedown', function (e) {
    modules_swapItems(e, gameOptions, field, audio, winSound, moves, stopField, gameResultsArr, function () {
      restart(gameOptions, sound, stopField, moves, time, field);
    });
  });
  restartBtn.addEventListener('click', function () {
    restart(gameOptions, sound, stopField, moves, time, field);
  });
  stopBtn.addEventListener('click', function () {
    sound.play();
    stopBtn.classList.toggle('game__stop_active');
    if (stopBtn.classList.contains('game__stop_active')) {
      stopField.innerHTML = '<p>Paused</p>';
      stopField.style.top = '0%';
      menuBtn.style.pointerEvents = 'none';
      clearInterval(timer);
    } else {
      stopField.style.top = '-100%';
      timer = modules_timer(gameOptions, time);
      menuBtn.style.pointerEvents = '';
    }
  });
  saveBtn.addEventListener('click', function () {
    sound.play();
    stopField.innerHTML = '<p>GAME SAVED</p>';
    stopField.style.top = '0%';
    setTimeout(function () {
      stopField.style.top = '-100%';
    }, 1000);
    localStorage.setItem('save', JSON.stringify(gameOptions));
    if (menuBtn.classList.contains('game__menu_active')) {
      menuBtn.classList.remove('game__menu_active');
      timer = modules_timer(gameOptions, time);
    }
  });
  menuBtn.addEventListener('click', function () {
    sound.play();
    menuBtn.classList.toggle('game__menu_active');
    if (menuBtn.classList.contains('game__menu_active')) {
      stopField.innerHTML = '';
      menuField.innerHTML = '';
      menuField.append(loadBtn, scoreBtn);
      stopField.append(menuField);
      stopField.style.top = '0%';
      stopBtn.style.pointerEvents = 'none';
      clearInterval(timer);
    } else {
      stopField.style.top = '-100%';
      timer = modules_timer(gameOptions, time);
      stopBtn.style.pointerEvents = '';
    }
  });
  loadBtn.addEventListener('click', function () {
    if (JSON.parse(localStorage.getItem('save')) === null) {
      menuField.innerHTML = "<p>You don't have any saves!<p>";
      setTimeout(function () {
        menuField.innerHTML = '';
        menuField.append(loadBtn, scoreBtn);
      }, 1000);
    } else {
      gameOptions = JSON.parse(localStorage.getItem('save'));
      field.innerHTML = '';
      modules_createPuzzle(gameOptions, field);
      gameOptions.secondsCounter < 10 ? gameOptions.secondsCounter = '0' + gameOptions.secondsCounter : false;
      moves.textContent = "Moves: ".concat(gameOptions.movesCounter);
      time.textContent = "Time: ".concat(gameOptions.minutesCounter, ":").concat(gameOptions.secondsCounter);
      currentSize.textContent = "".concat(gameOptions.rowSize + 'x' + gameOptions.rowSize);
      menuBtn.classList.remove('game__menu_active');
      stopField.style.top = '-100%';
      timer = modules_timer(gameOptions, time);
      console.log(gameOptions);
    }
  });
  scoreBtn.addEventListener('click', function () {
    stopField.innerHTML = '';
    scoreField.innerHTML = '';
    stopField.append(scoreField);
    gameResultsArr.forEach(function (item, i) {
      var scoreLine = document.createElement('li');
      scoreLine.textContent = "".concat(i + 1, ".Moves:").concat(item[2], ",Time:").concat(item[0], ":").concat(item[1], ",size:").concat(item[3] + 'x' + item[3]);
      scoreField.append(scoreLine);
    });
  });
  audioControls.addEventListener('change', function () {
    sound.play();
    var check = audioControls.querySelector('input');
    if (!check.checked) {
      audio.volume = 0;
      sound.volume = 0;
      winSound.volume = 0;
    }
    if (check.checked) {
      audio.volume = 1;
      sound.volume = 1;
      winSound.volume = 1;
    }
  });
  sizeBar.addEventListener('click', function (e) {
    if (e.target && e.target.textContent.length === 3) {
      var sizeBtnValue = e.target.textContent,
        n = Math.pow(+e.target.textContent[0], 2);
      sound.play();
      switch (sizeBtnValue) {
        case '3x3':
          gameOptions.rowSize = 3;
          gameOptions.cardWidth = 32;
          gameOptions.cardHeigth = 32;
          gameOptions.cardFontSize = 46;
          break;
        case '4x4':
          gameOptions.rowSize = 4;
          gameOptions.cardWidth = 24;
          gameOptions.cardHeigth = 24;
          gameOptions.cardFontSize = 30;
          break;
        case '5x5':
          gameOptions.rowSize = 5;
          gameOptions.cardWidth = 19;
          gameOptions.cardHeigth = 19;
          gameOptions.cardFontSize = 26;
          break;
        case '6x6':
          gameOptions.numArr = [];
          gameOptions.rowSize = 6;
          gameOptions.cardWidth = 16;
          gameOptions.cardHeigth = 16;
          gameOptions.cardFontSize = 26;
          break;
        case '7x7':
          gameOptions.rowSize = 7;
          gameOptions.cardWidth = 13.6;
          gameOptions.cardHeigth = 13.6;
          gameOptions.cardFontSize = 20;
          break;
        case '8x8':
          gameOptions.rowSize = 8;
          gameOptions.cardWidth = 12;
          gameOptions.cardHeigth = 12;
          gameOptions.cardFontSize = 15;
          break;
      }
      gameOptions.numArr = [];
      for (var i = 1; i < n; i++) {
        gameOptions.numArr.push(i);
      }
      gameOptions.numArr.push('');
      gameOptions.movesCounter = 0;
      gameOptions.secondsCounter = 0;
      gameOptions.minutesCounter = 0;
      moves.textContent = 'Moves: 0';
      time.textContent = 'Time: 00:00';
      currentSize.textContent = "".concat(gameOptions.rowSize + 'x' + gameOptions.rowSize);
      field.innerHTML = '';
      modules_checkSolution(gameOptions.numArr);
      modules_createPuzzle(gameOptions, field);
    }
  });
  window.addEventListener('resize', function () {
    field.innerHTML = '';
    modules_createPuzzle(gameOptions, field);
  });
});
/******/ })()
;