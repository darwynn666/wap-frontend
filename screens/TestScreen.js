import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


import ButtonPrimary from '../globalComponents/ButtonPrimary'
import ButtonSecondary from '../globalComponents/ButtonSecondary'
import InputFullSize from '../globalComponents/InputFullSize'

export default function TestScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(state => state.user.value)
    const settings = useSelector(state => state.settings.value)
    const [reloadTrigger,setReloadTrigger]=useState()

    // console.log(user)
    // console.log(settings)

    return (
        <ScrollView>

            <View style={styles.container}>

                <ButtonPrimary title='Reload' onPress={()=>setReloadTrigger(!reloadTrigger)}/>
                <ButtonSecondary title='Secondary' status={true} />
                <ButtonSecondary title='Secondary' status={false} />
                <InputFullSize placeholder='sample text...' secureTextEntry={true}/>
                <View style={styles.reducers}>
                    <Text>REDUCERS</Text>
                    <Text style={styles.reducer}>user {JSON.stringify(user, null, 2)}</Text>
                    <Text style={styles.reducer}>settings {JSON.stringify(settings, null, 2)}</Text>
                </View>
            </View>

        </ScrollView>
    )
}

import { globalStyle } from '../config'
// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:globalStyle.padding,
        paddingTop:40,
    },
    reducers:{
        width:'100%',
    },
    reducer: {
        width:'100%',
        backgroundColor:'#eeeeee',
        padding:5,
        marginTop:5,
        marginBottom:5,
    },
})
