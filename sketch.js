var ball;
var database;

var hypnoticBall, hypnoticBallPosition;
var position;
function setup(){
    createCanvas(500,500);

    database = firebase.database();
    
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    hypnoticBallPosition = database.ref('Ball/Position');
    hypnoticBallPosition.on("value", getData, showError);


}

function draw(){
    background("white");

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    drawSprites();
}
/*
function changePosition(x,y){
    hypnoticBall.x = hypnoticBall.x + x;
    hypnoticBall.y = hypnoticBall.y + y;
}
*/

function changePosition(x,y){
    database.ref('Ball/Position').set({

        'x' : position.x+ x,
        'y' : position.y + y



    });
}

function getData(data){
    position = data.val();
    console.log(position.x);
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function showError(){

    console.log();
}