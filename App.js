import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function App() {
  let testString = "test";
  return (
    <SafeAreaView style={styles.container}>
      <Text
        numberOfLines={1}
        onPress={() => {
          testString += " 1";
        }}
      >
        123 {"\n"} 123
      </Text>

      <Button title="12323" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff111",
  },
});
