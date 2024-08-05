import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import logo from '../../assets/logo.png';
/**
 * Sign In Auth Page.
 * 
 * This page allow user to sign in using their authetication that they set up when register to the application.
 * Upon successful login, it will redirect to the home screen.
 * 
 * @returns {JSX.Element} The rendered SignIn component.
 */

const SignIn = () => {
  // access global context for state of the user, preventing logout automatically
  const {setUser, setIsLogged} = useGlobalContext();
  // useState for email input
  const [email, setEmail] = useState('');
  // useState handle password input
  const [password, setPassword] = useState('');
  // useState to track whether the form are submitting
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  /**
   * Validates an email address.
   * 
   * @function isValidEmail
   * @param {string} email - The email address that are going to be evaluated
   * @returns {boolean} - return true upon validation, else-false
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handles form submission for sign-in.
   * 
   * Validates the form, attempts to sign in the user,
   * if the sign in successful, router will redirect the user to the homepage
   * 
   * @async function
   * @function submit
   * @throws {Error} If sign-in fails
   */
  const submit = async () => {
    if( !form.email || !form.password ) {
      Alert.alert('Error', 'Fill in all the field')
    }

    if (!isValidEmail(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    console.log("Submitting with email:", form.email);

    setSubmitting(true);
    
    try {
       const session = await signIn(form.email, form.password)
       const result = await getCurrentUser();
      //const session = await signIn(form.email, form.password);
      setUser(result);
      setIsLogged(true);

      router.replace('/home')

    } catch (error) {
      console.error("Error details:", error);
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  };



  return (
  <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-7">
          {/*Empty Logo*/}
          <Image 
            source={logo} 
            style={{ width: 200, height: 156 }}
          />
        </View>
        
        <Text className="text-xl font-bold mb-2 text-center text-white">to continue please sign in</Text>
        
        <FormField
        title = 'Email'
        value = {form.email}
        handleChangeText={(e) => setForm({...form, email: e})}
        keyboardType = 'email-address'
        />
        
        <FormField
        title = 'Password'
        value = {form.password}
        handleChangeText={(e) => setForm({...form, password: e})}
        />
        
        <CustomButton
        title= 'sign in'
        handlePress={submit}
        containerStyles='mt-7'
        isLoading={isSubmitting}/>
        
        <View>
          <Text className="text-white text-center mt-4">Do not have an account?</Text>
            <TouchableOpacity className="mt-4">
              <Link href='/sign-up' className="text-blue-400 text-center text-bold underline">Sign Up</Link>
            </TouchableOpacity>  
        </View>    
      </View>
    </SafeAreaView>
  );
}

export default SignIn
