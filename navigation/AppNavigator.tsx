import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import CarDetailScreen from "../screens/CarDetailScreen";
import SchedulingScreen from "../screens/SchedulingScreen";
import SchedulingDetailsScreen from "../screens/SchedulingDetailsScreen";
import LoadingScreen from "../screens/LoadingScreen";

export type RootStackParamList = {
  Loading: undefined;
  Main: { screen?: "Home" | "Rentals" | "Profile" };
  CarDetail: { carId: string };
  Scheduling: { carId: string };
  SchedulingDetails: { carId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="CarDetail" component={CarDetailScreen} />
      <Stack.Screen name="Scheduling" component={SchedulingScreen} />
      <Stack.Screen
        name="SchedulingDetails"
        component={SchedulingDetailsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
