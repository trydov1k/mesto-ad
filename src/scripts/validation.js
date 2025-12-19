/* Из этого модуля должны экспортироваться только функции включения валидации и очистки ошибок. */

const showInputError = () => {};  /* отображает сообщение об ошибке под невалидным полем и добавляет соответствующие классы */

const hideInputError = () => {};  /* скрывает сообщение об ошибке и удаляет классы, связанные с ошибкой */

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};  /* проверяет валидность конкретного поля. */

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};  /* возвращает значение true, если хотя бы одно поле формы не прошло валидацию */

const disableSubmitButton = () => {};  /* делает кнопку формы неактивной */

const enableSubmitButton = () => {};  /* включает кнопку формы */

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  const inactiveClass = validationSettings.inactiveButtonClass;  // Получаем класс, который присвоим кнопке, если форма невалидна
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveClass);
  } else {
    buttonElement.classList.remove(inactiveClass);
  }
};  /* включает или отключает кнопку формы в зависимости от валидности всех полей. */

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));  // Получаем список полей ввода текущей формы
  const buttonElement = Array.from(formElement.querySelector(validationSettings.submitButtonSelector));  // Получаем кнопку submit текущей формы
  toggleButtonState(inputList, buttonElement);  // Включаем/выключаем кнопку отправки формы
  inputList.array.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);  // Проверяем валидность полей формы
      toggleButtonState(inputList, buttonElement, validationSettings);  // Включаем/выключаем кнопку отправки формы
    })
  });
};  /* добавляет обработчики события input для всех полей формы. */

const clearValidation = () => {};  /* очищает ошибки валидации формы и делает кнопку неактивной.
Принимает DOM-элемент формы и объект с настройками. Используйте эту функцию при открытии формы редактирования профиля. */

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));  // Получаем список всех форм
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();  // Удаляем стандартное поведение браузера при отправке формы
      });

      setEventListeners(formElement, validationSettings)
    });
};  /* отвечает за включение валидации всех форм. */


/*const validationSettings = {
  formSelector: ".popup__form",                      ✔
  inputSelector: ".popup__input",                    ✔
  submitButtonSelector: ".popup__button",            ✔
  inactiveButtonClass: "popup__button_disabled",     ✔
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};*/