showPage();

var submitBtn = document.getElementById('submitBtn');
var usernameDisplay = document.getElementById('usernameDisplay');
var signOutBtn = document.getElementById('signOutBtn');
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    usernameDisplay.textContent = currentUser.firstName + ' ' + currentUser.lastName;
}

signOutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.replace('/signin/');
});

submitBtn.addEventListener('click', function () {
    let question = {
        id: null,
        quText: "",
        answers: [],
    }

    let answer = {
        ansText: "",
        isCorrect: true,
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

    shuffle(questions);

    questions.forEach(q => {
        shuffle(q.answers);
    });


    localStorage.setItem("examQuestions", JSON.stringify(questions));
});