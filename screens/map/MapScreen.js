import { StyleSheet, Button, Text, TextInput, View, Modal, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import MapView from 'react-native-maps'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleChevronRight, faLocationCrosshairs, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import MenuFiltersComponent from './components/MenuFiltersComponent'
import MenuStatusComponent from './components/MenuStatusComponent'
import { globalStyle } from '../../config'
import { useSelector } from 'react-redux'
import { BACKEND_URL } from '../../config'

// COMPONENT
export default function MapScreen2() {
    const navigation = useNavigation()
    const [currentPosition, setCurrentPosition] = useState(false)
    const [positionMarker, setPositionMarker] = useState()
    const [mapType, setMapType] = useState('standard')
    const [placesMarkers, setPlacesMarkers] = useState([])
    const [visibleRegion, setVisibleRegion] = useState(null);


    const user = useSelector(state => state.user.value)

    // force position
    const [forcePosition, setForcePosition] = useState()
    const [forcePositionColor, setForcePositionColor] = useState('#666666')

    // user position
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status === 'granted') {
                // const location = await Location.getCurrentPositionAsync({})
                // setCurrentPosition(location.coords)
                Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                    setCurrentPosition(location.coords)
                });
            }
        })()
    }, [])


    const handleRegionChange = (region) => {
        // console.log('marker 0', markers[0])
        setVisibleRegion(region);
    };


    const toggleForcePosition = () => {
        setForcePosition(!forcePosition)
    }

    useEffect(() => {
        if (forcePosition) { setForcePositionColor('black') }
        else { setForcePositionColor('#cccccc') }
    }, [forcePosition])


    // on map press : force position, add place, ...
    const handlePress = (region) => {
        if (forcePosition) {
            const coords = region.nativeEvent.coordinate
            setPositionMarker(<Marker coordinate={coords}><FontAwesomeIcon icon={faLocationCrosshairs} size={20} color='royalblue' /></Marker>)
            setCurrentPosition(coords)
        }
    }


    // markers places A REVOIR UNE FOIS LA ROUTE GET /places OK
    const getPlaces = async () => {
        console.log('get places')
        const placesResponse = await fetch(`${BACKEND_URL}/places`)
        const placesData = await placesResponse.json()
        // console.log(placesData.data)
        console.log(placesData.result)
        if (placesData.result) {
            setPlacesMarkers(placesData.data)
        }
    }
    useEffect(() => {
        getPlaces()
    }, [])

    // visibleRegion
    const places = placesMarkers.map((e, i) => {
        return (<Marker key={i} coordinate={{ latitude: e.location.coordinates[1], longitude: e.location.coordinates[0] }} />)
        // return (<Marker key={i} coordinate={{ latitude: e.location.coordinates[1], longitude: e.location.coordinates[0] }}><FontAwesomeIcon icon={faMapMarker} size={20} color='royalblue' /></Marker>)
    })

    // console.log('current position', currentPosition)
    return (
        <View style={styles.container}>
            {currentPosition &&
                <MapView
                initialRegion={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    latitudeDelta: 0.05,    //0.05 equivaut à environ 5km
                    longitudeDelta: 0.05,
                  }}
                    type={mapType}
                    style={{ width: '100%', height: '100%' }}
                    showsUserLocation={!forcePosition}
                    showsMyLocationButton={!forcePosition}
                    onPress={(region) => handlePress(region)}
                    onRegionChangeComplete={(region) => handleRegionChange(region)}

                >
                    {forcePosition && positionMarker}
                    {places}
                </MapView>
            }

            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()} >
                <FontAwesomeIcon icon={faCircleChevronRight} color='black' size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.forcePosition} onPress={() => toggleForcePosition()} >
                <FontAwesomeIcon icon={faLocationCrosshairs} color={forcePositionColor} size={30} />
            </TouchableOpacity>

            <View style={styles.bottomMenu}>
                <View style={{ width: '25%', height: '100%' }}>
                    <MenuFiltersComponent />
                </View>
                <View style={{ width: '48%', height: '100%' }}>
                    <MenuStatusComponent />
                </View>
                <View style={{ width: '25%', height: '100%' }}>
                    <TouchableOpacity style={styles.buttonAddPlace}>
                        <FontAwesomeIcon icon={faMapMarker} size={30} color={globalStyle.buttonPrimaryBackgroundColor} />
                        <Text style={styles.buttonAddPlaceText}>Ajouter</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        // paddingBottom: 50,
    },
    menuButton: {
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 40,
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    forcePosition: {
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // left: Dimensions.get('window').width / 2 - 20,
        right: 50,
        top: 30,
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    bottomMenu: {
        // backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 0,
    },
    buttonAddPlace: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAddPlaceText: {
        textAlign: 'center',
    },
})
