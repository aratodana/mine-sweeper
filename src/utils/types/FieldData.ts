import {FieldStatus} from "./FieldStatus.ts";
import {makeAutoObservable, observable} from "mobx";
import {BonusCardData} from "./Bonus.ts";

class FieldData {
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
    bonus: BonusCardData | null;

    constructor(cx:number, cy:number, value:FieldStatus, isRevealed:boolean, isFlagged:boolean) {
        this.cx = cx;
        this.cy = cy;
        this.value = value;
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        this.bonus = null;
        makeAutoObservable(this);
    }
}

export { FieldData }