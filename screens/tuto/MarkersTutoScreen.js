import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import BottomMenu from './components/BottomMenu'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';


export default function MarkersTutoScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const [swipeDirection,setSwipeDirection] = useState(null)


    const onSwipePerformed = (event) => {
        const { translationX } = event.nativeEvent;
        if (translationX < -50) {
            console.log('Swipe left');
            setSwipeDirection('left')
        } else if (translationX > 50) {
            console.log('Swipe right');
            setSwipeDirection('right')
        }
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={onSwipePerformed}>
                <View style={styles.container}>
                    <Text>Route : {route.name}</Text>
                    <Text>Swipe : {swipeDirection}</Text>
                    <BottomMenu />
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

import { globalStyle } from '../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
})
