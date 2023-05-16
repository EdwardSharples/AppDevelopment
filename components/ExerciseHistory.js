import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseHistory = ( {onGoBack} ) => {
  const [historyData, setHistoryData] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleClearAsyncStorage = () => {
    AsyncStorage.clear().then(() => {
      console.log('AsyncStorage cleared');
    });
  };

  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const exerciseKeys = keys.filter((key) => key.startsWith('exercise_'));
      let history = [];
      for (const key of exerciseKeys) {
        const data = await AsyncStorage.getItem(key);
        history = history.concat(JSON.parse(data));
      }
      setHistoryData(history);
      console.log("History data:", JSON.stringify(history, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const groupExercisesByName = (exercises) => {
    const groupedExercises = exercises.reduce((acc, exercise) => {
      if (acc[exercise.exerciseName]) {
        acc[exercise.exerciseName].push(exercise);
      } else {
        acc[exercise.exerciseName] = [exercise];
      }
      return acc;
    }, {});
  
    return groupedExercises;
  };
  

  const renderItem = ({ item, index }) => {
    if (!item) {
      console.warn(`Null item at index ${index}`);
      return null;
    }
  
    console.log("Item data:", item);
  
    const isExpanded = expandedItemIndex === index;
    const groupedExercises = groupExercisesByName(historyData);
  
    return (
      <TouchableOpacity onPress={() => toggleExpandedItem(index)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.exerciseName}: </Text>
        </View>
        {isExpanded && item.data && (
          <View style={styles.expandedContainer}>
            {item.data.map((exercise, exerciseIndex) => (
              <Text key={exerciseIndex} style={styles.itemText}>
                {exercise.reps} for {exercise.weight} on {new Date(exercise.date).toLocaleDateString()}
                {exercise.RorL ? ` (${exercise.RorL})` : ""}
                {exerciseIndex === item.data.length - 1 ? " (Current)" : " (Previous)"}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };


  const toggleExpandedItem = (index) => {
    if (expandedItemIndex === index) {
      setExpandedItemIndex(null);
    } else {
      setExpandedItemIndex(index);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise History</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          bottom: 40,
          backgroundColor: '#355C7D',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 5,
        }}
        onPress={onGoBack}
      >
        <Text style={{ color: 'white' }}>Go back</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{
        alignSelf: 'center',
        bottom: 30,
        backgroundColor: 'red',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10, // Add some margin to separate the buttons
      }}
      onPress={handleClearAsyncStorage}
    >
      <Text style={{ color: 'white' }}>Clear AsyncStorage</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  expandedContainer: {
    backgroundColor: '#3c4043',
    paddingHorizontal: 20,
    paddingVertical: 10, 
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', 
  },
  
  expandedText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default ExerciseHistory;