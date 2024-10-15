buttoncolors = ["red", "blue", "green", "yellow"];
gamepattern = [];
userpattern = [];
var level = 0;
started = false;

function nextsequence() {
    userpattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttoncolors[randomNumber];
    gamepattern.push(randomColor);
    $("#" + randomColor).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
    level++;
    playSound(randomColor);
    $("#level-title").html("Level " + level);
    return randomColor;
   
}

$(".btn").click(function (event) {
    // element = event.target.id;
    // userpattern.push(element);   or the below code
    clickedcolor = $(this).attr("id");
    userpattern.push(clickedcolor);
    $("#" + clickedcolor).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
    playSound(clickedcolor);
    checkanswer(userpattern.length-1);

});

function playSound(name) {
    audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


$(document).keypress(function () {
    if (level === 0) {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
});

function checkanswer(level){
    if(gamepattern[level]=== userpattern[level]){
        if(userpattern.length === gamepattern.length){
            setTimeout(function () {
                nextsequence();
              }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Restart the game");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        restart();
    }
};

function restart(){
    level =0;
    userpattern = [];
    gamepattern =[];
    started = false;
};

