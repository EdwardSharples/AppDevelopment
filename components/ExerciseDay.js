import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';

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
  showAdvanced,
  handleHistoryButton,
}) => {
  const [deletedExercises, setDeletedExercises] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  const exerciseHeight = showAdvanced ? 530 : 330;


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
  

  const renderExerciseScreens = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity onLongPress={drag}>
        <ExerciseScreen
          key={`${day}_${item.exerciseName}_${index}`}
          day={day}
          index={index}
          exerciseName={item.exerciseName}
          yOffset={yOffsets[index] || exercises.slice(0, index).reduce((acc, _, i) => acc + 165 + (advancedOffset[i] || 0), 0)}
          onToggleAdvanced={() => handleToggleAdvanced(day, index)}
          expanded={expandedIndex === index}
          onSaveSet={(reps, weight) => saveSet(day, reps, weight)}
          updateExerciseName={(newName) => updateExerciseName(day, newName, index)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        style={{ opacity: fadeAnim, flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 0, flexGrow: 1, alignItems: 'center', top: 50 }}
        data={exercises.filter(e => !e.deleted)}
        renderItem={renderExerciseScreens}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({ data }) => setExercises(data)}
      />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 56,
          zIndex: 2,
          opacity: fadeAnim,
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
            alignSelf: 'flex-end',
          }}
          onPress={handleHistoryButton}
        >
          <FontAwesome name="history" size={28} color="#355C7D" style={styles.historyButton} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
          }}
          onPress={handleGoBack}
        >
          <Text style={styles.goBackText}>{"<"} Your Split</Text>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          backgroundColor: '#25292e',
          height: 80,
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
      borderRadius: 20,
    },
    deleteText: {
      color: 'white',
      fontWeight: '600',
    },
    addExerciseText: {
      left: 300,
      bottom: 17,
      color: '#355C7D',
    },
    goBackText: {
      left: -245,
      bottom: 800,
      fontSize: 18,
      height: 20,
      width: 90,
      color: '#355C7D',
      paddingRight: 100,
    },
    historyButton: {
      left: -125,
      bottom: 17,
    },
  });
  

export default ExerciseDay;
