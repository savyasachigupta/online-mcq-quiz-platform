let user = localStorage.getItem("quizUser");
let loginBtn = document.querySelector(".login-btn");
if (user && loginBtn && loginBtn.textContent.trim() === "Login") {
  loginBtn.textContent = user + " (Logout)";
  loginBtn.onclick = function (e) {
    e.preventDefault();
    localStorage.removeItem("quizUser");
    location.reload();
  };
}

let previewOptions = document.querySelectorAll(".quiz-preview .option");
let previewCheck = document.querySelector(".quiz-preview .check");
previewOptions.forEach(function (option) {
  option.onclick = function () {
    previewOptions.forEach(function (opt) {
      opt.classList.remove("selected");
    });
    option.classList.add("selected");
    if (previewCheck) option.appendChild(previewCheck); // Moves the ✓
  };
});

// 3. Categories & Difficulty Selection (categories.html)
let categoryCards = document.querySelectorAll(".category-card");
let difficultyCards = document.querySelectorAll(".difficulty-card");
let summaryTitle = document.querySelector(".summary-info h3");

let selectedCategory = "Web Development";
let selectedDifficulty = "Medium";

// Save defaults right away in case the user clicks Continue without changing anything
if (categoryCards.length > 0) {
  localStorage.setItem("quizCategory", selectedCategory);
  localStorage.setItem("quizDifficulty", selectedDifficulty);
}

// Handle Category click
categoryCards.forEach(function (card) {
  card.onclick = function () {
    categoryCards.forEach(function (c) {
      c.classList.remove("selected-category");
    });

    card.classList.add("selected-category");
    selectedCategory = card.querySelector("h3").textContent;
    localStorage.setItem("quizCategory", selectedCategory);

    if (summaryTitle) {
      summaryTitle.innerHTML = selectedCategory + " <span>•</span> " + selectedDifficulty;
    }
  };
});

// Handle Difficulty click
difficultyCards.forEach(function (card) {
  card.onclick = function () {
    difficultyCards.forEach(function (c) {
      c.classList.remove("selected-difficulty");
    });

    card.classList.add("selected-difficulty");
    selectedDifficulty = card.querySelector("h3").textContent;
    localStorage.setItem("quizDifficulty", selectedDifficulty);

    if (summaryTitle) {
      summaryTitle.innerHTML = selectedCategory + " <span>•</span> " + selectedDifficulty;
    }
  };
});

let overviewTitle = document.querySelector(".overview-left h2");
let difficultyBadge = document.querySelector(".difficulty-badge");

if (overviewTitle && difficultyBadge) {
  let savedCategory = localStorage.getItem("quizCategory") || "Web Development";
  let savedDifficulty = localStorage.getItem("quizDifficulty") || "Medium";

  overviewTitle.textContent = savedCategory;
  difficultyBadge.textContent = savedDifficulty;
}

// 5. Leaderboard Page (leaderboard.html)
let leaderboardCard = document.querySelector(".leaderboard-card");

if (leaderboardCard) {
  let players = [
    { name: "Aditya Sharma", category: "Web Development", score: 98 },
    { name: "Rahul Verma", category: "Web Development", score: 95 },
    { name: "Priya Singh", category: "Java Programming", score: 92 },
    { name: "Karan Mehta", category: "Data Structures", score: 89 },
    { name: "Neha Gupta", category: "Python", score: 87 },
    { name: "Vivek Kumar", category: "Cybersecurity", score: 85 },
    { name: "Shivam Yadav", category: "General Knowledge", score: 83 }
  ];

  // Get current user's data (or use defaults if they haven't played yet)
  let userName = localStorage.getItem("quizUser") || "You";
  let userCategory = localStorage.getItem("quizCategory") || "Web Development";
  let savedScore = localStorage.getItem("lastScore");
  let userScore = savedScore !== null ? Number(savedScore) : 80;

  players.push({
    name: userName,
    category: userCategory,
    score: userScore,
    isCurrentUser: true
  });

  // Sort from highest score to lowest
  players.sort(function (a, b) {
    return b.score - a.score;
  });

  // Clear the old hardcoded rows
  let oldRows = leaderboardCard.querySelectorAll(".player-row");
  oldRows.forEach(function (row) {
    row.remove();
  });

  // Update total players count
  let playersCount = document.querySelector(".players-count");
  if (playersCount) {
    playersCount.textContent = players.length + " Players";
  }

  // Create new sorted rows
  players.forEach(function (player, index) {
    let rank = index + 1;

    let rankClass = "rank";
    if (rank === 1) rankClass += " rank-gold";
    if (rank === 2) rankClass += " rank-silver";
    if (rank === 3) rankClass += " rank-bronze";

    let rowClass = "player-row";
    if (rank === 1) rowClass += " top-player";
    if (player.isCurrentUser) rowClass += " current-user";

    let row = document.createElement("div");
    row.className = rowClass;
    row.innerHTML =
      '<div class="' + rankClass + '">' + rank + '</div>' +
      '<div class="player-avatar">' + player.name[0].toUpperCase() + '</div>' +
      '<div class="player-info">' +
        '<strong>' + player.name + '</strong>' +
        '<span>' + player.category + '</span>' +
      '</div>' +
      '<div class="player-score">' +
        '<strong>' + player.score + '</strong>' +
        '<span>Points</span>' +
      '</div>';

    leaderboardCard.appendChild(row);

    // Update the "YOUR CURRENT RANK" box
    if (player.isCurrentUser) {
      document.querySelector(".your-rank h2").textContent = "#" + rank;
      document.querySelector(".your-score strong").textContent = player.score + " Points";
      document.querySelector(".your-score span").textContent = player.category;
    }
  });
}

// 6. Login Page (login.html)
let loginForm = document.querySelector(".auth-card form");

if (loginForm) {
  loginForm.onsubmit = function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return;
    }

    // Use the part before '@' as the display name
    let username = email.split("@")[0];
    localStorage.setItem("quizUser", username);

    window.location.href = "categories.html";
  };
}

    // 7. Quiz Page (quiz.html)
let quizPage = document.querySelector(".quiz-page");

if (quizPage) {
  // Question Bank (You can add more questions to any category)
  let allQuestions = {
    "Web Development": [
      { q: "Which HTML element is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
      { q: "Which CSS property changes the text color?", options: ["font-color", "text-color", "color", "fgcolor"], answer: 2 },
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Language"], answer: 0 },
      { q: "Which tag is used for an unordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: 1 },
      { q: "Which CSS layout is best for 2D rows and columns?", options: ["Flexbox", "Float", "CSS Grid", "Inline"], answer: 2 }
    ],
    "Java Programming": [
      { q: "Which keyword is used to create a class in Java?", options: ["class", "Class", "define", "struct"], answer: 0 },
      { q: "Which method is the entry point of a Java program?", options: ["start()", "run()", "main()", "init()"], answer: 2 },
      { q: "Which data type stores true or false in Java?", options: ["bool", "boolean", "bit", "flag"], answer: 1 },
      { q: "Which keyword is used for inheritance in Java?", options: ["implements", "inherits", "extends", "super"], answer: 2 },
      { q: "What is the size of an int in Java?", options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"], answer: 1 }
    ],
    "Python": [
      { q: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "define"], answer: 1 },
      { q: "How do you start a single-line comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
      { q: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Set", "Tuple"], answer: 3 },
      { q: "What does len('Quiz') return?", options: ["3", "4", "5", "Error"], answer: 1 },
      { q: "Which function displays output in Python?", options: ["echo()", "console.log()", "print()", "write()"], answer: 2 }
    ],
    "Data Structures": [
      { q: "Which data structure follows LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Array", "Tree"], answer: 1 },
      { q: "Which data structure follows FIFO (First In, First Out)?", options: ["Stack", "Graph", "Queue", "Heap"], answer: 2 },
      { q: "What is the time complexity of Binary Search?", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], answer: 2 },
      { q: "Accessing an array element by index takes:", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 0 },
      { q: "Which structure uses nodes with pointers to the next node?", options: ["Array", "Linked List", "Hash Table", "Matrix"], answer: 1 }
    ],
    "Cybersecurity": [
      { q: "What does HTTPS stand for?", options: ["Hyper Text Transfer Protocol Secure", "High Transfer Text Protocol System", "Hyperlink Tracking Protocol Safe", "Host Transfer Protocol Secure"], answer: 0 },
      { q: "What is phishing?", options: ["Speeding up a network", "Tricking users to steal sensitive info", "Scanning for viruses", "Encrypting files"], answer: 1 },
      { q: "Which tool blocks unauthorized network access?", options: ["Compiler", "Firewall", "Router", "Browser"], answer: 1 },
      { q: "What does 2FA stand for?", options: ["Two-File Access", "Two-Factor Authentication", "Total Firewall Alert", "Two-Form Authorization"], answer: 1 },
      { q: "Converting readable data into coded form is called:", options: ["Compression", "Decryption", "Encryption", "Hashing"], answer: 2 }
    ],
    "General Knowledge": [
      { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
      { q: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: 2 },
      { q: "Who invented the World Wide Web?", options: ["Tim Berners-Lee", "Bill Gates", "Alan Turing", "Steve Jobs"], answer: 0 },
      { q: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
      { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 }
    ]
  };

  let category = localStorage.getItem("quizCategory") || "Web Development";
  let difficulty = localStorage.getItem("quizDifficulty") || "Medium";
  let questions = allQuestions[category] || allQuestions["Web Development"];

  // Update page titles
  document.querySelector(".quiz-nav-title").textContent = category + " Quiz";
  document.querySelector(".quiz-category").textContent = category.toUpperCase() + " • " + difficulty.toUpperCase();

  let currentIndex = 0;
  let userAnswers = []; // stores chosen option index (0-3) for each question
  let totalTime = 600;  // 10 minutes in seconds
  let timeLeft = totalTime;

  let questionTag = document.querySelector(".question-tag");
  let questionHeading = document.querySelector(".question-card h2");
  let optionsBox = document.querySelector(".quiz-options");
  let prevBtn = document.querySelector(".previous-btn");
  let nextBtn = document.querySelector(".next-btn");
  let submitBtn = document.querySelector(".submit-quiz-btn");
  let numbersBox = document.querySelector(".question-numbers");
  let timerText = document.querySelector(".quiz-timer strong");
  let progressSpans = document.querySelectorAll(".progress-info span");
  let progressFill = document.querySelector(".quiz-progress-fill");
  let sidebarCount = document.querySelector(".sidebar-header span");
  let remainingText = document.querySelector(".submit-info span");

  let letters = ["A", "B", "C", "D"];

  function showQuestion() {
    let qData = questions[currentIndex];

    // Question number & text
    let qNum = currentIndex + 1;
    questionTag.textContent = "QUESTION " + (qNum < 10 ? "0" + qNum : qNum);
    questionHeading.textContent = qData.q;

    // Render options safely (using textContent so HTML tags like <a> show properly)
    optionsBox.innerHTML = "";
    qData.options.forEach(function (optText, idx) {
      let optDiv = document.createElement("div");
      optDiv.className = "quiz-option";

      let letterSpan = document.createElement("span");
      letterSpan.className = "option-number";
      letterSpan.textContent = letters[idx];

      let textSpan = document.createElement("span");
      textSpan.className = "option-text";
      textSpan.textContent = optText;

      optDiv.appendChild(letterSpan);
      optDiv.appendChild(textSpan);

      if (userAnswers[currentIndex] === idx) {
        optDiv.classList.add("selected-answer");
        let mark = document.createElement("span");
        mark.className = "selected-mark";
        mark.textContent = "✓";
        optDiv.appendChild(mark);
      }

      optDiv.onclick = function () {
        userAnswers[currentIndex] = idx;
        showQuestion();
      };

      optionsBox.appendChild(optDiv);
    });

    // Update progress bar
    let answeredCount = userAnswers.filter(function (a) { return a !== undefined; }).length;
    let percent = Math.round((answeredCount / questions.length) * 100);
    progressSpans[0].textContent = "Question " + qNum + " of " + questions.length;
    progressSpans[1].textContent = percent + "% Completed";
    progressFill.style.width = percent + "%";

    // Update sidebar numbers
    numbersBox.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
      let numSpan = document.createElement("span");
      numSpan.className = "number";
      numSpan.textContent = i + 1;

      if (i === currentIndex) {
        numSpan.classList.add("current");
      } else if (userAnswers[i] !== undefined) {
        numSpan.classList.add("completed");
      }

      numSpan.onclick = function () {
        currentIndex = i;
        showQuestion();
      };

      numbersBox.appendChild(numSpan);
    }

    // Update sidebar text & Next button label
    sidebarCount.textContent = answeredCount + " / " + questions.length;
    let left = questions.length - answeredCount;
    remainingText.textContent = "You have " + left + " questions remaining.";
    nextBtn.textContent = currentIndex === questions.length - 1 ? "Submit →" : "Next →";
  }

  // Previous button
  prevBtn.onclick = function (e) {
    e.preventDefault();
    if (currentIndex > 0) {
      currentIndex--;
      showQuestion();
    }
  };

  // Next button
  nextBtn.onclick = function (e) {
    e.preventDefault();
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion();
    } else {
      submitQuiz();
    }
  };

  // Submit button
  submitBtn.onclick = function (e) {
    e.preventDefault();
    submitQuiz();
  };

  // Calculate score & go to result.html
  function submitQuiz() {
    clearInterval(timer);

    let correct = 0;
    let wrong = 0;

    let reviewList = [];

    questions.forEach(function (qData, i) {
      let chosenIndex = userAnswers[i];
      let chosenText = chosenIndex !== undefined ? qData.options[chosenIndex] : "Not Answered";
      let correctText = qData.options[qData.answer];
      let isCorrect = chosenIndex === qData.answer;

      if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }

      reviewList.push({
        question: qData.q,
        userAnswer: chosenText,
        correctAnswer: correctText,
        isCorrect: isCorrect
      });
    });

    localStorage.setItem("quizReview", JSON.stringify(reviewList));
    let score = correct * 10;
    let timeSpent = totalTime - timeLeft;

    localStorage.setItem("lastScore", score);
    localStorage.setItem("correctAnswers", correct);
    localStorage.setItem("wrongAnswers", wrong);
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem("timeSpent", timeSpent);

    window.location.href = "result.html";
  }

  // Countdown timer
  let timer = setInterval(function () {
    timeLeft--;
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    timerText.textContent = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);

    if (timeLeft <= 0) {
      submitQuiz();
    }
  }, 1000);

  showQuestion();
}

// 8. Result Page (result.html)
let resultPage = document.querySelector(".result-page");

if (resultPage) {
  let category = localStorage.getItem("quizCategory") || "Web Development";
  let difficulty = localStorage.getItem("quizDifficulty") || "Medium";
  let score = Number(localStorage.getItem("lastScore")) || 0;
  let correct = Number(localStorage.getItem("correctAnswers")) || 0;
  let wrong = Number(localStorage.getItem("wrongAnswers")) || 0;
  let total = Number(localStorage.getItem("totalQuestions")) || 5;
  let timeSpent = Number(localStorage.getItem("timeSpent")) || 0;
  let reviewList = JSON.parse(localStorage.getItem("quizReview")) || [];

  let maxScore = total * 10;
  let accuracy = Math.round((correct / total) * 100);

  // Format time as MM:SS
  let mins = Math.floor(timeSpent / 60);
  let secs = timeSpent % 60;
  let formattedTime = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);

  // Header message
  let headerTitle = document.querySelector(".result-header h1");
  let headerText = document.querySelector(".result-header p");

  if (accuracy >= 80) {
    headerTitle.textContent = "Excellent Work! 🎉";
  } else if (accuracy >= 50) {
    headerTitle.textContent = "Great Job! 👍";
  } else {
    headerTitle.textContent = "Keep Practicing! 💪";
  }
  headerText.textContent = "You have successfully completed the " + category + " Quiz. Here's a summary of your performance.";

  // Score Card
  document.querySelector(".score-number").textContent = score;
  document.querySelector(".score-label").textContent = "/ " + maxScore;
  document.querySelector(".result-category").textContent = category.toUpperCase() + " • " + difficulty.toUpperCase();
  document.querySelector(".score-content p").innerHTML = "You answered <strong>" + correct + " out of " + total + "</strong> questions correctly.";

  // 4 Stat Values (Correct, Incorrect, Questions, Time Used)
  let statValues = document.querySelectorAll(".score-stat .stat-value");
  statValues[0].textContent = correct;
  statValues[1].textContent = wrong;
  statValues[2].textContent = total;
  statValues[3].textContent = formattedTime;

  // 3 Performance Cards (Accuracy, Performance, Time Management)
  let perfValues = document.querySelectorAll(".performance-card strong");
  perfValues[0].textContent = accuracy + "%";
  perfValues[1].textContent = accuracy >= 80 ? "Excellent" : accuracy >= 50 ? "Good" : "Needs Work";
  perfValues[2].textContent = timeSpent < 180 ? "Fast" : timeSpent < 420 ? "Steady" : "Slow";

  // Answer Review Section
  let reviewSection = document.querySelector(".review-section");
  let reviewCount = document.querySelector(".review-count");

  if (reviewList.length > 0) {
    reviewCount.textContent = reviewList.length + " Questions";

    // Remove the hardcoded sample cards
    reviewSection.querySelectorAll(".review-card").forEach(function (card) {
      card.remove();
    });

    // Helper so HTML tags like <a> show as text instead of breaking the page
    function cleanText(text) {
      return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Add real review cards
    reviewList.forEach(function (item, index) {
      let num = index + 1;
      let numText = num < 10 ? "0" + num : num;

      let card = document.createElement("div");
      card.className = "review-card " + (item.isCorrect ? "correct-answer" : "incorrect-answer");

      let extraLine = item.isCorrect
        ? ""
        : '<p class="correct-answer-text">Correct answer: <strong>' + cleanText(item.correctAnswer) + '</strong></p>';

      let statusHtml = item.isCorrect
        ? '<span class="answer-status correct-status">✓ Correct</span>'
        : '<span class="answer-status incorrect-status">✕ Incorrect</span>';

      card.innerHTML =
        '<div class="review-question">' +
          '<span class="review-number">' + numText + '</span>' +
          '<div>' +
            '<h3>' + cleanText(item.question) + '</h3>' +
            '<p>Your answer: <strong>' + cleanText(item.userAnswer) + '</strong></p>' +
            extraLine +
          '</div>' +
        '</div>' +
        statusHtml;

      reviewSection.appendChild(card);
    });
  }
}