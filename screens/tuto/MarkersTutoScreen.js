import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function MarkersTutoScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const [swipeDirection, setSwipeDirection] = useState(null)


    // const onSwipePerformed = (event) => {
    //     const { translationX } = event.nativeEvent;
    //     if (translationX < -50) {
    //         console.log('Swipe left');
    //         setSwipeDirection('left')
    //     } else if (translationX > 50) {
    //         console.log('Swipe right');
    //         setSwipeDirection('right')
    //     }
    // };

    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
            {/* <GestureHandlerRootView style={{ flex: 1 }}>
                <PanGestureHandler onGestureEvent={onSwipePerformed}> */}
                    <View style={styles.container}>
                        <View style={styles.containermap}>
                            <View>
                                <Text style={styles.text}>Tuto1/5</Text>
                            </View>
                            <View style={styles.reddog}>
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipText}>
                                        Ici c'est toi
                                    </Text>
                                </View>
                                <Icon name="arrow-down" style={styles.arrow} size={30} color="#fff" />
                                <Image style={styles.icon} source={require('../../assets/icons/icon_dog_red.png')}></Image>
                            </View>

                            <View style={styles.greendog}>
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipText}>
                                        Un ami que tu connais ? Appelle-le et rejoins-le
                                    </Text>
                                </View>
                                <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                                <Image style={styles.icon} source={require('../../assets/icons/icon_dog_green.png')}></Image>
                            </View>
                            <View style={styles.graydog1}>
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipText}>
                                        Une future connaissance? Rencontre-la et ajoute-la à tes amis
                                    </Text>
                                </View>
                                <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                                <Image style={styles.icon} source={require('../../assets/icons/icon_dog_gray.png')}></Image>
                            </View>
                            <View style={styles.graydog2}>

                                <Image style={styles.icon} source={require('../../assets/icons/icon_dog_gray.png')}></Image>
                            </View>
                            <View style={styles.restaurant}>
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipText}>
                                        Trois personnes au même lieu, ça doit être super comme endroit !
                                    </Text>
                                </View>
                                <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                                <Text>3</Text>
                                <Image style={styles.icon} source={require('../../assets/icons/icon_restaurant.png')}></Image>
                            </View>
                            <View style={styles.toilet}>
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipText}>
                                        Les sachets propreté c’est ici
                                    </Text>
                                </View>
                                <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                                <Image style={styles.icon} source={require('../../assets/icons/icon_toilet.png')}></Image>
                            </View>
                        </View>
                        <View style={styles.containerbutton}>
                            <BottomMenu />
                        </View>
                    </View>
                {/* </PanGestureHandler>
            </GestureHandlerRootView> */}
        </ImageBackground>
    )
}

import { globalStyle } from '../../config'
//import { green } from 'react-native-reanimated/lib/typescript/Colors'
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
       marginBottom:-30
        
    },
    background: {
        width: '100%',
        height: '97%',

    },
    icon: {
        height: 40,
        width: 40,
    },
    reddog: {
        alignItems: 'center',
        position: 'relative',
        top: 0,
        left: 0,
    },
    greendog: {
        alignItems: 'center',
        position: 'relative',
        top: 100,
        left: 120,

    },
    graydog1: {
        alignItems: 'center',
        position: 'relative',
        top: 230,
        left: 40,
    },
    graydog2: {
        alignItems: 'center',
        position: 'relative',
        top: -140,
        left: 150,
    },
    restaurant: {
        alignItems: 'center',
        position: 'relative',
        top: -300,
        left: 100,
    },
    toilet: {
        alignItems: 'center',
        position: 'relative',
        top: -180,
        left: -130,

    },
    tooltip: {
        position: 'absolute',
        bottom: 70,
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

    text: {
        color: '#000',
        alignItems: 'center',
        position: 'relative',
        top: -290,
        left: 150,
        fontSize:20


    },
})
