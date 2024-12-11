import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function DogsScreen({ navigation }) {
    // const navigation = useNavigation()
    const route = useRoute()

    return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Mes chiens', { screen: 'EditDog' })}>
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
            </TouchableOpacity>
                <Text style={styles.text} >nom du chien</Text>
           
            <TouchableOpacity onPress={() => navigation.navigate('Mes chiens', { screen: 'DeleteDog' })}>
                <Icon name="trash" size={30} color="green" style={styles.icon} onPress={() => navigation.navigate('Mes chiens', { screen: 'DeleteDog' })} />
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
