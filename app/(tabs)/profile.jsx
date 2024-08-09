import { View, Text, SafeAreaView, Alert, profileStylesheet } from 'react-native';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getCurrentUser, logOut } from '../../lib/appwrite';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { projectInfo, appVersion } from '../../assets/textData/ProjectInfo';
import profileStyles from '../component_styles/ProfileStyles';


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
    <SafeAreaView style={profileStyles.container}>
      <View style={profileStyles.content}>
        <Text style={profileStyles.appTitle}>FNTA: Fitness Note Taking App</Text>
        <Text style={profileStyles.version}>Version {appVersion}</Text>
        {user ? (
          <Text style={profileStyles.welcome}>Welcome: {user.name}</Text>
        ) : (
          <Text style={profileStyles.loading}>Loading username...</Text>
        )}
        <CustomButton
          title='About this project'
          handlePress={handleOpenSheet}
          containerprofileStyles={profileStyles.button}
        />
        <CustomButton
          title='Log Out'
          bgColor='#EF4444'
          containerprofileStyles={profileStyles.button}
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
          <View style={profileStyles.sheetContent}>
            <Text style={profileStyles.sheetTitle}>About this project 🖥️</Text>
            {projectInfo.map((section, index) => (
              <View key={index} style={profileStyles.sheetSection}>
                {section.title && <Text style={profileStyles.sheetSectionTitle}>{section.title}</Text>}
                {Array.isArray(section.content) ? (
                  section.content.map((item, itemIndex) => (
                    <Text key={itemIndex} style={profileStyles.sheetSectionContent}>• {item}</Text>
                  ))
                ) : (
                  <Text style={profileStyles.sheetSectionContent}>{section.content}</Text>
                )}
              </View>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}

export default Profile;
