import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'

import { globalStyle } from '../config'



export default function ButtonPrimary(props) {
    // console.log(props)
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

// STYLES
const styles = StyleSheet.create({
    button: {
        backgroundColor: globalStyle.buttonPrimaryBackgroundColor,
        height: 40,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    text: {
        color: globalStyle.buttonPrimaryColor,
    },
})
