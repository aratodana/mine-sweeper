/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    ImageBackground,
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


const DefeatModal = observer(() => {
    const { t } = useTranslation();

    return (
        <Modal visible={gameStore.isDefeat} transparent={true} animationType="slide">
            <ImageBackground style={styles.fullAreaView} source={require('../../../assets/background/defeat.png')}>
                <TouchableWithoutFeedback onPress={gameStore.restartGame}>
                    <SafeAreaView style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.mainTitle}>
                                {t("modal.defeat.title") }
                            </Text>
                            <Text style={styles.mainText}>
                                {t("modal.defeat.level") } { gameStore.currentLevel + 2 }
                            </Text>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </Modal>
    );
})


export default DefeatModal;
