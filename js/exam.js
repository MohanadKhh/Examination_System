showPage();
function getExamState() {
    return JSON.parse(localStorage.getItem("examState")) || {};
}
const examState = getExamState();
const questions = examState.questions ?? [];
let student = getCurrentUser();

let currentQu = examState.currentQuestionIndex ?? 0;
const stAnswers = loadStudentAnswers()
var markedQuestions = examState.markQuestions ?? [];

const choices = document.querySelectorAll(".choice__btn");
const markBtn = document.querySelector(".mark__button")
const markText = markBtn.childNodes[2];
const markIcon = markBtn.childNodes[1];
let markList = document.querySelector(".mark__list")

let progressBar = document.getElementById("quizProgress")
let progessbarLabel = document.querySelector(".progessbar__label")
progressBar.value = 10 * stAnswers.size
progessbarLabel.innerText = `${stAnswers.size} of ${questions.length} answers`

function loadStudentAnswers() {
    const stored = examState.studentAnswers;
    return stored ? new Map(stored) : new Map();
}

function saveStudentAnswers() {
    localStorage.setItem(
        "examState",
        JSON.stringify({ ...getExamState(), studentAnswers: [...stAnswers] })
    );
}

function loadMarkSidebar() {
    for (const markQu of markedQuestions) {
        markList.insertAdjacentHTML(
            "beforeend",
            `
            <button id="marked__qu${markQu}" class="btn btn-outline btn-warning flex items-center justify-start gap-2 p-5 mx-5 bg-[#fffbf2] w-10/12 rounded-xl">
            <i class="fa-regular fa-bookmark text-[#f7b038]"></i>
            <div class="text-black font-normal">Question ${markQu + 1}</div>
            </button>
            `
        );

        const markedQubutton = document.getElementById(`marked__qu${markQu}`)
        markedQubutton.addEventListener("click", () => {
            let questionIndex = markedQubutton.id.slice(10);
            loadQu(Number(questionIndex))
        })
    }
}
loadMarkSidebar()


if (student) {
    document.getElementById("studentName").innerText =
        student.firstName + " " + student.lastName;
}

function submitExam() {
    let grade = 0;
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i]
        for (let j = 0; j < question.answers.length; j++) {
            if (stAnswers.get(i) == question.answers[j].ansText) {
                if (question.answers[j].isCorrect) {
                    grade++;
                }
                break;
            }
        }
    }
    localStorage.setItem("currentUser", JSON.stringify({
        ...getCurrentUser(),
        examStatus: 'finished', grade: {
            correct: grade,
            total: questions.length,
            percent: ((grade / questions.length) * 100).toFixed(2)
        }
    }));
    //clear data BEFORE redirect
    localStorage.removeItem("examState");
    updateCurrentUser();
    //now redirect
    setTimeout(() => window.location.href = "/result/", 50);
}



/** Timer Function **/
const TimeExamInMin = 5;
let timeLeft = examState.TimerExamInSec ?? TimeExamInMin * 60;

let timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60 % 60);
    let seconds = timeLeft % 60;

    const timerDiv = document.querySelector("#timer");
    const spans = document.querySelector("#timer .countdown").children;
    const parentSpan = document.querySelector(".countdown");

    spans[0].style.setProperty("--value", minutes);
    spans[1].style.setProperty("--value", seconds);

    timeLeft--;
    localStorage.setItem("examState", JSON.stringify({ ...getExamState(), TimerExamInSec: timeLeft }));

    if (timeLeft <= 29) {
        parentSpan.classList.add("text-red-600", "[-webkit-text-stroke:0.5px_black]")
        timerDiv.classList.add("bg-red-200")
    }

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        localStorage.removeItem("examState");
        let grade = 0;
        for (let i = 0; i < questions.length; i++) {
            let question = questions[i]
            for (let j = 0; j < question.answers.length; j++) {
                if (stAnswers.get(i) == question.answers[j].ansText) {
                    if (question.answers[j].isCorrect) {
                        grade++;
                    }
                    break;
                }
            }
        }
        localStorage.setItem("currentUser", JSON.stringify({
            ...getCurrentUser(),
            examStatus: 'timeout', grade: {
                correct: grade,
                total: questions.length,
                percent: ((grade / questions.length) * 100).toFixed(2)
            }
        }));
        updateCurrentUser();
        window.location.href = "/time-out/";
    }
}, 1000);




/** Question Functions **/

choices.forEach(btn => {
    btn.addEventListener("click", () => {
        stAnswers.set(currentQu, btn.querySelector(".choice__text").innerText)
        saveStudentAnswers();

        progressBar = document.getElementById("quizProgress")
        progessbarLabel = document.querySelector(".progessbar__label")
        progressBar.value = 10 * stAnswers.size
        progessbarLabel.innerText = `${stAnswers.size} of ${questions.length} answers`

        choices.forEach(c =>
            c.classList.remove("bg-slate-100", "border-indigo-300", "border-2")
        );

        btn.classList.add("bg-slate-100", "border-indigo-300", "border-2");
    });
});

function loadQu(quId) {
    choices.forEach(c =>
        c.classList.remove("bg-slate-100", "border-indigo-300", "border-2")
    );

    if (quId >= 0 && quId < questions.length) {
        currentQu = quId;
        localStorage.setItem("examState", JSON.stringify({ ...getExamState(), currentQuestionIndex: currentQu }));

        let quNum = quId + 1;

        document.getElementById("header__questionNum").innerText = quNum + "/" + questions.length
        document.getElementById("body__questionNum").innerText = "Question " + quNum

        document.getElementById("question__text").innerText = questions[quId].quText

        let choiceTexts = document.querySelectorAll("#question__choice .choice__text");
        questions[quId].answers.forEach((ans, i) => {
            choiceTexts[i].innerText = ans.ansText;
        });

        if (stAnswers.get(quId) != null) {
            choices.forEach(btn => {
                if (btn.querySelector(".choice__text").innerText == stAnswers.get(quId)) {
                    btn.classList.add("bg-slate-100", "border-indigo-300", "border-2");
                }
            })
        }

        if (markedQuestions.includes(quId)) {
            markText.textContent = "Marked";
            markBtn.className = "mark__button btn btn-soft btn-warning rounded-xl md-py-2 bg-[#f59f0b] text-white"
            markIcon.className = "fa-regular fa-bookmark text-white"
        }
        else {
            markText.textContent = "Mark";
            markBtn.className = "mark__button btn btn-soft btn-warning rounded-xl md-py-2 bg-[#f1ece8] text-[#97876c]"
            markIcon.className = "fa-regular fa-bookmark text-[#97876c]"
        }
    }
    updateNextButtonState();
    updatePrevButtonState();
}
loadQu(currentQu)


/*** Marked Questions Functions ***/
markBtn.addEventListener("click", () => {
    if (markedQuestions.includes(currentQu)) {
        markedQuestions = markedQuestions.filter(x => x !== currentQu);
        localStorage.setItem("examState", JSON.stringify({ ...getExamState(), markQuestions: markedQuestions }));

        const btn = document.getElementById(`marked__qu${currentQu}`);
        btn.remove();

        markText.textContent = "Mark";
        markBtn.className = "mark__button btn btn-soft btn-warning rounded-xl md-py-2 bg-[#f1ece8] text-[#97876c]"
        markIcon.className = "fa-regular fa-bookmark text-[#97876c]"
    }
    else {
        markedQuestions.push(currentQu);
        localStorage.setItem("examState", JSON.stringify({ ...getExamState(), markQuestions: markedQuestions }));

        markText.textContent = "Marked";
        markBtn.className = "mark__button btn btn-soft btn-warning rounded-xl md-py-2 bg-[#f59f0b] text-white"
        markIcon.className = "fa-regular fa-bookmark text-white"

        markList.insertAdjacentHTML(
            "beforeend",
            `
            <button id="marked__qu${currentQu}" class="btn btn-outline btn-warning flex items-center justify-start gap-2 p-5 mx-5 bg-[#fffbf2] w-10/12 rounded-xl">
            <i class="fa-regular fa-bookmark text-[#f7b038]"></i>
            <div class="text-black font-normal">Question ${currentQu + 1}</div>
            </button>
            `
        );

        const markedQubutton = document.getElementById(`marked__qu${currentQu}`)
        markedQubutton.addEventListener("click", () => {
            let questionIndex = markedQubutton.id.slice(10);
            loadQu(Number(questionIndex))
        })
    }
});

const markMobileBtn = document.getElementById("markedToggleBtn");
const markSidebar = document.querySelector(".marked__sidebar");
const overlay = document.getElementById("overlay");

markMobileBtn.addEventListener("click", () => {
    markSidebar.classList.toggle("translate-x-full");
    overlay.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
    const clickedInsideSidebar = markSidebar.contains(e.target);
    const clickedToggleButton = markMobileBtn.contains(e.target);
    const sidebarShownFlag = markSidebar.classList.contains("translate-x-full")


    if (!clickedInsideSidebar && !clickedToggleButton && !sidebarShownFlag) {
        markSidebar.classList.toggle("translate-x-full");
        overlay.classList.toggle("hidden");
    }
});



/*** Navigator functions ***/
let nextButtons = document.querySelectorAll(".nextBtn");

nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentQu < questions.length - 1) {
            currentQu++;
            loadQu(currentQu);
        }
    });
});

let prevButtons = document.querySelectorAll(".prevBtn");

prevButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentQu > 0) {
            currentQu--;
            loadQu(currentQu);
        }
    });
});


function updateNextButtonState() {
    let nextButtons = document.querySelectorAll(".nextBtn");

    if (currentQu >= questions.length - 1) {
        // make it disabled style
        nextButtons[0].className =
            "nextBtn btn btn-disabled btn-lg hidden md:block text-[#386f9b] bg-[#95c9eb] rounded-xl";
        nextButtons[1].className =
            "nextBtn btn btn-disabled btn-lg md:hidden text-[#386f9b] bg-[#95c9eb] rounded-xl";

        nextButtons[0].disabled = true;
        nextButtons[1].disabled = true;


    } else {
        // return normal style
        nextButtons[0].className =
            "nextBtn btn btn-lg hidden md:block bg-[#2662d9] rounded-xl hover:bg-[#2662ff] text-white border-none shadow-none";
        nextButtons[1].className =
            "nextBtn btn btn-info md:hidden bg-[#2662d9] rounded-xl hover:bg-[#2662ff] text-white py-4 px-5";

        nextButtons[0].disabled = false;
        nextButtons[1].disabled = false;
    }
}

function updatePrevButtonState() {
    let prevButtons = document.querySelectorAll(".prevBtn");

    if (currentQu <= 0) {
        // make it disabled style
        prevButtons[0].className =
            "prevBtn btn btn-disabled btn-lg hidden md:block text-[#386f9b] bg-[#95c9eb] rounded-xl";
        prevButtons[1].className =
            "prevBtn btn btn-disabled btn-lg md:hidden text-[#386f9b] bg-[#95c9eb] rounded-xl";

    } else {
        // return normal style
        prevButtons[0].className =
            "prevBtn btn btn-lg hidden md:block bg-[#e8ebee] rounded-xl hover:bg-[#e8ebff] border-none shadow-none";
        prevButtons[1].className =
            "prevBtn btn btn-info md:hidden bg-[#e8ebee] rounded-xl hover:bg-[#e8ebff] py-4 px-5";
    }
}

const navNumBtns = document.querySelectorAll(".navNum__btn");

navNumBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let questionIndex = Number(btn.innerText) - 1
        loadQu(questionIndex)
    });
});


/*** Submit Functions ***/
const submitBtn = document.querySelector(".submit__btn")

submitBtn.addEventListener("click", () => {
    if (stAnswers.size < questions.length) {
        alert("You don't answer all questions")
    }
    else
        submitExam()
});