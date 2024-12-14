import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { globalStyle } from '../../../config'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { dogAvatarUrl } from '../../../config'


// import { BACKEND_URL } from '../../../config'
const BACKEND_URL = 'http://192.168.1.147:3000'


export default function DogsScreen({ navigation }) {
    // const navigation = useNavigation()
    const route = useRoute();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [doglist, setDoglist] = useState([]);

    console.log(user.token);
    //console.log(user.data.dogs);
    useEffect(() => {
        fetch(`https://wap-backend.vercel.app/dogs/${user.token}`)
            .then(response => response.json())
            .then(data => {
                setDoglist(data.data)
            });
    }, []);
    // console.log(doglist)
    const dogs = doglist.map((data, i) => {
        // console.log(data);
        return (
            <TouchableOpacity key={i} style={styles.dogContainer} >
                <Image style={styles.image} source={{ uri: dogAvatarUrl }} />
                <Text style={styles.text} >{data.name}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View style={styles.dogsContainer}>
                    {dogs}
                </View>
            </ScrollView>
            <View style={styles.addDogContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Mes chiens', { screen: 'AddDog' })}>
                    {/* <Icon name="plus-circle" size={30} color={globalStyle.greenPrimary} style={styles.addDogIcon} /> */}
                    <View style={styles.addDogIcon}>
                        <FontAwesomeIcon icon={faPlus} size={30} color='white'></FontAwesomeIcon>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        paddingTop: 40,
    },

    dogsContainer: {
        // backgroundColor: 'yellow',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    dogContainer: {
        // backgroundColor: 'green',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        borderRadius: 100,
        marginTop: 15,
    },
    text: {
        fontSize: globalStyle.h3
    },

    addDogContainer: {
        // backgroundColor:'red',
        position:'absolute',
        right:globalStyle.padding,
        bottom:globalStyle.padding,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        // alignSelf: 'flex-end',
    },
    addDogIcon: {
        backgroundColor: globalStyle.greenPrimary,
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
