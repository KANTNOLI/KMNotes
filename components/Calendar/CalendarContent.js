import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const renderWeekSteps = (days) => {
  let tempLengthF = days[0].week;
  for (let i = 0; i < tempLengthF; i++) {
    days = [
      {
        isDay: false,
      },
      ...days,
    ];
  }
  let tempLengthL = 7 - (days.length % 7);
  for (let i = 0; i < tempLengthL; i++) {
    days.push({
      isDay: false,
    });
  }

  return days;
};

const CalendarContent = ({ date, countDay }) => {
  let weekName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  let days = Array.from({ length: countDay }, (_, id) => ({
    isDay: true,
    day: id + 1,
    week: new Date(date.year, date.month, id).getDay(),
  }));
  days = renderWeekSteps(days);

  const [fastClick, setFastClick] = useState(true);
  const longClick = useRef(null);

  const checkLongClick = (item) => {
    longClick.current = setTimeout(() => {
      // set visual
      console.log("long click", item);
      setFastClick(false);
    }, 250);
  };

  const checkLongClickActive = () => {
    setFastClick(true);
    clearTimeout(longClick.current);
    // open
    if (fastClick) {
      console.log("fast func");
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        numColumns={7}
        data={weekName}
        renderItem={({ item }) => <Text style={styles.weekName}>{item}</Text>}
      />
      <FlatList
        numColumns={7}
        data={days}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={item.isDay ? styles.day : styles.skipDay}
            onPressIn={() => checkLongClick(index)}
            onPressOut={checkLongClickActive}
          >
            <Text style={styles.dayTitle}>{item.day}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "80%",
    height: "280px",
    borderBottomWidth: 2,
    borderColor: "#313131",
  },
  weekName: {
    margin: "auto",
    alignItems: "center",
    fontSize: 18,
    fontWeight: 600,
    color: "white",
    justifyContent: "center",
  },
  skipDay: {
    margin: "auto",
    marginTop: "5px",
    width: "35px",
    height: "35px",
  },
  day: {
    margin: "auto",
    marginTop: "5px",
    alignItems: "center",
    justifyContent: "center",
    width: "35px",
    borderRadius: "50%",
    height: "35px",
  },
  dayTitle: {
    fontSize: 17,
    color: "white",
    fontWeight: 400,
  },
});

export default CalendarContent;
