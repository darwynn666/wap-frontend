import { StyleSheet, Text, TextInput, View, Switch, Button, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function UserScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const [toggleDogSitter, setToggleDogSitter] = useState(false);
    const [toggleSearchDogSitter, setToggleSearchDogSitter] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.contenairimage}>
                <Image source='../assets/avatar.jpg' />
            </View>
            <View style={styles.contenairinput}>
                <TextInput style={styles.input} placeholder="Firstname"></TextInput>
                <TextInput style={styles.input} placeholder="Lastname"></TextInput>
                <TextInput style={styles.input} placeholder="email"></TextInput>
                <TextInput style={styles.input} placeholder="Telephone"></TextInput>
                <TextInput style={styles.input} placeholder="Password"></TextInput>
            </View >
            <View>
                <View style={styles.switch}>
                    <FontAwesome name='toggle-on' style={styles.buttonswitch} onValueChange={value => setToggleDogSitter(value)} value={toggleDogSitter} />
                    <Text>Je suis un Dogsitter</Text>
                </View>
                <View style={styles.switch}>
                    <FontAwesome name='toggle-on' style={styles.buttonswitch} onValueChange={value => setToggleSearchDogSitter(value)}
                        value={toggleSearchDogSitter} />
                    <Text>Je cherche un Dogsitter</Text>
                </View>
            </View>
        </View>
        
    )
}

import { globalStyle } from '../../../config'
//import { normalizeColor } from 'react-native-reanimated/lib/typescript/Colors'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,

    },

    contenairinput: {
        height: '60%',
        width: '90%',
    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black',

    },
    switch: {
        width: '80%',
        alignItems: 'left',
        justifyContent: 'space--between',
        flexDirection: 'row',

    },
    buttonswitch: {
        Color: "green",
        thumbColor: "green",
    }

})
