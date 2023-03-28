import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';


import ExerciseScreen from './components/ExerciseScreen';
import SplitsButton from './components/SplitsButton';
import ExerciseHistory from './components/ExerciseHistory';


export default function App() {
  const [view, setView] = useState('mainMenu');
  const [exerciseScreens, setExerciseScreens] = useState([""]); // Add a state for exercise screens
  const [advancedOffset, setAdvancedOffset] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  
  const updateExerciseName = (newName, index) => {
    const newExerciseScreens = [...exerciseScreens];
    newExerciseScreens[index] = newName;
    setExerciseScreens(newExerciseScreens);
  };

  const renderExerciseScreens = () => {
    return exerciseScreens.map((exerciseName, index) => {
      const yOffset = exerciseScreens
        .slice(0, index)
        .reduce((acc, _, i) => acc + 165 + (advancedOffset[i] || 0), 0);
      return (
        <ExerciseScreen
          key={index}
          index={index}
          exerciseName={exerciseName}
          yOffset={yOffset}
          handleExerciseNameChange={(newName) => updateExerciseName(newName, index)}
          onToggleAdvanced={() => handleToggleAdvanced(index)}
          expanded={expandedIndex === index}
        />
      );
    });
  };

  const handleToggleAdvanced = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
      setAdvancedOffset((prevOffsets) => {
        const newOffsets = [...prevOffsets];
        newOffsets[index] = 0;
        return newOffsets;
      });
    } else {
      setExpandedIndex(index);
      setAdvancedOffset((prevOffsets) => {
        const newOffsets = [...prevOffsets];
        newOffsets[index] = 200;
        return newOffsets;
      });
    }
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

  const handleExerciseHistoryPress = () => {
    setView('exerciseHistory');
  };

  const handleGoBack = () => {
    setView('split1');
  };

  const handleGoback2 = () => {
    setView('splitList')
  }

  const handleGoback3 = () => {
    setView('mainMenu')
  }

  const renderView = () => {
    switch (view) {
      case 'mainMenu':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Your Splits" onPress={handleSplitsPress} />
            <SplitsButton label="Exercise History" onPress={handleExerciseHistoryPress} />
            {/* Other SplitsButton components */}
          </View>
        );
      case 'splitList':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Split 1" onPress={handleSplit1Press} />
            <SplitsButton label="Go back" onPress={handleGoback3} />
            {/* Other SplitsButton components */}
          </View>
        );
      case 'split1':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Leg Day 1" onPress={handleLegDay1Press} />
            <SplitsButton label="Go back" onPress={handleGoback2} />
            {/* Other SplitsButton components */}
          </View> 
        );
        case 'legDay1':
          return (
            <SafeAreaView style={styles.container}>
              <ScrollView
                style={{ flex: 1, paddingTop: 10 }}
                contentContainerStyle={{right: 140, paddingHorizontal: 150 }} // Set minHeight to the height of the screen
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
                    <Text style={{ color: 'white', left: 250 }}>Add Exercise</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-start',
                      left: 265,
                      top: 20
                    }}
                    onPress={handleGoBack}
                  >
                    <Text style={{ color: 'white' }}>Go Back</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          );
          case 'exerciseHistory':
            return <ExerciseHistory onGoBack={() => setView('mainMenu')} />;
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
