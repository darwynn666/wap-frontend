import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { globalStyle } from '../config'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

/**
 * InputFullSize component
 * if param secureTextEntry = true, displays an eye icon on the right to toggle password display
 */

export default function InputFullSize(props) {
    // console.log(props)
    const { onChangeText, value, placeholder, secureTextEntry } = props
    const [secure, setSecure] = useState(secureTextEntry ? true : false)

    const width = secureTextEntry ? ['85%', '15%'] : ['100%', '0%']
    const color = secure ? '#dddddd' : globalStyle.buttonPrimaryBackgroundColor

    const handleSecureTextEntry = () => {
        setSecure(!secure)
    }

    // console.log('secure', secure)

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, { width: width[0] }]}>
                <TextInput onChangeText={onChangeText} value={value} style={{ width: '100%' }} placeholder={placeholder} secureTextEntry={secure}></TextInput>
            </View>
            {secureTextEntry &&
                <TouchableOpacity onPress={() => handleSecureTextEntry()} style={[styles.iconContainer, { width: width[1] }]}>
                    <FontAwesomeIcon icon={faEye} size={20} style={{ color: color }}></FontAwesomeIcon>
                </TouchableOpacity>
            }
        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginTop: 5,
        marginBottom: 5,
    },
    inputContainer: {
        // backgroundColor:'green',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconContainer: {
        // backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
