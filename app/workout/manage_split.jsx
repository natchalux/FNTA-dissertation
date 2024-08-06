import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Alert,
    StyleSheet
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchWorkout, createExerciseSet, fetchPreviousWeekData } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

/**
 * ManageWorkout page
 * 
 * This component allows the user to log their workout sets and compare them to the previous week.
 * Allow user to add more extra sets in one exercise
 * viewing their customized workout name and exercises
 *
 * @component
 * @returns {JSX.Element} The rendered ManageWorkout component.
 */
const ManageWorkout = () => {
    const { workoutName, workoutId } = useLocalSearchParams();
    const { weekNumbers, updateWeekNumber, setTriggerTimer } = useGlobalContext();
    const [workout, setWorkout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inputSets, setInputSets] = useState({});
    const [weekNumber, setWeekNumber] = useState(weekNumbers[workoutId] || '1');
    const [previousWeekData, setPreviousWeekData] = useState({});
    const maximum_set_per_exercise = 4;

    const incrementWeek = () => {
        setWeekNumber(prev => (Number(prev) + 1).toString());
        const resetSets = {};
        Object.keys(inputSets).forEach(exercise => {
            resetSets[exercise] = [{ weight: '', reps: '' }];
        });
        setInputSets(resetSets);
    };

    useEffect(() => {
        loadWorkout();
    }, []);

    useEffect(() => {
        updateWeekNumber(workoutId, weekNumber);
    }, [weekNumber, workoutId]);

    const loadWorkout = async () => {
        try {
            setIsLoading(true);
            const workoutData = await fetchWorkout(workoutId);   
            setWorkout(workoutData);
            const initialSets = {};
            const initialPreviousWeekData = {};
            const currentWeek = Number(weekNumber);
            for (const exercise of workoutData.exercises) {
                initialSets[exercise.exerciseId] = [{ weight: '', reps: '', weekNumber: weekNumber }];
                if (currentWeek > 1) {
                    const previousData = await fetchPreviousWeekData(exercise.exerciseId, currentWeek - 1); 
                    initialPreviousWeekData[exercise.exerciseId] = previousData;
                }
            }
            setInputSets(initialSets);
            setPreviousWeekData(initialPreviousWeekData);
        } catch (error) {
            console.error('Error fetching workout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const startNewSession = async () => {
        const currentWeek = Number(weekNumber);
        const newWeekNumber = (currentWeek + 1).toString();
        setWeekNumber(newWeekNumber);
        
        const newSets = {};
        const newPreviousWeekData = {};
        
        for (const exercise of workout.exercises) {
            const previousData = await fetchPreviousWeekData(exercise.exerciseId, currentWeek);
            newPreviousWeekData[exercise.exerciseId] = previousData;
            newSets[exercise.exerciseId] = [{ weight: '', reps: '', weekNumber: newWeekNumber }];
        }
        setWeekNumber(newWeekNumber);
        setPreviousWeekData(newPreviousWeekData);
        setInputSets(newSets);
    };

    const addSet = (exercise) => {
        setInputSets(prev => {
            if (prev[exercise].length < maximum_set_per_exercise) {
                return {
                    ...prev,
                    [exercise]: [...prev[exercise], { weight: '', reps: '', weekNumber: weekNumber }]
                };
            }
            return prev;
        });
    };
    
    const handleInputChange = (exercise, index, field, value) => {
        setInputSets(prev => ({
            ...prev,
            [exercise]: prev[exercise].map((set, i) => 
                i === index ? { ...set, [field]: value } : set
            )
        }));
    };
    
    const saveWorkoutSets = async () => {
        try {
            for (const [exercise, sets] of Object.entries(inputSets)) {
                for (const set of sets) {
                    if (set.weight && set.reps) {
                        await createExerciseSet(
                            Number(set.weight),
                            Number(set.reps),
                            Number(set.weekNumber),
                            exercise
                        );
                    }
                }
            }
            Alert.alert('Success', 'Workout sets saved successfully');
            setTriggerTimer(true);
        } catch (error) {
            console.error('Error saving workout sets:', error);
            Alert.alert('Error', 'Failed to save workout sets');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{workoutName}</Text>
            <Text style={styles.weekNumber}>Week {weekNumber}</Text>
            {isLoading && (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
            {workout && workout.exercises && (
                <>
                    <Text style={styles.subtitle}>Exercises:</Text>
                    {workout.exercises.map((exercise, index) => (
                        <View key={index} style={styles.exerciseContainer}>
                            <Text style={styles.exerciseName}>{exercise.exercise_name}</Text>
                            <View style={styles.setsContainer}>
                                {inputSets[exercise.exerciseId] && inputSets[exercise.exerciseId].map((set, i) => (
                                    <View key={i} style={styles.setContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Weight"
                                            value={set.weight}
                                            onChangeText={(value) => handleInputChange(exercise.exerciseId, i, 'weight', value)}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Reps"
                                            value={set.reps}
                                            onChangeText={(value) => handleInputChange(exercise.exerciseId, i, 'reps', value)}
                                        />
                                        {previousWeekData[exercise.exerciseId] && previousWeekData[exercise.exerciseId].length > 0 && (
                                            <Text style={styles.previousWeekData}>
                                                Previous week({Number(weekNumber) - 1}): {previousWeekData[exercise.exerciseId].map(set => set.weight).join(' ')} | {previousWeekData[exercise.exerciseId].map(set => set.reps).join(' ')}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity 
                                style={styles.addButton}
                                onPress={() => addSet(exercise.exerciseId)}
                            >
                                <Text style={styles.addButtonText}>Add Set</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.logButton}
                                onPress={saveWorkoutSets}
                            >
                                <Text style={styles.logButtonText}>Log Set</Text>
                            </TouchableOpacity>
                        </View>  
                    ))}
                </>
            )}
            {workout && !workout.exercises && (
                <Text style={styles.noExercisesText}>No exercises found for this workout.</Text>
            )}
            <View style={styles.newSessionContainer}>
                <TouchableOpacity 
                    style={styles.newSessionButton}
                    onPress={startNewSession}
                >
                    <Text style={styles.newSessionButtonText}>New Session</Text>
                </TouchableOpacity>
            </View>          
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  weekNumber: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  exerciseContainer: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  setsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  setContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: 70,
    fontSize: 14,
  },
  previousWeekData: {
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#60A5FA',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  logButton: {
    backgroundColor: '#10B981',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  logButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noExercisesText: {
    fontSize: 18,
    color: 'white',
  },
  newSessionContainer: {
    alignItems: 'flex-end',
    padding: 20,
  },
  newSessionButton: {
    backgroundColor: '#60A5FA',
    padding: 20,
    borderRadius: 8,
  },
  newSessionButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ManageWorkout;
