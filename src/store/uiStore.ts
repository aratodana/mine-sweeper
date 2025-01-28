import {action, computed, makeAutoObservable, observable} from "mobx";
import {FieldStatus, getFieldByNumberOfMinesAround} from "../utils/enum/FieldStatus.ts";
import randomInteger from "../utils/functions/randomInteger.ts";
import {GameStatus} from "../utils/enum/GameStatus.ts";
import { Field } from "../utils/types/Field.ts";
import {Card, getRandomCard} from "../utils/types/Card.ts";
import cardViewModal from "../components/modals/CardViewModal.tsx";



class UiStore {
    @observable
    cardViewModal: Card | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    openCardViewModal =  (card:Card)  => {
        this.cardViewModal = card;
    }
    @action
    closeCardViewModal =  () => {
        this.cardViewModal = null;
    }

}

export const uiStore = new UiStore();