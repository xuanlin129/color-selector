const color = document.getElementById('color');
const colorControl = document.getElementById('color-control');
const ranges = document.querySelectorAll('.range');
const rgbTexts = document.querySelectorAll('.rgb-text');
const randomBtns = document.querySelectorAll('.btn');
const colorNum = document.querySelector('#color-num');

const number = ['00', '00', '00'];

ranges.forEach((range, i) => {
  range.addEventListener('input', () => {
    rgbTexts[i].value = range.value;
    color.style.background = `rgb(${ranges[0].value},${ranges[1].value},${ranges[2].value})`;
    number[i] = parseInt(range.value).toString(16).padStart(2, '0');
    colorNum.value = `${number[0]}${number[1]}${number[2]}`;
  });
});

randomBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    ranges[i].value = Math.round(Math.random() * 255);
    rgbTexts[i].value = ranges[i].value;
    color.style.background = `rgb(${ranges[0].value},${ranges[1].value},${ranges[2].value})`;
    number[i] = parseInt(rgbTexts[i].value).toString(16).padStart(2, '0');
    colorNum.value = `${number[0]}${number[1]}${number[2]}`;
  });
  btn.click();
});

rgbTexts.forEach((text, i) => {
  text.addEventListener('change', () => {
    if (text.value > 255 || text.value < 0) return;

    ranges[i].value = text.value;
    color.style.background = `rgb(${ranges[0].value},${ranges[1].value},${ranges[2].value})`;
    number[i] = parseInt(text.value).toString(16).padStart(2, '0');
    colorNum.value = `${number[0]}${number[1]}${number[2]}`;
  });
});

colorNum.addEventListener('change', () => {
  let num = colorNum.value.split('');
  for (let i = 0; i <= 2; i++) {
    rgbTexts[i].value = parseInt(num[i * 2], 16) * 16 + parseInt(num[i * 2 + 1], 16);
    ranges[i].value = rgbTexts[i].value;
  }
  color.style.background = `rgb(${ranges[0].value},${ranges[1].value},${ranges[2].value})`;
});

gsap.registerPlugin(Draggable);
Draggable.create('#color-control', {
  bounds: document.body,
  inertia: true,
  dragClickables: false,
});

function safariHacks() {
  let windowsVH = window.innerHeight / 100;
  document.body.style.setProperty('--vh', windowsVH + 'px');
  window.addEventListener('resize', function () {
    document.body.style.setProperty('--vh', windowsVH + 'px');
  });
}

safariHacks();
window.addEventListener('resize', safariHacks);
