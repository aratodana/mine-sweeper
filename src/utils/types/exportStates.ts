import {Card} from "./Card";
import {Field} from "./Field";

interface GameStoreExportState {
    currentLevel: number,
    cards:  Array<Card>,
    coins: number,
    life: number
}

interface BoardStoreExportState {
    board: Array< Array<Field> >
}

export type {
    GameStoreExportState,
    BoardStoreExportState
}