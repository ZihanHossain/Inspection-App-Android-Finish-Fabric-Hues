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

const Col = ({ numRows, children }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

const Row = ({ children }) => <View style={styles.row}>{children}</View>;

const AddBatchScreen = ({ navigation, route }) => {
  const [name, setName] = React.useState("");
  const [po, setPo] = React.useState(0);
  const [bNumber, setBNumber] = React.useState("");
  const [fabrication, setFabrication] = React.useState("");
  const [color, setColor] = React.useState("");
  const [aclGsm, setAclGsm] = React.useState("");
  const [aclWidth, setAclWidth] = React.useState("");
  const [styleNumber, setStyleNumber] = React.useState("");
  const [rollNumWeight, setRollNumWeight] = React.useState([]);
  const [rollNumber, setRollNumber] = React.useState("");
  const [rollWeight, setRollWeight] = React.useState("");

  const addSticker = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/add_batch_roll`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_po: po,
            buyer: name,
            work_order: bNumber,
            fabrication: fabrication,
            color: color,
            actual_gsm: aclGsm,
            style_number: styleNumber,
            actual_width: aclWidth,
            roll_num_weight: rollNumWeight,
          }),
        }
      );
      const json = await response.text();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setBNumber(item.batch);
    getPrevRollsByBatchNo(item.batch);
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
                keyboardType="numeric"
                onChangeText={(val) => setFabrication(val)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Style Number</Text>
              <TextInput
                placeholder="Style Number"
                value={styleNumber}
                style={styles.inputB}
                keyboardType="numeric"
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
              <Text>Actual GSM</Text>
              <TextInput
                placeholder="Actual GSM"
                value={aclGsm}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(val) => setAclGsm(val)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Actual Width (INCH)</Text>
              <TextInput
                placeholder="Actual Width (INCH)"
                value={aclWidth}
                style={styles.inputB}
                keyboardType="numeric"
                onChangeText={(val) => setAclWidth(val)}
              />
            </View>
          </View>
        </View>
        <View>
          <Text>Add Roll</Text>
        </View>
        <View style={styles.app}>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text>Roll Number</Text>
              <TextInput
                placeholder="Req. Width (INCH)"
                value={rollNumber}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(val) => setRollNumber(val)}
              />
            </View>
            <View style={styles.col1}>
              <Text>Roll Weight</Text>
              <TextInput
                placeholder="Req. Width (INCH)"
                value={rollWeight}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(val) => setRollWeight(val)}
              />
            </View>
            <View>
              <Button
                onPress={() => {
                  setRollNumber("");
                  setRollWeight("");
                  rollNumWeight.push({
                    s_id: 0,
                    number: rollNumber,
                    weight: rollWeight,
                  });
                }}
                title="ADD"
              />
            </View>
          </View>
          <View style={styles.row}>
            <FlatList
              data={rollNumWeight}
              renderItem={({ item }) => (
                <Text style={styles.item}>
                  Number: {item.number} , Weight: {item.weight}
                </Text>
              )}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={addSticker}>
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

export default AddBatchScreen;
