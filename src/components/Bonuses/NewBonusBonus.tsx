import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";
import {bonusStore} from "../../store/bonusStore.ts";

const styles = StyleSheet.create({
});

const NewBonusBonus = observer(() => {
    return (
        <TouchableOpacity onPress={bonusStore.newBonus}>
            <Text>NewBonusBonus</Text>
        </TouchableOpacity>
    );
})


export default NewBonusBonus;
