import cardConfig from '../../config/cardConfig.ts'
import uuid from 'react-native-uuid';
import CardLevel from '../enum/CardLevel'
import {ImageSourcePropType} from "react-native";

class Card {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    price: number;
    level: CardLevel;
    callback: () => void;

    constructor(title:string, description:string, price:number, level:CardLevel, image:ImageSourcePropType, callback: () => void) {
        this.id = uuid.v4();
        this.title = title;
        this.description = description;
        this.image = image
        this.price = price;
        this.level = level;
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
    return new Card(current.title, current.description, current.price, current.level, current.image, current.callback);
}

export { getRandomCard, Card};