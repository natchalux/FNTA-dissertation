import React from 'react'
import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * RootLayout 
 * 
 * This component serves as the root layout for the application. It:
 * - Wraps the entire application with a GlobalProvider for state management
 * - Sets up the navigation stack structure for the app
 * - Configures screen options for various routes
 * 
 * @component
 * @returns {JSX.Element} 
 */
const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <GlobalProvider>
      <Stack>
        <Stack.Screen name = 'index' options= {{headerShown: false}}/> 
        <Stack.Screen name = '(auth)' options= {{headerShown: false}}/>
        <Stack.Screen name = '(tabs)' options= {{headerShown: false}}/>
        {/*<Stack.Screen name = '/search_exercise/[query]' options= {{headerShown: false}}/>*/}
        <Stack.Screen 
          name='workout' options={{headerShown: false}} 
      />
      </Stack>
    </GlobalProvider>
    </GestureHandlerRootView>
  )
}
export default RootLayout


    
