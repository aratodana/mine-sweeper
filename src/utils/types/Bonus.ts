enum Bonus {
    EXTRA_LIFE= 'EXTRA_LIFE',
    REVEAL_RANDOM_FIELD = 'REVEAL_RANDOM_FIELD',
    FLAG_RANDOM_MINE = 'FLAG_RANDOM_MINE',
    NEW_BONUS = 'NEW_BONUS',
    SHOW_PROBLEMS = 'REVEAL_PROBLEM',
    SHOW_INFOS = 'REVEAL_INFOS',
}

function getRandomBonus (): Bonus {

    const enumValues = [Bonus.REVEAL_RANDOM_FIELD, Bonus.FLAG_RANDOM_MINE, Bonus.NEW_BONUS];
    const index = Math.floor(Math.random() * enumValues.length);
    return enumValues[index];
}

export { Bonus, getRandomBonus };