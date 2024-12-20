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

    useEffect(() => {
        const timer1 = setTimeout(() => setTooltip1Visible(true), 2000);
        const timer2 = setTimeout(() => setTooltip2Visible(true), 3500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);


    return (
        <View style={styles.container}>

            <ImageBackground source={require('../../assets/icons/map_tuto.jpg')} style={styles.background}>
                <View style={styles.containerpagination}>
                    <Text style={styles.texttuto}>Tuto 4/5</Text>
                </View>
                <View style={styles.containeranimation}>
                    <FadeInView fadeOut={false} delay={500} duration={500} style={styles.containericon}>
                        <Icon name="hand-pointer-o" style={[styles.hand, { transform: [{ rotate: '180deg' }] }]} size={80} color={globalStyle.greenPrimary} />
                    </FadeInView>
                    <FadeInView delay={500} duration={3000} style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../../assets/icons/menuplaces.png')} />
                    </FadeInView>
                    {tooltip1Visible && (
                        <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                            <View style={styles.tooltip1}>
                                <Text style={styles.tooltiptext}>Ici tu peux enrregistrer un nouveau lieu DogFriendly </Text>
                            </View>
                        </FadeInView>
                    )}
                    {tooltip2Visible && (
                        <FadeInView fadeOut={false} duration={3000} style={styles.menu}>
                            <View style={styles.tooltip2}>
                                <Text style={styles.tooltiptext}>Saisi un nom et choisi le type de lieu </Text>
                            </View>
                        </FadeInView>
                    )}
                </View>
            </ImageBackground >
            <View style={styles.containerbutton}>
                <BottomMenu navigateTo='MenuTuto' />
            </View>
        </View>

    )
}

import { globalStyle } from '../../config'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        marginBottom: '54'
    },
    containerpagination: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5,
        borderRadius: 5,
    },
    texttuto: {
        fontSize: 18,
        color: '#000',
        margin: '20',
        fontSize: globalStyle.h2,
    },
    containeranimation: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 50,
        padding: 2,
    },
    containerhand: {
        width: 80,
        height: 80,
    },
    containerbutton: {
        width: '100%',
        padding: 1,
        backgroundColor: globalStyle.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        opacity: 1,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: -60,
    },
    tooltip1: {
        position: 'absolute',
        top: -300,
        right: 100,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 5,
        borderRadius: 8,
        maxWidth: 250,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltip2: {
        position: 'absolute',
        top: -180,
        right: 100,
        backgroundColor: 'rgba(0, 0, 0,1)',
        padding: 5,
        borderRadius: 8,
        maxWidth: 250,
        zIndex: 1,
        justifyContent: 'center',
    },
    tooltiptext: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18,
        padding: 10,
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
});