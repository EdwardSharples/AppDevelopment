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
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
  handleDeleteExercise,
}) => {
  const [deletedExercises, setDeletedExercises] = useState([]);


  const handleDeleteExerciseWithDay = (index) => {
    handleDeleteExercise(day, index);
    setDeletedExercises((prevDeletedExercises) => [...prevDeletedExercises, index]);
  };

  useEffect(() => {
    if (
      typeof handleUpdateYOffsets === 'function' &&
      JSON.stringify(yOffsets) !== JSON.stringify(Array(exerciseScreens[day]?.exercises.length || 0).fill(0))
    ) {
      handleUpdateYOffsets(Array(exerciseScreens[day]?.exercises.length || 0).fill(0));
    }
  }, [exerciseScreens, day, exerciseUpdates, handleUpdateYOffsets, yOffsets]);
  

const renderExerciseScreens = () => {
  return (
    exercises &&
    exercises
    .map((exercise, index) => {
      if (exercise.deleted) return null;
      const renderItem = () => {
        console.log(`Rendering exercise screen for day ${day}, index ${index}`);
        const yOffset = yOffsets[index] || exercises
          .slice(0, index)
          .reduce((acc, _, i) => acc + 165 + (advancedOffset[i] || 0), 0);
        return (
          <ExerciseScreen
            key={`${day}_${exercise.exerciseName}_${index}`}
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
      };

      const renderRightActions = () => (
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDeleteExerciseWithDay(index)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );

      return (
        <Swipeable
          key={index}
          renderRightActions={renderRightActions}
        >
          {renderItem()}
        </Swipeable>
      );
    })
  );
};

return (
  <SafeAreaView style={styles.container}>
    <View
      style={{
        backgroundColor: '#25292e',
        height: 90, // Adjust the height as needed
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        top: 0,
      }}
    />
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 56, flexGrow: 1, alignItems: 'center', left: -50, top: 50 }}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ minHeight: 1850 }}>
        {renderExerciseScreens()}
      </View>
    </ScrollView>
    <View
      style={{
        position: 'absolute',
        bottom: 20, 
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 56, 
        zIndex: 2,
      }}
    >
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
        }}
        onPress={handleAddExercise}
      >
        <AntDesign name="pluscircle" size={26} style={styles.addExerciseText} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
        }}
        onPress={handleGoBack}
      >
        <Text style={styles.goBackText}>{"\u003C"} Your Split</Text>
      </TouchableOpacity>
    </View>
    <View
      style={{
        backgroundColor: '#25292e', // Use your desired color
        height: 80, // Adjust the height as needed
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
      }}
    />
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
    rowFront: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      marginBottom: 15,
      backgroundColor: '#25292e',
    },
    rowBack: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      height: 'auto',
      marginBottom: 15,
      backgroundColor: '#25292e',
    },
    deleteBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 75,
      height: '100%',
      backgroundColor: '#C70000',
    },
    deleteText: {
      color: 'white',
      fontWeight: '600',
    },
    addExerciseText: {
      left: 300,
      bottom: 20,
      color: '#355C7D',
    },
    goBackText: {
      left: -255,
      bottom: 800,
      fontSize: 18,
      height: 20,
      width: 90,
      color: '#355C7D',
    },
  });
  

export default ExerciseDay;
