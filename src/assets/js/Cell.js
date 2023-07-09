export default class Cell {
    x;
    y;
    width;
    height;
    alive;
    constructor(x, y, width, height, alive) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = alive;
    }
}

export function reset(matrix) {
    for (let i=0; i<matrix.length; i++) {
        for (let j=0; j<matrix[i].length; j++) {
            matrix[i][j] = 0;
        }
    }
}

export function render(tilemap, width, height, colorAlive, colorDead, ctx) {
    for (let i=0; i<tilemap.length; i++) {
        for (let j=0; j<tilemap[i].length; j++) {
            let cell = new Cell(j*width, i*height, width, height, (tilemap[i][j]==1 ? true : false));
            if (cell.alive) ctx.fillStyle = colorAlive;
            else ctx.fillStyle = colorDead;
            ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
        }
    }
}

export function check(tilemap, neighbour) {
    for (let i=0; i<tilemap.length; i++) {
        for (let j=0; j<tilemap[i].length; j++) {
            if (i>=0 && i<tilemap.length && j>=0 && j<tilemap[i].length) {
                let nb = 0;
                if (i==0) {
                    if (j==0) {
                        for (let y=i; y<=i+1; y++) 
                            for (let x=j; x<=j+1; x++)
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                    else if (j==tilemap[i].length-1) {
                        for (let y=i; y<=i+1; y++)
                            for (let x=j-1; x<=j; x++)
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                    else {
                        for (let y=i; y<=i+1; y++)
                            for (let x=j-1; x<=j+1; x++)
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                }
                else if (i==tilemap.length-1) {
                    if (j==0) {
                        for (let y=i-1; y<=i; y++)
                            for (let x=j; x<=j+1; x++)
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                    else if (j==tilemap[i].length-1) {
                        for (let y=i-1; y<=i; y++)
                            for (let x=j-1; x<=j; x++)
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                    else {
                        for (let y=i-1; y<=i; y++)
                            for (let x=j-1; x<=j+1; x++)
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                }
                else {
                    if (j==0) {
                        for (let y=i-1; y<=i+1; y++)
                            for (let x=j; x<=j+1; x++) 
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                    else if (j==tilemap[i].length-1) {
                        for (let y=i-1; y<=i+1; y++)
                            for (let x=j-1; x<=j; x++) 
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                    else {
                        for (let y=i-1; y<=i+1; y++)
                            for (let x=j-1; x<=j+1; x++) 
                                if (tilemap[y][x]==1  && (y!=i || x!=j)) nb++;
                    }
                }
                neighbour[i][j] = nb;
            }
        }
    }
}

export function update(tilemap, neighbour) {
    for (let i=0; i<neighbour.length; i++) {
        for (let j=0; j<neighbour[i].length; j++) {
            if (neighbour[i][j]==3) tilemap[i][j] = 1;
            if (neighbour[i][j]<2 || neighbour[i][j]>3) tilemap[i][j] = 0;
            if (neighbour[i][j]==2) tilemap[i][j] = tilemap[i][j];
        }
    }
    return tilemap;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomize(tilemap) {
    for (let i=0; i<tilemap.length; i++) {
        for (let j=0; j<tilemap[i].length; j++) {
            let nbrRand = rand(1, 50);
            tilemap[i][j] = nbrRand%2==0 ? 1 : 0;
        }
    }
}