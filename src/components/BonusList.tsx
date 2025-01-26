/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import {observer} from "mobx-react-lite";

import {gameStore} from "../store/gameStore.ts";
import {Bonus} from "../utils/types/Bonus.ts";
import ShowProblemsBonus from "./Bonuses/ShowProblemsBonus.tsx";
import ShowInfosBonus from "./Bonuses/ShowInfosBonus.tsx";
import NewBonusBonus from "./Bonuses/NewBonusBonus.tsx";
import FlagRandomMineBonus from "./Bonuses/FlagRandomMineBonus.tsx";
import RevealRandomFieldBonus from "./Bonuses/RevealRandomFieldBonus.tsx";

const styles = StyleSheet.create({
});

const BonusList = observer(() => {
  return (
      <View>
          <Text>BonusList</Text>
          {
              gameStore.bonuses.map((bonus, key)=> {
                  switch (bonus) {
                      case Bonus.SHOW_PROBLEMS:
                          return <ShowProblemsBonus key={key} />;
                      case Bonus.SHOW_INFOS:
                          return <ShowInfosBonus key={key} />;
                      case Bonus.NEW_BONUS:
                          return <NewBonusBonus key={key} />;
                      case Bonus.FLAG_RANDOM_MINE:
                          return <FlagRandomMineBonus key={key} />;
                      case Bonus.REVEAL_RANDOM_FIELD:
                          return <RevealRandomFieldBonus key={key} />
                      default:
                          return null;
                  }
              })
          }
      </View>
  );
})


export default BonusList;
