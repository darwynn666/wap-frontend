import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default MenuBottomItem = ({ label, srcIsActive }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {srcIsActive}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:"center"
  },
  label: {
    textAlign: "center",
  },
});
