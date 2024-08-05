import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { getCurrentUser, logOut } from '../../lib/appwrite';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { projectInfo, appVersion } from '../../assets/textData/ProjectInfo';


const Profile = () => {
  const [user, setUser] = useState(null);
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [])
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
              router.replace('/sign-in')
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
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-4">
        <Text className="text-2xl text-blue-400 font-semibold">FNTA: Finess Note Taking App</Text>
        <Text className="text-sm text-gray-300 font-thin ">Version {appVersion}</Text>
        {user ? (
          <Text className="text-lg text-white mt-5">Welcome: {user.name}</Text>
        ) : (
          <Text className="text-white text-2xl">Loading username...</Text>
        )}
        <CustomButton
        title = 'About this project'
        handlePress={handleOpenSheet}
        containerStyles='mt-5'
        />
        <CustomButton
        title = 'Log Out'
        bgColor = 'bg-red-400'
        containerStyles='mt-2'
        handlePress={logout}
       

        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose = {true}
      >
        <BottomSheetScrollView>
        <View className="flex-1 p-4">
          <Text className="text-xl font-semibold mb-4">About this project 🖥️</Text>
          {projectInfo.map((section, index) => (
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
  )
}

export default Profile