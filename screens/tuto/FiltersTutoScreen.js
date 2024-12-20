import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Animated, useAnimatedValue, Image, delay, fadeOut, duration, } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import Icon from 'react-native-vector-icons/FontAwesome'
import FadeInView from './components/FadeInView'
import Handtuto from './components/Handtuto'
import { globalStyle } from '../../config'
import { ImageBackgroundBase } from 'react-native'


export default function FiltersTutoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [tooltip1Visible, setTooltip1Visible] = useState(false);
    const [tooltip2Visible, setTooltip2Visible] = useState(false);
    const [tooltip3Visible, setTooltip3Visible] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setTooltip1Visible(true), 3000); // Délai pour le premier tooltip   
        const timer2 = setTimeout(() => setTooltip2Visible(true), 4500); // Délai pour le deuxième tooltip   
        const timer3 = setTimeout(() => setTooltip3Visible(true), 6000); // Délai pour le troisième tooltip
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);
    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>

            <View style={styles.containermap}>
                <View style={styles.pagetuto}>
                    <Text style={styles.texttuto}>Tuto 2/5</Text>
                </View>
                <FadeInView fadeOut={true} duration={3000} style={styles.containericon}>
                    <Icon name="hand-pointer-o" style={[styles.hand, { transform: [{ rotate: '180deg' }] }]} size={100} color={'black'}/>
                </FadeInView>
                </View>
            
                <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/icons/menufiltre.png')} />
            </FadeInView>

                {tooltip1Visible && (
                <FadeInView delay={500} duration={1000} fadeOut={false} style={styles.menu}>
                    <View style={styles.tooltip2}>
                        <Text style={styles.tooltiptext}>Ici tu peux choisir le type de carte.</Text>
                </View>
                </FadeInView>
            )}
                
            {tooltip2Visible && (
                <FadeInView delay={500} duration={1000} fadeOut={false} style={styles.menu}>
                    <View style={styles.tooltip3}>
                        <Text style={styles.tooltiptext}>Ici tu peux choisir les lieux que tu veux afficher sur la carte.</Text> 
                </View>
                </FadeInView>
            )}

                {tooltip3Visible && (
                <FadeInView delay={500} duration={1000} fadeOut={false} style={styles.menu}>
                    <View style={styles.tooltip4}>
                        <Text style={styles.tooltiptext}>Ici tu peux choisir les utilisateurs que tu veux afficher sur la carte.</Text>     
                </View>
                </FadeInView>
            )} 

                <View style={styles.containerbutton}>
                <BottomMenu navigateTo="StatusTuto" />
            </View>
        </ImageBackground>
    );
}




// STYLES
const styles = StyleSheet.create({
    containericon: {
        top: -500,
        //right:200,
        left: 
        flexDirection: 'row',
        alignContent: 'center',
        //alignSelf: 'flex-end',
        flex: 1,
       // justifyContent: 'flex-end',
       // alignItems: 'flex-start',
       // paddingTop: 20,
    },
    containermap: {
flex: 1,
 flexDirection: 'row',
        alignContent: 'center',
        padding: 20,
        flex: 1,
    },
    containerbutton: {
        flex: 0.1,
        width: '100%',
        height: '15%',
        marginBottom: -25,

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
        top: 480,
        left: -190,
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip1: {
        position: 'absolute',
        //bottom: -400,
        //right: 20,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,
        marginTop: 90,
        // position: 'absolute',
        left: - 115,
        bottom: -25
    },
    tooltip2: {
        position: 'absolute',
        top: -520,
        left: 240,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 1,

    },
    tooltip3: {
        position: 'absolute',
        bottom: 290,
        left: 15,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 2,
    },
    tooltip4: {
        position: 'absolute',
        bottom: 130,
        left: 248,// Ajustez cette valeur pour placer le tooltip
        backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
        zIndex: 2,
    },
    tooltiptext: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18, // Ajoute un espace suffisant entre les lignes pour une meilleure lisibilité
    },
    arrow: {
        marginTop: -30
    },

    image: {
        width: '100%',
        height: 500,
        marginBottom: 54,

    },
    imageContainer: {
        marginBottom: -30
    },

    menu: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    hand:{
        
    },

})