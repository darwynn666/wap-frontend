import { StyleSheet, Text, TextInput, View, Button,Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { globalStyle } from '../../../config'
import { useSelector } from 'react-redux'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import { BACKEND_URL } from '../../../config'


export default function ChoosePlaceAddressScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(state => state.user.value)
    const [placesData, setPlacesData] = useState([null])

    console.log(route.params)
    const { coordinates, name, type } = route.params


    useEffect(() => {
        getPlaces(coordinates[0], coordinates[1], 10000)
    }, [])

    const getPlaces = async (longitude, latitude, distance) => {
        const url = `${BACKEND_URL}/places/near/${longitude}/${latitude}/${distance}`
        console.log('GET', url)
        const response = await fetch(url)
        const data = await response.json()
        setPlacesData(data.places)
        console.log('placesData', placesData)
    }

    const places = placesData.map((place, i) => {
        return (
            <View style={styles.placeContainer}>
                <Image style={styles.placePhoto} source={{ uri: place?.photo }}></Image>
                <Text style={styles.placeName}>{place?.name}</Text>
            </View>
        )
    })
    // console.log(places)


    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Nous avons trouvé un/des lieu(x) autour de ce point</Text>
            </View>

            <View style={styles.placesContainer}>
                {places}
            </View>

            <View style={styles.bottomContainer}>
                <Text></Text>
                <ButtonPrimary title='Retour' />
                <Text>ou</Text>
                <Text>Le lieu n'existe pas ?</Text>
                <ButtonPrimary title='Créer un lieu' />
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
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        padding:10,
    },
    placeName: {
        fontSize: globalStyle.h3,
    },
    placePhoto: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight:10,
    },
    bottomContainer: {
        width: '100%',
        height:150,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
