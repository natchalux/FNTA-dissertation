import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import formFieldStyles from '../app/component_styles/FormFieldStyles';

/**
 * FormField Component
 * 
 * This component renders a customizable form field that can handle text inputs, and security features such as show password. 
 * It is specifically made for the Auth pages. 
 * 
 * @component
 * @param {Object} props - props
 * @param {string} props.title - Title of the form field
 * @param {string} props.value - The value of an input
 * @param {string} [props.placeholder] - Props for custom placeholder
 * @param {Function} props.handleChangeText - Handle change text input
 * @param {Object} [props.rest] - Any additional props that might be added.
 * @returns {JSX.Element} 
 * 
 */
const FormField = ({
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = title.toLowerCase() === 'password';

  return (
    <View style={formFieldStyles.container}>
      <TextInput
        style={formFieldStyles.input}
        placeholder={title}
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {isPassword && (
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={formFieldStyles.showPasswordButton}
        >
          <Text style={formFieldStyles.showPasswordText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


export default FormField;
