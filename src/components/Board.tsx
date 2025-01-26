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
import Field from "./Field.tsx";


function EmptyBoard (): React.JSX.Element {
    return <View><Text>Empty</Text></View>
}

const styles = StyleSheet.create({
    board: {
        flexDirection: 'column',
        gap: 4,
        backgroundColor: '#a7a7a7',
        padding: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 4,
    }
});

const Board = observer(() => {

   if (!boardStore.board) {
       return EmptyBoard();
   }

  return (
      <View>
          <View style={styles.board}>
              { boardStore.board.map((row, keyX) => (
                  <View key={`row_${keyX}`} style={styles.row}>
                      { row.map((field, keyY) => (
                          <Field key={`field_${keyX}-${keyY}`} fieldData={field} onReveal={() => boardStore.reveal(keyX, keyY)}  onFlag={() => boardStore.setFlag(keyX, keyY)} />
                      )) }
                  </View>
              )) }
          </View>
      </View>
  );
})


export default Board;
