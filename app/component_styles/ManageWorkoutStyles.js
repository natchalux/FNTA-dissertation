import { StyleSheet } from 'react-native';

const manageWorkoutStyles = StyleSheet.create({
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    setContainer: {
        width: '50%',
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
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

export default manageWorkoutStyles;
