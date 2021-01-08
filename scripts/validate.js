function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.buttonInvalidClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(config.buttonInvalidClass);
}

function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        disabledButton(button);
    }

}

function disabledButton(button) {
    button.disabled = 'disabled';
}

function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config)
        })
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config)

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    })
}

const validationConfig = {
    formSelector: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    inactiveButtonClass: 'popup__button_invalid',
    buttonInvalidClass: 'popup__input_state_invalid'
  }; 

enableValidation(validationConfig);
