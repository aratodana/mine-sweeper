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
import {FieldStatus} from "../utils/types/FieldStatus.ts";
import {gameStore} from "../store/gameStore.ts";

const styles = StyleSheet.create({
});


const Field = observer(() => {
  return (
      <View>
          <Text>
              Level: { gameStore.currentLevel }
          </Text>
      </View>
  );
});


export default Field;
