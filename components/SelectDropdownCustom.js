import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const SelectDropdownCustom = ({ data, onSelect, defaultVal, onSearch }) => {
  const [selectedItem, setSelectedItem] = useState(
    defaultVal ? defaultVal : null
  );
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownOption}
      onPress={() => {
        setSelectedItem(item);
        onSelect(item);
        setShowDropdown(false);
      }}
    >
      <Text style={styles.dropdownOptionText}>{item.item}</Text>
    </TouchableOpacity>
  );

  // const filteredData = data.filter((item) =>
  //   item.item.toLowerCase().includes(searchText.toLowerCase())
  // );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedItem}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.selectedItemText}>
          {selectedItem ? selectedItem.item : "Select Batch Number"}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </TouchableOpacity>
      <Modal visible={showDropdown} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdownOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.dropdownContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={24} color="black" />
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => {
                if (text.length > 3) {
                  onSearch(text);
                }
                setSearchText(text);
              }}
              value={searchText}
              placeholder="Search here..."
            />
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedItem}
            style={styles.dropdownList}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#24a0ed",
    borderRadius: 4,
    zIndex: 1,
  },
  selectedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  selectedItemText: {
    fontSize: 16,
  },
  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
  dropdownContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#EFEFEF",
    zIndex: 1,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "1%",
    width: "100%",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 8,
    borderRadius: 5,
    margin: 5,
    width: "95%",
  },
  dropdownList: {
    maxHeight: 150,
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});

export default SelectDropdownCustom;
