import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

const CalculatorScreen = ({ navigation }) => {
  const [classesConducted, setClassesConducted] = useState("");
  const [classesAttended, setClassesAttended] = useState("");
  const [desiredPercentage, setDesiredPercentage] = useState(75);
  const [requiredClasses, setRequiredClasses] = useState(null);
  const [skippableClasses, setSkippableClasses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const SLIDER_WIDTH = 300;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newX = Math.min(
          SLIDER_WIDTH,
          Math.max(
            0,
            gestureState.dx + (desiredPercentage / 100) * SLIDER_WIDTH
          )
        );
        setDesiredPercentage(Math.round((newX / SLIDER_WIDTH) * 100));
        setShowResult(false);
      },
      onPanResponderRelease: () => {
        setShowResult(false);
      },
    })
  ).current;

  const calculateClasses = () => {
    if (
      !classesConducted ||
      !classesAttended ||
      isNaN(classesConducted) ||
      isNaN(classesAttended)
    ) {
      alert("Please enter valid numbers for classes conducted and attended.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const conducted = parseInt(classesConducted, 10);
      const attended = parseInt(classesAttended, 10);
      const target = desiredPercentage / 100;

      const required = Math.ceil(
        (target * conducted - attended) / (1 - target)
      );

      // Check if the user already exceeds the desired percentage
      const maxSkippable = Math.floor((attended - target * conducted) / target);

      setRequiredClasses(required > 0 ? required : 0);
      setSkippableClasses(maxSkippable > 0 ? maxSkippable : 0);
      setShowResult(true);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setShowResult(false);
  };

  const handleSliderPress = (event) => {
    const touchX = event.nativeEvent.locationX;
    const newPercentage = Math.round(
      Math.min(100, Math.max(0, (touchX / SLIDER_WIDTH) * 100))
    );
    setDesiredPercentage(newPercentage);
    setShowResult(false);
  };

  const calculateCurrentPercentage = () => {
    if (!classesConducted || !classesAttended) return "0%";
    const conducted = parseInt(classesConducted, 10);
    const attended = parseInt(classesAttended, 10);
    if (conducted === 0) return "0%";
    return ((attended / conducted) * 100).toFixed(2) + "%";
  };

  return (
    <View style={styles.container}>
      <Header height="90" />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.innerContent}>
          <Text style={styles.title}>Class Calculator</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Classes Conducted</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={classesConducted}
              onChangeText={handleInputChange(setClassesConducted)}
              placeholder="Enter Classes Conducted"
            />

            <Text style={styles.label}>Classes Attended</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={classesAttended}
              onChangeText={handleInputChange(setClassesAttended)}
              placeholder="Enter Classes Attended"
            />
          </View>

          <View style={styles.currentPercentageContainer}>
            <Text style={styles.currentPercentageText}>
              Current Percentage: {calculateCurrentPercentage()}
            </Text>
          </View>

          <Text style={styles.label}>Desired Percentage</Text>
          <TouchableWithoutFeedback onPress={handleSliderPress}>
            <View style={[styles.sliderContainer, { width: SLIDER_WIDTH }]}>
              <View style={styles.sliderTrack} />
              <View
                style={[
                  styles.sliderFill,
                  { width: (desiredPercentage / 100) * SLIDER_WIDTH },
                ]}
              />
              <View
                style={[
                  styles.sliderThumb,
                  { left: (desiredPercentage / 100) * SLIDER_WIDTH - 10 },
                ]}
                {...panResponder.panHandlers}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.sliderValue}>{desiredPercentage}%</Text>

          <TouchableOpacity style={styles.button} onPress={calculateClasses}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#003366" />
          ) : showResult &&
            (requiredClasses !== null || skippableClasses !== null) ? (
            <View style={styles.result}>
              {requiredClasses > 0 ? (
                <Text style={styles.resultText}>
                  You need to attend {requiredClasses} more classes to reach{" "}
                  {desiredPercentage}%.
                </Text>
              ) : skippableClasses > 0 ? (
                <Text style={styles.resultText}>
                  You can skip {skippableClasses} classes and still maintain{" "}
                  {desiredPercentage}% attendance.
                </Text>
              ) : (
                <Text style={styles.resultText}>
                  You cannot skip any classes.
                </Text>
              )}
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  innerContent: {
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#003366",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  currentPercentageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  currentPercentageText: {
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "italic",
    color: "#003366",
  },
  sliderContainer: {
    height: 40,
    alignSelf: "center",
    marginVertical: 15,
    position: "relative",
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#ccc",
    width: "100%",
    position: "absolute",
    top: 18,
  },
  sliderFill: {
    height: 4,
    backgroundColor: "#003366",
    position: "absolute",
    top: 18,
    left: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#003366",
    position: "absolute",
    top: 10,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#e6f7ff",
    borderWidth: 1,
    borderColor: "#b3d9ff",
  },
  resultText: {
    fontSize: 16,
    color: "#003366",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CalculatorScreen;
