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
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
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
import { BACKEND_URL } from "../../config";

import RestaurantIcon from "../../assets/icons/icon_restaurant.png";

import MapPopUpModal from "./components/MapPopUpModal";

// COMPONENT
export default function MapScreen2() {
  const navigation = useNavigation();

  const mapRef = useRef(null);

  const [popUpPlacesVisibility, setPopUpPlacesVisibility] = useState(false);
  const [popUpUsersVisibility, setPopUpUsersVisibility] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(false);
  const [positionMarker, setPositionMarker] = useState();
  const [mapType, setMapType] = useState("standard");
  const [visibleRegion, setVisibleRegion] = useState();

  const user = useSelector((state) => state.user.value);
  const settings = useSelector((state) => state.settings.value);
  const usersDisplayIgnored = settings.usersDisplayIgnored;
  const placesDisplayIgnored = settings.placesDisplayIgnored;

  const [placesData, setPlacesData] = useState([]);
  const [placesDataRegionFilter, setPlacesDataRegionFilter] = useState([]);

  const [usersData, setUsersData] = useState([]);
  const [usersDataRegionFilter, setUsersDataRegionFilter] = useState([]);

  // force position
  const [forcePosition, setForcePosition] = useState();
  const [forcePositionColor, setForcePositionColor] = useState("#666666");

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
    console.log(region);
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

  useEffect(() => {
    getPlaces();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  //handle marker interaction
  //places
  const onPlaceMarkerPress = (coordinate) => {
    const adjustedRegion = {
      latitude: coordinate.latitude + 0.01, // offset to show marker under marker
      longitude: coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    // move to marker
    if (mapRef.current) {
      mapRef.current.animateToRegion(adjustedRegion, 1000);
      setTimeout(() => {
        setPopUpPlacesVisibility(true);
      }, 1000);
    }
  };

  //users
  const onUsersMarkerPress = (coordinate) => {
    const adjustedRegion = {
      latitude: coordinate.latitude + 0.01, // offset to show marker under marker
      longitude: coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    // move to marker
    if (mapRef.current) {
      mapRef.current.animateToRegion(adjustedRegion, 1000);
      setTimeout(() => {
        setPopUpPlacesVisibility(true);
      }, 1000);
    }
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
          coordinate={{
            latitude: placesMarker.location.coordinates[1],
            longitude: placesMarker.location.coordinates[0],
          }}
          image={icon}
          onPress={() =>
            onPlaceMarkerPress({
              latitude: placesMarker.location.coordinates[1],
              longitude: placesMarker.location.coordinates[0],
            })
          }
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
            onUsersMarkerPress({
              latitude: user.currentLocation.coordinates[1],
              longitude: user.currentLocation.coordinates[0],
            })
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
      >
        {forcePosition && positionMarker}
        {places}
        {users}
      </MapView>

      {/* popUp of marker */}
      <MapPopUpModal
        visibility={popUpPlacesVisibility}
        onRequestClose={() => setPopUpPlacesVisibility(false)}
      ></MapPopUpModal>

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
});
