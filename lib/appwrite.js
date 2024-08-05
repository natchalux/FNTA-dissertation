import { 
  Client, 
  Databases, 
  Account, 
  ID, 
  Query 
} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.nclx.gymnotetaker',
    projectId: '668079d6002298ab47c1',
    databaseId: '66849a370037b9e65f36',
    userCollectionId: '6684a0630013257fd4e2',
    workoutCollectionId: '668ac9aa002c6bcb2b2e',
    exerciseCollectionId: '668acbd60018fba8049b',
    workoutexerciseCollectionId: '668acd7a002827dbf2d0',
    workoutsessionCollectionId: '668ace6f0002a8025cd0',
    workoutsetCollectionId: '668acff40002aa75be02'

}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const accounts = new Account(client);
    const databases = new Databases(client);
    

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * @param {*} username 
     * @returns 
     */
    export async function createUser(email, password, username) {

        if (!isValidEmail(email)) {
            throw new Error("Invalid email address");
          }

        try {
          const userId = ID.unique();

          const newAccount = await accounts.create(
            userId,
            email,
            password,
            username
          );
      
          if (!newAccount) throw Error;
      
      
          await signIn(email, password);
      
          const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            userId,
            {
              accountId: userId,
              email,
              username,
            }
          );
      
          return newUser;
        } catch (error) {
          throw new Error(error);
        }
      };
      
      // Sign In
      export async function signIn(email, password) {
        try {
            try {
                const currentSession = await accounts.getSession('current');
                if (currentSession) {
                  console.log("Active session found, deleting it");
                  await accounts.deleteSession('current');
                }
              } catch (sessionError) {
                // If there's no current session, this will throw an error, which is fine
                console.log("No active session found");
              }
          
          const session = await accounts.createEmailPasswordSession(email, password);
      
          return session;
        } catch (error) {
          throw new Error(error);
        }
      };

      export async function logOut(){
        try {
          return await accounts.deleteSession('current')
        } catch (error) {
          console.log('appwrite service :: getCurrentAccount() :: ' + error)
        }
      }

      export const getCurrentUser = async () => { 
        try {
            const currentAccount = await accounts.get();
    
            if(!currentAccount) throw Error;
    
            const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
            )
    
            if(!currentUser) throw Error; 
    
            return currentAccount;
    
        } catch (error) {
            console.log(error)
        }
      };

      export async function createWorkout(accountId, workoutName, exercises) {
        try {
          const workoutId = ID.unique();
          const newWorkout = await databases.createDocument(
            config.databaseId,
            config.workoutCollectionId, 
            workoutId,
            {
              workoutId: workoutId,
              workout_name: workoutName,
              users: accountId, 
            }
          );

          for (const exerciseName of exercises) {
            await addExerciseToWorkout(workoutId, exerciseName);

          }

        
          return newWorkout;
        } catch (error) {
          console.error('Error creating split:', error);
          throw error;
        }
      };

      async function addExerciseToWorkout(workoutId, exerciseName) {
        try {
          const exercise = await createExercise(exerciseName, workoutId);
        } catch (error) {
          console.error('Error adding exercise to workout:', error);
          throw error;
        }
      };
      
      async function createExercise(exerciseName, workoutId) {
        try {
          const exerciseId = ID.unique();
          return await databases.createDocument(
            config.databaseId,
            config.exerciseCollectionId,
            exerciseId,
            {
              exercise_name: exerciseName,
              exerciseId: exerciseId,
              workouts: workoutId
            }
          );
        } catch (error) {
          console.error('Error creating exercise:', error);
          throw error;
        }
      };
        
      export async function getUserWorkouts(accountId) {
        try {
          const response = await databases.listDocuments(
            config.databaseId,
            config.workoutCollectionId,
            [Query.equal('users', accountId)]
          );
          return response.documents;
        } catch (error) {
          console.error('Error fetching user splits:', error);
          throw error;
        }
      };

      export const fetchWorkout = async (workoutId) => {
      try {
          // Fetch workout details
          const workoutResponse = await databases.getDocument(
              config.databaseId,
              config.workoutCollectionId,
              workoutId
          );
  
          if (!workoutResponse) {
              throw new Error('Workout not found');
          }
  
          // Fetch exercises associated with the workout
          const exercisesResponse = await databases.listDocuments(
              config.databaseId,
              config.exerciseCollectionId,
              [Query.equal('workouts', workoutId)]
          );
  
          if (!exercisesResponse.documents || exercisesResponse.documents.length === 0) {
              throw new Error('No exercises found for this workout');
          }
          const exercises = exercisesResponse.documents.map(doc =>({
            exercise_name: doc.exercise_name,
            exerciseId: doc.exerciseId
          }));
          // Return the workout object along with its associatedr exercises
          return {
              ...workoutResponse,
              exercises: exercises
          };
      } catch (error) {
          console.error('Error fetching workout and associated exercises:', error);
          throw error;
      }
      };

      export const createExerciseSet = async (setWeight, setRep, setWeek, exerciseId) => {
        try {
            // console.log(exerciseId)
            const week = parseInt(setWeek);
            // console.log(typeof week)
            // console.log(week)
            if (isNaN(week) || week <= 0) {
              throw new Error('Invalid week number');
            } 
            const setId = ID.unique();
            const response = await databases.createDocument(
                config.databaseId, // Replace with your database ID
                config.workoutsetCollectionId, // Collection name
                setId, // Generate a unique ID
                {
                  weight: setWeight,
                  reps: setRep,
                  week: week,
                  setId: setId,
                  exercises: exerciseId
                }
            );
            return response;
        } catch (error) {
            console.error('Error saving workout set:', error);
            throw error;
        }
    };

    /**
     * 
     * new section of code- testing
     */
    export const fetchPreviousWeekData = async (exerciseId, currentWeek) => {
      try {
          const response = await databases.listDocuments(
              config.databaseId,
              config.workoutsetCollectionId,
              [
                  Query.equal('exercises', exerciseId),
                  Query.equal('week', currentWeek),
                  Query.orderAsc('$createdAt')
              ]
          );
  
          return response.documents.map(doc => ({
              weight: doc.weight,
              reps: doc.reps
          }));
      } catch (error) {
          console.error('Error fetching previous week data:', error);
          throw error;
      }
  };