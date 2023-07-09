class Snake {

    /**
     * 
     * @param {HTMLCanvasElement} canv The canvas element to render the snake
     * @param {string} color The color of the snake
     * @param {number} size 
     * @param {number} long The snake's length
     */
    constructor(canv, color, size, long, initialPos) {
        this.canv = canv
        this.ctx = canv.getContext('2d')
        this.color = color
        this.size = size
        this.long = long

        this.queue = []
        this.direction = {
            x: 1,
            y: 0
        }

        this.limit = {
            x: Math.floor(this.canv.width / this.size),
            y: Math.floor(this.canv.height / this.size)
        }
        this.foodPos = this.generateFood()
    }

    /**
     * This method is used to initiate the snake on the canvas
     * Can be used to restart the game
     */
    
    start() {
        this.long = 4
        this.queue = []
        this.direction = {
            x: 1,
            y: 0
        }
        for(let i = 0; i < this.long; i++) {
            this.queue.push({
                x: this.long - i,
                y: 0
            })
            this.ctx.fillStyle = this.color
            this.ctx.fillRect((this.long - i) * this.size + 1, 1, this.size - 1, this.size - 1)
        }
    }

    changeColor(color) {
        this.color = color
    }

    /**
     * 
     * @param {{x: number, y: number}} pos
     */
    draw(pos, color= this.color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(pos.x * this.size + 1, pos.y * this.size + 1, this.size - 1, this.size - 1)
    }

    /**
     * This is the principal method
     * This should be called in every frame
     */

    action() {
        this.updateQueue()
        window.addEventListener('keydown', evt => {
            this.keyCapture(evt)
        })
        
        this.queue[0] = this.getHeadNextPosition()

        if(this.queue[0].x == this.foodPos.x && this.queue[0].y == this.foodPos.y) {
            this.queue.push({
                x: this.queue[this.queue.length - 1].x,
                y: this.queue[this.queue.length - 1].y
            })
            this.foodPos = this.generateFood()
        }

        this.checkCollision()

        for(let i = 0; i < this.queue.length; i++)
            this.draw(this.queue[i])
        
        this.draw(this.foodPos, 'blue')
    }

    /**
     * Update the position of the snake
     */

    updateQueue() {
        for(let i = this.queue.length - 1; i > 0; i--)
            this.queue[i] = this.queue[i - 1]
    }

    /**
     * 
     * @returns The new position of the head of the snake
     */

    getHeadNextPosition() {
        return {
            x: this.queue[0].x + this.direction.x,
            y: this.queue[0].y + this.direction.y,
        }
    }

    /**
     * Capture the key pressed and update the direction of the snake
     * @param {Event} evt 
     */

    keyCapture(evt) {
        switch (evt.key) {
            case 'ArrowUp':
                this.direction = {
                    x: 0,
                    y: -1
                }
                break
            case 'ArrowDown':
                this.direction = {
                    x: 0,
                    y: 1
                }
                break
            case 'ArrowLeft':
                this.direction = {
                    x: -1,
                    y: 0
                }
                break
            case 'ArrowRight':
                this.direction = {
                    x: 1,
                    y: 0
                }
                break
            default:
                break       
        }
    }

    /**
     * Check if the snake collide with himself or with the wall
     * @returns True if the snake collide
     * @returns False if no collision
     */

    checkCollision() {
        if(this.queue[0].x < 0 || this.queue[0].x > this.limit.x - 1 || 
        this.queue[0].y < 0 || this.queue[0].y > this.limit.y - 1) {
            this.start()
            return true
        }
        for(let i = 1; i < this.queue.length; i++)
            if(this.queue[0].x == this.queue[i].x && this.queue[0].y == this.queue[i].y) {
                this.start()
                return true
            }
        return false
    }

    /**
     * Generate a new food for the snake
     * @returns The new position of the food
     */

    generateFood() {
        let canGenerate = true
        let pos
        do {
            canGenerate = true
            pos = {
                x: Math.floor(Math.random() * this.limit.x),
                y: Math.floor(Math.random() * this.limit.y)
            }

            for(let i = 1; i < this.queue.length; i++) 
                if(pos.x == this.queue[i].x && pos.y == this.queue[i].y) {
                    canGenerate = false
                    break
                }

        } while(!canGenerate)
        
        return pos
    }
}