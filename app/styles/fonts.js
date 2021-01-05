import * as Font from 'expo-font'
import { Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'

export function initLoadFonts() {
    return Font.loadAsync({
        Inter_700Bold,
        Inter_400Regular,
        Inter_500Medium,
    })
}

export default {
    TITLE: 'Inter_700Bold',
    TEXT_DEFAULT: 'Inter_500Medium'
}