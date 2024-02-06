import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const ScrWidth = Dimensions.get('window').width;
const SrcHeigth = Dimensions.get('window').height;

export default function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../asset/loading.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  animation: {
    width: 200,
    height: 150,
  },
});
