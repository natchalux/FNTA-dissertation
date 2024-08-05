import { 
  SafeAreaView, 
  ScrollView,
  Text, 
  View,
  Image
} from 'react-native';
import logo from '../assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router} from 'expo-router';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

/**
 * 
 * Index or similar to app.js
 * 
 * This component serves as an entry point for the application. 
 * it displyas a blank screen with app title and a sign in button
 * optionally, user can continue to sign up if they were not already have a sign in information 
 * redirect user to the tabs/home.jsx if they are logged in
 * wrapped in GlobalContext to keep the user sign in even though they close the app
 * 
 * @component
 * @returns {JSX.Element} The rendered App component or a Redirect component.
 */

export default function App() {

  const {isLoading, isLogged} = useGlobalContext();

  // Redirect to home page if the user is logged in
  if(!isLoading && isLogged) 
    return <Redirect href='/home'/>

  return (
    <SafeAreaView className = 'bg-black h-full'>
      <ScrollView contentContainerStyle={{height : '100%'}}>
        <View className = 'w-full h-full items-center justify-center px-4'> 
          <Image 
            source={logo} 
            style={{ width: 200, height: 156 }}
          />
          <Text className = 'text-sm text-white mb-2'>Fitness Note Taking App</Text>
            <View className= 'mt-8'>
              <Text className = 'text-lg text-white mb-2'>Continue to your account</Text>
              <CustomButton
                title = 'Sign In'
                handlePress = {() => router.push('/sign-in')}
                containerStyles= 'mt-7'
              />
          </View>
        </View>
      </ScrollView>
      <StatusBar style='light'/> 
    </SafeAreaView>
  )
}
