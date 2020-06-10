import * as React from "react";
import {
  View,
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
import FruitsAndBerriesPost from "./FruitsAndBerriesPost";
import { ReadFruitsAndBerries } from "./ReadFruitsAndBerries";

const FruitsAndBerriesDB = {
  Francais: require("../../db/fruitsAndBerriesFrancais.json"),
  English: require("../../db/fruitsAndBerriesEnglish.json"),
  Russian: require("../../db/fruitsAndBerriesRussian.json"),
  Deutsch: require("../../db/fruitsAndBerriesDeutsch.json"),
  Italiano: require("../../db/fruitsAndBerriesItaliano.json"),
  Portuguese: require("../../db/fruitsAndBerriesPortuguese.json"),
  Spanish: require("../../db/fruitsAndBerriesSpanish.json"),
};

const Stack = createStackNavigator();

export const FruitsAndBerriesStack = ({ navigation }) => {
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
          name="FruitsAndBerries"
          component={FruitsAndBerries}
          options={{
            title: Languages.fruitsAndBerries[language.label],
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.headerLeftButton}
              >
                <Ionicons name="md-menu" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FruitsAndBerries", { screen: "Search" })
                }
                style={styles.headerRightButton}
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
          name="ReadFruitsAndBerries"
          component={ReadFruitsAndBerries}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.readPostHeaderLeft}
                onPress={() => {
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

const FruitsAndBerries = ({ navigation }) => {
  let language = useSelector((state) => state.language);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push("ReadFruitsAndBerries", {
          title:
            item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title,
          data: { ...item },
        })
      }
    >
      <FruitsAndBerriesPost
        title={item.title}
        desc={item.desc}
        img={item.img}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={FruitsAndBerriesDB[language.label].posts}
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
        navigation.push("ReadFruitsAndBerries", {
          title:
            item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title,
          data: { ...item },
        })
      }
    >
      <FruitsAndBerriesPost
        title={item.title}
        desc={item.desc}
        img={item.img}
      />
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
          data={FruitsAndBerriesDB[language.label].posts.filter((post) => {
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
