import React, { useState, } from 'react'
import { StyleSheet, 
    View, 
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView, } from 'react-native'

import { colors, fonts, } from '../../styles'
import { RadioGroup, StaticButton, } from '../../components'
import Running from './Running'

export const EMOM_SCREEN_NAME = 'EMON_SCREEN'
const { width, height, } = Dimensions.get('window')

const INITIAL_STATE = {
    alert: 0,
    countdown: 0,
    playing: false,
    time: 60,
}

export default function EMONScreen() {
    const [minutes, setMinutes] = useState('1')
    const [state, setState] = useState(INITIAL_STATE)

    // const optionsAlert = ['DESLIGADO', '15s', '30s', '45s']
    const optionsAlert = {
        '0s': 0,
        '15s': 15,
        '30s': 30,
        '45s': 45,
    }
    const optionsCountdown = ['NÃO', 'SIM']
    const onChangeAlert = selected => {
        setState({
            ...state,
            alert: selected.id,
        })
    }
    const onChangeCountdown = selected => {
        setState({
            ...state,
            countdown: selected.id,  
        })
    }
    const onClick = () => {
        setState({
            ...state,
            playing: !state.playing,  
        })
    }
    const onChangeText = text => setMinutes(text)
    const onBlur = () => {
        if(!minutes) setMinutes('1')
        setMinutes((parseInt(minutes) || parseInt(1)).toString())
        setState({
            ...state,
            time: parseInt(minutes) * 60,  
        })
    }

    if(state.playing) return <Running countdown={state.countdown} alert={optionsAlert[Object.keys(optionsAlert)[state.alert]]} time={state.time} {...{ onClick }}/>

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', minHeight: height, }}>
                <View style={styles.header}>
                    <Text style={styles.title}>EMOM</Text>
                    <Text style={styles.text}>Every Minute On the Minute</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.panel}>
                        <Text style={[styles.text, { fontSize: 18 }]}>ALERTAS</Text>
                        <RadioGroup items={Object.keys(optionsAlert)} onChange={onChangeAlert} selectedDefault={INITIAL_STATE.alert} />
                    </View>
                    <View style={styles.panel}>
                        <Text style={styles.text}>CONTAGEM REGRESSIVA</Text>
                        <RadioGroup items={optionsCountdown} onChange={onChangeCountdown} selectedDefault={INITIAL_STATE.countdown} />
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
                            <StaticButton size={60} {...{ onClick, }} />
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