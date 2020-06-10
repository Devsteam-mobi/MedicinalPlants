import * as React from "react";
import { View, Text, ScrollView, Dimensions, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Image from "react-native-scalable-image";
import Languages from "../../languagesPack/Languages";
const { width } = Dimensions.get("window");
import { styles } from "./Styles";
import { images } from "./plantsImagesDB";

export const ReadPlants = ({ route, navigation }) => {
  let language = useSelector((state) => state.language);

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

  function showEmplois(str) {
    let elems = [];
    let currentPos = 0;
    let key = 0;
    let symbExist = false;
    while (str.indexOf("||", currentPos) != -1) {
      symbExist = true;
      let startBold = str.indexOf("||", currentPos);
      let endBold = str.indexOf("||", startBold + 1);
      currentPos = endBold + 1;
      let title = str.slice(startBold + 2, endBold);
      let endStr;
      if (str.indexOf("||", endBold + 2) != -1) {
        endStr = str.indexOf("||", endBold + 2);
      } else {
        endStr = str.length + 1;
      }

      let text = str.slice(endBold + 2, endStr);
      currentPos = endStr;
      let elemTitle = React.createElement(
        Text,
        { style: { fontWeight: "bold", fontSize: 16 }, key },
        title
      );
      key++;
      let elemText = React.createElement(Text, { key }, text);
      key++;
      elems.push(elemTitle, elemText);
    }
    let container = React.createElement(View, {}, elems);
    if (symbExist) {
      return container;
    } else {
      return React.createElement(Text, { key }, str);
    }
  }

  return (
    <ScrollView>
      <View style={styles.readPostContainer}>
        <Image width={width} source={images[route.params.img]} />

        {route.params.history != "" && (
          <Text style={styles.readPlantsTitle}>
            {Languages.plantsHistoryAndUse[language.label]}
          </Text>
        )}
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>{route.params.history}</Text>
        </View>

        {route.params.desc != "" && (
          <Text style={styles.readPlantsTitle}>
            {Languages.plantsDesc[language.label]}
          </Text>
        )}
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>{route.params.desc}</Text>
        </View>

        {route.params.action != "" && (
          <Text style={styles.readPlantsTitle}>
            {Languages.plantsCurativeAction[language.label]}
          </Text>
        )}
        <View style={styles.paragraphContainer}>
          {showEmplois(route.params.action)}
        </View>

        {route.params.emplois != "" && (
          <Text style={styles.readPlantsTitle}>
            {Languages.plantsUses[language.label]}
          </Text>
        )}
        <View style={styles.paragraphContainer}>
          {showEmplois(route.params.emplois)}
        </View>
      </View>
    </ScrollView>
  );
};
