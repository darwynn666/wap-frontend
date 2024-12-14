import { StyleSheet, Text, TextInput, View, Platform, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'
import { useSelector, useDispatch } from 'react-redux';
import { dogAvatarUrl } from '../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faDog, faHourglass2 } from '@fortawesome/free-solid-svg-icons'
import InputFullSize from '../../../globalComponents/InputFullSize';
import { setUserDogs } from '../../../reducers/user';


import { BACKEND_URL } from '../../../config'


export default function EditDogScreen() {
    const route = useRoute();
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value); // Pour un éventuel usage
    console.log(route.params)
    // Initialisation des états avec les paramètres passés
    const { name, sex, race, birthday, chipid, _id } = route.params;
    const [dogName, setDogName] = useState(name || '');
    const [dogSex, setDogSex] = useState(sex || 'female');
    const [dogRace, setDogRace] = useState(race || '');
    const [dogBirthday, setDogBirthday] = useState(birthday || '');
    const [dogChipid, setDogChipid] = useState(chipid || '');
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableButton, setDisableButton] = useState(false)


    // Fonction pour mettre à jour la photo (à implémenter)
    const uploadphoto = () => {
        console.log('Upload photo');
    };

    // Gestion de la soumission
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
            { text: 'Cancel' },
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
            if(data.userDogs) {
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


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <Text style={styles.title}>{route.params.name}</Text>
            <TouchableOpacity style={styles.avatarContainer} >
                <Image source={{ uri: dogAvatarUrl }} style={styles.avatar} ></Image>
                <FontAwesomeIcon icon={faPen} color={globalStyle.greenPrimary} size={20} style={styles.icon}></FontAwesomeIcon>
            </TouchableOpacity>

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
        height:80,
        alignItems: 'center',
        justifyContent: 'space-around',
    },


})


