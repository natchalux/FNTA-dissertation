import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 156,
  },
  appTitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 32,
  },
  signInPrompt: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  signInButton: {
    marginTop: 28,
  },
});

export default AppStyles;
