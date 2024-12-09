import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'

import { globalStyle } from '../config'



export default function ButtonSecondary(props) {

    let color=''
    if(props.status==='yes') { color=globalStyle.buttonSecondaryYesColor}
    if(props.status==='no') { color=globalStyle.buttonSecondaryNoColor}
    
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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
    },
})
