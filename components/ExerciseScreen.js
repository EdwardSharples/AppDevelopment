import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseStyles from './ExerciseStyles';

import { scale } from './utils';

const ExerciseScreen = ({
  exerciseName,
  yOffset,
  index,
  expanded,
  onToggleAdvanced,
  exercises,
  handleToggleAdvanced,
  updateExerciseName,
  day,
  onSaveSet,
  onDelete,
}) => {
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [staticHoldTime, setStaticHoldTime] = useState('');
  const [dicentricTime, setDicentricTime] = useState('');
  const [notes, setNotes] = useState('');
  const [RorL, setRorL] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localExerciseName, setLocalExerciseName] = useState(exerciseName || "");

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleStaticHoldTimeChange = (text) => setStaticHoldTime(text.replace(/[^0-9]/g, ''));

  const handleDicentricTimeChange = (text) => setDicentricTime(text.replace(/[^0-9]/g, '')); // Only allow numbers 0-9

  const toggleAdvanced = () => {
    setShowAdvanced((prevShowAdvanced) => !prevShowAdvanced);

    onToggleAdvanced();
  };

  const saveSet = async (day, reps, weight) => {
    console.log(`Saving exercise data for day ${day}, reps ${reps}, weight ${weight}`);
    try {
      const currentDate = new Date();
      const exerciseData = {
        exerciseName: localExerciseName,
        reps,
        weight,
        isEnabled,
        staticHoldTime,
        dicentricTime,
        notes,
        date: currentDate,
        RorL,
      };
      console.log("Saving data for day:", day);
      const key = `exercise_${day}_${index}`;
      const existingData = await AsyncStorage.getItem(key);
      let exerciseHistory = [];
      if (existingData) {
        exerciseHistory = JSON.parse(existingData);
        const existingExerciseIndex = exerciseHistory.findIndex(
          (exercise) => exercise.exerciseName === localExerciseName
        );
        if (existingExerciseIndex !== -1) {
          exerciseHistory[existingExerciseIndex].data.push(exerciseData);
        } else {
          exerciseHistory.push({ exerciseName: localExerciseName, data: [exerciseData] });
        }
      } else {
        exerciseHistory.push({ exerciseName: localExerciseName, data: [exerciseData] });
      }
      await AsyncStorage.setItem(key, JSON.stringify(exerciseHistory));
      console.log("Data saved:", exerciseData);
  
      // Call the updateExerciseName callback to update the exercise name in the parent component
      console.log("Calling updateExerciseName with day:", day, "localExerciseName:", localExerciseName, "index:", index);
      updateExerciseName(day, localExerciseName, index);
    } catch (error) {
      console.error("Error saving exercise data:", error);
    }
  };
   

  const getStoredData = async (day) => {
    try {
      console.log("Retrieving data for day:", day);
      const key = `exercise_${day}_${index}`;
      console.log(`Key: ${key}`)
      const storedData = await AsyncStorage.getItem(key);
      console.log(`Stored data: ${storedData}`)
      if (storedData) {
        const exerciseData = JSON.parse(storedData);
        console.log("Exercise data:", exerciseData);
  
        if (exerciseData.length > 0) {
          const exerciseName = exerciseData[0].exerciseName;
          setLocalExerciseName(exerciseName);
        }
  
        const currentExercise = exerciseData.find((exercise) => exercise.exerciseName === exerciseName);
        console.log("Current exercise:", currentExercise);
  
        if (currentExercise) {
          setReps(currentExercise.data[currentExercise.data.length - 1].reps);
          setWeight(currentExercise.data[currentExercise.data.length - 1].weight);
          setIsEnabled(currentExercise.data[currentExercise.data.length - 1].isEnabled);
          setStaticHoldTime(currentExercise.data[currentExercise.data.length - 1].staticHoldTime);
          setDicentricTime(currentExercise.data[currentExercise.data.length - 1].dicentricTime);
          setNotes(currentExercise.data[currentExercise.data.length - 1].notes);
          setRorL(currentExercise.data[currentExercise.data.length - 1].RorL);
        }
      }
    } catch (error) {
      console.error("Error retrieving exercise data:", error);
    }
  };

  useEffect(() => {
    getStoredData(day);
  }, [day]);

  useEffect(() => {
    getStoredData(day);
  }, [index]);
  
  useEffect(() => {
    if (localExerciseName) {
      const loadData = async () => {
        try {
          const storedData = await AsyncStorage.getItem(`exercise_${day}_${index}`);
          if (storedData) {
            const exerciseData = JSON.parse(storedData);
            const currentExercise = exerciseData.find(
              (exercise) => exercise.exerciseName === localExerciseName
            );
            if (currentExercise) {
              setReps(currentExercise.data[currentExercise.data.length - 1].reps);
              setWeight(currentExercise.data[currentExercise.data.length - 1].weight);
              setIsEnabled(currentExercise.data[currentExercise.data.length - 1].isEnabled);
              setStaticHoldTime(currentExercise.data[currentExercise.data.length - 1].staticHoldTime);
              setDicentricTime(currentExercise.data[currentExercise.data.length - 1].dicentricTime);
              setNotes(currentExercise.data[currentExercise.data.length - 1].notes);
              setRorL(currentExercise.data[currentExercise.data.length - 1].RorL);
            }
          }
        } catch (error) {
          console.error("Error retrieving exercise data:", error);
        }
      };
      loadData();
    }
  }, [localExerciseName]);

  const lastSet = `${reps || 0} x ${weight || 0}`;



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.exerciseContainer}>
      <View style={[styles.bodyContainer, { marginTop: yOffset[index] || 150 }]}>
        <TextInput
          style={ExerciseStyles.exerciseName}
          value={localExerciseName}
          onChangeText={setLocalExerciseName}
          placeholder="Enter exercise name"
          placeholderTextColor="#EDEDED"
          onSubmitEditing={Keyboard.dismiss}
          editable={true}
        />
        <View style={ExerciseStyles.lastSetContainer}>
          <Text style={ExerciseStyles.lastSetLabel}>Best set:</Text>
          <View style={ExerciseStyles.lastSetTextContainer}>
            <TextInput
            style={ExerciseStyles.lastSetText} 
            value={reps}
            placeholder="reps"
            onChangeText={setReps}
            keyboardType="numeric" 
            returnKeyType="done"></TextInput>
          </View>

          <Text style={ExerciseStyles.lastSetFor}>For</Text>

          <View style={ExerciseStyles.lastWeightTextContainer}>
            <TextInput
            style={ExerciseStyles.LastWeightText}
            value={weight}
            placeholder="kg"
            onChangeText={setWeight}
            keyboardType="numeric"
            returnKeyType="done">
          </TextInput>
          </View>

        </View>

        {showAdvanced && (
          <View style={ExerciseStyles.RorLcontainer}>
              <TextInput
                style={ExerciseStyles.RorLText}
                placeholder="R or L"
                placeholderTextColor="#355C7D"
                value={RorL}
                onChangeText={setRorL}
              />
          </View>
          )}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10 }}>
          <TouchableOpacity style={ExerciseStyles.advancedButton} onPress={toggleAdvanced}>
            <Text style={ExerciseStyles.advancedButtonText}>Advanced</Text>
          </TouchableOpacity>
        </View>

        {showAdvanced && (
          <View style={{marginTop: 15}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                trackColor={{ false: "#767577", true: "#355C7D" }}
                thumbColor={isEnabled ? "white" : "white"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={ExerciseStyles.toFailureText}>To Failure</Text>
            </View>
            <View style={{ marginTop: 14 }}>
              <Text style={ExerciseStyles.staticHoldTimeLabel}>Static Hold Time:</Text>
              <TextInput
                style={ExerciseStyles.lastSetText}
                value={staticHoldTime}
                onChangeText={handleStaticHoldTimeChange}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={ExerciseStyles.dicentricTimeLabel}>Dicentric Time:</Text>
              <TextInput
                style={ExerciseStyles.lastSetText}
                value={dicentricTime}
                onChangeText={handleDicentricTimeChange}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={ExerciseStyles.notesLabel}>Notes:</Text>
              <View style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}>
                <TextInput
                  style={{ padding: 10 }}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add your notes here"
                  multiline={true}
                />
            </View>
          </View>
        </View>
        )}

      {!showAdvanced && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={() => saveSet(day, reps, weight)} style={ExerciseStyles.saveButtonContainer}>
                <Text style={ExerciseStyles.saveButton}>Save</Text>
            </TouchableOpacity>
            
            <Text style={[ExerciseStyles.lastSetLabel, {left: 20, top: 4 }]}>{lastSet}</Text>
        </View>
      )}
      </View>
      </View>
    </TouchableWithoutFeedback>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    position: 'relative',
    left: 5,
    alignItems: 'flex-start',
    paddingBottom: scale(10, 1.3),
    marginBottom: scale(-150, 0.9), // change since its causing issues
    marginTop: scale(100, 1.3),
    width: 300,
    bottom: 400,
    bottom: 150,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  exerciseContainer: {
    width: 400,
    height: 180,
    marginHorizontal: 0,
    alignItems: 'left',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#1e2227',
    borderRadius: 10,
    paddingTop: 30,
    paddingLeft: 5,
    marginBottom: 10,
  },
});

export default ExerciseScreen;