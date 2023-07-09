import { Transform2D, Vector2 } from './object2D.js'
import Pawn from './pawn.js'

export default class HoleZone extends Pawn {
    #id
    #pawns = []
    /**
     * 
     * @param {{
     *  textureUrl: string
     *  color: string
     *  transform: Transform2D
     * }} objectOptions
     * @param {number} radius
     * @param {number} pawnsCount
     */
    constructor(objectOptions, radius, pawnsCount) {
        super(objectOptions, radius)
        this.setPawns(pawnsCount)
    }

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    async render(canvas, context) {
        super.render(canvas, context, 0)
    }

    /**
     * 
     * @param {Vector2} point 
     */
    collideWith(point) {
        // Distance between the point and the center
        const relativeDistance = new Vector2(
            Math.abs(point.x - this.transform.position.x),
            Math.abs(point.y - this.transform.position.y)
        )

        // Pythagore's Theorem (hypotenuse) 
        const distance = Math.sqrt(Math.pow(relativeDistance.x, 2) + Math.pow(relativeDistance.y, 2))
        return distance <= this.radius
    }

    addPawn(pawn) {
        this.#pawns.push(pawn)
        this.reArangePawns()
    }
    extractPawn() { return this.#pawns.pop() }

    displayPawns(canvas, context) {
        this.#pawns.map(async (pawn) => {
            await pawn.render(canvas, context)
        })
    }

    getId() { return this.#id }
    setId(id) { this.#id = id }

    setPawns(pawnsCount) {
        const center = this.transform.position
        this.#pawns = []

        for (let i = 0; i < pawnsCount; i++) {
            let anglePerPawn = 0
            let angle
            let distance

            if (i < 5) {
                anglePerPawn = pawnsCount < 5 ? 360 / pawnsCount : 360 / 5
                angle = Math.PI * (anglePerPawn * i) / 180
                distance = this.radius / 4
            }
            else {
                anglePerPawn = 360 / (pawnsCount - 5)
                angle = Math.PI * (anglePerPawn * (i - 5)) / 180
                distance = this.radius / 2 + 2
            }

            const pos = new Vector2(
                center.x + Math.cos(angle) * distance,
                center.y + Math.sin(angle) * distance,
            )

            this.#pawns.push(new Pawn({
                textureUrl: './src/assets/metal-texture.jpeg',
                transform: new Transform2D(pos)
            }, 5))
        }
    }
    getPawns() { return this.#pawns }

    clone() {
        return new HoleZone({
            textureUrl: this.textureUrl,
            transform: this.transform
        }, this.radius, this.#pawns.length)
    }

    reArangePawns() { this.setPawns(this.#pawns.length) }
}