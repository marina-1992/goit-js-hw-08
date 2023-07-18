import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onInputData, 500));
const LOCAL_KEY = 'feedback-form-state';

let dataValue = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = form.elements;
onLoading();

function onSubmitForm(event) {
  event.preventDefault();
 console.log({ email: email.value, message: message.value });
if (email.value === "" || message.value === "") {
   return alert("Please fill in all the fields!")
}
  localStorage.removeItem(LOCAL_KEY)
  event.currentTarget.reset();
  dataValue = {};
}

function onInputData() {
dataValue = { email: email.value, message: message.value};
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataValue));
  onLoading();
};

function onLoading() {
  if (dataValue) {
    email.value = dataValue.email || '';
    message.value = dataValue.message || '';
  }
};

