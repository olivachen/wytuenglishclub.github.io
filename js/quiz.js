// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "I ________________ from France.",
        choiceA : "is",
        choiceB : "are",
        choiceC : "am",
        correct : "C"
    },{
        question : "Paul ________________ romantic films.",
        choiceA : "likes not",
        choiceB : "don't like",
        choiceC : "doesn't like",
        correct : "C"
    },{
        question : "The living room is ___________________ than the bedroom.",
        choiceA : "more big",
        choiceB : "bigger",
        choiceC : "more bigger",
        correct : "B"
    },{
        question : "Sue ________________ shopping every day.",
        choiceA : "is going",
        choiceB : "goes",
        choiceC : "go",
        correct : "B"
    },{
        question : "Jeff was ill last week and he _________________ go out.",
        choiceA : "needn't",
        choiceB : "can't",
        choiceC : "couldn't",
        correct : "C"
    },{
        question : "I promise I __________________ you as soon as I’ve finished this cleaning.",
        choiceA : "will help",
        choiceB : "am helping",
        choiceC : "have helped",
        correct : "A"
    },{
        question : "Excuse me, can you ___________________ me the way to the station, please?",
        choiceA : "give",
        choiceB : "take",
        choiceC : "tell",
        correct : "C"
    },{
        question : "We won’t catch the plane _________________ we leave home now! Please hurry up!  ",
        choiceA : "if",
        choiceB : "unless",
        choiceC : "except",
        correct : "B"
    },{
        question : "I don’t remember mentioning __________________ dinner together tonight.",
        choiceA : "going for",
        choiceB : "you going to",
        choiceC : "to go for",
        correct : "A"
    },{
        question : "I phoned her ____________ I heard the news.",
        choiceA : "minute",
        choiceB : "by the time",
        choiceC : "the moment",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 100; // 100px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#004AAD";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#999999";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent == 100) ? "images/C2.png" :
              (scorePerCent == 90) ? "images/C1.png" :
              (scorePerCent == 80) ? "images/B2.png" :
              (scorePerCent >= 60) ? "images/B1.png" :
              (scorePerCent >= 40) ? "images/A2.png" :
              (scorePerCent >= 10) ? "images/A1.png" :
                "images/NA.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
        let resultCEFR = (scorePerCent == 100) ? "Mastery or proficiency" :
              (scorePerCent == 90) ? "Effective operational proficiency or advanced" :
              (scorePerCent == 80) ? "Vantage or upper intermediate" :
              (scorePerCent >= 60) ? "Threshold or intermediate" :
              (scorePerCent >= 40) ? "Waystage or elementary" :
            (scorePerCent >= 10) ? "Breakthrough or beginner" :

              "No CEFR grade available";
            scoreDiv.innerHTML += "<p>"+ resultCEFR +"</p>";
    
    
}





















