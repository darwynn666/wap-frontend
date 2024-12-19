import { Marker } from "react-native-maps";

export default MarkerPlace = ({ placesMarker,setSelectedPlace, mapRef, setPopUpPlacesVisibility, popupSpeed }) => {
    const onPlaceMarkerPress = async (place) => {
      
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
        mapRef.current.animateToRegion(adjustedRegion, popupSpeed);
        setTimeout(() => {
          setPopUpPlacesVisibility(true);
        }, popupSpeed);
      }
    };
    let icon = "";
    switch (placesMarker.type) {
      case "restaurants":
        icon = require("../../../assets/icons/icon_restaurant.png");
        break;
      case "bars":
        icon = require("../../../assets/icons/icon_bar.png");
        break;
      case "garbages":
        icon = require("../../../assets/icons/icon_toilet.png");
        break;
      case "shops":
        icon = require("../../../assets/icons/icon_shop.png");
        break;
      case "parks":
        icon = require("../../../assets/icons/icon_park.png");
        break;
      default:
        icon = require("../../../assets/icons/icon_location.png");
    }
    return (
      <Marker
        anchor={{ x: 1.0, y: 1.0 }}
        coordinate={{
          latitude: placesMarker.location.coordinates[1],
          longitude: placesMarker.location.coordinates[0],
        }}
        image={icon}
        onPress={() => onPlaceMarkerPress(placesMarker)}
      />
    );
  };