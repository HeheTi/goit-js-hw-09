const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let IntervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBtnDisable(id) {
  refs.start.disabled = id;
  refs.stop.disabled = !id;
}

function onchangeBgColorBody(e) {
  if (IntervalId) return;
  changeBtnDisable(!IntervalId);
  const changeColor = () => {
    document.body.style.backgroundColor = getRandomHexColor();
  };
  changeColor();
  IntervalId = setInterval(changeColor, 1000);
}

function onStopchangeBgColorBody(e) {
  clearInterval(IntervalId);
  IntervalId = null;
  changeBtnDisable(IntervalId);
}

refs.start.addEventListener('click', onchangeBgColorBody);
refs.stop.addEventListener('click', onStopchangeBgColorBody);
