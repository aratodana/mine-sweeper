import {action, makeAutoObservable} from "mobx";
import {FieldStatus} from "../utils/types/FieldStatus.ts";
import {boardStore} from "./boardStore.ts";
import {gameStore} from "./gameStore.ts";
import {Bonus, BonusCardData, getRandomBonus} from "../utils/types/Bonus.ts";


class BonusStore {
    constructor() {
        makeAutoObservable(this);
    }

    @action
    flagRandomMine (source:BonusCardData) {
        if (!boardStore.board) {
            console.warn('No board while calling flagRandomMine');
            return;
        }
        const fields = boardStore.board.flatMap(value => value);
        const mines = fields.filter(field => field.value === FieldStatus.MINE &&  !field.isRevealed && !field.isFlagged);
        const randomIndex = Math.floor(Math.random() * mines.length);
        const randomElement = mines[randomIndex];
        if (!randomElement) {
            return;
        }
        boardStore.setFlag(randomElement.cx, randomElement.cy);
        gameStore.removeFirstBonus(source);
    }

    @action
    revealRandomField (source:BonusCardData) {
        if (!boardStore.board) {
            console.warn('No board while calling flagRandomMine');
            return;
        }
        const fields = boardStore.board.flatMap(value => value);
        const notMineFields = fields.filter(field => field.value !== FieldStatus.MINE &&  !field.isRevealed && !field.isFlagged);
        const randomIndex = Math.floor(Math.random() * notMineFields.length);
        const randomElement = notMineFields[randomIndex];
        if (!randomElement) {
            return;
        }
        boardStore.reveal(randomElement.cx, randomElement.cy);
        gameStore.removeFirstBonus(source);
    }

    @action
    newBonus (source:BonusCardData) {
        gameStore.addBonus(getRandomBonus());
        gameStore.removeFirstBonus(source);
    }
}

export const bonusStore = new BonusStore();