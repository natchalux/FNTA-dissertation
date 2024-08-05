import React, { useState, useEffect,useRef, useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  Pressable
} from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Link } from 'expo-router';
import {timerPresetInfo} from '../../assets/textData/TimerPresetInfo';

/**
 * Timer page
 * 
 * This component represents a timer that allows users to set a interset resting time 
 * user can start pause and reset the timer, with some preset resting time setting that matched their goal
 * 
 * @component
 * @returns {JSX.Element} The rendered Timer component
 */
const Timer = () => {
  // conntext to display the time elapsed across the app
  const { timeElapsed, formatTime } = useGlobalContext();
  // useState to store the minutes
  const { triggerTimer, setTriggerTimer } = useGlobalContext();

  const [minutes, setMinutes] = useState('');
  // useState to store the seconds 
  const [seconds, setSeconds] = useState('');
  // useState to manage runnign resting timer
  const [isRunning, setIsRunning] = useState(false);
  // store the remaining rest time
  const [restTime, setRestTime] = useState(0);
  const timerSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const handleTimerSheet = useCallback(() => {
    timerSheetRef.current?.expand()
  }, [])

 /**
 * Effect hook to manage the timer countdown.
 * 
 * counting down the time when time is running by decrementing it in second.
 * It stops the timer when resting time is finished. Rest time === 0.
 * clear interval when the component are unmount.
 * 
 * @effect
 * @dependency {boolean} isRunning - is the timer running?
 * @dependency {number} restTime - rest time in seconds
 */
  useEffect(() => {
    let interval;
    if (isRunning && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (restTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, restTime]);

  useEffect(() => {
    if (triggerTimer) {
      startTimer();
      setTriggerTimer(false); // Reset the trigger
    }
  }, [triggerTimer]);

  // start the resting timer
  const startTimer = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setRestTime(totalSeconds);
    setIsRunning(true);
  };
  // pause the resting timer
  const pauseTimer = () => {
    setIsRunning(false);
  };
  // reset the resting timer
  const resetTimer = () => {
    setIsRunning(false);
    setRestTime(0);
  };
  const handlePresentRestTime = (minutes) => {
    setMinutes(minutes.toString());
    setSeconds('0');
    setRestTime(minutes * 60);
  }
  const recommendedRestTime = () => handlePresentRestTime(2);
  const recommendedHypertrophy = () => handlePresentRestTime(3);
  const strengthRestTime = () => handlePresentRestTime(5);

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1 p-5'>
        <Text className="text-2xl text-white text-center mb-5">
          Time Elapsed: {formatTime(timeElapsed)}
        </Text>
        <Text className="text-lg text-white text-center mb-5">
          Workout Interset Resting Time:
        </Text>
        <Text className="text-sm text-white text-center mb-5">
          Set a resting time that you are going to be using for most of the time
        </Text>
        <View className="flex-row justify-center items-center mb-5">
          <TextInput
            className="bg-gray-800 text-white text-center w-16 h-12 mr-2 rounded"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="Min"
            returnKeyType='done'
            placeholderTextColor="#666"
          />
          <Text className="text-white text-lg">:</Text>
          <TextInput
            className="bg-gray-800 text-white text-center w-16 h-12 ml-2 rounded"
            keyboardType="numeric"
            value={seconds}
            onChangeText={setSeconds}
            placeholder="Sec"
            returnKeyType='done'
            placeholderTextColor="#666"
          />
        </View>
        <Text className="text-3xl text-white text-center mb-5">
          {formatTime(restTime)}
        </Text>
        <View className="flex-row justify-center">
          {!isRunning ? (
            <TouchableOpacity
              className="bg-green-500 py-2 px-4 rounded mr-2"
              onPress={startTimer}
            >
              <Text className="text-white text-lg">Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-yellow-500 py-2 px-4 rounded mr-2"
              onPress={pauseTimer}
            >
              <Text className="text-white text-lg">Pause</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-red-500 py-2 px-4 rounded"
            onPress={resetTimer}
          >
            <Text className="text-white text-lg">Reset</Text>
          </TouchableOpacity>
        </View>
          <View className= 'flex row justify'>
            
              <Text className= 'text-white text-base mt-10 mb-2'>or choose our resting preset:</Text>
              <Pressable onPress={handleTimerSheet}>
                <Text className= 'text-blue-500 text-base mb-2 underline '>What is this?</Text>
              </Pressable>
          
              <CustomButton
                title = 'Default: 2 minutes'
                handlePress = {recommendedRestTime}
                bgColor = 'bg-new-blue'
                containerStyles='mb-2 h-20'
              />
              <CustomButton
                title = 'Recommendation Hypertrophy: 3 minutes'
                handlePress = {recommendedHypertrophy}
                bgColor = 'bg-ceramic-grey'
                containerStyles='mb-2 h-20'
              />
              <CustomButton
                title = 'Strength training: 5 minutes'
                handlePress = {strengthRestTime}
                bgColor = 'bg-custom-green'
                containerStyles='h-20'
              />  
          </View>
        </View>
        <BottomSheet
        ref={timerSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose = {true}
      >
        <BottomSheetScrollView>
        <View className="flex-1 p-4">
          <Text className="text-xl font-semibold mb-4">Choose your resting time ⏰ </Text>
          {timerPresetInfo.map((section, index) => (
              <View key={index} className="mb-4">
                {section.title && <Text className="text-lg font-semibold mb-2">{section.title}</Text>}
                {Array.isArray(section.content) ? (
                  section.content.map((item, itemIndex) => (
                    <Text key={itemIndex} className="text-base mb-2">• {item}</Text>
                  ))
                ) : (
                  <Text className="text-base">{section.content}</Text>
                )}
              </View>
            ))}
        </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Timer;