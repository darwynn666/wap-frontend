import { StyleSheet, Text, TextInput, View, Image, Dimensions, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import { BACKEND_URL } from '../../config'
import { setUser } from '../../reducers/user'


export default function SignIn(props) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [title,setTitle]=useState()
    const navigation = useNavigation()
    const route = useRoute()

    console.log(route.params)

    useEffect(()=>{
        if(route.params) {
            setTitle(route.params.message)
            setEmail(route.params.email)
        }
        else {
            setTitle('Connecte-toi')
        }
    },[])

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        setErrorMessage(null)

        console.log('check form')
        if (!email || !password) { setErrorMessage('Email et mot de passe obligatoires'); return }


        console.log('fetch login')
        const response = await fetch(`${BACKEND_URL}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json()
        if (data.result) {
            console.log('login ok')
            dispatch(setUser(data)) // à verifier
            navigation.navigate('Map')
        }
        else {
            setErrorMessage('Cet email n\'existe pas')
        }
    }


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <ImageBackground source={require('../../assets/avatar.jpg')} resizeMode="cover"></ImageBackground>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setEmail(value)} value={email} style={styles.input} placeholder='Email'></TextInput>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setPassword(value)} value={password} style={styles.input} placeholder='Mot de passe (> 8 car)' secureTextEntry={true}></TextInput>
                    </View>
                </View>

                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>

                <View style={styles.bottomControls}>
                    <ButtonPrimary onPress={() => handleSubmit()} title='Continuer' />
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

import { globalStyle } from '../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        padding: globalStyle.padding,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
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
    avatar: {},
    inputsContainer: {
        // backgroundColor:'#999999',
        width: '100%',
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        marginBottom: 5,
    },
    errorContainer: {
        width: '100%',
        height: 40,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    input: {},
    bottomControls: {
        // backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
    },
})
