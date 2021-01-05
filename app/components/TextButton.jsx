import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton({ title='TextButton', style, onPress }) {
    
    return (
        <TouchableOpacity style={styles.container} {...{ onPress }}>
            <Text {...{ style }}>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
