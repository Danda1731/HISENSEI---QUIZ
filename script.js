const questions = [
    {
        question: " Manakah Berikut Ini Tergolong Makanan Manis?" ,
        answers: [
            { text: "Gula", correct: true},
            { text: "Jeruk", correct: false},
            { text: "Obat", correct: false},
            { text: "Air", correct: false},
        ]
    },
     {
        question: " Planet ke-5 dalam sistem tata surya kita adalah..." ,
            answers: [
            { text: "Mars", correct: false},
            { text: "Matahari", correct: false},
            { text: "Jupiter", correct: true},
            { text: "Black Hole", correct: false},
        ]
    },
    {
        question: " Berapakah hasil dari operasi 5a + a?" ,
            answers: [
            { text: "6a", correct: true},
            { text: "5aa", correct: false},
            { text: "a", correct: false},
            { text: "5", correct: false},
        ]
    },
    {
        question: " Dalam kimia, apabila 2 atom hidrogen terikat dengan 1 atom oksigen maka akan tercipta..." ,
            answers: [
            { text: "Free Fire", correct: false},
            { text: "Gas", correct: false},
            { text: "Air", correct: true},
            { text: "Sulfur Peroksida", correct: false},
        ]
    },
    {
        question: " Apakah fungsi dari item petrify dalam Mobile Legends?" ,
            answers: [
            { text: "Damage ke creep", correct: false},
            { text: "Lepas dari efek supress/crowd control", correct: true},
            { text: "Efek lari cepat", correct: false},
            { text: "Hidup kembali", correct: false},
        ]
    },
    {
        question: " Meme sound ACUMALAKA NGUHAHAHAHA sering identik dengan... " ,
            answers: [
            { text: "Jokowi", correct: false},
            { text: "Orang Kulit hitam", correct: false},
            { text: "Mr. Ambatukam", correct: false},
            { text: "Kodok Suriname lompat", correct: true},
        ]
    },
    {
        question: " Tindakan apa yang benar ketika melihat teman terjatuh?" ,
            answers: [
            { text: "Menolongnya", correct: true},
            { text: "Merekamnya", correct: false},
            { text: "Membuatkannya stiker WhatsApp", correct: false},
            { text: "Pura-pura tidak lihat", correct: false},
        ]
    },
    {
        question: " Kekalahan Jepang pada Perang Dunia II ditandai dengan..." ,
            answers: [
            { text: "Peristiwa 9/11", correct: false},
            { text: "Pembentukan NAZI", correct: false},
            { text: "Dibombardirnya kota Hiroshima dan Nagasaki", correct: true},
            { text: "Jatuhnya Kekaisaran Turki Ottoman", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skor kamu adalah ${score} dari ${questions.length}!`
    nextButton.innerHTML = "Coba Lagi";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();