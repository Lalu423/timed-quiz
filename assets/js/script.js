//variables for Id containers
var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var viewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
// buttons
var btnStartEl = document.querySelector("#start-quiz")
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-score")

//question variables for array
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0
var timeleft;
var gameover
timerEl.innerText = 0

var HighScores = [];

// Questions
var arrayshuffledQuestions
var QuestionIndex = 0


var question = [
    {
        q: 'What tag is used in HTML to link your javascript file?',
        a: '2. <script>',
        choices: [{ choice: '1. <h1>' }, { choice: '2. <script>' }, { choice: '3. <src>' }, { choice: '4. <link>' }]
    },
    {
        q: 'what is the correct syntax for a function?',
        a: '3. function ()',
        choices: [{ choice: '1. function =' }, { choice: '2. var = function' }, { choice: '3. function ()' }, { choice: '4. function.var' }]
    },
    {
        q: 'How would I show that two strings or values have a strict equal operator?',
        a: '1. ===',
        choices: [{ choice: '1. ===' }, { choice: '2. ==' }, { choice: '3. !==' }, { choice: '4. /=' }]
    },
    {
        q: 'What symbol would I see to let me know I am dealing with an array?',
        a: '2. []',
        choices: [{ choice: '1. {} ' }, { choice: '2. [] ' }, { choice: '3. <> ' }, { choice: '4. "" ' }]
    },
    {
        q: 'What year was Javascript introduced to HTML?',
        a: '3. 1995',
        choices: [{ choice: '1. 1999' }, { choice: '2. 2001' }, { choice: '3. 1995' }, { choice: '4. 1988' }]
    },
];

var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }
    }, 1000)
}

var startGame = function () {
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    arrayshuffledQuestions = question.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

var setQuestion = function () {
    resetAnswers()
    displayQuestion(arrayshuffledQuestions[QuestionIndex])
}

var resetAnswers = function () {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)

    };
};

var displayQuestion = function (index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};

var answerCorrect = function () {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}

var answerWrong = function () {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add('banner')
        correctEl.classList.remove('banner')
        correctEl.classList.add('hide')
    }
}

var answerCheck = function (event) {
    var selectedanswer = event.target
    if (arrayshuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
        answerCorrect()
        console.log("questions", arrayshuffledQuestions[QuestionIndex])
        console.log("questions", arrayshuffledQuestions)
        score = score + 10
    }

    else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 5;
    };

    QuestionIndex++
    if (question.length > QuestionIndex) {
        setQuestion()
    }
    else {
        gameover = "true";
        showScore();
    }
}

var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}

var createHighScore = function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter Your Initials!");
        return;

    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }

    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }

    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + "-" + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }

    saveHighScore();
    displayHighScores();
}

var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })

    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + "-" + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);
    }
}

var displayHighScores = function () {
    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
    }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
    }
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
    }
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);
}

loadHighScore()

btnStartEl.addEventListener("click", startGame)

formInitials.addEventListener("submit", createHighScore)

viewHighScoreEl.addEventListener("click", displayHighScores)


btnGoBackEl.addEventListener("click", renderStartPage)

btnClearScoresEl.addEventListener("click", clearScores)
