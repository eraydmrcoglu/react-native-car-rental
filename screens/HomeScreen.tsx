import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CarCard from "../components/CarCard";
import { cars } from "../constants/cars";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View className="flex-1 justify-center items-center mt-4 mb-4">
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              width: 200,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </View>

        <Text className="text-2xl font-bold mt-4 mb-4">All Vehicles</Text>

        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
