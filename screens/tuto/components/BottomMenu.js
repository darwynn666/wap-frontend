import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { globalStyle } from '../../../config'
import { useNavigation, useRoute } from '@react-navigation/native'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import ButtonSecondary from '../../../globalComponents/ButtonSecondary'


const screens = ['MarkersTuto', 'FiltersTuto', 'StatusTuto', 'PlacesTuto', 'MenuTuto'] // change this if routes names change

export default function BottomMenu(props) {
    const navigation = useNavigation()
    const route=useRoute()


    const currentIndex = screens.indexOf(route.name)

    const navigateToPrevRoute = () => {
        navigation.navigate(
            currentIndex > 0 ? screens[currentIndex - 1] : screens[0]
        )
    }

    const navigateToNextRoute = () => {
        navigation.navigate(
            currentIndex < screens.length -1 ? screens[currentIndex + 1] : 'Map'
        )
    }

    return (
        <View style={styles.container}>
            <ButtonSecondary onPress={() => { navigateToPrevRoute() }} title='Précédent' status={true} />
            <ButtonSecondary onPress={() => { navigation.navigate('Map') }} title='Skip' status={false} />
            <ButtonSecondary onPress={() => { navigateToNextRoute() }} title='Suivant' status={true} />
        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})
