import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'

import { colors, fonts } from '../styles'
import TextButton from '../components/TextButton'

export const EMOM_SCREEN_NAME = 'EMON_SCREEN'

const { width } = Dimensions.get('window')

export default function EMONScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>EMOM</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
    },
    header: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        width,
    },
    title: {
        fontSize: width / 6,
        color: colors.TEXT,
        fontFamily: fonts.TITLE,
    },
})