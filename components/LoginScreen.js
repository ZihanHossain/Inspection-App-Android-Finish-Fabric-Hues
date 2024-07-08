import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Loginbackground from "../assets/loginBackground.jpg";

const LoginScreen = ({ navigation }) => {
  const [eId, setEId] = useState("");
  const [password, setPassword] = useState("");

  const AlertButton = (msg) => Alert.alert("Warning", msg, [{ text: "OK" }]);

  const handleLogin = async () => {
    console.log("in");
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/validate_login_app`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eId,
            password,
            version: "V1.4",
            module: "finish_fabric",
          }),
        }
      );
      const json = await response.text();
      if (json === "version invalid") {
        AlertButton("App Veersion Is Outdated, Please Update.");
      } else if (json === "invalid") {
        AlertButton("Wrong Cred!");
      } else if (json === "error") {
        AlertButton("error!");
      } else if (json === "deactive") {
        AlertButton("User is deactive. Please inform 'It Support'!");
      } else if (json === "valid") {
        global.USERID = eId;
        navigation.navigate("HomeScreen", { name: "Jane" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground source={Loginbackground} style={styles.background}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Image source={require("../assets/icon.png")} />
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={eId}
          onChangeText={setEId}
          placeholder="Enter your Id"
          placeholderTextColor="white"
          autoCapitalize="characters"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "60%",
    width: "80%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "90%",
    marginBottom: 20,
    borderRadius: 5,
    color: "white",
  },
  buttonContainer: {
    backgroundColor: "#4da6ff",
    padding: 15,
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
