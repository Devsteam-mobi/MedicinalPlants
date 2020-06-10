import * as React from "react";
import { View, Text, ScrollView, Dimensions, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Image from "react-native-scalable-image";
const { width } = Dimensions.get("window");
import { styles } from "./Styles";
import { images } from "./PoisonousPlantsImagesDB";

export const ReadPoisonousPlants = ({ route, navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = async () => {
        try {
          navigation.goBack();
        } catch (err) {}
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.readPostContainer}>
        <Image width={width * 0.7} source={images[route.params.data.img]} />

        {Object.keys(route.params.data).map((key, i) => {
          if (key == "title") {
            return (
              <View style={styles.readPostTitleContainer} key={i}>
                <Text style={styles.readPostTitleText}>
                  {route.params.data[key]}
                </Text>
              </View>
            );
          } else if (key != "title" && key != "img") {
            return (
              <View style={styles.paragraphContainer} key={i}>
                <Text style={styles.paragraphText}>
                  {route.params.data[key]}
                </Text>
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};
