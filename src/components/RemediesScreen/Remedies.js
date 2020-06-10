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
import { StackActions, useFocusEffect } from "@react-navigation/native";
import * as StoreReview from "expo-store-review";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Actions from "../../actions/Actions";

const remediesDB = {
  Francais: require("../../db/remediesFrancais.json"),
  English: require("../../db/remediesEnglish.json"),
  Russian: require("../../db/remediesRussian.json"),
  Deutsch: require("../../db/remediesDeutsch.json"),
  Italiano: require("../../db/remediesItaliano.json"),
  Portuguese: require("../../db/remediesPortuguese.json"),
  Spanish: require("../../db/remediesSpanish.json"),
};

import { ReadRemedies } from "./ReadRemedies";
import Languages from "../../languagesPack/Languages";
import { styles } from "./Styles";

const Stack = createStackNavigator();

export const RemediesStack = ({ navigation }) => {
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
          name="SimpleRemedies"
          component={Remedies}
          options={{
            title: Languages.remedies[language.label],
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            },
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.headerLeftStyle}
              >
                <Ionicons name="md-menu" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Simple remedies", { screen: "Search" })
                }
                style={styles.headerRightStyle}
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
          name="ReadRemedies"
          component={ReadRemedies}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#00850e" },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.readPostHeaderLeft}
                onPress={() => {
                  navigation.dispatch(StackActions.pop(1));
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

const Remedies = ({ navigation }) => {
  let language = useSelector((state) => state.language);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        navigation.push("ReadRemedies", {
          title:
            item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
          data: { ...item },
        });
      }}
    >
      <RemediesPost name={item.name} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <FlatList
          data={remediesDB[language.label].posts}
          initialNumToRender={64}
          renderItem={renderItem}
          keyExtractor={(item) => Date.now().toString() + item.name}
        />
      </SafeAreaView>
    </View>
  );
};

class RemediesPost extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.postText}>{this.props.name}</Text>
      </View>
    );
  }
}

const Search = ({ navigation }) => {
  let language = useSelector((state) => state.language);
  const [phrase, setPhrase] = React.useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        navigation.push("ReadRemedies", {
          title:
            item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
          data: { ...item },
        });
      }}
    >
      <RemediesPost name={item.name} />
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
          data={remediesDB[language.label].posts.filter((post) => {
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
