import {action, computed, makeAutoObservable, observable} from "mobx";
import {FieldStatus, getFieldByNumberOfMinesAround} from "../utils/types/FieldStatus.ts";
import randomInteger from "../utils/functions/randomInteger.ts";
import {GameStatus} from "../utils/types/GameStatus.ts";

class BoardStore {
    @observable
    board: Array< Array<FieldStatus> > | null = null;

    @observable
    revealedFields:  Array< Array<boolean> > | null = null;

    @observable
    flaggedFields:  Array< Array< boolean>> | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    @action
    initEmptyBoard = (size: number) => {
        const localBoard = [];
        const emptyBooleanBoard = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            const revealedRow = [];
            for (let j = 0; j < size; j++) {
                row.push(FieldStatus.EMPTY);
                revealedRow.push(false);
            }
            localBoard.push(row);
            emptyBooleanBoard.push(revealedRow);
        }
        this.board = localBoard;
        this.revealedFields = emptyBooleanBoard;
        this.flaggedFields = emptyBooleanBoard;
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
            this.board[x][y] = FieldStatus.MINE;
        }
        this.calculateNearFields();
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

    @computed
    get getBoard () {
        return this.board;
    }

    @action
    isRevealed = (keyX: number, keyY: number): boolean => {
        if (!this.revealedFields) {
            return false;
        }
        return this.revealedFields[keyX][keyY];
    }

    @computed
    isFlagged = (keyX: number, keyY: number): boolean => {
        if (!this.flaggedFields) {
            return false;
        }
        return this.flaggedFields[keyX][keyY];
    }

    @action
    reveal = (cx: number, cy: number) => {
        if (!this.revealedFields || !this.board || !this.flaggedFields) {
            return;
        }
        if (this.revealedFields[cx][cy]) {
            return;
        }
        if (this.flaggedFields[cx][cy]) {
            return;
        }
        this.revealedFields[cx][cy] = true;

        if (this.board[cx][cy] === FieldStatus.EMPTY) {
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
        if (!this.revealedFields || !this.board || !this.flaggedFields) {
            return;
        }
        if(this.revealedFields[cx][cy]) {
            return;
        }
        this.flaggedFields[cx][cy] = !this.flaggedFields[cx][cy];
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
        if (!this.revealedFields || !this.board || !this.flaggedFields) {
            return [GameStatus.NOT_STARTED];
        }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] == FieldStatus.MINE) {
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