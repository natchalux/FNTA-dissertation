import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/appwrite';

/**
 * GlobalContext
 * 
 * This context provides global state management across the application, 
 * this including user authentication status, triggering resting timer, and other shared state.
 * 
 */
const GlobalContext = createContext();

/**
 * Create a custom hook for globalcontext usage.
 * 
 * 
 * @returns {Object} The context value containing global state and functions.
 */
export const useGlobalContext = () => useContext(GlobalContext);

/**
 * GlobalProvider Component
 * 
 * The globalcontext wrapped around the application and provide global state that can be use around the application
 * The componenet manage user authentication, time triggering and other state such as week number within the manage workout screen
 * to be accessible throughout the app.
 * 
 * @component
 * @param {Object} props 
 * @param {React.ReactNode} props.children - The children components
 * @returns {JSX.Element} 
 */
const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [triggerTimer, setTriggerTimer] = useState(false);
  const [weekNumbers, setWeekNumbers] = useState({});

  /**
   * Formats the given time in seconds into HH:MM:SS format.
   * 
   * @function
   * @name formatTime
   * @param {number} seconds - The time in seconds to format.
   * @returns {string} The formatted time as a string.
   */
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Updates the week number for a specific workout.
   * 
   * @function
   * @name updateWeekNumber
   * @param {string} workoutId - Id of the workouts
   * @param {string} newWeekNumber - new week number to set.
   */

  const updateWeekNumber = (workoutId, newWeekNumber) => {
    setWeekNumbers(prev => ({
      ...prev,
      [workoutId]: newWeekNumber
    }));
  };

  useEffect(() => {
    /**
     * Fetches the current user from the Appwrite to determine if they are logged in.
     * Updates the global state with user information. 
     * Set to null if not logged in
     */
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    /**
     * Starts a timer that increments the `timeElapsed` state every second.
     * This shows the timer running when the user logged for the entire duration of using the app
     */
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);


  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        timeElapsed,
        formatTime,
        weekNumbers,
        updateWeekNumber,
        triggerTimer,
        setTriggerTimer
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;