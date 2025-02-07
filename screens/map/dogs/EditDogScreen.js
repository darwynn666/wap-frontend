import { StyleSheet, Text, TextInput, View, Platform, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, Dimensions, Alert, Modal ,BackHandler} from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'
import { useSelector, useDispatch } from 'react-redux';
import { dogAvatarUrl } from '../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faDog, faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons'
import InputFullSize from '../../../globalComponents/InputFullSize';
import { setUserDogs } from '../../../reducers/user';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { BACKEND_URL } from '../../../config'




export default function EditDogScreen() {
    const route = useRoute();
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value); // Pour un éventuel usage
    console.log('params', route.params)
    // Initialisation des états avec les paramètres passés
    const { name, sex, race, birthday, chipid, _id, photo } = route.params;
    const [dogName, setDogName] = useState(name || '');
    const [dogSex, setDogSex] = useState(sex || 'female');
    const [dogRace, setDogRace] = useState(race || '');
    const [dogBirthday, setDogBirthday] = useState(birthday || '');
    const [dogChipid, setDogChipid] = useState(chipid || '');
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableButton, setDisableButton] = useState(false)
    const [dogPhoto, setDogPhoto] = useState(photo ? photo : dogAvatarUrl)
    const [modalVisible, setModalVisible] = useState(false)


    useEffect(() => { 
        const backAction = () => { navigation.navigate('Dogs'); return true }// handle back button 
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => backHandler.remove();
    }, []);




    const handleSubmit = async () => {
        setErrorMessage(null)

        console.log('check form')
        if (!dogName) { setErrorMessage('Nom obligatoire'); return }

        // update dog infos
        try {
            const url = `${BACKEND_URL}/dogs/${user.token}`
            console.log('PUT', url)
            setDisableButton(true)
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: _id, name: dogName, sex: dogSex, race: dogRace, birthday: dogBirthday, chipid: dogChipid })
            })
            const data = await response.json()
            setDisableButton(false)
            console.log('data.dog', data.dog)
            if (data.result) {
                setErrorMessage('Modifications enregistrées')
                dispatch(setUserDogs(user.dogs))
                navigation.navigate('Dogs', { reload: true })
            }
            else {
                setErrorMessage(data.error)
            }
        }
        catch (error) {
            console.log(error)
            setDisableButton(false)
            setErrorMessage('Erreur lors de l\'enregistrement des modifications')
        }
    }

    const confirmDeleteDog = () => {
        Alert.alert('Supprimer ' + route.params.name + ' ?', 'Cette action est irreversible', [
            { text: 'Annuler' },
            { text: 'OK', onPress: () => deleteDog() },
        ])
    }

    const deleteDog = async () => {
        setErrorMessage(null)
        setDisableButton(true)
        try {
            const url = `${BACKEND_URL}/dogs/${user.token}`
            console.log('DELETE', url)
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: _id })
            })
            const data = await response.json()
            console.log(data)
            if (data.userDogs) {
                setErrorMessage('Chien supprimé')
                dispatch(setUserDogs(user.dogs))
                navigation.navigate('Dogs', { reload: true })
            }
            else {

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

            setDogPhoto(resizedImage.uri)
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
            const url = `${BACKEND_URL}/dogs/${_id}/photo`
            console.log('PUT', url)
            const response = await fetch(url, {
                method: 'PUT',
                body: formData
            })
            const data = await response.json()
            // console.log(data)
        }
        catch (error) { console.log(error) }
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <Text style={styles.title}>{route.params.name}</Text>
            <TouchableOpacity style={styles.avatarContainer} onPress={() => setModalVisible(true)} >
                <Image source={{ uri: dogPhoto }} style={styles.avatar} ></Image>
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
                <InputFullSize onChangeText={(value) => setDogName(value)} value={dogName} placeholder='Son nom' />
                <InputFullSize onChangeText={(value) => setDogRace(value)} value={dogRace} placeholder='Sa race' />
                <InputFullSize onChangeText={(value) => setDogBirthday(value)} value={dogBirthday} placeholder='Son anniversaire' />
                <InputFullSize onChangeText={(value) => setDogChipid(value)} value={dogChipid} placeholder='Son numéro de puce' />
                <View style={styles.sexContainer}>
                    <TouchableOpacity onPress={() => setDogSex('female')} style={dogSex === 'female' && styles.dogSelected}>
                        <FontAwesomeIcon icon={faDog} style={styles.dogFemale} size={dogSex === 'female' ? 70 : 50}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDogSex('male')} style={dogSex === 'male' && styles.dogSelected}>
                        <FontAwesomeIcon icon={faDog} style={styles.dogMale} size={dogSex === 'male' ? 70 : 50}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>

            <View style={styles.bottomControls}>
                <ButtonPrimary onPress={() => handleSubmit()} title='Enregistrer' disabled={disableButton} />
                <ButtonSecondary onPress={() => confirmDeleteDog()} title='Supprimer' status={false} />
            </View>
        </KeyboardAvoidingView>
    );
}


import { globalStyle } from '../../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: globalStyle.padding,
        // paddingTop: 20,
    },
    title: {
        fontSize: globalStyle.h2,
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

    icon: {
        marginLeft: '40%',
        marginTop: -20,
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
        color: '#cccccc',
        textAlign: 'center',
    },

    bottomControls: {
        // backgroundColor: 'yellow',
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
    },


})


