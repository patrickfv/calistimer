import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, Dimensions, } from 'react-native'
import { Audio, } from 'expo-av'

import { ProgressBackground, Time, ProgressBar, } from '../../components'
import { useInterval, } from '../../hooks'

const { width, } = Dimensions.get('window')

export default function Running({ countdown=false, time=60, alert=0, run=false, }) {
    const [sound, setSound] = useState()
    const [count, setCount] = useState(countdown ? 0 : time)
    const [running, setRunning] = useState(run)
    const [countAlert, setCountAlert] = useState(false)
    const TIMEOUT = 5000

    const playSound = async () => { 
        const { sound, } = await Audio.Sound.createAsync(require('../../assets/alert.wav'))
        await sound.playAsync()
        setSound(sound)
    }

    useEffect(() => {
        return sound
            ? () => sound.unloadAsync()
            : undefined
    }, [sound])
    
    const action = countdown
        ? () => { 
            if(running) {
                if(count < time) { 
                    setCount(count + 1)
                }
            } else {
                playSound()
            }
        }
        : () => {
            if(running) {
                if(count > 0) setCount(count - 1)
            } else {
                playSound()
            }
        }

    useInterval(() => {
        action()
    }, 1000)

    useEffect(() => {
        countAlert && count % alert === 0
            ? playSound()
            : undefined
    }, [count])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRunning(true)
            setCountAlert(Boolean(alert))
            return clearTimeout(timeout)
        }, TIMEOUT)
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
