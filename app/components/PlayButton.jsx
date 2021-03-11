import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text, } from 'react-native'
import AnimatedFlip from './AnimatedFlip'

export default function PlayButton({ size=100, onClick=()=>{}, }) {
    const [play, setPlay] = useState(0)

    const styleCircle = {
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: size / 2,
    }
    useEffect(() => {
    }, [play])

    const onPress = () => {
        setPlay(play => (play === 0 ? 1 : 0))
        onClick()
    }
    const Side = ({ title, bgColor='transparent', color='white' }) => (
        <View style={[
            styleCircle,
            { backgroundColor: bgColor, width: '100%', height: '100%', },
        ]}>
            <Text style={[
                styles.text,
                { color: color }
            ]}>
                { title }
            </Text>
        </View>
    )

    const ButtonWithoutAnimation = () => (
        <View style={[styleCircle, { backgroundColor: 'white', alignItems: 'center', }]}>
            <Text style={{ fontSize: 21, fontWeight: 'bold', }}>Play</Text>
        </View>
    )

    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <View  style={styles.container}>
                {
                //<AnimatedFlip
                //  side={play}
                //  style={styleCircle}
                //  front={<Side title="Play" color="black" bgColor="white" />}
                //  back={<Side title="Pause" color="black" bgColor="white" />} />
                <ButtonWithoutAnimation />
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
    },
})
