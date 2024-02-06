import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const Success = ({ route }) => {
  const navigation = useNavigation();
  const { name } = route.params;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name }],
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const styles = StyleSheet.create({
    animation: {
      width: 200,
      height: 150,
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <LottieView
        source={require('../asset/success.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
};

export default Success;
