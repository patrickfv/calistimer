import React, { useState, } from 'react'
import { Dimensions, 
    View, 
    StyleSheet, 
    ScrollView,
    Text,
    TextInput,
    KeyboardAvoidingView, } from 'react-native'

import { colors, fonts, } from '../../styles'
import { RadioGroup, StaticButton, } from '../../components'

const { width, height, } = Dimensions.get('window')

export const ISOMETRIA_SCREEN_NAME = 'ISOMETRIA_SCREEN'

const INITIAL_STATE = {
    alert: 0,
    countdown: 0,
    playing: false,
    time: 60,
}

export default function IsometriaScreen() {
    const [seconds, setSeconds] = useState('1')
    const [state, setState] = useState(INITIAL_STATE)

    const optionsAlert = {
        'Livre': 0,
        'Bater Tempo': 1,
    }

    const onChangeAlert = selected => {
        setState({
            ...state,
            alert: selected.id,
        })
    }
    const onClick = () => {
        setState({
            ...state,
            playing: !state.playing,  
        })
    }
    const onChangeText = text => setSeconds(text)
    const onBlur = () => {
        if(!seconds) setSeconds('1')
        setSeconds((parseInt(seconds) || parseInt(1)).toString())
        setState({
            ...state,
            time: parseInt(seconds) * 60,  
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', minHeight: height, }}>
                <View style={styles.header}>
                    <Text style={styles.title}>ISOMETRIA</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.panel}>
                        <Text style={[styles.text, { fontSize: 18 }]}>Obejetivo:</Text>
                        <RadioGroup items={Object.keys(optionsAlert)} onChange={onChangeAlert} selectedDefault={INITIAL_STATE.alert} />
                    </View>
                    <View style={[
                        styles.panel,
                        { flex: 1, },
                    ]}>
                        <Text style={styles.text}>QUANTOS SEGUNDOS</Text>
                        <TextInput style={styles.count} keyboardType="number-pad" textContentType="telephoneNumber" onFocus={({ target }) => {}} value={seconds} {...{ onChangeText, onBlur, }} />
                        <Text style={styles.text}>SEGUNDOS</Text>
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
        height,
        width,
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