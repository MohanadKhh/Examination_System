var form = document.querySelector('form');
var nameRegex = /^[A-Za-z](?!.*[-'\s]{2})[A-Za-z\s'-]{0,48}[A-Za-z]$/;
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirmPassword');
var registerButton = document.getElementById('registerButton');
var firstNameError = document.getElementById('firstNameError');
var lastNameError = document.getElementById('lastNameError');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');
var confirmPasswordError = document.getElementById('confirmPasswordError');
var togglePassword = document.getElementById('togglePassword');
var toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

function validateFirstName(value) {
    const trimStr = value.trim();
    if (!trimStr) return 'First name is required';
    if (trimStr.length < 2) 'First name must be at least 2 characters';
    if (!nameRegex.test(trimStr)) return 'First name contains invalid characters';
    return '';
}

function validateLastName(value) {
    const trimStr = value.trim();
    if (!trimStr) return 'Last name is required';
    if (trimStr.length < 2) 'Last name must be at least 2 characters';
    if (!nameRegex.test(trimStr)) return 'Last name contains invalid characters';
    return '';
}

function validateEmail(value) {
    const trimStr = value.trim().toLowerCase();
    if (!trimStr) return 'Email is required';
    if (!emailRegex.test(trimStr)) return 'Please enter a valid email address';
    return '';
}

function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/\d/.test(value)) return 'Password must contain a number';
    if (!passwordRegex.test(value)) return 'Password must contain a special character';
    return '';
}

function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
}

firstNameInput.addEventListener('input', function (e) {
    firstNameError.classList.add('hidden');
    if (validateFirstName(e.target.value)) {
        firstNameInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        firstNameError.textContent = validateFirstName(e.target.value);
        firstNameError.classList.remove('hidden');
    }
    else {
        firstNameInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
lastNameInput.addEventListener('input', function (e) {
    lastNameError.classList.add('hidden');
    if (validateLastName(e.target.value)) {
        lastNameInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        lastNameError.textContent = validateLastName(e.target.value);
        lastNameError.classList.remove('hidden');
    }
    else {
        lastNameInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
emailInput.addEventListener('input', function (e) {
    emailError.classList.add('hidden');
    if (validateEmail(e.target.value)) {
        emailInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        emailError.textContent = validateEmail(e.target.value);
        emailError.classList.remove('hidden');
    }
    else {
        emailInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
passwordInput.addEventListener('input', function (e) {
    passwordError.classList.add('hidden');
    if (validatePassword(e.target.value)) {
        passwordInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        passwordError.textContent = validatePassword(e.target.value);
        passwordError.classList.remove('hidden');
    }
    else {
        passwordInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
confirmPasswordInput.addEventListener('input', function (e) {
    confirmPasswordError.classList.add('hidden');
    if (validateConfirmPassword(passwordInput.value, e.target.value)) {
        confirmPasswordInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        confirmPasswordError.textContent = validateConfirmPassword(passwordInput.value, e.target.value);
        confirmPasswordError.classList.remove('hidden');
    }
    else {
        confirmPasswordInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
firstNameInput.addEventListener('blur', function (e) {
    firstNameError.classList.add('hidden');
    if (validateFirstName(e.target.value)) {
        firstNameInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        firstNameError.textContent = validateFirstName(e.target.value);
        firstNameError.classList.remove('hidden');
    }
    else {
        firstNameInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
lastNameInput.addEventListener('blur', function (e) {
    lastNameError.classList.add('hidden');
    if (validateLastName(e.target.value)) {
        lastNameInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        lastNameError.textContent = validateLastName(e.target.value);
        lastNameError.classList.remove('hidden');
    }
    else {
        lastNameInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
emailInput.addEventListener('blur', function (e) {
    emailError.classList.add('hidden');
    if (validateEmail(e.target.value)) {
        emailInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        emailError.textContent = validateEmail(e.target.value);
        emailError.classList.remove('hidden');
    }
    else {
        emailInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
passwordInput.addEventListener('blur', function (e) {
    passwordError.classList.add('hidden');
    if (validatePassword(e.target.value)) {
        passwordInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        passwordError.textContent = validatePassword(e.target.value);
        passwordError.classList.remove('hidden');
    }
    else {
        passwordInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});
confirmPasswordInput.addEventListener('blur', function (e) {
    confirmPasswordError.classList.add('hidden');
    if (validateConfirmPassword(passwordInput.value, e.target.value)) {
        confirmPasswordInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        confirmPasswordError.textContent = validateConfirmPassword(passwordInput.value, e.target.value);
        confirmPasswordError.classList.remove('hidden');
    }
    else {
        confirmPasswordInput.classList.remove('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
    }
});

togglePassword.addEventListener('click', function () {
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('use').setAttribute('href', type === 'password' ? './assets/icons/eye-open.svg' : './assets/icons/eye-closed.svg');
});

toggleConfirmPassword.addEventListener('click', function () {
    var type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.querySelector('use').setAttribute('href', type === 'password' ? './assets/icons/eye-open.svg' : './assets/icons/eye-closed.svg');
});

function startLoading() {
    registerButton.disabled = true;
    registerButton.classList.add('cursor-not-allowed', 'pointer-events-none');
    registerButton.querySelector('svg').querySelector('use').setAttribute('href', './assets/icons/spinner.svg');
    registerButton.querySelector('svg').classList.add('animate-spin');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var valid = true;
    if (validateFirstName(firstNameInput.value)) {
        firstNameError.textContent = validateFirstName(firstNameInput.value);
        firstNameError.classList.remove('hidden');
        firstNameInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        valid = false;
    }
    if (validateLastName(lastNameInput.value)) {
        lastNameError.textContent = validateLastName(lastNameInput.value);
        lastNameError.classList.remove('hidden');
        lastNameInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        valid = false;
    }
    if (validateEmail(emailInput.value)) {
        emailError.textContent = validateEmail(emailInput.value);
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        valid = false;
    }
    if (validatePassword(passwordInput.value)) {
        passwordError.textContent = validatePassword(passwordInput.value);
        passwordError.classList.remove('hidden');
        passwordInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        valid = false;
    }
    if (validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)) {
        confirmPasswordError.textContent = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
        confirmPasswordError.classList.remove('hidden');
        confirmPasswordInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
        valid = false;
    }
    if (valid) {
        startLoading();
        setTimeout(function () {
            registerButton.disabled = false;
            registerButton.classList.remove('cursor-not-allowed', 'pointer-events-none');
            registerButton.querySelector('svg').querySelector('use').setAttribute('href', './assets/icons/arrow-right.svg');
            registerButton.querySelector('svg').classList.remove('animate-spin');
        }, 1500);
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var isEmailTaken = false;
        users.forEach(function (user) {
            if (user.email === emailInput.value.trim().toLowerCase()) {
                isEmailTaken = true;
            }
        });
        if (isEmailTaken === true) {
            emailError.textContent = 'Email is already registered';
            emailError.classList.remove('hidden');
            emailInput.classList.add('border-destructive', 'ring-[3px]', 'ring-destructive/30', 'ring');
            valid = false;
        } else {
            users.push({
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim().toLowerCase(),
                password: passwordInput.value
            });
            localStorage.setItem('users', JSON.stringify(users));
            location.href = 'signin.html';
        }
    }
});