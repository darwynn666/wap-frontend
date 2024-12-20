import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Animated, useAnimatedValue, Image, delay, fadeOut, duration } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import Handtuto from './components/Handtuto'
import FadeInView from './components/FadeInView'



export default function MarkersTutoScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const [tooltip1Visible, setTooltip1Visible] = useState(false);
    const [tooltip2Visible, setTooltip2Visible] = useState(false);
    const [tooltip3Visible, setTooltip3Visible] = useState(false);
    const [tooltip4Visible, setTooltip4Visible] = useState(false);
    const [tooltip5Visible, setTooltip5Visible] = useState(false);
    const [tooltip6Visible, setTooltip6Visible] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setTooltip1Visible(true), 1500);
        const timer2 = setTimeout(() => setTooltip2Visible(true), 3000);
        const timer3 = setTimeout(() => setTooltip3Visible(true), 4500);
        const timer4 = setTimeout(() => setTooltip4Visible(true), 6000);
        const timer5 = setTimeout(() => setTooltip5Visible(true), 7500);
        const timer6 = setTimeout(() => setTooltip6Visible(true), 9000);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
        };
    }, []);

    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
            <Text style={styles.texttuto}>Tuto 1/5</Text>
            {/* <GestureHandlerRootView style={{ flex: 1 }}>
                <PanGestureHandler onGestureEvent={onSwipePerformed}> */}
            <View style={styles.container}>
                <View style={styles.containermap}>
                    {tooltip1Visible && (
                        <FadeInView delay={0} duration={1000} style={styles.bluepoint}>
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>
                                    Ici c'est toi
                                </Text>
                            </View>
                            <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                            <Icon style={styles.iconblue} name="circle" size={20} color="blue"></Icon>
                        </FadeInView>
                    )}
                    {tooltip2Visible && (
                        <FadeInView delay={2000} duration={1000} style={styles.greendog}>
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>
                                    Un ami que tu connais ? Appelle-le et rejoins-le
                                </Text>
                            </View>
                            <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                            <Image style={styles.icon} source={require('../../assets/icons/icon_dog_green.png')}></Image>
                        </FadeInView>
                    )}
                    {tooltip3Visible && (
                        <FadeInView delay={3000} duration={1000} style={styles.graydog1}>
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>
                                    Une future connaissance? Rencontre-la et ajoute-la à tes amis
                                </Text>
                            </View>
                            <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                            <Image style={styles.icon} source={require('../../assets/icons/icon_dog_gray.png')}></Image>
                        </FadeInView>
                    )}
                    {tooltip4Visible && (
                        <FadeInView delay={4000} duration={1000} style={styles.reddog}>
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>
                                    Tu as bloqué cet utilisateur.
                                </Text>
                            </View>
                            <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                            <Image style={styles.icon} source={require('../../assets/icons/icon_dog_red.png')}></Image>
                        </FadeInView>
                    )}
                    {tooltip5Visible && (
                        <FadeInView delay={5000} duration={1000} style={styles.restaurant}>
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>
                                    Trois personnes au même lieu, ça doit être super comme endroit !
                                </Text>
                            </View>
                            <Icon name="arrow-down" style={styles.arrowresto} size={30} color="#000" />
                            <Text style={styles.number}>3</Text>
                            <Image style={styles.icon} source={require('../../assets/icons/icon_restaurant.png')}></Image>
                        </FadeInView>
                    )}
                    {tooltip6Visible && (
                        <FadeInView delay={6000} duration={1000} style={styles.toilet}>
                            <View style={styles.tooltip}>
                                <Text style={styles.tooltipText}>
                                    Les sachets propreté c’est ici
                                </Text>
                            </View>
                            <Icon name="arrow-down" style={styles.arrow} size={30} color="#000" />
                            <Image style={styles.icon} source={require('../../assets/icons/icon_toilet.png')}></Image>
                        </FadeInView>
                    )}
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
    containerbutton: {
        flex: 0.1,
        width: '100%',
        height: '15%',
        marginBottom: -30
    },
    background: {
        width: '100%',
        height: '97%',
    },
    icon: {
        height: 40,
        width: 40,
    },
    iconblue: {
        marginTop: 20,
        padding: -50,
    },
    reddog: {
        alignItems: 'center',
        position: 'relative',
        top: -200,
        left: -140,
    },
    bluepoint: {
        alignItems: 'center',
        position: 'relative',
        top: 50,
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
    restaurant: {
        alignItems: 'center',
        position: 'relative',
        top: -320,
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        padding: 10,
        borderRadius: 8,
        maxWidth: 150,
        zIndex: 1,
    },
    tooltipText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18,
    },
    arrowresto: {
        position: 'absolute',
        marginTop: -6,
        right: -15,
    },
    texttuto: {
        color: '#000',
        alignItems: 'center',
        position: 'relative',
        top: 20,
        left: 300,
        fontSize: globalStyle.h2,
    },
    number: {
        fontSize: globalStyle.h3,
    },
})

