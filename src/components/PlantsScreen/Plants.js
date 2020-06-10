import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  Alert,
  TextInput,
} from "react-native";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import * as StoreReview from "expo-store-review";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Languages from "../../languagesPack/Languages";
import * as Actions from "../../actions/Actions";

const plantsDB = {
  Francais: require("../../db/plantsFrancais.json"),
  English: require("../../db/plantsEnglish.json"),
  Russian: require("../../db/plantsRussian.json"),
  Deutsch: require("../../db/plantsDeutsch.json"),
  Italiano: require("../../db/plantsItaliano.json"),
  Portuguese: require("../../db/plantsPortuguese.json"),
  Spanish: require("../../db/plantsSpanish.json"),
};

import { ReadPlants } from "./ReadPlants";
import { styles } from "./Styles";
import PlantsPost from "./plantsPost";

const Stack = createStackNavigator();

export const PlantsStack = ({ navigation }) => {
  let language = useSelector((state) => state.language);
  const dispatch = useDispatch();
  let launchCounter = useSelector((state) => state.launchCounter);

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
          name="MedicalPlants"
          component={Plants}
          options={{
            title: Languages.plants[language.label],
            headerTintColor: "#fff",
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
                  navigation.navigate("Plants", { screen: "Search" })
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
          name="ReadPlants"
          component={ReadPlants}
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

const Plants = ({ navigation }) => {
  const dispatch = useDispatch();
  let language = useSelector((state) => state.language);
  let showRateReminder = useSelector((state) => state.showRateReminder);
  let launchCounter = useSelector((state) => state.launchCounter);

  const [rateWasShowed, setRateWasShowed] = React.useState(false);

  const showAlert = () => {
    Alert.alert(
      Languages.rateAppTitle[language.label],
      Languages.rateAppDescription[language.label],
      [
        {
          text: Languages.rateAskLater[language.label],
          onPress: async () => {
            const dateToRemind = Date.now() + 864000000;
            dispatch(Actions.changeShowRatingReminder(dateToRemind));
            await AsyncStorage.setItem(
              "showRateReminder",
              dateToRemind.toString()
            );
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
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!!showRateReminder && Date.now() > showRateReminder && !rateWasShowed) {
    showAlert();
    setRateWasShowed(true);
  } else if (!!showRateReminder && Date.now() < showRateReminder) {
  } else if (!rateWasShowed && launchCounter % 10 == 0) {
    showAlert();
    setRateWasShowed(true);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push("ReadPlants", {
          title: item.name,
          ...item,
        })
      }
    >
      <PlantsPost
        language={language}
        name={item.name}
        namev={item.namev}
        cat={item.cat}
        img={item.img}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={plantsDB[language.label].posts}
          initialNumToRender={122}
          removeClippedSubviews={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
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
        navigation.push("ReadPlants", {
          title: item.name,
          ...item,
        })
      }
    >
      <SearchPost
        language={language}
        name={item.name}
        namev={item.namev}
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
          data={plantsDB[language.label].posts.filter((post) => {
            return post.name.toLowerCase().includes(phrase.toLowerCase());
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

class SearchPost extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <View style={styles.descriptionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{this.props.name}</Text>
          </View>
          <View style={styles.commonNameContainer}>
            <Text style={styles.commonNameText}>
              {Languages.plantsName[this.props.language.label]}:{" "}
              <Text style={{ fontWeight: "bold", color: "green" }}>
                {this.props.namev}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
