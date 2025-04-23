import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRentalStore } from "../store/rentalStore";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/AppNavigator";
import { cars } from "../constants/cars";
import { Car } from "../types/car";
import { SafeAreaView } from "react-native-safe-area-context";

type SchedulingDetailsRouteProp = RouteProp<
  RootStackParamList,
  "SchedulingDetails"
>;

const SchedulingDetailsScreen = () => {
  const route = useRoute<SchedulingDetailsRouteProp>();
  const navigation = useNavigation();
  const carId = route.params.carId;
  const car: Car = cars.find((c) => c.id === carId)!;
  const { startDate, endDate, addRental } = useRentalStore();

  if (!startDate || !endDate) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-lg">
          Lacks knowledge of history.
        </Text>
      </View>
    );
  }

  const dayMs = 1000 * 60 * 60 * 24;
  const rentalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / dayMs
  );
  const totalPrice = rentalDays * car.price;

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Geri butonu ve başlık */}
      <View className="flex-row items-center space-x-2 mb-6 mt-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#dc1637" />
        </Pressable>
        <Text className="text-xl font-bold">Rental Summary</Text>
      </View>

      <View className="flex-1 justify-center space-y-6">
        <View className="bg-gray-100 rounded-xl p-4">
          <Text className="text-gray-500">Car</Text>
          <Text className="text-lg font-semibold">
            {car.brand} {car.model}
          </Text>
        </View>

        <View className="bg-gray-100 rounded-xl p-4">
          <Text className="text-gray-500">Date Range</Text>
          <Text className="text-lg font-semibold">
            {startDate.toDateString()} → {endDate.toDateString()}
          </Text>
        </View>

        <View className="bg-gray-100 rounded-xl p-4">
          <Text className="text-gray-500">Total Days</Text>
          <Text className="text-lg font-semibold">{rentalDays} day</Text>
        </View>

        <View className="bg-gray-100 rounded-xl p-4">
          <Text className="text-gray-500">Total Amount</Text>
          <Text className="text-lg font-semibold text-red-500">
            ${totalPrice}
          </Text>
        </View>

        <Pressable
          className="bg-primary py-4 rounded-lg mt-4"
          onPress={() => {
            addRental({ car, startDate, endDate });
            navigation.navigate("Main", { screen: "Rentals" });
          }}
        >
          <Text className="text-white text-center font-semibold text-base">
            Rent
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SchedulingDetailsScreen;
