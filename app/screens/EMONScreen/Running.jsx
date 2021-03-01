import React from 'react'
import { View, StyleSheet, } from 'react-native'

import { ProgressBackground, Time } from '../../components'

export default function Running() {
    return (
        <View style={styles.container}>
            <ProgressBackground percentage={60}>
                <Time time={2400}/>
            </ProgressBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})