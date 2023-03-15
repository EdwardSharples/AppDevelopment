import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  StyleSheet,
} from 'react-native';


import ExerciseStyles from './ExerciseStyles';

const Exercise = ({ exerciseName, handleExerciseNameChange, yOffset }) => {
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [staticHoldTime, setStaticHoldTime] = useState('');
  const [dicentricTime, setDicentricTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [RorL, setRorL] = useState('');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const toggleAdvanced = () => setShowAdvanced(previousState => !previousState);

  const handleStaticHoldTimeChange = (text) => setStaticHoldTime(text.replace(/[^0-9]/g, ''));

  const handleDicentricTimeChange = (text) => setDicentricTime(text.replace(/[^0-9]/g, ''));

  const saveSet = (reps, weight) => {
    // Save set to database or local storage
  };

  const lastSet = `${reps} x ${weight}`;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.bodyContainer, { marginTop: 10 + yOffset }]}>
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
    left: 5,
    alignItems: 'flex-start',
    paddingBottom: 40, // add some padding at the bottom to make room for the button
    marginBottom: 20, 
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default Exercise;