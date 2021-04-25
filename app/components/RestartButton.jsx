import React from 'react'
import { Image, TouchableWithoutFeedback, } from 'react-native'

export default function RestartButton({ onClick=()=>{}, size=70, }) {
    const onPress = () => onClick()

    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <Image style={{
                width: size,
                height: size,
                resizeMode: 'contain' 
            }} source={require('../assets/update-arrow.png')} />
        </TouchableWithoutFeedback>
    )
}
