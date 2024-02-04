import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const ScrWidth = Dimensions.get('window').width;
const SrcHeigth = Dimensions.get('window').height;

export default function Success({route}) {
  const navigation = useNavigation();
  const { name } = route.params;
  console.log('name:', name);

  useEffect(() => {
    // Navigate to the home page after a delay of 2 seconds
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: {name} }],
      });
    }, 1500);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const sty = StyleSheet.create({
    animation: {
      width: 200,
      height: 150
    }
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '' }}>
      <LottieView
        source={require('../asset/success.json')}
        style={sty.animation}
        autoPlay
      />
    </View>
  );
}
