import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore.ts";
import {GameStatus} from "../utils/types/GameStatus.ts";
import {Bonus, BonusCardData} from "../utils/types/Bonus.ts";
import levels from "../config/levels.json"

class GameStore {
    @observable
    currentLevel: number = 0;

    @observable
    bonuses: Array<BonusCardData> = []

    @observable
    coins: number = 0;

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

    @computed
    get getBonuses () {
        return this.bonuses.slice();
    }

    @action
    restartGame = ()=> {
        this.currentLevel = 0;
        this.coins = 0;
        this.startGameByLevel();
        this.bonuses = [];
    }

    @action
    startGameByLevel= () => {
        const currentLevel = levels[this.currentLevel];
        boardStore.initEmptyBoard(currentLevel.size);
        boardStore.addRandomMines(currentLevel.mine);
        boardStore.calculateNearFields();
        boardStore.addRandomBonuses(currentLevel.bonus)
        boardStore.addRandomCoins(currentLevel.coins);
    }

    @action
    startNextLevel = () => {
        this.currentLevel++;
        this.startGameByLevel();
    }

    @action
    collectBonus = (cx: number, cy: number, bonus: BonusCardData | null) => {
        if (!bonus) {
            return;
        }
        this.addBonus(bonus);
        boardStore.removeBonus(cx, cy);
    }


    @action
    collectCoins = (cx: number, cy: number, coin: number | null) => {
        if (!coin) {
            return;
        }
        this.addCoin(coin);
        boardStore.removeCoin(cx, cy);
    }

    @action
    addBonus (bonus:BonusCardData) {
        this.bonuses.push(bonus);
    }
    @action
    addCoin (coins:number) {
        this.coins += coins;
    }

    @action
    removeFirstBonus (bonus:BonusCardData) {
        const index = this.bonuses.findIndex(item => item.equals(bonus));
        if (index !== -1) {
            this.bonuses.splice(index, 1);
        }
    }

    spendCoins(price: number) {
        this.coins -= price;
    }
}

export const gameStore = new GameStore();