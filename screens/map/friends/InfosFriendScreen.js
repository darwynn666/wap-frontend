import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Image, Dimensions, Alert, Button ,BackHandler} from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary';
import { BACKEND_URL, globalStyle } from '../../../config'
import { userAvatarUrl } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faClose, faCircle, faTrash, faBan } from '@fortawesome/free-solid-svg-icons';
import { formatFrenchPhoneNumber } from '../../../config';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFriends } from '../../../reducers/user';

export default function InfosFriendScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    
    const friend = route.params
    console.log(friend)
    
    
    useEffect(() => {
        const backAction = () => { navigation.navigate('Friends'); return true }// handle back button
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => backHandler.remove();
    }, []);
    
    console.log(friend.status)
    let statusText = null
    let statusColor = null
    switch (friend.status) {
        case 'off': statusText = 'Déconnecté'; statusColor = globalStyle.grayPrimary; break
        case 'walk': statusText = 'En ballade'; statusColor = globalStyle.greenPrimary; break
        case 'pause': statusText = 'Dans un établissement'; statusColor = globalStyle.bluePrimary; break
    }

    const isDogSitterColor = (friend.infos.isDogSitter ? globalStyle.greenPrimary : 'salmon')
    const isDogSitterIcon = (friend.infos.isDogSitter ? faCheck : faClose)

    const isSearchingDogSitterColor = (friend.infos.isSearchingDogSitter ? globalStyle.greenPrimary : 'salmon')
    const isSearchingDogSitterIcon = (friend.infos.isSearchingDogSitter ? faCheck : faClose)

    const callNumber = (phoneNumber) => {
        const callUrl = `tel:${phoneNumber}`
        Linking.canOpenURL(callUrl).then((supported) => {
            if (!supported) { Alert.alert('Erreur', 'Ce numéro ne peut pas être composé.') }
            else { return Linking.openURL(callUrl) }
        })
            .catch((err) => console.error(err))
    }
    
    const smsNumber = (phoneNumber) => {
        const smsUrl = `sms:${phoneNumber}`
        Linking.canOpenURL(smsUrl).then((supported) => {
            if (!supported) { Alert.alert('Erreur', 'Ce numéro ne peut pas être composé.') }
            else { return Linking.openURL(smsUrl) }
        })
            .catch((err) => console.error(err))
    }

    const sendEmail = (email) => {
        const emailUrl = `mailto:${email}?subject=${encodeURIComponent('Contact depuis Wap')}`
        Linking.canOpenURL(emailUrl).then((supported) => {
            if (!supported) { Alert.alert('Erreur', 'Impossible d\'ouvrir l\'application d\'email') }
            else { return Linking.openURL(emailUrl) }
        })
            .catch((err) => console.error(err))
    }

    const confirmBlockFriend = () => {
        Alert.alert(`Bloquer ${friend.infos.firstname} ${friend.infos.lastname} ?`, 'Cet ami(e) ne vous verra plus sur la carte et sera retiré de votre liste d\'amis', [
            { text: 'Annuler' },
            { text: 'Bloquer', onPress: () => blockFriend() },
        ])
    }

    const confirmDeleteFriend = () => {
        Alert.alert(`Supprimer ${friend.infos.firstname} ${friend.infos.lastname} ?`, 'Vous ne partaterez plus vos informations tant que vous ne serez pas de nouveau amis.', [
            { text: 'Annuler' },
            { text: 'Supprimer', onPress: () => deleteFriend() },
        ])
    }

    const blockFriend = async () => {
        try {
            const url = `${BACKEND_URL}/friends/${user.token}/block`
            console.log('POST', url)
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendToBlock: friend._id })
            })
            const data = await response.json()
            console.log(data)
            if (data.result) {
                dispatch(setUserFriends(data.userFriends))
                navigation.navigate('Friends')
            }
        }
        catch (error) { console.log(error) }
    }

    const deleteFriend = async () => {
        try {
            const url = `${BACKEND_URL}/friends/${user.token}`
            console.log('DELETE', url)
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendToDelete: friend._id })
            })
            const data = await response.json()
            console.log(data)
            if (data.result) {
                dispatch(setUserFriends(data.userFriends))
                navigation.navigate('Friends')
            }
        }
        catch (error) { console.log(error) }
    }


    return (
        <View style={styles.container}>

            <Text style={styles.name}>{friend.infos.firstname} {friend.infos.lastname}</Text>

            <View style={styles.statusContainer}>
                <FontAwesomeIcon icon={faCircle} size={20} color={statusColor}></FontAwesomeIcon>
                <Text style={styles.statusText}>{statusText}</Text>
            </View>

            <View style={styles.avatarContainer} >
                <Image source={{ uri: friend.infos.photo_public_id ? friend.infos.photo : userAvatarUrl }} style={styles.avatar} ></Image>
            </View>


            <View style={styles.switchContainer}>
                {friend.infos.isDogSitter &&
                    <View style={styles.switchItem}>
                        <FontAwesomeIcon style={styles.iconSwitch} icon={isDogSitterIcon} size={20} color={isDogSitterColor}></FontAwesomeIcon>
                        <Text style={styles.textSwitch}>Cet ami est un  Dogsitter</Text>
                    </View>
                }
                {friend.infos.isSearchingDogSitter &&
                <View style={styles.switchItem}>
                    <FontAwesomeIcon style={styles.iconSwitch} icon={isSearchingDogSitterIcon} size={20} color={isSearchingDogSitterColor}></FontAwesomeIcon>
                    <Text style={styles.textSwitch}>Cet ami recherche un  Dogsitter</Text>
                </View>
                }
            </View >


            <View style={styles.bottomContainer}>
                <View style={styles.greenButtonsContainer}>
                    <ButtonPrimary title='Appeler' onPress={() => callNumber(friend.infos.telephone)} status={true} />
                    <ButtonPrimary title='Envoyer un SMS' onPress={() => smsNumber(friend.infos.telephone)} status={true} />
                    <ButtonPrimary title='Envoyer un email' onPress={() => sendEmail(friend.infos.email)} status={true} />
                </View>
                <View style={styles.redButtonsContainer}>
                    <TouchableOpacity style={styles.bottomIconContainer} onPress={() => confirmBlockFriend(friend._id)}>
                        <FontAwesomeIcon icon={faBan} size={30} style={{ color: 'salmon' }}></FontAwesomeIcon>
                        <Text style={styles.bottomText}>Bloquer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomIconContainer} onPress={() => confirmDeleteFriend(friend._id)}>
                        <FontAwesomeIcon icon={faTrash} size={30} style={{ color: 'salmon' }}></FontAwesomeIcon>
                        <Text style={styles.bottomText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'flex-start'
    },

    name: {
        fontSize: globalStyle.h2,
        marginBottom: 20,
    },

    avatarContainer: {
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        backgroundColor: '#cccccc',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: Dimensions.get('window').width * 0.4,
        // marginTop: 20,
    },

    statusContainer: {
        // backgroundColor: 'yellow',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusText: {
        marginLeft: 10,
        fontSize: globalStyle.h3,
    },

    switchContainer: {
        // backgroundColor: 'yellow',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchItem: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconSwitch: {

    },
    textSwitch: {
        textAlign: 'center',
        marginLeft: 10,
        // fontSize:globalStyle.h3,
    },

    phoneContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    phoneText: {
        fontSize: globalStyle.h3,
        marginLeft: 10,
    },
    phoneButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    emailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: globalStyle.h3,
        marginBottom: 20,
    },
    emailTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    emailText: {
        fontSize: globalStyle.h3,
        marginLeft: 10,
    },

    bottomContainer: {
        width: '100%',
        // flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
        position: 'absolute',
        bottom: 10,
    },
    greenButtonsContainer: {
        width: '100%',
        height: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    redButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bottomIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        fontSize: globalStyle.h4,
        color: '#999999',
    },





    image: {
        height: "100",
        width: "100",
        borderRadius: 50,
        marginBottom: 60,
    },



    containericons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        marginTop: 60,
    },

})
