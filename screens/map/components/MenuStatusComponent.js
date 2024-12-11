import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "../../../config";
import ModalMenu from "./ModalMenu";
import MenuBottomItem from "./MenuBottomItem";

import {IconDogGray,IconDogGreen,IconDogBlue} from "../../../globalComponents/Icons"

import ButtonPrimary from "../../../globalComponents/ButtonPrimary";
import ButtonSecondary from "../../../globalComponents/ButtonSecondary";

const MainButton = ({ onPressCallBack, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: color }]}
      onPress={() => {
        onPressCallBack();
      }}
    >
      <Text>Status</Text>
    </TouchableOpacity>
  );
};


export default function MenuStatusComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [modalVisibility, setModalVisibility] = useState(false);

  const MainButtonHandle = () => {
    setModalVisibility(!modalVisibility);
  };

  const iconWalk = <IconDogGreen />;
  const iconPause = <IconDogBlue />;
  const iconOff = <IconDogGray />;

  return (
    <>
      <ModalMenu
        visibility={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
      >
        <View style={styles.content}>
          <MenuBottomItem srcIsActive={iconWalk} label="en promenade"></MenuBottomItem>
          <MenuBottomItem srcIsActive={iconPause} label="en pause"></MenuBottomItem>
          <MenuBottomItem srcIsActive={iconOff} label="hors ligne"></MenuBottomItem>
        </View>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.buttonSecondaryYesColor}
        ></MainButton>
      </ModalMenu>
      <View style={styles.container}>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.buttonSecondaryNoColor}
        ></MainButton>
      </View>
    </>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 140,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: globalStyle.buttonSecondaryNoColor,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minHeight: 50,
    marginBottom:20,
    gap:15
  },
});
