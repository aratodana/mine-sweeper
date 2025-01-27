import {action, makeAutoObservable} from "mobx";
import {FieldStatus} from "../utils/enum/FieldStatus.ts";
import {boardStore} from "./boardStore.ts";
import {gameStore} from "./gameStore.ts";
import { BonusCardData, getRandomBonus} from "../utils/types/Bonus.ts";


class BonusStore {
    constructor() {
        makeAutoObservable(this);
    }

    @action
    flagRandomMine () {
        if (!boardStore.board) {
            console.warn('No board while calling flagRandomMine');
            return;
        }
        const fields = boardStore.board.flatMap(value => value);
        const mines = fields.filter(field => field.value === FieldStatus.MINE &&  !field.isRevealed && !field.isFlagged);
        const randomIndex = Math.floor(Math.random() * mines.length);
        const randomElement = mines[randomIndex];
        boardStore.setFlag(randomElement.cx, randomElement.cy);
    }

    @action
    revealRandomField () {
        if (!boardStore.board) {
            console.warn('No board while calling flagRandomMine');
            return;
        }
        const fields = boardStore.board.flatMap(value => value);
        const notMineFields = fields.filter(field => field.value !== FieldStatus.MINE &&  !field.isRevealed && !field.isFlagged);
        const randomIndex = Math.floor(Math.random() * notMineFields.length);
        const randomElement = notMineFields[randomIndex];
        boardStore.reveal(randomElement.cx, randomElement.cy);
    }

    @action
    newBonus () {
        gameStore.addBonus(getRandomBonus());
    }
}

export const bonusStore = new BonusStore();