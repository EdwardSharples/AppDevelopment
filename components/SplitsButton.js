import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function SplitsButton({ label, onPress }) {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
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
    });