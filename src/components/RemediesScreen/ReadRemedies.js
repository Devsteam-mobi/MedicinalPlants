import * as React from "react";
import { View, Text, ScrollView, Dimensions, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Image from "react-native-scalable-image";
const { width } = Dimensions.get("window");
import { images } from "./remediesImagesDB";
import { styles } from "./Styles";

export const ReadRemedies = ({ route, navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = async () => {
        navigation.goBack();
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  return (
    <ScrollView>
      <View style={styles.readPostContainer}>
        {Object.keys(route.params.data).map((key, i) => {
          if (key == "img") {
            return (
              <View style={styles.readPostImgContainer} key={i}>
                <Image width={width} source={images[route.params.data.img]} />
              </View>
            );
          } else if (key != "name") {
            return (
              <View style={{ margin: 10, alignItems: "flex-start" }} key={i}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{key}</Text>
                <Text style={{ fontSize: 16 }}>{route.params.data[key]}</Text>
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};
