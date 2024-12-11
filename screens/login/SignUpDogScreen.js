import { StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import { setUser } from '../../reducers/user'

// import { BACKEND_URL } from '../../config'
const BACKEND_URL = 'http://10.1.1.56:3000'

export default function SignUpDogScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const { firstname, lastname, email, telephone, password } = route.params
    const [name, setName] = useState()
    const [sex, setSex] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const dispatch = useDispatch()
    console.log('route params', route.params)


    const handleSubmit = async () => {
        setErrorMessage(null)

        // console.log(name, sex)
        if (!name || !sex) { setErrorMessage('Nom et sexe obligatoires'); return }

        const urlDogs = BACKEND_URL + '/dogs'
        console.log('fetch', urlDogs)
        const dogRes = await fetch(urlDogs, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, sex: sex })
        })
        const dogData = await dogRes.json()
        console.log('newDog', dogData)

        if (dogData.result) {
            const dogId = dogData.data._id
            const newUser = { firstname: firstname, lastname: lastname, email: email, telephone: telephone, password: password, dogs: [dogId] }
            const urlUser = BACKEND_URL + '/users/signup'
            console.log('fetch', urlUser)
            const userRes = await fetch(urlUser, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })
            const userData = await userRes.json()
            console.log('newUser', userData)
            if (userData.result) {
                dispatch(setUser({ ...newUser, token: userData.token }))
                navigation.navigate('Tuto')
            }
        }

    }


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Ajoute ton chien</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <ImageBackground source={require('../../assets/avatar.jpg')} resizeMode="cover"></ImageBackground>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.titleText}>Son nom</Text>
                        <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.input} placeholder='Nom de ton chien'></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.titleText}>Son sexe</Text>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity onPress={() => setSex('female')} style={[styles.optionFemale, sex === 'female' && styles.optionSelected]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setSex('male')} style={[styles.optionMale, sex === 'male' && styles.optionSelected]}></TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>

                <View>
                    <Text style={styles.info}>Tu pourras jouter d'autres informations ultérieurement</Text>
                </View>

                <View style={styles.bottomControls}>
                    {/* <ButtonPrimary  title='Ajouter un autre chien' /> */}
                    <ButtonPrimary onPress={() => handleSubmit(true)} title='Terminer mon inscription' />
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
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        marginBottom: 5,
    },
    optionsContainer: {
        // backgroundColor:'yellow',
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    optionFemale: {
        backgroundColor: '#ff9999',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    optionMale: {
        backgroundColor: '#9999ff',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    optionSelected: {
        borderWidth: 3,
        borderColor: '#333333',
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
    info: {
        textAlign: 'center',
        margin: 10,
    },
    bottomControls: {
        // backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
    },
})
