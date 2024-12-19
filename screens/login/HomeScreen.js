import { StyleSheet, Text, View, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../globalComponents/ButtonPrimary'
import { BACKEND_URL, globalStyle } from '../../config'
import { logout } from '../../reducers/user'
import { logoHomeUrl } from '../../config'


export default function HomeScreen(props) {
    const navigation = useNavigation()
    const route = useRoute()
    const user = useSelector(stats => stats.user.value)
    const dispatch = useDispatch()
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        if (route.params?.forceLogout) {
            handleLogout()
        }
    }, [route.params?.forceLogout])

    useEffect(() => {
        if (user?.token) {
            fetchUser()
        }
        else {
            setLogged(false)
        }
    }, [])

    const handleLogout = async () => {
        const url = `${BACKEND_URL}/users/${user.token}/status`
        console.log('PUT', url)
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'off' })
        })
        const data = await response.json()
        // console.log(data)
        dispatch(logout())
        setLogged(false)
        route.params.forceLogout = false
    }

    const handleSignUp = () => {
        navigation.navigate('SignUpUser')
    }

    const handleSignIn = () => {
        navigation.navigate('SignIn')
    }


    const fetchUser = async () => {
        console.log('token exists, auto signin')
        const url = `${BACKEND_URL}/users/me/${user.token}`
        console.log('GET', url)
        const response = await fetch(url)
        const data = await response.json()
        if (data.result) {
            console.log('fetch user ok', data.data)
            dispatch(setUser(data.data))
            setLogged(true)
            return
        }
    }

    console.log(logged)

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: logoHomeUrl }} style={styles.logo}></Image>
                {/* <Text>Image Logo</Text> */}
            </View>
            <View style={styles.buttonsContainer}>
                {logged && <>
                    <Text>Bonjour {user.infos.firstname}</Text>
                    <ButtonPrimary onPress={() => navigation.navigate('Map', { screen: '_Map' })} title='Voir la carte' />
                </>}
                {!logged && <>
                    <ButtonPrimary onPress={() => handleSignUp()} title='Sign Up' />
                    <ButtonPrimary onPress={() => handleSignIn()} title='Sign In' />
                </>}
            </View>
        </View>
    )
}

// STYLES
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.backgroundColor,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    imageContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '80%',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    buttonsContainer: {
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '20%',
    },
})
