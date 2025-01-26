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
import BonusCard from "./BonusCard.tsx";

const styles = StyleSheet.create({
});

const BonusList = observer(() => {
    return (
      <View>
          <Text>BonusList</Text>
          <FlatList
              data={gameStore.getBonuses}
              renderItem={({ item }) => <BonusCard bonus={item} />}
              keyExtractor={(item, index) => `${item}_${index}`}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
          />
      </View>
  );
})


export default BonusList;
