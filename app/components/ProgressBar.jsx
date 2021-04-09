import React, { useEffect, useRef, } from 'react'
import { Dimensions, View, } from 'react-native'

export default function ProgressBar({ percentage, height=3, color='white', style, }) {
    const width = Dimensions.get('window').width / 100 * percentage
    
    return (
        <View style={[
            style,
            { height, width, backgroundColor: color, }
        ]}/>
    )
}
