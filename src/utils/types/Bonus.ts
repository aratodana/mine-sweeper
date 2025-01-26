enum Bonus {
    REVEAL_RANDOM_FIELD = 'REVEAL_RANDOM_FIELD',
    FLAG_RANDOM_MINE = 'FLAG_RANDOM_MINE',
    NEW_BONUS = 'NEW_BONUS',
}

class BonusCardData {
    major: Bonus
    minor: number

    constructor(major:Bonus, minor:number) {
        this.major = major
        this.minor = minor;
    }

    equals (other:BonusCardData):boolean {
        return other.major === this.major && other.minor === this.minor
    }
}

function getRandomBonus (): BonusCardData {
    const enumValues = Object.values(Bonus);
    const index = Math.floor(Math.random() * enumValues.length);
    const randomType = Math.floor(Math.random() * 3) + 1;
    return new BonusCardData(enumValues[index], randomType);
}

export { Bonus, getRandomBonus, BonusCardData };