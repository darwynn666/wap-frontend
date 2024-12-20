import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions, SafeAreaView, Alert, BackHandler } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'
import { BACKEND_URL, globalStyle } from '../../../config'
import { useSelector, useDispatch } from 'react-redux';
import { userAvatarUrl } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { setUserFriends } from '../../../reducers/user';


export default function FriendsScreen(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const navigation = useNavigation()
    const route = useRoute()

    const [friends, setFriends] = useState([])
    const [friendsIncoming, setFriendsIncoming] = useState([])
    const [friendsOutcoming, setFriendsOutcoming] = useState([])
    const [usersBlocked, setUsersBlocked] = useState([])


    const fetchAllFriends = async () => { // get all friends
        const fetchFriends = async (friendIds) => {
            // console.log('ids', friendIds)
            return await Promise.all(
                friendIds.map(async _id => {
                    // console.log('fetch',_id)
                    const response = await fetch(`${BACKEND_URL}/users/${_id}`)
                    const data = await response.json()
                    return data.data
                })
            )
        }
        setFriends(await fetchFriends(user.friends.accepted))
        setFriendsIncoming(await fetchFriends(user.friends.incoming))
        setFriendsOutcoming(await fetchFriends(user.friends.outcoming))
        setUsersBlocked(await fetchFriends(user.friends.blocked))
    }
    console.log(user.friends)
    console.log('friends', friendsOutcoming)

    useEffect(() => {
        fetchAllFriends() // load
        const backAction = () => { navigation.navigate('_Map'); return true }// handle back button
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => backHandler.remove();
    }, []);


    useEffect(() => { // reload
        fetchAllFriends()
    }, [user])




    const friendsCards = friends.map((friend, i) => {
        let statusColor = null
        switch (friend.status) {
            case 'off': statusColor = globalStyle.grayLight; break
            case 'walk': statusColor = globalStyle.greenPrimary; break
            case 'pause': statusColor = globalStyle.bluePrimary; break
        }
        return (
            <TouchableOpacity key={i} style={styles.friendContainer} onPress={() => navigation.navigate('InfosFriend', { ...friend })}>
                <Image style={[styles.friendAvatar, { borderColor: statusColor }]} source={{ uri: friend.infos.photo_public_id ? friend.infos.photo : userAvatarUrl }} />
                <Text style={styles.friendName} >{friend.infos.firstname} </Text>
                <Text style={styles.friendName} >{friend.infos.lastname}</Text>
                {/* <FontAwesomeIcon icon={faCircle} size={15} style={{ borderColor: statusColor }}></FontAwesomeIcon> */}
            </TouchableOpacity >
        )

    })

    const friendsIncomingCards = friendsIncoming.map((friend, i) => {
        return (
            <View key={i} style={styles.friendIncomingContainer} >
                <Image style={styles.friendIncomingAvatar} source={{ uri: friend.infos.photo_public_id ? friend.infos.photo : userAvatarUrl }} />
                <Text style={styles.friendIncomingName} >{friend.infos.firstname} {friend.infos.lastname}</Text>
                <View>
                    <ButtonSecondary title='Accepter' status={true} onPress={() => confirmAcceptIncomingFriend(friend._id, friend.infos.firstname)} />
                    <ButtonSecondary title='Refuser' status={false} onPress={() => confirmRefuseIncomingFriend(friend._id, friend.infos.firstname)} />
                </View>
            </View>
        )

    })

    const friendsOutComingCards = friendsOutcoming.map((friend, i) => {
        return (
            <View key={i} style={styles.friendOutcomingContainer} >
                <Image style={styles.friendOutcomingAvatar} source={{ uri: friend.infos.photo_public_id ? friend.infos.photo : userAvatarUrl }} />
                <Text style={styles.friendOutcomingName} >{friend.infos.firstname} {friend.infos.lastname}</Text>
                <ButtonSecondary title='Annuler' status={true} onPress={() => confirmCancelOutcomingFriend(friend._id, friend.infos.firstname)} />
            </View>
        )

    })

    const usersBlockedCards = usersBlocked.map((friend, i) => {
        return (
            <View key={i} style={styles.userBlockedContainer} >
                <Image style={styles.usersBlockedAvatar} source={{ uri: friend.infos.photo_public_id ? friend.infos.photo : userAvatarUrl }} />
                <Text style={styles.usersBlockedName} >{friend.infos.firstname} {friend.infos.lastname}</Text>
                <ButtonSecondary title='Annuler' status={true} onPress={() => confirmCancelBlockFriend(friend._id, friend.infos.firstname)} />
            </View>
        )
    })


    // incoming
    const confirmAcceptIncomingFriend = (_id, firstname) => {
        Alert.alert(`Accepter ${firstname} ?`, 'Vous pourrez partager vos informations et vous voir sur la carte', [
            { text: 'Annuler' },
            { text: 'Accepter', onPress: () => handleIncomingFriend(_id, true) },
        ])
    }

    const confirmRefuseIncomingFriend = (_id, firstname) => {
        Alert.alert(`Refuser ${firstname} ?`, 'Cette personne pourra toujours vous envoyer une autre invitation', [
            { text: 'Annuler' },
            { text: 'Refuser', onPress: () => handleIncomingFriend(_id, false) },
        ])
    }

    const handleIncomingFriend = async (_id, accept) => {
        try {
            const url = `${BACKEND_URL}/friends/${user.token}/incoming`
            console.log('PUT', url)
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendFrom: _id, accept })
            })
            const data = await response.json()
            console.log(data)
            if (data.result) {
                dispatch(setUserFriends(data.userFromFriends))
                navigation.navigate('Friends')
            }
        }
        catch (error) { console.log(error) }
    }

    // outcoming
    const confirmCancelOutcomingFriend = (_id, firstname) => {
        Alert.alert(`Annuler l\'invitation à ${firstname} ?`, 'Vous pourrez toujours lui envoyer une invitation plus tard', [
            { text: 'Non' },
            { text: 'Oui', onPress: () => handleOutcomingFriend(_id, false) },
        ])
    }

    const handleOutcomingFriend = async (_id) => {
        try {
            const url = `${BACKEND_URL}/friends/${user.token}/outcoming`
            console.log('DELETE', url)
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendTo: _id })
            })
            const data = await response.json()
            console.log(data)
            if (data.result) {
                dispatch(setUserFriends(data.userFromFriends))
                navigation.navigate('Friends')
            }
        }
        catch (error) { console.log(error) }
    }

    // blocked
    const confirmCancelBlockFriend = (_id, firstname) => {
        Alert.alert(`Débloquer ${firstname} ?`, 'Cette personne pourra de nouveau vous envoyer une invitation', [
            { text: 'Annuler' },
            { text: 'Débloquer', onPress: () => handleCancelBlockFriend(_id, false) },
        ])
    }

    const handleCancelBlockFriend = async (_id) => {
        try {
            const url = `${BACKEND_URL}/friends/${user.token}/block`
            console.log('DELETE', url)
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendToUnBlock: _id })
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
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.container}>

                        <Text style={styles.textDefaut}>Tu peux acceder à des informations détaillées sur la carte lorsque tes amis sont en ballade</Text>

                        <Text style={styles.title}>Mes amis</Text>

                        <View style={styles.friendsContainer}>
                            {friendsCards.length ? friendsCards : <Text style={styles.textDefaut}>Vous n'avez envoyé aucune demande</Text>}
                        </View>

                        <Text style={styles.title}>Demandes en attente</Text>
                        <View style={styles.friendsIncomingContainer}>
                            {friendsIncomingCards.length ? friendsIncomingCards : <Text style={styles.textDefaut}>Vous n'avez envoyé aucune demande</Text>}
                        </View>

                        <Text style={styles.title}>Demandes envoyées</Text>
                        <View style={styles.friendsOutcomingContainer}>
                            {friendsOutComingCards.length ? friendsOutComingCards : <Text style={styles.textDefaut}>Vous n'avez envoyé aucune demande</Text>}
                        </View>

                        <Text style={styles.title}>Personnes bloquées</Text>
                        <View style={styles.usersBlockedContainer}>
                            {usersBlockedCards.length ? usersBlockedCards : <Text style={styles.textDefaut}>Vous n'avez envoyé aucune demande</Text>}
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}


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
        width: '100%',
        fontSize: globalStyle.h3,
        marginTop: 20,
        marginBottom: 10,
        // color:globalStyle.grayPrimary,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    textDefaut: {
        width: '100%',
        color: globalStyle.grayPrimary,
    },

    // accepted
    friendsContainer: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
    },
    friendContainer: {
        width: '30%',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    friendAvatar: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        borderRadius: 50,
        borderWidth: 5,
    },
    friendName: {
        fontSize: globalStyle.h4,
    },

    // incoming
    friendsIncomingContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    friendIncomingContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    friendIncomingAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    friendIncomingName: {
        fontSize: globalStyle.h4,
    },

    // outcoming
    friendsOutcomingContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    friendOutcomingContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    friendOutcomingAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    friendOutcomingName: {
        fontSize: globalStyle.h4,
    },

    // blocked
    usersBlockedContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    userBlockedContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    usersBlockedAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    usersBlockedName: {
        fontSize: globalStyle.h4,
    },

})



