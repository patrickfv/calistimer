import React from 'react'
import { TouchableOpacity, } from 'react-native-gesture-handler'
import { Image, } from 'react-native'

function Add({ size, }) {
    return (
        <Image style={{
            width: size,
            height: size,
            resizeMode: 'contain' 
        }} source={require('../assets/more.png')} />
    )
}

function Remove({ size, }) {
    return (
        <Image style={{
            width: size,
            height: size,
            resizeMode: 'contain' 
        }} source={require('../assets/remove.png')} />
    )
}

export default function PlayStopButton({ size=70, onClick=()=>{}, type='add', }) {

    const onPress = () => {
        onClick()
    }
    
    return (
        <TouchableOpacity {...{ onPress }}>
            { type === 'add'
                ? <Add {...{ size, }}/>
                : <Remove {...{ size, }}/>
            }
        </TouchableOpacity>
    )
}


