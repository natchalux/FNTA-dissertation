import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    color: '#60A5FA',
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
  },
  version: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '200',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timer: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#D1D5DB',
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  workoutList: {
    flex: 1,
    marginTop: 20,
  },
  currentProgram: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  workoutItem: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  workoutItemText: {
    color: 'white',
    fontSize: 16,
  },
});

export default homeStyles;
