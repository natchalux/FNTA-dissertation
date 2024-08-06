import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  Pressable,
  StyleSheet
} from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { timerPresetInfo } from '../../assets/textData/TimerPresetInfo';

/**
 * Timer page
 * 
 * This component represents a timer that allows users to set an interset resting time 
 * user can start, pause, and reset the timer, with some preset resting time settings that match their goal
 * 
 * @component
 * @returns {JSX.Element} The rendered Timer component
 */
const Timer = () => {
  const { timeElapsed, formatTime, triggerTimer, setTriggerTimer } = useGlobalContext();
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const timerSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleTimerSheet = useCallback(() => {
    timerSheetRef.current?.expand();
  }, []);

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
      setTriggerTimer(false);
    }
  }, [triggerTimer]);

  const startTimer = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setRestTime(totalSeconds);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRestTime(0);
  };

  const handlePresentRestTime = (minutes) => {
    setMinutes(minutes.toString());
    setSeconds('0');
    setRestTime(minutes * 60);
  };

  const recommendedRestTime = () => handlePresentRestTime(2);
  const recommendedHypertrophy = () => handlePresentRestTime(3);
  const strengthRestTime = () => handlePresentRestTime(5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.elapsedTime}>
          Time Elapsed: {formatTime(timeElapsed)}
        </Text>
        <Text style={styles.header}>
          Workout Interset Resting Time:
        </Text>
        <Text style={styles.subheader}>
          Set a resting time that you are going to be using for most of the time
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="Min"
            returnKeyType='done'
            placeholderTextColor="#666"
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={seconds}
            onChangeText={setSeconds}
            placeholder="Sec"
            returnKeyType='done'
            placeholderTextColor="#666"
          />
        </View>
        <Text style={styles.timer}>
          {formatTime(restTime)}
        </Text>
        <View style={styles.buttonRow}>
          {!isRunning ? (
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startTimer}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.pauseButton]}
              onPress={pauseTimer}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetTimer}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.presetHeader}>Or choose our resting preset:</Text>
          <Pressable onPress={handleTimerSheet}>
            <Text style={styles.presetInfo}>What is this?</Text>
          </Pressable>
          <CustomButton
            title='Default: 2 minutes'
            handlePress={recommendedRestTime}
            containerStyles={styles.customButton}
          />
          <CustomButton
            title='Recommendation Hypertrophy: 3 minutes'
            handlePress={recommendedHypertrophy}
            containerStyles={styles.customButton}
          />
          <CustomButton
            title='Strength training: 5 minutes'
            handlePress={strengthRestTime}
            containerStyles={styles.customButton}
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
          <View style={styles.sheetContent}>
            <Text style={styles.sheetHeader}>Choose your resting time ⏰</Text>
            {timerPresetInfo.map((section, index) => (
              <View key={index} style={styles.sheetSection}>
                {section.title && <Text style={styles.sheetSectionTitle}>{section.title}</Text>}
                {Array.isArray(section.content) ? (
                  section.content.map((item, itemIndex) => (
                    <Text key={itemIndex} style={styles.sheetSectionContent}>• {item}</Text>
                  ))
                ) : (
                  <Text style={styles.sheetSectionContent}>{section.content}</Text>
                )}
              </View>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  elapsedTime: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#374151',
    color: 'white',
    textAlign: 'center',
    width: 64,
    height: 48,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  colon: {
    fontSize: 24,
    color: 'white',
  },
  timer: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  startButton: {
    backgroundColor: '#10B981',
  },
  pauseButton: {
    backgroundColor: '#FBBF24',
  },
  resetButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  presetHeader: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  presetInfo: {
    color: '#3B82F6',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  customButton: {
    marginBottom: 10,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sheetSection: {
    marginBottom: 16,
  },
  sheetSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sheetSectionContent: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Timer;
