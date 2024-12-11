import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'


export default function InfosFriendScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Mes amis', { screen: 'InfosFriend' })}>
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
            </TouchableOpacity>
            {/* <View style={styles.containerswitch}>
                <View style={styles.switch}>
                    <Switch trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={'green'} onValueChange={value => setToggleDogSitter(value)} value={toggleDogSitter} />
                    <Text style={styles.textswitch}>Est un  Dogsitter</Text>
                </View>
                <View style={styles.switch}>
                    <Switch trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={'green'} onValueChange={value => setToggleSearchDogSitter(value)}
                        value={toggleSearchDogSitter} />
                    <Text style={styles.textswitch}> Cherche un Dogsitter</Text>
                </View>
            </View> */}
            <View>
                <Icon>
                    telephone
                </Icon>
            </View>
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
    },
})
