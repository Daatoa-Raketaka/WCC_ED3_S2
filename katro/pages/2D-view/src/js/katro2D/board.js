import HoleZone from './holeZone.js'
import Object2D, { Transform2D, Vector2 } from './object2D.js'
import Player from './player.js'

export default class Board extends Object2D {
    dataHole = []
    /**
     * 
     * @param {{
     *  textureUrl: string
     *  color: string
     *  transform: Transform2D
     * }} objectOptions
     * @param {number} borderRadius
     * @param {Player} player
     */
    constructor(objectOptions, borderRadius, player) {
        super(objectOptions)
        this.borderRadius = borderRadius
        this.player = player
        this.onHoleClick = undefined

        const dataPlayer = player.data

        const pos = this.transform.position
        const margin = 20
        const holeRadius = 30

        let newPos = new Vector2(pos.x, pos.y)
        for (let i = 0; i < dataPlayer.length / 2; i++) {
            if (i === 0)
                newPos.x += margin + holeRadius
            else newPos.x += margin + holeRadius * 2
            newPos.y = pos.y + margin + holeRadius
            const hole = this.#createHole(newPos.clone(), holeRadius, dataPlayer[i])
            hole.setId(i)

            newPos.y += holeRadius * 2 + margin
            const holeB = this.#createHole(newPos.clone(), holeRadius, dataPlayer[dataPlayer.length - i - 1])
            holeB.setId(dataPlayer.length - i - 1)

            this.dataHole.push(hole, holeB)
        }

        this.width = holeRadius * this.player.data.length + margin * (this.player.data.length - 3)
        this.height = margin * 3 + holeRadius * 4
        this.dataHole.sort((a, b) => a.getId() - b.getId())
    }

    /**
     * Rendering a rounded corner rect with the texture
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    async render(canvas, context) {
        const pos = this.transform.position

        const texture = new Image()
        texture.src = this.textureUrl

        context.save()

        context.beginPath()
        context.moveTo(pos.x + this.borderRadius, pos.y)
        context.lineTo(pos.x + this.width - this.borderRadius, pos.y)
        context.quadraticCurveTo(pos.x + this.width, pos.y, pos.x + this.width, pos.y + this.borderRadius)
        context.lineTo(pos.x + this.width, pos.y + this.height - this.borderRadius)
        context.quadraticCurveTo(pos.x + this.width, pos.y + this.height, pos.x + this.width - this.borderRadius, pos.y + this.height)
        context.lineTo(pos.x + this.borderRadius, pos.y + this.height)
        context.quadraticCurveTo(pos.x, pos.y + this.height, pos.x, pos.y + this.height - this.borderRadius)
        context.lineTo(pos.x, pos.y + this.borderRadius)
        context.quadraticCurveTo(pos.x, pos.y, pos.x + this.borderRadius, pos.y)
        context.closePath()

        context.clip()
        context.drawImage(texture, pos.x, pos.y, this.width, this.height)
        context.restore()

        this.dataHole.map(async (hole) => await hole.render(canvas, context))
    }

    renderPawns(canvas, context) { this.dataHole.map(hole => hole.displayPawns(canvas, context)) }

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    activeRayCast(canvas) { canvas.addEventListener('click', this.#mapHole) }

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    deactiveRayCast(canvas) { canvas.removeEventListener('click', this.#mapHole) }

    getDistanceBetweenHole() {
        return new Vector2(
            this.dataHole[1].transform.position.x - this.dataHole[0].transform.position.x,
            this.dataHole[7].transform.position.y - this.dataHole[0].transform.position.y
        )
    }

    updatePlayer() {
        for (let i = 0; i < this.dataHole.length; i++)
            this.player.data[i] = this.dataHole[i].getPawns().length
    }

    /**
     * 
     * @param {Event} mouse 
     */
    #mapHole = (ev) => {
        const mouse = new Vector2(ev.offsetX, ev.offsetY)
        this.dataHole.map(hole => {
            if (hole.collideWith(mouse))
                this.onHoleClick(hole)
        })
    }

    #createHole(pos, radius, pawnsCount) {
        return new HoleZone({
            textureUrl: './src/assets/wood-texture.jpeg',
            transform: new Transform2D(pos)
        }, radius, pawnsCount)
    }
}