

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [triggerTimer, setTriggerTimer] = useState(false);
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // might need to delete this
  const [weekNumbers, setWeekNumbers] = useState({});
  // might need to delete this
  const updateWeekNumber = (workoutId, newWeekNumber) => {
    setWeekNumbers(prev => ({
      ...prev,
      [workoutId]: newWeekNumber
    }));
  };

  useEffect(() => {
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