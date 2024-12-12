import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
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

module.exports = {
  IconDogGray,
  IconDogGreen,
  IconDogBlue,
  IconDogRed,
  IconDogGrayLight,
};
