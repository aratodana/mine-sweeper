import {action, makeAutoObservable} from "mobx";
import {FieldStatus} from "../utils/enum/FieldStatus.ts";
import {boardStore} from "./boardStore.ts";
import {gameStore} from "./gameStore.ts";
    import { Card, getRandomCard} from "../utils/types/Card.ts";


class CardStore {
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
        if (!randomElement) {
            return;
        }
        boardStore.setFlag(randomElement.cx, randomElement.cy);
    }

    @action
    flagTwoRandomMine () {
        this.flagRandomMine();
        this.flagRandomMine();
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
        if(!randomElement) {
            return;
        }
        boardStore.reveal(randomElement.cx, randomElement.cy);
    }

    revealTwoRandomField () {
        this.revealRandomField();
        this.revealRandomField();
    }

    @action
    newCard () {
        gameStore.addCard(getRandomCard());
    }
    @action
    newTwoCard () {
        gameStore.addCard(getRandomCard());
        gameStore.addCard(getRandomCard());
    }
    @action
    newTreeCard () {
        gameStore.addCard(getRandomCard());
        gameStore.addCard(getRandomCard());
        gameStore.addCard(getRandomCard());
    }
}

export const cardStore = new CardStore();