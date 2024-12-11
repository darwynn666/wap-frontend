import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { globalStyle } from "../config"

const IconDog = ({ color }) => {
  return <FontAwesomeIcon icon={faDog} color={color} size={30} />;
};

const IconDogGray = () => {
  return <IconDog color={globalStyle.grayPrimary} />;
};

const IconDogGreen = () => {
  return <IconDog color={globalStyle.greenPrimary} />;
};

const IconDogBlue = () => {
  return <IconDog color={globalStyle.bluePrimary} />;
};

module.exports = {IconDogGray,IconDogGreen,IconDogBlue}

