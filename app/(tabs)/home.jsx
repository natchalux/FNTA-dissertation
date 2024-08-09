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
 * 
 * 
 * @returns {JSX.Element} The rendered Home component.
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
     * Loads the user's workouts from the database.
     * 
     * This function is executed once when the component mounts and whenever
     * the `loadWorkouts` function is called. It fetches the current user's 
     * workouts and updates the state with the fetched data.
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
   * Opens the modal to add a new workout split.
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

  const handleAddSplit = () => {
    setModalVisible(true);
    setStep(1);
    setSplitName('');
    setExercises([]);
  };

  const handleDoneStepOne = () => {
    if (splitName.trim() === '') {
      alert('Please enter a split name');
      return;
    }
    setStep(2);
  };

  const handleAddExercise = () => {
    if (exercise.trim() === '') {
      alert('Please enter an exercise name');
      return;
    }
    setExercises([...exercises, exercise]);
    setExercise('');
  };

  const handleDoneStepTwo = async () => {
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
          onDoneStep1={handleDoneStepOne}
          exercise={exercise}
          onExerciseChange={setExercise}
          onAddExercise={handleAddExercise}
          exercises={exercises}
          onBackToStep1={() => setStep(1)}
          onDoneStep2={handleDoneStepTwo}
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
