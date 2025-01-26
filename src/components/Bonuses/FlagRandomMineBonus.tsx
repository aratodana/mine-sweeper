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

const FlagRandomMineBonus = observer(() => {
    return (
        <TouchableOpacity onPress={bonusStore.flagRandomMine}>
            <Text>FlagRandomMineBonus</Text>
        </TouchableOpacity>
    );
})


export default FlagRandomMineBonus;
