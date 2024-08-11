import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  homeStylesheet
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
import homeStyles from '../component_styles/HomeStyles';

/**
 * Home Component
 * 
 * This page hosting a main functionality of the app where user can add new workout and exercise in those workout files that they created.
 * Add new splits button to create a new workout file.
 * It is also displaying any workout file that user created.
 * 
 * @component
 * @returns {JSX.Element}
 */

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [splitName, setSplitName] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const router = useRouter();
  const { timeElapsed, formatTime } = useGlobalContext();

  useEffect(() => {
    /**
     * Loads the user workouts from the database when the component mount.
     * 
     */
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
   * Opens the modal component when adding a new workout split/file.
   *  
   * This function sets the modal visibility to true and resets the state for the 
   * workout creation process.
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
   * Opens the modal to add a new workout split.
   * resets creating new workout state. 
   * 
   * @function 
   * @name handleAddSplit
   */
  const handleAddSplit = () => {
    setModalVisible(true);
    setStep(1);
    setSplitName('');
    setExercises([]);
  };

  /**
   * Handles the completion of step one in the modal workout creation.
   * Validates that a split name(workout name) is entered before proceeding to the next step.
   * 
   * @function 
   * @name handleDoneWorkout
   */
  const handleDoneWorkout = () => {
    if (splitName.trim() === '') {
      alert('Please enter a split name');
      return;
    }
    setStep(2);
  };

  /**
   * Adds an exercise to the list.
   * Validates that the exercise name has been added.
   * 
   * @function 
   * @name handleAddExercise
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
   * Handles the completion of step two in the workout file creation.
   * Creates the workout file and refreshes the list of workouts.
   * 
   * @async
   * @function 
   * @name handleDoneExercise

  */
  const handleDoneExercise = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser){
        throw new Error('No logged-in user')
      }

      const newSplit = await createWorkout(currentUser.$id, splitName, exercises);

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
   * Navigates to the manage_split screen when the workout file is clicked.
   * 
   * 
   * @function 
   * @name handleSplitPress
   * @param {Object} workout The selected workout file
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
    <SafeAreaView style={homeStyles.container}>
      <Text style={homeStyles.title}>FNTA: Fitness Note Taking App</Text>
      <Text style={homeStyles.version}>Version 1.0.0</Text>
      <StatusBar style="light" />
      <View style={homeStyles.content}>
        <Text style={homeStyles.timer}>
          Time Elapsed: {formatTime(timeElapsed)}
        </Text>
        <Text style={homeStyles.subtitle}>Workout records:</Text>
        <TouchableOpacity style={homeStyles.addButton} onPress={handleAddSplit}>
          <Text style={homeStyles.addButtonText}>+ Add new split</Text>
        </TouchableOpacity>
      
        <CreateSplit
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          step={step}
          splitName={splitName}
          onSplitNameChange={setSplitName}
          onDoneStepOne={handleDoneWorkout}
          exercise={exercise}
          onExerciseChange={setExercise}
          onAddExercise={handleAddExercise}
          exercises={exercises}
          backToOne={() => setStep(1)}
          onDoneStepTwo={handleDoneExercise}
        />
        <View style={homeStyles.workoutList}>
          <Text style={homeStyles.currentProgram}>Your Current Program:</Text>
            {workouts.map((workout, index) => (
              <TouchableOpacity 
                key={workout.$id || index} 
                style={homeStyles.workoutItem}
                onPress={() => handleSplitPress(workout)}
              >
                <Text style={homeStyles.workoutItemText}>{workout.workout_name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
