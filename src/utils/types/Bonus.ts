import bonusCards from '../../config/bonusCards.ts'
import uuid from 'react-native-uuid';

class BonusCard {
    id: string;
    title: string;
    description: string;
    price: number;
    callback: () => void;

    constructor(title:string, description:string, price:number, callback: () => void) {
        this.id = uuid.v4();
        this.title = title;
        this.description = description;
        this.price = price;
        this.callback = callback;
    }

    equals (other:BonusCard):boolean {
        return this.id === other.id;
    }

    similar (other:BonusCard):boolean {
        return this.title === other.title && this.description === other.description && this.price === other.price;
    }
}




// @ts-ignore
function getRandomBonus (): BonusCard {
    const probabilityArray = bonusCards.map(card => Array.from({length: card.probability}, () => card)).flat();
    const randomIndex = Math.floor(Math.random() * probabilityArray.length);
    const current = probabilityArray[randomIndex];
    return new BonusCard(current.title, current.description, current.price, current.callback);
}

export { getRandomBonus, BonusCard };