import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

const styles = StyleSheet.create({
});

const ShowInfosBonus = observer(() => {
    return (
        <TouchableOpacity>
            <Text>ShowInfosBonus</Text>
        </TouchableOpacity>
    );
})


export default ShowInfosBonus;
