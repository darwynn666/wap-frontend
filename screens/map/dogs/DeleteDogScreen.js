import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'


export default function DeleteDogScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const deletedog = () => {
        console.log('delete')
    }
    return (
        <View style={styles.container}>
            <View style={styles.texticon} >
                <Text style={styles.titre}>Non du chien</Text>
                <Icon name="trash" size={60} color="green" style={styles.icon} />
                <Text style={styles.paragraph}>Supprimer Nom du chien?</Text>
            </View>

            <View style={styles.containerbouton}>
                <ButtonPrimary onPress={() => deletedog()} title='Supprimer'>
                </ButtonPrimary>
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
        flexDirection: 'colunm',
        justifyContent: 'space-around',
    },
    containerbouton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
    },
    texticon: {
        alignItems: 'center',

    },

    paragraph: {
        fontSize: globalStyle.h3,
        marginTop: 50,
    },
    titre: {
        fontSize: globalStyle.h2,
        marginBottom: 50,
    },
})
