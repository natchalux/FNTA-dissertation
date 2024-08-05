import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

/**
 * AuthLayout component for handling authentication-related screens.
 * 
 * This component sets up a Stack navigator for sign-in and sign-up screens,
 * and configures the status bar style.
 * 
 * @returns {React.ReactElement} The rendered AuthLayout component.
 */

const AuthLayout = () => {
  return (
    <>
    <Stack>
      {/**
         * Sign-In Screen
         * @type {Stack.Screen}
         */}
      <Stack.Screen
        name = 'sign-in'
        options = {{headerShown: false}}
      />
      {/**
         * Sign-Up Screen
         * @type {Stack.Screen}
         */}
      <Stack.Screen
        name = 'sign-up'
        options = {{headerShown: false}}
      />
    </Stack>
    {/* Set the status bar to be visible across all devices, matching certain non-functional requirement*/}
    <StatusBar style= 'light'/>
    </>
    
  )
}

export default AuthLayout
