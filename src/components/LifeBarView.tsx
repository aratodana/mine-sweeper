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
    },
    text: {
        color: 'white'
    }
});


const Field = observer(() => {
    const { t } = useTranslation();

  return (
      <View style={styles.container}>
          {Array.from({length: 5}).map((_, i) => (
              <IconView key={i} name={i+1 <= gameStore.life ? 'life' : 'lostLife'} size={40} />
          ))}
      </View>
  );
});


export default Field;
