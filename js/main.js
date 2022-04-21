var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var dir, score, balls, food;

function init() {
    dir = "right";

    score = 0;

    balls = [
        {x: 40, y: 40},
        {x: 60, y: 40},
        {x: 80, y: 40}
    ];

    creatFood();

}

function creatFood() {

    food = {x: Math.floor(Math.random() * 38), y: Math.floor(Math.random() * 24)}

    for(var i = 0; i < balls.length; i++) {

        var ball = balls[i];

        if( food.x * 20 == ball.x && food.y * 20 == ball.y ){
            creatFood();
        }

    }

}

init();

document.addEventListener("keydown", function (e) {

    var keyCode = e.keyCode;

    if(keyCode == 37 && dir != 'right') {
        dir = 'left';
    }

    if(keyCode == 38 && dir != 'down') {
        dir = 'up';
    }

    if(keyCode == 39 && dir != 'left') {
        dir = 'right';
    }

    if(keyCode == 40 && dir != 'up') {
        dir = 'down';
    }


});

function add() {

    var lastBall = balls[balls.length - 1];

    if(dir == 'right') {
        balls.push( { x: lastBall.x + 20, y: lastBall.y } );
    }

    if(dir == 'down') {
        balls.push( { x: lastBall.x, y: lastBall.y + 20 } );
    }

    if(dir == 'left') {
        balls.push( { x: lastBall.x - 20, y: lastBall.y } );
    }

    if(dir == 'up') {
        balls.push( { x: lastBall.x, y: lastBall.y - 20 } );
    }

}



function ani() {

    ctx.clearRect(0, 0, 800, 500);
    add();
    balls.shift();

    var lastBall = balls[balls.length - 1];

    if(lastBall.x == food.x * 20 && lastBall.y == food.y * 20) {
        score += 5;
        add();
        creatFood();
    }

    for(var i = 0; i < balls.length; i++) {

        ball = balls[i];

        if(i == balls.length - 1) {
            ctx.fillStyle = "#3b6939";;
        } else {
            ctx.fillStyle = "#73b671";
        }

        if(ball.x > 780 ) {
            ball.x = 0;
        }

        if(ball.x < 0 ) {
            ball.x = 780;
        }

        if(ball.y > 480 ) {
            ball.y = 0;
        }

        if(ball.y < 0 ) {
            ball.y = 480;
        }

        if(ball.x == lastBall.x && ball.y == lastBall.y && i < balls.length - 2) {
            alert("Game Over, Your Score is " + score);
            init();
        }

        ctx.fillRect(ball.x, ball.y, 19, 19);

    }

    ctx.fillStyle = '#db4949';
    ctx.fillRect(food.x * 20, food.y * 20, 19, 19);

    ctx.font="17px Arial";
    ctx.fillStyle = '#444444';
    ctx.fillText("Score: " + score, 20, 30);


}

ani();

setInterval(ani, 80);