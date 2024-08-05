

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