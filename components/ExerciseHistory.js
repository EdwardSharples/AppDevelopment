import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
    <>
      <View style={styles.goBackContainer}>
        <TouchableOpacity onPress={onGoBack}>
          <Text style={styles.goBackText}>{"\u003C"} Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Exercise History</Text>
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: 60 }}
        />
        <TouchableOpacity
          onPress={handleClearAsyncStorage}
          style={{ position: 'absolute', bottom: 35, right: 30 }} // adjust bottom and right values as needed
        >
          <Icon name="delete" size={24} color="#355C7D" />
        </TouchableOpacity>
      </View>
    </>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 160,
    paddingVertical: 17.5,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#1e2227'
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
  },
  expandedContainer: {
    backgroundColor: '#3c4043',
    paddingHorizontal: 20,
    paddingVertical: 10, 
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', 
    backgroundColor: '#355C7D',
  },
  expandedText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  goBackContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  goBackText: {
    fontSize: 18,
    color: '#355C7D',
  },
});

export default ExerciseHistory;