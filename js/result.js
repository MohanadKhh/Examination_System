showPage();
let student = JSON.parse(localStorage.getItem("currentUser"));
let grade = student.grade.correct || 0;
const questionsLength = student.grade.total || 10;

if (student) {
    document.getElementById("studentName").innerText =
        student.firstName + " " + student.lastName;
}

signOutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.replace('/signin/');
});

const correctQu = document.querySelector(".correct__counts p")
const inCorrectQu = document.querySelector(".incorrect__counts p")
const scoreProgress = document.querySelector(".radial-progress")
const valueText = document.getElementById("scoreValue");

const titleMsg = document.querySelector(".title__message")
const titleStatus = document.querySelector(".title__status")

correctQu.innerText = grade
inCorrectQu.innerText = questionsLength - grade

let percent = +grade * 10

if (percent < 60) {
    titleMsg.innerText = "Keep Practicing!"
    titleStatus.innerText = "Fail"
    titleStatus.classList.add("text-[#dc2828]")
}
else {
    titleMsg.innerText = "Great keep going!"
    titleStatus.innerText = "Success"
    titleStatus.classList.add("text-[#28af60]")
}

if (percent < 60) {
    scoreProgress.classList.add("text-[#dc2828]")
}
else {
    scoreProgress.classList.add("text-[#28af60]")
}

function animateRadialProgress(target, duration = 2000) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(progress * target);

    // update UI
    scoreProgress.style.setProperty("--value", current);
    scoreProgress.setAttribute("aria-valuenow", current);
    valueText.innerText = current + "%";

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

animateRadialProgress(percent)