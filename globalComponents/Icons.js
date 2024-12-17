import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDog,
  faToiletPaper,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { globalStyle } from "../config";

const IconDog = ({ color }) => {
  return (
    <FontAwesomeIcon icon={faDog} color={color} size={globalStyle.iconSize} />
  );
};

const IconDogGray = () => {
  return <IconDog color={globalStyle.grayPrimary} />;
};

const IconDogGrayLight = () => {
  return <IconDog color={globalStyle.grayLight} />;
};

const IconDogGreen = () => {
  return <IconDog color={globalStyle.greenPrimary} />;
};

const IconDogBlue = () => {
  return <IconDog color={globalStyle.bluePrimary} />;
};

const IconDogBlueLight = () => {
  return <IconDog color={globalStyle.blueLight} />;
};

const IconDogRed = () => {
  return <IconDog color={globalStyle.redPrimary} />;
};

const IconBarBlue = () => {
  return (
    <MaterialCommunityIcons
      name="glass-cocktail"
      size={globalStyle.iconSize}
      color={globalStyle.bluePrimary}
    />
  );
};

const IconBarGrayLight = () => {
  return (
    <MaterialCommunityIcons
      name="glass-cocktail"
      size={globalStyle.iconSize}
      color={globalStyle.grayLight}
    />
  );
};

const IconRestaurantBlue = () => {
  return (
    <MaterialIcons
      name="restaurant"
      size={globalStyle.iconSize}
      color={globalStyle.bluePrimary}
    />
  );
};

const IconRestaurantGrayLight = () => {
  return (
    <MaterialIcons
      name="restaurant"
      size={globalStyle.iconSize}
      color={globalStyle.grayLight}
    />
  );
};

const IconParkBlue = () => {
  return (
    <MaterialCommunityIcons
      name="nature-people"
      size={globalStyle.iconSize}
      color={globalStyle.bluePrimary}
    />
  );
};

const IconParkGrayLight = () => {
  return (
    <MaterialCommunityIcons
      name="nature-people"
      size={globalStyle.iconSize}
      color={globalStyle.grayLight}
    />
  );
};

const IconShopsBlue = () => {
  return (
    <MaterialIcons
      name="storefront"
      size={globalStyle.iconSize}
      color={globalStyle.bluePrimary}
    />
  );
};

const IconShopsGrayLight = () => {
  return (
    <MaterialIcons
      name="storefront"
      size={globalStyle.iconSize}
      color={globalStyle.grayLight}
    />
  );
};

const IconToiletBlue = () => {
  return (
    <FontAwesomeIcon
      icon={faToiletPaper}
      color={globalStyle.bluePrimary}
      size={globalStyle.iconSize}
    />
  );
};

const IconToiletGrayLight = () => {
  return (
    <FontAwesomeIcon
      icon={faToiletPaper}
      color={globalStyle.grayLight}
      size={globalStyle.iconSize}
    />
  );
};

const IconMapRegular = () => {
  return (
    <Image
      source={require("../assets/icons/map_regular.png")}
      style={{
        resizeMode: "cover",
        width: globalStyle.iconSize,
        height: globalStyle.iconSize,
      }}
    ></Image>
  );
};

const IconMapRegularGray = () => {
  return (
    <Image
      source={require("../assets/icons/map_regular_gray.png")}
      style={{
        resizeMode: "cover",
        width: globalStyle.iconSize,
        height: globalStyle.iconSize,
      }}
    ></Image>
  );
};

const IconMapHybrid = () => {
  return (
    <Image
      source={require("../assets/icons/map_hybrid.png")}
      style={{
        resizeMode: "cover",
        width: globalStyle.iconSize,
        height: globalStyle.iconSize,
      }}
    ></Image>
  );
};

const IconMapHybridGray = () => {
  return (
    <Image
      source={require("../assets/icons/map_hybrid_gray.png")}
      style={{
        resizeMode: "cover",
        width: globalStyle.iconSize,
        height: globalStyle.iconSize,
      }}
    ></Image>
  );
};

const IconMapSatellite = () => {
  return (
    <Image
      source={require("../assets/icons/map_satellite.png")}
      style={{
        resizeMode: "cover",
        width: globalStyle.iconSize,
        height: globalStyle.iconSize,
      }}
    ></Image>
  );
};

const IconMapSatelliteGray = () => {
  return (
    <Image
      source={require("../assets/icons/map_satellite_gray.png")}
      style={{
        resizeMode: "cover",
        width: globalStyle.iconSize,
        height: globalStyle.iconSize,
      }}
    ></Image>
  );
};

const IconPhone = () => {
  return (
    <MaterialIcons
      name="phone"
      size={globalStyle.iconSize}
      color={globalStyle.greenPrimary}
    />
  );
};

const IconEmail = () => {
  return (
    <MaterialIcons
      name="email"
      size={globalStyle.iconSize}
      color={globalStyle.greenPrimary}
    />
  );
};

const IconMessage = () => {
  return (
    <MaterialIcons
      name="message"
      size={globalStyle.iconSize}
      color={globalStyle.greenPrimary}
    />
  );
};
//

module.exports = {
  IconDogGray,
  IconDogGreen,
  IconDogBlue,
  IconDogBlueLight,
  IconDogRed,
  IconDogGrayLight,
  IconBarBlue,
  IconBarGrayLight,
  IconRestaurantBlue,
  IconRestaurantGrayLight,
  IconParkBlue,
  IconParkGrayLight,
  IconShopsBlue,
  IconShopsGrayLight,
  IconToiletBlue,
  IconToiletGrayLight,
  IconMapRegular,
  IconMapHybrid,
  IconMapSatellite,
  IconMapRegularGray,
  IconMapHybridGray,
  IconMapSatelliteGray,
  IconPhone,
  IconEmail,
  IconMessage,
};
