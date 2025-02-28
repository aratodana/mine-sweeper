/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { boardStore } from "../store/boardStore.ts";
import {FieldStatus} from "../utils/enum/FieldStatus.ts";
import {gameStore} from "../store/gameStore.ts";
import {useTranslation} from "react-i18next";
import '../i18n.ts'
import {Field} from "../utils/types/Field.ts";

const imageList = {
    mana: require('../../assets/icons/mana.png'),
    flag: require('../../assets/icons/flag.png'),
    loot: require('../../assets/icons/loot.png'),
    life: require('../../assets/icons/life.png'),
    lostLife: require('../../assets/icons/lost-life.png'),
    reveal: require('../../assets/icons/reveal.png'),
}


const styles = StyleSheet.create({
    icon: {
        aspectRatio: 1
    }
});

interface IconViewProps {
    name: string;
    size: number;
}


const CoinMarkerView = observer(({name, size=30}: IconViewProps) => {

    // @ts-ignore
    const image = imageList[name];
    if (!image) {
        console.warn(`Not valid icon name ${name}`)
        return null;
    }
  return (
      <Image style={[styles.icon, {width:size, height:size}]} source={image}/>
  );
});


export default CoinMarkerView;
