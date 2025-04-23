import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useRentalStore } from "../store/rentalStore";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type SchedulingRouteProp = RouteProp<RootStackParamList, "Scheduling">;

const SchedulingScreen = () => {
  const [showPicker, setShowPicker] = useState<"start" | "end" | null>(null);
  const [open, setOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);
  const [items, setItems] = useState([
    { label: "1 Day", value: 1 },
    { label: "2 Day", value: 2 },
    { label: "3 Day", value: 3 },
    { label: "4 Day", value: 4 },
    { label: "5 Day", value: 5 },
  ]);

  const { startDate, endDate, setStartDate, setEndDate } = useRentalStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SchedulingRouteProp>();
  const carId = route.params.carId;

  const handleContinue = () => {
    if (startDate && endDate) {
      navigation.navigate("SchedulingDetails", { carId });
    } else {
      alert("Please select start and end dates.");
    }
  };

  const handleChange =
    (type: "start" | "end") =>
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const { type: eventType } = event;
      if (eventType === "set" && selectedDate) {
        type === "start"
          ? setStartDate(selectedDate)
          : setEndDate(selectedDate);
      }
      setShowPicker(null);
    };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute top-6 left-4 z-10"
          >
            <Ionicons name="chevron-back" size={24} color="#dc1637" />
          </Pressable>

          <View className="space-y-6">
            <Text className="text-2xl font-bold text-center">
              Date Selection
            </Text>

            {/* Start date */}
            <Pressable
              className="bg-gray-100 rounded-xl p-4"
              onPress={() => setShowPicker("start")}
            >
              <Text className="text-sm text-gray-500 mb-1">Start Date</Text>
              <Text className="text-base font-semibold">
                {startDate
                  ? startDate.toLocaleDateString("en-US")
                  : "Not selected"}
              </Text>
            </Pressable>

            {/* End date */}
            <Pressable
              className="bg-gray-100 rounded-xl p-4"
              onPress={() => setShowPicker("end")}
            >
              <Text className="text-sm text-gray-500 mb-1">End Date</Text>
              <Text className="text-base font-semibold">
                {endDate ? endDate.toLocaleDateString("en-US") : "Not selected"}
              </Text>
            </Pressable>

            {/* Date pickers */}
            {showPicker === "start" && (
              <DateTimePicker
                mode="date"
                value={startDate || new Date()}
                onChange={handleChange("start")}
                display={Platform.OS === "ios" ? "inline" : "default"}
              />
            )}
            {showPicker === "end" && (
              <DateTimePicker
                mode="date"
                value={endDate || new Date()}
                onChange={handleChange("end")}
                display={Platform.OS === "ios" ? "inline" : "default"}
              />
            )}

            {/* Rental period */}
            <View className="z-50">
              <Text className="text-sm text-gray-500 mb-2">Rental Period</Text>
              <DropDownPicker
                open={open}
                value={rentalDays}
                items={items}
                setOpen={setOpen}
                setValue={setRentalDays}
                setItems={setItems}
                placeholder="Select day"
                listMode="SCROLLVIEW"
                style={{ borderColor: "#d1d5db" }}
                dropDownContainerStyle={{ borderColor: "#d1d5db" }}
              />
            </View>

            <Pressable
              className="bg-primary py-4 rounded-lg"
              onPress={handleContinue}
            >
              <Text className="text-white text-center font-semibold text-base">
                Continue
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SchedulingScreen;
