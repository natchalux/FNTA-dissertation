import { Stack } from 'expo-router';

/**
 * workout
 * __layout.jsx
 * 
 * A layout that contains the modal manage_split screen
 * 
 * 
 * @returns {JSX.Element} The rendered WorkoutLayout component.
 */
const WorkoutLayout = () =>{
  return (
    <Stack>
      <Stack.Screen
        name='manage_split'
        options={{
          presentation: 'modal',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitle: 'Workout Detail'
        }}
      />
    </Stack>
  );
}


export default WorkoutLayout

