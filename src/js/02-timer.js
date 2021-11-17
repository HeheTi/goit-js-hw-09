import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  myInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  faceDays: document.querySelector('[data-days]'),
  faceHourse: document.querySelector('[data-hours]'),
  faceMinutes: document.querySelector('[data-minutes]'),
  faceSeconds: document.querySelector('[data-seconds]'),
};

const TIME_STEP = 1000;
let idTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate)
      return Notify.failure('Please choose a date in the future');

    refs.btnStart.removeAttribute('disabled');
  },
};

const timer = flatpickr(refs.myInput, options);

refs.btnStart.addEventListener('click', onStartCountdown);

function onStartCountdown(e) {
  Notify.info('Timer is running;)');

  refs.btnStart.disabled = true;
  refs.myInput.disabled = true;

  idTimer = setInterval(() => {
    const selectedUserTime = timer.selectedDates[0];

    if (selectedUserTime < Date.now()) {
      Notify.success('Ooooops... Countdown finished ♥');

      refs.myInput.removeAttribute('disabled');
      clearInterval(idTimer);
      return false;
    }

    const remainingTime = selectedUserTime - Date.now();

    const conversTime = convertMs(remainingTime);

    const [days, hours, minutes, seconds] = preparingData(conversTime);

    changeTimer([days, hours, minutes, seconds]);
  }, TIME_STEP);
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

function addLeadingZero(value, lengthStr) {
  return String(value).padStart(lengthStr, '0');
}

function preparingData(obj) {
  return Object.values(obj).map((item, index, array) => {
    return array.indexOf(array[0]) === index ? addLeadingZero(item, 3) : addLeadingZero(item, 2);
  });
}

function changeTimer([days, hours, minutes, seconds]) {
  refs.faceDays.textContent = days;
  refs.faceHourse.textContent = hours;
  refs.faceMinutes.textContent = minutes;
  refs.faceSeconds.textContent = seconds;
}



