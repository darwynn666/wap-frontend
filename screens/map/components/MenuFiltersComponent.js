import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { globalStyle } from '../../../config'


import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'

export default function MenuFiltersComponent(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <Text>Menu Filters Component</Text>
        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyle.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
