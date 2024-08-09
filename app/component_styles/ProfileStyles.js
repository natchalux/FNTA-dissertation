import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    padding: 16,
  },
  appTitle: {
    fontSize: 24,
    color: '#60A5FA',
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '200',
  },
  welcome: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  loading: {
    fontSize: 24,
    color: 'white',
  },
  button: {
    marginTop: 20,
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetTitle: {
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
});

export default profileStyles;
