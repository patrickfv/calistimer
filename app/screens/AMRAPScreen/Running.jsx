import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, Dimensions, ScrollView, } from 'react-native'
import { Audio, } from 'expo-av'
import { useKeepAwake, } from 'expo-keep-awake'

import { ProgressBackground, Time, ProgressBar, PlayStopButton, AddRemoveButton, } from '../../components'
import { useInterval, } from '../../hooks'
import { BackButton, RestartButton, } from '../../components'

const { width, height, } = Dimensions.get('screen')

export default function Running({ countdown=false, time=60, alert=0, run=false, onClick=()=>{}, }) {
    const [sound, setSound] = useState()
    const [count, setCount] = useState(countdown ? 0 : time)
    const [running, setRunning] = useState(run)
    const [countAlert, _] = useState(false)
    const [countTimeout, setCountTimeout] = useState(5)
    const [repetitions, setRepetations] = useState(1)
    const [media, setMedia] = useState(repetitions > 0 ? count / repetitions : 0)
    const [estimated, setEstimated] = useState(media > 0 ? Math.floor(parseInt(time) * 60 / media) : 0)
    useKeepAwake()

    const playSound = async () => { 
        const { sound, } = await Audio.Sound.createAsync(require('../../assets/alert.wav'))
        await sound.playAsync()
        setSound(sound)
    }
    const backClick = () => onClick()
    const playClick = () => setRunning(!running)
    const addClick = () => {
        if(repetitions >= 0) setRepetations(parseInt(repetitions + 1))
    }
    const removeClick = () => {
        if(repetitions > 0) setRepetations(parseInt(repetitions - 1))
    }
    const restartClick = () => {
        setCount(countdown ? 0 : time)
        setCountTimeout(5)
    }

    useEffect(() => {
        return sound
            ? () => sound.unloadAsync()
            : undefined
    }, [sound])
    
    const action = countdown
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
        setMedia(repetitions > 0 ? count / repetitions : 0)
    }, [repetitions])

    useEffect(() => {
        setEstimated(media > 0 ? Math.floor(parseInt(time) * 60 / media) : 0)
    }, [media])

    useEffect(() => {
        countAlert && count % alert === 0
            ? playSound()
            : undefined
    }, [count])

    return (
        <ProgressBackground percentage={parseInt(count / time * 100)}>
            <ScrollView contentContainerStyle={{ justifyContent: 'space-around', height, }}>
                <View style={styles.container}>
                    <View style={{ flexGrow: 1, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 35, }}>AMRAP</Text>
                        <Text style={{ color: 'white', fontSize: 16, }}>At Many Repetitions as Possible</Text>
                    </View>
                    <View style={{ height: 10, width, flexGrow: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <View style={{ flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Time time={media} size={20}/>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, }}>Por Repetições</Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, }}>{ estimated }</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, }}>Repetições</Text>
                        </View>
                    </View>
                    <View style={{ width, flexDirection: 'column', flexGrow: 0.5, }}>
                        <Time time={time - count} size={60} containerStyle={{ margin: 15, }} />
                        <ProgressBar style={{ alignSelf: 'flex-start', }} percentage={parseInt(count % 60 / 60 * 100)}/>
                        <View style={styles.rest}>
                            <Time time={count} size={18} containerStyle={{ margin: 15, }}/>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, }}>restantes</Text>
                        </View>
                    </View>
                    <View style={{ flexGrow: 2, justifyContent: 'space-evenly' }}>
                        <View style={{ width, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                            <AddRemoveButton type="remove" onClick={removeClick}/>
                            <Text style={{ fontSize: 70, color: 'white', textAlign: 'center', }}>{ repetitions }</Text>
                            <AddRemoveButton type="add" onClick={addClick}/>
                        </View>
                        <View style={{ width, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                            <BackButton  onClick={backClick}/>
                            <PlayStopButton onClick={playClick} type={running ? 'stop' : 'play'} style={{ alignSelf: 'flex-end', }} />
                            <RestartButton  onClick={restartClick}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
