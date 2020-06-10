import * as React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Image from "react-native-scalable-image";
import * as Localization from "expo-localization";

import * as Actions from "../actions/Actions";
import { CustomDrawerContent } from "./DrawerMenu/CustomDrawerContent";
import { PlantsStack } from "./PlantsScreen/Plants";
import { TreatmentsStack } from "./TreatmentsScreen/Treatments";
import { RemediesStack } from "./RemediesScreen/Remedies";
import { PharmacyStack } from "./PharmacyScreen/Pharmacy";
import { FruitsAndBerriesStack } from "./FruitsAndBerriesScreen/FruitsAndBerries";
import { PoisonousPlantsStack } from "./PoisonousPlantsScreen/PoisonousPlants";
import Languages from "../languagesPack/Languages";
const { width } = Dimensions.get("window");

import { styles } from "./Styles";

const Drawer = createDrawerNavigator();

export function MainApp() {
  const dispatch = useDispatch();
  let language = useSelector((state) => state.language);

  const [firstLoad, setFirstLoad] = React.useState(true);
  const [dataEstablished, setDataEstablished] = React.useState(false);

  const fetchData = async () => {
    const languageLabel = await AsyncStorage.getItem("languageLabel");
    const languageValue = await AsyncStorage.getItem("languageValue");
    const showRateReminder = await AsyncStorage.getItem("showRateReminder");
    const launcCounter = await AsyncStorage.getItem("launcCounter");
    if (launcCounter) {
      // If the program was run before
      if (!dataEstablished) {
        setDataEstablished(true);
        dispatch(Actions.changeLaunchCount(Number(launcCounter) + 1));
        const newLaunchNum = Number(launcCounter) + 1;
        await AsyncStorage.setItem("launcCounter", newLaunchNum.toString());
      }
    } else {
      // If it is the first run of program
      if (!dataEstablished) {
        setDataEstablished(true);
        const newLaunchNum = 1;
        dispatch(Actions.changeLaunchCount(newLaunchNum));
        await AsyncStorage.setItem("launcCounter", newLaunchNum.toString());
      }
    }

    if (languageLabel && languageValue) {
      dispatch(
        Actions.changeLanguage({
          label: languageLabel,
          value: Number(languageValue),
        })
      );
    } else {
      // If it is the first run of the program - check locale and set
      // the right language
      const locale = Localization.locale;
      if (locale.includes("fr")) {
        dispatch(
          Actions.changeLanguage({
            label: "Francais",
            value: 0,
          })
        );
      } else if (
        locale.includes("ru") ||
        locale.includes("uk") ||
        locale.includes("be")
      ) {
        dispatch(
          Actions.changeLanguage({
            label: "Russian",
            value: 2,
          })
        );
      } else if (locale.includes("es")) {
        dispatch(
          Actions.changeLanguage({
            label: "Spanish",
            value: 3,
          })
        );
      } else if (locale.includes("pt")) {
        dispatch(
          Actions.changeLanguage({
            label: "Portuguese",
            value: 4,
          })
        );
      } else if (locale.includes("de")) {
        dispatch(
          Actions.changeLanguage({
            label: "Deutsch",
            value: 5,
          })
        );
      } else if (locale.includes("it")) {
        dispatch(
          Actions.changeLanguage({
            label: "Italiano",
            value: 6,
          })
        );
      } else {
        dispatch(
          Actions.changeLanguage({
            label: "English",
            value: 1,
          })
        );
      }
    }

    if (showRateReminder) {
      dispatch(Actions.changeShowRatingReminder(Number(showRateReminder)));
    }

    setFirstLoad(false);
  };
  const firstLoadSplash = () => {
    fetchData();
    return (
      <View style={styles.firstLoadSplashContainer}>
        <Image width={width * 0.6} source={require("../../assets/logo.png")} />
        <Text style={styles.firstLoadSplashText}>Medicinal Plants</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainAppContainer}>
      {firstLoad ? (
        firstLoadSplash()
      ) : (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Plants"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
              activeTintColor: "#fff",
              activeBackgroundColor: "#91c998",
              itemStyle: {
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderBottomColor: "#cccccc",
              },
              labelStyle: {
                fontSize: 16,
              },
            }}
          >
            <Drawer.Screen
              name="Plants"
              component={PlantsStack}
              options={{
                title: Languages.plantsDrawer[language.label],
              }}
            />
            <Drawer.Screen
              name="Treatments"
              component={TreatmentsStack}
              options={{
                title: Languages.treatmentsDrawer[language.label],
              }}
            />
            <Drawer.Screen
              name="Simple remedies"
              component={RemediesStack}
              options={{
                title: Languages.remediesDrawer[language.label],
              }}
            />
            <Drawer.Screen
              name="Pharmacy"
              component={PharmacyStack}
              options={{
                title: Languages.pharmacyDrawer[language.label],
              }}
            />
            <Drawer.Screen
              name="FruitsAndBerries"
              component={FruitsAndBerriesStack}
              options={{
                title: Languages.fruitsAndBerriesDrawer[language.label],
              }}
            />
            <Drawer.Screen
              name="PoisonousPlants"
              component={PoisonousPlantsStack}
              options={{
                title: Languages.PoisonousPlantsDrawer[language.label],
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}
