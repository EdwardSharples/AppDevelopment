import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lastSetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: 150,
    height: 40,
  },
  lastSetLabel: {
    fontSize: 12,
    marginRight: 5,
  },
  lastSetTextContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  lastSetText: {
    fontSize: 16,
  },
  lastSetFor: {
    position: 'absolute',
    left: 112.5,
  },
  LastWeightText: {
    fontSize: 16,
  },
  saveButtonContainer: {
    backgroundColor: 'grey',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  advancedButton: {
    backgroundColor: '#355C7D',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 7,
  },
  lastWeightTextContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    left: 40,
  },
  RorLcontainer: {
    position: 'absolute',
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    left: 200,
    top: 37,
  },
  RorLText: {
    fontSize: 16,
    color: 'black',
  },
});

export default styles;
