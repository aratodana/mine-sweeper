import {action, computed, makeAutoObservable, observable} from "mobx";
import {FieldStatus, getFieldByNumberOfMinesAround} from "../utils/enum/FieldStatus.ts";
import randomInteger from "../utils/functions/randomInteger.ts";
import {GameStatus} from "../utils/enum/GameStatus.ts";
import { Field } from "../utils/types/Field.ts";
import {BonusCard, getRandomBonus} from "../utils/types/Bonus.ts";
import cardViewModal from "../components/modals/CardViewModal.tsx";



class UiStore {
    @observable
    cardViewModal: BonusCard | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    openCardViewModal =  (card:BonusCard)  => {
        this.cardViewModal = card;
    }
    @action
    closeCardViewModal =  () => {
        this.cardViewModal = null;
    }

}

export const uiStore = new UiStore();