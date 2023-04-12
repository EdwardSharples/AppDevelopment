import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseHistory = ( {onGoBack} ) => {
  const [historyData, setHistoryData] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const exerciseKeys = keys.filter((key) => key.startsWith('exercise_'));
      const history = await Promise.all(
        exerciseKeys.map(async (key) => {
          const data = await AsyncStorage.getItem(key);
          return JSON.parse(data);
        })
      );
      setHistoryData(history);
      console.log("History data:", history);
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({ item, index }) => {

    if (!item) {
      console.warn(`Null item at index ${index}`);
      return null;
    }

    console.log("Item data:", item);

    const isExpanded = expandedItemIndex === index;
  
    return (
      <TouchableOpacity onPress={() => toggleExpandedItem(index)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.exerciseName}: </Text>
          <Text style={styles.itemText}>{item.reps} for {item.weight}</Text>
        </View>
        {isExpanded && (
          <View style={styles.expandedContainer}>
            <Text style={styles.expandedText}>To Failure: {item.isEnabled ? 'Yes' : 'No'}</Text>
            <Text style={styles.expandedText}>Static Hold Time: {item.staticHoldTime} seconds</Text>
            <Text style={styles.expandedText}>Dicentric Time: {item.dicentricTime} seconds</Text>
            <Text style={styles.expandedText}>Notes: {item.notes}</Text>
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
    width: '75%',
    left: 30,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  expandedContainer: {
    backgroundColor: '#3c4043',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
  },
  expandedText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default ExerciseHistory;