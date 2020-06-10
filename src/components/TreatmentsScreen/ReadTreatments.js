import * as React from "react";
import { View, Text, ScrollView, Dimensions, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Image from "react-native-scalable-image";
import { styles } from "./Styles";
const { width } = Dimensions.get("window");

export const ReadTreatments = ({ route, navigation }) => {
  let itemsCounter = 0;
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
        {route.params.data.map((post, i) => {
          if (post.hasOwnProperty("text")) {
            itemsCounter++;
            return (
              <View style={styles.readPostTextContainer} key={i}>
                <Text style={styles.readPostTextText}>
                  {itemsCounter}. {post.text}
                </Text>
              </View>
            );
          }
          if (post.hasOwnProperty("img")) {
            return (
              <View style={styles.readPostImgContainer} key={i}>
                <Image width={width} source={{ uri: post.img }} />
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};
