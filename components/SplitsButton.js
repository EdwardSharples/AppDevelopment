import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function SplitsButton({ label, onPress, isEditing, onUpdateLabel, onDelete }) {
  const [inputValue, setInputValue] = useState(label);

  const handleLabelUpdate = () => {
    onUpdateLabel(inputValue);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={!isEditing ? onPress : null}>
        {isEditing ? (
          <TextInput
            style={styles.buttonText}
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus={true}
            onBlur={handleLabelUpdate}
          />
        ) : (
          <Text style={styles.buttonText}>{label}</Text>
        )}
      </TouchableOpacity>
      {isEditing && onDelete ? (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 350,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
    backgroundColor: '#1e2227',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
    });