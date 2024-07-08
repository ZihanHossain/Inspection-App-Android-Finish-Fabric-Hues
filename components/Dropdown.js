import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dropdown: {
    position: 'relative',
  },
  dropdownToggle: {
    cursor: 'pointer',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    maxHeight: 200,
    overflow: 'scroll',
    zIndex: 2,
  },
  dropdownItem: {
    cursor: 'pointer',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  dropdownSearch: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  dropdownSearchInput: {
    width: '100%',
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});

const Dropdown = ({ options, selectedValue, onValueChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity style={styles.dropdownToggle} onPress={() => setShowDropdown(!showDropdown)}>
        <Text>{selectedValue || 'Select Option'}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownMenu}>
          <View style={styles.dropdownSearch}>
            <TextInput
              style={styles.dropdownSearchInput}
              placeholder="Search"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <FlatList
            data={filteredOptions}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {
                onValueChange(item);
                setShowDropdown(false);
              }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;