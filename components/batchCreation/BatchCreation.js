import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const BatchCreation = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} 
                onPress={() =>
                navigation.navigate('CreateBatch', { name: 'Jane' })}
                >
                    <Text style={styles.createBatch}>Create Batch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}
                onPress={() =>
                  navigation.navigate('RollCreation', { name: 'Jane' })}
                >
                    <Text style={styles.createRoll}>Create Roll</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 30
    },
    button: {
      width: 125,
      height: 53,
      borderRadius: 30,
      backgroundColor: "rgba(64,158,239,1)",
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 3,
        height: 3
      },
      elevation: 5,
      shadowOpacity: 0.1,
      shadowRadius: 0
    },
    createBatch: {
      color: "#121212",
      fontSize: 18,
      marginTop: 15,
      marginLeft: 12
    },
    button2: {
      width: 125,
      height: 53,
      backgroundColor: "rgba(64,158,239,1)",
      borderRadius: 30,
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 3,
        height: 3
      },
      elevation: 5,
      shadowOpacity: 0.1,
      shadowRadius: 0,
      marginLeft: 18
    },
    createRoll: {
      color: "#121212",
      fontSize: 18,
      marginTop: 15,
      marginLeft: 19
    },
    buttonRow: {
      height: 53,
      flexDirection: "row",
      marginTop: 379,
      marginLeft: 54,
      marginRight: 53
    }
  });

export default BatchCreation;