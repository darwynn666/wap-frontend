import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Button, Platform, Image, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'



export default function UserScreen(props) {
    //const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value); 
    const navigation = useNavigation()
    const route = useRoute()
    const [toggleDogSitter, setToggleDogSitter] = useState(false);
    const [toggleSearchDogSitter, setToggleSearchDogSitter] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const uploadphoto = () => {
        console.log(uploadphoto)
    };
    const handleSubmit = () => {
        console.log('enregister')
    }
    // console.log(toggleDogSitter)
    // console.log(toggleSearchDogSitter)
    // console.log(firstname)
    // console.log(lastname)
    // console.log(telephone)
    // console.log(email)
    // console.log(Password)




    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.containerimage}>
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
                <Icon name="pen" rotate={70} size={30} color={globalStyle.greenPrimary} style={styles.icon} onPress={() => uploadphoto()} />
            </View>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Firstname" onChangeText={(value) => setFirstname(value)} value={firstname}></TextInput>
                <TextInput style={styles.input} placeholder="Lastname" onChangeText={(value) => setLastname(value)} value={lastname}></TextInput>
                <TextInput style={styles.input} placeholder="email" onChangeText={(value) => setEmail(value)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder="Telephone" onChangeText={(value) => setTelephone(value)} value={telephone}></TextInput>
                <TextInput style={styles.input} type="password" placeholder="Password" onChangeText={(value) => setPassword(value)} value={Password} secureTextEntry={true}></TextInput>
            </View >
            <View style={styles.containerswitch}>
                <View style={styles.switch}>
                    <Switch trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={globalStyle.greenPrimary} onValueChange={value => setToggleDogSitter(value)} value={toggleDogSitter} />
                    <Text style={styles.textswitch}>Je suis un Dogsitter</Text>
                </View>
                <View style={styles.switch}>
                    <Switch trackColor={{ false: '#d3d3d3', true: '#7fff00' }} thumbColor={globalStyle.greenPrimary} onValueChange={value => setToggleSearchDogSitter(value)}
                        value={toggleSearchDogSitter} />
                    <Text style={styles.textswitch}>Je cherche un Dogsitter</Text>
                </View>
            </View>
            <View style={styles.containerbouton}>
                <ButtonPrimary onPress={() => handleSubmit()} title='Enregistrer'>
                </ButtonPrimary>
            </View>

        </KeyboardAvoidingView>

    )
}

import { globalStyle } from '../../../config'
//import { normalizeColor } from 'react-native-reanimated/lib/typescript/Colors'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,

    },

    containerinput: {
        height: '60%',
        width: '90%',
    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black',

    },
    containerswitch: {

    },


    switch: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
    },

    textswitch: {
        textAlign: 'center',
    },

    image: {
        height: "90",
        width: "90",
        borderRadius: 50,
    },

    containerimage: {

        marginBottom: 30,
        marginTop: 2,
    },
    icon: {

        marginLeft: 80,
        marginTop: -30,

    },

    containerbouton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
    },

})
