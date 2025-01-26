import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore.ts";
import {GameStatus} from "../utils/types/GameStatus.ts";

class GameStore {
    @observable
    currentLevel: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    @computed
    get isWin (): boolean {
        return boardStore.boardStatus.length === 0;
    }

    @computed
    get isDefeat ():boolean {
        return boardStore.boardStatus.includes(GameStatus.DEFEATED);
    }

    @action
    restartGame = ()=> {
        this.currentLevel = 0;
        this.startGameByLevel();
    }

    @action
    startGameByLevel= () => {
        boardStore.initEmptyBoard(6);
        boardStore.addRandomMines(1);
        boardStore.calculateNearFields();
    }

    @action
    startNextLevel = () => {
        this.currentLevel++;
        this.startGameByLevel();
    }
}

export const gameStore = new GameStore();