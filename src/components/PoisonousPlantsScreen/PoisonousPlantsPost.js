import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import Image from "react-native-scalable-image";

import { images } from "./PoisonousPlantsImagesDB";
import { styles } from "./Styles";

const { width } = Dimensions.get("window");

export default class PoisonousPlantsPost extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.postContainer}>
        <Image width={width * 0.25} source={images[this.props.img]} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <Text style={styles.descText}>{this.props.desc}</Text>
        </View>
      </View>
    );
  }
}
