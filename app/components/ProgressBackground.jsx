import React from 'react'
import { View, StyleSheet, } from 'react-native'

export default function ProgressBackground({ children, percentage, }) {
    
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1 - percentage / 100, backgroundColor: '#E40039', }} />
                <View style={{ flex: percentage / 100, backgroundColor: '#2A0E12', }} />
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
        bottom: -50,
        right: 50,
        height: 100,
        width: 100,
    },
})