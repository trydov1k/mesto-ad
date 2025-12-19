/* Из этого модуля должны экспортироваться только функции включения валидации и очистки ошибок. */

const showInputError = () => {};  /* отображает сообщение об ошибке под невалидным полем и добавляет соответствующие классы */

const hideInputError = () => {};  /* скрывает сообщение об ошибке и удаляет классы, связанные с ошибкой */

const checkInputValidity = () => {};  /* проверяет валидность конкретного поля. 
Если оно невалидно, вызывает showInputError, иначе — hideInputError. 
В случае, если в поля «Имя» или «Название» введён любой символ, кроме латинской буквы, кириллической буквы и дефиса, 
выводит кастомное сообщение об ошибке: «Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы». 
Текст ошибки разместить в data-* атрибуте поля ввода. */

const hasInvalidInput = () => {};  /* возвращает значение true, если хотя бы одно поле формы не прошло валидацию */

const disableSubmitButton = () => {};  /* делает кнопку формы неактивной */

const enableSubmitButton = () => {};  /* включает кнопку формы */

const toggleButtonState = () => {};  /* включает или отключает кнопку формы в зависимости от валидности всех полей. 
Если хотя бы одно из полей не прошло валидацию, кнопка формы должна быть неактивной. Если оба поля прошли — активной */

const setEventListeners = (formElement, inputSelector, submitButtonSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));  // Получаем список полей ввода текущей формы
  const buttonElement = Array.from(formElement.querySelector(submitButtonSelector));  // Получаем кнопку submit текущей формы
};  /* добавляет обработчики события input для всех полей формы. 
При каждом вводе проверяет валидность поля и вызывает функцию toggleButtonState */

const clearValidation = () => {};  /* очищает ошибки валидации формы и делает кнопку неактивной.
Принимает DOM-элемент формы и объект с настройками. Используйте эту функцию при открытии формы редактирования профиля. */

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));  // Получаем список всех форм
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();  // Удаляем стандартное поведение браузера при отправке формы
      });

      setEventListeners(formElement, validationSettings.inputSelector, validationSettings.submitButtonSelector)
    });
};  /* отвечает за включение валидации всех форм. */


/*const validationSettings = {
  formSelector: ".popup__form",                      ✔
  inputSelector: ".popup__input",                    ✔
  submitButtonSelector: ".popup__button",            ✔
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};*/