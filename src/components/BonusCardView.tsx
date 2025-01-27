/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {BonusCardData} from "../utils/types/Bonus.ts";
import {useTranslation} from "react-i18next";
import {gameStore} from "../store/gameStore.ts";

const styles = StyleSheet.create({
    card: {
        width: 150,
        aspectRatio: 0.75,
        borderRadius: 4,
        backgroundColor: '#a7a7a7',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    bonusTitle: {
        fontSize: 18,
        padding: 4,
    },
    bonusDescription: {
        bottom: 0,
        backgroundColor: '#d5d5d5',
        padding: 4,
        flexBasis: "30%"
    }
});
const BonusCardView = ({ card }: { card: BonusCardData }): JSX.Element => {
    const { t } = useTranslation();

    return  <TouchableOpacity style={styles.card} onPress={() => gameStore.handleCardPress(card)}>
                <Text style={styles.bonusTitle}>
                    { t(card.title) }
                </Text>
                <Text style={styles.bonusDescription}>
                    { t(card.description) } ({ card.price })
                </Text>
            </TouchableOpacity>
}


export default BonusCardView;
