import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, Dimensions, } from 'react-native'
import { Audio, } from 'expo-av'

import { ProgressBackground, Time, ProgressBar, } from '../../components'

const { width, } = Dimensions.get('window')

export default function Running({ countdown=false, time=60, alert=0, run=false, }) {
    const incrementOrDecrement = countdown ? 0 : time
    const [sound, setSound] = useState()
    const [count, setCount] = useState(incrementOrDecrement)
    const [running, setRunning] = useState(run)
    // const [timeout, setTimeout] = useState(5)

    const playSound = async () => {
        const { sound, } = await Audio.Sound.createAsync(require('../../assets/alert.wav'))
        await sound.playAsync()
    }

    // const clearSound = async () => await sound.unloadAsync()
    
    const increment = () => {
        const interval = setInterval(() => {
            if(running) {
                if(count < time) {
                    setCount(parseInt(count + 1))
                } else {
                    clearInterval(interval)
                }
            } else {
                playSound()
            }
        }, 1000)
        return interval
    }
    
    const decrement = () => {    
        const interval = setInterval(() => {
            if(running) {
                if(count > 0) {
                    setCount(parseInt(count - 1))
                } else {
                    clearInterval(interval)
                }
            } else {
                playSound()
            }
        }, 1000)
        return interval
    }

    useEffect(() => {
        var interval = countdown ? increment() : decrement()
        return () => clearInterval(interval)
    }, [running, count])

    useEffect(() => {
        const timeout = setInterval(() => {
            setRunning(true)
            console.log(running)
            return clearTimeout(timeout)
        }, 5000)
        return () => clearTimeout(timeout)
    }, [])
    
    return (
        <ProgressBackground percentage={parseInt(count / time * 100)}>
            <View style={styles.container}>
                <Time time={time - count} size={20} />
                <ProgressBar style={styles.left} percentage={parseInt(count % 60 / 60 * 100)}/>
                <Time time={count} />
                <Text style={{ color: 'white', }}>restantes</Text>
            </View>
        </ProgressBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: 'center',
    },
    left: {
        alignSelf: 'flex-start',
    },
})
