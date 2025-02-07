import React, { useEffect, useRef, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MONTHS = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const HOURS = [
  "24:00",
  "23:00",
  "22:00",
  "21:00",
  "20:00",
  "19:00",
  "18:00",
  "17:00",
  "16:00",
  "15:00",
  "14:00",
  "13:00",
  "12:00",
  "11:00",
  "10:00",
  "09:00",
  "08:00",
  "07:00",
  "06:00",
  "05:00",
  "04:00",
  "03:00",
  "02:00",
  "01:00",
];

const Days = ({ navigation, date }) => {
  const [monthData, setMonthData] = useState({});
  const [dayData, setdayData] = useState({});

  const [plan, setPlan] = useState("");

  const [addState, setAddState] = useState(true);
  const textPlanRef = useRef(null);
  //console.log(new Date(year, month + 1, 0).getDate());

  const replaceSpace = () => {
    return plan.replace(/\[#\]/g, "\n");
  };

  useEffect(() => {
    AsyncStorage.getItem(`${date.year}-${date.month}`)
      .then((json) => JSON.parse(json))
      .then((result) => {
        setMonthData(result);
        setdayData(result[`${date.year}-${date.month}-${date.day}`]);
      });
  }, []);

  console.log(textPlanRef);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {`${date.day} ${MONTHS[date.month]}`}
        </Text>
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => navigation.navigate("Main")}
        >
          <Image style={styles.img} source={require("../../assets/exit.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => setAddState(!addState)}
        >
          <Image style={styles.img} source={require("../../assets/add.png")} />
        </TouchableOpacity>
      </View>

      {addState && (
        <View style={styles.addPanel}>
          <Text ref={textPlanRef} style={styles.addPanelText}>
            {replaceSpace()}
          </Text>
          <View style={styles.inputBtns}>
            <TextInput
              multiline={true}
              style={styles.inputs}
              value={plan}
              onPress={() => {
                textPlanRef.current.focus();
                textPlanRef.current.setNativeProps({
                  selection: { start: plan.length, end: plan.length },
                });
              }}
              onChangeText={setPlan}
            />
            <TouchableOpacity
              style={styles.btnNext2}
              onPress={() => {
                setPlan(plan + "[#]");
              }}
            >
              <Image
                style={styles.img}
                source={require("../../assets/line.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnNext}
              onPress={() => setAddState(!addState)}
            >
              <Image
                style={styles.img}
                source={require("../../assets/create.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1F25",
  },
  btnNext: {
    borderRadius: 10,
    width: 40,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNext2: {
    borderRadius: 10,
    width: 35,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  inputBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  inputs: {
    width: "60%",
    height: 60,
    backgroundColor: "#1E1F21",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    color: "white",
    fontWeight: 500,
  },
  addPanelText: {
    marginTop: 20,
    width: "90%",
  },
  addPanel: {
    top: 70,
    justifyContent: "space-between",
    position: "absolute",
    width: "80%",
    alignItems: "center",
    height: 400,
    backgroundColor: "green",
    backgroundColor: "#4C4D55",
    borderRadius: 15,
  },
  exitBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 25,
    marginLeft: 5,
  },
  img: {
    width: "80%",
    height: "100%",
  },
});

export default Days;
