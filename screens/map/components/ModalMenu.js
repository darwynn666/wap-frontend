import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    Modal,
  } from "react-native";
import { globalStyle } from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default ModalMenu = ({children,visibility,onRequestClose}) => {
  return <Modal transparent={true} visible={visibility} animationType="slide" onRequestClose={onRequestClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onRequestClose()}
        >
          <FontAwesomeIcon
            icon={faAngleDown}
            color={globalStyle.buttonSecondaryNoColor}
            size={30}
          />
        </TouchableOpacity>
        {children}
      </View>
    </View>
  </Modal>;
};

// STYLES
const styles = StyleSheet.create({
    // container: {
    //   backgroundColor: globalStyle.backgroundColor,
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    // button: {
    //   width: 140,
    //   height: 50,
    //   borderRadius: 25,
    //   borderWidth: 1,
    //   borderColor: globalStyle.buttonSecondaryNoColor,
    //   flexDirection: "column",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    modalContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
    },
    closeButton: {
      width: "100%",
      alignItems: "center",
      height: "40",
    },
    test: {
      //height: "50%",
    },
  });
  