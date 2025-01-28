import {FieldStatus} from "../enum/FieldStatus.ts";
import {makeAutoObservable, observable} from "mobx";
import {Card} from "./Card.ts";

class Field {
    @observable
    cx: number;

    @observable
    cy: number;

    @observable
    value: FieldStatus;

    @observable
    isRevealed: boolean;

    @observable
    isFlagged: boolean;

    @observable
    card: Card | null;

    @observable
    coins: number | null;

    constructor(cx:number, cy:number, value:FieldStatus, isRevealed:boolean, isFlagged:boolean) {
        this.cx = cx;
        this.cy = cy;
        this.value = value;
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        this.card = null;
        this.coins = null;
        makeAutoObservable(this);
    }
}

export { Field }