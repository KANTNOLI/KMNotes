import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarHeader from "./components/Calendar/CalendarHeader";

const App = () => {
  const [mount, setmount] = useState(1);

  return (
    <SafeAreaView style={styles.body}>
      <CalendarHeader />
      <Text>{mount}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1F25",
  },
});

export default App;
