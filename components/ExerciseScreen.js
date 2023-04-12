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
    try {
      const exerciseData = {
        exerciseName: localExerciseName,
        reps,
        weight,
        isEnabled,
        staticHoldTime,
        dicentricTime,
        notes,
      };
      console.log("Saving data for day:", day);
      const key = `exercise_${day}_${index}`;
      await AsyncStorage.setItem(key, JSON.stringify(exerciseData));
      console.log("Data saved:", exerciseData);
  
      // Call the updateExerciseName callback to update the exercise name in the parent component
      updateExerciseName(day, localExerciseName, index);
    } catch (error) {
      console.error("Error saving exercise data:", error);
    }
  };
   

  useEffect(() => {
    const getStoredData = async (day) => {
      try {
        console.log("Retrieving data for day:", day);
        const key = `exercise_${day}_${index}`;
        const storedData = await AsyncStorage.getItem(key);
        if (storedData) {
          const exerciseData = JSON.parse(storedData);
          setReps(exerciseData.reps);
          setWeight(exerciseData.weight);
          setIsEnabled(exerciseData.isEnabled);
          setStaticHoldTime(exerciseData.staticHoldTime);
          setDicentricTime(exerciseData.dicentricTime);
          setNotes(exerciseData.notes);
          setLocalExerciseName(exerciseData.exerciseName);
        }
      } catch (error) {
        console.error("Error retrieving exercise data:", error);
      }
    };
  
    getStoredData(day);
  }, []);
  

  const lastSet = `${reps} x ${weight}`;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.bodyContainer, { marginTop: yOffset[index] || 150 }]}>
        <TextInput
          style={ExerciseStyles.exerciseName}
          value={localExerciseName}
          onChangeText={(newName) => {
            setLocalExerciseName(newName);
          }}
          placeholder="Enter exercise name"
          placeholderTextColor="#ccc"
          onSubmitEditing={Keyboard.dismiss}
          editable={true}
        />
        <View style={ExerciseStyles.lastSetContainer}>
          <Text style={ExerciseStyles.lastSetLabel}>Best set:</Text>
          <View style={ExerciseStyles.lastSetTextContainer}>
            <TextInput
            style={ExerciseStyles.lastSetText} 
            value={reps}
            onChangeText={setReps}
            keyboardType="numeric" 
            returnKeyType="done"></TextInput>
          </View>

          <Text style={ExerciseStyles.lastSetFor}>For</Text>

          <View style={ExerciseStyles.lastWeightTextContainer}>
            <TextInput
            style={ExerciseStyles.LastWeightText}
            value={weight}
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
                thumbColor={isEnabled ? "#030303" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={{marginLeft: 10}}>To Failure</Text>
            </View>
            <View style={{ marginTop: 14 }}>
              <Text style={{ marginBottom: 5 }}>Static Hold Time:</Text>
              <TextInput
                style={ExerciseStyles.lastSetText}
                value={staticHoldTime}
                onChangeText={handleStaticHoldTimeChange}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginBottom: 5 }}>Dicentric Time:</Text>
              <TextInput
                style={ExerciseStyles.lastSetText}
                value={dicentricTime}
                onChangeText={handleDicentricTimeChange}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginBottom: 5 }}>Notes:</Text>
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
    paddingBottom: 10, // add some padding at the bottom to make room for the button
    marginBottom: -150,
    marginTop: 100,
    width: 300,
    bottom: 400,
    bottom: 150,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default ExerciseScreen;