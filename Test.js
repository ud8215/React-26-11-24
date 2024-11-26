const quizData = [
    {
      question: 'Which of the following command is used to create react-js-app ?',
      options: ['npx create-react-app appname', 'npm install create-react-app', 'npx install create-react-app -g', 'install - l create-react-app'],
      answer: 'npx create-react-app appname',
    },
    {
      question: 'In React.js which one of the following is used to create a class for Inheritance ?',
      options: ['Create', 'Extends', 'Inherits', 'Delete'],
      answer: 'Extends',
    },
    {
      question: 'What is the default port number in which the application run ?',
      options: ['3000', '8080', '5000', '3030'],
      answer: '3000',
    },
    {
      question: 'Which of the following valid component return type of React ?',
      options: ['2', '5', '6', '1'],
      answer: '1',
    },
    {
      question: 'Which of the following is a way to handle data in React.js ?',
      options: [
        'State & Props',
        'Services & Components',
        'State & Services',
        'State & Component',
      ],
      answer: 'State & Props',
    },
    {
      question: 'Which of the following is must for the API in React.js ?',
      options: ['SetinitialComponent', 'renderComponent', 'render', 'All of the above'],
      answer: 'renderComponent',
    },
    {
      question: 'Which of the following is true regarding Babel ?',
      options: [
        'Compiler',
        'Transpilar',
        'Both of the above',
        'None of the above',
      ],
      answer: 'Both of the above',
    },
    {
      question: 'In React.js, how we can pass the data from one component to another in React.js ?',
      options: [
        'SetState',
        'Render with arguments',
        'Props',
        'PropTypes',
      ],
      answer: 'Props',
    },
    {
      question: 'Which of the following function is true about changing the state in React.js ?',
      options: ['this.State{}', 'this.setState', 'this.setChangeState', 'All of the above'],
      answer: 'this.setState',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();