let question = {
    id: null,
    quText: "",
    answers: [],
}

let answer = {
    ansText: "",
    isCorrect: true,
}

let student = {
    firstName: "Mohanad",
    lastName: "Khaled",
    email: "mohanedkkhaled@gmail.com",
    password: "123456789"
}

let examQuestions = [
    [
        "What is the capital of Egypt?",
        "Cairo",
        "Alexandria",
        "Giza",
        "Aswan"
    ],
    [
        "Which river is the main source of water in Egypt?",
        "Nile River",
        "Amazon River",
        "Tigris River",
        "Euphrates River"
    ],
    [
        "What is the official language of Egypt?",
        "Arabic",
        "English",
        "French",
        "Spanish"
    ],
    [
        "Which sector plays a major role in Egypt’s economy?",
        "Agriculture",
        "Space industry",
        "Shipbuilding",
        "Fishing only"
    ],
    [
        "What currency is used in Egypt?",
        "Egyptian Pound",
        "Dollar",
        "Euro",
        "Pound Sterling"
    ],
    [
        "Which city is known as the Bride of the Mediterranean?",
        "Alexandria",
        "Port Said",
        "Damietta",
        "Matrouh"
    ],
    [
        "What is the main religion practiced by the majority of Egyptians?",
        "Islam",
        "Christianity",
        "Judaism",
        "Hinduism"
    ],
    [
        "Which of the following is a famous traditional Egyptian food?",
        "Koshary",
        "Sushi",
        "Pizza",
        "Tacos"
    ],
    [
        "What is a common social value in Egyptian society?",
        "Family bonding",
        "Individualism only",
        "Isolation",
        "Competition only"
    ],
    [
        "Which education stage is compulsory in Egypt?",
        "Primary education",
        "University",
        "Secondary school",
        "Master’s degree"
    ]
];

var questions = []

for (let i = 0; i < examQuestions.length; i++) {
    var tempAns = []
    for (let j = 1; j < examQuestions[i].length; j++) {
        tempAns.push({
            ansText: examQuestions[i][j],
            isCorrect: j === 1,
        })
    }

    questions.push({
        id: i,
        quText: examQuestions[i][0],
        answers: tempAns,
    })
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// shuffle question order
shuffle(questions);

// shuffle answers inside each question
questions.forEach(q => {
  shuffle(q.answers);
});


localStorage.setItem("student", JSON.stringify(student));
localStorage.setItem("examQuestions", JSON.stringify(questions));


let student2 = JSON.parse(localStorage.getItem("student"));

if (student2) {
    document.getElementById("studentName").innerText =
        student2.firstName + " " + student2.lastName;
}

/** Timer Function **/
let timeLeft = 10 * 60; // 10 minutes in seconds

let timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60 % 60);
    let seconds = timeLeft % 60;

    const spans = document.querySelector("#timer .countdown").children;

    spans[0].style.setProperty("--value", minutes);
    spans[1].style.setProperty("--value", seconds);

    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        alert("Time is up!");
        submitExam();   //****************** need to impelement ******************** */
    }
}, 1000);


/** Question Functions **/
let currentQu = 0;
const stAnswers = new Map();
var markedQuestions = []
const choices = document.querySelectorAll(".choice__btn");
const markBtn = document.querySelector(".mark__button")
const markText = markBtn.childNodes[2];
const markIcon = markBtn.childNodes[1];

choices.forEach(btn => {
    btn.addEventListener("click", () => {
        stAnswers.set(currentQu, btn.querySelector(".choice__text").innerText)

        let progressBar = document.getElementById("quizProgress")
        let progessbarLabel = document.querySelector(".progessbar__label")
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
let markList = document.querySelector(".mark__list")

markBtn.addEventListener("click", () => {
    if (markedQuestions.includes(currentQu)) {
        markedQuestions = markedQuestions.filter(x => x !== currentQu);
        const btn = document.getElementById(`marked__qu${currentQu}`);
        btn.remove();

        markText.textContent = "Mark";
        markBtn.className = "mark__button btn btn-soft btn-warning rounded-xl md-py-2 bg-[#f1ece8] text-[#97876c]"
        markIcon.className = "fa-regular fa-bookmark text-[#97876c]"
    }
    else {
        markedQuestions.push(currentQu);

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
    else {
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
        console.log(grade);
    }
});