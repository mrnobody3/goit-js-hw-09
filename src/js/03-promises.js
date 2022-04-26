import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmitFn);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfill(`Fulfilled promise ${position} in ${delay}ms`);
        // Fulfill
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
        // Reject
      }
    }, delay);
  });

  promise
    .then(result => {
      Notify.success(result);
    })
    .catch(result => {
      Notify.failure(result);
    });
}
function onSubmitFn(e) {
  e.preventDefault();
  const formData = new FormData(formRef);
  let delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = formData.get('amount');
  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay);
  }
}
