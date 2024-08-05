import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import React from 'react'


/**
 * CustomButton 
 * 
 * Custom Component
 * 
 * This component renders a customizable button that can be used throughout the application.
 * It handles different states like loading and disabled.
 * currently it is only utilize in Auth pages.
 * 
 * @component
 * @param {Object} props - props
 * @param {string} props.title - Text that display on the button, eg, sign in
 * @param {Function} props.handlePress - Function to call when the button is pressed
 * @param {string} [props.containerStyles] - Styles for button
 * @param {boolean} [props.isLoading=false] - Determine the loading state of the button 
 * 
 * @returns {JSX.Element} The rendered CustomButton component
 * 
 * />
 */
const CustomButton = ({
  title, 
  handlePress, 
  containerStyles, 
  isLoading, 
  bgColor = 'bg-blue-400'
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.5}
      className= {`${bgColor} rounded-xl min-h-[50] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled= {isLoading}>
        <Text className = 'text-bold text-lg'>{title}</Text>
    </TouchableOpacity>
  )
};

export default CustomButton;