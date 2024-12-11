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

const iconWalk = <IconDogGreen />;
const iconPause = <IconDogBlue />;
const iconOff = <IconDogGray />;

const statusWalk="walk";
const statusPause="pause";
const statusOff="off";

const MainButton = ({ onPressCallBack, color,status }) => {
  const statusIcon = {
    walk:iconWalk,
    pause:iconPause,
    off:iconOff,
  }
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: color }]}
      onPress={() => {
        onPressCallBack();
      }}
    >
      {statusIcon[status]}
    </TouchableOpacity>
  );
};

export default function MenuStatusComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [status,setStatus] = useState(statusOff)

  const [modalVisibility, setModalVisibility] = useState(false);

  const MainButtonHandle = () => {
    setModalVisibility(!modalVisibility);
  };


  const handleMenuBottomItemPressed = (status) =>{
    setStatus(status);
    setModalVisibility(false);
  }

  return (
    <>
      <ModalMenu
        visibility={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
      >
        <View style={styles.content}>
          <MenuBottomItem srcIsActive={iconWalk} label="en promenade" statusValue={statusWalk} onPressed={handleMenuBottomItemPressed}></MenuBottomItem>
          <MenuBottomItem srcIsActive={iconPause} label="en pause" statusValue={statusPause} onPressed={handleMenuBottomItemPressed}></MenuBottomItem>
          <MenuBottomItem srcIsActive={iconOff} label="hors ligne"statusValue={statusOff} onPressed={handleMenuBottomItemPressed}></MenuBottomItem>
        </View>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.buttonSecondaryYesColor}
          status={status}
        ></MainButton>
      </ModalMenu>
      <View style={styles.container}>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.buttonSecondaryNoColor}
          status={status}
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
