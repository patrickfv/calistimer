import React from 'react'
import { Image, TouchableWithoutFeedback, } from 'react-native'

export default function BackButton({ onClick=()=>{}, size=50, style, }) {
    const onPress = () => onClick()

    return (
        <TouchableWithoutFeedback 
        {...{ onPress }}
        style={[{
            justifyContent: 'center',
            width: size,
            height: size,
            borderRadius: size / 2,
        }, 
        style
        ]}>
        <Image style={{
            width: 70,
            height: 70,
            resizeMode: 'contain' 
        }} source={require('../assets/back-arrow.png')} />
    </TouchableWithoutFeedback>
    )
}
