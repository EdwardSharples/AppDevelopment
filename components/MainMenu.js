import React from 'react';
import { StyleSheet, View } from 'react-native';

import SplitsButton from './SplitsButton';

const MainMenu = ({ onViewChange }) => {
  const handleSplitsPress = () => {
    onViewChange('splitList');
  };

  const handleExerciseHistoryPress = () => {
    onViewChange('exerciseHistory');
  };

  return (
    <View style={styles.bodyContainer}>
      <SplitsButton label="Your Split" onPress={handleSplitsPress} />
      <SplitsButton label="Exercise History" onPress={handleExerciseHistoryPress} />
      {/* Other SplitsButton components */}
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

export default MainMenu;
