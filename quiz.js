let currentQuestion = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Brasília", "Rio de Janeiro"],
        correctAnswer: "Brasília"
    },
    {
        question: "Qual é a cor do céu?",
        options: ["Verde", "Azul", "Vermelho"],
        correctAnswer: "Azul"
    },
    {
        question: "Quantos lados tem um triângulo?",
        options: ["3", "4", "5"],
        correctAnswer: "3"
    }
];

function iniciarQuiz() {
    const nome = document.getElementById("nome").value;
    const matricula = document.getElementById("matricula").value;

    if (nome && matricula) {
        document.getElementById("quiz-form-container").style.display = "none";
        document.getElementById("quiz-questions-container").style.display = "block";
        exibirPergunta();
        iniciarTempo();
    } else {
        alert("Por favor, preencha nome e matrícula.");
    }
}

function exibirPergunta() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.innerHTML = questions[currentQuestion].question;

    optionsContainer.innerHTML = "";
    for (const option of questions[currentQuestion].options) {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => verificarResposta(option));
        optionsContainer.appendChild(button);
    }
}

function verificarResposta(resposta) {
    if (resposta === questions[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        exibirPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    pararTempo();
    alert(`Quiz finalizado!\nPontuação: ${score}/${questions.length}`);
}

function iniciarTempo() {
    let segundosRestantes = 300; // 5 minutos
    timer = setInterval(() => {
        const minutos = Math.floor(segundosRestantes / 60);
        const segundos = segundosRestantes % 60;

        document.getElementById("timer").innerText = `Tempo restante: ${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;

        if (segundosRestantes === 0) {
            finalizarQuiz();
        } else {
            segundosRestantes--;
        }
    }, 1000);
}

function pararTempo() {
    clearInterval(timer);
}
