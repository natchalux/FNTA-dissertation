import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity} from 'react-native';
import createSplitStyles from '../app/component_styles/CreateSplitStyles';

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
      <View style={createSplitStyles.container}>
        <View style={createSplitStyles.modalContent}>
          {step === 1 ? (
            <>
              <Text style={createSplitStyles.title}>New split</Text>
              <TextInput
                style={createSplitStyles.input}
                placeholder="Name of split: For example Push Day #1"
                placeholderTextColor="#999"
                value={splitName}
                onChangeText={onSplitNameChange}
              />
              <View style={createSplitStyles.buttonRow}>
                <TouchableOpacity onPress={onClose}>
                  <Text style={createSplitStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneStep1}>
                  <Text style={createSplitStyles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={createSplitStyles.title}>Add exercise</Text>
              <TextInput
                style={createSplitStyles.input}
                placeholder="Enter the exercise"
                placeholderTextColor="#999"
                value={exercise}
                onChangeText={onExerciseChange}
              />
              <TouchableOpacity style={createSplitStyles.addButton} onPress={onAddExercise}>
                <Text style={createSplitStyles.addButtonText}>+ Add Exercise</Text>
              </TouchableOpacity>
              {exercises.map((ex, index) => (
                <Text key={index} style={createSplitStyles.exerciseText}>• {ex}</Text>
              ))}
              <View style={createSplitStyles.buttonRow}>
                <TouchableOpacity onPress={onBackToStep1}>
                  <Text style={createSplitStyles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneStep2}>
                  <Text style={createSplitStyles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};


export default CreateSplit;
