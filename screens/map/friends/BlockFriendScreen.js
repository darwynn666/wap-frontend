import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'


export default function BlockFriendScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const blockfriend = () => {
        console.log('block')
    }

    return (
        <View style={styles.container}>
            <View style={styles.texticon} >
                <Text style={styles.titre}>Non d'ami</Text>
                <Icon name="ban" size={60} color="red" style={styles.icon} />
                <Text style={styles.titre2}>Bloquer Nom d'ami?</Text>
                <Text style={styles.paragraph}>Il ne pourra plus vous voir sur la carte.</Text>

            </View>

            <View style={styles.containerbouton}>
                <ButtonPrimary onPress={() => blockfriend()} title='Bloquer'>
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
        fontSize: globalStyle.h4,
        marginTop: 30,
    },
    titre: {
        fontSize: globalStyle.h2,
        marginBottom: 50,
    },

    titre2: {
        fontSize: globalStyle.h3,
        marginTop: 50,
    },
})