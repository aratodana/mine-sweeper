import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore.ts";
import {GameStatus} from "../utils/enum/GameStatus.ts";
import { Card} from "../utils/types/Card.ts";
import levels from "../config/levels.json"

class GameStore {
    @observable
    currentLevel: number = 0;

    @observable
    cards: Array<Card> = []

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
    get getCards () {
        return this.cards.slice();
    }

    @action
    restartGame = ()=> {
        this.currentLevel = 0;
        this.coins = 0;
        this.startGameByLevel();
        this.cards = [];
    }

    @action
    startGameByLevel= () => {
        const currentLevel = levels[this.currentLevel];
        boardStore.initEmptyBoard(currentLevel.size);
        boardStore.addRandomMines(currentLevel.mine);
        boardStore.calculateNearFields();
        boardStore.addRandomCards(currentLevel.cards)
        boardStore.addRandomCoins(currentLevel.coins);
    }

    @action
    startNextLevel = () => {
        this.currentLevel++;
        this.startGameByLevel();
    }

    @action
    collectCard = (cx: number, cy: number, card: Card | null) => {
        if (!card) {
            return;
        }
        this.addCard(card);
        boardStore.removeCard(cx, cy);
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
    addCard (card:Card) {
        this.cards.push(card);
    }
    @action
    addCoin (coins:number) {
        this.coins += coins;
    }

    @action
    removeCard (current:Card) {
        this.cards = this.cards.filter(card => !card.equals(current));
    }

    spendCoins(price: number) {
        this.coins -= price;
    }

    useCard (card:Card) {
        if (this.coins < card.price) {
            console.warn('Not enough coins');
            return;
        }
        this.spendCoins(card.price);
        card.callback()
        this.removeCard(card);
    }
}

export const gameStore = new GameStore();