class SnakeGame {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.snake = [{x: 5, y: 5}];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;
        this.speed = 150;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.lastRenderTime = 0;
        this.init();
    }

    init() {
        // Setup canvas
        this.canvas.width = 400;  // Set a fixed width
        this.canvas.height = 400; // Set a fixed height
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block'; // Ensure canvas is visible
        this.container.appendChild(this.canvas);

        // Calculate grid dimensions
        this.gridWidth = Math.floor(this.canvas.width / this.gridSize);
        this.gridHeight = Math.floor(this.canvas.height / this.gridSize);

        // Setup event listeners
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // Start game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowUp':
                if (this.direction !== 'down') this.direction = 'up';
                break;
            case 'ArrowDown':
                if (this.direction !== 'up') this.direction = 'down';
                break;
            case 'ArrowLeft':
                if (this.direction !== 'right') this.direction = 'left';
                break;
            case 'ArrowRight':
                if (this.direction !== 'left') this.direction = 'right';
                break;
            case ' ':
                if (this.gameOver) this.reset();
                break;
        }
    }

    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }

    update() {
        if (this.gameOver) return;

        const head = {...this.snake[0]};

        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            this.gameOver = true;
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver = true;
            return;
        }

        this.snake.unshift(head);

        // Check if food is eaten
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
            this.speed = Math.max(50, 150 - (this.score / 10) * 5);
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('snakeHighScore', this.highScore);
            }
        } else {
            this.snake.pop();
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#4a4a4a';
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                this.ctx.fillStyle = '#2c2c2c';
            } else {
                this.ctx.fillStyle = '#4a4a4a';
            }
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 1,
                this.gridSize - 1
            );
        });

        // Draw food
        this.ctx.fillStyle = '#dc3545';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 1,
            this.gridSize - 1
        );

        // Draw score
        this.ctx.fillStyle = '#333';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
        this.ctx.fillText(`High Score: ${this.highScore}`, 10, 60);

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 30);
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
            this.ctx.fillText('Press Space to Restart', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    }

    gameLoop(currentTime) {
        if (this.lastRenderTime === 0) {
            this.lastRenderTime = currentTime;
        }

        const elapsed = currentTime - this.lastRenderTime;

        if (elapsed > this.speed) {
            this.update();
            this.draw();
            this.lastRenderTime = currentTime;
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    reset() {
        this.snake = [{x: 5, y: 5}];
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;
        this.speed = 150;
        this.food = this.generateFood();
    }
}

// Initialize the game when the window is opened
const initSnakeApp = () => {
    const windowId = 'snake-game-window';
    const contentDiv = document.getElementById(`${windowId}-content`);
    if (contentDiv) {
        // Only initialize the game when the window is opened
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const window = document.getElementById(windowId);
                    if (window && window.style.display === 'block') {
                        const game = new SnakeGame(contentDiv);
                        observer.disconnect(); // Stop observing once game is initialized
                    }
                }
            });
        });

        // Start observing the window element
        const window = document.getElementById(windowId);
        if (window) {
            observer.observe(window, { attributes: true });
        }
    }
};

if (document.readyState === 'complete') {
    initSnakeApp();
} else {
    window.addEventListener('load', initSnakeApp);
} 