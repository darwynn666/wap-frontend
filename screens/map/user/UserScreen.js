import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'



export default function UserScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <View>
                <Image></Image>
            </View>
            <View>
                <TextInput></TextInput>
            </View>
            <Text>Component : UserScreen</Text>
            <Text>Route : {route.name}</Text>
        </View>
    )
}

import { globalStyle } from '../../../config'
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
