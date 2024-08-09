import { 
  SafeAreaView, 
  ScrollView,
  Text, 
  View,
  Image,
  AppStylesheet
} from 'react-native';
import logo from '../assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import AppStyles from './component_styles/AppStyles';

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
    <SafeAreaView style={AppStyles.container}>
      <ScrollView contentContainerStyle={AppStyles.scrollView}>
        <View style={AppStyles.innerContainer}>
          <Image 
            source={logo} 
            style={AppStyles.logo}
          />
          <Text style={AppStyles.appTitle}>Fitness Note Taking App</Text>
          <View style={AppStyles.buttonContainer}>
            <Text style={AppStyles.signInPrompt}>Continue to your account</Text>
            <CustomButton
              title='Sign In'
              handlePress={() => router.push('/sign-in')}
              containerAppStyles={AppStyles.signInButton}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style='light' /> 
    </SafeAreaView>
  )
};

