import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert,
  StyleSheet
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
 * This page allows the user to sign in using their authentication credentials.
 * Upon successful login, it will redirect to the home screen.
 * 
 * @returns {JSX.Element} The rendered SignIn component.
 */

const SignIn = () => {
  // access global context for state of the user, preventing logout automatically
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({ email: '', password: '' });
  // useState to track whether the form are submitting
  const [isSubmitting, setSubmitting] = useState(false);

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
   * @function submit
   * @throws {Error} If sign-in fails
   */
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Fill in all the fields');
      return;
    }

    if (!isValidEmail(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    console.log("Submitting with email:", form.email);

    setSubmitting(true);
    
    try {
      const session = await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLogged(true);

      router.replace('/home');
    } catch (error) {
      console.error("Error details:", error);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="light" />
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={logo} 
            style={styles.logo}
          />
        </View>
        
        <Text style={styles.title}>To continue please sign in</Text>
        
        <FormField
          title='Email'
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType='email-address'
        />
        
        <FormField
          title='Password'
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        
        <CustomButton
          title='Sign In'
          handlePress={submit}
          containerStyles={styles.buttonContainer}
          isLoading={isSubmitting}
        />
        
        <View>
          <Text style={styles.signUpText}>Do not have an account?</Text>
          <TouchableOpacity style={styles.signUpLinkContainer}>
            <Link href='/sign-up' style={styles.signUpLink}>Sign Up</Link>
          </TouchableOpacity>  
        </View>    
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  testBox: {
    borderWidth: 1,
    borderColor: 'red',
    width: 100,
    height: 100,
    backgroundColor: '#FFFAE7',
  },
  testText: {
    color: 'blue',
    fontSize: 20,
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

export default SignIn;
