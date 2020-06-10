import * as React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerDrawer: {
    flex: 1,
    padding: 5,
  },
  headVersion: {
    marginTop: -27,
    marginLeft: 7,
    fontSize: 18,
    fontStyle: "italic",
    color: "#fff",
  },
  languageContainer: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  touchableLanguageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    marginHorizontal: 15,
  },
  itemsContainer: { flexDirection: "row" },
  iconsItemsContainer: {
    flexDirection: "column",
    marginTop: -9,
    marginLeft: 15,
    alignItems: "center",
  },
  itemIcon: { marginTop: 28 },
  itemIconShare: {
    marginRight: 20,
  },
  shareContainer: {
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 30,
    alignItems: "center",
  },
  shareIcon: { marginRight: 20 },
  shareText: { fontSize: 16 },
  rateButton: {
    flex: 1,
    maxWidth: 190,
    borderRadius: 4,
    marginLeft: 15,
    marginTop: 28,
    backgroundColor: "#00850e",
  },
  rateTouchable: { alignItems: "center" },
  rateText: { color: "#fff", padding: 7 },
});
