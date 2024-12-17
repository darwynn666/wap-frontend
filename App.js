import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// redux 
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './reducers/user'
import settings from './reducers/settings'
//import rootReducer from './reducers'; 

// const store = configureStore({
//   reducer: { user,settings },
// })
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user, settings
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});


export const persistor = persistStore(store);

// IMPORT SCREENS
import TestScreen from './screens/TestScreen'; //empty component for tests

import HomeScreen from './screens/login/HomeScreen';
import SignInScreen from './screens/login/SignInScreen';
import SignUpUserScreen from './screens/login/SignUpUserScreen';
import SignUpDogScreen from './screens/login/SignUpDogScreen';

import MarkersTutoScreen from './screens/tuto/MarkersTutoScreen';
import FiltersTutoScreen from './screens/tuto/FiltersTutoScreen';
import MenuTutoScreen from './screens/tuto/MenuTutoScreen';
import PlacesTutoScreen from './screens/tuto/PlacesTutoScreen';
import StatusTutoScreen from './screens/tuto/StatusTutoScreen';

import MapScreen from './screens/map/MapScreen';
import UserScreen from './screens/map/user/UserScreen';
import DogsScreen from './screens/map/dogs/DogsScreen';
import EditDogScreen from './screens/map/dogs/EditDogScreen';
import DeleteDogScreen from './screens/map/dogs/DeleteDogScreen'
import AddDogScreen from './screens/map/dogs/AddDogScreen';
import FriendsScreen from './screens/map/friends/FriendsScreen';
import BlockFriendScreen from './screens/map/friends/BlockFriendScreen';
import DeleteFriendScreen from './screens/map/friends/DeleteFriendScreen';
import InfosFriendScreen from './screens/map/friends/InfosFriendScreen';
import LogoutScreen from './screens/map/logout/LogoutScreen';
import AreYouThereScreen from './screens/map/addplace/AreYouThereScreen';
import ChoosePlaceCoordsScreen from './screens/map/addplace/ChoosePlaceCoordsScreen';
import ChoosePlaceAddressScreen from './screens/map/addplace/ChoosePlaceAddressScreen';
import ConfirmPlaceAddressScreen from './screens/map/addplace/ConfirmPlaceAddressScreen';
import FillPlaceInfosScreen from './screens/map/addplace/FillPlaceInfosScreen';
import EditPlaceInfosScreen from './screens/map/editplace/EditPlaceInfosScreen';
import EditPlaceAddressScreen from './screens/map/editplace/EditPlaceAddressScreen';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut, faUserCircle, faDog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator() // bottom tabs are for dev only, to be replaced by 'Stack'

// LOGIN
const StackLogin = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUpUser" component={SignUpUserScreen} />
      <Stack.Screen name="SignUpDog" component={SignUpDogScreen} />
    </Stack.Navigator>
  )
}

// TUTO
const StackTuto = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MarkersTuto" component={MarkersTutoScreen} />
      <Stack.Screen name="FiltersTuto" component={FiltersTutoScreen} />
      <Stack.Screen name="StatusTuto" component={StatusTutoScreen} />
      <Stack.Screen name="PlacesTuto" component={PlacesTutoScreen} />
      <Stack.Screen name="MenuTuto" component={MenuTutoScreen} />
    </Stack.Navigator>
  )
}

// MAP
const StackMap = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}
const StackUser = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  )
}
const StackDogs = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dogs" component={DogsScreen} />
      <Stack.Screen name="EditDog" component={EditDogScreen} />
      <Stack.Screen name="DeleteDog" component={DeleteDogScreen} />
      <Stack.Screen name="AddDog" component={AddDogScreen} />
    </Stack.Navigator>
  )
}
const StackFriends = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="BlockFriend" component={BlockFriendScreen} />
      <Stack.Screen name="DeleteFriend" component={DeleteFriendScreen} />
      <Stack.Screen name="InfosFriend" component={InfosFriendScreen} />

    </Stack.Navigator>
  )
}
const StackLogout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={LogoutScreen} />
    </Stack.Navigator>
  )
}
const StackAddPlace = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="AreYouThere" component={AreYouThereScreen} />
      <Stack.Screen name="ChoosePlaceCoords" component={ChoosePlaceCoordsScreen} />
      <Stack.Screen name="ChoosePlaceAddress" component={ChoosePlaceAddressScreen} />
      <Stack.Screen name="ConfirmPlaceAddress" component={ConfirmPlaceAddressScreen} />
      <Stack.Screen name="FillPlaceInfos" component={FillPlaceInfosScreen} />
    </Stack.Navigator>
  )
}
const StackEditPlace = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="EditPlaceInfos" component={EditPlaceInfosScreen} />
      <Stack.Screen name="EditPlaceAddress" component={EditPlaceAddressScreen} />
    </Stack.Navigator>
  )
}
const CustomDrawerContent = (props) => {
  const user = useSelector(state => state.user.value)
  return (
    <View style={styles.drawerContainer}>

      <TouchableOpacity style={styles.avatarContainer} onPress={() => props.navigation.navigate('Mon compte')}>
        <Image source={{ uri: user?.infos ? user.infos.photo : userAvatarUrl }} style={styles.avatar} />
        <View style={styles.userNames}>
          <Text style={styles.userName}>{user?.infos ? user.infos.firstname : 'no_name'}</Text>
          <Text style={styles.userName}>{user?.infos ? user.infos.lastname : 'no_name'}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.drawerItems}>

        <TouchableOpacity onPress={() => props.navigation.navigate('Mon compte')}>
          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon icon={faUserCircle} size={30} style={{ color: globalStyle.greenPrimary }}></FontAwesomeIcon>
            <Text style={styles.drawerItem}>Mon compte</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Mes chiens')}>
          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon icon={faDog} size={30} style={{ color: globalStyle.greenPrimary }}></FontAwesomeIcon>
            <Text style={styles.drawerItem}>Mes chiens</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Mes amis')}>
          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon icon={faUserFriends} size={30} style={{ color: globalStyle.greenPrimary }}></FontAwesomeIcon>
            <Text style={styles.drawerItem}>Mes amis</Text>
          </View>
        </TouchableOpacity>

        <View style={{ width: '100%', height: 1, backgroundColor: '#cccccc', marginVertical: 20 }}></View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Deconnexion')}>
          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon icon={faSignOut} size={15} style={{ color: globalStyle.greenPrimary }}></FontAwesomeIcon>
            <Text style={styles.drawerItemLogout}>Déconnexion</Text>
          </View>
        </TouchableOpacity>

        {/* hidden items */}
        <View style={{ width: '100%', height: 1, backgroundColor: '#cccccc', marginVertical: 20 }}></View>
        <TouchableOpacity onPress={() => props.navigation.navigate('_Map')}>
          <Text style={styles.drawerItemLogout}>_Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('_AddPlace')}>
          <Text style={styles.drawerItemLogout}>_AddPlace</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('_EditPlace')}>
          <Text style={styles.drawerItemLogout}>_EditPlace</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
const DrawerMap = () => {
  return (
    <Drawer.Navigator initialRouteName='_Map' drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Mon compte" component={StackUser} />
      <Drawer.Screen name="Mes chiens" component={StackDogs} />
      <Drawer.Screen name="Mes amis" component={StackFriends} />
      <Drawer.Screen name="Deconnexion" component={StackLogout} />
      <Drawer.Screen name="_Map" component={StackMap} options={{ headerShown: false, drawerItemStyle: { display: '_none' } }} />
      <Drawer.Screen name="_AddPlace" component={StackAddPlace} options={{ drawerItemStyle: { display: '_none' } }} />
      <Drawer.Screen name="_EditPlace" component={StackEditPlace} options={{ drawerItemStyle: { display: '_none' } }} />
    </Drawer.Navigator>
  )
}



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Login" component={StackLogin} />
            <Tab.Screen name="Tuto" component={StackTuto} />
            <Tab.Screen name="Map" component={DrawerMap} />
            <Tab.Screen name="Test" component={TestScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

// STYLE
import { globalStyle, userAvatarUrl } from './config'; // global style properties
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  avatarContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'flex-end',
    padding: 20,
  },
  avatar: {
    // backgroundColor:'red',
    width: 80,
    height: 80,
    borderRadius: 80,
    // resizeMode: 'contain',
  },
  userNames: {
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: globalStyle.h2,
    marginLeft: 10,
  },
  drawerItems: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItem: {
    fontSize: globalStyle.h3,
    paddingVertical: 15,
    color: '#333333',
    marginLeft: 20,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemLogout: {
    fontSize: globalStyle.h4,
    paddingVertical: 15,
    color: '#666666',
    marginLeft: 10,
  },
});
