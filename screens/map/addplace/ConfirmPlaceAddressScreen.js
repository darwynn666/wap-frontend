import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import InputFullSize from '../../../globalComponents/InputFullSize'
import { BACKEND_URL, globalStyle } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { setTriggerNewPlace } from '../../../reducers/newplace'


export default function ConfirmPlaceAddressScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const triggerNewPlace = useSelector(state => state.newplace.value)
    console.log(route.params)
    const { coordinates, name, type } = route.params

    const [housenumber, setHousenumber] = useState(null)
    const [street, setStreet] = useState(null)
    const [postcode, setPostCode] = useState(null)
    const [city, setCity] = useState(null)
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        getAddress()
    }, [])

    const getAddress = async () => {
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${coordinates[0]}&lat=${coordinates[1]}`
        console.log('GET', url)
        const response = await fetch(url)
        const address = await response.json()
        console.log(address.features[0].properties)
        const a = address.features[0].properties
        setHousenumber(a.housenumber)
        setStreet(a.street)
        setPostCode(a.postcode)
        setCity(a.city)
    }

    const handleSubmit = async () => {
        if (!coordinates) { console.log('required coordinates'); return }
        if (!name || !type || !housenumber || !street || !postcode || !city) { console.log('required address'); return }
        setDisableButton(true)
        const url = `${BACKEND_URL}/places`
        console.log('POST', url)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type, housenumber, street, postcode, city, longitude: coordinates[0], latitude: coordinates[1] })
        })
        const data = await response.json()
        setDisableButton(false)
        console.log(data)
        if (data.result) {
            dispatch(setTriggerNewPlace(true))
            navigation.navigate('FillPlaceInfos', { name: name, _id: data.place._id })
        }
        else {
            console.log('error while creating place')
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Confirmer l'adresse</Text>
                <Text style={styles.placeName}>{name}</Text>
                <View style={styles.inputsContainer}>
                    <InputFullSize onChangeText={(value) => setHousenumber(value)} value={housenumber} placeholder='Numéro' />
                    <InputFullSize onChangeText={(value) => setStreet(value)} value={street} placeholder='Rue' />
                    <InputFullSize onChangeText={(value) => setPostCode(value)} value={postcode} placeholder='Code postal' />
                    <InputFullSize onChangeText={(value) => setCity(value)} value={city} placeholder='Ville' />
                </View>
                <ButtonPrimary title='Suivant' onPress={() => handleSubmit()}  disabled={disableButton} />
                <ButtonPrimary title='Annuler' onPress={() => navigation.navigate('_Map', { screen: 'Map' })} />
            </View>
        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: globalStyle.padding,
        paddingTop: 20,
    },
    topContainer: {
        // backgroundColor:'yellow',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: globalStyle.h2,
        color: globalStyle.greenPrimary,
    },
    placeName: {
        fontSize: globalStyle.h1,
    },
    inputsContainer: {
        padding: 20,
    },



    ou: {
        fontSize: globalStyle.h1,
        margin: 20,
        color: '#cccccc',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    bottomContainer: {
        // backgroundColor:'yellow',
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
