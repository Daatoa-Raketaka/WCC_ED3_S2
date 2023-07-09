import Timer from './timer.js'
import Animation from './animation.js'

export default class AnimationController {

    #animations
    needUpdate

    /**
     * 
     * @param {Timer} timer 
     */
    constructor(timer) {
        this.timer = timer
        this.#animations = []
        this.needUpdate = true
    }

    /**
     * 
     * @param {Animation} animation 
     */
    add(animation) {
        this.#animations.push(animation)
    }

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    start(canvas, context) {
        this.timer.stop()
        let maxUpdate = 5
        const tmpTimer = new Timer(this.timer.getFramerate())
        tmpTimer.frameController(() => {
            if (maxUpdate-- > 0) this.#animations.map(animation => animation.start(canvas, context))
            else tmpTimer.close()
        })
    }
    
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    run(canvas, context) {
        this.timer.frameController(deltaTime => {
            if (this.needUpdate) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                this.#mapAnimations(deltaTime, canvas, context)
            }
        })
    }

    #mapAnimations(deltaTime, canvas, context) {
        let update = false

        this.#animations.map(animation => {
            animation.update(deltaTime, canvas, context)

            if(!update && this.needUpdate) update = this.needUpdate
        })

        this.needUpdate = update
    }
}