import {action, computed, makeAutoObservable, observable} from "mobx";
import {boardStore} from "./boardStore";
import { Card, Action} from "../utils/types/Card";
import {cardStore} from "../store/cardStore";
// @ts-ignore
import levels from "../config/levels.json"
import type {GameStoreExportState} from "../utils/types/exportStates";

class GameStore {
    @observable
    currentLevel: number = 0;

    @observable
    cards: Array<Card> = []

    @observable
    coins: number = 0;

    @observable
    life: number = 3;

    constructor() {
        makeAutoObservable(this);
    }

    @computed
    get exportState () {
        return {
            currentLevel: this.currentLevel,
            cards: this.cards,
            coins: this.coins,
            life: this.life,
        }
    }
    @action
    importState = (payload: GameStoreExportState)=> {
        this.currentLevel = payload.currentLevel;
        this.cards = payload.cards;
        this.coins = payload.coins;
        this.life = payload.life;
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
        return this.life === 0;
    }

    @computed
    get getCards () {
        return this.cards.slice();
    }

    @action
    addLife (payload: number) {
        if (this.life + payload > 5) {
            return;
        }
        this.life += payload;
    }

    @action
    removeLife (payload: number) {
        this.life -= payload;
    }

    @action
    restartGame = ()=> {
        this.currentLevel = 0;
        this.coins = 0;
        this.life = 3;
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