/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {observer} from "mobx-react-lite";

import {gameStore} from "../store/gameStore.ts";
import CardView from "./CardView.tsx";
import {uiStore} from "../store/uiStore.ts";

const styles = StyleSheet.create({
    container: {
        paddingLeft: 4,
        paddingRight: 4,
    },
    card: {
        width: 150
    }
});

const CardDeckView = observer(() => {
    return (
      <View style={styles.container}>
          <FlatList
              data={gameStore.getCards}
              renderItem={({ item }) => <View style={styles.card}><CardView card={item} onPress={() => gameStore.useCard(item)} onLongPress={() => uiStore.openCardViewModal(item)} /></View>}
              keyExtractor={(item, index) => `${item}_${index}`}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
          />
      </View>
  );
})


export default CardDeckView;
