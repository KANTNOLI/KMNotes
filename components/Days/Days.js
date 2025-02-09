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
  ScrollView,
  Dimensions,
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
  "pinned",
  "00:00",
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
  const [reloadFlag, setReloadFlag] = useState(false);
  const [monthData, setMonthData] = useState({});
  const [planData, setPlanData] = useState({});

  const [plan, setPlan] = useState("");
  const [editCash, setEditCash] = useState(false);
  const [editNow, setEditNow] = useState(false);
  const [editCash2, setEditCash2] = useState({});

  const [addState, setAddState] = useState(false);
  const textPlanRef = useRef(null);
  //console.log(new Date(year, month + 1, 0).getDate());

  const [chooseHour, setChooseHour] = useState(11);

  const replaceSpace = () => {
    return plan.replace(/\[#\]/g, "\n");
  };

  const renderTasksArray = () => {
    let activeArray = [];
    HOURS.map((hour, ID) => {
      if (planData && Array.isArray(planData[hour]) && planData[hour].length) {
        activeArray.push({
          hours: hour,
          array: planData[hour].map((str, id) => ({
            id: id,
            hour: ID,
            text: str,
          })),
        });
      }
    });
    return activeArray;
  };

  const createNewPlan = () => {
    // {idArray: 17, dayID: 13, styleKey: {…}, plans: []}

    let tempMonthData = monthData;

    if (plan != "" || plan != "[#]") {
      tempMonthData[`${date.year}-${date.month}-${date.day}`].plans[
        HOURS[chooseHour]
      ].push(plan);

      AsyncStorage.setItem(
        `${date.year}-${date.month}`,
        JSON.stringify(tempMonthData)
      );

      setPlan("");
      setAddState(false);
    }
  };
  const editNewPlan = () => {
    //{id: 0, hour: 10, text: '1000'}

    let tempMonthData = monthData;

    if (plan != "" || plan != "[#]") {
      if (editCash2.hour == chooseHour) {
        tempMonthData[`${date.year}-${date.month}-${date.day}`].plans[
          HOURS[chooseHour]
        ][editCash2.id] = plan;

        console.log();
      } else {
        tempMonthData[`${date.year}-${date.month}-${date.day}`].plans[
          HOURS[editCash2.hour]
        ].splice(editCash2.id, 1);

        tempMonthData[`${date.year}-${date.month}-${date.day}`].plans[
          HOURS[chooseHour]
        ].push(plan);
      }

      console.log(tempMonthData);

      AsyncStorage.setItem(
        `${date.year}-${date.month}`,
        JSON.stringify(tempMonthData)
      );

      setPlan("");
      setAddState(false);

      setReloadFlag(!reloadFlag);
    }
  };

  const removePlan = (item, index) => {
    let tempM = monthData;
    tempM[`${date.year}-${date.month}-${date.day}`].plans[
      HOURS[item.hour]
    ].splice(index, 1);

    AsyncStorage.setItem(`${date.year}-${date.month}`, JSON.stringify(tempM));
    setMonthData(tempM);
    setReloadFlag(!reloadFlag);
  };

  useEffect(() => {
    AsyncStorage.getItem(`${date.year}-${date.month}`)
      .then((json) => JSON.parse(json))
      .then((result) => {
        setMonthData(result);
        setPlanData(result[`${date.year}-${date.month}-${date.day}`].plans);
      });
  }, [reloadFlag]);

  return (
    <SafeAreaView onPress={() => setAddState(false)} style={styles.body}>
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
          onPress={() => {
            setEditCash(true), setAddState(!addState);
            setPlan("");
          }}
        >
          <Image style={styles.img} source={require("../../assets/add.png")} />
        </TouchableOpacity>
      </View>

      {addState && (
        <View style={editCash ? styles.addPanel : styles.addPanel2}>
          <Text ref={textPlanRef} style={styles.addPanelText}>
            {plan ? replaceSpace() : "Какие планы на этот день?"}
          </Text>
          {editCash && (
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
                  setPlan(plan ? plan + "[#]" : "");
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../../assets/line.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnNext}
                onPress={() => {
                  if (editNow) {
                    editNewPlan();
                  } else {
                    createNewPlan();
                  }

                  setPlan("");
                  setEditCash2({});
                  setEditCash(false);
                  setEditNow(false);
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../../assets/create.png")}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {editCash && addState && (
        <View style={styles.setHours}>
          <Text
            style={styles.arrowHour2}
            onPress={() =>
              chooseHour < 24 ? setChooseHour(chooseHour + 1) : setChooseHour(1)
            }
          >
            -
          </Text>
          <Text style={styles.HourChooseVisual}>{HOURS[chooseHour]}</Text>
          <Text
            style={styles.arrowHour1}
            onPress={() =>
              chooseHour > 1 ? setChooseHour(chooseHour - 1) : setChooseHour(24)
            }
          >
            +
          </Text>
        </View>
      )}

      <View style={styles.boxVisual}>
        <ScrollView style={{ height: 1 }}>
          <FlatList
            data={renderTasksArray()}
            renderItem={({ item, index }) => (
              <View style={styles.hourvisual}>
                <Text style={styles.hourvisualText}>{item.hours}</Text>
                <FlatList
                  data={item.array}
                  renderItem={({ item, index }) => (
                    <View style={styles.planDiv}>
                      <Text
                        onPress={() => {
                          setEditCash(false);
                          setAddState(!addState);
                          setPlan(item.text);
                        }}
                        style={styles.htsBtnText}
                      >
                        {item.text}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setEditCash(true);
                            setEditCash2(item);
                            setChooseHour(item.hour);

                            setEditNow(true);
                            setAddState(!addState);
                            setPlan(item.text);
                          }}
                          style={styles.htsBtn1}
                        >
                          <Image
                            style={styles.htsImg1}
                            source={require("../../assets/editTasks.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => removePlan(item, index)}
                          style={styles.htsBtn2}
                        >
                          <Image
                            style={styles.htsImg1}
                            source={require("../../assets/trashDelete.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#1E1F25",
  },
  arrowHour1: {
    fontSize: 45,
    color: "#2bff72",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 5,
  },
  arrowHour2: {
    fontSize: 50,
    color: "#ff2b2b",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 5,
  },
  HourChooseVisual: {
    fontSize: 20,
    width: 100,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  setHours: {
    textAlign: "center",
    top: 490,
    position: "absolute",
    justifyContent: "center",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    backgroundColor: "green",
    backgroundColor: "#2e2f36",
    borderColor: "#7a7a7a",
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 1000,
  },
  htsBtnText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    numberOfLines: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#b3b3b3",
    maxWidth: "70%",
    fontSize: 16,
  },
  htsBtn1: {
    marginRight: 10,
    width: 22,
    height: 22,
  },
  htsBtn2: {
    marginRight: 10,
    width: 28,
    height: 28,
  },
  htsImg1: {
    width: "100%",
    height: "100%",
  },
  hourvisual: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: "#7a7a7a",
    borderBottomWidth: 2,
  },
  hourvisualText: {
    fontSize: 18,
    fontWeight: 500,
    color: "white",
  },
  boxVisual: {
    flex: 1,
    width: "80%",
  },
  dNone: {
    display: "none",
  },
  ArrayDuiv: {
    width: "100%",
  },
  planDiv: {
    flexDirection: "row",
    color: "white",
    marginTop: 10,
    paddingLeft: 10,
    maxWidth: "100%",
    alignContent: "center",
    justifyContent: "space-between",
    height: 30,
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
    padding: 5,
    borderRadius: 10,
    width: "100%",
    height: 60,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    backgroundColor: "#34353b",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    color: "white",
    fontWeight: 500,
  },
  addPanelText: {
    color: "white",
    marginTop: 20,
    width: "90%",
  },
  addPanel2: {
    top: 70,
    position: "absolute",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    height: "80%",
    backgroundColor: "green",
    backgroundColor: "#2e2f36",
    borderColor: "#7a7a7a",
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 1000,
  },
  addPanel: {
    top: 70,
    position: "absolute",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    height: 400,
    backgroundColor: "green",
    backgroundColor: "#2e2f36",
    borderColor: "#7a7a7a",
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 1000,
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
