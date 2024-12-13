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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleChevronRight,
  faLocationCrosshairs,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import MenuFiltersComponent from "./components/MenuFiltersComponent";
import MenuStatusComponent from "./components/MenuStatusComponent";
import { globalStyle } from "../../config";
import { BACKEND_URL } from "../../config";

import RestaurantIcon from "../../assets/icons/icon_restaurant.png";

// COMPONENT
export default function MapScreen2() {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(false);
  const [positionMarker, setPositionMarker] = useState();
  const [mapType, setMapType] = useState("standard");
  const [visibleRegion, setVisibleRegion] = useState(null);

  const user = useSelector((state) => state.user.value);
  const settings = useSelector((state) => state.settings.value);
  const usersDisplayIgnored = settings.usersDisplayIgnored;
  const placesDisplayIgnored = settings.placesDisplayIgnored;

  const [placesData, setPlacesData] = useState([]);
  const [placesDataFiltered, setPlacesDataFiltered] = useState([]);

  const [usersData, setUsersData] = useState([]);
  const [usersDataFiltered, setUsersDataFiltered] = useState([]);

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
        });
      }
    })();
  }, []);

  const handleRegionChange = (region) => {
    // console.log('marker 0', markers[0])
    setVisibleRegion(region);
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

  const filterPlaces = () => {
    //filter places
    console.log("filter places");
    const start = Date.now(); // Début du chronométrage
    setPlacesDataFiltered(
      placesData.filter(
        (place) => !placesDisplayIgnored.some((filter) => filter == place.type)
      )
    );
    const end = Date.now(); // Fin du chronométrage
    console.log(`Execution Time Places filtering: ${end - start} ms`);
  };

  const filterUsers = () => {
    //filter places
    console.log("filter users");
    const start = Date.now(); // Début du chronométrage
    setUsersDataFiltered(
      usersData.filter(
        (users) => {
          //
        }
      )
    );
    const end = Date.now(); // Fin du chronométrage
    console.log(`Execution Time Places filtering: ${end - start} ms`);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  useEffect(() => {
    filterPlaces();
  }, [placesData, placesDisplayIgnored]);

  useEffect(() => {
    getUsers();
  }, []);
  
  useEffect(() => {
    filterUsers();
  }, [usersData,usersDisplayIgnored]);
  

  const places = placesDataFiltered.map((e, i) => {
    let icon = "";
    switch (e.type) {
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
          latitude: e.location.coordinates[1],
          longitude: e.location.coordinates[0],
        }}
        image={icon}
      />
    );
  });

  const users = usersData.map((e, i) => {
    let icon = require("../../assets/icons/icon_dog_gray.png");
    //need to check if friends or blocked

    return (
      <Marker
        key={i}
        coordinate={{
          latitude: e.currentLocation.coordinates[1],
          longitude: e.currentLocation.coordinates[0],
        }}
        // pinColor="royalblue"
        image={icon}
      ></Marker>
    );
  });

  // console.log('current position', currentPosition)
  return (
    <View style={styles.container}>
      {currentPosition && (
        <MapView
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.05, //0.05 equivaut à environ 5km
            longitudeDelta: 0.05,
          }}
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
      )}

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <FontAwesomeIcon icon={faCircleChevronRight} color="black" size={30} />
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
