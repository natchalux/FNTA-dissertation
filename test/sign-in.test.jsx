// src/__tests__/SignIn.test.jsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom'
import SignIn from '../app/(auth)/sign-in';
import { signIn, getCurrentUser } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
// Mock the imports
jest.mock('../lib/appwrite', () => ({
  getCurrentUser: jest.fn(),
  signIn: jest.fn(),
}));

jest.mock('../context/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

describe('SignIn Component', () => {
  const setUser = jest.fn();
  const setIsLogged = jest.fn();
  const mockContext = { setUser, setIsLogged };

  beforeEach(() => {
    useGlobalContext.mockReturnValue(mockContext);
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignIn />);
    expect(getByText('to continue please sign in')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows error alert for empty fields', async () => {
    const { getByText } = render(<SignIn />);
    
    fireEvent.press(getByText('sign in'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Fill in all the field');
    });
  });

  it('shows error alert for invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('sign in'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter a valid email address');
    });
  });

  it('calls signIn and redirects on successful login', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const mockUser = { id: 'user-id' };

    signIn.mockResolvedValueOnce({}); // Mock a successful signIn
    getCurrentUser.mockResolvedValueOnce(mockUser);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('sign in'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('test@example.com', 'password');
      expect(getCurrentUser).toHaveBeenCalled();
      expect(setUser).toHaveBeenCalledWith(mockUser);
      expect(setIsLogged).toHaveBeenCalledWith(true);
      // Check if navigation happens (depends on how routing is handled)
      // You might need to mock router.replace if you are using it
    });
  });

  it('shows error alert on sign-in failure', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const errorMessage = 'Sign-in failed';

    signIn.mockRejectedValueOnce(new Error(errorMessage));

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('sign in'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', errorMessage);
    });
  });
});

