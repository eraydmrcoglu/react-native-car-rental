import React from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavoriteStore } from "../store/favoriteStore";
import { useRentalStore } from "../store/rentalStore";
import { Car } from "../types/car";
import { SafeAreaView } from "react-native-safe-area-context";
import { cars } from "../constants/cars";

const ProfileScreen = () => {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const { rentals } = useRentalStore();

  const totalSpent = rentals.reduce((total, rental) => {
    const dayMs = 1000 * 60 * 60 * 24;
    const rentalDays = Math.ceil(
      (rental.endDate.getTime() - rental.startDate.getTime()) / dayMs
    );
    return total + rental.car.price * rentalDays;
  }, 0);

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="items-center mt-10">
        {/* Profile Picture */}
        <Image
          source={require("../assets/images/user.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#DC1637",
          }}
        />
        <Text className="text-xl font-semibold mt-2">Welcome!</Text>
      </View>

      <View className="items-center mt-10 space-y-8">
        {/* Expenditure Information */}
        <View className="items-center">
          <Text className="text-xl font-semibold">Total Expenditure</Text>
          <Text className="text-2xl font-bold text-primary">${totalSpent}</Text>
        </View>

        {/* Favorite Cars */}
        <View className="w-full">
          <Text className="text-xl font-semibold mb-4 text-center">
            Favorite Cars
          </Text>

          {favorites.length === 0 ? (
            <Text className="text-gray-500 text-sm text-center">
              No favorite vehicle.
            </Text>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingBottom: 80 }}
              renderItem={({ item }: { item: string }) => {
                const car = cars.find((car) => car.id === item);
                if (!car) return null;

                return (
                  <View className="flex-row items-center bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
                    <Image
                      source={{ uri: car.images[0] }}
                      style={{
                        width: 100,
                        height: 70,
                        borderRadius: 8,
                        marginRight: 16,
                      }}
                      resizeMode="cover"
                    />
                    <View className="flex-1">
                      <Text className="text-base font-semibold">
                        {car.brand} {car.model}
                      </Text>
                      <View className="flex-row space-x-4 mt-1">
                        <View className="flex-row items-center space-x-1">
                          <Ionicons
                            name="speedometer-outline"
                            size={14}
                            color="#7A7A80"
                          />
                          <Text className="text-xs text-gray-500">
                            {car.transmission}
                          </Text>
                        </View>
                        <View className="flex-row items-center space-x-1">
                          <Ionicons
                            name="flame-outline"
                            size={14}
                            color="#7A7A80"
                          />
                          <Text className="text-xs text-gray-500">
                            {car.fuel}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Pressable onPress={() => toggleFavorite(car.id)}>
                      <Ionicons name="heart" size={22} color="#DC1637" />
                    </Pressable>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;