/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { boardStore } from "./store/boardStore.ts";
import {gameStore} from "./store/gameStore.ts";
import Board from "./components/Board.tsx";
import WinModal from "./components/WinModal.tsx";
import DefeatModal from "./components/DefeatModal.tsx";
import LevelMarker from "./components/LevelMarker.tsx";
import BonusList from "./components/BonusList.tsx";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    gameStore.startGameByLevel();
  });

  return (
      <View>
        <Board />
        <WinModal />
        <DefeatModal />
        <LevelMarker />
        <BonusList />
      </View>
  );
}

export default App;
