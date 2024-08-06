import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  StyleSheet
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
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [splitName, setSplitName] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const router = useRouter();
  const { timeElapsed, formatTime } = useGlobalContext();

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>FNTA: Fitness Note Taking App</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.timer}>
          Time Elapsed: {formatTime(timeElapsed)}
        </Text>
        <Text style={styles.subtitle}>Workout records:</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddSplit}>
          <Text style={styles.addButtonText}>+ Add new split</Text>
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
        <View style={styles.workoutList}>
          <Text style={styles.currentProgram}>Your Current Program:</Text>
            {workouts.map((workout, index) => (
              <TouchableOpacity 
                key={workout.$id || index} 
                style={styles.workoutItem}
                onPress={() => handleSplitPress(workout)}
              >
                <Text style={styles.workoutItemText}>{workout.workout_name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    color: '#60A5FA',
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
  },
  version: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '200',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timer: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#D1D5DB',
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  workoutList: {
    flex: 1,
    marginTop: 20,
  },
  currentProgram: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  workoutItem: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  workoutItemText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
