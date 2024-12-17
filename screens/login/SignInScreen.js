import { StyleSheet, Text, TextInput, View, Image, Dimensions, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { BACKEND_URL } from '../../config'
import { setUser } from '../../reducers/user'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import InputFullSize from '../../globalComponents/InputFullSize'
import { userAvatarUrl } from '../../config'


export default function SignIn(props) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [title, setTitle] = useState()
    const navigation = useNavigation()
    const route = useRoute()
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (route.params) {
            setTitle(route.params.message)
            setEmail(route.params.email)
        }
        else {
            setTitle('Connecte-toi')
        }
    }, [])

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        setErrorMessage(null)

        console.log('check form')
        if (!email || !password) { setErrorMessage('Email et mot de passe obligatoires'); return }


        setDisableButton(true)
        const url = `${BACKEND_URL}/users/signin`
        console.log('POST', url)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json()
        setDisableButton(false)
        if (data.result) {
            console.log('login ok')
            dispatch(setUser(data.data)) 
            navigation.navigate('Map')
        }
        else {
            // console.log(data)
            setErrorMessage('Compte inconnu')
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ height: '1%' }}>

                <View style={styles.imageContainer}>
                    {/* <Image></Image> */}
                    <Text>Image Logo</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>

                    <View style={styles.inputsContainer}>
                        <InputFullSize onChangeText={(value) => setEmail(value)} value={email} placeholder='Email' />
                        <InputFullSize onChangeText={(value) => setPassword(value)} value={password} placeholder='Mot de passe' secureTextEntry={true} />
                    </View>

                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                </View>

                <View style={styles.bottomControls}>
                    <ButtonPrimary onPress={() => handleSubmit()} title='Continuer' disabled={disableButton} />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

import { globalStyle } from '../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        padding: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'space-between',
        paddingTop: 20,
    },
    imageContainer: {
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '400',
    },
    formContainer: {
        padding: globalStyle.padding,
    },
    titleContainer: {
        // backgroundColor:'red',
        width: '100%',
        marginBottom: 10,
    },
    titleText: {
        fontSize: globalStyle.h3,
        textAlign: 'center',
    },
    avatarContainer: {
        backgroundColor: '#cccccc',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: Dimensions.get('window').width * 0.4,
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: '#cccccc',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: Dimensions.get('window').width * 0.4,
        marginTop: 20,
        // marginBottom: 20,
    },
    inputsContainer: {
        // backgroundColor:'#999999',
        width: '100%',
    },
    errorContainer: {
        width: '100%',
        height: 40,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    bottomControls: {
        // backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60',
    },
})
