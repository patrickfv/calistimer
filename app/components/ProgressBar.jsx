import React, { useEffect, useState, } from 'react'
import { Animated, Dimensions, } from 'react-native'

export default function ProgressBar({ percentage, height=3, color='white', style, }) {
    // const width = Dimensions.get('window').width / 100 * percentage
    const [animatedWidth, _] = useState(new Animated.Value(0))
    const width = animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    })

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: percentage,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }, [percentage])
    
    return (
        <Animated.View style={[
            style,
            { height, width, backgroundColor: color, }
        ]}/>
    )
}
