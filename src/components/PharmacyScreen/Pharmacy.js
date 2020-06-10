import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  FlatList,
  AsyncStorage,
  Alert,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as StoreReview from "expo-store-review";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Actions from "../../actions/Actions";

import Languages from "../../languagesPack/Languages";
import { styles } from "./Styles";
import PharmacyPost from "./PharmacyPost";
import { ReadPharmacy } from "./ReadPharmacy";

const pharmacyDB = {
  Francais: require("../../db/pharmacyFrancais.json"),
  English: require("../../db/pharmacyEnglish.json"),
  Russian: require("../../db/pharmacyRussian.json"),
  Deutsch: require("../../db/pharmacyDeutsch.json"),
  Italiano: require("../../db/pharmacyItaliano.json"),
  Portuguese: require("../../db/pharmacyEnglish.json"),
  Spanish: require("../../db/pharmacySpanish.json"),
};

const Stack = createStackNavigator();

export const PharmacyStack = ({ navigation }) => {
  let language = useSelector((state) => state.language);
  let launchCounter = useSelector((state) => state.launchCounter);
  const dispatch = useDispatch();

  const exitApp = () => {
    Alert.alert(
      Languages.exitAppTitle[language.label],
      Languages.exitAppDesc[language.label],
      [
        {
          text: Languages.cancel[language.label],
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: Languages.yes[language.label],
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (launchCounter % 10 == 0) {
          Alert.alert(
            Languages.rateAppTitle[language.label],
            Languages.rateAppDescription[language.label],
            [
              {
                text: Languages.rateAskLater[language.label],
                onPress: async () => {
                  exitApp();
                },
              },
              {
                text: Languages.rateNoThanks[language.label],
                onPress: async () => {
                  const dateToRemind = Date.now() + 2592000000;
                  dispatch(Actions.changeShowRatingReminder(dateToRemind));
                  await AsyncStorage.setItem(
                    "showRateReminder",
                    dateToRemind.toString()
                  );
                  exitApp();
                },
                style: "cancel",
              },
              {
                text: Languages.rateRate[language.label],
                onPress: async () => {
                  const dateToRemind = Date.now() + 2592000000;
                  dispatch(Actions.changeShowRatingReminder(dateToRemind));
                  await AsyncStorage.setItem(
                    "showRateReminder",
                    dateToRemind.toString()
                  );
                  StoreReview.requestReview();
                  exitApp();
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          exitApp();
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [language])
  );
  return (
    <SafeAreaView style={styles.navContainer}>
      <Stack.Navigator>
        <Stack.Screen
          name="NaturalDrugs"
          component={Pharmacy}
          options={{
            title: Languages.pharmacy[language.label],
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.headerLeft}
              >
                <Ionicons name="md-menu" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Pharmacy", { screen: "Search" })
                }
                style={styles.headerRight}
              >
                <Ionicons name="ios-search" size={30} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({ route }) => ({
            title: Languages.search[language.label],
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.searchHeaderLeft}
                onPress={async () => {
                  navigation.dispatch(StackActions.pop(1));
                }}
              >
                <Ionicons name="ios-arrow-round-back" size={30} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ReadPharmacy"
          component={ReadPharmacy}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.readPostHeaderLeft}
                onPress={async () => {
                  try {
                    navigation.dispatch(StackActions.pop(1));
                  } catch (err) {}
                }}
              >
                <Ionicons name="ios-arrow-round-back" size={30} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const Pharmacy = ({ navigation }) => {
  let language = useSelector((state) => state.language);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push("ReadPharmacy", {
          title:
            item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title,
          data: { ...item },
        })
      }
    >
      <PharmacyPost title={item.title} img={item.img} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {language.label === "Portuguese" && (
          <Text style={styles.wrongTranslation}>
            Falta a versão em português. Mostra inglês
          </Text>
        )}

        <FlatList
          data={pharmacyDB[language.label].posts}
          initialNumToRender={122}
          removeClippedSubviews={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </View>
  );
};

const Search = ({ navigation }) => {
  let language = useSelector((state) => state.language);
  const [phrase, setPhrase] = React.useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push("ReadPharmacy", {
          title:
            item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title,
          data: { ...item },
        })
      }
    >
      <PharmacyPost title={item.title} img={item.img} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setPhrase(text)}
        value={phrase}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={pharmacyDB[language.label].posts.filter((post) => {
            return post.title.toLowerCase().includes(phrase.toLowerCase());
          })}
          initialNumToRender={122}
          removeClippedSubviews={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </View>
  );
};
