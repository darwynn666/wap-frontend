import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'



export default function HomeScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const handleSignUp = () => {
        navigation.navigate('SignUpUser')
    }

    const handleSignIn=()=> {
        console.log('sign in ...')
    }

    console.log(route.name)
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {/* <Image></Image> */}
                <Text>aaa</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <ButtonPrimary onPress={() => handleSignUp()} title='Sign Up' />
                <ButtonPrimary onPress={() => handleSignIn()} title='Sign In' />
            </View>
        </View>
    )
}

import { globalStyle } from '../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    imageContainer: {
        backgroundColor: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '70%',
    },
    buttonsContainer: {
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '20%',
    },
})
