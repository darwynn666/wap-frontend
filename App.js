import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// redux 
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user'
const store = configureStore({
  reducer: { user },
})

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
import FriendsScreen from './screens/map/friends/FriendsScreen';
import BlockFriendScreen from './screens/map/friends/BlockFriendScreen';
import DeleteFriendScreen from './screens/map/friends/DeleteFriendScreen';
import InfosFriendScreen from './screens/map/friends/InfosFriendScreen';
import AreYouThereScreen from './screens/map/addplace/AreYouThereScreen';
import ChoosePlaceCoordsScreen from './screens/map/addplace/ChoosePlaceCoordsScreen';
import ChoosePlaceAddressScreen from './screens/map/addplace/ChoosePlaceAddressScreen';
import ConfirmPlaceAddressScreen from './screens/map/addplace/ConfirmPlaceAddressScreen';
import FillPlaceInfosScreen from './screens/map/addplace/FillPlaceInfosScreen';
import EditPlaceInfosScreen from './screens/map/editplace/EditPlaceInfosScreen';
import EditPlaceAddressScreen from './screens/map/editplace/EditPlaceAddressScreen';

import { StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator() // bottom tabs are for dev only, to be replaced by 'Stack'

// LOGIN
const StackLogin = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
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
    <Stack.Navigator screenOptions={{ headerShown: true }}>
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
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}
const StackUser = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  )
}
const StackDogs = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Dogs" component={DogsScreen} />
      <Stack.Screen name="EditDog" component={EditDogScreen} />
      <Stack.Screen name="DeleteDog" component={DeleteDogScreen} />
    </Stack.Navigator>
  )
}
const StackFriends = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="BlockFriend" component={BlockFriendScreen} />
      <Stack.Screen name="DeleteFriend" component={DeleteFriendScreen} />
      <Stack.Screen name="InfosFriend" component={InfosFriendScreen} />
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
const DrawerMap = () => {
  return (
    <Drawer.Navigator initialRouteName='_Map' screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Mon compte" component={StackUser} />
      <Drawer.Screen name="Mes chiens" component={StackDogs} />
      <Drawer.Screen name="Mes amis" component={StackFriends} />
      <Drawer.Screen name="_Map" component={StackMap} options={{ drawerItemStyle: { display: '_none' } }} />
      <Drawer.Screen name="_AddPlace" component={StackAddPlace} options={{ drawerItemStyle: { display: '_none' } }} />
      <Drawer.Screen name="_EditPlace" component={StackEditPlace} options={{ drawerItemStyle: { display: '_none' } }} />
    </Drawer.Navigator>
  )
}



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Login" component={StackLogin} />
          <Tab.Screen name="Tuto" component={StackTuto} />
          <Tab.Screen name="Map" component={DrawerMap} />
          <Tab.Screen name="Test" component={TestScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// STYLE
import { globalStyle } from './config'; // global style properties
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
