import { Image, Text, View } from "react-native";
import { globalStyle } from "../../../config";
import MapPopUpModal from "./MapPopUpModal";
import { IconDogBlue, IconDogBlueLight } from "../../../globalComponents/Icons";
import { BACKEND_URL } from "../../../config";
import { defaultPlaceUrl } from "../../../config";
import { setUserStatus } from "../../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { setPlace } from "../../../reducers/places";
import { useState,useEffect } from "react";

//places popup
export default MapPopUpPlace = ({
  place,
  visibility,
  user,
  placesData,
  // setPlacesData,
  setPopUpPlacesVisibility,
}) => {
  const dispatch = useDispatch();

  const [isHere, setIsHere] = useState();

  useEffect(() => {
    if (!place) setIsHere(false);
    else setIsHere(place.users.includes(user._id));
  }, [place]);

  const isUserInPlace = (userID, place) => {
    if (!place) return false;
    else return place.users.includes(userID);
  };

  const ImHerePressed = async (user_id, place_id) => {
    console.log("i m here press");
    console.log("my id is :", user_id);
    //set value in bdd
    const request = await fetch(
      `${BACKEND_URL}/places/${place_id}/users/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const response = await request.json();
    console.log(response);
    //set status of current user
    if (response.users.includes(user_id)) {
      setIsHere(true);
      dispatch(setUserStatus("pause"));
    } else {
      setIsHere(false);
      dispatch(setUserStatus("walk"));
    }

    // set value in place usestate
    // setPlacesData([
    //   ...placesData.map((x) => {
    //     if (x._id === place_id) x.users = response.users;
    //     return x;
    //   }),
    // ]);

    dispatch(
      setPlace([
        ...placesData.map((x) => {
          if (x._id === place_id) x.users = response.users;
          return x;
        }),
      ])
    );
  };

  return (
    <MapPopUpModal
      visibility={visibility}
      onRequestClose={() => setPopUpPlacesVisibility(false)}
    >
      {place && (
        <View style={{ width: "100%" }}>
          <View>
            <Text style={{ fontSize: globalStyle.h2, marginBottom: 10 }}>
              {place.name}
            </Text>
            <Image
              style={{ width: "100%", height: 175, resizeMode: "cover" }}
              source={{
                uri: place.photo != "" ? place.photo : defaultPlaceUrl,
              }}
            />
          </View>
          <Text
            style={{
              marginVertical: 5,
              fontWeight: "bold",
              fontSize: globalStyle.h6,
            }}
          >
            {place.houseNumber} {place.street} {place.postcode} {place.city}{" "}
          </Text>
          <Text style={{ fontSize: globalStyle.h5, marginVertical: 8 }}>
            {place.description}
          </Text>
          <View style={{ margin: 15 }}>
            <MenuBottomItem
              onPressed={() => {
                ImHerePressed(user._id, place._id);
              }}
              srcIsActive={isHere ? <IconDogBlue /> : <IconDogBlueLight />}
              label="J'y suis"
            ></MenuBottomItem>
          </View>
        </View>
      )}
    </MapPopUpModal>
  );
};
