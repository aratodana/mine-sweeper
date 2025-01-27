import {Bonus, BonusCardData} from "../utils/types/Bonus.ts";
import {bonusStore} from "../store/bonusStore.ts";

export default [
    {
        bonus: new BonusCardData(Bonus.NEW_BONUS, 1),
        callback: bonusStore.newBonus,
        title: "bonus.new_bonus.type_1.title",
        description: "bonus.new_bonus.type_1.description",
        price: 2
    },
    {
        bonus: new BonusCardData(Bonus.NEW_BONUS, 2),
        callback: bonusStore.newBonus,
        title: "bonus.new_bonus.type_2.title",
        description: "bonus.new_bonus.type_2.description",
        price: 2
    },
    {
        bonus: new BonusCardData(Bonus.NEW_BONUS, 3),
        callback: (source:BonusCardData) => bonusStore.newBonus(source, 2),
        title: "bonus.new_bonus.type_3.title",
        description: "bonus.new_bonus.type_3.description",
        price: 5
    },
    {
        bonus: new BonusCardData(Bonus.FLAG_RANDOM_MINE, 1),
        callback: bonusStore.flagRandomMine,
        title: "bonus.flag_random_mine.type_1.title",
        description: "bonus.flag_random_mine.type_1.description",
        price: 2
    },
    {
        bonus: new BonusCardData(Bonus.FLAG_RANDOM_MINE, 2),
        callback: bonusStore.flagRandomMine,
        title: "bonus.flag_random_mine.type_2.title",
        description: "bonus.flag_random_mine.type_2.description",
        price: 2
    },
    {
        bonus: new BonusCardData(Bonus.FLAG_RANDOM_MINE, 3),
        callback: (source:BonusCardData) => bonusStore.flagRandomMine(source, 2),
        title: "bonus.flag_random_mine.type_3.title",
        description: "bonus.flag_random_mine.type_3.description",
        price: 5
    },
    {
        bonus: new BonusCardData(Bonus.REVEAL_RANDOM_FIELD, 1),
        callback: bonusStore.revealRandomField,
        title: "bonus.reveal_random_field.type_1.title",
        description: "bonus.reveal_random_field.type_1.description",
        price: 2
    },
    {
        bonus: new BonusCardData(Bonus.REVEAL_RANDOM_FIELD, 2),
        callback: bonusStore.revealRandomField,
        title: "bonus.reveal_random_field.type_2.title",
        description: "bonus.reveal_random_field.type_2.description",
        price: 2
    },
    {
        bonus: new BonusCardData(Bonus.REVEAL_RANDOM_FIELD, 3),
        callback: (source:BonusCardData) => bonusStore.revealRandomField(source, 2),
        title: "bonus.reveal_random_field.type_3.title",
        description: "bonus.reveal_random_field.type_3.description",
        price: 5
    }
]