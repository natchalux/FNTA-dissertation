
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

/**
 * TabsLayout
 * 
 * This TabsLayout setup a tabs navigation for different page within the application.
 * Utilizing iconName to access appropriate icons for each tab. 
 * 
 * 
 * @returns {JSX.Element} The rendered TabsLayout component.
 */
const TabsLayout = () => {
  return (
   <>
   {/**
         *  Tabs icon selector via Ionicons
         * @return {Ionicons}
         */}
   <Tabs
    screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
        if (route.name === 'home') {
          iconName = 'home-outline';
        } else if (route.name === 'timer') {
          iconName = 'timer-outline';
        } else if (route.name === 'weight') {
          iconName = 'body-outline';
        } else if (route.name === 'profile') {
            iconName = 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000000'
        },
      })}>
    <Tabs.Screen name = 'home' options={{ title: 'Home', headerShown: false}}/>
    <Tabs.Screen name = 'timer' options={{ title: 'Timer', headerShown: false}}/>
    <Tabs.Screen name = 'profile' options={{ title: 'Menu', headerShown: false}}/>
   </Tabs>
   </>
  )
}

export default TabsLayout

