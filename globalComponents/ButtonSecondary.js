import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'

import { globalStyle } from '../config'



export default function ButtonSecondary(props) {

    const color=props.status ? globalStyle.buttonSecondaryYesColor : globalStyle.buttonSecondaryNoColor
    
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, { borderColor: color }]}>
            <Text style={{ color: color }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

// STYLES
const styles = StyleSheet.create({
    button: {
        backgroundColor: globalStyle.buttonSecondaryBackgroundColor,
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
    },
})
