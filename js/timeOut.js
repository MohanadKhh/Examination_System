showPage();
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var usernameDisplay = document.getElementById("usernameDisplay");

if (currentUser) {
    usernameDisplay.textContent =
        currentUser.firstName + " " + currentUser.lastName;
}

var examResults = JSON.parse(localStorage.getItem("grade"));
if (examResults) {
    document.getElementById("correctAnswers").textContent =
        examResults.correct || 0;
    document.getElementById("totalQuestions").textContent =
        examResults.total || 10;
    document.getElementById("scorePercent").textContent =
        examResults.percent || 0;
}

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = "/start-exam/";
});
