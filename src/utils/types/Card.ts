import cardConfig from "../../config/cardConfig.json";
import uuid from 'react-native-uuid';
import CardLevel from '../enum/CardLevel'
import {ImageSourcePropType} from "react-native";
import images from "../../../assets/cards/"


interface Action {
    key: string;
    value: number;
}

interface CardConfig {
    title: string,
    description: string,
    price: number,
    level: string,
    image: string
    actions: {
        reveal?: number,
        flag?: number,
        addCard?: number,
        addCoin?: number,
        addLife?: number
    }
}

class Card {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    price: number;
    level: CardLevel;
    actions: Action[];

    constructor(config: CardConfig) {
        this.id = uuid.v4();
        this.title = config.title;
        this.description = config.description;
        this.image = images?.[config.image];
        this.price = config.price;
        this.level = config.level as CardLevel;
        this.actions = Object.entries(config.actions).map(([key, value])=> {
            return {
                key,
                value
            }
        })
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
    return new Card(current);
}

export {getRandomCard, Card};
export type { Action };
