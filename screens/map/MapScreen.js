import { StyleSheet, Button, Text, TextInput, View, Modal, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import MapView from 'react-native-maps'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleChevronRight, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import MenuFiltersComponent from './components/MenuFiltersComponent'
import MenuStatusComponent from './components/MenuStatusComponent'
import { globalStyle } from '../../config'


// COMPONENT
export default function MapScreen2() {
    const navigation = useNavigation()
    const [currentPosition, setCurrentPosition] = useState(false)
    const [positionMarker, setPositionMarker] = useState()
    const [mapType, setMapType] = useState('standard')

    // force position
    const [forcePosition, setForcePosition] = useState()
    const [forcePositionColor, setForcePositionColor] = useState('#666666')

    // user position
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({})
                setCurrentPosition(location.coords)
            }
        })()
    }, [])

    console.log('current position', currentPosition)

    const handleForcePosition = () => {
        setForcePosition(!forcePosition)
    }

    useEffect(() => {
        if (forcePosition) { setForcePositionColor('black') }
        else { setForcePositionColor('#cccccc') }
    }, [forcePosition])

    const handlePress = (region) => {
        if (!forcePosition) return
        // for (let e in region) console.log(e)
        // console.log(region)
        const coords = region.nativeEvent.coordinate
        const newMarker = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            name: 'Friend ' + Math.floor(Math.random() * 100),
            id: Math.floor(Math.random() * 100),
        }
        setPositionMarker(<Marker coordinate={coords}><FontAwesomeIcon icon={faLocationCrosshairs} size={20} color='royalblue' /></Marker>)
        setCurrentPosition(coords)
    }

    const onMarkerSelected = (marker) => {
        // for (let e in marker) console.log(e)
        console.log('open modal...', marker)
        setModalUserInfosProps({ visible: true, ...marker })
    }


    return (
        <View style={styles.container}>
            {currentPosition &&
                <MapView
                    type={mapType}
                    style={{ width: '100%', height: '100%' }}
                    showsUserLocation={!forcePosition}
                    showsMyLocationButton={!forcePosition}
                    onPress={(region) => handlePress(region)}
                >
                    {forcePosition && positionMarker}
                </MapView>
            }
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()} >
                <FontAwesomeIcon icon={faCircleChevronRight} color='black' size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.forcePosition} onPress={() => handleForcePosition()} >
                <FontAwesomeIcon icon={faLocationCrosshairs} color={forcePositionColor} size={30} />
            </TouchableOpacity>
            <View style={styles.bottomMenu}>
                <View style={{width:'33%',height:'100%',backgroundColor:'salmon'}}>
                    <MenuFiltersComponent />
                </View>
                <View style={{width:'33%',height:'100%',backgroundColor:'salmon'}}>
                    <MenuStatusComponent />
                </View>
                <View style={{width:'33%',height:'100%',backgroundColor:'salmon'}}>
                    <Text>btn add place</Text>
                </View>
            </View>
        </View >
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    bottomMenu:{
        backgroundColor:'#ffffff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height:60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
    },
})
