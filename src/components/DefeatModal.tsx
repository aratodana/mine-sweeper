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

const DefeatModal = observer(() => {

    if (!gameStore.isDefeat) {
        return <View />;
    }

  return (
      <View>
          <Text>
              DEFEAT
          </Text>
          <TouchableOpacity>
              <Text onPress={gameStore.restartGame}>
                  Restart
              </Text>
          </TouchableOpacity>
      </View>
  );
})


export default DefeatModal;
