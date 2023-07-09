export class Vector2 {
    constructor (x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    normalize() {
        this.x = Math.round(this.x)
        this.y = Math.round(this.y)
    }

    clone() {
        return new Vector2(this.x, this.y)
    }
}

export class Transform2D {
    constructor (position = new Vector2(), rotation = new Vector2(), scale = new Vector2(1, 1)) {
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }
}

export default class Object2D {
    
    /**
     * 
     * @param {{
     *  textureUrl: string
     *  color: string
     *  transform: Transform2D
     * }} objectOptions
     */
    constructor(objectOptions) {
        this.transform = objectOptions.transform
        this.color = objectOptions.color
        this.textureUrl = objectOptions.textureUrl
    }
}