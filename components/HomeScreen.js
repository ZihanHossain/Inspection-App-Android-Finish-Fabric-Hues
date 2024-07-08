import * as React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddBatch from "../assets/add_batch.png";
import AddRoll from "../assets/add_roll.png";
import AddGSM from "../assets/add_gsm.png";
import FI from "../assets/fi_img.png";
import StickerPrint from "../assets/sticker_print.png";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateBatch", { name: "Jane" })}
      >
        <Image source={AddBatch} style={styles.img} />
        <TouchableOpacity style={styles.buttonIn}>
          <Text>Add Batch</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RollCreation", { name: "Jane" })}
      >
        <Image source={AddRoll} style={styles.img} />
        <TouchableOpacity style={styles.buttonIn}>
          <Text>Add Roll</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddGSMScreen")}
      >
        <Image source={AddGSM} style={styles.img} />
        <TouchableOpacity style={styles.buttonIn}>
          <Text>Add GSM</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("InspactionScreen", {
            bNumber: "Select a Batch...",
            bIndex: null,
            mNumber: 0,
            mIndex: null,
          })
        }
      >
        <Image source={FI} style={styles.img} />
        <TouchableOpacity style={styles.buttonIn}>
          <Text>4 Point Inspection</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PrintScreen", { name: "Jane" })}
      >
        <Image source={StickerPrint} style={styles.img} />
        <TouchableOpacity style={styles.buttonIn}>
          <Text>Print Sticker</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  img: {
    width: wp("32%"),
    height: wp("32%"),
  },
  button: {
    alignItems: "center",
    width: wp("35%"),
    height: hp("21%"),
    marginHorizontal: 15,
    marginTop: 50,
    backgroundColor: "#cbbeb5",
    borderRadius: 10,
  },
  buttonIn: {
    alignItems: "center",
    fontWeight: "bold",
    paddingTop: 9,
    width: "100%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#5fa7e9",
  },
});

export default HomeScreen;
