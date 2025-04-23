import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <LottieView
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
        style={{ width: width * 0.6, height: 200 }}
      />
    </View>
  );
};

export default LoadingScreen;