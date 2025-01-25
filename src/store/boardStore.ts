import { makeAutoObservable } from "mobx";

class BoardStore {

    constructor() {
        makeAutoObservable(this);
    }
}

export const boardStore = new BoardStore();