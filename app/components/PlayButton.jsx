import React, { useState, } from 'react'
import { View, StyleSheet, TouchableOpacity, } from 'react-native'
import Svg, { Path, Circle, } from 'react-native-svg'
import { useSharedValue, useAnimatedStyle, } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

function Icon() {
    const offsetY = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${offsetY.value}deg` }]
        }
    })
    const onTouchStart = () => {
        offsetY.value = Math.random() * 255
    }

    return (
        <Animated.View style={animatedStyle} {...{ onTouchStart }} >
            <Svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Circle cx="74" cy="74" r="70.5" fill="white" stroke="black" strokeWidth="7"/>
                <Path d="M116.594 68.1605C121.286 70.5547 121.331 77.2429 116.671 79.6999L57.1053 111.111C52.7936 113.385 47.6063 110.279 47.5735 105.405L47.1565 43.3868C47.1238 38.5125 52.2689 35.3378 56.6107 37.5533L116.594 68.1605Z" fill="white" stroke="black" strokeWidth="7"/>
                <Path d="M116.671 79.6999L57.1053 111.111C52.7936 113.385 47.6063 110.279 47.5735 105.405L47.1565 43.3868C47.1238 38.5125 52.2689 35.3378 56.6107 37.5533L116.594 68.1605C121.286 70.5547 121.331 77.2429 116.671 79.6999Z" fill="white" stroke="black" strokeWidth="7"/>
            </Svg>
        </Animated.View>
    )
}

export default function PlayButton({ size=100, onClick=()=>{}, }) {
    const [play, setPlay] = useState(true)
    const style = {
        size: {
            width: size,
            height: size,
            borderRadius: size / 2,
        },
    }
    const onPress = () => {
        setPlay(!play)
        onClick()
    }

    return (
        <TouchableOpacity {...{ onPress }}>
            <View  style={[
                styles.container,
            ]}>
                <Icon />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
})