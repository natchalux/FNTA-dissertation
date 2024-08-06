import { View, Text, SafeAreaView, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getCurrentUser, logOut } from '../../lib/appwrite';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { projectInfo, appVersion } from '../../assets/textData/ProjectInfo';

const Profile = () => {
  const [user, setUser] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  
  const logout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: async () => {
            try {
              await logOut();
              router.replace('/sign-in');
            } catch (error) {
              console.error('Cannot log out: ', error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          }
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appTitle}>FNTA: Fitness Note Taking App</Text>
        <Text style={styles.version}>Version {appVersion}</Text>
        {user ? (
          <Text style={styles.welcome}>Welcome: {user.name}</Text>
        ) : (
          <Text style={styles.loading}>Loading username...</Text>
        )}
        <CustomButton
          title='About this project'
          handlePress={handleOpenSheet}
          containerStyles={styles.button}
        />
        <CustomButton
          title='Log Out'
          bgColor='bg-red-400'
          containerStyles={styles.button}
          handlePress={logout}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetScrollView>
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>About this project 🖥️</Text>
            {projectInfo.map((section, index) => (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    padding: 16,
  },
  appTitle: {
    fontSize: 24,
    color: '#60A5FA',
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '200',
  },
  welcome: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  loading: {
    fontSize: 24,
    color: 'white',
  },
  button: {
    marginTop: 20,
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetTitle: {
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

export default Profile;
