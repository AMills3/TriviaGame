$("#begin").on("click", function() {
  hereWeGo();
})

let questions = [
  {
    question: "When did the Vikings franchise play their first season in the NFL?",
    answers: ["1961", "1962", "1960", "1963"],
    rightAnswer: "1961",
  },

  {
    question: "Which team did the Vikings defeat 37-13 in their first-ever regular season game?",
    answers: ["Green Bay Packers", "Chicago Bears", "Detroit Lions", "Pittsburgh Steelers"],
    rightAnswer: "Chicago Bears",
  },

  {
    question: "What was the nickname given to the Vikings defense in the 1970s?",
    answers: ["Steel Curtain", "Legion of Boom", "Purple People Eaters", "Monsters of the Midway"],
    rightAnswer: "Purple People Eaters",
  },

  {
    question: "The Vikings played in Super Bowls IV, VIII, IX, and XI. What is their record in these four?",
    answers: ["4-0", "3-1", "1-3", "0-4"],
    rightAnswer: "0-4",
  },

  {
    question: "Randy Moss set a new NFL record for touchdown receptions by a rookie with how many TD catches?",
    answers: ["15", "16", "17", "18"],
    rightAnswer: "17",
  }
];

let game = {
  correctAnswers: 0,
  incorrectAnswers: 0,
  counter: 60,
  timer: function() {
    game.counter--;
    $("#timer").html(game.counter);
    if(game.counter<=0) {
      clearInterval(time);
      $("#timer").empty();
      calculateScore();
      $("submitButton").empty();
      alert("Your time is up.")
    }
  }
}

let time;
let inpu

function hereWeGo() {
  $("begin").remove();
  time = setInterval(game.timer, 1000)
  for (var i = 0; i < questions.length; i++) {
    $("#triviaGame").append("<h2>" + questions[i].question + "</h2>")
      for (var j = 0; j < questions[i].answers.length; j++) {
        selection = $("<input>")
        breakA = $("<br>")
        selection.attr("type", "radio")
        selection.attr("name", "question" + i)
        selection.attr("value", questions[i].answers[j])
        $("#triviaGame").append(questions[i].answers[j])
        $("triviaGame").append(selection)
        $("triviaGame").append(breakA)
      }
      breakA = $("<br>")
      $("#triviaGame").append(breakA)
  };

  let sButton = $("<button>")
  sButton.text("Submit")
  $("submitButton").append(sButton)
}

function calculateScore() {
  $.each($('input[name="question0"]:checked'), function() {
    if($(this).attr("value")===questions[0].rightAnswer) {
      game.correctAnswers++;
    } else {
      game.incorrectAnswers++;
    }
  });

  $.each($('input[name="question1"]:checked'), function() {
    if($(this).attr("value")===questions[1].rightAnswer) {
      game.correctAnswers++;
    } else {
      game.incorrectAnswers++;
    }
  });

  $.each($('input[name="question2"]:checked'), function() {
    if($(this).attr("value")===questions[2].rightAnswer) {
      game.correctAnswers++;
    } else {
      game.incorrectAnswers++;
    }
  });

  $.each($('input[name="question3"]:checked'), function() {
    if($(this).attr("value")===questions[3].rightAnswer) {
      game.correctAnswers++;
    } else {
      game.incorrectAnswers++;
    }
  });

  $.each($('input[name="question4"]:checked'), function() {
    if($(this).attr("value")===questions[4].rightAnswer) {
      game.correctAnswers++;
    } else {
      game.incorrectAnswers++;
    }
  });

  $("#triviaGame").empty()
  $("triviaGame").append("<h5>" + "The correct answers were: " + "</h5>")
  for ( var i = 0; i < questions.length; i++) {
    $("triviaGame").append(questions[i].rightAnswer + "<br>")
  }
  $("#triviaGame").append("Correct answers: " + " " + game.correctAnswers + " " + "Incorrect answers:" + game.incorrectAnswers)

  let myButton = $("<button>")
  myButton.text("Play again")
  $("#restartButton").append(myButton)
  $("#restartButton").on("click", function () {
    $("#triviaGame").empty();
    game.counter = 60;
    hereWeGo();
    $("#restartButton").empty();
  })
}

$("submitButton").on("click", function() {
  clearInterval(time);
  $("#timer").empty();
  calculateScore();
  $("#submitButton").empty();
});