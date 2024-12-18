import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { globalStyle } from '../../../config'
import { useSelector } from 'react-redux'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import { BACKEND_URL } from '../../../config'
import { ScrollView } from 'react-native-gesture-handler'


export default function ChoosePlaceAddressScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(state => state.user.value)
    const [placesData, setPlacesData] = useState([null])

    console.log(route.params)
    const { coordinates, name, type } = route.params


    useEffect(() => {
        getPlaces(coordinates[0], coordinates[1], 1000)
    }, [])

    const getPlaces = async (longitude, latitude, distance) => {
        const url = `${BACKEND_URL}/places/near/${longitude}/${latitude}/${distance}`
        console.log('GET', url)
        const response = await fetch(url)
        const data = await response.json()
        setPlacesData(data.places)
        console.log('placesData', placesData)
        if (data.places.length === 0) {
            console.log(route.params)
            navigation.navigate('ConfirmPlaceAddress', { coordinates, name, type })
            return
        }
    }

    const places = placesData.map((place, i) => {
        let type = null
        switch (place?.type) {
            case 'bars': type = 'Bar'; break
            case 'restaurants': type = 'Restaurant'; break
            case 'shops': type = 'Magasin'; break
            case 'parks': type = 'Parc'; break
            case 'garbages': type = 'Distributeur'; break
        }
        return (
            <View key={i} style={styles.placeContainer}>
                <Image style={styles.placePhoto} source={{ uri: place?.photo }}></Image>
                <View>
                    <Text style={styles.placeName}>{place?.name}</Text>
                    <Text>{type}</Text>
                </View>
            </View>
        )
    })
    // console.log(places)


    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Un lieu similaire semble déjà exister</Text>
            </View>

            <View style={styles.placesContainer}>
                {placesData && places}
            </View>
            <Text>S'il fait partie de cette liste vous pouvez retourner à la carte</Text>
            <View style={styles.bottomContainer}>
                <Text></Text>
                <ButtonPrimary title='Retour' onPress={() => navigation.navigate('_Map', { screen: 'Map' })} />
                <Text>ou</Text>
                <Text>Le lieu n'existe pas ?</Text>
                <ButtonPrimary title='Créer un lieu' onPress={() => navigation.navigate('ConfirmPlaceAddress', { coordinates, name, type })} />
            </View>

        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: globalStyle.padding,
        paddingTop: 20,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: globalStyle.h2,
        textAlign: 'center',
    },
    placesContainer: {
        // backgroundColor:'yellow',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        padding: 10,
    },
    placeName: {
        fontSize: globalStyle.h3,
    },
    placePhoto: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    bottomContainer: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
