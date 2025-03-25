const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 100, paddleHeight = 10;
const ballSize = 10;

let leftPaddle = { x: 50, y: canvas.height / 2 - 50, dy: 0 };
let rightPaddle = { x: canvas.width - 150, y: canvas.height / 2 - 50, dy: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

function drawPaddle(paddle) {
    ctx.fillStyle = "white"; // Change paddle color to white
    ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = "white"; // Change ball color to white
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1;

    if (ball.x <= leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
        ball.dx *= -1;
    }
    if (ball.x >= rightPaddle.x - ballSize && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
        ball.dx *= -1;
    }

    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    update();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "w") leftPaddle.dy = -6;
    if (e.key === "s") leftPaddle.dy = 6;
    if (e.key === "ArrowUp") rightPaddle.dy = -6;
    if (e.key === "ArrowDown") rightPaddle.dy = 6;
});

document.addEventListener("keyup", () => {
    leftPaddle.dy = 0;
    rightPaddle.dy = 0;
});

draw();
