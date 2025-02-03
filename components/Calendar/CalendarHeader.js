import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const CalendarHeader = (props) => {
  let activeDate = new Date();

  const [months, setMonths] = useState(MONTHS[activeDate.getMonth()]);

  // activeDate.getDate()
  // MONTHS[activeDate.getMonth()]
  // activeDate.getFullYear()

  // console.log(activeDate.getDate());
  // console.log(MONTHS[activeDate.getMonth()]);
  // console.log(activeDate.getFullYear());

  console.log(123);
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.title}>October 2020</Text>
      <View style={styles.steps}>
        <TouchableHighlight
          style={styles.stepsDiv}
          onPress={() => console.log(123)}
        >
          <Image
            style={styles.stepsImg}
            source={require("../../assets/Previous.png")}
          />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.stepsDiv}
          onPress={() => console.log(123)}
        >
          <Image
            style={styles.stepsImg}
            source={require("../../assets/Next.png")}
          />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "80%",
    height: "30px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  steps: {
    width: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  },
  stepsDiv: {
    height: 15,
    width: 20,
  },
  stepsImg: {
    height: 15,
    width: 10,
  },
});

export default CalendarHeader;
