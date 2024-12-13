import { StyleSheet, Text, TextInput, View, Image, Dimensions, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { BACKEND_URL } from '../../config'
import { setUser } from '../../reducers/user'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import InputFullSize from '../../globalComponents/InputFullSize'
import { userAvatarUrl } from '../../config'


export default function SignUpUserScreen(props) {
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [email, setEmail] = useState(null)
    const [telephone, setTelephone] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableButton, setDisableButton] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const navigation = useNavigation()

    
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        setErrorMessage(null)

        // navigation.navigate('SignUpDog', { firstname: firstname, lastname: lastname, email: email, telephone: telephone, password: password1 })
        // return

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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>On a besoin d'un peu d'infos pour te créer un compte !</Text>
                    </View>

                    <TouchableOpacity style={styles.avatarContainer} onPressIn={() => setOpacity(1)} onPressOut={() => setOpacity(0)}>
                        <Image source={{ uri: userAvatarUrl }} style={styles.avatar} ></Image>
                    </TouchableOpacity>
                    <Text style={[styles.avatarText, { opacity: opacity }]}>Tu pourras ajouter ta photo plus tard</Text>

                    <View style={styles.inputsContainer}>
                        <InputFullSize onChangeText={(value) => setFirstname(value)} value={firstname} placeholder='Prénom' />
                        <InputFullSize onChangeText={(value) => setLastname(value)} value={lastname} placeholder='Nom' />
                        <InputFullSize onChangeText={(value) => setEmail(value)} value={email} placeholder='Email' />
                        <InputFullSize onChangeText={(value) => setTelephone(value)} value={telephone} placeholder='Téléphone' />
                        <InputFullSize onChangeText={(value) => setPassword1(value)} value={password1} placeholder='Mot de passe' secureTextEntry={true} />
                        <InputFullSize onChangeText={(value) => setPassword2(value)} value={password2} placeholder='Confirmer le mot de passe' secureTextEntry={true} />
                    </View>


            </ScrollView>
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
            <View style={styles.bottomControls}>
                <ButtonPrimary onPress={() => handleSubmit()} title='Continuer' disabled={disableButton} />
            </View>

        </SafeAreaView>
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
        paddingTop: 40,
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
        justifyContent:'center',
        alignItems:'center',
    },
    avatar: {
        backgroundColor: '#cccccc',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: Dimensions.get('window').width * 0.4,
        marginTop: 20,
        // marginBottom: 20,
    },
    avatarText: {
        fontSize: globalStyle.h5,
        color: '#999999',
        height: 20,
        textAlign:'center',
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
        justifyContent:'center',
    },
})
