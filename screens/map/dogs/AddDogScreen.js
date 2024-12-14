import { StyleSheet, Text, TextInput, View, Platform, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import { globalStyle } from '../../../config'
import { dogAvatarUrl } from '../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faDog } from '@fortawesome/free-solid-svg-icons'
import InputFullSize from '../../../globalComponents/InputFullSize';
import { setUserDogs } from '../../../reducers/user';

// import { BACKEND_URL } from '../../../config'
const BACKEND_URL = 'http://192.168.1.147:3000'


export default function AddDogScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(state => state.user.value)
    const dispatch=useDispatch()
    const [name, setName] = useState('');
    const [sex, setSex] = useState('female');
    const [race, setRace] = useState('');
    const [birthday, setBirthday] = useState('');
    const [chipid, setChipid] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableButton, setDisableButton] = useState(false)

    const uploadphoto = () => {
        console.log(uploadphoto)
    }


    const handleSubmit = async () => {
        setErrorMessage(null)

        console.log('check form')
        if (!name) { setErrorMessage('Nom obligatoire'); return }

        // update dog infos
        try {
            const dogUrl = `${BACKEND_URL}/dogs`
            console.log('POST', dogUrl)
            setDisableButton(true)
            const dogRes = await fetch(dogUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, sex })
            })
            const dogData = await dogRes.json()
            console.log('dogData', dogData.data)

            if (dogData.result) {
                // update user dog list bdd
                const userUrl = `${BACKEND_URL}/users/${user.token}/newdog`
                console.log('PUT', userUrl)
                const userRes = await fetch(userUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ dogId: dogData.data._id })
                })
                const userData = await userRes.json()
                console.log('userDogs', userData.data)
                if (userData.result) {
                    // update user reducer
                    dispatch(setUserDogs(userData.data))
                    navigation.navigate('Dogs',{refresh:true})
                }



                setErrorMessage('Modifications enregistrées')
                setDisableButton(false)
                // dispatch(setUserInfos({ firstname, lastname, telephone, email, isDogSitter, isSearchingDogSitter }))
            }
            else {
                setErrorMessage(dogData.error)
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
            <Text style={styles.title}>Ajouter un chien</Text>
            <TouchableOpacity style={styles.avatarContainer} >
                <Image source={{ uri: dogAvatarUrl }} style={styles.avatar} ></Image>
                <FontAwesomeIcon icon={faPen} color={globalStyle.greenPrimary} size={20} style={styles.icon}></FontAwesomeIcon>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <InputFullSize onChangeText={(value) => setName(value)} value={name} placeholder='Son nom' />
                <View style={styles.sexContainer}>
                    <TouchableOpacity onPress={() => setSex('female')} style={sex === 'female' && styles.dogSelected}>
                        <FontAwesomeIcon icon={faDog} style={styles.dogFemale} size={sex === 'female' ? 70 : 50}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSex('male')} style={sex === 'male' && styles.dogSelected}>
                        <FontAwesomeIcon icon={faDog} style={styles.dogMale} size={sex === 'male' ? 70 : 50}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
                <InputFullSize onChangeText={(value) => setRace(value)} value={race} placeholder='Sa race' />
                <InputFullSize onChangeText={(value) => setBirthday(value)} value={birthday} placeholder='Son anniversaire' />
                <InputFullSize onChangeText={(value) => setChipid(value)} value={chipid} placeholder='Son numéro de puce' />

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

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: globalStyle.padding,
        paddingTop: 40,
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
        alignItems: 'center',
        justifyContent: 'center',
    },


})
