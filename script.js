const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionBox = document.getElementById("question-box");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");
const finalScore = document.getElementById("final-score");
const resultImage = document.getElementById("result-image");
const twitterShare = document.getElementById("twitter-share");
const downloadBtn = document.getElementById("download-btn");
const retryBtn = document.getElementById("retry-btn");

let current = 0;
let score = 0;

const questions = [
  {
    question: "What is Raiku building",
    options: [
      "A liquidity routing engine for arbitrage across Solana DEXs",
      "A blockspace coordination and scheduling layer on Solana",
      "A cross-chain bridge between Solana and Ethereum",
      "A decentralized identity and wallet reputation system",
    ],
    answer: "A blockspace coordination and scheduling layer on Solana",
  },
  {
    question: "Just-in-time(JIT) transactions are placed via ___",
    options: [
      "Validator consensus",
      "FCFS",
      "Confidential Proving Deployment",
      "First-price sealed bid auction",
    ],
    answer: "First-price sealed bid auction",
  },
  {
    question: "Raiku's Ahead-of-Time(AOT) block auction model allows builders to offer all features except",
    options: [
      "Custom fee markets",
      "Anonymous payments",
      "MEV protection",
      "Transaction pre-confirmations",
    ],
    answer: "Anonymous payments",
  },
  {
    question: "Who is Raiku's Founder?",
    options: [
      "Robin Nordnes",
      "Rubin Nordnes",
      "Rubin Nordes",
      "Robin Nordes",
    ],
    answer: "Robin Nordnes",
  },
  {
    question: "From the official docs, Raiku makes Solana ___",
    options: ["Transparent", "Invincible", "Inevitable", "Ultra-fast"],
    answer: "Inevitable",
  },
  {
    question:
      "What marketplace does Raiku use for Compute units?",
    options: [
      "Blockspace Marketplace",
      "Slot Marketplace",
      "Transaction Marketplace",
      "Digital Marketplace",
    ],
    answer: "Slot Marketplace",
  },
  {
    question: "AOT transactions are priced via ___",
    options: [
      "English-style auction",
      "Network pricing",
      "Dutch-style auction", 
      "FCFS",
    ],
    answer: "English-style auction",
  },
  {
    question: "Raiku does not replace probabilistic blockspace pricing with auctions",
    options: [
      "True",
      "False",
    ],
    answer: "False",
  },
  {
    question: "Raiku mainly acts as ___ on Solana",
    options: [
      "Inclusion Layer",
      "Coordination layer",
      "Privacy Layer", 
      "Transactional Layer",
    ],
    answer: "Coordination layer",
  },
  {
    question: "Users receive what type of signals before transaction is executed?",
    options: [
      "Exclusion Signal",
      "Settlement Signal",
      "Inclusion Signal", 
      "Warning Signal",
    ],
    answer: "Inclusion Signal",
  },
  {
    question: "What phase of Block Production does Raiku's Scheduling happen?",
    options: [
      "After",
      "During",
      "Within", 
      "Before",
    ],
    answer: "Before",
  },
  {
    question: "What resource is traded in Raiku's auctions?",
    options: [
      "Storage space",
      "Bandwidth",
      "Compute units", 
      "Validator stakes",
    ],
    answer: "Compute units",
  },
  {
    question: "Raiku makes what programmable?",
    options: [
      "Bids",
      "Governance votes",
      "Blockspace", 
      "Assets",
    ],
    answer: "Blockspace",
  },
  {
    question: "Which of these DeFi risks does Raiku help reduce?",
    options: [
      "Oracle Lag",
      "Token inflation",
      "Bridge Latency", 
      "Sandwich MEV attacks",
    ],
    answer: "Sandwich MEV attacks",
  },
  {
    question: "Raiku mainly helps prevent transaction failures during?",
    options: [
      "Network congestion",
      "Low usage",
      "Governance voting", 
      "Token unlocks",
    ],
    answer: "Network congestion",
  },
  {
    question: "Who is Raiku's Head of Talent?",
    options: [
      "MIC",
      "Offmylawn",
      "Anders Christiansen", 
      "David Holt",
    ],
    answer: "Anders Christiansen",
  },
  {
    question: "When was Raiku founded?",
    options: [
      "2022",
      "2023",
      "2024", 
      "2025",
    ],
    answer: "2024",
  },
  {
    question: "Which of these tags best describes Raiku?",
    options: [
      "Infrastructure",
      "Layer 2",
      "Decentralized Exchange", 
      "Marketplace",
    ],
    answer: "Infrastructure",
  },
  {
    question: "Who is Raiku's head of capital markets and institutions?",
    options: [
      "David Holt",
      "Jason Davis",
      "Waleel Al Zuhair", 
      "Anthony Pieri",
    ],
    answer: "Waleel Al Zuhair",
  },
  {
    question: "What Ecosystem is Raiku building on?",
    options: [
      "Ethereum",
      "Solana",
      "Sui", 
      "Aptos",
    ],
    answer: "Solana",
  },
];

questions.sort(() => Math.random() - 0.5); // Shuffle

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  const q = questions[current];
  questionBox.innerText = q.question;
  answerButtons.innerHTML = "";
  q.options.forEach((opt) => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.onclick = () => selectAnswer(li, opt === q.answer);
    answerButtons.appendChild(li);
  });

  progressFill.style.width = `${(current / questions.length) * 100}%`;
  nextBtn.classList.add("hidden");
}

function selectAnswer(el, correct) {
  [...answerButtons.children].forEach(
    (btn) => (btn.style.pointerEvents = "none")
  );
  if (correct) {
    score++;
    el.style.background = "#2e7d32";
  } else {
    el.style.background = "#c62828";
  }
  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  finalScore.innerText = percentage;

  const highScore = percentage >= 75;
  // resultMsg.innerText = highScore
  //   ? "You did well!"
  //   : "Let's try again to get your ZK Knowledge up.";
  resultImage.src = highScore ? "assets/good-job.png" : "assets/try-again.png";

  // Twitter share
  const tweetText = `I scored ${percentage}% in the Raiku Quiz
Can you beat that? @raikucom`;
  twitterShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;

  downloadBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = resultImage.src;
    link.download = highScore ? "you-did-well.png" : "try-again.png";
    link.click();
  };

  if (highScore) showConfetti();
}

retryBtn.onclick = () => {
  current = 0;
  score = 0;

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  const confettiWrapper = document.querySelector(".confetti-wrapper");
  if (confettiWrapper) confettiWrapper.remove();
};

function showConfetti() {
  const wrapper = document.createElement("div");
  wrapper.className = "confetti-wrapper";

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.setProperty("--i", Math.random());
    piece.style.animationDelay = Math.random() + "s";
    wrapper.appendChild(piece);
  }

  resultScreen.appendChild(wrapper);
}
