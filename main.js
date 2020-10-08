
const categoryDiv = document.querySelector('.categoryDiv');
const categoryName = document.querySelector('.categoryName');


const timerDiv = document.querySelector('.timerDiv');
const timesUpDiv = document.querySelector('.timesUpDiv');
const questionDiv = document.querySelector('.questionDiv')
const optionsDiv = document.querySelector('.optionsDiv');
const quizBox = document.querySelector('.quizBox');
const resultBox = document.querySelector('.resultBox');
const nextQuestionButton = document.querySelector('.nextQuestionButton');
const scoreDiv = document.querySelector('.scoreDiv');
const homeDiv = document.querySelector('.homeDiv');

let timeLimit = 15;

let questionIndex = 0;
let categoryIndex = 0;
let correctAnswer = 0;
let attempt = 0;
let questionLength;
let interval;


function displayQuizBox(){
    quizBox.classList.remove('hide');
    getNewQuestion();
}

function getCategory(){
        let categoryLength = quiz.length;
        categoryDiv.classList.remove('hide');
        homeDiv.classList.add('hide');

        for(let i=0; i<categoryLength; i++){
            const category = document.createElement('div');
            category.setAttribute('onclick', 'selectCategory(this)');
            category.setAttribute('id', i);
            category.innerHTML = quiz[i].category;
            categoryDiv.appendChild(category);
        }

}

function selectCategory(element){
    categoryIndex = element.id;
    categoryDiv.classList.add('hide');
    quizBox.classList.remove('hide');
    getNewQuestion();
    categoryName.innerHTML = quiz[categoryIndex].category;
}



function getNewQuestion(){

    if(questionIndex < quiz[categoryIndex].question.length){
        updateScore();
        hideNextQuestionButton();
        timeLimit = 15;
        interval = setInterval(startTimer, 1000);
        optionsDiv.innerHTML = '';
        questionDiv.innerHTML =  quiz[categoryIndex].question[questionIndex].q;
        let optionlength = quiz[categoryIndex].question[questionIndex].options.length;

        for(let i=0; i<optionlength; i++){

            const option = document.createElement('div');
            option.setAttribute('onclick', 'clickedOption(this)');
            option.setAttribute('id', i);
            option.innerHTML = quiz[categoryIndex].question[questionIndex].options[i];
            optionsDiv.appendChild(option);
        }
    }
    else{

        showResult();
        quizBox.classList.add('hide');
        
        console.log('the quiz is over!')
    }
}

function clickedOption(element){

    disableOptions();
    stopTimer();
    getResult(element);
    questionIndex++;
    showNextQuestionButton();
}

function getResult(element){
    // console.log(categoryIndex)
    attempt++;
    let selected = parseInt(element.id)+1;
    let correct = quiz[categoryIndex].question[questionIndex].answer;
    if(selected == correct){
        correctAnswer++;
        updateScore();
    }
    else {
        console.log('Incorrect');
    }
    
}


function showResult(){
    resultBox.classList.remove('hide');

}

function updateScore(){
    scoreDiv.innerHTML = correctAnswer + "/" + quiz[categoryIndex].question.length;
}

function startTimer(){
    timerDiv.innerHTML = timeLimit;

    if (timeLimit>0) timeLimit--;
    else{
        hideTimerDiv();
        clearInterval(interval);
        displayTimesUp();
        disableOptions();
    }
}

function stopTimer(){
    clearInterval(interval);
}

function hideTimerDiv(){
    timerDiv.classList.add('hide');
}


function displayTimesUp(){
    timesUpDiv.classList.remove('hide');
}





function hideNextQuestionButton(){
    nextQuestionButton.classList.add('hide');
}

function showNextQuestionButton(){
    nextQuestionButton.classList.remove('hide');
}

function disableOptions(){
    let options = optionsDiv.querySelectorAll('div');
    for (let i=0; i<options.length; i++){
        options[i].style.pointerEvents = 'none';
    }
}

function goHome(){
    quizBox.classList.add('hide');
    categoryDiv.classList.add('hide');
    homeDiv.classList.remove('hide');
}

function resetQuiz(){
     questionIndex = 0;
     categoryIndex = 0;
     correctAnswer = 0;
     attempt = 0;
}

window.onload = function (){
    goHome();
}
