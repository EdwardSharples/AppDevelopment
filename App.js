
// There are imports for packages i use
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';


import MainMenu from './components/MainMenu';
import SplitList from './components/SplitList';
import ExerciseHistory from './components/ExerciseHistory';
import ExerciseDay from './components/ExerciseDay';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  // State variable to control which view is displayed
  const [view, setView] = useState('mainMenu');
  const [exerciseScreens, setExerciseScreens] = useState({});
  const [advancedOffset, setAdvancedOffset] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [splitButtons, setSplitButtons] = useState([]);
  const [isEditingLabels, setIsEditingLabels] = useState(false);
  const [yOffsets, setYOffsets] = useState(Array(exerciseScreens[view]?.exercises.length || 0).fill(0));
  const [exerciseUpdates, setExerciseUpdates] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const updateExerciseName = async (day, newName, index) => {
    console.log(`Updating exercise name for day ${day}, newName ${newName}, index ${index}`);
    setExerciseScreens((prevScreens) => {
      const newScreens = { ...prevScreens };
  
      // Initialize the day key if it doesn't exist
      if (!newScreens[day]) {
        newScreens[day] = {
          exercises: [],
        };
      }
  
      newScreens[day].exercises = newScreens[day].exercises.map((exercise, i) => {
        if (i === index) {
          return { ...exercise, exerciseName: newName };
        }
        return exercise;
      });
      return newScreens;
    });
  
    // Save the updated exercise name in AsyncStorage
    try {
      const storedData = await AsyncStorage.getItem(`exercise_${day}_${index}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        parsedData.exerciseName = newName;
        await AsyncStorage.setItem(`exercise_${day}_${index}`, JSON.stringify(parsedData));
      }
    } catch (error) {
      console.error("Error updating exercise name:", error);
    }
    setExerciseUpdates((prevUpdates) => prevUpdates + 1);
  };

  const handleAddExercise = (day) => {
    setExerciseScreens((prevScreens) => {
      const newScreens = { ...prevScreens };
  
      // Initialize the day key if it doesn't exist and add a new exercise
      if (!newScreens[day]) {
        newScreens[day] = {
          exercises: [{ exerciseName: "", reps: "", weight: "", isEnabled: false, notes: "", staticHoldTime: "", dicentricTime: "", RorL: "", yOffset: 0 }],
        };
      } else {
        // Add a new exercise to the day's exercises array
        newScreens[day].exercises = [...newScreens[day].exercises, { exerciseName: "", reps: "", weight: "", isEnabled: false, notes: "", staticHoldTime: "", dicentricTime: "", RorL: "", yOffset: 0 }];
      }
  
      return newScreens;
    });
  
    // Update the advancedOffset array
    setAdvancedOffset((prevOffsets) => {
      const newOffsets = [...prevOffsets];
      newOffsets.push(0);
      return newOffsets;
    });
  };
  
  const handleUpdateYOffsets = (newYOffsets) => {
    // Update the yOffsets state here
    setYOffsets(newYOffsets);
  };
  

  useEffect(() => {
  }, [advancedOffset]);
  useEffect(() => {
  }, [expandedIndex]); 

  useEffect(() => {
    const loadSplitButtons = async () => {
      try {
        const storedSplitButtons = await AsyncStorage.getItem("splitButtons");
        if (storedSplitButtons) {
          const loadedSplitButtons = JSON.parse(storedSplitButtons);
          const reconstructedSplitButtons = loadedSplitButtons.map((button) => {
            return {
              ...button,
              onPress: () => setView(button.day),
            };
          });
          setSplitButtons(reconstructedSplitButtons);
        }
      } catch (error) {
        console.error("Error loading splitButtons:", error);
      }
    };
    
  
    loadSplitButtons();
  }, []);

  useEffect(() => {
    const loadExerciseScreens = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const exerciseScreenKeys = keys.filter((key) => key.startsWith("exercise_"));
        const storedData = await AsyncStorage.multiGet(exerciseScreenKeys);
  
        const newExerciseScreens = {};
        storedData.forEach(([key, value]) => {
          const [_, day, index] = key.split("_");
          const parsedData = JSON.parse(value);
  
          if (!newExerciseScreens[day]) {
            newExerciseScreens[day] = { exercises: [] };
          }
          newExerciseScreens[day].exercises[parseInt(index)] = parsedData;
        });
        setExerciseScreens(newExerciseScreens);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading exercise screens:", error);
      }
    };
  
    loadExerciseScreens();
  }, []);

  useEffect(() => {
    console.log("Exercise screens updated:", JSON.stringify(exerciseScreens, null, 2));
  }, [exerciseScreens]);
  
  

  const handleToggleAdvanced = (day, index) => {
    setAdvancedOffset((prevOffsets) => {
      const newOffsets = [...prevOffsets];
  
      if (expandedIndex === index) {
        setExpandedIndex(-1);
        newOffsets[index] = 0;
      } else {
        setExpandedIndex(index);
        newOffsets[index] = 200;
      }
  
      // Update exerciseScreens with new yOffset values
      setExerciseScreens((prevExerciseScreens) => {
        const updatedExerciseScreens = JSON.parse(JSON.stringify(prevExerciseScreens));
  
        // Check if the day exists in updatedExerciseScreens before accessing its exercises
        if (!updatedExerciseScreens[day]) {
          updatedExerciseScreens[day] = {
            exercises: [],
          };
        }
  
        let accumulatedOffset = 0;
        updatedExerciseScreens[day].exercises = updatedExerciseScreens[day].exercises.map((exercise, idx) => {
          const currentOffset = idx === index ? newOffsets[idx] : 0;
          const yOffset = accumulatedOffset;
          accumulatedOffset += currentOffset;
          return { ...exercise, yOffset: yOffset };
        });
  
        return updatedExerciseScreens;
      });
  
      return newOffsets;
    });
  };
  

  const updateSplitButtonLabel = (index, newLabel) => {
    setSplitButtons((prevSplitButtons) => {
      const updatedSplitButtons = [...prevSplitButtons];
      updatedSplitButtons[index].label = newLabel;
      
      try {
        AsyncStorage.setItem("splitButtons", JSON.stringify(updatedSplitButtons));
      } catch (error) {
        console.error("Error saving updated splitButtons:", error);
      }

      return updatedSplitButtons;
    });
  };  

  const createNewSplitButton = async () => {
    const newDay = `day${splitButtons.length + 1}`;
    const newLabel = `New Day ${splitButtons.length + 1}`;
    const newSplitButton = {
      label: newLabel,
      day: newDay,
      onPress: () => setView(newDay),
    };
  
    setSplitButtons([...splitButtons, newSplitButton]);
    setExerciseScreens((prevScreens) => {
      return { ...prevScreens, [newDay]: { exercises: [""] } };
    });

    try {
      const updatedSplitButtons = [...splitButtons, newSplitButton];
      await AsyncStorage.setItem("splitButtons", JSON.stringify(updatedSplitButtons));
    } catch (error) {
      console.error("Error saving splitButtons:", error);
    }
  };
  
  
  const toggleEditingLabels = () => {
    setIsEditingLabels(!isEditingLabels);
  };

  const deleteSplitButton = (indexToDelete) => {
    setSplitButtons((prevButtons) =>
      prevButtons.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleDeleteExercise = (day, index) => {
    console.log(`Deleting exercise for day ${day}, index ${index}`);

    // console.log("Exercise screens before deletion:", JSON.stringify(exerciseScreens, null, 2));

    setExerciseScreens((prevScreens) => {
      const newScreens = { ...prevScreens };
  
      if (newScreens[day]) {
        newScreens[day].exercises = newScreens[day].exercises.map((exercise, i) =>
          i === index ? { ...exercise, deleted: true } : exercise
        );
      }
  
      return newScreens;
    });

    // console.log("Exercise screens after deletion:", JSON.stringify(exerciseScreens, null, 2));
  
    // Remove the exercise data from AsyncStorage
    AsyncStorage.removeItem(`exercise_${day}_${index}`)
      .then(() => {
        console.log(`Exercise data removed for day ${day}, index ${index}`);
      })
      .catch((error) => {
        console.error("Error removing exercise data:", error);
      });
  };

  const handleGoBack = () => {
    setView('splitList');
  };

  const renderView = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#FFFFFF" />;
    }
    switch (true) {
      case view === 'mainMenu':
        return <MainMenu onViewChange={setView} />;

      case view === 'exerciseHistory':
        return <ExerciseHistory onGoBack={() => setView('mainMenu')} />;

        case view === 'splitList':
          return (
            <View style={styles.bodyContainer}>
              <SplitList
                onViewChange={setView}
                splitButtons={splitButtons}
                onSplitButtonDelete={deleteSplitButton}
                onSplitButtonLabelUpdate={updateSplitButtonLabel}
                onCreateNewSplitButton={createNewSplitButton}
                onToggleEditingLabels={toggleEditingLabels}
                isEditingLabels={isEditingLabels}
              />
            </View>
          );
    
        case view === 'split1':
          return (
            <SplitList
              onViewChange={setView}
              splitButtons={splitButtons}
              onSplitButtonDelete={deleteSplitButton}
              onSplitButtonLabelUpdate={updateSplitButtonLabel}
              onCreateNewSplitButton={createNewSplitButton}
              onToggleEditingLabels={toggleEditingLabels}
              isEditingLabels={isEditingLabels}
              yOffset={yOffset}
            />
          );
          
            default:
              if (view.startsWith('day')) {
                return (
                  <ExerciseDay
                    day={view}
                    exercises={exerciseScreens[view]?.exercises}
                    handleAddExercise={() => handleAddExercise(view)}
                    handleGoBack={handleGoBack}
                    handleToggleAdvanced={(index) => handleToggleAdvanced(view, index)}
                    expandedIndex={expandedIndex}
                    advancedOffset={advancedOffset}
                    exerciseScreens={exerciseScreens}
                    yOffsets={yOffsets}
                    updateExerciseName={(newName, index) => updateExerciseName(view, newName, index)}
                    exerciseUpdates={exerciseUpdates}
                    handleUpdateYOffsets={handleUpdateYOffsets}
                    handleDeleteExercise={handleDeleteExercise}
                  />
                );
              }
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    top: 180,
    left: 20,
  },
});
