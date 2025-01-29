import ReactNativeHapticFeedback from "react-native-haptic-feedback";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Card} from "../utils/types/Card.ts";
import {useTranslation} from "react-i18next";
import {gameStore} from "../store/gameStore.ts";
import CardLevel from "../utils/enum/CardLevel.ts";

const colorConfig = [
    {
        level: CardLevel.COMMON,
        color: '#ca9060',
    },
    {
        level: CardLevel.RARE,
        color: '#0073ff',
    },
    {
        level: CardLevel.UNIQUE,
        color: '#13bd00',
    },
    {
        level: CardLevel.LEGENDARY,
        color: '#9500ff',
    },
    {
        level: CardLevel.MYTHIC,
        color: '#d40000',
    },
]

const styles = StyleSheet.create({
    card: {
        width: '100%',
        aspectRatio: 0.75,
        borderRadius: 10,
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: 4,
    },
    cardTitle: {
        fontSize: 16,
        padding: 4,
        backgroundColor: '#171717',
        textAlign: 'center',
    },
    cardDescription: {
        bottom: 0,
        backgroundColor: '#171717',
        padding: 4,
        flexBasis: "30%",
        width: '100%',
        justifyContent: 'center',
        alignItems:'center',
        textAlign: 'center',
        flexWrap: "wrap"

    }
});

interface Props {
    card: Card,
    onPress?: (() => void),
    onLongPress?: (() => void)
}


const CardView = ({ card, onPress = () => {}, onLongPress = () => {} }: Props): JSX.Element => {
    const { t } = useTranslation();
    const dominantColor = colorConfig.find(item => item.level === card.level)?.color || 'white';

    return  <TouchableOpacity  onPress={() => {
        if (card.price <= gameStore.coins) {
            ReactNativeHapticFeedback.trigger("impactLight");
        } else {
            ReactNativeHapticFeedback.trigger("notificationError");
        }
        onPress()
    }} onLongPress={onLongPress}>
        <ImageBackground style={[styles.card, {borderColor: dominantColor} ]} source={card.image}>
            <Text style={[styles.cardTitle, {color: dominantColor}]}>
                { t(card.title) }
            </Text>
            <Text style={[styles.cardDescription, {color: dominantColor}]} numberOfLines={2} ellipsizeMode="tail">
                { t(card.description) }
            </Text>
        </ImageBackground>
    </TouchableOpacity>
}


export default CardView;
