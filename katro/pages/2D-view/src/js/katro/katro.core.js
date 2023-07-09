import { AISimulation } from './katro.AI.js'

const max = 4

function run(position, player, opponent, isBotTurn, isSimulation = false) {
    let poids = player[position]
    player[position++] = 0

    let score = 0

    while (poids > 0) {
        let isBack = true
        for (position; position < max * 2 && poids > 0; poids-- && position++)
            player[position]++
                
        if (poids > 0) {
            position = 0
            continue
        }
        
        position--

        if ((isBotTurn && position >= 4) ||
            (!isBotTurn && position < 4)) isBack = false

        if (player[position] > 1) {
            if (!isBack) {
                if (isPartEmpty(opponent, (isBotTurn ? 0 : 4)) && opponent[position] > 0) {
                    poids = player[position] + opponent[position]
                    opponent[position] = 0
                }
                else if (opponent[opponent.length - (position + 1)]) {
                    poids = player[position] + opponent[opponent.length - (position + 1)]
                    opponent[opponent.length - (position + 1)] = 0
                }
                score += poids - player[position]
            }
            else poids = player[position]

            /* if (!isSimulation)
                if(isGameOver(opponent)) {
                    alert('Game Over')
                    break
                } */

            player[position++] = 0
        }
    }

    return score
}

function isPartEmpty(player, startPoint) {
    for (let i = startPoint; i < startPoint + max; i++)
        if (player[i] > 0)
            return false
    
    return true
}

export { run }