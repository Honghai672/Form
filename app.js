var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirmPassword')
var form = document.querySelector('form')


var showError = function (input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')

    parent.classList.add('error')
    small.innerText = message
}

var showSuccess = function (input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')

    parent.classList.remove('error')
    small.innerText = ''
}

var checkEmail = function (input) {
    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    input.value = input.value.trim()

    let isEmailError = !regexEmail.test(input.value)

    if (regexEmail.test(input.value)) {
        showSuccess()
    } else {
        showError(input, 'email khong phu hop')
    }
    return isEmailError
}

var checkEmptyError = function (listInput) {
    listInput.forEach(input => {
        input.value = input.value.trim()

        if (!input.value) {
            showError(input, 'không được để trống trường này !')
        } else {
            showSuccess(input)
        }
    });
}

var checkLengthError = function (input, min, max) {
    input.value = input.value.trim()

    if (input.value.length < min) {
        showError(input, `it nhat la ${min} ky tu`)
        return true
    }

    if (input.value.length > max) {
        showError(input, `toi da la ${max} ky tu`)
        return true
    }

    return false
}

var checkMatchPassword = function (inputPassword, inputConfirmPassword) {
    if (inputPassword.value !== inputConfirmPassword.value) {
        showError(confirmPassword, 'Mat khau khong trung nhau')
        return true
    } else {
        return false
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault()

    let isEmptyError = checkEmptyError([username, email, password, confirmPassword])
    let isEmailError = checkEmail(email)
    let isUsernameLengthError = checkLengthError(username, 4, 10)
    let isPasswordLengthError = checkLengthError(password, 4, 10)
    let isPasswordMatch = checkMatchPassword(password, confirmPassword)
})
