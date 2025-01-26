import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

const styles = StyleSheet.create({
});

const ExtraLifeBonus = observer(() => {
    return (
        <TouchableOpacity>
            <Text>ExtraLifeBonus</Text>
        </TouchableOpacity>
    );
})


export default ExtraLifeBonus;
