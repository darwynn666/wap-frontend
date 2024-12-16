import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Dimensions } from "react-native";

export default MapPopUpModal = ({ children, visibility, onRequestClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visibility}
      onRequestClose={onRequestClose}
      animationType="fade"
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
            {children}
        </View>
      </View>
    </Modal>
  );
};

// STYLES
const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center"
  },
  modalContent: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width:"70%",
    minHeight:"10%",
    borderRadius:10,
    marginBottom:'75'
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
