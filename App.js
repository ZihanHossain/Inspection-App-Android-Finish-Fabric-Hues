import React from "react";
import { LogBox } from "react-native";
import { Navigation } from "./components/navigation";

global.SERVERID = "10.12.61.195:3005";

export default function App({ navigation }) {
  return <Navigation />;
}

LogBox.ignoreLogs(["Warning: Failed prop type: Invalid prop `textStyle`"]);
