import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';

/**
 * CreateSplit 
 * 
 * Custom Component
 * 
 * Responsible for rendering the modal for creating a new split by, 
 * adding name of the split, for exammple, chest day 1 
 * then addding an exercuse, for example, push up
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
      <View className="flex-1 justify-center">
        <View className="bg-gray-800 p-5 rounded-t-lg">
          {step === 1 ? (
            <>
              <Text className="text-white text-xl mb-4">New split</Text>
              <TextInput
                className="bg-gray-600 text-white p-2 rounded mb-4"
                placeholder="Name of split: For example Push Day #1"
                placeholderTextColor="#999"
                value={splitName}
                onChangeText={onSplitNameChange}
              />
              <View className="flex-row justify-between">
                <TouchableOpacity onPress={onClose}>
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneStep1}>
                  <Text className="text-white">Done</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text className="text-white text-xl mb-4">Add exercise</Text>
              <TextInput
                className="bg-gray-600 text-white p-2 rounded mb-4"
                placeholder="Enter the exercise"
                placeholderTextColor="#999"
                value={exercise}
                onChangeText={onExerciseChange}
              />
              <TouchableOpacity className="bg-gray-600 p-2 rounded mb-4" onPress={onAddExercise}>
                <Text className="text-white">+ Add Exercise</Text>
              </TouchableOpacity>
              {exercises.map((ex, index) => (
                <Text key={index} className="text-white mb-2">• {ex}</Text>
              ))}
              <View className="flex-row justify-between mt-4">
                <TouchableOpacity onPress={onBackToStep1}>
                  <Text className="text-white">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDoneStep2}>
                  <Text className="text-white">Done</Text>
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