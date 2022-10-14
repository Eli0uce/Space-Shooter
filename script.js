// Init Variables
let press = null;
let code = null;
const bullets = [];
const ennemies = [];
const bonus = [];
const playerWidth = 100;
const playerHeight = 100;
const bulletWidth = 20;
const bulletHeight = 20;
const bonusWidth = 50;
const bonusHeight = 50;
const ennemiesWidth = 80;
const ennemiesHeight = 80;
let playerLeft = (window.innerWidth - playerWidth) / 2;
let playerTop = (window.innerHeight - playerHeight);

// Dom Instances
const game = document.getElementById('game');
const player = document.getElementById('player');

// Set the size and position of the player
player.style.width = playerWidth + 'px';
player.style.height = playerHeight + 'px';


// Capture keydown event
window.addEventListener('keydown', function (event) {
    code = event.keyCode;
    press = true;
    console.log(press);
    if (code == 32) {
        const bullet = this.document.createElement('div');
        bullet.style.width = bulletWidth + 'px';
        bullet.style.height = bulletHeight + 'px';
        bullet.style.left = parseInt(player.style.left) + ((playerWidth - bulletWidth) / 2) + 'px';
        bullet.style.top = player.style.top;
        bullet.className = 'bullet';
        game.appendChild(bullet);
        bullets.push(bullet);
    }
})

window.addEventListener('keyup', function () {
    press = false
})

// Function to generate ennemies
function generate() {
    const ennemy = document.createElement('div')
    ennemy.style.width = ennemiesWidth + 'px';
    ennemy.style.height = ennemiesHeight + 'px';
    ennemy.style.left = Math.round(Math.random() * (window.innerWidth - ennemiesWidth)) + 'px';
    ennemy.style.top = 0 + 'px';
    ennemy.className = 'ennemy';
    game.appendChild(ennemy);
    ennemies.push(ennemy);

    // Generate next ennemy with random time of 5s
    setTimeout(generate, Math.round(Math.random() * 5000));
}

// Generate first ennemy
generate();

// Function to generate bonus
function generateBonus() {
    const bonus = document.createElement('div')
    bonus.style.width = bonusWidth + 'px';
    bonus.style.height = bonusHeight + 'px';
    bonus.style.left = Math.round(Math.random() * (window.innerWidth - bonusWidth)) + 'px';
    bonus.style.top = 0 + 'px';
    bonus.className = 'bonus';
    game.appendChild(bonus);
    bonus.push(bonus);

    // Generate next ennemy with random time of 30s
    setTimeout(generate, Math.round(Math.random() * 30000));
}

// Generate first bonus
generateBonus();

function draw() {
    if (press && code == 39 && playerLeft <= window.innerWidth - playerWidth) {
        playerLeft = playerLeft + 10;
    }

    if (press && code == 37 && playerLeft >= 0) {
        playerLeft = playerLeft - 10;
    }

    if (press && code == 40 && playerTop <= window.innerHeight - playerHeight) {
        playerTop = playerTop + 5;
    }

    if (press && code == 38 && playerTop >= 0) {
        playerTop = playerTop - 5;
    }

    player.style.left = playerLeft + 'px';
    player.style.top = playerTop + 'px';

    // Draw bullets
    for (let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.style.top = (parseInt(bullet.style.top) - 5) + 'px';

        if (parseInt(bullet.style.top) < 0) {
            game.removeChild(bullet);
            bullets.splice(index, 1);
        }
    }

    // Collision Detection
    for (let i = 0; i < ennemies.length; i++) {


        const ennemy = ennemies[i];
        for (let j = 0; j < bullets.length; j++) {
            const bullet = bullets[j];



            if (bullet.offsetLeft + (bullet.clientWidth / 2) > ennemy.offsetLeft
                && bullet.offsetLeft + (bullet.clientWidth / 2) < ennemy.offsetLeft + ennemy.clientWidth
                && bullet.offsetTop + (bullet.clientHeight / 2) > ennemy.offsetTop
                && bullet.offsetTop + (bullet.clientHeight / 2) < ennemy.offsetTop + ennemy.clientWidth) {
                game.removeChild(ennemy);
                ennemies.splice(i, 1);

                game.removeChild(bullet);
                bullets.splice(j, 1);
            }
        }
    }

    // Draw ennemies
    for (let index = 0; index < ennemies.length; index++) {
        const ennemy = ennemies[index];
        ennemy.style.top = (parseInt(ennemy.style.top) + 2) + 'px';

        if (parseInt(ennemy.style.top) > window.innerHeight - ennemiesHeight) {
            game.removeChild(ennemy);
            ennemies.splice(index, 1);
        }
    }

    // Draw bonus
    for (let index = 0; index < bonus.length; index++) {
        const bonus = bonus[index];
        bonus.style.top = (parseInt(bonus.style.top) + 2) + 'px';

        if (parseInt(bonus.style.top) > window.innerHeight - bonusHeight) {
            game.removeChild(bonus);
            bonus.splice(index, 1);
        }
    }

    // Call the next drax when done
    requestAnimationFrame(draw);
}

// Draw for the first time
draw();