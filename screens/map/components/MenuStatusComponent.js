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

import ButtonPrimary from "../../../globalComponents/ButtonPrimary";
import ButtonSecondary from "../../../globalComponents/ButtonSecondary";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

export default function MenuStatusComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [modalVisibility, setModalVisibility] = useState(false);

  const MainButtonHandle = () => {
    setModalVisibility(true);
  };

  return (
    <>
      <Modal transparent={true} visible={modalVisibility} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={()=>setModalVisibility(false)}>
            <FontAwesomeIcon icon={faAngleDown} color="black" size={30} />
            </TouchableOpacity>
            <View style={styles.test}></View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => MainButtonHandle()}
        >
          <Text>Status</Text>
        </TouchableOpacity>
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
  modalContainer: {
    flex: 1,
    flexDirection:"column",
    justifyContent:"flex-end"
  },
  modalContent:{
    backgroundColor: "white",
    flexDirection:"column",
    alignItems:"center",
  },
  closeButton:{
    backgroundColor:'red',
    width:"100%",
    alignItems:"center",
    height:"10%"

  },
  test:{
    height:'50%'
  }
});
