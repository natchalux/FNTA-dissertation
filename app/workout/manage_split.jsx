import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchWorkout, createExerciseSet, fetchPreviousWeekData } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import manageWorkoutStyles from '../component_styles/ManageWorkoutStyles';

/**
 * ManageWorkout page
 * 
 * This component allows the user to log their workout sets and compare them to the previous week.
 * Allow user to add more extra sets in one exercise
 * Start new session button to icrement the week and track the workout.
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

    useEffect(() => {
        loadWorkout();
    }, []);

    useEffect(() => {
        updateWeekNumber(workoutId, weekNumber);
    }, [weekNumber, workoutId]);

    /**
     * Loads the workout data from the database and
     * initialises the input sets and workout data from the previous week
     * 
     * @async
     * @function 
     * @name loadWorkout
     * 
     */
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

    /**
     * Start new week by increase the week number by 1, then load the previous week data for comparison.
     * 
     * @async
     * @function 
     * @name startNewSession
     */
    const startNewSession = async () => {
        const currentWeek = Number(weekNumber);
        const newWeekNumber = (currentWeek + 1).toString();
        setWeekNumber(newWeekNumber);

        const newSets = {};
        const newPreviousWeekData = {};

        for (const exercise of workout.exercises) {
            const previousData = await fetchPreviousWeekData(exercise.exerciseId, currentWeek);
            newPreviousWeekData[exercise.exerciseId] = previousData;

            const previousSetsLength = previousData.length || 1;

            newSets[exercise.exerciseId] = Array(previousSetsLength)
                .fill()
                .map(() => ({ weight: '', reps: '', weekNumber: newWeekNumber }));
        }
        setPreviousWeekData(newPreviousWeekData);
        setInputSets(newSets);
    };

    /**
     * increase the number of set by one, maximum number of set that can be added is 4.
     * 
     * @function 
     * @name addSet
     * @param {string} exerciseId 
     */
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

    /**
     * Handles chanes in the input for weight and rep in for the exercise.
     * 
     * @function 
     * @name   handleInputChange
     * @param {string} exerciseId - The ID of the exercise being modified.
     * @param {number} index - The index of the set being modified.
     * @param {string} field - The field being modified ('weight' or 'reps').
     * @param {string} value - The new value for the specified field.
     */
    const handleInputChange = (exercise, index, field, value) => {
        setInputSets(prev => ({
            ...prev,
            [exercise]: prev[exercise].map((set, i) =>
                i === index ? { ...set, [field]: value } : set
            )
        }));
    };


    /**
     * Saves the exercise set to the database.
     * 
     * @async
     * @function 
     * @name saveWorkoutSets
     */
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
        <ScrollView style={manageWorkoutStyles.container}>
            <Text style={manageWorkoutStyles.title}>{workoutName}</Text>
            <Text style={manageWorkoutStyles.weekNumber}>Week {weekNumber}</Text>
            {isLoading && (
                <Text style={manageWorkoutStyles.loadingText}>Loading...</Text>
            )}
            {workout && workout.exercises && (
                <>
                    <Text style={manageWorkoutStyles.subtitle}>Exercises:</Text>
                    {workout.exercises.map((exercise, index) => (
                        <View key={index} style={manageWorkoutStyles.exerciseContainer}>
                            <Text style={manageWorkoutStyles.exerciseName}>{exercise.exercise_name}</Text>
                            <View style={manageWorkoutStyles.setsContainer}>
                                {inputSets[exercise.exerciseId] && (
                                    <View style={manageWorkoutStyles.gridContainer}>
                                        {inputSets[exercise.exerciseId].map((set, i) => (
                                            <View key={i} style={manageWorkoutStyles.setContainer}>
                                                <TextInput
                                                    style={manageWorkoutStyles.input}
                                                    placeholder="Weight"
                                                    value={set.weight}
                                                    onChangeText={(value) => handleInputChange(exercise.exerciseId, i, 'weight', value)}
                                                />
                                                <TextInput
                                                    style={manageWorkoutStyles.input}
                                                    placeholder="Reps"
                                                    value={set.reps}
                                                    onChangeText={(value) => handleInputChange(exercise.exerciseId, i, 'reps', value)}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                            {previousWeekData[exercise.exerciseId] && previousWeekData[exercise.exerciseId].length > 0 && (
                                <Text style={manageWorkoutStyles.previousWeekData}>
                                    Previous week({Number(weekNumber) - 1}): {previousWeekData[exercise.exerciseId].map(set => set.weight).join(' ')} | {previousWeekData[exercise.exerciseId].map(set => set.reps).join(' ')}
                                </Text>
                            )}
                            <TouchableOpacity
                                style={manageWorkoutStyles.addButton}
                                onPress={() => addSet(exercise.exerciseId)}
                            >
                                <Text style={manageWorkoutStyles.addButtonText}>Add Set</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={manageWorkoutStyles.logButton}
                                onPress={saveWorkoutSets}
                            >
                                <Text style={manageWorkoutStyles.logButtonText}>Log Set</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            )}
            {workout && !workout.exercises && (
                <Text style={manageWorkoutStyles.noExercisesText}>No exercises found for this workout.</Text>
            )}
            <View style={manageWorkoutStyles.newSessionContainer}>
                <TouchableOpacity
                    style={manageWorkoutStyles.newSessionButton}
                    onPress={startNewSession}
                >
                    <Text style={manageWorkoutStyles.newSessionButtonText}>New Session</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ManageWorkout;
