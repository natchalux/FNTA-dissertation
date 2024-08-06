import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native'
import React, { useState } from 'react'

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = title.toLowerCase() === 'password';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
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
          style={styles.showPasswordButton}
        >
          <Text style={styles.showPasswordText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#4B5563',
    color: '#F3F4F6',
    borderColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  showPasswordText: {
    fontSize: 14,
    color: '#F3F4F6',
    fontWeight: 'bold',
  },
});

export default FormField;
