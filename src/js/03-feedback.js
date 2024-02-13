import throttle from 'lodash.throttle';

const email = document.querySelector("[name='email']");
const message = document.querySelector("[name='message']");
const form = document.querySelector('.feedback-form');

const storageKey = 'feedback-form-state';

const saveToStorage = throttle(() => {
  const state = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}, 500);

form.addEventListener('input', saveToStorage);

const loadFromStorage = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const state = JSON.parse(stored);
      email.value = state.email;
      message.value = state.message;
    } catch (error) {
      console.log(error.message);
    }
  }
};

loadFromStorage();

form.addEventListener('submit', event => {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    alert('Please fill in all the fields!');
  } else {
    console.log('Form Data:', {
      email: email.value,
      message: message.value,
    });
  }
  localStorage.removeItem(storageKey);
  form.reset();
});