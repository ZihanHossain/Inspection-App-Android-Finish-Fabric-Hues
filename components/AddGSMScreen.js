import React, { useEffect, useState } from "react";
// import * as Print from 'expo-print';
// import { shareAsync } from 'expo-sharing';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import SelectDropdownCustom from "./SelectDropdownCustom";

export default function AddGSMScreen() {
  const [rolls, setRolls] = useState([]);
  const [batches, setBatches] = React.useState([]);
  const [batch, setBNumber] = useState("");
  const [gsmData, setGsmData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  let now = new Date().toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const getBatchs = async (item) => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_saved_batches`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bNumber: item,
          }),
        }
      );
      const json = await response.json();
      const arr = [];
      json.forEach((element) => {
        arr.push({ id: element.Id, item: element.WorkOrderId });
      });
      setBatches(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getBatchs();
    handleReload();
  }, []);

  const getRolls = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_roll_by_batch_no_for_gsm`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bNumber: batch,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const json = await response.json();
      if (json.length > 0) {
        const arr = [];
        json.forEach((element) => {
          arr.push({ ...element, roll_number: element.roll_number.toString() });
        });
        setRolls(arr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReload = () => {
    setRolls([]);
  };

  const saveGSM = async () => {
    if (batch == "Select batch...") {
      setMsg("Batch Number");
    } else {
      try {
        const url = `http://${global.SERVERID}/inspaction/save_gsm`;
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bNumber: batch,
            gsmData,
          }),
        };
        const response = await fetch(url, options);
        const json = await response.text();
        if (json == "done") {
          handleReload();
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setBNumber(item.item);
  };

  const AlertButton = (type, msg) =>
    Alert.alert(type === "w" ? "Successful" : "Warning", msg, [{ text: "OK" }]);

  return (
    <View style={styles.container}>
      <View style={styles.app}>
        <View style={styles.topSection}>
          <View style={styles.dropdownContainer}>
            <SelectDropdownCustom
              data={batches}
              onSelect={handleSelect}
              onSearch={getBatchs}
            />
          </View>
          {selectedItem && (
            <View style={styles.selectedItemContainer}>
              <Text style={styles.selectedItemText}>
                Selected Item: {selectedItem.batch}
              </Text>
            </View>
          )}

          <View style={styles.row}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => getRolls(batch)}
              >
                <Text style={styles.searchButtonText}>Search Roll</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => saveGSM()}
              >
                <Text style={styles.searchButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.table}>
            <View style={styles.tableHead}>
              <Text>Roll Number</Text>
            </View>
            <ScrollView>
              <View style={styles.tableBody}>
                {rolls.map((row) => {
                  return row.GSM ? (
                    <View key={row.id}></View>
                  ) : (
                    <View style={styles.tableBodyRow}>
                      <View style={styles.tableBodyCol}>
                        <Text>{row.roll_number}</Text>
                      </View>
                      <View style={styles.tableBodyCol}>
                        <TextInput
                          style={styles.tableInput}
                          keyboardType="numeric"
                          placeholder="GSM"
                          onChangeText={(text) => {
                            const updatedGsmData = {
                              ...gsmData,
                              [row.roll_number]: {
                                GSM:
                                  text.trim() === "" || parseFloat(text) < 0
                                    ? null
                                    : parseFloat(text),
                              },
                            };
                            setGsmData(updatedGsmData);
                          }}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  app: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  topSection: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  bottomSection: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  col1: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "green",
    width: "30%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: "white",
    fontSize: 20,
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#3D7EC5",
    width: "20%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableBody: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableBodyRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableBodyCol: {
    flex: 1,
    alignItems: "center",
  },
  tableInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: "50%",
    color: "#444",
    textAlign: "center",
  },
  dropdownContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: "3%",
    marginBottom: "2%",
  },
  selectedItemContainer: {
    marginBottom: "2%",
  },
  selectedItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
