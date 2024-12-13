import { StyleSheet, Text, TextInput, View, Platform, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonPrimary from '../../../globalComponents/ButtonPrimary'
import { useSelector, useDispatch } from 'react-redux';


//export default function EditDogScreen({ navigation }) {
//  const navigation = useNavigation()
// const doginfos = (navigation.getState().routes.find(e => e.name == 'EditDog'))
export default function EditDogScreen() {
    const route = useRoute();
    const user = useSelector((state) => state.user.value); // Pour un éventuel usage
console.log(user.data)
    // Initialisation des états avec les paramètres passés
    const { name, sex, race, birthday, chipid, status, _id } = route.params;
    const [nom, setNom] = useState(name || '');
    const [sexe, setSexe] = useState(sex || '');
    const [dogRace, setDogRace] = useState(race || '');
    const [dogBirthday, setDogBirthday] = useState(birthday || '');
    const [dogChipid, setDogChipid] = useState(chipid || '');
    const [dogStatus, setDogStatus] = useState(status || '');

    // Fonction pour mettre à jour la photo (à implémenter)
    const uploadphoto = () => {
        console.log('Upload photo');
    };

    // Gestion de la soumission
    const handleSubmit = () => {
        // Validation rapide
        if (!nom || !sexe) {
            alert('Veuillez renseigner au moins le nom et le sexe.');
            return;
        }

        fetch(`https://wap-backend.vercel.app/dogs/${user.data.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id:_id,
                name:nom,
                sex: sexe,
                race: dogRace,
                chipid: dogChipid,
                birthday: dogBirthday,
                status: dogStatus,
            }),
        })
            .then((response) => {
            //     console.log(response)
            //     if (!response.ok) {
            //         throw new Error('Erreur lors de la mise à jour');
              //  }
                return response.json();
            })
            .then((data) => {
                console.log('Mise à jour réussie :', data);
                alert('Les informations du chien ont été mises à jour avec succès.');
            })
            .catch((error) => {
                console.error('Erreur détectée :', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            });
    };



    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.containerimage}>
                <Image style={styles.image} source={require('../../../assets/avatar.jpg')} />
                <Icon
                    name="pen"
                    rotate={70}
                    size={30}
                    color="#32CD32"
                    style={styles.icon}
                    onPress={uploadphoto}
                />
            </View>
            <View style={styles.containerinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    onChangeText={setNom}
                    value={nom}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Race"
                    onChangeText={setDogRace}
                    value={dogRace}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Sexe</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            onPress={() => setSexe('female')}
                            style={[
                                styles.optionFemale,
                                sexe === 'female' && styles.optionSelected,
                            ]}
                        />
                        <TouchableOpacity
                            onPress={() => setSexe('male')}
                            style={[
                                styles.optionMale,
                                sexe === 'male' && styles.optionSelected,
                            ]}
                        />
                    </View>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Date de naissance"
                    onChangeText={setDogBirthday}
                    value={dogBirthday}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Numéro de puce"
                    onChangeText={setDogChipid}
                    value={dogChipid}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Statut (malade, en chaleur, ...)"
                    onChangeText={setDogStatus}
                    value={dogStatus}
                />
            </View>
            <View style={styles.containerbouton}>
                <ButtonPrimary onPress={handleSubmit} title="Enregistrer" />
            </View>
        </KeyboardAvoidingView>
    );
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
    optionFemale: {
        backgroundColor: '#ff9999',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    optionMale: {
        backgroundColor: '#9999ff',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    optionSelected: {
        borderWidth: 3,
        borderColor: '#333333',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: globalStyle.h4,
        textAlign: 'center'
    },

})


