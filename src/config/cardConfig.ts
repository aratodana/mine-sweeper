import {Card} from "../utils/types/Card.ts";
import {cardStore} from "../store/cardStore.ts";

export default [
    {
        title: "card.new_card.type_1.title",
        description: "new_card.new_bonus.type_1.description",
        price: 2,
        probability: 9,
        callback: cardStore.newCard,
    },
    {
        title: "card.new_card.type_3.title",
        description: "card.new_card.type_3.description",
        price: 5,
        probability: 5,
        callback: cardStore.newCard,
    },
    {
        title: "card.flag_random_mine.type_1.title",
        description: "card.flag_random_mine.type_1.description",
        price: 2,
        probability: 8,
        callback: cardStore.flagRandomMine,
    },
    {
        title: "card.flag_random_mine.type_3.title",
        description: "card.flag_random_mine.type_3.description",
        price: 5,
        probability: 4,
        callback: cardStore.flagRandomMine,
    },
    {
        title: "card.reveal_random_field.type_1.title",
        description: "card.reveal_random_field.type_1.description",
        price: 2,
        probability: 7,
        callback: cardStore.revealRandomField,
    },
    {
        title: "card.reveal_random_field.type_3.title",
        description: "card.reveal_random_field.type_3.description",
        price: 5,
        probability: 5,
        callback: cardStore.revealRandomField,
    }
]