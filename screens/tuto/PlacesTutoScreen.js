import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Animated, useAnimatedValue, Image, delay, fadeOut, duration } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from './components/FadeInView'
import Handtuto from './components/Handtuto'


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
        <View style={styles.container}>

            <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
                <View style={styles.containerpagination}>
                    <Text style={styles.texttuto}>Tuto 4/5</Text>
                </View>

                <View style={styles.containeranimation}>
                    <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../../assets/icons/menuplaces.png')} />
                    </FadeInView>
                    <FadeInView>
                        
                    </FadeInView>
                    <FadeInView fadeOut={true} duration={3000} style={styles.containerhand}>
                        <Handtuto />
                    </FadeInView>

                </View>

            </ImageBackground >
            <View style={styles.containerbutton}>
                <BottomMenu navigateTo='MenuTuto' />
            </View>
        </View>

    )
}

import { globalStyle } from '../../config'
// STYLES

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        marginBottom: '54' // L'ImageBackground occupe tout l'espace disponible
    },
    containerpagination: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
    },
    texttuto: {
        fontSize: 18,
        color: '#fff',
        margin: '20',
    },
    containeranimation: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 50, // Pour espacer la main du bord inférieur
        padding: 2,
    },
    containerhand: {
        width: 80,
        height: 80,
    },
    containerbutton: {
        //height:' 10%',
        width: '100%',
        padding: 1,
        backgroundColor: globalStyle.backgroundColor, // Couleur de fond pour démarquer la section bouton
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
       // bottom: 90, // Place l'image en bas de l'écran
        width: '100%', // Prend toute la largeur
        height: '100%',
        justifyContent:'flex-end',
        alignSelf:'center',
        //alignItems:'flex-end', // Ajuste la hauteur (peut être modifié selon les besoins)
    },
    image: {
        width: '100%',
        height: '36%',
        resizeMode: 'cover',
        opacity:1,
        justifyContent:'flex-end' ,
        position:'absolute',
        bottom: -60,
    
    }
});