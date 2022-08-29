const testData = [
    {
        question: 'tuvo',
        a:  'had',
        b:  'Akira Toriyama',
        c:  'Shiro Watanabe',
        d:  'Yoshi Fujima',
        correct: 'b'
    },  {
        question: 'algo',
        a:  'something',
        b:  'Elizabeth Heinz',
        c:  'Yoko Kanno',
        d:  'Alpha Andromedae',
        correct: 'c'
    },  {
        question: 'pues',
        a:  'well',
        b:  'Demon Slayer',
        c:  'Dragon Ball Z',
        d:  'Your Name',
        correct: 'b'
    },  {
        question: 'ademas',
        a:  'also',
        b:  'Japan',
        c:  'France',
        d:  'Phillipines',
        correct: 'a'
    },  {
        question: 'llevar',
        a:  'to carry',
        b:  'Bleach',
        c:  'Grappler Baki',
        d:  'Prince of Tennis',
        correct: 'd'
    },   {
        question: 'podemos intentarlo',
        a:  'we can try',
        b:  'Astro Boy',
        c:  'Wings of Honneamise',
        d:  'Kimba',
        correct: 'c'
    }    {
        question: 'que emocion',
        a:  'what a thrill',
        b:  'Akira Toriyama',
        c:  'Shiro Watanabe',
        d:  'Yoshi Fujima',
        correct: 'b'
    },  {
        question: 'bromeando',
        a:  'joking',
        b:  'Elizabeth Heinz',
        c:  'Yoko Kanno',
        d:  'Alpha Andromedae',
        correct: 'c'
    },  {
        question: 'digo',
        a:  'say',
        b:  'Demon Slayer',
        c:  'Dragon Ball Z',
        d:  'Your Name',
        correct: 'b'
    },  {
        question: 'piensa',
        a:  'think',
        b:  'Japan',
        c:  'France',
        d:  'Phillipines',
        correct: 'a'
    },  {
        question: 'no se que le vas a regalar',
        a:  'i dont know what you are going to give him',
        b:  'Bleach',
        c:  'Grappler Baki',
        d:  'Prince of Tennis',
        correct: 'd'
    },   {
        question: 'casi se mi olvida',
        a:  'I almost forgot',
        b:  'Astro Boy',
        c:  'Wings of Honneamise',
        d:  'Kimba',
        correct: 'c'
    }   {        
        question: 'no seas asi',
        a:  'dont be like that',
        b:  'Akira Toriyama',
        c:  'Shiro Watanabe',
        d:  'Yoshi Fujima',
        correct: 'b'
    },  {
        question: 'sobrino',
        a:  'nephew',
        b:  'Elizabeth Heinz',
        c:  'Yoko Kanno',
        d:  'Alpha Andromedae',
        correct: 'c'
    },  {
        question: 'llevare',
        a:  'I will take',
        b:  'Demon Slayer',
        c:  'Dragon Ball Z',
        d:  'Your Name',
        correct: 'b'
    },  {
        question: 'reconoce',
        a:  'recognize',
        b:  'Japan',
        c:  'France',
        d:  'Phillipines',
        correct: 'a'
    },  {
        question: 'entrenamiento',
        a:  'training',
        b:  'Bleach',
        c:  'Grappler Baki',
        d:  'Prince of Tennis',
        correct: 'd'
    },   {
        question: 'cancha',
        a:  'court',
        b:  'Astro Boy',
        c:  'Wings of Honneamise',
        d:  'Kimba',
        correct: 'c'
    }    {
        question: 'prestar',
        a:  'to lend',
        b:  'Akira Toriyama',
        c:  'Shiro Watanabe',
        d:  'Yoshi Fujima',
        correct: 'b'
    },  {
        question: 'relajate',
        a:  'relax',
        b:  'Elizabeth Heinz',
        c:  'Yoko Kanno',
        d:  'Alpha Andromedae',
        correct: 'c'
    },  {
        question: 'equivocado',
        a:  'wrong',
        b:  'Demon Slayer',
        c:  'Dragon Ball Z',
        d:  'Your Name',
        correct: 'b'
    },  {
        question: 'piensa',
        a:  'think',
        b:  'Japan',
        c:  'France',
        d:  'Phillipines',
        correct: 'a'
    },  {
        question: 'no se que le vas a regalar',
        a:  'i dont know what you are going to give him',
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

