var form = document.querySelector('form');
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var submitBtn = document.getElementById('submitBtn');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');
var signinError = document.getElementById('signinError');
var togglePassword = document.getElementById('togglePassword');

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

emailInput.addEventListener('input', function (e) {
    signinError.classList.add('hidden');
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
    signinError.classList.add('hidden');
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

togglePassword.addEventListener('click', function () {
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('use').setAttribute('href', type === 'password' ? './assets/icons/eye-open.svg' : './assets/icons/eye-closed.svg');
});

function startLoading() {
    submitBtn.disabled = true;
    submitBtn.classList.add('cursor-not-allowed', 'pointer-events-none');
    submitBtn.querySelector('svg').querySelector('use').setAttribute('href', './assets/icons/spinner.svg');
    submitBtn.querySelector('svg').classList.add('animate-spin');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var valid = true;
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
    if (valid) {
        startLoading();
        setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.classList.remove('cursor-not-allowed', 'pointer-events-none');
            submitBtn.querySelector('svg').querySelector('use').setAttribute('href', './assets/icons/arrow-right.svg');
            submitBtn.querySelector('svg').classList.remove('animate-spin');
        }, 1500);
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var isAccountValid = false;
        users.forEach(function (user) {
            if (user.email === emailInput.value.trim().toLowerCase()) {
                if (user.password === passwordInput.value) {
                    isAccountValid = true;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = './start-exam.html';
                }
            }
        });
        if (!isAccountValid) {
            signinError.classList.remove('hidden');
            valid = false;
        }
    }
});