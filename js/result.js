showPage();
let student = JSON.parse(localStorage.getItem("currentUser"));
let grade = student?.grade?.correct || 0;
const questions = student?.total || 10;

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
const progress = document.querySelector(".radial-progress")

correctQu.innerText = grade
inCorrectQu.innerText = questions - grade

let percent = +grade * 10;
progress.querySelector("div").innerText = percent + "%"
progress.style.setProperty("--value", percent);
progress.setAttribute("aria-valuenow", percent);

if (percent < 60) {
    progress.classList.add("text-[#dc2828]")
}
else {
    progress.classList.add("text-[#28af60]")
}