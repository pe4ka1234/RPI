const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
export const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (password) => {
    const regExp = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}$");

    const isValid = regExp.test(password);

    formValidation.password = isValid;

    console.log("Password validation...");
    console.log(`Password: ${password}, Valid: ${isValid}`);

    return isValid;
};


export const validateEmail = (email) => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = regExp.test(String(email).toLowerCase());
  formValidation.email = isValid;

  console.log("Email validation...");
  console.log(`Email: ${email}, Valid: ${isValid}`);

  return isValid;
};


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = (requiredFields = null) => {
    if (requiredFields) {
        return requiredFields.every((field) => !!formValidation[field]);
    }
    return Object.values(formValidation).every((validationStatus) => !!validationStatus);
};



// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue
  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue)
  }
}


// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
    console.log("formValues:", formValues);
    console.log("formValidation:", formValidation);
    const requiredFields = ['email', 'password'];
    if (!getValidationStatus(requiredFields)) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  return true
}

//Функция для обработки отправки формы авторизации
export const submitSignInForm = () => {
    const requiredFields = ['email', 'password'];

    if (!getValidationStatus(requiredFields)) {
        console.log("FORM IS INCORRECT");
        return false;
    }

    console.log("FORM IS FINE");
    console.log({
        email: formValues.login_email,
        password: formValues.login_password,
    });
    return true;
};


const signUpRequiredFields = [ 'email', 'password'];
const signInRequiredFields = ['login_email', 'login_password'];
const signUpButton = document.getElementById('sign_up_btn');
const signInButton = document.getElementById('sign_in_btn'); 

// Функция для обновления состояния кнопки регистрации
export const updateSignUpButtonState = () => {
    const isFormValid = getValidationStatus(signUpRequiredFields);
    signUpButton.disabled = !isFormValid;
};

// Функция для обновления состояния кнопки авторизации
export const updateSignInButtonState = () => {
    const isFormValid = getValidationStatus(signInRequiredFields);
    signInButton.disabled = !isFormValid;
};