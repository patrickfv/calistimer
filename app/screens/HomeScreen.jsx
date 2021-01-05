import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors, fonts } from '../styles'
import { TextButton } from '../components'
import { EMOM_SCREEN_NAME } from './EMONScreen'

export const HOME_SCREEN_NAME = 'HOME_SCREEN'
const { width } = Dimensions.get('window')

export default function HomeScreen() {
    const navigation = useNavigation()
    const goEMON = () => navigation.navigate(EMOM_SCREEN_NAME)
    const goAMRAP = () => {}
    const goIsometria = () => {}

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>CalisTimer</Text>
            </View>
            <View style={styles.buttons}>
                <TextButton title="EMOM" style={styles.bt} action={goEMON}/>
                <TextButton title="AMRAP" style={styles.bt} action={goAMRAP}/>
                <TextButton title="Isometria" style={styles.bt} action={goIsometria}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
    },
    header:{
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
    buttons: {
        flex: .8,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bt: {
        fontSize: 24,
        color: colors.TEXT,
        margin: 10,
        fontFamily: fonts.TEXT_DEFAULT
    },
})
