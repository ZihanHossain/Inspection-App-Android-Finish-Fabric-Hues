<script src="http://10.12.3.128:8097"></script>;
import React, { useEffect, useState } from "react";
// import * as Print from 'expo-print';
// import { shareAsync } from 'expo-sharing';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdownCustom from "./SelectDropdownCustom";
import RollCard from "./smallComponents/RollCard";

export default function PrintScreen() {
  const [rolls, setRolls] = useState([]);
  const [batches, setBatches] = React.useState([]);
  const [selectedRolls, setSelectedRolls] = React.useState([]);

  let now = new Date().toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const getBatchs = async (text) => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_batches_for_print`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bNumber: text,
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
  }, []);

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  const getData = async (batch) => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_data_by_batch_roll_no`,
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
      const json = await response.json();
      setRolls(json);
      console.log(json);
      // setName(json[0]["customer"]);
      // setFabrication(json[0]["fabricname"]);
      // setColor(json[0]["shade"]);
      // setGsm(json[0]["GSM"]);
      // setPo(json[0]["WFX_PO"]);
      // setMachineNumber(json[0]["machine_number"]);
      // setRollWeight(json[0]["ActualRollWeight"]);
      // setAclWidth(json[0]["ActualRollWidth"]);
      // setInventoryCode(json[0]["InventoryCode"]);
      // setDate(json[0]["Date"]);
      // setUserId(json[0]["user_id"]);
      // setRollLength(
      //   round(
      //     (json[0]["ActualRollWeight"] * 39.37 * 1000) /
      //       (json[0]["GSM"] * json[0]["ActualRollWidth"]),
      //     2
      //   ).toFixed(2)
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const AlertButton = (type, msg) =>
    Alert.alert(type === "w" ? "Warning" : "Successful", msg, [{ text: "OK" }]);

  const print = async () => {
    console.log(selectedRolls);
    if (selectedRolls.length < 1) {
      AlertButton("w", "Select a roll to print");
    } else {
      try {
        const response = await fetch("http://10.12.3.182:8002/rest/print", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            printer: "a104ba2c76024f7597ceb1b31058306f",
            label: "7618c7e07031461dba57200230cf756a",
            data: selectedRolls,
          }),
        });
        const json = await response.json();
        if (json["failed"] === true) {
          AlertButton("w", "Sticker Print Failed");
          console.log(json);
        } else {
          AlertButton("s", "Sticker Print Successfil");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addRoll = (item) => {
    // Check if the item is already in selectedRolls
    const isItemPresent = selectedRolls.some(
      (selectedRoll) => selectedRoll.rNumber === item.roll_number
    );

    if (isItemPresent) {
      // If the item is already present, remove it
      setSelectedRolls((prevSelectedRolls) =>
        prevSelectedRolls.filter(
          (selectedRoll) => selectedRoll.rNumber !== item.roll_number
        )
      );
    } else {
      // If the item is not present, add it
      setSelectedRolls([
        ...selectedRolls,
        {
          buyer: item.customer,
          po: item.WFX_PO,
          batch: item.WorkOrderId,
          bar: item.WorkOrderId + " ; roll:" + item.roll_number,
          fabrication: item.fabricname,
          color: item.shade,
          rNumber: item.roll_number,
          gsm: item.GSM,
          aclWidth: item.ActualRollWidth,
          rollWeight: item.ActualRollWeight,
          rollLength: round(
            (item.ActualRollWeight * 39.37 * 1000) /
              (item.GSM * item.ActualRollWidth),
            2
          ).toFixed(2),
          inventoryCode: item.InventoryCode,
          USERID: item.user_id,
          date: item.Date.toString(),
        },
      ]);
    }
  };

  const handleSelect = (item) => {
    getData(item.item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.app}>
        <View style={styles.topSection}>
          <View>
            <Text style={styles.topSectionText}>Batch No: </Text>
          </View>
          <View style={styles.dropdownContainer}>
            <SelectDropdownCustom
              data={batches}
              onSelect={handleSelect}
              onSearch={getBatchs}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.rollSection}>
          {rolls.map((roll) => (
            <RollCard
              key={roll.roll_number} // Make sure to set a unique key
              onPress={addRoll}
              roll={roll}
              AlertButton={AlertButton}
            />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={print}>
        <Text style={styles.buttonText}>Print</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  app: {
    flex: 1,
    marginHorizontal: "auto",
    width: "100%",
    marginTop: "2%",
    marginBottom: "2%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topSection: {
    flexDirection: "row",
    margin: "2%",
    // marginBottom: "2%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topSectionText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dropdownContainer: {
    marginLeft: "1%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  input: {
    height: 50,
    width: "100%",
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  input1: {
    height: 40,
    width: "100%",
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "green",
    borderRadius: 10,
  },

  rollSection: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
  },
  rollCard: {
    width: "15%",
    borderWidth: 1,
    marginBottom: "3%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2e6cff",
    alignItems: "center",
    marginBottom: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
    letterSpacing: 1,
  },
  dropdown1DropdownStyle: {
    backgroundColor: "white",
    borderRadius: 25,
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left",
  },
  dropdown1SelectedRowStyle: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 25,
  },
  dropdown1searchInputStyleStyle: {
    backgroundColor: "#EFEFEF",
    borderRadius: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },

  selectedItemContainer: {
    marginBottom: "2%",
  },
  selectedItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
