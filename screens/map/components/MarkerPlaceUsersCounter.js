
import { Marker } from "react-native-maps";

export default MarkerPlaceUsersCounter = ({ placesMarker }) => {
    const nbUser = placesMarker.users.length;
    const images = [
      require(`../../../assets/icons/icon_counter_0.png`),
      require(`../../../assets/icons/icon_counter_1.png`),
      require(`../../../assets/icons/icon_counter_2.png`),
      require(`../../../assets/icons/icon_counter_3.png`),
      require(`../../../assets/icons/icon_counter_4.png`),
      require(`../../../assets/icons/icon_counter_5.png`),
      require(`../../../assets/icons/icon_counter_6.png`),
      require(`../../../assets/icons/icon_counter_7.png`),
      require(`../../../assets/icons/icon_counter_8.png`),
      require(`../../../assets/icons/icon_counter_9.png`),
      require(`../../../assets/icons/icon_counter_10.png`),
    ];
  
    return (
      <Marker
        anchor={{ x: 0, y: 0 }}
        coordinate={{
          latitude: placesMarker.location.coordinates[1],
          longitude: placesMarker.location.coordinates[0],
        }}
        image={images[nbUser <= 10 ? nbUser : 10]}
        tappable={false}
      />
    );
  };