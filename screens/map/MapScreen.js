import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserCoordinates, setUserFriends } from "../../reducers/user";
import { setPlace } from "../../reducers/places";
import { setTriggerNewPlace } from "../../reducers/newplace";

import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationCrosshairs,
  faMapMarker,
  faBars,
  faCircle,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { globalStyle } from "../../config";
import { BACKEND_URL } from "../../config";

import MenuFiltersComponent from "./components/MenuFiltersComponent";
import MenuStatusComponent from "./components/MenuStatusComponent";
import MenuAddPlaceComponent from "./components/MenuAddPlaceComponent";

import MapPopUpPlace from "./components/MapPopUpPlace";
import MapPopUpUser from "./components/MapPopUpUser";

import MarkerPlace from "./components/MarkerPlace";
import MarkerPlaceUsersCounter from "./components/MarkerPlaceUsersCounter";
import MarkerUser from "./components/MarkerUser";

const lodash = require("lodash");

// COMPONENT
export default function MapScreen2() {
  const POP_UP_SPEED = 500;
  const REFRESH_USER_INTERVAL = 5000;

  const navigation = useNavigation();

  const mapRef = useRef(null);

  const [popUpPlacesVisibility, setPopUpPlacesVisibility] = useState(false);
  const [popUpUsersVisibility, setPopUpUsersVisibility] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(false);
  const [positionMarker, setPositionMarker] = useState();

  const [visibleRegion, setVisibleRegion] = useState();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings.value);
  const usersDisplayIgnored = settings.usersDisplayIgnored;
  const placesDisplayIgnored = settings.placesDisplayIgnored;

  const placesData = useSelector((state) => state.places.value);
  // const [placesData, setPlacesData] = useState([]);
  const triggerNewPlace = useSelector((state) => state.newplace.value);

  const [placesDataRegionFilter, setPlacesDataRegionFilter] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [usersData, setUsersData] = useState([]);
  const [usersDataRegionFilter, setUsersDataRegionFilter] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  // force position
  const [forcePosition, setForcePosition] = useState();
  const [forcePositionColor, setForcePositionColor] = useState("#666666");

  const intervalRef = useRef(null);

  //check friends to update
  useEffect(() => {
    const updateData = async () => {
      const request = await fetch(`${BACKEND_URL}/friends/${user.token}`);
      const response = await request.json();
      const isTheSame = lodash.isEqual(response.data, user.friends);
      if (!isTheSame)
        // console.log("refresh friends")
        dispatch(setUserFriends(response.data));
    };

    // start
    intervalRef.current = setInterval(updateData, REFRESH_USER_INTERVAL);

    // clean interval
    return () => clearInterval(intervalRef.current);
  }, []);

  // user position
  useEffect(() => {
    (async () => {
      let isFirstUpdate = true;
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          if (location.coords) {
            console.log("loc ok", location.coords);
          }
          setCurrentPosition(location.coords);
          if (isFirstUpdate) {
            // console.log('first upd')
            setVisibleRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05, //0.05 equivaut à environ 5km
              longitudeDelta: 0.05,
            });
            // console.log('first upd ____')
            isFirstUpdate = false;
          }
        });
      }
    })();
  }, []);

  const [firstRefresRegion, setFirstRefresRegion] = useState(true);

  //handle anim map
  useEffect(() => {
    async () => {
      if (visibleRegion.latitude && visibleRegion.latitude != 0) {
        if (firstRefresRegion) {
          if (mapRef.current) {
            console.log("map current");
            mapRef.current.animateToRegion(visibleRegion, 3000);
          }
          setFirstRefresRegion(false);
        }
      }
    };
  }, [currentPosition]);

  useEffect(() => {
    (async () => {
      if (visibleRegion.latitude && visibleRegion.latitude != 0) {
        console.log("before dispatch");
        //set dispatch
        dispatch(
          setUserCoordinates({
            type: "Point",
            coordinates: [currentPosition.longitude, currentPosition.latitude],
          })
        );

        //update to bdd
        const request = await fetch(
          `${BACKEND_URL}/users/${user.token}/coordinates`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              longitude: currentPosition.longitude,
              latitude: currentPosition.latitude,
            }),
          }
        );
        const response = await request.json();
      }
    })();
    //diptach position
  }, [currentPosition]);

  const filterMarkers = (region) => {
    console.log("filter region");
    // if dezoom
    if (region.latitudeDelta > 1) {
      setPlacesDataRegionFilter([]);
      setUsersDataRegionFilter([]);
    } else {
      //filter places
      console.log("nb placesData", placesData.length);
      if (placesData.length > 0) {
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
      }
      if (usersData.length > 0) {
        //filter users
        console.log("nb userdata", usersData.length);
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
    }
    // console.log('marker 0', markers[0])
    region.latitude && setVisibleRegion(region);
  };

  useEffect(() => {
    if (visibleRegion) {
      filterMarkers(visibleRegion);
    }
  }, [placesData, usersData, visibleRegion]);

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
  const handlePress = (event) => {
    // console.log(event.nativeEvent)
    if (forcePosition) {
      const coords = event.nativeEvent.coordinate;
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
      // setPlacesData(placesData.data);
      console.log("places data")
      dispatch(setPlace(placesData.data));
      const end = Date.now(); // Fin du chronométrage
      console.log(`Execution Time Places: ${end - start} ms`);
    }
  };

  const refreshMap = () => {
    getUsers();
    getPlaces();
  };

  const isAccepted = (id) => {
    return user.friends.accepted.some((friend) => friend == id);
  };

  const isBlocked = (id) => {
    return user.friends.blocked.some((friend) => friend == id);
  };

  useEffect(() => {
    if (triggerNewPlace) {
      console.log("get places,set trigger false");
      getPlaces();
      dispatch(setTriggerNewPlace(false));
    }
  }, [triggerNewPlace]);
  // console.log('triggerNewPlace',triggerNewPlace)

  useEffect(() => {
    getUsers()
    getPlaces();
  }, []);

  //create markers
  const places = placesDataRegionFilter
    .filter(
      (place) => !placesDisplayIgnored.some((filter) => filter == place.type)
    )
    .map((placesMarker, i) => {
      return (
        <MarkerPlace
          key={i}
          placesMarker={placesMarker}
          setSelectedPlace={setSelectedPlace}
          mapRef={mapRef}
          setPopUpPlacesVisibility={setPopUpPlacesVisibility}
          popupSpeed={POP_UP_SPEED}
        />
      );
    });

  const placesUsersCounter = placesDataRegionFilter
    .filter(
      (place) => !placesDisplayIgnored.some((filter) => filter == place.type)
    )
    .filter((place) => place.users.length > 0)
    .map((placesMarker, i) => {
      return <MarkerPlaceUsersCounter key={i} placesMarker={placesMarker} />;
    });

  const users = usersDataRegionFilter
    .filter((_user) => {
      return _user.status != "off" && user.status != "off";
      //filter by the status of the current user
    })
    .filter((userData) => {
      //filter by the filter menu
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
    .filter((x) => {
      //exclude the current user
      return x._id != user._id;
    })
    .filter((userFiltered) => {
      //filter is in place
      return !placesDataRegionFilter.some((placeFiltered) =>
        placeFiltered.users.includes(userFiltered._id)
      );
    })
    .map((markerUser, i) => {
      return (
        <MarkerUser
          key={i}
          markerUser={markerUser}
          isAccepted={isAccepted}
          isBlocked={isBlocked}
          setSelectedUser={setSelectedUser}
          mapRef={mapRef}
          setPopUpUsersVisibility={setPopUpUsersVisibility}
          popupSpeed={POP_UP_SPEED}
        />
      );
    });

  // console.log('current position', currentPosition)
  return (
    <View style={styles.container}>
      <MapView
        key="mainMap"
        // key={`map-${Date.now()}`}
        ref={mapRef}
        initialRegion={visibleRegion}
        mapType={settings.mapDisplayIgnored}
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={!forcePosition}
        showsMyLocationButton={!forcePosition}
        onPress={(event) => handlePress(event)}
        onRegionChangeComplete={(region) => setVisibleRegion(region)}
        moveOnMarkerPress={false}
      >
        {forcePosition && positionMarker}
        {places}
        {placesUsersCounter}
        {users}
      </MapView>

      {/* popUp of marker */}
      {/* places */}
      <MapPopUpPlace
        place={selectedPlace}
        visibility={popUpPlacesVisibility}
        user={user}
        placesData={placesData}
        // setPlacesData={setPlacesData}
        setSelectedPlace={setSelectedPlace}
        setPopUpPlacesVisibility={setPopUpPlacesVisibility}
      />

      {/* users */}
      <MapPopUpUser
        popUpUsersVisibility={popUpUsersVisibility}
        setPopUpUsersVisibility={setPopUpUsersVisibility}
        selectedUser={selectedUser}
        currentUser={user}
      />

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <FontAwesomeIcon icon={faBars} color="black" size={30} />
        {user.friends.incoming.length > 0 && (
          <FontAwesomeIcon icon={faCircle} size={10} style={styles.notifIcon} />
        )}
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

      <TouchableOpacity style={styles.refresh} onPress={() => refreshMap()}>
        <FontAwesomeIcon
          icon={faRefresh}
          color={globalStyle.grayLight}
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
          <MenuAddPlaceComponent />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  notifIcon: {
    color: "salmon",
    marginLeft: -10,
    marginBottom: -15,
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
  refresh: {
    // backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // left: Dimensions.get('window').width / 2 - 20,
    right: 10,
    top: 80,
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
