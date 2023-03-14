import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';

import ExerciseScreen from './components/ExerciseScreen';
import SplitsButton from './components/SplitsButton';
import ExerciseStyles from './components/ExerciseStyles';

export default function App() {

  const [lastSet, setLastSet] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [staticHoldTime, setStaticHoldTime] = useState('');
  const [dicentricTime, setDicentricTime] = useState('');
  const [RorL, setRorL] = useState('');
  const [notes, setNotes] = useState('');
  const [exerciseName, setExerciseName] = useState('');

  const [view, setView] = useState('mainMenu');

  const handleSplitsPress = () => {
    setView('splitList');
  };

  const handleSplit1Press = () => {
    setView('split1');
  };

  const handleLegDay1Press = () => {
    setView('legDay1');
  };

  const saveSet = (weight, reps) => {
    setLastSet(`Last Set: ${weight} for ${reps}`);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleStaticHoldTimeChange = (text) => {
    // Check if the input is a valid number
    const isValidNumber = /^\d+$/.test(text);
    if (isValidNumber) {
      setStaticHoldTime(text + 's');
    } else {
      setStaticHoldTime(text);
    }
  };

  const handleDicentricTimeChange = (text) => {
    // Check if the input is a valid number
    const isValidNumber = /^\d+$/.test(text);
    if (isValidNumber) {
      setDicentricTime(text + ' s');
    } else {
      setDicentricTime(text);
    }
  };

  const handleExerciseNameChange = (newExerciseName) => {
    setExerciseName(newExerciseName);
  };

  const renderView = () => {
    switch (view) {
      case 'mainMenu':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Your Splits" onPress={handleSplitsPress} />
            <SplitsButton label="Post a PR" />
            <SplitsButton label="PR Viewer" />
            <SplitsButton label="Post a Physique Pic" />
            <SplitsButton label="Physique Viewer" />
          </View>
        );
      case 'splitList':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Split 1" onPress={handleSplit1Press} />
            <SplitsButton label="Split 2" />
            <SplitsButton label="Split 3" />
          </View>
        );
      
      case 'split1':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Leg Day 1" onPress={handleLegDay1Press} />
            <SplitsButton label="Push Day 1" />
            <SplitsButton label="Pull Day 1" />
            <SplitsButton label="Leg Day 2" />
          </View>
        );
        
        case 'legDay1':
          return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.bodyContainer}>
                <ExerciseScreen
                  lastSet={lastSet}
                  weight={weight}
                  setWeight={setWeight}
                  reps={reps}
                  setReps={setReps}
                  showAdvanced={showAdvanced}
                  toggleAdvanced={toggleAdvanced}
                  isEnabled={isEnabled}
                  toggleSwitch={toggleSwitch}
                  staticHoldTime={staticHoldTime}
                  handleStaticHoldTimeChange={handleStaticHoldTimeChange}
                  dicentricTime={dicentricTime}
                  handleDicentricTimeChange={handleDicentricTimeChange}
                  RorL={RorL}
                  setRorL={setRorL}
                  notes={notes}
                  setNotes={setNotes}
                  exerciseName={exerciseName}
                  handleExerciseNameChange={handleExerciseNameChange}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => console.log("Button pressed")}>
                  <Text >+</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          );
    
        default:
          return null;
      }
    };

  return (
    <View style={styles.container}>
      {renderView()}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: -210, // adjust this value to move the button up or down
    right: -30,
    backgroundColor: '#ccc',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
