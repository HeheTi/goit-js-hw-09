import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputTime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  faceDays: document.querySelector('[data-days]'),
  faceHours: document.querySelector('[data-hours]'),
  faceMinutes: document.querySelector('[data-minutes]'),
  faceSeconds: document.querySelector('[data-seconds]'),
};

const TIME_STEP = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const choiceDate = selectedDates[0];

    if (choiceDate <= options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.removeAttribute('disabled');

    refs.btnStart.addEventListener('click', () => {
      Notify.info('Timer is running;)');
      refs.btnStart.disabled = true;
      refs.inputTime.disabled = true;

      const idTime = setInterval(() => {
        if (choiceDate < Date.now()) {
          Notify.success('Ooooops... Countdown finished ♥');

          refs.inputTime.removeAttribute('disabled');
          clearInterval(idTime);
          return false;
        }

        const timeLeft = choiceDate - Date.now();

        const calculatedValues = convertMs(timeLeft);

        const { daysValid, hoursValid, minutesValid, secondsValid } =
          addLeadingZero(calculatedValues);

        refs.faceDays.textContent = `${daysValid}`;
        refs.faceHours.textContent = `${hoursValid}`;
        refs.faceMinutes.textContent = `${minutesValid}`;
        refs.faceSeconds.textContent = `${secondsValid}`;
      }, TIME_STEP);
    });
  },
};
const flatP = flatpickr(refs.inputTime, options);
console.log('🚀 ~ flatP', flatP);

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

function addLeadingZero({ days, hours, minutes, seconds }) {
  const secondsValid = seconds.toString().padStart(2, 0);
  const minutesValid = minutes.toString().padStart(2, 0);
  const hoursValid = hours.toString().padStart(2, 0);
  const daysValid = days.toString().padStart(3, 0);

  return { daysValid, hoursValid, minutesValid, secondsValid };
}
