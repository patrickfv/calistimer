import React from 'react'
import { Text, TouchableWithoutFeedback, } from 'react-native'

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
        <Text>Voltar</Text>
    </TouchableWithoutFeedback>
    )
}
