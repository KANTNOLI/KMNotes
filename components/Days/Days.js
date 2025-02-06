import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [dayData, setdayData] = useState({});
  //console.log(new Date(year, month + 1, 0).getDate());

  useEffect(() => {}, []);

  return (
    <View style={styles.body}>
      <Text onPress={() => navigation.navigate("Main")}>
        {date.year} " "{MONTHS[date.month]}" "{date.day}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#1E1F25",
  },
  test: {
    display: "none",
  },
});

export default Days;
