function AISimulation(bot, player, level, rules) {
    // Pass by value
    bot = bot.slice(0)
    player = player.slice(0)

    let pos
    let scores = []

    for (let i = 0; i < bot.length; i++)
        if (bot[i] > 0) {
            scores.push(Simulation(8, i, bot, player, rules))
        }
    
    pos = diff(bot, scores, level)

    return pos
}

// Position and Difficulty are relative
function diff(bot, scores, level) {
    let pos
    scores.reduce((prev, curr) => {
        if (curr.value > prev && curr.value <= level && bot[curr.pos] > 0) {
            pos = curr.pos
            return curr.value
        }
        else return prev
    }, -Infinity)

    return pos
}

// AISimulation MiniMax
function Simulation(depth, position, player, opponent, rules) {
    // Pass By Value
    player = player.slice(0)
    opponent = opponent.slice(0)

    let score = {
        pos: position,
        value: rules(position, player, opponent, true)
    }

    if (depth > 0) {
        let scores = []
        for (let i = 0; i < opponent.length; i++) 
            if(opponent[i] > 0)
                scores.push(Simulation(depth - 1, i, opponent, player, rules))

        // Opponent wanna maximize too score
        score.value -= scores.reduce((prev, curr) => curr.value > prev ? curr.value : prev, 0)
    }

    return score
}

export { AISimulation }