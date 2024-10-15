const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerSize = 20;
const bulletSize = 5;
const playerSpeed = 3;
const bulletSpeed = 5;

const players = [
    { x: 100, y: 100, color: 'blue', bullets: [] },
    { x: 600, y: 400, color: 'red', bullets: [] },
];

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, playerSize, playerSize);
}

function drawBullet(bullet) {
    ctx.fillStyle = 'white';
    ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach(player => {
        drawPlayer(player);
        player.bullets.forEach(bullet => {
            bullet.x += bullet.dx;
            bullet.y += bullet.dy;
            drawBullet(bullet);
        });
        player.bullets = player.bullets.filter(bullet => bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height);
    });

    detectCollisions();

    requestAnimationFrame(update);
}

function detectCollisions() {
    const [player1, player2] = players;

    player1.bullets.forEach(bullet => {
        if (bullet.x < player2.x + playerSize && bullet.x + bulletSize > player2.x &&
            bullet.y < player2.y + playerSize && bullet.y + bulletSize > player2.y) {
            alert("Player 1 wins!");
            resetGame();
        }
    });

    player2.bullets.forEach(bullet => {
        if (bullet.x < player1.x + playerSize && bullet.x + bulletSize > player1.x &&
            bullet.y < player1.y + playerSize && bullet.y + bulletSize > player1.y) {
            alert("Player 2 wins!");
            resetGame();
        }
    });
}

function resetGame() {
    players[0].x = 100; players[0].y = 100;
    players[1].x = 600; players[1].y = 400;
    players[0].bullets = [];
    players[1].bullets = [];
}

window.addEventListener('keydown', (event) => {
    const key = event.key;

    // Player 1 controls (WASD)
    if (key === 'w') players[0].y -= playerSpeed;
    if (key === 's') players[0].y += playerSpeed;
    if (key === 'a') players[0].x -= playerSpeed;
    if (key === 'd') players[0].x += playerSpeed;
    if (key === ' ') {
        players[0].bullets.push({ x: players[0].x + playerSize / 2, y: players[0].y, dx: 0, dy: -bulletSpeed });
    }

    // Player 2 controls (Arrow Keys)
    if (key === 'ArrowUp') players[1].y -= playerSpeed;
    if (key === 'ArrowDown') players[1].y += playerSpeed;
    if (key === 'ArrowLeft') players[1].x -= playerSpeed;
    if (key === 'ArrowRight') players[1].x += playerSpeed;
    if (key === 'Enter') {
        players[1].bullets.push({ x: players[1].x + playerSize / 2, y: players[1].y, dx: 0, dy: bulletSpeed });
    }
});

// Start the game loop
update();
