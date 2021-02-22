import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import FlipCard from './FlipCard'

export default function PlayButton({ size=100, onClick=()=>{}, }) {
    const [play, setPlay] = useState(0)
    
    const styleCircle = {
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: size / 2,
    }
    useEffect(() => {
    }, [play])

    const onPress = () => {
        setPlay(play => (play === 0 ? 1 : 0))
        onClick()
    }
    const Side = ({ title, color='transparent', }) => {

        return (
            <View style={[
                styleCircle,
                { backgroundColor: color, width: '100%', height: '100%', },
            ]}>
                <Text style={styles.text}>{ title }</Text>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <View  style={styles.container}>
                <FlipCard 
                    side={play}
                    style={styleCircle}
                    front={<Side title="Play" color="blue" />}
                    back={<Side title="Pause" color="blue" />}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
    },
})