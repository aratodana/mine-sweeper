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
import {uiStore} from "../../store/uiStore.ts";
import BonusCardView from "../BonusCardView.tsx";

const styles = StyleSheet.create({
    fullAreaView: {
        backgroundColor: '#b3b3b3',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#e6e6e6',
        padding: 10,
    },
});

const DefeatModal = observer(() => {

  return (
      <Modal visible={!!uiStore.cardViewModal} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={uiStore.closeCardViewModal}>
              <View style={styles.fullAreaView}>
                  <SafeAreaView >
                      <View style={styles.content} >
                          { uiStore.cardViewModal && <BonusCardView card={uiStore.cardViewModal} onPress={uiStore.closeCardViewModal} /> }
                      </View>
                  </SafeAreaView>
              </View>
          </TouchableWithoutFeedback>
      </Modal>
  );
})


export default DefeatModal;
