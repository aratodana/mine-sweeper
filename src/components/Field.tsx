/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {observer} from "mobx-react-lite";
import {FieldStatus} from "../utils/types/FieldStatus.ts";
import {FieldData} from "../utils/types/FieldData.ts";
import {gameStore} from "../store/gameStore.ts";

const styles = StyleSheet.create({
    field: {
        aspectRatio: 1,
        flex: 1,
        flexBasis: 'auto',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d1d1d1',
        borderRadius: 4,
    },
    revealed: {
        // backgroundColor: 'yellow'
    },
    unRevealed: {
        backgroundColor: '#616161',
    },
    flagged: {
        backgroundColor: '#616161',
    },
    bonus: {
        // backgroundColor: 'green'
    }
});

interface FieldProps {
    fieldData: FieldData;
    onReveal: () => void;
    onFlag: () => void;
}

const Field = observer(({fieldData, onReveal, onFlag}: FieldProps) => {

    if (fieldData.isRevealed && fieldData.bonus) {
        return (
            <TouchableOpacity style={[styles.field, styles.bonus]} onPress={() => gameStore.collectBonus(fieldData.cx, fieldData.cy, fieldData.bonus)}>
                <Text>🎁</Text>
            </TouchableOpacity>
        )
    }

    if (fieldData.isRevealed) {
        return (
            <View style={[styles.field, styles.revealed]}>

                <Text>{fieldData.value === FieldStatus.MINE ? '💣' : (fieldData.value === 0 ? '' : fieldData.value)}</Text>
            </View>
        )
    }

    if (fieldData.isFlagged) {
        return (
            <TouchableOpacity style={[styles.field, styles.flagged]} onLongPress={onFlag}>
                <Text>🚩</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={[styles.field, styles.unRevealed]} onPress={onReveal} onLongPress={onFlag}>
        </TouchableOpacity>
    );
})


export default Field;
