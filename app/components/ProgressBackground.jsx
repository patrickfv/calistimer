import React, { useEffect, useState, } from 'react'
import { View, StyleSheet, Animated, } from 'react-native'

export default function ProgressBackground({ children, percentage, }) {
    const [animatedHeight, _] = useState(new Animated.Value(0))
    const height1 = animatedHeight.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    })
    const height2 = animatedHeight.interpolate({
        inputRange: [0, 100],
        outputRange: ['100%', '0%'],
        extrapolate: 'clamp',
    })

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: percentage,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }, [percentage])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <Animated.View style={{ height: height2, backgroundColor: '#E40039', }} />
                <Animated.View style={{ height: height1, backgroundColor: '#2A0E12', }} />
            </View>
            <View style={styles.children}>
                { children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    children: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})