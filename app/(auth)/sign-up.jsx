import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import signUpStyles from '../component_styles/SignInStyles';
/**
 * Sign Up Auth Page.
 * 
 * This page allow user to sign up using their information such as email, password and username. With that they can use email and password to log in later.
 * 
 * @returns {JSX.Element} The rendered SignUp component.
 */

const SignUp = () => {
  // access global context for state of the user, preventing logout automatically
  const {setUser, setIsLogged} = useGlobalContext();
  // useState for email input
  const [email, setEmail] = useState('');
  // useState fort password input
  const [password, setPassword] = useState('');
  // useState to track whether the form is submitting
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
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
   * Handles form submission for sign-up.
   * 
   * Validates the form, attempts to sign in the user,
   * if the sign in successful, router will redirect the user to the homepage
   *
   * @function submit
   * @throws {Error} If sign-up fails
   */
  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Fill in all the field')
    }

    if (!isValidEmail(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    console.log("Submitting with email:", form.email);

    setSubmitting(true);
    
    try {
      const result = await createUser(form.email, form.password, form.username)

      console.log("User created:", result);
      setUser(result);
      setIsLogged(true);
      //const session = await signIn(form.email, form.password);

      router.replace('/home')

    } catch (error) {
      console.error("Error details:", error);
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  };

  return (

    <SafeAreaView style={signUpStyles.container}>
    <StatusBar style="light"/>
    <View style={signUpStyles.formContainer}>
      <View style={signUpStyles.titleRow}>
        <Text style={signUpStyles.title}>Sign Up to FNTA</Text>
      </View>
      <FormField
        title='Username'
        value={form.username}
        handleChangeText={(e) => setForm({ ...form, username: e })}
      />
      <FormField
        title='Email'
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e.trim() })}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <FormField
        title='Password'
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
      />
      <CustomButton
        title='Sign Up'
        handlePress={submit}
        containerStyles={signUpStyles.buttonContainer}
        isLoading={isSubmitting}
      />
      <View>
        <Text style={signUpStyles.signUpText}>Got an account already?</Text>
        <TouchableOpacity style={signUpStyles.signUpLinkContainer}>
          <Link href='/sign-in' style={signUpStyles.signUpLink}>Sign In</Link>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);
};

export default SignUp
