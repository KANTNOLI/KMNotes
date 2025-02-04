import React, { useEffect, useRef, useState } from "react";
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

const replaceColorDay = (ArrayDays, keyMonth, keyDay, MEMORY, style) => {
  ArrayDays[keyDay] = {
    idArray: MEMORY.index,
    dayID: MEMORY.item.day,
    styleKey: style != stylesDays.dayStyle7 ? style : stylesDays.day,
  };

  AsyncStorage.setItem(keyMonth, JSON.stringify(ArrayDays));
};

const CalendarContent = ({ date, countDay }) => {
  let weekName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const [styleDays, setStyleDays] = useState({});

  let days = Array.from({ length: countDay }, (_, id) => ({
    isDay: true,
    day: id + 1,
    week: new Date(date.year, date.month, id).getDay(),
  }));
  days = renderWeekSteps(days);

  const styleDateHandler = (item, index) => {
    // {isDay: true, day: 21, week: 4} , 25

    // styleDays[`${date.year}-${date.month}-${item.day}`]
    // {idArray: 30, dayID: 26, styleKey: "work"}

    if (item.isDay) {
      if (styleDays[`${date.year}-${date.month}-${item.day}`]) {
        return [
          stylesDays.day,
          styleDays[`${date.year}-${date.month}-${item.day}`].styleKey,
        ];
      }

      return stylesDays.day;
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(`${date.year}-${date.month}`).then((result) => {
      if (result != null) {
        setStyleDays(JSON.parse(result));
      }
    });
  }, [date]);

  // CLICKS LONG SHORT
  const [memoryClick, setMemoryClick] = useState(null);
  const [fastClick, setFastClick] = useState(true);
  const longClick = useRef(null);

  const checkLongClick = (item, index) => {
    setFastClick(true);
    longClick.current = setTimeout(() => {
      setMemoryClick({ item, index });
      setFastClick(false);
    }, 250);
  };

  const checkLongClickActive = () => {
    clearTimeout(longClick.current);
    // open
    if (fastClick) {
      console.log("fast func");
    }
  };

  let variateVisualDate = [
    stylesDays.dayStyle1,
    stylesDays.dayStyle2,
    stylesDays.dayStyle3,
    stylesDays.dayStyle4,
    stylesDays.dayStyle5,
    stylesDays.dayStyle6,
    stylesDays.dayStyle7,
  ];

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        numColumns={7}
        data={weekName}
        renderItem={({ item }) => <Text style={styles.weekName}>{item}</Text>}
      />

      <FlatList
        style={fastClick ? styles.panelOff : styles.panelOn}
        numColumns={7}
        data={variateVisualDate}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[stylesDays.snippetDay, stylesDays.day, item]}
            onPress={() => {
              replaceColorDay(
                styleDays,
                `${date.year}-${date.month}`,
                `${date.year}-${date.month}-${memoryClick.item.day}`,
                memoryClick,
                item
              );
              setFastClick(true);
            }}
          ></TouchableOpacity>
        )}
      />

      <FlatList
        numColumns={7}
        data={days}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[stylesDays.snippetDay, styleDateHandler(item, index)]}
            onPressIn={() => checkLongClick(item, index)}
            onPressOut={checkLongClickActive}
          >
            <Text style={styles.dayTitle}>{item.day}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const stylesDays = {
  snippetDay: {
    zIndex: 1,
    margin: "auto",
    marginTop: 5,
    width: 35,
    height: 35,
  },
  dayStyle1: {
    backgroundColor: "rgba(107, 91, 149, 0.5)", // Тусклый фиолетовый
  },
  dayStyle2: {
    backgroundColor: "rgba(107, 142, 35, 0.5)", // Тусклый зеленый
  },
  dayStyle3: {
    backgroundColor: "rgba(178, 34, 34, 0.5)", // Тусклый красный
  },
  dayStyle4: {
    backgroundColor: "rgba(70, 130, 180, 0.5)", // Тусклый синий
  },
  dayStyle5: {
    backgroundColor: "rgba(112, 128, 144, 0.5)", // Тусклый серый
  },
  dayStyle6: {
    backgroundColor: "rgba(255, 140, 0, 0.5)", // Тусклый оранжевый
  },
  dayStyle7: {
    borderWidth: 1,
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
};

const styles = StyleSheet.create({
  body: {
    width: "80%",
    height: 280,
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
  panelOff: {
    display: "none",
  },
  panelOn: {
    position: "absolute",
    width: "100%",
    top: -10,
    borderRadius: 20,
    height: 45,
    backgroundColor: "#313131",
    zIndex: 1000,
  },
  dayTitle: {
    top: -1,
    fontSize: 17,
    color: "white",
    fontWeight: 400,
  },
});

export default CalendarContent;
