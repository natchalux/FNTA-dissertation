import React, { useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    TextInput
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchWorkout, createExerciseSet, fetchPreviousWeekData } from '../../lib/appwrite';
import { Alert } from 'react-native';
import { Databases } from 'react-native-appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

/**
 * ManageWorkout page
 * 
 * This component allow user to log in their workout sets and compare it to the previous week.
 * Allow user to add more extra sets in one exercise
 * viewing their customize workout name and exercises
 *
 * @component
 * @returns {JSX.Element} The rendered ManageWorkout component.
 */
const ManageWorkout = () => {
    // Retrieve workoutName and workoutId from local search parameters
    const { workoutName, workoutId } = useLocalSearchParams();
    //
    const { weekNumbers, updateWeekNumber} = useGlobalContext();
    // state to store workout details
    const { setTriggerTimer } = useGlobalContext();
    const [workout, setWorkout] = useState(null);
    // loading state
    const [isLoading, setIsLoading] = useState(true);
    // state that store an sets for particular exercise
    const [inputSets, setInputSets] = useState({});
    // variable maximum set per exercise, preventing user exceed set number
    const [weekNumber, setWeekNumber] = useState(weekNumbers[workoutId] || '1');
    const [previousWeekData, setPreviousWeekData] = useState({});
    const maximum_set_per_exercise = 4;


    const incrementWeek = () => {
        setWeekNumber(prev => (Number(prev) + 1).toString());
        // Reset input sets for the new week
        const resetSets = {};
        Object.keys(inputSets).forEach(exercise => {
            resetSets[exercise] = [{ weight: '', reps: '' }];
        });
        setInputSets(resetSets);
    };
     /**
     * useEffect that handle loadint te workout details when the component mounts
     * 
     * @effect
     */
    useEffect(() => {
        loadWorkout();
    }, []);

    useEffect(() => {
        // Update global state whenever weekNumber changes
        updateWeekNumber(workoutId, weekNumber);
      }, [weekNumber, workoutId]);


    /**
     * Asynchronously loads workout details from the Appwrite server
     * 
     * @async
     * @function
     * @throws {Error} - when there is an error fetching a workout data
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
                    if (currentWeek > 1 ){
                const previousData = await fetchPreviousWeekData(exercise.exerciseId, currentWeek - 1); 
                initialPreviousWeekData[exercise.exerciseId] = previousData;
                    }
            };
            setInputSets(initialSets);
            setPreviousWeekData(initialPreviousWeekData);
        } catch (error) {
            console.error('Error fetching workout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * to do implementing new session logic, handle incrementing week number and minimize the previous week data
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
            newSets[exercise.exerciseId] = [{ weight: '', reps: '', weekNumber: newWeekNumber }];
        }
        setWeekNumber(newWeekNumber)
        setPreviousWeekData(newPreviousWeekData);
        setInputSets(newSets);
    };

    /**
     * Adds a new set for a specified exercise
     * STILL NEEDS TO IMPLEMENT THE ACTUAL LOGIC TO DEAL WITH BACKEND DATA
     * @function
     * @param {string} exercise - The name of the exercise to add a set to
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
            console.log(inputSets)
            for (const [exercise, sets] of Object.entries(inputSets)) {
                for (const set of sets) {
                    // console.log(exercise)
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
        
        <ScrollView className="flex-1 bg-black p-5">
            
            <Text className="text-2xl text-white mb-5">{workoutName}</Text>
            <Text className="text-lg text-white">Week {weekNumber}</Text>
            {isLoading && (
                <Text className="text-lg text-white">Loading...</Text>
            )}
            {workout && workout.exercises && (
                <>
                    <Text className="text-lg text-white mb-3">Exercises:</Text>
                    {workout.exercises.map((exercise, index) => (
                        <View key={index} className="bg-gray-700 p-4 rounded mb-2">
                            <Text className="text-white text-base">{exercise.exercise_name}</Text>
                            <View className="flex-row flex-wrap">
                                {inputSets[exercise.exerciseId] && inputSets[exercise.exerciseId].map((set, i) => (
                                <View key={i} className="mb-2">
                                    <TextInput
                                        className="bg-white text-black p-2 w-20 rounded mb-1"
                                        placeholder="Weight"
                                        value={set.weight}
                                        onChangeText={(value) => handleInputChange(exercise.exerciseId, i, 'weight', value)}
                                        style={{ width: 70, fontSize: 14 }}
                                    />
                                    <TextInput
                                        className="bg-white text-black p-2 w-20 rounded"
                                        placeholder="Reps"
                                        value={set.reps}
                                        onChangeText={(value) => handleInputChange(exercise.exerciseId, i, 'reps', value)}
                                        style={{ width: 70, fontSize: 14 }}

                                    />
                                    
                                    {previousWeekData[exercise.exerciseId] && previousWeekData[exercise.exerciseId].length > 0 && (
                                    
                                   <Text className='text-lg text-white border border-red-500'>Previous week({Number(weekNumber) - 1}): {previousWeekData[exercise.exerciseId].map(set => set.weight).join(' ')} | {previousWeekData[exercise.exerciseId].map(set => set.reps).join(' ')}</Text>
                                   )}
                                </View>
                            ))}
                            </View>  
                                <View className='flex-row flex-wrap ml-72'>
                                    <TouchableOpacity 
                                        className="bg-blue-500 p-2 rounded mt-2 flex-row flex-wrap"
                                        onPress={() => addSet(exercise.exerciseId)}
                                    >
                                        <Text className="text-white text-center">add set</Text>
                                    </TouchableOpacity>
                                </View>
                                    <View className = 'flex-row flex-wrap ml-72'>
                                        <TouchableOpacity 
                                            className="bg-green-500 p-2 rounded mt-2 flex-row flex-wrap"
                                            onPress={saveWorkoutSets}
                                        >
                                        <Text className="text-white text-center text-sm">Log Set</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>  
                            ))}
                        </>
            )}
            {workout && !workout.exercises && (
                <Text className="text-lg text-white">No exercises found for this workout.</Text>
            )}
            <View className="flex-1 justify-end items-end p-5">
                <TouchableOpacity 
                    className="bg-blue-500 p-4 rounded-lg"
                    onPress={startNewSession}
                >
                    <Text className="text-white text-center text-lg">New Sessions</Text>
                </TouchableOpacity>
            </View>          
        </ScrollView>
    );
};

export default ManageWorkout;