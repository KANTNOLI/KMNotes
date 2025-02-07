import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarHeader from "./components/Calendar/CalendarHeader";
import CalendarContent from "./components/Calendar/CalendarContent";
import Days from "./components/Days/Days";

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

const App = () => {
  const Stack = createStackNavigator();

  let activeDate = new Date();

  const [year, setYear] = useState(activeDate.getFullYear());
  const [month, setMonth] = useState(activeDate.getMonth());
  const [chooseDay, setChooseDay] = useState(null);

  //console.log(new Date(year, month + 1, 0).getDate());

  const setMonthHandler = (variate) => {
    if (variate) {
      if (month < 11) {
        setMonth(month + 1);
      } else {
        setYear(year + 1);
        setMonth(0);
      }
    } else {
      if (month > 0) {
        setMonth(month - 1);
      } else {
        setYear(year - 1);
        setMonth(11);
      }
    }
  };

  const MainScreen = ({ navigation }) => (
    <SafeAreaView style={styles.body}>
      <CalendarHeader
        months={MONTHS}
        date={{ month, year }}
        setDate={setMonthHandler}
      />
      <CalendarContent
        countDay={new Date(year, month + 1, 0).getDate()}
        date={{ month, year }}
        chooseDay={(value) => setChooseDay(value)}
        navigation={navigation}
      />
      <Text>{month}</Text>
    </SafeAreaView>
  );

  const DayScreen = ({ navigation }) => (
    <Days
      navigation={navigation}
      date={{
        year,
        month,
        day: chooseDay,
      }}
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
            documentTitle: `${MONTHS[month]} ${year}`,
          }}
        />
        <Stack.Screen
          name="Day"
          component={DayScreen}
          options={{
            headerShown: false,
            documentTitle: `${MONTHS[month]} ${chooseDay} ${year}`,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1F25",
  },
  test: {
    display: "none",
  },
});

export default App;
