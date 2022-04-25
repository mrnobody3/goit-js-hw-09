import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const ref = {
  btn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
onSetAttributeDisabled(ref.btn);
let newDate = null;
let intervalId = null;
const mainObj = { days: 0, hours: 0, minutes: 0, seconds: 0 };

ref.btn.addEventListener('click', onTimerStart);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    newDate = selectedDates[0].getTime();
    if (newDate < Date.now()) {
      onSetAttributeDisabled(ref.btn);
    } else {
      onRemoveAttributeDisabled(ref.btn);
    }
  },
});

function onTimerStart() {
  intervalId = setInterval(() => {
    let leftTime = convertMs(newDate - Date.now());
    init(leftTime);

    if (newDate < Date.now()) {
      clearInterval(intervalId);
      init(mainObj);
    }
    console.log(newDate, Date.now());
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, 0);
}
function init({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
  ref.daysEl.textContent = pad(days);
  ref.hoursEl.textContent = pad(hours);
  ref.minutesEl.textContent = pad(minutes);
  ref.secondsEl.textContent = pad(seconds);
}
function onSetAttributeDisabled(item) {
  item.setAttribute('disabled', 'disabled');
}
function onRemoveAttributeDisabled(item) {
  item.removeAttribute('disabled');
}
