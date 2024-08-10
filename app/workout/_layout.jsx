import { Stack } from 'expo-router';

/**
 * WorkoutLayout 
 * 
 * 
 * A layout that contains the modal manage_split screen,
 * it set up the modal screen for manage workout page.
 * 
 * @component
 * @returns {JSX.Element}
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

