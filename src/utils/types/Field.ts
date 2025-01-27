import {FieldStatus} from "../enum/FieldStatus.ts";
import {makeAutoObservable, observable} from "mobx";
import {BonusCard} from "./Bonus.ts";

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
    bonus: BonusCard | null;

    @observable
    coins: number | null;

    constructor(cx:number, cy:number, value:FieldStatus, isRevealed:boolean, isFlagged:boolean) {
        this.cx = cx;
        this.cy = cy;
        this.value = value;
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        this.bonus = null;
        this.coins = null;
        makeAutoObservable(this);
    }
}

export { Field }