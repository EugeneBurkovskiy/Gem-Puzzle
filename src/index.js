import './assets/styles/style.css';
import createPuzzle from './modules/createPuzzle.js';
import startTimer from './modules/timer';
import swapItems from './modules/swapItems';
import checkSolution from './modules/checkSolution';
import restartField from './modules/restart';

document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body'),
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
    size.innerHTML = `
    <option value="3x3">3x3</option>
    <option value="4x4" selected>4x4</option>
    <option value="5x5">5x5</option>
    <option value="6x6">6x6</option>
    <option value="7x7">7x7</option>
    <option value="8x8">8x8</option>`;
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


    let gameResultsArr;

    let gameOptions = {
        cardHeigth: 24,
        cardWidth: 24,
        cardFontSize: 30,
        rowSize: 4,
        secondsCounter: 0,
        minutesCounter: 0,
        movesCounter: 0,
        numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''],
    };

    try {
        gameResultsArr = JSON.parse(localStorage.getItem('results'));
        if (gameResultsArr.length === 0) {
            throw new Error('array is empty');
        }
    } catch (err) {
        gameResultsArr = [];
    }

    gameOptions.numArr = checkSolution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']);
    createPuzzle(gameOptions, field);
    moves.textContent = `Moves: ${gameOptions.movesCounter}`;

    gameOptions.secondsCounter < 10 ? time.textContent = `Time: ${gameOptions.minutesCounter}:0${gameOptions.secondsCounter}` : time.textContent = `Time: ${gameOptions.minutesCounter}:${gameOptions.secondsCounter}`;

    let timer = startTimer(gameOptions, time);

    field.addEventListener('mousedown', (e) => {
        swapItems(e, gameOptions, field, audio, winSound, moves, stopField, gameResultsArr, () => { restartField(gameOptions, sound, stopField, moves, time, field); });

    });

    restartBtn.addEventListener('click', () => { restartField(gameOptions, sound, stopField, moves, time, field); });

    stopBtn.addEventListener('click', () => {
        sound.play();
        stopBtn.classList.toggle('game__stop_active');
        if (stopBtn.classList.contains('game__stop_active')) {
            stopField.innerHTML = '<p>Paused</p>';
            stopField.style.top = '0%';
            clearInterval(timer);
        } else {
            stopField.style.top = '-100%';
            timer = startTimer(gameOptions, time);
        }
    });

    saveBtn.addEventListener('click', () => {
        sound.play();
        stopField.innerHTML = '<p>GAME SAVED</p>';
        stopField.style.top = '0%';
        setTimeout(() => { stopField.style.top = '-100%'; }, 1000);
        localStorage.setItem('save', JSON.stringify(gameOptions));
        if (menuBtn.classList.contains('game__menu_active')) {
            menuBtn.classList.remove('game__menu_active');
            timer = startTimer(gameOptions, time);
        }
    });

    menuBtn.addEventListener('click', () => {
        sound.play();
        menuBtn.classList.toggle('game__menu_active');
        if (menuBtn.classList.contains('game__menu_active')) {
            stopField.innerHTML = '';
            menuField.innerHTML = '';
            menuField.append(loadBtn, scoreBtn);
            stopField.append(menuField);
            stopField.style.top = '0%';
            clearInterval(timer);
        } else {
            stopField.style.top = '-100%';
            timer = startTimer(gameOptions, time);
        }
    });

    loadBtn.addEventListener('click', () => {
        if (JSON.parse(localStorage.getItem('save')) === null) {
            menuField.innerHTML = "<p>You don't have any saves!<p>";
            setTimeout(() => {
                menuField.innerHTML = '';
                menuField.append(loadBtn, scoreBtn);
            }, 1000);
        } else {
            gameOptions = JSON.parse(localStorage.getItem('save'));
            field.innerHTML = '';
            createPuzzle(gameOptions, field);
            gameOptions.secondsCounter < 10 ? gameOptions.secondsCounter = '0' + gameOptions.secondsCounter : false;
            moves.textContent = `Moves: ${gameOptions.movesCounter}`;
            time.textContent = `Time: ${gameOptions.minutesCounter}:${gameOptions.secondsCounter}`;
            currentSize.textContent = `${gameOptions.rowSize + 'x' + gameOptions.rowSize}`;
            menuBtn.classList.remove('game__menu_active');
            stopField.style.top = '-100%';
            timer = startTimer(gameOptions, time);
            console.log(gameOptions);
        }
    });

    scoreBtn.addEventListener('click', () => {
        stopField.innerHTML = '';
        scoreField.innerHTML = '';
        stopField.append(scoreField);
        gameResultsArr.forEach((item, i) => {
            let scoreLine = document.createElement('li');
            scoreLine.textContent = `${i + 1}.Moves:${item[2]},Time:${item[0]}:${item[1]},size:${item[3] + 'x' + item[3]}`;
            scoreField.append(scoreLine);
        });
    });

    audioControls.addEventListener('change', () => {
        sound.play();
        let check = audioControls.querySelector('input');
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

    sizeBar.addEventListener('click', (e) => {
        if (e.target && e.target.textContent.length === 3) {
            let sizeBtnValue = e.target.textContent,
                n = (+e.target.textContent[0]) ** 2;
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
            for (let i = 1; i < n; i++) {
                gameOptions.numArr.push(i);
            }

            gameOptions.numArr.push('');
            gameOptions.movesCounter = 0;
            gameOptions.secondsCounter = 0;
            gameOptions.minutesCounter = 0;
            moves.textContent = 'Moves: 0';
            time.textContent = 'Time: 00:00';
            currentSize.textContent = `${gameOptions.rowSize + 'x' + gameOptions.rowSize}`;
            field.innerHTML = '';
            checkSolution(gameOptions.numArr);
            createPuzzle(gameOptions, field);
        }
    });

    window.addEventListener('resize', () => {
        field.innerHTML = '';
        createPuzzle(gameOptions, field);
    });
});