const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 10, paddleHeight = 100; // Vertical paddles
const ballSize = 10;

// Paddles
let leftPaddle = { x: 50, y: canvas.height / 2 - 50, dy: 0 };
let rightPaddle = { x: canvas.width - 60, y: canvas.height / 2 - 50, dy: 0 };

// Ball
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

function drawPaddle(paddle) {
    ctx.fillStyle = "white"; 
    ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball bounces off top and bottom walls
    if (ball.y <= 0 || ball.y >= canvas.height - ballSize) {
        ball.dy *= -1;
    }

    // Ball bounces off paddles
    if (
        (ball.x <= leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x >= rightPaddle.x - ballSize && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
    ) {
        ball.dx *= -1;
    }

    // Move paddles
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Prevent paddles from going out of bounds
    leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y));

    requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    update();
}

// Paddle controls
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
