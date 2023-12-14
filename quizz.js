let adminPassword = 'adminSenha'; // Defina a senha do administrador aqui
let isAdminLoggedIn = false;
let isQuizStarted = false;
let currentUser = null;
let isLoggedIn = false;
let score = 0;
let currentQuestionIndex = 0;

const registerContainer = document.getElementById('register-container');
const adminContainer = document.getElementById('admin-container');
const loginContainer = document.getElementById('login-container');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let users = [];
const questions = [
  {
    question: 'Qual é a capital do Brasil?',
    answers: [
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Brasília', correct: true },
      { text: 'São Paulo', correct: false },
      { text: 'Belo Horizonte', correct: false }
    ]
  },
  {
    question: 'Quantos planetas existem em nosso sistema solar?',
    answers: [
      { text: '7', correct: false },
      { text: '8', correct: true },
      { text: '9', correct: false },
      { text: '10', correct: false }
    ]
  },
  // Adicione mais perguntas conforme necessário
];

function register() {
  const registerUsernameInput = document.getElementById('register-username');
  const registerPasswordInput = document.getElementById('register-password');

  const username = registerUsernameInput.value.trim();
  const password = registerPasswordInput.value;

  if (username === '' || password === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Verifica se o usuário já existe
  if (users.find(user => user.username === username)) {
    alert('Este nome de usuário já está em uso. Por favor, escolha outro.');
    return;
  }

  // Adiciona o usuário ao array de usuários
  users.push({ username, password });

  // Limpa os campos de registro
  registerUsernameInput.value = '';
  registerPasswordInput.value = '';

  // Esconde o formulário de registro
  registerContainer.style.display = 'none';

  // Exibe o formulário de login
  loginContainer.style.display = 'block';
}

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
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
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
