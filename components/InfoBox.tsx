import React from "react";
import { View, Text } from "react-native";

type InfoBoxProps = {
  title: string;
  value: string;
};

const InfoBox = ({ title, value }: InfoBoxProps) => (
  <View className="w-[48%] bg-gray-100 p-4 mb-4 rounded-lg">
    <Text className="text-gray-500 text-sm">{title}</Text>
    <Text className="font-bold text-lg mt-1">{value}</Text>
  </View>
);

export default InfoBox;
