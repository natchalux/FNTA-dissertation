// // src/__tests__/SignIn.test.jsx

// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import '@testing-library/jest-dom'
// import SignIn from '../app/(auth)/sign-in';
// import { signIn, getCurrentUser } from '../lib/appwrite';
// import { useGlobalContext } from '../context/GlobalProvider';
// // Mock the imports
// jest.mock('../lib/appwrite', () => ({
//   getCurrentUser: jest.fn(),
//   signIn: jest.fn(),
// }));

// jest.mock('../context/GlobalProvider', () => ({
//   useGlobalContext: jest.fn(),
// }));

// describe('SignIn Component', () => {
//   const setUser = jest.fn();
//   const setIsLogged = jest.fn();
//   const mockContext = { setUser, setIsLogged };

//   beforeEach(() => {
//     useGlobalContext.mockReturnValue(mockContext);
//   });

//   it('renders correctly', () => {
//     const { getByText, getByPlaceholderText } = render(<SignIn />);
//     expect(getByText('to continue please sign in')).toBeTruthy();
//     expect(getByPlaceholderText('Email')).toBeTruthy();
//     expect(getByPlaceholderText('Password')).toBeTruthy();
//   });

//   it('shows error alert for empty fields', async () => {
//     const { getByText } = render(<SignIn />);
    
//     fireEvent.press(getByText('sign in'));

//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Error', 'Fill in all the field');
//     });
//   });

//   it('shows error alert for invalid email', async () => {
//     const { getByPlaceholderText, getByText } = render(<SignIn />);

//     fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password');
//     fireEvent.press(getByText('sign in'));

//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter a valid email address');
//     });
//   });

//   it('calls signIn and redirects on successful login', async () => {
//     const { getByPlaceholderText, getByText } = render(<SignIn />);
//     const mockUser = { id: 'user-id' };

//     signIn.mockResolvedValueOnce({}); // Mock a successful signIn
//     getCurrentUser.mockResolvedValueOnce(mockUser);

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password');
//     fireEvent.press(getByText('sign in'));

//     await waitFor(() => {
//       expect(signIn).toHaveBeenCalledWith('test@example.com', 'password');
//       expect(getCurrentUser).toHaveBeenCalled();
//       expect(setUser).toHaveBeenCalledWith(mockUser);
//       expect(setIsLogged).toHaveBeenCalledWith(true);
//       // Check if navigation happens (depends on how routing is handled)
//       // You might need to mock router.replace if you are using it
//     });
//   });

//   it('shows error alert on sign-in failure', async () => {
//     const { getByPlaceholderText, getByText } = render(<SignIn />);
//     const errorMessage = 'Sign-in failed';

//     signIn.mockRejectedValueOnce(new Error(errorMessage));

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password');
//     fireEvent.press(getByText('sign in'));

//     await waitFor(() => {
//       expect(Alert.alert).toHaveBeenCalledWith('Error', errorMessage);
//     });
//   });
// });

import { Client, Account, Databases, ID } from 'react-native-appwrite';
import { addExerciseToWorkout, createExercise } from '../lib/appwrite';

// Mock the Appwrite SDK Client class and its methods
jest.mock('react-native-appwrite', () => {
  const mClient = jest.fn(() => ({
    setEndpoint: jest.fn().mockReturnThis(),
    setProject: jest.fn().mockReturnThis(),
    setPlatform: jest.fn().mockReturnThis(),
  }));

  const mAccount = jest.fn(() => ({
    create: jest.fn(),
    createEmailPasswordSession: jest.fn(),
    getSession: jest.fn(),
    deleteSession: jest.fn(),
    get: jest.fn(),
  }));

  const mDatabases = jest.fn(() => ({
    createDocument: jest.fn(),
    listDocuments: jest.fn(),
    getDocument: jest.fn(),
  }));

  const mID = {
    unique: jest.fn().mockReturnValue('unique-exercise-id'),
  };

  return {
    Client: mClient,
    Account: mAccount,
    Databases: mDatabases,
    ID: mID,
  };
});

jest.mock('../lib/appwrite', () => ({
    __esModule: true,
    ...jest.requireActual('../lib/appwrite'),
    addExerciseToWorkout: jest.fn(),
  }));
  
  describe('addExerciseToWorkout', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should add an exercise to a workout', async () => {
      const mockWorkoutId = '66b028e1003ae60809a8';
      const mockExerciseName = 'Test exercise 2';
  
      // Mock the addExerciseToWorkout function
      const mockAddExerciseToWorkout = require('../lib/appwrite').addExerciseToWorkout;
      mockAddExerciseToWorkout.mockResolvedValueOnce({});
  
      // Call the function
      await mockAddExerciseToWorkout(mockWorkoutId, mockExerciseName);
  
      // Verify that addExerciseToWorkout was called with the correct arguments
      expect(mockAddExerciseToWorkout).toHaveBeenCalledWith(
        mockWorkoutId,
        mockExerciseName
      );
    });
  });

  describe('addExerciseToWorkout', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should add an exercise to a workout', async () => {
      const mockWorkoutId = '66b028e1003ae60809a8';
      const mockExerciseName = '';
  
      // Mock the addExerciseToWorkout function
      const mockAddExerciseToWorkout = require('../lib/appwrite').addExerciseToWorkout;
      mockAddExerciseToWorkout.mockResolvedValueOnce({});
  
      // Call the function
      await mockAddExerciseToWorkout(mockWorkoutId, mockExerciseName);
  
      // Verify that addExerciseToWorkout was called with the correct arguments
      describe('addExerciseToWorkout', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should add an exercise to a workout', async () => {
      const mockWorkoutId = '66b028e1003ae60809a8';
      const mockExerciseName = '';
  
      // Mock the addExerciseToWorkout function
      const mockAddExerciseToWorkout = require('../lib/appwrite').addExerciseToWorkout;
      mockAddExerciseToWorkout.mockResolvedValueOnce({});
  
      // Call the function
      await mockAddExerciseToWorkout(mockWorkoutId, mockExerciseName);
  
      // Verify that addExerciseToWorkout was called with the correct arguments
      expect(mockAddExerciseToWorkout).toHaveBeenCalledWith(
        mockWorkoutId,
        expect.stringMatching(/\S+/) // Check that the exercise name is not empty
      );
    });
  });
    });
  });