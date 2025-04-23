import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { cars } from "../constants/cars";
import { RootStackParamList } from "../navigation/AppNavigator";

type RouteProps = RouteProp<RootStackParamList, "CarDetail">;
const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 280;

const CarDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const car = cars.find((c) => c.id === route.params.carId);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  if (!car) return null;

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carousel */}
        <View className="relative">
          <FlatList
            data={car.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  width,
                  height: IMAGE_HEIGHT,
                }}
                resizeMode="cover"
              />
            )}
          />

          {/* Dot indicators */}
          <View
            style={{
              position: "absolute",
              bottom: 12,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {car.images.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  backgroundColor: activeIndex === index ? "#DC1637" : "#ccc",
                }}
              />
            ))}
          </View>

          {/* Geri Butonu */}
          <View className="absolute top-10 left-4 z-20 bg-white/90 p-2 rounded-full shadow">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#dc1637" />
            </Pressable>
          </View>
        </View>

        {/* İçerik */}
        <View className="bg-white rounded-t-3xl -mt-12 px-6 pt-6 pb-10 space-y-2 shadow-sm">
          <Text className="text-2xl font-bold text-title">{car.brand}</Text>
          <Text className="text-sm text-gray-500">{car.model}</Text>

          <View className="flex-row flex-wrap justify-between mt-2">
            <Info icon="speedometer-outline" label="Speed" value={car.speed} />
            <Info icon="flash-outline" label="0-100" value={car.acceleration} />
            <Info icon="flame-outline" label="Fuel" value={car.fuel} />
            <Info
              icon="settings-outline"
              label="Gear"
              value={car.transmission}
            />
            <Info icon="car-outline" label="Power" value={car.horsepower} />
            <Info
              icon="people-outline"
              label="Capacity"
              value={`${car.seats} kişi`}
            />
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1">Daily Rate</Text>
            <Text className="text-primary text-2xl font-bold mb-4">
              ${car.price}
            </Text>

            <Pressable
              className="bg-primary py-4 rounded-xl"
              onPress={() =>
                navigation.navigate("Scheduling", { carId: car.id })
              }
            >
              <Text className="text-white text-center font-semibold text-base">
                Select Date
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Info = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) => (
  <View className="w-[48%] bg-gray-100 rounded-lg px-4 py-3 mb-3">
    <View className="flex-row items-center space-x-2 mb-1">
      <Ionicons name={icon} size={16} color="#7A7A80" />
      <Text className="text-xs text-gray-500">{label}</Text>
    </View>
    <Text className="text-sm font-semibold text-title">{value}</Text>
  </View>
);

export default CarDetailScreen;
