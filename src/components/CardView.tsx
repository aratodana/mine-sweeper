/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Card} from "../utils/types/Card.ts";
import {useTranslation} from "react-i18next";
import {gameStore} from "../store/gameStore.ts";

const styles = StyleSheet.create({
    card: {
        width: '100%',
        aspectRatio: 0.75,
        borderRadius: 4,
        backgroundColor: '#a7a7a7',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 18,
        padding: 4,
    },
    cardDescription: {
        bottom: 0,
        backgroundColor: '#d5d5d5',
        padding: 4,
        flexBasis: "30%"
    }
});

interface Props {
    card: Card,
    onPress?: (() => void),
    onLongPress?: (() => void)
}


const CardView = ({ card, onPress = () => {}, onLongPress = () => {} }: Props): JSX.Element => {
    const { t } = useTranslation();

    return  <TouchableOpacity style={styles.card} onPress={onPress} onLongPress={onLongPress}>
                <Text style={styles.cardTitle}>
                    { t(card.title) }
                </Text>
                <Text style={styles.cardDescription}>
                    { t(card.description) } ({ card.price })
                </Text>
            </TouchableOpacity>
}


export default CardView;
