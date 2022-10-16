// Init Variables
let press = null;
let code = null;
let score = 95;
let health = 10;
const bullets = [];
const levelups = [];
const regens = [];
const ennemies = [];
const ennemies2 = [];
const playerWidth = 100;
const playerHeight = 100;
const bulletWidth = 20;
const bulletHeight = 20;
const levelupsWidth = 50;
const levelupsHeight = 50;
const regensWidth = 50;
const regensHeight = 50;
const ennemiesWidth = 80;
const ennemiesHeight = 80;
const ennemies2Width = 100;
const ennemies2Height = 100;
//const gameWidth = game.style.width;
//const gameHeight = game.style.height;
let playerLeft = (window.innerWidth - playerWidth) / 2;
let playerTop = (window.innerHeight - playerHeight);

// Attribution des valeurs en début de partie
document.getElementById("score").innerHTML = "Score : " + score;
document.getElementById("health").innerHTML = "Santé : " + health;

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
        bullet.style.backgroundImage = 'url(./img/bullet1.png)'
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

var speed = 7000;
var speed2 = 40000;

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
    setTimeout(generate, Math.round(Math.random() * speed));
    speed = speed - 50;

}

function generate2() {
    const ennemy2 = document.createElement('div')
    ennemy2.style.width = ennemies2Width + 'px';
    ennemy2.style.height = ennemies2Height + 'px';
    ennemy2.style.left = Math.round(Math.random() * (window.innerWidth - ennemies2Width)) + 'px';
    ennemy2.style.top = 0 + 'px';
    ennemy2.className = 'ennemy2';
    game.appendChild(ennemy2);
    ennemies2.push(ennemy2);
    // Generate next ennemy with random time of 5s
    setTimeout(generate2, Math.round(Math.random() * speed2));
    speed2 = speed2 - 25;

}
// Generate first ennemy
generate();
generate2();

// Function to generate bonuses
function levelUp() {
    const levelup = document.createElement('div')
    levelup.style.width = levelupsWidth + 'px';
    levelup.style.height = levelupsHeight + 'px';
    levelup.style.left = Math.round(Math.random() * (window.innerWidth - levelupsWidth)) + 'px';
    levelup.style.top = 0 + 'px';
    levelup.className = 'levelup';
    game.appendChild(levelup);
    levelups.push(levelup);
    // Generate next bonuses with random time of 30s
    setTimeout(levelUp, Math.round(Math.random() * (10 * 10000)));
};
// Generate first levelup
levelUp();

// Function to generate Regen
function regenUp() {
    const regen = document.createElement('div')
    regen.style.width = regensWidth + 'px';
    regen.style.height = regensHeight + 'px';
    regen.style.left = Math.round(Math.random() * (window.innerWidth - regensWidth)) + 'px';
    regen.style.top = 0 + 'px';
    regen.className = 'regen';
    game.appendChild(regen);
    regens.push(regen);
    // Generate next bonuses with random time of 30s
    setTimeout(regenUp, Math.round(Math.random() * (10 * 35000)));
};
// Generate first levelup
regenUp();

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

    // Collision Detection + Score
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

                score = score + 1;
                document.getElementById('score').innerHTML = "Score : " + score;
            }
        }
    }

    // Collision Detection2 + Score
    for (let i = 0; i < ennemies2.length; i++) {
        const ennemy2 = ennemies2[i];
        for (let j = 0; j < bullets.length; j++) {
            const bullet = bullets[j];

            if (bullet.offsetLeft + (bullet.clientWidth / 2) > ennemy2.offsetLeft
                && bullet.offsetLeft + (bullet.clientWidth / 2) < ennemy2.offsetLeft + ennemy2.clientWidth
                && bullet.offsetTop + (bullet.clientHeight / 2) > ennemy2.offsetTop
                && bullet.offsetTop + (bullet.clientHeight / 2) < ennemy2.offsetTop + ennemy2.clientWidth) {
                game.removeChild(ennemy2);
                ennemies2.splice(i, 1);

                game.removeChild(bullet);
                bullets.splice(j, 1);

                score = score + 1;
                document.getElementById('score').innerHTML = "Score : " + score;
            }
        }
    }

    // Spaceship collision 
    for (let index = 0; index < ennemies.length; index++) {
        const ennemy = ennemies[index];
        if (player.offsetLeft + (player.clientWidth / 2) > ennemy.offsetLeft
            && player.offsetLeft + (player.clientWidth / 2) < ennemy.offsetLeft + ennemy.clientWidth
            && player.offsetTop + (player.clientHeight / 2) > ennemy.offsetTop
            && player.offsetTop + (player.clientHeight / 2) < ennemy.offsetTop + ennemy.clientHeight) {
            game.removeChild(ennemy);
            ennemies.splice(index, 1);

            health -= 1;
            document.getElementById("health").innerHTML = "Santé : " + health;
            score -= 1;
            document.getElementById('score').innerHTML = "Score : " + score;
        }
    }

    // Spaceship collision 2
    for (let index = 0; index < ennemies2.length; index++) {
        const ennemy2 = ennemies2[index];
        if (player.offsetLeft + (player.clientWidth / 2) > ennemy2.offsetLeft
            && player.offsetLeft + (player.clientWidth / 2) < ennemy2.offsetLeft + ennemy2.clientWidth
            && player.offsetTop + (player.clientHeight / 2) > ennemy2.offsetTop
            && player.offsetTop + (player.clientHeight / 2) < ennemy2.offsetTop + ennemy2.clientHeight) {
            game.removeChild(ennemy2);
            ennemies2.splice(index, 1);

            health -= 1;
            document.getElementById("health").innerHTML = "Santé : " + health;
            score -= 1;
            document.getElementById('score').innerHTML = "Score : " + score;
        }
    }

    // Take bonus 
    for (let index = 0; index < levelups.length; index++) {
        const levelup = levelups[index];
        if (player.offsetLeft + (player.clientWidth / 2) > levelup.offsetLeft
            && player.offsetLeft + (player.clientWidth / 2) < levelup.offsetLeft + levelup.clientWidth
            && player.offsetTop + (player.clientHeight / 2) > levelup.offsetTop
            && player.offsetTop + (player.clientHeight / 2) < levelup.offsetTop + levelup.clientHeight) {
            game.removeChild(levelup);
            levelups.splice(index, 1);

            score += 2;
            document.getElementById('score').innerHTML = "Score : " + score;
            if (press && code == 40 && playerTop <= window.innerHeight - playerHeight) {
                playerTop = playerTop + 10;
            }
        }
    }

    // Take regen 
    for (let index = 0; index < regens.length; index++) {
        const regen = regens[index];
        if (player.offsetLeft + (player.clientWidth / 2) > regen.offsetLeft
            && player.offsetLeft + (player.clientWidth / 2) < regen.offsetLeft + regen.clientWidth
            && player.offsetTop + (player.clientHeight / 2) > regen.offsetTop
            && player.offsetTop + (player.clientHeight / 2) < regen.offsetTop + regen.clientHeight) {
            game.removeChild(regen);
            regens.splice(index, 1);

            health += 1;
            document.getElementById('health').innerHTML = "Santé : " + health;
        }
    }

    // Draw levelup
    for (let index = 0; index < levelups.length; index++) {
        const levelup = levelups[index];
        levelup.style.top = (parseInt(levelup.style.top) + 1) + 'px';

        if (parseInt(levelup.style.top) > window.innerHeight - levelupsHeight) {
            game.removeChild(levelup);
            levelups.splice(index, 1);
        }
    }

    // Draw regen
    for (let index = 0; index < regens.length; index++) {
        const regen = regens[index];
        regen.style.top = (parseInt(regen.style.top) + 1) + 'px';

        if (parseInt(regen.style.top) > window.innerHeight - regensHeight) {
            game.removeChild(regen);
            regens.splice(index, 1);
        }
    }

    // Draw ennemies
    for (let index = 0; index < ennemies.length; index++) {
        const ennemy = ennemies[index];
        ennemy.style.top = (parseInt(ennemy.style.top) + 2) + 'px';

        if (parseInt(ennemy.style.top) > window.innerHeight - ennemiesHeight) {
            game.removeChild(ennemy);
            ennemies.splice(index, 1);
            health = health - 1;
            document.getElementById("health").innerHTML = "Santé : " + health;
            if (health <= 0) {
                alert("You Lose !");
                window.location.reload();
            }
        }
    }

    // Draw ennemies2
    for (let index = 0; index < ennemies2.length; index++) {
        const ennemy2 = ennemies2[index];
        ennemy2.style.top = (parseInt(ennemy2.style.top) + 2) + 'px';

        if (parseInt(ennemy2.style.top) > window.innerHeight - ennemies2Height) {
            game.removeChild(ennemy2);
            ennemies2.splice(index, 1);
            health = health - 1;
            document.getElementById("health").innerHTML = "Santé : " + health;
            if (health <= 0) {
                window.confirm("You Lose !");
                if (confirm("Restart!")) {
                    window.location.reload();
                  }
            }
        }
    }

    if (score >= 100) {
        document.getElementById("score").style.width = "110px"
    }
    if (score > 1000) {
        window.confirm("You Win !");
            if (confirm("Restart!")) {
                window.location.reload();
            }
    }

    // Call the next drax when done
    requestAnimationFrame(draw);
}

// Draw for the first time
draw();