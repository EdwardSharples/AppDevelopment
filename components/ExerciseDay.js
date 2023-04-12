import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import ExerciseScreen from './ExerciseScreen';


const ExerciseDay = ({
  day,
  exercises,
  handleAddExercise,
  handleGoBack,
  handleToggleAdvanced,
  expandedIndex,
  advancedOffset,
  exerciseScreens,
  yOffsets,
  updateExerciseName,
}) => {
  console.log('Current view in ExerciseDay:', day);
  const renderExerciseScreens = () => {
    return exercises.map((exercise, index) => {
      const yOffset = yOffsets[index] || exercises
        .slice(0, index)
        .reduce((acc, _, i) => acc + 165 + (advancedOffset[i] || 0), 0);
  
      return (
        <ExerciseScreen
          key={`${day}_${index}`}
          day={day}
          index={index}
          exerciseName={exercise.exerciseName}
          yOffset={yOffset}
          onToggleAdvanced={() => handleToggleAdvanced(day, index)}
          expanded={expandedIndex === index}
          onSaveSet={(reps, weight) => saveSet(index, reps, weight)}
          updateExerciseName={(newName) => updateExerciseName(day, newName, index)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, paddingTop: 10 }}
        contentContainerStyle={{ right: 140, paddingHorizontal: 150 }}
      >
        <View style={{ minHeight: 1850 }}>
          {renderExerciseScreens()}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginTop: 20,
              marginRight: 20,
            }}
            onPress={handleAddExercise}
          >
            <Text style={{ color: 'white', bottom: 170, left: 40, }}>Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              left: 265,
              top: 20,
            }}
            onPress={handleGoBack}
          >
            <Text style={{ color: 'white', bottom: 160, right: 15, }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
      position: 'absolute',
      top: 50,
      left: 20,
      alignItems: 'flex-start',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      top: 180,
      left: 20,
    },
  });
  

export default ExerciseDay;
