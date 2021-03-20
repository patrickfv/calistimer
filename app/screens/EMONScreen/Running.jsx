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
    const [countAlert, setCountAlert] = useState(alert)
    const TIMEOUT = 5000

    const playSound = async () => { 
        const { sound, } = await Audio.Sound.createAsync(require('../../assets/alert.wav'))
        await sound.playAsync()
    }

    const playAlert = () => {
        // const interval = setInterval(() => {
        //     if(alert) {
        //         setState({ field: 'alert', value: alert - 1 })
        //         if(state.alert === 0) playSound()
        //         console.log(state.alert)
        //     } else {
        //         clearInterval(interval)
        //     }
        // }, alert * 1000)
        // return interval
        
        if(!alert) return
        setCountAlert(parseInt(countAlert - 1))
        if(countAlert === 0) {
            console.log(countAlert)
            setCountAlert(alert)
        }
    }
    
    const increment = () => {
        const interval = setInterval(() => {
            if(running) {
                if(count < time) {
                    setCount(parseInt(count + 1))
                    // setState({ field: 'alert', value: state.alert - 1 })
                    // console.log(state.alert)
                    playAlert()
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
        const interval = countdown ? increment() : decrement()
        // const alertInterval = playAlert()
        return () => {
            clearInterval(interval)
            // clearInterval(alertInterval)
        }
    }, [running, count])
    
    // useEffect(() => {
        // if(alert) {
        //     setState({ field: 'alert', value: alert - 1 })
        //     if(state.alert === 1) playSound()
        //     console.log(state.alert)
        // }
        // const alertInterval = playAlert()
        // return () => clearInterval(alertInterval)
    // }, [running, state.alert])

    useEffect(() => {
        const timeout = setInterval(() => {
            setRunning(true)
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
