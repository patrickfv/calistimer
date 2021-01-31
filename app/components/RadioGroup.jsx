import React, { useState, useEffect } from 'react'
import { View,
    StyleSheet,
    Text,
    TouchableHighlight, } from 'react-native'

const COLOR_PRIMARY = '#2b2d42'
const COLOR_TEXT = '#2b2d42'
const COLOR_SELECTED = '#edf2f4'

export default function RadioGroup({ items=['item 1', 'item 2', '...'], selectedDefault=0, onChange=()=>{} }) {
    const [selected, setSelected] = useState(selectedDefault)

    useEffect(() => {
        onChange({
            id: selected,
            label: items[selected]
        })
    }, [selected])

    return (
        <View style={[styles.container]}>
            { items.map((item, index) => {
                const first = index === 0
                const last = index === items.length - 1
                const isSelected = selected === index

                return (
                        <TouchableHighlight
                            key={index} 
                            style={[
                                styles.touchable,
                                !first && styles.separator,
                                last && styles.last,
                                first && styles.first,
                                isSelected && styles.selected
                            ]}
                            activeOpacity={1}
                            underlayColor={COLOR_SELECTED}
                            onPressIn={() => { 
                                if(selected !== index) setSelected(index)
                            }}>
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
        borderColor: COLOR_SELECTED,
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    separator: {
        borderLeftColor: COLOR_SELECTED,
        borderLeftWidth: 2,
    },
    selected: {
        backgroundColor: COLOR_SELECTED,
    },
    first: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
    },
    last: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
})