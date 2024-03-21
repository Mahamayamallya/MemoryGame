var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#title-track").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#title-track").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  $("#" + userChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("wrong");
    $("#title-track").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("wrong");
    }, 300);
    startOver();
  }
}
function playSound(chosenColor) {
  var audio = new Audio("Sounds/" + chosenColor + ".mp3");
  audio.play();
}
function animatePress(chosenColor) {
  $("#" + chosenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + chosenColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
