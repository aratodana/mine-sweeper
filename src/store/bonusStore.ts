import {action, makeAutoObservable} from "mobx";
import {FieldStatus} from "../utils/enum/FieldStatus.ts";
import {boardStore} from "./boardStore.ts";
import {gameStore} from "./gameStore.ts";
import {Bonus, BonusCardData, getRandomBonus} from "../utils/types/Bonus.ts";


class BonusStore {
    constructor() {
        makeAutoObservable(this);
    }

    @action
    flagRandomMine (source:BonusCardData, numberOfFields:number = 1) {
        if (!boardStore.board) {
            console.warn('No board while calling flagRandomMine');
            return;
        }
        for(let i = 0; i < numberOfFields; i++) {
            const fields = boardStore.board.flatMap(value => value);
            const mines = fields.filter(field => field.value === FieldStatus.MINE &&  !field.isRevealed && !field.isFlagged);
            const randomIndex = Math.floor(Math.random() * mines.length);
            const randomElement = mines[randomIndex];
            if (!randomElement) {
                gameStore.removeFirstBonus(source);
                return;
            }
            boardStore.setFlag(randomElement.cx, randomElement.cy);
        }
        gameStore.removeFirstBonus(source);
    }

    @action
    revealRandomField (source:BonusCardData, numberOfFields:number = 1) {
        if (!boardStore.board) {
            console.warn('No board while calling flagRandomMine');
            return;
        }
        for (let i = 0; i < numberOfFields; i++) {
            const fields = boardStore.board.flatMap(value => value);
            const notMineFields = fields.filter(field => field.value !== FieldStatus.MINE &&  !field.isRevealed && !field.isFlagged);
            const randomIndex = Math.floor(Math.random() * notMineFields.length);
            const randomElement = notMineFields[randomIndex];
            if (!randomElement) {
                gameStore.removeFirstBonus(source);
                return;
            }
            boardStore.reveal(randomElement.cx, randomElement.cy);
        }
        gameStore.removeFirstBonus(source);
    }

    @action
    newBonus (source:BonusCardData, numberOfFields:number = 1) {
        for (let i = 0; i < numberOfFields; i++) {
            gameStore.addBonus(getRandomBonus());
        }
        gameStore.removeFirstBonus(source);
    }
}

export const bonusStore = new BonusStore();