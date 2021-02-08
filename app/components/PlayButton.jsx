import React, { useState, } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useSharedValue, useAnimatedStyle, } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

export default function PlayButton({ size=100, onClick=()=>{}, }) {
    const [play, setPlay] = useState(true)
    const offsetY = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                //{ rotateY: `${offsetY.value}deg` },
                //{ perspective: 200 },
                { translateX: 10 },
                //{ rotateZ: '90deg' }
            ]
        }
    })
    const onTouchStart = () => {
        offsetY.value = Math.random() * 255
    }
    const style = StyleSheet.create({
        size: {
            width: size,
            height: size,
        },
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            
            borderTopWidth: size / 3,
            borderBottomWidth: size / 3,
            borderLeftWidth: size - size / 2,
            
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: '#fff',
        },
        ring: {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 5,
            backgroundColor: 'transparent',
            borderColor: '#fff',
        },
    })
    const onPress = () => {
        setPlay(!play)
        onClick()
    }

    return (
        <TouchableOpacity {...{ onPress }}>
            <View  style={[
                styles.container,
                style.ring
            ]}>
                <Animated.View style={[style.triangle, animatedStyle]} {...{ onTouchStart }} >
                </Animated.View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})