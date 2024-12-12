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
} from "../../../globalComponents/Icons";
import {
  setUsersDisplayIgnored,
  setPlacesDisplayIgnored,
  setParksDisplayIgnored,
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

export default function MenuFiltersComponent(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.value);
  const userDisplayIgnored = settings.usersDisplayIgnored;
  const placesDisplayIgnored = settings.placesDisplayIgnored;

  const [modalVisibility, setModalVisibility] = useState(false);
  // filters is an array of elements to ignore
  const [filters, setFilters] = useState([]);

  const MainButtonHandle = () => {
    setModalVisibility(!modalVisibility);
  };

  // users display filter
  //
  //

  const UsersDisplayIgnoredCheckIfIsInStore = (filterName) => {
    return userDisplayIgnored.some((x) => x === filterName);
  };

  const UsersDisplayIgnoredItemOnPress = (data) => {
    //if already in filter, remove
    if (UsersDisplayIgnoredCheckIfIsInStore(data)) {
      dispatch(
        setUsersDisplayIgnored(userDisplayIgnored.filter((x) => x !== data))
      );
    }
    //else add
    else {
      dispatch(setUsersDisplayIgnored([...userDisplayIgnored, data]));
    }
  };

  // places display filter
  //
  //

  const PlacesDisplayIgnoredCheckIfIsInStore = (filterName) => {
    return placesDisplayIgnored.some((x) => x === filterName);
  };

  const PlacesDisplayIgnoredItemOnPress = (data) => {
    //if already in filter, remove
    if (PlacesDisplayIgnoredCheckIfIsInStore(data)) {
      dispatch(
        setPlacesDisplayIgnored(placesDisplayIgnored.filter((x) => x !== data))
      );
    }
    //else add
    else {
      dispatch(setPlacesDisplayIgnored([...placesDisplayIgnored, data]));
    }
  };

  return (
    <>
      <ModalMenu
        visibility={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
      >
        {/* main content */}
        <Text>{settings.placesDisplayIgnored}</Text>
        <View style={styles.content}>
          <View style={[styles.usersFilterView]}>
            <Text style={styles.filterTitle}>Lieux</Text>
            <View style={styles.itemsView}>
              <MenuBottomItem
                srcIsActive={
                  PlacesDisplayIgnoredCheckIfIsInStore("bars") ? (
                    <IconBarGrayLight />
                  ) : (
                    <IconBarBlue />
                  )
                }
                label="bars"
                onPressed={PlacesDisplayIgnoredItemOnPress}
                statusValue={"bars"}
              />
              <MenuBottomItem
                srcIsActive={
                  PlacesDisplayIgnoredCheckIfIsInStore("restaurants") ? (
                    <IconRestaurantGrayLight />
                  ) : (
                    <IconRestaurantBlue />
                  )
                }
                label="restaurants"
                onPressed={PlacesDisplayIgnoredItemOnPress}
                statusValue={"restaurants"}
              />
              <MenuBottomItem
                srcIsActive={
                  PlacesDisplayIgnoredCheckIfIsInStore("parks") ? (
                    <IconParkGrayLight />
                  ) : (
                    <IconParkBlue />
                  )
                }
                label="parks"
                onPressed={PlacesDisplayIgnoredItemOnPress}
                statusValue={"parks"}
              />
              <MenuBottomItem
                srcIsActive={
                  PlacesDisplayIgnoredCheckIfIsInStore("shops") ? (
                    <IconShopsGrayLight />
                  ) : (
                    <IconShopsBlue />
                  )
                }
                label="shops"
                onPressed={PlacesDisplayIgnoredItemOnPress}
                statusValue={"shops"}
              />
              <MenuBottomItem
                srcIsActive={
                  PlacesDisplayIgnoredCheckIfIsInStore("toilets") ? (
                    <IconToiletGrayLight />
                  ) : (
                    <IconToiletBlue />
                  )
                }
                label="toilettes"
                onPressed={PlacesDisplayIgnoredItemOnPress}
                statusValue={"toilets"}
              />
            </View>
          </View>
          <View style={styles.separator}></View>
          {/* user filter View */}
          <View style={styles.usersFilterView}>
            <Text style={styles.filterTitle}>Utilisateurs</Text>
            <View style={styles.itemsView}>
              <MenuBottomItem
                srcIsActive={
                  UsersDisplayIgnoredCheckIfIsInStore("friends") ? (
                    <IconDogGrayLight />
                  ) : (
                    <IconDogGreen />
                  )
                }
                label="amis"
                onPressed={UsersDisplayIgnoredItemOnPress}
                statusValue={"friends"}
              ></MenuBottomItem>
              <MenuBottomItem
                srcIsActive={
                  UsersDisplayIgnoredCheckIfIsInStore("unknows") ? (
                    <IconDogGrayLight />
                  ) : (
                    <IconDogGray />
                  )
                }
                label="inconnus"
                onPressed={UsersDisplayIgnoredItemOnPress}
                statusValue={"unknows"}
              ></MenuBottomItem>
              <MenuBottomItem
                srcIsActive={
                  UsersDisplayIgnoredCheckIfIsInStore("blocked") ? (
                    <IconDogGrayLight />
                  ) : (
                    <IconDogRed />
                  )
                }
                label="bloqués"
                onPressed={UsersDisplayIgnoredItemOnPress}
                statusValue={"blocked"}
              ></MenuBottomItem>
            </View>
          </View>
        </View>
        {/* bottom button */}
        <View style={{ width: "25%", alignSelf: "flex-start" }}>
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
  usersFilterView: {
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
