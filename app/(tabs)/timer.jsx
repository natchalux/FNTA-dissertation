import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
import { timerPresetInfo } from '../../assets/textData/TimerPresetInfo';
import timerStyles from '../component_styles/TImerStyles';

/**
 * Timer page
 * 
 * This component represents a timer that allows users to set an interset resting time 
 * user can start, pause, and reset the timer, with some preset resting time settings that match their goal
 * 
 * @component
 * @returns {JSX.Element} 
 */
const Timer = () => {
  const { timeElapsed, formatTime, triggerTimer, setTriggerTimer } = useGlobalContext();
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [isRunning, setIsRunning] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const timerSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  /**
   * Handles opening the bottom sheet for timer presets information.
   * 
   * @function 
   * @name handleTimerSheet
   */
  const handleTimerSheet = useCallback(() => {
    timerSheetRef.current?.expand();
  }, []);

  useEffect(() => {
    /**
     * Count down timer, stop the timer when it reaches zero
     */
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
    /**
     * Start the tmer automatically when the global state for setTrigger set to true.
     */
    if (triggerTimer) {
      startTimer();
      setTriggerTimer(false);
    }
  }, [triggerTimer]);

  /**
   * Start the resting timer
   * 
   * @function 
   * @name startTimer
   */
  const startTimer = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setRestTime(totalSeconds);
    setIsRunning(true);
  };

  /**
   * Pauses the resting timer.
   * 
   * @function 
   * @name pauseTimer
   */
  const pauseTimer = () => {
    setIsRunning(false);
  };

   /**
   * Resets the timer and clear the input. 
   * 
   * @function 
   * @name resetTimer
   */
  const resetTimer = () => {
    setIsRunning(false);
    setRestTime(0);
  };

  /**
   * Handles setting up resting timer base on the preset options.
   * 
   * @function 
   * @name handlePresetRestTime
   * @param {number} minutes - The preset minutes value to set.
   */
  const handlePresetRestTime = (minutes) => {
    setMinutes(minutes.toString());
    setSeconds('0');
    setRestTime(minutes * 60);
  };

  /**
   * Sets the resting timer to the recommended rest time of 2 minutes.
   * 
   * @function 
   * @name recommendedRestTime
   */
  const recommendedRestTime = () => handlePresetRestTime(2);
  /**
   * Sets the resting timer to hypertrophy setting, 3 minutes
   * 
   * @function 
   * @name recommendedHypertrophy
   */
  const recommendedHypertrophy = () => handlePresetRestTime(3);
  /**
   * Sets the resting timer to strength focus, 5 minutes
   * 
   * @function 
   * @name strengthRestTime
   */
  const strengthRestTime = () => handlePresetRestTime(5);

  return (
    <SafeAreaView style={timerStyles.container}>
      <View style={timerStyles.content}>
        <Text style={timerStyles.elapsedTime}>
          Time Elapsed: {formatTime(timeElapsed)}
        </Text>
        <Text style={timerStyles.header}>
          Workout Interset Resting Time:
        </Text>
        <Text style={timerStyles.subheader}>
          Set a resting time that you are going to be using for most of the time
        </Text>
        <View style={timerStyles.inputContainer}>
          <TextInput
            style={timerStyles.input}
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="Min"
            returnKeyType='done'
            placeholderTextColor="#666"
          />
          <Text style={timerStyles.colon}>:</Text>
          <TextInput
            style={timerStyles.input}
            keyboardType="numeric"
            value={seconds}
            onChangeText={setSeconds}
            placeholder="Sec"
            returnKeyType='done'
            placeholderTextColor="#666"
          />
        </View>
        <Text style={timerStyles.timer}>
          {formatTime(restTime)}
        </Text>
        <View style={timerStyles.buttonRow}>
          {!isRunning ? (
            <TouchableOpacity
              style={[timerStyles.button, timerStyles.startButton]}
              onPress={startTimer}
            >
              <Text style={timerStyles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[timerStyles.button, timerStyles.pauseButton]}
              onPress={pauseTimer}
            >
              <Text style={timerStyles.buttonText}>Pause</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[timerStyles.button, timerStyles.resetButton]}
            onPress={resetTimer}
          >
            <Text style={timerStyles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={timerStyles.presetContainer}>
          <Text style={timerStyles.presetHeader}>Or choose our resting timer preset:</Text>
          <Pressable onPress={handleTimerSheet}>
            <Text style={timerStyles.presetInfo}>What is this?</Text>
          </Pressable>
          <CustomButton
            title='Default: 2 minutes'
            handlePress={recommendedRestTime}
            containertimerStyles={timerStyles.customButton}
          />
          <CustomButton
            title='Recommendation Hypertrophy: 3 minutes'
            handlePress={recommendedHypertrophy}
            containertimerStyles={timerStyles.customButton}
          />
          <CustomButton
            title='Strength training: 5 minutes'
            handlePress={strengthRestTime}
            containertimerStyles={timerStyles.customButton}
          />  
        </View>
      </View>
      <BottomSheet
        ref={timerSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetScrollView>
          <View style={timerStyles.sheetContent}>
            <Text style={timerStyles.sheetHeader}>Choose your resting time ⏰</Text>
            {timerPresetInfo.map((section, index) => (
              <View key={index} style={timerStyles.sheetSection}>
                {section.title && <Text style={timerStyles.sheetSectionTitle}>{section.title}</Text>}
                {Array.isArray(section.content) ? (
                  section.content.map((item, itemIndex) => (
                    <Text key={itemIndex} style={timerStyles.sheetSectionContent}>• {item}</Text>
                  ))
                ) : (
                  <Text style={timerStyles.sheetSectionContent}>{section.content}</Text>
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
