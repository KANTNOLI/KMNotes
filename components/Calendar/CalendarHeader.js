import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const CalendarHeader = ({ months, date, setDate }) => {
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.title}>{`${months[date.month]} ${date.year}`}</Text>
      <View style={styles.steps}>
        <TouchableOpacity style={styles.stepsDiv} onPress={() => setDate(0)}>
          <Image
            style={styles.stepsImg}
            source={require("../../assets/Previous.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.stepsDiv} onPress={() => setDate(1)}>
          <Image
            style={styles.stepsImg}
            source={require("../../assets/Next.png")}
          />
        </TouchableOpacity>
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
