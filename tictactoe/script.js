const MAX = 3;
let count = 0;
let coche = new Array(MAX * MAX);
let btnList = document.getElementsByTagName('button');

const play = (numBTN) => {
    if(coche[numBTN] == undefined){
        if(count >= MAX*MAX-1) restart();
        else if(count%2==0) go('O', numBTN);
        else go('X', numBTN);
        count++;
    }
};

const go = (player, numBTN) => {
    let btn = btnList[numBTN];
    btn.style.background = `url(./${player}.png)`;
    coche[numBTN] = player;
    if(count >= 4){
        let pos = positions(0, player);
        if(pos.length == MAX) restart(player);
        else if(pos.length>0)
            for(let i=0; i<pos.length; i++) 
                verification(1, player, pos, undefined, i);
        else verification(1, player, pos, undefined, 0)
    }
};

const positions = (ligne, actu) => {
    let position = [];
    for(let i=0+(MAX*ligne); i<MAX+(MAX*ligne); i++)
        if(coche[i] == actu) position.push(i-MAX*ligne);
    return position;
};

const verification = (ligne, actu, pos, distance, indice) => {
    let anotherPos = positions(ligne, actu);
    if(anotherPos.length == MAX) restart((actu=='O') ? 'O' : 'X');
    else if(anotherPos.length>0){
        for(let j=0; j<anotherPos.length; j++){
            if((pos[indice]-anotherPos[j] < 2) && (pos[indice]-anotherPos[j] > -2) && distance == undefined)
                verification(ligne+1, actu, anotherPos, pos[indice]-anotherPos[j], j);
            else if(ligne < MAX-1 && distance == pos[indice]-anotherPos[j])
                verification(ligne+1, actu, anotherPos, distance, j);
                
            else if(ligne >= MAX-1 && pos[indice]-anotherPos[j] == distance){
                restart((actu=='O') ? 'O' : 'X');
                break;
            }
        }
    }
    else if(ligne < MAX-1) verification(ligne+1, actu, anotherPos, 0, 0);
};

const restart = (winnner) => {
    if(winnner) alert(winnner + ' win');
    coche = [];
    count = -1;
    for(i=0; i<btnList.length; i++)
        btnList[i].style.background = '';
};