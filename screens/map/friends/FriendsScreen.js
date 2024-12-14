import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions, SafeAreaView } from 'react-native'
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


export default function FriendsScreen(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const navigation = useNavigation()
    const route = useRoute()

    // console.log(user.friends.accepted)

    const getFriend = async (_id) => {
        const response = await fetch(`${BACKEND_URL}/users/${_id}`)
        const friend = await response.json()
        return (friend.data)
    }

    const friends = user.friends.accepted.map(async (_id, i) => {
        const friend = await getFriend(_id)
        let statusColor = null
        switch (friend.status) {
            case 'off': statusColor = globalStyle.grayLight; break
            case 'walk': statusColor = globalStyle.greenPrimary; break
            case 'pause': statusColor = globalStyle.bluePrimary; break
        }
        return (
            <TouchableOpacity key={i} style={styles.friendContainer} >
                <Image style={[styles.friendAvatar,{borderColor:statusColor}]} source={{ uri: userAvatarUrl }} />
                <Text style={styles.friendName} >{friend.infos.firstname} </Text>
                <Text style={styles.friendName} >{friend.infos.lastname}</Text>
                {/* <FontAwesomeIcon icon={faCircle} size={15} style={{ borderColor: statusColor }}></FontAwesomeIcon> */}
            </TouchableOpacity >
        )
    })

    const friendsIncoming = user.friends.incoming.map(async (_id, i) => {
        const friend = await getFriend(_id)
        console.log('friend incoming', friend)
        return (
            <View key={i} style={styles.friendIncomingContainer} >
                <Image style={styles.friendIncomingAvatar} source={{ uri: userAvatarUrl }} />
                <Text style={styles.friendIncomingName} >{friend.infos.firstname} {friend.infos.lastname}</Text>
                <View>
                    <ButtonSecondary title='Accepter' status={true} />
                    <ButtonSecondary title='Refuser' status={false} />
                </View>
            </View>
        )
    })

    const friendsOutcoming = user.friends.outcoming.map(async (_id, i) => {
        const friend = await getFriend(_id)
        console.log('friend outcoming', friend)
        return (
            <View key={i} style={styles.friendOutcomingContainer} >
                <Image style={styles.friendOutcomingAvatar} source={{ uri: userAvatarUrl }} />
                <Text style={styles.friendOutcomingName} >{friend.infos.firstname} {friend.infos.lastname}</Text>
                <ButtonSecondary title='Annuler' status={true} />
            </View>
        )
    })

    const usersBlocked = user.friends.blocked.map(async (_id, i) => {
        const friend = await getFriend(_id)
        console.log('users blocked', friend)
        return (
            <View key={i} style={styles.usersBlockedContainer} >
                <Image style={styles.usersBlockedAvatar} source={{ uri: userAvatarUrl }} />
                <Text style={styles.usersBlockedName} >{friend.infos.firstname} {friend.infos.lastname}</Text>
                <ButtonSecondary title='Annuler' status={true} />
            </View>
        )
    })

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.container}>

                        <Text style={styles.textDefaut}>Tu peux acceder à des informations détaillées sur la carte lorsque tes amis sont en ballade</Text>

                        <Text style={styles.title}>Mes amis</Text>
                        <View style={styles.friendsContainer}>
                            {user.friends.accepted.length ? friends : <Text style={styles.textDefaut}>Vous n'avez pas d'ami</Text>}
                        </View>

                        <Text style={styles.title}>Demandes en attente</Text>
                        <View style={styles.friendsIncomingContainer}>
                            {user.friends.incoming.length ? friendsIncoming : <Text style={styles.textDefaut}>Vous n'avez envoyé aucune demande</Text>}
                        </View>

                        <Text style={styles.title}>Demandes envoyées</Text>
                        <View style={styles.friendsOutcomingContainer}>
                            {user.friends.outcoming.length ? friendsOutcoming : <Text style={styles.textDefaut}>Vous n'avez envoyé aucune demande</Text>}
                        </View>

                        <Text style={styles.title}>Personnes bloquées</Text>
                        <View style={styles.usersBlockedContainer}>
                            {user.friends.blocked.length ? usersBlocked : <Text style={styles.textDefaut}>Vous n'avez bloqué personne</Text>}
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
        justifyContent: 'space-between',
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
        borderWidth:5,
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
    usersBlockedContainer: {
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



