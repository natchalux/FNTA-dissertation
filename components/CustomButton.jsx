import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import React from 'react';

/**
 * CustomButton 
 * 
 * Custom Component
 * 
 * This component renders a customizable button that can be used throughout the application.
 * It handles different states like loading and disabled.
 * currently it is only utilized in Auth pages.
 * 
 * @component
 * @param {Object} props - props
 * @param {string} props.title - Text that display on the button, eg, sign in
 * @param {Function} props.handlePress - Function to call when the button is pressed
 * @param {string} [props.containerStyles] - Styles for button
 * @param {boolean} [props.isLoading=false] - Determine the loading state of the button 
 * @param {Object} [props.style] - Additional styles for the button
 * 
 * @returns {JSX.Element} The rendered CustomButton component
 */
const CustomButton = ({
  title, 
  handlePress, 
  containerStyles, 
  isLoading = false, 
  bgColor = '#60A5FA', // Default color for bg-blue-400
  style
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.5}
      style={[
        styles.button, 
        { backgroundColor: bgColor }, 
        containerStyles, 
        isLoading && styles.loading,
        style
      ]}
      disabled={isLoading}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  loading: {
    opacity: 0.5,
  },
});

export default CustomButton;
