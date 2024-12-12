import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import { globalStyle } from '../../../config'
import { useSelector,useDispatch } from 'react-redux';

export default function FriendsScreen(props) {
    const dispatch = useDispatch();
    const user=useSelector((state)=>state.user.value);
    const navigation = useNavigation()
    const route = useRoute()

console.log(user)

    const addFriend = () => {
        console.log("accepter")
    };
    const declineFriend = () => {
        console.log('refuser')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ma liste d'amis</Text>

            <TouchableOpacity style={styles.containerlist} onPress={() => navigation.navigate('Mes amis', { screen: 'InfosFriend' })}>
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
                <Text style={styles.text} >nom d'ami</Text>
            </TouchableOpacity>

            <View style={styles.containerdemandes}>
                <Text style={styles.title}>Demandes en attente:</Text>
                <View style={styles.waitingfriends}>
                    <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
                    <View>
                        <Text style={styles.text} >nom d'ami</Text>
                        <Text style={styles.paragraph}>delais de demandes</Text>
                    </View>
                    <View style={styles.containerbutton}>
                        <ButtonPrimary style={styles.button} onPress={() => addFriend()} title='Accepter'></ButtonPrimary>
                        <ButtonPrimary style={styles.button} onPress={() => declineFriend()} title='Refuser'></ButtonPrimary>
                    </View>
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


    },
    containerlist: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5,
        width: '95%',
    },

    image: {
        height: "70",
        width: "70",
        borderRadius: 50,
        marginTop: 15,
    },
    text: {
        fontSize: globalStyle.h3
    },
    containerdemandes: {
        flexDirection: 'column',
        marginTop: 20,
        width: '90%',
        alignItems: 'center',
    },
    waitingfriends: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        width: '95%',
    },
    title: {
        fontSize: globalStyle.h2,
    },
    paragraph: {
        fontSize: globalStyle.h4,

    },
    containerbutton: {
        width: '27%',
        alignItems: 'center',

    },
    button: {
    // justifyContent: 'space-around',
    // alignItems:'stretch'
    },



})



