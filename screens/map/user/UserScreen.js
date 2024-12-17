import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Button, Platform, Image, KeyboardAvoidingView, ScrollView, Dimensions, Modal, BackHandler, Alert } from 'react-native'
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
import { setUserInfos, setUserInfosPhoto } from '../../../reducers/user'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


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
    const [modalVisible, setModalVisible] = useState(false)
    const [photo, setPhoto] = useState(user.infos.photo ? user.infos.photo : userAvatarUrl)
    const dispatch = useDispatch()



    useEffect(() => {
        // const backAction = () => { navigation.navigate('_Map'); return true } // handle back button : go back to map
        // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
        // return () => backHandler.remove();
    }, []);
    




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
                navigation.navigate('_Map')
            }
        }
        catch (error) {
            console.log(error)
            setDisableButton(false)
            setErrorMessage('Erreur lors de l\'enregistrement des modifications')
        }

    }

    // update photo
    const pickPhoto = async (source) => {
        let result = null
        if (source === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                quality: 0.8,
                // cameraType: 'front', // fix this !
            })
        }
        if (source === 'image') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 0.8,
            })
        }
        if (!result) return
        // console.log(result);
        if (!result.canceled) {
            const originalUri = result.assets[0].uri
            const resizedImage = await ImageManipulator.manipulateAsync( // { uri, width, height }
                originalUri,
                [{ resize: { width: 500 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );
            console.log('Image redimensionnée :', resizedImage)

            setPhoto(resizedImage.uri)
            uploadPhoto(resizedImage.uri)
        }
        setModalVisible(false)
    }

    const uploadPhoto = async (photo) => {
        console.log(photo)
        const formData = new FormData()
        formData.append('photo', {
            uri: photo,
            name: 'photo.jpg',
            type: 'image/jpeg',
        })
        try {
            const url = `${BACKEND_URL}/users/${user.token}/photo`
            console.log('PUT', url)
            const response = await fetch(url, {
                method: 'PUT',
                body: formData
            })
            const data = await response.json()
            console.log(data)
            if (data.result) {
                setErrorMessage('Photo enregistrée')
                dispatch(setUserInfosPhoto({ photo: data.data.infos.photo, photo_public_id: data.data.infos.photo_public_id }))
            }
            else { setErrorMessage('Photo non enregistrée') }
        }
        catch (error) { console.log('upload error', error) }
    }

    // console.log('local photo', photo)
    return (
        <ScrollView>

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


                <TouchableOpacity style={styles.avatarContainer} onPress={() => setModalVisible(true)}>
                    <Image source={{ uri: photo }} style={styles.avatar} ></Image>
                    <FontAwesomeIcon icon={faPen} color={globalStyle.greenPrimary} size={20} style={styles.icon}></FontAwesomeIcon>
                </TouchableOpacity>

                <Modal visible={modalVisible} transparent={true} style={{ flex: 1 }}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Choisissez une image à importer</Text>
                        <View style={styles.buttonsAvatarContainer}>
                            <TouchableOpacity onPress={() => pickPhoto('camera')}>
                                <FontAwesomeIcon icon={faCamera} color={globalStyle.greenPrimary} size={40}></FontAwesomeIcon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => pickPhoto('image')}>
                                <FontAwesomeIcon icon={faFileImage} color={globalStyle.greenPrimary} size={40}></FontAwesomeIcon>
                            </TouchableOpacity>
                        </View>
                        <ButtonSecondary title='Annuler' onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>


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
        </ScrollView>

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
    modalContainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsAvatarContainer: {
        // backgroundColor: 'yellow',
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        margin: 20,
        // height: 200,
        // top: Dimensions.get('window').width * 0.2,
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
