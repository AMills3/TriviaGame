var player = {
    isPlaying: false,
    isWaiting: false,
    numberCorrect: 0,
    numberIncorrect: 0,
    wins: 0,
    losses: 0
  }
  
  // Setting up an empty array for questions, the current question, and the status of the game (timer)
  var questionsArray = [];
  var currentQuestion;
  var gameStatus = [];
  
  // timer variables.  timer = variable for javascript timer.  time = variables for actual time.
  var questionTimer;
  var summaryTimer;
  var timeQuestion = 10000;
  var timeSummary = 15000;
  var time = 0;
  var counter;
  
  
  var timeProgress = {
    start: function(){
      counter = setInterval(timeProgress.count,1000);
    },
    stop: function(){
      clearInterval(counter);
      time = 0;
    },
    count: function(){
      time++;
      console.log(time);
    }
  }
  
  $(document).ready(function(){ 
  });
  
  function initialization(){
    player.isPlaying = !player.isPlaying;
    gameStatus = [];
    player.numberCorrect = 0;
    player.numberIncorrect = 0;
    questionsArray = createQuestionArray();
  }
  
  function createQuestionArray(){
    function questionObject(question, answers, correctAnswer, userAnswer, answerExplanation, isCorrect, isTimeUp){
      this.question = question;
      this.answers = answers;
      this.correctAnswer = this.answers[correctAnswer];
      this.userAnswer = this.answers[userAnswer];
      this.answerExplanation = answerExplanation;
      this.isCorrect = isCorrect;
      this.isTimeUp = isTimeUp;
    }
  
    var question0 = new questionObject(
      /*question:*/ "When did the Vikings franchise play their first season in the NFL?",
      /*answers:*/ ["1961", "1962", "1960", "1963", null],
      /*correctAnswer:*/ 0,
      /*userAnswer:*/ 4,
      /*Explanation:*/ "The Vikings were an expansion team. The first season for the Vikings was in 1961. They were 3-11 that year, with Fran Tarkenton taking over the starting quarterback position.",
      /*isCorrect:*/ false,
      /*isTimeUp:*/ false);
      
    var question1 = new questionObject(
      /*question:*/ "Which team did the Vikings defeat 37-13 in their first-ever regular season game?",
      /*answers:*/ ["Green Bay Packers", "Chicago Bears", "Detroit Lions", "Pittsburgh Steelers", null],
      /*correctAnswer:*/ 1,
      /*userAnswer:*/ 4,
      /*Explanation:*/ "It was Septemeber 17, 1961. Legendary Bears coach George Halas said that game was one of the most upsetting coaching moments of his life.",
      /*isCorrect:*/ false,
      /*isTimeUp:*/ false);
  
    var question2 = new questionObject(
      /*question:*/ "What was the nickname given to the Vikings defense in the 1970s?",
      /*answers:*/ ["Steel Curtain", "Legion of Boom", "Purple People Eaters", "Monsters of the Midway", null],
      /*correctAnswer:*/ 2,
      /*userAnswer:*/ 4,
      /*Explanation:*/ "Their defense was so impressive that in 1971, that Alan Page was awarded the NFLs Most Valuable Player.",
      /*isCorrect:*/ false,
      /*isTimeUp:*/ false);
  
    var question3 = new questionObject(
      /*question:*/ "The Vikings played in Super Bowls IV, VIII, IX, and XI. What is their record in these four?",
      /*answers:*/ ["4-0", "3-1", "1-3", "0-4", null],
      /*correctAnswer:*/ 3,
      /*userAnswer:*/ 4,
      /*Explanation:*/ "Appearing in a Super Bowl is no guarantee of a victory. They have broken the hearts of Minnesota fans four times.",
      /*isCorrect:*/ false,
      /*isTimeUp:*/ false);
  
    var question4 = new questionObject(
      /*question:*/ "Randy Moss set a new NFL record for touchdown receptions by a rookie with how many TD catches?",
      /*answers:*/ ["15", "16", "17", "18", null],
      /*correctAnswer:*/ 2,
      /*userAnswer:*/ 4,
      /*Explanation:*/ "Moss broke the mark of 13 held by Green Bay's Bill Howtn in 1952 and San Diego's John Jefferson in 1979.",
      /*isCorrect:*/ false,
      /*isTimeUp:*/ false);
      
  
    return questionsArray = [question0, question1, question2, question3, question4];
    // return questionsArray = [question0];
  }
  
  function startQuestionTimer(){
    timeProgress.stop();
    questionTimer = setTimeout(questionTimeRanOut,timeQuestion);
    timeProgress.start(); 
  }
  
  function startSummaryTimer(){
    timeProgress.stop();
    player.isWaiting = !player.isWaiting;
    if (questionsArray.length > 0){
     summaryTimer = setTimeout(setQuestionAnswers,timeSummary);
    }
    else{
      summaryTimer = setTimeout(endGame,timeSummary);
    }
    timeProgress.start();
  }
  
  function stopQuestionTimer(){
    clearTimeout(questionTimer);
  }
  
  function stopSummaryTimer(){
    clearTimeout(summaryTimer);
  }
  
  function questionTimeRanOut(){
    
    currentQuestion.isTimeUp = !currentQuestion.isTimeUp;
    console.log("time ran out!" + currentQuestion.isTimeUp + currentQuestion.userAnswer)
    setUserSelection();
  }
  
  function setQuestionAnswers(){
    removeQuestionAnswers();
    if (player.isWaiting){
      player.isWaiting = !player.isWaiting;
    }
    selectRandomQuestion();
    displayQuestion();
    displayAnswers();
    startQuestionTimer();
  }
  
  
  function selectRandomQuestion(){
    var randomIndex = Math.floor(Math.random()*questionsArray.length);
    currentQuestion = questionsArray[randomIndex];
  
    questionsArray.splice(randomIndex,1);
  }
  
  
  function displayQuestion(){
  var mainQuestionColumn = $("<div></div>");
    mainQuestionColumn.attr({
      class: "col-md-12",
      id: "questionColumn"
    });
  
    var questionRowDiv = $("<div></div>");
    questionRowDiv.attr({
      class:"row",
      id:"individualQuestionRow"
    });
  
    var firstColumnDiv = $("<div></div>");
    firstColumnDiv.attr({
      class: "col-md-3 question"
    });
  
    var questionColumnDiv = $("<div></div>");
    questionColumnDiv.attr({
      class: "col-md-6 question",
      id: "individualQuestionColumn"
    });
  
    var questionText = $("<h2></h2>");
    questionText.text(currentQuestion.question);
  
    questionText.appendTo(questionColumnDiv);
    firstColumnDiv.appendTo(questionRowDiv);
    questionColumnDiv.appendTo(questionRowDiv);
    questionRowDiv.appendTo(mainQuestionColumn);
    mainQuestionColumn.appendTo("#questionRow");
  }
  
  function displayAnswers(){
    var mainAnswersColumn = $("<div></div>");
    mainAnswersColumn.attr({
      class: "col-md-12",
      id: "answersColumn"
    });
  
    for (i = 0; i < currentQuestion.answers.length - 1; i++){
      var answersRowDiv = $("<div></div>");
      answersRowDiv.attr({
        class: "row",
        id: "answerRow" + i
      })
  
      var firstColumnDiv = $("<div></div>");
      firstColumnDiv.attr({
        class: "col-md-3",
        id: "firstColumn" + i
      });
  
      var secondColumnDiv = $("<div></div>");
      secondColumnDiv.attr({
        class: "col-md-3",
        id: "secondColumn" + i
      });
      
      var answersColumnDiv = $("<div></div>");
      answersColumnDiv.attr({
        class: "col-md-6 answers",
        id: "answer" + i
      });
      var answersText = $("<h2></h2>"); 
  
      var answerButton = $("<button></button>");
      answerButton.attr({
        class: "answersButtons",
        id: "answerButton" + i
      })
      answerButton.text(currentQuestion.answers[i]);
  
      // answersText.appendTo(answersColumnDiv);
      answerButton.appendTo(answersColumnDiv);
      firstColumnDiv.appendTo(answersRowDiv);
      answersColumnDiv.appendTo(answersRowDiv);
      secondColumnDiv.appendTo(answersRowDiv);
      answersRowDiv.appendTo(mainAnswersColumn);
      mainAnswersColumn.appendTo("#answersRow");
    };
  
    $('html, body').animate({
        scrollTop: $("#answerButton3").offset().top
  }, 2000);
  }
  
  function userSelection(i){
    currentQuestion.userAnswer = currentQuestion.answers[i];
  }
  
  function checkAnswer(){
    if (currentQuestion.correctAnswer == currentQuestion.userAnswer){
      currentQuestion.isCorrect = !currentQuestion.isCorrect;
      player.numberCorrect++;
    }
    else{
      player.numberIncorrect++;
    }
    console.log(currentQuestion);
  }
  
  function collectGameStatus(){
    gameStatus.push(currentQuestion);
    console.table(gameStatus);
  }
  
  function setUserSelection(){
    checkAnswer();
    collectGameStatus();
    stopQuestionTimer();
    summarizeQuesiton();
    displaySummaryQuestion();
    startSummaryTimer(); 
  }
  
  function summarizeQuesiton(){
    if (currentQuestion.isCorrect){
      $(".modal-title").text("Good Job! You answered correctly!");
    } 
    else if(!currentQuestion.isCorrect && !currentQuestion.isTimeUp){
      $(".modal-title").text("Wrong answer... The correct answer is:")
    }
    else if(currentQuestion.isTimeUp){
      $(".modal-title").text("Time's Up!")
    }
    $("#correctAnswer").text(currentQuestion.correctAnswer);
    $(".picture").attr("src",currentQuestion.picture);
    $("#answerExplanation").text(currentQuestion.answerExplanation);
  }
  
  function displaySummaryQuestion(){
    $("#myModal").modal("show");  
  
  }
  
  function displayFinalSummary(){
    $("#startGameButton").show();
    $("#pressStartText").show();
    var summaryColumn = $("<div></div>");
    summaryColumn.addClass("col-md-12");
    summaryColumn.attr("id", "summaryColumn");
  
    var questionsCorrectRow = $("<div></div>");
    questionsCorrectRow.addClass("col-md-12");
    questionsCorrectRow.attr("id", "questionsCorrectRow");
  
    var questionsCorrectColumn = $("<div></div>");
    questionsCorrectColumn.addClass("col-md-12");
    questionsCorrectColumn.attr("id", "questionsCorrect");
    questionsCorrectText = $("<h2></h2>");
  
    questionsCorrectText.text("Number of questions correct: " + player.numberCorrect);
  
    questionsCorrectText.appendTo(questionsCorrectColumn);
    questionsCorrectColumn.appendTo(questionsCorrectRow);
    questionsCorrectRow.appendTo(summaryColumn);
  
    var questionsIncorrectRow = $("<div></div>");
    questionsIncorrectRow.addClass("col-md-12");
    questionsIncorrectRow.attr("id", "questionsIncorrectRow");
  
    var questionsIncorrectColumn = $("<div></div>");
    questionsIncorrectColumn.addClass("col-md-12");
    questionsIncorrectColumn.attr("id", "questionsIncorrect");
    questionsIncorrectText = $("<h2></h2>");
  
    questionsIncorrectText.text("Number of questions incorrect: " + player.numberIncorrect);
  
    questionsIncorrectText.appendTo(questionsIncorrectColumn);
    questionsIncorrectColumn.appendTo(questionsIncorrectRow);
    questionsIncorrectRow.appendTo(summaryColumn);
    summaryColumn.appendTo("#summaryRow");
  }
  
  function endGame(){
      removeQuestionAnswers();
      displayFinalSummary();
      console.log("game is over");
      console.table(gameStatus);
      player.isPlaying = !player.isPlaying;
  }
  
  
  function removeQuestionAnswers(){
    $("#myModal").modal("hide");
    $("#questionColumn").remove();
    $("#answersColumn").remove();
  }
  
  $(document).on("click","#startGameButton", function(){
    $("#summaryColumn").remove();
    initialization();
    setQuestionAnswers();
    $("#startGameButton").hide();
    $("#pressStartText").hide();
  });
  
  $(document).on("click", ".answersButtons", function(){
    if (!player.isWaiting && player.isPlaying){
      var selectedAnswer = $(this).attr("id");
      selectedAnswer = parseInt(selectedAnswer.charAt(12));
      userSelection(selectedAnswer);
      setUserSelection();
    }
  });