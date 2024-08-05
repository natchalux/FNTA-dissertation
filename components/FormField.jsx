import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'
import React from 'react'
import { useState } from 'react'

/**
 * FormField Component
 * 
 * This component renders a customizable form field that can handle text inputs, and security feature such as show password. 
 * it is specifically made for the Auth pages. 
 * 
 * 
 * @component
 * @param {Object} props - props
 * @param {string} props.title - Title of the form field
 * @param {string} props.value - The value of an input
 * @param {string} [props.placeholder] - Props for custom placeholder
 * @param {Function} props.handleChangeText - Handle change text input
 * @param {Object} [props.rest] - Any additional props that might be added.
 * 
 * @returns {JSX.Element} The rendered FormField component
 * 
 */
const FormField = ({
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = title.toLowerCase() === 'password';
  return (
    <View>
      <TextInput
          className="w-full bg-gray-600 text-gray-100 border border-gray-900 rounded-lg py-3 px-4 mb-4"
          placeholder= {title}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry= {isPassword && !showPassword}
        />
        {title === 'Password' && (
            <TouchableOpacity 
                onpress = {() => setShowPassword(!showPassword)}
                className = 'absolute right-3 top-4 -translate-y-1/2'
            >
                <Text className = 'text-sm text-gray-100 font-bold'>
                    {showPassword? 'Hide' : 'Show'}
                </Text>
            </TouchableOpacity>
        )}
    </View>
  )
};

export default FormField