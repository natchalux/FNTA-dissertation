import { StyleSheet } from 'react-native';

const timerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  elapsedTime: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#374151',
    color: 'white',
    textAlign: 'center',
    width: 64,
    height: 48,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  colon: {
    fontSize: 24,
    color: 'white',
  },
  timer: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  startButton: {
    backgroundColor: '#10B981',
  },
  pauseButton: {
    backgroundColor: '#FBBF24',
  },
  resetButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  presetHeader: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  presetInfo: {
    color: '#3B82F6',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  customButton: {
    marginBottom: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sheetSection: {
    marginBottom: 16,
  },
  sheetSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sheetSectionContent: {
    fontSize: 16,
    marginBottom: 4,
  },
  presetContainer: {
    paddingVertical: 20,  // Add padding to increase space overall
  },
});

export default timerStyles;
