import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "../../../config";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

import ButtonPrimary from "../../../globalComponents/ButtonPrimary";
import ButtonSecondary from "../../../globalComponents/ButtonSecondary";

// layer-group
const MainButton = ({ color, onPressCallBack }) => {
  return (
    <TouchableOpacity
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
      onPress={() => {
        onPressCallBack();
      }}
    >
      <FontAwesomeIcon
        icon={faLayerGroup}
        style={{ color: color }}
        size={globalStyle.iconSize}
      ></FontAwesomeIcon>
    </TouchableOpacity>
  );
};

export default function MenuFiltersComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [modalVisibility, setModalVisibility] = useState(false);

  const MainButtonHandle = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <>
      <ModalMenu
        visibility={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
      >
        <View style={styles.content}></View>
        <View style={{width:'25%', alignSelf:"flex-start"}}>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.greenPrimary}
        ></MainButton>
        </View>
      </ModalMenu>
      <View style={styles.container}>
        <MainButton
          onPressCallBack={MainButtonHandle}
          color={globalStyle.grayPrimary}
        />
      </View>
    </>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minHeight: 50,
    marginBottom: 20,
    gap: 15,
  },
});
