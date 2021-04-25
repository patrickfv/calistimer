import React from 'react'
import { Image, TouchableWithoutFeedback, } from 'react-native'

export default function BackButton({ onClick=()=>{}, size=70, }) {
    const onPress = () => onClick()

    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <Image style={{
                width: size,
                height: size,
                resizeMode: 'contain' 
            }} source={require('../assets/back-arrow.png')} />
        </TouchableWithoutFeedback>
    )
}
