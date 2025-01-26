import {FieldStatus} from "./FieldStatus.ts";
import {makeAutoObservable, observable} from "mobx";

class FieldData {
    @observable
    value: FieldStatus;

    @observable
    isRevealed: boolean;

    @observable
    isFlagged: boolean;

    constructor(value: FieldStatus, isRevealed: boolean, isFlagged: boolean) {
        this.value = value;
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        makeAutoObservable(this);
    }
}

export { FieldData }