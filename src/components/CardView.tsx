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
import IconView from "./IconView.tsx";

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
    },
    cardDescriptionText: {
        textAlign: 'center',
        fontSize: 12
    },
    priceWrapper: {
        backgroundColor: '#171717',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        top: 60,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 7,
    },
    priceWrapperText: {
        color: 'white',
        fontSize: 10,
        verticalAlign: 'middle',
        textAlign: 'center',
    },
    actionWrapper: {
        backgroundColor: '#171717',
        position: 'absolute',
        right: 0,
        top: 60,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 7,
    },
    actionWrapperItem: {
        flexDirection: 'row',
    },
});

interface Props {
    card: Card,
    onPress?: (() => void),
    onLongPress?: (() => void)
}

const actionItemMap = {
    addLife: 'life',
    reveal: 'reveal',
    flag: 'flag',
    addCoin: 'mana'
}


const CardView = ({ card, onPress = () => {}, onLongPress = () => {} }: Props): JSX.Element => {
    const { t } = useTranslation();
    const dominantColor = colorConfig.find(item => item.level === card.level)?.color || 'white';

    const actions = card.actions.map((item, i) => {
        const safeKey = item.key as keyof typeof actionItemMap;
        return {
            icon: actionItemMap[safeKey],
            text: item.value
        }
    })

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
            <View style={[styles.priceWrapper]}>
                <IconView name={'mana'} size={17} />
                <Text style={[styles.priceWrapperText]}>
                    {card.price}
                </Text>
            </View>
            <View style={[styles.actionWrapper]}>
                {actions.map(action =>
                    <View style={[styles.actionWrapperItem]}>
                        <IconView name={action.icon} size={17} />
                        <Text style={[styles.priceWrapperText]}>
                            {action.text}
                        </Text>
                    </View>)}
            </View>
            <View style={[styles.cardDescription]}>
                <Text style={[styles.cardDescriptionText, {color: dominantColor}]} numberOfLines={3} ellipsizeMode="tail">
                    { t(card.description) }
                </Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
}


export default CardView;
