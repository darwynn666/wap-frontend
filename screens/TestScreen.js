import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


import ButtonPrimary from '../globalComponents/ButtonPrimary'
import ButtonSecondary from '../globalComponents/ButtonSecondary'

export default function TestScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(state => state.user.value)
    const settings = useSelector(state => state.settings.value)
    console.log(user)
    console.log(settings)
    return (
        <ScrollView>

            <View style={styles.container}>
                <ButtonPrimary title='Button Primary' />
                <ButtonSecondary title='Secondary status=yes' status='yes' />
                <ButtonSecondary title='Secondary status=no' status='no' />
                <Text>REDUCER : user {JSON.stringify(user, null, 2)}</Text>
                <Text>REDUCER : settings {JSON.stringify(settings, null, 2)}</Text>
            </View>

        </ScrollView>
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
