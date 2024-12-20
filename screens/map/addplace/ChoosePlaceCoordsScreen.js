import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, ScrollView, BackHandler, Pressable } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { globalStyle } from '../../../config'
import { useSelector } from 'react-redux';
import InputFullSize from '../../../globalComponents/InputFullSize';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary';
import {
    IconBarBlue,
    IconBarGrayLight,
    IconRestaurantBlue,
    IconRestaurantGrayLight,
    IconParkBlue,
    IconParkGrayLight,
    IconShopsBlue,
    IconShopsGrayLight,
    IconToiletBlue,
    IconToiletGrayLight,
} from "../../../globalComponents/Icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';


export default function ChoosePlaceCoordsScreen() {
    const navigation = useNavigation();
    const mapRef2 = useRef(null);
    const route = useRoute()
    const user = useSelector(state => state.user.value);
    const [name, setName] = useState(null)
    const [type, setType] = useState('bars')
    const [coordinates, setCoordinates] = useState(user.currentLocation.coordinates)
    const [positionMarker, setPositionMarker] = useState(null)
    const [location, setLocation] = useState(null)
    const [mapKey, setMapKey] = useState(`map-${Date.now()}`)

    const initialRegion = {
        longitude: user.currentLocation.coordinates[0],
        latitude: user.currentLocation.coordinates[1],
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    }

    // user position
    useEffect(() => {

        const backAction = () => { navigation.navigate('_Map'); return true } // handle back button : go back to map
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

        // (async () => {
        //     const { status } = await Location.requestForegroundPermissionsAsync()
        //     if (!status === "granted") {
        //         console.log('Localisation refusée')
        //         return
        //     }
        //     Location.watrchPositionAsync({ distanceInterval: 10 }, (location) => {
        //         setLocation(location)
        //     })
        // })()

        return () => backHandler.remove();
    }, [])

    useEffect(() => {
        setPositionMarker(
            <Marker coordinate={{ longitude: coordinates[0], latitude: coordinates[1] }}>
                <FontAwesomeIcon icon={faMapMarker} size={30} color={globalStyle.greenPrimary} />
            </Marker >
        )
    }, [coordinates])


    const handlePress = (region) => {
        const coords = region.nativeEvent.coordinate;
        console.log(coords)
        setCoordinates([coords.longitude, coords.latitude])
    }

    const handleSubmit = () => {
        if (!name || !type || !coordinates) {
            console.log('missing field')
            return
        }
        console.log(name, type, coordinates)
        navigation.navigate('ChoosePlaceAddress', { name, type, coordinates })
    }

    return (

        <View style={styles.container} onPress={() => console.log('press')}>
            <MapView
                key={`map-${Date.now()}`}
                // key={mapKey}
                ref={mapRef2}
                style={{ width: '100%', height: '50%' }}
                initialRegion={initialRegion}
                mapType='standard'
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={region => handlePress(region)}
                onLongPress={region => handlePress(region)}
            >
                {positionMarker}
            </MapView>

            <View style={styles.coordinatesContainer}>
                {coordinates && (
                    <>
                        <Text>Lon: {coordinates[0]}</Text>
                        <Text>Lat: {coordinates[1]}</Text>
                    </>
                )}
            </View>

            <View style={styles.formContainer}>
                <Text>Ajouter un lieu</Text>
                <Text style={styles.title2}>Choisissez un endroit sur la carte puis indiquez un nom</Text>

                <InputFullSize onChangeText={(value) => setName(value)} value={name} placeholder='Nom du lieu' />
                <View style={styles.itemsView}>
                    <TouchableOpacity style={styles.typeItem} onPress={() => setType('bars')}>
                        {type === 'bars' ? <IconBarBlue /> : <IconBarGrayLight />}
                        <Text style={styles.itemText}>Bar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.typeItem} onPress={() => setType('restaurants')}>
                        {type === 'restaurants' ? <IconRestaurantBlue /> : <IconRestaurantGrayLight />}
                        <Text style={styles.itemText}>Resto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.typeItem} onPress={() => setType('parks')}>
                        {type === 'parks' ? <IconParkBlue /> : <IconParkGrayLight />}
                        <Text style={styles.itemText}>Parc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.typeItem} onPress={() => setType('shops')}>
                        {type === 'shops' ? <IconShopsBlue /> : <IconShopsGrayLight />}
                        <Text style={styles.itemText}>Shop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.typeItem} onPress={() => setType('garbages')}>
                        {type === 'garbages' ? <IconToiletBlue /> : <IconToiletGrayLight />}
                        <Text style={styles.itemText}>Toilet</Text>
                    </TouchableOpacity>
                </View>
                {(coordinates && name) &&
                    <ButtonPrimary title='Continuer' onPress={() => handleSubmit()} />
                }
            </View>
        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        // paddingBottom: 50,
    },
    title: {
        // backgroundColor: 'yellow',
        fontSize: globalStyle.h2,
        textAlign: 'center',
        color: globalStyle.greenPrimary,//'#999999',
    },
    title2: {
        fontSize: globalStyle.h2,
        textAlign: 'center',
        color: '#666666',
    },
    coordinatesContainer: {
        // backgroundColor:'yellow',
        position: 'absolute',
        bottom: '50%',
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        // position: 'absolute',
        width: '100%',
        height: '50%',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: globalStyle.padding,
    },
    itemsView: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
    },
    typeItem: {
        // backgroundColor:'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    itemText: {
        color: '#999999',
    },
})
