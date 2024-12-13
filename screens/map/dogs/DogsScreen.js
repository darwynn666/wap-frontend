import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globalStyle } from '../../../config'
import { useSelector, useDispatch } from 'react-redux';

export default function DogsScreen({ navigation }) {
    // const navigation = useNavigation()
    const route = useRoute();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [doglist,setDoglist]=useState([]);

    // console.log(user.data.token);
    //console.log(user.data.dogs);
useEffect (() => {
    fetch(`https://wap-backend.vercel.app/dogs/${user.data.token}`)
        .then(response => response.json())
        .then(data => {
          
           setDoglist(data.data)
           
        });
    }, []);
       // console.log(doglist)
       const dogs=doglist.map((data, i) => {
           // console.log(data);
        return (
            <View key={i} style={styles.containerlist}>
                <TouchableOpacity onPress={() => navigation.navigate('Mes chiens', { screen: 'EditDog', params:data })}>
                    <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
                </TouchableOpacity>
                <Text style={styles.text} >{data.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Mes chiens', { screen: 'DeleteDog' })}>
                    <Icon name="trash" size={30} color={globalStyle.greenPrimary} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    })
;
    return (

        <View style={styles.container}>
            {dogs}
            <View style={styles.containerplus}>
                <TouchableOpacity onPress={() => navigation.navigate('Mes chiens', { screen: 'AddDog' })}>
                    <Icon name="plus-circle" size={30} color={globalStyle.greenPrimary} style={styles.icon} />
                </TouchableOpacity>
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
        paddingTop: 20,


    },

    image: {
        height: "70",
        width: "70",
        borderRadius: 50,
        marginTop: 15,
    },
    text: {
        fontSize: globalStyle.h2
    },
    containerlist: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 15,
        width: '95%',
    },
    containerplus: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: 80,
        height: 500,
        marginRight: 15,
    }
})
