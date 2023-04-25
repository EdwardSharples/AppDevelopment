import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

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
  localExerciseName,
  exerciseUpdates,
  handleUpdateYOffsets,
}) => {
  console.log('Current view in ExerciseDay:', day);
  console.log('Current exercises in ExerciseDay:', exercises);

  useEffect(() => {
    if (
      typeof handleUpdateYOffsets === 'function' &&
      JSON.stringify(yOffsets) !== JSON.stringify(Array(exerciseScreens[day]?.exercises.length || 0).fill(0))
    ) {
      handleUpdateYOffsets(Array(exerciseScreens[day]?.exercises.length || 0).fill(0));
    }
  }, [exerciseScreens, day, exerciseUpdates, handleUpdateYOffsets, yOffsets]);

  const handleDeleteExercise = (index) => {
    console.log(`Deleting exercise for day ${day}, index ${index}`);
    // Add your delete logic here
  };

  const renderExerciseScreens = () => {
    return exercises && exercises.map((exercise, index) => {
      console.log(`Rendering exercise screen for day ${day}, index ${index}`);
      const yOffset = yOffsets[index] || exercises
        .slice(0, index)
        .reduce((acc, _, i) => acc + 165 + (advancedOffset[i] || 0), 0);
      console.log("yOffset for index", index, ":", yOffset);
      console.log("ExerciseDay exercises:", exercises);
      return (
        <ExerciseScreen
          key={`${day}_${index}`}
          day={day}
          index={index}
          exerciseName={exercise.exerciseName}
          yOffset={yOffset}
          onToggleAdvanced={() => handleToggleAdvanced(day, index)}
          expanded={expandedIndex === index}
          onSaveSet={(reps, weight) => saveSet(day, reps, weight)}
          updateExerciseName={(newName) => updateExerciseName(day, newName, index)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, right: 50, }}
        contentContainerStyle={{ paddingHorizontal: 50 }}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
