import {makeAutoObservable} from "mobx";
import Field from "../utils/types/Field.ts";
import randomInteger from "../utils/functions/randomInteger.ts";

class BoardStore {
    board: Array< Array<Field> > | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    initEmptyBoard (size: number) {
        const localBoard = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(Field.EMPTY);
            }
            localBoard.push(row);
        }
    }

    addRandomMines (numberOfMines: number) {
        if (!this.board) {
            console.warn('Call addRandomMines without board');
            return;
        }
        for (let i = 0; i < numberOfMines; i++) {
            const x = randomInteger(0, this.board.length)
            const y = randomInteger(0, this.board.length)
            this.board[x][y] = Field.MINE;
        }
        this.calculateNearFields();
    }
    calculateNearFields () {
        // TODO: Implement this, when board is ready
    }

}

export const boardStore = new BoardStore();