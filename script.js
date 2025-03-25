const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 10, paddleHeight = 100; // Vertical paddles
const ballSize = 10;

// Paddles
let leftPaddle = { x: 50, y: canvas.height / 2 - 50, dy: 0, directionChangeTime: 0 };
let rightPaddle = { x: canvas.width - 60, y: canvas.height / 2 - 50, dy: 0, directionChangeTime: 0 };

// Ball
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, trail: [] };

function drawPaddle(paddle) {
    ctx.fillStyle = "white"; 
    ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
    // Draw the ball's trail
    for (let i = 0; i < ball.trail.length; i++) {
        const trailBall = ball.trail[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - i * 0.1})`; // Fade the balls in the trail
        ctx.beginPath();
        ctx.arc(trailBall.x, trailBall.y, ballSize, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw the current ball
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

    // Move paddles (both AI-controlled)
    movePaddle(leftPaddle);
    movePaddle(rightPaddle);

    // Prevent paddles from going out of bounds
    leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y));

    // Store the current ball position to create the trail effect
    ball.trail.push({ x: ball.x, y: ball.y });

    // Limit the trail length to avoid excessive memory usage (keep the last 15 positions)
    if (ball.trail.length > 15) {
        ball.trail.shift(); // Remove the oldest trail ball
    }

    requestAnimationFrame(draw);
}

function movePaddle(paddle) {
    // Randomize paddle direction
    if (paddle.directionChangeTime <= 0) {
        // Choose a random direction and speed
        paddle.dy = Math.random() < 0.5 ? -4 : 4;
        paddle.directionChangeTime = Math.random() * 30 + 20; // Randomize how often direction changes (between 20 and 50 frames)
    } else {
        paddle.directionChangeTime--;
    }

    // Apply the paddle's movement
    paddle.y += paddle.dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    update();
}

draw();
