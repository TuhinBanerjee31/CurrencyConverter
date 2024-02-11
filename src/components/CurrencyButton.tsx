/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import type {PropsWithChildren} from 'react';
import React from 'react';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  value: number;
  flag: string;
  symbol: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}>{props.flag}</Text>
            <Text style={styles.name}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer : {

        alignContent: 'center',
        backgroundColor: '#1B9CFC',
        flexDirection: 'row',
        width: '95%',
        marginVertical: 6,
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 7,
        zIndex: 5,
    },
    flag : {
        fontSize: 20,
        marginRight: 3,
    },
    name : {
        fontSize: 20,
    },
});

export default CurrencyButton;
