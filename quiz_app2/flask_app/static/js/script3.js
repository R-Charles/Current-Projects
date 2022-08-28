const testData = [
    {
        question: 'Who was the creator of Dragonball Z',
        a:  'Fuji Yamamoto',
        b:  'Akira Toriyama',
        c:  'Shiro Watanabe',
        d:  'Yoshi Fujima',
        correct: 'b'
    },  {
        question: 'Top female anime composer of all time?',
        a:  'Yuki Kajiura',
        b:  'Elizabeth Heinz',
        c:  'Yoko Kanno',
        d:  'Alpha Andromedae',
        correct: 'c'
    },  {
        question: 'Top box office anime of all time',
        a:  'Death Note',
        b:  'Demon Slayer',
        c:  'Dragon Ball Z',
        d:  'Your Name',
        correct: 'b'
    },  {
        question: 'Which country watches the most anime',
        a:  'US',
        b:  'Japan',
        c:  'France',
        d:  'Phillipines',
        correct: 'a'
    },  {
        question: 'Which anime does the character Ryoma Echizen belong to?',
        a:  'Soul Eater',
        b:  'Bleach',
        c:  'Grappler Baki',
        d:  'Prince of Tennis',
        correct: 'd'
    },   {
        question: 'What was the first anime movie, released in 1945?',
        a:  'Momotaro',
        b:  'Astro Boy',
        c:  'Wings of Honneamise',
        d:  'Kimba',
        correct: 'c'
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

