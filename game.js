
let buttonColours=["red","blue","green","yellow"];

let gamePattern=[];
let userClickedPattern=[];

let started=false;
let level=0;

$(document).keydown(()=>{
    if(!started){
        $("h1").text(`Level ${level}`);
        nextSequence();
        started=true;
    }
   
});



$(".btn").click((e)=>{

    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    
    checkAnswer(userClickedPattern.length-1);
    
    
});

const checkAnswer=(currentLevel)=>{

        if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){


            if(userClickedPattern.length===gamePattern.length){

                setTimeout(()=>{nextSequence();},1000);
            }
        }
        else{

            playSound("wrong");    
            $("body").addClass("game-over");
            setTimeout(()=>{
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    

}


const startOver=()=>{
    level=0;
    started=false;
    gamePattern=[];
}

const nextSequence = ()=>{
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);      
}




const playSound = (name)=>{
    let audio=new Audio(`./sounds/${name}.mp3`);
    audio.play(); 
}


const animatePress=(currentColour)=>{

    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);

}

