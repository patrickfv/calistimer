import React from 'react'
import { StyleSheet, 
    View, 
    Text,
    TextInput,
    Dimensions, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { colors, fonts, } from '../styles'
import { RadioGroup, PlayButton } from '../components'

export const EMOM_SCREEN_NAME = 'EMON_SCREEN'

const { width } = Dimensions.get('window')

export default function EMONScreen() {
    const optionsAlert = ['DESLIGADO', '15s', '30s', '45s']
    const optionsCountdown = ['SIM', 'NÃO']
    const onChangeAlert = selected => {}
    const onChangeCountdown = selected => {}
 
    return (
        <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>EMOM</Text>
                    <Text style={styles.text}>Every Minute On the Minute</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.panel}>
                        <Text style={[styles.text, { fontSize: 18 }]}>ALERTAS</Text>
                        <RadioGroup items={optionsAlert} onChange={onChangeAlert} />
                    </View>
                    <View style={styles.panel}>
                        <Text style={styles.text}>CONTAGEM REGRESSIVA</Text>
                        <RadioGroup items={optionsCountdown} onChange={onChangeCountdown} />
                    </View>
                    <View style={[
                            styles.panel,
                            { flex: 1 },
                        ]}>
                        <Text style={styles.text}>QUANTOS MINUTOS</Text>
                        <TextInput style={styles.count} value="15" keyboardType="number-pad" />
                        <Text style={styles.text}>MINUTOS</Text>
                    </View>
                    <View style={styles.panel}>
                        <View>
                            <PlayButton size={100} />
                        </View>
                    </View>
                </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
    },
    header: {
        flex: 1.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        width,
    },
    content: {
        flex: 3,
        alignItems: 'center',
    },
    title: {
        fontSize: width / 6,
        color: colors.TEXT_LIGHT,
        fontFamily: fonts.TITLE,
    },
    panel: {
        flex: 1,
        maxWidth: width - width / 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        color: colors.TEXT_LIGHT,
        fontFamily: fonts.TEXT_DEFAULT,
        fontSize: 16,
    },
    count: {
        color: colors.TEXT_DARK,
        fontFamily: fonts.COUNT_FONT,
        fontSize: 50,
    }
})