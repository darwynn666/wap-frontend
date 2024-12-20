import { StyleSheet, Text, TextInput, View, Button, Image, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'
import InputFullSize from '../../../globalComponents/InputFullSize'
import { BACKEND_URL, globalStyle } from '../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { setTriggerNewPlace } from '../../../reducers/newplace'

export default function FillPlaceInfosScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const [modalVisible, setModalVisible] = useState(false)
    const [placePhoto, setPlacePhoto] = useState(null)
    const [description, setDescription] = useState(null)
    const dispatch = useDispatch()
    const [disableButton, setDisableButton] = useState(false)

    console.log(route.params)

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

            setPlacePhoto(resizedImage.uri)
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

        const url = `${BACKEND_URL}/places/${route.params._id}/photo` 
        console.log('PUT', url)
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: formData
            })
            const data = await response.json()
            console.log(data)
        }
        catch (error) { console.log('front error', error) }
    }

    const updatePlace = async () => {
        setDisableButton(true)
        const url = `${BACKEND_URL}/places/${route.params._id}/step2`
        console.log('PUT', url)
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        })
        const data = await response.json()
        setDisableButton(false)
        if (data.result) {
            console.log('dispatch and navigate')
            dispatch(setTriggerNewPlace(true))
            navigation.navigate('_Map', { screen: 'Map' })
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.placeName}>{route.params.name}</Text>

            <TouchableOpacity style={styles.avatarContainer} onPress={() => setModalVisible(true)} >
                <Image source={{ uri: placePhoto }} style={styles.avatar} ></Image>
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

            <Text>Vous pouvez ajouter une photo et une courte description du lieu</Text>

            <View style={styles.inputContainer}>
                <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.placeDescription} multiline={true} numberOfLines={5} placeholder='Quelques mots sur ce lieu' />
            </View>

            <View style={styles.bottomControls}>
                <ButtonPrimary title='Terminer' onPress={() => updatePlace()} disabled={disableButton} />
                <ButtonPrimary title='Plus tard' />
            </View>

        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: globalStyle.padding,
    },
    placeName: {
        fontSize: globalStyle.h1,
        padding: 20,
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

    inputContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        padding: 10,
    },
    placeDescription: {

    },
    bottomControls: {
        // backgroundColor:'yellow',
        width: '100%',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
})
