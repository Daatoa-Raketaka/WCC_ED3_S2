let canv = document.getElementById('canv')
let ctx = canv.getContext('2d')

let snake = new Snake(canv, 'black', 5, 4)
snake.start()
snake.generateFood()
let game = setInterval(play, 70)

document.getElementById('color').addEventListener('change', () => {
    snake.changeColor(document.getElementById('color').value)
})

function clearScreen() {
    ctx.fillStyle = canv.style.backgroundColor
    ctx.clearRect(0, 0, canv.width, canv.height)
}

function play() {
    clearScreen()
    snake.action()
}