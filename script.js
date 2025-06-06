
const quiz = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Which company created React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    answer: "Facebook"
  }
];

let currentIndex = 0;
let score = 0;
let answered = Array(quiz.length).fill(null);

document.getElementById('start-quiz-btn').addEventListener('click', () => {
  resetQuiz();
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('start-quiz-btn').style.display = 'none';
    document.getElementById("quiz-intro").style.display = "none"; 
  document.getElementById('result').style.display = 'none';
  loadQuestion();
});

function loadQuestion() {
  const current = quiz[currentIndex];
  document.getElementById('question').textContent = `Q${currentIndex + 1}: ${current.question}`;
  
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  current.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;

    if (answered[currentIndex] !== null) {
      if (option === current.answer) {
        btn.classList.add('correct');
      } else if (option === answered[currentIndex]) {
        btn.classList.add('incorrect');
      }
      btn.disabled = true;
    } else {
      btn.onclick = () => {
        answered[currentIndex] = option;
        if (option === current.answer) {
          score++;
        }
        loadQuestion(); 
      };
    }

    optionsDiv.appendChild(btn);
  });

  document.getElementById('prev-btn').style.display = currentIndex > 0 ? 'inline-block' : 'none';
  document.getElementById('next-btn').style.display = 'inline-block';
}

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentIndex < quiz.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    showResult();
  }
});

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
});

function showResult() {
  document.getElementById('quiz-container').style.display = 'none';
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';

  let reviewHTML = `
    <h3>Quiz Completed 🎉</h3>
    <p>You scored <strong>${score}</strong> out of <strong>${quiz.length}</strong>.</p>
    <h4>Review:</h4>
  `;

  quiz.forEach((q, index) => {
    const userAnswer = answered[index];
    const isCorrect = userAnswer === q.answer;
    reviewHTML += `
      <div class="review-card ${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
        <strong>Q${index + 1}:</strong> ${q.question}<br>
        <strong>Your Answer:</strong> ${userAnswer || 'No answer'}<br>
        <strong>Correct Answer:</strong> ${q.answer}
      </div>
    `;
  });

  reviewHTML += `<button onclick="restartQuiz()">Restart Quiz</button>`;
  resultDiv.innerHTML = reviewHTML;
}

function restartQuiz() {
  document.getElementById('start-quiz-btn').style.display = 'inline-block';
  document.getElementById('result').style.display = 'none';
}

function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = Array(quiz.length).fill(null);
}


loadQuestion();


async function getJoke() {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    document.getElementById('joke').textContent = `${data.setup} - ${data.punchline}`;
  } catch (err) {
    document.getElementById('joke').textContent = "Failed to fetch joke. Try again.";
  }
}
