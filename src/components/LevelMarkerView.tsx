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

const styles = StyleSheet.create({
    container: {

    }
});


const Field = observer(() => {
    const { t } = useTranslation();

  return (
      <View style={styles.container}>
          <Text>
              {t("header.level")}: { gameStore.currentLevel + 1 }
          </Text>
      </View>
  );
});


export default Field;
