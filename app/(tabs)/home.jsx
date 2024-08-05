import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
} from 'react-native';
import { 
  getCurrentUser, 
  createWorkout, 
  getUserWorkouts
} from '../../lib/appwrite';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CreateSplit from '../../components/CreateSplit';
import { useGlobalContext } from '../../context/GlobalProvider';

/**
 * Home Component
 * 
 * This page hosting a main functionality of the app where user can add new workout and exercise in those workout files that they created.
 * 
 * 
 * @returns {JSX.Element} The rendered Home component.
 */

const Home = () => {
  // control the visibility of the modal, when creating a new split
  const [modalVisible, setModalVisible] = useState(false);
  // manage the step when creating the split
  const [step, setStep] = useState(1);
  // storing the new split name
  const [splitName, setSplitName] = useState('');
  // store the workouts
  const [workouts, setWorkouts] =  useState([]);
  // store the exercise INPUT
  const [exercise, setExercise] = useState('');
  // State to store list of exercises
  const [exercises, setExercises] = useState([]);
  // access expo router
  const router = useRouter();
  // GlobalContext to display the time across different layout of the app
  const { timeElapsed, formatTime } = useGlobalContext();

  // load workouts whent the component mounts
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userWorkouts = await getUserWorkouts(currentUser.$id);
          setWorkouts(userWorkouts);
        }
      } catch (error) {
        console.error('Error loading splits:', error);
      }
    };
  
    loadWorkouts();
  }, []);

  /**
  * loading a workout for the current logged in user
  * 
  * @async
  * @function loadWorkouts
  * @returns {Promise<void>} A promise that resolves when the operation is complete
  * @throws {Error} If there is some kind of error when fetching the current user or their workouts
  */
  const loadWorkouts = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const userWorkouts = await getUserWorkouts(currentUser.$id);
        setWorkouts(userWorkouts);
      }
    } catch (error) {
      console.error('Error loading workouts:', error);
    }
  };

  /**
   * Function to handle adding a new split.
   * turn on the visilibity of the add split modal
   * resets the step of the modal
   * emptying the spit name 
   * emptying the exercise list
   * @function
   * @name handleAddSplit
   * @returns {void}
   */
  const handleAddSplit = () => {
    setModalVisible(true);
    setStep(1);
    setSplitName('');
    setExercises([]);
  };

  /**
  * Handles the completion of step one in split workout creation.
  * 
  * trim the split anme and make sure the user have insert their desired split name
  * if the user added their split(workout name) it will advance to the second page of the modal
  * @function
  * @name handleDoneStepOne
  * @returns {void}
  * 
  *
  */
  const handleDoneStepOne = () => {
    if (splitName.trim() === '') {
      alert('Please enter a split name');
      return;
    }
    setStep(2);
  };

  /**
  * Handles adding a new exercise to the list of exercises for the split workout.
  * 
  * Validate the name of the exercise and display alert if the exercise input is empty
  * add new exercise to the list if validaation passes then clear the input once the exercise has been added
  * 
  *
  * @function
  * @name handleAddExercise
  * @returns {void} 
  * 
  * @throws {Error} display the error 'please enter the exercise name'
  * 
  */
  const handleAddExercise = () => {
    if (exercise.trim() === '') {
      alert('Please enter an exercise name');
      return;
    }
    setExercises([...exercises, exercise]);
    setExercise('');
  };

  /**
  * Handles the completion of step two in split workout creation.
  * 
  * this function retrieve the current user then create the workout split for that user. 
  * reset all the modal and form state and reloads the user workout.
  * 
  * @async
  * @function
  * @name handleDoneStepTwo
  * @returns {Promise<void>} A promise that resolves when the split creation process is complete
  * 
  * @throws {Error} If there's no logged-in user or if split creation fails
  * 
  */
  const handleDoneStepTwo = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser){
        throw new Error('No logged-in user')
      }

      const newSplit = await createWorkout(currentUser.$id, splitName, exercises);

      // console.log('New Workout Created:', newSplit);
      
      setModalVisible(false);
      setSplitName('');
      setExercises([]);
      setStep(1);

      await loadWorkouts();

    } catch (error) {
      console.error('error', error);
      alert('No split created, please try again')
    }
  };

  /**
  * Handles the press event on a split workout 
  *
  * This function takes a workout object as a parameter
  * handle route navigation to a new page, manage_split 
  * 
  * @function
  * @name handleSplitPress
  * 
  * @param {Object} workout - The workout object containing workout details
  * @param {string} workout.workout_name - The name of the workout
  * @param {string} workout.$id - The unique identifier of the workout
  * 
  * @returns {void}
  *
  */
  const handleSplitPress = (workout) => {
    router.push({
      pathname: "/workout/manage_split",
      params: { 
        workoutName: workout.workout_name, 
        workoutId: workout.$id 
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-2xl text-blue-400 font-semibold mt-5 ml-5">FNTA: Finess Note Taking App</Text>
      <Text className="text-sm text-gray-300 font-thin ml-5">Version 1.0.0</Text>
      <StatusBar style="light" />
      <View className="flex-1 p-5">
        <Text className="text-2xl text-white text-center mb-5">
          Time Elapsed: {formatTime(timeElapsed)}
        </Text>
        <Text className="text-lg text-white mb-2">Workout records:</Text>
        <TouchableOpacity className="bg-gray-300 p-4 rounded" onPress={handleAddSplit}>
          <Text className="text-black text-center text-base">+ Add new split</Text>
        </TouchableOpacity>
      
        <CreateSplit
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          step={step}
          splitName={splitName}
          onSplitNameChange={setSplitName}
          onDoneStep1={handleDoneStepOne}
          exercise={exercise}
          onExerciseChange={setExercise}
          onAddExercise={handleAddExercise}
          exercises={exercises}
          onBackToStep1={() => setStep(1)}
          onDoneStep2={handleDoneStepTwo}
        />
        <View className = 'flex-1 mt-5'>
          <Text className = 'text-lg text-white'> Your Current Program:</Text>
            {workouts.map((workout, index) => (
              <TouchableOpacity 
                key={workout.$id || index} 
                className="bg-gray-700 p-4 rounded mb-2"
                onPress={() => handleSplitPress(workout)}
                
              >
                <Text className="text-white text-left text-base">{workout.workout_name}</Text>
              </TouchableOpacity>
      ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;