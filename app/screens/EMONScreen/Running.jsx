import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, Dimensions, } from 'react-native'

import { ProgressBackground, Time, ProgressBar, } from '../../components'

const { width, } = Dimensions.get('window')

export default function Running({ countdown=true, time=60, }) {
    const incrementOrDecrement = countdown ? 0 : time
    const [count, setCount] = useState(incrementOrDecrement)
    const [running, setRunning] = useState(true)

    const increment = () => {
        const interval = setInterval(() => {
            if(count < time) {
                setCount(parseInt(count + 1))
            } else {
                clearInterval(interval)
            }
        }, 1000)
        return interval
    }

    const decrement = () => {
        const interval = setInterval(() => {
            if(count > 0) {
                setCount(parseInt(count - 1))
            } else {
                clearInterval(interval)
            }
            console.log(parseInt(count / time * 100))
        }, 1000)
        return interval
    }

    useEffect(() => {
        const interval = countdown ? increment() : decrement()
        return () => clearInterval(interval)
    }, [count])

    // useEffect(() => {
    //
    // }, [running])
    // (count % 60 / 60 * 100)
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
