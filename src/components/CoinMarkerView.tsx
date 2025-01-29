/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
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
import IconView from "./IconView.tsx";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerText: {
        color: '#5498ff',
        fontSize: 16,
    }
});


const CoinMarkerView = observer(() => {
    const { t } = useTranslation();

  return (
      <View style={styles.container}>
          <IconView name={'mana'} size={40} />
          <Text style={styles.containerText}>
              { gameStore.coins }
          </Text>
      </View>
  );
});


export default CoinMarkerView;
