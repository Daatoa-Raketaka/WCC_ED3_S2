import { io } from '../../../libs/socket.io.esm.min.js'

export const socket = io('http://localhost:8080')
let isCreator = false

let createRoomCounter = 0
let joinRoomCounter = 0

const onlineCont = document.getElementById('online-cont')
const textInput = document.getElementById('text-input')
const createBtn = document.getElementById('create-btn')
const joinBtn = document.getElementById('join-btn')
const keyCont = document.getElementById('key-cont')
const key = document.getElementById('key')

createBtn.addEventListener('click', () => {
    if (createRoomCounter === 0) {
        textInput.style.visibility = 'visible'
        joinBtn.disabled = true
    } else {
        if (textInput.value) {
            socket.emit('createRoom', {
                room: textInput.value,
                player: localStorage.getItem('playerName')
            })
            sessionStorage.setItem('mode', 'online')
            sessionStorage.setItem('room', textInput.value)
            socket.on('keyRoom', room => {
                sessionStorage.setItem('room', room)
                
                keyCont.style.visibility = 'visible'
                keyCont.style.zIndex = 2
                key.innerText = room
                // location.href = '../2D-view/index.html'
            })
            textInput.value = ''
            isCreator = true
        }
    }
    createRoomCounter++
})

joinBtn.addEventListener('click', () => {
    if (joinRoomCounter === 0) {
        textInput.style.visibility = 'visible'
        createBtn.disabled = true
    } else {
        // Token verification
        socket.emit('joinRoom', {
            room: textInput.value,
            player: localStorage.getItem('playerName')
        })
        // If token verified, go to the game view
        socket.on('roomResponse', response => {
            if (response) {
                sessionStorage.setItem('room', textInput.value)
                sessionStorage.setItem('mode', 'online')
                onlineCont.style.zIndex = -10
            }
            else alert('Room Not Found')
        })
        textInput.value = ''
        textInput.style.visibility = 'hidden'
        joinRoomCounter = -1
    }
    joinRoomCounter++
})
    
document.getElementById('ok').addEventListener('click', () => {
    keyCont.style.visibility = 'hidden'
    joinBtn.disabled = false
    createBtn.disabled = false
})

export { isCreator }
