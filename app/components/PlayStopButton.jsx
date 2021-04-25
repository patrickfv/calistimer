import React from 'react'
import { TouchableWithoutFeedback, } from 'react-native-gesture-handler'
import { Image, } from 'react-native'

function Play({ size, }) {
    return (
        <Image style={{
            width: size,
            height: size,
            resizeMode: 'contain' 
        }} source={require('../assets/play.png')} />
    )
}

function Stop({ size, }) {
    return (
        <Image style={{
            width: size,
            height: size,
            resizeMode: 'contain' 
        }} source={require('../assets/stop.png')} />
    )
}

export default function PlayStopButton({ size=70, onClick=()=>{}, type='play', }) {

    const onPress = () => {
        onClick()
    }
    
    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            { type === 'play'
                ? <Play {...{ size, }}/>
                : <Stop {...{ size, }}/>
            }
        </TouchableWithoutFeedback>
    )
}
