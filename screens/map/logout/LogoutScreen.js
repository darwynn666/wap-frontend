import { StyleSheet, Text, View, BackHandler } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { globalStyle } from '../../../config'
import { logout } from '../../../reducers/user'

import { BACKEND_URL } from '../../../config'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'


export default function LogoutScreen(props) {
    const navigation = useNavigation()

    useEffect(() => { 
        const backAction = () => { navigation.navigate('_Map'); return true } // handle back button
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => backHandler.remove();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Vous devrez vous reconnecter pour acceder aux informations de la carte</Text>
            <View style={styles.buttonContainer}>
                <ButtonPrimary style={styles.button} title='Se deconnecter' onPress={() => navigation.navigate('Login', { screen: 'Signin' })} />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonPrimary style={styles.button} title='Retourner à la carte' onPress={() => navigation.navigate('_Map')} />
            </View>
        </View>
    )
}

//import { normalizeColor } from 'react-native-reanimated/lib/typescript/Colors'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: globalStyle.padding,
        paddingTop: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: globalStyle.h3,
        margin: 40,
    },
    buttonContainer: {
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        margin: 20,
    },
})
