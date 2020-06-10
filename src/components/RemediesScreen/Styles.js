import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: width,
    alignItems: "center",
  },
  postContainer: {
    flex: 1,
    height: 60,
    width: width - 30,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "#91c998",
    justifyContent: "center",
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  postText: { color: "#000" },
  navContainer: {
    flex: 1,
  },
  readContainer: {
    flex: 1,
    alignItems: "stretch",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    margin: 0,
    alignItems: "center",
  },
  readTextContainer: {
    margin: 10,
    alignItems: "flex-start",
  },
  readPostTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    borderColor: "#00850e",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  readPostContainer: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  readPostImgContainer: { margin: 0, alignItems: "center" },
  headerLeftStyle: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerRightStyle: {
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
