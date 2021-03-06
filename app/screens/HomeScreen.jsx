import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors, fonts } from '../styles'
import { TextButton } from '../components'
import { EMOM_SCREEN_NAME } from './EMONScreen'
import { ISOMETRIA_SCREEN_NAME } from  './Isometria'
import { ABOUT_SCREEN_NAME } from './AboutScreen'
import { AMRAP_SCREEN_NAME } from './AMRAPScreen'

export const HOME_SCREEN_NAME = 'HOME_SCREEN'
const { width } = Dimensions.get('window')

export default function HomeScreen() {
    const navigation = useNavigation()
    const goAbout = () => navigation.navigate(ABOUT_SCREEN_NAME)
    const goEMON = () => navigation.navigate(EMOM_SCREEN_NAME)
    const goAMRAP = () => navigation.navigate(AMRAP_SCREEN_NAME)
    const goIsometria = () => navigation.navigate(ISOMETRIA_SCREEN_NAME)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>CalisTimer</Text>
            </View>
            <View style={styles.buttons}>
                <TextButton title="Sobre" style={styles.bt} onPress={goAbout}/>
                <TextButton title="EMOM" style={styles.bt} onPress={goEMON}/>
                <TextButton title="AMRAP" style={styles.bt} onPress={goAMRAP}/>
                <TextButton title="Isometria" style={styles.bt} onPress={goIsometria}/>
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
        color: colors.TEXT_LIGHT,
        fontFamily: fonts.TITLE,
    },
    buttons: {
        flex: .8,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bt: {
        fontSize: 24,
        color: colors.TEXT_LIGHT,
        margin: 10,
        fontFamily: fonts.TEXT_DEFAULT
    },
})
