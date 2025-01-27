import bonusCards from '../../config/bonusCards.ts'
import uuid from 'react-native-uuid';

class BonusCardData {
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

    equals (other:BonusCardData):boolean {
        return this.id === other.id;
    }

    similar (other:BonusCardData):boolean {
        return this.title === other.title && this.description === other.description && this.price === other.price;
    }
}




function getRandomBonus (): BonusCardData {
    const probabilityArray = bonusCards;
    const randomIndex = Math.floor(Math.random() * probabilityArray.length);
    const current = probabilityArray[randomIndex];
    return new BonusCardData(current.title, current.description, current.price, current.callback);
}

export { getRandomBonus, BonusCardData };