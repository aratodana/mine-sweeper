import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { observer } from "mobx-react-lite";

const styles = StyleSheet.create({
});

const ShowProblemsBonus = observer(() => {
    return (
        <TouchableOpacity>
            <Text>ShowProblemsBonus</Text>
        </TouchableOpacity>
    );
})


export default ShowProblemsBonus;
