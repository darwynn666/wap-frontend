import { Image, Text, View } from "react-native";
import { globalStyle } from "../../../config";
import MapPopUpModal from "./MapPopUpModal";
import { IconDogBlue, IconDogBlueLight } from "../../../globalComponents/Icons";
import { BACKEND_URL } from "../../../config";
import {  defaultPlaceUrl } from "../../../config";

//places popup
export default MapPopUpPlace = ({
  place,
  visibility,
  user,
  placesData,
  setPlacesData,
  setPopUpPlacesVisibility,
}) => {
  console.log("user : ",user)
  const isUserInPlace = (userID, place) => {
    if (!place) return false;
    else return place.users.includes(userID);
  };

  const ImHerePressed = async (user_id, place_id) => {
    console.log("i m here press")
    console.log("my id is :", user_id)
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

    // set value in place usestate
    setPlacesData([
      ...placesData.map((x) => {
        if (x._id === place_id) x.users = response.users;
        return x;
      }),
    ]);
    //
    const tmpPlaces = { ...selectedPlace };
    tmpPlaces.users = response.users;
    setSelectedPlace(tmpPlaces);
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
              srcIsActive={
                isUserInPlace(user._id, place) ? (
                  <IconDogBlue />
                ) : (
                  <IconDogBlueLight />
                )
              }
              label="J'y suis"
            ></MenuBottomItem>
          </View>
        </View>
      )}
    </MapPopUpModal>
  );
};
