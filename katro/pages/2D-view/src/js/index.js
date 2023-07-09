import { createKatro2D } from './katro2D/main.js'
import { socket } from '../../../online-setup/src/js/index.js'

const swicth = document.querySelector('.switch-view-button')
let is2D = true
const menuBtn = document.getElementById('menu-btn')
const gameOverModal = document.getElementById('game-over-modal')
const winModal = document.getElementById('win-modal')
const menuModal = document.getElementById('menu-modal')
const resumeBtn = document.getElementById('resume-btn')
const quitBtn = document.querySelectorAll('.quit-btn')
const replayBtn = document.querySelectorAll('.replay-btn')

swicth.addEventListener('click', () => {
    const viewFlip = document.querySelector('.view-flip')
    const switchRound = document.querySelector('.switch > div')
    if (is2D) {
        switchRound.style.transform = 'translateX(20px)'
        viewFlip.style.transform = 'rotateY(180deg)'
    } else {
        switchRound.style.transform = 'translateX(0px)'
        viewFlip.style.transform = 'rotateY(0deg)'
    }
    is2D = !is2D
})

menuBtn.addEventListener('click', () => { menuModal.style.visibility = 'visible' })
resumeBtn.addEventListener('click', () => { menuModal.style.visibility = 'hidden' })

replayBtn.forEach(replay => {
    replay.addEventListener('click', () => { winModal.style.visibility = 'hidden' })
})

quitBtn.forEach(quit => {
    quit.addEventListener('click', () => {
        if (confirm('Do you want to quit the game?'))
            goTo('../welcome/index.html')
    })
})

createKatro2D(document.querySelector('.view-2D'), {
    mode: sessionStorage.getItem('mode'),
    level: sessionStorage.getItem('level'),
})

const wait = document.getElementById('wait')
if (sessionStorage.getItem('mode') !== 'online')
    wait.style.zIndex = -1

socket.emit('reJoin', sessionStorage.getItem('room'))

socket.on('playerJoinRoom', player => {
    wait.style.transition = 'all 300ms'
    wait.style.opacity = 0
    wait.style.zIndex = -1
})
// Connectivity
const connectivity = localStorage.getItem('connectivity')
if (connectivity === 'offline') {
    for (let i = 1; i <= 2; i++) {
        const playerName = prompt(`Player ${i}:`)
        localStorage.setItem(`player-${i}`, playerName)
    }
}

const onlineCont = document.getElementById('online-cont')
const workOnCont = document.getElementById('work-on')
if (sessionStorage.getItem('mode') === 'offline') {
    workOnCont.style.zIndex = -2
    onlineCont.style.zIndex = -2
}

else if (sessionStorage.getItem('mode') === 'online') onlineCont.style.zIndex = 2

document.getElementById('ok').addEventListener('click', () => {
    onlineCont.style.visibility = 'hidden'
    wait.style.zIndex = 10
    onlineCont.style.zIndex = -10
})