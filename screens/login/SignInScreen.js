import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'



export default function SignInScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <Text>Component : SignInScreen</Text>
            <Text>Route : {route.name}</Text>
        </View>
    )
}

import { globalStyle } from '../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
})
