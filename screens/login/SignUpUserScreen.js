import { StyleSheet, Text, TextInput, View, Image, Dimensions, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import { BACKEND_URL } from '../../config'
import { setUser } from '../../reducers/user'


export default function SignUpUserScreen(props) {
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [email, setEmail] = useState(null)
    const [telephone, setTelephone] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableButton, setDisableButton] = useState(false)
    const navigation = useNavigation()

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        setErrorMessage(null)

        console.log('check form')
        if (!firstname || !lastname) { setErrorMessage('Nom et prénom obligatoires'); return }
        const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')
        if (!email || !emailPattern.test(email)) { setErrorMessage('Email invalide'); return }
        else {
            setDisableButton(true)
            const response = await fetch(`${BACKEND_URL}/users/checkmail`, { // check if email exists
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
            const data = await response.json()
            setDisableButton(false)
            if (data.result) {
                setErrorMessage('Cet email existe déjà, essayez de vous connecter');
                navigation.navigate('SignIn', { email: email, message: 'Un compte associé à cet email existe déjà. Connectez-vous' }) // go to signin screen
                return
            }
        }
        const telPattern = new RegExp(/^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/, 'g')
        if (!telephone || !telPattern.test(telephone)) { setErrorMessage('Numéro de téléphone invalide : +33...'); return }
        if (!password1 || !password2) { setErrorMessage('Mot de passe obligatoire'); return }
        if (password1.length < 8) { setErrorMessage('Mot de passe trop court'); return }
        if (password1 !== password2) { setErrorMessage('Mots de passe différents'); return }

        console.log('form ok')
        navigation.navigate('SignUpDog', { firstname: firstname, lastname: lastname, email: email, telephone: telephone, password: password1 })
    }


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>On a besoin d'un peu d'infos pour te créer un compte !</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <ImageBackground source={require('../../assets/avatar.jpg')} resizeMode="cover"></ImageBackground>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} placeholder='Prénom'></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setLastname(value)} value={lastname} style={styles.input} placeholder='Nom'></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setEmail(value)} value={email} style={styles.input} placeholder='Email'></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setTelephone(value)} value={telephone} style={styles.input} placeholder='Tél portable'></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setPassword1(value)} value={password1} style={styles.input} placeholder='Mot de passe (> 8 car)' secureTextEntry={true}></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(value) => setPassword2(value)} value={password2} style={styles.input} placeholder='Confirmer le mot de passe' secureTextEntry={true}></TextInput>
                    </View>
                </View>

                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>

                <View style={styles.bottomControls}>
                    <ButtonPrimary onPress={() => handleSubmit()} title='Continuer' disabled={disableButton}/>
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
