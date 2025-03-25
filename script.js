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

    // Ball bounces off paddles and always moves in the opposite direction
    if (
        (ball.x <= leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x >= rightPaddle.x - ballSize && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
    ) {
        ball.dx *= -1; // Reflect the ball's horizontal direction when hitting a paddle
        
        // Ensure the ball doesn't get stuck or pass through the paddles by adjusting the ball's position
        if (ball.x <= leftPaddle.x + paddleWidth) {
            ball.x = leftPaddle.x + paddleWidth; // Ensure the ball doesn't go through the paddle
        }
        if (ball.x >= rightPaddle.x - ballSize) {
            ball.x = rightPaddle.x - ballSize; // Ensure the ball doesn't go through the paddle
        }

        // Adjust vertical direction slightly based on where it hits the paddle
        if (ball.y < leftPaddle.y || ball.y < rightPaddle.y) {
            ball.dy = -Math.abs(ball.dy); // Move the ball upwards
        } else {
            ball.dy = Math.abs(ball.dy); // Move the ball downwards
        }
    }

    // Move paddles (both AI-controlled)
    movePaddle(leftPaddle);
    movePaddle(rightPaddle);

    // Prevent paddles from going out of bounds
    leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y));

    requestAnimationFrame(draw); // Redraw after update
}

function movePaddle(paddle) {
    // Randomize paddle direction every set interval
    if (paddle.directionChangeTime <= 0) {
        // Randomize direction and speed
        paddle.dy = Math.random() < 0.5 ? -4 : 4;
        paddle.directionChangeTime = Math.random() * 30 + 20; // Change direction between 20 to 50 frames
    } else {
        paddle.directionChangeTime--;
    }

    // Apply the paddle's movement
    paddle.y += paddle.dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    update(); // Continue updating the game state
}

draw(); // Initial call to start the game loop
