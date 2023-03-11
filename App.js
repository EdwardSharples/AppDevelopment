import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import SplitsButton from './components/SplitsButton';
import ExerciseStyles from './components/ExerciseStyles';

const Exercise = ({ name }) => {

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{name}</Text>
      <View style={styles.lastSetContainer}>
        <Text style={styles.lastSetText}>Last set:</Text>
        <TextInput
          style={styles.lastSetInput}
          value={lastSet}
          onChangeText={setLastSet}
        />
      </View>
    </View>
  );
};

export default function App() {

  const [lastSet, setLastSet] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [staticHoldTime, setStaticHoldTime] = useState('');
  const [dicentricTime, setDicentricTime] = useState('');
  const [RorL, setRorL] = useState('');
  const [notes, setNotes] = useState('');
  const [exerciseName, setExerciseName] = useState('');

  const [view, setView] = useState('mainMenu');

  const handleSplitsPress = () => {
    setView('splitList');
  };

  const handleSplit1Press = () => {
    setView('split1');
  };

  const handleLegDay1Press = () => {
    setView('legDay1');
  };

  const saveSet = (weight, reps) => {
    setLastSet(`Last Set: ${weight} for ${reps}`);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleStaticHoldTimeChange = (text) => {
    // Check if the input is a valid number
    const isValidNumber = /^\d+$/.test(text);
    if (isValidNumber) {
      setStaticHoldTime(text + 's');
    } else {
      setStaticHoldTime(text);
    }
  };

  const handleDicentricTimeChange = (text) => {
    // Check if the input is a valid number
    const isValidNumber = /^\d+$/.test(text);
    if (isValidNumber) {
      setDicentricTime(text + ' s');
    } else {
      setDicentricTime(text);
    }
  };

  const handleExerciseNameChange = (newExerciseName) => {
    setExerciseName(newExerciseName);
  };

  const renderView = () => {
    switch (view) {
      case 'mainMenu':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Your Splits" onPress={handleSplitsPress} />
            <SplitsButton label="Post a PR" />
            <SplitsButton label="PR Viewer" />
            <SplitsButton label="Post a Physique Pic" />
            <SplitsButton label="Physique Viewer" />
          </View>
        );
      case 'splitList':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Split 1" onPress={handleSplit1Press} />
            <SplitsButton label="Split 2" />
            <SplitsButton label="Split 3" />
          </View>
        );
      
      case 'split1':
        return (
          <View style={styles.bodyContainer}>
            <SplitsButton label="Leg Day 1" onPress={handleLegDay1Press} />
            <SplitsButton label="Push Day 1" />
            <SplitsButton label="Pull Day 1" />
            <SplitsButton label="Leg Day 2" />
          </View>
        );
        
      case 'legDay1':
        
        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.bodyContainer}>
          <TextInput // Replace Text component with TextInput
              style={ExerciseStyles.exerciseName}
              value={exerciseName}
              onChangeText={handleExerciseNameChange} // Define function to update exercise name
              placeholder="Enter exercise name"
              placeholderTextColor="#ccc"
              onSubmitEditing={Keyboard.dismiss}
              editable={true}
            />
            <View style={ExerciseStyles.lastSetContainer}>
              <Text style={ExerciseStyles.lastSetLabel}>Best set:</Text>
              <View style={ExerciseStyles.lastSetTextContainer}>
                <TextInput
                style={ExerciseStyles.lastSetText} 
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric" 
                returnKeyType="done"></TextInput>
              </View>

              <Text style={ExerciseStyles.lastSetFor}>For</Text>

              <View style={ExerciseStyles.lastWeightTextContainer}>
                <TextInput
                style={ExerciseStyles.LastWeightText}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                returnKeyType="done">
              </TextInput>
              </View>

            </View>

            {showAdvanced && (
              <View style={ExerciseStyles.RorLcontainer}>
                  <TextInput
                    style={ExerciseStyles.RorLText}
                    placeholder="R or L"
                    placeholderTextColor="#355C7D"
                    value={RorL}
                    onChangeText={setRorL}
                  />
              </View>
              )}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10 }}>
              <TouchableOpacity style={ExerciseStyles.advancedButton} onPress={toggleAdvanced}>
                <Text style={ExerciseStyles.advancedButtonText}>Advanced</Text>
              </TouchableOpacity>
            </View>

            {showAdvanced && (
              <View style={{marginTop: 15}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#355C7D" }}
                    thumbColor={isEnabled ? "#030303" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text style={{marginLeft: 10}}>To Failure</Text>
                </View>
                <View style={{ marginTop: 14 }}>
                  <Text style={{ marginBottom: 5 }}>Static Hold Time:</Text>
                  <TextInput
                    style={ExerciseStyles.lastSetText}
                    value={staticHoldTime}
                    onChangeText={handleStaticHoldTimeChange}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ marginBottom: 5 }}>Dicentric Time:</Text>
                  <TextInput
                    style={ExerciseStyles.lastSetText}
                    value={dicentricTime}
                    onChangeText={handleDicentricTimeChange}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ marginBottom: 5 }}>Notes:</Text>
                  <View style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}>
                    <TextInput
                      style={{ padding: 10 }}
                      value={notes}
                      onChangeText={setNotes}
                      placeholder="Add your notes here"
                      multiline={true}
                    />
                </View>
              </View>
            </View>
            )}

          {!showAdvanced && (  
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity onPress={() => saveSet(reps, weight)} style={ExerciseStyles.saveButtonContainer}>
                    <Text style={ExerciseStyles.saveButton}>Save</Text>
                </TouchableOpacity>
                
                <Text style={[ExerciseStyles.lastSetLabel, {left: 20, top: 4 }]}>{lastSet}</Text>
            </View>
          )}
          </View>
        </TouchableWithoutFeedback>
        );
      default:
        return null;
    };
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
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
