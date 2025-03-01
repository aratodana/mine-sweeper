import AsyncStorage from '@react-native-async-storage/async-storage';
import {action} from "mobx";
import {boardStore} from "./boardStore";
import {gameStore} from "./gameStore";

class StorageStore {
    @action
    save = async () => {
        try {
            const boardState = boardStore.exportState;
            const gameState = gameStore.exportState;
            const boardStateString = JSON.stringify(boardState);
            const gameStateString = JSON.stringify(gameState);
            return await Promise.all([
                AsyncStorage.setItem('@board_state', boardStateString),
                AsyncStorage.setItem('@game_state', gameStateString)
            ]);
        } catch (e) {
            console.error(e);
        }
    }

    @action load = async ()=> {
        try {
            const [boardStateString, gameStateString] = await Promise.all([
                AsyncStorage.getItem('@board_state'),
                AsyncStorage.getItem('@game_state')
            ]);

            if (boardStateString !== null && gameStateString !== null) {
                const boardState = JSON.parse(boardStateString);
                const gameState = JSON.parse(gameStateString);
                if (boardState.board) {
                    boardStore.importState(boardState);
                    gameStore.importState(gameState);
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export const storageStore = new StorageStore();