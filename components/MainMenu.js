import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import quotes from './quotes';
import SplitsButton from './SplitsButton';

const MainMenu = ({ onViewChange }) => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const handleSplitsPress = () => {
    onViewChange('splitList');
  };

  const handleExerciseHistoryPress = () => {
    onViewChange('exerciseHistory');
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.greetingText}>{getGreeting()}</Text>
      <View style={styles.buttonContainer}>
        <SplitsButton label="Your Split" onPress={handleSplitsPress} />
        <SplitsButton label="Exercise History" onPress={handleExerciseHistoryPress} />
      </View>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{quote.author}: "{quote.quote}"</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    top: 40,
  },
  greetingText: {
    color: 'white',
    fontSize: 23,
    marginBottom: 20,
    top: 20,
    left: 30,
    fontWeight: 'bold',
  },
  quoteContainer: {
    position: 'absolute',
    top: 710, 
    width: 380,
    height: 100,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#1e2227',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    left: -5,
  },
  quoteText: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default MainMenu;
