import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, Dimensions, } from 'react-native'
import { Audio, } from 'expo-av'

import { ProgressBackground, Time, PlayStopButton, BackButton, RestartButton, } from '../../components'
import { useInterval, } from '../../hooks'
import { useKeepAwake } from 'expo-keep-awake'

const { width, } = Dimensions.get('screen')

export default function Running({ time=60, run=false, goal=true, onClick=()=>{}, }) {
    const [sound, setSound] = useState()
    const [count, setCount] = useState(time)
    const [running, setRunning] = useState(run)
    const [countTimeout, setCountTimeout] = useState(5)
    const TIMEOUT = 5000
    useKeepAwake()

    const backClick = () => onClick()
    const playClick = () => setRunning(!running)
    const restartClick = () => {
        if(!running) {
            setCount(time)
            setCountTimeout(5)
        }
    }

    const playSound = async () => { 
        const { sound, } = await Audio.Sound.createAsync(require('../../assets/alert.wav'))
        await sound.playAsync()
        setSound(sound)
    }

    const action = goal
    ? () => {
        if(running) {
            if(countTimeout) {
                setCountTimeout(countTimeout - 1)
                playSound()
            } else {
                setCount(count + 1)
            }
        }
    }
    : () => {
        if(running) {
            if(countTimeout) {
                setCountTimeout(countTimeout - 1)
                playSound()
            } else {
                if(count > 0) setCount(count - 1)
            }
        }
    }
    
    useInterval(() => {
        action()
    }, 1000)

    useEffect(() => {
        return sound
            ? () => sound.unloadAsync()
            : undefined
    }, [sound])
    
    useEffect(() => {
        if(!goal) {
            count <= 5
                ? playSound()
                : undefined
        }
    }, [count])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRunning(true)
            return clearTimeout(timeout)
        }, TIMEOUT)
        return () => clearTimeout(timeout)
    }, [])
    
    return (
        <ProgressBackground percentage={goal ? 100 : parseInt(count / time * 100)}>
            <View style={styles.container}>
                <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 35, }}>Isometria</Text>
                </View>
                <View style={{ width, flexDirection: 'column', flexGrow: 1, }}>
                    {
                        goal
                        ? <Time time={count} size={60} justSeconds={false} /> 
                        : <Time time={time - count} size={60} justSeconds={true} />
                    }
                    <View style={styles.rest}>
                        {
                            goal
                            ? null
                            : (
                                <React.Fragment>
                                    <Time time={count} justSeconds={true} />)
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, }}>restantes</Text>
                                </React.Fragment>
                            )
                        }
                    </View>
                </View>
                <View style={{ flexGrow: 1, justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 70, color: 'white', textAlign: 'center', }}>{ countTimeout }</Text>
                    <View style={{ width, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <BackButton onClick={backClick} />
                        <PlayStopButton onClick={playClick} type={running ? 'stop' : 'play'} />
                        <RestartButton onClick={restartClick} />
                    </View>
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


