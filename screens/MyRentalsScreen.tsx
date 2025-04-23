import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRentalStore } from "../store/rentalStore";
import { SafeAreaView } from "react-native-safe-area-context";

const MyRentalsScreen = () => {
  const { rentals, removeRental } = useRentalStore();

  if (rentals.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white px-6">
        <View className="flex-1 justify-center items-center space-y-3">
          <Text className="text-2xl font-bold">Rentals</Text>
          <Text className="text-gray-500 text-sm">
            No rental has been made yet.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-center mb-6">Rentals</Text>

        {rentals.map((rental, index) => {
          const dayMs = 1000 * 60 * 60 * 24;
          const rentalDays = Math.ceil(
            (rental.endDate.getTime() - rental.startDate.getTime()) / dayMs
          );
          const totalPrice = rental.car.price * rentalDays;

          return (
            <View
              key={index}
              className="bg-gray-100 p-4 rounded-xl shadow-sm space-y-1 relative mb-4"
            >
              {/* Silme Butonu */}
              <Pressable
                onPress={() => removeRental(index)}
                className="absolute top-2 right-2 z-10 p-1"
              >
                <Ionicons name="close-circle" size={20} color="#DC1637" />
              </Pressable>

              <View className="flex-row items-center space-x-4">
                {/* Araç Resmi - sadece 1 resim gösteriyoruz */}
                <Image
                  source={{ uri: rental.car.images[0] }}
                  style={{ width: 80, height: 60, borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-base font-semibold">
                    {rental.car.brand} {rental.car.model}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {rental.startDate.toDateString()} →{" "}
                    {rental.endDate.toDateString()}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {rentalDays} day
                  </Text>
                  <Text className="text-red-500 font-semibold">
                    ${totalPrice}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRentalsScreen;
