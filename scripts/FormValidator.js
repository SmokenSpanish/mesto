export default class FormValidator {
    constructor(options, formElement) {
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._buttonInvalidClass = options.buttonInvalidClass;
        this._formElement = formElement;
    }

    _showError(inputElement, errorMessage) {
        const error = document.querySelector(`#${inputElement.id}-error`);
        error.textContent = errorMessage;
        error.classList.add(this._buttonInvalidClass);
    }

    _hideError = (inputElement) => {
        const error = document.querySelector(`#${inputElement.id}-error`);
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
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

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