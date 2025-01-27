import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore.ts";
import {GameStatus} from "../utils/enum/GameStatus.ts";
import { BonusCard} from "../utils/types/Bonus.ts";
import levels from "../config/levels.json"
import bonusCards from "../config/bonusCards.ts";
import {bonusStore} from "./bonusStore.ts";

class GameStore {
    @observable
    currentLevel: number = 0;

    @observable
    bonuses: Array<BonusCard> = []

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
    collectBonus = (cx: number, cy: number, bonus: BonusCard | null) => {
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
    addBonus (bonus:BonusCard) {
        this.bonuses.push(bonus);
    }
    @action
    addCoin (coins:number) {
        this.coins += coins;
    }

    @action
    removeBonus (card:BonusCard) {
        this.bonuses = this.bonuses.filter(bonus => !bonus.equals(card));
    }

    spendCoins(price: number) {
        this.coins -= price;
    }

    useBonusCard (card:BonusCard) {
        if (this.coins < card.price) {
            console.warn('Not enough coins');
            return;
        }
        this.spendCoins(card.price);
        card.callback()
        this.removeBonus(card);
    }
}

export const gameStore = new GameStore();