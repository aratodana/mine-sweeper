/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    SafeAreaView, TouchableWithoutFeedback,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { gameStore } from "../store/gameStore.ts";

const styles = StyleSheet.create({
    fullAreaView: {
        backgroundColor: '#b3b3b3',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    mainTitle: {
        fontSize: 20,
    },
    button: {
        backgroundColor: 'blue',
        fontSize: 16,
    }
});

const WinModal = observer(() => {

  return (
      <Modal visible={gameStore.isWin} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={gameStore.startNextLevel}>
              <View style={styles.fullAreaView}>
                  <SafeAreaView style={styles.content}>
                      <Text style={styles.mainTitle}>
                          YOU WON
                      </Text>
                      <Text>
                          Next level {gameStore.currentLevel}
                      </Text>
                  </SafeAreaView>
              </View>
          </TouchableWithoutFeedback>
      </Modal>
  );
})


export default WinModal;
