import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
  },
  settingsContainer: { flex: 1, backgroundColor: "#91c998" },
  textLead: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  changeNamePencil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    padding: 15,
    marginHorizontal: 12,
  },
  inputName: {
    height: 50,
    marginTop: 10,
    marginHorizontal: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  warningMessage: { paddingHorizontal: 15, paddingTop: 15, color: "red" },
  buttonsContainer: { flexDirection: "row", justifyContent: "space-between" },
  inputButtons: {
    alignItems: "center",
    margin: 15,
  },
  inputButtonText: {
    color: "white",
    padding: 7,
    backgroundColor: "green",
    borderRadius: 5,
  },
  explanationText: { fontSize: 16, paddingVertical: 15, paddingHorizontal: 15 },
  countryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    padding: 15,
    marginHorizontal: 12,
  },
  contactUs: { fontSize: 16, paddingVertical: 15, paddingHorizontal: 15 },
  countryLabel: { paddingRight: 3, fontSize: 16 },
  firstLoadSplashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  firstLoadSplashText: { fontSize: 22, fontWeight: "bold", margin: 20 },
});
