import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUserFriends } from "../../reducers/user";

import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleChevronRight,
  faLocationCrosshairs,
  faMapMarker,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import MenuFiltersComponent from "./components/MenuFiltersComponent";
import MenuStatusComponent from "./components/MenuStatusComponent";
import { globalStyle } from "../../config";
import { dogAvatarUrl, userAvatarUrl, defaultPlaceUrl } from "../../config";
import { BACKEND_URL } from "../../config";

import RestaurantIcon from "../../assets/icons/icon_restaurant.png";

import MapPopUpModal from "./components/MapPopUpModal";
import MenuBottomItem from "./components/MenuBottomItem";
import {
  IconDogGreen,
  IconDogRed,
  IconDogBlue,
  IconDogBlueLight,
  IconPhone,
  IconEmail,
  IconMessage,
} from "../../globalComponents/Icons";
import { ScrollView } from "react-native-gesture-handler";
import { callNumber, smsNumber, sendEmail } from "../../modules/tools";

// COMPONENT
export default function MapScreen2() {
  const navigation = useNavigation();

  const mapRef = useRef(null);

  const [popUpPlacesVisibility, setPopUpPlacesVisibility] = useState(false);
  const [popUpUsersVisibility, setPopUpUsersVisibility] = useState(false);
  const POP_UP_SPEED = 500;

  const [currentPosition, setCurrentPosition] = useState(false);
  const [positionMarker, setPositionMarker] = useState();
  const [mapType, setMapType] = useState("standard");
  const [visibleRegion, setVisibleRegion] = useState();

  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings.value);
  const usersDisplayIgnored = settings.usersDisplayIgnored;
  const placesDisplayIgnored = settings.placesDisplayIgnored;

  const [placesData, setPlacesData] = useState([]);
  const [placesDataRegionFilter, setPlacesDataRegionFilter] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [usersData, setUsersData] = useState([]);
  const [usersDataRegionFilter, setUsersDataRegionFilter] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  // force position
  const [forcePosition, setForcePosition] = useState();
  const [forcePositionColor, setForcePositionColor] = useState("#666666");

  const STATUS_COLOR = {
    walk: globalStyle.greenPrimary,
    pause: globalStyle.bluePrimary,
    off: globalStyle.grayPrimary,
  };

  // user position
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          setVisibleRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05, //0.05 equivaut à environ 5km
            longitudeDelta: 0.05,
          });
        });
      }
    })();
  }, []);

  const handleRegionChange = (region) => {
    // console.log(region);
    // if dezoom
    if (region.latitudeDelta > 1) {
      setPlacesDataRegionFilter([]);
      setUsersDataRegionFilter([]);
    } else {
      //filter places
      setPlacesDataRegionFilter(
        placesData.filter((marker) => {
          if (visibleRegion.latitude) {
            return (
              marker.location.coordinates[1] >=
                region.latitude - region.latitudeDelta / 2 &&
              marker.location.coordinates[1] <=
                region.latitude + region.latitudeDelta / 2 &&
              marker.location.coordinates[0] >=
                region.longitude - region.longitudeDelta / 2 &&
              marker.location.coordinates[0] <=
                region.longitude + region.longitudeDelta / 2
            );
          }
        })
      );
      //filter users
      setUsersDataRegionFilter(
        usersData.filter((marker) => {
          if (visibleRegion.latitude) {
            return (
              marker.currentLocation.coordinates[1] >=
                region.latitude - region.latitudeDelta / 2 &&
              marker.currentLocation.coordinates[1] <=
                region.latitude + region.latitudeDelta / 2 &&
              marker.currentLocation.coordinates[0] >=
                region.longitude - region.longitudeDelta / 2 &&
              marker.currentLocation.coordinates[0] <=
                region.longitude + region.longitudeDelta / 2
            );
          }
        })
      );
    }
    // console.log('marker 0', markers[0])
    region.latitude && setVisibleRegion(region);
  };

  const toggleForcePosition = () => {
    setForcePosition(!forcePosition);
  };

  useEffect(() => {
    if (forcePosition) {
      setForcePositionColor("black");
    } else {
      setForcePositionColor("#cccccc");
    }
  }, [forcePosition]);

  // on map press : force position, add place, ...
  const handlePress = (region) => {
    if (forcePosition) {
      const coords = region.nativeEvent.coordinate;
      setPositionMarker(
        <Marker coordinate={coords}>
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            size={20}
            color="royalblue"
          />
        </Marker>
      );
      setCurrentPosition(coords);
    }
  };

  // markers users
  const getUsers = async () => {
    console.log("getUsers");
    const start = Date.now(); // Début du chronométrage
    const usersResponse = await fetch(`${BACKEND_URL}/users`);
    const usersData = await usersResponse.json();
    if (usersData.result) {
      //filter valid coordinate
      setUsersData(usersData.data);
      const end = Date.now(); // Fin du chronométrage
      console.log(`Execution Time user: ${end - start} ms`);
    }
  };

  // markers places
  const getPlaces = async () => {
    console.log("get places");
    const start = Date.now(); // Début du chronométrage
    const placesResponse = await fetch(`${BACKEND_URL}/places`);
    const placesData = await placesResponse.json();
    if (placesData.result) {
      setPlacesData(placesData.data);
      const end = Date.now(); // Fin du chronométrage
      console.log(`Execution Time Places: ${end - start} ms`);
    }
  };

  const isAccepted = (id) => {
    return user.friends.accepted.some((friend) => friend == id);
  };

  const isBlocked = (id) => {
    return user.friends.blocked.some((friend) => friend == id);
  };

  /**
   *
   * @param {*} user_id
   * @param {*} place_id
   * @returns
   */
  const isUserInPlace = (user_id, place) => {
    // console.log("selectedplace", place);
    if (!place) return false;
    else return place.users.includes(user_id);
    // console.log(place.users.includes(user_id))
    //
  };

  useEffect(() => {
    getPlaces();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  //handle marker interaction
  //places
  const onPlaceMarkerPress = async (place) => {
    //
    setSelectedPlace(place);
    const { location } = place;
    const latitude = location.coordinates[1];
    const longitude = location.coordinates[0];

    const adjustedRegion = {
      latitude: latitude + 0.01, // offset to show marker under marker
      longitude: longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    // move to marker
    if (mapRef.current) {
      mapRef.current.animateToRegion(adjustedRegion, POP_UP_SPEED);
      setTimeout(() => {
        setPopUpPlacesVisibility(true);
      }, POP_UP_SPEED);
    }
  };

  //users
  const onUsersMarkerPress = async (coordinate, user) => {
    // get user info by id
    const usersRequest = await fetch(`${BACKEND_URL}/users/${user._id}`);
    const usersResponse = await usersRequest.json();
    const usersData = usersResponse.data;

    let _user = { friendType: "" };
    //check status of user by id
    const friendType = [
      { name: "accepted", value: isAccepted(user._id) },
      { name: "blocked", value: isBlocked(user._id) },
      {
        name: "unknowed",
        value: !(isAccepted(user._id) || isBlocked(user._id)),
      },
    ];

    _user.friendType = friendType
      .filter((x) => x.value === true)
      .map((x) => x.name)[0];

    const userAllInfos = { ..._user, ...usersData };
    setSelectedUser(userAllInfos);

    const adjustedRegion = {
      latitude: coordinate.latitude + (isAccepted(user._id) ? 0.035 : 0.01), // offset to show marker under marker
      longitude: coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    // move to marker
    if (mapRef.current) {
      mapRef.current.animateToRegion(adjustedRegion, POP_UP_SPEED);
      setTimeout(() => {
        setPopUpUsersVisibility(true);
      }, POP_UP_SPEED);
    }
  };

  //popup button handler
  const handleOutcomingFriend = async (friendTo) => {
    setPopUpUsersVisibility(false);

    const request = await fetch(
      `${BACKEND_URL}/friends/${user.token}/outcoming/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendFrom: user._id,
          friendTo: friendTo._id,
        }),
      }
    );

    const response = await request.json();
    if (response.result) {
      Alert.alert("La demande a été envoyé");
      dispatch(setUserFriends(response.userFromFriends));
    } else {
      Alert.alert("La demande a déjà été envoyée");
    }
  };

  const askFriendPress = async () => {
    const firstname = selectedUser.infos.firstname;
    const id = selectedUser;
    Alert.alert(
      `Demander ${firstname} en ami ?`,
      "Vous pourrez échanger vos informations et vous voir sur la carte",
      [
        { text: "Non", onPress: () => setPopUpUsersVisibility(false) },
        {
          text: "Oui",
          onPress: () => handleOutcomingFriend(selectedUser),
        },
      ]
    );
  };

  const handleBlockFriend = async (friendTo) => {
    setPopUpUsersVisibility(false);

    const request = await fetch(`${BACKEND_URL}/friends/${user.token}/block/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friendToBlock: friendTo._id,
      }),
    });

    const response = await request.json();
    if (response.result) {
      Alert.alert("Cet utilisateur est maintenant bloqué");
      dispatch(setUserFriends(response.userFriends));
    } else {
      Alert.alert("Erreur lors de la demande de bloquage");
    }
  };

  const blockFriendPress = async () => {
    const firstname = selectedUser.infos.firstname;
    const id = selectedUser;
    Alert.alert(
      `Bloquer ${firstname} ?`,
      "Cet utilisateur ne pourra plus vous voir sur la carte.",
      [
        { text: "Non", onPress: () => setPopUpUsersVisibility(false) },
        {
          text: "Oui",
          onPress: () => handleBlockFriend(selectedUser),
        },
      ]
    );
  };

  const ImHerePressed = async (user_id, place_id) => {
    //set value in bdd
    const request = await fetch(
      `${BACKEND_URL}/places/${place_id}/users/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const response = await request.json();
    // set value in place usestate
    setPlacesData([
      ...placesData.map((x) => {
        if (x._id === place_id) x.users = response.users;
        return x;
      }),
    ]);
    //
    const tmpPlaces = { ...selectedPlace };
    tmpPlaces.users = response.users;
    setSelectedPlace(tmpPlaces);
  };

  //create markers
  const places = placesDataRegionFilter
    .filter(
      (place) => !placesDisplayIgnored.some((filter) => filter == place.type)
    )
    .map((placesMarker, i) => {
      let icon = "";
      switch (placesMarker.type) {
        case "restaurants":
          icon = require("../../assets/icons/icon_restaurant.png");
          break;
        case "bars":
          icon = require("../../assets/icons/icon_bar.png");
          break;
        case "garbages":
          icon = require("../../assets/icons/icon_toilet.png");
          break;
        case "shops":
          icon = require("../../assets/icons/icon_shop.png");
          break;
        case "parks":
          icon = require("../../assets/icons/icon_park.png");
          break;
        default:
          icon = require("../../assets/icons/icon_location.png");
      }
      return (
        <Marker
          key={i}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{
            latitude: placesMarker.location.coordinates[1],
            longitude: placesMarker.location.coordinates[0],
          }}
          image={icon}
          onPress={() => onPlaceMarkerPress(placesMarker)}
        />
      );
    });

  const placesUsersCounter = placesDataRegionFilter
    .filter(
      (place) => !placesDisplayIgnored.some((filter) => filter == place.type)
    )
    .filter((place) => place.users.length > 0)
    .map((placesMarker, i) => {
      const nbUser = placesMarker.users.length;

      const images = [
        require(`../../assets/icons/icon_counter_0.png`),
        require(`../../assets/icons/icon_counter_1.png`),
        require(`../../assets/icons/icon_counter_2.png`),
        require(`../../assets/icons/icon_counter_3.png`),
        require(`../../assets/icons/icon_counter_4.png`),
        require(`../../assets/icons/icon_counter_5.png`),
        require(`../../assets/icons/icon_counter_6.png`),
        require(`../../assets/icons/icon_counter_7.png`),
        require(`../../assets/icons/icon_counter_8.png`),
        require(`../../assets/icons/icon_counter_9.png`),
        require(`../../assets/icons/icon_counter_10.png`),
      ];

      return (
        <Marker
          key={i}
          anchor={{ x: 0, y: 0 }}
          coordinate={{
            latitude: placesMarker.location.coordinates[1],
            longitude: placesMarker.location.coordinates[0],
          }}
          image={images[nbUser <= 10 ? nbUser : 10]}
        />
      );
    });

  const users = usersDataRegionFilter
    .filter((userData) => {
      const _isAccepted = isAccepted(userData._id);
      const _isBlocked = isBlocked(userData._id);
      const _unkow = !(_isAccepted || _isBlocked);
      let isShown = true;
      if (usersDisplayIgnored.includes("friends"))
        isShown = isShown && !_isAccepted;
      if (usersDisplayIgnored.includes("blocked"))
        isShown = isShown && !_isBlocked;
      if (usersDisplayIgnored.includes("unknows")) isShown = isShown && !_unkow;
      return isShown;
    })
    .map((user, i) => {
      let icon = require("../../assets/icons/icon_dog_gray.png");
      //need to check if friends or blocked
      if (isAccepted(user._id))
        icon = require("../../assets/icons/icon_dog_green.png");
      else if (isBlocked(user._id))
        icon = require("../../assets/icons/icon_dog_red.png");

      return (
        <Marker
          key={i}
          coordinate={{
            latitude: user.currentLocation.coordinates[1],
            longitude: user.currentLocation.coordinates[0],
          }}
          // pinColor="royalblue"
          image={icon}
          onPress={() =>
            onUsersMarkerPress(
              {
                latitude: user.currentLocation.coordinates[1],
                longitude: user.currentLocation.coordinates[0],
              },
              user
            )
          }
        ></Marker>
      );
    });

  // console.log('current position', currentPosition)
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={visibleRegion}
        mapType={settings.mapDisplayIgnored}
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={!forcePosition}
        showsMyLocationButton={!forcePosition}
        onPress={(region) => handlePress(region)}
        onRegionChangeComplete={(region) => handleRegionChange(region)}
        moveOnMarkerPress={false}
      >
        {forcePosition && positionMarker}
        {places}
        {placesUsersCounter}
        {users}
      </MapView>

      {/* popUp of marker */}
      {/* places */}
      <MapPopUpModal
        visibility={popUpPlacesVisibility}
        onRequestClose={() => setPopUpPlacesVisibility(false)}
      >
        {selectedPlace && (
          <View style={{ width: "100%" }}>
            <View>
              <Text style={{ fontSize: globalStyle.h2, marginBottom: 10 }}>
                {selectedPlace.name}
              </Text>
              <Image
                style={{ width: "100%", height: 175, resizeMode: "cover" }}
                source={{
                  uri:
                    selectedPlace.photo != ""
                      ? selectedPlace.photo
                      : defaultPlaceUrl,
                }}
              />
            </View>
            <Text
              style={{
                marginVertical: 5,
                fontWeight: "bold",
                fontSize: globalStyle.h6,
              }}
            >
              {selectedPlace.houseNumber} {selectedPlace.street}{" "}
              {selectedPlace.postcode} {selectedPlace.city}{" "}
            </Text>
            <Text style={{ fontSize: globalStyle.h5, marginVertical: 8 }}>
              {selectedPlace.description}
            </Text>
            <View style={{ margin: 15 }}>
              <MenuBottomItem
                onPressed={() => {
                  ImHerePressed(user._id, selectedPlace._id);
                }}
                srcIsActive={
                  isUserInPlace(user._id, selectedPlace) ? (
                    <IconDogBlue />
                  ) : (
                    <IconDogBlueLight />
                  )
                }
                label="J'y suis"
              ></MenuBottomItem>
            </View>
          </View>
        )}
      </MapPopUpModal>

      {/* users */}
      <MapPopUpModal
        visibility={popUpUsersVisibility}
        onRequestClose={() => setPopUpUsersVisibility(false)}
      >
        {selectedUser.friendType == "accepted" && (
          <View style={{ width: "90%" }}>
            {/* header user info */}
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  borderColor: STATUS_COLOR[selectedUser.status],
                  borderWidth: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={{
                    uri:
                      selectedUser.infos.photo != ""
                        ? selectedUser.infos.photo
                        : userAvatarUrl,
                  }}
                />
              </View>
              <Text style={{ fontSize: globalStyle.h3 }}>
                {selectedUser.infos.firstname} {selectedUser.infos.lastname}
              </Text>
            </View>
            <View style={styles.separator}></View>
            {/* dogs view */}
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <View
                style={{
                  width: "100%",
                  minHeight: "10",
                  flexDirection: "row",
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 15,
                  marginVertical: 10,
                }}
              >
                {/* create view for each dogs */}
                {selectedUser.dogs.map((dog, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: 10,
                        borderRadius: 10,
                        borderColor: globalStyle.grayLight,
                        borderWidth: 2,
                        padding: 10,
                        height: 150,
                        width: 90,
                      }}
                    >
                      {/* dog photo */}
                      <View
                        style={{
                          width: 74,
                          height: 74,
                          marginBottom: 3,
                          borderRadius: 37,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 3,
                          borderColor: dog.isTaken
                            ? globalStyle.greenPrimary
                            : globalStyle.grayPrimary,
                        }}
                      >
                        <Image
                          style={{ width: 60, height: 60, borderRadius: 30 }}
                          source={{
                            uri: dog.photo != "" ? dog.photo : dogAvatarUrl,
                          }}
                        />
                      </View>
                      <Text
                        style={{ fontSize: globalStyle.h5, fontWeight: "bold" }}
                      >
                        {dog.name}
                      </Text>
                      <Text style={{ fontSize: globalStyle.h6 }}>
                        {dog.status}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.separator}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: 20,
              }}
            >
              <MenuBottomItem
                srcIsActive={<IconMessage />}
                onPressed={() => smsNumber(selectedUser.infos.telephone)}
              ></MenuBottomItem>
              <MenuBottomItem
                srcIsActive={<IconPhone />}
                onPressed={() => callNumber(selectedUser.infos.telephone)}
              ></MenuBottomItem>
              <MenuBottomItem
                srcIsActive={<IconEmail />}
                onPressed={() => sendEmail(selectedUser.infos.email)}
              ></MenuBottomItem>
            </View>
          </View>
        )}

        {selectedUser.friendType == "blocked" && (
          <View>
            <Text>
              Cet utilisateur est bloqué. Toutefois, vous pouvez le débloquer
              dans votre liste d'amis.
            </Text>
          </View>
        )}

        {selectedUser.friendType == "unknowed" && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              {/* MenuBottomItem is a component with an icon, a label as in filtermenu */}
              <MenuBottomItem
                srcIsActive={<IconDogGreen />}
                label="ajouter un ami"
                onPressed={() => askFriendPress()}
              ></MenuBottomItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <MenuBottomItem
                srcIsActive={<IconDogRed />}
                label="bloquer une personne"
                onPressed={() => blockFriendPress()}
              ></MenuBottomItem>
            </TouchableOpacity>
          </View>
        )}
      </MapPopUpModal>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <FontAwesomeIcon icon={faBars} color="black" size={30} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forcePosition}
        onPress={() => toggleForcePosition()}
      >
        <FontAwesomeIcon
          icon={faLocationCrosshairs}
          color={forcePositionColor}
          size={30}
        />
      </TouchableOpacity>

      <View style={styles.bottomMenu}>
        <View style={{ width: "25%", height: "100%" }}>
          <MenuFiltersComponent />
        </View>
        <View style={{ width: "48%", height: "100%" }}>
          <MenuStatusComponent />
        </View>
        <View style={{ width: "25%", height: "100%" }}>
          <TouchableOpacity style={styles.buttonAddPlace}>
            <FontAwesomeIcon
              icon={faMapMarker}
              size={30}
              color={globalStyle.buttonPrimaryBackgroundColor}
            />
            <Text style={styles.buttonAddPlaceText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    // paddingBottom: 50,
  },
  menuButton: {
    // backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  forcePosition: {
    // backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // left: Dimensions.get('window').width / 2 - 20,
    right: 50,
    top: 30,
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  bottomMenu: {
    // backgroundColor: '#ffffff',
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 0,
  },
  buttonAddPlace: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAddPlaceText: {
    textAlign: "center",
  },
  marker: {},
  separator: {
    borderBottomColor: globalStyle.grayPrimary,
    borderBottomWidth: 1,
    height: 1,
    width: "100%",
  },
});
