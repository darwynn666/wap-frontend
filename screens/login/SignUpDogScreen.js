import { StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setUser } from '../../reducers/user'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import InputFullSize from '../../globalComponents/InputFullSize'
import { dogAvatarUrl } from '../../config'

import { BACKEND_URL } from '../../config'
// const BACKEND_URL = 'http://10.1.1.56:3000'

export default function SignUpDogScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const { firstname, lastname, email, telephone, password } = route.params
    const [name, setName] = useState()
    const [sex, setSex] = useState('female')
    const [errorMessage, setErrorMessage] = useState()
    const [opacity, setOpacity] = useState(0)
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
                dispatch(setUser(userData)) // a verif
                navigation.navigate('Tuto')
            }
        }

    }




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <Text style={styles.titleText}>Ajoute ton chien</Text>

                <TouchableOpacity style={styles.avatarContainer} onPressIn={() => setOpacity(1)} onPressOut={() => setOpacity(0)}>
                    <Image source={{ uri: dogAvatarUrl }} style={styles.avatar} ></Image>
                </TouchableOpacity>
                <Text style={[styles.avatarText, { opacity: opacity }]}>Tu pourras ajouter sa photo plus tard</Text>

                <View style={styles.inputsContainer}>
                    <Text style={styles.titleText}>Son nom</Text>
                    <InputFullSize onChangeText={(value) => setName(value)} value={name} placeholder='Nom de ton chien' />
                    <Text></Text>
                    <Text></Text>

                    <Text style={styles.titleText}>Son sexe</Text>
                    <View style={styles.sexContainer}>
                        <TouchableOpacity onPress={() => setSex('female')} style={sex === 'female' && styles.dogSelected}>
                            <FontAwesomeIcon icon={faDog} style={styles.dogFemale} size={sex === 'female' ? 70 : 50}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSex('male')} style={sex === 'male' && styles.dogSelected}>
                            <FontAwesomeIcon icon={faDog} style={styles.dogMale} size={sex === 'male' ? 70 : 50}></FontAwesomeIcon>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>

                <View>
                    <Text style={styles.info}>Tu pourras jouter d'autres informations ultérieurement</Text>
                </View>

            </ScrollView>

            <View style={styles.bottomControls}>
                {/* <ButtonPrimary  title='Ajouter un autre chien' /> */}
                <ButtonPrimary onPress={() => handleSubmit(true)} title='Terminer mon inscription' />
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
    // titleContainer: {
    //     // backgroundColor:'red',
    //     width: '100%',
    //     marginBottom: 20,
    // },
    titleText: {
        fontSize: globalStyle.h2,
        textAlign: 'center',
        marginBottom: 10,
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
    sexContainer: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    dogFemale: {
        // backgroundColor: '#ff9999',
        color: '#FFC0CB',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    dogMale: {
        // backgroundColor: '#9999ff',
        color: '#87CEEB',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    dogSelected: {
        // backgroundColor:'#eeeeee',
        borderBottomWidth: 3,
        borderBottomColor: globalStyle.greenPrimary,
    },
    errorContainer: {
        width: '100%',
        height: 40,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    info: {
        textAlign: 'center',
        margin: 10,
    },
    bottomControls: {
        // backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
