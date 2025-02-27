import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore.ts";
import {GameStatus} from "../utils/enum/GameStatus.ts";
import { Card, Action} from "../utils/types/Card.ts";
import {cardStore} from "../store/cardStore.ts";
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
    get isFullWin (): boolean {
        return this.isWin && !levels[this.currentLevel + 1];
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
        if (!currentLevel) {
            return;
        }
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
        this.runActions(card.actions);
        this.removeCard(card);
    }
    runActions(actions:Action[]) {
        actions.forEach(action => {this.runAction(action);});
    }
    runAction (action:Action) {
        const cardActionMap = {
            reveal: cardStore.revealRandomField,
            flag: cardStore.flagRandomMine,
            addCard: cardStore.newCard,
            addCoin: cardStore.addCoin,
            addLife:  cardStore.addLife,
            default: () => { console.warn(`No action found ${action.key}`)}
        }

        const safeKey = action.key as keyof typeof cardActionMap;
        const actionFunction = cardActionMap[safeKey]

        for (let i = 0; i < action.value; i++) {
            actionFunction();
        }


    }
}

export const gameStore = new GameStore();