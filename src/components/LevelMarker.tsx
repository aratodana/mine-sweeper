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
    container: {
        backgroundColor: '#a7a7a7',
        borderRadius: 4,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4
    }
});


const Field = observer(() => {
  return (
      <View style={styles.container}>
          <Text>
              Level: { gameStore.currentLevel }
          </Text>
      </View>
  );
});


export default Field;
