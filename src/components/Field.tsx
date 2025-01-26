/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { boardStore } from "../store/boardStore.ts";
import {FieldStatus} from "../utils/types/FieldStatus.ts";

const styles = StyleSheet.create({
    field: {
        backgroundColor: 'red'
    }
});

interface FieldProps {
    value: FieldStatus;
}

const Field = function({value}: FieldProps) {

  return (
      <View style={styles.field}>
          <Text>{value}</Text>
      </View>
  );
};


export default Field;
