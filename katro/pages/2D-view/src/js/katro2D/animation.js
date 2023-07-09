import AnimationController from './animationController.js'
import Board from './board.js'
import { AISimulation } from '../katro/katro.AI.js'
import { run } from '../katro/katro.core.js'
import { socket } from '../../../../online-setup/src/js/index.js'

/**
 * Abstract class for animation rendering
 */
export default class Animation {
    constructor() { }
    start(canvas, context) { }
    update(deltaTime, canvas, context) { }
    stop() { }
}

export class PawnAnimation extends Animation {
    #activeHole = null
    #currentHole
    #direction = { x: 0, y: 0 }
    #boards = { player1: null, player2: null }
    #route = { x: 0, y: 0 }
    #isBotTurn = false
    #getOp = 0
    #opRoute = 0
    #posToCapture
    #speed

    /**
     * 
     * @param {{
     *  player1: Board
     *  player2: Board
     * }} boards
     * @param {AnimationController} animationController
     * @param {number} speed
     */
    constructor(boards, animationController, speed, mode) {
        super()
        this.#boards = boards
        this.animationController = animationController
        this.#speed = speed
        this.mode = mode
    }

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    start(canvas, context) {
        this.#boards.player1.render(canvas, context)
        this.#boards.player2.render(canvas, context)
        this.#boards.player1.renderPawns(canvas, context)
        this.#boards.player2.renderPawns(canvas, context)
    }

    /**
     * 
     * @param {number} deltaTime
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    update(deltaTime, canvas, context) {
        const player = this.#isBotTurn ? this.#boards.player2 : this.#boards.player1
        const opponent = this.#isBotTurn ? this.#boards.player1 : this.#boards.player2
        const distance = player.getDistanceBetweenHole()
        const pawns = this.#activeHole.getPawns()

        let isBack = true
        let startPoint = this.#isBotTurn ? 0 : 4

        // Getting Opponent's Pawns Animation
        if (this.#getOp != 0) {
            let playerDistance = this.#boards.player1.dataHole[0].transform.position.y - this.#boards.player2.dataHole[7].transform.position.y
            if (opponent.player.isPartEmpty(startPoint))
                playerDistance += distance.y
            const opHole = opponent.dataHole[this.#posToCapture]
            this.#opRoute += this.#speed * deltaTime * this.#getOp
            opHole.getPawns().map(pawn => {
                pawn.transform.position.y += this.#speed * deltaTime * this.#getOp
                
                if (Math.abs(this.#opRoute) >= playerDistance) {
                    const limit = opHole.getPawns().length
                    for (let i = 0; i < limit; i++)
                        player.dataHole[this.#currentHole].addPawn(opHole.extractPawn())
                    
                    this.setActiveHole(this.#currentHole)
                    player.updatePlayer()
                    opponent.updatePlayer()
                    this.#opRoute = 0
                    this.#getOp = 0

                    // Game Over
                    if (opponent.player.getTotal() <= 1) {
                        this.animationController.timer.stop()
                        this.onGameOver(this.#isBotTurn)
                    }
                    this.animationController.timer.waitFor(300)
                }
            })
        }

        else {
            if ((Math.abs(distance.x * this.#direction.x) < Math.abs(this.#route.x) ||
            Math.abs(distance.y * this.#direction.y) < Math.abs(this.#route.y)) && pawns.length > 0) {
                this.#route = { x: 0, y: 0 }
                if (this.#currentHole >= 7) this.#currentHole = 0
                else this.#currentHole++
                player.dataHole[this.#currentHole].addPawn(this.#activeHole.extractPawn())
                player.updatePlayer()
                this.setupDirection()
                this.animationController.timer.waitFor(300)
            }
            else {
                this.#route.x += this.#speed * deltaTime * this.#direction.x
                this.#route.y += this.#speed * deltaTime * this.#direction.y
            }

            pawns.map(pawn => {
                pawn.transform.position.x += this.#speed * deltaTime * this.#direction.x
                pawn.transform.position.y += this.#speed * deltaTime * this.#direction.y
            })

            if (this.#isBotTurn && this.#currentHole >= 4 ||
            !this.#isBotTurn && this.#currentHole < 4) isBack = false

            if (pawns.length <= 0 && player.dataHole[this.#currentHole].getPawns().length > 1) {
                if (!isBack) {
                    if (opponent.player.isPartEmpty(startPoint) && opponent.player.data[this.#currentHole] > 0) {
                        this.#getOp = this.#isBotTurn ? -1 : 1
                        this.#posToCapture = this.#currentHole
                    }
                    else if (opponent.player.data[7 - this.#currentHole] > 0) {
                        this.#getOp = this.#isBotTurn ? -1 : 1
                        this.#posToCapture = 7 - this.#currentHole
                    }
                    else this.setActiveHole(this.#currentHole)
                } else this.setActiveHole(this.#currentHole)
            }
            else if (this.#activeHole.getPawns().length <= 0 && player.dataHole[this.#currentHole].getPawns().length <= 1) {
                this.#isBotTurn = !this.#isBotTurn
                this.stop(canvas, context)
            }
        }

        this.start(canvas, context)
        this.#activeHole.displayPawns(canvas, context)
    }

    stop(canvas, context) {
        this.animationController.timer.stop()
        if (this.#isBotTurn) {
            if (this.mode === 'offline') this.#boards.player2.activeRayCast(canvas)
            else if (this.mode === 'solo') {
                this.setActiveHole(AISimulation(this.#boards.player2.player.data, this.#boards.player1.player.data, this.level, run))
                this.setupDirection()
                this.animationController.timer.waitFor(5000)
                this.animationController.timer.start()
            }
            else this.#boards.player1.deactiveRayCast(canvas)
        }
        else this.#boards.player1.activeRayCast(canvas)
        this.start(canvas, context)
    }
    
    setupDirection() {
        if (this.#currentHole === 3) this.#direction = { x: 0, y: 1 }
        else if (this.#currentHole === 7) this.#direction = { x: 0, y: -1 }
        else if (this.#currentHole < 3) this.#direction = { x: 1, y: 0 }
        else this.#direction = { x: -1, y: 0 }
    }

    setLevel(level) { this.level = level }

    getActiveHole() { return this.#activeHole }

    inversePlayer() {
        let tmp = this.#boards.player1
        this.#boards.player1 = this.#boards.player2
        this.#boards.player2 = tmp
    }

    setTurn(turn) { this.#isBotTurn = turn }

    setActiveHole(id) {
        const hole = this.#isBotTurn ? this.#boards.player2.dataHole[id] : this.#boards.player1.dataHole[id]
        this.#activeHole = hole.clone()
        hole.setPawns(0)
        this.#currentHole = id
    }
}