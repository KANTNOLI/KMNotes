import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarHeader = (props) => {
  return (
    <SafeAreaView style={styles.body}>
      <Text>HEADER</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "80%",
    height: "20px",
    backgroundColor: "red",
  },
});

export default CalendarHeader;
