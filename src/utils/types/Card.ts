import cardConfig from '../../config/cardConfig.ts'
import uuid from 'react-native-uuid';

class Card {
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

    equals (other:Card):boolean {
        return this.id === other.id;
    }

    similar (other:Card):boolean {
        return this.title === other.title && this.description === other.description && this.price === other.price;
    }
}




// @ts-ignore
function getRandomCard (): Card {
    const probabilityArray = cardConfig.map(card => Array.from({length: card.probability}, () => card)).flat();
    const randomIndex = Math.floor(Math.random() * probabilityArray.length);
    const current = probabilityArray[randomIndex];
    return new Card(current.title, current.description, current.price, current.callback);
}

export { getRandomCard, Card };