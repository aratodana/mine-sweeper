import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore.ts";
import {GameStatus} from "../utils/types/GameStatus.ts";
import {Bonus} from "../utils/types/Bonus.ts";

class GameStore {
    @observable
    currentLevel: number = 0;

    @observable
    bonuses: Array<Bonus> = []

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
        this.bonuses = [];
    }

    @action
    startGameByLevel= () => {
        boardStore.initEmptyBoard(6);
        boardStore.addRandomMines(1);
        boardStore.calculateNearFields();
        boardStore.addRandomBonuses(3)
    }

    @action
    startNextLevel = () => {
        this.currentLevel++;
        this.startGameByLevel();
    }

    @action
    collectBonus = (cx: number, cy: number, bonus: Bonus | null) => {
        if (!bonus) {
            return;
        }
        this.addBonus(bonus);
        boardStore.removeBonus(cx, cy);
    }

    @action
    addBonus (bonus:Bonus) {
        this.bonuses.push(bonus);
    }

    @action
    removeFirstBonus (bonus:Bonus) {
        const index = this.bonuses.findIndex(item => item === bonus);
        if (index !== -1) {
            this.bonuses.splice(index, 1);
        }
    }
}

export const gameStore = new GameStore();