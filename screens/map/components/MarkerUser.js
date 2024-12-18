import { Marker } from "react-native-maps";
import { BACKEND_URL } from "../../../config";

export default MarkerUser = ({
  markerUser,
  isAccepted,
  isBlocked,
  setSelectedUser,
  mapRef,
  setPopUpUsersVisibility,
  popupSpeed,
}) => {
  const onUsersMarkerPress = async (coordinate, user) => {
    // get user info by id
    const usersRequest = await fetch(`${BACKEND_URL}/users/${user._id}`);
    const usersResponse = await usersRequest.json();
    const usersData = usersResponse.data;
    let _user = { friendType: "" };
    //check status of user by id
    const friendType = [
      { name: "accepted", value: isAccepted(user._id) },
      { name: "blocked", value: isBlocked(user._id) },
      {
        name: "unknowed",
        value: !(isAccepted(user._id) || isBlocked(user._id)),
      },
    ];

    _user.friendType = friendType
      .filter((x) => x.value === true)
      .map((x) => x.name)[0];

    const userAllInfos = { ..._user, ...usersData };
    setSelectedUser(userAllInfos);

    const adjustedRegion = {
      latitude: coordinate.latitude + (isAccepted(user._id) ? 0.022 : 0.01), // offset to show marker under marker
      longitude: coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    // move to marker
    if (mapRef.current) {
      mapRef.current.animateToRegion(adjustedRegion, popupSpeed);
      setTimeout(() => {
        setPopUpUsersVisibility(true);
      }, popupSpeed);
    }
  };

  let icon = require("../../../assets/icons/icon_dog_gray.png");
  //need to check if friends or blocked
  if (isAccepted(markerUser._id))
    icon = require("../../../assets/icons/icon_dog_green.png");
  else if (isBlocked(markerUser._id))
    icon = require("../../../assets/icons/icon_dog_red.png");

  return (
    <Marker
      coordinate={{
        latitude: markerUser.currentLocation.coordinates[1],
        longitude: markerUser.currentLocation.coordinates[0],
      }}
      // pinColor="royalblue"
      image={icon}
      onPress={() =>
        onUsersMarkerPress(
          {
            latitude: markerUser.currentLocation.coordinates[1],
            longitude: markerUser.currentLocation.coordinates[0],
          },
          markerUser
        )
      }
    ></Marker>
  );
};
