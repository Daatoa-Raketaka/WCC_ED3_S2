import Object2D, { Transform2D } from './object2D.js'

export default class Pawn extends Object2D {

    /**
     * 
     * @param {{
     *  textureUrl: string
     *  color: string
     *  transform: Transform2D
     * }} objectOptions
     * @param {number} radius
     */
    constructor(objectOptions, radius) {
        super(objectOptions)
        this.radius = radius
    }

    /**
     * Rendering a circle with the texture
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    async render(canvas, context) {
        const texture = new Image()
        texture.src = this.textureUrl

        context.save()
        context.beginPath()
        context.arc(this.transform.position.x, this.transform.position.y, this.radius, 0, 2 * Math.PI)
        context.closePath()
        context.clip()
        context.drawImage(texture, this.transform.position.x - this.radius, this.transform.position.y  - this.radius, this.radius * 2, this.radius * 2)
        context.restore()
    }
}