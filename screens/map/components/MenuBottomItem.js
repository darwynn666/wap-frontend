import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { globalStyle } from "../../../config";

/**
 * return an icon a label button
 * label: is the text
 * srcIsActive: is the icon
 */
export default MenuBottomItem = ({ label, srcIsActive, onPressed ,statusValue}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{onPressed(statusValue)}}>
      {srcIsActive}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:"center",
    minWidth:60
  },
  label: {
    textAlign: "center",
    marginTop:2,
    fontSize:globalStyle.h5,
    maxWidth:75
  },
});
