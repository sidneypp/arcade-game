function shuffleBackground() {
    const body = document.querySelector('body');
    const allBackground = [
        'background-1',
        'background-2',
        'background-3',
        'background-4'
    ];
    const currentIndex = allBackground.length
    const randomIndex = Math.floor(Math.random() * currentIndex);
    const backgroundSelected = allBackground[randomIndex];
    return body.classList.add(backgroundSelected);;
  }

shuffleBackground();


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    this.repeat();
    if (this.y == player.y && this.x < player.x + 30 && this.x + 60 > player.x) {
        player.reset(false);
    }
};

Enemy.prototype.repeat = function() {
    if (this.x > 500) {
        this.x = -100;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y= 380;
    this.gems = 0;
    this.lives = 3;
}

Player.prototype.update = function() {
    document.querySelector('.lives').innerHTML = this.lives.toString();
    document.querySelector('.gems').innerHTML = this.gems.toString();
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 0) {
        player.reset(true);
    } else if (this.y > 380) {
        this.y = 380;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPressed) {
    switch (keyPressed) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 83;
            break;
    }
}

Player.prototype.reset = function(hasWon) {
    if (hasWon) {
        player.gems++;
        player.x = 200;
        player.y = 380;
    } else {
        player.gems = 0;
        player.lives--;
        player.x = 200;
        player.y = 380;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 48, 200),
    new Enemy(0, 131, 300),
    new Enemy(0, 214, 400)
];
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
