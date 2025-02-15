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
    SafeAreaView, TouchableWithoutFeedback, ImageBackground,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { gameStore } from "../../store/gameStore.ts";
import {useTranslation} from "react-i18next";

const styles = StyleSheet.create({
    fullAreaView: {
        backgroundColor: '#b3b3b3',
    },
    content: {
        top: 100,
        alignItems: 'center',
        height: '100%',
    },
    mainTitle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    mainText: {
        color: 'white',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'blue',
        fontSize: 16,
    },
    titleContainer: {
        backgroundColor: '#171717',
        padding: 20,
        borderRadius: 10,
    }
});


const WinModal = observer(() => {
    const { t } = useTranslation();

  return (
      <Modal visible={gameStore.isWin} transparent={true} animationType="slide">
          <ImageBackground style={styles.fullAreaView} source={require('../../../assets/background/succes.png')}>
                  <TouchableWithoutFeedback onPress={gameStore.isFullWin ? gameStore.restartGame : gameStore.startNextLevel}>
                  <SafeAreaView style={styles.content}>
                      <View style={styles.titleContainer}>
                          <Text style={styles.mainTitle}>
                              {gameStore.isFullWin ? t("modal.win.title") : t("modal.full_win.title") }
                          </Text>
                          <Text style={styles.mainText}>
                              { gameStore.isFullWin ? t("modal.full_win.level") :`${ t("modal.win.level") } ${ gameStore.currentLevel + 2 }`  }
                          </Text>
                      </View>
                  </SafeAreaView>
                  </TouchableWithoutFeedback>
          </ImageBackground>
      </Modal>
  );
})


export default WinModal;
