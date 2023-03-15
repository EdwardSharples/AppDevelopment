import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';

import ExerciseScreen from './components/ExerciseScreen';
import SplitsButton from './components/SplitsButton';

export default function App() {
  const [view, setView] = useState('mainMenu');
  const [exerciseScreens, setExerciseScreens] = useState([""]); // Add a state for exercise screens
  
  const updateExerciseName = (newName, index) => {
    const newExerciseScreens = [...exerciseScreens];
    newExerciseScreens[index] = newName;
    setExerciseScreens(newExerciseScreens);
  };

  const renderExerciseScreens = () => {
    return exerciseScreens.map((exerciseName, index) => (
      <ExerciseScreen
        key={index}
        index={index}
        exerciseName={exerciseName}
        yOffset={index * 165}
        handleExerciseNameChange={(newName) => updateExerciseName(newName, index)}
      />
    ));
  };

  const handleAddExercise = () => {
    setExerciseScreens([...exerciseScreens, ""]);
  };

  const handleSplitsPress = () => {
    setView('splitList');
  };

  const handleSplit1Press = () => {
    setView('split1');
  };

  const handleLegDay1Press = () => {
    setView('legDay1');
  };

  const renderView = () => {
    switch (view) {
      case 'mainMenu':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Your Splits" onPress={handleSplitsPress} />
            {/* Other SplitsButton components */}
          </View>
        );
      case 'splitList':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Split 1" onPress={handleSplit1Press} />
            {/* Other SplitsButton components */}
          </View>
        );
      case 'split1':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Leg Day 1" onPress={handleLegDay1Press} />
            {/* Other SplitsButton components */}
          </View>
        );
      case 'legDay1':
        return (
          <SafeAreaView style={styles.bodyContainer}>
            {renderExerciseScreens()}
            <TouchableOpacity
              style={{ position: 'absolute', bottom: 10, right: 10}}
              onPress={handleAddExercise}
            >
              <Text style={{ color: 'white', bottom: -15, left: 100 }}>Add Exercise</Text>
            </TouchableOpacity>
          </SafeAreaView>
          ); 
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
  addButtonContainer: {
    backgroundColor: '#355C7D',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
