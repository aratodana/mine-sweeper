/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { gameStore } from "../store/gameStore.ts";

const styles = StyleSheet.create({
});

const WinModal = observer(() => {

    if (!gameStore.isWin) {
        return <View />;
    }

  return (
      <View>
          <Text>
              WIN
          </Text>
          <TouchableOpacity>
              <Text onPress={gameStore.startNextLevel}>
                  Next level
              </Text>
          </TouchableOpacity>
      </View>
  );
})


export default WinModal;
