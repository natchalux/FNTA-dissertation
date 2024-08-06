import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * CreateSplit 
 * 
 * Custom Component
 * 
 * Responsible for rendering the modal for creating a new split by, 
 * adding name of the split, for exammple, chest day 1 
 * then addding an exercise, for example, push up
 *
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Determines if the modal is visible
 * @param {Function} props.onClose - Function to close the modal
 * @param {number} props.step - Current step in the modal (1 or 2)
 * @param {string} props.splitName - Name of the workout split
 * @param {Function} props.onSplitNameChange - Function to handle split name change
 * @param {Function} props.onDoneStep1 - Function to proceed from step 1 to step 2
 * @param {string} props.exercise - Name of the current exercise being added
 * @param {Function} props.onExerciseChange - Function to handle exercise name change
 * @param {Function} props.onAddExercise - Function to add the current exercise to the list
 * @param {string[]} props.exercises - List of added exercises
 * @param {Function} props.onBackToStep1 - Function to go back to step 1
 * @param {Function} props.onDoneStep2 - Function to finalize the split creation
 * 
 * @returns {JSX.Element} The rendered CreateSplit component
 */

const CreateSplit = ({ 
  visible, 
  onClose, 
  step, 
  splitName, 
  onSplitNameChange, 
  onDoneStep1,
  exercise,
  onExerciseChange,
  onAddExercise,
  exercises,
  onBackToStep1,
  onDoneStep2
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {step === 1 ? (
            <>
              <Text style={styles.title}>New split</Text>
              <TextInput
                style={styles.input}
                placeholder="Name of split: For example Push Day #1"
                placeholderTextColor="#999"
                value={splitName}
                onChangeText={onSplitNameChange}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneStep1}>
                  <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Add exercise</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the exercise"
                placeholderTextColor="#999"
                value={exercise}
                onChangeText={onExerciseChange}
              />
              <TouchableOpacity style={styles.addButton} onPress={onAddExercise}>
                <Text style={styles.addButtonText}>+ Add Exercise</Text>
              </TouchableOpacity>
              {exercises.map((ex, index) => (
                <Text key={index} style={styles.exerciseText}>• {ex}</Text>
              ))}
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onBackToStep1}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneStep2}>
                  <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#4B5563',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#4B5563',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
  },
  exerciseText: {
    color: 'white',
    marginBottom: 8,
  },
});

export default CreateSplit;
