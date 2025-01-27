import {action, computed, makeAutoObservable, observable} from "mobx";
import {FieldStatus, getFieldByNumberOfMinesAround} from "../utils/enum/FieldStatus.ts";
import randomInteger from "../utils/functions/randomInteger.ts";
import {GameStatus} from "../utils/enum/GameStatus.ts";
import { Field } from "../utils/types/Field.ts";
import {getRandomBonus} from "../utils/types/Bonus.ts";



class BoardStore {
    @observable.deep
    board: Array< Array<Field> > | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    @action
    initEmptyBoard = (size: number) => {
        const localBoard = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const currentField = new Field(i, j, FieldStatus.EMPTY, false, false)
                row.push(currentField);
            }
            localBoard.push(row);
        }
        this.board = localBoard;
    }

    @action
    addRandomMines = (numberOfMines: number) => {
        if (!this.board) {
            console.warn('Call addRandomMines without board');
            return;
        }
        for (let i = 0; i < numberOfMines; i++) {
            const x = randomInteger(0, this.board.length-1)
            const y = randomInteger(0, this.board.length-1)
            this.board[x][y].value = FieldStatus.MINE;
        }
        this.calculateNearFields();
    }

    @action
    addRandomBonuses = (numberOfBonuses: number) => {
        if (!this.board) {
            console.warn('Call addRandomMines without board');
            return;
        }

        let i = 0;
        while (i < numberOfBonuses) {
            const x = randomInteger(0, this.board.length-1)
            const y = randomInteger(0, this.board.length-1)
            if (this.board[x][y].value !== FieldStatus.MINE) {
                this.board[x][y].bonus = getRandomBonus();
                i++;
            }
        }
        this.calculateNearFields();
    }

    @action
    addRandomCoins = (numberOfCoins: number) => {
        if (!this.board) {
            console.warn('Call addRandomMines without board');
            return;
        }



        let i = 0;
        while (i < numberOfCoins) {
            const x = randomInteger(0, this.board.length-1)
            const y = randomInteger(0, this.board.length-1)
            if (this.board[x][y].value !== FieldStatus.MINE) {
                this.board[x][y].coins = randomInteger(1, 5)
                i++;
            }
        }
        this.calculateNearFields();
    }

    @action
    removeBonus = (cx: number, cy: number) => {
        if (!this.board) {
            return;
        }
        this.board[cx][cy].bonus = null;
    }

    @action
    removeCoin = (cx: number, cy: number) => {
        if (!this.board) {
            return;
        }
        this.board[cx][cy].coins = null;
    }

    @action
    calculateNearFields = () => {
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
                    if (this.board[i][j].value === FieldStatus.MINE) {
                        counter++;
                    }
                }
            }
            return counter;
        }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j].value == FieldStatus.MINE) {
                    continue;
                }
                const numberOfMinesAround = calcMinesAround(i, j);
                this.board[i][j].value = getFieldByNumberOfMinesAround(numberOfMinesAround);
            }
        }
    }

    @computed
    get getBoard () {
        return this.board;
    }

    @action
    isRevealed = (keyX: number, keyY: number): boolean => {
        if (!this.board) {
            return false;
        }
        return this.board[keyX][keyY].isRevealed;
    }

    @computed
    isFlagged = (keyX: number, keyY: number): boolean => {
        if (!this.board) {
            return false;
        }
        return this.board[keyX][keyY].isFlagged;
    }

    @action
    reveal = (cx: number, cy: number) => {
        if (!this.board) {
            return;
        }
        if (this.board[cx][cy].isRevealed) {
            return;
        }
        if (this.board[cx][cy].isFlagged) {
            return;
        }
        this.board[cx][cy].isRevealed = true;

        if (this.board[cx][cy].value === FieldStatus.EMPTY) {
            const intervalXMin = cx === 0 ? 0 : cx -1;
            const intervalYMin = cy === 0 ? 0 : cy -1;
            const intervalXMax = cx === this.board.length - 1 ? this.board.length - 1 : cx + 1;
            const intervalYMax = cy === this.board.length - 1 ? this.board.length - 1 : cy + 1;

            for(let i = intervalXMin; i <= intervalXMax; i++) {
                for (let j = intervalYMin; j <= intervalYMax; j++) {
                    this.reveal(i, j)
                }
            }
        }
    }

    @action
    setFlag =(cx: number, cy: number) => {
        if (!this.board) {
            return;
        }
        if(this.board[cx][cy].isRevealed) {
            return;
        }
        this.board[cx][cy].isFlagged = !this.board[cx][cy].isFlagged;
    }

    @computed
    get boardStatus (): Array<GameStatus> {
        const problems: Array<GameStatus> = [];
        const addProblemToList = (currentStatus: GameStatus) => {
            if (problems.includes(currentStatus)) {
                return;
            }
            problems.push(currentStatus);
        }
        if (!this.board) {
            return [GameStatus.NOT_STARTED];
        }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j].value == FieldStatus.MINE) {
                    if (this.isRevealed(i, j)) {
                        addProblemToList(GameStatus.DEFEATED)
                    }
                    if (!this.isFlagged(i, j)) {
                        addProblemToList(GameStatus.NOT_ALL_MINES_FLAGGED);
                    }
                }
                else {
                    if (!this.isRevealed(i, j)) {
                        addProblemToList(GameStatus.NOT_ALL_EMPTY_REVEALED);
                    }
                    if (this.isFlagged(i, j)) {
                        addProblemToList(GameStatus.EMPTY_FIELD_FLAGGED)
                    }
                }
            }
        }
        return problems;
    }
}

export const boardStore = new BoardStore();