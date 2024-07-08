import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RollCard({ onPress, roll, AlertButton }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity
      style={[
        styles.rollCard,
        isSelected ? styles.selectedCard : styles.unselectedCard,
      ]}
      onPress={() => {
        if (roll.GSM === 0) {
          AlertButton("w", "This roll has no GSM.");
        } else {
          onPress(roll);
          setIsSelected(!isSelected);
        }
      }}
    >
      <View style={styles.rowSection}>
        <View style={styles.row}>
          <Text>Roll Number:</Text>
          <Text>{roll.roll_number}</Text>
        </View>
        <View style={styles.row}>
          <Text>Weight:</Text>
          <Text>{roll.ActualRollWeight}</Text>
        </View>
        <View style={styles.row}>
          <Text>GSM:</Text>
          <Text>{roll.GSM}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rollCard: {
    marginLeft: "2%",
    width: "17.5%",
    borderWidth: 1,
    marginBottom: "3%",
    borderRadius: 5,
  },
  rowSection: {
    padding: "5%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedCard: {
    backgroundColor: "#aacca2",
  },
  unselectedCard: {
    backgroundColor: "white",
  },
});
