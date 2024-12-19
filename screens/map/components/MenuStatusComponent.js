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
import { useSelector,useDispatch } from "react-redux";
import {setUserStatus} from "../../../reducers/user"

import {
  IconDogGray,
  IconDogGreen,
  IconDogBlue,
} from "../../../globalComponents/Icons";

import { BACKEND_URL } from "../../../config";

import ButtonPrimary from "../../../globalComponents/ButtonPrimary";
import ButtonSecondary from "../../../globalComponents/ButtonSecondary";

const iconWalk = <IconDogGreen />;
const iconPause = <IconDogBlue />;
const iconOff = <IconDogGray />;

const STATUS_WALK = "walk";
const STATUS_PAUSE = "pause";
const STATUS_OFF = "off";

const MainButton = ({ onPressCallBack, color, status }) => {
  const statusIcon = {
    [STATUS_WALK]: iconWalk,
    [STATUS_PAUSE]: iconPause,
    [STATUS_OFF]: iconOff,
  };
  return (
    <TouchableOpacity
      style={{width:'100%',alignItems:"center"}}
      onPress={() => {
        onPressCallBack();
      }}
    >
      <View style={[styles.button, { borderColor: color }]}>
        {statusIcon[status]}
      </View>
    </TouchableOpacity>
  );
};

export default function MenuStatusComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.value);

  //const [status, setStatus] = useState(user.status);

  const [modalVisibility, setModalVisibility] = useState(false);

  const MainButtonHandle = () => {
    setModalVisibility(!modalVisibility);
  };

  const handleMenuBottomItemPressed = async (status) => {
    //store status to revert id lost connection backend
    const statusBackup = status;
    dispatch(setUserStatus(status));
    setModalVisibility(false);
    //change user status in bdd
    const response = await fetch(`${BACKEND_URL}/users/${user.token}/status`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: status }), // We send data in JSON format
    });
    const data = await response.json();
    // if not response rollback status display
    if (!data.result) setStatus(statusBackup);
    // else refresh user reducer
    else
      dispatch(setUserStatus(status))
  };

  return (
    <>
      <ModalMenu
        visibility={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
      >
        <View style={styles.content}>
          <MenuBottomItem
            srcIsActive={iconWalk}
            label="en promenade"
            statusValue={STATUS_WALK}
            onPressed={handleMenuBottomItemPressed}
          ></MenuBottomItem>
          <MenuBottomItem
            srcIsActive={iconPause}
            label="en pause"
            statusValue={STATUS_PAUSE}
            onPressed={handleMenuBottomItemPressed}
          ></MenuBottomItem>
          <MenuBottomItem
            srcIsActive={iconOff}
            label="hors ligne"
            statusValue={STATUS_OFF}
            onPressed={handleMenuBottomItemPressed}
          ></MenuBottomItem>
        </View>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.buttonSecondaryYesColor}
          status={user.status}
        ></MainButton>
      </ModalMenu>
      <View style={styles.container}>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.buttonSecondaryNoColor}
          status={user.status}
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
    marginBottom: 20,
    gap: 15,
  },
});
