/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView, StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {gameStore} from "./store/gameStore.ts";
import Board from "./components/Board.tsx";
import WinModal from "./components/WinModal.tsx";
import DefeatModal from "./components/DefeatModal.tsx";
import LevelMarker from "./components/LevelMarker.tsx";
import BonusList from "./components/BonusList.tsx";

const styles = StyleSheet.create({
    appContainer: {
        justifyContent: 'space-between',
        gap: 8
    },
    header: {
        flexBasis: 50,
    },
    board: {
        flexBasis: 'auto'
    },
    bonusList: {
        flexBasis: 200,
    }
});

function App(): React.JSX.Element {

   useEffect(() => {
      gameStore.startGameByLevel();
   });

    return (
        <SafeAreaView style={styles.appContainer}>
            <WinModal />
            <DefeatModal />
            <View style={styles.header}>
                <LevelMarker />
            </View>
            <View style={styles.board}>
                <Board  />
            </View>
            <View style={styles.bonusList}>
                <BonusList />
            </View>
        </SafeAreaView>
    );
}

export default App;
