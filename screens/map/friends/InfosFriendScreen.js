import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import { globalStyle } from '../../../config'


export default function InfosFriendScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Nom de l'ami</Text>
            <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />

            <View style={styles.containerswitch}>
                <View style={styles.switch}>
                    <Switch trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={globalStyle.greenPrimary} />
                    <Text style={styles.textswitch}>Est un  Dogsitter</Text>
                </View>
                <View style={styles.switch}>
                    <Switch trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={globalStyle.greenPrimary}
                    />
                    <Text style={styles.textswitch}> Cherche un Dogsitter</Text>
                </View>
            </View >
            <View style={styles.containercontact}>
                <View style={styles.contact}>
                    <Icon name="phone" color={globalStyle.greenPrimary} size={30} />
                    <Text style={styles.textcontact}>Téléphone</Text>
                </View>
                <View style={styles.contact}>
                    <Icon name="at" color={globalStyle.greenPrimary} size={30} />
                    <Text style={styles.textcontact}>Email</Text>
                </View>
            </View>

            <View style={styles.containericons}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Mes amis', { screen: 'BlockFriend' })}>
                    <Icon style={styles.icon} name="ban" size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Mes amis', { screen: 'DeleteFriend' })}>
                    <Icon style={styles.icon} name="trash" size={30} color="red" />
                </TouchableOpacity>
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
        justifyContent: 'space-around'
    },
    image: {
        height: "100",
        width: "100",
        borderRadius: 50,
        marginBottom: 60,
    },

    switch: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
    },

    textswitch: {
        textAlign: 'center',
    },

    containericons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,

    },
    containercontact: {
        flexDirection: 'column',
        marginTop: 20,
        width: '90%',
        alignItems: 'center'
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    textcontact: {
        fontSize: globalStyle.h3,
        marginLeft: 10,
    },
    containericons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        marginTop: 60,
    },
    icon: {
        paddingHorizontal: 10,
    },

    titre: {
        fontSize: globalStyle.h2
    },
})
