/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Bonus, BonusCardData} from "../utils/types/Bonus.ts";
import {bonusStore} from "../store/bonusStore.ts";
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
const BonusCard = ({ bonus }: { bonus: BonusCardData }): JSX.Element => {
    const { t } = useTranslation();

    const bonusConfig = [
        {
            bonus: new BonusCardData(Bonus.NEW_BONUS, 1),
            callback: bonusStore.newBonus,
            title: t("bonus.new_bonus.type_1.title"),
            description: t("bonus.new_bonus.type_1.description"),
            price: 2
        },
        {
            bonus: new BonusCardData(Bonus.NEW_BONUS, 2),
            callback: bonusStore.newBonus,
            title: t("bonus.new_bonus.type_2.title"),
            description: t("bonus.new_bonus.type_2.description"),
            price: 2
        },
        {
            bonus: new BonusCardData(Bonus.NEW_BONUS, 3),
            callback: (source:BonusCardData) => bonusStore.newBonus(source, 2),
            title: t("bonus.new_bonus.type_3.title"),
            description: t("bonus.new_bonus.type_3.description"),
            price: 5
        },
        {
            bonus: new BonusCardData(Bonus.FLAG_RANDOM_MINE, 1),
            callback: bonusStore.flagRandomMine,
            title: t("bonus.flag_random_mine.type_1.title"),
            description: t("bonus.flag_random_mine.type_1.description"),
            price: 2
        },
        {
            bonus: new BonusCardData(Bonus.FLAG_RANDOM_MINE, 2),
            callback: bonusStore.flagRandomMine,
            title: t("bonus.flag_random_mine.type_2.title"),
            description: t("bonus.flag_random_mine.type_2.description"),
            price: 2
        },
        {
            bonus: new BonusCardData(Bonus.FLAG_RANDOM_MINE, 3),
            callback: (source:BonusCardData) => bonusStore.flagRandomMine(source, 2),
            title: t("bonus.flag_random_mine.type_3.title"),
            description: t("bonus.flag_random_mine.type_3.description"),
            price: 5
        },
        {
            bonus: new BonusCardData(Bonus.REVEAL_RANDOM_FIELD, 1),
            callback: bonusStore.revealRandomField,
            title: t("bonus.reveal_random_field.type_1.title"),
            description: t("bonus.reveal_random_field.type_1.description"),
            price: 2
        },
        {
            bonus: new BonusCardData(Bonus.REVEAL_RANDOM_FIELD, 2),
            callback: bonusStore.revealRandomField,
            title: t("bonus.reveal_random_field.type_2.title"),
            description: t("bonus.reveal_random_field.type_2.description"),
            price: 2
        },
        {
            bonus: new BonusCardData(Bonus.REVEAL_RANDOM_FIELD, 3),
            callback: (source:BonusCardData) => bonusStore.revealRandomField(source, 2),
            title: t("bonus.reveal_random_field.type_3.title"),
            description: t("bonus.reveal_random_field.type_3.description"),
            price: 5
        }
    ]

    const current = bonusConfig.find(config => config.bonus.equals(bonus));
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
                    { current.title }
                </Text>
                <Text style={styles.bonusDescription}>
                    { current.description } ({ current.price })
                </Text>
            </TouchableOpacity>
}


export default BonusCard;
