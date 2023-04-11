import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SplitsButton from './SplitsButton';

const SplitList = ({ onViewChange, splitButtons, onSplitButtonDelete, onSplitButtonLabelUpdate, onCreateNewSplitButton, onToggleEditingLabels, isEditingLabels }) => {
  return (
    <View style={{ alignItems: 'flex-start' }}>
      {splitButtons.map((splitButton, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      <TouchableOpacity onPress={onToggleEditingLabels}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', top: 150, left: 35, }}>{isEditingLabels ? 'Done' : 'Edit Buttons'}</Text>
      </TouchableOpacity>
      <SplitsButton label="Go back" onPress={() => onViewChange('mainMenu')} />
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
  });

export default SplitList;
