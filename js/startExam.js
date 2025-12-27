var usernameDisplay = document.getElementById('usernameDisplay');
var signOutBtn = document.getElementById('signOutBtn');
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.replace('./signin.html');
} else {
    usernameDisplay.textContent = currentUser.firstName || 'Guest';
    document.body.classList.remove('opacity-0');
}

signOutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.replace('./signin.html');
});
