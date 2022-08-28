const testData = [
    {
        question: 'What does the word Laser stand for?',
        a:  'Light Associated Social Entropied Radiation',
        b:  'Luminous Applied Stimulus emitions of radiance',
        c:  'Lower Ampled State for Emmissions of Radiation',
        d:  'Light Amplified by Stimulated Emissions of Radiation',
        correct: 'd'
    },  {
        question: 'What is the actual name of the North Star?',
        a:  'Polaris',
        b:  'Betelgeuse',
        c:  'Rigel',
        d:  'Alpha Andromedae',
        correct: 'a'
    },  {
        question: 'what does the acronym A.D. stand for?',
        a:  'After Death',
        b:  'Anoro Dominae',
        c:  'Anno Domini',
        d:  'It means nothing at all',
        correct: 'c'
    },  {
        question: 'what does the acronym A.D. stand for?',
        a:  'After Death',
        b:  'Anoro Dominae',
        c:  'Anno Domini',
        d:  'It means nothing at all',
        correct: 'c'
    },  {
        question: 'who was the company Tesla named after?',
        a:  'Nicolas',
        b:  'Thomas',
        c:  'Tomand',
        d:  'Nikola',
        correct: 'd'
    },   {
        question: 'What is the tallest building in the US?',
        a:  'Central Park Tower',
        b:  'Willis Tower',
        c:  'World Trade Center',
        d:  'Empire State Building',
        correct: 'c'
    },  {
        question: 'What is the actual name of the North Star?',
    
        a:  'Polaris',
        b:  'Betelgeuse',
        c:  'Rigel',
        d:  'Alpha Andromedae',
        correct: 'a'
    },  {
        question: 'what does the acronym A.D. stand for?',
        a:  'After Death',
        b:  'Anoro Dominae',
        c:  'Anno Domini',
        d:  'It means nothing at all',
        correct: 'c'
    },  {
        question: 'what does the acronym A.D. stand for?',
        a:  'After Death',
        b:  'Anoro Dominae',
        c:  'Anno Domini',
        d:  'It means nothing at all',
        correct: 'c'
    },  {
        question: 'who was the company Tesla named after?',
        a:  'Nicolas',
        b:  'Thomas',
        c:  'Tomand',
        d:  'Nikola',
        correct: 'd'
    }

];

const test = document.getElementById("test");
const answerA1s = document.querySelectorAll(".answer");
const questionA1 = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentTest = 0;
let score = 0;

loadTest();

function loadTest() {
    deselectAnswers();

    const currentTestData = testData[currentTest];
    
    questionA1.innerText = currentTestData.question;
    a_text.innerText = currentTestData.a;
    b_text.innerText = currentTestData.b;
    c_text.innerText = currentTestData.c;
    d_text.innerText = currentTestData.d;
}

function get_selected() {
    const answerA1s = document.querySelectorAll('.answer');

    let answer = undefined;


    answerA1s.forEach((answerA1) => {
        if (answerA1.checked) {
            answer =  answerA1.id;
        }
    });
    
    return answer;
}

function deselectAnswers() {
    answerA1s.forEach((answerA1) => {
        // if (answerA1.checked) {
            answerA1.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    //how we check for the answer
    const answer = get_selected();

    if (answer) {
        if(answer === testData[currentTest].correct) {
            score++;
        }

        currentTest++;
        if (currentTest < testData.length) { 
            loadTest();
        } else {
            alert("You've learned alot today!! Go take a 10minute breather");
            test.innerHTML = `<h2>You answered correctly at ${score}/${testData.length} questions.</h2>`;
            //our return message after final question
        }
    }

});
