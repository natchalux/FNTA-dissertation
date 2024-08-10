import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import customButtonStyles from '../app/component_styles/CustomButtonStyles';

/**
 * CustomButton 
 * 
 * Custom Component
 * 
 * This component renders a customisable button that can be used throughout the application.
 * It handles different states like loading and disabled.
 * currently it is only utilized in Auth pages.
 * 
 * @component
 * @param {Object} props - props
 * @param {string} props.title - Text that display on the button, eg, sign in
 * @param {Function} props.handlePress - Function to call when the button is pressed
 * @param {string} [props.containerStyles] - Styles for button
 * @param {boolean} [props.isLoading=false] - Determine the loading state of the button 
 * @param {Object} [props.style] - Additional customButtonStyles for the button
 * @returns {JSX.Element} 
 * 
 */
const CustomButton = ({
  title, 
  handlePress, 
  containerStyles, 
  isLoading = false, 
  bgColor = '#60A5FA',
  style
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.5}
      style={[
        customButtonStyles.button, 
        { backgroundColor: bgColor }, 
        containerStyles, 
        isLoading && customButtonStyles.loading,
        style
      ]}
      disabled={isLoading}
    >
      <Text style={customButtonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
