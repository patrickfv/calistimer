import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, } from 'react-native'

export default function PlayButton({ size=100, onClick=()=>{}, }) {
    const [play, setPlay] = useState(false)
    
    useEffect(() => {
       
    }, [play])

    const onPress = () => {
        setPlay(!play)
        onClick()
    }

    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <View  style={[
                styles.container,
                { 
                    width: size, 
                    height: size, 
                    borderRadius: (size / 2), 
                },
            ]}>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 5,
        backgroundColor: 'transparent',
        borderColor: '#fff',
    },
})