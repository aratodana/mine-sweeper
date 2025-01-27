/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    Modal, SafeAreaView,
    StyleSheet,
    Text, TouchableOpacity, TouchableWithoutFeedback,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { gameStore } from "../../store/gameStore.ts";
import {useTranslation} from "react-i18next";

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

const DefeatModal = observer(() => {
    const { t } = useTranslation();

  return (
      <Modal visible={gameStore.isDefeat} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={gameStore.restartGame}>
              <View style={styles.fullAreaView}>
                  <SafeAreaView style={styles.content}>
                      <Text style={styles.mainTitle}>
                          { t("modal.defeat.title") }
                      </Text>
                      <Text>
                          { t("modal.defeat.level")}  {gameStore.currentLevel}
                      </Text>
                  </SafeAreaView>
              </View>
          </TouchableWithoutFeedback>
      </Modal>
  );
})


export default DefeatModal;
