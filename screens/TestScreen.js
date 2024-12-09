import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


import ButtonPrimary from '../globalComponents/ButtonPrimary'
import ButtonSecondary from '../globalComponents/ButtonSecondary'

export default function TestScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <Text>Component : TestScreen</Text>
            <Text>Route : {route.name}</Text>
            <ButtonPrimary title='Button Primary'/>
            <ButtonSecondary title='Secondary status=yes' status='yes'/>
            <ButtonSecondary title='Secondary status=no' status='no'/>
        </View>
    )
}

import { globalStyle } from '../config'
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
