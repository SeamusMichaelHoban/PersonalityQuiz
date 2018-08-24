// This keeps track of the number of questions the student has answered that match each result
// It will be reset each time the quiz starts
const scoreKeeper = {
    dog: 0,
    cat: 0,
    parrot: 0,
    turtle: 0,
};
let currentQuestionIndex = 0;
const questions = [
    {
        text: 'What are you most likely to be doing at a party?',
        options: [
            {
                text: 'Playing games and making new friends',
                point: 'dog',
            },
            {
                text: 'Watching from a corner, hoping someone interesting shows up',
                point: 'cat',
            },
            {
                text: 'Partying! Dressed up, chatting it up, dancing... maybe a little loud',
                point: 'parrot',
            },
            {
                text: 'I would help set up beforehand and make sure everything goes smoothly',
                point: 'turtle',
            },
        ],
    }
]
function startQuiz() {

    // This puts a message in the console
    // Press Ctrl+Shift+I to open the console in Chrome
    // (Google how to open the dev tools in your browser if you're not sure)
    console.log('Quiz started!');

    // Reset score
    // This loops over each of the properties in the object
    for (let result in scoreKeeper) {
        // We are setting that property's value back to zero
        scoreKeeper[result] = 0;
    }

    // Ask first question
    // This function is defined below
    // We are passing the first question in our questions array into this function
    askQuestion(questions[0]);
}
// Display Question
function askQuestion(question) {
    let quizZone = document.getElementById('quizZone');
    while (quizZone.firstChild) {
        quizZone.removeChild(quizZone.firstChild);
    }
    let questionP = document.createElement('p');
    questionP.innerText = question.text;
    quizZone.appendChild(questionP);
    let answerDiv = document.createElement('div');
    answerDiv.setAttribute('id', 'quizAnswers');
    quizZone.appendChild(answerDiv);
    question.options.forEach((option, i) => {

        // Create a list item for this option
        let optionDiv = document.createElement('div');
        optionDiv.setAttribute('class', 'quizOption');
        optionDiv.innerText = option.text;
        answerDiv.appendChild(optionDiv);
        // Add the index to the optionDiv so we can use it later
        optionDiv.index = i;

        // Attache event listeners
        // This says: when optionDiv is clicked, call the acceptAnswer function
        optionDiv.onclick = acceptAnswer;
    });
}
function acceptAnswer(event) {
    // Property we added ourselves
    let selectedOptionIndex = event.target.index;
    console.log({ selectedOptionIndex });

    // Add point according to the question and option
    let currentQuestion = questions[currentQuestionIndex];
    let selectedOption = currentQuestion.options[selectedOptionIndex];
    scoreKeeper[selectedOption.point]++;

    console.log(JSON.stringify(scoreKeeper, null, 4));

    // Go to next question OR calculate result
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        calculateResult();
    }
    else {
        askQuestion(questions[currentQuestionIndex]);
    }
}
function calculateResult() {
    // Add up points, taking the FIRST/HIGHEST score
    let quizResult = '';

    let possibleResults = Object.keys(scoreKeeper);

    for (let i = 0; i < possibleResults.length; i++) {
        let thisPossibleResult = possibleResults[i];

        if (!quizResult || scoreKeeper[quizResult] < scoreKeeper[thisPossibleResult]) {
            quizResult = thisPossibleResult;
        }
    }

    // Display result
    showResult(quizResult);
}
function showResult(result) {
    // Hide the quizZone (the quiz is over)
    let quizZoneDiv = document.getElementById('quizZone');
    quizZoneDiv.style.display = 'none'; // hide it by adjusting its style (CSS) directly

    // Find the hidden <div> that contains the results
    let resultDiv = document.getElementById('answer-' + result);
    resultDiv.classList.toggle('hide'); // un-hide it by removing the '.hide' class

    // Show the 'Take Again' button
    let takeAgainButton = document.querySelector('#takeAgain');
    takeAgainButton.style.display = 'inline'; // Just a regular inline element that flows in the text, like a word or phrase
}