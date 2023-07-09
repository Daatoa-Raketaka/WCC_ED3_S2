import { Transform2D, Vector2 } from './object2D.js'
import AnimationController from './animationController.js'
import Timer from './timer.js'
import Board from './board.js'
import { PawnAnimation } from './animation.js'
import Player from './player.js'
import { socket, isCreator } from '../../../../online-setup/src/js/index.js'

let player1 = new Player([2, 2, 2, 2, 2, 2, 2, 2], 4)
let player2 = new Player([2, 2, 2, 2, 2, 2, 2, 2], 4)


/**
 * 
 * @param {HTMLDivElement} target 
 * @param {{
 *  mode: string
 *  level: number
 *  playerName: string
 *  opponentName: string
 * }} data
 */
function createKatro2D(target, data) {
    const canv = document.createElement('canvas')
    const ctx = canv.getContext('2d')
    target.appendChild(canv)

    window.addEventListener('resize', () => {
        canv.width = target.clientWidth
        canv.height = target.clientHeight
    })

    canv.width = target.clientWidth
    canv.height = target.clientHeight

    const board1 = new Board({
        textureUrl: './src/assets/wood-texture.jpeg',
        transform: new Transform2D(new Vector2(canv.width / 2 - 170, canv.height / 2))
    }, 15, player1)
    board1.activeRayCast(canv)

    const board2 = new Board({
        textureUrl: './src/assets/wood-texture.jpeg',
        transform: new Transform2D(new Vector2(canv.width / 2 - 170, canv.height / 2 - 200))
    }, 15, player2)

    const animController = new AnimationController(new Timer(60))
    const pawnAnimation = new PawnAnimation({ player1: board1, player2: board2 }, animController, 150, data.mode)
    if (data.mode === 'solo') pawnAnimation.setLevel(data.level)

    // Multiplayer Offline Mode
    const onHoleClick = (board) => {
        return (hole) => {
            if (hole.getPawns().length > 0) {
                pawnAnimation.setActiveHole(hole.getId())
                animController.needUpdate = true
                animController.timer.start()
                board.deactiveRayCast(canv)
                pawnAnimation.setupDirection()
            }
        }
    }

    // MultiPlayer Online Mode
    const onlineClick = () => {
        return (hole) => {
            if (hole.getPawns().length > 0) {
                socket.emit('katroPlay', {
                    position: hole.getId(),
                    turn: true,
                    room: sessionStorage.getItem('room')
                })
                board1.deactiveRayCast(canv)
                pawnAnimation.setActiveHole(hole.getId())
                animController.needUpdate = true
                animController.timer.start()
                pawnAnimation.setupDirection()
            }
        }
    }

    socket.on('katroPlay', data => {
        pawnAnimation.setTurn(data.turn)
        pawnAnimation.setActiveHole(data.position < 4 ? data.position + 4 : data.position - 4)
        animController.needUpdate = true
        animController.timer.start()
        pawnAnimation.setupDirection()
    })

    const wait = document.getElementById('wait')

    socket.on('closeRoom', () => {
        wait.style.zIndex = 20
        wait.firstElementChild.innerHTML = 'Room Closed !'
    })

    const gameOverModal = document.getElementById('game-over-modal')
    const winModal = document.getElementById('win-modal')
    
    const menuBtn = document.getElementById('menu-btn')
    menuBtn.addEventListener('click', () => animController.timer.stop())
    const resumeBtn = document.getElementById('resume-btn')
    resumeBtn.addEventListener('click', () => animController.timer.start())
    const joinBtn = document.getElementById('join-btn')
    joinBtn.addEventListener('click', () => {
        board1.deactiveRayCast(canv)
    })

    const quitBtn = document.getElementById('quit-online')
    quitBtn.addEventListener('click', () => socket.emit('closeRoom', sessionStorage.getItem('room')))

    document.getElementById('pause-quit').addEventListener('click', () => {
        if (confirm('Do you want to quit ?')) {
            socket.emit('closeRoom', sessionStorage.getItem('room'))
            location.href = '../welcome/index.html'
        }
    })

    pawnAnimation.onGameOver = (isBotTurn) => {
        if (data.mode === 'offline') {
            winModal.style.visibility = 'visible'
            winModal.firstChild.innerText = isBotTurn ? 'Player 2 Win !' : 'Player 1 Win !'
        }
        else if (isBotTurn) {
            gameOverModal.removeChild(document.getElementById('replay-btn1'))
            gameOverModal.style.visibility = 'visible'
        }
        else {
            winModal.removeChild(document.getElementById('replay-btn2'))
            winModal.style.visibility = 'visible'
            winModal.firstChild.innerText = 'You Win !'
        }

        if(data.mode === 'online') socket.emit('closeRoom', sessionStorage.getItem('room'))
    }

    board1.onHoleClick = (data.mode === 'online') ? onlineClick() : onHoleClick(board1)
    if (data.mode === 'offline') board2.onHoleClick = onHoleClick(board2)

    animController.add(pawnAnimation)
    animController.start(canv, ctx)
    animController.needUpdate = false
    animController.run(canv, ctx)

    window.addEventListener('resize', () => {
        
    })
}

export { createKatro2D }