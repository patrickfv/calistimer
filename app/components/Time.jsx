import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'

export default function Time({ time, }) {
    const minutes = parseFloat(time / 60)
    const seconds = time % 60

    return (
        <View style={styles.container}>
            <Text>{ minutes }:{ seconds }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})