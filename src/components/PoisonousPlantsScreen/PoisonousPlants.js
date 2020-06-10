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
import PoisonousPlantsPost from "./PoisonousPlantsPost";
import { ReadPoisonousPlants } from "./ReadPoisonousPlants";

const PoisonousPlantsDB = {
  Francais: require("../../db/poisonousPlantsFrancais.json"),
  English: require("../../db/poisonousPlantsEnglish.json"),
  Russian: require("../../db/poisonousPlantsRussian.json"),
  Deutsch: require("../../db/poisonousPlantsDeutsch.json"),
  Italiano: require("../../db/poisonousPlantsItaliano.json"),
  Portuguese: require("../../db/poisonousPlantsPortuguese.json"),
  Spanish: require("../../db/poisonousPlantsSpanish.json"),
};

const Stack = createStackNavigator();

export const PoisonousPlantsStack = ({ navigation }) => {
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
          name="PoisonousPlants"
          component={PoisonousPlants}
          options={{
            title: Languages.PoisonousPlants[language.label],
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={{
                  marginLeft: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              >
                <Ionicons name="md-menu" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PoisonousPlants", { screen: "Search" })
                }
                style={{
                  marginRight: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                }}
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
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                }}
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
          name="ReadPoisonousPlants"
          component={ReadPoisonousPlants}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
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

const PoisonousPlants = ({ navigation }) => {
  let language = useSelector((state) => state.language);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push("ReadPoisonousPlants", {
          title:
            item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title,
          data: { ...item },
        })
      }
    >
      <PoisonousPlantsPost title={item.title} desc={item.desc} img={item.img} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={PoisonousPlantsDB[language.label].posts}
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
        navigation.push("ReadPoisonousPlants", {
          title:
            item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title,
          data: { ...item },
        })
      }
    >
      <PoisonousPlantsPost title={item.title} desc={item.desc} img={item.img} />
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
          data={PoisonousPlantsDB[language.label].posts.filter((post) => {
            return post.title.toLowerCase().includes(phrase.toLowerCase());
          })}
          initialNumToRender={122}
          removeClippedSubviews={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    </View>
  );
};
