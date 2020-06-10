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

const treatmentsDB = {
  Francais: require("../../db/treatmentsFrancais.json"),
  English: require("../../db/treatmentsEnglish.json"),
  Russian: require("../../db/treatmentsRussian.json"),
  Deutsch: require("../../db/treatmentsDeutsch.json"),
  Italiano: require("../../db/treatmentsItaliano.json"),
  Portuguese: require("../../db/treatmentsPortuguese.json"),
  Spanish: require("../../db/treatmentsSpanish.json"),
};

import Languages from "../../languagesPack/Languages";
import { ReadTreatments } from "./ReadTreatments";
import { styles } from "./Styles";

const Stack = createStackNavigator();

export const TreatmentsStack = ({ navigation }) => {
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
          name="Treatments"
          component={Treatments}
          options={{
            title: Languages.treatments[language.label],
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
                  navigation.navigate("Treatments", { screen: "Search" })
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
          name="ReadTreatments"
          component={ReadTreatments}
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

const Treatments = ({ navigation }) => {
  let language = useSelector((state) => state.language);
  const [treatmentsRenderNum, setTreatmentsRenderNum] = React.useState(40);

  const renderTreatments = () => {
    if (treatmentsRenderNum < treatmentsDB[language.label].posts.length) {
      setTreatmentsRenderNum(treatmentsRenderNum + 40);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        navigation.push("ReadTreatments", {
          title:
            item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
          data: [...item.desc],
        });
      }}
    >
      <TreatmentsPost name={item.name} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <FlatList
          data={treatmentsDB[language.label].posts.slice(
            0,
            treatmentsRenderNum
          )}
          onEndReachedThreshold={0.5}
          onEndReached={renderTreatments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};
class TreatmentsPost extends React.PureComponent {
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
  const [treatmentsRenderNum, setTreatmentsRenderNum] = React.useState(40);
  const [phrase, setPhrase] = React.useState("");

  const renderTreatments = () => {
    if (treatmentsRenderNum < treatmentsDB[language.label].posts.length) {
      setTreatmentsRenderNum(treatmentsRenderNum + 40);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        navigation.push("ReadTreatments", {
          title:
            item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
          data: [...item.desc],
        });
      }}
    >
      <TreatmentsPost name={item.name} />
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
          data={treatmentsDB[language.label].posts
            .slice(0, treatmentsRenderNum)
            .filter((post) => {
              return post.name.toLowerCase().includes(phrase.toLowerCase());
            })}
          onEndReachedThreshold={0.5}
          onEndReached={renderTreatments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};
