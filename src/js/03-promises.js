import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) resolve({ position, delay });
      reject({ position, delay });
    }, delay);
  });
}

function onSubmitForm(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;
  const STEP = +step.value;
  let delayCount = +delay.value;

  for (let i = 1; i <= +amount.value; i++) {
    createPromise(i, delayCount)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayCount += STEP;
  }
}

formRef.addEventListener('submit', onSubmitForm);
