enum Bonus {
    EXTRA_LIFE= 'EXTRA_LIFE',
    REVEAL_RANDOM_FIELD = 'REVEAL_RANDOM_FIELD',
    FLAG_RANDOM_MINE = 'FLAG_RANDOM_MINE',
    NEW_BONUS = 'NEW_BONUS',
    SHOW_PROBLEMS = 'REVEAL_PROBLEM',
    SHOW_INFOS = 'REVEAL_INFOS',
}

function getRandomBonus (): Bonus {
    const enumValues = Object.values(Bonus);
    const index = Math.floor(Math.random() * enumValues.length);
    return enumValues[index];
}

export { Bonus, getRandomBonus };