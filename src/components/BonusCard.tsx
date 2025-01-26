/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Bonus} from "../utils/types/Bonus.ts";
import {bonusStore} from "../store/bonusStore.ts";

const styles = StyleSheet.create({
    card: {
        width: 150,
        aspectRatio: 0.75,
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#a7a7a7',
    },
    bonusComponent: {

    }
});
const BonusCard = ({ bonus }: { bonus: Bonus }) => {

    const bonusConfig = [
        {
            bonus: Bonus.NEW_BONUS,
            callback: bonusStore.newBonus,
            title: 'New Bonus',
            description: 'Grand you a new random bonus'
        },
        {
            bonus: Bonus.FLAG_RANDOM_MINE,
            callback: bonusStore.flagRandomMine,
            title: 'Flag random mine',
            description: 'Flags a random mine'
        },
        {
            bonus: Bonus.REVEAL_RANDOM_FIELD,
            callback: bonusStore.revealRandomField,
            title: 'Reveal a random field',
            description: 'Reveal a random field if it is not a mine'
        }
    ]

    const current = bonusConfig.find(config => config.bonus === bonus);
    if (!current) {
        return;
    }

    return  <TouchableOpacity style={styles.card} onPress={current.callback}>
                <Text>
                    { current.title }
                </Text>
                <Text>
                    { current.description }
                </Text>
            </TouchableOpacity>
}


export default BonusCard;
