function getSize(item, param) {
  if (param === 'width') {
    return +window.getComputedStyle(item).width.match(/\d+\.\d+/ig).join('');
  } else if (param === 'left') {
    let resArr = window.getComputedStyle(item).left.match(/\d+\.\d+/ig);
    if (resArr === null) {
      return 0;
    } else {
      return +resArr.join('');
    }
  } else if (param === 'top') {
    let resArr = window.getComputedStyle(item).top.match(/\d+\.\d+/ig);
    if (resArr === null) {
      return 0;
    } else {
      return +resArr.join('');
    }
  }
}

export default getSize;