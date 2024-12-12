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
} from "../../../globalComponents/Icons";
import { setUsersDisplayIgnored } from "../../../reducers/settings";

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
  const userDisplayIgnored = settings.userDisplayIgnored;

  const [modalVisibility, setModalVisibility] = useState(false);
  // filters is an array of elements to ignore
  const [filters, setFilters] = useState([]);

  const MainButtonHandle = () => {
    setModalVisibility(!modalVisibility);
  };

  const checkIfIsInFilters = (filterName) => {
    // return filters.some((x) => x === filterName);
    return userDisplayIgnored.some((x) => x === filterName);
  };

  const MenuBottomItemOnPress = (data) => {
    console.log(data);
    //if already in filter, remove
    if (checkIfIsInFilters(data)) {
      dispatch(
        setUsersDisplayIgnored(userDisplayIgnored.filter((x) => x !== data))
      );
    }
    //else add
    else {
      dispatch(setUsersDisplayIgnored([...userDisplayIgnored, data]));
    }
  };

  return (
    <>
      <ModalMenu
        visibility={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
      >
        {/* main content */}
        <Text>{settings.userDisplayIgnored}</Text>
        <View style={styles.content}>
          <View style={styles.usersFilterView}>
            <Text style={styles.filterTitle}>Utilisateurs</Text>
          </View>
          {/* user filter View */}
          <View style={styles.usersFilterView}>
            <Text style={styles.filterTitle}>Utilisateurs</Text>
            <View style={styles.itemsView}>
              <MenuBottomItem
                srcIsActive={
                  checkIfIsInFilters("friends") ? (
                    <IconDogGrayLight />
                  ) : (
                    <IconDogGreen />
                  )
                }
                label="amis"
                onPressed={MenuBottomItemOnPress}
                statusValue={"friends"}
              ></MenuBottomItem>
              <MenuBottomItem
                srcIsActive={
                  checkIfIsInFilters("unknows") ? (
                    <IconDogGrayLight />
                  ) : (
                    <IconDogGray />
                  )
                }
                label="inconnus"
                onPressed={MenuBottomItemOnPress}
                statusValue={"unknows"}
              ></MenuBottomItem>
              <MenuBottomItem
                srcIsActive={
                  checkIfIsInFilters("blocked") ? (
                    <IconDogGrayLight />
                  ) : (
                    <IconDogRed />
                  )
                }
                label="bloqués"
                onPressed={MenuBottomItemOnPress}
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
});
