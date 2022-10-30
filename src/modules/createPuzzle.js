import getSize from "./getSize";

function createPuzzle(options, field) {
  options.numArr.forEach((item, i) => {
    const fieldItem = document.createElement('div');
    fieldItem.classList.add('game__item');
    fieldItem.style.width = `${options.cardWidth}%`;
    fieldItem.style.height = `${options.cardHeigth}%`;
    field.style.fontSize = `${options.cardFontSize}px`;
    fieldItem.innerHTML = `${item}`;
    if (fieldItem.textContent === '') {
      fieldItem.classList.add('empty');
      fieldItem.style.cssText = `background: none;
                border:none;
                cursor:default;
                width:${options.cardWidth}%;
                height: ${options.cardHeigth}%;
                fontSize:${options.cardFontSize}px;`;
    }
    field.append(fieldItem);

    const fieldItemSize = getSize(fieldItem, 'width'),
      left = i % options.rowSize,
      top = ((i - left) / options.rowSize);
    fieldItem.style.left = `${left * (fieldItemSize)}px`;
    fieldItem.style.top = `${top * (fieldItemSize)}px`;
  });
}

export default createPuzzle;