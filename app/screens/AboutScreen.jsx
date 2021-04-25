import React from 'react'
import { 
    View, 
    Text,
    TouchableOpacity, 
    Linking, StyleSheet, 
    Dimensions, 
    ScrollView,
    Image, } from 'react-native'
import { useNavigation, } from '@react-navigation/native'

import { colors, fonts, } from '../styles'

export const ABOUT_SCREEN_NAME = 'ABOUT_SCREEN'

const { width, height, } = Dimensions.get('window')

export default function AboutScreen() {
    const navigation = useNavigation()
    const backClick = () => navigation.goBack()
    const openUrl = url => () => Linking.openURL(url)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ minHeight: height, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.header}>
                    <Text style={styles.title}>CalisTimer</Text>
                </View>
                <View style={{ padding: 10, }}>
                    <Text style={styles.text}>
                        Este aplicativo foi construido durante as aulas do curso de ReactJS/React-Native do DevPleno, o devReactJS nos módulos de react-native.
                    </Text>
                </View>
                <View style={{ justifyContent: 'space-around', alignItems: 'center', }}>
                    <TouchableOpacity onPress={openUrl('https://devpleno.com')}>
                        <Image style={{
                            width: 150,
                            height: 150,
                            resizeMode: 'contain'
                         }} source={require('../assets/logoDevPleno.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openUrl('https://devpleno.com/devreactjs')}>
                        <Image style={{
                            width: 150,
                            height: 150,
                            resizeMode: 'contain' 
                        }} source={require('../assets/logoDevReactJS.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={backClick}>
                        <Text style={styles.back}>VOLTAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
    },
    text: {
        fontSize: width / 20,
        color: colors.TEXT_LIGHT,
        fontFamily: fonts.TITLE,
        textAlign: 'center',
    },
    title: {
        fontSize: width / 6,
        color: colors.TEXT_LIGHT,
        fontFamily: fonts.TITLE,
    },
    header: {
        flex: 1.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        width,
    },
    back: { 
        fontFamily: fonts.TEXT_DEFAULT, 
        fontSize: 20, 
        color: colors.TEXT_LIGHT,
        fontWeight: 'bold',
    },
})