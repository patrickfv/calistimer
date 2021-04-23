import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Svg, { Path, Rect, } from 'react-native-svg'

function Play() {
    return (
    <Svg viewBox='0 0 512 512'>
        <Path fill='#434040' d='M60.54 512c-17.06 0-30.43-13.86-30.43-31.56V31.55C30.12 13.86 43.48 0 60.55 0A32.94 32.94 0 0177 4.52L465.7 229c10.13 5.85 16.18 16 16.18 27s-6 21.2-16.18 27L77 507.48A32.92 32.92 0 0160.55 512z'></Path>
    </Svg>
    )
}

function Stop() {
    return (
        <Svg viewBox='0 0 512 512'>
            <Rect width='512' height='512' rx='68.27' ry='68.27' fill='#434040'/>
        </Svg>
    )
}

export default function PlayStopButton({ size=50, onClick=()=>{}, type='play', style }) {

    const onPress = () => {
        onClick()
    }
    
    return (
        <TouchableWithoutFeedback 
            {...{ onPress }}
            style={[{
                justifyContent: 'center',
                width: size,
                height: size,
                borderRadius: size / 2,
            }, 
            style
            ]}>
            { type === 'play'
                ? <Play />
                : <Stop />
            }
        </TouchableWithoutFeedback>
    )
}
