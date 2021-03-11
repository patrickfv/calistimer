import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'

function format(time) {
    var minutes = parseInt(time / 60)
    var seconds = time % 60 // time - minutes * 60
    const strPadLeft = (str, pad, length) => (new Array(length+1).join(pad)+str).slice(-length)

    minutes = strPadLeft(minutes, '0', 2)
    seconds = strPadLeft(seconds, '0', 2)

    return {
        minutes,
        seconds,
    }
}

export default function Time({ time, color='white', size=12, }) {
    const { minutes, seconds, } = format(time)

    return (
        <View style={styles.container}>
            <Text style={{
                color,
                fontSize: size,
            }}>{ minutes }:{ seconds }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})