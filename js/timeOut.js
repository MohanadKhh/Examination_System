showPage();
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var usernameDisplay = document.getElementById("usernameDisplay");

if (currentUser) {
    usernameDisplay.textContent =
        currentUser.firstName + " " + currentUser.lastName;
}

signOutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.replace('/signin/');
});

var examResults = currentUser?.grade || null;
if (examResults) {
    document.getElementById("correctAnswers").textContent =
        examResults.correct || 0;
    document.getElementById("totalQuestions").textContent =
        examResults.total || 10;
    document.getElementById("scorePercent").textContent =
        examResults.percent || 0;
}

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = "/signin/";
});
