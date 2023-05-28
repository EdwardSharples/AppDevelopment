import { StyleSheet, Dimensions } from 'react-native';
import { scale } from './utils';

const screenWidth = Dimensions.get('window').width;

const textColor = '#EDEDED';

const styles = StyleSheet.create({
  exerciseName: {
    fontSize: scale(18, 1.2),
    fontWeight: 'bold',
    marginBottom: 10,
    color: textColor,
  },
  lastSetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: 150,
    height: 40,
    color: textColor,
  },
  lastSetLabel: {
    fontSize: scale(12, 1.2),
    marginRight: 5,
    color: textColor,
  },
  lastSetTextContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: textColor,
    width: screenWidth * 0.13,
  },
  lastSetText: {
    fontSize: scale(16, 1.2),
    color: textColor,
  },
  lastSetFor: {
    position: 'absolute',
    left: 125,
    color: textColor,
  },
  LastWeightText: {
    fontSize: scale(16, 1.2),
    color: textColor,
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
    fontSize: scale(18, 1.2),
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    left: 40,
    width: screenWidth * 0.14,
  },
  RorLcontainer: {
    position: 'absolute',
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    left: 240,
    top: 68.5,
    width: 55,
    height: 35,
  },
  RorLText: {
    fontSize: 16,
    color: 'black',
  },
  toFailureText: {
    marginLeft: 10,
    color: textColor,
  },
  staticHoldTimeLabel: {
    marginBottom: 5,
    color: textColor,
  },
  dicentricTimeLabel: {
    marginBottom: 5,
    color: textColor,
  },
  notesLabel: {
    marginBottom: 5,
    color: textColor,
  },
});

export default styles;
