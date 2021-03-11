import React from 'react'
import { View, StyleSheet, Dimensions, } from 'react-native'

export default function ProgressBar({ percentage, height=3, color='white', style, }) {
    const width = Dimensions.get('window').width / 100 * percentage

    return (
        <View style={[
            {
                height,
                width,
                backgroundColor: color,
            },
            style
        ]} />
    )
}

const styles = StyleSheet.create({})
