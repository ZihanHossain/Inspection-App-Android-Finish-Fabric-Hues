import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SelectDropdownCustom from "./SelectDropdownCustom";
import BouncyCheckbox from "react-native-bouncy-checkbox";

var width = Dimensions.get("window").width;

export default function InspactionScreen({ navigation, route }) {
  const [batches, setBatches] = useState([]);
  const [machines, setMachines] = useState([]);
  const [mNumber, setMNumber] = useState(route.params.mNumber);
  const [mIndex, setMIndex] = useState(route.params.mIndex);
  const [yarnDefects, setYarnDefects] = useState(route.params.yarnDefects);
  const [knittingDefects, setKnittingDefects] = useState(
    route.params.knittingDefects
  );
  const [dyeingDefects, setDyeingDefects] = useState(
    route.params.dyeingDefects
  );
  const [finishingDefects, setFinishingDefects] = useState(
    route.params.finishingDefects
  );
  const [otherDefects, setOtherDefects] = useState(route.params.otherDefects);
  const [bNumber, setBNumber] = React.useState(route.params.bNumber);
  const [bIndex, setBIndex] = React.useState(route.params.bIndex);
  const [rolls, setRolls] = useState([]);
  const [rollsId, setRollsId] = useState([[]]);
  const [rNumber, setRNumber] = React.useState(0);
  const [aclWidth, setAclWidth] = React.useState(0);
  const [aclWeight, setAclWeight] = React.useState(0);
  const [cutableWidth, setCutableWidth] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [inventoryCode, setInventoryCode] = React.useState(
    route.params.inventoryCode
  );
  const [defectType, setDefectType] = React.useState([]);
  const [selectedDefect, setSelectedDefect] = React.useState("");
  const [selectedDefectCode, setSelectedDefectCode] = React.useState("");
  const [defectPoints, setDefectPoints] = React.useState({
    "": { one: 0, two: 0, three: 0, four: 0 },
  });
  const [isLoading, setLoading] = useState(true);
  const [expandYarn, setExpandYarn] = useState(false);
  const [expandKnitting, setExpandKnitting] = useState(false);
  const [expandDyeing, setExpandDyeing] = useState(false);
  const [expandFinishing, setExpandFinishing] = useState(false);
  const [expandOthers, setExpandOthers] = useState(false);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [handFeel, setHandFeel] = useState(true);
  const [deadCotton, setDeadCotton] = useState(true);
  const [runningShade, setRunningShade] = useState(true);
  const [naps, setNaps] = useState(true);
  const [inspectionStart, setInspectionStart] = useState();

  var trigger = true;

  const getBatchs = async (text) => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_batches_for_inspaction`,
        {
          method: "post",
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

  const getMachines = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_machines`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      const arr = [];
      json.forEach((element) => {
        arr.push(element.machine_number);
      });
      setMachines(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const getYarnDefects = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_yarn_defects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setYarnDefects(json);
      json.forEach((element) => {
        defectPoints[element.DefectCode] = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getKnittingDefects = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_knitting_defects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setKnittingDefects(json);
      json.forEach((element) => {
        defectPoints[element.DefectCode] = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getDyeingDefects = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_dyeing_defects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setDyeingDefects(json);
      json.forEach((element) => {
        defectPoints[element.DefectCode] = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getFinishingDefects = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_finishing_defects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setFinishingDefects(json);
      json.forEach((element) => {
        defectPoints[element.DefectCode] = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getOtherDefects = async () => {
    try {
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/get_other_defects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setOtherDefects(json);
      json.forEach((element) => {
        defectPoints[element.DefectCode] = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      await getMachines();
      if (typeof yarnDefects === "undefined") {
        await getYarnDefects();
      } else {
        yarnDefects.forEach((element) => {
          defectPoints[element.DefectCode] = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
          };
        });
      }
      if (typeof knittingDefects === "undefined") {
        await getKnittingDefects();
      } else {
        knittingDefects.forEach((element) => {
          defectPoints[element.DefectCode] = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
          };
        });
      }
      if (typeof dyeingDefects === "undefined") {
        await getDyeingDefects();
      } else {
        dyeingDefects.forEach((element) => {
          defectPoints[element.DefectCode] = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
          };
        });
      }
      if (typeof finishingDefects === "undefined") {
        await getFinishingDefects();
      } else {
        finishingDefects.forEach((element) => {
          defectPoints[element.DefectCode] = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
          };
        });
      }
      if (typeof otherDefects === "undefined") {
        await getOtherDefects();
      } else {
        otherDefects.forEach((element) => {
          defectPoints[element.DefectCode] = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
          };
        });
      }
      if (bNumber !== "Select a Batch...") {
        await getRoll(bNumber);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectDefect = (defect, code, def) => {
    setSelectedDefect(defect);
    setDefectType(def);
    setSelectedDefectCode(code);
  };

  const AlertButton = (msg) => Alert.alert("Warning", msg, [{ text: "OK" }]);

  const InspectionAlert = (msg) => {
    Alert.alert("Successful", msg, [
      {
        text: "Done",
        onPress: () => {
          navigation.push("InspactionScreen", {
            bNumber: bNumber,
            bIndex: bIndex,
            mNumber: mNumber,
            mIndex: mIndex,
            yarnDefects: yarnDefects,
            finishingDefects: finishingDefects,
            knittingDefects: knittingDefects,
            dyeingDefects: dyeingDefects,
            otherDefects: otherDefects,
            inventoryCode: inventoryCode,
          });
        },
      },
    ]);
  };

  const EmptyInspection = () =>
    new Promise((resolve) => {
      Alert.alert("Warning", "Do you want to do empty inspection?", [
        {
          text: "No",
          onPress: () => {
            trigger = false;
            resolve("YES");
          },
        },
        {
          text: "Yes",
          onPress: () => {
            setDefectPoints({
              ...defectPoints,
              "E-1": { one: 0, two: 0, three: 0, four: 0 },
            });
            trigger = true;
            resolve("YES");
          },
        },
      ]);
    });

  const addInspectionDetails = async () => {
    if (bNumber.length < 1 || bNumber === 0) {
      AlertButton("Select a Batch Number");
    } else if (mNumber.length < 1 || mNumber === 0) {
      AlertButton("Select a Machine Number");
    } else if (rNumber.length < 1 || rNumber === 0) {
      AlertButton("Select a Roll Number");
    } else if (aclWeight.length < 1 || aclWeight === 0) {
      AlertButton("Fill up Actual Weight");
    } else if (aclWidth.length < 1 || aclWidth === 0) {
      AlertButton("Fill up Actual Width");
    } else if (cutableWidth.length < 1 || cutableWidth === 0) {
      AlertButton("Fill up Cutable Width");
    } else {
      if (count < 1) {
        await EmptyInspection();
      }
      if (trigger) {
        try {
          const filteredData = {};

          for (let key in defectPoints) {
            let count = 0;
            for (let innerKey in defectPoints[key]) {
              if (defectPoints[key][innerKey] > 0) {
                count++;
              }
            }
            if (count >= 1 || key === "E-1") {
              filteredData[key] = defectPoints[key];
            }
          }
          var USERID = global.USERID;
          const response = await fetch(
            `http://${global.SERVERID}/inspaction/add_inspection_details`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                defectPoints: filteredData,
                mNumber,
                bNumber,
                aclWeight,
                aclWidth,
                cutableWidth,
                comment,
                inventoryCode,
                USERID,
                rNumber: rollsId[rNumber[0]],
                repeat,
                runningShade,
                handFeel,
                naps,
                deadCotton,
                inspectionStart,
              }),
            }
          );
          const json = await response.json();
          if (json[0] > 0) {
            saveBatch();
          } else {
            InspectionAlert("Inspection Not Successful!");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  //Saves batch from temporary to permanent after inspection
  const saveBatch = async () => {
    try {
      var USERID = global.USERID;
      const response = await fetch(
        `http://${global.SERVERID}/inspaction/save_batches`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bNumber,
          }),
        }
      );
      const json = await response.text();
      if (json == "done") {
        InspectionAlert("Inspection Successful!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRoll = async (selectedItem) => {
    const response = await fetch(
      `http://${global.SERVERID}/inspaction/get_roll_by_batch_no`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bNumber: selectedItem,
        }),
      }
    );
    const json = await response.json();
    const arr = [];
    const arr1 = [];
    json.forEach((element) => {
      arr.push(element.roll_number);
      arr1.push(element.id);
    });
    setRolls(arr);
    setRollsId(arr1);
  };

  const setOnePointIn = () => {
    if (selectedDefectCode.length > 0) {
      setCount(count + 1);
      var data = {
        one: defectPoints[selectedDefectCode]["one"] + 1,
        two: defectPoints[selectedDefectCode]["two"],
        three: defectPoints[selectedDefectCode]["three"],
        four: defectPoints[selectedDefectCode]["four"],
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setTwoPointIn = () => {
    if (selectedDefectCode.length > 0) {
      setCount(count + 1);
      var data = {
        one: defectPoints[selectedDefectCode]["one"],
        two: defectPoints[selectedDefectCode]["two"] + 1,
        three: defectPoints[selectedDefectCode]["three"],
        four: defectPoints[selectedDefectCode]["four"],
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setThreePointIn = () => {
    if (selectedDefectCode.length > 0) {
      setCount(count + 1);
      var data = {
        one: defectPoints[selectedDefectCode]["one"],
        two: defectPoints[selectedDefectCode]["two"],
        three: defectPoints[selectedDefectCode]["three"] + 1,
        four: defectPoints[selectedDefectCode]["four"],
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setFourPointIn = () => {
    if (selectedDefectCode.length > 0) {
      setCount(count + 1);
      var data = {
        one: defectPoints[selectedDefectCode]["one"],
        two: defectPoints[selectedDefectCode]["two"],
        three: defectPoints[selectedDefectCode]["three"],
        four: defectPoints[selectedDefectCode]["four"] + 1,
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setOnePointDe = () => {
    if (selectedDefectCode.length > 0) {
      if (defectPoints[selectedDefectCode]["one"] > 0) {
        setCount(count - 1);
      }
      var data = {
        one:
          defectPoints[selectedDefectCode]["one"] < 1
            ? 0
            : defectPoints[selectedDefectCode]["one"] - 1,
        two: defectPoints[selectedDefectCode]["two"],
        three: defectPoints[selectedDefectCode]["three"],
        four: defectPoints[selectedDefectCode]["four"],
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setTwoPointDe = () => {
    if (selectedDefectCode.length > 0) {
      if (defectPoints[selectedDefectCode]["two"] > 0) {
        setCount(count - 1);
      }
      var data = {
        one: defectPoints[selectedDefectCode]["one"],
        two:
          defectPoints[selectedDefectCode]["two"] < 1
            ? 0
            : defectPoints[selectedDefectCode]["two"] - 1,
        three: defectPoints[selectedDefectCode]["three"],
        four: defectPoints[selectedDefectCode]["four"],
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setThreePointDe = () => {
    if (selectedDefectCode.length > 0) {
      if (defectPoints[selectedDefectCode]["three"] > 0) {
        setCount(count - 1);
      }
      var data = {
        one: defectPoints[selectedDefectCode]["one"],
        two: defectPoints[selectedDefectCode]["two"],
        three:
          defectPoints[selectedDefectCode]["three"] < 1
            ? 0
            : defectPoints[selectedDefectCode]["three"] - 1,
        four: defectPoints[selectedDefectCode]["four"],
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const setFourPointDe = () => {
    if (selectedDefectCode.length > 0) {
      if (defectPoints[selectedDefectCode]["four"] > 0) {
        setCount(count - 1);
      }
      var data = {
        one: defectPoints[selectedDefectCode]["one"],
        two: defectPoints[selectedDefectCode]["two"],
        three: defectPoints[selectedDefectCode]["three"],
        four:
          defectPoints[selectedDefectCode]["four"] < 1
            ? 0
            : defectPoints[selectedDefectCode]["four"] - 1,
      };
      setDefectPoints({
        ...defectPoints,
        [selectedDefectCode]: data,
      });
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 40 }}>Loading. Please Wait...</Text>
      </View>
    );
  }

  const handleSelect = (item) => {
    getRoll(item.item);
    setBNumber(item.item);
    setBIndex(item.id);
  };

  const toggleYarnDefects = () => {
    setExpandYarn(!expandYarn);
    setExpandKnitting(false);
    setExpandDyeing(false);
    setExpandFinishing(false);
    setExpandOthers(false);
  };

  const toggleKnittingDefects = () => {
    setExpandYarn(false);
    setExpandKnitting(!expandKnitting);
    setExpandDyeing(false);
    setExpandFinishing(false);
    setExpandOthers(false);
  };

  const toggleDyeingDefects = () => {
    setExpandYarn(false);
    setExpandKnitting(false);
    setExpandDyeing(!expandDyeing);
    setExpandFinishing(false);
    setExpandOthers(false);
  };

  const toggleFinishingDefects = () => {
    setExpandYarn(false);
    setExpandKnitting(false);
    setExpandDyeing(false);
    setExpandFinishing(!expandFinishing);
    setExpandOthers(false);
  };

  const toggleDropdown = () => {
    setExpandYarn(false);
    setExpandKnitting(false);
    setExpandDyeing(false);
    setExpandFinishing(false);
    setExpandOthers(!expandOthers);
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.firstRowEl}>
          <Text style={styles.dropdownLegendText}>Batch Number</Text>
          <View style={styles.dropdownContainer}>
            <SelectDropdownCustom
              data={batches}
              onSelect={handleSelect}
              defaultVal={{ id: 0, item: bNumber }}
              onSearch={getBatchs}
            />
          </View>
        </View>
        <View style={styles.firstRowE2}>
          <Text style={styles.dropdownLegendText}>Roll Number</Text>
          <SelectDropdown
            data={rolls}
            onSelect={(selectedItem, index) => {
              // getRoll(selectedItem)
              setInspectionStart(getCurrentDateTime());
              setRNumber([index, selectedItem]);
            }}
            defaultButtonText={"Select Roll No."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.input2}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={"Search here"}
            searchPlaceHolderColor={"darkgrey"}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={"search"} color={"#444"} size={18} />;
            }}
          />
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.firstRowEl}>
          <Text style={styles.dropdownLegendText}>Inspector Id</Text>
          <View style={styles.inspectorId}>
            <Text style={{ fontSize: 16 }}>{global.USERID}</Text>
          </View>
        </View>
        <View style={styles.firstRowE2}>
          <Text style={styles.dropdownLegendText}>Machine Number</Text>
          <SelectDropdown
            data={machines}
            defaultValueByIndex={mIndex}
            onSelect={(selectedItem, index) => {
              setMNumber(selectedItem);
              setMIndex(index);
            }}
            defaultButtonText={"Select Machine No."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.input2}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={"Search here"}
            searchPlaceHolderColor={"darkgrey"}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={"search"} color={"#444"} size={18} />;
            }}
          />
        </View>
      </View>
      <View style={styles.scrollAreaRow}>
        <View style={styles.scrollArea}>
          <View contentContainerStyle={styles.scrollArea_contentContainerStyle}>
            <View style={styles.defectGroup}>
              <TouchableOpacity onPress={toggleYarnDefects}>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Yarn Defects
                </Text>
              </TouchableOpacity>
              {expandYarn && (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  style={styles.defects}
                  data={yarnDefects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.defectItem}
                      onPress={() =>
                        selectDefect(item.DefectName, item.DefectCode, "Yarn")
                      }
                    >
                      <Text style={styles.defectsText}>
                        {item.DefectCode + " : " + item.DefectName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
            <View style={styles.defectGroup}>
              <TouchableOpacity onPress={toggleKnittingDefects}>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Knitting Defects
                </Text>
              </TouchableOpacity>
              {expandKnitting && (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  style={styles.defects}
                  data={knittingDefects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.defectItem}
                      onPress={() =>
                        selectDefect(
                          item.DefectName,
                          item.DefectCode,
                          "Knitting"
                        )
                      }
                    >
                      <Text style={styles.defectsText}>
                        {item.DefectCode + " : " + item.DefectName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
            <View style={styles.defectGroup}>
              <TouchableOpacity onPress={toggleDyeingDefects}>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Dyeing Defects
                </Text>
              </TouchableOpacity>
              {expandDyeing && (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  style={styles.defects}
                  data={dyeingDefects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.defectItem}
                      onPress={() =>
                        selectDefect(item.DefectName, item.DefectCode, "Dyeing")
                      }
                    >
                      <Text style={styles.defectsText}>
                        {item.DefectCode + " : " + item.DefectName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
            <View style={styles.defectGroup}>
              <TouchableOpacity onPress={toggleFinishingDefects}>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Finishing Defects
                </Text>
              </TouchableOpacity>
              {expandFinishing && (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  style={styles.defects}
                  data={finishingDefects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.defectItem}
                      onPress={() =>
                        selectDefect(item.DefectName, item.DefectCode, "Dyeing")
                      }
                    >
                      <Text style={styles.defectsText}>
                        {item.DefectCode + " : " + item.DefectName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
            <View style={styles.defectGroup}>
              <TouchableOpacity onPress={toggleDropdown}>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Other Defects
                </Text>
              </TouchableOpacity>
              {expandOthers && (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  style={styles.defects}
                  data={otherDefects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.defectItem}
                      onPress={() =>
                        selectDefect(item.DefectName, item.DefectCode, "Dyeing")
                      }
                    >
                      <Text style={styles.defectsText}>
                        {item.DefectCode + " : " + item.DefectName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.rect3}>
          {selectedDefect < 1 ? (
            <View style={styles.NselectedDefect}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 3,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Select a Defect
              </Text>
            </View>
          ) : (
            <View style={styles.selectedDefect}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 3,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {defectType + " - " + selectedDefect}
              </Text>
            </View>
          )}
          <View style={[styles.buttonStack, styles.shadowProp]}>
            <View style={styles.points}>
              <MaterialCommunityIconsIcon
                name="numeric-1"
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setOnePointDe()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="minus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
            <View style={styles.pointsNumber}>
              <Text style={styles.number}>
                {defectPoints[selectedDefectCode]["one"]}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setOnePointIn()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="plus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStack}>
            <View style={styles.points}>
              <MaterialCommunityIconsIcon
                name="numeric-2"
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setTwoPointDe()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="minus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
            <View style={styles.pointsNumber}>
              <Text style={styles.number}>
                {defectPoints[selectedDefectCode]["two"]}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setTwoPointIn()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="plus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStack}>
            <View style={styles.points}>
              <View>
                <MaterialCommunityIconsIcon
                  name="numeric-3"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setThreePointDe()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="minus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
            <View style={styles.pointsNumber}>
              <Text style={styles.number}>
                {defectPoints[selectedDefectCode]["three"]}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setThreePointIn()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="plus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStack}>
            <View style={styles.points}>
              <MaterialCommunityIconsIcon
                name="numeric-4"
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setFourPointDe()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="minus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
            <View style={styles.pointsNumber}>
              <Text style={styles.number}>
                {defectPoints[selectedDefectCode]["four"]}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setFourPointIn()}
            >
              <View>
                <MaterialCommunityIconsIcon
                  name="plus"
                  style={styles.icon}
                ></MaterialCommunityIconsIcon>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.saveButtonText}>NEXT</Text>
              <Ionicons name="arrow-forward-outline" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <Text>Actual Width (Inch)</Text>
                <TextInput
                  placeholder="Actual Width (Inch)"
                  style={styles.input_popup}
                  keyboardType="numeric"
                  value={aclWidth}
                  onChangeText={(val) =>
                    setAclWidth(val.replace(/[^0-9.]/g, ""))
                  }
                />
              </View>
              <View style={styles.col_popup}>
                <Text>Actual Weight(Kg)</Text>
                <TextInput
                  placeholder="Actual Weight"
                  style={styles.input_popup}
                  keyboardType="numeric"
                  value={aclWeight}
                  onChangeText={(val) =>
                    setAclWeight(val.replace(/[^0-9.]/g, ""))
                  }
                />
              </View>
            </View>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <Text>Cutable Width</Text>
                <TextInput
                  placeholder="Cutable Width"
                  style={styles.input_popup}
                  keyboardType="numeric"
                  value={cutableWidth}
                  onChangeText={(val) => setCutableWidth(val)}
                />
              </View>
            </View>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <Text>Comment</Text>
                <TextInput
                  placeholder="Comment"
                  style={styles.input_popup}
                  value={comment}
                  onChangeText={(val) => setComment(val)}
                />
              </View>
            </View>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <Text>Inventory Code</Text>
                <TextInput
                  placeholder="Inventory Code"
                  style={styles.input_popup}
                  value={inventoryCode}
                  onChangeText={(val) => setInventoryCode(val)}
                />
              </View>
            </View>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <BouncyCheckbox
                  size={30}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Repeat for AOP & Y/D"
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={repeat}
                  onPress={() => {
                    setRepeat(!repeat);
                  }}
                />
              </View>
              <View style={styles.col_popup}>
                <BouncyCheckbox
                  size={30}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Hand Feel"
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={handFeel}
                  onPress={() => {
                    setHandFeel(!handFeel);
                  }}
                />
              </View>
            </View>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <BouncyCheckbox
                  size={30}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Running Shade"
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={runningShade}
                  onPress={() => {
                    setRunningShade(!runningShade);
                  }}
                />
              </View>
              <View style={styles.col_popup}>
                <BouncyCheckbox
                  size={30}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Naps"
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={naps}
                  onPress={() => {
                    setNaps(!naps);
                  }}
                />
              </View>
            </View>
            <View style={styles.row_popup}>
              <View style={styles.col_popup}>
                <BouncyCheckbox
                  size={30}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Dead Cotton"
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={deadCotton}
                  onPress={() => {
                    setDeadCotton(!deadCotton);
                  }}
                />
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                addInspectionDetails();
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: "1%",
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "5%",
    width: "100%",
    justifyContent: "space-between",
  },
  bottomRow: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "5%",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "1%",
  },
  firstRowEl: {
    width: "60%",
    padding: "0.5%",
  },
  firstRowE2: {
    width: "36%",
    height: "100%",
    padding: "0.5%",
  },
  inspectorId: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#9fc5e8",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: "0.5%",
    marginBottom: "1%",
    paddingVertical: "2%",
    paddingLeft: "2%",
  },
  dropdownLegendText: {
    color: "#121212",
    marginLeft: 4,
    fontSize: 15,
  },
  rollNumber: {
    marginLeft: 5,
    color: "#121212",
  },
  scrollArea: {
    width: wp("40%"),
    height: hp("73%"),
    padding: "1.5%",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea_contentContainerStyle: {
    height: "100%",
  },
  defectGroup: {
    maxHeight: "70%",
    marginVertical: "1%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#24a0ed",
    borderBottomEndRadius: 0,
    paddingLeft: "2%",
    paddingVertical: "1%",
  },
  defects: {
    marginTop: 5,
  },
  defectItem: {
    width: "100%",
    height: 35,
    marginBottom: 5,
    backgroundColor: "#9fc5e8",
    borderRadius: 5,
  },
  defectsText: {
    marginLeft: 2,
    marginTop: 6,
  },
  rect3: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
  },
  buttonStack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    borderWidth: 1,
    borderColor: "#9fc5e8",
    borderRadius: 10,
    marginVertical: "1%",
  },
  points: {
    width: "20%",
    height: "70%",
    borderRadius: 50,
    backgroundColor: "#6aa84f",
    alignItems: "center", // add this
    justifyContent: "center", // add this
  },
  pointsNumber: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: "50%",
    width: "13%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "#24a0ed",
    borderRadius: 50,
    height: "70%",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: width / 11,
    marginTop: 0,
  },
  NselectedDefect: {
    width: "80%",
    backgroundColor: "#b3b3b3",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  selectedDefect: {
    width: "80%",
    backgroundColor: "#24a0ed",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  scrollAreaRow: {
    height: "81%",
    flexDirection: "row",
    marginBottom: "5%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  row_popup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  col_popup: {
    flex: 1,
    marginRight: 10,
  },
  input_popup: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  input2: {
    width: "100%",
    height: "69%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#24a0ed",
  },
  saveButton: {
    backgroundColor: "#2e6cff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "black", textAlign: "left" },
  dropdown1SelectedRowStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
  dropdown1searchInputStyleStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  dropdown1BtnTxtStyle: {
    fontSize: 15,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropdownContainer: {
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
