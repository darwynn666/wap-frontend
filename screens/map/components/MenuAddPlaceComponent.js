import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { globalStyle } from "../../../config";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup,faShop } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

export default function MenuAddPlaceComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ width: "100%", justifyContent: "center", alignItems: "center" }} 
      onPress={() => navigation.navigate('_AddPlace', { screen: 'ChoosePlaceCoords' })}  >
        <FontAwesomeIcon icon={faShop} style={{ color: globalStyle.grayPrimary }} size={globalStyle.iconSize} ></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  )
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
