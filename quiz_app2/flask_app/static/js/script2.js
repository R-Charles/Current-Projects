const testData = [
    {
        question: 'Who was the wealthiest person in history?',
        a:  'Elon Musk',
        b:  'Augustus Ceasar',
        c:  'Queen Cleopatra',
        d:  'Mansa Musa King of Timbuktu',
        correct: 'b'
    },  {
        question: 'Who designed The Worlds first internal cumbustion engine?',
        a:  'Karl Benz',
        b:  'Samuel Brown',
        c:  'Francois Isaac',
        d:  'Christian Huygens',
        correct: 'd'
    },  {
        question: 'Group of Jewish assassins that hunted Nazi war criminals...',
        a:  'The Avengers',
        b:  'Inglorious Bastards',
        c:  'Libration Army',
        d:  'Meine Lieb',
        correct: 'a'
    },  {
        question: 'what year did Hawaii become Americas 50th state?',
        a:  '1989',
        b:  '1959',
        c:  '1901',
        d:  '1997',
        correct: 'b'
    },  {
        question: 'who was the first African American marine',
        a:  'Jonathan Summers',
        b:  'Richard Freeman',
        c:  'Thomas Whitman',
        d:  'Alfred Masters',
        correct: 'd'
    },  {
        question: 'who did the concept for minutes come from',
        a:  'The Babylonians',
        b:  'Conquistadors',
        c:  'The Apache',
        d:  'Russia',
        correct: 'a'
    },  {
        question: 'last country to gain indepence',
        a:  'Macao',
        b:  'Yeman',
        c:  'Papa New Guinea',
        d:  'South Sudan',
        correct: 'd'
    },  {
        question: 'Who invented the radio',
        a:  'Guglielmo Marconi ',
        b:  'Rouchard Philippe',
        c:  'Hubart Almovic',
        d:  'Isaac Constantine',
        correct: 'a'
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