import {BonusCard} from "../utils/types/Bonus.ts";
import {bonusStore} from "../store/bonusStore.ts";

export default [
    {
        title: "bonus.new_bonus.type_1.title",
        description: "bonus.new_bonus.type_1.description",
        price: 2,
        probability: 9,
        callback: bonusStore.newBonus,
    },
    {
        title: "bonus.new_bonus.type_3.title",
        description: "bonus.new_bonus.type_3.description",
        price: 5,
        probability: 5,
        callback: bonusStore.newBonus,
    },
    {
        title: "bonus.flag_random_mine.type_1.title",
        description: "bonus.flag_random_mine.type_1.description",
        price: 2,
        probability: 8,
        callback: bonusStore.flagRandomMine,
    },
    {
        title: "bonus.flag_random_mine.type_3.title",
        description: "bonus.flag_random_mine.type_3.description",
        price: 5,
        probability: 4,
        callback: bonusStore.flagRandomMine,
    },
    {
        title: "bonus.reveal_random_field.type_1.title",
        description: "bonus.reveal_random_field.type_1.description",
        price: 2,
        probability: 7,
        callback: bonusStore.revealRandomField,
    },
    {
        title: "bonus.reveal_random_field.type_3.title",
        description: "bonus.reveal_random_field.type_3.description",
        price: 5,
        probability: 5,
        callback: bonusStore.revealRandomField,
    }
]