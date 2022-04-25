function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
ref = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
ref.btnStart.addEventListener('click', onStartColorChange);
ref.btnStop.addEventListener('click', onStopColorChange);
onSetDisabled(ref.btnStop);

let intervalId = null;
function onStartColorChange() {
  onSetDisabled(ref.btnStart);
  onRemoveDisabled(ref.btnStop);
  intervalId = setInterval(() => {
    let color = getRandomHexColor();
    document.body.style.backgroundColor = `${color}`;
  }, 1000);
}
function onStopColorChange() {
  onSetDisabled(ref.btnStop);
  onRemoveDisabled(ref.btnStart);
  clearInterval(intervalId);
}
function onSetDisabled(btn) {
  btn.setAttribute('disabled', 'disabled');
}
function onRemoveDisabled(btn) {
  btn.removeAttribute('disabled');
}
