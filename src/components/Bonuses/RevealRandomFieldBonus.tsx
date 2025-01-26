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

const RevealRandomFieldBonus = observer(() => {
    return (
        <TouchableOpacity onPress={bonusStore.revealRandomField}>
            <Text>RevealRandomFieldBonus</Text>
        </TouchableOpacity>
    );
})


export default RevealRandomFieldBonus;
