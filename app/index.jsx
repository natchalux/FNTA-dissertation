import { 
  SafeAreaView, 
  ScrollView,
  Text, 
  View,
  Image,
  StyleSheet
} from 'react-native';
import logo from '../assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

/**
 * 
 * Index or similar to app.js
 * 
 * This component serves as an entry point for the application. 
 * it displays a blank screen with app title and a sign in button
 * optionally, user can continue to sign up if they were not already have a sign in information 
 * redirect user to the tabs/home.jsx if they are logged in
 * wrapped in GlobalContext to keep the user sign in even though they close the app
 * 
 * @component
 * @returns {JSX.Element} The rendered App component or a Redirect component.
 */

export default function App() {

  const { isLoading, isLogged } = useGlobalContext();

  // Redirect to home page if the user is logged in
  if (!isLoading && isLogged) 
    return <Redirect href='/home' />

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image 
            source={logo} 
            style={styles.logo}
          />
          <Text style={styles.appTitle}>Fitness Note Taking App</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.signInPrompt}>Continue to your account</Text>
            <CustomButton
              title='Sign In'
              handlePress={() => router.push('/sign-in')}
              containerStyles={styles.signInButton}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style='light' /> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
