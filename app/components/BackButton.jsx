import React from 'react'
import { Image, } from 'react-native'
import { TouchableOpacity, } from 'react-native-gesture-handler'

export default function BackButton({ onClick=()=>{}, size=70, }) {
    const onPress = () => onClick()

    return (
        <TouchableOpacity {...{ onPress }}>
            <Image style={{
                width: size,
                height: size,
                resizeMode: 'contain' 
            }} source={require('../assets/back-arrow.png')} />
        </TouchableOpacity>
    )
}
