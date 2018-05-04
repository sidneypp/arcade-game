let play = false;
let selectedChar;
const allSprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

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

var Selector = function() {
    this.col = 0;
    this.x = 201;
    this.y = 80;
    this.sprite = 'images/Selector.png';
};

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selector.prototype.update = function() {
    if (this.x < 201) {
        this.col = 0;
        this.x = 201;
    }  else if (this.x > 600) {
        this.col = 4;
        this.x = 600;
    }
};

Selector.prototype.handleInput = function(keyPressed) {
    switch (keyPressed) {
        case 'left':
            this.col--;
            this.x -= 100;
            break;
        case 'right':
            this.col++;
            this.x += 100;
            break;
        case 'enter':
            selectedChar = this.col;
            player = new Player();
            play = true;
            document.querySelector('.hidden').classList.remove('hidden');
            break;
    }
}

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
    if (this.x > 800) {
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
    this.sprite = allSprites[selectedChar];
    this.x = 300;
    this.y= 380;
    this.gems = 0;
    this.lives = 3;
    this.gameOver = false;
}

Player.prototype.update = function() {
    document.querySelector('.lives').innerHTML = this.lives.toString();
    document.querySelector('.gems').innerHTML = this.gems.toString();
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 700) {
        this.x = 700;
    } else if (this.y < 0) {
        this.reset(true);
    } else if (this.y > 380) {
        this.y = 380;
    }
    if (this.lives == 0) {
        alert ("GAME OVER!");
        this.reset();
        this.lives = 3;
        this.gems = 0;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPressed) {
    if (this.gameOver === false) {
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
}

Player.prototype.reset = function(hasWon) {
    if (hasWon) {
        alert ("CONGRATS! YOU WIN! You have earned 500 gemstones");
        this.gems += 500;
        this.x = 200;
        this.y = 380;
    } else {
        this.lives--;
        this.x = 200;
        this.y = 380;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [
    new Enemy(-100, 48, 100),
    new Enemy(-100, 131, 200),
    new Enemy(-100, 214, 300),
    new Enemy(-100, 297, 400),
    new Enemy(-300, 48, 400),
    new Enemy(-300, 131, 300),
    new Enemy(-300, 214, 200),
    new Enemy(-300, 297, 100),
    new Enemy(-600, 48, 100),
    new Enemy(-600, 131, 200),
    new Enemy(-600, 214, 300),
    new Enemy(-600, 297, 400),
];
selector = new Selector();
player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (play === true) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
});
