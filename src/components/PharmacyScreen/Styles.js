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
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    width: width * 0.62,
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "bold",
  },
  readPostContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  readPostTitleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    alignItems: "center",
    width: width,
  },
  readPostTitleText: { fontSize: 18, fontWeight: "bold" },
  paragraphContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    alignItems: "flex-start",
    width: width,
  },
  paragraphText: { fontSize: 16 },
  navContainer: {
    flex: 1,
  },
  wrongTranslation: {
    color: "red",
    paddingHorizontal: 30,
    paddingVertical: 7,
  },
  textInput: {
    height: 40,
    borderColor: "#00850e",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  headerLeft: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerRight: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  searchHeaderLeft: {
    color: "#fff",
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  readPostHeaderLeft: {
    color: "#fff",
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
