import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Button, Platform, Image, KeyboardAvoidingView, ScrollView, Dimensions, Modal } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { globalStyle } from '../../../config'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'
import InputFullSize from '../../../globalComponents/InputFullSize';
import { userAvatarUrl } from '../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons'
import { setUserInfos } from '../../../reducers/user'
import * as ImagePicker from 'expo-image-picker';

import { BACKEND_URL } from '../../../config'


export default function UserScreen(props) {
    const user = useSelector(state => state.user.value)
    const navigation = useNavigation()
    const route = useRoute()
    const [isDogSitter, setIsDogSitter] = useState(false)
    const [isSearchingDogSitter, setIsSearchingDogSitter] = useState(false)
    const [firstname, setFirstname] = useState(user.infos.firstname)
    const [lastname, setLastname] = useState(user.infos.lastname)
    const [email, setEmail] = useState(user.infos.email)
    const [telephone, setTelephone] = useState(user.infos.telephone)
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableButton, setDisableButton] = useState(false)
    const [modalVisible, setModalVisible] = useState()


    const uploadphoto = () => {
        console.log(uploadphoto)
    }

    const dispatch = useDispatch()
    const handleSubmit = async () => {
        setErrorMessage(null)

        console.log('check form')
        if (!firstname || !lastname) { setErrorMessage('Nom et prénom obligatoires'); return }
        const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')
        if (!email || !emailPattern.test(email)) { setErrorMessage('Email invalide'); return }
        const telPattern = new RegExp(/^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/, 'g')
        if (!telephone || !telPattern.test(telephone)) { setErrorMessage('Numéro de téléphone invalide'); return }
        if (password1 && password1.length < 8) { setErrorMessage('Mot de passe trop court'); return }
        if (password1 !== password2) { setErrorMessage('Mots de passe différents'); return }
        console.log('form ok')

        try {
            const url = `${BACKEND_URL}/users/${user.token}`
            console.log('PUT', url)
            setDisableButton(true)
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, telephone, email, isDogSitter, isSearchingDogSitter, password: password1 })
            })
            const data = await response.json()
            setDisableButton(false)
            console.log('data', data)
            if (data) {
                setErrorMessage('Modifications enregistrées')
                dispatch(setUserInfos({ firstname, lastname, telephone, email, isDogSitter, isSearchingDogSitter }))
            }
        }
        catch (error) {
            console.log(error)
            setDisableButton(false)
            setErrorMessage('Erreur lors de l\'enregistrement des modifications')
        }

    }

    const openCamera = async () => {
        console.log('open camera')
        try {

            const result = await launchCamera({ mediaType: 'photo' }, (response) => { console.log('photo', response) })
        }
        catch (error) { console.log(error) }
    }


    const getFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) { setImage(result.assets[0].uri) }
    }

    const getFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) { setImage(result.assets[0].uri) }
    }

    //   return (
    //     <View style={styles.container}>
    //       <Button title="Pick an image from camera roll" onPress={pickImage} />
    //       {image && <Image source={{ uri: image }} style={styles.image} />}
    //     </View>
    //   );


    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => getFromCamera()}>
                        <FontAwesomeIcon icon={faCamera} color={globalStyle.greenPrimary} size={40}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getFromGallery()}>
                        <FontAwesomeIcon icon={faFileImage} color={globalStyle.greenPrimary} size={40}></FontAwesomeIcon>
                    </TouchableOpacity>

                </View>
            </Modal>

            <TouchableOpacity style={styles.avatarContainer} >
                <Image source={{ uri: userAvatarUrl }} style={styles.avatar} ></Image>
                <FontAwesomeIcon icon={faPen} color={globalStyle.greenPrimary} size={20} style={styles.icon}></FontAwesomeIcon>
            </TouchableOpacity>

            <View style={styles.buttonsAvatarContainer}>


            </View>

            <View style={styles.inputContainer}>
                <InputFullSize onChangeText={(value) => setFirstname(value)} value={firstname} placeholder='Prénom' />
                <InputFullSize onChangeText={(value) => setLastname(value)} value={lastname} placeholder='Nom' />
                <InputFullSize onChangeText={(value) => setEmail(value)} value={email} placeholder='Email' />
                <InputFullSize onChangeText={(value) => setTelephone(value)} value={telephone} placeholder='Email' />
                <InputFullSize onChangeText={(value) => setPassword1(value)} value={password1} placeholder='Nouveau mot de passe' secureTextEntry={true} />
                <InputFullSize onChangeText={(value) => setPassword2(value)} value={password2} placeholder='Confirmer le mot de passe' secureTextEntry={true} />
            </View >

            <View style={styles.switchsContainer}>
                <View style={styles.switchContainer}>
                    <Switch style={styles.switch} trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={globalStyle.greenPrimary} onValueChange={value => setIsDogSitter(value)} value={isDogSitter} />
                    <Text style={styles.textswitch}>Je suis un Dogsitter</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Switch style={styles.switch} trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={globalStyle.greenPrimary} onValueChange={value => setIsSearchingDogSitter(value)} value={isSearchingDogSitter} />
                    <Text style={styles.textswitch}>Je cherche un Dogsitter</Text>
                </View>
            </View>

            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>

            <View style={styles.bottomControls}>
                <ButtonPrimary onPress={() => handleSubmit()} title='Enregistrer' disabled={disableButton} />
            </View>

        </KeyboardAvoidingView>

    )
}

//import { normalizeColor } from 'react-native-reanimated/lib/typescript/Colors'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        padding: globalStyle.padding
    },

    buttonsAvatarContainer: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // margin:10,
    },

    inputContainer: {
        width: '100%',
    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black',

    },

    avatarContainer: {
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#cccccc',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: Dimensions.get('window').width * 0.4,
        // marginTop: 20,
        // marginBottom: 20,
    },
    icon: {
        marginLeft: '40%',
        marginTop: -20,
    },

    switchsContainer: {
        width: '100%',
    },
    switchContainer: {
        // backgroundColor: 'yellow',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textswitch: {
        width: 'auto'
        // textAlign: 'center',
    },
    switch: {
        width: '30%',
    },
    errorContainer: {
        width: '100%',
        height: 40,
    },
    errorText: {
        color: '#cccccc',
        textAlign: 'center',
    },

    bottomControls: {
        // backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

})
