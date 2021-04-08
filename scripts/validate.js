// function showError(form, input, config) {
//     const error = form.querySelector(`#${input.id}-error`);
//     error.textContent = input.validationMessage;
//     input.classList.add(config.buttonInvalidClass);
// }

// function hideError(form, input, config) {
//     const error = form.querySelector(`#${input.id}-error`);
//     error.textContent = "";
//     input.classList.remove(config.buttonInvalidClass);
// }

// function checkInputValidity(form, input, config) {
//     if (input.validity.valid) {
//         hideError(form, input, config);
//     } else {
//         showError(form, input, config);
//     }
// }

// function setButtonState(button, isActive, config) {
//     if (isActive) {
//         button.classList.remove(config.inactiveButtonClass);
//         button.disabled = false;
//     } else {
//         button.classList.add(config.inactiveButtonClass);
//         disabledButton(button);
//     }

// }

// function disabledButton(button) {
//     button.disabled = 'disabled';
// }

// function setEventListener(form, config) {
//     const inputList = form.querySelectorAll(config.inputSelector);
//     const submitButton = form.querySelector(config.submitButtonSelector);

//     inputList.forEach(input => {
//         input.addEventListener('input', (evt) => {
//             checkInputValidity(form, input, config);
//             setButtonState(submitButton, form.checkValidity(), config)
//         })
//     });
// }

// function enableValidation(config) {
//     const forms = document.querySelectorAll(config.formSelector);
//     forms.forEach(form => {
//         setEventListener(form, config)

//         form.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//         });
//         const submitButton = form.querySelector(config.submitButtonSelector);
//         setButtonState(submitButton, form.checkValidity(), config)
//     })
// }


const configValidate = {
    formSelector: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: '.popup__input_type_error',
    inactiveButtonClass: '.popup__button_invalid',
    buttonInvalidClass: '.popup__input_state_invalid'
};

class FormValidator {
    constructor(options, formSelector) {
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._buttonInvalidClass = options.buttonInvalidClass;
        this._formSelector = formSelector;
    }

    _showError(inputElement, errorMessage) {
        const error = document.querySelector(`.${inputElement.id}-error`);
        error.textContent = errorMessage;
        error.classList.add(this._buttonInvalidClass);
    }

    _hideError = (inputElement) => {
        const error = document.querySelector(`.${inputElement.id}-error`);
        error.textContent = "";
        error.classList.remove(this._buttonInvalidClass);
    }

    _checkInputValidity = (inputElement) => {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;

            this._showError(inputElement, errorMessage);
        } else {
            this._hideError(inputElement);
        }
    };

    _toggleButtonState = () => {
        const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
        const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid);
    
        if (hasNotValidInput) {
          this._buttonElement.setAttribute("disabled", true);
          this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
          this._buttonElement.removeAttribute("disabled");
          this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
      };

    _setEventListeners = () => {
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);

        

        const inputListIterator = (inputElement) => {
            const handleInput = () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState(this._inputList, this._buttonElement);
            };
      
            inputElement.addEventListener("input", handleInput);
          };

          this._inputList.forEach(inputListIterator);
    this._toggleButtonState(this._inputList, this._buttonElement);

    };



    enableValidation() {
        this._setEventListeners()
    }

    clearValidation() {
        this._inputList.forEach(this._hideError);
        this._toggleButtonState();
      }

}

const profileFormValidator = new FormValidator(configValidate, profileForm);

profileFormValidator.enableValidation();
