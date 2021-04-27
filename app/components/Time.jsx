import React, { Fragment, } from 'react'
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

export default function Time({ time, color='white', size=12, aling='center', justSeconds=false, containerStyle={}, }) {
    const { minutes, seconds, } = format(time)

    const display = justSeconds ? <Fragment>{ seconds }</Fragment> : <Fragment>{ minutes }:{ seconds }</Fragment> 

    return (
        <View style={containerStyle}>
            <Text style={{
                color,
                fontSize: size,
                textAlign: aling
            }}>
                { display }
            </Text>
        </View>
    )
}
