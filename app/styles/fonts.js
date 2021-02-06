import * as Font from 'expo-font'
import { Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter'

export function initLoadFonts() {
    return Font.loadAsync({
        Inter_700Bold,
        Inter_400Regular,
    })
}

export default {
    TITLE: 'Inter_700Bold',
    TEXT_DEFAULT: 'Inter_400Regular',
    COUNT: 'Inter_400Regular',    
}