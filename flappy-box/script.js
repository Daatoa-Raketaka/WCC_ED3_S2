let canv = document.querySelector('canvas')
let ctx = canv.getContext('2d')

let bird = new Component(new Vector2D(100, 100), 'gold', { w: 25, h: 25 })
let g = 3
let deltaTime = 0
let score = 0
let scoreAdded = false

let potos = new Array(new Poto(new Vector2D(canv.width, 0), 'green', { w: 50, h: rand() }))

// Random generator
function rand(){
    return Math.ceil(Math.random()*350) + 100
}

function clear(ctx, canv){
    ctx.clearRect(0, 0, canv.width, canv.height)
}

function jump(myBird, deltaTime, jumpForce){
    if(deltaTime > 0) myBird.velocity.y -= jumpForce * deltaTime
}

// Ajout d'un poto
function addPoto(){
    potos.push(new Poto(new Vector2D(canv.width, 0), 'green', { w: 50, h: rand() }))
}

// Suppression d'un poto
function removePoto(){ potos.shift() }

function play(){
    clear(ctx, canv)

    // Dessine tout les potos
    for(let i=0; i<potos.length; i++){
        potos[i].draw(ctx, canv)
        potos[i].move(3)
    }

    // Ajout d'un poto à un moment précis
    if(potos[potos.length - 1].velocity.x <= 900)
        addPoto()

    bird.velocity.y += g // Force de la gravité exercée sur bird

    // Effectuer un saut si le joueur presse sur espace
    window.addEventListener('keypress', evt => {
        if(evt.key == ' ') deltaTime = 0.5
    })
    jump(bird, deltaTime-=0.015, 19)
    // Dessine bird
    bird.draw(ctx)

    ctx.fillStyle = 'black'
    ctx.fillText('score : ' + score, 30, 20)

    // Si bird n'a pas réussi à traverser le poto
    if(bird.collideWith(potos[0], canv.height)){
        ctx.textAlign = 'center'
        ctx.font = 'bold 20px'
        ctx.fillStyle = 'red'
        ctx.fillText('Game Over', canv.width/2, canv.height/2)
        return cancelAnimationFrame(play)
    }

    // Si bird a réussi à dépasser le poto
    if(bird.velocity.x > potos[0].velocity.x + potos[0].size.w && !scoreAdded){
        score += 1
        scoreAdded = true
    }

    // Si le poto traverse 0 alors on l'enlève du tableau
    if(potos[0].velocity.x + potos[0].size.w < 0){
        removePoto()
        scoreAdded = false
    }

    return requestAnimationFrame(play)
}

window.onload = () => {
    play()
}