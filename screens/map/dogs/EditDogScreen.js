import { StyleSheet, Text, TextInput, View,Platform, Image, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'



export default function EditDogScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const [status, setStatus] = useState('');
    const [nom, setNom] = useState('');
    const [sexe, setSexe] = useState('');
    const [race, setRace] = useState('');
    const [birthday, setBirthday] = useState('');
    const [chipid, setChipid] = useState('');

    const uploadphoto = () => {
        console.log(uploadphoto)
    };
    const handleSubmit = () => {
        console.log('enregister')
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.titre}>Nom du chien</Text>
            <View style={styles.containerimage}>              
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
                <Icon name="pen" rotate={70} size={30} color="green" style={styles.icon} onPress={() => uploadphoto()} />
            </View>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Status (malade, en chaleur,...)" onChangeText={(value) => setStatus(value)} value={status}></TextInput>
                <TextInput style={styles.input} placeholder="Nom" onChangeText={(value) => setNom(value)} value={nom}></TextInput>
                <TextInput style={styles.input} placeholder="Race" onChangeText={(value) => setRace(value)} value={race}></TextInput>
                <TextInput style={styles.input} placeholder="Sexe" onChangeText={(value) => setSexe(value)} value={sexe}></TextInput>
                <TextInput style={styles.input} placeholder="Date de naissance" onChangeText={(value) => setBirthday(value)} value={birthday}></TextInput>
                <TextInput style={styles.input} placeholder="Date de naissance" onChangeText={(value) => setChipid(value)} value={chipid}></TextInput>
            </View >
            
                <View style={styles.containerbouton}>
                    <ButtonPrimary onPress={() => handleSubmit()} title='Enregistrer'>
                    </ButtonPrimary>
                </View>
            
        </KeyboardAvoidingView>

    )
}

import { globalStyle } from '../../../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    titre: {
       fontSize: globalStyle.h2
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

     image: {
        height: "90",
        width: "90",
        borderRadius: 50,
        marginTop: 15,
    },

    containerimage: {
        marginBottom: 30,
        marginTop: 2,
    },
    icon: {
        marginLeft: 70,
        marginTop: -20,

    },
    containerbouton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
    },

})


