import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import Image from "react-native-scalable-image";

import Languages from "../../languagesPack/Languages";
import { images } from "./plantsImagesDB";
import { styles } from "./Styles";

const { width } = Dimensions.get("window");

class PlantsPost extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <Image width={width * 0.25} source={images[this.props.img]} />

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
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {Languages.plantsCategory[this.props.language.label]}:{" "}
              <Text style={{ fontWeight: "bold", color: "green" }}>
                {this.props.cat}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default PlantsPost;
