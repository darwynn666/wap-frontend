import { useDispatch } from "react-redux";
import { setUserFriends } from "../../../reducers/user";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BACKEND_URL } from "../../../config";
import {
  IconDogGreen,
  IconDogRed,
  IconPhone,
  IconEmail,
  IconMessage,
} from "../../../globalComponents/Icons";
import { globalStyle } from "../../../config";
import { ScrollView } from "react-native-gesture-handler";
import { callNumber, smsNumber, sendEmail } from "../../../modules/tools";
import MapPopUpModal from "./MapPopUpModal";
import MenuBottomItem from "./MenuBottomItem";

const STATUS_COLOR = {
    walk: globalStyle.greenPrimary,
    pause: globalStyle.bluePrimary,
    off: globalStyle.grayPrimary,
  };

const MapPopUpUserDogElement = ({ dog }) => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 10,
        borderColor: globalStyle.grayLight,
        borderWidth: 2,
        padding: 10,
        height: 150,
        width: 90,
      }}
    >
      {/* dog photo */}
      <View
        style={{
          width: 74,
          height: 74,
          marginBottom: 3,
          borderRadius: 37,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 3,
          borderColor: dog.isTaken
            ? globalStyle.greenPrimary
            : globalStyle.grayPrimary,
        }}
      >
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: dog.photo != "" ? dog.photo : dogAvatarUrl,
          }}
        />
      </View>
      <Text style={{ fontSize: globalStyle.h5, fontWeight: "bold" }}>
        {dog.name}
      </Text>
      <Text style={{ fontSize: globalStyle.h6 }}>{dog.status}</Text>
    </View>
  );
};

const MapPopUpUserAcceptedElement = ({ user }) => {
  return (
    <View style={{ width: "90%" }}>
      {/* header user info */}
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderColor: STATUS_COLOR[user.status],
            borderWidth: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{
              uri: user.infos.photo != "" ? user.infos.photo : userAvatarUrl,
            }}
          />
        </View>
        <Text style={{ fontSize: globalStyle.h3 }}>
          {user.infos.firstname} {user.infos.lastname}
        </Text>
      </View>
      <View style={styles.separator}></View>
      {/* dogs view */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View
          style={{
            width: "100%",
            minHeight: "10",
            flexDirection: "row",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            marginVertical: 10,
          }}
        >
          {/* create view for each dogs */}
          {user.dogs.map((dog, i) => {
            return <MapPopUpUserDogElement key={i} dog={dog} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.separator}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 20,
        }}
      >
        <MenuBottomItem
          srcIsActive={<IconMessage />}
          onPressed={() => smsNumber(user.infos.telephone)}
        ></MenuBottomItem>
        <MenuBottomItem
          srcIsActive={<IconPhone />}
          onPressed={() => callNumber(user.infos.telephone)}
        ></MenuBottomItem>
        <MenuBottomItem
          srcIsActive={<IconEmail />}
          onPressed={() => sendEmail(user.infos.email)}
        ></MenuBottomItem>
      </View>
    </View>
  );
};

const MapPopUpUserBlokedElement = () => {
  return (
    <View>
      <Text>
        Cet utilisateur est bloqué. Toutefois, vous pouvez le débloquer dans
        votre liste d'amis.
      </Text>
    </View>
  );
};

const MapPopUpUserUnknowedElement = ({
  selectedUser,
  currentUser,
  setPopUpUsersVisibility,
}) => {
  const dispatch = useDispatch();

  const handleOutcomingFriend = async (friendTo) => {
    setPopUpUsersVisibility(false);

    const request = await fetch(
      `${BACKEND_URL}/friends/${currentUser.token}/outcoming/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendFrom: currentUser._id,
          friendTo: friendTo._id,
        }),
      }
    );

    const response = await request.json();
    console.log(response);
    if (response.result) {
      Alert.alert("La demande a été envoyé");
      dispatch(setUserFriends(response.userFromFriends));
    } else {
      Alert.alert("La demande a déjà été envoyée");
    }
  };

  const askFriendPress = async () => {
    const firstname = selectedUser.infos.firstname;
    const id = selectedUser;
    Alert.alert(
      `Demander ${firstname} en ami ?`,
      "Vous pourrez échanger vos informations et vous voir sur la carte",
      [
        { text: "Non", onPress: () => setPopUpUsersVisibility(false) },
        {
          text: "Oui",
          onPress: () => handleOutcomingFriend(selectedUser),
        },
      ]
    );
  };

  const handleBlockFriend = async (friendTo) => {
    console.log("block");
    setPopUpUsersVisibility(false);

    const request = await fetch(
      `${BACKEND_URL}/friends/${currentUser.token}/block/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendToBlock: friendTo._id,
        }),
      }
    );

    const response = await request.json();
    if (response.result) {
      Alert.alert("Cet utilisateur est maintenant bloqué");
      dispatch(setUserFriends(response.userFriends));
    } else {
      Alert.alert("Erreur lors de la demande de bloquage");
    }
  };

  const blockFriendPress = async () => {
    const firstname = selectedUser.infos.firstname;
    const id = selectedUser;
    Alert.alert(
      `Bloquer ${firstname} ?`,
      "Cet utilisateur ne pourra plus vous voir sur la carte.",
      [
        { text: "Non", onPress: () => setPopUpUsersVisibility(false) },
        {
          text: "Oui",
          onPress: () => handleBlockFriend(selectedUser),
        },
      ]
    );
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        {/* MenuBottomItem is a component with an icon, a label as in filtermenu */}
        <MenuBottomItem
          srcIsActive={<IconDogGreen />}
          label="ajouter un ami"
          onPressed={() => askFriendPress()}
        ></MenuBottomItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <MenuBottomItem
          srcIsActive={<IconDogRed />}
          label="bloquer une personne"
          onPressed={() => blockFriendPress()}
        ></MenuBottomItem>
      </TouchableOpacity>
    </View>
  );
};

export default MapPopUpUser = ({
  popUpUsersVisibility,
  setPopUpUsersVisibility,
  selectedUser,
  currentUser,
}) => {
  return (
    <MapPopUpModal
      visibility={popUpUsersVisibility}
      onRequestClose={() => setPopUpUsersVisibility(false)}
    >
      {selectedUser.friendType == "accepted" && (
        <MapPopUpUserAcceptedElement user={selectedUser} />
      )}

      {selectedUser.friendType == "blocked" && <MapPopUpUserBlokedElement />}

      {selectedUser.friendType == "unknowed" && (
        <MapPopUpUserUnknowedElement
          selectedUser={selectedUser}
          currentUser={currentUser}
          setPopUpUsersVisibility={setPopUpUsersVisibility}
        />
      )}
    </MapPopUpModal>
  );
};

// STYLES
const styles = StyleSheet.create({
  separator: {
    borderBottomColor: globalStyle.grayPrimary,
    borderBottomWidth: 1,
    height: 1,
    width: "100%",
  },
});
