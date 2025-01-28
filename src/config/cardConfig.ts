import {cardStore} from "../store/cardStore.ts";
import CardLevel from '../utils/enum/CardLevel'

export default [
    {
        title: "card.new_card.type_1.title",
        description: "new_card.new_bonus.type_1.description",
        price: 2,
        probability: 9,
        level: CardLevel.COMMON,
        callback: cardStore.newCard,
    },
    {
        title: "card.new_card.type_3.title",
        description: "card.new_card.type_3.description",
        price: 5,
        probability: 5,
        level: CardLevel.UNIQUE,
        callback: cardStore.newCard,
    },
    {
        title: "card.flag_random_mine.type_1.title",
        description: "card.flag_random_mine.type_1.description",
        price: 2,
        probability: 8,
        level: CardLevel.RARE,
        callback: cardStore.flagRandomMine,
    },
    {
        title: "card.flag_random_mine.type_3.title",
        description: "card.flag_random_mine.type_3.description",
        price: 5,
        probability: 4,
        level: CardLevel.MYTHIC,
        callback: cardStore.flagRandomMine,
    },
    {
        title: "card.reveal_random_field.type_1.title",
        description: "card.reveal_random_field.type_1.description",
        price: 2,
        probability: 7,
        level: CardLevel.RARE,
        callback: cardStore.revealRandomField,
    },
    {
        title: "card.reveal_random_field.type_3.title",
        description: "card.reveal_random_field.type_3.description",
        price: 5,
        probability: 5,
        level: CardLevel.LEGENDARY,
        callback: cardStore.revealRandomField,
    }
]