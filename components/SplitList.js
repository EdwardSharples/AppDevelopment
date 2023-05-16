import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SplitsButton from './SplitsButton';
import { AntDesign } from '@expo/vector-icons'; 

const SplitList = ({ onViewChange, splitButtons, onSplitButtonDelete, onSplitButtonLabelUpdate, onCreateNewSplitButton, onToggleEditingLabels, isEditingLabels }) => {
  return (
    <View style={{ alignItems: 'flex-start', right: 30, top: 50, }}>
        <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
        }}
        onPress={() => onViewChange('mainMenu')}
      >
        <Text style={styles.goBackText}>{"\u003C"} Home</Text>
      </TouchableOpacity>
      {splitButtons.map((splitButton, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', }}>
          <SplitsButton
            label={splitButton.label}
            onPress={splitButton.onPress}
            isEditing={isEditingLabels}
            onUpdateLabel={(newLabel) => onSplitButtonLabelUpdate(index, newLabel)}
            onDelete={() => onSplitButtonDelete(index)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginLeft: 10,
            }}
            onPress={() => onSplitButtonDelete(index)}
          >
            <Text style={{ color: 'white' }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      <SplitsButton
        label="Create Another Day"
        onPress={onCreateNewSplitButton}
      />
      <TouchableOpacity onPress={onToggleEditingLabels} style={{ top: 140, left: 40 }}>
        <View style={{ alignItems: 'center' }}>
          {isEditingLabels ? (
            <>
              <AntDesign name="check" size={24} color="#355C7D" />
              <Text style={{ fontSize: 10, color: '#355C7D' }}>Done</Text>
            </>
          ) : (
            <>
              <AntDesign name="edit" size={24} color="#355C7D" />
              <Text style={{ fontSize: 10, color: '#355C7D' }}>Edit</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    bodyContainer: {
      position: 'absolute',
      top: 50,
      left: 20,
      alignItems: 'flex-start',
    },
    goBackText: {
      position: 'absolute',
      bottom: 30,
      left: 25,
      fontSize: 18,
      height: 20,
      width: 90,
      color: '#355C7D',
    },
  });

export default SplitList;
