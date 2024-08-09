import { StyleSheet } from 'react-native';

const formFieldStyles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#4B5563',
    color: '#F3F4F6',
    borderColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
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

export default formFieldStyles;
