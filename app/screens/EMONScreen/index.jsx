import React, { useReducer, useState, } from 'react'
import { StyleSheet, 
    View, 
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView, } from 'react-native'

import { colors, fonts, } from '../../styles'
import { RadioGroup, PlayButton, } from '../../components'
import Running from './Running'

export const EMOM_SCREEN_NAME = 'EMON_SCREEN'
const { width, height, } = Dimensions.get('window')

const initialState = {
    alert: 0,
    countdown: 0,
    playing: false,
    time: 0,
}

export default function EMONScreen() {
    const [minutes, setMinutes] = useState('0')
    const [state, dispatch] = useReducer((state, { field, value, }) => {
        return {
            ...state,
            [field]: value,
        }
    }, initialState)

    const optionsAlert = ['DESLIGADO', '15s', '30s', '45s']
    const optionsCountdown = ['SIM', 'NÃO']
    const onChangeAlert = selected => {
        dispatch({ 
            field: 'alert',
            value: selected.id,
        })
    }
    const onChangeCountdown = selected => {}
    const onClick = () => {
        dispatch({
            field: 'playing',
            value: !state.playing,
        })
    }
    const onChangeText = text => setMinutes(text)
    const onBlur = () => {
        if(!minutes) minutes = '1'
        setMinutes((parseInt(minutes) || parseInt(1)).toString())
        dispatch({
            field: 'time',
            value: parseInt(minutes) * 60,
        })
    }

    if(state.playing) return <Running />

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', height, }}>
                <View style={styles.header}>
                    <Text style={styles.title}>EMOM</Text>
                    <Text style={styles.text}>Every Minute On the Minute</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.panel}>
                        <Text style={[styles.text, { fontSize: 18 }]}>ALERTAS</Text>
                        <RadioGroup items={optionsAlert} onChange={onChangeAlert} selectedDefault={initialState.alert} />
                    </View>
                    <View style={styles.panel}>
                        <Text style={styles.text}>CONTAGEM REGRESSIVA</Text>
                        <RadioGroup items={optionsCountdown} onChange={onChangeCountdown} selectedDefault={initialState.countdown} />
                    </View>
                    <View style={[
                        styles.panel,
                        { flex: 1, },
                    ]}>
                        <Text style={styles.text}>QUANTOS MINUTOS</Text>
                        <TextInput style={styles.count} keyboardType="number-pad" textContentType="telephoneNumber" onFocus={({ target }) => {}} value={minutes} {...{ onChangeText, onBlur, }} />
                        <Text style={styles.text}>MINUTOS</Text>
                    </View>
                    <View style={styles.panel}>
                        <View>
                            <PlayButton size={100} {...{ onClick, }} />
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView behavior="position" />
            </ScrollView>
        </View>
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
    },
})