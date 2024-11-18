import { setFormValue, submitSignUpForm, validateEmail, validatePassword, formValidation, updateSignUpButtonState, updateSignInButtonState } from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
const password = document.getElementById('password');
password.classList.add("valid")
password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document")
console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const email_id = 'email'

const sign_in_link_id = 'sign_in_link'
const sign_up_link_id = 'sign_up_link';
const sign_up_form_id = 'sign_up_form'
const sign_up_btn_id = 'sign_up_btn'
const sign_in_btn_id = 'sign_in_btn'
const sign_in_form_id = 'sign_in_form'

const login_email_id = 'login_email'
const login_password_id = 'login_password'

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

// Обработчик для формы регистрации
const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)  


const email = document.getElementById(email_id);
email.oninput = (e) => {

    setFormValue(email_id, e.target.value, validateEmail)
    if (formValidation.email) {
        email.classList.remove('invalid');
        email.classList.add('valid');
    } else {
        email.classList.remove('valid');
        email.classList.add('invalid');
    }
    updateSignUpButtonState();
} 

password.oninput = (e) => {
    setFormValue(password_id, e.target.value, validatePassword);

    if (formValidation.password) {
        password.classList.remove('invalid');
        password.classList.add('valid');
    } else {
        password.classList.remove('valid');
        password.classList.add('invalid');
    }
    updateSignUpButtonState();
};

// Обработчик для формы авторизации
const login_email = document.getElementById(login_email_id);
login_email.oninput = (e) => {

    setFormValue(login_email_id, e.target.value, validateEmail);

    if (formValidation.email) {
        login_email.classList.remove('invalid');
        login_email.classList.add('valid');
    } else {
        login_email.classList.remove('valid');
        login_email.classList.add('invalid');
    }
    updateSignInButtonState();
}


const login_password = document.getElementById(login_password_id);
login_password.oninput = (e) => {
    setFormValue(login_password_id, e.target.value, validatePassword);

    if (formValidation.login_password) {
        login_password.classList.remove('invalid');
        login_password.classList.add('valid');
    } else {
        login_password.classList.remove('valid');
        login_password.classList.add('invalid');
    }
    updateSignInButtonState();
};

// Переключение между формами
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
    document.getElementById(sign_up_form_id).style.display = "none"
    document.getElementById(sign_in_form_id).style.display = "block"
}

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
    document.getElementById(sign_in_form_id).style.display = "none";
    document.getElementById(sign_up_form_id).style.display = "block";
};

// Обработчик для кнопки регистрации
const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {

    e.preventDefault();
    submitSignUpForm();
}

// Обработчик для кнопки авторизации
const sign_in_btn = document.getElementById(sign_in_btn_id);
sign_in_btn.onclick = (e) => {
    e.preventDefault();
    submitSignInForm();
}
