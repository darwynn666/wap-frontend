import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Animated, useAnimatedValue, Image, delay, fadeOut, duration } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from './components/FadeInView'

// const FadeInView = ({ delay = 0, duration = 5000, fadeOut = false, children, style }) => {
//     const fadeAnim = useAnimatedValue(fadeOut ? 1 : 0); // Départ selon le sens de l'animation

//     useEffect(() => {
//         Animated.timing(fadeAnim, {
//             toValue: fadeOut ? 0 : 1, // Aller vers 1 (apparition) ou 0 (disparition)
//             duration: duration, // Durée de l'animation
//             delay: delay, // Délai avant de commencer
//             useNativeDriver: true,
//         }).start();
//     }, [fadeAnim, fadeOut, delay, duration]);

//     return (
//         <Animated.View style={{ ...style, opacity: fadeAnim }}>
//             {children}
//         </Animated.View>
//     );
// };

export default function StatusTutoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [tooltip1Visible, setTooltip1Visible] = useState(false);
    const [tooltip2Visible, setTooltip2Visible] = useState(false);
    const [tooltip3Visible, setTooltip3Visible] = useState(false);
    const [tooltip4Visible, setTooltip4Visible] = useState(false);
    const [tooltip5Visible, setTooltip5Visible] = useState(false);


    useEffect(() => {
        const timer1 = setTimeout(() => setTooltip1Visible(true), 1500);    
        const timer2 = setTimeout(() => setTooltip2Visible(true), 3000);    
        const timer3 = setTimeout(() => setTooltip3Visible(true), 4500); 
        const timer4 = setTimeout(() => setTooltip4Visible(true), 6000);  
        const timer5 = setTimeout(() => setTooltip5Visible(true), 7500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, []);

    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
            <Text style={styles.texttuto}>Tuto 5/5</Text>
            <View style={styles.containermap}>
                <FadeInView fadeOut={true} duration={3000} style={styles.container}>
                    <View style={styles.tooltip}>
                        {/* <Text style={styles.tooltiptext}>Ici tu peux choisir le status de ton chien</Text> */}
                        <Icon name="hand-pointer-o" style={[styles.hand, { transform: [{ rotate: '270deg' }] }]} size={50} color="#44CD6F" />
                    </View>
                </FadeInView>
                <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/icons/menuutilisateur.png')} />
                </FadeInView>
                {tooltip1Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip1}>
                            <Text style={styles.tooltiptext}>Ton prénom et ton nom </Text>
                            {/* <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" /> */}
                        </View>
                    </FadeInView>
                )}
                {tooltip2Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip2}>
                            <Text style={styles.tooltiptext}>Ici tu pourras modifier tes informations personelles </Text>
                            {/* <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" /> */}
                        </View>
                    </FadeInView>
                )}
                {tooltip3Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip3}>
                            <Text style={styles.tooltiptext}>Ici tu pourras modifier les informations de ton chien ou ajouter un autre chien </Text>
                            {/* <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" /> */}
                        </View>
                    </FadeInView>
                )}
                {tooltip4Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip4}>
                            <Text style={styles.tooltiptext}>Ici tu pourras accepter ou refuser une invitation ou bloquer un utilisateur.</Text>
                            {/* <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" /> */}
                        </View>
                    </FadeInView>
                )}
                {tooltip5Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip5}>
                            <Text style={styles.tooltiptext}>Ici tu pourras te deconnecter </Text>
                            {/* <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" /> */}
                        </View>
                    </FadeInView>
                )}
                <View style={styles.containerbutton}>
                    <BottomMenu navigateTo='Map' />
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
        marginBottom: -160
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
        top: -170,
        right: 80,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
        // marginEnd:10,
    },
    tooltip1: {
        position: 'absolute',
        top: -770,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 5,
        borderRadius: 8,
        maxWidth: 250, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip2: {
        position: 'absolute',
        top: -690,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 5,
        borderRadius: 8,
        maxWidth: 250, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip3: {
        position: 'absolute',
        top: -640,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 5,
        borderRadius: 8,
        maxWidth: 246, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip4: {
        position: 'absolute',
        top: -570,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 5,
        borderRadius: 8,
        maxWidth: 240, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip5: {
        position: 'absolute',
        top: -490,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 5,
        borderRadius: 8,
        maxWidth: 240, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltiptext: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18, // Ajoute un espace suffisant entre les lignes pour une meilleure lisibilité

    },
    arrow: {
        position: 'relative',
        top: 45,
        left: 50,
    },
    image: {
        height: 800,
        position: 'absolute',
        top: -260,
        right: -91,

        resizeMode: 'contain', // Essayez différents modes
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        //  alignItems: 'center',
        // marginBottom: 5

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
        alignItems: 'center',
    },
    menu: {
        alignItems: 'center'
    },

})
