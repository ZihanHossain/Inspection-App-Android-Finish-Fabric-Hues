import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import CreateBatch from "./batchCreation/CreateBatch";
import BatchCreation from "./batchCreation/BatchCreation";
import AddGSMScreen from "./AddGSMScreen";
import PrintScreen from "./PrintScreen";
import RollCreation from "./batchCreation/RollCreation";
import InspactionScreen from "./InspectionScreen";
import LoginScreen from "./LoginScreen";
import { IconButton } from "react-native-paper";
import FlashMessage from "react-native-flash-message";
import { View } from "react-native";
import InternetConnectionAlert from "react-native-internet-connection-alert";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <InternetConnectionAlert
        onChange={(connectionState) => {
          console.log("Connection State: ", connectionState);
        }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: "Home",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#03B061",
                },
              }}
            />
            <Stack.Screen
              name="PrintScreen"
              component={PrintScreen}
              options={({ navigation }) => ({
                title: "Print",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#03B061",
                },
                headerLeft: () => (
                  <IconButton
                    icon="home"
                    onPress={() => navigation.navigate("HomeScreen")}
                  />
                ),
              })}
            />
            <Stack.Screen name="BatchCreation" component={BatchCreation} />
            <Stack.Screen name="CreateBatch" component={CreateBatch} />
            <Stack.Screen
              name="AddGSMScreen"
              component={AddGSMScreen}
              options={({ navigation }) => ({
                title: "Add GSM",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#03B061",
                },
                headerLeft: () => (
                  <IconButton
                    icon="home"
                    onPress={() => navigation.navigate("HomeScreen")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="RollCreation"
              component={RollCreation}
              options={({ navigation }) => ({
                title: "Roll Creation",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#03B061",
                },
                headerLeft: () => (
                  <IconButton
                    icon="home"
                    onPress={() => navigation.navigate("HomeScreen")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="InspactionScreen"
              component={InspactionScreen}
              options={({ navigation }) => ({
                title: "4 Point Inspection",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#03B061",
                },
                headerLeft: () => (
                  <IconButton
                    icon="home"
                    onPress={() => navigation.navigate("HomeScreen")}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </InternetConnectionAlert>
    </View>
  );
};
