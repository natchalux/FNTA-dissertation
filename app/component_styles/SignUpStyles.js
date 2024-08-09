import { StyleSheet } from 'react-native';

const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  titleHighlight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonContainer: {
    marginTop: 28,
  },
  signUpText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
  signUpLinkContainer: {
    marginTop: 16,
    marginLeft: 8,
  },
  signUpLink: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default signUpStyles;