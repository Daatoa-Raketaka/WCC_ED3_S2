class Vector2D {
    constructor(x= 0, y= 0){
        this.x  = x
        this.y = y
    }
}

class Component {
    constructor(velocity= new Vector2D(), color= 'gold', size= { w: 1, h: 1 }){
        this.velocity = velocity
        this.color = color
        this.size = size
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.velocity.x, this.velocity.y, this.size.w, this.size.h)
    }

    // Collision
    collideWith(component, height){
        return (
            this.velocity.y <= 0 || (this.velocity.y + this.size.w) >= height ||
            (this.velocity.x + this.size.w) >= component.velocity.x &&
            (this.velocity.y + this.size.h) >= component.velocity.y &&
            this.velocity.x <= (component.velocity.x + component.size.w) &&
            this.velocity.y <= (component.velocity.y + component.size.h)
        ) || (
            (this.velocity.x + this.size.w) >= component.velocity.x &&
            (this.velocity.y + this.size.h) >= (component.velocity.y + component.size.h + 100) &&
            this.velocity.x <= (component.velocity.x + component.size.w) &&
            this.velocity.y <= height
        )
    }
}

class Poto extends Component {
    constructor(velocity= new Vector2D(), color= 'gold', size= { w: 1, h: 1 }){
        super(velocity, color, size)
    }

    draw(ctx, canv){
        ctx.fillStyle = this.color
        ctx.fillRect(this.velocity.x, this.velocity.y, this.size.w, this.size.h)
        ctx.fillRect(this.velocity.x, this.velocity.y + this.size.h + 100, this.size.w, canv.height)
    }

    move(speed){ this.velocity.x -= speed }
}