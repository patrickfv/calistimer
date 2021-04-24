import React from 'react'
import { Text, TouchableWithoutFeedback, } from 'react-native'

export default function RestartButton({ onClick=()=>{}, style, size=50, }) {
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
        <Text>Reiniciar</Text>
    </TouchableWithoutFeedback>
    )
}
