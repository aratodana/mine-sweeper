import {makeAutoObservable} from "mobx";
import {FieldStatus, getFieldByNumberOfMinesAround} from "../utils/types/FieldStatus.ts";
import randomInteger from "../utils/functions/randomInteger.ts";

class BoardStore {
    board: Array< Array<FieldStatus> > | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    initEmptyBoard (size: number) {
        const localBoard = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(FieldStatus.EMPTY);
            }
            localBoard.push(row);
        }
        this.board = localBoard;
    }

    addRandomMines (numberOfMines: number) {
        if (!this.board) {
            console.warn('Call addRandomMines without board');
            return;
        }
        for (let i = 0; i < numberOfMines; i++) {
            const x = randomInteger(0, this.board.length-1)
            const y = randomInteger(0, this.board.length-1)
            this.board[x][y] = FieldStatus.MINE;
        }
        this.calculateNearFields();
    }
    calculateNearFields () {
        if (!this.board) {
            console.warn('Call calculateNearFields without board');
            return;
        }
        const calcMinesAround = (cx: number, cy: number): number => {
            if (!this.board) {
                console.warn('Call calculateNearFields without board');
                return 0;
            }
            let counter = 0;
            const intervalXMin = cx === 0 ? 0 : cx -1;
            const intervalYMin = cy === 0 ? 0 : cy -1;
            const intervalXMax = cx === this.board.length - 1 ? this.board.length - 1 : cx + 1;
            const intervalYMax = cy === this.board.length - 1 ? this.board.length - 1 : cy + 1;
            for (let i = intervalXMin; i <= intervalXMax; i++) {
                for (let j = intervalYMin; j <= intervalYMax; j++) {
                    if (this.board[i][j] === FieldStatus.MINE) {
                        counter++;
                    }
                }
            }
            return counter;
        }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] == FieldStatus.MINE) {
                    continue;
                }
                const numberOfMinesAround = calcMinesAround(i, j);
                this.board[i][j] = getFieldByNumberOfMinesAround(numberOfMinesAround);
            }
        }
    }

    get getBoard () {
        return this.board;
    }

}

export const boardStore = new BoardStore();