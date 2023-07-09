export default class Timer {
    #deltaTime = 0
    #framerate = 0
    #lastTime = Date.now()
    #time = 0
    #fps = 0

    #isRunning
    #wait = 0

    constructor(framerate = 30) {
        this.#framerate = framerate
        this.#isRunning = 1
    }
    
    frameController(callback) {
        let delay = 1000 / this.#framerate
        if (this.#wait > 0)
            setTimeout(() => {
                this.#wait--
                this.frameController(callback)
            }, delay)
        else if (this.#isRunning === 1) {
            setTimeout(() => {
                const currentTime = Date.now()
                this.#deltaTime = (currentTime - this.#lastTime) / 1000
                this.#lastTime = currentTime
    
                if (currentTime - this.#time >= 1000) {
                    this.#fps = 0
                    this.#time = currentTime
                    delay = 0
                }
                else {
                    callback(this.#deltaTime)
                    this.#fps++
                }
                
                this.frameController(callback)
            }, delay)
        }
        else if (this.#isRunning === 0) setTimeout(() => this.frameController(callback), 1000)
        else return
    }

    getFramerate() { return this.#framerate }
    setFramerate(framerate) { this.#framerate = framerate }
    waitFor(time) { this.#wait = time / this.#framerate }
    stop() { this.#isRunning = 0 }
    start() { this.#isRunning = 1 }
    close() { this.#isRunning = -1 }
}