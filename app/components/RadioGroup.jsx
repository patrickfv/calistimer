import React, { useState } from 'react'
import { View,
    StyleSheet,
    Text,
    TouchableHighlight, } from 'react-native'

const COLOR_PRIMARY = '#2b2d42'
const COLOR_TEXT = '#2b2d42'
const COLOR_SELECTED = '#edf2f4'

export default function RadioGroup({ items, selectedIndex, selectedDefault=0, onChange }) {
    const [selected, setSelected] = useState(selectedDefault)

    return (
        <View style={[styles.container]}>
            { items.map((item, index) => {
                const separator = index !== 0
                const isSelected = selected === index

                return (
                    <TouchableHighlight
                        key={index} 
                        style={[styles.touchable,
                        separator && styles.separator,
                        isSelected && styles.selected]}
                        activeOpacity={1}
                        underlayColor={COLOR_SELECTED}
                        onPress={() => { selectedIndex(index); setSelected(index) }}>
                        <Text>{ item }</Text>
                    </TouchableHighlight>
                )
            })

        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        minHeight: 45,
        borderWidth: 2,
        borderRadius: 5,
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    separator: {
        borderLeftColor: COLOR_PRIMARY,
        borderLeftWidth: 2,
    },
    selected: {
        backgroundColor: COLOR_SELECTED,
    },
})