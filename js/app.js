/**
 * @description Choose a random background from the available ones
 */
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
    body.classList.add(backgroundSelected);;
}

shuffleBackground();

/**
 * @description Represents a character
 * @class
 * @param {int} x - Coordinates in x
 * @param {int} y - Coordinates in y
 * @param {String} sprite - Resource path that will be used
 */
class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    /**
     * @description Draw the character on the screen, required method for game
     */
    render() {
        console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @description Represents a selector, extends Character to reuse code
 * @class
 * @param {Player} player - Player type variable that was started
 */
class Selector extends Character{
    constructor(player) {
        super(201, 80, 'images/Selector.png')
        this.col = 0;
        this.play = false;
        this.player = player;
        this.selectedChar;
        this.allSprites = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];
    }

    /**
     * @description Updates the position of the x-axis so the selector does not escape the screen
     */
    update() {
        if (this.x < 201) {
            this.col = 0;
            this.x = 201;
        }  else if (this.x > 600) {
            this.col = 4;
            this.x = 600;
        }
    }

    /**
     * @description Check which key was pressed and change the position of the selector
     * @param {String} keyPressed - Key name pressed
     */
    handleInput(keyPressed) {
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
                this.selectedChar = this.allSprites[this.col];
                this.player.sprite = this.selectedChar;
                this.play = true;
                document.querySelector('.hidden').classList.remove('hidden');
                break;
        }
    }
}

/**
 * @description Represents a enemy, extends Character to reuse code
 * @class
 * @param {int} x - Coordinates in x
 * @param {int} y - Coordinates in y
 * @param {int} speed - Movement speed of the enemy. The higher the value, the faster it will be!
 */
class Enemy extends Character {
    constructor(x, y, speed) {
        super(x, y, 'images/enemy-bug.png');
        this.speed = speed;
    }

    /**
     * @description Update the enemy's position, required method for game
     * @param {int} dt - A time delta between ticks
     */
    update(dt) {
        this.x += this.speed * dt;
        this.repeat();
    }

    /**
     * @description Returns the enemy to the starting position to restart the loop
     */
    repeat() {
        if (this.x > 800) {
            this.x = -100;
        } 
    }
}

/**
 * @description Represents a player, extends Character to reuse code
 * @param {String} sprite - Resource path that will be used
 */
class Player extends Character {
    constructor(sprite = 'images/char-boy.png') {
        super(300, 380, sprite);
        this.gems = 0;
        this.lives = 3;
        this.gameOver = false;
    }

    /**
     * @description Updates the position of the x-axis and y-axis so the selector does not escape the screen
     */
    update() {
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
    }

    /**
     * @description Check which key was pressed and change the position of the player
     * @param {String} keyPressed - Key name pressed
     */
    handleInput(keyPressed) {
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

    /**
     * @description Resets the game, bringing the player to the starting position
     * @param {boolean} hasWon - Result of the game if the player won or lost
     */
    reset(hasWon) {
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
player = new Player();
selector = new Selector(player);

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
    if (selector.play === true) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
});