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
import MenuBottomItem from "./MenuBottomItem";
import {
  IconDogGray,
  IconDogGrayLight,
  IconDogGreen,
  IconDogRed,
  IconBarBlue,
  IconBarGrayLight,
  IconRestaurantBlue,
  IconRestaurantGrayLight,
  IconParkBlue,
  IconParkGrayLight,
  IconShopsBlue,
  IconShopsGrayLight,
  IconToiletBlue,
  IconToiletGrayLight,
  IconMapRegular,
  IconMapRegularGray,
  IconMapHybrid,
  IconMapHybridGray,
  IconMapSatellite,
  IconMapSatelliteGray
} from "../../../globalComponents/Icons";
import {
  setUsersDisplayIgnored,
  setPlacesDisplayIgnored,
  setMapDisplayIgnored,
} from "../../../reducers/settings";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

import ButtonPrimary from "../../../globalComponents/ButtonPrimary";
import ButtonSecondary from "../../../globalComponents/ButtonSecondary";
import { useSelector, useDispatch } from "react-redux";

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

export default function MenuAddPlaceComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

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
        {/* main content */}

        <View style={styles.content}>
          <View style={[styles.sectionView]}>
            <Text style={styles.filterTitle}>Carte</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={[styles.sectionView]}>
            <Text style={styles.filterTitle}>Lieux</Text>
            <View style={styles.itemsView}>
              <MenuBottomItem
                srcIsActive={
                    <IconBarBlue />

                }
                label="bars"
                onPressed={()=>{}}
                statusValue={"bars"}
              />
              <MenuBottomItem
                srcIsActive={
      
                    <IconRestaurantBlue />
                  
                }
                label="restaurants"
                onPressed={()=>{}}
                statusValue={"restaurants"}
              />
              <MenuBottomItem
                srcIsActive={
      
                    <IconParkBlue />
                  
                }
                label="parks"
                onPressed={()=>{}}
                statusValue={"parks"}
              />
              <MenuBottomItem
                srcIsActive={
        
                    <IconShopsBlue />
                  
                }
                label="shops"
                onPressed={()=>{}}
                statusValue={"shops"}
              />
              <MenuBottomItem
                srcIsActive={
          
                    <IconToiletBlue />
                  
                }
                label="toilettes"
                onPressed={()=>{}}
                statusValue={"garbages"}
              />
            </View>
          </View>
          <View style={styles.separator}></View>
          {/* user filter View */}
        </View>
        {/* bottom button */}
        <View style={{ width: "25%", alignSelf: "flex-end" }}>
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
    width: "100%",
    minHeight: 50,
    marginBottom: 20,
    alignItems: "center",
    gap: 15,
    paddingHorizontal: globalStyle.mainContainerPaddingHor,
  },
  sectionView: {
    width: "100%",
    gap: 30,
    paddingBottom: 15,
  },
  filterTitle: {
    textAlign: "center",
    fontSize: globalStyle.h4,
  },
  itemsView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  separator: {
    borderBottomColor: globalStyle.grayPrimary,
    borderBottomWidth: 1,
    height: 1,
    width: "100%",
  },
});
