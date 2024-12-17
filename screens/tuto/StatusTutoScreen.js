import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Animated, useAnimatedValue, Image, delay, fadeOut, duration } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const FadeInView = ({ delay = 0, duration = 5000, fadeOut = false, children, style }) => {
    const fadeAnim = useAnimatedValue(fadeOut ? 1 : 0); // Départ selon le sens de l'animation

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: fadeOut ? 0 : 1, // Aller vers 1 (apparition) ou 0 (disparition)
            duration: duration, // Durée de l'animation
            delay: delay, // Délai avant de commencer
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, fadeOut, delay, duration]);

    return (
        <Animated.View style={{ ...style, opacity: fadeAnim }}>
            {children}
        </Animated.View>
    );
};

export default function StatusTutoScreen() {
    const navigation = useNavigation()
    //const route = useRoute()

    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
            <Text style={styles.texttuto}>Tuto 3/5</Text>
            <View style={styles.containermap}>
                <FadeInView fadeOut={true} duration={7000} style={styles.container}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltiptext}>Ici tu peux choisir le status de ton chien</Text>
                        <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                    </View>
                </FadeInView>
                <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/icons/menustatus.jpg')} />
                </FadeInView>
                <View style={styles.containerbutton}>
                    <BottomMenu navigateTo='PlacesTuto' />
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
        marginBottom: -93

    },
    background: {
        width: '100%',
        height: '97%',
    },
    texttuto: {
        color: '#000',
        alignItems: 'center',
        position: 'relative',
        top: 20,
        left: 300,
        fontSize: globalStyle.h2,
    },
    tooltip: {
        position: 'absolute',
        bottom: -50,
        //right:-5,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
    },
    tooltiptext: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18, // Ajoute un espace suffisant entre les lignes pour une meilleure lisibilité

    },
    arrow: {
        // width: 180,
        // height: 10,
        // borderLeftWidth: 2,
        // borderRightWidth: 2,
        // borderBottomWidth: 2,
        // borderStyle: 'solid',
        // //backgroundColor: 'rgba(0, 0, 0,0.8)',
        // // borderLeftColor: 'transparent',
        // // borderRightColor: 'transparent',
        // // borderBottomColor: '#fff',
        // marginTop: -2, // Ajustez selon l'espace souhaité
        // position: 'relative',
        // top: 65,
        // left: -70,
    },
    image: {
        width: '100%',
        height: '50%',
       // marginBottom: 37,
        zIndex: 2,

    },
    imageContainer: {
        //marginBottom: -30
    },
    tooltipmenu: {
        position: 'absolute',
        top: -100,
        right: 140,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 3,
    },
    menu: {
        alignItems: 'top'
    },

})
