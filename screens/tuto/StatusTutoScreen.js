import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
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

    useEffect(() => {
        const timer1 = setTimeout(() => setTooltip1Visible(true), 1500);
        const timer2 = setTimeout(() => setTooltip2Visible(true), 3000);
        const timer3 = setTimeout(() => setTooltip3Visible(true), 4500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
            <Text style={styles.texttuto}>Tuto 3/5</Text>
            <View style={styles.containermap}>
                <FadeInView fadeOut={false} delay={500} duration={500} style={styles.containericon}>
                    <Icon name="hand-pointer-o" style={[styles.hand, { transform: [{ rotate: '180deg' }] }]} size={80} color={globalStyle.greenPrimary} />
                </FadeInView>
                <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/icons/menustatus.jpg')} />
                </FadeInView>
                {tooltip1Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip1}>
                            <Text style={styles.tooltiptext}>Quand tu pars en promenade choisi le chien vert </Text>
                        </View>
                    </FadeInView>
                )}
                {tooltip2Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip2}>
                            <Text style={styles.tooltiptext}>Quand tu t'arretes dans un lieu choisi le chien bleu </Text>
                        </View>
                    </FadeInView>
                )}
                {tooltip3Visible && (
                    <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                        <View style={styles.tooltip3}>
                            <Text style={styles.tooltiptext}>Quand tu ne veux plus apparaitre sur la carte choisi le chien gris </Text>
                        </View>
                    </FadeInView>
                )}
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
        top: 475,
        alignContent: 'center',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    containerbutton: {
        flex: 0.1,
        width: '100%',
        height: '15%',
        marginBottom: -80
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
        top: 500,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 10,
        borderRadius: 8,
        maxWidth: 150,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip1: {
        position: 'absolute',
        top: -380,
        right: 55,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 10,
        borderRadius: 8,
        maxWidth: 150,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip2: {
        position: 'absolute',
        top: -280,
        left: 35,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 10,
        borderRadius: 8,
        maxWidth: 150,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip3: {
        position: 'absolute',
        top: -210,
        right: 55,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 10,
        borderRadius: 8,
        maxWidth: 150,
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
        width: '100%',
        resizeMode: 'contain',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        marginBottom: 328

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

})
