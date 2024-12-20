import { StyleSheet, Text, View, ImageBackground, Animated, Image, } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from './components/FadeInView'


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
                <FadeInView fadeOut={false} delay={500} duration={500} style={styles.containericon}>
                    <Icon name="hand-pointer-o" style={[styles.hand, { transform: [{ rotate: '270deg' }] }]} size={80} color={globalStyle.greenPrimary} />
                </FadeInView>
                <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/icons/menuutilisateur.png')} />
                </FadeInView>
                {tooltip1Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip1}>
                            <Text style={styles.tooltiptext}>Ton prénom et ton nom </Text>
                        </View>
                    </FadeInView>
                )}
                {tooltip2Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip2}>
                            <Text style={styles.tooltiptext}>Ici tu pourras modifier tes informations personelles </Text>
                        </View>
                    </FadeInView>
                )}
                {tooltip3Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip3}>
                            <Text style={styles.tooltiptext}>Ici tu pourras modifier les informations de ton chien ou ajouter un autre chien </Text>
                        </View>
                    </FadeInView>
                )}
                {tooltip4Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip4}>
                            <Text style={styles.tooltiptext}>Ici tu pourras accepter ou refuser une invitation ou bloquer un utilisateur.</Text>
                        </View>
                    </FadeInView>
                )}
                {tooltip5Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip5}>
                            <Text style={styles.tooltiptext}>Ici tu pourras te deconnecter </Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    containermap: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        height: '100%',
        marginTop: 150
    },
    containericon: {
        position: 'absolute',
        left: 70,
        top: -150,
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    containerbutton: {
        flex: 0.1,
        width: '100%',
        height: '15%',
        marginBottom: -165
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
        right: 80,
        backgroundColor: 'rgba(0, 0, 0,1)', 
        padding: 10,
        borderRadius: 8,
        maxWidth: 150,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip1: {
        position: 'absolute',
        top: -770,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', 
        padding: 5,
        borderRadius: 8,
        maxWidth: 250, 
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip2: {
        position: 'absolute',
        top: -690,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', 
        padding: 5,
        borderRadius: 8,
        maxWidth: 250, 
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip3: {
        position: 'absolute',
        top: -640,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', 
        padding: 5,
        borderRadius: 8,
        maxWidth: 246,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip4: {
        position: 'absolute',
        top: -570,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)', 
        padding: 5,
        borderRadius: 8,
        maxWidth: 240,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip5: {
        position: 'absolute',
        top: -490,
        right: -195,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 5,
        borderRadius: 8,
        maxWidth: 240, 
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltiptext: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18, 
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
        resizeMode: 'contain', 
    },
    imageContainer: {
        width: '100%',
        height: '100%',    
    },
    tooltipmenu: {
        position: 'absolute',
        top: -100,
        right: 140,
        backgroundColor: 'rgba(0, 0, 0,1)', 
        padding: 10,
        borderRadius: 8,
        maxWidth: 150, 
        zIndex: 3,
        alignItems: 'center',
    },
    menu: {
        alignItems: 'center'
    },
    hand: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'black',
        width: '80',
        borderRadius: 8,
        margin: 5,
        padding: 2,
    }
})
