import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Car } from "../types/car";
import { useFavoriteStore } from "../store/favoriteStore";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

type Props = {
  car: Car;
};

const CarCard = ({ car }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const favorite = isFavorite(car.id);
  const flatListRef = useRef<FlatList<string>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeIndex === car.images.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, car.images.length]);

  return (
    <View
      className="bg-white rounded-xl mb-6 shadow-sm border border-gray-100 overflow-hidden self-center"
      style={{ width: CARD_WIDTH }}
    >
      <Pressable
        onPress={() => navigation.navigate("CarDetail", { carId: car.id })}
      >
        {/* Favorite icon */}
        <View className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full shadow">
          <Pressable onPress={() => toggleFavorite(car.id)}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={20}
              color={favorite ? "#DC1637" : "#A0A0B2"}
            />
          </Pressable>
        </View>

        {/* Carousel */}
        <View style={{ width: "100%", height: 200 }}>
          <FlatList
            ref={flatListRef}
            data={car.images}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: CARD_WIDTH, height: 200 }}
                resizeMode="cover"
              />
            )}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / CARD_WIDTH
              );
              setActiveIndex(index);
            }}
          />
          {car.images.length > 1 && (
            <View className="absolute bottom-2 left-0 right-0 flex-row justify-center">
              {car.images.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    activeIndex === index ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
          )}
        </View>

        {/* Information space */}
        <View className="p-3">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-base font-semibold text-title">
                {car.brand}
              </Text>
              <Text className="text-xs text-gray-500">{car.model}</Text>
            </View>

            <View className="items-end">
              <Text className="text-[10px] text-gray-500">Daily</Text>
              <Text className="text-primary font-bold text-sm">
                ${car.price}
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-4 mt-2">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="speedometer-outline" size={14} color="#7A7A80" />
              <Text className="text-xs text-gray-500">{car.transmission}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Ionicons name="flame-outline" size={14} color="#7A7A80" />
              <Text className="text-xs text-gray-500">{car.fuel}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CarCard;