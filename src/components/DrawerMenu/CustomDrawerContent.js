import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Share,
  AsyncStorage,
} from "react-native";
import * as StoreReview from "expo-store-review";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Constants from "expo-constants";
import Image from "react-native-scalable-image";
import { useDispatch, useSelector } from "react-redux";
import { SinglePickerMaterialDialog } from "react-native-material-dialog";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "./Styles";
import Languages from "../../languagesPack/Languages";

import * as Actions from "../../actions/Actions";

const { width } = Dimensions.get("window");

export const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  let language = useSelector((state) => state.language);
  const [spinnerVisible, setSpinnerVisible] = React.useState(false);

  const [pickerLanguageVisible, setPickerLanguageVisible] = React.useState(
    false
  );

  const onShare = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === "ios"
            ? Languages.shareAppIOS[language.label]
            : Languages.shareAppAndroid[language.label],
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={spinnerVisible}
        color="white"
        overlayColor="rgba(0, 0, 0, 0.6)"
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerDrawer}>
          <Image
            width={width * 0.75}
            source={require("../../../assets/drawertopimg.png")}
          />
          <Text style={styles.headVersion}>v{Constants.manifest.version}</Text>
        </View>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            onPress={() => setPickerLanguageVisible(true)}
            style={styles.touchableLanguageContainer}
          >
            <Text>{Languages.languageDrawer[language.label]}:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingRight: 3 }}>{language.label}</Text>
              <Ionicons name="md-arrow-dropdown" size={18} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
        <SinglePickerMaterialDialog
          title={Languages.languageDrawer[language.label]}
          items={[
            "Francais",
            "English",
            "Russian",
            "Spanish",
            "Portuguese",
            "Deutsch",
            "Italiano",
          ].map((row, index) => ({
            value: index,
            label: row,
          }))}
          colorAccent={"green"}
          visible={pickerLanguageVisible}
          selectedItem={{ value: language.value, label: language.label }}
          scrolled={true}
          onCancel={() => setPickerLanguageVisible(false)}
          onOk={(result) => {
            setSpinnerVisible(true);
            setTimeout(async () => {
              dispatch(Actions.changeLanguage(result.selectedItem));
              await AsyncStorage.setItem(
                "languageValue",
                result.selectedItem.value.toString()
              );
              await AsyncStorage.setItem(
                "languageLabel",
                result.selectedItem.label
              );
            }, 0);

            setPickerLanguageVisible(false);
            setTimeout(() => setSpinnerVisible(false), 3000);
          }}
        />

        <View style={styles.itemsContainer}>
          <View style={styles.iconsItemsContainer}>
            <Ionicons
              name="md-leaf"
              size={28}
              color="black"
              style={styles.itemIcon}
            />
            <Ionicons
              name="md-bug"
              size={28}
              color="black"
              style={styles.itemIcon}
            />
            <Ionicons
              name="md-bonfire"
              size={28}
              color="black"
              style={styles.itemIcon}
            />
            <Ionicons
              name="md-medkit"
              size={28}
              color="black"
              style={styles.itemIcon}
            />
            <Ionicons
              name="ios-flower"
              size={28}
              color="black"
              style={styles.itemIcon}
            />
            <Ionicons
              name="md-nuclear"
              size={28}
              color="black"
              style={styles.itemIcon}
            />
          </View>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>
        <View>
          <TouchableOpacity
            style={styles.shareContainer}
            onPress={() => onShare()}
          >
            <Ionicons
              name="md-share"
              size={28}
              color="black"
              style={styles.itemIconShare}
            />
            <Text style={styles.shareText}>
              {Languages.shareDrawer[language.label]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rateButton}>
          <TouchableOpacity
            style={styles.rateTouchable}
            onPress={() => StoreReview.requestReview()}
          >
            <Text style={styles.rateText}>
              {Languages.rateDrawer[language.label]}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
