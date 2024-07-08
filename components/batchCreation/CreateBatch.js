import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { showMessage, hideMessage } from "react-native-flash-message";

const Col = ({ numRows, children }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

const Row = ({ children }) => <View style={styles.row}>{children}</View>;

const CreateBatch = ({ navigaton }) => {
  const [name, setName] = React.useState("");
  const [po, setPo] = React.useState(0);
  const [bNumber, setBNumber] = React.useState("");
  const [fabrication, setFabrication] = React.useState("");
  const [color, setColor] = React.useState("");
  const [finishGsm, setFinishGsm] = React.useState("");
  const [finishWidth, setFinishWidth] = React.useState("");
  const [styleNumber, setStyleNumber] = React.useState("");

  const saveBatch = async () => {
    // if (batch == "Select batch...") {
    //   setMsg("Batch Number");
    // } else {
    try {
      const url = `http://${global.SERVERID}/inspaction/add_batch`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          po,
          bNumber,
          fabrication,
          color,
          finishGsm,
          finishWidth,
        }),
      };
      const response = await fetch(url, options);

      if (response.status == 500) {
        showMessage({
          message: "Server Error",
          type: "danger",
          icon: "danger",
        });
      } else if (response.status == 200) {
        showMessage({
          message: "Batch Added",
          type: "success",
          icon: "success",
        });
        handleReload();
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    // }
  };

  const handleReload = () => {
    setName("");
    setPo(0);
    setBNumber("");
    setFabrication("");
    setColor("");
    setFinishGsm();
    setFinishWidth();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.app}>
          <View style={styles.col1}>
            <Text>WORKORDER/BATCHNO</Text>
            <TextInput
              placeholder="Batch Number"
              style={styles.input}
              value={bNumber}
              onChangeText={(val) => setBNumber(val)}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Buyer</Text>
              <TextInput
                placeholder="Buyer"
                style={styles.input}
                value={name}
                onChangeText={(val) => setName(val)}
              />
            </View>
            <View style={styles.col1}>
              <Text>Customer PO</Text>
              <TextInput
                placeholder="Customer Po"
                style={styles.input}
                value={po}
                onChangeText={(val) => setPo(val)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Fabric Composition</Text>
              <TextInput
                placeholder="Fabric Composition"
                value={fabrication}
                style={styles.inputB}
                onChangeText={(val) => setFabrication(val)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Style Number</Text>
              <TextInput
                placeholder="Customer"
                value={styleNumber}
                style={styles.inputB}
                onChangeText={(val) => setStyleNumber(val)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Color</Text>
              <TextInput
                placeholder="Color"
                value={color}
                style={styles.input}
                onChangeText={(val) => setColor(val)}
              />
            </View>
            <View style={styles.col1}>
              <Text>Finish GSM</Text>
              <TextInput
                placeholder="Finish GSM"
                value={finishGsm}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(val) => setFinishGsm(val)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Finish Width (Inch)</Text>
              <TextInput
                placeholder="Finish Width (Inch)"
                value={finishWidth}
                style={styles.inputB}
                keyboardType="numeric"
                onChangeText={(val) => setFinishWidth(val)}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => saveBatch()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#FDEEEE",
  },
  input: {
    height: 50,
    width: wp("35%"),
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputB: {
    height: 50,
    width: wp("75%"),
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  img: {
    height: 60,
    width: 200,
  },
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: wp("85%"),
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    width: wp("85%"),
    height: 50,
    backgroundColor: "green",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 12,
    letterSpacing: 3,
  },
  row: {
    flexDirection: "row",
  },
  col1: {
    backgroundColor: "#FCE0E0",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  col2: {
    backgroundColor: "green",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 2,
  },
  "3col": {
    backgroundColor: "orange",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 3,
  },
  "4col": {
    flex: 4,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1SelectedRowStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
  dropdown1searchInputStyleStyle: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
});

export default CreateBatch;
