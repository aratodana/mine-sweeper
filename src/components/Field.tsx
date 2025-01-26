/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

import { boardStore } from "../store/boardStore.ts";
import {FieldStatus} from "../utils/types/FieldStatus.ts";
import {FieldData} from "../utils/types/FieldData.ts";

const styles = StyleSheet.create({
    field: {
        width: 32,
        height: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    revealed: {
        backgroundColor: 'yellow'
    },
    unRevealed: {
        backgroundColor: 'red'
    },
    flagged: {
        backgroundColor: 'green'
    }
});

interface FieldProps {
    fieldData: FieldData;
    onReveal: () => void;
    onFlag: () => void;
}

const Field = observer(({fieldData, onReveal, onFlag}: FieldProps) => {
    if (fieldData.isRevealed) {
        return (
            <View style={[styles.field, styles.revealed]}>
                <Text>{fieldData.value}</Text>
            </View>
        )
    }

    if (fieldData.isFlagged) {
        return (
            <TouchableOpacity style={[styles.field, styles.flagged]} onLongPress={onFlag}>
                <Text>F</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={[styles.field, styles.unRevealed]} onPress={onReveal} onLongPress={onFlag}>
            <Text>U</Text>
        </TouchableOpacity>
    );
})


export default Field;
