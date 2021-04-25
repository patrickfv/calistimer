import React, { useState, } from 'react'
import { Dimensions, 
    View, 
    StyleSheet, 
    ScrollView,
    Text,
    TextInput,
    KeyboardAvoidingView, } from 'react-native'

import { colors, fonts, } from '../../styles'
import { PlayStopButton, RadioGroup, } from '../../components'
import Running from './Running'

const { width, height, } = Dimensions.get('window')

export const ISOMETRIA_SCREEN_NAME = 'ISOMETRIA_SCREEN'

const INITIAL_STATE = {
    objective: 1,
    playing: false,
    time: 20,
}

export default function IsometriaScreen() {
    const [seconds, setSeconds] = useState('20')
    const [state, setState] = useState(INITIAL_STATE)

    const optionsObjectives = ['Livre', 'Bater Tempo']

    const onChangeObjectives = selected => {
        setState({
            ...state,
            objective: selected.id,
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
        if(!seconds) setSeconds('20')
        setSeconds((parseInt(seconds) || parseInt(1)).toString())
        setState({
            ...state,
            time: parseInt(seconds),
        })
    }

    if(state.playing) return <Running alert={optionsObjectives[Object.keys(optionsObjectives)[state.objective]]} time={state.objective ? state.time : 0} goal={state.objective === 0} {...{ onClick, }}/>

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', minHeight: height, }}>
                <View style={styles.header}>
                    <Text style={styles.title}>ISOMETRIA</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.panel}>
                        <Text style={[styles.text, { fontSize: 18 }]}>Obejetivo:</Text>
                        <RadioGroup items={optionsObjectives} onChange={onChangeObjectives} selectedDefault={INITIAL_STATE.objective} />
                    </View>
                    <View style={[
                        styles.panel,
                        { flex: 1, },
                    ]}>
                        {
                            state.objective 
                            ? (
                                <React.Fragment>
                                    <Text style={styles.text}>QUANTOS SEGUNDOS</Text>
                                    <TextInput style={styles.count} keyboardType="number-pad" textContentType="telephoneNumber" onFocus={({ target }) => {}} value={seconds} {...{ onChangeText, onBlur, }} />
                                    <Text style={styles.text}>SEGUNDOS</Text>
                                </React.Fragment>
                            )
                            : null
                        }
                    </View>
                    <View style={styles.panel}>
                        <View>
                            <PlayStopButton size={60} {...{ onClick, }} />
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