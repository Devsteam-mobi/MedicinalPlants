import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
    marginBottom: 5,
    marginTop: 5,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    borderRadius: 6,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  descriptionContainer: {
    marginLeft: 10,
    flexDirection: "column",
  },
  titleContainer: { flexDirection: "row", width: width * 0.62 },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "bold",
  },
  commonNameContainer: {
    flexDirection: "row",
    width: width * 0.62,
    marginBottom: 5,
  },
  commonNameText: { flex: 1, flexWrap: "wrap", fontSize: 13 },
  categoryContainer: {
    flexDirection: "row",
    width: width * 0.62,
  },
  categoryText: { flex: 1, flexWrap: "wrap", fontSize: 13 },
  readPlantsTitle: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  readPostContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  paragraphContainer: { flexDirection: "row", width: width * 0.92 },
  paragraphText: {
    flex: 1,
    flexWrap: "wrap",
  },
  navContainer: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: "#00850e",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});
