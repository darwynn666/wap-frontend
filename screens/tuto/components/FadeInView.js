import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

const FadeInView = ({ delay = 0, duration = 500, fadeOut = false, style, children }) => {
    const fadeAnim = useRef(new Animated.Value(fadeOut ? 1 : 0)).current; // Animation d'opacité
    const [isVisible, setIsVisible] = useState(!fadeOut); // Contrôle de la visibilité

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: fadeOut ? 0 : 1, // Passe de 0 à 1 (ou inversement) selon `fadeOut`
            duration,
            delay,
            useNativeDriver: true,
        }).start(() => {
            if (fadeOut) {
                setIsVisible(false); // Cache après animation de disparition
            } else {
                setIsVisible(true); // Montre après animation d'apparition
            }
        });
    }, [fadeOut]);

    if (!isVisible) return null; // Ne rend rien si invisible

    return (
        <Animated.View style={{ ...style, opacity: fadeAnim }}>
            {children}
        </Animated.View>
    );
};

export default FadeInView;

