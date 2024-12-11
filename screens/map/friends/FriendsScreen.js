import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function FriendsScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Mes amis', { screen: 'InfosFriend' })}>
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
            </TouchableOpacity>
            <Text style={styles.text} >nom d'ami</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Mes amis', { screen: 'BlockFriend' })}>
                <Icon name="ban" size={30} color="red" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Mes amis', { screen: 'DeleteFriend' })}>
                <Icon name="trash" size={30} color="red" style={styles.icon} />
            </TouchableOpacity>
        </View>

    )
}

import { globalStyle } from '../../../config'
// STYLES
const styles = StyleSheet.create({

    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },

    image: {
        height: "70",
        width: "70",
        borderRadius: 50,
        marginTop: 15,
    },
    text: {
        fontSize: globalStyle.h2
    },
})


