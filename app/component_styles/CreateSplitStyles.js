import { StyleSheet } from 'react-native';

const createSplitStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#4B5563',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#4B5563',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
  },
  exerciseText: {
    color: 'white',
    marginBottom: 8,
  },
});

export default createSplitStyles;
