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
import { Dimensions } from "react-native";

export default ModalMenu = ({ children, visibility, onRequestClose }) => {
  return (
    <>
      <Modal
        transparent={true}
        visible={visibility}
        animationType="slide"
        onRequestClose={onRequestClose}
      >
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          onTouchEnd={onRequestClose}
        ></View>
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
      </Modal>
    </>
  );
};

// STYLES
const styles = StyleSheet.create({
  modalContainer: {
    position:"absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 4,
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
