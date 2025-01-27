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
import bonusCards from '../config/bonusCards.ts'

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
const BonusCard = ({ bonus }: { bonus: BonusCardData }): JSX.Element => {
    const { t } = useTranslation();



    const current = bonusCards.find(config => config.bonus.equals(bonus));
    if (!current) {
        return <View></View>;
    }

    const handleCardPress = () => {
        if (gameStore.coins < current.price) {
            console.warn('Not enough coins for this card');
            return;
        }
        gameStore.spendCoins(current.price);
        current.callback(bonus);
    }

    return  <TouchableOpacity style={styles.card} onPress={handleCardPress}>
                <Text style={styles.bonusTitle}>
                    { t(current.title) }
                </Text>
                <Text style={styles.bonusDescription}>
                    { t(current.description) } ({ current.price })
                </Text>
            </TouchableOpacity>
}


export default BonusCard;
