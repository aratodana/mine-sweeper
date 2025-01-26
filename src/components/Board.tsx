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


function EmptyBoard (): React.JSX.Element {
    return <View><Text>Empty</Text></View>
}

const styles = StyleSheet.create({
    board: {
        flexDirection: 'column',
        gap: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 4,
    },
    field: {
        backgroundColor: 'blue',
    }
});

const Board = observer(() => {

   if (!boardStore.board) {
       return EmptyBoard();
   }

  return (
      <View style={styles.board}>
          { boardStore.board.map((row, keyX) => (
              <View key={`row_${keyX}`} style={styles.row}>
                  { row.map((field, keyY) => (
                      <View key={`field_${keyX}-${keyY}`} style={styles.field}>
                          <Text>{field}</Text>
                      </View>
                  )) }
              </View>
          )) }
      </View>
  );
})


export default Board;
