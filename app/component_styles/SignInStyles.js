import { StyleSheet } from 'react-native';

const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 200,
    height: 156,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
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
  },
  signUpLink: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default signInStyles;