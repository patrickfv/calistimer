import React from 'react'
import { TouchableWithoutFeedback, } from 'react-native-gesture-handler'
import { Image, } from 'react-native'

function Play() {
    return (
        <Image style={{
            width: 70,
            height: 70,
            resizeMode: 'contain' 
        }} source={require('../assets/play.png')} />
    )
}

function Stop() {
    return (
        <Image style={{
            width: 70,
            height: 70,
            resizeMode: 'contain' 
        }} source={require('../assets/stop.png')} />
    )
}

export default function PlayStopButton({ size=50, onClick=()=>{}, type='play', style }) {

    const onPress = () => {
        onClick()
    }
    
    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            { type === 'play'
                ? <Play />
                : <Stop />
            }
        </TouchableWithoutFeedback>
    )
}
