import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDog,faToiletPaper } from "@fortawesome/free-solid-svg-icons";

import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';

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

const IconDogRed = () => {
  return <IconDog color={globalStyle.redPrimary} />;
};

const IconBarBlue = () => {
  return <MaterialCommunityIcons name="glass-cocktail" size={globalStyle.iconSize} color={globalStyle.bluePrimary} />;
};

const IconBarGrayLight = () => {
  return <MaterialCommunityIcons name="glass-cocktail" size={globalStyle.iconSize} color={globalStyle.grayLight} />;
};

const IconRestaurantBlue = () => {
  return <MaterialIcons name="restaurant"  size={globalStyle.iconSize} color={globalStyle.bluePrimary} />;
};

const IconRestaurantGrayLight = () => {
  return <MaterialIcons name="restaurant"  size={globalStyle.iconSize} color={globalStyle.grayLight} />;
};

const IconParkBlue = () => {
  return <MaterialCommunityIcons name="nature-people" size={globalStyle.iconSize} color={globalStyle.bluePrimary} />;
};

const IconParkGrayLight = () => {
  return <MaterialCommunityIcons name="nature-people" size={globalStyle.iconSize} color={globalStyle.grayLight} />;
};

const IconShopsBlue = () => {
  return <MaterialIcons name="storefront"  size={globalStyle.iconSize} color={globalStyle.bluePrimary} />;
};

const IconShopsGrayLight = () => {
  return <MaterialIcons name="storefront"  size={globalStyle.iconSize} color={globalStyle.grayLight} />;
};

const IconToiletBlue = () => {
  return <FontAwesomeIcon icon={faToiletPaper} color={globalStyle.bluePrimary} size={globalStyle.iconSize} />
};

const IconToiletGrayLight = () => {
  return <FontAwesomeIcon icon={faToiletPaper} color={globalStyle.grayLight} size={globalStyle.iconSize} />
};

module.exports = {
  IconDogGray,
  IconDogGreen,
  IconDogBlue,
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
  IconToiletGrayLight

};
