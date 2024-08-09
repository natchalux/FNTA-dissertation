import { StyleSheet } from 'react-native';

const customButtonStyles = StyleSheet.create({
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

export default customButtonStyles;
