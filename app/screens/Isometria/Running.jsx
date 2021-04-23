import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, Dimensions, } from 'react-native'
import { Audio, } from 'expo-av'

import { ProgressBackground, Time, StaticButton, } from '../../components'
import { useInterval, } from '../../hooks'

const { width, } = Dimensions.get('window')

export default function Running({ time=60, alert=0, run=false, onClick=()=>{}, }) {
    const [sound, setSound] = useState()
    const [count, setCount] = useState(time)
    const [running, setRunning] = useState(run)
    const [countAlert, setCountAlert] = useState(false)
    const [countTimeout, setCountTimeout] = useState(5)
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
    
    const action = () => {
        if(running) {
            if(countTimeout) setCountTimeout(countTimeout - 1)
            if(count > 0) setCount(count - 1)
        } else {
            if(countTimeout) setCountTimeout(countTimeout - 1)
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
                <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 35, }}>Isometria</Text>
                </View>
                <View style={{ width, flexDirection: 'column', flexGrow: 1, }}>
                    <Time time={time - count} size={60} justSeconds={true} />
                    <View style={styles.rest}>
                        <Time time={count} justSeconds={true} />
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, }}>restantes</Text>
                    </View>
                </View>
                <View style={{ flexGrow: 1, justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 70, color: 'white', textAlign: 'center', }}>{ countTimeout }</Text>
                    <StaticButton {...{ onClick }} type="stop" style={{ alignSelf: 'flex-end', }} />
                </View>
            </View>
        </ProgressBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rest: { 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        width: width / 3,
        alignSelf: 'center',
    },
})


