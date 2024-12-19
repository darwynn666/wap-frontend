import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyle } from '../../../config'
import FadeInView from './FadeInView';

export default function Handtuto() {
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
    
        animation.start();
    
        return () => animation.stop(); // Arrête l'animation si le composant est démonté
    }, []);
    

    return (
       
        <View style={styles.tooltip}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Icon name="hand-pointer-o" style={[styles.hand, { transform: [{ rotate: '180deg' }] }]} size={50}/>
            </Animated.View>
        </View>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
         alignItems: 'bottom',
    },
    tooltip: {
       
         backgroundColor: 'rgba(0, 0, 0,1)', // Opacité corrigée pour que le fond soit bien visible
         padding: 10,
         borderRadius: 8,
         maxWidth: 150, // Limite la largeur maximale pour forcer le passage à la ligne
         zIndex: 1,
         justifyContent: 'center',
     },
     
     hand: {
        color: globalStyle.greenPrimary,
        
     },
});
