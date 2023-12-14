let adminPassword = 'adminSenha'; // Defina a senha do administrador aqui
let isAdminLoggedIn = false;
let isQuizStarted = false;
let currentUser = null;
let isLoggedIn = false;

const adminContainer = document.getElementById('admin-container');
const loginContainer = document.getElementById('login-container');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

function adminLogin() {
  const adminPasswordInput = document.getElementById('admin-password');
  const enteredPassword = adminPasswordInput.value.trim();

  if (enteredPassword !== adminPassword) {
    alert('Senha de administrador incorreta. Por favor, tente novamente.');
    return;
  }

  isAdminLoggedIn = true;
  adminContainer.style.display = 'none';
  loginContainer.style.display = 'block';
}

function startQuizForAll() {
  if (!isAdminLoggedIn) {
    alert('Apenas administradores podem iniciar o quiz para todos.');
    return;
  }

  isQuizStarted = true;
  loginContainer.style.display = 'none';
  quizContainer.style.display = 'block';

  currentQuestionIndex = 0;
  score = 0;
  nextButton.disabled = true;
  showQuestion(questions[currentQuestionIndex]);
}

function userLogin() {
  if (isQuizStarted) {
    alert('O quiz já foi iniciado. Aguarde até o próximo quiz.');
    return;
  }

  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();

  if (username === '') {
    alert('Por favor, insira um nome de usuário válido.');
    return;
  }

  currentUser = username;
  isLoggedIn = true;
  loginContainer.style.display = 'none';
  quizContainer.style.display = 'block';
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  resetAnswerButtons();
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetAnswerButtons() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  if (!isLoggedIn || !isQuizStarted) {
    alert('Por favor, aguarde o início do quiz.');
    return;
  }

  const correct = answer.correct;
  if (correct) {
    score++;
  }
  nextButton.disabled = false;
}

function nextQuestion() {
  if (!isLoggedIn || !isQuizStarted) {
    alert('Por favor, aguarde o início do próximo round.');
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.disabled = true;
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionContainer.innerHTML = `<h2>${currentUser}, você acertou ${score} de ${questions.length} perguntas!</h2>`;
  resetAnswerButtons();
  nextButton.style.display = 'none';
}
