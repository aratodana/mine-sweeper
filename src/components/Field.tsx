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

const styles = StyleSheet.create({
    field: {
        width: 32,
        height: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    revealed: {
        backgroundColor: 'yellow'
    },
    unRevealed: {
        backgroundColor: 'red'
    }
});

interface FieldProps {
    value: FieldStatus;
    isRevealed: boolean;
    onReveal: () => void;
}

const Field = function({value, isRevealed, onReveal}: FieldProps) {
  if (isRevealed) {
      return (
          <View style={[styles.field, styles.revealed]}>
            <Text>{value}</Text>
          </View>
      )
  }

  return (
      <TouchableOpacity style={[styles.field, styles.unRevealed]} onPress={onReveal}>
          <Text>U</Text>
      </TouchableOpacity>
  );
};


export default Field;
