import { StyleSheet, Text, TextInput, View, Button, ImageBackground } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function FiltersTutoScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.containermap}>
                    <View>
                        <Text style={styles.text}>Tuto2/5</Text>
                    </View>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>
                        Ici tu peux gérer ce que tu souhaites voir sur la carte. Lieux, amis, inconnus etc...
                        </Text>
                         <Icon name="arrow-left" style={styles.arrow} size={30} color="#fff" />
                    </View>
                </View>
                <View style={styles.containerbutton}>
                    <BottomMenu navigateTo='StatusTuto' />
                </View>

            </View>
        </ImageBackground>
    )
}

import { globalStyle } from '../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#000',
        //opacity: 0.2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        // height: '90%',
    },
    containermap: {
        //backgroundColor: '#000',
        //opacity: 0.2,
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        height: '100%',
        marginTop: 150
    },
    containerbutton: {
        flex: 0.1,
        width: '100%',
        height: '15%',
        //marginTop: '50',
        // marginTop: 50
        // paddingTop:'20%',
        //justifyContent:'space between',
        marginBottom: -30

    },
    background: {
        width: '100%',
        height: '97%',
    },
    text: {
        color: '#000',
        alignItems: 'center',
        position: 'relative',
        top: -440,
        left: 140,
        fontSize: 20,
    },
    tooltip: {
    position: 'absolute',
    bottom: 150,
    //right:-5,// Ajustez cette valeur pour placer le tooltip
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Opacité corrigée pour que le fond soit bien visible
    padding: 10,
    borderRadius: 8,
    maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
    zIndex: 1,
},
tooltipText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18, // Ajoute un espace suffisant entre les lignes pour une meilleure lisibilité

},
arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    marginTop: -2, // Ajustez selon l'espace souhaité
},

})
